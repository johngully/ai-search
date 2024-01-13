"use server";
import { productSearchTextToCriteria } from './ai';
import { productsRepository } from "../data/products-repository";

export async function getCriteriaFromSearchForm(previousState: any, formData: FormData) {
  const searchText = formData.get("searchText")?.toString();

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
  console.log("getProducts")
  const products = await productsRepository.findMany(criteria)
  return products;
}
