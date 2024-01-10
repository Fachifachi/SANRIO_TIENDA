document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos el id del producto de la consulta en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Obtenemos el producto correspondiente del JSON
    fetch('./data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Buscamos el producto con el id correspondiente
            const selectedProduct = data.find(product => product.id === productId);

            // Mostramos la información del producto en la página de detalles
            if (selectedProduct) {
                document.getElementById('producto-imagen').src = selectedProduct.image;
                document.getElementById('producto-nombre').innerText = selectedProduct.name;
                document.getElementById('producto-precio').innerText = `$${selectedProduct.price}`;
            } else {
                console.error(`Error: Producto con id ${productId} no encontrado en el JSON.`);
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
