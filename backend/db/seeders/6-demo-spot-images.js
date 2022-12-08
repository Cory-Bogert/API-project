'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-40218578/original/8b3e06f3-bcb0-45ce-8db4-f2d9dfe5889f.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/cb5dc7d7-c079-4391-b518-9439a63dc9e6.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-43858161/original/b3fa7c5e-90aa-4595-885c-cca12a92a741.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/5bd69eb7-e4ae-4615-97b7-440f1658683c.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/36deb313-d961-4cea-b9e1-045bb5907ec7.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714659286766381030/original/ca8633af-3e34-4d5d-9911-52dc04c93f6a.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-698631931253224288/original/232c595b-941a-4118-a229-87fe77570993.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/2ce2a515-078f-4c71-9b94-e2d0997f46d0.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-706381619820981565/original/f62cd94b-ead7-4d65-940d-6141562c57c3.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-715732504820084395/original/c8781e97-f791-429e-b5ec-145a2d8744a4.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-711480859079610656/original/d9269f3f-a7fa-4032-ab0c-554b5229ceb7.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-735542330357205664/original/8b8ebac7-b4b7-43d1-a995-cc849c3179e4.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-714990244053655112/original/924227c8-28c5-4fd5-a853-25a751ff4958.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-734596846818164578/original/4cebb10d-c7f2-4add-9c74-58d74f683431.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-709425013149528376/original/c3841205-def4-40a6-a6c1-9b0cfab58688.jpeg?im_w=720',
        preview: true
      },

    ])
  },

   down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
    }, {});
  }
};
