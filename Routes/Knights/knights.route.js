const {
    listKnights,
    getKnightById,
    postKnight,
    updateKnight,
    moveKnightToHallOfHeroes,
    getKnight
} = require('../../Controllers/Knights/knights.controller')

const express = require('express');
const router = express.Router();

//Rotas
router.get('/', listKnights);
router.get('/:id',getKnightById, getKnight);
router.post('/', postKnight);
router.patch('/:id',getKnightById, updateKnight);
router.delete('/:id',getKnightById, moveKnightToHallOfHeroes);

module.exports = router;