import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, message, Switch, Row, Col, Steps, Upload, Slider, Radio, Tag } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useCases } from '../../hooks/useCases';
import { useModalStore } from '@/shared/stores/modalStore';
import { LookupSelect, LitigantSearch } from '@/shared/components/lookup';
import { LookupTypes } from '@/shared/types/lookup';
import { ConsultantSearch } from '@/shared/components/lookup';
import type { CaseRequest } from '../../types/case-request';
import { CasePriority } from '../../types/case';

const { Step } = Steps;
const { TextArea } = Input;

interface CreateCaseModalProps {
  mode?: 'create' | 'edit';
  caseData?: CaseRequest;
}

export const CreateCaseModal: React.FC<CreateCaseModalProps> = ({ mode = 'create', caseData }) => {
  const { t } = useTranslation();
  const { createCase, isCreating } = useCases();
  const { isOpen, close } = useModalStore();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');

  const steps = [
    { title: t('CASES.CASE_INFO'), key: 'caseInfo' },
    { title: t('CASES.DECISION_INFO'), key: 'decisionInfo' }
  ];

  const handleNext = async () => {
    try {
      await form.validateFields();
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      message.error(t('CASES.PLEASE_COMPLETE_REQUIRED_FIELDS'));
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (mode === 'edit' && caseData) {
        // TODO: Implement edit functionality
        message.info('Edit functionality coming soon');
      } else {
        // Transform form values to match CreateCaseRequest structure
        const createCaseRequest = {
          name: values.name,
          description: values.description,
          caseTypeId: values.caseType?.id,
          priority: values.priority || CasePriority.MEDIUM,
          internalClientId: values.internalClient?.id,
          lawsuitTypeId: values.lawsuitType?.id,
          specializedCourtId: values.specializedCourt?.id,
          districtId: values.district?.id,
          cityId: values.city?.id,
          caseLevelId: values.caseLevel?.id,
          isAgainstStc: values.isAgainstStc,
          caseFilingDate: values.caseFilingDate?.format('YYYY-MM-DD'),
          litigantIds: Array.isArray(values.litigants) ? values.litigants.map((lit: any) => lit.id) : [],
          tags: tags,
        };

        await createCase(createCaseRequest);
        message.success('Case created successfully');
        close('createCase');
        form.resetFields();
        setCurrentStep(0);
        setFileList([]);
        setTags([]);
      }
    } catch (error) {
      message.error('Failed to create case');
    }
  };

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

  const uploadProps = {
    fileList,
    beforeUpload: (file: File) => {
      const isValidType = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/pdf',
        'application/zip'
      ].includes(file.type);

      if (!isValidType) {
        message.error('You can only upload .doc, .docx, .xls, .xlsx, .pdf, .zip files!');
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('File must be smaller than 10MB!');
        return false;
      }

      setFileList([...fileList, file]);
      return false;
    },
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    }
  };

  const modalTitle = mode === 'edit' ? t('CASES.EDIT_CASE') : t('CASES.CREATE_NEW_CASE');

  return (
    <>

      <Modal
        title={modalTitle}
        open={isOpen('createCase')}
        onCancel={() => close('createCase')}
        footer={null}
        width={1000}
        centered
        closeIcon={<CloseOutlined />}
      >
        <Steps current={currentStep} className="mb-6">
          {steps.map(step => (
            <Step key={step.key} title={step.title} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          initialValues={caseData}
          className="create-case-form"
        >
          {currentStep === 0 && (
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
                        rows={5} cols={10}
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
                        onChange={(value) => form.setFieldValue('internalClient', value)}

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
                        onChange={(value) => form.setFieldValue('caseType', value)}

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
                        onChange={(value) => form.setFieldValue('lawsuitType', value)}

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
                        onChange={(value) => form.setFieldValue('caseLevel', value)}

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
                        onChange={(value) => form.setFieldValue('specializedCourt', value)}

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
                        onChange={(value) => form.setFieldValue('district', value)}

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
                      <LookupSelect
                        lookupType={LookupTypes.City}
                        placeholder={t('CASES.SELECT_CITY')}
                        onChange={(value) => form.setFieldValue('city', value)}

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
                          bordered={false}
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

                        onChange={(value) => {
                          form.setFieldValue('litigants', value);
                        }}
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

                          onChange={(value) => {
                            form.setFieldValue('additionalConsultants', value);
                          }}
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
                    <Upload {...uploadProps}>
                      <Button
                        icon={<UploadOutlined />}
                        size="large"

                      >
                        {t('CASES.UPLOAD_FILES')}
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
              )}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Financial Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.FINANCIAL_INFORMATION')}</h3>
                <Row gutter={[16, 8]}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="fineAmount"
                      label={t('CASES.FINE_AMOUNT')}
                      rules={[{ required: true, message: t('CASES.FINE_AMOUNT_REQUIRED') }]}
                    >
                      <Input
                        type="number"
                        placeholder={t('CASES.ENTER_FINE_AMOUNT')}
                        size="large"

                        min={0}
                        step={0.01}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="lossRatio"
                      label={t('CASES.LOSS_RATIO')}
                      rules={[{ required: true, message: t('CASES.LOSS_RATIO_REQUIRED') }]}
                    >
                      <div className="px-2">
                        <Slider
                          min={0}
                          max={100}
                          marks={{
                            0: '0%',
                            25: '25%',
                            50: '50%',
                            75: '75%',
                            100: '100%'
                          }}
                        />
                      </div>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="repaymentAmount"
                      label={t('CASES.REPAYMENT_AMOUNT')}
                    >
                      <Input
                        type="number"
                        placeholder={t('CASES.ENTER_REPAYMENT_AMOUNT')}
                        size="large"

                        min={0}
                        step={0.01}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="repaymentDate"
                      label={t('CASES.REPAYMENT_DATE')}
                    >
                      <DatePicker
                        placeholder={t('CASES.SELECT_REPAYMENT_DATE')}
                        size="large"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Decision Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.DECISION_INFORMATION')}</h3>
                <Row gutter={[16, 8]}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="decisionNumber"
                      label={t('CASES.DECISION_NUMBER')}
                    >
                      <Input
                        placeholder={t('CASES.ENTER_DECISION_NUMBER')}
                        size="large"

                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="decisionDate"
                      label={t('CASES.DECISION_DATE')}
                    >
                      <DatePicker
                        placeholder={t('CASES.SELECT_DECISION_DATE')}
                        size="large"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="priority"
                      label={t('CASES.PRIORITY')}
                      rules={[{ required: true, message: t('CASES.PRIORITY_REQUIRED') }]}
                    >
                      <Radio.Group size="large">
                        {Object.values(CasePriority).map(priority => (
                          <Radio key={priority} value={priority} style={{ marginBottom: '8px' }}>
                            {t(priority)}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Notice Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.NOTICE_INFORMATION')}</h3>
                <Row gutter={[16, 8]}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="noticeNumber"
                      label={t('CASES.NOTICE_NUMBER')}
                    >
                      <Input
                        placeholder={t('CASES.ENTER_NOTICE_NUMBER')}
                        size="large"

                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="noticeDate"
                      label={t('CASES.NOTICE_DATE')}
                    >
                      <DatePicker
                        placeholder={t('CASES.SELECT_NOTICE_DATE')}
                        size="large"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="inquiryNumber"
                      label={t('CASES.INQUIRY_NUMBER')}
                    >
                      <Input
                        placeholder={t('CASES.ENTER_INQUIRY_NUMBER')}
                        size="large"

                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="inquiryDate"
                      label={t('CASES.INQUIRY_DATE')}
                    >
                      <DatePicker
                        placeholder={t('CASES.SELECT_INQUIRY_DATE')}
                        size="large"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Grievance Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.GRIEVANCE_INFORMATION')}</h3>
                <Row gutter={[16, 8]}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="grievanceRequestNumber"
                      label={t('CASES.GRIEVANCE_REQUEST_NUMBER')}
                    >
                      <Input
                        placeholder={t('CASES.ENTER_GRIEVANCE_REQUEST_NUMBER')}
                        size="large"

                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="grievanceRequestDate"
                      label={t('CASES.GRIEVANCE_REQUEST_DATE')}
                    >
                      <DatePicker
                        placeholder={t('CASES.SELECT_GRIEVANCE_REQUEST_DATE')}
                        size="large"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="isConfidential"
                      label={t('CASES.IS_CONFIDENTIAL')}
                      valuePropName="checked"
                    >
                      <Switch size="default" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Consultant Opinion Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.CONSULTANT_OPINION')}</h3>
                <Form.Item
                  name="consultantOpinion"
                  rules={[
                    { min: 5, message: t('CASES.CONSULTANT_OPINION_MIN_LENGTH') },
                    { max: 1000, message: t('CASES.CONSULTANT_OPINION_MAX_LENGTH') }
                  ]}
                >
                  <TextArea
                    rows={6}
                    placeholder={t('CASES.ENTER_CONSULTANT_OPINION')}
                    style={{ fontSize: '14px', resize: 'vertical' }}
                  />
                </Form.Item>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button onClick={() => close('createCase')}>
              {t('COMMON.CANCEL')}
            </Button>

            <div className="space-x-2">
              {currentStep > 0 && (
                <Button onClick={handlePrev}>
                  {t('COMMON.BACK')}
                </Button>
              )}

              {currentStep < steps.length - 1 ? (
                <Button type="primary" onClick={handleNext}>
                  {t('COMMON.NEXT')}
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={isCreating}
                >
                  {mode === 'edit' ? t('COMMON.UPDATE') : t('COMMON.CREATE')}
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}; 