function getCart(){
    let basket = localStorage.getItem('cart');
    if(basket!=null)basket = JSON.parse(basket);
    else
        basket = {'items':[],'amount':{},'number':0,'unitprice':{}};
    return basket;
}

function buy(id){
    let basket = getCart();
    let radios = document.getElementsByName(id);
    for(let i=0;i<radios.length;i++){
        if(radios[i].checked){
            if(basket['items'].indexOf([id,radios[i].value])==-1){
                basket['items'].push([id,radios[i].value]);
                basket['amount'][[id,radios[i].value]] = 1;
                basket['number']+=1;
                basket['unitprice'][id,radios[i].value] = document.getElementById('buy'+id).value;
                document.getElementById('amount').innerText = basket['number'];
            }
        }
    }
    document.getElementById("buy"+id).innerText = "In the cart";
    localStorage.setItem("cart",JSON.stringify(basket));
}

function changeElem(id,price){
    let radios = document.getElementsByName(id);
    let basket = getCart();
    for(let i=0;i<radios.length;i++){
        if(radios[i].checked){
            document.getElementById('unitprice'+id).innerText = "One item price: "+radios[i].value+"UAH";
            document.getElementById('buy'+id).innerText = ((basket['amount'][[id,radios[i].value]]==1)?"In the cart":"Buy");
            document.getElementById('buy'+id).value = price;
            break;
        }
    }
} 