module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(300),
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      stripeClientId: {
        allowNull: true,
        type: Sequelize.STRING(300)
      },
      premium: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      Birthday: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recoverPasswordToken: {
        allowNull: true,
        type: Sequelize.STRING(300),
        defaultValue: null,
      },
      recoverPasswordCode: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      loginType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profilePhoto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
