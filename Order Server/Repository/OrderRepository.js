const orders = require("../Models/Orders");

async function create(data) {
  try {
    return await orders.create(data);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create
}