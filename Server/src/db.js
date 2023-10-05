const { Sequelize, DataTypes } = require('sequelize');

const fs = require('fs');
const path = require('path');

//requerimos dotenv
require('dotenv').config();

//obtenemos las variables del env
const { DB_HOST } = process.env;

const sequelize = new Sequelize(DB_HOST, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, 'models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, 'models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

//extraemos los modelos
sequelize.models = Object.fromEntries(capsEntries);
// Relaciones

const { Product, Purchase, Review, Favorite } = sequelize.models;

// Relación Product - Review
Product.hasMany(Review);
Review.belongsTo(Product);

// Relación Product - Purchase
const Purchase_Detail = sequelize.define(
  'Purchase_Detail',
  { quantity: DataTypes.INTEGER },
  { timestamps: false }
);

Product.belongsToMany(Purchase, { through: Purchase_Detail });
Purchase.belongsToMany(Product, { through: Purchase_Detail });
Product.hasMany(Purchase_Detail);
Purchase_Detail.belongsTo(Product);
Purchase.hasMany(Purchase_Detail);
Purchase_Detail.belongsTo(Purchase);

// Relación Product - Favorite
Product.hasMany(Favorite);
Favorite.belongsTo(Product);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
