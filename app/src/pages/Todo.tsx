import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoContainer from "../container/Todo";
import { getTodoListAsync } from "../store/Action";
import { RootAction, RootState } from "../store/Store";

interface ITodoProps {}

const Todo: React.FunctionComponent<ITodoProps> = (props) => {
  const todoList = useSelector((state: RootState) => state.todo.list);
  const dispatch = useDispatch<RootAction | any>();

  useEffect(() => {
    dispatch(getTodoListAsync());
  }, []);

  return (
    <>
      <div className="row">
        {todoList.map((model) => (
          <TodoContainer model={model} />
        ))}
      </div>
    </>
  );
};

export default Todo;
