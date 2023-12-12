const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/db');

const User = sequelize.define(
	'User',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [6],
					msg: 'Password must be at least 6 characters long',
				},
			},
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: 'user',
			validate: {
				isIn: [['user']],
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = User;
