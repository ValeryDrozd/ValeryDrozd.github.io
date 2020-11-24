
                function hideshow(cmd){
                    if(cmd==1)document.getElementById("cardcreds").style.display = 'none';
                    else
                    document.getElementById("cardcreds").style.display = 'block';
                }
            
                async function genOrderList(){
                    let confBtn = '<button id="confirm" style="width: 100%;"> CONFIRM </button>';
             //       let orderList = "";
                    let items = await fetch("https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products").then(res => res.json());
                    let basket = JSON.parse(localStorage.getItem('cart'));
                    let order = "";
                    for(let i=0;i<basket['items'].length;i++){
                         //0 - id,1 - size
                        order+="<div class=orderItem>";
                        let item = items[basket['items'][i][0]];
                        order+="<img src = './images/"+item['url']+".jpg' alt = ' ' class=cartphoto>";
                        order+="<div>"+item['productName']+" "+item['radius']+" </div>";
                      //  order+="<div style='float:right;'>"
                        order+="<button onclick=increase("+basket['items'][i]+")>More</button>";
                        order+="<span id='amount"+basket['items'][i]+"' >";
                        order+=basket['amount'][basket['items'][i]];
                        order+="</span>";
                        order+="<button onclick=decrease("+basket['items'][i]+")>Less</button>";
                      //  order+="</div>"
                        order+="</div><br>";
                    }
                    document.getElementById("orderList").innerHTML = order+confBtn;
                }
                genOrderList();