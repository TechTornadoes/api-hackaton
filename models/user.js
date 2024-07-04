module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id_utilisateurs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      tel: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      date_naissance: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sexe: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      qualification: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pays: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ville: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      statut: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    });
  
    return User;
  };
  