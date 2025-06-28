import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Quote from "../models/quote.model";
import Product from "../models/product.models";
import { STATUS } from "../constants/error.constant";
import { IProductRequest, IProduct } from "../interfaces/product.interface";
import { IQuoteProductInterface } from "../interfaces/quote.interface";
import mongoose from "mongoose";

/**
 * Get Cart details
 * GET api/quote/getCart
 * @access public
 */
const getQuote = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    let cartId = req.headers?.cart_id;
    const quote = await Quote.findById(cartId);
    return res.status(STATUS.SUCCESS_RESPONSE).json(quote);
  },
);

/**
 * To generate Empty Cart
 * GET api/quote/emptyCart
 * @access public
 */
const generateEmptyQuote = asyncHandler(async (req: Request, res: Response) => {
  await Quote.create({ status: "active" })
    .then((success) => res.status(STATUS.NEW_DATA_CREATED).json(success))
    .catch((error) => {
      res.status(STATUS.VALIDATION_ERROR);
      throw new Error("User data is not valid");
    });
});

/**
 * To add Product/Update Product QTY in cart
 * POST api/quote/product
 * @access public
 */
const addProduct = asyncHandler(
  async (req: IProductRequest<IProduct>, res: Response): Promise<any> => {
    const { sku, qty } = req.body;
    try {
      let cartId = req.headers?.cart_id as string;
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
      const quote = await Quote.findById(cartId);
      if (!quote) throw new Error("is not a valid Quote");
      const existingChild = await quote.product.find(
        (productData) => productData.sku == sku,
      );
      if (existingChild) {
        existingChild.set({
          qty: qty + existingChild.qty,
        }); // update existing
      } else {
        // to add data
        let product = await Product.findOne({ sku: sku });
        if (product && product.qty >= qty) {
          const { sku, type_id, price, _id } = product;
          const productObject: Partial<IQuoteProductInterface> = {
            sku,
            type_id,
            qty: qty,
            price,
            product_id: _id,
          };
          quote.product.push(productObject as IQuoteProductInterface);
        } else {
          res.status(STATUS.VALIDATION_ERROR);
          throw new Error("Product Doesn't exist");
        }
      }
      await quote.save();
      res.status(STATUS.MONGOOSE_ERROR);
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
    } catch (error: any) {
      res.status(STATUS.MONGOOSE_ERROR);
      throw new Error(error.message);
    }
  },
);

/**
 * To delete product from cart
 * DELETE /product/:id
 * @access public
 */
const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      const cartId = req.headers.cart_id;
      const productId = req.params.id;
      console.log(productId);

      const removeProduct = await Quote.findOneAndUpdate(
        { _id: cartId },
        {
          $pull: {
            product: {
              _id: productId,
            },
          },
        },
        { new: true },
      );
      // const quote = await Quote.findById(cartId);
      return res.status(STATUS.SUCCESS_RESPONSE).json(removeProduct);
      // return res.status(STATUS.SUCCESS_RESPONSE).json({ deleted: true });
    } catch (error: any) {
      res.status(STATUS.MONGOOSE_ERROR);
      throw new Error(error.message);
    }
  },
);

export { generateEmptyQuote, addProduct, getQuote, deleteProduct };
