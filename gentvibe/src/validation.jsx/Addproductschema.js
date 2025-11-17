import * as Yup from "yup";
export const Addproductschema = Yup.object({
  title: Yup.string().required("Enter the name of the product"),
  price: Yup.number().required("Enter price of the Product"),
  desciption: Yup.string().required("Enter the description"),
  discountPercentage: Yup.number().required("Enter the percentage"),
  rating: Yup.number().required("Enter the rating"),
  stock: Yup.number().required("Enter the stock"),
  brand: Yup.string().required("Enter the brand"),
  isActive: Yup.boolean().required("Enter the status"),
  category: Yup.string().required("Enter the category"),
  thumbnail: Yup.string()
    .url("Enter a valid URL")
    .required("Add url of the picture"),
});
