const express = require('express');
const router = express();
const itemRouter = require('./item.route');
const docsRoute = require('./docs.route');

router.use('/items', itemRouter);

router.use('/v1/docs', docsRoute);

module.exports = router;
