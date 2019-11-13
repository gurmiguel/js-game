import './styles.scss'
import App from './App'
import { generateCanvas } from './utils/canvas';
import './utils/math'

function init() {
  const previous = document.getElementById('stage')
  if(previous) {
    previous.parentNode.removeChild(previous)
  }

  const canvas = generateCanvas(800, 600)

  document.body.insertBefore(canvas, document.body.firstChild)

  App.start(canvas, 60, true)

  let timer
  canvas.addEventListener('mousemove',function() {
    canvas.style.cursor = 'default'
    clearTimeout(timer)
    timer = setTimeout(() => {
      canvas.style.cursor = 'none'
    },1500)
  })
}

init();