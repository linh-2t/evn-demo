import { AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ValidationIssue } from "@/types";

type Props = {
  issues: ValidationIssue[];
};

export function ValidationIssues({ issues }: Props) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <AlertCircle className="h-4 w-4 text-red-600" />
          Issues ({issues.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        {issues.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-gray-400">
            <div className="text-center">
              <AlertCircle className="mx-auto mb-2 h-8 w-8 opacity-30" />
              <p className="text-sm">Không có vấn đề nào</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {issues.map((issue, idx) => (
              <Card
                className={`border-2 ${
                  issue.type === "error"
                    ? "border-red-300 bg-red-50"
                    : "border-yellow-300 bg-yellow-50"
                }`}
                key={idx}
              >
                <CardContent className="p-2">
                  <div className="flex items-start gap-2">
                    {issue.type === "error" ? (
                      <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-xs">
                        {issue.field.toUpperCase()}
                      </p>
                      <p className="text-gray-700 text-xs">{issue.message}</p>
                      {issue.suggestion && (
                        <p className="mt-1 text-gray-700 text-xs">
                          💡 {issue.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
