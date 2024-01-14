type ProductsListProps = { products: Products }

export function ProductsList({products}: ProductsListProps) {
  let results = <ProductsListEmpty></ProductsListEmpty>;
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
}

export function ProductsListEmpty() {
  return (
    <div className="min-h-full rounded-xl border-gray-200 border bg-white p-4 flex flex-col justify-center items-center">
      <a href="/products" className="[&>p]:hover:underline text-gray-200">
      <h2 className="text-center font-bold text-2xl text-gray-200">No Products Found</h2>
      <p className="text-center text-gray-200 mb-8">Try searching again or clear the search</p>
      </a>
    </div>
  );
}
