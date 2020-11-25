
    
export let routes = {
    'header':' <button id="mainBtn" onclick=\'router(" ")\'>'+
   ' Main'+
'</button>'+
'<button id="allBtn" onclick=\'jump("#all")\'>'+
 '   Catalogue'+
'</button>'+
'<button id="pizzaBtn" onclick=\'jump("#pizza")\'>'+
'Pizza'+
'</button>'+
'<button id="sushiBtn" onclick=\'jump("#sushi")\'>'+
'Sushi'+
'</button>'+
'<button id="drinkBtn" onclick=\'jump("#drinks")\'>'+
'Drinks'+
'</button>'+
'<button id="cartBtn" style="float:right;" onclick=\'router(#cart)\'>'+
'    In the cart: <span id="amount">0</span>'+
'</button>',

    'main': '<div id = "promos">'+
    '<div id="carousel">'+
    '    <img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 100%;">'+
    '</div>'+
    '<div id="buttons">'+
        '<button id="prevbutton" onclick="slideleft()">Previous</button>'+
        '<button id="nextbutton" onclick="slideright()">Next</button>'+
    '</div>'+
    '</div>'+
    '<hr>'+
    '<span><h1 style="margin-left:10px;margin-top: 0px;">The most popular orders</h1></span>'+  
    '<div class = "goods" id="goodsField">'+
    '    <img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;">'+
    '</div>',
    'cart':'',
    'sushi':'<div class = "goods" id="goodsField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>',
    'pizza':'<div class = "goods" id="goodsField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>',
    'drinks':'<div class = "goods" id="goodsField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>',
    'all':'<span><h1 style="margin-left:10px;margin-top: 0px;">Pizzas</h1></span>'+
          '<div class = "goods" id="PizzaField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>'+
          '<span><h1 style="margin-left:10px;margin-top: 0px;">Sushies</h1></span>'+
          '<div class = "goods" id="SushiField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>'+
          '<span><h1 style="margin-left:10px;margin-top: 0px;">Drinks</h1></span>'+
          '<div class = "goods" id="DrinksField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>'
};
