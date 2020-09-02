const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

//get for search results
router.get('/', (req, res) => {
    console.log(req.session);
    if (req.query.type || req.query.location) {
        Post.findAll({
            where: req.query,
            attributes: [
                'id',
                'location',
                'type',
                'created_at'
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('search', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    } else {
        res.render('search', {
            loggedIn: req.session.loggedIn
        });
    }
});

module.exports = router;