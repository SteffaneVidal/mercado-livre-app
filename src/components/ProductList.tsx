import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

type Product = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
};

type Props = {
  products: Product[];
};

function ProductList({ products }: Props) {
  console.log('Componente list foi renderizado!')
  const productItems = useMemo(() => {
    console.log('Renderizando lista de productos....')
    return products.map((product) => (
      <li key={product.id}>
        <Link to={`/items/${product.id}`}>
        <ProductImage src={product.picture} alt={product.title} width="100" />
          <div>
            <h2>{product.title}</h2>
            <p>
              {product.price.currency} {product.price.amount.toFixed(2)}
            </p>
            {product.free_shipping && <span>🚚 Frete Grátis</span>}
          </div>
        </Link>
      </li>
    ));
  }, [products]);

  return <ul>{productItems}</ul>;
}

export default ProductList;
