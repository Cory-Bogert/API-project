'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
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
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
