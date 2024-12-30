export const convertMoneyIntoDigits = (money) => {
  return String(money).replace(/\./g, '').replace(' VND', '')
}
