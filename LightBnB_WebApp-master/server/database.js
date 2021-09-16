const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  console.log("--------EMAIL IS:",[email]);
  const queryString = `SELECT * 
                       FROM users
                       WHERE email = $1`;

  return pool
    .query(queryString, [email])
    .then(result => {
      if (result.rows) {
       return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  console.log([id]);
  const queryString = `SELECT name 
                       FROM users
                       WHERE id = $1`;
  return pool
    .query(queryString, [id])
    .then(result => {
      if (result.rows) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser =  function(user) {
  console.log([user.name, user.email, user.password]);
  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
  return pool
    .query(queryString, [user.name, user.email, user.password])
    .then(result => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

//  This function accepts a guest_id, limits the properties to 10 and returns a promise. The promise should resolve reservations for that user.

const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `SELECT properties.*, AVG(property_reviews.rating) AS average_rating, reservations.start_date, reservations.end_date
  FROM reservations 
  JOIN users ON users.id = reservations.guest_id
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON property_reviews.id = properties.id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date DESC
  LIMIT $2`;
  const values = [guest_id, limit];
  return pool
    .query(queryString, values)
    .then(result => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
  
  
  // return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT properties.*, AVG(property_reviews.rating) AS average_rating 
    FROM properties
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    GROUP BY properties.id
    LIMIT $1`, [limit])
    .then(result => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;



 