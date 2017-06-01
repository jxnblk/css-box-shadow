const VALUES_REG = /,(?![^\(]*\))/
const PARTS_REG = /\s(?![^(]*\))/

const parseValue = str => {
  const parts = str.split(PARTS_REG)
  const inset = parts.includes('inset')
  const color = parts.slice(-1)[0]

  const nums = parts
    .filter(n => n !== 'inset')
    .filter(n => n !== color)
    .map(toNum)
  const [ offsetX, offsetY, blurRadius, spreadRadius ] = nums

  return {
    inset,
    offsetX,
    offsetY,
    blurRadius,
    spreadRadius,
    color
  }
}

const stringifyValue = obj => {
  const {
    inset,
    offsetX,
    offsetY,
    blurRadius,
    spreadRadius,
    color
  } = obj || {}

  return [
    (inset ? 'inset' : null),
    offsetX,
    offsetY,
    blurRadius,
    spreadRadius,
    color
  ].filter(v => v !== null && v !== undefined)
    .map(toPx)
    .map(s => ('' + s).trim())
    .join(' ')
}

const toNum = v => {
  if (!/px$/.test(v) && v !== '0') return v
  const n = parseFloat(v)
  return !isNaN(n) ? n : v
}
const toPx = n => typeof n === 'number' && n !== 0 ? (n + 'px') : n

const parse = str => str.split(VALUES_REG).map(s => s.trim()).map(parseValue)
const stringify = arr => arr.map(stringifyValue).join(', ')

module.exports = {
  parse,
  stringify
}
