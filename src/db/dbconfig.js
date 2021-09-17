export const dbconfig = {
  user:  'admin', // sql user
  password:  'enviadb2021', //sql user password
  server:  'envia.cucvitskt8ty.us-east-2.rds.amazonaws.com', // if it does not work try- localhost
  database:  'envia',
  options: {
    trustedconnection:  true,
    enableArithAbort:  true,
    instancename:  'SQLEXPRESS'  // SQL Server instance name
  },
  port:  1433
};