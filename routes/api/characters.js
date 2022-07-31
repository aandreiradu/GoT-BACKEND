const express = require('express');
const router = express.Router();
const {
    getAllCharacters,
    insertCharacter,
    getCharacterByID
} = require('../../controllers/charactersController');


router
    .route('/')
    .get(getAllCharacters)
    .post(insertCharacter)


router
    .route('/:id')
    .get(getCharacterByID)


module.exports = router;