export class Guias {

	constructor(object) {
		this.id_guia = object.id_guia;
		this.nombre_destinatario = object.nombre_destinatario;
		this.direccion_destinatario = object.direccion_destinatario;
		this.telefono_destinatario = object.telefono_destinatario;
		this.peso_paquete = object.peso_paquete;
		this.clasificacion = object.clasificacion;
		this.contenido = object.contenido;
		this.ciudad_destino = object.ciudad_destino;
		this.estado_guia = object.estado_guia;
		this.documento_relacionado = object.documento_relacionado;
		this.id_solicitud = object.id_solicitud;
	}

}