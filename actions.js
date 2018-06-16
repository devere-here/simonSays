
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


let gameSounds = [new Audio('https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_ZklPQ29NYThsVW8'), new Audio('https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_TEFFUU9OUEZLWG8'), new Audio('https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_NUVnRFRZamswYlU'), new Audio('https://drive.google.com/uc?export=download&id=0Bw2029NKQAh_bUN3LWY4NkVld3c')]

let btnSounds = [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')]

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
    btnSounds[0].play()
  } else if (id === 'redButton'){
    element.css('background-color', 'hsl(360,100%,45%)')
    btnSounds[1].play()
  } else if (id === 'blueButton'){
    element.css('background-color', 'hsl(240,100%,45%)')
    btnSounds[2].play()
  } else if (id === 'yellowButton'){
    element.css('background-color', 'hsl(60,100%,45%)')
    btnSounds[3].play()
  }
}

function addToAiArr(aiArr){

  let random = Math.floor(Math.random() * 4)
  aiArr.push(random)
  
}

function addToUserArr(userArr, btnNumber){

  userArr.push(btnNumber)
  
}

function checkArrayMatch(userArr, aiArr){

  let length = userArr.length
  let bool = false

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

  // let counter = parseInt($('#counter').html())
  // counter = +counter
  
  if (correct){
    gameState.counter += 1
  } else if (!correct && gameState.strict){
    gameState.counter = 0
  }

  $('#counter').html(gameState.counter)

}


function fullSimonAnimation(aiArr){

  let number
  let length = aiArr.length
  gameState.userTurn = false
  setTimeout(function(){gameState.userTurn = true}, length * 1500)
  
  for (let i = 0; i < length; i++){

    number = aiArr[i];
    (function(number){
    setTimeout(function(){buttonAnimation(number)}, 1500 * i)
    })(number)
    
    setTimeout(defaultButtonColors, 1500 * i + 1000)

    
  }

}


function buttonAnimation(number){

  if (gameState.on){
    if (number === '0'){
      $('#greenButton').css('background-color', 'hsl(120,100%,45%)')
      btnSounds[0].play()
    } else if (number === '1'){
      $('#redButton').css('background-color', 'hsl(360,100%,45%)')
      btnSounds[1].play()

    } else if (number === '2'){
      $('#blueButton').css('background-color', 'hsl(240,100%,45%)')
      btnSounds[2].play()

    } else if (number === '3'){
      $('#yellowButton').css('background-color', 'hsl(60,100%,45%)')
      btnSounds[3].play()
    }
  }
}


function matchedArray(userArr, aiArr){

    updateCounter(true)
    addToAiArr(aiArr)
    
    setTimeout(function(){
      fullSimonAnimation(aiArr)    
    }, 1500)
  
  return []

}

function mismatchedArray(userArr, aiArr){

  let array = []
  gameSounds[1].play()
  updateCounter(false)
  array = resetArrs(userArr, aiArr)
    
  if (gameState.strict){
    addToAiArr(array[1])
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
      gameSounds[0].play()
      lightAllButtons()

    } else {

      gameState.on = false
      gameState.started = false
      gameState.userTurn = false
      gameSounds[3].play()
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
      gameSounds[2].play()
      defaultButtonColors()
      setTimeout(function(){
        addToAiArr(aiArr)
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
      
      addToUserArr(userArr, $(this).attr('data-number'))
      let bool = checkArrayMatch(userArr, aiArr)

      if (bool && aiArr.length === userArr.length){

        updatedArrays = matchedArray(userArr, aiArr)
        userArr = updatedArrays

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

