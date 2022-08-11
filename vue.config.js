module.exports = {
    devServer: {
        proxy: {
            "/application": {
                // target: "http://49.232.185.66:3000",
                target: "http://127.0.0.1:3000",
                // pathRewrite: { "/application": "" },
            },
        },
    },
};
