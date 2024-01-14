"use server";
import { productSearchTextToCriteria } from './ai-product-search';
import { productsRepository } from "../../data/products-repository";
import { redirect } from 'next/navigation';

export async function getCriteriaFromSearchForm(previousState: any, formData: FormData) {
  const searchText = formData?.get("searchText")?.toString();
  return await getCriteria(searchText);
}

export async function getCriteriaAndRedirect(formData: FormData) {
  const searchText = formData?.get("searchText")?.toString();
  redirect(`/products?search=${searchText}`)
}

export async function getCriteria(searchText?: string) {
  let criteria: Criteria = {};
  try {
    if (searchText) {
      criteria = await productSearchTextToCriteria(searchText);
    }
  } finally {
    return criteria;
  }
}

export async function getProducts(criteria: Criteria) {
  const products = await productsRepository.findMany(criteria);
  await sleep(1000);
  return products;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
