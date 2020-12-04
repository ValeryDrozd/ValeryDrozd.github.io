function getSum(){
    let value = document.getElementById('allsum').innerText;
    return 1*value.substring(0,value.indexOf('U'));
}

function findIndexInTheArray(arr,elem){
    for(let i=0;i<arr.length;i++){
        if(arr[i].values==elem.values)return i;
    }
    return -1;
}

function increase(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    if(basket['amount'][String([productID+1,1*productSize])]==undefined){
        basket['amount'][String([productID+1,1*productSize])] = 1;
        basket['items'].push([productID+1,String(productSize)]);
    }
    else
    basket['amount'][String([productID+1,1*productSize])]+=1;
    document.getElementById('sum'+productID+productSize).innerText = productPrice*basket['amount'][String([productID+1,1*productSize])]+'UAH';
    document.getElementById('allsum').innerText = getSum()+productPrice+'UAH';
    document.getElementById('amount'+productID+productSize).innerText= basket['amount'][String([productID+1,1*productSize])];
    localStorage.setItem('cart',JSON.stringify(basket));
    basket['number']++;
    document.getElementById('amount').innerText = basket['number'];
    localStorage.setItem('cart',JSON.stringify(basket));
}

function decrease(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    if( basket['amount'][String([[productID+1,1*productSize]])]>0){
        basket['amount'][String([productID+1,1*productSize])]-=1;
        let prevprice = getSum();
        document.getElementById('sum'+productID+productSize).innerText = productPrice*basket['amount'][String([productID+1,1*productSize])]+'UAH';
        document.getElementById('allsum').innerText = prevprice-productPrice+'UAH';
        basket['number']--;
        document.getElementById('amount'+productID+productSize).innerText= basket['amount'][String([productID+1,1*productSize])];
        document.getElementById('amount').innerText = basket['number'];
        localStorage.setItem('cart',JSON.stringify(basket));
        if(basket['amount'][String([productID+1,1*productSize])]==0){
            delete basket['amount'][String([[productID+1,1*productSize]])];
            basket['items'].splice(findIndexInTheArray(basket["items"],[productID,String(productSize)]),1);
        }
        localStorage.setItem('cart',JSON.stringify(basket));
    }
}

function remove(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    document.getElementById('allsum').innerText = getSum() - productPrice*basket['amount'][String([productID+1,1*productSize])]+'UAH';
    basket['number']-=basket['amount'][String([productID+1,1*productSize])];
    delete basket['amount'][String([productID+1,1*productSize])];
    basket['items'].splice(findIndexInTheArray(basket["items"],[productID,String(productSize)]),1);
    document.getElementById("elem"+String([productID,productSize])).style.display = 'none';
    if(getSum()==0){
        document.getElementById("orderList").innerHTML = "<h1 style='text-align:center'>Your cart is empty... Buy something!</h1>";
    }
    document.getElementById('amount').innerText = basket['number'];
    localStorage.setItem('cart',JSON.stringify(basket));
}
