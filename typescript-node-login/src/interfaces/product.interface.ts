export interface IProduct extends Document {
  type_id: string;
  sku: string;
  qty: number;
  price: number;
}
