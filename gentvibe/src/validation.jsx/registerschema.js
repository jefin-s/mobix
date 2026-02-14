import * as Yup from "yup";

export const registerSchema = Yup.object({

  email: Yup.string()
    .email("Invalid email format")
    .matches(
      /^(?![_.-])[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Email cannot start with special characters"
    )
    .required("Email is required"),

  username: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z0-9_]{2,19}$/,
      "Username must start with letter and be 3–20 chars (letters, numbers, underscore)"
    )
    .required("Username is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
      "Password must contain uppercase, lowercase, number, special char (min 8)"
    )
    .required("Password is required"),

  phoneNumber: Yup.string()
    .matches(
      /^[6-9]\d{9}$/,
      "Enter valid 10 digit Indian mobile number"
    )
    .required("Phone number is required")

});
