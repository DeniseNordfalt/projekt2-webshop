import { ProductItem } from "@project-webbshop/shared";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { encode } from "base-64";
import { UserContext } from "../../App";
import { addToCart, editProduct, getProductById } from "../../api";
import Layout from "../Layout";
import * as s from "./styles";
import ProductModal from "../ProductModal";

type Props = {};

const DetailedProduct = (props: Props) => {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [currentImage, setCurrentImage] = useState<any>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const productId = useParams().id;
  const { user } = useContext(UserContext);

  const renderImage = (imageName: string) => {
    return `${process.env.REACT_APP_SERVER_URL}/uploads/${imageName}`;
  };

  const fetchData = async () => {
    const data = await getProductById(productId || "");
    setProduct(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (product) {
      setCurrentImage(renderImage((product?.images[0] as any)?.filename));
    }
  }, [product]);

  const handleOnClick = (productId: string) => {
    addToCart(productId, 1);
  };

  const performProductEdit = async (
    target: any,
    updateProduct: ProductItem | Partial<ProductItem> | null
  ): Promise<void> => {
    const files = target[5].files;
    const formData = new FormData();
    formData.append("name", updateProduct?.name || "");
    formData.append("manufacturer", updateProduct?.manufacturer || "");
    formData.append("category", updateProduct?.category || "");
    formData.append("description", updateProduct?.description || "");
    formData.append("price", updateProduct?.price || "");
    formData.append("weight", updateProduct?.weight || "");
    if (files.length > 0) {
      for (const key in files) {
        formData.append("files", files[key]);
      }
    }
    await editProduct(updateProduct?._id || "0", formData);
    setIsModalVisible(false);
    window.location.reload();
  };

  return (
    <>
      {product && (
        <div>
          <p>
            <a href="/">Home</a> &#62;{" "}
            <a href={`/${encode(product.category)}`}>{product.category}</a>{" "}
            &#62; {product.name}
          </p>

          <h2 style={{ textAlign: "center" }}>{product.name}</h2>

          <s.ProductInfoWrapper>
            <div style={{ width: "100%" }}>
              {currentImage && (
                <>
                  <img src={currentImage} alt={product.name} />
                  <s.Thumbnails>
                    {product?.images?.map((image: any, index) => {
                      return (
                        <img
                          key={index}
                          src={renderImage(image?.filename)}
                          onClick={(e: any) => {
                            setCurrentImage(e.target?.src);
                          }}
                          alt={product.name}
                        />
                      );
                    })}
                  </s.Thumbnails>
                </>
              )}
            </div>
            <s.InfoContainer>
              <div>
                <s.Lable>Price:</s.Lable>
                <p>{product.price}kr</p>
                <s.Lable>Weight:</s.Lable>
                <p> {product.weight}kg</p>
                <s.Lable>Manufacturer: </s.Lable>
                <p> {product.manufacturer}</p>
              </div>
              <s.Lable>Description:</s.Lable>
              <p> {product.description}</p>
              <s.StyledButton
                onClick={(e) => handleOnClick(product._id as string)}
              >
                Add to cart
              </s.StyledButton>
              <br />
              {user?.roles.includes("admin") && (
                <s.StyledButton onClick={() => setIsModalVisible(true)}>
                  Edit product
                </s.StyledButton>
              )}
              {isModalVisible && (
                <ProductModal
                  data={product}
                  handleOnSubmit={performProductEdit}
                  setVisibility={setIsModalVisible}
                />
              )}
            </s.InfoContainer>
          </s.ProductInfoWrapper>
        </div>
      )}
    </>
  );
};

export default DetailedProduct;
