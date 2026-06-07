export type R2BucketEvent = {
  account: string;
  bucket: string;
  eventTime: string;
  action: string;
  object: {
    key: string;
    size: number;
    eTag: string;
  };
};
