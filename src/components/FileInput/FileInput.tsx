import FileIcon from "../../assets/file-icon.svg";
import "../Input/style.css";
import React, { forwardRef } from "react";

type FileInputProps = {
  id: string;
  label: string;
  name?: string;
  fileName?: string;
  actionLabel: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  onRemoveClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const FileInput = forwardRef<HTMLDivElement, FileInputProps>(
  (
    {
      id,
      label,
      fileName,
      actionLabel,
      className,
      onClick,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`input-wrapper ${className ?? ""}`}
      >
        <span>{label}</span>
        <span>{fileName}</span>

        <div className="custom-file-upload-container">
          <label
            
            className="custom-file-upload"
            onClick={onClick}
          >
            <img
              src={FileIcon}
              width={16}
              height={16}
              alt="File"
            />
            {actionLabel}
          </label>

          <input
            id={id}
            type="file"
          />
        </div>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;