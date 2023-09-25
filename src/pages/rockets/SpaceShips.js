import React from 'react'
import "../rockets/SpaceShips.css";
import { Container, Row, Col } from 'react-grid-system';
import { ProductCard } from '../../components/productCard/ProductCard';

export default function SpaceShips() {
    return (
        <Container>
            <section>
                <Row>
                    <Col className='space-ship-col' sm={12} md={8} lg={8}>
                        <article className='space-vehicle-container'>
                            <div className='product-list'>
                                <h1 id='space-vehicle-title'>Space Ships</h1>
                                <hr />
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                            </div>
                        </article>
                    </Col>
                </Row>
            </section>
        </Container>
    )
}

