type ProductsListProps = { products: Products }

export function ProductsList({products}: ProductsListProps) {
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
}
