import React, { FunctionComponent, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "@mantine/core";

interface ImageScopeProps {
  url: string;
  onDiscard: () => void;
  onSave: (file: File) => void;
}

const ImageScope: FunctionComponent<ImageScopeProps> = ({
  url,
  onDiscard,
  onSave,
}) => {
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor | null>(null);

  const onSaveHandler = () => {
    if (editorRef.current) {
      const canvasScaled: HTMLCanvasElement = editorRef.current.getImageScaledToCanvas();
      canvasScaled.toBlob((blob) => {
        if (!blob) return;
        let file = new File([blob], "fileName.png", { type: "image/png" });
        onSave(file);
      });
    }
  };

  return (
    <div
      style={{
        maxHeight: "30rem",
        display: "inline-block",
        maxWidth: "30rem",
      }}
    >
      <AvatarEditor
        ref={(ref) => (editorRef.current = ref)}
        image={url}
        width={250}
        height={250}
        border={50}
        color={[0, 0, 0, 0.6]} // RGBA
        scale={scale}
        rotate={0}
        borderRadius={15}
      />
      <Slider
        value={Number(scale.toFixed(1))}
        min={0.5}
        max={2}
        step={0.1}
        onChange={setScale}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={onDiscard}>Discard</button>
        <button onClick={onSaveHandler}>Save</button>
      </div>
    </div>
  );
};

export default ImageScope;
