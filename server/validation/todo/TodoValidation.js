import joi from 'joi'

export const todoValidation = (description) => {
    return joi.string().min(3).max(300).required().validate(description)
}