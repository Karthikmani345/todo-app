import { Application } from "express";
import http, { Server as httpServer } from "http";

import config from "./config";
import app from "./App";
import noSqlConnection from "./core/NoSqlConnection";
import Logger from "./core/utility/Logger";
import initializeCollection from "./models/Index";

global.logger = Logger;

const PORT: number = process.env.PORT || config.port; // get the server port number from the config File
const HOST: number = process.env.HOST || config.host; // get the server host number from the config File

const application: Application = new app().init();
const server: httpServer = http.createServer(application);

const listen = (): void => {
  server.listen(PORT, () => {
    global.logger.warn(
      `${config.apiName} is running in IP: ${HOST}  PORT : ${PORT}`
    );
    global.logger.info(`Worker ${process.pid} started`);
  });
};

const stopServer = (): void => {
  noSqlConnection.disConnect().then(() => {
    server.close(() => {
      global.logger.warn(
        `${config.apiName}is Stopped in IP: ${HOST}  PORT : ${PORT}`
      );
    });
  });
};

const startServer = (): void => {
  // *** If Db connection SuccessFul then Start the Server Else Shutdown

  global.logger.warn(config.noSqlConnectionConfig.options);
  noSqlConnection
    .connect(
      config.noSqlConnectionConfig.connectionUri,
      config.noSqlConnectionConfig.options
    )
    .then(async () => {
      initializeCollection();
      listen();
    })
    .catch((err: Error) => {
      global.logger.error(err.message);
    });
};

export { startServer, stopServer };
