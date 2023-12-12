const { green } = require('colors');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.MYSQL_HOST,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	logging: false,
});

const connectDb = async () => {
	try {
		// Connect to the MySQL server to check if the database exists
		await sequelize.authenticate();

		// Create the database if it doesn't exist
		await sequelize.query(
			`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`
		);

		// Select the database
		await sequelize.query(`USE ${process.env.MYSQL_DATABASE};`);

		// Synchronize the models with the database
		await sequelize.sync({ force: true }); // Change to false if you don't want to force sync

		console.log(
			`MySQL database connected: ${process.env.MYSQL_DATABASE}`.blue.bold
		);
		console.log('All models were synchronized successfully.'.green);

		return sequelize;
	} catch (error) {
		console.error('Unable to connect to the MySQL database:', error);
		throw new Error('Database connection failed');
	}
};

module.exports = { connectDb, sequelize };
