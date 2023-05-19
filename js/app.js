//variables
const carro = document.querySelector("#carrito");
const contenedorCar = document.querySelector("#lista-carrito tbody");
const LimpCarroBtn = document.querySelector("#vaciar-carrito");
const listCursos = document.querySelector("#lista-cursos");
let car = [];

cargarEvenListener();
function cargarEvenListener() {
  //agg el curso
  listCursos.addEventListener("click", aggCurso);
  //elimina cursos del carrito
  carro.addEventListener('click',eliminarCurso);

  //vaciar el carro
  LimpCarroBtn.addEventListener('click', ()=>{
    car = [];//reseteamos el array
    limpiarHmtl()//eliminamos todo el html
  });
}

//funciones
function aggCurso(event) {
  event.preventDefault();
  if (event.target.classList.contains("agregar-carrito")) {
    const cursoSelec = event.target.parentElement.parentElement;
    leerDatosCursos(cursoSelec);
  }
}
//eliminar un curso
  function eliminarCurso(evento){
    if(evento.target.classList.contains('borrar-curso')){
      const cursoId = evento.target.getAttribute('data-id')

      //eliminar del array car por el data-id
      car = car.filter((curso)=>curso.id !== cursoId);
      
      carHtml()//iterar sobre el carrito y mostrar su html
    }
}
//lee el contenido del html al que dimos click y extrae la info del curso
function leerDatosCursos(curso) {

  //crear un obj con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
    nombre: curso.querySelector("p").textContent,
  };

  //revisa si un elemento ya existe en el carrito
  const existe = car.some((curso) => curso.id === infoCurso.id)
  if(existe){

    //actualizamos la cantidad
    const cursos = car.map(curso=>{
      if(curso.id === infoCurso.id){
        curso.cantidad++;
        return curso;//retorna los actualizado
      }else{
        return curso;//retorna los no duplicados
      }
    })
    car = [...cursos]
  }else{

    //agg el curso al array carrito
    car = [...car, infoCurso];
  }
  carHtml();
}

//muestra el carro de compras en el html

function carHtml() {
  //limpiar el hmtl
  limpiarHmtl();

  //recorre el carro y genera el html de cada curso
  car.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src='${imagen}' width='100'></td>
      <td> ${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td> <a href='#' class='borrar-curso' data-id='${id}'>X</a></td>`;

    //agg el html del carrito en el tbody
    contenedorCar.appendChild(row);
  });
}

//eliminar los cursos del tbody
function limpiarHmtl() {
  //forma lenta
  //contenedorCar.innerHTML=''

  //mejor performance
  while (contenedorCar.firstChild) {
    contenedorCar.removeChild(contenedorCar.firstChild);
  }
}
