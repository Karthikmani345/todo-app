import * as React from "react";

import { ITodo } from "../interface/ITodo";

interface ITodoListProps {
  item: ITodo[];
  onEdit: (args: ITodo) => void;
  onDelete: (args: ITodo) => void;
  toggleAccomplished: (args: ITodo) => void;
}

const TodoList: React.FunctionComponent<ITodoListProps> = ({
  item,
  onDelete,
  onEdit,
  toggleAccomplished,
}) => {
  return (
    <>
      <ul className="list-group list-group-flush">
        {item.map((todo) => {
          return (
            <li className="list-group-item">
              <div className="row">
                <div className="col-lg-7">
                  <span className={todo.isAccomplished ? "done" : "undone"}>
                    {todo.name}
                  </span>
                </div>
                <div className="col-5">
                  <i
                    onClick={() => onEdit(todo)}
                    className="fa fa-pencil-square-o fa-lg"
                    aria-hidden="true"
                    style={{ color: "gray" }}
                  ></i>
                  {todo.isAccomplished ? (
                    <i
                      onClick={() => toggleAccomplished(todo)}
                      className="fa fa-bookmark fa-lg"
                      aria-hidden="true"
                      style={{ color: "gray" }}
                    ></i>
                  ) : (
                    <i
                      onClick={() => toggleAccomplished(todo)}
                      className="fa fa-bookmark-o fa-lg"
                      aria-hidden="true"
                      style={{ color: "gray" }}
                    ></i>
                  )}
                  <i
                    onClick={() => onDelete(todo)}
                    className="fa fa-window-close fa-lg"
                    aria-hidden="true"
                    style={{ color: "gray" }}
                  ></i>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default React.memo(TodoList);
