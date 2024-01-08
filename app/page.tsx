"use client"
import { useEffect, useState } from 'react';
import { productSearchTextToCriteria } from './ai';
import { products as data } from './data';

type dimensionConfiguration = {
  dimensionA: string,
  dimensionB: string,
  dimensionC: string,
};

const dimensionConfiguration = {
  dimensionA: "Color",
  dimensionB: "Size",
  dimensionC: "Fit"
};

type Products = Array<Product>;
type Product = {
  name: string,
  dimensionA: string,
  dimensionB: string,
  dimensionC: string,
  cost: number,
  msrp: number,
  margin: number,
}

type Criteria = {
  name?: string,
  dimensionA?: string,
  dimensionB?: string,
  dimensionC?: string,
  cost?: number,
  msrp?: number,
  margin?: number,
}

type ProductsListProps = { products: Products }
function ProductsList({products}: ProductsListProps) {
  let results = <div className="rounded bg-white p-4">No products found</div>;
  const stylesColumnText = "p-2 text-left";
  const stylesColumnNumber = "p-2 text-right";

  if (products?.length) {
    results = <div className="rounded bg-white p-4">
      <table>
        <thead>
          <tr>
            <th className={stylesColumnText}>Product</th>
            <th className={stylesColumnText}>Dimension A</th>
            <th className={stylesColumnText}>Dimension B</th>
            <th className={stylesColumnText}>Dimension C</th>
            <th className={stylesColumnNumber}>Cost</th>
            <th className={stylesColumnNumber}>MSRP</th>
            <th className={stylesColumnNumber}>Margin</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product) => (
           <tr key={product.name}>
            <td className={stylesColumnText}>{product.name}</td>
            <td className={stylesColumnText}>{product.dimensionA}</td>
            <td className={stylesColumnText}>{product.dimensionB}</td>
            <td className={stylesColumnText}>{product.dimensionC}</td>
            <td className={stylesColumnNumber}>{product.cost}</td>
            <td className={stylesColumnNumber}>{product.msrp}</td>
            <td className={stylesColumnNumber}>{product.margin}</td>
          </tr>
        ))}
        <tr></tr>
        </tbody>
      </table>
    </div>
  } 

  return results;
};

function parseResults(value: string) {
  const result = {
    name: value,
    dimensionA: value,
    dimensionB: value,
    dimensionC: value
  };
  // Call AI to parse the result
  return result;
}

async function parseResultsByAi(value: string) {
  let result = {};
  try {
    const suggestion = await productSearchTextToCriteria(value);
    result = suggestion as Criteria;
  } finally {
    return result;
  }
}

function search(criteria: Criteria): Products {
  const data = loadProducts();
  const results = data.filter((product: Product) => {
    const filters: Array<boolean> = [];
    addCriteriaToFilter(filters, filterProperty(product, criteria, "name"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "dimensionA"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "dimensionB", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "dimensionC", "exact"));
    console.log(product.name, product.dimensionB, filters);
    return filters.every(f => f === true)
  });
  return results;
}

function addCriteriaToFilter(filters: Array<boolean>, filterResult) {
  if (filterResult.hasCriteria) {
    filters.push(filterResult.isMatch);
    console.log(filterResult);
  }
}

function filterProperty(product:any, criteria:any, property:string, matchType:string="includes") {
  
  let isMatch = false;
  const pValue = product[property].trim().toLowerCase();
  const cValue = criteria[property]?.trim()?.toLowerCase();

  let hasCriteria = cValue !== undefined && cValue !== null && cValue !== "";
  if (!hasCriteria) {
    return { name: property, criteriaExists: false, isMatch: false };
  }

  switch (matchType) {
    case "exact":
      isMatch = pValue===cValue
      break;
    case "includes":
    default:
      isMatch = pValue.includes(cValue)
  }

  return { name: property, hasCriteria, isMatch };
}

function loadProducts(): Products {
  const productsData = data.map(p => p as Product);
  return productsData;
}


export default function Home() {;
  const defaultProducts: Products = [];
  const [products, setProducts] = useState(defaultProducts);
  const [searchText, setSearchText] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({});

  useEffect(() => {
    const foo = loadProducts();
    setProducts(foo);
  }, [])

  async function onSubmit(e: FormDataEvent) {
    e.preventDefault();
    // const criteria: Criteria = parseResults(searchText);
    const aiCriteria = await parseResultsByAi(searchText);
    setFilterCriteria(aiCriteria);
    const filteredProducts = search(aiCriteria);
    setProducts(filteredProducts);
  }

  function onSearchTextChange(e) {
    setSearchText(e.target.value);
  }


  return (
    <main className="flex min-h-screen flex-col justify-items-start space-y-4 p-24">
      <form onSubmit={onSubmit} className="z-10 max-w-5xl w-full items-center justify-between">
        <label className="block">Search</label>
        <input type="text" placeholder="search for anything ..." onChange={onSearchTextChange} className="rounded p-2" />
        <input type="submit" value="Search" className="rounded ml-2 p-2 px-4 bg-blue-300"></input>
      </form>
      <div>
        <div>Criteria</div>
        <div><span>Name: </span>{filterCriteria.name}</div>
        <div><span>DimensionA: </span>{filterCriteria.dimensionA}</div>
        <div><span>DimensionB: </span>{filterCriteria.dimensionB}</div>
        <div><span>DimensionC: </span>{filterCriteria.dimensionC}</div>
      </div>
      <ProductsList products={products}></ProductsList>
    </main>
  );
}
