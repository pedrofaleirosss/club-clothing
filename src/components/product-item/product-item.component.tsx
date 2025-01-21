// Styles
import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from "./product-item.styles";

// Utilities
import IProduct from "../../interfaces/products";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl} />

      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;
