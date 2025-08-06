import React, { useCallback, useState } from 'react';
import { Form, Input, DatePicker, Switch, Row, Col, Tag, Upload, type FormInstance, type UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { LookupSelect, LitigantSearch, ConsultantSearch, CitySelect } from '@/shared/components/lookup';
import { LookupTypes, type LookupItem } from '@/shared/types/lookup';

const { TextArea } = Input;
const { Dragger } = Upload;

interface CaseInfoStepProps {
  form: FormInstance<any>;
  mode: 'create' | 'edit';
  tags: string[];
  setTags: (tags: string[]) => void;
  inputTag: string;
  setInputTag: (tag: string) => void;
  uploadProps: UploadProps;
}

export const CaseInfoStep: React.FC<CaseInfoStepProps> = ({
  form,
  mode,
  tags,
  setTags,
  inputTag,
  setInputTag,
  uploadProps
}) => {
  const { t } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState<LookupItem | null>(null);

  // const handleLitigantChange = useCallback((value: Litigant | Litigant[] | null) => form.setFieldValue('litigants', value), [form]);
  // const handleConsultantChange = useCallback((value: Consultant | Consultant[] | null) => form.setFieldValue('additionalConsultants', value), [form]);
  const handleCityChange = useCallback((value: LookupItem | null) => form.setFieldValue('city', value), [form]);
  const handleLookupChange = useCallback(() => { }, []);

  const handleDistrictChange = useCallback((value: LookupItem | null) => {
    setSelectedDistrict(value);
    if (value !== selectedDistrict) form.setFieldValue('city', null);
  }, [form, selectedDistrict]);


  const handleTagClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  const handleTagInputConfirm = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Basic Information Section */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.BASIC_INFORMATION')}</h3>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label={t('CASES.CASE_TITLE')}
              rules={[
                { required: true, message: t('CASES.CASE_TITLE_REQUIRED') },
                { max: 150, message: t('CASES.CASE_TITLE_MAX_LENGTH') }
              ]}
            >
              <Input
                placeholder={t('CASES.ENTER_CASE_TITLE')}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="number"
              label={t('CASES.CASE_NUMBER')}
              rules={[{ required: true, message: t('CASES.CASE_NUMBER_REQUIRED') }]}
            >
              <Input
                placeholder={t('CASES.ENTER_CASE_NUMBER')}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="description"
              label={t('CASES.CASE_DESCRIPTION')}
              rules={[
                { min: 5, message: t('CASES.CASE_DESCRIPTION_MIN_LENGTH') },
                { max: 1000, message: t('CASES.CASE_DESCRIPTION_MAX_LENGTH') }
              ]}
            >
              <TextArea
                rows={5}
                placeholder={t('CASES.ENTER_CASE_DESCRIPTION')}
                style={{ fontSize: '14px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="isAgainstStc"
              label={t('CASES.IS_AGAINST_STC')}
              valuePropName="checked"
            >
              <Switch size="default" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="caseFilingDate"
              label={t('CASES.CASE_FILING_DATE')}
              rules={[{ required: true, message: t('CASES.CASE_FILING_DATE_REQUIRED') }]}
            >
              <DatePicker
                placeholder={t('CASES.SELECT_CASE_FILING_DATE')}
                size="large"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Case Classification Section */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.CASE_CLASSIFICATION')}</h3>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={8}>
            <Form.Item
              name="internalClient"
              label={t('CASES.INTERNAL_CLIENT')}
              rules={[{ required: true, message: t('CASES.INTERNAL_CLIENT_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.InternalClient}
                placeholder={t('CASES.SELECT_INTERNAL_CLIENT')}
                onChange={handleLookupChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="caseType"
              label={t('CASES.CASE_TYPE')}
              rules={[{ required: true, message: t('CASES.CASE_TYPE_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.CaseType}
                placeholder={t('CASES.SELECT_CASE_TYPE')}
                onChange={handleLookupChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="lawsuitType"
              label={t('CASES.LAWSUIT_TYPE')}
              rules={[{ required: true, message: t('CASES.LAWSUIT_TYPE_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.JudgmentTypes}
                placeholder={t('CASES.SELECT_LAWSUIT_TYPE')}
                onChange={handleLookupChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="caseLevel"
              label={t('CASES.CASE_LEVEL')}
              rules={[{ required: true, message: t('CASES.CASE_LEVEL_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.CaseLevel}
                placeholder={t('CASES.SELECT_CASE_LEVEL')}
                onChange={handleLookupChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="specializedCourt"
              label={t('CASES.SPECIALIZED_COURT')}
              rules={[{ required: true, message: t('CASES.SPECIALIZED_COURT_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.Courts}
                placeholder={t('CASES.SELECT_SPECIALIZED_COURT')}
                onChange={handleLookupChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="district"
              label={t('CASES.REGION')}
              rules={[{ required: true, message: t('CASES.REGION_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.District}
                placeholder={t('CASES.SELECT_REGION')}
                onChange={handleDistrictChange}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Location Section */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.LOCATION')}</h3>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="city"
              label={t('CASES.CITY')}
              rules={[{ required: true, message: t('CASES.CITY_REQUIRED') }]}
            >
              <CitySelect
                districtId={selectedDistrict?.id || null}
                placeholder={t('CASES.SELECT_CITY')}
                onChange={handleCityChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={t('CASES.TAGS')}>
              <div className="border border-gray-300 rounded-md p-2 min-h-[40px] flex flex-wrap items-center gap-1">
                {tags.map(tag => (
                  <Tag
                    key={tag}
                    closable
                    onClose={() => handleTagClose(tag)}
                    className="mb-1"
                  >
                    {tag}
                  </Tag>
                ))}
                <Input
                  type="text"
                  size="small"
                  style={{
                    width: 120,
                    height: '28px',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                  value={inputTag}
                  onChange={e => setInputTag(e.target.value)}
                  onBlur={handleTagInputConfirm}
                  onPressEnter={handleTagInputConfirm}
                  placeholder={t('CASES.ADD_TAG')}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Parties Section */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.PARTIES')}</h3>
        <Row gutter={[16, 8]}>
          <Col xs={24}>
            <Form.Item
              name="litigants"
              label={t('CASES.LITIGANTS')}
              rules={[{ required: true, message: t('CASES.LITIGANTS_REQUIRED') }]}
            >
              <LitigantSearch
                placeholder={t('CASES.SELECT_LITIGANTS')}
                mode="multiple"
                size="large"
                onChange={() => { }}
              />
            </Form.Item>
          </Col>
          {mode === 'create' && (
            <Col xs={24}>
              <Form.Item
                name="additionalConsultants"
                label={t('CASES.ADDITIONAL_CONSULTANTS')}
              >
                <ConsultantSearch
                  placeholder={t('CASES.SELECT_CONSULTANTS')}
                  mode="multiple"
                  size="large"
                  onChange={() => { }}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </div>

      {/* Attachments Section - Only in create mode */}
      {mode === 'create' && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.ATTACHMENTS')}</h3>
          <Form.Item>
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
          </Form.Item>
        </div>
      )}
    </div>
  );
};