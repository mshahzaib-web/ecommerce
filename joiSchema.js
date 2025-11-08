const Joi = require('joi');

const joiProductSchema = Joi.object({
    product: Joi.object({
        title:Joi.string().min(1).required(),
        description:Joi.string().min(1).required(),
        image:Joi.string().min(1).required(),
        subImages:Joi.array().items(Joi.string().min(1)).min(1).required(),
        price:Joi.number().min(1).required(),
        category:Joi.string().min(1).required(),
        colors:Joi.array().items(Joi.string),
        sizes:Joi.array().items(Joi.string(), Joi.number()),
    }).required(),
});

module.exports = {joiProductSchema};