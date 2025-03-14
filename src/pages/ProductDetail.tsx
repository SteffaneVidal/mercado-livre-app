import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<ProductDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoryPath, setCategoryPath] = useState<string[]>([]);

  useEffect(() => {
    const lastSearch = new URLSearchParams(window.location.search).get("search");
  if (lastSearch) {
    sessionStorage.setItem("lastSearch", lastSearch);
  }

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
        console.error("Error al obtener los detalles del producto:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!productDetails) return <p>Producto no encontrado.</p>;

  const formatPrice = (value: number) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getAttribute = (attrId: string) => 
    productDetails.attributes.find(attr => attr.id === attrId)?.value_name || null;
  

  const handleGoBack = () => {
    const lastSearch = sessionStorage.getItem("lastSearch") || "";
    navigate(`/items?search=${encodeURIComponent(lastSearch)}`);
  };
  

  return (
    <div className="page-background">
      <Header />

      <div className={styles.productDetails__breadcrumbContainer}>
      <nav className={styles.productDetails__breadcrumb}>
        <span className={styles.productDetails__breadcrumbLink} onClick={handleGoBack}>
          Volver al listado
        </span>
        {" | "}
        {categoryPath.map((category, index) => (
          <span key={index} className={styles.productDetails__breadcrumbItem}>
            {index > 0 && " > "}
            {category}
          </span>
        ))}
      </nav>
      <span className={styles.productDetails__publication}>
        Publicación: <strong>#{productDetails.id}</strong>
      </span>
    </div>

      <ContainerContents>
        <div className={styles.productDetails}>
          {/* Miniaturas laterales */}
          <div className={styles.productDetails__thumbnails}>
            {productDetails.pictures.slice(0, 7).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                className={`${styles.productDetails__thumbnail} ${
                  selectedImage === image ? styles.active : ""
                }`}
                onClick={() => setSelectedImage(image)}
                onMouseEnter={() => setSelectedImage(image)}
              />
            ))}
          </div>

          <div className={styles.productDetails__mainImageContainer}>
            <img
              src={selectedImage || productDetails.pictures[0]}
              alt="Imagen principal"
              className={styles.productDetails__mainImage}
            />
          </div>

          <div className={styles.productDetails__info}>
            <p className={styles.productDetails__condition}>
              {productDetails.condition === "new" && "Nuevo"}
              {productDetails.condition === "used" && "Usado"}
              {productDetails.condition === "reconditioned" && "Reacondicionado"}
              {productDetails.sold_quantity && productDetails.sold_quantity > 0 &&
                ` | ${productDetails.sold_quantity} vendidos`}
            </p>

            <h1 className={styles.productDetails__title}>{productDetails.title}</h1>
            <p className={styles.productDetails__seller}>Por OCEANGREEN ARGENTINA</p>

            <p className={styles.productDetails__price}>{formatPrice(productDetails.price.amount)}</p>

            {productDetails.installments && productDetails.installments.length > 0 && (
              <p className={styles.productDetails__installments}>
                Mismo precio en {productDetails.installments}
              </p>
            )}

            {productDetails.free_shipping && (
              <p className={styles.productDetails__shipping}>Envío gratis</p>
            )}

          <ul className={styles.productDetails__attributes}>
            {getAttribute("MODEL") && <li>Modelo: <strong>{getAttribute("MODEL")}</strong></li>}
            {getAttribute("INTERNAL_MEMORY") && <li>Memoria interna: <strong>{getAttribute("INTERNAL_MEMORY")}</strong></li>}
            {getAttribute("DISPLAY_SIZE") && <li>Tamaño de pantalla: <strong>{getAttribute("DISPLAY_SIZE")}</strong></li>}
            {getAttribute("COLOR") && <li>Color: <strong>{getAttribute("COLOR")}</strong></li>}
            {getAttribute("BATTERY_TYPE") && <li>Batería: <strong>{getAttribute("BATTERY_TYPE")}</strong></li>}
          </ul>
          </div>
        </div>

        <hr className={styles.productDetails__divider} />

        <div className={styles.productDetails__descriptionContainer}>
          <h2 className={styles.productDetails__descriptionTitle}>Descripción</h2>
          <p>{productDetails.description}</p>
        </div>
      </ContainerContents>
    </div>
  );
}

export default ProductDetails;
