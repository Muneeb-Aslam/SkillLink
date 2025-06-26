import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export const uploadSingleFile = async (uploadFile: any, index: number) => {
  const uniqueId = uuidv4();
  const s3 = new AWS.S3();
  const params: AWS.S3.PutObjectRequest = {
    Bucket: "earnindollars",
    Key: `${uniqueId}-${uploadFile.name}`,
    Body: uploadFile,
  };

  const options = {
    partSize: 100 * 1024 * 1024, // 100 MB
    queueSize: 1,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, options)
      .on("httpUploadProgress", (event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        console.log(`File ${index} is ${progress}% uploaded.`);
      })
      .send((err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
};
