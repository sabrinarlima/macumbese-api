const UserModel = require('../models/user');
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
}

