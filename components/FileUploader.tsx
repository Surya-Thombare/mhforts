import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

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

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxFiles,
    maxSize,
  });

  const removeFile = (file: File) => {
    const newFiles = acceptedFiles.filter(f => f !== file);
    onFilesSelected(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/20 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop files here, or click to select'}
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum {maxFiles} files, up to {maxSize / 1024 / 1024}MB each
          </p>
        </div>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="space-y-2">
          {acceptedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <div className="flex items-center space-x-2 text-sm">
                <span className="truncate max-w-[200px]">{file.name}</span>
                <span className="text-muted-foreground">
                  ({Math.round(file.size / 1024)}KB)
                </span>
              </div>
              <button
                onClick={() => removeFile(file)}
                className="p-1 hover:bg-accent rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}