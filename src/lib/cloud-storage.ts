import { Storage } from "@google-cloud/storage";

const cloudStorage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_STORAGE_KEY,
})

export const storeFileToBucket = async (storageBucketName: string, fileName: string, contents: Buffer) => {
    return await cloudStorage.bucket(storageBucketName).file(fileName).save(contents)
}