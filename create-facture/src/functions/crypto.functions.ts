import * as crypto from 'crypto'
const algorithm = 'aes-256-cbc';
const key = "5wMc0PYNg8tCQeBnofV8de81mFUElwgH";
const iv = "px32HLHqURlqLIPw";

export function encrypt(text: any) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), Buffer.from(iv));
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

export function decrypt(text: any) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}