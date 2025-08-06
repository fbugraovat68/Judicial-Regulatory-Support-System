import React, { useCallback } from 'react';
import { Form, Input, DatePicker, Switch, Row, Col, Slider, Radio, type FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import { CasePriority } from '../../../types/case';

const { TextArea } = Input;

interface DecisionInfoStepProps {
  form: FormInstance<any>;
}

export const DecisionInfoStep: React.FC<DecisionInfoStepProps> = ({ form }) => {
  const { t } = useTranslation();

  const handleLossRatioChange = useCallback((value: number) => {
    form.setFieldValue(['caseInformation', 'lossRatio'], value);
  }, [form]);

  return (
    <div className="space-y-4">
      {/* Financial Information Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.FINANCIAL_INFORMATION')}</h3>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={8}>
            <Form.Item
              name={['caseInformation', 'fineAmount']}
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
              name={['caseInformation', 'lossRatio']}
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
                  onChange={handleLossRatioChange}
                  tooltip={{ formatter: (value) => `${value}%` }}
                />
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name={['caseInformation', 'repaymentAmount']}
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
              name={['caseInformation', 'repaymentDate']}
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
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.DECISION_INFORMATION')}</h3>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={8}>
            <Form.Item
              name={['caseInformation', 'decisionNumber']}
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
              name={['caseInformation', 'decisionDate']}
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
              name={['caseInformation', 'priority']}
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
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.NOTICE_INFORMATION')}</h3>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={8}>
            <Form.Item
              name={['caseInformation', 'noticeNumber']}
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
              name={['caseInformation', 'noticeDate']}
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
              name={['caseInformation', 'inquiryNumber']}
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
              name={['caseInformation', 'inquiryDate']}
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
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.GRIEVANCE_INFORMATION')}</h3>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={8}>
            <Form.Item
              name={['caseInformation', 'grievanceRequestNumber']}
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
              name={['caseInformation', 'grievanceRequestDate']}
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
              name={['caseInformation', 'isConfidential']}
              label={t('CASES.IS_CONFIDENTIAL')}
              valuePropName="checked"
            >
              <Switch size="default" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Consultant Opinion Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3 text-gray-900">{t('CASES.CONSULTANT_OPINION')}</h3>
        <Form.Item
                        name={['caseInformation', 'consultantOpinion']}
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
  );
};