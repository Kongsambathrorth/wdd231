const url = 'data/members.json';
const cardsContainer = document.querySelector('#members');
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');

async function getMemberData() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
}

const displayMembers = (members) => {
  cardsContainer.innerHTML = ''; // Clear container

  members.forEach((member) => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    // Convert numeric membership to readable label
    const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
    const levelLabel = levels[member.membership] || 'Member';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="150">
      <h3>${member.name}</h3>
      <p class="tagline">${member.tagline}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <span class="badge level-${member.membership}">${levelLabel}</span>
    `;

    cardsContainer.appendChild(card);
  });
};

// Toggle Grid and List views
gridBtn.addEventListener('click', () => {
  cardsContainer.classList.add('grid');
  cardsContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  cardsContainer.classList.add('list');
  cardsContainer.classList.remove('grid');
});

getMemberData();