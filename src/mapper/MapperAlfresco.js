export class MapperAlfresco {
  constructor() {}

  mapSolicitudesToGuiasAlfresco = (solicitud) => {
    let guiasAlfresco = [];
    solicitud.paquetes.forEach((guia) => {
      let obj = {
        id_guia: '',
        fecha_admision: guia.fecha_admision,
        guia_origen: solicitud.origen_solicitud,
        guia_destino: guia.destino_guia,
        guia_remitente: solicitud.empresa_recoleccion,
        direccion_remitente: solicitud.direccion_recoleccion,
        telefono_remitente: solicitud.telefono_recoleccion,
        documento_remitente: solicitud.documento_remitente,
        guia_destinatario: guia.nombre_destinatario,
        telefono_destinatario: guia.telefono_destinatario,
        documento_destinatario: guia.documento_destinatario,
        contenido_guia: guia.contenido_guia,
        peso_guia: guia.peso_guia,
        clasificacion_guia: guia.clasificacion_guia,
        observaciones_entrega: '',
        fecha_entrega: guia.fecha_entrega,
        valor_declarado: guia.valor_declarado,
        valor_servicio: guia.valor_servicio,
        total_flete: guia.valor_declarado + guia.valor_servicio,
        estado_guia: guia.estado_guia,
        direccion_destinatario: guia.direccion_destinatario,
        documento_relacionado: '',
      };
      guiasAlfresco.push(obj);
    });
    return guiasAlfresco;
  };
}
