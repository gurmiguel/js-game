export function getPixelRatio(context) {
  const backingStores = [
    'webkitBackingStorePixelRatio',
    'mozBackingStorePixelRatio',
    'msBackingStorePixelRatio',
    'oBackingStorePixelRatio',
    'backingStorePixelRatio',
  ]

  const deviceRatio = window.devicePixelRatio

  const backingRatio = backingStores.reduce((prev, curr) => {
    return (context.hasOwnProperty(curr) ? context[curr] : prev)
  }, 1)

  return deviceRatio / backingRatio
}

export function generateCanvas(width, height, id) {
  const canvas = document.createElement('canvas')
  canvas.id = id
  const context = canvas.getContext('2d')

  const ratio = getPixelRatio(context)

  canvas.width = Math.round(width * ratio)
  canvas.height = Math.round(height * ratio)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  context.setTransform(ratio, 0, 0, ratio, 0, 0)

  return canvas
}