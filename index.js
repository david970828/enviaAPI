
/************************************************************************************
 *                           API GET TOP SECRET SPLIT                               *
 *    Permite obtener la posicion y mensaje de la nave a partir de minimo 3         *
 *    satelites almacenados en el sessionStorage, de no tener la cantidad de        *
 *    satelites, generara un codigo HTTP 404 - no hay informacion suficiente        *
 ************************************************************************************/
app.get('/distribution',function(request, response) {
  response.status(200).send({
      message:'GET MESSAGE'
    });
});
