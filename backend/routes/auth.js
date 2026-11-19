/*
    Auth Routes
    /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { login, register, refresh } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validator');

router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no cumple con el formato').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener como minimo 6 caracteres').isLength({min: 6}),
    fieldValidator
], login);

router.post('/register', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email no cumple con el formato').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener como minimo 6 caracteres').isLength({min: 6}),
        fieldValidator
    ], 
    register);

router.get('/refresh',
    [
        validateJWT
    ],
    refresh);

module.exports = router;