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
}