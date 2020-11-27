export function getCart(){
    let basket = localStorage.getItem('cart');
    if(basket!=null)basket = JSON.parse(basket);
    else
        basket = {'items':[],'amount':{},'number':0};
    return basket;
}


export async function generatePromo(){
    let items = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/promos").then(res => res.json());
    let images = '';
    
    for(let i=0;i<items.length;i++){
        images+= '<img src="./images/'+items[i]['images']+'.jpg"> ';
    }
    document.getElementById('carousel').innerHTML = images;
}

function genDescBlock(product){
    let basket = getCart();
    let form = '';
    form+= '<p style="font-size: 1.2em;font-weight: bolder;" >'+product['productName']+'</p>'; 
    form+= '<hr style="width:80%;">';
    form+= '<p style="margin-bottom:0;"> '+product['productDescription']+((product['spicy']==true)?'<font style="color:red">.Spicy.</font>':'')+' </p>';
    form+= '<span>';
    for(let i=0;i<product['radius'].length;i++){
        form+= '<span style="margin-right:20px;"><input type="radio" style="margin-right:5px;" onchange="changeElem('+product['id']+','+product['price'][i]+')" name="'+product['id']+'" '+((i==0)?'checked':"")+' value = "'+i+'" >'+product['radius'][i]+'</span>';
    }
    form+= '</span><br>';
  
    form+=' <span id="unitprice'+product['id']+'" > One item price: '+product['price'][0]+' UAH</span>'
    form+=' <button id="buy'+product['id']+'" value = "'+product['price'][0]+'" class="buy" '+((basket['amount'][String([product['id'],0])]>=1)?"style = 'background-color:#2ECC71;'":"")+' onclick="buy('+product["id"]+')">'+((basket['amount'][String([product['id'],0])]>=0)?"In the cart":"Buy")+'</button>';
    return form;
}

function generateBlock(product){
    let form = ' <div class="good">';
    form+= '<img src="./images/'+product['url']+'.jpg" alt = "image" class="goodImg" data-path="#products/'+product['id']+'" >';
    form+=genDescBlock(product);
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

export async function generateProduct(path){
    let product = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/"+path).then(res => res.json());
    document.getElementById('image').innerHTML = '<img src= "./images/'+product['url']+'" >';
    let desc = genDescBlock(product);
    document.getElementById('desc').innerHTML = desc;
}

export async function valid(path){
    let group = path.substr(path.indexOf('#')+1,path.indexOf('/')-1);
    let url = path.substr(path.indexOf('/')+1);
    if(group!='products')return false;
    let items = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products").then(res => res.json());  
    for(let i=0;i<items.length;i++){
        if(Srting(items[i]['id'])==url)return true;
    }
    return false;
}