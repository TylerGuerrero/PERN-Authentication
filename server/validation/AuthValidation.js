import joi from 'joi'

export const registerValidation = (body) => {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required(),
        email: joi.string().min(3).max(255).required().email(),
        password: joi.string().min(6).max(255).required()
    })

    return schema.validate(body)
}

export const loginValidation = (body) => {
    const schema = joi.object({
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).max(255).required()
    })

    return schema.validate(body)
}