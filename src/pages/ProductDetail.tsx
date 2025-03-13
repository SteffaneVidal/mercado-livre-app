import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import ContainerContents from "../components/ContainerContents";
import styles from "../styles/ProductDetails.module.scss";

type Attribute = {
  id: string;
  name: string;
  value_name: string;
};

type ProductDetailsType = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
    regular_amount?: number;
  };
  pictures: string[];
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
  installments?: string;
  attributes: Attribute[];
  category_path_from_root: string[];
};

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoryPath, setCategoryPath] = useState<string[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProductDetails(data.item);
        setSelectedImage(data.item.pictures[0]);

        if (data.item.category_path_from_root) {
          setCategoryPath(data.item.category_path_from_root);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do produto:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!productDetails) return <p>Produto não encontrado.</p>;

  const formatPrice = (value: number) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const colorAttribute = productDetails.attributes.find(attr => attr.id === "COLOR");

  return (
    <div className="page-background">
      <Header />

      {/* Breadcrumb */}
      <nav className={styles.productDetails__breadcrumb}>
        <Link to="/" className={styles.productDetails__breadcrumbLink}>Volver al listado</Link>
        {" | "}
        {categoryPath.map((category, index) => (
          <span key={index} className={styles.productDetails__breadcrumbItem}>
            {index > 0 && " > "}
            {category}
          </span>
        ))}
      </nav>

      <ContainerContents>
        <div className={styles.productDetails}>
          {/* Miniaturas laterais */}
          <div className={styles.productDetails__thumbnails}>
            {productDetails.pictures.slice(0, 7).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagem ${index + 1}`}
                className={`${styles.productDetails__thumbnail} ${
                  selectedImage === image ? styles.active : ""
                }`}
                onClick={() => setSelectedImage(image)}
                onMouseEnter={() => setSelectedImage(image)}
              />
            ))}
          </div>

          {/* Imagem principal */}
          <div className={styles.productDetails__mainImageContainer}>
            <img
              src={selectedImage || productDetails.pictures[0]}
              alt="Imagem principal"
              className={styles.productDetails__mainImage}
            />
          </div>

          {/* Detalhes do produto */}
          <div className={styles.productDetails__info}>
            {/* 🏷️ Novo ou Usado */}
            <p className={styles.productDetails__condition}>
              {productDetails.condition === "new" && "Novo"}
              {productDetails.condition === "used" && "Usado"}
              {productDetails.condition === "reconditioned" && "Recondicionado"}
              {" "} | {productDetails.sold_quantity} vendidos
            </p>

            <h1 className={styles.productDetails__title}>{productDetails.title}</h1>
            <p className={styles.productDetails__seller}>Por OCEANGREEN ARGENTINA</p>

            <p className={styles.productDetails__price}>{formatPrice(productDetails.price.amount)}</p>

            {productDetails.installments && (
              <p className={styles.productDetails__installments}>
                Mesmo preço em {productDetails.installments.replace(
                  /(\d+)x\s([\d.]+)/,
                  (_match: string, installments: string, value: string) =>
                    `${installments}x ${formatPrice(Number(value))}`
                )}
              </p>
            )}

            {productDetails.free_shipping && (
              <p className={styles.productDetails__shipping}>Envio grátis</p>
            )}

            {/* 🎨 Exibir a cor do produto */}
            {colorAttribute && (
              <p className={styles.productDetails__color}>
                Cor: <strong>{colorAttribute.value_name}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Descrição do produto */}
        <div className={styles.productDetails__descriptionContainer}>
          <h2>Descrição</h2>
          <p>{productDetails.description}</p>
        </div>
      </ContainerContents>
    </div>
  );
}

export default ProductDetails;
