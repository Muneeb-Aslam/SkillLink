import AWS from "aws-sdk";
export const getFile = (fileName: string) => {
  if (fileName.length > 0) {
    const s3 = new AWS.S3();
    const params = {
      Bucket: "earnindollars",
      Key: fileName,
    };
    const signedUrl = s3.getSignedUrl("getObject", params);
    return signedUrl;
  }
};
