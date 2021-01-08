const { executeQuery } = require('../config/database');
const { v4: uuidv4 }  = require('uuid');
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
}

module.exports = new UserModel();

