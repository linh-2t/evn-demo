import { useEvnDemo } from "@/hooks/use-evn-demo";
import { calculateStats } from "@/lib/demo-utils";
import { ComparisonTable } from "./comparison-table";
import { DemoHeader } from "./demo-header";
import { DocumentAnalysis } from "./document-analysis";
import { EncodedAssetsTable } from "./encoded-assets-table";
import { ExtractedDataGrid } from "./extracted-data-grid";
import { FilesProcessing } from "./files-processing";
import { PmisDatabaseTable } from "./pmis-database-table";
import { PmisMatch } from "./pmis-match";
import { SettingsDialog } from "./settings-dialog";
import { StatsGrid } from "./stats-grid";
import { ValidationIssues } from "./validation-issues";

export function EvnDemo() {
  const {
    mode,
    showSettings,
    selectedAssets,
    uploadedFiles,
    selectedFile,
    editingRows,
    editingMapping,
    pmisDatabase,
    pmisMapping,
    encodedAssets,
    setShowSettings,
    setSelectedAssets,
    setEditingMapping,
    handleModeChange,
    handleFileUpload,
    handleDecodeAssets,
    handleCsvUpload,
    handleMappingEdit,
    handleMappingSave,
    handleRowAction,
    handleFileClick,
  } = useEvnDemo();

  const stats = calculateStats(uploadedFiles);

  const handleAssetToggle = (assetId: string, selected: boolean) => {
    if (selected) {
      setSelectedAssets((prev) => [...prev, assetId]);
    } else {
      setSelectedAssets((prev) => prev.filter((id) => id !== assetId));
    }
  };

  const handleEditStart = () => {
    setEditingMapping({ ...pmisMapping });
  };

  const handleEditCancel = () => {
    setEditingMapping(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-3 lg:p-4">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* Header */}
        <DemoHeader
          mode={mode}
          onModeChange={handleModeChange}
          onSettingsClick={() => setShowSettings(true)}
          onUploadClick={handleFileUpload}
        />

        {/* Settings Dialog */}
        <SettingsDialog
          editingMapping={editingMapping}
          onCsvUpload={handleCsvUpload}
          onEditCancel={handleEditCancel}
          onEditStart={handleEditStart}
          onMappingEdit={handleMappingEdit}
          onMappingSave={handleMappingSave}
          onOpenChange={setShowSettings}
          open={showSettings}
          pmisMapping={pmisMapping}
        />

        {/* Stats */}
        <StatsGrid stats={stats} />

        {/* Database Tables - Equal heights */}
        {mode === "database" && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <EncodedAssetsTable
              assets={encodedAssets}
              onAssetToggle={handleAssetToggle}
              onDecodeAssets={handleDecodeAssets}
              selectedAssets={selectedAssets}
            />
            <PmisDatabaseTable database={pmisDatabase} />
          </div>
        )}

        {/* Upload mode - PMIS table full width, no fixed height */}
        {mode === "upload" && <PmisDatabaseTable database={pmisDatabase} />}

        {/* Files Processing - Full width */}
        <FilesProcessing
          files={uploadedFiles}
          onFileClick={handleFileClick}
          selectedFile={selectedFile}
        />

        {/* Analysis Results - Choose one card for full width */}
        {selectedFile?.result && (
          <>
            {/* ExtractedDataGrid - Full width for better data visibility */}
            <ExtractedDataGrid extractedData={selectedFile.result.extracted} />

            {/* PMIS Match and Issues - 2 columns */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <PmisMatch result={selectedFile.result} />
              <ValidationIssues issues={selectedFile.result.validation} />
            </div>

            {/* Document Analysis - Full width for detail viewing */}
            <DocumentAnalysis result={selectedFile.result} />
          </>
        )}

        {/* Comparison Table */}
        {selectedFile?.result?.extracted && (
          <ComparisonTable
            editingRows={editingRows}
            onRowAction={handleRowAction}
            pmisMapping={pmisMapping}
            selectedFile={selectedFile}
          />
        )}
      </div>
    </div>
  );
}
