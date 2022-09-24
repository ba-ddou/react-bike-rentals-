import React, { FunctionComponent, useEffect, useState } from "react";
import { ImageStudio, ImageEditor } from "./ImageStudio";


interface ImageFormFieldProps {
  entityId: string;
  src?: string;
  onChange: (url: string) => void;
  onError: (error: string) => void;
}

const ImageFormField: FunctionComponent<ImageFormFieldProps> = ({
  onChange,
  src,
  ...rest
}) => {
  const [localSrc, setLocalSrc] = useState<string | undefined>();

  const onChangeHandler = (src: string) => {
    setLocalImageSrc(src);
    onChange && onChange(src);
  };
  useEffect(() => {
    if (src) setLocalImageSrc(src);
  }, [src]);

  const setLocalImageSrc = async (src: string) => {
    setLocalSrc(src);
    if (!src) return;
    const objectUrl = await getObjectUrlFromCrossOriginImageUrl(src);
    setLocalSrc(objectUrl);
  };

  if (!localSrc)
    return <ImageStudio {...rest} onUrlIsReady={onChangeHandler} />;
  else if (localSrc)
    return (
      <ImageEditor
        src={localSrc}
        onUrlIsReady={onChangeHandler}
        onDelete={() => onChangeHandler("")}
        {...rest}
      />
    );
  else return null;
};

export default ImageFormField;

async function getObjectUrlFromCrossOriginImageUrl(
  src: string
): Promise<string> {
  const url = await fetch(src)
    .then((res) => res.blob()) // Gets the response and returns it as a blob
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
  return url;
}
