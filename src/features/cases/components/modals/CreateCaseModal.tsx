import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message, Switch, Row, Col } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useCases } from '../../hooks/useCases';
import { useModalStore } from '@/shared/stores/modalStore';
import { LookupSelect } from '@/shared/components/lookup';
import { LookupTypes } from '@/shared/types/lookup';
import { ConsultantSearch } from '@/shared/components/lookup';
import type { CaseRequest } from '../../types/case-request';
import { CasePriority } from '../../types/case';

interface CreateCaseModalProps {
  mode?: 'create' | 'edit';
  caseData?: CaseRequest;
}

export const CreateCaseModal: React.FC<CreateCaseModalProps> = ({ mode = 'create', caseData }) => {
  const { t } = useTranslation();
  const { createCase, isCreating } = useCases();
  const { isOpen, close } = useModalStore();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
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
          litigantIds: values.litigants?.map((lit: any) => lit.id) || [],
          tags: values.tags || [],
        };

        await createCase(createCaseRequest);
        message.success('Case created successfully');
        close('createCase');
        form.resetFields();
      }
    } catch (error) {
      message.error('Failed to create case');
    }
  };

  const modalTitle = mode === 'edit' ? t('EDIT_CASE') : t('CREATE_NEW_CASE');

  return (
    <Modal
      title={modalTitle}
      open={isOpen('createCase')}
      onCancel={() => close('createCase')}
      footer={null}
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={caseData}
      >
        {/* Basic Information */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={t('CASE_NAME')}
              rules={[{ required: true, message: t('CASE_NAME_REQUIRED') }]}
            >
              <Input placeholder={t('ENTER_CASE_NAME')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="number"
              label={t('CASE_NUMBER')}
              rules={[{ required: true, message: t('CASE_NUMBER_REQUIRED') }]}
            >
              <Input placeholder={t('ENTER_CASE_NUMBER')} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label={t('CASE_DESCRIPTION')}
        >
          <Input.TextArea
            rows={3}
            placeholder={t('ENTER_CASE_DESCRIPTION')}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="isAgainstStc"
              label={t('IS_AGAINST_STC')}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="caseFilingDate"
              label={t('CASE_FILING_DATE')}
              rules={[{ required: true, message: t('CASE_FILING_DATE_REQUIRED') }]}
            >
              <DatePicker
                placeholder={t('SELECT_CASE_FILING_DATE')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Case Classification */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="caseLevel"
              label={t('CASE_LEVEL')}
              rules={[{ required: true, message: t('CASE_LEVEL_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.CaseLevel}
                placeholder={t('SELECT_CASE_LEVEL')}
                onChange={(value) => form.setFieldValue('caseLevel', value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="internalClient"
              label={t('INTERNAL_CLIENT')}
              rules={[{ required: true, message: t('INTERNAL_CLIENT_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.InternalClient}
                placeholder={t('SELECT_INTERNAL_CLIENT')}
                onChange={(value) => form.setFieldValue('internalClient', value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="caseType"
              label={t('CASE_TYPE')}
              rules={[{ required: true, message: t('CASE_TYPE_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.CaseType}
                placeholder={t('SELECT_CASE_TYPE')}
                onChange={(value) => form.setFieldValue('caseType', value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="lawsuitType"
              label={t('LAWSUIT_TYPE')}
              rules={[{ required: true, message: t('LAWSUIT_TYPE_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.JudgmentTypes}
                placeholder={t('SELECT_LAWSUIT_TYPE')}
                onChange={(value) => form.setFieldValue('lawsuitType', value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="specializedCourt"
              label={t('SPECIALIZED_COURT')}
              rules={[{ required: true, message: t('SPECIALIZED_COURT_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.Courts}
                placeholder={t('SELECT_SPECIALIZED_COURT')}
                onChange={(value) => form.setFieldValue('specializedCourt', value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="priority"
              label={t('PRIORITY')}
              rules={[{ required: true, message: t('PRIORITY_REQUIRED') }]}
            >
              <Select placeholder={t('SELECT_PRIORITY')}>
                {Object.values(CasePriority).map(priority => (
                  <Select.Option key={priority} value={priority}>
                    {t(priority)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Location */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="district"
              label={t('DISTRICT')}
              rules={[{ required: true, message: t('DISTRICT_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.District}
                placeholder={t('SELECT_DISTRICT')}
                onChange={(value) => form.setFieldValue('district', value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label={t('CITY')}
              rules={[{ required: true, message: t('CITY_REQUIRED') }]}
            >
              <LookupSelect
                lookupType={LookupTypes.City}
                placeholder={t('SELECT_CITY')}
                onChange={(value) => form.setFieldValue('city', value)}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Litigants */}
        <Form.List name="litigants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={16} align="middle">
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label={t('LITIGANT_NAME')}
                      rules={[{ required: true, message: t('LITIGANT_NAME_REQUIRED') }]}
                    >
                      <Input placeholder={t('ENTER_LITIGANT_NAME')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'email']}
                      label={t('LITIGANT_EMAIL')}
                      rules={[{ type: 'email', message: t('INVALID_EMAIL') }]}
                    >
                      <Input placeholder={t('ENTER_LITIGANT_EMAIL')} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, 'nameAr']}
                      label={t('LITIGANT_NAME_AR')}
                    >
                      <Input placeholder={t('ENTER_LITIGANT_NAME_AR')} />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  {t('ADD_LITIGANT')}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Additional Consultants */}
        <Form.List name="additionalConsultants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={16} align="middle">
                  <Col span={10}>
                    <Form.Item
                      {...restField}
                      name={[name, 'consultant']}
                      label={t('CONSULTANT')}
                    >
                      <ConsultantSearch
                        placeholder={t('SELECT_CONSULTANT')}
                        onChange={(value) => {
                          const currentConsultants = form.getFieldValue('additionalConsultants') || [];
                          currentConsultants[name] = value;
                          form.setFieldValue('additionalConsultants', currentConsultants);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  {t('ADD_CONSULTANT')}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Case Information */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="decisionNumber"
              label={t('DECISION_NUMBER')}
            >
              <Input placeholder={t('ENTER_DECISION_NUMBER')} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="decisionDate"
              label={t('DECISION_DATE')}
            >
              <DatePicker
                placeholder={t('SELECT_DECISION_DATE')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="fineAmount"
              label={t('FINE_AMOUNT')}
            >
              <Input
                type="number"
                placeholder={t('ENTER_FINE_AMOUNT')}
                min={0}
                step={0.01}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="noticeNumber"
              label={t('NOTICE_NUMBER')}
            >
              <Input placeholder={t('ENTER_NOTICE_NUMBER')} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="noticeDate"
              label={t('NOTICE_DATE')}
            >
              <DatePicker
                placeholder={t('SELECT_NOTICE_DATE')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="lossRatio"
              label={t('LOSS_RATIO')}
            >
              <Input
                type="number"
                placeholder={t('ENTER_LOSS_RATIO')}
                min={0}
                max={100}
                step={0.01}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="isConfidential"
              label={t('IS_CONFIDENTIAL')}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="consultantOpinion"
              label={t('CONSULTANT_OPINION')}
            >
              <Input.TextArea
                rows={2}
                placeholder={t('ENTER_CONSULTANT_OPINION')}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <Button onClick={() => close('createCase')}>
            {t('CANCEL')}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating}
          >
            {mode === 'edit' ? t('UPDATE') : t('CREATE')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}; 