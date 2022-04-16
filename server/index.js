require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelize = require('./db');
const router = require('./routes/mainRouter');
const models = require('./models/allModels');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(fileUpload({
    limit: { fileSize: 1 * 1024 * 1024 }
}));
app.use(cors());

if (process.env.PROD === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
    app.get('/', (req, res) => res.sendFile(path.resolve(__dirname + '/public/index.html')));
};
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database connection has been established successfully.');
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    };
};

start();
