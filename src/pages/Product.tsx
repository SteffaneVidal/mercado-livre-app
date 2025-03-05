import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Product = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  pictures: string[];
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
  attributes: { id: string; name: string; value_name: string }[];
};

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.item);
        setLoading(false);

        document.title = `${data.item.title} - Mercado Livre`;

        let metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.remove();
        }

        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = `Compre ${data.item.title} pelo melhor preço!`;
        document.head.appendChild(newMeta);

        console.log("Meta description adicionada:", newMeta.content); 
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do produto:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.pictures[0]} alt={product.title} width="300" />
      <p>
        <strong>Preço:</strong> {product.price.currency} {product.price.amount.toFixed(2)}
      </p>
      <p><strong>Condição:</strong> {product.condition}</p>
      <p><strong>Quantidade vendida:</strong> {product.sold_quantity}</p>
      {product.free_shipping && <p>🚚 Frete grátis disponível!</p>}
      <h2>Descrição</h2>
      <p>{product.description}</p>

      <h2>Características</h2>
      <ul>
        {product.attributes.map(attr => (
          <li key={attr.id}><strong>{attr.name}:</strong> {attr.value_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
