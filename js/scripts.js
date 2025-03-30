// Get the current date
const currentDate = new Date();

// Format the date as "MM/DD/YYYY HH:MM:SS"
const formattedDate = currentDate.toLocaleString();

// Update the footer with the current date
document.getElementById("last-update").textContent = formattedDate;


//Update footer with the current year and last modification date
const currentYear = new Date().getFullYear();
document.querySelector('footer p').innerHTML = `&copy; ${currentYear} 🌺 Sambathrorth 🌺 Kandal Province`;

const lastModified = document.lastModified;
document.getElementById('last-update').textContent = lastModified;