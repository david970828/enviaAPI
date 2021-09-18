export class Guias {

	constructor(object) {
		this.id_guia = object.id_guia;
		this.documento_destinatario = object.documento_destinatario;
		this.nombre_destinatario = object.nombre_destinatario;
		this.direccion_destinatario = object.direccion_destinatario;
		this.telefono_destinatario = object.telefono_destinatario;
		this.peso_guia = object.peso_guia;
		this.clasificacion_guia = object.clasificacion_guia;
		this.contenido_guia = object.contenido_guia;
		this.fecha_admision = object.fecha_admision;
		this.fecha_entrega = object.fecha_entrega;
		this.destino_guia = object.destino_guia;
		this.estado_guia = object.estado_guia;
		this.valor_declarado = object.valor_declarado;
		this.valor_servicio = object.valor_servicio;
		this.documento_relacionado = object.documento_relacionado;
		this.id_solicitud = object.id_solicitud;
	}

}