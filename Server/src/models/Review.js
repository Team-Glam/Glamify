const { DataTypes } = require('sequelize');

const Review = (sequelize) => {
  sequelize.define(
    'Review',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5'),
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false, paranoid: true }
  );
};

module.exports = Review;
