class Guias {

	constructor(nombre_destinatario, direccion_destinatario, telefono_destinatario, peso_paquete, clasificacion,
		contenido, ciudad_destino, estado_guia, documento_relacionado, id_solicitud) {
		this.nombre_destinatario = nombre_destinatario;
		this.direccion_destinatario = direccion_destinatario;
		this.telefono_destinatario = telefono_destinatario;
		this.peso_paquete = peso_paquete;
		this.clasificacion = clasificacion;
		this.contenido = contenido;
		this.ciudad_destino = ciudad_destino;
		this.estado_guia = estado_guia;
		this.documento_relacionado = documento_relacionado;
		this.id_solicitud = id_solicitud;
	}

}

module.exports = Guias;