import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async findOne(type) {
    const category = await User.findOne({ type });
    return category;
  }

  async findOne(sex) {
    const category = await User.findOne({ sex });
    return category;
  }

  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async update({ type, sex }) {
    const filter = { type };
    const option = { sex };

    const updatedCategory = await User.findOneAndUpdate(filter, update, option);
    return updatedCategory;
  }

  async deleteCategory (type) {
    const { deletedCount } = await Type.deleteOne({ type });
    return deletedCount
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };