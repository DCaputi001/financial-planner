import crypto from 'crypto';
import base32 from 'thirty-two';

export function generateTOTP(base32Secret) {
  const secret = base32.decode(base32Secret);   // decode base32 to raw bytes

  const timeStep = 30;  // 30-second TOTP window
  const currentTime = Math.floor(Date.now() / 1000);
  const counter = Math.floor(currentTime / timeStep);

  const buffer = Buffer.alloc(8);
  buffer.writeUInt32BE(0, 0);
  buffer.writeUInt32BE(counter, 4);

  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(buffer);
  const digest = hmac.digest();

  const offset = digest[19] & 0xf;
  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const otp = binary % 1_000_000;
  return otp.toString().padStart(6, '0');
}