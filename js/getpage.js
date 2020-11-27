
    
export let routes = {
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
    'sushi':'<div class = "goods" id="goodsField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>',
    'pizza':'<div class = "goods" id="goodsField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>',
    'drinks':'<div class = "goods" id="goodsField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>',
    'all':'<span><h1 style="margin-left:10px;margin-top: 0px;">Pizzas</h1></span>'+
          '<div class = "goods" id="PizzaField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>'+
          '<span><h1 style="margin-left:10px;margin-top: 0px;">Sushies</h1></span>'+
          '<div class = "goods" id="SushiField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>'+
          '<span><h1 style="margin-left:10px;margin-top: 0px;">Drinks</h1></span>'+
          '<div class = "goods" id="DrinksField"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;"></div>',
    'order':'<div id="container">'+
    '<div id="form">'+
    '<label for="name">Enter your name</label><br>'+
    '<input type="text" id="name" required placeholder="Name"><br>'+
    '<label for="surname" required>Enter your name</label><br>'+
    '<input type="text" id="surname" placeholder="Surname"> <br>'+
    '<label for="phone" required placeholder="mobile">Enter mobile phone</label><br>'+
    '<input class="input" type="text" id="phone" required placeholder="0981234567"><br>'+
    '<label for="email">Enter email</label><br>'+
    '<input class="input" type="email" id="email" required placeholder="some@example.com"><br>'+
    '<label for="address">Enter delivery address</label><br>'+
    '<input type="text" id="address" required placeholder="some-street 21/54"><br>'+
    '<label for="deldate">Delivery date and time</label><br>'+
    '<input type="datetime-local" id="deldate"><br>'+
    '<label>Enter way to pay</label><br><br>'+
    '<label for="paycard">'+
    '    Now'+
    '</label><br>'+
    '<input type="radio" name="pay" id="paycard"  checked onclick="hideshow(2)" style="margin: initial;font:initial;font-size: 1.4em;width: initial;"><br>'+
    '<label for="paycash">'+
    '    On delivery'+
    '</label><br>'+
    '<input type="radio" name="pay" onclick="hideshow(1)" id="paycash" style="margin: initial;font:initial;font-size: 1.4em;width: initial;">'+

    
    '<div id="cardcreds">'+
        '<label for="cnumber" required>Card num ber</label><br>'+
        '<input type="text" id="cnumber"><br>'+
        '<label for="cvv">Enter cvv code</label><br>'+
        '<input type="password" id="cvv" required><br>'+
        '<label for="">Date of expire</label><br>'+
        '<input type="email" id="dateofexpire" placeholder="06/06"><br>'+
        '<label for="city">Enter city</label><br>'+
        '<input type="text" id="city"></br>'+
    '</div>'+
'</div>',
        
    'cart':
    '<div id="orderList">'+ 
        '<button id="confirm" style="width: 100%;"> CONFIRM </button>'+
    '</div>',
    'item':
        '<div id="item">'+
        '<div id="image><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 100%;"></div>'+
        '<div id="desc"><img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 100%;"></div>'+
        '</div>'

};
