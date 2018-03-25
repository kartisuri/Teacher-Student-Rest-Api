'use strict';

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
    }, {});
    Student.associate = function (models) {
        // associations can be defined here
        Student.belongsTo(models.Teacher, {
            through: models.TeacherStudent,
            as: 'Teacher',
            onDelete: 'CASCADE',
            foreignKey: 'teacherId'
        })
    };
    return Student;
};
