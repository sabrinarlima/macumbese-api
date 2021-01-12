module.exports = app => {
    app.get('/healthcheck', (req, res) => {
        res.status(200).json({ status: "OK" });
    });
}