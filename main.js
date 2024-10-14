let years = document.querySelector('#years')
let days = document.querySelector('#days')
let hours = document.querySelector('#hours')
let minutes = document.querySelector('#minutes')
let seconds = document.querySelector('#seconds')

let yy = document.querySelector('#yy')
let dd = document.querySelector('#dd')
let hh = document.querySelector('#hh')
let mm = document.querySelector('#mm')
let ss = document.querySelector('#ss')

let deadlineInput = document.querySelector('#deadline')
let endDate
let timer

deadlineInput.addEventListener('change', function() {
  document.querySelector('#time').style.display = 'flex'
  document.querySelector('.expired').style.display = 'none'
  endDate = new Date(this.value).getTime()
  startCountdown()
})

function startCountdown() {
  if (timer) clearInterval(timer) 
  timer = setInterval(() => {
    let now = new Date().getTime()
    let distance = endDate - now

    let y = Math.floor(distance / (1000 * 60 * 60 * 24 * 365))
    let d = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24))
    let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let s = Math.floor((distance % (1000 * 60)) / 1000)

    years.innerHTML = (y < 10 ? '0' + y : y) + '<br><span>years</span>'
    days.innerHTML = (d < 10 ? '0' + d : d) + '<br><span>days</span>'
    hours.innerHTML = (h < 10 ? '0' + h : h) + '<br><span>hours</span>'
    minutes.innerHTML = (m < 10 ? '0' + m : m) + '<br><span>minutes</span>'
    seconds.innerHTML = (s < 10 ? '0' + s : s) + '<br><span>seconds</span>'

    yy.style.strokeDashoffset = 440 - (440 * y) / 100
    dd.style.strokeDashoffset = 440 - (440 * d) / 365
    hh.style.strokeDashoffset = 440 - (440 * h) / 24  
    mm.style.strokeDashoffset = 440 - (440 * m) / 60
    ss.style.strokeDashoffset = 440 - (440 * s) / 60

    if (distance < 0) {
      clearInterval(timer) 
      document.querySelector('#time').style.display = 'none'
      document.querySelector('.expired').style.display = 'block'
      document.querySelector('.title').innerHTML = 'reset a new deadline'
    }else{
      document.querySelector('.title').innerHTML = 'countdown timer'
    }
  }, 1000)
}


window.onload = function() {
  if (deadlineInput.value) {
    endDate = new Date(deadlineInput.value).getTime()
    startCountdown()
  }
}
