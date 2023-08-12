module.exports = (sequelize, DataTypes) => {

    const alias = 'Factura';

    const columnas = {
        id:  {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        'metodo-pago': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'usuarios-fk': {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        'created-at': {
            type: DataTypes.DATE,
        },
        'updated-at': {
            type: DataTypes.DATE,
        },
        'deleted-at': {
            type: DataTypes.DATE,
        }
    };

    const config = {
        tableName: 'facturas',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        createdAt: 'created-at',
        updatedAt: 'updated-at',
        deletedAt: 'deleted-at'
    };

    const Factura = sequelize.define(alias, columnas, config);

    Factura.associate = (models) => {
        Factura.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'factura_producto',
            foreignKey: 'facturas-fk',
            otherKey: 'productos-fk',
        });

        Factura.belongsTo(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuarios-fk'
        });
    };

    return Factura
};