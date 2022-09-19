//DWCHOI 2022_05_23 
//THIS FILE IS NOT DONE WITH MODIFICATION

import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {

 
  async findByCategory(category) {
    const {sex,type} =category;
    const products = await Product.find({category: {sex:sex, type:type}});
    return products;
  }

  async findByProductId(product_id) {
    const product = await Product.findOne({product_id});
    return product;
  }

  async insertItem(product_object){
    const createdproduct = await Product.create(product_object);
    return createdproduct;
  }
  //define
  async deleteProduct(product_id){
    const {deletedCount}= await Product.deleteOne({product_id});
    return deletedCount;
  }
  async findAll(){
    const allProducts = await Product.find({});
    return allProducts;
  }
  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

 

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}


const productModel = new ProductModel();

export { productModel };
