import QRCode from 'qrcode'

export async function createQR(url, canvas) {
  await QRCode.toCanvas(canvas, url, { width: 256 })
}
