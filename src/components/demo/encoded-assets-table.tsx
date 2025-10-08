import { Binary, Zap } from "lucide-react";
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
import type { EncodedAsset } from "@/types";

type Props = {
  assets: readonly EncodedAsset[];
  selectedAssets: string[];
  onAssetToggle: (assetId: string, selected: boolean) => void;
  onDecodeAssets: () => void;
};

export function EncodedAssetsTable({
  assets,
  selectedAssets,
  onAssetToggle,
  onDecodeAssets,
}: Props) {
  return (
    <Card className="flex h-full flex-col border-0 bg-white/80 shadow-gray-500/10 shadow-lg backdrop-blur-sm">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Binary className="h-5 w-5 text-purple-600" />
          Assets Đã Mã Hóa
        </CardTitle>
        <CardAction>
          <Button
            className={`gap-1 font-semibold text-xs transition-all duration-200 ${
              selectedAssets.length > 0
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:from-green-700 hover:to-emerald-700"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
            disabled={selectedAssets.length === 0}
            onClick={onDecodeAssets}
            size="sm"
          >
            <Zap className="h-3 w-3" />
            Phân Tích AI ({selectedAssets.length})
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <div className="h-full overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-purple-50">
              <TableRow className="hover:bg-purple-50">
                <TableHead className="font-semibold text-purple-700 text-xs">
                  Chọn
                </TableHead>
                <TableHead className="font-semibold text-purple-700 text-xs">
                  Mã Asset
                </TableHead>
                <TableHead className="text-center font-semibold text-purple-700 text-xs">
                  Files
                </TableHead>
                <TableHead className="font-semibold text-purple-700 text-xs">
                  Dữ liệu Binary
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset, idx) => (
                <TableRow
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  key={asset.ASSET_ID}
                >
                  <TableCell className="text-xs">
                    <input
                      checked={selectedAssets.includes(asset.ASSET_ID)}
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      disabled={asset.FILE_COUNT === 0}
                      onChange={(e) =>
                        onAssetToggle(asset.ASSET_ID, e.target.checked)
                      }
                      type="checkbox"
                    />
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="rounded bg-purple-100 px-2 py-1 font-mono text-purple-800 text-xs">
                      {asset.ASSET_ID}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 font-semibold text-xs ${
                        asset.FILE_COUNT > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {asset.FILE_COUNT}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div
                      className="max-w-xs truncate text-gray-600 text-xs"
                      title={asset.FILES}
                    >
                      {asset.FILES || (
                        <span className="text-gray-400 italic">
                          Không có dữ liệu
                        </span>
                      )}
                    </div>
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
