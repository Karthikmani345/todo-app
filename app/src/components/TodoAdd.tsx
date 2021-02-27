import classNames from "classnames";
import * as React from "react";
import { useEffect, useState } from "react";
import { ITodo } from "../interface/ITodo";

interface ITodoAddProps {
  todo: ITodo;
  onSubmit: (args: ITodo) => void;
}

const TodoAdd: React.FunctionComponent<ITodoAddProps> = ({
  onSubmit,
  todo,
}) => {
  const [model, setModel] = useState<{ _id: string; name: string }>({
    _id: "",
    name: "",
  });

  useEffect(() => {
    setModel({ ...model, ...todo });
  }, [todo]);

  const changeHandler = ($event: React.ChangeEvent<HTMLInputElement>) => {
    setModel({ ...model, name: $event?.currentTarget?.value });
  };

  const cancelHandler = () => {
    setModel({ _id: "", name: "" });
  };

  const submitHandler = () => {
    onSubmit({ ...todo, ...model });
    cancelHandler();
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-7">
          <input
            className="form-control"
            type="text"
            value={model?.name}
            onChange={changeHandler}
          />
        </div>
        <div className="col-5">
          <i
            onClick={submitHandler}
            className={classNames({
              disabled: model.name.length > 0 ? false : true,
              "fa fa-plus-square fa-lg": model._id.length == 0 ? true : false,
              "fa fa-pencil-square-o fa-lg": model._id.length > 0 ? true : false,
            })}
            aria-hidden="true"
            style={{ color: "gray" }}
          ></i>
          <i
            onClick={() => cancelHandler()}
            className="fa fa-window-close fa-lg"
            aria-hidden="true"
            style={{ color: "gray" }}
          ></i>
        </div>
      </div>
    </>
  );
};

export default React.memo(TodoAdd);
