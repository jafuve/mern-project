const { dbGetPool, dbGetPoolConnection, dbQuery } = require('./connection')

exports.getUsers = async () => {

    const connection = await dbGetPoolConnection( await dbGetPool() );

    const query = "SELECT id_user Id, name Name, surname Surname, username Username, is_active IsActive, id_user_role UserRoleId, last_login LastLogin, created_at CreatedAt, created_by CreatedBy FROM user";
    const queryParms = {};

    const resQuery = await dbQuery(query, queryParms, connection);
    return Promise.resolve(resQuery);

};