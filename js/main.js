function getCart(){
    let basket = localStorage.getItem('cart');
    if(basket!=null)basket = JSON.parse(basket);
    else
        basket = {'items':[],'amount':{},'number':0,'unitprice':{}};
    return basket;
}

function generateBlock(product){
    let basket = getCart();
    let form = ' <div class="good">';
    form+= '<img src="./images/'+product['url']+' alt = "image">';
    form+= '<p style="font: size 1.3;font-weight: bolder;" >'+product['productName']+'</p>'; 
    form+= '<hr style="width:80%;>';
    form+= '<p style="margin-bottom:0;"> '+product['productDescription']+' </p>';
    form+= '<span>';
    for(let i=0;i<product['radius'].length;i++){
        form+= '<input type="radio" onchange="changeElem('+product['id']+','+product['price'][i]+')" name="'+product['id']+'" '+((i==0)?'checked':"")+' value = "'+i+'" >'+product['radius'][i]+'<br>';
    }
    form+= '</span>';
  
    form+=' <span id="unitprice'+product['id']+'" > One item price: '+product['price'][0]+' UAH</span>'
    form+=' <button id="buy'+product['id']+'" value = "'+product['price'][0]+'" class="buy" style="background-color:'+((basket['amount'][String([product['id'],0])]>=1)?"#2ECC71":"#D5F5E3")+';" onclick="buy('+product["id"]+')">'+((basket['amount'][String([product['id'],0])]>=0)?"In the cart":"Buy")+'</button>';
    form+='</div>';
    return form;
}

async function generateItems(path){
    let basket = getCart();
    document.getElementById('amount').innerText = basket['number'];
    let href = window.location.href;
    let inds;
    if(path!='all'){
        inds = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/categories/"+path).then(res => res.json());
        inds = inds['values'];
    }
    let items = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products").then(res => res.json());
    let forms = "";
    let end = ((path=='all')?items.length:inds.length);
    for(let i=0;i<end;i++){
        if(path!='all'){
            forms+=generateBlock(items[inds[i]]);
        }
        else
        forms+=generateBlock(items[i]);
    }
    document.getElementById('goodsField').innerHTML = forms;
}

function buy(id){
    let basket = getCart();
    let radios = document.getElementsByName(id);
    for(let i=0;i<radios.length;i++){
        if(radios[i].checked){
            if(basket['items'].indexOf([id,radios[i].value])==-1){
                basket['items'].push([id,radios[i].value]);
                basket['amount'][[id,radios[i].value]] = 1;
                document.getElementById('buy'+id).style.backgroundColor = '#2ECC71';
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
            document.getElementById('buy'+id).innerText = ((basket['amount'][[id,radios[i].value]]>=1)?"In the cart":"Buy");
            document.getElementById('buy'+id).value = price;
            break;
        }
    }
} 

window.onload = generateItems('recommended');