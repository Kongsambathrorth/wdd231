const hamburgerBtn = document.querySelector('#hamburger-btn');
const navList = document.querySelector('.nav-list');

hamburgerBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
});