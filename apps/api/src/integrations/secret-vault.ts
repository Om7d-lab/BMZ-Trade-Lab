import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
/** AES-256-GCM envelope for provider tokens. Keep the 32-byte key in a real secret manager. */
export class SecretVault {
  constructor(private key = Buffer.from(process.env.CONNECTOR_ENCRYPTION_KEY ?? '', 'base64')) { if (key.length !== 32) throw new Error('CONNECTOR_ENCRYPTION_KEY must be a base64-encoded 32-byte key'); }
  encrypt(value: string) { const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', this.key, iv); const ciphertext = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]); return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString('base64'); }
  decrypt(payload: string) { const bytes = Buffer.from(payload, 'base64'); const decipher = createDecipheriv('aes-256-gcm', this.key, bytes.subarray(0, 12)); decipher.setAuthTag(bytes.subarray(12, 28)); return Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString('utf8'); }
}

