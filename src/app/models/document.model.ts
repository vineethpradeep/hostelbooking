export interface DocumentDto {
  DocumentId?: number;
  UserId: number;
  DocumentType: string;
  DocumentName: string;
  FilePath?: string;
  FileUrl?: string;
  UploadedDate?: string;
  IsVerified?: boolean;
}
