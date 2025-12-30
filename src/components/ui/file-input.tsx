'use client';

import { cn, joinWith } from "@/lib/utils"
import { Icon } from "@/components/icons";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useRef } from "react";

type FileInputProps = React.ComponentProps<"input"> & {
  error?: string;
  onUpload: (result: string) => void;
  required?: boolean;
  fileValue?: string;
  title?: string;
  folderName?: string;
}

function FileInput({ className, title, error, required, fileValue, onUpload, folderName = 'banking-packages-form-entries', ...props }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const TYPE_MAP = {
    'application/pdf': 'pdf',
    'image/png': 'image',
    'image/jpeg': 'image',
    'image/jpg': 'image',
    'image/webp': 'image',
  }

  const accepted = [...new Set(Object.keys(TYPE_MAP).filter(type => props.accept?.includes(type)).map(type => TYPE_MAP[type as keyof typeof TYPE_MAP]))];


  const openFileInput = () => {
    fileInputRef.current?.click();
  }

  const { mutateAsync: uploadFile, isPending } = useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderName', folderName);
      const result = await fetch('/api/file-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await result.json();
      return data.fileUrl;
    },
  })

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await uploadFile(file);
      onUpload?.(result);
      event.target.value = '';
    }
  };

  return (
    <div className="relative flex flex-col items-start gap-1">
      {title && <label htmlFor={props.id} className="text-sm text-muted-foreground">{title} {required && <span className="text-destructive text-xs">*</span>}</label>}
      <div className="relative border-input flex items-center justify-between gap-4 min-h-12 w-full min-w-0 border bg-transparent file:border-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded px-3 py-1.5">
        <div className="flex items-center gap-3">
          <Icon onClick={openFileInput} icon="mdi:file-document-outline" className="w-4 h-4 cursor-pointer" />
          {fileValue ? (
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground line-clamp-1">File uploaded</p>
              <p onClick={openFileInput} className="text-xs text-primary hover:font-medium transition-all duration-300 cursor-pointer">Replace document</p>
            </div>
          ) : (
            <Fragment>
              {isPending ? (
                <Fragment>
                  <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </Fragment>
              ) : (
                <p onClick={openFileInput} className="text-sm text-muted-foreground hover:font-medium transition-all duration-300 cursor-pointer">Upload {joinWith(accepted, 'or')}</p>
              )}
            </Fragment>
          )}
        </div>
        {fileValue && <p onClick={() => { onUpload?.(""); }} className="text-xs text-destructive hover:font-medium transition-all duration-300 cursor-pointer">Remove</p>}
        <input
          ref={fileInputRef}
          type="file"
          data-slot="input"
          className={cn(
            "absolute -z-10 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:cursor-pointer  file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          onChange={handleChange}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export { FileInput }
