import { orderModel } from '../db';

class OrderService{
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
    // 객체 destructuring
    const createdOrder = await this.orderModel.create(orderInfo);
    return createdOrder;
  }
  async getAllOrder(){
    const allOrders= await this.orderModel.findAllOrder();
    return allOrders;
  }
  async getMyOrder(email){
    const myOrders= await this.orderModel.findByEmail(email);
    return myOrders;
  }

}

const orderService = new OrderService(orderModel);
export{orderService};
