const { executeQuery } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const mapProperties = {
    'name': 'name',
    'email': 'email',
    'relation-type': 'relationType',
    'password': 'password',
    'street-address': 'streetAd',
    'zipcode': 'zipcode',
    'city': 'city',
    'state': 'state',
    'phone': 'phone1',
    'phone-2': 'phone2',
    'due-day': 'dueDay',
    'date-of-birth': 'dtBirth',
    'since': 'since',
};

class UserModel {
    searchForUser(email, password) {
        if (!email || !password) {
            throw new Error('Email nor password could not be empty');
        }
        const sql = `SELECT * FROM user WHERE email='${email}' and password='${password}'`
        return executeQuery(sql);
    }

    // Gerar token de usuário e atualizar campo "userToken" onde o ID do usuario for igual à @userId
    async generateToken(userId) {
        const token = uuidv4();

        const sql = `UPDATE user SET userToken='${token}' WHERE id='${userId}'`;
        await executeQuery(sql);
        return token;
    }

    convertUserToEntity(user) {
        return {
            name: user.name,
            email: user.email,
            relationType: user['relation-type'],
            password: user.password,
            dtBirth: moment(user['date-of-birth'], 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
            streetAd: user['street-address'],
            zipcode: user.zipcode,
            city: user.city,
            state: user.state,
            phone1: user.phone,
            phone2: user['phone-2'],
            dueDay: user['due-day'],
            since: moment(user.since, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        };
    }

    insertUser(user) {
        const userParams = convertUserToEntity(user);
        userParams.id = uuidv4();
        const sql = `INSERT INTO user SET ?`
        return executeQuery(sql, userParams);
    }

    getUserByEmail(email) {
        const sql = `SELECT * FROM user WHERE email='${email}'`
        return executeQuery(sql);
    }

    verifyByUser(user) {
        const sql = `SELECT * FROM user`;
        let whereClause = ` WHERE`;
        Object.keys(user)
            .filter(key => mapProperties[key])
            .forEach((key, i) => {
                const field = mapProperties[key];
                if (i === 0) {
                    whereClause = `${whereClause} ${field} = '${user[key]}'`;
                } else {
                    whereClause = `${whereClause} OR ${field} = '${user[key]}'`;
                }
            });
        return executeQuery(`${sql}${whereClause}`);
    }

    validateToken(userToken) {
        const sql = `SELECT * FROM user WHERE userToken='${userToken}'`
        return executeQuery(sql);
    }

}


module.exports = new UserModel();

