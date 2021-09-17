class Solicitudes {

	constructor(id_solicitud, empresa_recoleccion, fecha_solicitud, direccion_recoleccion, telefono_recoleccion
		email_recoleccion) {
		this.id_solicitud = id_solicitud;
		this.empresa_recoleccion = empresa_recoleccion;
		this.fecha_solicitud = fecha_solicitud;
		this.direccion_recoleccion = direccion_recoleccion;
		this.telefono_recoleccion = telefono_recoleccion;
		this.email_recoleccion = email_recoleccion;
	}

}

exports.module = Planillas;