
let aiArr = [],
  userArr = [],
  updatedArrays = []

let gameState = {
  strict: false,
  userTurn: false,
  on: false,
  started: false,
  counter: 0
}

let gameSounds = {
  greenButton: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  redButton: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  blueButton: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  yellowButton: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  introMusic: new Audio('https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_NUVnRFRZamswYlU'),
  exitMusic: new Audio('https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_bUN3LWY4NkVld3c'),
  incorrectGuess: new Audio('https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_TEFFUU9OUEZLWG8'),
  click: new Audio('https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_ZklPQ29NYThsVW8')
}


function lightAllButtons(){
  $('#greenButton').css('background-color', 'hsl(120,100%,45%)')
  $('#redButton').css('background-color', 'hsl(360,100%,45%)')
  $('#blueButton').css('background-color', 'hsl(240,100%,45%)')
  $('#yellowButton').css('background-color', 'hsl(60,100%,45%)')
}

function defaultButtonColors(){
  $('#greenButton').css('background-color', 'hsl(120,100%,25%)')
  $('#redButton').css('background-color', 'hsl(360,100%,25%)')
  $('#blueButton').css('background-color', 'hsl(240,100%,25%)')
  $('#yellowButton').css('background-color', 'hsl(60,100%,25%)')  
}

function changeSelectedButtonColor(element){
  let id = element.attr('id')

  if (id === 'greenButton'){
    element.css('background-color', 'hsl(120,100%,45%)')
    gameSounds.greenButton.play()
  } else if (id === 'redButton'){
    element.css('background-color', 'hsl(360,100%,45%)')
    gameSounds.redButton.play()
  } else if (id === 'blueButton'){
    element.css('background-color', 'hsl(240,100%,45%)')
    gameSounds.blueButton.play()
  } else if (id === 'yellowButton'){
    element.css('background-color', 'hsl(60,100%,45%)')
    gameSounds.yellowButton.play()
  }
}

function addToAiArr(array){

  let random = Math.floor(Math.random() * 4)
  array = array.concat(random)

  return array

}

function addToUserArr(userArr, btnNumber){

  userArr.push(btnNumber)
  
}

function checkArrayMatch(userArr, aiArr){
  

  let length = userArr.length,
    bool = false

  if (userArr[length - 1] === aiArr[length - 1]){
    bool = true
  }

  return bool
}

function resetArrs(userArr, aiArr){

  if (gameState.strict === true){
    aiArr = []
  }

  userArr = []

  return [userArr, aiArr]
}


function updateCounter(correct){

  if (correct){
    gameState.counter += 1
  } else if (!correct && gameState.strict){
    gameState.counter = 0
  }

  $('#counter').html(gameState.counter)
}


function fullSimonAnimation(aiArr){

  let number

  gameState.userTurn = false
  setTimeout(function(){gameState.userTurn = true}, aiArr.length * 1500)


  aiArr.forEach((btnNumber, idx) => {

    (function(btnNumber){
      setTimeout(function(){buttonAnimation(btnNumber)}, 1500 * idx)
    })(btnNumber)

      setTimeout(defaultButtonColors, 1500 * idx + 1000)

  })

}


function buttonAnimation(number){

  if (gameState.on){
    
    if (number === 0){
      $('#greenButton').css('background-color', 'hsl(120,100%,45%)')
      gameSounds.greenButton.play()
    } else if (number === 1){
      $('#redButton').css('background-color', 'hsl(360,100%,45%)')
      gameSounds.redButton.play()

    } else if (number === 2){
      $('#blueButton').css('background-color', 'hsl(240,100%,45%)')
      gameSounds.blueButton.play()

    } else if (number === 3){
      $('#yellowButton').css('background-color', 'hsl(60,100%,45%)')
      gameSounds.yellowButton.play()
    }
  }
}


function correctPattern(){

    updateCounter(true)
    aiArr = addToAiArr(aiArr)

    setTimeout(function(){
      fullSimonAnimation(aiArr)
    }, 1500)


}

function mismatchedArray(userArr, aiArr){

  let array = []
  gameSounds.incorrectGuess.play()
  updateCounter(false)
  array = resetArrs(userArr, aiArr)

  if (gameState.strict){
    aiArr = addToAiArr(array[1])
  }

  setTimeout(function(){
      fullSimonAnimation(array[1])
  }, 1500)

  return array
}

$(document).ready(function(){

  $('input[value="onSwitch"]').on('change', function(){

    if ($(this).is('input:checked')){

      gameState.on = true
      gameSounds.click.play()
      lightAllButtons()

    } else {

      gameState.on = false
      gameState.started = false
      gameState.userTurn = false
      gameSounds.exitMusic.play()
      $('#counter').text('')
      $('#ledLight').css('background-color', 'black')
      aiArr = []
      userArr = []
      defaultButtonColors() 

    }
  })


  $('#start').on('click', function(){

    if (gameState.on && !gameState.started){

      gameState.started = true
      $('#counter').text('0')
      gameSounds.introMusic.play()
      defaultButtonColors()
      setTimeout(function(){
        aiArr = addToAiArr(aiArr)
        fullSimonAnimation(aiArr)
        gameState.userTurn = true}, 3000)
    }

  })


  $('#strict').on('click', function(){

    if (gameState.on){

      if (gameState.strict === false){
        $('#ledLight').css('background-color', 'red')
        gameState.strict = true

      } else {
        $('#ledLight').css('background-color', 'black')
        gameState.strict = false

      }

    }

  })


  $('.button').on('mousedown', function(){

    if (gameState.userTurn && gameState.on){
      changeSelectedButtonColor($(this))
    }

  })


  $('.button').on('mouseup', function(){

    if (gameState.userTurn && gameState.on){
      gameState.userTurn = false
      defaultButtonColors()
      
      addToUserArr(userArr, +$(this).attr('data-number'))
      let bool = checkArrayMatch(userArr, aiArr)

      if (bool && aiArr.length === userArr.length){
        
        correctPattern(aiArr)
        userArr = []

      } else if (!bool){

        updatedArrays = mismatchedArray(userArr, aiArr)
        userArr = updatedArrays[0]
        aiArr = updatedArrays[1]

      } else {
        gameState.userTurn = true
      }

    }
  })

})

