
export const sleep = async function (interval = 6) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval * 1000) // 6秒
  })
}

/**
 * Check if string is HEX, requires a 0x in front
 *
 * @method isHexStrict
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
export const isHexStrict = function (hex) {
  return ((typeof hex === 'string' || typeof hex === 'number') && /^(-)?0x[0-9a-f]*$/i.test(hex))
}

export const u8arryToHex = (buffer) => {
  return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')
}

export const hexTou8array = (hex) => {
  return Uint8Array.from(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
}

export const hexToString = (str) => {
  if (str.length % 2 !== 0) {
    console.log('Not a hex')
    return ''
  }
  let val = ''
  for (let i = 0; i < str.length; i += 2) {
    const n = parseInt(str[i] + str[i + 1], 16)
    val += String.fromCharCode(n)
  }
  return val
}

export const stringToHex = (str) => {
  let val = ''
  for (let i = 0; i < str.length; i++) {
    if (val === '') {
      val = str.charCodeAt(i).toString(16)
    } else {
      val += str.charCodeAt(i).toString(16)
    }
  }
  return val
}

export const formatAmount = function (value) {
  if (!value) return '0.00'
  let unit = ''
  let digit = 3
  const nm = Number(value)
  if (nm < 1) {
    digit = 4
  }
  if (nm > 1000) {
    digit = 2
  }
  if (Number.isInteger(nm)) {
    digit = 0
    if (nm > 1000) {
      digit = 2
    }
  }
  value = Number(value)
  if (value < 1e9 && value >= 1e6) {
    value = value / 1e6
    unit = 'M'
  } else if (value < 1e12) {
    value = value / 1e9
    unit = 'B'
  } else {
    value = value / 1e12
    unit = 'T'
  }
  const str = value.toFixed(digit).toString()
  let integer = str
  let fraction = ''
  if (str.includes('.')) {
    integer = str.split('.')[0]
    fraction = '.' + str.split('.')[1]
  }
  return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + fraction + unit
}

/**
 *
 * @param {*} value
 * @param {*} abb is abbreviations
 * @returns
 */
export const formatPrice = function (value, abb = false) {
  if (!value) return '$0.00'
  let unit = ''
  if (Number(value) > 1e6) {
    abb = true
  }
  let digit = 3
  if (Number(value) < 1) {
    digit = 4
  }
  if (Number(value) < 0.00001) {
    digit = 8
  }
  if (Number(value) < 0.000000001) {
    digit = 10
  }
  if (abb) {
    value = Number(value)
    if (value < 1e6 && value >= 1000) {
      value = value / 1000
      unit = 'K'
    } else if (value < 1e9) {
      value = value / 1e6
      unit = 'M'
    } else if (value < 1e12) {
      value = value / 1e9
      unit = 'B'
    }
  }
  const str = Number(value).toFixed(digit).toString()
  let integer = str
  let fraction = ''
  if (str.includes('.')) {
    integer = str.split('.')[0]
    fraction = '.' + str.split('.')[1]
  }
  return '$' + integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + fraction + unit
}

export function prefixInteger (num, length) {
  let i = (num + '').length
  while (i++ < length) num = '0' + num
  return num
}
