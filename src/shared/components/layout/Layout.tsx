import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

const { Content } = AntLayout;

export const Layout: React.FC = () => {
  return (
    <AntLayout className="min-h-screen">
      <Header />
      <Sidebar />

      <Content className="bg-gray-50 p-6">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 min-h-full">
          <Outlet />
        </div>
      </Content>

      <Footer />
    </AntLayout>
  );
}; 