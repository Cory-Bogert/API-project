'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'thisisaurl.adr',
        preview: true
      },
      {
        spotId: 2,
        preview: false
      },
      {
        spotId: 3,
        url: 'IaMaUrLLLL.com',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
