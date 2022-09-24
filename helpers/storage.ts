export const inferStorageLocation = ({ entityId }: { entityId: string }) => {
  return {
    filePath: `bikes`,
    fileName: `${entityId}_${Date.now()}`,
  };
};
