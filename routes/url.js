const express = require('express');
const router = express.Router();
const config = require('config');
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/url');

router.post('/', async (req, res, next) => {
    const { url } = req.body;
    const baseUrl = config.get('baseUrl');

    //check base url
    if(!validUrl.isUri(baseUrl)) {
        res.render('index', { error: 'Internal Servor Error!'});
    }

    //generate urlCode
    const urlCode = shortid.generate();

    //check url
    if(validUrl.isUri(url)) {
            try { 
                let result = await Url.findOne({ longUrl: url });
                if(result){
                res.render('index', {short_url: result.shortUrl})
                } else {
                const shortUrl=  baseUrl + '/' + urlCode ;
                const db = new Url({
                    urlCode: urlCode,
                    longUrl: url,
                    shortUrl: shortUrl,
                    date: Date()
                });
                await db.save();
                res.render('index', { short_url: shortUrl});
            }}
        catch(err ) {
            res.render('index', { error: err.message });
        }
    } else {
        res.render('index', { error: 'Invalid Url, Please enter a valid url!' });
    }

});


module.exports = router;