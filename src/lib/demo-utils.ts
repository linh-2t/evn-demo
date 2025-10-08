import type { ProcessingFile, ProcessingStats } from "@/types";

export function calculateStats(files: ProcessingFile[]): ProcessingStats {
  return {
    total: files.length,
    processing: files.filter((f) => f.status !== "completed").length,
    completed: files.filter((f) => f.status === "completed").length,
    exactMatch: files.filter((f) => f.result?.type === "exact_match").length,
    errors: files.filter(
      (f) => f.result?.validation?.length && f.result.validation.length > 0
    ).length,
  };
}

export function formatFieldName(field: string): string {
  return field.replace(/_/g, " ").toUpperCase();
}

export function getConfidenceColor(confidence: number): string {
  if (confidence > 0.8) return "bg-green-500";
  if (confidence > 0.6) return "bg-yellow-500";
  return "bg-red-500";
}

export function getOcrConfidenceVariant(
  confidence: number
): "default" | "secondary" | "destructive" {
  if (confidence > 0.8) return "default";
  if (confidence > 0.6) return "secondary";
  return "destructive";
}
