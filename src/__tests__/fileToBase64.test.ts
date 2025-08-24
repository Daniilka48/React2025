import { fileToBase64 } from '../utils/fileToBase64';
import { expect, it } from 'vitest';

it('converts file to base64', async () => {
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  const base64 = await fileToBase64(file);

  expect(base64).toMatch(/^data:image\/png;base64,/);
});
