import { object, string } from 'yup'
import { inputValidation } from '../Constants'

const { _name, _email, _password } = inputValidation

const complexPasswordRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
)

// error msgs
const minChars = (type, value) => [
  value,
  `${type} must have at least ${value} characters.`
]
const maxChars = (type, value) => [
  value,
  `${type} must be less than ${value} characters.`
]

// name
const reqName = 'Hello stranger, you forgot to introduce yourself.'

// email
const validEmail = 'Are you messing with me? this is not a valid email.'
const reqEmail = 'How am I supposed to know who you are without an email.'
const reqEmailAlt = 'How am I supposed to reach you are without an email.'

// password
const reqPassword = 'Oops seems like you forgot to enter a password.'
const complexPassword = 'Please choose a stronger password. at least 8 characters and consist of uppercase and lowercase letters, numbers and symbols.'
const invalidPassword = "That can't be your password."

export const forgotPasswordSchema = object({
  email: string()
    .min(...minChars('Email', _email.min))
    .max(...maxChars('Email', _email.max))
    .email(validEmail)
    .required(reqEmailAlt)
})

export const deleteSchema = object({
  password: string()
    .min(_password.min, invalidPassword)
    .max(_password.max, invalidPassword)
    .required(invalidPassword)
})

export const logInSchema = object({
  password: string()
    .min(...minChars('Password', _password.min))
    .max(...maxChars('Password', _password.max))
    .required(reqPassword),
  email: string()
    .min(...minChars('Email', _email.min))
    .max(...maxChars('Email', _email.max))
    .email(validEmail)
    .required(reqEmail)
})

export const registrationSchema = object({
  password: string()
    .min(...minChars('Password', _password.min))
    .max(...maxChars('Password', _password.max))
    .matches(complexPasswordRegex, complexPassword)
    .required(reqPassword),
  email: string()
    .min(...minChars('Email', _email.min))
    .max(...maxChars('Email', _email.max))
    .email(validEmail)
    .required(reqEmailAlt),
  name: string()
    .min(...minChars('Name', _name.min))
    .max(...maxChars('Name', _name.max))
    .required(reqName)
})

export const profileSchema = object({
  password: string()
    .min(...minChars('Password', _password.min))
    .max(...maxChars('Password', _password.max))
    .matches(complexPasswordRegex, complexPassword),
  email: string()
    .min(...minChars('Email', _email.min))
    .max(...maxChars('Email', _email.max))
    .email(validEmail),
  name: string()
    .min(...minChars('Name', _name.min))
    .max(...maxChars('Name', _name.max))
})
