import React, { useState } from 'react';
import { Modal, Form, Button, message, Steps, type UploadProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useCases } from '../../hooks/useCases';
import { useModalStore } from '@/shared/stores/modalStore';
import type { CaseRequest } from '../../types/case-request';
import { CaseInfoStep } from './case-steps/CaseInfoStep';
import { DecisionInfoStep } from './case-steps/DecisionInfoStep';
import { CaseHelper } from '../../helpers/case-helper';

const { Step } = Steps;

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
      // Define which fields belong to each step (matching CaseRequest structure)
      const stepFields = {
        0: ['name', 'description', 'number', 'isAgainstStc', 'caseFilingDate', 'caseLevel', 'internalClient', 'caseType', 'lawsuitType', 'specializedCourt', 'district', 'city', 'litigants', 'additionalConsultants', 'tags'],
        1: ['caseInformation.decisionNumber', 'caseInformation.decisionDate', 'caseInformation.noticeNumber', 'caseInformation.noticeDate', 'caseInformation.inquiryNumber', 'caseInformation.inquiryDate', 'caseInformation.repaymentAmount', 'caseInformation.repaymentDate', 'caseInformation.grievanceRequestNumber', 'caseInformation.grievanceRequestDate', 'caseInformation.fineAmount', 'caseInformation.lossRatio', 'caseInformation.isConfidential', 'caseInformation.consultantOpinion', 'caseInformation.priority']
      };

      // Validate only current step fields
      await form.validateFields(stepFields[currentStep as keyof typeof stepFields]);

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
      await form.validateFields();

      if (mode === 'edit' && caseData) {
        // TODO: Implement edit functionality
        message.info('Edit functionality coming soon');
      } else {
        const createCaseRequest = CaseHelper.prepareCaseRequest(form, tags);
        const formData = CaseHelper.preparePayloadAsFormData(createCaseRequest, fileList);
        const caseDetails = await createCase(formData);
        console.log(caseDetails);
        message.success(`Case ${caseDetails.name} created successfully`);
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

  const uploadProps: UploadProps = {
    multiple: true,
    accept: '.doc,.docx,.xls,.xlsx,.pdf,.zip',
    maxCount: 10,
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
        message.error(t('CASES.INVALID_FILE_TYPE'));
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error(t('CASES.FILE_TOO_LARGE'));
        return false;
      }

      // Check if file already exists
      const fileExists = fileList.some(existingFile =>
        existingFile.name === file.name && existingFile.size === file.size
      );

      if (fileExists) {
        message.warning(t('CASES.FILE_ALREADY_EXISTS'));
        return false;
      }

      // Add file to list
      setFileList(prevList => [...prevList, file]);
      return false; // Prevent auto upload
    },
    onRemove: (file: any) => {
      setFileList(prevList => prevList.filter(item => item.uid !== file.uid));
    },
    onChange: (info) => {
      // Handle file list changes
      setFileList(info.fileList);
    },
    onDrop: (event: React.DragEvent<HTMLDivElement>) => {
      console.log('Files dropped:', event.dataTransfer.files);
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
          <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
            <CaseInfoStep
              form={form}
              mode={mode}
              tags={tags}
              setTags={setTags}
              inputTag={inputTag}
              setInputTag={setInputTag}
              uploadProps={uploadProps}
            />
          </div>

          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <DecisionInfoStep form={form} />
          </div>

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