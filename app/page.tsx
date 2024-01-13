"use client"
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom'
import { getCriteriaFromSearchForm, getProducts } from './actions'
import { ProductsList } from './Products';
import { CriteriaList } from './Criteria';

export default function Home() {;
  const defaultProducts: Products = [];
  const defaultCiteria: Criteria = {};
  const [products, setProducts] = useState(defaultProducts);
  const [criteria, formAction] = useFormState(getCriteriaFromSearchForm, defaultCiteria)
  
  // Load the data any time the criteria changes
  useEffect(() => { getProductsWithCriteria(); }, [criteria]);

  async function getProductsWithCriteria() {
    const filteredProducts = await getProducts(criteria);
    setProducts(filteredProducts);
  }

  return (
    <main className="flex min-h-screen flex-col justify-items-start">
      <form action={formAction} className="w-full flex items-start justify-between">
        <input type="text" name="searchText" placeholder="search for anything ..." className="flex-grow border-gray-200 border focus:border-[#33CC99] focus:outline-none focus:shadow-lg rounded-lg p-2 px-4" />
        <button type="submit" className="flex items-center justify-center rounded-lg p-2 px-6 font-light text-white border-gray-200 bg-[#33CC99] bg-opacity-80 hover:bg-opacity-100 shadow-md hover:shadow-lg hover:contrast-more ml-2">Magic Search<img src="sparkle.svg" className="w-5 h-5 ml-1" /></button>
      </form>
      <CriteriaList criteria={criteria}></CriteriaList>
      <ProductsList products={products}></ProductsList>
    </main>
  );
}
