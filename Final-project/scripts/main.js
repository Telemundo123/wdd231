const navbutton = document.querySelector("#ham-btn");
const navlinks = document.querySelector("#nav-links");


navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navlinks.classList.toggle("show");
})


// Date update, current year and last modified
const currentYear = document.getElementById ("currentyear");
const lastModified = document.getElementById ("lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = "last Modified:" + document.lastModified;
