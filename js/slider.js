let carousel;
let carouselimages;
let number = 0;
let size = 0;

function init(){
    carousel = document.querySelector('#carousel');
    carouselimages = document.querySelectorAll('#carousel img');
    size = carouselimages[0].clientWidth;
    document.getElementById("promos").style.width = size;
}



export function slideleft(){
    if(size==0)init();
    if(number!=0){
        carousel.style.transition = "transform 0.4s ease-in-out";
        number--;
        carousel.style.transform = 'translateX('+(-size*number) + 'px)';
    }
}

export function slideright(){
    if(size==0)init();
    if(number!=carouselimages.length-1){
        carousel.style.transition = "transform 0.4s ease-in-out";
        number++;
        carousel.style.transform = 'translateX('+(-size*number) + 'px)';
    }
}
