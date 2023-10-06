import React, { useEffect, useState } from 'react';
import './PlanetCard.css';
import { Link } from 'react-router-dom';
import { fetchPlanets } from '../../services/RocketService';

export function PlanetCard({ defaultImage }) {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        async function getPlanets() {
            const data = await fetchPlanets().catch(error => {
                console.error('API request failed:', error);
                return [];
            });
            setPlanets(data);
        }
        getPlanets();
    }, []);

    return (
        <>
            {planets.map(planet => (
                <div className='product-card' key={planet.id}>
                    <div className='comment-rocket'>
                        <h2>{planet.name}</h2>
                        <p className='product-description'>{planet.description}</p>
                        <Link to={`/planet/${planet.id}`} className='product-btn-group'>
                            <button>Detaylı İncele</button>
                        </Link>
                    </div>
                    <div className='rocket-img'>
                        <img alt='none' src={defaultImage || planet.imageUrl} />
                    </div>
                </div>
            ))}
        </>
    )
}

PlanetCard.defaultProps = {
    defaultImage: "/images/falcon-9.jpeg",
};