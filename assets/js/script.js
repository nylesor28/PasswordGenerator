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


var endProcessMsg = "The Password Generation Process has been canceled!"


/*************************************************************
 * Resent properties in pwCriteria object to default values
 *************************************************************/
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


/************************************************************************
 * Randomly generates a password based on users criteria and input it 
 ***********************************************************************/
     
function generatePassword(){
  randomSelArray = [];
  var completedSelArray = [];
  var randomPW ="";
  
  
  resetPWCriteria();
  establishPasswordCriteria();

  for(var i=0; i < pwCriteria.pwLength; i++){
    
    var randChar = '';

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
