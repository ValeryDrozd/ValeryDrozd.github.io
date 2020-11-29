let carousel;
let carouselimages;
let number = 0;
let size = 0;
init();
function init(){
    carousel = document.querySelector('#carousel');
    carouselimages = document.querySelectorAll('#carousel img');
    if(carouselimages.length>0) size = carouselimages[0].clientWidth;
    if(size!=0)document.getElementById("promos").style.width = size;
    number = 0; 
}

function slideleft(){
  //   init();
    if(number!=0){
        carousel.style.transition = "transform 0.4s ease-in-out";
        number--;
        carousel.style.transform = 'translateX('+(-size*number) + 'px)';
    }
}

function slideright(){
    init();
    if(number!=carouselimages.length-1){
        carousel.style.transition = "transform 0.4s ease-in-out";
        number++;
        carousel.style.transform = 'translateX('+(-size*number) + 'px)';
    }
}
