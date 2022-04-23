import mysql from 'mysql2';

async function createDBPoolPromise(params, nbAttempts) {
  console.log(`Initializing a connection pool for DB ${params.database} (attempt ${nbAttempts})...`);
  const pool = mysql.createPool(params).promise();
  await pool.getConnection();
  return pool;
}

async function serverdbPoolPromise(nbAttempts = 1) {
  const time = Date.now();
  try {
    const params = {
      host: process.env.DB_HOST, // use the name of the docker container
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    };
    const poolPromise = await createDBPoolPromise(params, nbAttempts);
    console.log(`Connection pool for DB ${params.database} initialized.`);
    return poolPromise;
  } catch (err) {
    console.log('Connection to DB failed', err, '-> retrying in 20 seconds...');
    // wait 20 sec before retrying
    while (Date.now() - time < 20000) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return serverdbPoolPromise(nbAttempts + 1);
  }
}

export default serverdbPoolPromise;