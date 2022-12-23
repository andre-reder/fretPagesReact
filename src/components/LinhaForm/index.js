import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import Select from 'react-select';
import NoData from '../NoData';
import { CustomStyle } from '../CustomSelectStyle';
import MyModal from '../Modal';
import useErrors from '../../hooks/useErrors';

import LinhasService from '../../services/LinhasService';
import TimeInput from '../../utils/TimeInput';
import isValorValid from '../../utils/isValorValid';
import isCapacidadeValid from '../../utils/isCapacidadeValid';
import isPontoEquilibValid from '../../utils/isPontoEquilibValid';
import isTimeValid from '../../utils/isTimeValid';
import isDiasOperantesMesValid from '../../utils/isDiasOperantesMesValid';
import onlyNumbers from '../../utils/onlyNumbers';
import formatCurrency from '../../utils/formatCurrency';

import Loader from '../Loader';

import { Form, ButtonContainer } from '../Form';

import FormGroup from '../FormGroup';

import Button from '../Button';
import Input from '../Input';
import { InputGroup } from '../InputGroup';
import { useAppContext } from '../../contexts/auth';

export default function LinhaForm({ page, buttonLabel, codLinhaSis }) {
  const [codLinha, setCodLinha] = useState('');
  const [sentido, setSentido] = useState('');
  const [valor, setValor] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [letreiro, setLetreiro] = useState('');
  const [operadora, setOperadora] = useState('');
  const [pontoEquilib, setPontoEquilib] = useState('');
  const [pontoEquilibLim, setPontoEquilibLim] = useState('');
  const [codGeo, setCodGeo] = useState('');
  const [routeId, setRouteId] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [horaChegada, setHoraChegada] = useState('');
  const [horaInicioEmb, setHoraInicioEmb] = useState('');
  const [diasOperantesMes, setDiasOperantesMes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectLoading, setIsSelectLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [apiLinhaFetched, setApiLinhaFetched] = useState(true);
  const [apiOpFetched, setApiOpFetched] = useState(true);
  const [doesOpListExists, setDoesOpListExists] = useState(true);

  const history = useHistory();
  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const { data, token, signOut } = useAppContext();
  const empresaData = data.selectedEmpresa;
  const userData = data.usuario;
  const codEmpresa = empresaData.value;
  const { codUsu, perfilUsu, usuario } = userData;

  const isFormValid = (codLinha && letreiro && sentido && valor
    && operadora && capacidade && pontoEquilib && pontoEquilibLim
    && codGeo && routeId && horaSaida && horaChegada && horaInicioEmb
    && diasOperantesMes && errors.length === 0);

  const sentidoOptions = [
    { value: 1, label: 'Ida' },
    { value: 2, label: 'Volta' },
  ];
  const [operadoraOptions, setOperadoraOptions] = useState([{}]);

  const getLinha = useCallback(async () => {
    const sentidoRoles = {
      1: 'Ida',
      2: 'Volta',
    };
    try {
      setIsLoading(true);
      const BodyLinha = await LinhasService.getLinha(
        {
          codUsu,
          perfilUsu,
          codLinhaSis,
          codEmpresa,
          token: encodeURIComponent(token),
        },
      );
      if (!BodyLinha.validado) {
        setIsLoading(false);
        signOut();
        return;
      }
      if (BodyLinha.codigo === 0) {
        toast.error(`Não foi possível recuperar os dados da linha (${BodyLinha.msg})`);
        setApiLinhaFetched(false);
      }
      const LinhaData = await BodyLinha.linha;
      setCodLinha(LinhaData.codLinhaF);
      setSentido({ value: LinhaData.sentido, label: sentidoRoles[LinhaData.sentido] });
      setValor(LinhaData.valorMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
      setCapacidade(LinhaData.capacidade);
      setLetreiro(LinhaData.letreiro.replace('.kml', ''));
      setOperadora({ value: LinhaData.codOperadora, label: LinhaData.descrOperadora });
      setPontoEquilib(LinhaData.pontoEquilib);
      setPontoEquilibLim(LinhaData.pontoEquilibLim);
      setCodGeo(LinhaData.codGeo);
      setRouteId(LinhaData.routeID);
      setHoraSaida(LinhaData.horaSaida);
      setHoraChegada(LinhaData.horaChegada);
      setHoraInicioEmb(LinhaData.horaInicioEmb);
      setDiasOperantesMes(LinhaData.diasRoda);
      setApiLinhaFetched(true);
    } catch (error) {
      toast.error(`Não foi possível recuperar os dados da linha (${error})`);
      setApiLinhaFetched(false);
    }
    setIsLoading(false);
  }, [codEmpresa, codLinhaSis, codUsu, perfilUsu, signOut, token]);

  const getOperadoras = useCallback(async () => {
    try {
      setIsSelectLoading(true);
      const BodyOperadoras = await LinhasService.getOperadoras(
        {
          codEmpresa,
          codUsu,
          perfilUsu,
          token: encodeURIComponent(token),
        },
      );
      if (!BodyOperadoras.validado) {
        signOut();
        return;
      }
      if (BodyOperadoras.codigo === 0) {
        toast.error(`Não foi possível recuperar os dados das operadoras (${BodyOperadoras.msg})`);
        setApiOpFetched(false);
      }
      setDoesOpListExists(BodyOperadoras.listaOp);
      const OperadorasData = await BodyOperadoras.operadoras;
      const opOptions = await OperadorasData?.map((op) => (
        { value: op.codOperadora, label: op.descrOperadora }
      ));
      setOperadoraOptions(opOptions);
      setApiOpFetched(true);
    } catch (error) {
      toast.error(`Não foi possível recuperar os dados das operadoras (${error})`);
      setApiOpFetched(false);
    }
    setIsSelectLoading(false);
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  useEffect(() => {
    if (page === 'EditarLinha') {
      getLinha();
    }
    getOperadoras();
  }, [getLinha, getOperadoras, page]);

  function handleGetLinhaTryAgain() {
    getLinha();
  }

  function handleGetOperadorasTryAgain() {
    getOperadoras();
  }

  function handleCodLinhaChange(event) {
    setCodLinha(event.target.value);

    if (!event.target.value) {
      setError({ field: 'codLinha', message: 'Código da linha é obrigatório' });
    } else {
      removeError('codLinha');
    }
  }

  function handleValorChange(event) {
    setValor(formatCurrency(event.target.value));

    if (!event.target.value || !isValorValid(event.target.value)) {
      setError({ field: 'valor', message: 'Valor deve ser de 5.000 a 30.000' });
    } else {
      removeError('valor');
    }
  }

  function handleCapacidadeChange(event) {
    setCapacidade(Number(onlyNumbers(event.target.value)));

    if (!isCapacidadeValid(event.target.value) || !event.target.value) {
      setError({ field: 'capacidade', message: 'Capacidade deve ser entre 7 e 50' });
    } else {
      removeError('capacidade');
    }
  }

  function handleLetreiroChange(event) {
    setLetreiro(event.target.value);

    if (!event.target.value) {
      setError({ field: 'letreiro', message: 'Letreiro é obrigatório' });
    } else {
      removeError('letreiro');
    }
  }

  function handlePontoEquilibChange(event) {
    setPontoEquilib(onlyNumbers(event.target.value));

    if (!event.target.value || !isPontoEquilibValid(event.target.value)) {
      setError({ field: 'pontoEquilib', message: 'Ponto de equilíbrio deve ser de 50% a 100%' });
    } else {
      removeError('pontoEquilib');
    }
  }

  function handlePontoEquilibLimChange(event) {
    setPontoEquilibLim(onlyNumbers(event.target.value));

    if (!event.target.value || !isPontoEquilibValid(event.target.value)) {
      setError({ field: 'pontoEquilibLim', message: 'Ponto de equilíbrio limite deve ser de 50% a 100%' });
    } else {
      removeError('pontoEquilibLim');
    }
  }

  function handleCodGeoChange(event) {
    setCodGeo(event.target.value);

    if (!event.target.value) {
      setError({ field: 'codGeo', message: 'Código GEO é obrigatório' });
    } else {
      removeError('codGeo');
    }
  }

  function handleRouteIdChange(event) {
    setRouteId(event.target.value);

    if (!event.target.value) {
      setError({ field: 'routeId', message: 'Route ID é obrigatório' });
    } else {
      removeError('routeId');
    }
  }

  function handleHoraSaidaChange(event) {
    setHoraSaida(event.target.value);

    if (!isTimeValid(event.target.value)) {
      setError({ field: 'horaSaida', message: 'Horário de partida é obrigatório' });
    } else {
      removeError('horaSaida');
    }
  }

  function handleHoraChegadaChange(event) {
    setHoraChegada(event.target.value);

    if (!isTimeValid(event.target.value)) {
      setError({ field: 'horaChegada', message: 'Horário de chegada é obrigatório' });
    } else {
      removeError('horaChegada');
    }
  }

  function handleHoraInicioEmbChange(event) {
    setHoraInicioEmb(event.target.value);

    if (!isTimeValid(event.target.value)) {
      setError({ field: 'horaInicioEmb', message: 'Horário de início dos embarques é obrigatório' });
    } else {
      removeError('horaInicioEmb');
    }
  }

  function handleDiasOperantesMesChange(event) {
    setDiasOperantesMes(Number(onlyNumbers(event.target.value)));

    if (!isDiasOperantesMesValid(event.target.value) || !event.target.value) {
      setError({ field: 'diasOperantesMes', message: 'Quantidade de dias deve ser entre 1 e 30' });
    } else {
      removeError('diasOperantesMes');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    async function handleUserAction() {
      if (page === 'NovaLinha') {
        try {
          setIsLoading(true);

          const bodyCreatedLinha = await LinhasService.createLinha(
            {
              codUsu,
              perfilUsu,
              usuario,
              codEmpresa,
              token: encodeURIComponent(token),
              reqBody: JSON.stringify({
                codOperadora: operadora.value,
                descrOperadora: operadora.label,
                codLinhaF: codLinha,
                letreiro,
                sentido: sentido.value,
                capacidade,
                valorMes: Number(valor.replace(/\D/g, '')) / 100,
                pontoEquilib,
                codGeo,
                routeID: routeId,
                pontoEquilibLim,
                horaSaida,
                horaChegada,
                horaInicioEmb,
                diasRoda: diasOperantesMes,
              }),
            },
          );
          setIsLoading(false);
          if (!bodyCreatedLinha.validado) {
            signOut();
            return;
          }
          setApiMessage(bodyCreatedLinha.msg);
          if (bodyCreatedLinha.codigo === 1) {
            setSuccess(true);
          }
          setModalShow(true);
        } catch (error) {
          setIsLoading(false);
          setApiMessage(error);
          setModalShow(true);
        }
      }

      if (page === 'EditarLinha') {
        try {
          setIsLoading(true);
          const bodyUpdatedLinha = await LinhasService.updateLinha(
            {
              codEmpresa,
              codUsu,
              perfilUsu,
              codLinhaSis,
              token: encodeURIComponent(token),
              reqBody: JSON.stringify({
                codOperadora: operadora.value,
                descrOperadora: operadora.label,
                letreiro,
                sentido: sentido.value,
                capacidade,
                valorMes: Number(valor.replace(/\D/g, '')) / 100,
                pontoEquilib: Number(pontoEquilib),
                pontoEquilibLim: Number(pontoEquilibLim),
                horaSaida,
                horaChegada,
                horaInicioEmb,
                diasRoda: diasOperantesMes,
              }),
            },
          );
          setIsLoading(false);
          if (!bodyUpdatedLinha.validado) {
            signOut();
            return;
          }
          setApiMessage(bodyUpdatedLinha.msg);
          if (bodyUpdatedLinha.codigo === 1) {
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
      {(doesOpListExists && apiLinhaFetched && apiOpFetched && !isLoading) && (
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
                  <FormGroup error={getErrorMessageByFieldName('codLinha')}>
                    <label htmlFor="codLinha">Código da linha *</label>
                    <Input
                      placeholder="Código da linha *"
                      value={codLinha}
                      onChange={handleCodLinhaChange}
                      maxLength={9}
                      disabled={page !== 'NovaLinha'}
                      error={getErrorMessageByFieldName('codLinha')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('letreiro')}>
                    <label htmlFor="letreiro">Letreiro da linha *</label>
                    <Input
                      placeholder="Letreiro da linha *"
                      value={letreiro}
                      onChange={handleLetreiroChange}
                      maxLength={100}
                      error={getErrorMessageByFieldName('letreiro')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('capacidade')}>
                    <label htmlFor="capacidade">Capacidade da linha *</label>
                    <Input
                      placeholder="Capacidade da linha *"
                      value={capacidade}
                      onChange={handleCapacidadeChange}
                      maxLength={2}
                      error={getErrorMessageByFieldName('capacidade')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('valor')}>
                    <label htmlFor="valor">Valor mensal *</label>
                    <Input
                      placeholder="Valor mensal *"
                      separator=","
                      value={valor}
                      onChange={handleValorChange}
                      maxLength={12}
                      error={getErrorMessageByFieldName('valor')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('codGeo')}>
                    <label htmlFor="codGeo">Código GEO *</label>
                    <Input
                      placeholder="Código GEO *"
                      value={codGeo}
                      onChange={handleCodGeoChange}
                      maxLength={15}
                      error={getErrorMessageByFieldName('codGeo')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('routeId')}>
                    <label htmlFor="routeId">Route ID *</label>
                    <Input
                      placeholder="Route ID *"
                      value={routeId}
                      onChange={handleRouteIdChange}
                      maxLength={50}
                      disabled={page !== 'NovaLinha'}
                      error={getErrorMessageByFieldName('routeId')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('pontoEquilib')}>
                    <label htmlFor="pontoEquilib">Ponto de equilíbrio *</label>
                    <Input
                      placeholder="Ponto de equilíbrio *"
                      value={pontoEquilib}
                      onChange={handlePontoEquilibChange}
                      maxLength={3}
                      error={getErrorMessageByFieldName('pontoEquilib')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('pontoEquilibLim')}>
                    <label htmlFor="pontoEquilibLim">Ponto de equilíbrio limite *</label>
                    <Input
                      placeholder="Ponto de equilíbrio limite *"
                      value={pontoEquilibLim}
                      onChange={handlePontoEquilibLimChange}
                      maxLength={3}
                      error={getErrorMessageByFieldName('pontoEquilibLim')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <InputGroup>
                    <FormGroup error={getErrorMessageByFieldName('horaSaida')}>
                      <label htmlFor="horaSaida">Horário de partida *</label>
                      <TimeInput
                        placeholder="Horário de partida *"
                        value={horaSaida}
                        onChange={handleHoraSaidaChange}
                        maxLength={5}
                        error={getErrorMessageByFieldName('horaSaida')}
                        autoComplete="new-password"
                      />
                    </FormGroup>
                    <FormGroup error={getErrorMessageByFieldName('horaChegada')}>
                      <label htmlFor="horaChegada">Horário de chegada *</label>
                      <TimeInput
                        placeholder="Horário de chegada *"
                        value={horaChegada}
                        onChange={handleHoraChegadaChange}
                        maxLength={5}
                        error={getErrorMessageByFieldName('horaChegada')}
                        autoComplete="new-password"
                      />
                    </FormGroup>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <FormGroup error={getErrorMessageByFieldName('horaInicioEmb')}>
                      <label htmlFor="horaInicioEmb">Hora de início dos embarques *</label>
                      <TimeInput
                        placeholder="Hora de início dos embarques *"
                        value={horaInicioEmb}
                        onChange={handleHoraInicioEmbChange}
                        maxLength={5}
                        error={getErrorMessageByFieldName('horaInicioEmb')}
                        autoComplete="new-password"
                      />
                    </FormGroup>
                    <FormGroup error={getErrorMessageByFieldName('diasOperantesMes')}>
                      <label htmlFor="horaInicioEmb">Dias operantes ao mês *</label>
                      <Input
                        placeholder="1 - 30"
                        value={diasOperantesMes}
                        onChange={handleDiasOperantesMesChange}
                        maxLength={2}
                        error={getErrorMessageByFieldName('diasOperantesMes')}
                        autoComplete="new-password"
                      />
                    </FormGroup>
                  </InputGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup>
                    <label htmlFor="operadora">Operadora *</label>
                    {page === 'NovaLinha' && (
                    <Select
                      value={{ value: operadora.value, label: operadora.label }}
                      options={operadoraOptions}
                      onChange={(opt) => {
                        setOperadora({ value: opt.value, label: opt.label });
                      }}
                      placeholder="Selecione a operadora"
                      styles={CustomStyle}
                      isDisabled={isSelectLoading}
                      isLoading={isSelectLoading}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                    {page !== 'NovaLinha' && (
                    <Select
                      value={{ value: operadora.value, label: operadora.label }}
                      options={operadoraOptions}
                      onChange={(opt) => {
                        setOperadora({ value: opt.value, label: opt.label });
                      }}
                      placeholder="Selecione a operadora"
                      styles={CustomStyle}
                      isDisabled
                      isLoading={isSelectLoading}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="sentido">Sentido *</label>
                    {page === 'NovaLinha' && (
                    <Select
                      value={{ value: sentido.value, label: sentido.label }}
                      options={sentidoOptions}
                      onChange={(opt) => {
                        setSentido({ value: opt.value, label: opt.label });
                      }}
                      placeholder="Selecione o sentido"
                      isDisabled={page !== 'NovaLinha'}
                      styles={CustomStyle}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                    {page !== 'NovaLinha' && (
                    <Select
                      value={{ value: sentido.value, label: sentido.label }}
                      options={sentidoOptions}
                      onChange={(opt) => {
                        setSentido({ value: opt.value, label: opt.label });
                      }}
                      placeholder="Selecione o sentido"
                      isDisabled={page !== 'NovaLinha'}
                      styles={CustomStyle}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <ButtonContainer>
                <Button type="submit" disabled={!isFormValid}>
                  {buttonLabel}
                </Button>
              </ButtonContainer>

            </Container>
          </Form>
        </motion.div>
      )}

      {(!doesOpListExists && apiLinhaFetched && apiOpFetched) && (
        <NoData icon="emptyBox" label="Esta empresa ainda não tem nenhuma operadora associada. Crie e associe uma operadora para cadastrar uma linha!" />
      )}

      {!apiOpFetched && (
        <NoData
          icon="sad"
          label={(
            <>
              Ocorreu um erro ao obter as operadoras para carregar o formulário.
              <button type="button" onClick={handleGetOperadorasTryAgain}>Tentar Novamente</button>
            </>
)}
        />
      )}

      {!apiLinhaFetched && (
      <NoData
        icon="sad"
        label={(
          <>
            Ocorreu um erro ao recuperar os dados da linha para edição.
            <button type="button" onClick={handleGetLinhaTryAgain}>Tentar Novamente</button>
            .
          </>
)}
      />
      )}

      {(page === 'NovaLinha' && success) && (
        <MyModal
          show={modalShow}
          type="action"
          actionButtonLabel="Vincular shape"
          title="Linha Salva!"
          closeButtonLabel="Fechar"
          modalBody={`${apiMessage}, não se esqueça de vincular um shape!`}
          onAction={() => {
            setModalShow(false);
            history.push(`/linhas/shape?routeId=${routeId}&letreiro=${letreiro}`);
          }}
          onClose={() => {
            setModalShow(false);
            setSuccess(false);
            setApiMessage('');
            setCodLinha('');
            setSentido('');
            setValor('');
            setCapacidade('');
            setLetreiro('');
            setOperadora('');
            setPontoEquilib('');
            setPontoEquilibLim('');
            setCodGeo('');
            setRouteId('');
            setHoraSaida('');
            setHoraChegada('');
            setHoraInicioEmb('');
            setDiasOperantesMes('');
          }}
        />
      )}

      {(page === 'NovaLinha' && !success) && (
      <MyModal
        show={modalShow}
        title="Não foi possível salvar a linha!"
        closeButtonLabel="Fechar"
        modalBody={`Por favor, tente novamente. Detalhe do erro: ${apiMessage}`}
        onClose={() => {
          setModalShow(false);
          setSuccess(false);
          setApiMessage('');
        }}
      />
      )}

      {(page === 'EditarLinha' && success) && (
      <MyModal
        show={modalShow}
        title="Linha editada!"
        closeButtonLabel="Fechar"
        modalBody={apiMessage}
        onClose={() => {
          history.push('/linhas');
        }}
      />
      )}

      {(page === 'EditarLinha' && !success) && (
      <MyModal
        show={modalShow}
        title="Não foi possível editar a linha!"
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

LinhaForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  codLinhaSis: PropTypes.number,
};

LinhaForm.defaultProps = {
  codLinhaSis: '',
};
