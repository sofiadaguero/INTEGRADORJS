const productList=document.getElementById('lista-productos');
const contenedorCarrito=document.getElementById('contenedorCarrito');
const iconoCarrito=document.querySelector('.iconoCarrito');
const listadoCarrito= document.querySelector("listadoCarrito");
const finalPrice= document.getElementById('totalProducts');
const botonFinalizar=document.getElementById('finish');
const finish = document.getElementById('finish');



let baseDatos=database.products;
const render = document.getElementById('lista-productos');
const input = document.getElementById('buscador');
const botonBuscar=document.querySelector('.botonBuscador');

const seccionPresentacion=document.querySelector(".presentacion-s");
const titulo=document.querySelector(".titulo");
const descripcionTitulo=document.querySelector(".descripcion");



const renderizarCarrito=(carrito)=>{
    console.log(carrito.subtotal);

    while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}

    while (finalPrice.firstChild) {
		finalPrice.removeChild(finalPrice.firstChild);
	}
   
    

    if (!carrito.products.length) {
		const msgCarritoVacio = document.createElement('div');

		msgCarritoVacio.classList.add('emptyProductsMessage');

		const msgCarritoVacioText = document.createTextNode('No tienes productos seleccionados');

		msgCarritoVacio.appendChild(msgCarritoVacioText);

		contenedorCarrito.appendChild(msgCarritoVacio);
        
		return;
	}
    
    
	
   
    
    carrito.products.forEach((product)=>{
        const DatabaseProductos=database.products.find((p)=> p.ID===product.ID);

        

        const cartItem=document.createElement('div');     
        cartItem.classList.add('cart-item');
        const cartItemContent=document.createElement('div');   
        cartItemContent.classList.add('cart-item-content');

    
        const nombreProducto=document.createElement('span');
        nombreProducto.classList.add('cart-item-nombre');
        const nombreProductoText=document.createTextNode(` ${DatabaseProductos.nombre}`);
        nombreProducto.appendChild(nombreProductoText);
        
        const itemPrecio=document.createElement('div');
        
        itemPrecio.classList.add('cart-item-precio');
        const precio=document.createElement('span');
        const precioText=document.createTextNode(`$  ${DatabaseProductos.precio}`);
        precio.appendChild(precioText);

       const containerButton = document.createElement('div');
       containerButton.classList.add('botonesAD');

		const botonDisminuir = document.createElement('button');
        botonDisminuir.classList.add('botonDisminuir');
		const botonTextDisminuir = document.createTextNode('-');

		botonDisminuir.appendChild(botonTextDisminuir);

		botonDisminuir.addEventListener('click', (e) => carrito.removeProduct(product.ID));

		const botonAumentar = document.createElement('button');
        botonAumentar.classList.add('botonAumentar');
		const botonTextAumentar = document.createTextNode('+');
		botonAumentar.appendChild(botonTextAumentar);
		botonAumentar.addEventListener('click', (e) => carrito.addProduct(product.ID));
		containerButton.appendChild(botonDisminuir);
		containerButton.appendChild(botonAumentar);
    
    
        const quantity=document.createElement('span');
        quantity.classList.add('cart-item-cantidad');
        const quantityText=document.createTextNode(product.quantity);
        quantity.appendChild(quantityText);
    
        cartItemContent.appendChild(quantity);
        cartItemContent.appendChild(nombreProducto);    
        itemPrecio.appendChild(precio);
        
        cartItem.appendChild(cartItemContent);
        cartItemContent.appendChild(itemPrecio);

        cartItemContent.appendChild(containerButton);


        contenedorCarrito.appendChild(cartItem);

     

        
    });

    const finalPriceText = document.createTextNode(`Total: $ ${carrito.subtotal}`);
    finalPrice.classList.add('DivTotal');
	finalPrice.appendChild(finalPriceText);
    contenedorCarrito.appendChild(finalPrice);
    

    if (!carrito.products.length) {
		finish.classList.add('disabled-boton');
		finish.textContent = 'Tu carrito está vacío';
	} else {
		finish.classList.remove('disabled-boton');
		finish.textContent = 'Finalizar compra';
	}
    
    contenedorCarrito.appendChild(botonFinalizar);



    
};



const renderizarProductos=(carrito)=>{
//Esta sección permite que no se sigan agregando los mismos productos con el stock modificado/actualizado, sino que se modifiquen en la misma sección del producto.
    while(productList.firstChild){
        productList.removeChild(productList.firstChild);
    }

    database.products.forEach((product)=>{
        const item=document.createElement('li');
    
        const image = document.createElement('img');
        image.setAttribute('src', product.image);
    
        const nombre=document.createElement('span');
        nombre.classList.add('nombresProductos');
        const textnombre=document.createTextNode(product.nombre);
    
        nombre.appendChild(textnombre);
    
        const descripcion=document.createElement('span');
        descripcion.classList.add('descripcionProductos');
        const textdescripcion=document.createTextNode(product.descripcion);
    
        descripcion.appendChild(textdescripcion);
    
        const precio=document.createElement('span');
        precio.classList.add('precioStock');
        const textprecio=document.createTextNode(`Precio: 
        $${product.precio}
         Stock:${product.stock}`);
    
        precio.appendChild(textprecio);
    
        const boton=document.createElement('button');
        boton.classList.add('botonAgregar');
        const textboton=document.createTextNode('Agregar al carrito');

        if(product.stock===0){
            boton.classList.add('disabled-boton');
            boton.setAttribute('disabled',true);
            textboton.textContent="No hay más stock";
        }        
    
        boton.appendChild(textboton);
        
        boton.addEventListener('click',(e)=>{
            carrito.addProduct(product.ID,1);

            console.log(carrito);
        });
    
    
        item.appendChild(image);
        item.appendChild(nombre);
        item.appendChild(descripcion);
        item.appendChild(precio);    
        item.appendChild(boton);
    
    
        productList.appendChild(item);
    
       
    
    });
};
////////////////////////////////////////////////////////////////////////


(()=>{

    iconoCarrito.addEventListener( 'click',mostrarOcultar);
    
     
 })();

 
 function mostrarOcultar(div){
    contenedorCarrito.classList.toggle("mostrar");
};






/////////////////////////////////////////////////////////////////////

 //Input funcional, pero no se puede agregar al carrito :(


botonBuscar.addEventListener('click',()=>{

   
       let valorIngresado = input.value.toLowerCase();     

       const productoElegido = baseDatos.find((productos) => productos.nombre.toLowerCase() === valorIngresado);     

       if(productoElegido === undefined){
        render.innerHTML =
        `
                 <h3 class="errorBusqueda">El producto "${valorIngresado}", no se encuentra disponible, intentalo nuevamente.<h3>  
        `
        input.value="";
        
    }
    else{
        
        input.value="";
        render.innerHTML =
    `
        <div class="lista-productos">
           <li>
              <img src="${productoElegido.image}">
              
              <span class="nombresProductos">${productoElegido.nombre}</span>     

              <span class="descripcionProductos">${productoElegido.descripcion}</span>     

              <span class="precioStock">Precio: $ ${productoElegido.precio} <br>
              Stock: ${productoElegido.stock}</span>
                  

              <button class="botonAgregar">Agregar al carrito</button>     

          </li>     

         </div>
         `     

    }
});


/////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded',(e)=>
{ 

    const carritoExistente=  localStorage.getItem('cart');
  
       
    //Permite recuperar los métodos del carrito(AddProduct-removeProduct,etc)
    const carrito=carritoExistente? new Cart (JSON.parse(carritoExistente)):new Cart({dueno: ""});

    localStorage.setItem('cart', JSON.stringify(carrito));



    renderizarCarrito(carrito);
    renderizarProductos(carrito);

    finish.addEventListener('click', () => {
		carrito.endShopSpree();
	}); 

   
});
