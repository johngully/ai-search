"use client"
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom'
import { Footer } from '@/components/pages';
import { getCriteriaFromSearchForm, getProducts } from '../products/actions'
import { ProductsList } from '../products/components/products-list';
import { CriteriaList } from '../../components/criteria';
import { SearchForm } from '../products/components/search-form';

export default function ProductsPage() {
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
    <main className="flex flex-grow flex-col justify-items-start">
      <SearchForm action={formAction}></SearchForm>
      <CriteriaList criteria={criteria}></CriteriaList>
      <ProductsList products={products}></ProductsList>
      <Footer>Rendered as a client component with AI search translation separate from product search</Footer>
    </main>
  );
}