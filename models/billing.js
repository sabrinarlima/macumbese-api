const { executeQuery } = require("../config/database");

class BillingModel {
    getPendingBillingsByUserId(userId) {
        const sql = `SELECT * FROM billing WHERE user_id='${userId}' AND pay_date is null`
        return executeQuery(sql);    
    }
}

module.exports = new BillingModel();