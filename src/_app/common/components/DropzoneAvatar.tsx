import React from "react";
import { ServerFileReference } from "@/_app/gql-types/graphql";
import { useUploadFile } from "@/_app/hooks/use-upload-file";
import { FOLDER__NAME } from "@/_app/models/FolderName";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { Image, rem } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons-react";
import { FaCamera } from "react-icons/fa";
import clsx from "clsx";

interface IProp {
  onChange: (file: ServerFileReference) => void;
  file?: ServerFileReference;
  folder?: FOLDER__NAME;
  isLogo?: boolean;
}

const DropzoneAvatar: React.FC<IProp> = ({
  onChange,
  file,
  folder = FOLDER__NAME.USER__AVATAR,
  isLogo = false,
}) => {
  const { uploadFile, uploading } = useUploadFile();

  return (
    <Dropzone
      onDrop={async (files) => {
        const result = await uploadFile({
          file: files[0],
          folder,
        });
        onChange(result.data);
      }}
      loading={uploading}
      maxSize={3 * 1024 ** 2}
      className={clsx(
        "flex items-center justify-center group p-0 m-0 h-[200px] w-[200px] rounded-full",
        {
          " h-[100px] w-[100px] ": isLogo,
        }
      )}
    >
      {!file?.path ? (
        <IconPhoto
          style={{
            width: rem(isLogo ? 33 : 52),
            height: rem(isLogo ? 33 : 52),
            color: "var(--mantine-color-blue-6)",
          }}
          stroke={1.5}
        />
      ) : (
        <div className="relative">
          <Image
            className={clsx("w-[200px] h-[200px] rounded-full object-cover", {
              " h-[100px] w-[100px] ": isLogo,
            })}
            src={getFileUrl(file)}
          />

          <FaCamera
            size={isLogo ? 33 : 55}
            color="white"
            className="absolute shadow-xl opacity-0 group-hover:opacity-100"
            style={{
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              borderRadius: "5px",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "all 0.5s ease-in-out",
            }}
          />
        </div>
      )}
    </Dropzone>
  );
};

export default DropzoneAvatar;
