import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {

  async findOne(sex) {
    const category = await Category.findOne({ sex });
    return category;
  }

  async insertCategory(category) {
    const createdNewCategory = await Category.create(category);
    return createdNewCategory;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async findByCategory(input) {
    const { sex, type } = input;
    const findCategory = await Category.findOne({input}); // 쿼리문안에 들어간다
    return findCategory;
  }


  async update({ categoryRequired, update }) {
    const filter = { category: categoryRequired };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(filter, update, option);
    return updatedCategory;
  }


  async deleteCategory (input) {
    const { sex, type } = input;
    const { deletedCount } = await Category.deleteOne({ sex:sex, type:type });

    return deletedCount
  }
}


const categoryModel = new CategoryModel();

export { categoryModel };
