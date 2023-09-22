const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(
          'calzado',
          'jeans',
          'sudadera',
          'camisa',
          'abrigo'
        ),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('man', 'woman', 'unisex', 'accesory'),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      estado: {
        type: DataTypes.ENUM('A', 'B'), // A: Activo, B: Borrado
        allowNull: false,
        defaultValue: 'A', // Por defecto, un producto se considera activo
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};
