window.addEventListener("scroll", function(){

let elementos = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-up");

let alturaPantalla = window.innerHeight;

elementos.forEach(function(el){

let posicion = el.getBoundingClientRect().top;

if(posicion < alturaPantalla - 100){
el.classList.add("active");
}

});

});

console.log("JS conectado");

