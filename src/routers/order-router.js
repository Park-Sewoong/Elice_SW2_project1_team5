import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService, userService } from '../services';

const orderRouter = Router();

orderRouter.get('/all', loginRequired, async (req, res, next) => {
  try {

    const orders = await orderService.getAllOrder();
    
    res.status(201).json(orders);
  } catch (error) {
    next(error);
  }

});

orderRouter.post('/',async(req,res,next)=>{
  try{
     const { orderList, email, fullName, phoneNumber, postalCode, address1, address2 } = req.body; // destructuring

     const address= {postalCode, address1, address2};

    const createdOrder = await orderService.addOrder({
      orderList,email,fullName, phoneNumber,address
    })

    res.status(201).json(createdOrder);
  }
  catch(error){
    next(error);
  }

  // pagination
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 1);

  const [total, posts] = await Promise.all([
    Post.countDocuments({}),
    Post.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
  ])

  const totalPage = Math.ceil(total / perPage);

  res.render('/mypage/orderlist', { posts, page, perPage, totalPage })

});

orderRouter.get('/email/:email',async(req,res,next)=>{
  try{
    //email is admin
    let orders;
    const email= req.params.email;
    const user= await userService.getUserByEmail(email);
    if (user.role ==="admin"){
      orders= await orderService.getAllOrder();
    }
    //email is not admin
    else{
      orders= await orderService.getMyOrder(email);
    }

    res.status(200).json(orders);
  } catch(error){
    next(error);
  }
});

orderRouter.delete('/',async(req,res,next)=>{
  try{
    const order_id = req.body.order_id;
    const deletedCount = await orderService.deleteOrder(
      order_id)
    
    res.status(201).json(deletedCount);

  } catch(error){
    next(error);
  }
})

export { orderRouter };
