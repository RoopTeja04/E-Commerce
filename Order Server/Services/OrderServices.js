const OrderRepository = require("../Repository/OrderRepository");

async function createOrder(data) {
  try {
    return await OrderRepository.create(data);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder
}