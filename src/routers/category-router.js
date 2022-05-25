import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
// import { categoryService } from '../services';

const categoryRouter = Router();


categoryRouter.get('/:sex/:type/', async(req,res,next)=>{
try {
  const { sex, type } = req.params;

  const category_specific = await categoryService.getCategory({
    sex, type,
  });
  res.status(201).json(category_specific);
} catch (error){
  next(error);
}
});

categoryRouter.post('/add', async(req,res,next)=>{
  try{

    const { sex, type } = req.body;

    const new_category = await categoryService.addCategories({
      sex, type,
    });

    res.status(201).json(new_product);
  } catch (error){
    next(error);
  }
});



export { categoryRouter };
