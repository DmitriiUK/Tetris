# SEI-Project-01: Tetris
Made with Vanilla Javascript


## Technologies used

* JavaScript (ES6)
* HTML5
* CSS 3
* SASS
* git
* GitHub
* HTML5 Audio
* CSS animation

## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## Overview
* Press Start Button to open a game

[![button](https://user-images.githubusercontent.com/46447270/61528382-83474800-aa16-11e9-8db2-d13b2ebb0a74.png
)]( https://dmitriiuk.github.io/Tetris/.)


### Introduction
My Tetris game is a take on the classic Tetris game from the 80s. Tetris or Tetriminos are game pieces shaped like tetrominoes, geometric shapes composed of four square blocks each. A random sequence of Tetriminos fall down the playing field. The objective of the game is to manipulate these Tetriminos, by moving each one sideways and/or rotating by quarter-turns, so that they form a solid horizontal line without gaps. When such a line is formed, it disappears and any blocks above it fall down to fill the space. When a certain number of lines are cleared, the game enters a new level. As the game progresses, each level causes the Tetriminos to fall faster, and the game ends when the stack of Tetriminos reaches the top of the playing field and no new Tetriminos are able to enter.

### Timeframe
* 7 day solo project

### Brief

* Render a grid-based game in the browser
* Create HTML, CSS and JavaScript files
* Use Javascript to manipulate the DOM
* Deploy game using Github Pages
* Player's score should be displayed at end of game on the game field


## Controls
|Key        |Function        |
|-----------|----------------|
|Up         |Rotate          |
|Down       |Lower block     |
|Right      |Move block right|
|Left       |Move block left |
|Hold Down  |Hard drop       |




### Game Instructions


* Main Page - press start button to start the game.

![Game Page - Main Page](https://user-images.githubusercontent.com/46447270/61534410-6e26e500-aa27-11e9-9a5c-e188cc6d3844.png
)


* To manipulate your tetramino, press up to rotate, left or rigth to change position.

![Game Page](https://user-images.githubusercontent.com/46447270/61534476-9c0c2980-aa27-11e9-9b40-143b4578f3cc.png
)


* Tetramino will turn 90 degrees

![Game Page](https://user-images.githubusercontent.com/46447270/61534557-d83f8a00-aa27-11e9-95a3-f9979c67bec4.png
)


* You should move each tetramino sideways and/or rotating by quarter-turns, so that they form a solid horizontal line without gaps to score points

![Game Page](https://user-images.githubusercontent.com/46447270/61534722-44ba8900-aa28-11e9-8703-1920ad86db3c.png
)


* Here you can see that the player has a problem, the next figure that falls on the block, will lead to the end of the game

![Game Page](https://user-images.githubusercontent.com/46447270/61535067-35880b00-aa29-11e9-8633-4e300cf08af8.png)
* Game Over - press reset button to go to the main page.

![Game Page - Game Over! + Score](https://user-images.githubusercontent.com/46447270/61534168-b8f42d00-aa26-11e9-9fe0-b02f7412cdc1.png)



## Process
The first thing I did was create a 10 x 24 grid in Javascript and add a position coordinates system with 'x' and 'y' to build the rest of the game on. Them I made an array with tetreminoes and add inside each tetreminoes coordinates for rotation systems.

#### Grid or Game field Function

Create Grid Function:
```javascript
function createBoard(){
  for (i = 0; i<240; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    tetris.appendChild(cell)
  }
  const cell = document.querySelectorAll('.cell')

  i = 0
  for (let y=24; y>0; y--){
    for (let x=1; x<11; x++){
      cell[i].setAttribute('posX', x)
      cell[i].setAttribute('posY', y)
      i++
    }
  }
}
```

#### Array with Tetremino - Line

Logic of Main Array with all tetreminoes:
```javascript
mainArr = [
  [
    //line
    [0,1],
    [0,2],
    [0,3],
    //turn on 90 degrees
    [
      [-1,1],
      [0,0],
      [1,-1],
      [2,-2]
    ],
    //turn on 180 degrees
    [
      [1,-1],
      [0,0],
      [-1,1],
      [-2,2]
    ],
    //turn on 270 degrees
    [
      [-1,1],
      [0,0],
      [1,-1],
      [2,-2]
    ],
    //turn on 360 degrees
    [
      [1,-1],
      [0,0],
      [-1,1],
      [-2,2]
    ]
  ]
]
```
#### Create Tetremino Function

Create Function:
```javascript
function create() {
  getRandom()
  rotate = 1
  currentFigure = getRandom()

  figureBody = [
    document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
    document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
  ]

  for (i = 0; i < figureBody.length; i++){
    figureBody[i].classList.add('figure')
  }
}
```

#### Create Move Function

This function looks too complicated, but if we dwell on it in more detail, we will see a coordinate array. Next, we see for loops that check the lower bounds, check the blocks that were previously on the field, and the condition allows us to understand whether the player filled the line or not.
* Move Function:
```javascript
function move() {
  let moveFlag = true
  const coordinates = [
    [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')],
    [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')],
    [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')],
    [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')]
  ]

  for(i = 0; i < coordinates.length; i++) {
    if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
      moveFlag = false
      break
    }
  }

  if(moveFlag) {
    for(i = 0; i < figureBody.length; i++) {
      figureBody[i].classList.remove('figure')
    }
    figureBody = [
      document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
      document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
      document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
      document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`)
    ]
    for(i = 0; i < figureBody.length; i++) {
      figureBody[i].classList.add('figure')
    }
  } else {
    for(i = 0; i < figureBody.length; i++) {
      figureBody[i].classList.remove('figure')
      figureBody[i].classList.add('set')
      line.play()
    }
    for(let i=1; i<21;i++){
      let count = 0
      for (let k = 1; k<11; k++){
        if(document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')){
          count++
          if(count === 10) {
            score += 100
            scoreInput.textContent = score
            lines +=1
            linesInput.textContent = lines
            if (lines === 5){
              clearInterval(interval)
              interval = setInterval(() => {
                move()
              },900)
            } else if (lines === 15){
              clearInterval(interval)
              interval = setInterval(() => {
                move()
              },800)
            } else if (lines ===30){
              clearInterval(interval)
              interval = setInterval(() => {
                move()
              },750)
            } else if (lines === 40){
              clearInterval(interval)
              interval = setInterval(() => {
                move()
              },500)
            } else if (lines === 55){
              clearInterval(interval)
              interval = setInterval(() => {
                move()
              },250)
            }
            clear.play()
            for(let m=1; m<11; m++){
              document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
            }

            const set = document.querySelectorAll('.set')
            const newSet = []
            for (let s = 0; s<set.length;s++ ){
              const setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')]
              if(setCoordinates[1] > i) {
                set[s].classList.remove('set')
                newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1]-1}"]`))
              }
            }
            for(let a=0; a<newSet.length; a++){
              newSet[a].classList.add('set')
            }
            i--
          }
        }
      }
    }
    finishGame()
    create()
  }
}
```
#### Start Button
Most likely, many will have a question: what is it?
Since I found not the best version of the musical accompaniment of the game, I had to cut the music without a music editor, why? I just didn’t have time to read how to cut a song.
* so I edited it that way:
```javascript
startBtn.addEventListener('click', function (){
  startGame()
  music.play()
  music.addEventListener('timeupdate', function(){
    var buffer = 43.90
    if(this.currentTime > this.duration - buffer){
      this.currentTime = 0
      this.play()
    }
  }, false)
  startBtn.style.display = 'none'
})
```

## Challenges
At first, I thought about what I would do, I do not know how to create games, it is so difficult! Gathering and stopping to think that I can not do anything, I just started to google. The first question I just had to answer is how the logic of the game is built. I found the answer to my question when I sat down and started recording the whole process of the game, after that I created a table with functions that may be useful to me, and at the end I looked at how all these functions should work. I had a few ideas on how else to implement this project, but I will leave this for the next time.

## Wins
Probably the most difficult part was to understand what tools for the implementation of this project will be useful to me. Since the game works, I can conclude that I coped with this challenge.

## Future features
1. Do the correct scoring system.
1. Add different colors for tetreminoes.
1. Add a menu for the game.
