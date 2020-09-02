const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
    if (req) {
        Post.findAll({
            // where: {
            //     type: req.query.type,
            //     location: req.query.location
            // },
            where: req.query,
            attributes: [
                'id',
                'location',
                'type',
                'created_at'
            ],
            order: [['created_at', 'DESC']],
            // include: [
            //     {
            //         model: User,
            //         attributes: ['user_id']
            //     }
            // ]
        })
            .then(dbPostData => res.json(dbPostData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
    Post.findAll({
        attributes: [
            'id',
            'location',
            'type',
            'created_at',
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'location',
            'type',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/?'), (req, res) => {
    console.log(req);
    Post.findAll({
        where: {
            type: req.query.type,
            location: req.query.location
        },
        attributes: [
            'id',
            'location',
            'type',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['user_id']
        //     }
        // ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}

router.post('/', (req, res) => {

    Post.create({
        location: req.body.location,
        type: req.body.type,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Post.update(
        {
            location: req.body.location,
            type: req.body.type,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;