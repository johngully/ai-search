import productsData from "./data-products.json";
import settingsData from "./data-products.json";
export const settings = { ...settingsData } as Settings;
export const products = [ ...productsData ] as Products;