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
  costLowerBound?: number,
  costUpperBound?: number,
  msrp?: number,
  msrpLowerBound?: number,
  msrpUpperBound?: number,
  margin?: number,
  marginLowerBound?: number,
  marginUpperBound?: number,
}

type ProductsListProps = { products: Products }
function ProductsList({products}: ProductsListProps) {
  let results = <div className="rounded bg-white p-4">No products found</div>;
  const stylesColumnText = "p-2 text-left";
  const stylesColumnNumber = "p-2 text-right";

  if (products?.length) {
    results = <div className="rounded-xl border-gray-200 border bg-white p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-black uppercase text-sm">
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
            <td className={stylesColumnNumber}>${product.cost}</td>
            <td className={stylesColumnNumber}>${product.msrp}</td>
            <td className={stylesColumnNumber}>{Math.round(product.margin*100)}%</td>
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
    addCriteriaToFilter(filters, filterProperty(product, criteria, "cost", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "costLowerBound", "gteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "costUpperBound", "lteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "msrp", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "msrpLowerBound", "gteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "msrpUpperBound", "lteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "margin", "exact"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "marginLowerBound", "gteq"));
    addCriteriaToFilter(filters, filterProperty(product, criteria, "marginUpperBound", "lteq"));
    return filters.every(f => f === true)
  });
  return results;
}

function addCriteriaToFilter(filters: Array<boolean>, filterResult) {
  if (filterResult.hasCriteria) {
    filters.push(filterResult.isMatch);
  }
}

function filterProperty(product:any, criteria:any, property:string, matchType:string="includes") {
  
  let isMatch = false;
  const name = property.replace("LowerBound", "").replace("UpperBound", "")
  const pValue = isNaN(product[name]) ? product[name]?.trim()?.toLowerCase() : product[name];
  const cValue = isNaN(criteria[property]) ? criteria[property]?.trim()?.toLowerCase() : criteria[property];

  let hasCriteria = cValue !== undefined && cValue !== null && cValue !== "";
  if (!hasCriteria) {
    return { name, criteriaExists: false, isMatch: false };
  }

  switch (matchType) {
    case "exact":
      isMatch = pValue===cValue;
      break;
    case "lteq": 
      isMatch = pValue<=cValue;
      break;
    case "gteq": 
      isMatch = pValue>=cValue;
      break;
    case "includes":
    default:
      isMatch = pValue.includes(cValue);
      break;
  }

  return { name, hasCriteria, isMatch };
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
    <main className="flex min-h-screen flex-col justify-items-start space-y-8">
      <form onSubmit={onSubmit} className="w-full flex items-start justify-between">
        <input type="text" placeholder="search for anything ..." onChange={onSearchTextChange} className="flex-grow border-gray-200 border  focus:border-[#33CC99] focus:outline-none focus:shadow-lg rounded-lg p-2 px-4" />
        <button type="submit" className="flex items-center justify-center rounded-lg p-2 px-6 font-light text-white border-gray-200 bg-[#33CC99] bg-opacity-80 hover:bg-opacity-100 shadow-md hover:shadow-lg hover:contrast-more ml-2">
          Magic Search
          <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
      </button>

      </form>
      <ProductsList products={products}></ProductsList>
      <div className="bg-gray-50 border-gray-100 border-2 rounded-xl p-4 hover:bg-white [&>*]:hover:text-gray-600">
        <div className="p-2 text-gray-300  text-2xl font-extrabold">AI Search Criteria</div>
        <div className="p-2 text-gray-300 text-sm">Name: {filterCriteria.name}</div>
        <div className="p-2 text-gray-300 text-sm">DimensionA: {filterCriteria.dimensionA}</div>
        <div className="p-2 text-gray-300 text-sm">DimensionB: {filterCriteria.dimensionB}</div>
        <div className="p-2 text-gray-300 text-sm">DimensionC: {filterCriteria.dimensionC}</div>

        <div className="p-2 text-gray-300 text-sm">Cost:&nbsp;
          {filterCriteria.cost && !filterCriteria.costLowerBound && !filterCriteria.costUpperBound ? `${filterCriteria.cost}` : null}
          {filterCriteria.costLowerBound && !filterCriteria.costUpperBound ? `is more than ${filterCriteria.costLowerBound}` : null}
          {!filterCriteria.costLowerBound && filterCriteria.costUpperBound ? `is less than ${filterCriteria.costUpperBound}` : null}
          {filterCriteria.costLowerBound && filterCriteria.costUpperBound ? `${filterCriteria.costLowerBound} - ${filterCriteria.costUpperBound}` : null}
        </div>
        <div className="p-2 text-gray-300 text-sm">Msrp:&nbsp;
          {filterCriteria.msrp && !filterCriteria.msrpLowerBound && !filterCriteria.msrpUpperBound ? `${filterCriteria.msrp}` : null}
          {filterCriteria.msrpLowerBound && !filterCriteria.msrpUpperBound ? `is more than ${filterCriteria.msrpLowerBound}` : null}
          {!filterCriteria.msrpLowerBound && filterCriteria.msrpUpperBound ? `is less than ${filterCriteria.msrpUpperBound}` : null}
          {filterCriteria.msrpLowerBound && filterCriteria.msrpUpperBound ? `${filterCriteria.msrpLowerBound} - ${filterCriteria.msrpUpperBound}` : null}
        </div>
        <div className="p-2 text-gray-300 text-sm">Margin:&nbsp;
          {filterCriteria.margin && !filterCriteria.marginLowerBound && !filterCriteria.marginUpperBound ? `${filterCriteria.margin}` : null}
          {filterCriteria.marginLowerBound && !filterCriteria.marginUpperBound ? `is more than ${filterCriteria.marginLowerBound}` : null}
          {!filterCriteria.marginLowerBound && filterCriteria.marginUpperBound ? `is less than ${filterCriteria.marginUpperBound}` : null}
          {filterCriteria.marginLowerBound && filterCriteria.marginUpperBound ? `${filterCriteria.marginLowerBound} - ${filterCriteria.marginUpperBound}` : null}
        </div>
      </div>
    </main>
  );
}
