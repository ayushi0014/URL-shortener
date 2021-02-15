const express = require('express');
const router = express.Router();

const Url = require('../models/url');


router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/:code', async(req, res, next) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
    
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.render('index', {error: 'No url found'});
        }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
});

module.exports = router;