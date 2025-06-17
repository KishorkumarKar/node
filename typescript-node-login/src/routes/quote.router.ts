import express from "express";
const router = express.Router();
import {
  generateEmptyQuote,
  addProduct,
  getQuote,
  deleteProduct,
} from "../controllers/quoteController";
import { addProductValidation } from "../middlewares/validation/quote/quoteValidation.middleware";

router.get("/emptyCart", generateEmptyQuote);
router.get("/getCart", getQuote);
router.post("/product", addProductValidation, addProduct);
router.delete("/product/:id", deleteProduct);
router.post("/billingAddress", (req, res) => {
  res.json("emptyCart");
});
router.put("/billingAddress/:id", (req, res) => {
  res.json("emptyCart");
});
router.post("/shippingAddress", (req, res) => {
  res.json("emptyCart");
});
router.put("/shippingAddress/:id", (req, res) => {
  res.json("emptyCart");
});

export default router;
