import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY; 

export const encryptData = (data) => {
  const iv = CryptoJS.lib.WordArray.random(16); 
  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return iv.toString(CryptoJS.enc.Base64) + ':' + encrypted.toString();
};

export const decryptData = (encryptedData) => {
  try {
    const parts = encryptedData.split(':');
    const iv = CryptoJS.enc.Base64.parse(parts[0]);
    const encrypted = parts[1];

    const decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('복호화 실패:', error);
    return null;
  }
};