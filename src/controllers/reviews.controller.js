const catchAsync = require('../utils/catchAsync');
const Reviews = require('../models/review.model');

exports.createReview = catchAsync(async (req, res, next) => {
  const { currentUser } = req;
  const { id } = req.params;
  const { comment, rating } = req.body;

  const review = await Reviews.create({
    comment,
    rating,
    userId: currentUser.id,
    restaurantId: id
  });
  return res.status(201).json({
    status: 'Success',
    message: 'Successfully created review',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const {comment, rating } = req.body
  const {review} = req
  
  await review.update({ comment, rating})

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully updated review',
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const {review} = req
  
  await review.update({ status: false})

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully deleted review',
  });
});
