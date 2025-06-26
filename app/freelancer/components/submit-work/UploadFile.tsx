'use client'
import { FileUploadIcon } from '@/app/components/icons';
import React, { useState } from 'react';

const UploadFile = ({ fileInputRef, setSelectedFile } : {fileInputRef: React.MutableRefObject<HTMLInputElement | null>, setSelectedFile: (file: File | undefined) => void}) => {
    const [fileIsDragged, setFileIsDragged] = useState(false);

    const fileChangeHandler = async (e : any) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }
    // If user drags and drops a file
    const handleDrop = (e : any) => {
        e.preventDefault();
        setFileIsDragged(false);
        if (e.dataTransfer.items && e.dataTransfer.items.length === 1) {
            const file = e.dataTransfer.items[0].getAsFile();
            setSelectedFile(file);
        }
    };
    
  return (
    <div className={`flex items-center justify-center border ${!fileIsDragged ? 'border-blue border-dashed' : 'border-primary border-solid'} bg-primary-background rounded-[10px]`}
        onDrop={handleDrop}
        onDragOver={(e) => {
            e.preventDefault();
            setFileIsDragged(true);
        }}
        onDragLeave={() => setFileIsDragged(false)}
    >
        <div className="flex flex-col items-center justify-center gap-2 m-6 md:m-8 lg:m12">
            <FileUploadIcon className="h-14 md:h-full !text-grayish" />
            <h4 className="font-filsonPro-bold">
                Drag and Drop Your Files
            </h4>
            <span className="text-gray-400">Limit 200MB Per File PDF</span>
            <span className="text-gray-400 my-1 md:my-2">Or</span>
            <label htmlFor="selectFile"
                className="py-1 px-5 hover:scale-105 font-filsonPro-semibold text-blue hover:text-blue border border-blue transition-all duration-200 rounded-md cursor-pointer upload-section"
            >
                Browse Files
            </label>
            <input type="file" accept={`.pdf,.doc,.docx}`} className="hidden" id="selectFile" ref={fileInputRef} onChange={fileChangeHandler} />
        </div>
    </div>
  )
}

export default UploadFile
