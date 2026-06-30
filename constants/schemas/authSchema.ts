
import * as yup from "yup"

export const formSchema = yup.object({
    username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters").max(12, "Username must be at most 12 characters"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().required("Password is required").min(3, "Password must be at least 3 characters").max(12, "Password must be at most 12 characters"),
})