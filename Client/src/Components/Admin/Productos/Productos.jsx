import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Cards from '../Cards/Cards';

import Pagination from '../../Pagination/Pagination';
import Filters from '../../Filters/Filters';
import usePagination from '../../../Hooks/usePagination';
import NavBar from '../NavBar/NavBar';

const Productos = () => {
  const allProducts = useSelector((state) => state.product.allProducts);

  const { totalPages, currentItems, paginate, currentPage } =
    usePagination(allProducts);
  return (
    <div>
      <NavBar />
      <Searchbar />
      <Filters />
      <Cards allProducts={currentItems} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Productos;
