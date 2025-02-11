const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/sqlDB');

// Define the User model
const Admin = sequelize.define('Admin', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    hooks: {
        // Before saving a user, hash the password
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Method to compare entered password with stored hashed password
Admin.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = Admin;
