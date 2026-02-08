import 'dotenv/config';
import cluster, { worker } from 'cluster';
import os from 'os';

import createServer from './app';

const port = process.env.PORT;

const startServer = async () => {
  if(cluster.isPrimary) {
    const cpus = os.cpus().length;
    console.log(`MASTER - ${process.pid}`);
    console.log(`Starting ${cpus} workers...`);

    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.error(
        `WORKER ${worker.process.pid} died (code: ${code}, signal: ${signal}). Restarting...`
      );
      cluster.fork();
    })
  } else {
    const app = await createServer();

    app.listen(port, () => {
      console.log(`WORKER ${process.pid} started and listening on port ${port}`);
      console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);
      console.log(`LOCALHOST: http://localhost:${port}`);
    });
  }
}

startServer();