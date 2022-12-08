import React from 'react';
import { Col, Layout, Row } from 'antd';
import CustomForm from '../src/components/CustomForm';
import UserList from '../src/components/UserList';

const { Header, Content } = Layout;

const App: React.FC = () => (
  <Layout className="h-screen">
    <Header>
      <div className="w-100">
        <p className="text-white font-bold">
          MyCourseVille Assessment Platform Launcher
        </p>
      </div>
    </Header>
    <Content>
      <Row className="w-100 p-10">
        <Col className="" span={12}>
          <CustomForm />
        </Col>
        <Col span={10}>
          <UserList />
        </Col>
      </Row>
    </Content>
  </Layout>
);

export default App;
