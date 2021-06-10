// Assignment Code
var generateBtn = document.querySelector("#generate");

var lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lettersLower = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase;
var specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
var pwOptionsArr = ["upper","lower","special","numeric"]
const passwordMin = 8;
const passwordMax = 128;

function alertUser(message){
  alert(message);
}

function confirmWithUser(message){
  return confirm(message);
}

var setPasswordCriteria = function() {
    var pwCriteria ={"pwLength" : 0,
    "inclUpper" : false,
    "incLower" : false,
    "inclNumbers" : false,
    "inclSpecial" : false
  }
  var proceed = false;
  while(!proceed){
  var pwLengthRsp = prompt("Enter you desired password length ("+ passwordMin + " - " + passwordMax +").");


  //If User Clicks Cancel, notifiy user and end process
  if (pwLengthRsp === null) {
    alertUser("The Password Generation Process has been canceled!");
    return null;
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
 

} 

     
function generatePassword(){
  var randomPW ="";
  var isValid = false;


  

  
  setPasswordCriteria()

 
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
