function getSum(){
    let value = document.getElementById('allsum').innerText;
    return 1*value.substring(0,value.indexOf('U'));
}

//let allItems = fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/promos").then(res => res.json());
function increase(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    basket['amount'][String([productID,1*productSize])]+=1;
    let prevprice = getSum();
    document.getElementById('sum'+productID+productSize).innerText = prevprice+productPrice*1;
    document.getElementById('allsum').innerText = getSum()+productPrice;
    localStorage.setItem('cart',JSON.stringify(basket));
    basket['number']++;
}

function decrease(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    if( basket['amount'][String([[productID,1*productSize]])]>0){
        basket['amount'][String([productID,1*productSize])]-=1;
        let prevprice = getSum();
        document.getElementById('sum'+productID+productSize).innerText = prevprice-productPrice*1;
        document.getElementById('allsum').innerText = getSum()+productPrice;
        localStorage.setItem('cart',JSON.stringify(basket));
        document.getElementById()
        basket['number']--;
    }
}

function remove(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    document.getElementById('sum'+productID+productSize).innerText = getSum() - productPrice*basket['amount'][String([productID,1*productSize])];
    basket['number']-=basket['amount'][String([[productID,1*productSize]])];
    delete basket['amount'][String([[productID,1*productSize]])];
    basket['items'].splice([productID,String(productSize)]);
    document.getElementById("elem"+String(productID)+String(productSize)).style.display = 'none';
    if(getSum()==0){
        document.getElementById("orderList").innerHTML = "<h1>Your cart is empty... Buy something!</h1>";
    }
}
