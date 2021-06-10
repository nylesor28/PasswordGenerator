// Assignment Code
var generateBtn = document.querySelector("#generate");

const passwordMin = 8;
const passwordMax = 128;

var lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lettersLower = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
var specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
var numbers ="0123456789"

var pwCriteria = {};
var randomSelArray = [];
var completedSelArrary = [];

var endProcessMsg = "The Password Generation Process has been canceled!"

var resetPWCriteria = function(){
  var pwCriteria =
  {
    "pwLength" : 0,
    "inclUpper" : false,
    "incLower" : false,
    "inclNumbers" : false,
    "inclSpecial" : false
  }

}

var alertUser = function (message){
  alert(message);
}

var confirmWithUser = function (message){
  return confirm(message);
}

var establishPasswordCriteria = function() {

  var incLower = false;
  var inclUpper = false;
  var inclNumbers = false;
  var specialCharacters = false;

  var proceed = false;

  while(!proceed){
      var pwLengthRsp = prompt("Enter you desired password length ("+ passwordMin + " - " + passwordMax +").");
      //If User Clicks Cancel, notifiy user and end process
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

    while(!proceed) {
      inclLower = confirmWithUser("Would you like to include LOWERCASE Characters?");
      inclUpper = confirmWithUser("Would you like to include UPPERCASE Characters?");
      inclNumbers = confirmWithUser("Would you like to include NUMBERS Characters?");
      inclSpecialCharacters = confirmWithUser("Would you like to include SPECIAL Characters?");
    
      console.log(inclLower, inclUpper, inclNumbers, inclSpecialCharacters)
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
          pwCriteria.incLower = incLower;
          randomSelArray.push("lower");
        }
        if(inclUpper){
          pwCriteria.inclUpper = inclUpper;
          randomSelArray.push("upper");
        }
        if(inclNumbers){
          pwCriteria.inclNumbers = inclNumbers;
          randomSelArray.push("numeric");
        }
        if(inclSpecialCharacters){
          pwCriteria.inclSpecialCharacters = inclSpecialCharacters;
          randomSelArray.push("special");
        }
        proceed = true;
      }
    }
} 

     
function generatePassword(){
  randomSelArray = [];
  var randomPW ="";
  
  
  resetPWCriteria();
  establishPasswordCriteria();


  return randomPW;
}



// function parsePasswordLength(pwLen) {
//   return parseInt(pwLeng);

// }

// Write password to the #password input
function writePassword() {
  
  var password = generatePassword();

  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
