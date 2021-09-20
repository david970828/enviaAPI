import { text } from 'pdf-stream';
import path from 'path';

export const Uint8arrayToReadableStream = (data) => {
  const stream = text(data).pipe(writable);
  return stream;
};

export const documentPath = (fileName) =>
  path.join(__dirname, '..', 'docs', `${fileName}.pdf`);
