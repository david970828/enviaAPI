import { dbconfig } from './dbconfig';
const  sql = require('mssql');

export class CrudDistribution {

  getSolicitudes = async () => {
    try {
      let  pool = await  sql.connect(dbconfig);
      let  products = await  pool.request().query('SELECT TOP 20 * from SOLICITUDES');
      sql.close();
      return  products.recordsets;
    } catch (error) {
      console.log(error);
    }
  }

  newSolicitud = async (distribution) => {
    const SCRIPT = `INSERT INTO SOLICITUDES (
                    documento_remitente, 
                    empresa_recoleccion, 
                    origen_solicitud, 
                    fecha_solicitud, 
                    direccion_recoleccion, 
                    telefono_recoleccion, 
                    email_recoleccion) OUTPUT Inserted.id_solicitud VALUES (
                    '${distribution.documento_remitente}', 
                    '${distribution.empresa_recoleccion}', 
                    '${distribution.origen_solicitud}', 
                    '${distribution.fecha_solicitud}', 
                    '${distribution.direccion_recoleccion}',
                    '${distribution.telefono_recoleccion}', 
                    '${distribution.email_recoleccion}')`;
    return await  this.executeQuery(SCRIPT);
  }

  addGuias = async (guideList) => {
    const SCRIPT = `INSERT INTO GUIAS (
                    documento_destinatario,
                    nombre_destinatario,
                    direccion_destinatario,
                    telefono_destinatario,
                    peso_guia,
                    clasificacion_guia,
                    contenido_guia,
                    fecha_admision,
                    fecha_entrega,
                    destino_guia,
                    estado_guia,
                    valor_declarado,
                    valor_servicio,
                    documento_relacionado,
                    id_solicitud) VALUES ${this.getRecords(guideList)}`;
    return await this.executeQuery(SCRIPT);
  }

  getRecords = (guideList) => {
    let values = [];
    guideList.forEach(item => {
      values.push(`(
      '${item.documento_destinatario}',
      '${item.guia_destinatario}',
      '${item.direccion_destinatario}',
      '${item.telefono_destinatario}',
      '${item.peso_guia}',
      '${item.clasificacion_guia}',
      '${item.contenido_guia}',
      '${item.fecha_admision}',
      '${item.fecha_entrega}',
      '${item.guia_destino}',
      '${item.estado_guia}',
      ${item.valor_declarado},
      ${item.valor_servicio},
      'envia/guias/${item.documento_relacionado}.pdf',
      ${item.id_solicitud})`);
    });
    return values.toString();
  }

  executeQuery = async (script) => {
    let  pool = await  sql.connect(dbconfig);
    let  idSolicitud = await  pool.request().query(script);
    return idSolicitud.recordsets;
  }

}

