/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/jwt-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');


// All routes require JWT
router.use(validateJWT);

router.get('/', getEvents);
router.post('/', [
    check('title', 'Title is mandatory.').not().isEmpty(),
    check('start', 'Start date is mandatory.').custom(isDate),
    check('end', 'End date is mandatory.').custom(isDate),
    fieldValidator
], createEvent);
router.put('/:id', [
    check('title', 'Title is mandatory.').not().isEmpty(),
    check('start', 'Start date is mandatory.').custom(isDate),
    check('end', 'End date is mandatory.').custom(isDate),
    fieldValidator
],updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;