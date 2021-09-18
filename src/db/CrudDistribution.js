import { dbconfig } from './dbconfig';
import e from "express";
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
    return this.executeQuery(SCRIPT);
  }

  addGuias = async (guideList) => {
    const SCRIPT = `INSERT INTO GUIAS (
                    documento_destinatario
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
    return this.executeQuery(SCRIPT);
  }

  getRecords = (guideList) => {
    let values = [];
    guideList.forEach(item => {
      values.push(`(
      '${item.documento_destinatario}',
      '${item.nombre_destinatario}',
      '${item.direccion_destinatario}',
      '${item.telefono_destinatario}',
      '${item.peso_guia}',
      '${item.clasificacion_guia}',
      '${item.contenido_guia}',
      '${item.fecha_admision}',
      '${item.fecha_entrega}',
      '${item.destino_guia}',
      '${item.estado_guia}',
      ${item.valor_declarado},
      ${item.valor_servicio},
      '${item.documento_relacionado}',
      ${item.id_solicitud})`);
    });
    return values.toString();
  }

  executeQuery = async (script) => {
    let response;
    let pool = await sql.connect(dbconfig);
    const transaction = new sql.Transaction(pool);
    transaction.begin(err => {
      console.log(err);
      const request = new sql.Request(transaction)
      request.query(script, (err, result) => {
        console.log('err');
        console.log(err);
        console.log('result');
        response = result;
        transaction.commit(err => {
          console.log("Transaction committed.")
        });
      });
    });
    return response;
  }

}
