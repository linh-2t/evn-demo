import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatFieldName, getConfidenceColor } from "@/lib/demo-utils";
import type { ExtractedData } from "@/types";

type Props = {
  extractedData: Record<string, ExtractedData>;
};

export function ExtractedDataGrid({ extractedData }: Props) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <TrendingUp className="h-4 w-4 text-purple-600" />
          Dữ liệu trích xuất
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(extractedData).map(([field, data]) => (
            <Card className="bg-gray-50" key={field}>
              <CardContent className="p-2">
                <p className="mb-1 text-gray-500 text-xs">
                  {formatFieldName(field)}
                </p>
                <p className="mb-1 truncate font-semibold text-gray-900 text-sm">
                  {data.value || "N/A"}
                </p>
                <div className="flex items-center gap-1">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${getConfidenceColor(data.confidence)}`}
                      style={{ width: `${data.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-500 text-xs">
                    {Math.round(data.confidence * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
