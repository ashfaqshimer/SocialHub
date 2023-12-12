const { Sequelize } = require('sequelize');

const connectDb = async () => {
  // Create a Sequelize instance without specifying the database name
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    logging: false,
  });

  try {
    // Connect to the MySQL server to check if the database exists
    await sequelize.authenticate();

    // Create the database if it doesn't exist
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`);

    // Close the initial connection without a database name
    await sequelize.close();

    // Create a new Sequelize instance with the specified database name
    const db = new Sequelize({
      database: process.env.MYSQL_DATABASE,
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      logging: false,
      define: {
        timestamps: false, // Disable sequelize timestamps if not needed
      },
    });

    // Test the connection to the created database
    await db.authenticate();

    console.log(`MySQL database connected: ${process.env.MYSQL_DATABASE}`.cyan.underline.bold);
    return db;
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
    throw new Error('Database connection failed');
  }
};

module.exports = connectDb;
