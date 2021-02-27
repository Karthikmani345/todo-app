import { ITodo } from "../interface/ITodo";
import { TodoRepository } from "../repository/TodoRepository";

export interface ITodoService {
  get(id: string): Promise<unknown>;
  getAll(): Promise<any[]>;
  create(model: ITodo): Promise<unknown>;
  delete(id: string): Promise<unknown>;
  update(id: string, model: ITodo): Promise<unknown>;
}

export class TodoService implements ITodoService {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  get(id: string): Promise<unknown> {
    return this.repository.findById(id);
  }

  getAll = async (): Promise<any[]> => {
    return this.repository.find();
  };

  delete(id: string): Promise<unknown> {
    return this.repository.delete(id);
  }

  create(model: ITodo): Promise<unknown> {
    return this.repository.save(model);
  }

  update(id: string, model: ITodo): Promise<unknown> {
    return this.repository.update(id, model);
  }
}
