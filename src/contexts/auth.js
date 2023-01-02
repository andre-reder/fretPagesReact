import {
  createContext, useMemo, useCallback, useState, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';

import ValidacaoService from '../services/ValidacaoService';
import useLocalState from '../hooks/useLocalState';

const AuthContext = createContext({});

export function useAppContext() {
  const context = useContext(AuthContext);

  return context;
}

export function AuthProvider({ children }) {
  const [validado, setValidado] = useState(false);
  const [validadoLocalStorage, setValidadoLocalStorage] = useLocalState('validado');

  const [token, setToken] = useState('');
  const [tokenLocalStorage, setTokenLocalStorage] = useLocalState('token');

  const [usuario, setUsuario] = useState({});
  const [usuarioLocalStorage, setUsuarioLocalStorage] = useLocalState('userData');

  const [empresasList, setEmpresasList] = useState([{}]);
  const [empresasListLocalStorage, setEmpresasListLocalStorage] = useLocalState('empresasList');

  const [selectedEmpresa, setSelectedEmpresa] = useState({});
  const [selectedEmpresaLocalStorage, setSelectedEmpresaLocalStorage] = useLocalState('empresaData');

  const query = useQuery();
  const history = useHistory();
  const codValidaQuery = query.get('codValida');
  const codEmpresaQuery = query.get('codEmpresa');
  const perfilUsuQuery = query.get('perfilUsu');
  const codUsuQuery = query.get('codUsu');

  const validaAcesso = useCallback(async ({
    tk, codEmpresa, codUsu, perfilUsu,
  }) => {
    try {
      const BodyValida = await ValidacaoService.validaAcesso(
        {
          reqBody: JSON.stringify({
            codEmpresa: codEmpresa ?? codEmpresaQuery,
            codUsu: codUsu || codUsuQuery,
            perfilUsu: perfilUsu || perfilUsuQuery,
            codValida: tk || codValidaQuery,
          }),
        },
      );
      if (!BodyValida.validado) {
        setValidado(false);
        setValidadoLocalStorage(false);
        return;
      }

      setValidado(true);
      setValidadoLocalStorage(true);

      setToken(BodyValida.dadosNavega.tk);
      setTokenLocalStorage(BodyValida.dadosNavega.tk);

      setUsuario({
        codUsu: BodyValida.dadosNavega.codUsu,
        perfilUsu: BodyValida.dadosNavega.perfilUsu,
        usuario: BodyValida.dadosNavega.usuario,
      });
      setUsuarioLocalStorage({
        codUsu: BodyValida.dadosNavega.codUsu,
        perfilUsu: BodyValida.dadosNavega.perfilUsu,
        usuario: BodyValida.dadosNavega.usuario,
      });

      if (BodyValida.empresas) {
        setEmpresasList(BodyValida.empresas?.map((empresa) => (
          { value: empresa.codEmpresa, label: `${empresa.empF} | CNPJ: ${empresa.cnpj}` }
        )));
        setEmpresasListLocalStorage(BodyValida.empresas?.map((empresa) => (
          { value: empresa.codEmpresa, label: `${empresa.empF} | CNPJ: ${empresa.cnpj}` }
        )));
      }

      setSelectedEmpresa({
        value: BodyValida.dadosNavega.codEmpresa,
        label: BodyValida.dadosNavega.empresa,
      });
      setSelectedEmpresaLocalStorage({
        value: BodyValida.dadosNavega.codEmpresa,
        label: BodyValida.dadosNavega.empresa,
      });

      history.push();
    } catch (error) {
      setValidado(false);
    }
  }, [
    codEmpresaQuery,
    codUsuQuery,
    perfilUsuQuery,
    codValidaQuery,
    history,
    setEmpresasListLocalStorage,
    setSelectedEmpresaLocalStorage,
    setTokenLocalStorage,
    setUsuarioLocalStorage,
    setValidadoLocalStorage,
  ]);

  const makeLogin = useCallback(async (login, senha) => {
    if (!codValidaQuery) {
      try {
        const BodyTk = await ValidacaoService.getTk(
          {
            reqBody: JSON.stringify({
              login,
              senha,
              key: 218,
              apiCode: '22202320SM',
            }),
          },
        );
        if (BodyTk.codigo == 0) {
          toast.error('Login/senha inválidos!');
          setValidado(false);
          return;
        }
        setValidado(true);
        await validaAcesso({
          tk: BodyTk.dadosUsuNavega.tk,
          codEmpresa: BodyTk.dadosUsuNavega.codEmpresa,
          codUsu: BodyTk.dadosUsuNavega.codUsu,
          perfilUsu: BodyTk.dadosUsuNavega.perfilUsu,
        });
        history.push();
      } catch (error) {
        setValidado(false);
      }
    }
    if (codValidaQuery) {
      try {
        await validaAcesso({
          tk: decodeURIComponent(codValidaQuery),
          codEmpresa: codEmpresaQuery,
          codUsu: codUsuQuery,
          perfilUsu: perfilUsuQuery,
        });
      } catch (error) {
        setValidado(false);
      }
    }
  }, [codEmpresaQuery, perfilUsuQuery, codUsuQuery, codValidaQuery, history, validaAcesso]);

  const changeEmpresa = useCallback(({ value, label }) => {
    setSelectedEmpresa({ value, label });
    setSelectedEmpresaLocalStorage({ value, label });
  }, [setSelectedEmpresaLocalStorage]);

  const signOut = useCallback(() => {
    toast.error('Sessão encerrada, realize o login novamente', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    setValidado(false);
    setValidadoLocalStorage(false);

    setToken('');
    setTokenLocalStorage('');

    setUsuario({});
    setUsuarioLocalStorage({});

    setEmpresasList([{}]);
    setEmpresasListLocalStorage([{}]);

    setSelectedEmpresa({});
    setSelectedEmpresaLocalStorage({});
  }, [
    setEmpresasListLocalStorage,
    setSelectedEmpresaLocalStorage,
    setTokenLocalStorage,
    setUsuarioLocalStorage,
    setValidadoLocalStorage,
  ]);

  useEffect(() => {
    if (codValidaQuery) {
      makeLogin();
    }
  }, [codValidaQuery, makeLogin]);

  const appData = useMemo(() => ({
    signed: validadoLocalStorage || validado,
    signOut,
    Login: makeLogin,
    changeEmpresa,
    token: tokenLocalStorage || token,
    data: {
      usuario: usuarioLocalStorage || usuario,
      selectedEmpresa: selectedEmpresaLocalStorage || selectedEmpresa,
      empresasList: empresasListLocalStorage || empresasList,
    },
  }), [
    makeLogin,
    validado,
    empresasList,
    selectedEmpresa,
    token,
    usuario,
    empresasListLocalStorage,
    selectedEmpresaLocalStorage,
    usuarioLocalStorage,
    tokenLocalStorage,
    validadoLocalStorage,
    changeEmpresa,
    signOut,
  ]);

  return (
    <>
      <AuthContext.Provider value={appData}>
        {children}
      </AuthContext.Provider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
