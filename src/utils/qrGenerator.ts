import QRCode from 'qrcode'

export async function createQR(url: string, canvas: HTMLCanvasElement) {
  await QRCode.toCanvas(canvas, url, { width: 256 })
}
