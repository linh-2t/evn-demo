import { useState } from "react";
import type {
  EditingRow,
  EncodedAsset,
  PmisMapping,
  PmisRecord,
  ProcessingFile,
  ProcessingResult,
} from "@/types";

const ENCODED_ASSETS: EncodedAsset[] = [
  {
    ASSET_ID: "MBA_21147546",
    NAME: "Máy biến áp T1 - 400kVA",
    STATUS: "active",
    FILE_COUNT: 3,
    BINARY_SIZE: "12.5 MB",
    FILES: "ly_lich_mba_1.pdf, bao_cao_kiem_dinh.pdf, bien_ban_nghiem_thu.docx",
  },
  {
    ASSET_ID: "MBA_028271",
    NAME: "Máy biến áp T2 - 250kVA",
    STATUS: "active",
    FILE_COUNT: 2,
    BINARY_SIZE: "8.3 MB",
    FILES: "thong_tin_ky_thuat.xlsx, hop_dong_mua.pdf",
  },
  {
    ASSET_ID: "MBA_033445",
    NAME: "Máy biến áp T3 - 630kVA",
    STATUS: "active",
    FILE_COUNT: 4,
    BINARY_SIZE: "18.7 MB",
    FILES:
      "ly_lich_thiet_bi.pdf, chung_chi_chat_luong.pdf, ban_ve_ky_thuat.dwg, bao_cao_test.pdf",
  },
  {
    ASSET_ID: "MBA_044782",
    NAME: "Máy biến áp T4 - 160kVA",
    STATUS: "active",
    FILE_COUNT: 3,
    BINARY_SIZE: "9.2 MB",
    FILES: "ho_so_thiet_bi.pdf, kiem_dinh_dinh_ky.pdf, huong_dan_van_hanh.docx",
  },
  {
    ASSET_ID: "MBA_055129",
    NAME: "Máy biến áp T5 - 1000kVA",
    STATUS: "active",
    FILE_COUNT: 5,
    BINARY_SIZE: "24.1 MB",
    FILES:
      "tai_lieu_ky_thuat.pdf, bao_cao_nghiem_thu.pdf, giay_phep_van_hanh.pdf, so_theo_doi.xlsx, anh_thuc_te.zip",
  },
  {
    ASSET_ID: "TU_066334",
    NAME: "Tủ điều khiển TU1",
    STATUS: "active",
    FILE_COUNT: 2,
    BINARY_SIZE: "6.8 MB",
    FILES: "so_tay_van_hanh.pdf, bang_thong_so.xlsx",
  },
  {
    ASSET_ID: "TU_077856",
    NAME: "Tủ phân phối TP1",
    STATUS: "active",
    FILE_COUNT: 3,
    BINARY_SIZE: "11.4 MB",
    FILES: "ban_ve_lap_rak.pdf, danh_sach_thiet_bi.xlsx, bao_cao_test.pdf",
  },
  {
    ASSET_ID: "DL_088493",
    NAME: "Đường dây 22kV - L1",
    STATUS: "active",
    FILE_COUNT: 1,
    BINARY_SIZE: "3.6 MB",
    FILES: "ban_do_tram.pdf",
  },
  {
    ASSET_ID: "DL_099821",
    NAME: "Đường dây 0.4kV - L2",
    STATUS: "active",
    FILE_COUNT: 2,
    BINARY_SIZE: "7.3 MB",
    FILES: "thiet_ke_mang.pdf, danh_sach_cot.xlsx",
  },
  {
    ASSET_ID: "CT_101147",
    NAME: "Cáp ngầm 22kV",
    STATUS: "active",
    FILE_COUNT: 3,
    BINARY_SIZE: "15.2 MB",
    FILES: "ho_so_cap.pdf, ket_qua_do.xlsx, anh_thi_cong.zip",
  },
  {
    ASSET_ID: "MBA_001",
    NAME: "MBA Test - Inactive",
    STATUS: "inactive",
    FILE_COUNT: 0,
    BINARY_SIZE: "0 MB",
    FILES: "",
  },
  {
    ASSET_ID: "PKG_112456",
    NAME: "Phụ kiện cách điện",
    STATUS: "active",
    FILE_COUNT: 1,
    BINARY_SIZE: "2.4 MB",
    FILES: "catalog_phu_kien.pdf",
  },
] as const;

const INITIAL_PMIS_DATABASE: PmisRecord[] = [
  {
    ASSETID: "MBA_21147546",
    ASSET_NAME: "400kVA-22-0.4kV An Tao Ha",
    NO: "42",
    LOCATION: "Phường An Tảo",
    MANUFACTURER: "Siemens",
    DATE: "27/11/2015",
  },
  {
    ASSETID: "MBA_028271",
    ASSET_NAME: "Máy biến áp 250kVA",
    NO: "10",
    LOCATION: "Phường An Tảo",
    MANUFACTURER: "ABB",
    DATE: "27/11/2015",
  },
  {
    ASSETID: "MBA_033445",
    ASSET_NAME: "630kVA-22-0.4kV Trạm Biến Áp TBA3",
    NO: "63",
    LOCATION: "Phường Bình Thuận",
    MANUFACTURER: "Schneider Electric",
    DATE: "15/03/2018",
  },
  {
    ASSETID: "MBA_044782",
    ASSET_NAME: "160kVA-22-0.4kV Trạm TBA4",
    NO: "16",
    LOCATION: "Xã Tân Phú",
    MANUFACTURER: "Hyundai Heavy Industries",
    DATE: "22/08/2019",
  },
  {
    ASSETID: "MBA_055129",
    ASSET_NAME: "1000kVA-22-0.4kV Trạm Trung Tâm",
    NO: "100",
    LOCATION: "Phường Trung Tâm",
    MANUFACTURER: "Siemens",
    DATE: "10/01/2020",
  },
  {
    ASSETID: "TU_066334",
    ASSET_NAME: "Tủ điều khiển trung thế 22kV",
    NO: "22",
    LOCATION: "Phường An Tảo",
    MANUFACTURER: "LSIS",
    DATE: "05/06/2017",
  },
  {
    ASSETID: "TU_077856",
    ASSET_NAME: "Tủ phân phối hạ thế 400V",
    NO: "04",
    LOCATION: "Phường Bình Thuận",
    MANUFACTURER: "Schneider Electric",
    DATE: "12/09/2018",
  },
  {
    ASSETID: "DL_088493",
    ASSET_NAME: "Đường dây trung thế 22kV - Tuyến 1",
    NO: "220",
    LOCATION: "Từ TBA đến Phường An Tảo",
    MANUFACTURER: "CADIVI",
    DATE: "20/04/2016",
  },
  {
    ASSETID: "DL_099821",
    ASSET_NAME: "Đường dây hạ thế 0.4kV - Tuyến 2",
    NO: "04",
    LOCATION: "Khu vực dân cư An Tảo",
    MANUFACTURER: "CADIVI",
    DATE: "30/07/2017",
  },
  {
    ASSETID: "CT_101147",
    ASSET_NAME: "Cáp ngầm XLPE 22kV - 3x185mm2",
    NO: "185",
    LOCATION: "Từ Trạm 110kV đến TBA3",
    MANUFACTURER: "FURUKAWA",
    DATE: "18/12/2019",
  },
  {
    ASSETID: "MBA_001",
    ASSET_NAME: "This is Test",
    NO: "2",
    LOCATION: "Phường An Tảo",
    MANUFACTURER: "This is Test",
    DATE: "27/11/2015",
  },
  {
    ASSETID: "PKG_112456",
    ASSET_NAME: "Bộ cách điện sứ 22kV",
    NO: "22",
    LOCATION: "Kho vật tư",
    MANUFACTURER: "NGK Insulators",
    DATE: "25/02/2021",
  },
  {
    ASSETID: "MBA_113789",
    ASSET_NAME: "315kVA-22-0.4kV Trạm TBA6",
    NO: "31",
    LOCATION: "Xã Đông Hải",
    MANUFACTURER: "ABB",
    DATE: "14/05/2021",
  },
  {
    ASSETID: "TU_124567",
    ASSET_NAME: "Tủ RMU 22kV - 3 ngăn",
    NO: "3",
    LOCATION: "Phường Trung Tâm",
    MANUFACTURER: "Schneider Electric",
    DATE: "08/11/2020",
  },
  {
    ASSETID: "DL_135891",
    ASSET_NAME: "Đường dây trung thế 22kV - Tuyến 3",
    NO: "220",
    LOCATION: "Từ TBA3 đến Xã Tân Phú",
    MANUFACTURER: "CADIVI",
    DATE: "19/09/2021",
  },
] as const;

const INITIAL_PMIS_MAPPING: PmisMapping = {
  equipment_code: "ASSETID",
  equipment_name: "ASSET_NAME",
  capacity: "NO",
  location: "LOCATION",
  manufacturer: "MANUFACTURER",
  date: "DATE",
} as const;

export function useEvnDemo() {
  const [mode, setMode] = useState<"upload" | "database">("upload");
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<ProcessingFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<ProcessingFile | null>(null);
  const [editingRows, setEditingRows] = useState<Record<string, EditingRow>>(
    {}
  );
  const [editingMapping, setEditingMapping] = useState<PmisMapping | null>(
    null
  );
  const [pmisDatabase, setPmisDatabase] = useState<PmisRecord[]>(
    INITIAL_PMIS_DATABASE
  );
  const [pmisMapping, setPmisMapping] =
    useState<PmisMapping>(INITIAL_PMIS_MAPPING);

  const clearState = () => {
    setUploadedFiles([]);
    setSelectedFile(null);
    setEditingRows({});
    setSelectedAssets([]);
  };

  const handleModeChange = (newMode: "upload" | "database") => {
    clearState();
    setMode(newMode);
  };

  const generateResult = (file: ProcessingFile): ProcessingResult => {
    const scenarios: ProcessingResult[] = [
      // Scenario 1: Perfect match (98-100%)
      {
        type: "exact_match",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y5ZmFmYiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjQwIiB5PSI2MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMyNTYzZWIiPkRPQ1VNRU5UIFNERU0gTUFZIEJJRU4gQVA8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+TWEgdGhpZXQgYmk6IE1CQV8yMTE0NzU0NjwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTMwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5UZW4gdGhpZXQgYmk6IDQwMGtWQS0yMi0wLjRrViBBbiBUYW8gSGE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+Q29uZyBzdWF0OiA0MjwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTkwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5WaSB0cmk6IFBoxrDhu51uZyBBbiBU4bqjbzwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5IYW5nIHNhbmcgeHVhdDogU2llbWVuczwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjUwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5OZ2F5IGxhcCBkYXQ6IDI3LzExLzIwMTU8L3RleHQ+PC9zdmc+",
        ocrText:
          "**DOCUMENT SDEM MAY BIEN AP**\n\nMa thiet bi: MBA_21147546\nTen thiet bi: 400kVA-22-0.4kV An Tao Ha\nCong suat: 42\nVi tri: Phường An Tảo\nHang sang xuat: Siemens\nNgay lap dat: 27/11/2015",
        ocrConfidence: 0.95,
        extracted: {
          equipment_code: { value: "MBA_21147546", confidence: 0.95 },
          equipment_name: {
            value: "400kVA-22-0.4kV An Tao Ha",
            confidence: 0.92,
          },
          capacity: { value: "42", confidence: 0.88 },
          location: { value: "Phường An Tảo", confidence: 0.85 },
          manufacturer: { value: "Siemens", confidence: 0.9 },
          date: { value: "27/11/2015", confidence: 0.87 },
        },
        pmisMatch: { similarity: 0.98, record: pmisDatabase[0] },
        validation: [],
      },

      // Scenario 2: High match (85-94%)
      {
        type: "exact_match",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VmZmVmNiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzg0Y2M0NCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iNDAiIHk9IjYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzM2NzUzMyI+QkFPIENBTyBLSUVNIERJTkg8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+TWEgdGhpZXQgYmk6IE1CQV8wMjgyNzE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+VGVuIHRoaWV0IGJpOiBNYXkgYmllbiBhcCAyNTBrVkE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+Q29uZyBzdWF0OiAxMC41a1ZBPC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIxOTAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiPlZpIHRyaTogUGh1b25nIEFuIFRhbzwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5OaGEgc2FuIHh1YXQ6IEFCQjwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjUwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5OZ2F5IGxhcCBkYXQ6IDI3LzExLzIwMTU8L3RleHQ+PC9zdmc+",
        ocrText:
          "**BAO CAO KIEM DINH**\n\nMa thiet bi: MBA_028271\nTen thiet bi: May bien ap 250kVA\nCong suat: 10.5kVA\nVi tri: Phuong An Tao\nNha san xuat: ABB\nNgay lap dat: 27/11/2015",
        ocrConfidence: 0.91,
        extracted: {
          equipment_code: { value: "MBA_028271", confidence: 0.94 },
          equipment_name: { value: "May bien ap 250kVA", confidence: 0.89 },
          capacity: { value: "10.5", confidence: 0.87 },
          location: { value: "Phuong An Tao", confidence: 0.88 },
          manufacturer: { value: "ABB", confidence: 0.92 },
          date: { value: "27/11/2015", confidence: 0.85 },
        },
        pmisMatch: { similarity: 0.91, record: pmisDatabase[1] },
        validation: [
          {
            field: "capacity",
            type: "warning",
            message: "Sai lệch nhỏ về đơn vị công suất (10.5 vs 10)",
            suggestion: "10",
          },
          {
            field: "location",
            type: "warning",
            message: "Thiếu từ 'Phường' trong địa chỉ",
            suggestion: "Phường An Tảo",
          },
        ],
      },

      // Scenario 3: Medium match (70-84%)
      {
        type: "has_errors",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZjdlZCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZiYzAyZCIgc3Ryb2tlLXdpZHRoPSIzIi8+PHRleHQgeD0iNDAiIHk9IjYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5USE9ORyBUSU4gVEhJRVQgQkk8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2RjMjYyNiI+TWEgc286IE1CQV8wMjgyNzE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2RjMjYyNiI+VGVuOiBNYXkgYmllbiBhcCAyNUBrVkE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2RjMjYyNiI+Q29uZyBzdWF0OiAxNTwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTkwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5WaSB0cmk6IFBoxrDhu51uZyBBbiBU4bqjbzwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5IYW5nOiBBQkIgVmlldG5hbTwvdGV4dD48L3N2Zz4=",
        ocrText:
          "**THONG TIN THIET BI**\n\nMa so: MBA_028271\nTen: May bien ap 25@kVA\nCong suat: 15\nVi tri: Phường An Tảo\nHang: ABB Vietnam",
        ocrConfidence: 0.78,
        extracted: {
          equipment_code: { value: "MBA_028271", confidence: 0.85 },
          equipment_name: { value: "May bien ap 25@kVA", confidence: 0.72 },
          capacity: { value: "15", confidence: 0.68 },
          location: { value: "Phường An Tảo", confidence: 0.88 },
          manufacturer: { value: "ABB Vietnam", confidence: 0.75 },
          date: { value: "", confidence: 0 },
        },
        pmisMatch: { similarity: 0.76, record: pmisDatabase[1] },
        validation: [
          {
            field: "equipment_name",
            type: "warning",
            message: "Tên thiết bị có ký tự đặc biệt không chuẩn (@)",
            suggestion: "Máy biến áp 250kVA",
          },
          {
            field: "capacity",
            type: "error",
            message: "Công suất không khớp với PMIS (15 vs 10)",
            suggestion: "10",
          },
          {
            field: "date",
            type: "error",
            message: "Không tìm thấy ngày lắp đặt",
            suggestion: "27/11/2015",
          },
        ],
      },

      // Scenario 2: Minor errors
      {
        type: "has_errors",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZjdlZCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZiYzAyZCIgc3Ryb2tlLXdpZHRoPSIzIi8+PHRleHQgeD0iNDAiIHk9IjYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5USE9ORyBUSU4gVEhJRVQgQkk8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2RjMjYyNiI+TWEgc286IE1CQV8wMjgyNzE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2RjMjYyNiI+VGVuOiBNYXkgYmllbiBhcCAyNUBrVkE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2RjMjYyNiI+Q29uZyBzdWF0OiAxNTwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTkwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5WaSB0cmk6IFBoxrDhu51uZyBBbiBU4bqjbzwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5IYW5nOiBBQkIgVmlldG5hbTwvdGV4dD48L3N2Zz4=",
        ocrText:
          "**THONG TIN THIET BI**\n\nMa so: MBA_028271\nTen: May bien ap 25@kVA\nCong suat: 15\nVi tri: Phường An Tảo\nHang: ABB Vietnam",
        ocrConfidence: 0.78,
        extracted: {
          equipment_code: { value: "MBA_028271", confidence: 0.85 },
          equipment_name: { value: "May bien ap 25@kVA", confidence: 0.72 },
          capacity: { value: "15", confidence: 0.68 },
          location: { value: "Phường An Tảo", confidence: 0.88 },
          manufacturer: { value: "ABB Vietnam", confidence: 0.75 },
          date: { value: "", confidence: 0 },
        },
        pmisMatch: { similarity: 0.82, record: pmisDatabase[1] },
        validation: [
          {
            field: "equipment_name",
            type: "warning",
            message: "Tên thiết bị có ký tự đặc biệt không chuẩn (@)",
            suggestion: "Máy biến áp 250kVA",
          },
          {
            field: "capacity",
            type: "error",
            message: "Công suất không khớp với PMIS (15 vs 10)",
            suggestion: "10",
          },
          {
            field: "manufacturer",
            type: "warning",
            message: "Tên nhà sản xuất chi tiết hơn PMIS",
            suggestion: "ABB",
          },
          {
            field: "date",
            type: "error",
            message: "Không tìm thấy ngày lắp đặt",
            suggestion: "27/11/2015",
          },
        ],
      },
      {
        type: "has_errors",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZjdlZCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZiYzAyZCIgc3Ryb2tlLXdpZHRoPSIzIi8+PHRleHQgeD0iNDAiIHk9IjYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5GaWxlOiBMw70gbOG7i2NoIE1CQSAxLnBkZjwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5Db2RlOiBNQkFfMDAxPC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIxMzAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNkYzI2MjYiPk5hbWU6IDQwMGtWQS0yMi0wLjRrViBBbiBUYW8gSGEgMjwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5DYXBhY2l0eTogNTI8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjE5MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+TG9jYXRpb246IFBoxrDhu51uZyBBbiBU4bqjbzwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5NYW51ZmFjdHVyZXI6IFNpZW1lbnMgVk48L3RleHQ+PC9zdmc+",
        ocrText:
          "**File:** Lý lịch MBA 1.pdf\n\nCode: MBA_001\nName: 400kVA-22-0.4kV An Tao Ha 2\nCapacity: 52\nLocation: Phường An Tảo\nManufacturer: Siemens VN",
        ocrConfidence: 0.72,
        extracted: {
          equipment_code: { value: "MBA_001", confidence: 0.65 },
          equipment_name: { value: "Lý lịch MBA 1.pdf", confidence: 0.6 },
          capacity: { value: "52", confidence: 0.58 },
          location: { value: "Phường An Tảo", confidence: 0.8 },
          manufacturer: { value: "Siemens VN", confidence: 0.7 },
          date: { value: "", confidence: 0 },
        },
        pmisMatch: { similarity: 0.85, record: pmisDatabase[0] },
        validation: [
          {
            field: "equipment_code",
            type: "warning",
            message: "Mã không chuẩn",
            suggestion: "MBA_21147546",
          },
          {
            field: "equipment_name",
            type: "error",
            message: "Tên file không phải tên thiết bị",
            suggestion: "400kVA-22-0.4kV An Tao Ha",
          },
          {
            field: "capacity",
            type: "error",
            message: "Giá trị khác PMIS",
            suggestion: "42",
          },
        ],
      },

      // Scenario 3: Low confidence OCR
      {
        type: "has_errors",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZWJlZSIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2VmNDQ0NCIgc3Ryb2tlLXdpZHRoPSIzIi8+PHRleHQgeD0iNDAiIHk9IjYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5Ij5UQUkgTElFVSBNQUdBIDIwMjM8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSI+TVM6IDBGMSE4T00yNzE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSI+VGVuOiBNYXkgYjEzbiB4cCAyIHBuIGtwQTwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5Ij5DbGluZzogSS9DPC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIxOTAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiPlZpdCByOiBQaMaw/J5uZyBBbjwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5Ij5Ibmcgc3g6ID9CQDM8L3RleHQ+PC9zdmc+",
        ocrText:
          "**TAI LIEU MAGA 2023**\n\nMS: 0F1A8OM271\nTen: May b13n xp 2 pn kpA\nCmg: I/C\nVit r: Phư?ng An\nHng sx: ?B A3",
        ocrConfidence: 0.45,
        extracted: {
          equipment_code: { value: "0F1A8OM271", confidence: 0.32 },
          equipment_name: { value: "May b13n xp 2 pn kpA", confidence: 0.28 },
          capacity: { value: "I/C", confidence: 0.15 },
          location: { value: "Phư?ng An", confidence: 0.45 },
          manufacturer: { value: "?B A3", confidence: 0.22 },
          date: { value: "", confidence: 0 },
        },
        pmisMatch: { similarity: 0.35, record: pmisDatabase[2] },
        validation: [
          {
            field: "equipment_code",
            type: "error",
            message:
              "Mã thiết bị không đọc được chính xác do chất lượng ảnh kém",
            suggestion: "MBA_001",
          },
          {
            field: "equipment_name",
            type: "error",
            message: "Tên thiết bị bị nhận dạng sai hoàn toàn",
            suggestion: "This is Test",
          },
          {
            field: "capacity",
            type: "error",
            message: "Công suất không thể nhận dạng",
            suggestion: "2",
          },
          {
            field: "manufacturer",
            type: "error",
            message: "Tên nhà sản xuất không đọc được",
            suggestion: "This is Test",
          },
        ],
      },

      // Scenario 4: Good quality, small discrepancy
      {
        type: "has_errors",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VmZmVmNiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzg0Y2M0NCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iNDAiIHk9IjYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzM2NzUzMyI+QkFPIENBTyBLSUVNIERJTkg8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+TWEgdGhpZXQgYmk6IE1CQV8wMjgyNzE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+VGVuIHRoaWV0IGJpOiBNYXkgYmllbiBhcCAyNTBrVkE8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiI+Q29uZyBzdWF0OiAxMC41a1ZBPC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIxOTAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiPlZpIHRyaTogUGh1b25nIEFuIFRhbzwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjIwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5OaGEgc2FuIHh1YXQ6IEFCQjwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMjUwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2Ij5OZ2F5IGxhcCBkYXQ6IDI3LzExLzIwMTU8L3RleHQ+PC9zdmc+",
        ocrText:
          "**BAO CAO KIEM DINH**\n\nMa thiet bi: MBA_028271\nTen thiet bi: May bien ap 250kVA\nCong suat: 10.5kVA\nVi tri: Phuong An Tao\nNha san xuat: ABB\nNgay lap dat: 27/11/2015",
        ocrConfidence: 0.91,
        extracted: {
          equipment_code: { value: "MBA_028271", confidence: 0.94 },
          equipment_name: { value: "May bien ap 250kVA", confidence: 0.89 },
          capacity: { value: "10.5", confidence: 0.87 },
          location: { value: "Phuong An Tao", confidence: 0.88 },
          manufacturer: { value: "ABB", confidence: 0.92 },
          date: { value: "27/11/2015", confidence: 0.85 },
        },
        pmisMatch: { similarity: 0.96, record: pmisDatabase[1] },
        validation: [
          {
            field: "capacity",
            type: "warning",
            message: "Sai lệch nhỏ về đơn vị công suất (10.5 vs 10)",
            suggestion: "10",
          },
          {
            field: "location",
            type: "warning",
            message: "Thiếu từ 'Phường' trong địa chỉ",
            suggestion: "Phường An Tảo",
          },
        ],
      },

      // Scenario 5: Poor match (30-49%)
      {
        type: "has_errors",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZlZjJmMiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2VmNDQ0NCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHRleHQgeD0iNDAiIHk9IjYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5T4bqjbiB0YWkgbGnhu4d1IC0gQ2jhuqV0IGzGsOG7o25nIHRo4bqldDwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5NYWM6IE0oI0A8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2RjMjYyNiI+VGVuOiAgPyBiaWVuID8/PC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIxNjAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNkYzI2MjYiPkNvbmc6ID8/PC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIxOTAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiPkFkZHJlc3M6ID8/PC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIyMjAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNkYzI2MjYiPk1mcjogPz88L3RleHQ+PC9zdmc+",
        ocrText:
          "**Sản tài liệu - Chất lượng thấp**\n\nMa: M(#@\nTen:  ? bien ??\nCong: ??\nAddress: ??\nMfr: ??",
        ocrConfidence: 0.35,
        extracted: {
          equipment_code: { value: "M(#@", confidence: 0.25 },
          equipment_name: { value: "? bien ??", confidence: 0.2 },
          capacity: { value: "??", confidence: 0.15 },
          location: { value: "??", confidence: 0.1 },
          manufacturer: { value: "??", confidence: 0.1 },
          date: { value: "", confidence: 0 },
        },
        pmisMatch: { similarity: 0.42, record: pmisDatabase[0] },
        validation: [
          {
            field: "equipment_code",
            type: "error",
            message: "Mã thiết bị không đọc được do chất lượng ảnh kém",
            suggestion: "Cần quét lại với chất lượng cao hơn",
          },
          {
            field: "equipment_name",
            type: "error",
            message: "Tên thiết bị bị mờ, không thể đọc",
            suggestion: "Cần quét lại",
          },
          {
            field: "capacity",
            type: "error",
            message: "Không thể xác định công suất",
            suggestion: "Cần bổ sung thông tin",
          },
          {
            field: "location",
            type: "error",
            message: "Địa chỉ không rõ ràng",
            suggestion: "Cần bổ sung thông tin",
          },
          {
            field: "manufacturer",
            type: "error",
            message: "Nhà sản xuất không thể xác định",
            suggestion: "Cần bổ sung thông tin",
          },
        ],
      },

      // Scenario 6: Very poor match (0-29%)
      {
        type: "has_errors",
        scanPreview:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZlZjJmMiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2RjMjYyNiIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHRleHQgeD0iNDAiIHk9IjYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij5UQUkgTElFVSBLSE9ORyBUSElUIEhPUDwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTAwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij4jIyMjIyNVbiMjIyMjPC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIxMzAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNkYzI2MjYiPiMjIyMjIyMjIzwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMTYwIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZGMyNjI2Ij4jIyNNQSMjIyM8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjE5MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2RjMjYyNiI+IyMjIyMjIyMjPC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSIyMjAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNkYzI2MjYiPiMjIyMjIyMjIzwvdGV4dD48L3N2Zz4=",
        ocrText:
          "**TAI LIEU KHONG THICH HOP**\n\n######Un#####\n#########\n###MA####\n#########\n#########",
        ocrConfidence: 0.15,
        extracted: {
          equipment_code: { value: "######Un#####", confidence: 0.05 },
          equipment_name: { value: "#########", confidence: 0.02 },
          capacity: { value: "###MA####", confidence: 0.03 },
          location: { value: "#########", confidence: 0.01 },
          manufacturer: { value: "#########", confidence: 0.01 },
          date: { value: "", confidence: 0 },
        },
        pmisMatch: { similarity: 0.18, record: pmisDatabase[0] },
        validation: [
          {
            field: "equipment_code",
            type: "error",
            message: "Tài liệu không thể đọc được - chất lượng quá kém",
            suggestion: "Cần quét lại hoặc cung cấp tài liệu khác",
          },
          {
            field: "equipment_name",
            type: "error",
            message: "Hoàn toàn không thể nhận dạng",
            suggestion: "Tài liệu không phù hợp",
          },
          {
            field: "capacity",
            type: "error",
            message: "Không có thông tin có thể trích xuất",
            suggestion: "Cần tài liệu rõ ràng hơn",
          },
          {
            field: "location",
            type: "error",
            message: "Không thể xác định",
            suggestion: "Cần nhập thủ công",
          },
          {
            field: "manufacturer",
            type: "error",
            message: "Hoàn toàn không rõ",
            suggestion: "Cần bổ sung thông tin",
          },
        ],
      },
    ];

    // Use different scenarios based on file characteristics with more variety
    let scenarioIndex = 0;
    if (file.assetId) {
      // For decoded assets, use scenario based on asset ID
      scenarioIndex = file.assetId.includes("21147546")
        ? 0 // Perfect match
        : file.assetId.includes("028271")
          ? 1 // High match
          : file.assetId.includes("001")
            ? 4 // Poor match
            : Math.floor(Math.random() * scenarios.length);
    } else {
      // For uploaded files, randomly select from all scenarios
      scenarioIndex = Math.floor(Math.random() * scenarios.length);
    }

    return scenarios[scenarioIndex];
  };

  const processFile = (file: ProcessingFile): void => {
    // Simulate different processing scenarios
    const shouldFail = Math.random() < 0.1; // 10% chance of failure

    type StageStatus =
      | "decoding"
      | "ocr"
      | "extracting"
      | "matching"
      | "validating"
      | "completed"
      | "error";

    const stages: Array<{
      status: StageStatus;
      stage: string;
      progress: number;
      duration: number;
    }> = [
      {
        status: "decoding",
        stage: "Giải mã Binary",
        progress: 15,
        duration: 600,
      },
      {
        status: "ocr",
        stage: "Xử lý OCR",
        progress: 35,
        duration: 1200,
      },
      {
        status: "extracting",
        stage: "Trích xuất dữ liệu",
        progress: 60,
        duration: 900,
      },
      {
        status: "matching",
        stage: "Đối soát PMIS",
        progress: 80,
        duration: 800,
      },
      {
        status: "validating",
        stage: "Kiểm tra dữ liệu",
        progress: 95,
        duration: 500,
      },
      {
        status: "completed",
        stage: "Hoàn thành",
        progress: 100,
        duration: 0,
      },
    ];

    // Add potential failure stage
    if (shouldFail) {
      const failStage = Math.floor(Math.random() * 4) + 1; // Fail at stage 1-4
      stages[failStage] = {
        status: "error",
        stage: `Lỗi: ${stages[failStage].stage}`,
        progress: stages[failStage].progress,
        duration: 1000,
      };
    }

    let currentStage = file.assetId ? 0 : 1;
    const startTime = Date.now();

    const updateStage = (): void => {
      if (currentStage >= stages.length) return;

      const { status, stage, progress, duration } = stages[currentStage];

      if (status === "error") {
        // Handle error state
        const errorMessages = [
          "Không thể giải mã file binary",
          "Chất lượng ảnh quá thấp để xử lý OCR",
          "Không tìm thấy thông tin thiết bị trong tài liệu",
          "Kết nối PMIS bị gián đoạn",
          "Dữ liệu không hợp lệ",
        ];

        const errorFile: ProcessingFile = {
          ...file,
          status: "error",
          stage,
          progress,
          errorMessage:
            errorMessages[Math.floor(Math.random() * errorMessages.length)],
          processingTime: `${((Date.now() - startTime) / 1000).toFixed(1)}s`,
        };

        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === file.id ? errorFile : f))
        );
        return;
      }

      if (status === "completed") {
        const result = generateResult(file);
        const completedFile: ProcessingFile = {
          ...file,
          status: "completed",
          stage,
          progress,
          result,
          processingTime: `${((Date.now() - startTime) / 1000).toFixed(1)}s`,
        };

        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === file.id ? completedFile : f))
        );

        // Auto select first completed file
        setTimeout(() => {
          setSelectedFile((prev) => {
            if (!prev && completedFile.result) {
              return completedFile;
            }
            return prev;
          });
        }, 100);
      } else {
        // Update progress
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status, stage, progress } : f
          )
        );

        setTimeout(() => {
          currentStage++;
          updateStage();
        }, duration);
      }
    };

    updateStage();
  };

  const handleFileUpload = (): void => {
    clearState();
    const newFiles: ProcessingFile[] = [
      {
        id: Date.now() + 1,
        name: "Lý lịch thiết bị MBA_T1.pdf",
        type: "PDF",
        size: "2.3 MB",
        status: "queued",
        progress: 0,
        stage: "Chờ xử lý",
      },
      {
        id: Date.now() + 2,
        name: "Bảng kê tài sản.xlsx",
        type: "Excel",
        size: "1.8 MB",
        status: "queued",
        progress: 0,
        stage: "Chờ xử lý",
      },
      {
        id: Date.now() + 3,
        name: "Hợp đồng mua sắm thiết bị.pdf",
        type: "PDF",
        size: "3.2 MB",
        status: "queued",
        progress: 0,
        stage: "Chờ xử lý",
      },
      {
        id: Date.now() + 4,
        name: "Biên bản nghiệm thu.docx",
        type: "Word",
        size: "1.2 MB",
        status: "queued",
        progress: 0,
        stage: "Chờ xử lý",
      },
    ];

    setUploadedFiles(newFiles);
    for (const [idx, file] of newFiles.entries()) {
      setTimeout(() => processFile(file), idx * 1000);
    }
  };

  const handleDecodeAssets = (): void => {
    if (selectedAssets.length === 0) return;

    clearState();
    const decodedFiles: ProcessingFile[] = selectedAssets.flatMap((assetId) => {
      const asset = ENCODED_ASSETS.find((a) => a.ASSET_ID === assetId);
      if (!asset || asset.FILE_COUNT === 0) return [];

      return Array.from({ length: asset.FILE_COUNT }, (_, i) => ({
        id: Date.now() + Math.random(),
        name: `${asset.ASSET_ID}_doc_${i + 1}.pdf`,
        type: "PDF",
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        status: "queued" as const,
        progress: 0,
        stage: "Chờ xử lý",
        assetId,
      }));
    });

    setUploadedFiles(decodedFiles);
    for (const [idx, file] of decodedFiles.entries()) {
      setTimeout(() => processFile(file), idx * 1000);
    }
    setSelectedAssets([]);
  };

  const handleCsvUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").map((row) => row.split(","));
      const headers = rows[0];
      const data: PmisRecord[] = rows
        .slice(1)
        .filter((row) => row.length === headers.length)
        .map((row) => {
          const obj: Record<string, string> = {};
          for (const [idx, header] of headers.entries()) {
            obj[header.trim()] = row[idx].trim();
          }
          return obj as PmisRecord;
        });
      setPmisDatabase((prev) => [...prev, ...data]);
    };
    reader.readAsText(file);
  };

  const handleMappingEdit = (field: keyof PmisMapping, value: string): void => {
    if (!editingMapping) return;
    setEditingMapping({ ...editingMapping, [field]: value });
  };

  const handleMappingSave = (): void => {
    if (editingMapping) {
      setPmisMapping(editingMapping);
      setEditingMapping(null);
    }
  };

  const handleRowAction = (
    field: string,
    action: string,
    newValue?: string
  ): void => {
    if (action === "approve" && selectedFile?.result) {
      setEditingRows((prev) => ({
        ...prev,
        [field]: {
          status: "approved",
          value: selectedFile.result?.extracted[field].value || "",
        },
      }));
    } else if (action === "edit") {
      setEditingRows((prev) => ({
        ...prev,
        [field]: { status: "editing", value: newValue },
      }));
    } else if (action === "save") {
      setEditingRows((prev) => ({
        ...prev,
        [field]: { status: "approved", value: newValue },
      }));
    } else if (action === "skip") {
      setEditingRows((prev) => ({ ...prev, [field]: { status: "skipped" } }));
    }
  };

  const handleFileClick = (file: ProcessingFile): void => {
    if (file.result) {
      setSelectedFile(file);
    }
  };

  return {
    // State
    mode,
    showSettings,
    selectedAssets,
    uploadedFiles,
    selectedFile,
    editingRows,
    editingMapping,
    pmisDatabase,
    pmisMapping,
    encodedAssets: ENCODED_ASSETS,

    // Actions
    setMode,
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
  };
}
