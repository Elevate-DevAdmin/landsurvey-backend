module.exports = {
  common: {
    NOT_FOUND: "{0} not found.",
    USER_NOT_AWARE: "We are not aware of this user.",
    INVALID_PARAMETER: "Invalid parameter",
  },
  middleware: {
    NOT_AUTHORIZE_PERSON: "You are not authorized to perform this operation.",
    UNAUTHORIZED_ACCESS: "Unauthorized Access.",
    INVALID_TOKEN: "Invalid Token or Expired.",
    INACTIVE_ACCOUNT:
      "Your account is in-active, Contact to admin for more info.",
  },
  auth: {
    ERROR_IN_REGISTRATION: "Error in Register. Please try again later.",
    EMAIL_ALREADY_EXISTS: "Account with that email address already exists.",
    ERROR_IN_SAVE_REGISTER_USER:
      "Error in register user data. Please try again later.",
    SINGUP_SUCCESS: "Success! You account is created and logged in.",
    USER_ACCOUNT_NOT_ACTIVE:
      "Your account is in-active, Contact to admin for more info.",
    EMAIL_PASSWORD_NOT_VALID: "Invalid email or password.",
    LOGIN_SUCCESS: "Success! You are logged in.",
    LOGOUT_SUCCESS: "User Logged out successfully!",
    RESET_PASSWORD_SUCCESS: "Password Reset Successfully.",
    EMAIL_MOBILE_EXISTS:
      "Account with that email address or phone number already exists.",
  },
  user: {
    EMAIL_ALREADY_EXISTS: "Account with that email address already exists.",
    REMOVE_USER_SUCCESS: "User removed successfully.",
    ERROR_IN_CREATE_USER_ACCOUNT:
      "Error in creating user data. Please try again later.",
    USER_ACCOUNT_CREATE_SUCCESS: "Success! User account is created.",
    CURRENT_PASSWORD_REQUIRE: "Current Password is required.",
    NEW_PASSWORD_REQUIRE: "New Password is required.",
    PASSWORD_NOT_CORRECT: "Please enter correct current password.",
    PASSWORD_SAVE_SUCCESS: "Password Saved successfully.",
  },
  cases: {
    REMOVE_CASES_SUCCESS: "Case removed successfully.",
    ERROR_IN_CREATE_CASE: "Error in creating Case. Please try again later.",
    CASE_CREATE_SUCCESS: "Success! Case is created.",
    UPDATE_CASE_SUCCESS: "Case Updated successfully.",
  },
  ERROR_MESSAGES: {
    DATA_NOT_FOUND: "Unable To Retrive Records",
    NO_RECORDS: "No Records Found",
    DATA_NOT_CREATED: "Data Not Created",
    RECORD_DELETED: "The Record Was Already Deleted By User.",
    UPDATE_ERROR: "Unable To Update Data.",
    DELETE_ERROR: "Data Not Deleted. || Id Not Found",
  },
};
