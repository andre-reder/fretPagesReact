import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import Select from 'react-select';
import { CustomStyle } from '../CustomSelectStyle';
import MyModal from '../Modal';

import formatCpf from '../../utils/formatCpf';
import isCpfValid from '../../utils/isCpfValid';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import UsuariosService from '../../services/UsuariosService';

import Loader from '../Loader';

import { Form, ButtonContainer } from '../Form';

import FormGroup from '../FormGroup';

import Input from '../Input';
// import Select from '../Select';
import Button from '../Button';
import NoData from '../NoData';
import useLocalState from '../../hooks/useLocalState';
import { useAppContext } from '../../contexts/auth';

export default function UsuarioForm({ page, buttonLabel, codUsuAcesso }) {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [userType, setUserType] = useState('');

  const [changePassword, setChangePassword] = useState(false);

  const [consult, setConsult] = useState(false);
  const [printLetter, setPrintLetter] = useState(false);
  const [reportDownload, setReportDownload] = useState(false);
  const [passwordManagement, setPasswordManagement] = useState(false);
  const [documentsAccess, setDocumentsAccess] = useState(false);
  const [changeSettings, setChangeSettings] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [apiGetUsuarioFetched, setApiGetUsuarioFetched] = useState(true);

  const [userBeingEdited] = useLocalState('userBeingEdited');

  const { data, token, signOut } = useAppContext();
  const userData = data.usuario;
  const empresaData = data.selectedEmpresa;

  const history = useHistory();
  const codEmpresa = empresaData.value;
  const {
    codUsu, perfilUsu, usuario,
  } = userData;
  const userTypeQueryParam = userBeingEdited.userType;

  const userTypeOptions = [
    { value: 1, label: 'Administrador' },
    { value: 2, label: 'Padrão' },
    { value: 3, label: 'Motorista' },
  ];

  const userTypeRoles = {
    1: 'Administrador',
    2: 'Padrão',
    3: 'Motorista',
  };

  const userTypeOptionsWhenAdmOrDefault = [
    { value: 1, label: 'Administrador' },
    { value: 2, label: 'Padrão' },
  ];

  const userTypeOptionsWhenDriver = [
    { value: 3, label: 'Motorista' },
  ];

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormCreateValid = (cpf && name && email && password && passwordConfirmation && userType
    && errors.length === 0 && page === 'NovoUsuario');

  const isFormEditValid = (cpf && name && email && userType
    && errors.length === 0 && page === 'EditarUsuario');

  const getUsuario = useCallback(async () => {
    try {
      setIsLoading(true);

      const BodyUsuario = await UsuariosService.getUsuario(
        {
          codEmpresa,
          codUsu,
          perfilUsu,
          codUsuAcesso,
          token: encodeURIComponent(token),
        },
      );

      if (!BodyUsuario.validado) {
        signOut();
      }

      setCpf(BodyUsuario.cpf);
      setName(BodyUsuario.nome);
      setEmail(BodyUsuario.email);
      setUserType(BodyUsuario.perfilUsuCad);
      setConsult(BodyUsuario.permiteConsulta);
      setPrintLetter(BodyUsuario.permiteImpressao);
      setReportDownload(BodyUsuario.permiteDownRel);
      setPasswordManagement(BodyUsuario.permiteGeraSenha);
      setDocumentsAccess(BodyUsuario.permiteAcesDocs);
      setChangeSettings(BodyUsuario.permiteAlteraConf);

      setApiGetUsuarioFetched(true);
    } catch (error) {
      setApiGetUsuarioFetched(false);
    } finally {
      setIsLoading(false);
    }
  }, [codEmpresa, codUsu, codUsuAcesso, perfilUsu, signOut, token]);

  useEffect(
    () => {
      if (page === 'EditarUsuario') {
        getUsuario();
      }
    },
    [getUsuario, page],
  );

  function handleGetUsuarioTryAgain() {
    getUsuario();
  }

  function handleCpfChange(event) {
    setCpf(formatCpf(event.target.value));

    if (!isCpfValid(event.target.value)) {
      setError({ field: 'cpf', message: 'CPF inválido' });
    } else {
      removeError('cpf');
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (!isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido!' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Senha é obrigatória!' });
    } else if (event.target.value) {
      removeError('password');
    } if (event.target.value !== passwordConfirmation) {
      setError({ field: 'passwordConfirmation', message: 'Senhas divergentes' });
    } else if (event.target.value === passwordConfirmation) {
      removeError('passwordConfirmation');
    }
  }

  function handlePasswordConfirmationChange(event) {
    setPasswordConfirmation(event.target.value);

    if (event.target.value !== password) {
      setError({ field: 'passwordConfirmation', message: 'Senhas divergentes' });
    } else {
      removeError('passwordConfirmation');
    }
  }

  function handleChangePasswordChange(event) {
    if (event.target.checked) {
      setChangePassword(true);
    } else {
      setChangePassword(false);
    }
  }

  function handleConsultChange(event) {
    if (userType == '2') {
      setConsult(event.target.checked);
    } else if (userType === '3') {
      setConsult(false);
    } else if (userType === '1') {
      setConsult(true);
    }
  }

  function handlePrintLetterChange(event) {
    if (userType == '2') {
      setPrintLetter(event.target.checked);
    } else if (userType === '3') {
      setPrintLetter(false);
    } else if (userType === '1') {
      setPrintLetter(true);
    }
  }

  function handleReportDownloadChange(event) {
    if (userType == '2') {
      setReportDownload(event.target.checked);
    } else if (userType === '3') {
      setReportDownload(false);
    } else if (userType === '1') {
      setReportDownload(true);
    }
  }

  function handlePasswordManagementChange(event) {
    if (userType == '2') {
      setPasswordManagement(event.target.checked);
    } else if (userType === '3') {
      setPasswordManagement(false);
    } else if (userType === '1') {
      setPasswordManagement(true);
    }
  }

  function handleDocumentsAccessChange(event) {
    if (userType == '2') {
      setDocumentsAccess(event.target.checked);
    } else if (userType === '3') {
      setDocumentsAccess(false);
    } else if (userType === '1') {
      setDocumentsAccess(true);
    }
  }

  function handleChangeSettingsChange(event) {
    if (userType == '2') {
      setChangeSettings(event.target.checked);
    } else if (userType === '3') {
      setChangeSettings(false);
    } else if (userType === '1') {
      setChangeSettings(true);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    async function handleUserAction() {
      if (page === 'NovoUsuario' && userType == 1) {
        try {
          setIsLoading(true);
          const bodyCreatedUser = await UsuariosService.createUsuario(
            {
              reqBody: JSON.stringify({
                codEmpresa,
                codUsu,
                perfilUsu,
                usuario,
                codUsuAcesso: 0,
                nome: name,
                cpf,
                email,
                perfilUsuCad: userType,
                senha: password,
                permiteConsulta: true,
                permiteImpressao: true,
                permiteDownRel: true,
                alteraSenha: true,
                permiteGeraSenha: true,
                permiteAcesDocs: true,
                permiteAlteraConf: true,
                tk: token,
              }),
            },
          );
          setIsLoading(false);
          setApiMessage(bodyCreatedUser.msg);
          if (bodyCreatedUser.codigo === 1) {
            setSuccess(true);
          }
          if (!bodyCreatedUser.validado) {
            signOut();
          }
          setModalShow(true);
        } catch (error) {
          setIsLoading(false);
          setApiMessage(error);
          setModalShow(true);
        }
      }

      if (page === 'NovoUsuario' && userType == 2) {
        try {
          setIsLoading(true);
          const bodyCreatedUser = await UsuariosService.createUsuario(
            {
              reqBody: JSON.stringify({
                codEmpresa,
                codUsu,
                perfilUsu,
                usuario,
                codUsuAcesso: 0,
                nome: name,
                cpf,
                email,
                perfilUsuCad: userType,
                senha: password,
                permiteConsulta: consult,
                permiteImpressao: printLetter,
                permiteDownRel: reportDownload,
                permiteGeraSenha: passwordManagement,
                alteraSenha: true,
                permiteAcesDocs: documentsAccess,
                permiteAlteraConf: changeSettings,
                tk: token,
              }),
            },
          );
          setIsLoading(false);
          setApiMessage(bodyCreatedUser.msg);
          if (bodyCreatedUser.codigo === 1) {
            setSuccess(true);
          }
          if (!bodyCreatedUser.validado) {
            signOut();
          }
          setModalShow(true);
        } catch (error) {
          setIsLoading(false);
          setApiMessage(error);
          setModalShow(true);
        }
      }

      if (page === 'NovoUsuario' && userType == 3) {
        try {
          setIsLoading(true);
          const bodyCreatedUser = await UsuariosService.createUsuario(
            {
              reqBody: JSON.stringify({
                codEmpresa,
                codUsu,
                perfilUsu,
                usuario,
                codUsuAcesso: 0,
                nome: name,
                cpf,
                email,
                perfilUsuCad: userType,
                senha: password,
                permiteConsulta: false,
                permiteImpressao: false,
                permiteDownRel: false,
                permiteGeraSenha: passwordManagement,
                alteraSenha: true,
                permiteAcesDocs: false,
                permiteAlteraConf: false,
                tk: token,
              }),
            },
          );
          setIsLoading(false);
          setApiMessage(bodyCreatedUser.msg);
          if (bodyCreatedUser.codigo === 1) {
            setSuccess(true);
          }
          if (!bodyCreatedUser.validado) {
            signOut();
          }
          setModalShow(true);
        } catch (error) {
          setIsLoading(false);
          setApiMessage(error);
          setModalShow(true);
        }
      }

      if (page === 'EditarUsuario' && userType == 1) {
        try {
          setIsLoading(true);
          const bodyUpdatedUser = await UsuariosService.updateUsuario({
            reqBody: JSON.stringify({
              codEmpresa,
              codUsu,
              perfilUsu,
              usuario,
              codUsuAcesso,
              nome: name,
              cpf,
              email,
              perfilUsuCad: userType,
              senha: password,
              permiteConsulta: true,
              permiteImpressao: true,
              permiteDownRel: true,
              permiteGeraSenha: true,
              alteraSenha: changePassword,
              permiteAcesDocs: true,
              permiteAlteraConf: true,
              tk: token,
            }),
          });
          if (!bodyUpdatedUser.validado) {
            signOut();
          }
          setIsLoading(false);
          setApiMessage(bodyUpdatedUser.msg);
          if (bodyUpdatedUser.codigo === 1) {
            setSuccess(true);
          }

          setModalShow(true);
        } catch (error) {
          setIsLoading(false);
          setApiMessage(error);
          setModalShow(true);
        }
      }

      if (page === 'EditarUsuario' && userType == 2) {
        try {
          setIsLoading(true);
          const bodyUpdatedUser = await UsuariosService.updateUsuario({
            reqBody: JSON.stringify({
              codEmpresa,
              codUsu,
              perfilUsu,
              usuario,
              codUsuAcesso,
              nome: name,
              cpf,
              email,
              perfilUsuCad: userType,
              senha: password,
              permiteConsulta: consult,
              permiteImpressao: printLetter,
              permiteDownRel: reportDownload,
              permiteGeraSenha: passwordManagement,
              alteraSenha: changePassword,
              permiteAcesDocs: documentsAccess,
              permiteAlteraConf: changeSettings,
              tk: token,
            }),
          });
          if (!bodyUpdatedUser.validado) {
            signOut();
          }
          setIsLoading(false);
          setApiMessage(bodyUpdatedUser.msg);
          if (bodyUpdatedUser.codigo === 1) {
            setSuccess(true);
          }

          setModalShow(true);
        } catch (error) {
          setIsLoading(false);
          setApiMessage(error);
          setModalShow(true);
        }
      }

      if (page === 'EditarUsuario' && userType == 3) {
        try {
          setIsLoading(true);
          const bodyUpdatedUser = await UsuariosService.updateUsuario({
            reqBody: JSON.stringify({
              codEmpresa,
              codUsu,
              perfilUsu,
              usuario,
              codUsuAcesso,
              nome: name,
              cpf,
              email,
              perfilUsuCad: userType,
              senha: password,
              permiteConsulta: false,
              permiteImpressao: false,
              permiteDownRel: false,
              permiteGeraSenha: false,
              alteraSenha: changePassword,
              permiteAcesDocs: false,
              permiteAlteraConf: false,
              tk: token,
            }),
          });
          if (!bodyUpdatedUser.validado) {
            signOut();
          }
          setIsLoading(false);
          setApiMessage(bodyUpdatedUser.msg);
          if (bodyUpdatedUser.codigo === 1) {
            setSuccess(true);
          }

          setModalShow(true);
        } catch (error) {
          setIsLoading(false);
          setApiMessage(error);
          setModalShow(true);
        }
      }
    }
    handleUserAction();
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      {(apiGetUsuarioFetched && !isLoading) && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: 'tween', stiffness: 10 }}
        >
          <Form onSubmit={handleSubmit} noValidate autoComplete="new-password">
            <Container>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('cpf')}>
                    <label htmlFor="cpf">CPF *</label>
                    <Input
                      placeholder="CPF *"
                      value={cpf}
                      onChange={handleCpfChange}
                      maxLength={14}
                      disabled={page !== 'NovoUsuario' && cpf !== 'Não Cadastrado'}
                      error={getErrorMessageByFieldName('cpf')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('name')}>
                    <label htmlFor="name">Nome *</label>
                    <Input
                      placeholder="Nome *"
                      value={name}
                      onChange={handleNameChange}
                      error={getErrorMessageByFieldName('name')}
                      maxLength={25}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
              </Row>
              {page === 'EditarUsuario' && (
              <Row>
                <Col>
                  <FormGroup>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={changePassword} onChange={handleChangePasswordChange} />
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Alterar senha</label>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              )}
              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('password')}>
                    <label htmlFor="password">Senha *</label>
                    <Input
                      type="password"
                      placeholder="Senha *"
                      value={password}
                      maxLength={8}
                      onChange={handlePasswordChange}
                      disabled={page !== 'NovoUsuario' && !changePassword}
                      error={getErrorMessageByFieldName('password')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('passwordConfirmation')}>
                    <label htmlFor="passwordConfirmation">Confirme a senha *</label>
                    <Input
                      type="password"
                      placeholder="Confirme a senha *"
                      value={passwordConfirmation}
                      maxLength={8}
                      onChange={handlePasswordConfirmationChange}
                      disabled={page !== 'NovoUsuario' && !changePassword}
                      error={getErrorMessageByFieldName('passwordConfirmation')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={userType == '2' ? 3 : 2}>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('email')}>
                    <label htmlFor="email">E-mail *</label>
                    <Input
                      type="email"
                      placeholder="E-mail *"
                      value={email}
                      maxLength={50}
                      onChange={handleEmailChange}
                      error={getErrorMessageByFieldName('email')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="userType">Tipo de usuário *</label>
                    {page === 'EditarUsuario' && userType != 3 && (
                    <Select
                      defaultValue={{ value: userType, label: userTypeQueryParam }}
                      options={userTypeOptionsWhenAdmOrDefault}
                      onChange={(opt) => setUserType(opt.value)}
                      placeholder="Selecione um tipo de usuário"
                      styles={CustomStyle}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                    {page === 'EditarUsuario' && userType == 3 && (
                    <Select
                      defaultValue={{ value: userType, label: userTypeQueryParam }}
                      options={userTypeOptionsWhenDriver}
                      onChange={(opt) => setUserType(opt.value)}
                      placeholder="Selecione um tipo de usuário"
                      styles={CustomStyle}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                    {page === 'NovoUsuario' && (
                    <Select
                      value={{ value: userType, label: userTypeRoles[userType] }}
                      options={userTypeOptions}
                      onChange={(opt) => setUserType(opt.value)}
                      placeholder="Selecione um tipo de usuário"
                      styles={CustomStyle}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                  </FormGroup>
                </Col>
                {userType == '2' && (
                <Col>
                  <FormGroup>
                    <label htmlFor="permissions">Permissões</label>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={consult} onChange={handleConsultChange} />
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Consultas</label>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={printLetter} onChange={handlePrintLetterChange} />
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Imprimir cartas</label>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={reportDownload} onChange={handleReportDownloadChange} />
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Download relatórios</label>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={passwordManagement} onChange={handlePasswordManagementChange} />
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Gestão de senhas</label>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={documentsAccess} onChange={handleDocumentsAccessChange} />
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Acesso a documentos</label>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={changeSettings} onChange={handleChangeSettingsChange} />
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Alterar dados e configurações</label>
                    </div>
                  </FormGroup>
                </Col>
                )}
              </Row>
            </Container>

            <ButtonContainer>
              <Button type="submit" disabled={page === 'NovoUsuario' ? !isFormCreateValid : !isFormEditValid}>
                {buttonLabel}
              </Button>
            </ButtonContainer>

          </Form>
        </motion.div>
      )}

      {!apiGetUsuarioFetched && (
        <NoData
          icon="sad"
          label={(
            <>
              Ocorreu um erro ao recuperar os dados do usuário.
              <button type="button" onClick={handleGetUsuarioTryAgain}>Tentar Novamente</button>

            </>
)}
        />
      )}

      {page === 'NovoUsuario' && success && (
        <MyModal
          show={modalShow}
          title="Usuário Salvo!"
          closeButtonLabel="Fechar"
          modalBody={apiMessage}
          onClose={() => {
            setModalShow(false);
            setCpf('');
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            setUserType({ value: '', label: '' });
            setConsult(false);
            setPrintLetter(false);
            setReportDownload(false);
            setPasswordManagement(false);
            setDocumentsAccess(false);
            setChangeSettings(false);
            setSuccess(false);
            setApiMessage('');
          }}
        />
      )}

      {page === 'NovoUsuario' && !success && (
      <MyModal
        show={modalShow}
        title="Não foi possível salvar o usuário!"
        closeButtonLabel="Fechar"
        modalBody={`Por favor, tente novamente. Detalhe do erro: ${apiMessage}`}
        onClose={() => {
          setModalShow(false);
          setCpf('');
          setName('');
          setEmail('');
          setPassword('');
          setPasswordConfirmation('');
          setUserType('');
          setConsult(false);
          setPrintLetter(false);
          setReportDownload(false);
          setPasswordManagement(false);
          setDocumentsAccess(false);
          setChangeSettings(false);
          setSuccess(false);
          setApiMessage('');
        }}
      />
      )}

      {page === 'EditarUsuario' && success && (
      <MyModal
        show={modalShow}
        title="Usuário editado!"
        closeButtonLabel="Fechar"
        modalBody={apiMessage}
        onClose={() => {
          history.push('/usuarios');
        }}
      />
      )}

      {page === 'EditarUsuario' && !success && (
      <MyModal
        show={modalShow}
        title="Não foi possível editar o usuário!"
        closeButtonLabel="Fechar"
        modalBody={`Por favor, tente novamente. Detalhe do erro: ${apiMessage}`}
        onClose={() => {
          setModalShow(false);
          setSuccess(false);
          setApiMessage('');
        }}
      />
      )}

    </>
  );
}

UsuarioForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  codUsuAcesso: PropTypes.number,
};

UsuarioForm.defaultProps = {
  codUsuAcesso: '',
};
