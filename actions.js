var strict = false;
var userTurn = false;
var counter;
var aiArr = [];
var userArr = [];
var on = false;
var updatedArrays = [];
var started = false;
window.alert = function(){};


var gameSounds = [new Audio("https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_ZklPQ29NYThsVW8"), new Audio("https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_TEFFUU9OUEZLWG8"), new Audio("https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_NUVnRFRZamswYlU"), new Audio("https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_bUN3LWY4NkVld3c")];

var btnSounds = [new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"), new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"), new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"), new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")];

function lightAllButtons(){
  $("#greenButton").css("background-color", "hsl(120,100%,45%)");
  $("#redButton").css("background-color", "hsl(360,100%,45%)");
  $("#blueButton").css("background-color", "hsl(240,100%,45%)");
  $("#yellowButton").css("background-color", "hsl(60,100%,45%)");
}

function defaultButtonColors(){
  $("#greenButton").css("background-color", "hsl(120,100%,25%)");
  $("#redButton").css("background-color", "hsl(360,100%,25%)");
  $("#blueButton").css("background-color", "hsl(240,100%,25%)");
  $("#yellowButton").css("background-color", "hsl(60,100%,25%)");  
}

function changeSelectedButtonColor(element){
  var id = element.attr("id");

  if(id=="greenButton"){
    element.css("background-color", "hsl(120,100%,45%)");
    btnSounds[0].play();
  }else if(id == "redButton"){
    element.css("background-color", "hsl(360,100%,45%)");
    btnSounds[1].play();
  }else if(id == "blueButton"){
    element.css("background-color", "hsl(240,100%,45%)");
    btnSounds[2].play();
  }else if(id == "yellowButton"){
    element.css("background-color", "hsl(60,100%,45%)");
    btnSounds[3].play();
  }
}

function addToAiArr(aiArr){
  
  var random = Math.floor(Math.random()*4);
  aiArr.push(random);
  
}

function addToUserArr(userArr, btnNumber){

  userArr.push(btnNumber);
  
}

function checkArrayMatch(userArr, aiArr){

  var length = userArr.length;
  var bool = false;

  if(userArr[length - 1] == aiArr[length - 1]){
    bool = true
  }

  return bool;
}

function resetArrs(userArr, aiArr, strict){

  if(strict == true){
    aiArr = [];
  }
  
  userArr = [];
  
  return [userArr, aiArr];

}


function updateCounter(bool, strict){
  
  var counter = parseInt($("#counter").html());
  counter = parseInt(counter);
  
  if(bool == true){
    counter++;
  }else if(bool == false && strict == true){
    counter = 0; 
  }
  
  $("#counter").html(counter);
  
}


function fullSimonAnimation(aiArr){

  var number;
  var length = aiArr.length;
  userTurn = false;
  setTimeout(function(){userTurn = true}, length*1500);
  
  for(var i = 0; i < length; i++){
    
    number = aiArr[i];
    (function(number){
    setTimeout(function(){buttonAnimation(number)}, 1500*i);
    })(number);
    
    setTimeout(defaultButtonColors, 1500*i + 1000);

    
  }

}


function buttonAnimation(number){
  
  if(on == true){
    if(number == "0"){
      $("#greenButton").css("background-color", "hsl(120,100%,45%)");
      btnSounds[0].play();
    }else if(number == "1"){
      $("#redButton").css("background-color", "hsl(360,100%,45%)");
      btnSounds[1].play();

    }else if(number == "2"){
      $("#blueButton").css("background-color", "hsl(240,100%,45%)");
      btnSounds[2].play();

    }else if(number == "3"){
      $("#yellowButton").css("background-color", "hsl(60,100%,45%)");
      btnSounds[3].play();
    }
  }
}


function matchedArray(userArr, aiArr, strict, counter){
  
    updateCounter(true, strict, counter);
    addToAiArr(aiArr);
    
    setTimeout(function(){
      fullSimonAnimation(aiArr);    
    }, 1500);
  
  return [];

}

function mismatchedArray(userArr, aiArr, strict, counter){
  
  var array = [];
  gameSounds[1].play();
  updateCounter(false, strict, counter);
  array = resetArrs(userArr, aiArr, strict);
    
  if(strict == true){
    addToAiArr(array[1]);
  }
  
  setTimeout(function(){
      fullSimonAnimation(array[1]);    
  }, 1500);
  
  return array;
}
  
$(document).ready(function(){
  
  $('input[value="onSwitch"]').on("change", function(){
  
    if($(this).is("input:checked")){

      on = true;
      gameSounds[0].play();
      lightAllButtons();

    }else{

      on = false;
      started = false;
      userTurn = false;
      gameSounds[3].play();
      $("#counter").text("");
      $("#ledLight").css("background-color", "black");
      aiArr = [];
      userArr = [];
      defaultButtonColors(); 

    }  
  })

  
  $("#start").on("click", function(){
    
    if(on == true && started == false){
  
      started = true;
      $("#counter").text("0");
      gameSounds[2].play();
      defaultButtonColors();
      setTimeout(function(){
        addToAiArr(aiArr);
        fullSimonAnimation(aiArr);
        userTurn = true;}, 3000);
    }
  
  })
  

  $("#strict").on("click", function(){
    
    if(on == true){
    
      if(strict == false){
        $("#ledLight").css("background-color", "red");
        strict = true;

      }else{
        $("#ledLight").css("background-color", "black");
        strict = false;

      }
      
    }
    
  })
  
  
  $(".button").on("mousedown", function(){
    
    if(userTurn == true && on == true){
      changeSelectedButtonColor($(this));
    }
    
  })

  
  $(".button").on("mouseup", function(){

    if(userTurn == true && on == true){
      userTurn = false;
      defaultButtonColors();
      
      addToUserArr(userArr, $(this).attr("data-number"));
      var bool = checkArrayMatch(userArr, aiArr);

      if(bool == true && aiArr.length == userArr.length){
        
        updatedArrays = matchedArray(userArr, aiArr, strict, counter);
        userArr = updatedArrays;
  
      }else if(bool == false){
        
        updatedArrays = mismatchedArray(userArr, aiArr, strict, counter);
        userArr = updatedArrays[0];
        aiArr = updatedArrays[1];

  
      }else{
        userTurn = true;
      }
      
    }
  })
    
 
  
  
})


  


