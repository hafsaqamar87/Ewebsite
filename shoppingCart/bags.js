let carts=document.querySelectorAll(".add-cart");
let products=[
    {
        name: 'Stylish Mini bag',
        tag: 'ladiesBag2',
        Brand:'FashionClub',
        SKU:'132396176_PK-1292610776',
        Color:'Black',
        price:750,
        inCart:0

    },
    {
        name:'Women Bag',
        tag: 'bag2',
        Color:'Pink',
        price:780,
        inCart:0

    },
    {
        name:'Stylish Women Hand bags',
        tag:'ladiesBag1',
        Color:'Blue',
        price:1899,
        inCart:0
   }
   
];
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click',()=>{
     cartsNumber(products[i]);
     totalCost(products[i] )
})
}
 function onLoadCartNumbers(){
    let productNumbers =localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}
function cartsNumber(product){
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
   let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);


    if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers + 1);
    document.querySelector('.cart span').textContent=productNumbers +1;
   }
   else{
    localStorage.setItem('cartNumbers',1)
    document.querySelector('.cart span').textContent=1
   
   }
   setItems(product)
}
function setItems(product){
     let cartItems =localStorage.getItem('productsInCart')
     cartItems=JSON.parse(cartItems);

     if(cartItems != null){
        let currentProduct = product.tag;
         if (cartItems[product.tag] == undefined){ 
         cartItems ={
             ...cartItems,
             [product.tag]: product
        }
    }
    cartItems[product.tag].inCart +=1
}
else{
    product.inCart=1;
    cartItems ={
        [product.tag]: product
    }
}
localStorage.setItem("productsInCart",JSON.stringify(cartItems))
}
function totalCost(product){
   let cartCost=localStorage.getItem('totalCost');
   if(cartCost != null){
       cartCost =parseInt(cartCost);
       localStorage.setItem('totalCost',cartCost + product.price);
   }
   else{
    localStorage.setItem('totalCost',product.price);
   }
}
function displayCart(){
    let cartItems=localStorage.getItem('productsInCart')
    cartItems =JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    let cartCost=localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTML = "";
    Object.values(cartItems).map(item => {
       productContainer.innerHTML += `
         <div class="product">
         <ion-icon name="close-circle-outline"></ion-icon>
         <img src="../images/${item.tag}.jpg" width="150" height="120" />
        <span>${item.name}</span>
        
        </div>

        <div class="price">${item.price}</div>
        <div class="quantity">
        <ion-icon name="add-circle-outline" onClick="return cartsNumber(product)"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="remove-circle-outline"></ion-icon></div>
        </div>
        <div>
        <div class="total">
        PKR:${item.inCart * item.price}.00
        </div>`;
 })
    productContainer.innerHTML +=`
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
    Total</h4>
    <h4 class="basketTotal">
    PKR:${cartCost}
    </h4> `
}
}
displayCart( )
onLoadCartNumbers()

