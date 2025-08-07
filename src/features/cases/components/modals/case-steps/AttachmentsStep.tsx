import React from 'react';
import { Upload, type UploadProps } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Dragger } = Upload;

interface AttachmentsStepProps {
  uploadProps: UploadProps;
  fileList: any[];
  setFileList: (files: any[]) => void;
}

export const AttachmentsStep: React.FC<AttachmentsStepProps> = ({
  uploadProps,
  fileList,
  setFileList
}) => {
  const { t } = useTranslation();

  const handleRemoveFile = (fileToRemove: any) => {
    setFileList(fileList.filter(file => file.uid !== fileToRemove.uid));
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'zip':
        return '📦';
      default:
        return '📎';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-semibold">📎</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{t('CASES.ATTACHMENTS')}</h3>
        </div>
        
        <Dragger {...uploadProps} className="upload-dragger">
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          </p>
          <p className="ant-upload-text text-lg font-medium">
            {t('CASES.DRAG_FILES_HERE')}
          </p>
          <p className="ant-upload-hint text-gray-500">
            {t('CASES.DRAG_HINT_TEXT')}
          </p>
          <div className="mt-2 text-sm text-gray-400">
            {t('CASES.SUPPORTED_FORMATS')}: .doc, .docx, .xls, .xlsx, .pdf, .zip
          </div>
          <div className="text-sm text-gray-400">
            {t('CASES.MAX_FILE_SIZE')}: 10MB
          </div>
        </Dragger>
      </div>

      {/* File List */}
      {fileList.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{t('CASES.UPLOADED_FILES')}</h3>
            <span className="ml-auto text-sm text-gray-500">
              {fileList.length} {t('CASES.FILE_COUNT')}
            </span>
          </div>
          
          <div className="space-y-3">
            {fileList.map((file) => (
              <div
                key={file.uid}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileIcon(file.name)}</span>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{file.name}</span>
                    <span className="text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFile(file)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  title={t('CASES.REMOVE_FILE')}
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-semibold">ℹ️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{t('CASES.UPLOAD_GUIDELINES')}</h3>
        </div>
        
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{t('CASES.GUIDELINE_1')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{t('CASES.GUIDELINE_2')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{t('CASES.GUIDELINE_3')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{t('CASES.GUIDELINE_4')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 