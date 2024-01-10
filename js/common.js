// Carga el contenido del navbar y el footer en los contenedores correspondientes
document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
    loadFooter();
});

function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
        });
}

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        });
}
