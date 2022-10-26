'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'https://user-images.githubusercontent.com/104010694/197628874-2d26742f-2488-40e4-b7fa-9257ef209eb2.png'
      },
      {
        reviewId: 2
      },
      {
        reviewId: 3,
        url: 'https://www.google.com/search?q=image&rlz=1C1CHBF_enUS922US922&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj_3ISgn_76AhWnkWoFHd7fB8UQ_AUoAXoECCoQAw&biw=1152&bih=1934&dpr=1.25#imgrc=I47E5zEVdN-joM'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
