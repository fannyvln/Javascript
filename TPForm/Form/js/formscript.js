window.addEventListener("load", function() {

//Initialisation of all event listeners
  document.getElementById("fname").addEventListener("keyup", checkname);
  document.getElementById("lname").addEventListener("keyup", checkname);
  document.getElementById("age").addEventListener("keyup", checkage);
  document.getElementById("id").addEventListener("keyup", checkid);
  document.getElementById("pwd").addEventListener("keyup", checkpwd);
  document.getElementById("pwd2").addEventListener("keyup", checkpwd2);
  document.getElementById("CGU").addEventListener("click", checkCGU);

  //Initialisation of all global variables of control
    cname = false;
    cage = false;
    cid = false;
    cpwd = false;
    cpwd2 = false;
    ccgu = false;

});

//Function which sets to true the control variable affiliated cname if the name (lname + fname) doesn't contain any number
function checkname(){
  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");
  var name = fname.value.concat(lname.value);
  var regexName = /[0-9]/g;
  var nameTip = document.getElementById("nametip");

  if(fname !== "" && lname !== ""){
    if (regexName.test(name)){
      nameTip.textContent = "Warning: The name contains non-authorized characters";
      cname = false;
    }
    else {
      cname = true;
      nameTip.textContent = "";
    }
  }

  formcontrol();
}

//Function which sets to true the control variable affiliated cage if the age is greater than 18
function checkage(){
  console.log("checkage");
  var age = document.getElementById("age");
  var ageTip = document.getElementById("agetip");

  if(age.value >= 18){
    cage = true;
    ageTip.textContent = "OK";
  }
  else {
    cage = false;
    ageTip.textContent = "You need to be older than 18";
  }
  formcontrol();
}

//Function which sets to true the control variable affiliated cid if the id fits all constraints (lenghth, characters)
function checkid(){
  var idTip = document.getElementById("idtip");
  var regex = /^[a-zA-Z]+$/;
  var id = document.getElementById("id");

  if (regex.test(id.value)) {
    if (id.value.length <= 11){ //id needs to contain up to 11 characters
      cid = true;
      idTip.textContent = "OK";
    } else {
      idTip.textContent = "Your id needs to contain less than 12 characters";
      cid = false;
      }
  } else {
    idTip.textContent = "Identifiant must be composed 1) only of letters 2) of less than to 12 characters";
    cid = false;
  }
  formcontrol();
}

//Function which sets to true the control variable affiliated cpwd2 if the two passwords are the same
function checkpwd2(){
  var pwd2Tip = document.getElementById("pwd2tip");
  var pwd1 = document.getElementById("pwd");
  var pwd2 = document.getElementById("pwd2");

  if (pwd1 !== ""){
    if (cpwd === true && pwd1.value === pwd2.value){
      cpwd2 = true;
      pwd2Tip.textContent = "OK";
    } else {
      pwd2Tip.textContent = "Both passwords need to be the same";
      cpwd2 = false;
    }

  }
  formcontrol();
}

//Function which sets to true the control variable affiliated cpwd if the password fit all constraints
//Calculate the password strength
function checkpwd(){

  //Initialisation of the password force and some criteria thanks to regular expressions
  pwdsgth = 0;
  var regnum = /[0-9]/;
  var regmeta = /[^A-Za-z0-9]/;
  var pwdTip = document.getElementById("pwdtip");
  var sgthDisplay = document.getElementById("strength");
  var progressBar = document.getElementById("progress");

  if(pwd.value !== ""){
    if(pwd.value.length >= 8 ) pwdsgth += 20; //password needs to contain at least 8 characters
    if (pwd.value !== pwd.value.toLowerCase()) pwdsgth += 20; //any uppercase characters
    if (pwd.value !== pwd.value.toUpperCase()) pwdsgth += 20; //any lowercase characters
    if (regnum.test (pwd.value)) pwdsgth += 20; //any number
    if (regmeta.test (pwd.value)) pwdsgth += 20; //any metacharacters
  }

  if(pwdsgth == 100)
  {
    cpwd = true;
    pwdTip.textContent = "OK";
  }
  else {
    pwdTip.textContent = "Your password needs to contain at least 8 characters, one lowercase, one uppercase, one number and a special character.";
    cpwd = false;
  }

  sgthDisplay.textContent= "Strength: " + pwdsgth + "%";
  progressBar.style.width = pwdsgth + "%";
  formcontrol();
}

//Function which sets to true the control variable affiliated ccgu if the CGU are accepted
function checkCGU(){
  var CGU = document.getElementById("CGU");
  var checkTip = document.getElementById("checktip");

  if (CGU.checked){
    checkTip.textContent = "OK";
    ccgu = true;
  } else {
    checkTip.textContent = "You need to agree with the CGU";
    ccgu = false;
  }
  formcontrol();
}

//Function which enables the submit button if all control variables are true
function formcontrol(){
  var sbtBtn = document.getElementById("submit");

  if(cname === true && cid === true && cage === true && cpwd === true && cpwd2 === true && ccgu === true)
    sbtBtn.removeAttribute("disabled");
  else
    sbtBtn.setAttribute("disabled","disabled");
}
