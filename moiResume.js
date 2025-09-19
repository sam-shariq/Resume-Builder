// Global save function
function saveToLocalStorage(){
            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const phoneField = document.getElementById("phone");
            const addressField = document.getElementById("address");
            const previewText = document.getElementById("previewText");
            
            const data = {
                name: nameField.value, 
                email: emailField.value,
                phone: phoneField.value, 
                address: addressField.value,
                previewText: previewText.innerHTML
            };
            localStorage.setItem("resumeData", JSON.stringify(data));
        }

//first adding already existing form fields[like name, email etc.] into preview
document.addEventListener("DOMContentLoaded",()=>{

    const nameField=document.getElementById("name");
    const emailField=document.getElementById("email");
    const phoneField=document.getElementById("phone");
    const addressField=document.getElementById("address");
    const previewText=document.getElementById("previewText");//used the id written in html here

    nameField.addEventListener("input",()=>{
            if (nameField.value.length > 25) {
                alert("Name cannot be more than 25 characters!");
                nameField.value = nameField.value.slice(0, 25); // trims extra
            }
    });

    function updatePreview() {
        document.getElementById("previewName").textContent = nameField.value || "Your Name";
        document.getElementById("previewEmail").textContent = emailField.value || "your@email.com";
        document.getElementById("previewPhone").textContent = phoneField.value || "1234567890";
        document.getElementById("previewAddress").textContent = addressField.value || "Your City, Country";

        saveToLocalStorage();
    }

    [nameField,emailField,phoneField,addressField].forEach(input=>{
        input.addEventListener("input",updatePreview);
    })

    function loadFromLocalStorage(){
    const saved=localStorage.getItem("resumeData");
    if(saved){
        const data= JSON.parse(saved);//conversion to readable data
        nameField.value=data.name;
        emailField.value=data.email;
        phoneField.value=data.phone;
        addressField.value=data.address;
        previewText.innerHTML=data.previewText;
        }
    }
    loadFromLocalStorage();
    
});

function addSec(type){ //types like 'Edu','Ski' etc
    const container1 = document.querySelector(".col1");
    const previewText = document.getElementById("previewText");

    const newRow=document.createElement("div");
    newRow.classList.add("row");

    let placeholderText = "";
    if (type === "Education") {
        placeholderText = "e.g. 2016-2020:  B.Tech in CSE, JIIT (add : to divide)";
    } else if (type === "Experience") {
        placeholderText = "e.g. 2021-Present:  Software Engineer, Infosys(add : to divide)";
    }else if (type === "Summary") {
    placeholderText = "Short summary about yourself";
    }  else {
        placeholderText = `Enter ${type} details`;
    }

    newRow.innerHTML = `
        <label>${type}:</label>
        <textarea placeholder="${placeholderText}"></textarea>
        <button type="button" class="remove-btn">Remove</button>
    `;
    container1.appendChild(newRow);
    
    const removeBtn = newRow.querySelector(".remove-btn");
    const textarea=newRow.querySelector("textarea");
    const sectionId =  `${type}-section`;

    textarea.addEventListener("input",() => {        //() refers to the whole function written inside{}
        let section = document.getElementById(sectionId);

        if(!section){
            section=document.createElement("div");
            section.id=sectionId;
            previewText.appendChild(section);
        }
        const lines = textarea.value.split("\n").filter(line => line.trim() !== "");

        if (type === "Skills") {// bullet list
           section.innerHTML = `<h3>${type}</h3><ul>${lines.map(l => `<li>${l}</li>`).join("")}</ul>`;
        } 
        else if (type === "Education" || type === "Experience") {// two-column layout: split each line by "|" → left | right
           section.innerHTML = `<h3>${type}</h3>
           <div class="two-col">
           ${lines.map(l => {
            const parts = l.split(":");
            if (parts[0].length > 15) {
                parts[0] = parts[0].slice(0, 15) + "...";  // trim + add "..."
            }
            return `<div class="row2">
            <div class="left">${parts[0] || ""}</div>
            <div class="right">${parts[1] || ""}</div>
            </div>`;
        }).join("")}
        </div>`;
        } 
        else {// normal paragraph
           section.innerHTML = `<h3>${type}</h3>${lines.map(l => `<p>${l}</p>`).join("")}`;
        }

        saveToLocalStorage();
    });     //here is the finishing round bracket of the func textarea
    
    removeBtn.addEventListener("click", () => {
        const section = document.getElementById(sectionId);
        if (section) section.remove();   // Remove from preview
        newRow.remove();                // Remove from form
        saveToLocalStorage();
    });

    function saveToLocalStorage(){
        localStorage.setItem("resumeHTML",previewText.innerHTML);
    }
    
}

function printResume() {
            // Replace icons with text fallbacks before printing
            document.querySelectorAll('.fa-solid').forEach(icon => {
                const textFallback = document.createElement('span');
                textFallback.textContent = icon.getAttribute('data-icon');
                textFallback.style.marginRight = '5px';
                icon.parentNode.replaceChild(textFallback, icon);
            });
            
            // Wait a moment for DOM changes to take effect
            setTimeout(() => {
                window.print();
                
                setTimeout(restoreIcons, 500);
            }, 100);
}