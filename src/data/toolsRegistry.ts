import { 
  Combine, 
  SplitSquareHorizontal, 
  Minimize2, 
  FileText, 
  ImageIcon, 
  RotateCw, 
  Trash2, 
  GripHorizontal, 
  Stamp, 
  Hash, 
  Lock, 
  Unlock, 
  PenTool, 
  ScanText,
  FileSpreadsheet,
  Layers,
  Sparkles,
  FileCode,
  FileImage,
  RefreshCw,
  FolderPlus,
  Compass,
  FileMinus,
  Binary,
  Maximize2,
  Bookmark,
  ShieldCheck,
  Percent,
  Compass as CompassIcon,
  BookOpen,
  Scissors,
  CheckSquare,
  Filter,
  Eye,
  FileCheck,
  EyeOff,
  UserCheck,
  Key,
  FolderKey,
  Printer,
  History,
  Info,
  Calendar,
  AlertTriangle,
  HelpCircle,
  Award,
  Link as LinkIcon,
  Tag,
  Copy,
  PlusSquare,
  Grid,
  TrendingDown,
  Layout,
  ListOrdered,
  FileSignature,
  FileDown,
  Scaling,
  FlipHorizontal,
  Table,
  PenBox,
  FileUp,
  Sliders,
  Type,
  List,
  Edit3,
  Crop,
  Search,
  Book,
  Code,
  Archive,
  Wrench,
  Activity,
  FileWarning
} from 'lucide-react';

export interface PDFTool {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  bg: string;
  link: string;
  category: string;
  isCustomPage?: boolean;
  inputAccept?: string;
  parameters?: {
    name: string;
    label: string;
    type: 'text' | 'password' | 'number' | 'checkbox' | 'select' | 'color';
    defaultValue?: any;
    options?: string[];
    min?: number;
    max?: number;
  }[];
}

export const iconMap: Record<string, any> = {
  Combine, 
  SplitSquareHorizontal, 
  Minimize2, 
  FileText, 
  ImageIcon, 
  RotateCw, 
  Trash2, 
  GripHorizontal, 
  Stamp, 
  Hash, 
  Lock, 
  Unlock, 
  PenTool, 
  ScanText,
  FileSpreadsheet,
  Layers,
  Sparkles,
  FileCode,
  FileImage,
  RefreshCw,
  FolderPlus,
  Compass,
  FileMinus,
  Binary,
  Maximize2,
  Bookmark,
  ShieldCheck,
  Percent,
  BookOpen,
  Scissors,
  CheckSquare,
  Filter,
  Eye,
  FileCheck,
  EyeOff,
  UserCheck,
  Key,
  FolderKey,
  Printer,
  History,
  Info,
  Calendar,
  AlertTriangle,
  HelpCircle,
  Award,
  LinkIcon,
  Tag,
  Copy,
  PlusSquare,
  Grid,
  TrendingDown,
  Layout,
  ListOrdered,
  FileSignature,
  FileDown,
  Scaling,
  FlipHorizontal,
  Table,
  PenBox,
  FileUp,
  Sliders,
  Type,
  List,
  Edit3,
  Crop,
  Search,
  Book,
  Code,
  Archive,
  Wrench,
  Activity,
  FileWarning
};

export const tools: PDFTool[] = [
  // --- Existing Custom Pages (16) ---
  { id: 'merge', name: 'Merge PDF', description: 'Combine multiple PDFs into one unified document.', iconName: 'Combine', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-950/50', link: '/tools/merge', category: 'page-control', isCustomPage: true },
  { id: 'split', name: 'Split PDF', description: 'Extract pages or split a PDF into multiple files.', iconName: 'SplitSquareHorizontal', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-950/50', link: '/tools/split', category: 'page-control', isCustomPage: true },
  { id: 'compress', name: 'Compress PDF', description: 'Reduce file size while maintaining visual quality.', iconName: 'Minimize2', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-950/50', link: '/tools/compress', category: 'optimization', isCustomPage: true },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDFs to editable Word documents.', iconName: 'FileText', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-950/50', link: '/tools/pdf-to-word', category: 'convert', isCustomPage: true },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents into PDF files.', iconName: 'FileText', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-950/50', link: '/tools/word-to-pdf', category: 'convert', isCustomPage: true },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Extract images or convert each page to JPG.', iconName: 'ImageIcon', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-950/50', link: '/tools/pdf-to-jpg', category: 'convert', isCustomPage: true },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert multiple images into a single PDF.', iconName: 'ImageIcon', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-950/50', link: '/tools/jpg-to-pdf', category: 'convert', isCustomPage: true },
  { id: 'rotate', name: 'Rotate PDF', description: 'Rotate pages in your PDF document easily.', iconName: 'RotateCw', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-950/50', link: '/tools/rotate', category: 'page-control', isCustomPage: true },
  { id: 'delete-pages', name: 'Delete Pages', description: 'Remove specific pages from your PDF.', iconName: 'Trash2', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-950/50', link: '/tools/delete-pages', category: 'page-control', isCustomPage: true },
  { id: 'rearrange', name: 'Rearrange Pages', description: 'Change the order of pages in your PDF.', iconName: 'GripHorizontal', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-950/50', link: '/tools/rearrange', category: 'page-control', isCustomPage: true },
  { id: 'watermark', name: 'Watermark', description: 'Add text or image watermarks to your PDF.', iconName: 'Stamp', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-950/50', link: '/tools/watermark', category: 'visual', isCustomPage: true },
  { id: 'page-numbers', name: 'Page Numbers', description: 'Insert page numbers into your PDF document.', iconName: 'Hash', color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-200 dark:bg-slate-800', link: '/tools/page-numbers', category: 'visual', isCustomPage: true },
  { id: 'protect', name: 'Protect PDF', description: 'Encrypt your PDF with a password.', iconName: 'Lock', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-950/50', link: '/tools/protect', category: 'security', isCustomPage: true },
  { id: 'unlock', name: 'Unlock PDF', description: 'Remove passwords and restrictions.', iconName: 'Unlock', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-950/50', link: '/tools/unlock', category: 'security', isCustomPage: true },
  { id: 'sign', name: 'Sign PDF', description: 'Add your signature to PDF documents.', iconName: 'PenTool', color: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/50', link: '/tools/sign', category: 'security', isCustomPage: true },
  { id: 'ocr', name: 'OCR PDF', description: 'Extract searchable text from scanned PDFs.', iconName: 'ScanText', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-100 dark:bg-violet-950/50', link: '/tools/ocr', category: 'optimization', isCustomPage: true },
  { id: 'compiler', name: 'Code Compiler', description: 'Interactive Web IDE and dynamic compiler for HTML, CSS, JS, Python, C++, Java, Rust, Go, PHP, and Ruby.', iconName: 'Code', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-950/50', link: '/compiler', category: 'convert', isCustomPage: true },

  // --- 100 NEW Dynamic Tools ---
  
  // PAGE CONTROL CATEGORY (15 New Tools)
  {
    id: 'reverse-pages',
    name: 'Reverse Pages',
    description: 'Invert the page sequence of your PDF (last page becomes first).',
    iconName: 'RefreshCw',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-950/50',
    link: '/tools/reverse-pages',
    category: 'page-control',
    inputAccept: '.pdf'
  },
  {
    id: 'insert-blank-page',
    name: 'Insert Blank Page',
    description: 'Add a clean, unlined blank sheet inside any index of a PDF.',
    iconName: 'FolderPlus',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    link: '/tools/insert-blank-page',
    category: 'page-control',
    inputAccept: '.pdf',
    parameters: [
      { name: 'position', label: 'Insert Position (Index)', type: 'number', defaultValue: 1, min: 1 },
      { name: 'pageSize', label: 'Page Dimension Preset', type: 'select', defaultValue: 'A4', options: ['A4', 'LETTER', 'LEGAL'] }
    ]
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    description: 'Define exact page crop margins to clean up empty borders.',
    iconName: 'Crop',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/50',
    link: '/tools/crop-pdf',
    category: 'page-control',
    inputAccept: '.pdf',
    parameters: [
      { name: 'margin', label: 'Border Trim (Points)', type: 'number', defaultValue: 20, min: 0 }
    ]
  },
  {
    id: 'duplicate-pages',
    name: 'Duplicate Pages',
    description: 'Clone and repeat every individual page sequentially.',
    iconName: 'Copy',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    link: '/tools/duplicate-pages',
    category: 'page-control',
    inputAccept: '.pdf'
  },
  {
    id: 'extract-even-pages',
    name: 'Extract Even Pages',
    description: 'Quickly output a new document containing only pages 2, 4, 6, etc.',
    iconName: 'Scissors',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/extract-even-pages',
    category: 'page-control',
    inputAccept: '.pdf'
  },
  {
    id: 'extract-odd-pages',
    name: 'Extract Odd Pages',
    description: 'Quickly output a new document containing only pages 1, 3, 5, etc.',
    iconName: 'Scissors',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-950/50',
    link: '/tools/extract-odd-pages',
    category: 'page-control',
    inputAccept: '.pdf'
  },
  {
    id: 'n-up-grid',
    name: 'N-Up Page Grid',
    description: 'Format multiple catalog pages into a grid on a single canvas page.',
    iconName: 'Grid',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-950/50',
    link: '/tools/n-up-grid',
    category: 'page-control',
    inputAccept: '.pdf',
    parameters: [
      { name: 'cols', label: 'Columns Per Grid Page', type: 'select', defaultValue: '2', options: ['2', '4', '6'] }
    ]
  },
  {
    id: 'resize-pages',
    name: 'Resize PDF Pages',
    description: 'Adjust document layouts into standardized Letter or A4 scale.',
    iconName: 'Scaling',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/resize-pages',
    category: 'page-control',
    inputAccept: '.pdf',
    parameters: [
      { name: 'scalePreset', label: 'Target Dimension Layout', type: 'select', defaultValue: 'Letter', options: ['Letter', 'A4', 'A3', 'Legal'] }
    ]
  },
  {
    id: 'split-halfway',
    name: 'Split Halfway',
    description: 'Divide a document cleanly into two separate equivalent files.',
    iconName: 'SplitSquareHorizontal',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    link: '/tools/split-halfway',
    category: 'page-control',
    inputAccept: '.pdf'
  },
  {
    id: 'merge-alternating',
    name: 'Merge Alternating',
    description: 'Interleave page flows between two selected source documents.',
    iconName: 'Combine',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    link: '/tools/merge-alternating',
    category: 'page-control',
    inputAccept: '.pdf'
  },
  {
    id: 'strip-attachments',
    name: 'Strip Attachments',
    description: 'Purge internal reference files or documents embedded inside.',
    iconName: 'FileMinus',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-950/50',
    link: '/tools/strip-attachments',
    category: 'page-control',
    inputAccept: '.pdf'
  },
  {
    id: 'rotate-even',
    name: 'Rotate Even Pages',
    description: 'Apply target rotation strictly to all even-indexed pages.',
    iconName: 'RotateCw',
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/50',
    link: '/tools/rotate-even',
    category: 'page-control',
    inputAccept: '.pdf',
    parameters: [
      { name: 'angle', label: 'Degrees to Spin', type: 'select', defaultValue: '90', options: ['90', '180', '270'] }
    ]
  },
  {
    id: 'rotate-odd',
    name: 'Rotate Odd Pages',
    description: 'Apply target rotation strictly to all odd-indexed pages.',
    iconName: 'RotateCw',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/50',
    link: '/tools/rotate-odd',
    category: 'page-control',
    inputAccept: '.pdf',
    parameters: [
      { name: 'angle', label: 'Degrees to Spin', type: 'select', defaultValue: '90', options: ['90', '180', '270'] }
    ]
  },
  {
    id: 'mirror-margins',
    name: 'Mirror Page Margins',
    description: 'Invert page layout margins for double-sided document binders.',
    iconName: 'FlipHorizontal',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    link: '/tools/mirror-margins',
    category: 'page-control',
    inputAccept: '.pdf'
  },
  {
    id: 'add-page-padding',
    name: 'Add Page Padding',
    description: 'Expand dimensions to pad layouts and isolate dense content.',
    iconName: 'Maximize2',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/add-page-padding',
    category: 'page-control',
    inputAccept: '.pdf',
    parameters: [
      { name: 'padding', label: 'Padding Level (Points)', type: 'number', defaultValue: 30, min: 5 }
    ]
  },

  // CONVERT CATEGORY (30 New Tools)
  {
    id: 'png-to-pdf',
    name: 'PNG to PDF',
    description: 'Convert PNG graphics into formatted, high-contrast PDF sheets.',
    iconName: 'ImageIcon',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    link: '/tools/png-to-pdf',
    category: 'convert',
    inputAccept: '.png'
  },
  {
    id: 'pdf-to-png',
    name: 'PDF to PNG',
    description: 'Rasterize layout content into crystal-clear PNG frame sequences.',
    iconName: 'ImageIcon',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/pdf-to-png',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'txt-to-pdf',
    name: 'Text to PDF',
    description: 'Generate standard typewriter PDF documents from local plain text logs.',
    iconName: 'FileText',
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-900',
    link: '/tools/txt-to-pdf',
    category: 'convert',
    inputAccept: '.txt',
    parameters: [
      { name: 'fontSize', label: 'Font Size', type: 'number', defaultValue: 12, min: 8, max: 24 },
      { name: 'lineHeight', label: 'Line Spacing', type: 'select', defaultValue: '1.5', options: ['1.0', '1.25', '1.5', '2.0'] }
    ]
  },
  {
    id: 'pdf-to-txt',
    name: 'PDF to Text',
    description: 'Scan document layouts and parse out readable string components.',
    iconName: 'FileText',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    link: '/tools/pdf-to-txt',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'csv-to-pdf',
    name: 'CSV to PDF Table',
    description: 'Convert database tables or spreadsheet logs into elegant grid sheets.',
    iconName: 'FileSpreadsheet',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-950/50',
    link: '/tools/csv-to-pdf',
    category: 'convert',
    inputAccept: '.csv'
  },
  {
    id: 'pdf-to-csv',
    name: 'PDF to CSV Text',
    description: 'Extract raw catalog grids into data CSV configurations.',
    iconName: 'FileSpreadsheet',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/pdf-to-csv',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'md-to-pdf',
    name: 'Markdown to PDF',
    description: 'Render structured Markdown text into a fully formatted PDF document.',
    iconName: 'FileCode',
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/50',
    link: '/tools/md-to-pdf',
    category: 'convert',
    inputAccept: '.md',
    parameters: [
      { name: 'theme', label: 'Visual Theme Layout', type: 'select', defaultValue: 'Default', options: ['Default', 'Gothic Serif', 'Console Mono'] }
    ]
  },
  {
    id: 'pdf-to-md',
    name: 'PDF to Markdown',
    description: 'Compile page paragraphs into elegant plain-text markdown lines.',
    iconName: 'FileCode',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-950/50',
    link: '/tools/pdf-to-md',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    description: 'Render standalone code structures or local portals into layout files.',
    iconName: 'Code',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-950/50',
    link: '/tools/html-to-pdf',
    category: 'convert',
    inputAccept: '.html'
  },
  {
    id: 'pdf-to-html',
    name: 'PDF to HTML Code',
    description: 'Convert layout vectors into standard, responsive HTML containers.',
    iconName: 'Code',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/50',
    link: '/tools/pdf-to-html',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'gif-to-pdf',
    name: 'GIF to PDF',
    description: 'Consolidate visual frames of static GIFs into PDF slides.',
    iconName: 'ImageIcon',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    link: '/tools/gif-to-pdf',
    category: 'convert',
    inputAccept: '.gif'
  },
  {
    id: 'bmp-to-pdf',
    name: 'BMP to PDF',
    description: 'Transform bitmap pixel arrays into high-density PDF pages.',
    iconName: 'FileImage',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/bmp-to-pdf',
    category: 'convert',
    inputAccept: '.bmp'
  },
  {
    id: 'webp-to-pdf',
    name: 'WebP to PDF',
    description: 'Convert lightweight WebP browser images into durable PDF layouts.',
    iconName: 'FileImage',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    link: '/tools/webp-to-pdf',
    category: 'convert',
    inputAccept: '.webp'
  },
  {
    id: 'svg-to-pdf',
    name: 'SVG Vector to PDF',
    description: 'Scale infinitely scalable vectors inside high-resolution PDF canvases.',
    iconName: 'Layers',
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/50',
    link: '/tools/svg-to-pdf',
    category: 'convert',
    inputAccept: '.svg'
  },
  {
    id: 'pdf-to-svg',
    name: 'PDF to SVG Elements',
    description: 'Deconstruct layout graphs into fully editable SVG design shapes.',
    iconName: 'Layers',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/pdf-to-svg',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'epub-to-pdf',
    name: 'EPUB Ebook to PDF',
    description: 'Reflow book text chapters into solid print-ready PDF formats.',
    iconName: 'Book',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-950/50',
    link: '/tools/epub-to-pdf',
    category: 'convert',
    inputAccept: '.epub'
  },
  {
    id: 'pdf-to-epub',
    name: 'PDF to EPUB ebook',
    description: 'Extract text feeds into lightweight reflowable standard ePub models.',
    iconName: 'Book',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-950/50',
    link: '/tools/pdf-to-epub',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF Grid',
    description: 'Format standard .xlsx workbooks into perfectly constrained static page margins.',
    iconName: 'FileSpreadsheet',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-950/50',
    link: '/tools/excel-to-pdf',
    category: 'convert',
    inputAccept: '.xlsx'
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel Sheets',
    description: 'Parse text layout grid vectors back into workable data tables.',
    iconName: 'FileSpreadsheet',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    link: '/tools/pdf-to-excel',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'powerpoint-to-pdf',
    name: 'PowerPoint to PDF',
    description: 'Convert slider deck .pptx charts into landscape standard PDF presentation booklets.',
    iconName: 'Layout',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    link: '/tools/powerpoint-to-pdf',
    category: 'convert',
    inputAccept: '.pptx'
  },
  {
    id: 'pdf-to-powerpoint',
    name: 'PDF to PPT Slides',
    description: 'Convert layout segments into vector presentation slider grids.',
    iconName: 'Layout',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-950/50',
    link: '/tools/pdf-to-powerpoint',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'json-to-pdf',
    name: 'JSON to PDF Schema',
    description: 'Format nested Javascript object structures into elegant printable structures.',
    iconName: 'Code',
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-900',
    link: '/tools/json-to-pdf',
    category: 'convert',
    inputAccept: '.json'
  },
  {
    id: 'rtf-to-pdf',
    name: 'RTF to PDF File',
    description: 'Convert standard rich text alignments into cross-platform readable layout files.',
    iconName: 'FileText',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/rtf-to-pdf',
    category: 'convert',
    inputAccept: '.rtf'
  },
  {
    id: 'odt-to-pdf',
    name: 'ODT to PDF Document',
    description: 'Render open-source OpenDocument office templates into print forms.',
    iconName: 'FileText',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-950/50',
    link: '/tools/odt-to-pdf',
    category: 'convert',
    inputAccept: '.odt'
  },
  {
    id: 'pdf-to-odt',
    name: 'PDF to ODT text',
    description: 'Extract standard layouts back into local open-source formatting engines.',
    iconName: 'FileText',
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/50',
    link: '/tools/pdf-to-odt',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'keynote-to-pdf',
    name: 'Keynote to PDF Slides',
    description: 'Format slider structures created on macOS into PDF documents.',
    iconName: 'Layout',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    link: '/tools/keynote-to-pdf',
    category: 'convert',
    inputAccept: '.key'
  },
  {
    id: 'pages-to-pdf',
    name: 'Pages to PDF File',
    description: 'Convert iOS Apple Pages documents into standard PDF pages.',
    iconName: 'FileText',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    link: '/tools/pages-to-pdf',
    category: 'convert',
    inputAccept: '.pages'
  },
  {
    id: 'numbers-to-pdf',
    name: 'Numbers to PDF Sheet',
    description: 'Format iOS Numbers sheets into clean, scaled PDF grids.',
    iconName: 'FileSpreadsheet',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/numbers-to-pdf',
    category: 'convert',
    inputAccept: '.numbers'
  },
  {
    id: 'pdf-to-rtf',
    name: 'PDF to RTF text',
    description: 'Parse layout paragraphs into cross-compatibility rich text configs.',
    iconName: 'FileText',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-950/50',
    link: '/tools/pdf-to-rtf',
    category: 'convert',
    inputAccept: '.pdf'
  },
  {
    id: 'zip-pdfs',
    name: 'ZIP to PDF Bundle',
    description: 'Unpack zip archives containing multiple documents and consolidate them.',
    iconName: 'Archive',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/50',
    link: '/tools/zip-pdfs',
    category: 'convert',
    inputAccept: '.zip'
  },

  // SECURITY CATEGORY (15 New Tools)
  {
    id: 'redact-pdf',
    name: 'Redact PDF Text',
    description: 'Permanently draw black security blocks over confidential strings.',
    iconName: 'EyeOff',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-950/50',
    link: '/tools/redact-pdf',
    category: 'security',
    inputAccept: '.pdf',
    parameters: [
      { name: 'searchWord', label: 'Exact Word/Phrase to Censor', type: 'text', defaultValue: 'CONFIDENTIAL' }
    ]
  },
  {
    id: 'sanitize-metadata',
    name: 'Sanitize Metadata',
    description: 'Wipe camera specs, system names, author identifiers, and editing times.',
    iconName: 'ShieldCheck',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/sanitize-metadata',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'set-owner-password',
    name: 'Set Permissions Password',
    description: 'Prevent readers from printing, editing, or copying text arrays.',
    iconName: 'FolderKey',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/set-owner-password',
    category: 'security',
    inputAccept: '.pdf',
    parameters: [
      { name: 'ownerPassword', label: 'Admin Security Password', type: 'password' },
      { name: 'allowPrinting', label: 'Permit Printing Documents', type: 'checkbox', defaultValue: false },
      { name: 'allowCopying', label: 'Permit Text Copying', type: 'checkbox', defaultValue: false }
    ]
  },
  {
    id: 'sign-invisible',
    name: 'Invisible Digital Sign',
    description: 'Apply high-security certificate vectors without disturbing layout prints.',
    iconName: 'FileSignature',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-950/50',
    link: '/tools/sign-invisible',
    category: 'security',
    inputAccept: '.pdf',
    parameters: [
      { name: 'signerName', label: 'Signer Identity', type: 'text', defaultValue: 'Secure Token' }
    ]
  },
  {
    id: 'verify-signature',
    name: 'Verify PDF Signature',
    description: 'Audit certificates to ensure the document integrity was never modified.',
    iconName: 'UserCheck',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    link: '/tools/verify-signature',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'add-digital-id',
    name: 'Add Cryptographic ID',
    description: 'Add a timestamped digital stamp guaranteeing layout authenticity.',
    iconName: 'Award',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    link: '/tools/add-digital-id',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'lock-editing',
    name: 'Strict Lock Editing',
    description: 'Seal input forms, rendering fields entirely immutable for readers.',
    iconName: 'Lock',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-950/50',
    link: '/tools/lock-editing',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'restrict-printing',
    name: 'Disable PDF Print',
    description: 'Inject direct parameters blockading page requests by browser printer queues.',
    iconName: 'Printer',
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-200 dark:bg-slate-800',
    link: '/tools/restrict-printing',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'secure-redact-image',
    name: 'Redact PDF Images',
    description: 'Sanitize embedded photographic layers to clear corporate logs.',
    iconName: 'EyeOff',
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/50',
    link: '/tools/secure-redact-image',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'randomize-metadata',
    name: 'Randomize ID Headers',
    description: 'Scramble system ID identifiers inside file structure definitions.',
    iconName: 'Key',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    link: '/tools/randomize-metadata',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'verify-compliance',
    name: 'Verify PDF/A compliance',
    description: 'Validate structure tags for archival digital storage standards.',
    iconName: 'FileCheck',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-950/50',
    link: '/tools/verify-compliance',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'watermark-security',
    name: 'Security Carbon Copy',
    description: 'Apply semi-transparent copyright grids on every segment layer.',
    iconName: 'Stamp',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-100 dark:bg-cyan-950/50',
    link: '/tools/watermark-security',
    category: 'security',
    inputAccept: '.pdf',
    parameters: [
      { name: 'watermarkText', label: 'Coded Grid text', type: 'text', defaultValue: 'COPYRIGHT COPY' }
    ]
  },
  {
    id: 'inject-eula',
    name: 'Inject License Page',
    description: 'Insert regulatory usage terms directly as page one of a document.',
    iconName: 'FileText',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    link: '/tools/inject-eula',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'disable-copy-paste',
    name: 'Block Text Copying',
    description: 'Re-encode letter symbols to complicate standard text selection and copy.',
    iconName: 'FileWarning',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/50',
    link: '/tools/disable-copy-paste',
    category: 'security',
    inputAccept: '.pdf'
  },
  {
    id: 'add-expiration-tag',
    name: 'Add Expiration Notice',
    description: 'Inject visual warning labels pointing readers to layout update limits.',
    iconName: 'Calendar',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    link: '/tools/add-expiration-tag',
    category: 'security',
    inputAccept: '.pdf',
    parameters: [
      { name: 'expiryDate', label: 'Notice Expiration Date', type: 'text', defaultValue: '2027-12-31' }
    ]
  },

  // OPTIMIZATION CATEGORY (15 New Tools)
  {
    id: 'repair-pdf',
    name: 'Repair PDF Headers',
    description: 'Rebuild cross-reference layout indices to open damaged files.',
    iconName: 'Wrench',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    link: '/tools/repair-pdf',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'flatten-forms',
    name: 'Flatten PDF Forms',
    description: 'Bake interactive text field fills straight into durable canvas lines.',
    iconName: 'Layers',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    link: '/tools/flatten-forms',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'grayscale-pdf',
    name: 'Grayscale PDF Converter',
    description: 'Wipe colored layout vectors to save black cartridge print inks.',
    iconName: 'Sliders',
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-200 dark:bg-slate-800',
    link: '/tools/grayscale-pdf',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'linearize-web',
    name: 'Linearize for Web',
    description: 'Restructure streams so users can open page one before the full download completes.',
    iconName: 'Activity',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/linearize-web',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'compress-images-only',
    name: 'Compress Images Only',
    description: 'Downsample layout photograph resolutions while guarding vector fonts.',
    iconName: 'ImageIcon',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    link: '/tools/compress-images-only',
    category: 'optimization',
    inputAccept: '.pdf',
    parameters: [
      { name: 'quality', label: 'Quality Ratio (0.1 - 1.0)', type: 'number', defaultValue: 0.6, min: 0.1, max: 1.0 }
    ]
  },
  {
    id: 'strip-metadata-only',
    name: 'Strip Metadata Only',
    description: 'Wipe background text segments to slim document structures.',
    iconName: 'FileMinus',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-950/50',
    link: '/tools/strip-metadata-only',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'despeckle-scans',
    name: 'Despeckle scanned pages',
    description: 'Contrast scanned pages to filter ink splatters.',
    iconName: 'Sparkles',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/50',
    link: '/tools/despeckle-scans',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'crop-white-margins',
    name: 'Auto-Crop White Margins',
    description: 'Trim wide blank margins to maximize screen reading density.',
    iconName: 'Crop',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/crop-white-margins',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'strip-fonts',
    name: 'Strip Embedded Fonts',
    description: 'Rely on default computer fonts to drastically compress files.',
    iconName: 'Type',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    link: '/tools/strip-fonts',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'optimize-page-streams',
    name: 'Optimize Page Streams',
    description: 'Merge redundant styling matrices inside file configurations.',
    iconName: 'Binary',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-950/50',
    link: '/tools/optimize-page-streams',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'convert-fonts-subset',
    name: 'Subset PDF Fonts',
    description: 'Prune fonts down to strictly utilized characters.',
    iconName: 'Type',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-100 dark:bg-cyan-950/50',
    link: '/tools/convert-fonts-subset',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'remove-hidden-text',
    name: 'Purge Invisible Text',
    description: 'Clean background layers containing overlapping unrendered strings.',
    iconName: 'EyeOff',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    link: '/tools/remove-hidden-text',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'reduce-color-palette',
    name: 'Reduce Color Palette',
    description: 'Map layouts down to basic custom indexed color parameters.',
    iconName: 'Sliders',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-950/50',
    link: '/tools/reduce-color-palette',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'uncompress-pdf',
    name: 'Decompress PDF stream',
    description: 'Unpack binary streams into transparent, readable plain text.',
    iconName: 'Code',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-950/50',
    link: '/tools/uncompress-pdf',
    category: 'optimization',
    inputAccept: '.pdf'
  },
  {
    id: 'fix-page-ordering',
    name: 'Fix Struct Tree Nodes',
    description: 'Correct reading order structures for voice screen reader overlays.',
    iconName: 'ListOrdered',
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/50',
    link: '/tools/fix-page-ordering',
    category: 'optimization',
    inputAccept: '.pdf'
  },

  // VISUAL ELEMENTS CATEGORY (10 New Tools)
  {
    id: 'add-header-text',
    name: 'Add Custom Header text',
    description: 'Inject running headers or security classification levels on top.',
    iconName: 'Type',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/add-header-text',
    category: 'visual',
    inputAccept: '.pdf',
    parameters: [
      { name: 'headerText', label: 'Running Header Content', type: 'text', defaultValue: 'INTERNAL USE ONLY' },
      { name: 'alignment', label: 'Header Alignment', type: 'select', defaultValue: 'Center', options: ['Left', 'Center', 'Right'] }
    ]
  },
  {
    id: 'add-footer-text',
    name: 'Add Custom Footer text',
    description: 'Inject contact details or static footer strings on bottom margins.',
    iconName: 'Type',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    link: '/tools/add-footer-text',
    category: 'visual',
    inputAccept: '.pdf',
    parameters: [
      { name: 'footerText', label: 'Static Footer Content', type: 'text', defaultValue: 'Page Reference Folder' }
    ]
  },
  {
    id: 'add-page-borders',
    name: 'Add Elegant Borders',
    description: 'Draw geometric line frames around page layouts for corporate booklets.',
    iconName: 'Layout',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    link: '/tools/add-page-borders',
    category: 'visual',
    inputAccept: '.pdf',
    parameters: [
      { name: 'borderColor', label: 'Border Color Accent', type: 'color', defaultValue: '#3b82f6' },
      { name: 'borderWidth', label: 'Border Line Thickness (pt)', type: 'number', defaultValue: 2, min: 1, max: 10 }
    ]
  },
  {
    id: 'add-draft-stamp',
    name: 'Add DRAFT Stamp Layer',
    description: 'Overlay diagonal translucent DRAFT notices behind the layout.',
    iconName: 'Stamp',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-950/50',
    link: '/tools/add-draft-stamp',
    category: 'visual',
    inputAccept: '.pdf'
  },
  {
    id: 'add-barcode-placeholder',
    name: 'Inject Barcode stamp',
    description: 'Stitch visual tracking tags in page corner areas.',
    iconName: 'Binary',
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-200 dark:bg-slate-800',
    link: '/tools/add-barcode-placeholder',
    category: 'visual',
    inputAccept: '.pdf'
  },
  {
    id: 'add-confidential-banner',
    name: 'Add Top Warning Banner',
    description: 'Draw dynamic solid security warning backdrops with overlay texts.',
    iconName: 'FileWarning',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-950/50',
    link: '/tools/add-confidential-banner',
    category: 'visual',
    inputAccept: '.pdf'
  },
  {
    id: 'grayscale-images-only',
    name: 'Grayscale Image Stamps',
    description: 'Map background pictures into neutral high-contrast greyscale values.',
    iconName: 'Sliders',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/50',
    link: '/tools/grayscale-images-only',
    category: 'visual',
    inputAccept: '.pdf'
  },
  {
    id: 'add-logo-watermark',
    name: 'Embed Graphic Watermark',
    description: 'Place brand corporate logo files into the corner of all pages.',
    iconName: 'ImageIcon',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/add-logo-watermark',
    category: 'visual',
    inputAccept: '.pdf'
  },
  {
    id: 'add-line-rulers',
    name: 'Add Notebook Lines',
    description: 'Overlay transparent thin guide rules across canvas sheets.',
    iconName: 'List',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    link: '/tools/add-line-rulers',
    category: 'visual',
    inputAccept: '.pdf'
  },
  {
    id: 'add-colored-background',
    name: 'Tinge Page Canvas Background',
    description: 'Replace harsh white background layers with comfortable eye-saver warm colors.',
    iconName: 'Sliders',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-950/50',
    link: '/tools/add-colored-background',
    category: 'visual',
    inputAccept: '.pdf',
    parameters: [
      { name: 'bgColor', label: 'Background Palette', type: 'color', defaultValue: '#fefcbf' }
    ]
  },

  // DATA EXTRACTION CATEGORY (15 New Tools)
  {
    id: 'metadata-editor',
    name: 'Edit PDF Metadata',
    description: 'Set Title, Author, Subject, and Keywords inside document parameters.',
    iconName: 'Edit3',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/metadata-editor',
    category: 'data',
    inputAccept: '.pdf',
    parameters: [
      { name: 'title', label: 'Document Title', type: 'text', defaultValue: 'My Document' },
      { name: 'author', label: 'Author/Company Name', type: 'text', defaultValue: 'Author Name' },
      { name: 'subject', label: 'Subject/Project Name', type: 'text', defaultValue: 'Data Log' },
      { name: 'keywords', label: 'Search Index Keywords', type: 'text', defaultValue: 'PDF, Master, Document' }
    ]
  },
  {
    id: 'extract-images',
    name: 'Extract All Images',
    description: 'Pull all JPG/PNG images embedded inside pages out into a single download.',
    iconName: 'FileImage',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-950/50',
    link: '/tools/extract-images',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'count-words',
    name: 'Analyze & Count Words',
    description: 'Audit total vocabulary, reading time, and density statistics.',
    iconName: 'Search',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-950/50',
    link: '/tools/count-words',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'extract-hyperlinks',
    name: 'Extract PDF Hyperlinks',
    description: 'Parse out active target URL paths embedded across layout buttons.',
    iconName: 'LinkIcon',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    link: '/tools/extract-hyperlinks',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'list-fonts-used',
    name: 'List PDF Font Classes',
    description: 'Audit font face metadata configurations integrated inside pages.',
    iconName: 'Type',
    color: 'text-fuchsia-600 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/50',
    link: '/tools/list-fonts-used',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'extract-pdf-bookmarks',
    name: 'Extract Bookmarks Tree',
    description: 'Extract nested outline table-of-content labels into a markdown list.',
    iconName: 'Bookmark',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-950/50',
    link: '/tools/extract-pdf-bookmarks',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'create-outline',
    name: 'Build Table of Contents',
    description: 'Stitch clickable page-jump markers throughout file contents.',
    iconName: 'ListOrdered',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-100 dark:bg-sky-950/50',
    link: '/tools/create-outline',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'extract-attachments-list',
    name: 'Inspect File Attachments',
    description: 'List sub-document files packed inside the core XML hierarchy.',
    iconName: 'FolderPlus',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    link: '/tools/extract-attachments-list',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'view-structure-tree',
    name: 'View Layout Object Tree',
    description: 'Explore the underlying PDF node dictionary hierarchy for debugging.',
    iconName: 'Code',
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-200 dark:bg-slate-800',
    link: '/tools/view-structure-tree',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'compare-text-documents',
    name: 'Compare Two PDFs',
    description: 'Cross-check text lines between two file loads to identify additions or edits.',
    iconName: 'CheckSquare',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-950/50',
    link: '/tools/compare-text-documents',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'extract-tables',
    name: 'Extract Table Data',
    description: 'Heuristically group column fields into readable layout tables.',
    iconName: 'Table',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-950/50',
    link: '/tools/extract-tables',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'check-broken-links',
    name: 'Audit Broken Links',
    description: 'Validate external reference anchors to find expired web redirects.',
    iconName: 'AlertTriangle',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-950/50',
    link: '/tools/check-broken-links',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'identify-scanned-pages',
    name: 'Scan Image Page Ratio',
    description: 'Determine which percentage of sheets contains raw scanned graphics.',
    iconName: 'ScanText',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    link: '/tools/identify-scanned-pages',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'extract-form-fields',
    name: 'Extract Form Scheme',
    description: 'List name IDs and value pairs configured across form inputs.',
    iconName: 'FileSignature',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-100 dark:bg-cyan-950/50',
    link: '/tools/extract-form-fields',
    category: 'data',
    inputAccept: '.pdf'
  },
  {
    id: 'generate-hash',
    name: 'Calculate Document Hash',
    description: 'Generate SHA-256 and MD5 integrity hashes for legal compliance logs.',
    iconName: 'Binary',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    link: '/tools/generate-hash',
    category: 'data',
    inputAccept: '.pdf'
  }
];
