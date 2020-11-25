function getCart(){
    let basket = localStorage.getItem('cart');
    if(basket!=null)basket = JSON.parse(basket);
    else
        basket = {'items':[],'amount':{},'number':0};
    return basket;
}


export async function generatePromo(){
    let items = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/promos").then(res => res.json());
    console.log();
    let images = '';
    
    for(let i=0;i<items.length;i++){
        images+= '<img src="./images/'+items[i]['images']+'.jpg"> ';
    }
    document.getElementById('carousel').innerHTML = images;
}

function generateBlock(product){
    let basket = getCart();
    let form = ' <div class="good">';
    form+= '<img src="./images/'+product['url']+'.jpg" alt = "image">';
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

export async function generateItems(path){
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
    return forms;
}