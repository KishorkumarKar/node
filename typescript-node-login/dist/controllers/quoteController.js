"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getQuote = exports.addProduct = exports.generateEmptyQuote = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const quote_model_1 = __importDefault(require("../models/quote.model"));
const product_models_1 = __importDefault(require("../models/product.models"));
const error_constant_1 = require("../constants/error.constant");
/**
 * Get Cart details
 * GET api/quote/getCart
 * @access public
 */
const getQuote = (0, express_async_handler_1.default)(async (req, res) => {
    let cartId = req.headers?.cart_id;
    const quote = await quote_model_1.default.findById(cartId);
    return res.status(error_constant_1.STATUS.SUCCESS_RESPONSE).json(quote);
});
exports.getQuote = getQuote;
/**
 * To generate Empty Cart
 * GET api/quote/emptyCart
 * @access public
 */
const generateEmptyQuote = (0, express_async_handler_1.default)(async (req, res) => {
    await quote_model_1.default.create({ status: "active" })
        .then((success) => res.status(error_constant_1.STATUS.NEW_DATA_CREATED).json(success))
        .catch((error) => {
        res.status(error_constant_1.STATUS.VALIDATION_ERROR);
        throw new Error("User data is not valid");
    });
});
exports.generateEmptyQuote = generateEmptyQuote;
/**
 * To add Product/Update Product QTY in cart
 * POST api/quote/product
 * @access public
 */
const addProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { sku, qty } = req.body;
    try {
        let cartId = req.headers?.cart_id;
        /* //----------USE of aggregate to update data----------
          const ObjectId = mongoose.Types.ObjectId;
          let specificProductData = await Quote.aggregate([
              {
                  $match: { _id: new ObjectId(cartId) }
              },
              {
                  $project: {
                      product: {
                          $filter: {
                              input: "$product",
                              as: "product",
                              cond: { $eq: ["$$product.sku", sku] }
                          }
                      }
                  }
              }
          ]);
  
          let updatedId: any = [];
          specificProductData = specificProductData[0].product;
  
          //-------with foreach it will not return updated(updatedId) id because it doesn't wait for promise------
          for (let index = 0; index < specificProductData.length; index++) {
              const productElement = specificProductData[index];
              try {
                  await Quote.updateOne({ "product._id": productElement._id }, { $set: { "product.$.qty": qty } });
                  updatedId.push(productElement._id);
              } catch (error: any) {
                  res.status(STATUS.VALIDATION_ERROR);
                  throw new Error(error.message);
  
              }
  
          }
  
          // specificProductData.forEach
          //     (
          //         async function (productElement: any) {
          //             try {
          //                 await Quote.updateOne({ "product._id": productElement._id }, { $set: { "product.$.qty": qty } });
          //                 updatedId.push(productElement._id);
          //             } catch (error: any) {
          //                 res.status(STATUS.VALIDATION_ERROR);
          //                 throw new Error(error.message);
  
          //             }
          //         }
          //     )
  
          //-------with foreach it will not return updated(updatedId) id because it doesn't wait for promise------
  
          console.log("+++++VVVVV", updatedId)
          return res.json(specificProductData);
          //----------USE of aggregate---------- */
        //-------------To add/update product on Quote---------------
        const quote = await quote_model_1.default.findById(cartId);
        if (!quote)
            throw new Error("is not a valid Quote");
        const existingChild = await quote.product.find((productData) => productData.sku == sku);
        if (existingChild) {
            existingChild.set({
                qty: qty + existingChild.qty,
            }); // update existing
        }
        else {
            // to add data
            let product = await product_models_1.default.findOne({ sku: sku });
            if (product && product.qty >= qty) {
                const { sku, type_id, price, _id } = product;
                const productObject = {
                    sku,
                    type_id,
                    qty: qty,
                    price,
                    product_id: _id,
                };
                quote.product.push(productObject);
            }
            else {
                res.status(error_constant_1.STATUS.VALIDATION_ERROR);
                throw new Error("Product Doesn't exist");
            }
        }
        await quote.save();
        res.status(error_constant_1.STATUS.MONGOOSE_ERROR);
        return res.json(quote);
        //-------------To add/update product on Quote---------------
        //+++++++++++++To add product on Quote ++++++++++++++
        /* let requestedQty = qty as number;
          let product = await Product.findOne({ sku: sku });
          if (product && product.qty >= qty) {
              const { sku, type_id, qty, price, _id } = product;
              let quote = await Quote.findOneAndUpdate({ _id: cartId },
                  {
                      $push: {
                          product: {
                              sku,
                              type_id,
                              qty: requestedQty,
                              price,
                              product_id: _id
                          }
                      }
                  },
                  { new: true });
              return res.json(quote);
          } else {
              res.status(STATUS.VALIDATION_ERROR);
              throw new Error("Product Doesn't exist");
          } */
        //+++++++++++++To add product on Quote ++++++++++++++
    }
    catch (error) {
        res.status(error_constant_1.STATUS.MONGOOSE_ERROR);
        throw new Error(error.message);
    }
});
exports.addProduct = addProduct;
/**
 * To delete product from cart
 * DELETE /product/:id
 * @access public
 */
const deleteProduct = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const cartId = req.headers.cart_id;
        const productId = req.params.id;
        console.log(productId);
        const removeProduct = await quote_model_1.default.findOneAndUpdate({ _id: cartId }, {
            $pull: {
                product: {
                    _id: productId,
                },
            },
        }, { new: true });
        // const quote = await Quote.findById(cartId);
        return res.status(error_constant_1.STATUS.SUCCESS_RESPONSE).json(removeProduct);
        // return res.status(STATUS.SUCCESS_RESPONSE).json({ deleted: true });
    }
    catch (error) {
        res.status(error_constant_1.STATUS.MONGOOSE_ERROR);
        throw new Error(error.message);
    }
});
exports.deleteProduct = deleteProduct;
