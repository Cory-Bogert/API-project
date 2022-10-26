'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Bookings', [
    {
      spotId: 1,
      userId: 5,
      startDate: '2022-03-03',
      endDate: '2022-05-03'
    },
    {
      spotId: 2,
      userId: 12,
      startDate: '2022-05-22',
      endDate: '2022-06-22'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2022-01-03',
      endDate: '2022-01-10'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
