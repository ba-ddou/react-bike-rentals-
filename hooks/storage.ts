import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";

import firebaseApp from "config/firebase";

const storage = getStorage(firebaseApp);

export enum UploadStatus {
  uploading = "uploading",
  done = "done",
  error = "error",
}

export interface UploadMetaData {
  tempObjectUrl?: string;
  url?: string;
  progress?: number;
  status?: UploadStatus;
  error?: string;
}

export const useStorage = (): {
  uploadFile: (params: {
    file: File;
    filePath: string;
    fileName: string;
  }) => void;
} & UploadMetaData => {
  const [uploadMetaData, setUploadMetaData] = useState<UploadMetaData>({});
  const uploadFile = ({
    file,
    filePath,
    fileName,
  }: {
    file: File;
    filePath: string;
    fileName: string;
  }) => {
    if (!file || !filePath || !fileName) {
      setUploadMetaData({
        ...uploadMetaData,
        status: UploadStatus.error,
        error: "File, file path & file name are required !",
      });
      return;
    }
    const storageRef = ref(
      storage,
      `${filePath}/${fileName}.${file.name.split(".")[1]}`
    );
    setUploadMetaData({
      status: UploadStatus.uploading,
      tempObjectUrl: URL.createObjectURL(file),
    });
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", onUploadTaskStateChange, onUploadError, () =>
      onUploadSuccess(uploadTask.snapshot.ref)
    );
  };
  const onUploadTaskStateChange = (snapshot: UploadTaskSnapshot) => {
    console.log("onUploadTaskStateChange", {
      snapshot: snapshot.state,
      metadata: snapshot.metadata,
    });
    switch (snapshot.state) {
      case "running":
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadMetaData((prevState) => ({
          ...prevState,
          progress,
        }));
        break;

      case "error":
        setUploadMetaData((prevState) => ({
          ...prevState,
          status: UploadStatus.error,
          error: "File upload failed !",
        }));
        break;
    }
  };
  const onUploadError = (error: Error) =>
    setUploadMetaData((prevState) => ({
      ...prevState,
      status: UploadStatus.error,
      error: error.message,
    }));
  const onUploadSuccess = async (ref: StorageReference) => {
    const url = await getDownloadURL(ref);
    setUploadMetaData((prevState) => ({
      ...prevState,
      status: UploadStatus.done,
      url,
    }));
  };
  return { uploadFile, ...uploadMetaData };
};


export const useUnderScopeImageState = () => {
  const [file, setFile] = useState<File | null>(null);
  const [underScopeImageUrl, setUnderScopeImageUrl] = useState<string | null>(
    null
  );

  const setImageFile = (file: File) => {
    setFile(file);
    setUnderScopeImageUrl(URL.createObjectURL(file));
  };

  const setImageUrl = (url: string) => {
    setUnderScopeImageUrl(url);
  };
  const reset = () => {
    setFile(null);
    setUnderScopeImageUrl(null);
  };

  return {
    setUnderScopeImageFile: setImageFile,
    setUnderScopeImageUrl: setImageUrl,
    underScopeImageUrl,
    resetUnderScopeImageState: reset,
  };
};