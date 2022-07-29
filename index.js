class Database{
    constructor({products=[], users=[]}){
       this.users=users;
       this.products=products;
    }

    addProduct(...products){
        this.products.push(...products);
        localStorage.setItem('database',JSON.stringify(this));
    }
    addUser(user){
        this.users.push(user);
        localStorage.setItem('database',JSON.stringify(this));
    }
}


class Cart{
    constructor({
        ID,
        products=[],
        subtotal=0,
        dueno,
    }){

        this.ID=ID;
        this.dueno=dueno;        
        this.products=products;
        this.subtotal=subtotal;
    }
    

    endShopSpree() {
		alert(`Por favor, pagar en caja $${this.subtotal}`);
		this.products = [];
		this.subtotal = 0;

		localStorage.removeItem('cart');
		renderizarCarrito(this);
	}
    

   addProduct(ID, quantity=1){
    const product=database.products.find((p)=>p.ID===ID);

    if(!product){
        return alert('El producto que estás agregando no existe')
    }

    if(product.stock>=quantity){
        const precio=quantity*product.precio;

        this.subtotal=this.subtotal+precio;

        product.stock=product.stock-quantity;

        const productInCart=this.products.find((p)=>p.ID===ID);

        if(productInCart){
            productInCart.quantity+=quantity;
        }
        else{
            
        this.products.push({
            ID,
            quantity,
         }) ;

        }
        localStorage.setItem('cart', JSON.stringify(this));

         renderizarProductos(this);
         renderizarCarrito(this);
         localStorage.setItem('database', JSON.stringify(database));
     }
     else{
       alert('NO HAY MÁS STOCK');
    }
     
  }
    
   removeProduct(ID){ 
    //product o products(en js de kenny está como products)
    const products=this.products.find((p)=>p.ID ===ID);
    
    const productdb=database.products.find((p)=>p.ID===ID);

    if(!products){
        return alert('No existe el producto que estás intentando eliminar');

    }
    
    productdb.stock++;

    this.subtotal=this.subtotal-productdb.precio;

    if(products.quantity>1){
    products.quantity--;

   }

   else{
    this.products=this.products.filter((product)=>product.ID!==ID);
   }

   localStorage.setItem('cart', JSON.stringify(this));
		localStorage.setItem('database', JSON.stringify(database));

	renderizarProductos(this);
	renderizarCarrito(this);

    
}

}

class Product{
    constructor({ID,precio,stock=0,nombre,image,descripcion}){
          this.ID=ID;
          this.precio=precio;
          this.stock=stock;
          this.nombre=nombre;
          this.image=image;
          this.descripcion=descripcion;
    }
    
update({precio,stock,nombre=this.nombre,image=this.image,descripcion=this.descripcion}){
    this.precio=precio?? this.precio;
    this.stock=stock?? this.stock;
    this.nombre=nombre;
    this.image=image;
    this.descripcion=descripcion;
        
}

}


const Masajes=new Product({
    ID:1,
    precio:1500,
    stock:50,
    nombre:'Sesión de masajes',
    image:'masajes.jpeg',
    descripcion:'Rutina de masajes con piedras calientes y aceites,con una duración de 25 minutos.'
});
const PeelingFacial=new Product({
    ID:2,
    precio:1000,
    stock:50,
    nombre:'Peeling Facial',
    image:'peeling.jpg',
    descripcion:'Colocación de ácido de acuerdo a tu tipo de piel, ayudando a mejorar el aspecto y vitalidad del rostro.'
});
const DepilacionDefinitiva=new Product({
    ID:3,
    precio:700,
    stock:100,
    nombre:'Depilación Definitiva',
    image:'depilacion.jpg',
    descripcion:'Ayuda a tener una piel libre de vellos, con una notable suavidad.El precio es por zona'
});

const LimpiezaFacial=new Product({
    ID:4,
    precio:850,
    stock:50,
    nombre:'Limpieza Facial',
    image:'limpiezaFacial.jpg',
    descripcion:'Remueve las células muertas,elimina impurezas y con la colocación de productos ayudan a disminuir la apariencia de cansancio.'
});

const Criolipolisis=new Product({
    ID:5,
    precio:1700,
    stock:80,
    nombre:'Criolipólisis',
    image:'criolipolisis.png',
    descripcion:'Técnica que elimina las células adiposas mediante el enfriamiento y con una aplicación superficial.'
});
const MáscarasFacialesExfoliacion=new Product({
    ID:6,
    precio:850,
    stock:50,
    nombre:'Máscaras faciales+  exfoliación',
    image:'mascara.jpg',
    descripcion:'Selección de productos de excelente calidad, para mejorar el aspecto del rostro, mediante máscaras y exfoliación para eliminar impurezas.'
});

const Alisado=new Product({
    ID:7,
    precio:2500,
    stock:80,
    nombre:'Alisado',
    image:'alisado.jpg',
    descripcion:'Si te gusta el pelo super lacio, es una excelente opción optar por este tratamiento capilar.'
});

const CorteCabello=new Product({
    ID:8,
    precio:1300,
    stock:50,
    nombre:'Corte de cabello',
    image:'cortePelo.jpg',
    descripcion:'Un cambio de look o las puntas, el corte que desees.'
});
const Reflejos=new Product({
    ID:9,
    precio:3300,
    stock:50,
    nombre:'Reflejos',
    image:'reflejos.jpg',
    descripcion:'Tener mechitas de otro colo te cambia totalmente tu look, animate!'
});
const Nutricion=new Product({
    ID:10,
    precio:1800,
    stock:50,
    nombre:'Nutrición',
    image:'nutricion.jpg',
    descripcion:'Tratamiento capilar que consiste en la colocación de un producto que nutre tu cabello, haciendolo lucir brilloso y sano.'
});
const Peinado=new Product({
    ID:11,
    precio:2000,
    stock:50,
    nombre:'Peinado',
    image:'peinado.jpg',
    descripcion:'Si tenés un evento y querés lucir espléndida,es el mejor lugar para seleccionar un peinado y tenerlo como lo imaginaste.'
});
const LavadoPlanchita=new Product({
    ID:12,
    precio:2000,
    stock:50,
    nombre:'Lavado+Planchita',
    image:'planchita.jpg',
    descripcion:'Un combo que te salva cuando no llegás a tiempo o sólo querés un mimo.'
});
const RutinaPersonalizada=new Product({
    ID:13,
    precio:3000,
    stock:50,
    nombre:'Rutina Personalizada',
    image:'personalTrainer.jpg',
    descripcion:'De acuerdo a tus objetivos se elabora una rutina de entrenamiento , con seguimiento de un mes.'
});
const GAP=new Product({
    ID:14,
    precio:2500,
    stock:50,
    nombre:'GAP',
    image:'gap.jpg',
    descripcion:'Rutinas especializadas en glúteos, abdominales y piernas, 3 clases por semana'
});
const Cardio=new Product({
    ID:15,
    precio:2300,
    stock:50,
    nombre:'Cardio',
    image:'cardio.jpg',
    descripcion:'Entrenamiento fuerte y adaptado a cada persona, enfocadas en ejercitar todo el cuerpo. 3 veces a la semana.'
});
const RitmosLatinos=new Product({
    ID:16,
    precio:2000,
    stock:50,
    nombre:'Ritmos latinos',
    image:'latinos.jpg',
    descripcion:'Bailar es igual a ejercitarse, disfrutando música divertida y del momento. 2 veces a la semana.'
});

const Elasticidad=new Product({
    ID:17,
    precio:2400,
    stock:50,
    nombre:'Elasticidad',
    image:'elasticidad.jpg',
    descripcion:'Si querés practicar ejercicios que involucren la elasticidad, esta es tu oportunidad.2 clases semanales.'
});
const BrazosAbdomen=new Product({
    ID:18,
    precio:2300,
    stock:50,
    nombre:'Brazos y abdomen',
    image:'brazos.jpg',
    descripcion:'Para combinar con otras rutinas y poder agregar estas partes del cuerpo que tanto cuestan tonificar.'
});

const Automaquillaje=new Product({
    ID:19,
    precio:2000,
    stock:50,
    nombre:'Automaquillaje',
    image:'automaquillaje.jpg',
    descripcion:'Es una clase a la semana durante un mes, para aprender maquillajes para el día y la noche.'
});
const MaquillajeNoche=new Product({
    ID:20,
    precio:1700,
    stock:50,
    nombre:'Maquillaje de noche',
    image:'maquillajeNoche.jpg',
    descripcion:'Especializado en este tipo de maquillaje, que muchas veces nos hace renegar. 1 clase por semana, durante un mes.'
});
const MaquillajeDia=new Product({
    ID:21,
    precio:1500,
    stock:50,
    nombre:'Maquillaje de día',
    image:'maquillajeDia.jpg',
    descripcion:'Aprender que colores se recomiendan, texturas y diferentes opciones para elegir. 1 clase a la semana durante un mes.'
});
const BookFotos=new Product({
    ID:22,
    precio:3500,
    stock:50,
    nombre:'Book de fotos',
    image:'book.jpg',
    descripcion:'Si tenés un evento, fiesta y querés lucir bien en todas las fotos, tenés este servicio a tu disposición y super personalizado.'
});
const Desfile=new Product({
    ID:23,
    precio:2200,
    stock:50,
    nombre:'Desfile',
    image:'desfile.jpg',
    descripcion:'Tus modelos relucientes con los maquillajes que te imaginaste.'
});

const Fiestas=new Product({
    ID:24,
    precio:2200,
    stock:50,
    nombre:'Fiesta de 15/Bodas/Egresos',
    image:'eventos.jpg',
    descripcion:'Para que te sientas una persona mucho más hermosa de lo que sos , en estos eventos tan importantes.'
});

const RebajaEstetica=new Product({
    ID:25,
    precio:2500,
    stock:15,
    nombre:'Depilación láser 4 zonas',
    image:'depilacion.jpg',
    descripcion:'Tratamiento de depilación para cuatro zonas a elección'
});

const RebajaPelu=new Product({
    ID:26,
    precio:4000,
    stock:15,
    nombre:'Reflejos + corte de cabello',
    image:'reflejos.jpg',
    descripcion:'Si querés deslumbrar con un cambio de look es tu oportunidad.'
});

const RebajaEntrenamiento=new Product({
    ID:27,
    precio:3500,
    stock:15,
    nombre:'GAP+ Brazos y abdomen',
    image:'brazos.jpg',
    descripcion:'Es una excelente combinación para ayudar a tu cuerpo a estar más saludable y con más energía.'
});
const RebajaMaquillaje=new Product({
    ID:28,
    precio:3500,
    stock:15,
    nombre:'Automaquillaje + maquillaje de día',
    image:'automaquillaje.jpg',
    descripcion:'Aprender a maquillarse es una herramienta que nunca te vas a arrepentir.'
});



const dbExistente=localStorage.getItem('database');

const database=dbExistente?new Database(JSON.parse(dbExistente)): new Database({});

if(!dbExistente){
    database.addProduct(Masajes,PeelingFacial, DepilacionDefinitiva, LimpiezaFacial, Criolipolisis, MáscarasFacialesExfoliacion,Alisado,CorteCabello,Reflejos,Nutricion,Peinado,LavadoPlanchita,RutinaPersonalizada,GAP,Cardio,RitmosLatinos,Elasticidad,BrazosAbdomen,Automaquillaje,MaquillajeNoche,MaquillajeDia,BookFotos,Desfile,Fiestas,RebajaEstetica,RebajaPelu,RebajaEntrenamiento,RebajaMaquillaje);
};


let 
   
    productosEstetica=  [database.products[0],database.products[1],database.products[2],database.products[3],database.products[4],database.products[5]]

    productosPeluqueria= [database.products[6],database.products[7],database.products[8],database.products[9],database.products[10],database.products[11]]

    productosEntrenamientos= [database.products[12],database.products[13],database.products[14],database.products[15],database.products[16],database.products[17]]

    productosMaquillaje= [database.products[18],database.products[19],database.products[20],database.products[21],database.products[22],database.products[23]]

    productosRebajas= [database.products[24],database.products[25],database.products[26],database.products[27]];




