/**
 *
 *  This is used to check if the form phone number is valid
 *  @param {Object} phone - The phone input variable
 *
 */

export default function CheckValidPhoneNumber(phone) {
  var PHONE_REGEX =
    /^(?:\+|\d{1,4})?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/;
  const PHONE_SPACELESS = phone.value.replace(/\s/g, ""); // Removes the spaces
  const PHONE_MINUSLESS = PHONE_SPACELESS.replace(/\-/g, ""); // Removes the minus symbols

  // Finalizing the phones value
  const CLEAN_PHONE = PHONE_MINUSLESS.replace(/\(/g, "");
  const FINAL_PHONE = CLEAN_PHONE.replace(/\)/g, "");

  phone.value = FINAL_PHONE;

  const phoneLength = phone.value.length;

  if (FINAL_PHONE.match(PHONE_REGEX)) {
    if (phoneLength >= 8 && phoneLength <= 15) {
      console.log(phoneLength);
      console.log("Valid Phone Number!!");
      return true;
    }
  } else {
    console.log(phoneLength);
    console.log("Invalid Phone Number.");
    return false;
  }
}
