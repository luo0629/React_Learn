import React, { useState } from "react";

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface SearchBarType{
    filterText:string;
    inStockOnly:boolean;
    onFilterTextChange: (value: string) => void;
    onInStockOnlyChange: (value: boolean) => void;
}


const PRODUCTS:Product[] = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];
function SearchBar({filterText,inStockOnly,onFilterTextChange,onInStockOnlyChange}:SearchBarType){
    return(
        <form>
            <div>
                <input type="text" value={filterText} placeholder="请输入..." onChange={(e)=>onFilterTextChange(e.target.value)}/>
            </div>
            <label style={{ display: 'block', marginTop: '8px' }}>
                <input type="checkbox" checked={inStockOnly} onChange={(e)=>onInStockOnlyChange(e.target.checked)}/>
                {' '}Only show products in stock
            </label>
        </form>
    );
}

function ProductCategoryRow({category}:{category:string}){
    return(
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    );
}

function ProductRow({product}:{product:Product}){
    const productName=product.stocked?product.name:
    <span style={{ color: 'red' }}>{product.name}</span> 

    return(
        <tr>
            <td>{productName}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({products,filterText,inStockOnly}:{products:Product[],filterText:string,inStockOnly:boolean}){
    let last_category:string|null=null;
    let rows:React.ReactNode[]=[];
    products.forEach((temp_product)=>{
        if(inStockOnly && !temp_product.stocked){
            return;
        }
        if (temp_product.name.toLocaleLowerCase().indexOf(filterText.toLowerCase())==-1){
            return ;
        }
        if(temp_product.category!==last_category){
            rows.push(<ProductCategoryRow category={temp_product.category} key={temp_product.category}/>);
        }
        rows.push(<ProductRow product={temp_product} key={temp_product.name}/>);
        last_category=temp_product.category;
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}


function FilterableProductTable({products}:{products:Product[]}){
    const [filterText,setfilterText]=useState('fruit');
    const [inStockOnly,setInStockOnly]=useState(false);
    return (
        <div>
            <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setfilterText} onInStockOnlyChange={setInStockOnly}/>
            <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/>
        </div>
    );
}

export default function App(){
    return <FilterableProductTable products={PRODUCTS}/>;
}

