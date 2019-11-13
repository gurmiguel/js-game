export const axisIndex = 0

export function isPressed(axis) {
  return axis > 0.1
}

export function handleOn(keysPressed) {

  return {
    right: true,
  }
}

export function handleOff(keysPressed) {

  return {
    right: false,
  }
}