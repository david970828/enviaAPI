export const DATA_TYPE_PDF = 'data:application/pdf;base64,';
export const ESTADOS_GUIA = {
  GENERADA: 'GENERADA', //guia generada por el cliente
  RECOGIDA: 'RECOGIDA', //recogida al cliente
  DESPACHADA: 'DESPACHADA', //ruta nacional
  BODEGA: 'BODEGA', //en bodega donde se descarga y enruta
  REPARTO: 'REPARTO',
  ENTREGADA: 'ENTREGADA',
  NOVEDAD: 'NOVEDAD', //Anteriormente Sigma
  NOVEDAD_CLASIFICACION: 'NOVEDAD_CLASIFICACION',
};
export const HEADERS_PLANILLA = [
  'Guía',
  'Remitente',
  'Destinatario',
  'Dirección',
  'Ciudad',
  'Teléfono',
  'Peso',
  'Valor Flete',
];
