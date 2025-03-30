// Fetch and display member data
async function fetchMembers() {
    const response = await fetch('../data/member.json');
    const members = await response.json();
    displayMembers(members);
}

// Display members in the business directory
function displayMembers(members) {
    const container = document.getElementById('business-cards');
    container.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        card.innerHTML = `
            <img src="../images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

// Toggle between grid and list views
function toggleView(view) {
    const container = document.getElementById('business-cards');
    if (view === 'grid') {
        container.classList.remove('list-view');
        container.classList.add('grid-view');
    } else if (view === 'list') {
        container.classList.remove('grid-view');
        container.classList.add('list-view');
    }
}

// Event listeners for view toggle buttons
document.getElementById('grid-view').addEventListener('click', () => toggleView('grid'));
document.getElementById('list-view').addEventListener('click', () => toggleView('list'));