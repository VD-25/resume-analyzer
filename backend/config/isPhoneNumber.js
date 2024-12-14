function isPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');

    return cleaned.length === 10;
}

// Example test cases
// console.log(isValidUSPhoneNumber("(123) 456-7890")); // true
// console.log(isValidUSPhoneNumber("123-456-7890"));  // true
// console.log(isValidUSPhoneNumber("1234567890"));    // true
// console.log(isValidUSPhoneNumber("123-45-67890"));  // false
// console.log(isValidUSPhoneNumber("123456789"));     // false
// console.log(isValidUSPhoneNumber(null));            // false
// console.log(isValidUSPhoneNumber(undefined));       // false
// console.log(isValidUSPhoneNumber(1234567890));      // false

// Export the function
module.exports = isPhoneNumber;
