'use client';

import { useState, useEffect } from 'react';
import { getCars } from '../lib/api';
import styles from './CarList.module.css';

const defaultImage = '/images/buggati.jpg';

type CarListProps = {
  filters: any;
  page: number;
  onCarClick: (id: number) => void;
  onPageChange: (page: number) => void;
};

const CarList: React.FC<CarListProps> = ({ filters, page, onCarClick, onPageChange }) => {
  const [cars, setCars] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars(filters, page);
        console.log('Fetched cars:', data);
        setCars(data.list || []);
        setTotalPages(data.pages || 1);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setCars([]);
        setTotalPages(1);
      }
    };
    fetchCars();
  }, [filters, page]);

  return (
    <div className={styles.carList}>
      {cars.length > 0 ? (
        cars.map((car: any) => (
          <div key={car.id} onClick={() => onCarClick(car.id)} className={styles.carItem}>
            <img
              src={car.image || defaultImage}
              alt={car.brand}
              className={styles.carImage}
            />
            <div className={styles.carDetails}>
              <div className={styles.carStatus}>{car.status}</div>
              <div className={styles.carBrand}>{car.brand}</div>
              <div className={styles.carModel}>{car.model}</div>
              <div className={styles.carNumber}>{car.number}</div>
              <div className={styles.carPrice}>{car.price} ₽</div>
              <div className={styles.carTariff}>
                {Array.isArray(car.tariff) ? car.tariff.join(', ') : car.tariff}
              </div>
            </div>
            <button className={styles.carButton}>ЗАБРОНИРОВАТЬ</button>
          </div>
        ))
      ) : (
        <div>Не найдено</div>
      )}
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={index + 1 === page ? styles.activePage : ''}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarList;
