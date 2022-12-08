'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Elvis Ave',
        city: 'St. Louis',
        state: 'MO',
        country: 'United States',
        lat: 28.6271,
        lng: 91.1994,
        name: 'Fat Elvis',
        description: 'A lovely place to rock out',
        price: 209.01
      },
      {
        ownerId: 2,
        address: '456 Taylor Rd',
        city: 'St. Charles',
        state: 'MO',
        country: 'United States',
        lat: 11,
        lng: 12,
        name: 'Midnights',
        description: 'Chilln',
        price: 1109.99
      },
      {
        ownerId: 3,
        address: '789 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 1,
        address: '790 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 2,
        address: '791 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 3,
        address: '792 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 1,
        address: '793 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 2,
        address: '794 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 3,
        address: '795 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 1,
        address: '796 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 2,
        address: '797 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 3,
        address: '798 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 1,
        address: '799 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 2,
        address: '800 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
      {
        ownerId: 3,
        address: '801 Orange ct',
        city: 'Kansas City',
        state: 'KS',
        country: 'United States',
        lat: 99.9999,
        lng: 123.8438,
        name: 'Theres oranges everrrrywhere',
        description: 'citrus mistress',
        price: 49.85
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
