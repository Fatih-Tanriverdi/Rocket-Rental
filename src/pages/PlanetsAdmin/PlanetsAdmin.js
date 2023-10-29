import React, { useEffect } from 'react';
import "./PlanetsAdmin.css";
import { useState } from 'react';
import { checkToken } from '../../services/AuthService';
import { TableListComp } from '../../components/TableListComp/TableListComp';
import { deletePlanet, fetchPlanetsGet } from '../../services/PlanetService';
import EditModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Popover } from 'antd';


export default function UsersList() {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planets, setPlanets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            title: 'EDIT',
            key: 'Id',
            dataIndex: 'Id',
            render: (id, record) => (
                <button className="editButton" onClick={() => handleEditPlanet(id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'NAME',
            dataIndex: 'Name',
            key: 'user',
        },
        {
            title: 'SIRA',
            dataIndex: 'Sequence',
            key: 'sequence',
        },
        {
            title: 'LEVEL',
            dataIndex: 'DifficultyLevel',
            key: 'difficultyLevel',
        },
        {
            title: 'SUMMARY DESCRIPTION',
            key: 'summaryDescription',
            dataIndex: 'summaryDescription',
        },
        {
            title: 'DESCRIPTION',
            key: 'Description',
            dataIndex: 'Description',
            render: (text) => (
                <div className="table-cell">
                    <Popover content={text}>
                        {text}
                    </Popover>
                </div>
            ),
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function planetsData() {
            const url = "http://lambalog.com/api/planets";
            const data = await fetchPlanetsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setPlanets(data.value);
        }
        planetsData();
    }, []);

    const handleDeletePlanet = (id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deletePlanet(id)
            .then(() => {
                setPlanets((prevPlanetsData) =>
                    prevPlanetsData.filter((planet) => planet.Id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditPlanet = (id) => {
        const planetEdit = planets.find(planet => planet.Id === id);
        setSelectedPlanet(planetEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPlanet(null);
        setIsModalOpen(false);
    };

    return (
        <container className='orders-container'>
            <article className='orders-body'>
                <div className='orders-list'>
                    <TableListComp props={{ columns: columns, dataSource: planets }} text="planets" pageSearchType={"planets"} addButtonLabel={"Gezegen Ekle"} />
                    {isModalOpen && (
                        <EditModal planet={selectedPlanet} onCancel={handleModalClose} visible={isModalOpen} pageType={"planets"} addEditTitle={"Gezegen Güncelleme"} planetDelete={handleDeletePlanet} />
                    )}
                </div>
            </article>
        </container>
    )
}
