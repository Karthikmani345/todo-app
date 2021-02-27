import path from "path";

// All configurations will extend these options
// ============================================

const configFactory: any = {
  fileStorageTempDirectory: path.resolve(path.join(__dirname, "../", "temp")),
  fileStorageDirectory: path.resolve(
    path.join(__dirname, "../", "file-storage")
  ),
  profileImagesStorageDirectory: path.resolve(
    path.join(__dirname, "../", "public", "images")
  ),
  filePath: "../public",
  apiName: "Todo-Api",
  env: process.env.NODE_ENV,
  // Server port
  port: process.env.PORT,

  // Server protocol
  protocol: process.env.PROTOCOL,

  // Server host
  host: process.env.HOST,

  // Server IP
  ip: process.env.IP,

  // Domain (e.g. https://localhost)
  domain: process.env.DOMAIN,

  // NoSql connection options
  noSqlConnectionConfig: {
    transactionOptions: {
      readConcern: {
        level: "snapshot",
      },
      writeConcern: {
        w: "majority",
      },
    },
    useMongoClient: true,
    connectionUri: `${process?.env?.NOSQL_DAEMON_PROTOCOL}://${process.env.NOSQL_DAEMON_IP}:${process.env.NOSQL_DAEMON_PORT}/${process.env.NOSQL_DB}`,
    options: {
      // https://mongoosejs.com/docs/deprecations.html
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: false,
      reconnectTries: 30,
      reconnectInterval: 500, // in ms
    },
  },
};

export default configFactory;
