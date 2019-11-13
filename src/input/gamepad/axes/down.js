export const axisIndex = 1

export function isPressed(axis) {
  return axis > 0.3
}

export function handleOn(keysPressed) {

  return {
    dive: true,
  }
}

export function handleOff(keysPressed) {

  return {
    dive: false,
  }
}