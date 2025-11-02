import *as Yup from 'yup'

export const validationschema=Yup.object({
    email:Yup.string().email("Please the correct email").required("Enter your email"),
    password:Yup.string().min(6).required("Enter your password")
})