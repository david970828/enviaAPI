export const obtenerLocalONacional = (result, ruta, origen_solicitud) => {
  const guias = [];
  result.forEach((guia) => {
    if (ruta === 'local') {
      if (guia.destino_guia === origen_solicitud) {
        guias.push(guia);
      }
    } else {
      if (guia.destino_guia !== origen_solicitud) {
        guias.push(guia);
      }
    }
  });
  return guias;
};

export const construirGuiaHistorico = async (guia, estado_guia) => ({
  id_guia: guia.id_guia,
  fecha_hora_actualizacion: new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' '),
  estado_inicial: guia.estado_guia,
  estado_actualizado: estado_guia,
});

export const updateStateGuia = async (
  guia,
  estado_guia,
  crudDistribution,
  res
) => {
  const newGuia = await construirGuiaHistorico(guia, estado_guia);
  await crudDistribution
    .executeQuery(
      `UPDATE GUIAS SET estado_guia = '${estado_guia}' WHERE id_guia=${guia.id_guia};`
    )
    .then(() => {
      crudDistribution
        .addHistorico(newGuia)
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

export const updateStateGuias = async (
  guias,
  estado_guia,
  crudDistribution,
  res
) => {
  guias.forEach(async (guia) => {
    await updateStateGuia(guia, estado_guia, crudDistribution, res);
  });
};

export const guiaById = async (id_guia, crudDistribution) =>
  await crudDistribution.executeSingleQuery(
    `SELECT * FROM GUIAS WHERE id_guia = ${id_guia}`
  );

export const guiasByIdSolicitud = async (id_solicitud, crudDistribution) =>
  await crudDistribution.executeMultiQuery(
    `SELECT * FROM GUIAS WHERE id_solicitud=${id_solicitud}`
  );

export const solicitudesById = async (id_solicitud, crudDistribution) =>
  await crudDistribution.executeSingleQuery(
    `SELECT * FROM SOLICITUDES WHERE id_solicitud = ${id_solicitud}`
  );
