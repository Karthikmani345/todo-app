import * as React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import TodoAdd from "../components/TodoAdd";
import TodoList from "../components/TodoList";
import { ITodo, ITodoViewModel } from "../interface/ITodo";
import {
  deleteTodoAsync,
  getTodoListAsync,
  submitTodoAsync,
} from "../store/Action";
import { RootAction, RootState } from "../store/Store";

interface ITodoProps {
  model: ITodoViewModel;
}

const Todo: React.FunctionComponent<ITodoProps> = ({ model }) => {
  const [todo, setTodo] = useState({} as ITodo);
  const dispatch = useDispatch<RootAction | any>();

  const onEditHandler = useCallback((item: ITodo) => {
    console.log("[Bucket.tsx] [oneditHandler]", item);
    setTodo(item);
  }, []);

  const onSubmitHandler = useCallback((item: ITodo) => {
    const postModel = { ...item, ...model };
    console.log("[Bucket.tsx] [onSubmitHandler]", postModel);
    dispatch(submitTodoAsync(postModel));
  }, []);

  const onDeleteHandler = useCallback((item: ITodo) => {
    console.log("[Bucket.tsx] [onDeleteHandler]", item);
    dispatch(deleteTodoAsync(item._id!));
  }, []);

  const toggleAccomplishedHandler = useCallback((item: ITodo) => {
    const postModel = { ...item, isAccomplished: !item.isAccomplished };
    console.log("[Bucket.tsx] [toggleAccomplishedHandler]", postModel);
    dispatch(submitTodoAsync(postModel));
  }, []);

  return (
    <>
      <div className="col-lg-4 col-mrg">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ textAlign: "center" }}>
              {model.bucketName}
            </h5>
            <div className="card">
              <div className="card-header">
                <TodoAdd onSubmit={onSubmitHandler} todo={todo} />
              </div>
              <TodoList
                item={model.TodoList}
                onDelete={onDeleteHandler}
                onEdit={onEditHandler}
                toggleAccomplished={toggleAccomplishedHandler}
              ></TodoList>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Todo);
