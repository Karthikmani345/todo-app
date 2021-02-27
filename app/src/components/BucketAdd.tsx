import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { IBucket } from "../interface/IBucket";

interface IBucketAddProps {
  bucket: IBucket;
  onSubmit: (args: IBucket) => void;
  onCancel: () => void;
}

const BucketAdd: React.FunctionComponent<IBucketAddProps> = (props) => {
  const [state, setState] = useState<IBucket>({} as IBucket);

  useEffect(() => {
    setState(props.bucket);
  }, [props.bucket]);

  const changeHandler = ($event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, name: $event?.currentTarget?.value });
  };

  const cancelHandler = () => {
    setState({ _id: "", isActive: false, name: "" });
    props.onCancel();
  };

  const submitHandler = () => {
    cancelHandler();
    props.onSubmit(state);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <input
            className="form-control"
            type="text"
            value={state?.name}
            onChange={changeHandler}
          />
        </div>
        <div className="col-4">
          <button
            disabled={state?.name?.length > 0 ? false : true}
            className="btn btn-secondary"
            onClick={submitHandler}
          >
            {state._id ? "Edit Bucket" : "Add Bucket"}
          </button>
          <button className="btn btn-light" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(BucketAdd);
