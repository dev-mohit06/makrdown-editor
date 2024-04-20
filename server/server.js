const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./api/v1/config/index.config');
const apiVersions = require('./utils/api-version');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(apiVersions.v1.path,apiVersions.v1.routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});