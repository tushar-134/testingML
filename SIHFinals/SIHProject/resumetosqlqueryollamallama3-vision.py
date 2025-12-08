# import matplotlib.pyplot as plt
import cv2
import numpy as np
import time
import os
import zipfile
import json
from pdf2image import convert_from_path
from PIL import Image
import pytesseract
import ollama

# --- 1. SETUP & HELPER FUNCTIONS ---

print("Connecting to local Ollama client...")
try:
    # Check if Ollama server is running by listing local models
    models_response = ollama.list()
    print("✅ Ollama server is running.")
    
    # List available models
    available_models = [m.get('model', m.get('name', 'Unknown')) for m in models_response.get('models', [])]
    
    # --- CHANGED: Set to Llama 3.2 Vision ---
    REQUIRED_MODEL = 'llama3.2-vision'
    
    # Check if required model exists (fuzzy match)
    model_found = False
    for model in available_models:
        if REQUIRED_MODEL in model:
            model_found = True
            REQUIRED_MODEL = model # Update to exact name found
            break

    if not model_found:
        print(f"\n⚠️  WARNING: Required model '{REQUIRED_MODEL}' not found!")
        print(f"   Available models: {', '.join(available_models)}")
        print(f"   Please download it with: ollama pull llama3.2-vision")
        exit(1)
    
    print(f"✅ Using model: {REQUIRED_MODEL}")
    
except Exception as e:
    print("❌ ERROR: Could not connect to Ollama server.")
    print("   Please ensure the Ollama application is running on your local machine.")
    print(f"   Error details: {e}")
    exit(1)


# Define file paths
resumes_folder = "Resumes"
output_folder_path = "processed_images_ollama"      
tesseract_output_folder = "tesseract_output_ollama" 
json_output_folder = "json_output_ollama"           

# Poppler path (for PDF to image conversion on Windows)
poppler_path = os.path.join(os.path.dirname(__file__), "poppler-24.08.0", "Library", "bin")
if not os.path.exists(poppler_path):
    poppler_path = None  # Will try to use system PATH

# Tesseract path (for Windows)
tesseract_path = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
if os.path.exists(tesseract_path):
    pytesseract.pytesseract.tesseract_cmd = tesseract_path

# Ensure all output directories exist
os.makedirs(output_folder_path, exist_ok=True)
os.makedirs(tesseract_output_folder, exist_ok=True)
os.makedirs(json_output_folder, exist_ok=True)


# Convert the image to grayscale
def convert_to_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def reduce_noise(gray_image):
    return cv2.GaussianBlur(gray_image, (5, 5), 0)

def binarize_image(blur_reduced_image):
    return cv2.adaptiveThreshold(
        blur_reduced_image,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV, # Invert the colors (text becomes white)
        11, # Block size
        4   # Constant C
    )

def deskew_image(image):
    """
    Corrects the skew of an image by finding the minimum area rectangle
    of the text block and rotating accordingly.
    """
    # Find all non-zero (white) pixels
    coords = cv2.findNonZero(image)
    if coords is None:
        print("Warning: No contours found, skipping deskew.")
        return image

    # Get the minimum area bounding rectangle
    rect = cv2.minAreaRect(coords)
    angle = rect[-1]

    # The `cv2.minAreaRect` angle has a specific range.
    # We need to adjust it for our rotation.
    if angle < -45:
        angle = -(90 + angle)
    
    # Otherwise, angle is fine

    # Get the rotation matrix and rotate the image
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    deskewed_image = cv2.warpAffine(image, M, (w, h),
                                    flags=cv2.INTER_CUBIC,
                                    borderMode=cv2.BORDER_REPLICATE)
    
    print(f"Detected skew angle: {angle:.2f} degrees")
    return deskewed_image


def process_one_image(image):
    image = convert_to_grayscale(image)
    print("Converted image to grayscale..")
    image = reduce_noise(image)
    print("Reduced noise in the image..")
    image = binarize_image(image)
    print("Binarized the image..")
    image = deskew_image(image)
    print("Corrected image orientation..")
    return image

# --- 2. PREP & PROCESS RESUME PDFS ---

print("--- STARTING STEP 1: PROCESSING PDFS ---")
if not os.path.exists(resumes_folder):
    os.makedirs(resumes_folder, exist_ok=True)
    print(f"Error: 'Resumes' folder not found. I created it for you.")
    print("Please add your PDFs to the 'Resumes' folder and run this script again.")
    exit(1)
else:
    pdf_count = sum(1 for f in os.listdir(resumes_folder) if f.endswith('.pdf'))
    print(f"Found {pdf_count} PDF files in Resumes folder")
    
    if pdf_count == 0:
        print("No PDF files found in Resumes folder!")
        exit(1)
    
    for resume_name in os.listdir(resumes_folder):
        if resume_name.endswith('.pdf'):
            print(f"\nProcessing resume: {resume_name}")
            resume_path = os.path.join(resumes_folder, resume_name)

            # Convert the first page of the PDF to an image
            try:
                print(f"Converting PDF to image...")
                pages = convert_from_path(resume_path, first_page=1, last_page=1, poppler_path=poppler_path)
                if pages:
                    image = cv2.cvtColor(np.array(pages[0]), cv2.COLOR_RGB2BGR)
                    processed_image = process_one_image(image)
                    output_path = os.path.join(output_folder_path, resume_name.replace('.pdf', '.png'))
                    cv2.imwrite(output_path, processed_image)
                    print(f"Saved processed image to: {output_path}")
                    print("-"*50)
                else:
                    print(f"Could not convert the first page of {resume_name} to an image.")
                    print("-"*50)
            except Exception as e:
                print(f"❌ ERROR processing {resume_name}: {e}")
                print(f"   This is likely because Poppler is not installed or not in PATH")
                print(f"   Install with: choco install poppler -y")
                print("-"*50)
                continue

    processed_count = sum(1 for f in os.listdir(output_folder_path) if f.endswith('.png'))
    print(f"\n✓ Processing completed. Generated {processed_count} images out of {pdf_count} PDFs.")
    
    if processed_count == 0:
        print("❌ No images were generated! Cannot proceed with text extraction.")
        print("   Please install Poppler and Tesseract first.")
        exit(1)

# --- 3. TEXT EXTRACTION (TESSERACT) ---

print("\n--- STARTING STEP 2: TEXT EXTRACTION ---")

# Check if Tesseract is installed
try:
    tesseract_version = pytesseract.get_tesseract_version()
    print(f"Tesseract version: {tesseract_version}")
except Exception as e:
    print(f"❌ ERROR: Tesseract is not installed or not in PATH!")
    print(f"   Error: {e}")
    print(f"   Install with: choco install tesseract -y")
    exit(1)

start_time_tesseract = time.time()

total_images_tesseract = sum(1 for entry in os.scandir(output_folder_path) if entry.name.endswith('.png'))
print(f"Total images in folder: {total_images_tesseract}")

for i, image_name in enumerate(os.listdir(output_folder_path), 1):
    if not image_name.endswith('.png'):
        continue
        
    print(f"Processing image {i}/{total_images_tesseract}: {image_name}")
    image_path = os.path.join(output_folder_path, image_name)
    print("Extracting text from image..")
    
    try:
        text = pytesseract.image_to_string(Image.open(image_path))
        output_path = os.path.join(tesseract_output_folder, image_name.replace(".png", ".txt"))
        with open(output_path, "w", encoding='utf-8') as f:
            f.write(text)

        print(f"Saved extracted text to {output_path}")
        print("-"*50)
    except Exception as e:
        print(f"Error during Tesseract extraction for {image_name}: {e}")
        print("-"*50)

print("Text Extraction Completed.")
print(f"Total time taken: {time.time() - start_time_tesseract:.2f} seconds")


# --- 4. INFORMATION EXTRACTION (OLLAMA) ---

print("\n--- STARTING STEP 3: INFORMATION EXTRACTION (OLLAMA) ---")

# --- PROMPT UPDATED FOR NEW JSON SCHEMA ---
prompt = """
You are a resume parsing assistant. Your goal is to extract structured data from the provided resume.
You will receive two inputs: 
1. The visual layout of the resume (Image).
2. The raw text extracted via OCR (Text).

Extract the following fields based on the resume content:
- Position: The job title the candidate is seeking or their most recent role.
- location: The candidate's city and state/country (e.g., Bhubaneswar, Odisha).
- qualification: The highest relevant academic degree (e.g., B.Tech in Computer Science).
- experience: The career level or years of experience (e.g., "Internship", "Entry Level", or "5 Years").
- skills: A comprehensive list of technical and soft skills found in the document.
- summary: A brief summary of the candidate's profile.
- work_experience: A single coherent paragraph summarizing key roles, companies, and achievements.

Output STRICT JSON ONLY. Do not add markdown backticks (```json) or conversational text.
Use exactly this format:
{
    "Position": "",
    "location": "",
    "qualification": "",
    "experience": "",
    "skills": "",
    "summary": "",
    "work_experience": ""
}

RAW OCR TEXT:
"""


start_time_ollama = time.time()

total_images_ollama = sum(1 for entry in os.scandir(output_folder_path) if entry.name.endswith('.png'))
print(f"Total images to process with Ollama ({REQUIRED_MODEL}): {total_images_ollama}")

for i, image_name in enumerate(os.listdir(output_folder_path), 1):
    if not image_name.endswith('.png'):
        continue
    
    print(f"Processing image {i}/{total_images_ollama}: {image_name}")
    image_path = os.path.join(output_folder_path, image_name)
    print(f"Loading image: {image_path}")

    # Handle both .png and .jpg (though we only make .png)
    base_name, _ = os.path.splitext(image_name)
    text_path = os.path.join(tesseract_output_folder, base_name + ".txt")

    if not os.path.exists(text_path):
        print(f"Warning: Text file not found for {image_name}. Skipping Ollama step.")
        print("-"*50)
        continue

    print(f"Loading extracted text: {text_path}")
    with open(text_path, "r", encoding='utf-8') as f:
        text = f.read()

    print(f"Sending to {REQUIRED_MODEL}...")

    # Combine prompt with the OCR text
    prompt_with_text = prompt + "\n" + text

    try:
        # +++ ADDED: Ollama chat call for Vision Model +++
        response = ollama.chat(
            model=REQUIRED_MODEL,
            messages=[
                {
                    'role': 'user',
                    'content': prompt_with_text,
                    'images': [image_path] # Pass the file path to the image
                }
            ],
            format='json', # Enforce JSON mode
            options={'temperature': 0} # Set temperature to 0 for consistency
        )

        # ---- Safe response parsing ----
        response_text = None
        if response and response.get('message') and response['message'].get('content'):
            response_text = response['message']['content']
        else:
            print("⚠️ No text content returned from model. Skipping this file.")
            print(f"Full response: {response}")
            continue

        response_text = response_text.strip()

        try:
            extracted_information = json.loads(response_text)
        except json.JSONDecodeError as e:
            print(f"⚠️ Failed to decode JSON for {image_name}: {e}")
            print(f"Raw model output: {response_text}")
            continue

        # Save JSON with correct name
        output_path = os.path.join(json_output_folder, base_name + ".json")
        with open(output_path, "w") as f:
            json.dump(extracted_information, f, indent=4)

        print(f"✅ Saved extracted information to {output_path}")

    except Exception as e:
        print(f"❌ An error occurred with the Ollama API for {image_name}: {e}")
        
    print("-" * 50)


print("Information Extraction Completed.")
print(f"Total time taken: {time.time() - start_time_ollama:.2f} seconds")