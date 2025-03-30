

async function fetchMembers() {
    try {
        const response = await fetch('../data/member.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        // Display an error message to the user
        document.getElementById('business-cards').innerHTML = '<p>Error loading member data.</p>';
    }
}

// Display members in the business directory
function displayMembers(members) {
    const container = document.getElementById('business-cards');
    container.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');

        if (container.classList.contains('list-view')) {
            // List view formatting
            card.innerHTML = `
                <img src="../images/${member.image}" alt="${member.name}">
                <div>
                    <h3>${member.name}</h3>
                    <p>${member.address}, ${member.phone}, <a href="${member.website}" target="_blank">Visit Website</a></p>
                </div>
            `;
            card.style.display = "flex";
            card.style.alignItems = "center";
        } else {
            // Grid view formatting
            card.innerHTML = `
                <img src="../images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
        }
        container.appendChild(card);
    });
}

// Event listeners for view toggle buttons
document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".view-toggle button");
    const businessCards = document.getElementById("business-cards");

    if (!businessCards) {
        console.error("Element with ID 'business-cards' not found.");
        return;
    }

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const view = button.dataset.view; // Get the view type (grid or list)
            businessCards.classList.toggle("grid-view", view === "grid");
            businessCards.classList.toggle("list-view", view === "list");
        });
    });
});

// Fetch members when the page loads
fetchMembers();