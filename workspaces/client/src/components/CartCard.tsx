import { CartItem, ProductItem } from "@project-webbshop/shared";
import { CartProduct } from "@project-webbshop/shared/src/CartItem";
import React from "react";
import styled from "styled-components";
import { deleteCartItem } from "../api";
import CartFeed from "./CartFeed";

const Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  min-height: 200px;
  overflow-y: none;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
`;

type ThemeProps = {
  src?: string;
};

const Thumbnail = styled.div`
  width: 40%;
  height: 75%;
  background-image: ${(props: ThemeProps) => `url(${props.src})`};
  background-position: left-center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const StyledButton = styled.button`
  background: black;
  color: white;
  font-size: 18px;
  width: 100px;
  margin: 10px;
  border: none;
  padding: 15px;
  &:hover {
    background: grey;
    transition-duration: 0.4s;
    cursor: pointer;
  }
`;

type Props = {
  item: ProductItem;
  deleteProduct: Function;
};

const CartCard = ({ item, deleteProduct }: Props) => {
  const renderImage = (imageName: string) => {
    return `${process.env.REACT_APP_SERVER_URL}/uploads/${imageName}`;
  };

  return (
    <Container key={item.productId}>
      <Thumbnail src={renderImage(item.images[0].filename)} />
      <TextWrapper>
        <h3 style={{ margin: "10px" }}>{item.name}</h3>
        <p>Qty: {item.quantity}</p>
        <p>Price: {item.price} kr/ each</p>

        <p>Total: {item.totalCost}</p>
       

        <StyledButton onClick={(e) => deleteProduct(item._id as string)}>
          Remove
        </StyledButton>
      </TextWrapper>
    </Container>
  );
};

export default CartCard;
