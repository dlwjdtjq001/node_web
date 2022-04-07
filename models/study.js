const Sequelize = require('sequelize');

module.exports = class Study extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            subject: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            time: {
                type: Sequelize.INTEGER(100),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Study',
            tableName: 'studies',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Study.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
      }
};
