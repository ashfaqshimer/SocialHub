// const path = require('path');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const colors = require('colors');
const cors = require('cors');

// Local imports
const { connectDb } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDb();

// Route files
const auth = require('./routes/auth');

const app = express();

// Body parser~~
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// // Set static folder
app.use('/api/v1/auth', auth);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.error(`Error: ${err.message}`.red);
	// Close server and exit process
	server.close(() => process.exit(1));
});
