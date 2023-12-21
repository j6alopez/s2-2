// Exercise 6
function validate() {
  var error = 0;
  // Get the input fields
  var fName = document.getElementById("fName");
  var fLastN = document.getElementById("fLastN");
  var fEmail = document.getElementById("fEmail");
  var fPassword = document.getElementById("fPassword");
  var fAddress = document.getElementById("fAddress");
  var fPhone = document.getElementById("fPhone");

  // Get the error elements
  var errorName = document.getElementById("errorName");
  var errorLastN = document.getElementById("errorLastN");
  var errorEmail = document.getElementById("errorEmail");
  var errorPassword = document.getElementById("errorPassword");
  var errorAddress = document.getElementById("errorAddress");
  var errorPhone = document.getElementById("errorPhone");

  const inputFields = [fName, fLastN, fEmail, fPassword, fAddress, fPhone];
  const errors = [
    errorName,
    errorLastN,
    errorEmail,
    errorPassword,
    errorAddress,
    errorPhone,
  ];

  let form = document.querySelector(".form.needs-validation");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputFields.forEach((field, index) => {
      const hasInvalidClass = field.classList.contains('is-invalid');
      const hasMinimumLength = hasValidLength(field.value);

      if (hasMinimumLength) {
        if (hasInvalidClass) {
          field.classList.remove('is-invalid');
        }
      } else {
        if (!hasInvalidClass) {
          field.classList.add('is-invalid');
          return;
        }
      }
      
      const fieldValue = field.value;
      let hasPassedValidation = false;

      switch (field.id) {
        case 'fName':
          hasPassedValidation = hasOnlyLetters(fieldValue); 
          break;
        case 'fLastN':
          hasPassedValidation = hasOnlyLetters(fieldValue); 
          break;
        case 'fEmail':
          hasPassedValidation = hasEmailFormat(fieldValue);
          break;
        case 'fPassword':
          hasPassedValidation = hasValidPassword(fieldValue);
          break;
        case 'fPhone':
          hasPassedValidation = hasOnlyDigits(fieldValue);
          break;
      }

      if (!hasPassedValidation) {
        field.classList.add('is-invalid');
      }

    });
  });

  // Validate fields entered by the user: name, phone, password, and email

  // if (fName.value == "") {
  //   error++;
  // }

  // if (fEmail.value == "") {
  //   error++;
  // }

  // if (error > 0) {
  //   alert("Error");
  // } else {
  //   alert("OK");
  // }
}

function hasValidLength(fieldValue) {
  return fieldValue.length >= 3 && fieldValue !== "";
}

function hasOnlyLetters(fieldValue) {
  //+$ ensures one character
  const regularExpression = new RegExp(/^[A-Za-z]+$/);
  return regularExpression.test(fieldValue);
}

function hasOnlyDigits(fieldValue) {
  //d for digit
  const regularExpression = new RegExp(/^\d+$/);
  return regularExpression.test(fieldValue);
}

function hasEmailFormat(fieldValue) {
  //@ and .
  const regularExpression = new RegExp(/\S+@\S+\.\S+/);
  return regularExpression.test(fieldValue);
}

function hasValidPassword(fieldValue) {
  const regExpAtLeastOneLetter = new RegExp(/[A-Za-z]/);
  const regExpAtLeastOneNumber = new RegExp(/\d/);

  const containsLetters = regExpAtLeastOneLetter.test(fieldValue);
  const containsNumbers = regExpAtLeastOneNumber.test(fieldValue);

  return containsLetters && containsNumbers;
}

