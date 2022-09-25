import { FunctionComponent, useRef } from "react";
import { Text, Group, Button, createStyles } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
    // height: 300,
    width: 350,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
  },
}));

interface ImageDropZoneProps {
  onSelect: (file: File) => void;
}

const ImageDropZone: FunctionComponent<ImageDropZoneProps> = ({ onSelect }) => {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => onSelect(files[0])}
        className={classes.dropzone}
        radius="md"
        accept={["image/*"]}
        maxSize={5 * 1024 ** 2}
        multiple={false}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload
                size={50}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={50}
                color={
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black
                }
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop the image here</Dropzone.Accept>
            <Dropzone.Reject>
              We only accept.png or.jpeg file that are less than 5mb
            </Dropzone.Reject>
            <Dropzone.Idle>Upload bike image</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag&apos;n&apos;drop the image here to upload. We can only accept{" "}
            <i>.png or.jpeg</i> image that are less than 5mb in size.
          </Text>
        </div>
        <Button
          className={classes.control}
          size="xs"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          Select file
        </Button>
      </Dropzone>
    </div>
  );
};

export default ImageDropZone;
