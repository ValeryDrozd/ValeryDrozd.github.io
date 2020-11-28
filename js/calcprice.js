function getSum(){
    let value = document.getElementById('allsum').innerText;
    return 1*value.substring(0,value.indexOf('U'));
}

function increase(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    if(basket['amount'][String([productID,1*productSize])]==undefined){
        basket['amount'][String([productID,1*productSize])] = 0;
        basket['items'].push([productID,String(productSize)]);
    }
    basket = JSON.parse(basket);
    basket['amount'][String([productID,1*productSize])]+=1;
    let prevprice = getSum();
    document.getElementById('sum'+productID+productSize).innerText = prevprice+productPrice*1;
    document.getElementById('allsum').innerText = getSum()+productPrice+'UAH';
    document.getElementById('amount'+productID+productSize).innerText= basket['amount'][String([productID,1*productSize])];
    localStorage.setItem('cart',JSON.stringify(basket));
    basket['number']++;
    document.getElementById('amount').innerText = basket['number'];
    localStorage.setItem('cart',JSON.stringify(basket));
}

function decrease(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    if( basket['amount'][String([[productID,1*productSize]])]>0){
        basket['amount'][String([productID,1*productSize])]-=1;
        let prevprice = getSum();
        document.getElementById('sum'+productID+productSize).innerText = prevprice-productPrice*1+'UAH';
        document.getElementById('allsum').innerText = getSum()+productPrice+'UAH';
        basket['number']--;
        document.getElementById('amount'+productID+productSize).innerText= basket['amount'][String([productID,1*productSize])];
        document.getElementById('amount').innerText = basket['number'];
        localStorage.setItem('cart',JSON.stringify(basket));
        if(basket['amount'][String([productID,1*productSize])]==0){
            delete basket['amount'][String([[productID,1*productSize]])];
            basket['items'].splice(basket.indexOf([productID,String(productSize)]));
        }
        localStorage.setItem('cart',JSON.stringify(basket));
    }
}

function remove(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    document.getElementById('sum'+productID+productSize).innerText = getSum() - productPrice*basket['amount'][String([productID,1*productSize])];
    basket['number']-=basket['amount'][String([[productID,1*productSize]])];
    delete basket['amount'][String([[productID,1*productSize]])];
    basket['items'].splice(basket.indexOf([productID,String(productSize)]));
    document.getElementById("elem"+String(productID)+String(productSize)).style.display = 'none';
    if(getSum()==0){
        document.getElementById("orderList").innerHTML = "<h1>Your cart is empty... Buy something!</h1>";
    }
    document.getElementById('amount').innerText = basket['number'];
    localStorage.setItem('cart',JSON.stringify(basket));
}
