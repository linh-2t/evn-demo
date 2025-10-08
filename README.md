# 🏢⚡ EVN AI Document Processing Demo

Ứng dụng demo thông minh cho **EVNNPC** (Tổng công ty Điện lực Miền Bắc) - Hệ thống xử lý tài liệu tự động sử dụng AI, OCR và đối soát dữ liệu PMIS.

## ✨ Tính năng chính

- 🤖 **AI OCR**: Trích xuất dữ liệu thông minh từ tài liệu PDF, Word, Excel
- 🔍 **PMIS Integration**: Đối soát tự động với cơ sở dữ liệu PMIS
- 📊 **Data Validation**: Kiểm tra và xác thực dữ liệu với gợi ý sửa lỗi
- 🗃️ **Binary Decoding**: Giải mã và xử lý dữ liệu từ assets database
- 📈 **Real-time Processing**: Xử lý file đồng thời với progress tracking
- 🎨 **Modern UI**: Giao diện hiện đại với shadcn/ui components

## 🚀 Getting Started

### Yêu cầu hệ thống
- Node.js 18+ hoặc Bun
- Modern browser với ES2020+ support

### Cài đặt và chạy

```bash
# Clone repository
git clone https://github.com/linh-2t/evn-demo.git
cd evn-demo

# Cài đặt dependencies
bun install

# Chạy development server
bun --bun run start
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

### Build cho Production

```bash
bun --bun run build
```

### Testing

```bash
bun --bun run test
```

## 🏗️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Routing**: TanStack Router (file-based)
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Testing**: Vitest

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── demo/         # EVN demo components
├── hooks/            # Custom React hooks
├── lib/              # Utilities và helpers
├── types/            # TypeScript type definitions
├── assets/           # Static assets (logos, images)
└── routes/           # TanStack Router routes
```

## 🔧 Development

### Thêm shadcn/ui components

```bash
pnpx shadcn@latest add button
```

## 🎯 Demo Scenarios

Ứng dụng mô phỏng các tình huống thực tế trong xử lý tài liệu điện lực:

### 📤 Upload Mode
- Upload files từ máy tính (PDF, Word, Excel)
- Xử lý OCR và trích xuất dữ liệu thiết bị
- Đối soát với database PMIS
- Hiển thị kết quả validation và gợi ý sửa lỗi

### 🗄️ Database Mode  
- Chọn assets từ encoded database
- Giải mã binary files tự động
- Xử lý đồng thời nhiều documents
- So sánh và chỉnh sửa dữ liệu trực tiếp

### 📊 Data Processing Features
- **Smart OCR**: Confidence scoring và error detection
- **PMIS Matching**: Similarity scoring với multiple matches
- **Data Validation**: Real-time validation với suggestions
- **Progress Tracking**: Live processing status với detailed stages

## 🎨 UI Components

### Custom Components
```tsx
// File processing với real-time status
<FilesProcessing files={files} onFileClick={handleClick} />

// PMIS matching với multiple results
<PmisMatch result={processingResult} />

// Interactive comparison table
<ComparisonTable data={extractedData} onEdit={handleEdit} />

// Database tables với equal heights
<PmisDatabaseTable database={pmisData} />
<EncodedAssetsTable assets={encodedAssets} />
```

## 📋 Key Features Detail

### 🔍 OCR Processing
- **Multi-format support**: PDF, Word, Excel documents
- **Confidence scoring**: 0-100% accuracy measurement
- **Error detection**: Automatic quality assessment
- **Text extraction**: Smart field recognition

### 🏢 PMIS Integration  
- **Database matching**: Automatic similarity scoring
- **Multiple candidates**: Shows alternative matches
- **Field mapping**: Configurable column mapping
- **Data validation**: Real-time error checking

### 🎛️ Interactive Interface
- **Real-time progress**: Live processing status
- **Edit capabilities**: Inline data editing
- **Status indicators**: Clear visual feedback
- **Responsive design**: Mobile-friendly layout

## 🗂️ Test Data

Demo sử dụng dữ liệu mẫu realistic:

### Assets Database (12 items)
- Máy biến áp các loại: 160kVA → 1000kVA
- Tủ điều khiển, tủ phân phối
- Đường dây trung thế/hạ thế  
- Cáp ngầm, phụ kiện cách điện

### PMIS Database (15 records)
- Thông tin thiết bị điện hoàn chỉnh
- Địa điểm đa dạng: An Tảo, Bình Thuận, Tân Phú...
- Nhà sản xuất: Siemens, ABB, Schneider, Hyundai...
- Thông số kỹ thuật realistic

### Processing Scenarios
- **Perfect match** (98-100%): Dữ liệu chính xác hoàn toàn
- **High match** (85-94%): Minor warnings cần xem xét
- **Medium match** (70-84%): Validation issues cần sửa
- **Poor match** (30-49%): OCR quality thấp
- **Very poor match** (0-29%): Tài liệu không đọc được

## 🚀 Deployment

### Build tối ưu
```bash
# Build production với optimizations
bun run build

# Preview build locally  
bun run preview
```

### Environment Variables
```bash
# .env.local
VITE_APP_TITLE="EVN AI Document Processing"
VITE_API_BASE_URL="https://api.evn.vn"
```

### Static Hosting
Deploy trên các platform:
- **Vercel**: Automatic deployment từ GitHub
- **Netlify**: Drag-and-drop hoặc Git integration  
- **GitHub Pages**: Static hosting miễn phí
- **AWS S3 + CloudFront**: Enterprise deployment

## 📖 Documentation

### API Reference
- **File Processing**: `POST /api/process-file`
- **PMIS Query**: `GET /api/pmis/search`
- **Asset Decoding**: `POST /api/decode-asset`

### Components API
```tsx
// Main demo component
import { EvnDemo } from '@/components/demo/evn-demo'

// Individual components
import { FilesProcessing } from '@/components/demo/files-processing'
import { PmisMatch } from '@/components/demo/pmis-match'
import { ComparisonTable } from '@/components/demo/comparison-table'
```

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: ESLint + Prettier configuration
2. **Commit Convention**: Conventional Commits
3. **TypeScript**: Strict mode enabled
4. **Testing**: Component tests với Vitest

### Contribution Steps
```bash
# Fork repository
git clone https://github.com/your-username/evn-demo.git

# Create feature branch  
git checkout -b feature/your-feature-name

# Make changes và test
bun run test

# Commit với conventional format
git commit -m "feat: add new OCR processing feature"

# Push và create PR
git push origin feature/your-feature-name
```

## 📞 Support

### Issues & Bugs
- **GitHub Issues**: [Report bugs](https://github.com/linh-2t/evn-demo/issues)
- **Feature Requests**: [Suggest features](https://github.com/linh-2t/evn-demo/discussions)

### Documentation
- **TanStack Router**: [Documentation](https://tanstack.com/router)
- **shadcn/ui**: [Component Library](https://ui.shadcn.com)
- **Tailwind CSS**: [Utility Classes](https://tailwindcss.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About EVNNPC

**Tổng công ty Điện lực Miền Bắc (EVNNPC)** là một trong những đơn vị thành viên chủ chốt của Tập đoàn Điện lực Việt Nam (EVN), chuyên phân phối và bán lẻ điện tại khu vực phía Bắc Việt Nam.

### Mission
Cung cấp điện năng an toàn, ổn định và chất lượng cao cho khách hàng, đồng thời ứng dụng công nghệ hiện đại để nâng cao hiệu quả quản lý và vận hành hệ thống điện.

---

**Built with ❤️ for EVNNPC** • Powered by modern web technologies


