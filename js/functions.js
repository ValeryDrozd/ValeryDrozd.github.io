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
  
    form+=' <span id="unitprice'+product['id']+'" > One item price: '+product['price'][0]+' UAH</span><br>'
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
    let product = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/"+path.substring(1)).then(res => res.json());
    document.getElementById('image').innerHTML = '<img src= "./images/'+product['url']+'.jpg" >';
    let desc = genDescBlock(product);
    document.getElementById('desc').innerHTML = desc;
}

export async function valid(path){
    let group = path.substr(path.indexOf('#')+1,path.indexOf('/')-1);
    let url = path.substr(path.indexOf('/')+1);
    if(group!='products')return false;
    let items = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products").then(res => res.json());  
    for(let i=0;i<items.length;i++){
        if(String(items[i]['id'])==url)return true;
    }
    return false;
}

export async function generateOrderList(){
    let basket = getCart();
    if(basket['number']==0){
        return "<h1>Your cart is empty... Buy something!</h1>";
    }
    let productList = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products").then(res => res.json());
    let form = '<div id="list"><table>';
        form+='<tr>';
        form+='<td class="image"></td>';
        form+='<td class="name" >Product name</td>';
        form+='<td class="size" >Product size</td>';
        form+='<td class="empty" ></td>';

        form+='<td class="oneitemprice">One item price</td>';
        form+='<td class="less"> </td>';
        form+='<td class="amount"> Amount of item</td>';
        form+='<td class="more"> </td>';
        form+='<td>Full position price</td>';
        form+='<td class="remove"></td>';
        form+='</tr>';
    let sum = 0;
    for(let i=0;i<basket['items'].length;i++){
        let productID = basket['items'][i][0]-1;
        let productSize = basket['items'][i][1]*1;
        let product=productList[productID];
        form+='<tr id="elem'+productID+','+productSize+'">';
        form+='<td class="image" >';
        //Photo
        form+= '<img src= "./images/'+product['url']+'.jpg" >';
        form+='</td>';
        form+='<td class="name">';
        //NAME
        form+= String(product['productName']);
        form+='</td>';
        form+='<td class="size" >';
        //RADIUS
        form+= String(product['radius'][productSize]);
        form+='</td>';
        //EMPTY
        form+='<td class="empty"></td>';
        //PRICE
        form+='<td class="price" >';
        form+= String(product['price'][productSize*1]);
        form+='</td>';
        //DECREASE

        form+='<td class="less change" onclick=decrease('+productID+','+productSize+','+product['price'][productSize*1]+') >';
        form+= 'Less'
        form+='</td>';
        //AMOUNT
        form+='<td class="amount" id=amount'+String(productID)+String(productSize)+'>';
        form+=  String(basket['amount'][basket['items'][i]]);
        sum+=basket['amount'][basket['items'][i]]*product['price'][productSize*1];
        form+='</td>';
        //INCREASE
        form+='<td class="increase change" onclick="increase('+productID+','+productSize+','+String(product['price'][productSize*1])+')" >';
        form+=  'More';
        form+='</td>';
        //FINALSUM
        form+='<td class="allsum" id="sum'+String(productID)+String(productSize)+'">';
        form+=  String(basket['amount'][basket['items'][i]]*product['price'][productSize*1])+'UAH';
        form+='</td>';
        //REMOVE
        form+='<td class="remove change" onclick="remove('+productID+','+productSize+','+String(product['price'][productSize*1])+')" >';
        form+=  'Remove';
        form+='</td>';
        form+='</tr>';
    }
    form+='</table></div>'
    form += '<table class="itemList"><tr><td style="font-weigth:bolder;height:100%;"> All price </td><td></td><td></td><td></td><td id="allsum" style="font-weigth:bolder">'+sum+'UAH</td></tr></table>';
    form += '<button id="confirm"> CONFIRM </button></div>';
    form += '<button id="clearorderlist"> Clear order list </button></div>';

    return form;
}
