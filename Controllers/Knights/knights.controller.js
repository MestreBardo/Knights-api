const { knightModel } = require('../../Schemas/knight.schema')

exports.listKnights = async (request, response, next) => {
    const filter = request.query.filter ?? "";
    try {
        
        const knights = await knightModel.find(filter.toLowerCase() === 'heroes' ? {hallOfHeroes: true} : {});
        response.send(knights)
    } catch (err) {
        next(err);
    }
}

exports.getKnightById = async (request, response, next) => {
    try {
        const knight = await knightModel.findById(request.params.id);
        if(!knight) {
            return next(errorCreate('Knight not Found!', 404));
        }
        request.knight = knight;
        next();
    } catch (err) {
        next(err);
    } 
}

exports.getKnight = async (request, response, next) => {
    response.send(request.knight);
}

exports.postKnight = async (request, response, next) => {
    try {
        const knight = new knightModel(request.body);
        await knight.save();
        response.status(201).send(knight);
    } catch (err) {
        next(err);
    } 
}

exports.updateKnight = async (request, response, next) => {
    try {
        const knight = request.knight;
        if (!request.body.nickname) {
            return next(errorCreate("The nickname can't be null", 400));
        }
        knight.nickname = request.body.nickname;
        await knight.save();
        response.status(200).send(knight);
    } catch (err) {
        next(err);
    } 
}

exports.moveKnightToHallOfHeroes = async (request, response, next) => {
    try {
        const knight = request.knight;
        knight.hallOfHeroes = true;
        await knight.save();
        response.status(200).send(knight);
    } catch (err) {
        next(err);
    } 
}   

errorCreate = (message, status) => {
    const error = new Error(message);
    error.status = status;
    return error;
}