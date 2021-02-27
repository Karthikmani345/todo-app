import * as React from "react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BucketAdd from "../components/BucketAdd";
import BucketList from "../components/BucketList";
import { IBucket } from "../interface/IBucket";
import {
  getBucketListAsync,
  saveBucketAsync,
  setBucket,
  submitBucketAsync,
  unsetBucket,
} from "../store/Action";
import { RootAction, RootState } from "../store/Store";

interface IBucketProps {}

const Bucket: React.FunctionComponent<IBucketProps> = (props) => {
  const bucket = useSelector((state: RootState) => state.bucket);
  const dispatch = useDispatch<RootAction | any>();

  useEffect(() => {
    dispatch(getBucketListAsync());
  }, []);

  const onEditHandler = useCallback((item: IBucket) => {
    console.log("[Bucket.tsx] [oneditHandler]", item);
    dispatch(setBucket(item));
  }, []);

  const onSubmitHandler = useCallback((item: IBucket) => {
    console.log("[Bucket.tsx] [onSubmitHandler]", item);
    dispatch(submitBucketAsync(item));
  }, []);

  const onCancelHandler = useCallback(() => {
    console.log("[Bucket.tsx] [onCancelHandler]");
    dispatch(unsetBucket());
  }, []);

  return (
    <>
      <BucketList list={bucket.list} onEdit={onEditHandler}>
        <BucketAdd
          bucket={bucket.bucket}
          onSubmit={onSubmitHandler}
          onCancel={onCancelHandler}
        />
      </BucketList>
    </>
  );
};

export default React.memo(Bucket);
