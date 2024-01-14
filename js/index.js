document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');

    fetch('./data/products.json')
        .then(response => response.json())
        .then(products => {
            // Mostrar productos a partir del número 13
            for (let i = 16; i < products.length; i++) {
                const product = products[i];

                const card = document.createElement('div');
                card.className = 'item';

                card.innerHTML = `
                    <a href="product-details.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <div class="price">$${product.price.toFixed(2)}</div>
                    </a>
             
                `;

                productList.appendChild(card);
            }
        })
        .catch(error => console.error('Error fetching products:', error));
});

function addCart(productId) {
    // Lógica para agregar productos al carrito
    console.log('Adding product to cart with ID:', productId);
}
document.addEventListener('DOMContentLoaded', function () {
    showModal();
});

// Función para mostrar la ventana emergente
function showModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

// Función para cerrar la ventana emergente
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

// Función para redirigir al usuario al HTML de registro
function redirectToRegistration() {
    window.location.href = './pages/login.html';  // Reemplaza 'registro.html' con la ruta correcta
}