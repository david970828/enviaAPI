import { text } from 'pdf-stream';
import path from 'path';
import faker from 'faker';
import { format, parseISO } from 'date-fns';
import { v4 } from 'uuid';

export const Uint8arrayToReadableStream = (data) => {
  const stream = text(data).pipe(writable);
  return stream;
};

export const documentPath = (fileName) =>
  path.join(__dirname, '..', 'docs', `${fileName}.pdf`);

export const imagePath = (fileName) =>
  path.join(__dirname, '..', 'img', `${fileName}.png`);

export const deconstructToTablePaquete = (data, remitente) => {
  const tableToFill = [];
  let total = 0;
  data.forEach((info) => {
    tableToFill.push([
      v4(),
      remitente,
      info.nombre_destinatario,
      info.direccion_destinatario,
      info.destino_guia,
      info.telefono_destinatario,
      info.peso_guia,
      info.valor_servicio,
    ]);
    total += info.valor_servicio;
  });
  tableToFill.push(['', '', '', '', '', '', 'Total', total.toString()]);
  return tableToFill;
};

export const randomName = () => {
  faker.locale = 'es_MX';
  return faker.name.findName();
};

export const toRedableDate = (date) => format(parseISO(date), 'dd/MM/yyyy');
export const redableNow = () => toRedableDate(new Date().toISOString());
