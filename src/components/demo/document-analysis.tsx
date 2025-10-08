import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProcessingResult } from "@/types";

type Props = {
  result: ProcessingResult;
};

export function DocumentAnalysis({ result }: Props) {
  const getOcrVariant = (confidence: number) => {
    if (confidence > 0.8) return "default";
    if (confidence > 0.6) return "secondary";
    return "destructive";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900">
            <Eye className="h-4 w-4 text-blue-600" />
            Document Analysis
          </div>
          <Badge variant={getOcrVariant(result.ocrConfidence)}>
            OCR: {Math.round(result.ocrConfidence * 100)}%
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-medium text-gray-700 text-sm">
              Document Preview
            </p>
            <div
              aria-label="Document scan preview"
              className="h-64 w-full rounded-lg border-2 border-gray-200 bg-center bg-cover bg-no-repeat lg:h-80"
              role="img"
              style={{
                backgroundImage: `url(${result.scanPreview})`,
              }}
            />
          </div>

          <div>
            <p className="mb-3 font-medium text-gray-700 text-sm">OCR Result</p>
            <div className="h-64 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 lg:h-80">
              <div className="prose prose-sm max-w-none">
                {result.ocrText.split("\n").map((line, idx) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <h3
                        className="mb-3 font-bold text-base text-gray-900"
                        key={idx}
                      >
                        {line.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }
                  return (
                    <p
                      className="mb-2 font-mono text-gray-700 text-sm"
                      key={idx}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
