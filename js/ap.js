const carr = document .querySelector('#carrito');
const curs = document.querySelector('#lista-carrito tbody');
const elimin = document.querySelector('#vaciar-carrito');
const totCursos = document.querySelector('#lista-cursos');

let carroCompra =[];


function evenListener(){ 
    
    totCursos.addEventListener('click',agg);

    carr.addEventListener('click',eli);

    elimin.addEventListener('click',()=>{
        carroCompra=[];
        limpHmtl()
    })
}
evenListener()
function agg(e){
   
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursito = e.target.parentElement.parentElement;
        leeDat(cursito);
        
    }
}

function eli(c){
    if(c.target.classList.contains('borrar-curso')){
       const cId = c.target.getAttribute('data-id')

       carroCompra=carroCompra.filter((e)=>e.id!==cId)
       carHtml();
    }
}

function leeDat(c){
    
    const o = {
        img:c.querySelector('img').src,
        titulo:c.querySelector('h4').textContent,
        precio:c.querySelector('.precio span').textContent,
        id:c.querySelector('a').getAttribute('data-id'),
        cantidad:1,
        nombre:c.querySelector('p').textContent,
    }
    console.log(5)
    const pro = carroCompra.find((e)=>{
       return e.id===o.id
    })
    if(pro){
        pro.cantidad++;
    }else{
        carroCompra.push(o)
    }
    
    cHtml();
}

function cHtml(){
    
    carroCompra.forEach((e)=>{
        const {imagen, titulo, precio, cantidad, id} = e
        const rw = document.createElement('tr');
        rw.innerHTML=`
        <td><img src='${imagen}' width='100'></td>
        <td> ${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href='#' class='borrar-curso' data-id='${id}'>X</a></td>
        `
        curs.appendChild(rw);
    })

}
