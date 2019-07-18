document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.start')
  const resetBtn = document.querySelector('.reset')
  const main = document.querySelector('.main')
  const tetris = document.createElement('div')
  const scoreInput = document.querySelector('.scoreInput')
  const scoreInputEnd = document.querySelector('.scoreInputEnd')
  const linesInput = document.querySelector('.linesInput')
  const your = document.querySelector('.your')
  const music = new Audio('music/tetris.mp3')
  const gameOver = new Audio('music/gameover.wav')
  const clear = new Audio('music/clear.wav')
  const line = new Audio('music/line.wav')
  const x = 5
  const y = 21

  const mainArr = [
    [
      //line
      [0,1],
      [0,2],
      [0,3],
      //turn
      [
        [-1,1],
        [0,0],
        [1,-1],
        [2,-2]
      ],
      [
        [1,-1],
        [0,0],
        [-1,1],
        [-2,2]
      ],
      [
        [-1,1],
        [0,0],
        [1,-1],
        [2,-2]
      ],
      [
        [1,-1],
        [0,0],
        [-1,1],
        [-2,2]
      ]
    ],
    [
      //block
      [1,0],
      [0,1],
      [1,1],
      //turn
      [
        [0,0],
        [0,0],
        [0,0],
        [0,0]
      ],
      [
        [0,0],
        [0,0],
        [0,0],
        [0,0]
      ],
      [
        [0,0],
        [0,0],
        [0,0],
        [0,0]
      ],
      [
        [0,0],
        [0,0],
        [0,0],
        [0,0]
      ]

    ],
    [
      //line right
      [1,0],
      [0,1],
      [0,2],
      //turn
      [
        [0,0],
        [-1,1],
        [1,0],
        [2,-1]
      ],
      [
        [1,-1],
        [1,-1],
        [-1,0],
        [-1,0]
      ],
      [
        [-1,0],
        [0,-1],
        [2,-2],
        [1,-1]
      ],
      [
        [0,-1],
        [0,-1],
        [-2,0],
        [-2,0]
      ]
    ],
    [
      //line left
      [1,0],
      [1,1],
      [1,2],
      //turn
      [
        [0,0],
        [0,0],
        [1,-1],
        [-1,-1]
      ],
      [
        [0,-1],
        [-1,-0],
        [-2,1],
        [1,0]
      ],
      [
        [2,0],
        [0,0],
        [1,-1],
        [1,-1]
      ],
      [
        [-2,0],
        [1,-1],
        [0,0],
        [-1,1]
      ]
    ],
    [
      //zip rigth
      [1,0],
      [-1,1],
      [0,1],
      //turn
      [
        [0,-1],
        [-1,0],
        [2,-1],
        [1,0]
      ],
      [
        [0,0],
        [1,-1],
        [-2,0],
        [-1,-1]
      ],
      [
        [0,-1],
        [-1,0],
        [2,-1],
        [1,0]
      ],
      [
        [0,0],
        [1,-1],
        [-2,0],
        [-1,-1]
      ]
    ],
    [
      //zip left
      [1,0],
      [1,1],
      [2,1],
      //turn
      [
        [2,-1],
        [0,0],
        [1,-1],
        [-1,0]
      ],
      [
        [-2,0],
        [0,-1],
        [-1,0],
        [1,-1]
      ],
      [
        [2,-1],
        [0,0],
        [1,-1],
        [-1,0]
      ],
      [
        [-2,0],
        [0,-1],
        [-1,0],
        [1,-1]
      ]
    ],
    [
      //T
      [1,0],
      [2,0],
      [1,1],
      //turn
      [
        [1,-1],
        [0,0],
        [0,0],
        [0,0]
      ],
      [
        [0,0],
        [-1,0],
        [-1,0],
        [1,-1]
      ],
      [
        [1,-1],
        [1,-1],
        [1,-1],
        [0,0]
      ],
      [
        [-2,0],
        [0,-1],
        [0,-1],
        [-1,-1]
      ]
    ]
  ]
  let i = 0

  let score = 0
  let lines = 0

  let currentFigure = 0
  let figureBody = 0
  let rotate = 1
  let flag = true

  let interval = 0

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

  function getRandom(){
    return Math.round(Math.random()*(mainArr.length-1))
  }

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
  function finishGame(){
    for (let n = 1; n<11; n++) {
      if(document.querySelector(`[posX = "${n}"][posY = "21"]`).classList.contains('set')){
        clearInterval(interval)
        music.pause()
        tetris.style.display = 'none'
        scoreInputEnd.textContent = score
        your.style.display = 'flex'
        gameOver.play()
        break
      }
    }
  }

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

  function startGame () {

    tetris.classList.add('tetris')
    main.appendChild(tetris)

    scoreInput.innerHTML = score
    linesInput.innerHTML = lines

    createBoard()

    create()

    interval = setInterval((move), 1000)

    flag = true
    document.addEventListener('keydown', function(e){
      const coordinates1 = [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')]
      const coordinates2 = [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')]
      const coordinates3 = [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')]
      const coordinates4 = [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')]

      function getNewState(a) {

        flag = true

        const figureNew = [
          document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
          document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
          document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
          document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`)
        ]

        for (i = 0; i < figureNew.length; i++){
          if (!figureNew[i] || figureNew[i].classList.contains('set')) {
            flag = false
          }
        }
        if (flag) {
          for(i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure')
          }

          figureBody = figureNew

          for(i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure')
          }
        }
      }

      if(e.keyCode === 37) {
        getNewState(-1)
      } else if(e.keyCode === 39) {
        getNewState(1)
      } else if(e.keyCode === 40) {
        move()
      } else if(e.keyCode === 38) {

        flag = true

        const figureNew = [
          document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate+2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate+2][0][1]}"]`),
          document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate+2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate+2][1][1]}"]`),
          document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate+2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate+2][2][1]}"]`),
          document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate+2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate+2][3][1]}"]`)
        ]

        for (i = 0; i < figureNew.length; i++){
          if (!figureNew[i] || figureNew[i].classList.contains('set')) {
            flag = false
          }
        }
        if (flag === true) {
          for(i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure')
          }

          figureBody = figureNew

          for(i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure')
          }

          if (rotate < 4) {
            rotate++
          } else {
            rotate = 1
          }
        }
      }
    })

  }
  
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
  resetBtn.addEventListener('click', function (){
    window.location.reload()

  })
})
