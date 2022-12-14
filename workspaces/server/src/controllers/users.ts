import { TokenPayload, UserItem } from "@project-webbshop/shared";
import { Request, Response } from "express";
import { JwtRequest } from "../app";
import { findUserById, handleNewUser, updateUser } from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phoneNumber, role, deliveryAddress } =
    req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  } else {
    try {
      const user = await handleNewUser(req.body);
      res.status(200).json({ message: "User created!" });
    } catch (err) {
      res.status(409).json({ error: "User already exists" });
    }
  }
};

export const getUser = async (req: JwtRequest<TokenPayload>, res: Response) => {
  const id = req?.user?.userId;
  if (id) {
    const user = await findUserById(id);
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "User not found" });
  }
};

export const editUser = async (
  req: JwtRequest<TokenPayload>,
  res: Response
) => {
  const body = req.body;
  const editables = [
    "name",
    "email",
    "phoneNumber",
    "roles",
    "deliveryAddress",
  ];
  let edits: Partial<UserItem> = {};

  editables.forEach((item) => {
    if (body.hasOwnProperty(item)) {
      edits[item as keyof UserItem] = body[item];

      if (item === "deliveryAddress") {
        const adressEditables = [
          "streetName",
          "streetNumber",
          "county",
          "postalCode",
        ];

        type AddressKey = {
          [key: string]: string | number;
        };
        adressEditables.forEach((adressItem) => {
          if (body[item].hasOwnProperty(adressItem)) {
            (edits[item as keyof UserItem] as AddressKey)[adressItem] =
              body[item][adressItem];
          }
        });
      } else if (item === "roles") {
        if (body[item].includes("admin")) {
          edits[item] = ["customer", "admin"];
        } else {
          edits[item] = ["customer"];
        }
      }
    }
  });

  if (Object.keys(edits).length) {
    let user: UserItem | null = null;
    try {
      user = await updateUser(req.user?.userId || "", edits);
    } catch (err) {
      console.error("ERROR: ", err);
      res.json({ error: "User not found" });
    }
    user
      ? res.json({ message: "User updated!", user })
      : res.json({ error: "User not found" });
  } else {
    res.json({ message: "Nothing to update" });
  }
};
