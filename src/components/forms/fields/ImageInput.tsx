'use client';
import Image from 'next/image';
import type {
  OutputFileEntry,
  OutputCollectionState,
  OutputCollectionStatus,
} from '@uploadcare/react-uploader';
import { useCallback } from 'react';
import '@uploadcare/react-uploader/core.css';
import { Trash, X } from '@phosphor-icons/react';
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';

export type UploadcareImageValue = string | null;

type BaseImageInputProps = {
  label?: string;
  name?: string;
  helperText?: string;
  error?: string;
  previewLabel?: string;
};

type SingleImageInputProps = BaseImageInputProps & {
  multiple?: false;
  value?: UploadcareImageValue;
  onChange?: (value: UploadcareImageValue, file?: OutputFileEntry | null) => void;
};

type MultiImageInputProps = BaseImageInputProps & {
  multiple: true;
  value?: string[];
  onChange?: (value: string[], files?: OutputFileEntry[]) => void;
};

export type ImageInputProps = SingleImageInputProps | MultiImageInputProps;

type UploaderState = OutputCollectionState<OutputCollectionStatus, 'maybe-has-group'>;

export default function ImageInput(props: ImageInputProps) {
  const { label, name, helperText, error, previewLabel = 'Selected image' } = props;

  const multiple = props.multiple === true;

  /**
   * SINGLE MODE
   */
  const handleFileUploadSuccess = useCallback(
    (file: OutputFileEntry) => {
      if (multiple) return;

      const cdnUrl = (file.cdnUrl as string | null) ?? null;
      if (!cdnUrl) return;

      props.onChange?.(cdnUrl, file);
    },
    [multiple, props],
  );

  /**
   * MULTIPLE MODE
   */
  const handleChangeState = useCallback(
    (state: UploaderState) => {
      if (!multiple) return;

      const successEntries = state.successEntries;

      const urls = successEntries
        .map((entry) => (entry.cdnUrl as string | null) ?? null)
        .filter((url): url is string => typeof url === 'string' && url.length > 0);

      props.onChange?.(urls, successEntries as OutputFileEntry[]);
    },
    [multiple, props],
  );

  const handleClear = () => {
    if (multiple) {
      props.onChange?.([]);
    } else {
      props.onChange?.(null, null);
    }
  };

  const handleRemoveAt = (index: number) => {
    if (!multiple) return;
    const current = props.value ?? [];
    const next = current.filter((_, i) => i !== index);
    props.onChange?.(next);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-neutral block text-sm leading-6 font-medium">
          {label} *
        </label>
      )}

      <FileUploaderRegular
        pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ''}
        classNameUploader="uc-light uc-purple"
        sourceList="local, camera, gdrive, facebook"
        filesViewMode="grid"
        multiple={multiple}
        userAgentIntegration="llm-nextjs"
        onFileUploadSuccess={handleFileUploadSuccess}
        onChange={handleChangeState}
      />

      {/* Preview SINGLE */}
      {!multiple && props.value && (
        <div className="flex flex-col items-start gap-2">
          <div className="bg-element relative size-20 overflow-hidden rounded-md">
            <Image
              src={props.value}
              alt={previewLabel}
              className="h-full w-full object-cover"
              fill
            />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex cursor-pointer items-center gap-1 self-start rounded-full bg-red-700 px-3 py-1 text-xs font-medium text-white duration-200 hover:bg-red-500"
          >
            <Trash size={14} weight="fill" />
            Clear
          </button>
        </div>
      )}

      {/* Preview MULTIPLE */}
      {multiple && Array.isArray(props.value) && props.value.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {props.value.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="group bg-element relative size-16 overflow-hidden rounded-md"
              >
                <Image
                  src={url}
                  alt={`${previewLabel} ${index + 1}`}
                  className="h-full w-full object-cover"
                  fill
                />
                <div className="bg-foreground/40 absolute inset-0 block group-hover:block md:hidden">
                  <button
                    type="button"
                    onClick={() => handleRemoveAt(index)}
                    className="absolute top-0.5 right-0.5 cursor-pointer text-white"
                  >
                    <X size={14} weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex cursor-pointer items-center gap-1 self-start rounded-full bg-red-700 px-3 py-1 text-xs font-medium text-white duration-200 hover:bg-red-500"
          >
            <Trash size={14} weight="fill" />
            Clear all
          </button>
        </div>
      )}

      {helperText && !error && <p className="text-muted-foreground text-xs">{helperText}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
