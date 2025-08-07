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
    <div className="space-y-6">
      {/* Main Content - 2 Columns with Equal Heights */}
      <Row gutter={[24, 24]} className="h-full">
        {/* Left Column */}
        <Col xs={24} lg={12} className="flex flex-col">
          <div className="flex flex-col space-y-6 h-full">
            {/* Financial Information Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{t('CASES.FINANCIAL_INFORMATION')}</h3>
              </div>
              
              <div className="space-y-4 flex-1">
                <Form.Item
                  name={['caseInformation', 'fineAmount']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.FINE_AMOUNT')}</span>}
                  rules={[{ required: true, message: t('CASES.FINE_AMOUNT_REQUIRED') }]}
                >
                  <Input
                    type="number"
                    placeholder={t('CASES.ENTER_FINE_AMOUNT')}
                    size="large"
                    min={0}
                    step={0.01}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'repaymentAmount']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.REPAYMENT_AMOUNT')}</span>}
                >
                  <Input
                    type="number"
                    placeholder={t('CASES.ENTER_REPAYMENT_AMOUNT')}
                    size="large"
                    min={0}
                    step={0.01}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'repaymentDate']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.REPAYMENT_DATE')}</span>}
                >
                  <DatePicker
                    placeholder={t('CASES.SELECT_REPAYMENT_DATE')}
                    size="large"
                    style={{ width: '100%' }}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'lossRatio']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.LOSS_RATIO')}</span>}
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
                      className="mt-2"
                    />
                  </div>
                </Form.Item>
              </div>
            </div>

            {/* Decision Information Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">⚖️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{t('CASES.DECISION_INFORMATION')}</h3>
              </div>
              
              <div className="space-y-4 flex-1">
                <Form.Item
                  name={['caseInformation', 'decisionNumber']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.DECISION_NUMBER')}</span>}
                >
                  <Input
                    placeholder={t('CASES.ENTER_DECISION_NUMBER')}
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'decisionDate']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.DECISION_DATE')}</span>}
                >
                  <DatePicker
                    placeholder={t('CASES.SELECT_DECISION_DATE')}
                    size="large"
                    style={{ width: '100%' }}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'priority']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.PRIORITY')}</span>}
                  rules={[{ required: true, message: t('CASES.PRIORITY_REQUIRED') }]}
                >
                  <Radio.Group size="large" className="flex flex-col space-y-2">
                    {Object.values(CasePriority).map(priority => (
                      <Radio key={priority} value={priority} className="!mb-2">
                        <span className="text-gray-700">{t(priority)}</span>
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={12} className="flex flex-col">
          <div className="flex flex-col space-y-6 h-full">
            {/* Notice Information Card */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">📋</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{t('CASES.NOTICE_INFORMATION')}</h3>
              </div>
              
              <div className="space-y-4 flex-1">
                <Form.Item
                  name={['caseInformation', 'noticeNumber']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.NOTICE_NUMBER')}</span>}
                >
                  <Input
                    placeholder={t('CASES.ENTER_NOTICE_NUMBER')}
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'noticeDate']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.NOTICE_DATE')}</span>}
                >
                  <DatePicker
                    placeholder={t('CASES.SELECT_NOTICE_DATE')}
                    size="large"
                    style={{ width: '100%' }}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'inquiryNumber']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.INQUIRY_NUMBER')}</span>}
                >
                  <Input
                    placeholder={t('CASES.ENTER_INQUIRY_NUMBER')}
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'inquiryDate']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.INQUIRY_DATE')}</span>}
                >
                  <DatePicker
                    placeholder={t('CASES.SELECT_INQUIRY_DATE')}
                    size="large"
                    style={{ width: '100%' }}
                    className="rounded-lg"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Grievance Information Card */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{t('CASES.GRIEVANCE_INFORMATION')}</h3>
              </div>
              
              <div className="space-y-4 flex-1">
                <Form.Item
                  name={['caseInformation', 'grievanceRequestNumber']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.GRIEVANCE_REQUEST_NUMBER')}</span>}
                >
                  <Input
                    placeholder={t('CASES.ENTER_GRIEVANCE_REQUEST_NUMBER')}
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'grievanceRequestDate']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.GRIEVANCE_REQUEST_DATE')}</span>}
                >
                  <DatePicker
                    placeholder={t('CASES.SELECT_GRIEVANCE_REQUEST_DATE')}
                    size="large"
                    style={{ width: '100%' }}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name={['caseInformation', 'isConfidential']}
                  label={<span className="text-gray-700 font-medium">{t('CASES.IS_CONFIDENTIAL')}</span>}
                  valuePropName="checked"
                >
                  <Switch size="default" />
                </Form.Item>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Full Width Consultant Opinion Section */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-semibold">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{t('CASES.CONSULTANT_OPINION')}</h3>
        </div>
        
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
            style={{ 
              height: '100px !important',
              fontSize: '14px', 
              resize: 'vertical',
              borderRadius: '8px',
              border: '1px solid #d1d5db'
            }}
          />
        </Form.Item>
      </div>
    </div>
  );
};