const user = require("./model");

exports.createSignIn = async payload => {
    const newuser = await user.create(payload);
    return newuser
}

exports.createLogin = async payload => {
    const newuser = await user.create(payload);
    return newuser
}

