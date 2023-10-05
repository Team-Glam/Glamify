import { NavLink } from 'react-router-dom';
import styles from './AdminNavBar.module.css';
import glamify from '../../../assets/Glamify-logo-negro.png';

import { useAuth0 } from '@auth0/auth0-react';

const AdminNavBar = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <h1>CARGANDO...</h1>;

  return (
    <div className={styles.NavBarContainer}>
      <div className={styles.logoContainer}>
        <NavLink className={styles.create} to='/admin'>
          <img
            src={glamify}
            alt='Glamify Logo'
            className={styles.logo}
            title='Glamify'
          />
        </NavLink>
      </div>

      <div className={styles.containersecondary}>
        <NavLink to='/admin' className={styles.NavLink} title='INICIO'>
          INICIO
        </NavLink>
        <NavLink
          to='/admin/create'
          className={styles.NavLink}
          title='CREAR PRODUCTO'
        >
          CREAR
        </NavLink>
        <NavLink to='/admin/ventas' className={styles.NavLink} title='VENTAS'>
          VENTAS
        </NavLink>
        <NavLink
          to='/admin/productos'
          className={styles.NavLink}
          title='PRODUCTOS'
        >
          PRODUCTOS
        </NavLink>
        <NavLink
          to='/admin/usuarios'
          className={styles.NavLink}
          title='USUARIOS'
        >
          USUARIOS
        </NavLink>
        <NavLink to='/home' className={styles.NavLink} title='IR A LA TIENDA'>
          IR A LA TIENDA
        </NavLink>
      </div>
    </div>
  );
};

export default AdminNavBar;
