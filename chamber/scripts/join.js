const nav = document.querySelector('#main-nav');
const menuBtn = document.querySelector('#menu-btn');

// mobile toggle
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Timestamp displaying in the Thank you HTML
document.getElementById("timestamp").value = new Date().toLocaleString();

// Modal manipulation
const modalLinks = document.querySelectorAll("[data-modal]");
const dialogs = document.querySelectorAll("dialog");

modalLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const modal = document.getElementById(link.dataset.modal);
        modal.showModal();
    });
});

dialogs.forEach(dialog => {
    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
    });
});
