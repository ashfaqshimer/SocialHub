const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
// const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Create a user
// @route   POST /api/v1/auth/register
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  // Hide the password
  user.password = undefined;
  
//   const token = user.getSignedJwtToken();
  res.status(201).json({ success: true, data: user });
});

