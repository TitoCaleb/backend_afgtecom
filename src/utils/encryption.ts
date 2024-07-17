import crypto from 'crypto';

// TODO: Implementar la función de decifrado
// TODO: QUITAR EL ENCRYPTION_KEY DE AQUÍ Y PONERLO EN EL .ENV
const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || 's3cr3tK3y@Ex4mple!1234567890abcd';

function EncryptData(string: any, iv?: any) {
  try {
    const cipherAlgorithm = 'aes-256-cbc';
    const key = Buffer.from(ENCRYPTION_KEY, 'utf8');

    let ivBuffer: string | Buffer;
    if (iv === null) {
      ivBuffer = crypto.randomBytes(16);
    } else {
      ivBuffer = Buffer.from(iv, 'utf8').subarray(0, 16);
    }

    const cipher = crypto.createCipheriv(cipherAlgorithm, key, ivBuffer);
    let encryptedData = cipher.update(string, 'utf8', 'base64');
    encryptedData += cipher.final('base64');

    const encryptedString = encryptedData
      .replace(/\//g, '@')
      .replace(/=/g, '$');

    return encryptedString;
  } catch (ex: any) {
    return ex.message + ' - ' + (ex.cause ? ex.cause.message : '');
  }
}

export { EncryptData };
