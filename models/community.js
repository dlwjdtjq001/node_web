const Sequelize = require('sequelize');

module.exports = class Community extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(100),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Community',
            tableName: 'communities',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Study.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
      }
};
