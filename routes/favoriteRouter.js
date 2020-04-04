const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorites');
const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());



favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorite.find(req.params.favorite)
            .populate('users')
            .populate('campsites')
            .then(favorites => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            })
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        Favorite.findById(req.params.campsiteId)
            .then(favorite => {
                if (favorite) {
                    favorite.forEach(favorite => {
                        if (!favorite.campsites.includes(campsite._id)) {
                            favorite.campsites.push(campsite._id);
                        } else {
                            Favorite.create(req.body);
                            res.setHeader('Content-Type', 'application/json');
                            res.statusCode = 200
                            res.json(req.body);
                        }
                    })
                }

            })
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })


    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });


favoriteRouter.route('/:campsiteId')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get({

    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        Favorite.findById(req.params.campsiteId)
        if (favorite.campsites.includes(campsite._id)) {
            res.end('This campsite is already in the list of favorites!')
        }  
        if (!Favorite) {
            Favorite.create(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200
            res.json(req.body);
        }  
        if (!favorite.campsites.includes(campsite._id)) {
            favorite.campsites.push(campsite._id);
        }

    })
    
    .put({

    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.findById(req.params.campsiteId)
            .then(favorite => {
                if (favorite) {
                    favorite.campsites.remove();
                    favorite.save()
                        .then(favorite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        })
                        .catch(err => next(err));
                } else {
                    err = new Error(`This favorited campsite does not exist`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    });


module.exports = favoriteRouter;