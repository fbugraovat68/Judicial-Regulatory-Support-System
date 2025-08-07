import React from 'react';
import { Row, Col, Tag, type FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import { CasePriority } from '../../../types/case';

interface PreviewStepProps {
  form: FormInstance<any>;
  tags: string[];
  fileList: any[];
  mode: 'create' | 'edit';
}

export const PreviewStep: React.FC<PreviewStepProps> = ({
  form,
  tags,
  fileList,
  mode
}) => {
  const { t } = useTranslation();
  const formValues = form.getFieldsValue(true);

  const formatDate = (date: any) => {
    if (!date) return '-';
    return typeof date === 'string' ? date : date.format('YYYY-MM-DD');
  };

  const getLookupDisplayName = (lookupItem: any) => {
    if (!lookupItem) return '-';
    return lookupItem.nameEn || lookupItem.name || lookupItem.value || '-';
  };

  const getLitigantsDisplay = (litigants: any[]) => {
    if (!litigants || litigants.length === 0) return '-';
    return litigants.map((lit: any) => lit.nameEn || lit.name || lit.fullName).join(', ');
  };

  const getConsultantsDisplay = (consultants: any[]) => {
    if (!consultants || consultants.length === 0) return '-';
    return consultants.map((cons: any) => cons.nameEn || cons.name || cons.fullName).join(', ');
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
      {/* Basic Information Preview */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-semibold">📋</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{t('CASES.BASIC_INFORMATION')}</h3>
        </div>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.CASE_TITLE')}:</span>
                <p className="text-gray-800 font-medium">{formValues.name || '-'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.CASE_NUMBER')}:</span>
                <p className="text-gray-800">{formValues.number || '-'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.CASE_FILING_DATE')}:</span>
                <p className="text-gray-800">{formatDate(formValues.caseFilingDate)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.IS_AGAINST_STC')}:</span>
                <p className="text-gray-800">{formValues.isAgainstStc ? t('COMMON.YES') : t('COMMON.NO')}</p>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.INTERNAL_CLIENT')}:</span>
                <p className="text-gray-800">{getLookupDisplayName(formValues.internalClient)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.CASE_TYPE')}:</span>
                <p className="text-gray-800">{getLookupDisplayName(formValues.caseType)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.LAWSUIT_TYPE')}:</span>
                <p className="text-gray-800">{getLookupDisplayName(formValues.lawsuitType)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.CASE_LEVEL')}:</span>
                <p className="text-gray-800">{getLookupDisplayName(formValues.caseLevel)}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Location & Parties Preview */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-semibold">🏛️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{t('CASES.LOCATION_AND_PARTIES')}</h3>
        </div>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.SPECIALIZED_COURT')}:</span>
                <p className="text-gray-800">{getLookupDisplayName(formValues.specializedCourt)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.REGION')}:</span>
                <p className="text-gray-800">{getLookupDisplayName(formValues.district)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.CITY')}:</span>
                <p className="text-gray-800">{getLookupDisplayName(formValues.city)}</p>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.LITIGANTS')}:</span>
                <p className="text-gray-800">{getLitigantsDisplay(formValues.litigants)}</p>
              </div>
              {mode === 'create' && (
                <div>
                  <span className="text-sm font-medium text-gray-600">{t('CASES.ADDITIONAL_CONSULTANTS')}:</span>
                  <p className="text-gray-800">{getConsultantsDisplay(formValues.additionalConsultants)}</p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.TAGS')}:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tags.length > 0 ? (
                    tags.map(tag => (
                      <Tag key={tag} color="blue">{tag}</Tag>
                    ))
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Decision Information Preview */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-semibold">⚖️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{t('CASES.DECISION_INFORMATION')}</h3>
        </div>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.DECISION_NUMBER')}:</span>
                <p className="text-gray-800">{formValues.caseInformation?.decisionNumber || '-'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.DECISION_DATE')}:</span>
                <p className="text-gray-800">{formatDate(formValues.caseInformation?.decisionDate)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.PRIORITY')}:</span>
                <p className="text-gray-800">
                  {formValues.caseInformation?.priority ? t(formValues.caseInformation.priority) : '-'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.FINE_AMOUNT')}:</span>
                <p className="text-gray-800">{formValues.caseInformation?.fineAmount || '-'}</p>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.LOSS_RATIO')}:</span>
                <p className="text-gray-800">{formValues.caseInformation?.lossRatio ? `${formValues.caseInformation.lossRatio}%` : '-'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.REPAYMENT_AMOUNT')}:</span>
                <p className="text-gray-800">{formValues.caseInformation?.repaymentAmount || '-'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">{t('CASES.IS_CONFIDENTIAL')}:</span>
                <p className="text-gray-800">{formValues.caseInformation?.isConfidential ? t('COMMON.YES') : t('COMMON.NO')}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Attachments Preview */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-semibold">📎</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{t('CASES.ATTACHMENTS')}</h3>
          <span className="ml-auto text-sm text-gray-500">
            {fileList.length} {t('CASES.FILE_COUNT')}
          </span>
        </div>
        
        {fileList.length > 0 ? (
          <div className="space-y-2">
            {fileList.map((file) => (
              <div
                key={file.uid}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📄</span>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{file.name}</span>
                    <span className="text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">{t('CASES.NO_ATTACHMENTS')}</p>
        )}
      </div>

      {/* Case Description Preview */}
      {formValues.description && (
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{t('CASES.CASE_DESCRIPTION')}</h3>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">{formValues.description}</p>
          </div>
        </div>
      )}

      {/* Consultant Opinion Preview */}
      {formValues.caseInformation?.consultantOpinion && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{t('CASES.CONSULTANT_OPINION')}</h3>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">{formValues.caseInformation.consultantOpinion}</p>
          </div>
        </div>
      )}
    </div>
  );
}; 