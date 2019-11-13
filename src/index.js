import './styles.scss'
import App from './App'
import { generateCanvas } from './utils/canvas';
import './utils/math'

function init() {
  const previous = document.getElementsByTagName('canvas')
  if(previous) {
    Array.from(previous).forEach(node => node.parentNode.removeChild(previous))
  }
  const canvas = generateCanvas(800, 600, 'stage')
  const background = generateCanvas(800, 600, 'background')

  document.body.insertBefore(canvas, document.body.firstChild)
  document.body.insertBefore(background, document.body.firstChild)

  App.start(canvas, background, 60, true)

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