// Handles 3 main routes, product (or service), user (customer) and cart (billing items)

const productRoutes = require("./Product/routes");
const cartRoutes = require('./Cart/routes')
const userRoutes = require('./Users/routes')

module.exports = app => {
    app.use("/product", productRoutes);
    app.use("/cart", cartRoutes);
    app.use("/users", userRoutes);
}