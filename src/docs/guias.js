import { FillPdf } from './fillPdf';

export class Guias extends FillPdf {
  constructor(source) {
    super(source);
  }
  fill = async (data) => {
    await this.initializeFill();
    await this.setField('id_guia', data.id_guia);
    await this.setField('fecha_admision', data.fecha_admision);
    await this.setField('guia_origen', data.guia_origen);
    await this.setField('guia_destino', data.guia_destino);
    await this.setField('guia_remitente', data.guia_remitente);
    await this.setField('direccion_remitente', data.direccion_remitente);
    await this.setField('telefono_remitente', data.telefono_remitente);
    await this.setField('documento_remitente', data.documento_remitente);
    await this.setField('guia_destinatario', data.guia_destinatario);
    await this.setField('telefono_destinatario', data.telefono_destinatario);
    await this.setField('documento_destinatario', data.documento_destinatario);
    await this.setField('contenido_guia', data.contenido_guia);
    await this.setField('peso_guia', data.peso_guia);
    await this.setField('clasificacion_guia', data.clasificacion_guia);
    await this.setField('observaciones_entrega', data.observaciones_entrega);
    await this.setField('fecha_entrega', data.fecha_entrega);
    await this.setField('valor_declarado', data.valor_declarado);
    await this.setField('valor_servicio', data.valor_servicio);
    await this.setField('total_flete', data.total_flete);
    await this.saveDocument();
  };
}
