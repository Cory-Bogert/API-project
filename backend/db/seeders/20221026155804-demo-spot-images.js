'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://www.google.com/search?q=st+louis+houses+for+sale&rlz=1C1CHBF_enUS922US922&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiitL_Zof76AhVNj2oFHTkHDncQ_AUoAnoECAIQBA&biw=1152&bih=1934&dpr=1.25#imgrc=XiQvPW4O_5DhhM',
        preview: true
      },
      {
        spotId: 2,
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.google.com/search?q=kansas+city+houses&tbm=isch&ved=2ahUKEwi_jdraof76AhWFs2oFHZtDBXQQ2-cCegQIABAA&oq=kansas+city+houses&gs_lcp=CgNpbWcQAzIFCAAQgAQyBAgAEEMyBQgAEIAEMgYIABAFEB4yBggAEAUQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB46BwgAEIAEEBg6CwgAEIAEELEDEIMBOggIABCABBCxAzoICAAQsQMQgwE6BwgAELEDEEM6CggAELEDEIMBEENQtwdYmhlgqxpoAHAAeACAAYwBiAGcC5IBBDE3LjKYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=VFlZY7-TMoXnqtsPm4eVoAc&bih=1934&biw=1152&rlz=1C1CHBF_enUS922US922',
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
