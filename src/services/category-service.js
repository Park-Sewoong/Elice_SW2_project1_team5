import { categoryModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async getCategory(req_input) {
    const { sex, type } = req_input;
    const category = { sex, type };
    const categories = await this.categoryModel.findByCategory(category);
    if (!categories) {
      throw new Error(
        '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return categories;
  }

  async addCategories(req_input) {
    const createdcategory = await this.categoryModel.insertCategory(req_input);
    return createdcategory;
  }

  //category 정보 삭제
  async deleteCategory(type) {
    category = await this.categoryModel.deleteCategory(type);

    if (!type) {
      throw new Error('삭제에 실패했습니다. 다시 한 번 확인해 주세요.');
    }
    return category;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
