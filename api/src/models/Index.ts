import { bucketModel } from "./BucketModel";
import { todoModel } from "./TodoModel";
import { userModel } from "./UserModel";

const initializeCollection = () => {
  global.logger.info("####### Creating Collection#########");
  bucketModel.createCollection();
  todoModel.createCollection();
  userModel.createCollection();
};

export default initializeCollection;
