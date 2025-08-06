import { FilePdfOutlined, FileWordOutlined, FileExcelOutlined, FilePptOutlined, FileZipOutlined, FileTextOutlined, FileImageOutlined, AudioOutlined, FileOutlined } from "@ant-design/icons";

const FILE_TYPE_ICON_MAP: Record<string, React.ElementType> = {
  pdf: FilePdfOutlined,
  doc: FileWordOutlined,
  docx: FileWordOutlined,
  xls: FileExcelOutlined,
  xlsx: FileExcelOutlined,
  ppt: FilePptOutlined,
  pptx: FilePptOutlined,
  zip: FileZipOutlined,
  rar: FileZipOutlined,
  txt: FileTextOutlined,
  jpg: FileImageOutlined,
  jpeg: FileImageOutlined,
  png: FileImageOutlined,
  gif: FileImageOutlined,
  csv: FileExcelOutlined,
  mp3: AudioOutlined,
  mp4: FileOutlined,
  default: FileOutlined,
};

export const getFileTypeIcon = (file: { name?: string; type?: string } | string | undefined | null): React.ElementType => {
  let ext = '';

  if (!file) return FILE_TYPE_ICON_MAP['default'];

  if (typeof file === 'string') {
    ext = file.split('.').pop()?.toLowerCase() || '';
  } else if (file.name) {
    ext = file.name.split('.').pop()?.toLowerCase() || '';
  } else if (file.type) {
    ext = file.type.split('/').pop()?.toLowerCase() || '';
  }

  return FILE_TYPE_ICON_MAP[ext] || FILE_TYPE_ICON_MAP['default'];
}; 