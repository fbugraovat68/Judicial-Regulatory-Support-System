import React, { useState } from 'react';
import { Drawer, Button, Descriptions, Space } from 'antd';
import { BugOutlined } from '@ant-design/icons';
import { environment } from '@/config';

export const DebugPanel: React.FC = () => {
  const [open, setOpen] = useState(false);

  if (!environment.enableDebug) return null;

  return (
    <>
      <Button
        icon={<BugOutlined />}
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        Debug
      </Button>
      
      <Drawer
        title="Debug Information"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={400}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Environment">
            {environment.environment}
          </Descriptions.Item>
          <Descriptions.Item label="Version">
            {environment.version}
          </Descriptions.Item>
          <Descriptions.Item label="API Base URL">
            {environment.apiBaseUrl}
          </Descriptions.Item>
          <Descriptions.Item label="Form Data URL">
            {environment.formDataUrl}
          </Descriptions.Item>
          <Descriptions.Item label="IGate URL">
            {environment.igateUrl}
          </Descriptions.Item>
          <Descriptions.Item label="Analytics Enabled">
            {environment.enableAnalytics ? 'Yes' : 'No'}
          </Descriptions.Item>
          <Descriptions.Item label="Mock API Enabled">
            {environment.enableMockApi ? 'Yes' : 'No'}
          </Descriptions.Item>
        </Descriptions>
        
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
          <Button 
            block 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Clear Local Storage
          </Button>
          <Button 
            block 
            onClick={() => {
              console.log('Environment:', environment);
              console.log('User Info:', localStorage.getItem('user-storage'));
            }}
          >
            Log Debug Info
          </Button>
        </Space>
      </Drawer>
    </>
  );
}; 