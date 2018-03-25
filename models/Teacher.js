'use strict';

module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
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
    }, {});
    Teacher.associate = function (models) {
        // associations can be defined here
        Teacher.hasMany(models.Student, {
            through: models.TeacherStudent,
            as: 'student',
            onDelete: 'CASCADE',
            foreignKey: 'teacherId'
        })
    };
    return Teacher;
};
