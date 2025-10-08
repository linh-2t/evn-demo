export type EncodedAsset = {
  ASSET_ID: string;
  NAME: string;
  STATUS: "active" | "inactive";
  FILE_COUNT: number;
  BINARY_SIZE: string;
  FILES: string;
};

export type PmisRecord = {
  ASSETID: string;
  ASSET_NAME: string;
  NO: string;
  LOCATION: string;
  MANUFACTURER: string;
  DATE: string;
};

export type PmisMapping = {
  equipment_code: string;
  equipment_name: string;
  capacity: string;
  location: string;
  manufacturer: string;
  date: string;
};

export type ProcessingFile = {
  id: number;
  name: string;
  type: string;
  size: string;
  status:
    | "queued"
    | "decoding"
    | "ocr"
    | "extracting"
    | "matching"
    | "validating"
    | "completed"
    | "error"
    | "cancelled";
  progress: number;
  stage: string;
  assetId?: string;
  result?: ProcessingResult;
  processingTime?: string;
  errorMessage?: string;
};

export type ExtractedData = {
  value: string;
  confidence: number;
};

export type ValidationIssue = {
  field: string;
  type: "error" | "warning";
  message: string;
  suggestion?: string;
};

export type ProcessingResult = {
  type: "exact_match" | "has_errors";
  scanPreview: string;
  ocrText: string;
  ocrConfidence: number;
  extracted: Record<string, ExtractedData>;
  pmisMatch: {
    similarity: number;
    record: PmisRecord;
  };
  validation: ValidationIssue[];
};

export type EditingRow = {
  status: "approved" | "editing" | "skipped";
  value?: string;
};

export type ProcessingStats = {
  total: number;
  processing: number;
  completed: number;
  exactMatch: number;
  errors: number;
};
