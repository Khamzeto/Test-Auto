'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCarById } from '../../lib/api';
import { Carousel } from 'react-bootstrap';
import styles from './CarDetail.module.css';

const defaultImages = [
  '/images/buggati.jpg',
  '/images/buggati.jpg',
  '/images/buggati.jpg',
];

const CarDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const data = await getCarById(Number(id));
        setCar(data.item);
      };
      fetchCar();
    }
  }, [id]);

  const combinedImages =
    car && car.images && car.images.length > 0
      ? car.images.length > 1
        ? car.images
        : [...car.images, ...defaultImages.slice(0, 3 - car.images.length)]
      : defaultImages;

  return (
    <div className={styles.container}>
      {car ? (
        <>
          <button className={styles.backButton} onClick={() => router.back()}>
            <span className={styles.backIcon}>&lt;</span> ВЕРНУТЬСЯ В КАТАЛОГ
          </button>
          <div className={styles.detailContent}>
            <div className={styles.imageCarousel}>
              <Carousel>
                {combinedImages.map((image: any, index: number) => (
                  <Carousel.Item key={index}>
                    <img
                      className={`d-block w-100 ${styles.mainImage}`}
                      src={typeof image === 'string' ? image : image.image}
                      alt={`Slide ${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className={styles.thumbnailContainer}>
                {combinedImages.map((image: any, index: number) => (
                  <img
                    key={index}
                    className={styles.thumbnail}
                    src={typeof image === 'string' ? image : image.image}
                    alt={`Thumbnail ${index}`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.details}>
              <h1 className={styles.title}>
                {car.brand} {car.model}
              </h1>
              <h2 className={styles.subtitle}>{car.number}</h2>
              <div className={styles.status}>
                <span
                  className={car.status === 'Свободна' ? styles.free : styles.occupied}
                >
                  {car.status}
                </span>
                <span className={styles.tariff}>{car.tarif.join(', ')}</span>
              </div>
              <div className={styles.price}>
                <strong>{car.price} ₽ / сут</strong>
                <p>При аренде автомобиля от 7 суток</p>
                <p>Депозит от {car.deposit} ₽</p>
                <button className={styles.bookButton}>ЗАБРОНИРОВАТЬ</button>
              </div>
              <div className={styles.tariffDetails}>
                <h3>ТАРИФ</h3>
                <p>до 2 дней: 2000₽ / сутки</p>
                <p>до 6 дней: 6000₽ / сутки</p>
                <p>от 7 дней: 12000₽ / сутки</p>
              </div>
              <div className={styles.information}>
                <h3>ИНФОРМАЦИЯ</h3>
                <p>Год: 2023 {car.year}</p>
                <p>КПП: АКПП {car.kpp}</p>
                <p>Пробег: 25км {car.mileage} км</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};

export default CarDetail;
