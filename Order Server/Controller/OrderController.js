const OrderService = require("../Services/OrderService");
const { FindUser, FindProduct, GetBulkProducts } = require("../Clients/InterService");

exports.createOrder = async (req, res) => {

  const { productId, quantity, price, address, phoneNumber, paymentMethod, orderId, paymentStatus, deliveryCharge, totalAmount } = req.body;
  const userId = req.user.id;

  try {

    const findUser = await FindUser(userId);
    
    if (!findUser) {
      return res.status(404).json({
        message: "User Not Found! Try to Login Again"
      })
    }

    const findProduct = await FindProduct(productId);

    if (!findProduct) {
      return res.status(404).json({
        message: "Product Not Found"
      })
    }
    
    const data = {
      userId: findUser._id,
      productId: findProduct._id,
      quantity,
      price: findProduct.price,
      address,
      phoneNumber,
      paymentMethod,
      orderId,
      paymentStatus,
      deliveryCharge,
      totalAmount,
    }
    const order = await OrderService.createOrder(data);
    res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}   