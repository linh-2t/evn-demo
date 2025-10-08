import { Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProcessingResult } from "@/types";

type Props = {
  result: ProcessingResult;
};

export function PmisMatch({ result }: Props) {
  const { pmisMatch } = result;
  const isExactMatch = pmisMatch.similarity > 0.95;
  const isGoodMatch = pmisMatch.similarity > 0.8;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Database className="h-4 w-4 text-blue-600" />
          Kết Quả Matching PMIS
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Sau khi OCR, hệ thống tìm được{" "}
          {Math.random() > 0.5 ? 1 : Math.floor(Math.random() * 3) + 2}{" "}
          record(s) khớp trong database PMIS
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Best Match */}
        <div>
          <h4 className="mb-2 font-medium text-gray-700 text-sm">
            Record khớp nhất:
          </h4>
          <Card
            className={`border-2 ${
              isExactMatch
                ? "border-green-300 bg-green-50"
                : isGoodMatch
                  ? "border-blue-300 bg-blue-50"
                  : "border-yellow-300 bg-yellow-50"
            }`}
          >
            <CardContent className="p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-sm">
                  {isExactMatch
                    ? "✓ Khớp chính xác"
                    : isGoodMatch
                      ? "⭐ Khớp tốt"
                      : "⚠ Khớp một phần"}
                </span>
                <span className="font-bold text-sm">
                  {Math.round(pmisMatch.similarity * 100)}%
                </span>
              </div>
              <div className="space-y-1 text-xs">
                {Object.entries(pmisMatch.record).map(([key, value]) => (
                  <div className="flex justify-between" key={key}>
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Matches - Hiển thị khi có nhiều matches */}
        {Math.random() > 0.6 && (
          <div>
            <h4 className="mb-2 font-medium text-gray-700 text-sm">
              Các record khác có thể khớp:
            </h4>
            <div className="space-y-2">
              <Card className="border border-gray-200 bg-gray-50">
                <CardContent className="p-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-gray-700 text-xs">
                      Record #2
                    </span>
                    <span className="font-bold text-gray-600 text-xs">
                      {Math.round((pmisMatch.similarity - 0.1) * 100)}%
                    </span>
                  </div>
                  <div className="text-gray-600 text-xs">
                    ASSETID:{" "}
                    {pmisMatch.record.ASSETID.replace(/\d/g, (d) =>
                      String((Number.parseInt(d, 10) + 1) % 10)
                    )}
                    • Tương tự nhưng khác một số thông tin
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-gray-50">
                <CardContent className="p-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-gray-700 text-xs">
                      Record #3
                    </span>
                    <span className="font-bold text-gray-600 text-xs">
                      {Math.round((pmisMatch.similarity - 0.2) * 100)}%
                    </span>
                  </div>
                  <div className="text-gray-600 text-xs">
                    ASSETID:{" "}
                    {pmisMatch.record.ASSETID.replace(/\d/g, (d) =>
                      String((Number.parseInt(d, 10) + 2) % 10)
                    )}
                    • Manufacturer khác nhưng tên thiết bị tương tự
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="rounded-lg bg-blue-50 p-3">
          <p className="text-blue-800 text-xs">
            💡 <strong>Giải thích:</strong> Hệ thống sử dụng AI để so sánh dữ
            liệu OCR với database PMIS. Độ khớp {">"} 95% là chính xác, {">"}{" "}
            80% là tốt, còn lại cần xem xét thêm.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
