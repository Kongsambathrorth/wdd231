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

    // Randomly select 3 members
    const randomMembers = members.sort(() => 0.5 - Math.random()).slice(0, 3);

    randomMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        card.innerHTML = `
            <img src="../images/${member.image}" alt="${member.name}">
            <div>
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Event listeners for view toggle buttons
document.addEventListener("DOMContentLoaded", () => {
   
    const businessCards = document.getElementById("business-cards");

    if (!businessCards) {
        console.error("Element with ID 'business-cards' not found.");
        return;
    }

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const view = button.dataset.view; // Get the view type (grid or list)
            businessCards.classList.toggle("grid-view", view === "grid");
           

            // Fetch members again to update the view
            fetch('../data/member.json')
                .then(response => response.json())
                .then(members => displayMembers(members))
                .catch(error => console.error('Error fetching members:', error));
        });
    });
});
// Fetch members when the page loads
fetchMembers();