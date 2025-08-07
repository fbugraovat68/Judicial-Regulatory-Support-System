import React, { useState } from 'react';
import { Tabs, Card, Table, Button, Space, Modal, Form, Input, Select, Tag, Typography, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '@/features/admin/hooks/useAdmin';
import { LoadingSpinner } from '@/shared/components/common/LoadingSpinner';
import { RoleGuard } from '@/features/auth/guards/RoleGuard';
import { formatDate } from '@/shared/utils/dateUtils';

const { Title, Text } = Typography;
const { Option } = Select;

export const Admin: React.FC = () => {
  const { t } = useTranslation();
  const { adminData, isLoading, createUser, updateUser, deleteUser, updateSetting, isCreatingUser, isUpdatingUser, isDeletingUser } = useAdmin();
  const [activeTab, setActiveTab] = useState('users');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();

  const handleCreateUser = async (values: any) => {
    try {
      await createUser(values);
      notification.success({ message: 'User created successfully' });
      setIsUserModalOpen(false);
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Failed to create user' });
    }
  };

  const handleUpdateUser = async (values: any) => {
    try {
      await updateUser({ id: editingUser.id, data: values });
      notification.success({ message: 'User updated successfully' });
      setIsUserModalOpen(false);
      setEditingUser(null);
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Failed to update user' });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      notification.success({ message: 'User deleted successfully' });
    } catch (error) {
      notification.error({ message: 'Failed to delete user' });
    }
  };

  const handleSettingChange = async (settingId: number, value: string) => {
    try {
      await updateSetting({ id: settingId, value });
      notification.success({ message: 'Setting updated successfully' });
    } catch (error) {
      notification.error({
        message: 'Failed to update setting'
      });
    }
  };

  const userColumns = [
    {
      title: t('USERNAME'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('FULL_NAME'),
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: t('EMAIL'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('ROLE'),
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'ADMIN' ? 'red' : role === 'LAWYER' ? 'blue' : 'green'}>
          {role}
        </Tag>
      ),
    },
    {
      title: t('STATUS'),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? t('ACTIVE') : t('INACTIVE')}
        </Tag>
      ),
    },
    {
      title: t('LAST_LOGIN'),
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin: string) => lastLogin ? formatDate(lastLogin) : '-',
    },
    {
      title: t('ACTIONS'),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              setEditingUser(record);
              form.setFieldsValue(record);
              setIsUserModalOpen(true);
            }}
          >
            {t('EDIT')}
          </Button>
          <Button
            size="small"
            danger
            loading={isDeletingUser}
            onClick={() => handleDeleteUser(record.id)}
          >
            {t('DELETE')}
          </Button>
        </Space>
      ),
    },
  ];

  const auditColumns = [
    {
      title: t('TIMESTAMP'),
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => formatDate(timestamp),
    },
    {
      title: t('USER'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('ACTION'),
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => (
        <Tag color={action === 'LOGIN' ? 'green' : action === 'CREATE' ? 'blue' : 'orange'}>
          {action}
        </Tag>
      ),
    },
    {
      title: t('RESOURCE'),
      dataIndex: 'resource',
      key: 'resource',
    },
    {
      title: t('DETAILS'),
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: t('IP_ADDRESS'),
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
  ];

  const tabItems = [
    {
      key: 'users',
      label: t('USER_MANAGEMENT'),
      children: (
        <div>
          <div className="mb-4">
            <Button
              type="primary"
              onClick={() => {
                setEditingUser(null);
                form.resetFields();
                setIsUserModalOpen(true);
              }}
            >
              {t('ADD_USER')}
            </Button>
          </div>
          <Table
            columns={userColumns}
            dataSource={adminData?.users || []}
            rowKey="id"
            loading={isLoading}
          />
        </div>
      ),
    },
    {
      key: 'settings',
      label: t('SYSTEM_SETTINGS'),
      children: (
        <div className="space-y-4">
          {adminData?.settings?.map((setting) => (
            <Card key={setting.id} size="small">
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>{setting.description}</Text>
                  <br />
                  <Text type="secondary">{setting.key}</Text>
                </div>
                <Input
                  value={setting.value}
                  onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                  style={{ width: 200 }}
                />
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      key: 'audit',
      label: t('AUDIT_LOGS'),
      children: (
        <Table
          columns={auditColumns}
          dataSource={adminData?.auditLogs || []}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6">
        <Title level={2}>{t('ADMIN')}</Title>
        
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="bg-white rounded-lg shadow"
        />

        {/* User Modal */}
        <Modal
          title={editingUser ? t('EDIT_USER') : t('ADD_USER')}
          open={isUserModalOpen}
          onCancel={() => {
            setIsUserModalOpen(false);
            setEditingUser(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={editingUser ? handleUpdateUser : handleCreateUser}
          >
            <Form.Item
              name="username"
              label={t('USERNAME')}
              rules={[{ required: true, message: t('USERNAME_REQUIRED') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label={t('EMAIL')}
              rules={[
                { required: true, message: t('EMAIL_REQUIRED') },
                { type: 'email', message: t('EMAIL_INVALID') }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="fullName"
              label={t('FULL_NAME')}
              rules={[{ required: true, message: t('FULL_NAME_REQUIRED') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="role"
              label={t('ROLE')}
              rules={[{ required: true, message: t('ROLE_REQUIRED') }]}
            >
              <Select>
                <Option value="ADMIN">{t('ADMIN')}</Option>
                <Option value="LAWYER">{t('LAWYER')}</Option>
                <Option value="ASSISTANT">{t('ASSISTANT')}</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="isActive"
              label={t('STATUS')}
              initialValue={true}
            >
              <Select>
                <Option value={true}>{t('ACTIVE')}</Option>
                <Option value={false}>{t('INACTIVE')}</Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                onClick={() => {
                  setIsUserModalOpen(false);
                  setEditingUser(null);
                  form.resetFields();
                }}
              >
                {t('CANCEL')}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreatingUser || isUpdatingUser}
              >
                {editingUser ? t('UPDATE') : t('CREATE')}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </RoleGuard>
  );
}; 