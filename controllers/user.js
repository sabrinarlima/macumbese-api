const UserModel = require('../models/user');
const BillingModel = require('../models/billing');
const UserParser = require('../parser/UserParser');
const BillingParser = require('../parser/BillingParser');
const moment = require('moment');

// middlewares
const authenticationMiddleware = require('../middlewares/authentication');
const adminMiddleware = require('../middlewares/admin');

module.exports = app => {
    app.post('/user/login', async (req, res) => {
        const credentials = req.body;
        try {
            const result = await UserModel.searchForUser(credentials.email, credentials.password);
            if (result.length == 0) {
                res.status(401).send();
                return;
            }
            const user = result[0];
            const token = await UserModel.generateToken(user.id);
            res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            res.status(400).send();
        }
    })

    app.post('/user/sign-up', async (req, res) => {
        const user = req.body;

        try {

            const result = await UserModel.getUserByEmail(user.email)
            if (result.length > 0) {
                res.status(400).json({ error: 'e-mail já cadastrado' });
                return;
            }

            await UserModel.insertUser(user)
            res.status(200).json(user);

        } catch (err) {
            console.error(err);
            res.status(400).send();
        }

    })

    app.post('/user/verify', async (req, res) => {
        const user = req.body;

        const verify = await UserModel.verifyByUser(user)

        if (verify.length > 0) {
            res.status(204).json({ error: 'Estes dados já estão cadastrados' })
        } else {
            res.status(404).json(user);
        }
    })

    app.get('/user/profile', authenticationMiddleware, async (req, res) => {
        const token = req.get("Authorization-Token");

        const recovery = await UserModel.dataRecovery(token);

        if (recovery.length > 0) {
            const userEntity = recovery[0];
            res.status(200).json(UserParser.toDto(userEntity));
        } else {
            res.status(403).send();
        }
    })

    app.put('/user/profile/update', authenticationMiddleware, async (req, res) => {
        const token = req.get("Authorization-Token");
        const userRequest = req.body;

        try {
            await UserModel.updateUser(userRequest, token);
            res.status(200).send();
        } catch (err) {
            console.error(err);
            res.status(422).send();
        }
    });

    app.get('/user/dashboard', authenticationMiddleware, async (req, res) => {
        const userId = req.params.contextUserId;
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

        res.status(200).json(
            {
                billings: {
                    pending: responsePendingBillings,
                    'next-due': responseNextDueBillings
                }
            });
    });
    app.get('/user/admin/list-users', adminMiddleware, async (req, res) => {
        const { 'sort-by': sortBy, 'sort-direction': sortDirection, } = req.query;
        
        try {
            const pendingBillings = await UserModel.getPendingsCount(sortBy, sortDirection.toUpperCase());
            if (pendingBillings == 0) {
                res.status(204).send('Você não possui pendencias');
            } else {
                res.status(200).json({ profiles: pendingBillings });
            }

        } catch (err) {
            console.error(err);
            res.status(422).send();
        }

    });
}