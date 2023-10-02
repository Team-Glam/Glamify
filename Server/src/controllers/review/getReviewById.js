const { Review } = require('../../db');

const getReviewByIdController = async (reviewId) => {
  try {
    const review = await Review.findByPk(reviewId);
    return review;
  } catch (error) {
    throw new Error('Error al obtener la reseña');
  }
};

module.exports = { getReviewByIdController };
