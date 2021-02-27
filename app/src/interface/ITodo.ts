export interface ITodo {
  _id?: string;
  name: string;
  bucketId: string;
  bucketName: string;
  isAccomplished: boolean;
}

export interface ITodoViewModel {
  bucketId: string;
  bucketName: string;
  TodoList: ITodo[];
}
