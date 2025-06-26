import { CrossIcon, PDFIcon } from "@/app/components/icons"

const UploadedFile = ({ selectedFile, onFileCancel } : {selectedFile: File | undefined, onFileCancel: () => void}) => {
  return (
    <div className="flex items-center justify-between pl-9 pr-5 border border-blue bg-primary-background backdrop:filter-blur(15px) rounded-[10px]">
          <div className="flex gap-4 items-center py-3 md:py-4 font-filsonPro-regular">
            <PDFIcon className="h-9 !text-grayish" />
            <div className="flex flex-col">
              <span>{selectedFile?.name}</span>
            </div>
          </div>
          <button type="button" className="ml-2" onClick={onFileCancel} title="Remove file" >
            <CrossIcon className="group-hover:scale-[1.04] !text-grayish" />
          </button>
        </div>
  )
}

export default UploadedFile
