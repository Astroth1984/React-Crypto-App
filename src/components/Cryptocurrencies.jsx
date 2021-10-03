import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // console.log(cryptos);

    // useEffect is called whenever the component is rendered (at the start)
    //useEffect to update the properties 'searchTerm' & 'cryptosList'
    useEffect(() => {
        const filterData = cryptosList?.data?.coins.filter((coin) => coin.name?.toLowerCase().includes(searchTerm?.toLowerCase()));
        // using the useState to change dynamically the cryptos object before we map throu it
        setCryptos(filterData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return 'Loading...';
    // gutter in antDesign Row is the spaces between the items left and right
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
