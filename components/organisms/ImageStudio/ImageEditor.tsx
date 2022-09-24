import { inferStorageLocation } from "helpers";
import { UploadStatus, useStorage } from "hooks";
import React, { FunctionComponent, useEffect, useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageScope from "./ImageScope";

interface ImageEditorProps {
  entityId: string;
  onUrlIsReady: (url: string) => void;
  onError: (error: string) => void;
  src: string;
  mode?: "edit" | "preview";
  onDiscard?: () => void;
  onDelete: () => void;
}

const ImageEditor: FunctionComponent<ImageEditorProps> = ({
  entityId,
  onUrlIsReady,
  onError,
  src,
  mode = "preview",
  onDiscard,
  onDelete,
}) => {
  const [editorMode, setEditorMode] = useState<"edit" | "preview">(mode);
  const { uploadFile, progress, status, error, url, tempObjectUrl } =
    useStorage();

  useEffect(() => {
    status === UploadStatus.done && url && onUrlIsReady(url);
  }, [status, url]);
  useEffect(() => {
    status === UploadStatus.error && error && onError(error);
  }, [error, status]);

  const onDiscardHandler = () => {
    onDiscard && onDiscard();
    setEditorMode("preview");
  };
  switch (editorMode) {
    case "preview":
      return (
        <ImagePreview
          src={
            status === UploadStatus.uploading && tempObjectUrl
              ? tempObjectUrl
              : src
          }
          uploadStatus={{
            progress: progress || 0,
            uploading: status === UploadStatus.uploading,
            error,
          }}
          onEdit={() => setEditorMode("edit")}
          onDelete={onDelete}
        />
      );
    case "edit":
      return (
        <ImageScope
          url={src}
          onSave={(file) => {
            uploadFile({
              file,
              ...inferStorageLocation({ entityId }),
            });
            setEditorMode("preview");
          }}
          onDiscard={onDiscardHandler}
        />
      );

    default:
      return null;
  }
};

export default ImageEditor;
