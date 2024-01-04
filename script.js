// Seleccionamos elementos del DOM
let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let products = null;
let listCart = [];

// Agregamos un evento al hacer clic en el icono del carrito para mostrar/ocultar el carrito
iconCart.addEventListener('click', function () {
    // Si el carrito está oculto, lo mostramos; de lo contrario, lo ocultamos
    if (cart.style.right == '-100%') {
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
});

// Agregamos un evento al hacer clic en el botón de cerrar para ocultar el carrito
close.addEventListener('click', function () {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
});

// Realizamos una solicitud para obtener los productos desde un archivo JSON
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        // Almacenamos los productos en la variable products
        products = data;
        // Llamamos a la función para cargar los productos en el HTML
        addDataToHTML();
    });

// Función para cargar los productos en el HTML
function addDataToHTML() {
    // Seleccionamos el contenedor de la lista de productos
    let listProductHTML = document.querySelector('.listProduct');
    // Limpiamos el contenido existente en el contenedor
    listProductHTML.innerHTML = '';

    // Verificamos si hay productos disponibles
    if (products != null) {
        // Iteramos sobre cada producto y creamos elementos HTML para mostrarlos
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>`;

            // Agregamos el nuevo producto al contenedor de la lista de productos
            listProductHTML.appendChild(newProduct);
        });
    }
}

// Función para agregar productos al carrito
function addCart($idProduct) {
    // Creamos una copia de los productos para evitar modificaciones no deseadas
    let productsCopy = JSON.parse(JSON.stringify(products));
    // Buscamos si el producto ya está en el carrito
    let cartProduct = listCart.find(product => product && product.id == $idProduct);

    // Si el producto no está en el carrito, lo agregamos
    if (!cartProduct) {
        cartProduct = productsCopy.find(product => product.id == $idProduct);
        cartProduct.quantity = 1;
        listCart.push(cartProduct);
    } else {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        cartProduct.quantity++;
    }

    // Llamamos a la función para actualizar la vista del carrito en el HTML
    addCartToHTML();
}

// Función para cargar y actualizar la vista del carrito en el HTML
function addCartToHTML() {
    // Seleccionamos el contenedor de la lista del carrito
    let listCartHTML = document.querySelector('.listCart');
    // Limpiamos el contenido existente en el contenedor
    listCartHTML.innerHTML = '';

    // Seleccionamos el elemento que muestra la cantidad total de productos en el carrito
    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    // Verificamos si hay productos en el carrito
    if (listCart) {
        // Iteramos sobre cada producto en el carrito y creamos elementos HTML para mostrarlos
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / ${product.quantity} product${product.quantity > 1 ? 's' : ''}</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;

                // Agregamos el nuevo producto al contenedor de la lista del carrito
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
            }
        });
    }

    // Actualizamos la cantidad total de productos en el carrito
    totalHTML.innerText = totalQuantity;
}

// Función para cambiar la cantidad de un producto en el carrito
function changeQuantity($idProduct, $type) {
    // Buscamos el índice del producto en el carrito
    let cartProductIndex = listCart.findIndex(product => product && product.id == $idProduct);

    // Verificamos si el producto está en el carrito
    if (cartProductIndex !== -1) {
        // Obtenemos el producto del carrito
        let cartProduct = listCart[cartProductIndex];

        // Realizamos la acción correspondiente (incrementar o decrementar la cantidad)
        switch ($type) {
            case '+':
                cartProduct.quantity++;
                break;
            case '-':
                cartProduct.quantity--;

                // Si la cantidad es menor o igual a cero, eliminamos el producto del carrito
                if (cartProduct.quantity <= 0) {
                    // Eliminar el producto del carrito
                    listCart.splice(cartProductIndex, 1);
                }
                break;
            default:
                break;
        }
    }

    // Llamamos a la función para actualizar la vista del carrito en el HTML
    addCartToHTML();
}
