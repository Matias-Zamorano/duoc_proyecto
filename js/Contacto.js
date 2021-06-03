

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

  document.querySelector("#registro-form").addEventListener('submit',(e)=>{
    e.preventDefault("hola mundillo"); // no recarga la pag
    console.log()
  });