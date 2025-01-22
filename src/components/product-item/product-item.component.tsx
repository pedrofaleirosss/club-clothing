import { BsCartPlus } from "react-icons/bs";
import { useContext } from "react";

// Components
import CustomButton from "../custom-button/custom-button.component";

// Styles
import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from "./product-item.styles";

// Utilities
import IProduct from "../../interfaces/products";
import { CartContext } from "../../contexts/cart.context";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addProductToCart } = useContext(CartContext);

  const handleAddToCartClick = () => {
    addProductToCart(product);
  };

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton startIcon={<BsCartPlus />} onClick={handleAddToCartClick}>
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>

      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;
