import * as React from "react";

import BucketContainer from "../container/Bucket";

interface IBucketProps {}

const Bucket: React.FunctionComponent<IBucketProps> = (props) => {
  return (
    <>
      <BucketContainer />
    </>
  );
};

export default Bucket;
