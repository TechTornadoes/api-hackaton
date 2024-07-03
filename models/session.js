module.exports = (sequelize, DataTypes) => {
    const Sessions = sequelize.define('Sessions', {
      idSession:{ 
        type:DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  
    return Sessions;
  };
  