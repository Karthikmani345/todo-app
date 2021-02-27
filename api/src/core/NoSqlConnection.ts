import mongoose from "mongoose";
import bluebird from "bluebird";
mongoose.Promise = bluebird;

const connect = (connectionUri = "", configurations = {}) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(connectionUri, configurations)
      .then((connection) => {
        global.logger.info(
          `####### NoSqlDatabase Connected : ${connectionUri} #######`
        );
        resolve(connection);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const disConnect = () => {
  return mongoose.disconnect();
};

export default {
  connect,
  disConnect,
};
