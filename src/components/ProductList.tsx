import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductList.module.scss";

type Product = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
    regular_amount?: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  installments?: string;
};

type Props = {
  products: Product[];
};

function ProductList({ products }: Props) {
  const formatPrice = (value: number) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const productItems = useMemo(
    () =>
      products.map((product) => {
        const discount =
          product.price.regular_amount && product.price.amount < product.price.regular_amount
            ? Math.round(
                ((product.price.regular_amount - product.price.amount) /
                  product.price.regular_amount) *
                  100
              )
            : null;

        return (
          <li key={product.id} className={styles.productList__item}>
            <Link to={`/items/${product.id}`} className={styles.productList__imageLink}>
              <img
                src={product.picture}
                alt={product.title}
                className={styles.productList__image}
              />
            </Link>

            <Link to={`/items/${product.id}`} className={styles.productList__infoLink}>
              <div className={styles.productList__info}>
                <h2 className={styles.productList__title}>{product.title}</h2>

                <div className={styles.productList__priceContainer}>
                  {product.price.regular_amount &&
                    product.price.amount < product.price.regular_amount && (
                      <span className={styles.productList__regularPrice}>
                        {formatPrice(product.price.regular_amount)}
                      </span>
                    )}

                  <div className={styles.productList__discountRow}>
                    <span className={styles.productList__discountPrice}>
                      {formatPrice(product.price.amount)}
                    </span>
                    {discount !== null && (
                      <span className={styles.productList__discount}>{discount}% OFF</span>
                    )}
                  </div>
                </div>

                {product.installments && (
                  <p className={styles.productList__installments}>
                    {product.installments.replace(
                      /(\d+)x\s([\d.]+)/,
                      (_match, installments, value) =>
                        `Mesmo preço em ${installments}x ${formatPrice(Number(value))}`
                    )}
                  </p>
                )}

                {product.free_shipping && (
                  <span className={styles.productList__shipping}>Envío gratis</span>
                )}

                {product.condition !== "new" && (
                  <p className={styles.productList__condition}>Usado</p>
                )}
              </div>
            </Link>
          </li>
        );
      }),
    [products]
  );

  return <ul className={styles.productList}>{productItems}</ul>;
}

export default ProductList;
