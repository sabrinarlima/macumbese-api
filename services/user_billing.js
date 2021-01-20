const BillingModel = require('../models/billing');
const BillingParser = require('../parser/BillingParser');

const moment = require('moment');

class UserBillingService {

    
    async getUserBillings(userId) {
        const pendingBillings = await BillingModel.getPendingBillingsByUserId(userId);
        const currentDate = new Date();

        let responsePendingBillings = [];
        let responseNextDueBillings = [];

        for (let i in pendingBillings) {
            const billing = pendingBillings[i];

            if (moment(currentDate).isAfter(billing.due_date)) {
                responsePendingBillings.push(BillingParser.toDto(billing));
                continue;
            }

            responseNextDueBillings.push(BillingParser.toDto(billing));
        }

        const billings = {
            pending: responsePendingBillings,
            'next-due': responseNextDueBillings
        };

        return billings;
    };
}

module.exports = new UserBillingService();

