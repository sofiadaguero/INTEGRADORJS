const carro= new  Carrito();
const carrito =document.querySelector('.carrito');
const productos=document.querySelector('.productos');
const listaProductos=document.querySelector( '.lista-carrito tbody');

cargarEventos();

function cargarEventos(){
    productos.addEventListener('click', (e)=>
    {carro.comprarProducto(e)});
}

