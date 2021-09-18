export class Solicitudes {

	constructor(object) {
		this.id_solicitud = object.id_solicitud;
		this.documento_remitente = object.documento_remitente;
		this.empresa_recoleccion = object.empresa_recoleccion;
		this.origen_solicitud = object.origen_solicitud;
		this.fecha_solicitud = object.fecha_solicitud;
		this.direccion_recoleccion = object.direccion_recoleccion;
		this.telefono_recoleccion = object.telefono_recoleccion;
		this.email_recoleccion = object.email_recoleccion;
	}

}