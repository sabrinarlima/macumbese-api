const { executeQuery } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const UserParser = require('../parser/UserParser');
const { restart } = require('nodemon');

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

    updateUser(userDTO, userToken) {
        const userEntity = UserParser.toEntity(userDTO);
        const { name, email, relationType, password, dtBirth, streetAd, city, state, phone1, phone2, dueDay } = userEntity;
        const sql = `UPDATE user SET name='${name}', email='${email}', relationType='${relationType}', password='${password}', `
            + `dtBirth='${dtBirth}', streetAd='${streetAd}', city='${city}', state='${state}', phone1='${phone1}',`
            + ` phone2='${phone2}', dueDay='${dueDay}' WHERE userToken='${userToken}'`
        return executeQuery(sql);
    }

    insertUser(user) {
        const userParams = UserParser.toEntity(user);
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

    dataRecovery(userToken) {
        const sql = `SELECT * FROM user WHERE userToken='${userToken}'`
        return executeQuery(sql);
    }

    validateRole(userToken, userRole) {
        const sql = `SELECT * FROM user WHERE userToken='${userToken}' AND userRole = '${userRole}'`
        return executeQuery(sql);
    }
    getPendingsCount(sortBy, sortDirection = 'ASC') {
        const mapParameters = {
            'name': 1,
            'relation-type': 2,
            'debts-count': 3
        }

        const validDirections = ['ASC', 'DESC'];

        if(!validDirections.includes(sortDirection)) { 
            throw new Error("Invalid Sort field");
        }

        const fieldIndex = mapParameters[sortBy];

        if(!fieldIndex) {
            throw new Error("Invalid Sort field");
        }

        const sql = `SELECT u.name, u.relationType as "relation-type", COUNT(b.id) as "debts-count"
                        FROM macumbese.user u
                        JOIN macumbese.billing b on b.user_id = u.id
                        WHERE b.pay_date is null
                        GROUP BY b.user_id
                        ORDER BY ${fieldIndex} ${sortDirection}`;
        return executeQuery(sql);

    }


}

module.exports = new UserModel();

