import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as s from "./styles";

import { getUser } from "../../../api";

import { UserContext } from "../../../App";

type Props = {};

export default function Header({}: Props) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const response = await getUser();

      if (response.status === 200) {
        setUser(response.data);
      } else if (response.status === 401) {
        localStorage.removeItem("access_token");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/");
  };
  return (
    <s.Container>
      <s.Logo>
        <Link to={"/"}>WEBSHOP</Link>
      </s.Logo>
      <s.Nav>
        {user ? (
          <s.User>
            <s.UserName onClick={handleClick}>{user?.name}</s.UserName>
            <s.UserMenu isVisible={isVisible}>
              {user?.roles.includes("admin") && (
                <s.UserMenuItem href="/admin">Admin</s.UserMenuItem>
              )}
              <s.UserMenuItem href="/me">Profile</s.UserMenuItem>
              <s.UserMenuItem href="/orders">Orders</s.UserMenuItem>
              <s.UserMenuItem href="/shoppingcart">ShoppingCart</s.UserMenuItem>
              <s.UserMenuItem onClick={logout}>Logout</s.UserMenuItem>
            </s.UserMenu>
          </s.User>
        ) : (
          <s.User>
            <s.UserMenuItem href="/user">Login</s.UserMenuItem>
          </s.User>
        )}
      </s.Nav>
    </s.Container>
  );
}
