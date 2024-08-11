const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = async (plainPassword) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    return await bcrypt.hash(plainPassword, salt);
}