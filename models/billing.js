const { executeQuery } = require("../config/database");

class BillingModel {
    getPendingBillingsByUserId(userId) {
        const sql = `SELECT * FROM billing WHERE user_id='${userId}' AND pay_date is null`
        return executeQuery(sql);
    }

    getBillingSettings() {
        const sql = `SELECT * FROM billing_settings LIMIT 1`
        return executeQuery(sql);
    }

    putBillingSettings(value) {
        const sql = `INSERT INTO billing_settings ('value') VALUES (${value})`
        return executeQuery(sql);
    }
}

module.exports = new BillingModel();