// Get the current year for the copyright
const currentYearSpan = document.querySelector('#currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Get the document's last modified date and insert it into the footer
const lastModifiedSpan = document.querySelector('#lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}