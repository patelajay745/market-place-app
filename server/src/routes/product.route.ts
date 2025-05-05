import { Router } from "express";
import {
  deleteProduct,
  deleteProductImage,
  getLatestProduct,
  getListedAllProduct,
  getProduct,
  getProductByCategory,
  listProduct,
  updateProduct,
} from "src/controllers/product.controller";
import { isAuth } from "src/middleware/isAuth";
import { fileParser } from "src/middleware/middleware";
import { validate } from "src/middleware/validator";
import { newProductSchema } from "src/utils/validationSchema";

export const productRouter = Router();

productRouter.get("/latest", getLatestProduct);
productRouter.get("/by-category/:category", getProductByCategory);

productRouter.post(
  "/list",
  fileParser, isAuth,
  validate(newProductSchema),
  listProduct
);
productRouter.patch(
  "/:id",
  fileParser, isAuth,
  validate(newProductSchema),
  updateProduct
);
productRouter.delete("/:id", isAuth, deleteProduct);
productRouter.delete("/image/:productId/:imageId", isAuth, deleteProductImage);
productRouter.get("/listings", isAuth, getListedAllProduct);
productRouter.get("/details/:id", getProduct);

