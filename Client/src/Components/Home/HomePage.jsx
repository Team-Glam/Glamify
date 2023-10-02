import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import CardList from '../CardList/CardList';
import Searchbar from '../Searchbar/Searchbar';
import NavBar from '../NavBar/NavBar';
import Filters from '../Filters/Filters';
import styles from './HomePage.module.css';
import usePagination from '../../Hooks/usePagination';
import { resetDetails } from '../../Redux/Features/productSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(resetDetails())
  }, [])

  const allProducts = useSelector((state) => state.product.allProducts);

  const { totalPages, currentItems, paginate, currentPage } =
    usePagination(allProducts);

  return (
    <div className={styles.container}>
      <NavBar />
      <Searchbar />
      <Filters />
      <CardList allProducts={currentItems} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Home;
