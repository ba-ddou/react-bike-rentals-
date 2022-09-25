import React from "react";

export const useModalControls = <T>(): {
  opened: boolean;
  open: (payload: T) => void;
  onClose: () => void;
  payload: T;
} => {
  const [opened, setOpened] = React.useState(false);
  const [payload, setPayload] = React.useState<T | null>(null);

  const open = (payload: T) => {
    setPayload(payload);
    setOpened(true);
  };

  const onClose = () => {
    setOpened(false);
    setPayload(null);
  };

  return {
    opened,
    open,
    onClose,
    payload: payload as T,
  };
};
