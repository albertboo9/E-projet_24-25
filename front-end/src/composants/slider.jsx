import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../styles/slider.css';

export default function Slider() {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const [tontinedata, setTontinedata] = useState([]);

  useEffect(() => {
    const fetchTontines = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Tontines');
        setTontinedata(response.data);
      } catch (error) {
        console.error('Error fetching tontines:', error);
      }
    };

    fetchTontines();
  }, []);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;

    if (scrollLeft === 0) {
      // Move to the end of the carousel
      carousel.scrollLeft = scrollWidth - clientWidth * 2;
    } else if (scrollLeft + clientWidth >= scrollWidth) {
      // Move to the start of the carousel
      carousel.scrollLeft = clientWidth;
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className='titre'>
        <h1> Mes tontines</h1>
      </div>
      <i id="left" onClick={() => carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth}>
        <box-icon type='solid' color='blue' name='chevron-left'></box-icon>
      </i>
      <ul className="carousel" ref={carouselRef}>
        {tontinedata.map((tontine) => (
          <li key={tontine.id} className="card">
            <div className="img"></div>
            <h2>{tontine.name}</h2>
            <span>{tontine.participants} membres</span>
            <div className='description'>
              <span>{tontine.description}</span>
            </div>
            <button><NavLink to="/home/tontine">Voir plus</NavLink></button>
          </li>
        ))}
      </ul>
      <i id="right" onClick={() => carouselRef.current.scrollLeft += carouselRef.current.offsetWidth}>
        <box-icon type='solid' color='blue' name='chevron-right'></box-icon>
      </i>
    </div>
  );
};
