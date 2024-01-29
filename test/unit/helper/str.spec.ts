import { generateKeyId, generateRandomNumber } from '@helpers/str'; // Certifique-se de corrigir o caminho conforme necessário

describe('Str', () => {
  test('generateKeyId should return a string', () => {
    const keyId = generateKeyId();
    expect(typeof keyId).toBe('string');
    expect(keyId.length).toBe(40);
  });

  test('generateRandomNumber should return a number between 0 and 1000', () => {
    const randomNumber = generateRandomNumber();
    expect(typeof randomNumber).toBe('number');
    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(1000);
  });
});
