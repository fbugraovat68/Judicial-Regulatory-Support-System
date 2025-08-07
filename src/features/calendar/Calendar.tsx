import React, { useState } from 'react';
import { Calendar as AntCalendar, Badge, Modal, Form, Input, Select, Button, notification, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useCalendar } from '@/features/calendar/hooks/useCalendar';
import { LoadingSpinner } from '@/shared/components/common/LoadingSpinner';
import { formatDate } from '@/shared/utils/dateUtils';
import type { CalendarEvent } from '@/features/calendar/services/calendarService';

const { TextArea } = Input;
const { Title } = Typography;

export const Calendar: React.FC = () => {
  const { t } = useTranslation();
  const { events, isLoading, createEvent, isCreating } = useCalendar();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [form] = Form.useForm();

  const cellRender = (current: any, info: any) => {
    if (info.type === 'date') {
      const date = current.toDate();
      const dayEvents = events?.filter(event => 
        new Date(event.date).toDateString() === date.toDateString()
      ) || [];

      return (
        <div className="calendar-cell">
          {dayEvents.map(event => (
            <Badge
              key={event.id}
              color={event.type === 'meeting' ? 'blue' : event.type === 'hearing' ? 'red' : 'green'}
              text={event.title}
              className="cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      );
    }
    return info.originNode;
  };

  const onSelect = (date: any) => {
    setSelectedDate(date.toDate());
    setIsModalOpen(true);
  };

  const handleCreateEvent = async (values: any) => {
    try {
      await createEvent({
        ...values,
        date: selectedDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      });
      notification.success({ message: 'Event created successfully' });
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Failed to create event' });
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    form.resetFields();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title level={2} className='mb-0'>{t('NAVIGATION.CALENDAR')}</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          {t('ADD_EVENT')}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <AntCalendar
          cellRender={cellRender}
          onSelect={onSelect}
          className="calendar-component"
        />
      </div>

      {/* Create Event Modal */}
      <Modal
        title={t('ADD_EVENT')}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateEvent}
        >
          <Form.Item
            name="title"
            label={t('EVENT_TITLE')}
            rules={[{ required: true, message: t('EVENT_TITLE_REQUIRED') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('DESCRIPTION')}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="type"
            label={t('EVENT_TYPE')}
            rules={[{ required: true, message: t('EVENT_TYPE_REQUIRED') }]}
          >
            <Select>
              <Select.Option value="meeting">{t('MEETING')}</Select.Option>
              <Select.Option value="hearing">{t('HEARING')}</Select.Option>
              <Select.Option value="deadline">{t('DEADLINE')}</Select.Option>
              <Select.Option value="other">{t('OTHER')}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label={t('LOCATION')}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="attendees"
            label={t('ATTENDEES')}
          >
            <Input placeholder="Separate multiple attendees with commas" />
          </Form.Item>

          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={handleModalCancel}>
              {t('CANCEL')}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating}
            >
              {t('CREATE')}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          open={!!selectedEvent}
          onCancel={() => setSelectedEvent(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedEvent(null)}>
              {t('CLOSE')}
            </Button>
          ]}
        >
          <div className="space-y-4">
            <div>
              <strong>{t('DATE')}:</strong> {formatDate(selectedEvent.date)}
            </div>
            {selectedEvent.description && (
              <div>
                <strong>{t('DESCRIPTION')}:</strong> {selectedEvent.description}
              </div>
            )}
            {selectedEvent.location && (
              <div>
                <strong>{t('LOCATION')}:</strong> {selectedEvent.location}
              </div>
            )}
            {selectedEvent.caseName && (
              <div>
                <strong>{t('RELATED_CASE')}:</strong> {selectedEvent.caseName}
              </div>
            )}
            {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
              <div>
                <strong>{t('ATTENDEES')}:</strong> {selectedEvent.attendees.join(', ')}
              </div>
            )}
            <div>
              <strong>{t('TYPE')}:</strong> {selectedEvent.type}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}; 