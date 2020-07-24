
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';



import './styles.css';
import logo from '../../assets/logo.svg';


const Points = () => {

    const valor = 's';

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        })
    }, []);


    return (

        <div id="page-points">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para a Home
                </Link>
            </header>

            <form >
                <h1>Encontre pontos de coleta<br />próximos a você.</h1>
                <fieldset>
                    <legend>
                        <h2>Pontos de coleta</h2>
                    </legend>

                    <Map center={initialPosition} zoom={14} >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                    </Map>

                </fieldset>


            </form>
        </div>
    );
}

export default Points;