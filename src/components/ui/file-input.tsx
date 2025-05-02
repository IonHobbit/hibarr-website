'use client';

import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";

function FileInput({ className, title, error, required, fileValue, onUpload, ...props }: React.ComponentProps<"input"> & { error?: string, onUpload: (result: string) => void, required?: boolean, fileValue?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileInput = () => {
    fileInputRef.current?.click();
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderName', 'banking-packages-form-entries');
      const result = await fetch('/api/file-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await result.json();
      onUpload?.(data.fileUrl);
      event.target.value = '';
    }
  };

  return (
    <div className="relative flex flex-col items-start gap-1">
      {title && <label htmlFor={props.id} className="text-sm text-muted-foreground">{title} {required && <span className="text-destructive text-xs">*</span>}</label>}
      <div className="relative border-input flex items-center justify-between gap-4 min-h-10 w-full min-w-0 border bg-transparent file:border-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded px-3 py-1.5">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:file-document-outline" className="w-4 h-4" />
          {fileValue ? (
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground line-clamp-1">File uploaded</p>
              <p onClick={openFileInput} className="text-xs text-primary hover:font-medium transition-all duration-300 cursor-pointer">Replace document</p>
            </div>
          ) : (
            <p onClick={openFileInput} className="text-sm text-muted-foreground hover:font-medium transition-all duration-300 cursor-pointer">Upload document</p>
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
