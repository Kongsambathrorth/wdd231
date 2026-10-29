// Select navigation elements
const navList = document.querySelector('.nav-list');
const hamburgerBtn = document.querySelector('#hamburger-btn');

// Toggle menu visibility and accessibility states on click
hamburgerBtn.addEventListener('click', () => {
    // Toggle the 'open' class on both elements
    navList.classList.toggle('open');
    hamburgerBtn.classList.toggle('open');
    
    // Determine current state
    const isOpen = navList.classList.contains('open');
    
    // Update button symbol between '✕' (close) and '☰' (hamburger)
    hamburgerBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    
    // Update accessibility attribute
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
});