import { CriteriaList } from '@/components/criteria';
import { Footer } from '@/components/pages';
import { getCriteria, getCriteriaAndRedirect, getProducts } from './actions';
import { ProductsList } from './components/products-list';
import { SearchForm } from './components/search-form';

export default async function ProductsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchText = searchParams.search;
  const criteria = await getCriteria(searchText);
  const products = await getProducts(criteria);

  return (
    <main className="flex flex-col justify-items-start">
      <SearchForm action={getCriteriaAndRedirect}></SearchForm>
      <CriteriaList criteria={criteria} ></CriteriaList>
      <ProductsList products={products}></ProductsList>
      <Footer>Rendered as a server component</Footer>
    </main>
  );
}