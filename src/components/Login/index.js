import { useState, useCallback } from 'react';

import {
  LoginContainer,
} from './styles';
import { useAppContext } from '../../contexts/auth';
import busGif from '../../assets/images/busGif.gif';
import logo from '../../assets/images/Logo.svg';

import Input from '../Input';
import FormGroup from '../FormGroup';
import { ButtonContainer } from '../Form';
import Button from '../Button';
import Loader from '../Loader';

export default function Login() {
  const context = useAppContext();

  const [isLoading, setIsLoading] = useState(false);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const checkIsValidLogin = useCallback(() => {
    if (!context.signed) {
      setLogin('');
      setPassword('');
    }
  }, [context.signed]);

  async function handleLogin() {
    setIsLoading(true);
    await context.Login(login, password);
    setIsLoading(false);
    checkIsValidLogin();
  }

  function handleLoginChange(event) {
    setLogin(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <LoginContainer>
        <div className="asideGif">
          <img src={busGif} alt="busGif" />
        </div>

        <div className="asideLogin">
          <div className="loginTitle">
            <div className="labelTitle">
              <div>
                Bem-vindo ao Sismob!
              </div>
              <div className="subtitle">
                Realize abaixo seu login para acessar o sistema
              </div>
            </div>
            <img src={logo} alt="logo" />
          </div>

          <div className="loginForm">
            <div className="loginInput">
              <FormGroup>
                <label htmlFor="login">Login (CPF ou usuário)</label>
                <Input
                  placeholder="Login (CPF / usuario)"
                  value={login}
                  onChange={handleLoginChange}
                  autoComplete="new-password"
                />
              </FormGroup>
            </div>

            <div className="passwordInput">
              <FormGroup>
                <label htmlFor="senha">Senha</label>
                <Input
                  placeholder="********"
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  autoComplete="new-password"
                />
              </FormGroup>
            </div>
          </div>

          <ButtonContainer>
            <Button type="button" onClick={handleLogin}>
              Acessar
            </Button>
          </ButtonContainer>
        </div>
      </LoginContainer>
    </>
  );
}
