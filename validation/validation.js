import { object, string } from "yup";

const phone_number_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const registervalidation = object({
  firstName: string()
    .required("First name is required")
    .max(200, "name cannot exceed 200 characters"),
  lastName: string()
    .required("Last name is required")
    .max(200, "name cannot exceed 200 characters"),
  userName: string()
  .required("Last name is required")
  .max(200, "name cannot exceed 200 characters"),
  email: string()
    .required("Email is required")
    .matches(email_regex, "Invalid email address")
    .max(200, "Email cannot exceed 200 characters"),
  password: string()
    .required("Password is required")
    .max(50, "Password characters should less than 50 characters"),
  mobile: string()
    .required("Phone number is requred")
    .max(10, "Phone number cannot exceed 10 numbers")
    .matches(phone_number_regex, "Invalid phone number"),
  role: string().required("User role name is required"),
  permission: string().required("User Permission is required"),
});

export const loginvalidation = object({
  userName: string()
    .required("Last name is required")
    .max(200, "name cannot exceed 200 characters"),
  password: string()
    .required("Password is required")
    .max(50, "Password characters should less than 50 characters"),
});