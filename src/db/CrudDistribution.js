import { dbconfig } from './dbconfig';
const sql = require('mssql');

export class CrudDistribution {
  constructor() {}
  getSolicitudes = async () => {
    try {
      const products = await sql.connect(dbconfig).then(async (pool) => {
        const products = await pool
          .request()
          .query('SELECT TOP 20 * from SOLICITUDES');
        return products.recordsets;
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  };

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
    return await this.executeQuery(SCRIPT);
  };

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
  };

  getRecords = (guideList) => {
    let values = [];
    guideList.forEach((item) => {
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
      '${item.documento_relacionado}',
      ${item.id_solicitud})`);
    });
    return values.toString();
  };

  executeQuery = async (script) => {
    const result = await sql.connect(dbconfig).then(async (pool) => {
      const queryResult = await pool.request().query(script);
      return queryResult.recordsets;
    });
    return result;
  };

  executeMultiQuery = async (script) => {
    const result = await sql.connect(dbconfig).then(async (pool) => {
      let queryResult = await pool.request().query(script);
      return queryResult.recordset;
    });
    return result;
  };

  executeSingleQuery = async (script) => {
    const result = await sql.connect(dbconfig).then(async (pool) => {
      let queryResult = await pool.request().query(script);
      return queryResult.recordset[0];
    });
    return result;
  };

  getAllGuides = async (idSolicitud) => {
    const QUERY = `SELECT * from GUIAS WHERE ID_SOLICITUD = ${idSolicitud}`;
    try {
      const result = await sql.connect(dbconfig).then(async (pool) => {
        const products = await pool.request().query(QUERY);
        return products.recordsets;
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  addPlanillas = async (planillaInfo) => {
    const SCRIPT = `INSERT INTO PLANILLAS (
                    nombre_planilla,
                    tipo_planilla,
                    documento_relacionado,
                    id_solicitud) 
                    OUTPUT Inserted.id_planilla VALUES 
                    ('${planillaInfo.nombre_planilla}',
                     '${planillaInfo.tipo_planilla}',
                     '${planillaInfo.documento_relacionado}',
                     ${planillaInfo.id_solicitud}
                     )`;
    return await this.executeQuery(SCRIPT);
  };

  addHistorico = async (guia) => {
    const SCRIPT = `INSERT INTO HISTORICO_ESTADO (
                      id_guia, fecha_hora_actualizacion,
                      estado_inicial, estado_actualizado) 
                    OUTPUT Inserted.id_historico VALUES
                    (${guia.id_guia}, '${guia.fecha_hora_actualizacion}',
                      '${guia.estado_inicial}', '${guia.estado_actualizado}')`;
    return await this.executeQuery(SCRIPT);
  };
}
