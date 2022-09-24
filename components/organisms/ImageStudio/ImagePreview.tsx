import React, { FunctionComponent } from "react";

interface ImagePreviewProps {
  src: string;
  uploadStatus?: {
    uploading: boolean;
    progress: number;
    error: string | undefined;
  };
  onEdit: (src: string) => void;
  onDelete: () => void;
}

const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
  src,
  uploadStatus,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      style={{
        display: "inline-block",
      }}
    >
      <div
        style={{
          width: "20rem",
          height: "20rem",
          position: "relative",
        }}
      >
        {src && (
          <img
            style={{
              display: "inline-block",
              objectFit: "contain",
              height: "100%",
              width: "100%",
            }}
            src={src}
            alt="file"
          />
        )}
        {uploadStatus?.uploading && (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >{`${uploadStatus.progress.toFixed(2)}%`}</div>
        )}
      </div>

      {!uploadStatus ||
        (!uploadStatus?.uploading && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button onClick={onDelete}>Delete</button>
            <button onClick={() => onEdit(src)}>Edit</button>
          </div>
        ))}

      {uploadStatus?.error && (
        <div style={{ color: "red", padding: "1rem" }}>
          {uploadStatus.error}
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
