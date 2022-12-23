import { ThemeProvider } from 'styled-components';
import GlobalStyles from './assets/styles/global';
import LoginRoute from './routes/LoginRoute';
import AllRoutes from './routes/AllRoutes';
import ClientRoutes from './routes/ClientRoutes';

import { useAppContext } from './contexts/auth';

import {
  Container, PageContainer, RouteContainer, ThemeRadioButtonsContainer,
} from './components/App/styles';
import ThemeRadioButton from './components/ThemeRadioButton';

import defaultTheme from './assets/styles/themes/default';
import darkTheme from './assets/styles/themes/dark';

import sun from './assets/images/icons/sun.svg';
import moon from './assets/images/icons/moon.svg';

import useLocalState from './hooks/useLocalState';

export default function Routes() {
  const [theme, setTheme] = useLocalState('theme', defaultTheme);
  const { signed, data } = useAppContext();
  const { usuario } = data;
  return signed
    ? (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <PageContainer>
            <RouteContainer>
              <div className="darkMode">
                <ThemeRadioButtonsContainer>
                  <ThemeRadioButton
                    onClick={() => setTheme(defaultTheme)}
                    selected={theme.colors.background != '#121212'}
                  >
                    <img src={sun} alt="lightTheme" />
                  </ThemeRadioButton>

                  <ThemeRadioButton
                    onClick={() => setTheme(darkTheme)}
                    selected={theme.colors.background == '#121212'}
                  >
                    <img src={moon} alt="darkTheme" />
                  </ThemeRadioButton>
                </ThemeRadioButtonsContainer>
              </div>

              {usuario.perfilUsu == 10 || usuario.perfilUsu == 11 || usuario.perfilUsu == 12
                ? (
                  <ClientRoutes />
                )
                : (
                  <AllRoutes />
                )}

            </RouteContainer>
          </PageContainer>
        </Container>
      </ThemeProvider>
    )
    : (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PageContainer>
          <div className="darkModeAtLoginPage">
            <ThemeRadioButtonsContainer>
              <ThemeRadioButton
                onClick={() => setTheme(defaultTheme)}
                selected={theme.colors.background != '#121212'}
              >
                <img src={sun} alt="lightTheme" />
              </ThemeRadioButton>

              <ThemeRadioButton
                onClick={() => setTheme(darkTheme)}
                selected={theme.colors.background == '#121212'}
              >
                <img src={moon} alt="darkTheme" />
              </ThemeRadioButton>
            </ThemeRadioButtonsContainer>
          </div>
        </PageContainer>
        <LoginRoute />
      </ThemeProvider>
    );
}
