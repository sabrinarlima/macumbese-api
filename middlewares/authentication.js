const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
    const token = req.get("Authorization-Token");
    // Verificar se Token é valido. Caso contrário retorna 403
    const result = await UserModel.validateToken(token);
    if(result.length == 0) {
        res.status(403).json({error: 'Você não esta logado'})
        return;
    } 

    next();
};