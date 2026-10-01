// 1. Correct the URL to match where your file actually is
const url = '/chamber/data/members.json';

async function getMemberData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Could not fetch data');
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error(error);
        const container = document.getElementById('business-cards');
        if (container) {
            container.innerHTML = `<p class="error">Error loading member data: ${error.message}</p>`;
        }
    }
}

function displayMembers(members) {
    const cards = document.getElementById('business-cards');
    if (!cards) return; // Safety check

    cards.innerHTML = "";

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('business-card');

        // Note: Ensure your images are in the /images/ folder
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <div class="card-details">
                <h3>${member.name}</h3>
                <p class="address">${member.address}</p>
                <p class="phone">${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="membership">Level: ${getMembershipName(member.membershipLevel)}</p>
            </div>
        `;
        cards.appendChild(card);
    });
}

// Helper function to make membership levels readable
function getMembershipName(level) {
    const levels = { 1: "Member", 2: "Silver", 3: "Gold" };
    return levels[level] || "Non-Profit";
}

// Logic for Grid vs List Toggle
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#business-cards");

if (gridbutton && listbutton && display) {
    gridbutton.addEventListener("click", () => {
        // These classes should match your CSS selectors exactly
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
        display.classList.add("list");
        display.classList.remove("grid");
    });
}

// Only call the function once
getMemberData();