const nav = document.querySelector('#main-nav');
const menuBtn = document.querySelector('#menu-btn');

// mobile toggle
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

import { items } from "../data/items.mjs";

const container = document.getElementById("cards-container");

// Generate cards dynamically
items.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.gridArea = `card${index+1}`;
    card.innerHTML = `
        <h2>${item.title}</h2>
        <figure><img src="${item.image}" alt="${item.title}"></figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
    `;
    container.appendChild(card);
});

// Visitor localStorage logic
const msgContainer = document.getElementById("visitor-msg");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    msgContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - parseInt(lastVisit)) / (1000*60*60*24));
    if (days === 0) {
        msgContainer.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        msgContainer.textContent = "You last visited 1 day ago.";
    } else {
        msgContainer.textContent = `You last visited ${days} days ago.`;
    }
}

// Store current visit
localStorage.setItem("lastVisit", now.toString());
