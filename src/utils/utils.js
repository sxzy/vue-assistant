export default {
  hexToRgba (hex, opacity = 0.3) {
    let color = []
    let rgb = []
    hex = hex.replace(/#/, '')

    if (hex.length === 3) { // 处理 "#abc" 成 "#aabbcc"
      var tmp = []
      for (let i = 0; i < 3; i++) {
        tmp.push(hex.charAt(i) + hex.charAt(i))
      }
      hex = tmp.join('')
    }

    for (var i = 0; i < 3; i++) {
      color[i] = '0x' + hex.substr(i * 2, 2)
      rgb.push(parseInt(Number(color[i])))
    }
    return 'rgba(' + rgb.join(',') + `,${opacity})`
  }
}
