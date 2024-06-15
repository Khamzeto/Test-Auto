'use client';

import { useState } from 'react';
import Filters from './components/Filters';
import CarList from './components/CarList';
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';

const Home = () => {
  const [filters, setFilters] = useState({ brand: [], model: [], tarif: [] });
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleCarClick = (id: number) => {
    router.push(`/car/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Filters onChange={handleFilterChange} />
      </div>
      <div className={styles.carListContainer}>
        <CarList
          filters={filters}
          page={page}
          onCarClick={handleCarClick}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
