import dbconfig from './dbconfig'; 

export class CrudDistribution {

	getOrders = async () => {
	  try {
	  	console.log('init sql connect');
	    let  pool = await  sql.connect(dbconfig);
	    let  products = await  pool.request().query('SELECT * from GUIAS');
	    console.log(products);
	    return  products.recordsets;
	  }
	  catch (error) {
	    console.log(error);
	  }
	}
}