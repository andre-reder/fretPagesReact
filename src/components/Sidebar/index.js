import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { Container, LogoContainer, OffcanvasStyle } from './styles';
import menu from '../../assets/images/icons/menu.svg';
import Navbar from '../Navbar';

import logo from '../../assets/images/Logo.svg';

export default function Sidebar({ active }) {
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(window.screen.width);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  window.onresize = () => setWidth(window.screen.width);

  return (
    width > 1199
      ? (
        <Container>
          <LogoContainer>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </LogoContainer>
          <Navbar active={active} />
        </Container>
      )
      : (
        <>
          <button className="menuButton" type="button" onClick={handleShow}>
            <img src={menu} alt="menu" />
          </button>
          <OffcanvasStyle>
            <Offcanvas show={show} onHide={handleClose} style={{ width: '50%' }}>
              <LogoContainer>
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </LogoContainer>
              <Navbar active={active} />
            </Offcanvas>
          </OffcanvasStyle>
        </>
      )

  );
}

Sidebar.propTypes = {
  active: PropTypes.string.isRequired,
};
