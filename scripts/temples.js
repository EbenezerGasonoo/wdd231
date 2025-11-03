
document.getElementById("currentyear").textContent = new Date().getFullYear();
        

document.getElementById("lastModified").textContent = document.lastModified;


const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('nav ul');


hamburger.addEventListener('click', () => {
    menu.classList.toggle('visible');  
    if (menu.classList.contains('visible')) {
        hamburger.innerHTML = 'X';  
        hamburger.innerHTML = '&#9776;';  
    }
});
