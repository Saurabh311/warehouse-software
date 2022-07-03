import './App.css';
import ProductData from './products.json'
import InventoryData from './inventory.json'
import {Product} from './model/product'
import {Inventory} from './model/inventory'
import {ProductInventory} from './model/productInventory'
import ShowAllProducts from './ui-components/ShowAllProducts'
import ShowCurrentInventory from './ui-components/ShowCurrentInventory';

function App() {

  const productData: Product[] =[];
  ProductData.products.map(product => {
    let item = {
      name: product.name,
      containArticles: product.contain_articles
    }
    return productData.push(item);
  })

  const inventoryData: Inventory[] =[];
  InventoryData.inventory.map(inventory => {
    let item = {
      articleId: inventory.art_id,
      name: inventory.name,
      stock: inventory.stock
    }
    return inventoryData.push(item);
  })    

  function getAllProducts(): ProductInventory[]{  
    let productInventory : ProductInventory[] = [];       
    for (let p = 0; p < productData.length; p++) {      
        let allInventoryAvailable: boolean = true;                 
        let maxProdQantity: number = 0;
        let index: number = 0;
        for (let a = 0; a < productData[p].containArticles.length; a++) {
          let articleInventoryRequirement : number= +productData[p].containArticles[a].amount_of
          if (articleInventoryRequirement !== 0){      
            if (allInventoryAvailable){        
            for (let i = 0; i < inventoryData.length; i++) {                          
              let inventoryStock: number  = +inventoryData[i].stock
              //while(allInventoryAvailable)
              if(productData[p].containArticles[a].art_id === inventoryData[i].articleId){
                if(articleInventoryRequirement > inventoryStock){                    
                  allInventoryAvailable = false;
                  maxProdQantity = 0;
                  break;
                }
                  if(index === 0){
                    maxProdQantity = inventoryStock   / articleInventoryRequirement;
                    index++;
                  }
                  
                  if (maxProdQantity >  inventoryStock   / articleInventoryRequirement){
                    maxProdQantity = inventoryStock   / articleInventoryRequirement; 
                  }                                
                }                     
              }
            }                   
            }          
    }
    if(allInventoryAvailable === false){
      maxProdQantity = 0;
    }
    
      productInventory.push(
        {name: productData[p].name,
        stock:String(maxProdQantity.toFixed(0))
       })
      
  }
  return productInventory;       
}


  function removeProduct(productName: string, quantityOfProduct: number):Inventory[]{
    let allInventoryAvailable:boolean = true;
    let containArticles;
    let requiredArticleQuantity: number;
    let inventoryArticleStock: number;    
    let toBeUpdateInventory: Inventory[] =[];    
    for (let p=0; p < productData.length; p++){
      if(productData[p].name === productName){
        containArticles= productData[p].containArticles
        for (let c=0; c < containArticles.length; c++){
          if(allInventoryAvailable){
          for (let i=0; i < inventoryData.length; i++){
            if (containArticles[c].art_id === inventoryData[i].articleId){
              requiredArticleQuantity= +containArticles[c].amount_of * quantityOfProduct
              inventoryArticleStock = +inventoryData[i].stock
              if (requiredArticleQuantity > inventoryArticleStock){
                allInventoryAvailable = false;
                break;              
                // product can not be purchased
              }
              toBeUpdateInventory.push({ 
                articleId: inventoryData[i].articleId,
                name: inventoryData[i].articleId,
                stock: String(inventoryArticleStock - requiredArticleQuantity)
              })
            }
          }
        }
      }
      }
    }
    if(allInventoryAvailable){
      for (let i=0; i < inventoryData.length; i++){
        for (let t=0; t < toBeUpdateInventory.length; t++){
          if(toBeUpdateInventory[t].articleId === inventoryData[i].articleId){
            inventoryData[i].stock = toBeUpdateInventory[t].stock;
          }         
        }
      }
    }
    return inventoryData;
  }  
  
  function responseMsgOnSale(): string{
    let id1: boolean = false;
    let id2: boolean = false;
    let id3: boolean = false;
    let id4: boolean = false;
    for (let a = 0; a < afterSell.length; a++){
      if(afterSell[a].articleId ==="1" && afterSell[a].stock==="12") {
        id1= true;
      }
      if (afterSell[a].articleId ==="2" && afterSell[a].stock==="17") {
        id2= true;
      }
      if (afterSell[a].articleId ==="3" && afterSell[a].stock==="2") {
        id3 = true;
      }
      if (afterSell[a].articleId ==="4" && afterSell[a].stock==="1") {
        id4 = true;
      }     
  }
  if(id1 && id2 && id3 && id4){
    return "Stock not available"
  }
  return "Happy shopping"
}
  const afterSell = removeProduct("Dining Chair", 3 )
  const responseOnsale = responseMsgOnSale();
  const show: ProductInventory[] = getAllProducts();

  return (
    <div className="App">
      <h2> All Products</h2>      
      <ShowAllProducts prop={show}></ShowAllProducts> 
      <h2> Current Inventory</h2>            
      <ShowCurrentInventory prop={afterSell}></ShowCurrentInventory> 
      <h2>{responseOnsale}</h2>
        
    </div>
  );
}

export default App;