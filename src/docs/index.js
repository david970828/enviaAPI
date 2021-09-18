import { Guias } from './guias';
import path from 'path';

export const crearGuia = (data) => {
  try {
    const guias = new Guias(path.join(__dirname, 'guia.pdf'));
    guias.fill(data);
  } catch (e) {
    console.log(e);
  }
};

export const prueba = () =>
  crearGuia({
    id_guia: 1,
    fecha_admision: '17/09/2021',
    guia_origen: 'Bogotá',
    guia_destino: 'Bogotá',
    guia_remitente: 'Mercado libre',
    direccion_remitente: 'Cra 20 #4a-92',
    telefono_remitente: '3212223333',
    documento_remitente: '123',
    guia_destinatario: 'David Pardo',
    telefono_destinatario: '3123334445',
    documento_destinatario: '12',
    contenido_guia: 'Zapatos deportivos',
    peso_guia: '2kg',
    clasificacion_guia: 'paquete',
    observaciones_entrega: 'Sin observaciones',
    fecha_entrega: '19/09/2021',
    valor_declarado: 200000,
    valor_servicio: 2000,
    total_flete: 12000,
  });
