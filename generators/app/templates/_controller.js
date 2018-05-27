import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { <%= name %> } from '../models';

const <%= name %>s = () => {
    var createApi = () => {
        let api = Router();

        api.post('/', <%= nameCamelCase %>Validation, (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.mapped()});
            }

            const data = matchedData(req);

            new <%= name %>({
                name: data.name,
            }).save().then(<%= nameCamelCase %> => {
                res.status(201).location(req.serverUrl + req.originalUrl + '/' + <%= nameCamelCase %>.attributes.id).send();
            }, (err) => {
                console.log(err);
                res.sendStatus(500);
            });
        });

        api.get('/', (req, res) => {
            <%= name %>.fetchAll().then((<%= nameCamelCase %>) => {
                res.json(<%= nameCamelCase %>);
            }).catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
        });

        api.use('/:<%= nameCamelCase %>Id', (req, res, next) => {
            <%= name %>.where('id', req.params.<%= nameCamelCase %>Id).fetch().then((<%= nameCamelCase %>) => {
                req.<%= nameCamelCase %> = <%= nameCamelCase %>;
                next();
            }, (err) => {
                console.error(err);
                res.sendStatus(500);
            })
        }, (req, res, next) => {
            if (!req.<%= nameCamelCase %>) {
                return res.sendStatus(404);
            }
            next();
        });

        api.get('/:<%= nameCamelCase %>Id', (req, res) => {
            res.json(req.<%= nameCamelCase %>);
        });

        api.put('/:<%= nameCamelCase %>Id', <%= nameCamelCase %>Validation, (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.mapped()});
            }

            const data = matchedData(req);

            req.<%= nameCamelCase %>.set({
                name: data.name
            }).save().then(() => {
                res.status(201).location(req.serverUrl + req.originalUrl).send();
            }, (err) => {
                console.log(err);
                res.sendStatus(500);
            });
        });

        return api;
    };

    const <%= nameCamelCase %>Validation = [
        check('name')
            .exists().withMessage('Name is required'),
    ];

    return createApi();
};

export { <%= name %>s };