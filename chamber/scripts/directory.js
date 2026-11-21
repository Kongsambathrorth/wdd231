const url = 'data/members.json';
const cardsContainer = document.querySelector('#business-cards');
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');

async function getMemberData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error fetching member data:', error);
  }
}

const displayMembers = (members) => {
  cardsContainer.innerHTML = ''; // Clear container

  members.forEach((member) => {
    const card = document.createElement('section');
    card.classList.add('business-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p class="tagline">${member.tagline}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
    `;

    cardsContainer.appendChild(card);
  });
};

// Toggle Grid and List views
if (gridBtn && listBtn) {
  gridBtn.addEventListener('click', () => {
    cardsContainer.classList.add('grid');
    cardsContainer.classList.remove('list');
  });

  listBtn.addEventListener('click', () => {
    cardsContainer.classList.add('list');
    cardsContainer.classList.remove('grid');
  });
}

// Run function on page load
getMemberData();