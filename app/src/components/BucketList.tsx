import * as React from "react";

import { IBucket } from "../interface/IBucket";

interface IBucketListProps {
  children: React.ReactNode;
  list: IBucket[];
  onEdit: (args: IBucket) => void;
}

const BucketList: React.FunctionComponent<IBucketListProps> = ({
  children,
  list,
  onEdit,
}) => {
  return (
    <>
      <div className="card">
        <div className="card-header">{children}</div>
        <ul className="list-group list-group-flush">
          {list.map((item) => {
            return (
              <li className="list-group-item">
                <div className="row">
                  <div className="col-lg-8">{item.name}</div>
                  <div className="col-4">
                    <i
                      onClick={() => onEdit(item)}
                      className="fa fa-pencil-square-o fa-lg"
                      aria-hidden="true"
                      style={{ color: "gray" }}
                    ></i>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default React.memo(BucketList);
