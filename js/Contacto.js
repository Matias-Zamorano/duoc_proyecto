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

  const registros = [];
 const eliminar =async function(){

    let Borrar = await Swal.fire({
        title: 'desea eliminar este solicitud registrada? ',
            icon:'question',
            showCancelButton:true,
            confirmButtonText:"Eliminar",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        
    });
    if(Borrar.isConfirmed){
        let nro = this.nro;
        registros.splice(nro,1);
        Swal.fire({
            title: 'Operacion realizada correctamente',
            icon:'success',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        cargarTabla();
    }else{
        Swal.fire({
            title: 'Operacion cancelada ',
            icon:'error',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    }
  };
 //Definir un arreglo en javascript
    const cargarTabla = ()=>{
        //1.Una referencia a la tabla
        let tbody  = document.querySelector("#tbody-registro");
        tbody.innerHTML=""; // hace que no se multiplique los registros
        //2.Por cada registro generar una fila 
        for(let i=0; i <  registros.length; ++ i){
            let r  = registros[i];
            

        //Crea un elemento qeu no existe, pero no lo agrega a la pagina
        //Puedo crear cualquier etiqueta html aqui
        let tr         = document.createElement("tr");
        //3.Por cada atributo de los registros (nombre,...) generar una celda
        let tdNombre   = document.createElement("td");
        let tdCorreo   = document.createElement("td");
        let tdTipo     = document.createElement("td");
        let tdMensaje  =document.createElement ("td");
        let tdNro      = document.createElement("td");
        let tdAcciones = document.createElement("td");

        tdNombre.innerText = r.nombre;
        tdCorreo.innerText = r.correo;

        
        let icono = document.createElement("i");
        
        if(r.tipo == "1"){//<i class="far fa-file-code"></i>
            icono.classList.add("far","fa-address-book","text-info","fa-2x");
        }else if(r.tipo =="2"){//<i class="far fa-comments"></i>
            icono.classList.add("fas","fa-user-edit","text-warning","fa-2x");
        }else if (r.tipo=="3"){//<i class="fas fa-language"></i>
            icono.classList.add("fas","fa-user-cog","text-success","fa-2x");
        }else if (r.tipo=="4"){//<i class="fas fa-pen"></i>
            icono.classList.add("fas","fa-user-alt-slash","text-danger","fa-2x");
        }
            
        
 
        tdTipo.classList.add("text-center");
        tdTipo.appendChild(icono);

        tdMensaje.innerHTML = r.mensaje;
        tdNro.innerText    = i + 1;

        let boton = document.createElement("button");
        boton.nro = i;
        boton.addEventListener("click",eliminar);
        boton.innerText= "Eliminar ducumento registrado";
        boton.classList.add("btn","btn-danger");
        tdAcciones.classList.add("text-center");
        tdAcciones.appendChild(boton);

        tr.appendChild(tdNro);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCorreo);
        tr.appendChild(tdTipo);
        tr.appendChild(tdMensaje);
        tr.appendChild(tdAcciones);
        tbody.appendChild(tr);

    }
    //3.Por cada atributo de los registros (nombre,...) generar una celda
    //4.Agregar esa fila a la tabla (Manipulando el DOM) 
    
};

document.querySelector("#registro-form").addEventListener('submit', (e)=>{
    e.preventDefault(); //Prevenir que el formulario recargue la pagina
    let nombre = document.querySelector("#nombre-txt").value;
    let correo = document.querySelector("#correo-txt").value;
    let mensaje= tinymce.get("mensaje-txt").getContent(); 
    let tipo   = document.querySelector("#tipo-select").value;

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
    let registro = {};
    registro.nombre = nombre;
    registro.correo = correo;
    registro.tipo   = tipo;
    registro.mensaje= mensaje;
    registros.push(registro);
    cargarTabla();

    Swal.fire({
        title: 'Su formulario se registro de manera correcta',
        text:'Le llegara un mensaje que le indicara toda la informacion sobre el curso y sus horarios',
        icon:'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

    }
    
    
    

        document.querySelector("#limpiar-btn").addEventListener("click",()=>{
        //limpiar el nombre 
        document.querySelector("#nombre-txt").value ="";
        //Limpiar el correo
        document.querySelector("#correo-txt").value ="";
        //limpiar un select (tambien seleccionando la primera opcion)
        document.querySelector("#tipo-select").value="0";
        //limpiar campo de escritura
        tinymce.get("mensaje-txt").setContent("");
    }); 
            
       
        
    
});
