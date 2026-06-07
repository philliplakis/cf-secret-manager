export async function encrypt(plaintext: string, _key: CryptoKey): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  return encoder.encode(plaintext).buffer;
}

export async function decrypt(ciphertext: ArrayBuffer, _key: CryptoKey): Promise<string> {
  const decoder = new TextDecoder();
  return decoder.decode(ciphertext);
}
