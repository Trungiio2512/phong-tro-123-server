const initRoutes = (app) => {
    return app.use("/*", (req, res) => {
        return res.send("route not found");
    });
};

export default initRoutes;
