'use client';

import { Navbar, Nav } from 'react-bootstrap';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header>
      <Navbar expand="lg" className={styles.navbar}>
        <Navbar.Brand href="/" className={styles.navbarBrand}>
          Восход
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.nav}>
            <Nav.Link href="/">Главная</Nav.Link>
            <Nav.Link href="/">О нас</Nav.Link>
            <Nav.Link href="/">Аренда</Nav.Link>
            <Nav.Link href="/">Контакты</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
