const cursos = [];
 //Definir un arreglo en javascript
const cargarTabla = ()=>{
    //1.Una referencia a la tabla
    let tbody  = document.querySelector("#tbody-curso");
    //2.Por cada registro generar una fila 
    for(let i=0; i <  cursos.length; ++ i){
        let c  = cursos[i];
        console.log(c);

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
        tdTipo.innerText   = c.tipo;
        tdNro.innerText    = i + 1;

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
    
    let curso = {};
    curso.nombre = nombre;
    curso.correo = correo;
    curso.tipo   = tipo;
    cursos.push(curso);
    cargarTabla();
    
});
