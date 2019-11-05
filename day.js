// Runs every day
// Fetches tree count from teamtrees.org and adds entry to db

exports.tree_count_get = (req, res) => {
    const admin = require('firebase-admin');
    const cheerio = require('cheerio');
    const axios = require('axios');

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
    }

    const db = admin.firestore();
    const url = 'https://teamtrees.org';

    axios(url)
        .then(response => {
            const $ = cheerio.load(response.data);
            const count = $('#totalTrees').attr('data-count');
            db.collection('day').add({
                count: count,
                time_stamp: admin.firestore.Timestamp.now()
              }).then(ref => {
                res.end();
              });
        }).catch(console.error);
};