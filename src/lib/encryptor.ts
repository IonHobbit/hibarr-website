/**
 * JSON Encryption/Decryption Utilities
 * 
 * These functions provide a way to shorten and encrypt JSON objects using a secret key,
 * and then decrypt them back to their original form.
 */

import * as crypto from 'crypto';

export const TOKEN_SECRET = process.env.TOKEN_SECRET || '550e8400-e29b-41d4-a716-446655440000';

/**
 * Shortens and encrypts a JSON object using the provided key
 * 
 * @param jsonObject - The JSON object to encrypt
 * @param secretKey - The secret key used for encryption
 * @returns - An encrypted string representation of the JSON object
 */
export function shortenAndEncryptJSON<T>(jsonObject: T, secretKey: string): string | null {
  try {
    // Convert the JSON object to a string
    const jsonString = JSON.stringify(jsonObject);

    // Create an initialization vector
    const iv = crypto.randomBytes(16);

    // Create a cipher using AES-256-CBC algorithm
    const key = crypto.createHash('sha256').update(secretKey).digest();
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the JSON string
    let encrypted = cipher.update(jsonString, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // Combine the IV and encrypted data into a single string
    const result = iv.toString('hex') + ':' + encrypted;

    return result;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
}

/**
 * Decrypts an encrypted JSON string back to its original object form
 * 
 * @param encryptedData - The encrypted string to decrypt
 * @param secretKey - The secret key used for decryption (must be the same as used for encryption)
 * @returns - The original JSON object
 */
export function decryptJSON<T>(encryptedData: string, secretKey: string): T | null {
  try {
    // Split the encrypted data to get the IV and the actual encrypted content
    const [ivHex, encryptedContent] = encryptedData.split(':');

    if (!ivHex || !encryptedContent) {
      throw new Error('Invalid encrypted data format');
    }

    // Convert the IV from hex back to buffer
    const iv = Buffer.from(ivHex, 'hex');

    // Create the decipher
    const key = crypto.createHash('sha256').update(secretKey).digest();
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // Decrypt the content
    let decrypted = decipher.update(encryptedContent, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    // Parse the decrypted string back to a JSON object
    return JSON.parse(decrypted) as T;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
}