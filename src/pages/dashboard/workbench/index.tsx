import { Col, Row, Space } from 'antd';
import BannerCard from './banner-card';
import Conversion from './Conversion';
import Applications from './Applications';
import TotalCard from './TotalCard';
import CurrentDownload from './CurrentDownload';
import AreaDownload from './AreaDownload';
import NewInvoice from './NewInvoice';
import TopRelated from './TopRelated';
import TopInstalled from './TopInstalled';
import TopAuthor from './TopAuthor';

export default function Workbench() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} md={16}>
          <BannerCard />
        </Col>
        <Col span={24} md={8}>
          <Space direction="vertical" size="middle" className="h-full w-full">
            <Conversion />
            <Applications />
          </Space>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center" className="mt-4">
        <Col span={24} md={8}>
          <TotalCard />
        </Col>
        <Col span={24} md={8}>
          <TotalCard />
        </Col>
        <Col span={24} md={8}>
          <TotalCard />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12} lg={8}>
          <CurrentDownload />
        </Col>
        <Col span={24} md={12} lg={16}>
          <AreaDownload />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={23} md={12} lg={16}>
          <NewInvoice />
        </Col>
        <Col span={23} md={12} lg={8}>
          <TopRelated />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12}>
          <TopInstalled />
        </Col>
        <Col span={24} md={12}>
          <TopAuthor />
        </Col>
      </Row>
    </>
  );
}
