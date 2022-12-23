import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';
import { Container, ActiveItem, MenuItem } from './styles';
import bus from '../../assets/images/icons/bus.svg';
import user from '../../assets/images/icons/user.svg';
import exit from '../../assets/images/icons/exit.svg';
import home from '../../assets/images/icons/home.svg';
import vehicle from '../../assets/images/icons/vehicle.svg';
import passenger from '../../assets/images/icons/passenger.svg';
import route from '../../assets/images/icons/route.svg';
import chartPie from '../../assets/images/icons/chartPie.svg';
// import useLocalState from '../../hooks/useLocalState';
import { useAppContext } from '../../contexts/auth';

export default function Navbar({ active }) {
  const { data, signOut /* ,token */ } = useAppContext();
  // const empresaData = data.selectedEmpresa;
  const userData = data.usuario;
  // const codEmpresa = empresaData.value;
  const {
    /* codUsu, */ perfilUsu, /* usuario, */
  } = userData;

  return (
    <Container>
      {(perfilUsu == 10 || perfilUsu == 11 || perfilUsu == 12)
        ? (
          <>

            {active === 'Home'
              ? (
                <ActiveItem>
                  <Link to="/">
                    <MenuItem>
                      <img src={home} alt="home" />
                      Home
                    </MenuItem>
                  </Link>
                </ActiveItem>
              )
              : (
                <Link to="/">
                  <MenuItem>
                    <img src={home} alt="home" />
                    Home
                  </MenuItem>
                </Link>
              )}

            {active === 'Linhas' || active === 'Veiculos' || active === 'Passageiros' || active === 'Dashboard'
              ? (
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <MenuItem>
                        <img src={bus} alt="bus" />
                        {' '}
                        Fretamentos
                      </MenuItem>
                    </Accordion.Header>

                    {active === 'Passageiros' && (
                    <Accordion.Body>
                      <Link to="/dashboard">
                        <MenuItem>
                          <img src={chartPie} alt="dashboard" />
                          <label>Dashboard</label>
                        </MenuItem>
                      </Link>
                      <ActiveItem>
                        <Link to="/passageiros">
                          <MenuItem>
                            <img src={passenger} alt="passageiros" />
                            <label>Passageiros</label>
                          </MenuItem>
                        </Link>
                      </ActiveItem>
                    </Accordion.Body>
                    )}
                    {active === 'Dashboard' && (
                      <Accordion.Body>
                        <ActiveItem>
                          <Link to="/dashboard">
                            <MenuItem>
                              <img src={chartPie} alt="dashboard" />
                              <label>Dashboard</label>
                            </MenuItem>
                          </Link>
                        </ActiveItem>
                        <Link to="/passageiros">
                          <MenuItem>
                            <img src={passenger} alt="passageiros" />
                            <label>Passageiros</label>
                          </MenuItem>
                        </Link>
                      </Accordion.Body>
                    )}
                  </Accordion.Item>
                </Accordion>
              )
              : (
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <MenuItem>
                        <img src={bus} alt="bus" />
                        {' '}
                        Fretamentos
                      </MenuItem>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Link to="/dashboard">
                        <MenuItem>
                          <img src={chartPie} alt="passageiros" />
                          <label>Dashboard</label>
                        </MenuItem>
                      </Link>
                      <Link to="/passageiros">
                        <MenuItem>
                          <img src={passenger} alt="passageiros" />
                          <label>Passageiros</label>
                        </MenuItem>
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}

          </>
        )

        : (
          <>

            {active === 'Home'
              ? (
                <ActiveItem>
                  <Link to="/">
                    <MenuItem>
                      <img src={home} alt="home" />
                      Home
                    </MenuItem>
                  </Link>
                </ActiveItem>
              )
              : (
                <Link to="/">
                  <MenuItem>
                    <img src={home} alt="home" />
                    Home
                  </MenuItem>
                </Link>
              )}

            {active === 'Linhas' || active === 'Veiculos' || active === 'Passageiros' || active === 'Dashboard'
              ? (
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <MenuItem>
                        <img src={bus} alt="bus" />
                        {' '}
                        Fretamentos
                      </MenuItem>
                    </Accordion.Header>
                    {active === 'Dashboard' && (
                      <Accordion.Body>
                        <ActiveItem>
                          <Link to="/dashboard">
                            <MenuItem>
                              <img src={chartPie} alt="dashboard" />
                              <label>Dashboard</label>
                            </MenuItem>
                          </Link>
                        </ActiveItem>
                        <Link to="/linhas">
                          <MenuItem>
                            <img src={route} alt="bus" />
                            <label>Linhas</label>
                          </MenuItem>
                        </Link>
                        <Link to="/veiculos">
                          <MenuItem>
                            <img src={vehicle} alt="bus" />
                            <label>Veículos</label>
                          </MenuItem>
                        </Link>
                        <Link to="/passageiros">
                          <MenuItem>
                            <img src={passenger} alt="passageiros" />
                            <label>Passageiros</label>
                          </MenuItem>
                        </Link>
                      </Accordion.Body>
                    )}
                    {active === 'Linhas' && (
                    <Accordion.Body>
                      <Link to="/dashboard">
                        <MenuItem>
                          <img src={chartPie} alt="dashboard" />
                          <label>Dashboard</label>
                        </MenuItem>
                      </Link>
                      <ActiveItem>
                        <Link to="/linhas">
                          <MenuItem>
                            <img src={route} alt="bus" />
                            <label>Linhas</label>
                          </MenuItem>
                        </Link>
                      </ActiveItem>
                      <Link to="/veiculos">
                        <MenuItem>
                          <img src={vehicle} alt="bus" />
                          <label>Veículos</label>
                        </MenuItem>
                      </Link>
                      <Link to="/passageiros">
                        <MenuItem>
                          <img src={passenger} alt="passageiros" />
                          <label>Passageiros</label>
                        </MenuItem>
                      </Link>
                    </Accordion.Body>
                    )}
                    {active === 'Veiculos' && (
                    <Accordion.Body>
                      <Link to="/dashboard">
                        <MenuItem>
                          <img src={chartPie} alt="dashboard" />
                          <label>Dashboard</label>
                        </MenuItem>
                      </Link>
                      <Link to="/linhas">
                        <MenuItem>
                          <img src={route} alt="bus" />
                          <label>Linhas</label>
                        </MenuItem>
                      </Link>
                      <ActiveItem>
                        <Link to="/veiculos">
                          <MenuItem>
                            <img src={vehicle} alt="bus" />
                            <label>Veículos</label>
                          </MenuItem>
                        </Link>
                      </ActiveItem>
                      <Link to="/passageiros">
                        <MenuItem>
                          <img src={passenger} alt="passageiros" />
                          <label>Passageiros</label>
                        </MenuItem>
                      </Link>
                    </Accordion.Body>
                    )}
                    {active === 'Passageiros' && (
                    <Accordion.Body>
                      <Link to="/dashboard">
                        <MenuItem>
                          <img src={chartPie} alt="dashboard" />
                          <label>Dashboard</label>
                        </MenuItem>
                      </Link>
                      <Link to="/linhas">
                        <MenuItem>
                          <img src={route} alt="bus" />
                          <label>Linhas</label>
                        </MenuItem>
                      </Link>
                      <Link to="/veiculos">
                        <MenuItem>
                          <img src={vehicle} alt="bus" />
                          <label>Veículos</label>
                        </MenuItem>
                      </Link>
                      <ActiveItem>
                        <Link to="/passageiros">
                          <MenuItem>
                            <img src={passenger} alt="passageiros" />
                            <label>Passageiros</label>
                          </MenuItem>
                        </Link>
                      </ActiveItem>
                    </Accordion.Body>
                    )}
                  </Accordion.Item>
                </Accordion>
              )
              : (
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <MenuItem>
                        <img src={bus} alt="bus" />
                        {' '}
                        Fretamentos
                      </MenuItem>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Link to="/dashboard">
                        <MenuItem>
                          <img src={chartPie} alt="dashboard" />
                          <label>Dashboard</label>
                        </MenuItem>
                      </Link>
                      <Link to="/linhas">
                        <MenuItem>
                          <img src={route} alt="bus" />
                          <label>Linhas</label>
                        </MenuItem>
                      </Link>
                      <Link to="/veiculos">
                        <MenuItem>
                          <img src={vehicle} alt="bus" />
                          <label>Veículos</label>
                        </MenuItem>
                      </Link>
                      <Link to="/passageiros">
                        <MenuItem>
                          <img src={passenger} alt="passageiros" />
                          <label>Passageiros</label>
                        </MenuItem>
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}

            {active === 'Usuarios'
              ? (
                <ActiveItem>
                  <Link to="/usuarios">
                    <MenuItem>
                      <img src={user} alt="bus" />
                      Usuários
                    </MenuItem>
                  </Link>
                </ActiveItem>

              )
              : (
                <Link to="/usuarios">
                  <MenuItem>
                    <img src={user} alt="bus" />
                    Usuários
                  </MenuItem>
                </Link>
              )}
          </>
        )}

      <MenuItem onClick={() => signOut()}>
        <img src={exit} alt="bus" />
        Sair
      </MenuItem>

    </Container>
  );
}

Navbar.propTypes = {
  active: PropTypes.string.isRequired,
};
