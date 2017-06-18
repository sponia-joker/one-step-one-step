import default_product_app from '../assets/img-default-product-app@2x.png'
import default_product_hardware from '../assets/img-default-product-hardware@2x.png'
import default_product_html5 from '../assets/img-default-product-html5@2x.png'
import default_product_software from '../assets/img-default-product-software@2x.png'
import default_product_web from '../assets/img-default-product-web@2x.png'
import default_product_wechat from '../assets/img-default-product-wechat@2x.png'
import default_product_other from '../assets/img-default-product-other@2x.png'

export const getImgMetaWithUrl = (url) => (new Promise(
    (resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload = () => resolve({
        width: img.width,
        height: img.height
      })
      img.onerror = () => reject({})
    }
))
export const getProductDefaultImage = (productType) => {
  switch (productType) {
    case '网址':
      return default_product_web
    case 'app':
      return default_product_app
    case '电子硬件':
      return default_product_hardware
    case '软件':
      return default_product_software
    case 'html5':
      return default_product_html5
    case '微信公众号':
      return default_product_wechat
    default:
      return default_product_other
  }
}
export const transformAmount = (amount) => {
  if (!isInteger(`${amount}`)) {
    return amount
  }
  const intAmount = parseInt(amount)
  if (intAmount < 10000) return intAmount
  else if (intAmount >= 10000 && intAmount < 100000000) {
    return `${intAmount % 10000 === 0 ? intAmount / 10000 : Math.floor((intAmount / 10000) * 10) / 10}万`
  } else if (intAmount >= 100000000) {
    return `${intAmount % 100000000 === 0 ? intAmount / 100000000 : Math.floor((intAmount / 100000000) * 10) / 10}亿`
  }
}
const isInteger = (s) => {
  if (s != null) {
    let r = null
    let re = null
    re = /\d*/i // \d表示数字,*表示匹配多个数字
    r = s.match(re)
    return (r == s) /* eslint eqeqeq: "off" */
  }
  return false
}
export const removeMunicipality = (city) => {
  const cities = ['上海市', '北京市', '重庆市', '天津市']
  if (cities.includes(city)) {
    return ''
  }
  return city
}

export const singleLineString = (strings, ...values) => {
  // Interweave the strings with the
  // substitution vars first.
  let output = ''
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i]
  }
  output += strings[values.length]

  // Split on newlines.
  let lines = output.split(/(?:\r\n|\n|\r)/)

  // Rip out the leading whitespace.
  return lines.map((line) => {
    return line.replace(/^\s+/gm, '')
  }).join('').trim()
}
