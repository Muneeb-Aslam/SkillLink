import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import cross from "@/public/cross.svg"

export default function ImageSelectComponent({ setValue }: { setValue: any }) {
  const [imageSrc, setImageSrc] = useState<Array<FileWithPath>>([]);
  useEffect(() => {
    setValue("files", imageSrc);
  }, [imageSrc, setValue]);

  const onDrop = useCallback((acceptedFiles: Array<FileWithPath>) => {
    acceptedFiles.forEach((file) => {
      setImageSrc((prevState) => [...prevState, file]);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleDelete = (file: FileWithPath) => {
    const newFiles = [...imageSrc];
    newFiles.splice(newFiles.indexOf(file), 1);
    setImageSrc(newFiles);
  };

  return (
    <div className="w-full grid justify-items-center border-2 border-input">
      <label
        htmlFor="itemImg"
        className="w-full border-input bg-muted h-full flex justify-items-center"
      >
        <div className="w-full cursor-pointer px-4 py-8 text-center text-muted-foreground h-full">
          <h4 className="text-center text-grayish font-bold">Upload an images & files</h4>
        </div>
      </label>
      <div {...getRootProps({ className: "dropzone" })}>
          <Input {...getInputProps()} id="itemImg" className="hidden" />
      </div>
      <div className="flex w-full items-center justify-center gap-4 p-2">
        {imageSrc.length > 0 &&
          imageSrc.map((image, index) => (
            <>
              <div className="flex flex-col items-center justify-between">
                <div className="flex justify-center">
                  <span>{image.name}</span>
                  <button onClick={() => handleDelete(image)} className="bg-white px-2" type="button">
                    <Image height={16} width={16} src={cross} alt="file" className="bg-white"/>
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
