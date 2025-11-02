import *as Yup from 'yup'
export const registerSchema=Yup.object({
    name:Yup.string().min(3).required("Enter your correct name"),
    email:Yup.string().email("Enter your valid email").required("Enter your email"),
    password:Yup.string().min(6).required("Enter the correct password")

})