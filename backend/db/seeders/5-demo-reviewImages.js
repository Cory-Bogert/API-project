'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url:'image.url1'
      },
      {
        reviewId: 1,
        url: 'image.url2'
      },
      {
        reviewId: 1,
        url:'image.url3'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages', {
      url: { [Op.in]: ['image.url1', 'image.url2', 'image.url3']}
    }, {});
  }
};
