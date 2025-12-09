# 🧪 Manual Website Testing Guide with Different User Data

## Test User Profile #2

**Mobile**: 9111111111  
**Name**: Priya Sharma  
**Role**: Data Analyst  

---

## Step-by-Step Testing Instructions

### Step 1: Open Website
1. Open browser
2. Go to: **http://localhost:3001**
3. Look for "Sign Up" or "Register" button

### Step 2: Registration
1. Click "Sign Up" / "Register"
2. Enter mobile: **9111111111**
3. Click "Send OTP"
4. **Check backend terminal** - you'll see OTP there
5. Enter the OTP shown in terminal
6. Click "Verify"

### Step 3: Set Password
1. Enter password: **DataAnalyst@123**
2. Confirm password: **DataAnalyst@123**
3. Click "Submit" / "Create Password"
4. Should redirect to youth form

### Step 4: Fill Personal Details (Step 1)
- Full Name: **Priya Sharma**
- Father's Name: **Raj Sharma**
- Date of Birth: **1998-05-20**
- Gender: **Female**
- Email: **priya.sharma@email.com**
- Click "Next"

### Step 5: Fill Address (Step 2)
**Permanent Address:**
- Address: **45 MG Road**
- State: **Karnataka**
- District: **Bangalore**
- Pincode: **560025**

**Correspondence Address:**  
☑️ Same as permanent  
Click "Next"

### Step 6: Education (Step 3)
- Qualification: **M.Sc. in Data Science**
- University: **Indian Institute of Science**
- Passing Year: **2021**
- Grade/CGPA: **9.2**
- Click "Next"

### Step 7: Skills (Step 4)
Enter these skills (press Enter after each):
- **Python**
- **R Programming**
- **SQL**
- **Machine Learning**
- **Data Visualization**
- **Tableau**
- **Power BI**
- **Statistics**

**Experience Section:**
Click "Add Experience"

**Experience 1:**
- Role: **Data Analyst**
- Company: **Analytics Solutions Pvt Ltd**
- Duration: **2 years**
- Description: **Analyzed large datasets using Python and SQL. Created dashboards using Tableau and Power BI. Implemented predictive models for business forecasting.**

**Experience 2:**
Click "Add Experience" again
- Role: **Data Science Intern**
- Company: **Tech Startup Hub**
- Duration: **6 months**
- Description: **Worked on ML projects, data cleaning, and statistical analysis using Python and R.**

Click "Next"

### Step 8: Documents (Step 5)
- Upload Aadhar (optional)
- Upload Photo (optional)
- Click "Next"

### Step 9: Review & Submit (Step 6)
- Review all information
- Click "**Submit**"
- Should see success message
- **Should auto-redirect to recommendations page**

### Step 10: View ML Recommendations
- Page should load with job matches
- Look for jobs related to:
  - Data Analyst
  - Data Science
  - ML Engineer
  - Business Analyst
- Check match scores

---

## Expected Results

✅ **What You Should See:**

1. **After Form Submit:**
   - Success message
   - "Redirecting to job recommendations..."
   - Auto-redirect after 1.5 seconds

2. **On Recommendations Page:**
   - Loading indicator
   - List of 20 jobs
   - Each job shows:
     - Title (e.g., "Data Analyst", "Data Scientist")
     - Company name
     - Location
     - Match Score (0-100%)
     - Skills Match
     - Experience Match

3. **Example Jobs Expected:**
   - Data Analyst positions
   - Business Intelligence roles
   - Data Science positions
   - ML Engineer roles
   - Analytics Consultant

---

## Verification Checklist

After completing the test:

- [ ] Registration worked smoothly
- [ ] OTP was received (in console)
- [ ] Password created successfully
- [ ] All 6 form steps completed
- [ ] Skills list displayed correctly
- [ ] Experience added successfully
- [ ] Form submitted without errors
- [ ] Redirected to recommendations
- [ ] Job matches displayed
- [ ] Match scores make sense
- [ ] Jobs relevant to Data Analyst profile

---

## Debug Tips

### If OTP doesn't work:
- Check backend terminal for actual OTP
- Try: `123456` (common dev default)
- Or use the development bypass if configured

### If form doesn't submit:
- Open browser console (F12)
- Look for error messages
- Check if mobile number is being sent

### If recommendations don't load:
- Check if redirect happened
- Manually go to: `http://localhost:3001/recommendations`
- Check browser console for errors

---

## Compare with Profile #1

**Profile #1** (already tested via API):
- Software Developer
- Python, JavaScript, React
- Web development focus

**Profile #2** (this manual test):
- Data Analyst
- Python, R, SQL, ML
- Analytics focus

**Expected difference**: Different job recommendations based on skills!

---

**Ready to test! Follow each step and verify the system works for a different user profile.** 🧪
