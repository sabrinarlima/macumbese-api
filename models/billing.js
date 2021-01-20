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

    updatePendingBillings({ value }) {
        const sql = `UPDATE billing_settings
        SET value = '${value}'`
        return executeQuery(sql);
    }

}

module.exports = new BillingModel();