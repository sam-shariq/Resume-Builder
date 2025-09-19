# Resume Builder Web App

A simple static web application that allows users to **design and preview their resumes interactively**.  
Users can dynamically add sections like **Education, Experience, Skills, Projects, and Summary**, and export the resume in a **print/PDF-friendly format**.

---

## Features

- **Form Inputs**  
  - Name, email, phone number, address, and social links.  
  - Add multiple Education entries (School/College, Duration, Description).  
  - Add multiple Work/Project entries.  
  - Add a Skills section with skill-level indicators (e.g., stars or progress bars).  
  - Add a short Summary section.  

- **Dynamic Section Addition**  
  - Add or remove multiple Education, Experience, Projects, or Skills entries dynamically.  
  - Real-time validation for empty fields and character length (e.g., Name ≤ 50 characters).  

- **Live Preview**  
  - Two-pane layout:  
    - Left pane → Form inputs  
    - Right pane → Live resume preview  
  - Auto-updates as you type.  

- **Styling Options**  
  - Minimal and clean design with a professional look.  
  - Custom header with name and contact details.  
  - Sections styled with consistent headings.  

- **Export**  
  - Print-friendly layout.  
  - Users can use **Ctrl+P** / **Save as PDF** to export a clean resume without extra UI elements.  

---

## Tech Stack

- **HTML5** for structure  
- **CSS3** for styling (responsive + print-friendly layout)  
- **JavaScript** for dynamic behavior, localStorage saving, and live preview  

---

## Usage

1. Clone or download the repository.  
   ```bash
   git clone https://github.com/your-username/resume-builder.git
   cd resume-builder
