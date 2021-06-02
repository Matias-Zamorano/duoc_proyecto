

tinymce.init({
    selector: '#mensaje-txt', //El selector es el el cuadrado de escritura que se guarda como textarea// 
    height: 200,//ve el largo del cuadrado de texto//
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

const registros=[]; //arreglo de javascript
const elmininar = async function(){

    let respuesta = await Swal.fire({
        title:"Desea eliminar esta solicitud?",
        showCancelButton: true,
        confirmButtonText:"Eliminar"
    });

    // La persona dijo que si ? , entonces que realice todo este proceso
    if(respuesta.isConfirmed){

        //1.Saber que boton fue el que se apreto
        //2.Sacar el nro del boton
        let nro = this.nro;
        //3.Eliminar el pokemon de la lista
        registros.splice(nro,1);
        //4.Recargar la tabla 
        cargarTabla();
    
    // y si la persona  dijo que no ? 
    }else{
        Swal.fire("Operacion cancelada");
    }
};

const cargarTabla=()=>{

    let tbody =document.querySelector("#tbody-registro");
    tbody.innerHTML="";

    for(let i=0; i < registros.length; ++ i){
        let r = registros[i];

        let tr=document.createElement("tr");
        let tdNombre=document.createElement("td");
        let tdTipo=document.createElement("td");
        let tdMensaje =document.createElement("td");
        let tdNro=document.createElement("td");
        let tdAcciones=document.createElement("td");

        tdNombre.innerText = r.Nombre;

         //esto mostraria el icono en ves de un numero al momento de elegir el tipo de pokemon
         let icono = document.createElement("i");
         //Si elige el 1  agregar el icono agua o :
         if(r.tipo == "1"){
             icono.classList.add("far","fa-address-book","fa-2x");//<i class="far fa-address-book"></i>
         
         //En el caso de que eliga el 2 agregar el icono fuego 
         } else if (r.tipo == "2"){
             icono.classList.add("fas","fa-user-edit","text-danger","fa-2x");//<i class="fas fa-user-edit"></i>

         //En el caso de que eliga el 3 agregar el icono planta
         } else if (r.tipo == "3"){
             icono.classList.add("fas","fa-user-cog","text-success","fa-2x");//<i class="fas fa-user-cog"></i>
         
         //En el caso de que eliga el 4 agregar el icono electro
         }else{
             icono.classList.add("fas","fa-user-alt-slash","text-warning","fa-2x");//<i class="fas fa-user-alt-slash"></i>
         }
         tdTipo.classList.add("text-center");
         tdTipo.appendChild(icono);
         
         tdMensaje.innerHTML = r.mensaje;
         tdNro.innerText = i + 1;

         //como agrego un boton para las acciones?
         let boton = document.createElement("button");   // Creo el boton
         boton.nro = i;                                  // guardar cualquier cosa en un elemento HTML
         boton.addEventListener("click",eliminar)        // al apretar el click dara un funcion que es eliminar
         boton.innerText = "Eliminar registro mandado";  // Agrego informacion al boton
         boton.classList.add("btn","btn-danger")         // Hace que el boton sea rojo
         tdAcciones.classList.add("text-center");        // Hace que el mensaje este centrado
         tdAcciones.appendChild(boton);                  // Agrego el boton al td

         //como hacer que el boton se elimine ? 


         tr.appendChild(tdNro);
         tr.appendChild(tdNombre);
         tr.appendChild(tdTipo);
         tr.appendChild(tdMensaje);
         tr.appendChild(tdAcciones);   
         tbody.appendChild(tr);
         
     } 

   
     
     //4.Agregar esa fila a la tabla (manipulando el DM)
 };

 //document = es un hacer una referencia al ducumento web compledo.
 //query...=busca adentro de la pagina si existe tal id.
 //addevent...= es un funcion que ademas es  escuchador que si lo encuentra lo reproduzca.
 //listener es un escuchardor de un evento por ejemplo cuando la persona mande el formulario//

 document.querySelector("#registro-form").addEventListener('submit',(e)=>{
   e.preventDefault();//Previene que el formulario recargue la pagina

   let nombre=document.querySelector("#nombre-txt").value;//LET para definir para una variable
   let correo=document.querySelector("#correo-txt").value;
   let mensaje=tinymce.get("mensaje-txt").getContent();
   let tipo= document.querySelector("#tipo-select").value;

  // si es valido sera correcto y en el caso que no lo es sera :
   let esValido= true;
   document.querySelector("#nombre-txt").classList.remove("is-invalid");
   document.querySelector("#correo-txt").classList.remove("is-invalid");
   document.querySelector("#mensaje-txt").classList.remove("is-invalid");

   if(nombre.trim()==""){ // el trim te borra los espacios que haya escrito la persona para ajustarlo bien
       document.querySelector("#nombre-txt").classList.add("is-invalid");
       esValido = false;
   }

   if(correo.trim()==""){
       document.querySelector("#correo-txt").classList.add("is-invalid");
       esValido = false;
}


   if(mensaje.trim()==""){
       document.querySelector("#mensaje-txt").classList.add("is-invalid");
       esValido = false;
   }

   if(esValido){

       //console.log es para mostrar los datos por el inspector al dar click derecho
       //console.log("hola mi rey",nombre,descripcion,legendario,tipo);//
       let registro ={};
       registro.nombre=nombre;
       registro.correo=correo;
       registro.mensaje=mensaje;
       registro.tipo=tipo;
       registros.push(registro);
       cargarTabla();
       //titulo de ventana , texto que va en el cuerpo y el tipo signo que aparecera en el mensaje
       Swal.fire("Registro existoso","SU solicitud fue  registrada correctamente!!","success");
     }
 });

    //limpiar los elementos 
    document.querySelector("#limpiar-btn").addEventListener("click", ()=>{
    //limpiar el nombre 
    document.querySelector("#nombre-txt").value = "";
    //Limpiar el correo
    document.querySelector("#correo-txt").value ="";
    //Limpiar un campo de mucha escritura
    tinymce.get("mensaje-txt").setContent(""); // NO COLOCAR # QUE NO SIRVE CON EL!!!
    //limpiar un select (tambien seleccionando la primera opcion)
    document.querySelector("#tipo-select").value="0";
 });
    
