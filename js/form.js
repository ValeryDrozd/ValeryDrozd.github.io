export function generateBlock(product){
    let form = ' <div class="good">';
    form+= '<img src='+product['url']+' alt = "image">';
    form+= '<p style="font: size 1.3;font-weight: bolder;" >'+product['productName']+'</p>'; 
    form+= '<hr style="width:80%;>';
    form+= '<p style="margin-bottom:0;"> '+product['productDescription']+' </p>';
    form+= '<span>';
    let wight = (1/product['wegith'].length)-0.15;
    form+= '<button class="size" style="color:white;background-color:#882020">'+product['wegith'][i]+'</button>';
    for(let i=0;iproduct['wegith'].length;i++){
        form+= '<button class="size">'+product['wegith'][i]+'</button>';
    }
    form+= '</span>';
    form+=' <span> Amount <input id="amount" type="number" min="1" max="10" step="1" value="1"> <span id="pay" style="margin-left: 5px;font-weight: 800;">To pay: '+product['price'][0]+'UAH</span></span>';
    form+=' <button id="buy'+product['id']+'" value = "'+product['price'][0]+'" class="buy" >Buy</button>';
    form+=' <button id="cancel'+product['id']+'" value = "'+product['price'][0]+'" class="cancel" >Cancel</button>';
    form+='</div>';
    return form;
}

export function fill(query){
    fetch(query)
    .then((response) => {
    return response.json();
    })
    .then((data) => {
        return(data);
    });
}

