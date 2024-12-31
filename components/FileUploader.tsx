'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  accept: string;
  maxFiles: number;
  maxSize: number;
  onFilesSelected: (files: File[]) => void;
}

export function FileUploader({
  accept,
  maxFiles,
  maxSize,
  onFilesSelected,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxFiles,
    maxSize,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary'}`}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <p className="text-sm">
          {isDragActive
            ? 'Drop the files here...'
            : `Drag 'n' drop files here, or click to select files`}
        </p>
        <p className="text-xs text-muted-foreground">
          Maximum {maxFiles} files, up to {maxSize / 1024 / 1024}MB each
        </p>
      </div>
    </div>
  );
}