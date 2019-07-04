var canvas = document.querySelector("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext("2d")

// c.fillStyle = "rgba(255, 0, 0, 0.5)"
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = "rgba(0, 0, 255, 0.5)"
// c.fillRect(400, 100, 100, 100)
// c.fillStyle = "rgba(0, 255, 0, 0.5)"
// c.fillRect(300, 300, 100, 100)
// console.log(canvas)


// Line
// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(300, 100)
// c.lineTo(400, 300)
// c.strokeStyle = "#fa34a3"
// c.stroke()


// Arc / Circle
// c.beginPath()
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = "blue"
// c.stroke()

// for(let i = 0; i < 25; i++) {
//   var x = Math.random() * window.innerWidth
//   var y = Math.random() * window.innerHeight
//   c.beginPath()
//   c.arc(x, y, 30, 0, Math.PI * 2, false)
//   c.strokeStyle = "blue"
//   c.stroke()
// }

// let x = Math.random() * innerWidth
// let y = Math.random() * innerHeight
// let dx = (Math.random() - 0.5) * 8
// let dy = (Math.random() - 0.5) * 8
// let radius = 30

var mouse = {
  x: undefined,
  y: undefined
}

var MAX_RADIUS = 40

var RANDOM_COLORS = ["#ffaa33", "#99ffaa", "#00ff00", "#4411aa", "#ff1100"]

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx = -this.dx
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0) this.dy = -this.dy
    this.x += this.dx
    this.y += this.dy

    // Interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if(this.radius < MAX_RADIUS) this.radius += 1
    } else if(this.radius > this.minRadius) {
      this.radius -= 1
    }

    this.draw()
  }
}

// let x = Math.random() * innerWidth
// let y = Math.random() * innerHeight
// let dx = (Math.random() - 0.5) * 8
// let dy = (Math.random() - 0.5) * 8
// let radius = 30

var circleArray = []

for(let i = 0; i < 800; i++) {
  let radius = Math.random() * 3 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius
  let y = Math.random() * (innerHeight - radius * 2) + radius
  let dx = (Math.random() - 0.5)
  let dy = (Math.random() - 0.5)
  circleArray.push(new Circle(x, y, dx, dy, radius))
}

console.log(circleArray)

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  circleArray.forEach(element => element.update());
}

animate()