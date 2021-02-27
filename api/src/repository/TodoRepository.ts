import { RepositoryBase } from "../core/RepositoryBase";
import { ITodo } from "../interface/ITodo";
import { ITodoDocument, todoModel } from "../models/TodoModel";

export interface ITodoRepository extends RepositoryBase<ITodoDocument> {
  findById(id: string): Promise<ITodoDocument>;
  find(): Promise<ITodoDocument[]>;
  save(model: ITodo): Promise<ITodoDocument>;
  update(id: string, model: ITodo): Promise<ITodoDocument>;
  delete(id: string): Promise<ITodoDocument>;
}

export class TodoRepository
  extends RepositoryBase<ITodoDocument>
  implements ITodoRepository {
  constructor() {
    super(todoModel);
  }

  async findById(id: string): Promise<ITodoDocument> {
    return this._model.findById(id);
  }

  async find(): Promise<ITodoDocument[]> {
    return this._model.find();
  }

  async save(model: ITodo): Promise<ITodoDocument> {
    return this._model.create(model);
  }

  async update(id: string, model: ITodo): Promise<ITodoDocument> {
    return this._model.findByIdAndUpdate(id, model);
  }

  async delete(id: string): Promise<ITodoDocument> {
    return this._model.findByIdAndRemove(id);
  }
}
