/* Cart section of application, divided into 4 parts, this is controller consisting of all the function/ 
    methods to actually work the part of request,For eg. items added in cart are checked over for conditional statements
    for Tax range, moduled as seperate function called 'calculateTax' and then added to cart.
*/

const cartRepository = require('./repository')
const productRepository = require('../Product/repository');

exports.addItemToCart = async (req, res) => {
    const {
        productId
    } = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    try {
        let cart = await cartRepository.cart();
        let productDetails = await productRepository.productById(productId);
        if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            });
        }
        // Check for cart
        if (cart) {
            const indexFound = cart.items.findIndex(item => item.productId.id == productId);

            if (indexFound !== -1 && quantity <= 0) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            } else if (indexFound !== -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price;
                cart.items[indexFound].tax = calculateTax(productDetails.price);
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            } else if (quantity > 0) {
                const tax = calculateTax(productDetails.price);
                cart.items.push({
                    productId: productId,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity),
                    tax: tax
                });
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            } else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                });
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            });
        } else {
            const tax = calculateTax(productDetails.price);
            const cartData = {
                items: [{
                    productId: productId,
                    quantity: quantity,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price,
                    tax: tax
                }],
                subTotal: parseInt(productDetails.price * quantity)
            };
            cart = await cartRepository.addItem(cartData);
            res.json(cart);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        });
    }
};

function calculateTax(price) {
    if (price > 5000) {
        return price * 0.18;                        // 18% tax (Tax PB)
    } else if (price > 1000 && price <= 5000) {
        return price * 0.12;                        // 12% tax (Tax PA)
    } else {
        return 200;                                 // Flat tax (Tax PC)
    }
}

// Get items of cart

exports.getCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not Found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

// Empty cart, reset bill to 0

exports.emptyCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart();
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}