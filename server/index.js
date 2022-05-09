const express = require('express');
const cors = require('cors');
const { connect } = require('./src/utils/database/db');
const { configCloudinary } = require('./src/utils/cloudinary/config');
const TechnewsRoutes = require('./src/api/technews/technews.routes');
const ProductsRoutes = require('./src/api/products/products.routes');
const UserRoutes = require('./src/api/users/users.routes');
const documentation = require('./src/utils/documentation/api.json');

const app = express();
const PORT = process.env.PORT || 8080;
connect();
configCloudinary();

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true
}));

app.use(express.json({ limit: '5mb' }))

app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));

app.use('/api/technews', TechnewsRoutes);
app.use('/api/products', ProductsRoutes);
app.use('/api/users', UserRoutes);

app.use('/api', (req, res, next) => {
    return res.json(documentation);
})

app.use('*', (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Route not found';
    return next(error);
});

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

app.disable('x-powered-by');

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});

