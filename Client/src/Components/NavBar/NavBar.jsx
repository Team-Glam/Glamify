
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import glamify from '../../assets/Glamify-logo-negro.png';

const NavBar = () => {
	return (
		<div className={styles.NavBarContainer}>
			<div className={styles.logoContainer}>
				<NavLink className={styles.create} to='/create'>
					<img
						src={glamify}
						alt='Glamify Logo'
						className={styles.logo}
						title='Glamify'
					/>
				</NavLink>
			</div>

			<div className={styles.containersecondary}>
        <NavLink to="/home" className={styles.NavLink} title="INICIO">
          INICIO
				</NavLink>
				<NavLink to='/hombre' className={styles.NavLink} title='HOMBRE'>
					HOMBRE
				</NavLink>
				<NavLink to='/mujer' className={styles.NavLink} title='MUJER'>
					MUJER
				</NavLink>
				<NavLink to='/accesorios' className={styles.NavLink} title='ACCESORIOS'>
					ACCESORIOS
				</NavLink>
			</div>
		</div>
	);
};

export default NavBar;
