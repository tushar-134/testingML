"""
Test script for Ollama model embedding generation
"""
import ollama
import numpy as np
import sys

MODEL_NAME = "tazarov/all-minilm-l6-v2-f32:latest"

def test_embedding_generation():
    """Test that embeddings are generated correctly"""
    print("=" * 60)
    print("Testing Ollama Embedding Generation")
    print("=" * 60)
    
    test_texts = [
        "Software Engineer with Python skills",
        "Data Scientist with Machine Learning expertise",
        "Frontend Developer with React and JavaScript"
    ]
    
    try:
        for i, text in enumerate(test_texts, 1):
            print(f"\n{i}. Testing: '{text}'")
            
            response = ollama.embeddings(
                model=MODEL_NAME,
                prompt=text
            )
            
            embedding = response["embedding"]
            vec = np.array(embedding)
            
            # Check dimensions
            print(f"   ✓ Embedding dimension: {len(embedding)}")
            
            # Check values
            print(f"   ✓ First 5 values: {embedding[:5]}")
            print(f"   ✓ Vector norm: {np.linalg.norm(vec):.4f}")
            
            # Verify it's not all zeros
            if np.all(vec == 0):
                print(f"   ✗ ERROR: Embedding is all zeros!")
                return False
            else:
                print(f"   ✓ Non-zero embedding generated")
        
        print("\n" + "=" * 60)
        print("✓ All embedding tests passed!")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"\n✗ Error generating embeddings: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_similarity():
    """Test that similar texts have higher similarity scores"""
    print("\n" + "=" * 60)
    print("Testing Vector Similarity")
    print("=" * 60)
    
    try:
        # Similar texts
        text1 = "Python developer with backend experience"
        text2 = "Backend engineer skilled in Python"
        text3 = "Graphic designer with Adobe Creative Suite"
        
        print(f"\nText 1: '{text1}'")
        print(f"Text 2: '{text2}'")
        print(f"Text 3: '{text3}'")
        
        # Generate embeddings
        emb1 = np.array(ollama.embeddings(model=MODEL_NAME, prompt=text1)["embedding"])
        emb2 = np.array(ollama.embeddings(model=MODEL_NAME, prompt=text2)["embedding"])
        emb3 = np.array(ollama.embeddings(model=MODEL_NAME, prompt=text3)["embedding"])
        
        # Normalize
        emb1 = emb1 / np.linalg.norm(emb1)
        emb2 = emb2 / np.linalg.norm(emb2)
        emb3 = emb3 / np.linalg.norm(emb3)
        
        # Calculate similarities
        sim_1_2 = np.dot(emb1, emb2)
        sim_1_3 = np.dot(emb1, emb3)
        
        print(f"\nSimilarity (Text 1 vs Text 2): {sim_1_2:.4f}")
        print(f"Similarity (Text 1 vs Text 3): {sim_1_3:.4f}")
        
        if sim_1_2 > sim_1_3:
            print("✓ Similar texts have higher similarity score!")
            return True
        else:
            print("✗ Warning: Similar texts don't have higher similarity")
            return False
            
    except Exception as e:
        print(f"\n✗ Error testing similarity: {e}")
        return False

if __name__ == "__main__":
    success = True
    
    # Run tests
    if not test_embedding_generation():
        success = False
    
    if not test_similarity():
        success = False
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)
