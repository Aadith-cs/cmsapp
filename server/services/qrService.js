const QRCode = require('qrcode');

const generateQR = async (text) => {
    try {
        const url = await QRCode.toDataURL(text);
        return url;
    } catch (err) {
        console.error(err);
        throw new Error('QR Code generation failed');
    }
};

module.exports = { generateQR };
