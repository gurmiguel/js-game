export const buttonIndex = 2

export function handleOn(keysPressed) {

  return {
    speedBoost: true,
  }
}

export function handleOff(keysPressed) {
  return {
    speedBoost: false,
  }
}