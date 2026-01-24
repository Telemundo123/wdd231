const container = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const nav = document.querySelector('#main-nav');
const menuBtn = document.querySelector('#menu-btn');

// mobile toggle
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// layout toggle
gridBtn.addEventListener('click', () => {
  container.classList.add('grid-view');
  container.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list-view');
  container.classList.remove('grid-view');
});

// fetch data
async function loadMembers() {
  const res = await fetch('data/members.json');
  const data = await res.json();
  displayMembers(data);
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach(m => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${m.image}" alt="${m.name}">
      <span class="badge ${m.levelClass}">${m.level}</span>
      <h3>${m.name}</h3>
      <p>${m.tagline}</p>
      <p>${m.phone}</p>
      <p><a href="${m.url}" target="_blank">${m.url}</a></p>
      <p>${m.address}</p>
    `;

    container.appendChild(card);
  });
}

loadMembers();

// footer dates
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;
