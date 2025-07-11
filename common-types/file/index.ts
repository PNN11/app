export namespace FileCore {
  export type FileInfo = {
    originalName: string;
    name: string;
    nameWithOriginalName: string;
    mime: 'image/jpeg';
    ext: string;
  };

  export type UploadFile = {
    ok: boolean;
    message: string;
    files: FileInfo[];
  };
}
