import { saveFilter, getFilter } from './storage.js';

const container = document.querySelector('#clinicsContainer');
const filterSelect = document.querySelector('#filter');
const modal = document.querySelector('#clinicModal');
const modalContent = document.querySelector('#modalContent');
const closeModal = document.querySelector('#closeModal');

async function getClinics() {
  try {
    const response = await fetch('data/clinics.json');
    if (!response.ok) throw new Error("Data failed");
    const data = await response.json();
    initialize(data);
  } catch (error) {
    container.innerHTML = `<p>Error loading data.</p>`;
  }
}

function initialize(data) {
  const districts = [...new Set(data.map(c => c.district))];
  districts.forEach(d => {
    filterSelect.innerHTML += `<option value="${d}">${d}</option>`;
  });

  displayClinics(data);

  filterSelect.addEventListener('change', () => {
    saveFilter(filterSelect.value);
    const filtered = filterSelect.value === "all"
      ? data
      : data.filter(c => c.district === filterSelect.value);
    displayClinics(filtered);
  });
}

function displayClinics(clinics) {
  container.innerHTML = '';
  clinics.forEach(clinic => {
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${clinic.name}</h3>
      <p>${clinic.services}</p>
      <p>${clinic.district}</p>
      <button>View Details</button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      modalContent.innerHTML = `
        <h2>${clinic.name}</h2>
        <p><strong>District:</strong> ${clinic.district}</p>
        <p><strong>Services:</strong> ${clinic.services}</p>
        <p><strong>Phone:</strong> ${clinic.phone}</p>
        <p><strong>Address:</strong> ${clinic.address}</p>
      `;
      modal.showModal();
    });
    container.appendChild(card);
  });
}

closeModal.addEventListener('click', () => modal.close());

getClinics();
