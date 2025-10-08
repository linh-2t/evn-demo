import { BarChart3, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PmisRecord } from "@/types";

type Props = {
  database: PmisRecord[];
};

export function PmisDatabaseTable({ database }: Props) {
  return (
    <Card className="flex h-full flex-col border-0 bg-white/80 shadow-gray-500/10 shadow-lg backdrop-blur-sm">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Database className="h-5 w-5 text-blue-600" />
          Cơ Sở Dữ Liệu PMIS ({database.length})
        </CardTitle>
        <CardAction>
          <Button size="icon-sm" title="Analytics" variant="ghost">
            <BarChart3 className="h-4 w-4 text-gray-600" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <div className="h-full overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-blue-50">
              <TableRow className="hover:bg-blue-50">
                <TableHead className="font-semibold text-blue-700 text-xs">
                  ASSETID
                </TableHead>
                <TableHead className="font-semibold text-blue-700 text-xs">
                  ASSET_NAME
                </TableHead>
                <TableHead className="font-semibold text-blue-700 text-xs">
                  NO
                </TableHead>
                <TableHead className="font-semibold text-blue-700 text-xs">
                  LOCATION
                </TableHead>
                <TableHead className="font-semibold text-blue-700 text-xs">
                  MANUFACTURER
                </TableHead>
                <TableHead className="font-semibold text-blue-700 text-xs">
                  DATE
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {database.map((record, idx) => (
                <TableRow
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  key={idx}
                >
                  <TableCell className="font-medium text-xs">
                    <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
                      {record.ASSETID}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">{record.ASSET_NAME}</TableCell>
                  <TableCell className="text-center text-xs">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 font-semibold text-green-800 text-xs">
                      {record.NO}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">{record.LOCATION}</TableCell>
                  <TableCell className="text-xs">
                    {record.MANUFACTURER}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs">
                    {record.DATE}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
