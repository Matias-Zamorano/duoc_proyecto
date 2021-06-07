const cursos = [];
 const eliminar =async function(){

    let Borrar = await Swal.fire({
        title: 'desea eliminar este curso registrado? ',
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
        cursos.splice(nro,1);
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
        let tbody  = document.querySelector("#tbody-curso");
        tbody.innerHTML=""; // hace que no se multiplique los registros
        //2.Por cada registro generar una fila 
        for(let i=0; i <  cursos.length; ++ i){
            let c  = cursos[i];
            

        //Crea un elemento qeu no existe, pero no lo agrega a la pagina
        //Puedo crear cualquier etiqueta html aqui
        let tr         = document.createElement("tr");
        //3.Por cada atributo de los registros (nombre,...) generar una celda
        let tdNombre   = document.createElement("td");
        let tdCorreo   = document.createElement("td");
        let tdTipo     = document.createElement("td");
        let tdNro      = document.createElement("td");
        let tdAcciones = document.createElement("td");

        tdNombre.innerText = c.nombre;
        tdCorreo.innerText = c.correo;

        
        let icono = document.createElement("i");
        
        if(c.tipo == "1"){//<i class="far fa-file-code"></i>
            icono.classList.add("far","fa-file-code","text-primary","fa-2x");
        }else if(c.tipo =="2"){//<i class="far fa-comments"></i>
            icono.classList.add("fas","fa-comments","text-primary","fa-2x");
        }else if (c.tipo =="3"){//<i class="fas fa-language"></i>
            icono.classList.add("fas","fa-language","text-primary","fa-x2");
        }else if (c.tipo =="4"){//<i class="fas fa-pen"></i>
            icono.classList.add("fas","fa-pen","text-primary","fa-2x");
        }else{//<i class="fas fa-microphone"></i>
            icono.classList.add("fas","fa-microphone","text-primary","fa-2x");
        }
        
        tdTipo.appendChild(icono);
        tdTipo.classList.add("text-center");
        

        tdNro.innerText= i + 1;

        let boton = document.createElement("button");
        boton.nro = i;
        boton.addEventListener("click",eliminar);
        boton.innerText= "Eliminar curso registrado";
        boton.classList.add("btn","btn-danger");
        tdAcciones.classList.add("text-center");
        tdAcciones.appendChild(boton);

        tr.appendChild(tdNro);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCorreo);
        tr.appendChild(tdTipo);
        tr.appendChild(tdAcciones);
        tbody.appendChild(tr);

    }
    //3.Por cada atributo de los registros (nombre,...) generar una celda
    //4.Agregar esa fila a la tabla (Manipulando el DOM) 
};

document.querySelector("#cursos-form").addEventListener('submit', (e)=>{
    e.preventDefault(); //Prevenir que el formulario recargue la pagina
    let nombre = document.querySelector("#nombreCurso-txt").value;
    let correo = document.querySelector("#correoCurso-txt").value;
    let tipo   = document.querySelector("#tipoCurso-select").value;
    
    let esValido= true;
    document.querySelector("#nombreCurso-txt").classList.remove("is-invalid");
    document.querySelector("#correoCurso-txt").classList.remove("is-invalid");
    

    if(nombre.trim()==""){ // el trim te borra los espacios que haya escrito la persona para ajustarlo bien
        document.querySelector("#nombreCurso-txt").classList.add("is-invalid");
        esValido = false;
    }
   
    if(correo.trim()==""){
        document.querySelector("#correoCurso-txt").classList.add("is-invalid");
        esValido = false;
   }

    if(esValido){
      let curso = {};
    curso.nombre = nombre;
    curso.correo = correo;
    curso.tipo   = tipo;
    cursos.push(curso);
    cargarTabla();
    
    Swal.fire({
        title: 'Curso registrado de manera correcta',
        text:'Le llegara un mensaje que le indicara toda la informacion sobre el curso y sus horarios',
        icon:'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
    
        document.querySelector("#cursoLimpiar-btn").addEventListener("click",()=>{
        //limpiar el nombre 
        document.querySelector("#nombreCurso-txt").value ="";
        //Limpiar el correo
        document.querySelector("#correoCurso-txt").value ="";
        //limpiar un select (tambien seleccionando la primera opcion)
        document.querySelector("#tipoCurso-select").value="0";
        }); 
            
    
        
    
});
