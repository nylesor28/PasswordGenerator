// Assignment Code
var generateBtn = document.querySelector("#generate");

const passwordMin = 8;
const passwordMax = 128;

var lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lettersLower = lettersUpper.toLowerCase();
var specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
var numbers ="0123456789"

var pwCriteria = {};
var endProcessMsg = "The Password Generation Process has been canceled!"


/*************************************************************
 * Resent properties in pwCriteria object to default values
 *************************************************************/
var resetPWCriteria = function(){
  pwCriteria =
  {
    "pwLength" : 0,
    "inclUpper" : false,
    "inclLower" : false,
    "inclNumbers" : false,
    "inclSpecial" : false
  }

}

/*************************************************************************
 * Display Alert with desired message and present user with an Ok button
 * parm : 
 *   message - message to show user
 *************************************************************************/
var alertUser = function (message){
  alert(message);
}

/*********************************************************************************************
 * Display Confirmation Dialog with desired message and present user with an Ok/Cancel button

 * returns:
 *    true : if user clicks OK
 *    false: if user clicks cancel
 **********************************************************************************************/
var confirmWithUser = function (message){
  return confirm(message);
}


/*********************************************************************************************
 * Prompts user for password criteria, validates input length and populates properties 
 * in pwCriteria object
 **********************************************************************************************/
var establishPasswordCriteria = function() {

  var inclLower = false;
  var inclUpper = false;
  var inclNumbers = false;
  var specialCharacters = false;

  var proceed = false;

  while(!proceed){
      var pwLengthRsp = prompt("Enter you desired password length ("+ passwordMin + " - " + passwordMax +").");
      //If User Clicks Cancel, notify user and end process
      if (pwLengthRsp === null) {
        alertUser(endProcessMsg);
        resetPWCriteria();
        return;
      }

      //parse user input to number and validate length
      var converted = parseInt(pwLengthRsp); 
      if (!converted || converted < passwordMin || converted > passwordMax) {
        alertUser("Please enter a valid number from " + passwordMin + " - " + passwordMax );
      }
      else {
        pwCriteria.pwLength = converted;
        proceed = true;
      }
  }
  //reset proceed variable to false for next group of validation
  proceed = false;

    //loop thru until user can proceed to the next step  
    while(!proceed) {
      inclLower = confirmWithUser("Would you like to include LOWERCASE Characters?");
      inclUpper = confirmWithUser("Would you like to include UPPERCASE Characters?");
      inclNumbers = confirmWithUser("Would you like to include NUMBERS Characters?");
      inclSpecialCharacters = confirmWithUser("Would you like to include SPECIAL Characters?");
    
      
      if (!inclLower && !inclUpper && !inclNumbers && !inclSpecialCharacters ){
        var tryAgain = confirmWithUser("Your password must include at least one of the the following: lowercase, uppercase, numbers or special character \n WOULD YOU LIKE TO TRY AGAIN?");
        if(!tryAgain) {
          resetPWCriteria();
          alertUser(endProcessMsg);
          return;
        }
   
      }
      else {
        if(inclLower){
          pwCriteria.inclLower = inclLower;
        }
        if(inclUpper){
          pwCriteria.inclUpper = inclUpper;
        }
        if(inclNumbers){
          pwCriteria.inclNumbers = inclNumbers;
        }
        if(inclSpecialCharacters){
          pwCriteria.inclSpecialCharacters = inclSpecialCharacters;
        }
        proceed = true;
      }
    }
} 

/***********************************************************************
 * Validates password to ensure it meets the desired criteria
 ************************************************************************/

var isRandomPasswordValid = function (checkPw) {
  var isValid = true;
  var numSpecial = 0;
  var numUpper = 0;
  var numLower = 0;
  var numNumeric = 0;

  //Iterate through the password Parameter and increment the count for each type of character found
  for(var i = 0; i<checkPw.length; i++) {
      var indexedCharacter = checkPw[i];
      
      if (lettersUpper.includes(indexedCharacter)){
        numUpper++;
      }
      else if(lettersLower.includes(indexedCharacter)){
        numLower++;
      }
      else if(specialCharacters.includes(indexedCharacter)){
        numSpecial++;
      }
      else if(numbers.includes(indexedCharacter)){
        numNumeric++;
      }
  }

  //check each criteria to ensure the number of characters for that criteria isn't zero. if So update isValid to False
  if (pwCriteria.inclUpper){
    if(!numUpper){
      isValid = false;
    }
  }
  if (pwCriteria.inclLower){
    if(!numLower){
      isValid = false;
    }
  }
  if (pwCriteria.inclSpecialCharacters){
    if(!numSpecial){
      isValid = false;
    }
  }
  if (pwCriteria.inclNumbers){
    if(!numNumeric){
      isValid = false;
    }
  }

  return isValid;
}


/************************************************************************
 * Randomly generates a password based on users criteria and input it 
 ***********************************************************************/
     
function generatePassword(){
  var randomSelArray = [];
  var randomPW ="";
  var done = false;
  var loopCount = 0;
  
  
  resetPWCriteria();
  establishPasswordCriteria();

  //populate randomeSelArray which will be used to randomly determine the next character type to choose from
  if(pwCriteria.inclLower){
    randomSelArray.push("lower");
  }
  if(pwCriteria.inclUpper){
    randomSelArray.push("upper");
  }
  if(pwCriteria.inclNumbers){
    randomSelArray.push("numeric");
  }
  if(inclSpecialCharacters){
    randomSelArray.push("special");
  }

  //loops through until the generated password matches the users criteria
  while(!done){
    randomPW ="";

    //loop through and randomly select characters based on users input
    for(var i=0; i < pwCriteria.pwLength; i++){
      var randChar = '';

      //randomly select the next type of character to draw from, then randomly select that next character from appropriate list
      
      var randSelIndex = Math.floor(Math.random()*randomSelArray.length);
      var randCharType = randomSelArray[randSelIndex];

        if (randCharType === "upper"){
            randomPW += lettersUpper.charAt(Math.floor(Math.random()*lettersUpper.length));
        } else if (randCharType === "lower"){
          randomPW += lettersLower.charAt(Math.floor(Math.random()*lettersLower.length));
        } else if (randCharType === "special"){
          randomPW += specialCharacters.charAt(Math.floor(Math.random()*specialCharacters.length));
        } else if (randCharType === "numeric"){
          randomPW += numbers.charAt(Math.floor(Math.random()*numbers.length));
        } else {
          alertUser ("something went wrong")
        }
      }
      //verify the generated password meets the criteria before exiting loop
      done = isRandomPasswordValid(randomPW);
    }
  return randomPW;
}


// Write password to the #password input
function writePassword() {

  var password = generatePassword();

  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
