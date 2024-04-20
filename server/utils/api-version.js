const apiVersions = {
    "v1" : {
        "release" : "1.0.0",
        "date" : "2024-04-19",
        "directory" : "/api/v1",
        "path" : "/api/v1",
        "routes": require('../api/v1/routes/index.route')
    }
}

module.exports = apiVersions;