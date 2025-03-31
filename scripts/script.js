
//Update footer with the current year and last modification date
const currentYear = new Date().getFullYear();
document.querySelector('footer p').innerHTML = `&copy; ${currentYear} Timbuktu Chamber of Commerce`;

const lastModified = document.lastModified;
document.getElementById('last-update').textContent = lastModified;

