function getCart(){
    let basket = localStorage.getItem('cart');
    if(basket!=null)basket = JSON.parse(basket);
    else
        basket = {'items':[],'amount':{},'number':0,'unitprice':0};
    return basket;
}

function getOrder(){
    let orders = JSON.parse(localStorage.getItem('orders'));
    if(orders==null)orders = {'orderdata':{},'ordercart':{},'orderids':[]};
    return orders;
}

function validateName(name){

     var letters = /^[A-Za-z]+$/;
     if(name.match(letters))
       {
        return true;
       }
     else
       {
       return false;
       }
}

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function validateCard(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return false;

    return luhnCheck(number);
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

function validateCVV(cvv){
    if ((/^\d{3,4}$/).test(cvv))return true
return false;
}

function validateDE(date){
    let month = 1*date.substring(0,2);
    let year = 2000+1*date.substring(3);
    let yearNow = new Date().getFullYear();
    let monthNow = new Date().getMonth();
    if(12<month || 1>month || year-yearNow>5)return false;
    if(year>yearNow)return true;
    if(yearNow==year && month+1>=monthNow)return true;
    return false;
}

function validateDate(orderDate){
    let today = new Date();
    orderDate = new Date(orderDate);
    if(orderDate=='')return false;
    let diff = (orderDate.getTime()-today.getTime())/(1000*3600);
    if(diff>3 && diff<96)return true;
    return false;
}


function validate(orderData){   
    if(validateName(orderData['name'])==false){alert('Wrong name!');return false;}
    if(validateName(orderData['surname'])==false){alert('Wrong surname');return false;}
    if(orderData['phone'].match(/\d/g).length!==10 || orderData['phone'].length!=10 || ['099','098','097','096','095','093','068','067','066','063','061'].indexOf(orderData['phone'].substring(0,3))==-1){alert('Wrong phone number');return true;}
    if(ValidateEmail(orderData['email'])==false){return false;}
    if(orderData['address'].length==0){return false;}
    if(validateDate(orderData['deliverydate'])==false){return false;}
    if(document.getElementById('paycard').checked==true){
        if(validateCard(orderData['cnumber'])==false){alert('Wrong card number!');return false;}
        if(validateCVV(orderData['cvv'])==false){alert('Wrong cvv code!');return false;}
        if(validateDE(orderData['dateofexpire'])==false){alert('Wrong date of expire!');return false;}
        if(orderData['city'].length==0){alert('Wrong card number!');return false;}
    }
    return true;
}

function hideshow(param){
    if(param==1)document.getElementById('cardcreds').style.display = 'none';
    else
    document.getElementById('cardcreds').style.display = 'block';
}

async function genOrderList(){
    let container = '<div id="orderList">'+ 
    '<img src="./images/loading.svg" alt="loadimage" style="width: 100%;height: 250px;">'+
    '</div>';
    document.getElementById('content').innerHTML = container;
    let id = window.location.hash.substring(window.location.hash.indexOf('/')+1);
    let order =  getOrder();
    let basket = order['ordercart'][id];
    let productList = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products").then(res => res.json());
    let form = '<div id="list"><h3 style="text-align:center;">Order id:'+id+'</h3><table>';
        form+='<tr>';
        form+='<td class="image"></td>';
        form+='<td class="name" >Product name</td>';
        form+='<td class="size" >Product size</td>';
        form+='<td class="empty" ></td>';
        form+='<td class="oneitemprice">One item price</td>';
        form+='<td class="amount"> Amount of item</td>';
        form+='<td>Full position price</td>';
        form+='</tr>';
    let sum = 0;
    for(let i=0;i<basket['items'].length;i++){
        let productID = basket['items'][i][0]-1;
        let productSize = basket['items'][i][1]*1;
        let product=productList[productID];
        form+='<tr id="elem'+productID+','+productSize+'">';
        form+='<td class="image" >';
        //Photo
        form+= '<img src= "./images/'+product['url']+'.jpg" alt=itemImage >';
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
        //AMOUNT
        form+='<td class="amount" id=amount'+String(productID)+String(productSize)+'>';
        form+=  String(basket['amount'][basket['items'][i]]);
        form+='</td>';
        //FINALSUM
        form+='<td class="allsum" id="sum'+String(productID)+String(productSize)+'">';
        form+=  String(basket['amount'][basket['items'][i]]*product['price'][productSize*1])+'UAH';
        form+='</td></tr>';
        sum+=basket['amount'][basket['items'][i]]*product['price'][productSize*1];
    }
    
    form+='</table><h3 style="text-align:center">Final sum '+sum+'UAH</h3>'
    let deliveryDate = new Date(order['orderdata'][id]['deliverydate']);
    form+='<h4 style="text-align:center;">Order will be delivered to '+order['orderdata'][id]['delCity']+' '+order['orderdata'][id]['address']+' at '+deliveryDate.getDate()+'.'+(deliveryDate.getMonth()+1)+' at '+deliveryDate.getHours()+':'+deliveryDate.getMinutes();
    form+='</h4></div>';

    document.getElementById('orderList').innerHTML = form;
}



async function makeorder(){
    let userData = {};
    userData['name'] = document.getElementById('name').value;
    userData['surname'] = document.getElementById('surname').value;
    userData['phone'] = document.getElementById('phone').value;
    userData['email'] = document.getElementById('email').value;
    userData['delCity'] = document.getElementById('delCity').value;
    userData['address'] = document.getElementById('address').value;
    userData['deliverydate'] = document.getElementById('deldate').value;
    userData['cnumber'] = document.getElementById('cnumber').value;
    userData['cvv'] = document.getElementById('cvv').value;
    userData['dateofexpire'] = document.getElementById('dateofexpire').value;
    userData['city'] = document.getElementById('city').value;
    if(validate(userData)==true){
        let id = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/categories",{method:'POST'}).then(res => res.json());
        id = id['id'];
        let orders = getOrder();
        orders['ordercart'][id] = getCart();
        orders['orderdata'][id] = userData;
        orders['orderids'].push(id);
        localStorage.setItem('orders',JSON.stringify(orders));
        localStorage.removeItem('cart');
        window.location.hash = '#order/'+id;
        document.getElementById("amount").innerText = 0;
        genOrderList();
    }
    else{
        alert('Something wrong in validation');
    }
}

