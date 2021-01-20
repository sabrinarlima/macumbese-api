// middlewares
const authenticationMiddleware = require('../middlewares/authentication');
const adminMiddleware = require('../middlewares/admin');
const BillingModel = require('../models/billing');

module.exports = app => {
    app.get('/billings/settings', adminMiddleware, async (req, res) => {
        try {
            const settings = await BillingModel.getBillingSettings();
            const response = settings[0];
            return res.status(200).json(response);
        } catch (err) {
            console.error(err);
            res.status(422).send();
        }
    })
    app.put('/billings/settings', adminMiddleware, async (req, res) => {
        const settings = req.body;
        try {
            await BillingModel.updatePendingBillings(settings);
            res.status(200).send();
        } catch (err) {
            console.error(err);
            res.status(422).send();
        }
    });

}
