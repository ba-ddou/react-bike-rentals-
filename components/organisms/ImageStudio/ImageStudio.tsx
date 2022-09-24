import { useUnderScopeImageState } from "hooks";
import React, { FunctionComponent, useEffect } from "react";
import ImageDropZone from "./ImageDropZone";
import ImageEditor from "./ImageEditor";

interface ImageStudioProps {
  entityId: string;
  onUrlIsReady: (url: string) => void;
  onError: (error: string) => void;
}

const ImageStudio: FunctionComponent<ImageStudioProps> = (props) => {
  const {
    setUnderScopeImageFile,
    setUnderScopeImageUrl,
    underScopeImageUrl,
    resetUnderScopeImageState,
  } = useUnderScopeImageState();
  if (!underScopeImageUrl) {
    return <ImageDropZone onSelect={setUnderScopeImageFile} />;
  } else if (underScopeImageUrl) {
    return (
      <ImageEditor
        src={underScopeImageUrl}
        onDiscard={resetUnderScopeImageState}
        {...props}
        mode="edit"
        onDelete={()=>props.onUrlIsReady('')}
      />
    );
  } else return null;
};

export default ImageStudio;
