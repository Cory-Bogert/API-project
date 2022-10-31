'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'This was a good review',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'This was a bad review',
        stars: 1
      },
      {
        spotId: 3,
        userId: 3,
        review: 'this is a review i am a review',
        stars: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
