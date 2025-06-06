import * as Yup from "yup";

export const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Valid email is required")
    .required("Email is required"),
  // otp: Yup.string().required("OTP is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .matches(/[A-Z]/, "Requires at least one uppercase letter")
    .matches(/[a-z]/, "Requires at least one lowercase letter")
    .matches(/[0-9]/, "Requires at least one number")
    .matches(/[\W_]/, "Requires at least one special character"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf(
      [Yup.ref("password")],
      "Passwords must match and meet the requirements"
    ),
});

// export const AddressSchema = Yup.object().shape({
//   address: Yup.object().shape({
//     posterCode: Yup.string().required("Postal Code is required"),
//     address1: Yup.string().required("Address1 is required"),
//     address2: Yup.string().nullable(),
//     country: Yup.string().required("Country is required"),
//     state: Yup.string().required("State is required"),
//     city: Yup.string().required("City is required"),
//   }),
// });

export const StoreBusinessSchema = Yup.object().shape({
  storeName: Yup.string().required("Store Name is required"),
  storePhoneNumber: Yup.string().required("Store Phone Number is required"),
  storeAddress: Yup.string().required("Store Address is required"),
  whatsAppNumber: Yup.string().required("WhatsApp Number is required"),
  businessNumber: Yup.string().required("Business Number is required"),
  storeType: Yup.string().required("Store Type is required"),
  policy: Yup.string().required("Store Policy is required"),
});

export const StorePaymentSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank Name is required"),
  bankAccountName: Yup.string().required("Bank Account Name is required"),
  bankAccountNumber: Yup.string().required("Bank Account Number is required"),
});

export const SocialMediaPlatformSchema = Yup.object().shape({
  socialMedia: Yup.array().of(
    Yup.object().shape({
      platform: Yup.string().required("Social Media Platform is required"),
      profileName: Yup.string().required("Profile Name is required"),
      profileLink: Yup.string().required("Profile Link is required"),
    })
  ),
});

export const FormSchema = PersonalInfoSchema.concat(
  SocialMediaPlatformSchema.concat(
    StorePaymentSchema.concat(StoreBusinessSchema)
  )
);
