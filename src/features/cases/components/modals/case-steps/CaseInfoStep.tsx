import React, { useCallback, useState } from 'react';
import { Form, Input, DatePicker, Switch, Row, Col, Tag, type FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import { LookupSelect, LitigantSearch, ConsultantSearch, CitySelect } from '@/shared/components/lookup';
import { LookupTypes, type LookupItem } from '@/shared/types/lookup';

const { TextArea } = Input;

interface CaseInfoStepProps {
  form: FormInstance<any>;
  mode: 'create' | 'edit';
  tags: string[];
  setTags: (tags: string[]) => void;
  inputTag: string;
  setInputTag: (tag: string) => void;
}

export const CaseInfoStep: React.FC<CaseInfoStepProps> = ({
  form,
  mode,
  tags,
  setTags,
  inputTag,
  setInputTag
}) => {
  const { t } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState<LookupItem | null>(null);

  const handleDistrictChange = useCallback((value: LookupItem | null) => {
    setSelectedDistrict(value);
    if (value !== selectedDistrict) form.resetFields(['city']);
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
    <div className="space-y-6">
      {/* Main Content - 2 Columns with Equal Heights */}
      <Row gutter={[24, 24]} className="h-full">
        {/* Left Column */}
        <Col xs={24} lg={12} className="flex flex-col">
          <div className="flex flex-col space-y-6 h-full">
            {/* Basic Information Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">📋</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{t('CASES.BASIC_INFORMATION')}</h3>
              </div>

              <div className="space-y-4 flex-1">
                <Form.Item
                  name="name"
                  label={<span className="text-gray-700 font-medium">{t('CASES.CASE_TITLE')}</span>}
                  rules={[
                    { required: true, message: t('CASES.CASE_TITLE_REQUIRED') },
                    { max: 150, message: t('CASES.CASE_TITLE_MAX_LENGTH') }
                  ]}
                >
                  <Input
                    placeholder={t('CASES.ENTER_CASE_TITLE')}
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="number"
                  label={<span className="text-gray-700 font-medium">{t('CASES.CASE_NUMBER')}</span>}
                  rules={[{ required: true, message: t('CASES.CASE_NUMBER_REQUIRED') }]}
                >
                  <Input
                    placeholder={t('CASES.ENTER_CASE_NUMBER')}
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="caseFilingDate"
                  label={<span className="text-gray-700 font-medium">{t('CASES.CASE_FILING_DATE')}</span>}
                  rules={[{ required: true, message: t('CASES.CASE_FILING_DATE_REQUIRED') }]}
                >
                  <DatePicker
                    placeholder={t('CASES.SELECT_CASE_FILING_DATE')}
                    size="large"
                    style={{ width: '100%' }}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="isAgainstStc"
                  label={<span className="text-gray-700 font-medium">{t('CASES.IS_AGAINST_STC')}</span>}
                  valuePropName="checked"
                >
                  <Switch size="default" />
                </Form.Item>
              </div>
            </div>

            {/* Case Classification Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">🏷️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{t('CASES.CASE_CLASSIFICATION')}</h3>
              </div>

              <div className="space-y-4 flex-1">
                <Form.Item
                  name="internalClient"
                  label={<span className="text-gray-700 font-medium">{t('CASES.INTERNAL_CLIENT')}</span>}
                  rules={[{ required: true, message: t('CASES.INTERNAL_CLIENT_REQUIRED') }]}
                >
                  <LookupSelect
                    lookupType={LookupTypes.InternalClient}
                    placeholder={t('CASES.SELECT_INTERNAL_CLIENT')}
                  />
                </Form.Item>

                <Form.Item
                  name="caseType"
                  label={<span className="text-gray-700 font-medium">{t('CASES.CASE_TYPE')}</span>}
                  rules={[{ required: true, message: t('CASES.CASE_TYPE_REQUIRED') }]}
                >
                  <LookupSelect
                    lookupType={LookupTypes.CaseType}
                    placeholder={t('CASES.SELECT_CASE_TYPE')}
                  />
                </Form.Item>

                <Form.Item
                  name="lawsuitType"
                  label={<span className="text-gray-700 font-medium">{t('CASES.LAWSUIT_TYPE')}</span>}
                  rules={[{ required: true, message: t('CASES.LAWSUIT_TYPE_REQUIRED') }]}
                >
                  <LookupSelect
                    lookupType={LookupTypes.JudgmentTypes}
                    placeholder={t('CASES.SELECT_LAWSUIT_TYPE')}
                  />
                </Form.Item>

                <Form.Item
                  name="caseLevel"
                  label={<span className="text-gray-700 font-medium">{t('CASES.CASE_LEVEL')}</span>}
                  rules={[{ required: true, message: t('CASES.CASE_LEVEL_REQUIRED') }]}
                >
                  <LookupSelect
                    lookupType={LookupTypes.CaseLevel}
                    placeholder={t('CASES.SELECT_CASE_LEVEL')}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={12} className="flex flex-col">
          <div className="flex flex-col space-y-6 h-full">
            {/* Court & Location Card */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">🏛️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{t('CASES.COURT_AND_LOCATION')}</h3>
              </div>

              <div className="space-y-4 flex-1">
                <Form.Item
                  name="specializedCourt"
                  label={<span className="text-gray-700 font-medium">{t('CASES.SPECIALIZED_COURT')}</span>}
                  rules={[{ required: true, message: t('CASES.SPECIALIZED_COURT_REQUIRED') }]}
                >
                  <LookupSelect
                    lookupType={LookupTypes.Courts}
                    placeholder={t('CASES.SELECT_SPECIALIZED_COURT')}
                  />
                </Form.Item>

                <Form.Item
                  name="district"
                  label={<span className="text-gray-700 font-medium">{t('CASES.REGION')}</span>}
                  rules={[{ required: true, message: t('CASES.REGION_REQUIRED') }]}
                >
                  <LookupSelect
                    lookupType={LookupTypes.District}
                    placeholder={t('CASES.SELECT_REGION')}
                    onChange={handleDistrictChange}
                  />
                </Form.Item>

                <Form.Item
                  name="city"
                  label={<span className="text-gray-700 font-medium">{t('CASES.CITY')}</span>}
                  rules={[{ required: true, message: t('CASES.CITY_REQUIRED') }]}
                >
                  <CitySelect
                    districtId={selectedDistrict?.id || null}
                    placeholder={t('CASES.SELECT_CITY')}
                  />
                </Form.Item>

                <Form.Item label={<span className="text-gray-700 font-medium">{t('CASES.TAGS')}</span>}>
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
                      height: '22px !important',
                      outline: 'none',
                      boxShadow: 'none',
                      border: 'none'
                    }}
                    value={inputTag}
                    onChange={e => setInputTag(e.target.value)}
                    onBlur={handleTagInputConfirm}
                    onPressEnter={handleTagInputConfirm}
                    placeholder={t('CASES.ADD_TAG')}
                  />
                </Form.Item>
              </div>
            </div>

            {/* Parties Card */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">👥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{t('CASES.PARTIES')}</h3>
              </div>

              <div className="space-y-4 flex-1">
                <Form.Item
                  name="litigants"
                  label={<span className="text-gray-700 font-medium">{t('CASES.LITIGANTS')}</span>}
                  rules={[{ required: true, message: t('CASES.LITIGANTS_REQUIRED') }]}
                >
                  <LitigantSearch
                    placeholder={t('CASES.SELECT_LITIGANTS')}
                    mode="multiple"
                    size="large"
                    onChange={() => { }}
                  />
                </Form.Item>

                {mode === 'create' && (
                  <Form.Item
                    name="additionalConsultants"
                    label={<span className="text-gray-700 font-medium">{t('CASES.ADDITIONAL_CONSULTANTS')}</span>}
                  >
                    <ConsultantSearch
                      placeholder={t('CASES.SELECT_CONSULTANTS')}
                      mode="multiple"
                      size="large"
                      onChange={() => { }}
                    />
                  </Form.Item>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Full Width Sections */}
      <div className="space-y-6">
        {/* Case Description Section */}
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{t('CASES.CASE_DESCRIPTION')}</h3>
          </div>

          <Form.Item
            name="description"
            rules={[
              { min: 5, message: t('CASES.CASE_DESCRIPTION_MIN_LENGTH') },
              { max: 1000, message: t('CASES.CASE_DESCRIPTION_MAX_LENGTH') }
            ]}
          >
            <TextArea
              rows={5}
              placeholder={t('CASES.ENTER_CASE_DESCRIPTION')}
              style={{
                height: '100px !important',
                fontSize: '14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
            />
          </Form.Item>
        </div>


      </div>
    </div>
  );
};