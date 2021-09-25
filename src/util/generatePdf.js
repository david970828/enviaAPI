import {
  deconstructToTablePaquete,
  imagePath,
  randomName,
  redableNow,
} from '../util';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HEADERS_PLANILLA } from '../util/constants';
import fs from 'fs';

export const generatePDF = async (body) => {
  const doc = new jsPDF({ orientation: 'landscape' });
  const logo = fs.readFileSync(imagePath('logo'));
  doc.addImage(logo, 'PNG', 10, 10, 30, 20);
  doc.text(body.titulo_planilla, 120, 20);
  doc.setFontSize(9);
  doc.text(`Fecha y Hora: ${redableNow()}`, 250, 20);
  doc.text('Modulo: Operaciones', 10, 35);
  doc.text(`Programa: ${'Bonitasoft - Alfresco'}`, 10, 40);
  doc.text(`Usuario: ${randomName()}`, 10, 45);
  doc.text(`Planilla: ${body.id_solicitud}`, 120, 35);
  doc.text(`Nombre ruta: ${body.nombre_planilla}`, 120, 40);
  doc.text(`Conductor: ${randomName()}`, 120, 45);
  doc.text(`Operador 1: ${randomName()}`, 120, 50);
  doc.text(`Operador 2: ${randomName()}`, 120, 55);
  doc.text(`Fecha planilla: ${redableNow()}`, 250, 35);
  doc.text(`Página: ${'1'}`, 250, 40);
  doc.text(`Tipo: ${body.tipo_planilla}`, 250, 45);
  const paquetes = deconstructToTablePaquete(
    [...body.paquetes],
    body.empresa_recoleccion
  );
  await doc.autoTable({
    head: [[...HEADERS_PLANILLA]],
    body: [...paquetes],
    theme: 'plain',
    startY: 65,
  });
  return doc;
};
