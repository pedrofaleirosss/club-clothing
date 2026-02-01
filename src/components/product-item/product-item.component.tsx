import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";

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
import {
  addProductToCart,
  toggleCart,
} from "../../store/toolkit/cart/cart.slice";
import { AppDispatch } from "../../store/store";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCartClick = () => {
    dispatch(addProductToCart(product));
    dispatch(toggleCart());
  };

  return (
    <ProductContainer>
      <ProductImage $imageUrl={product.imageUrl}>
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
