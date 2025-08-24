import { describe, expect, it } from 'vitest';
import { formSchema } from '../validation/formSchema';

describe('formSchema', () => {
  it('валидирует правильные данные', async () => {
    const valid = {
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
      gender: 'female',
      acceptedTnC: true,
      country: 'USA',
      picture: 'data:image/png;base64,abc',
    };

    await expect(formSchema.validate(valid)).resolves.toBeTruthy();
  });

  it('вызывает ошибку при некорректном имени', async () => {
    const invalid = { ...{}, name: 'alice' };
    await expect(formSchema.validate(invalid)).rejects.toThrow();
  });
});
