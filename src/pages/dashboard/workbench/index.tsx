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
          <TotalCard
            title="Total Active Users"
            increase
            count="18,765"
            percent="2.6%"
            chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
          />
        </Col>
        <Col span={24} md={8}>
          <TotalCard
            title="Total Installed"
            increase
            count="4,876"
            percent="0.2%"
            chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
          />
        </Col>
        <Col span={24} md={8}>
          <TotalCard
            title="Total Downloads"
            increase={false}
            count="678"
            percent="0.1%"
            chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
          />
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

      {/* <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12}>
          <TopInstalled />
        </Col>
        <Col span={24} md={12}>
          <TopAuthor />
        </Col>
      </Row> */}
    </>
  );
}
