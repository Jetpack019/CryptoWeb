import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  const totalMarketVolume = parseFloat(data?.data?.stats['24hVolume']);

  if (isFetching) return 'Loading...';

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Market Share</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => {
          const exchange24hVolume = parseFloat(exchange['24hVolume']);
          const marketShare = (exchange24hVolume / totalMarketVolume) * 100;

          return (
            <Col span={24} key={exchange.uuid}>
              <Collapse>
                <Panel
                  showArrow={false}
                  header={(
                    <Row>
                      <Col span={6}>
                        <Text><strong>{exchange.rank}.</strong></Text>
                        <Avatar className="exchange-image" src={exchange.iconUrl} />
                        <Text><strong>{exchange.name}</strong></Text>
                      </Col>
                      <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                      <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                      <Col span={6}>{marketShare.toFixed(2)}%</Col>
                    </Row>
                  )}
                >
                  {HTMLReactParser(exchange.description || '')}
                </Panel>
              </Collapse>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Exchanges;
