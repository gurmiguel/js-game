export const buttonIndex = 0

export function handleOn(keysPressed) {

  return {
    jump: true,
  }
}

export function handleOff(keysPressed) {
  return {
    jump: false,
  }
}