/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CustomStyle } from '../CustomSelectStyle';
import MyModal from '../Modal';
import useErrors from '../../hooks/useErrors';
import isAnoValid from '../../utils/isAnoValid';
import isCapacidadeValid from '../../utils/isCapacidadeValid';
import isConsumoValid from '../../utils/isConsumoValid';
import onlyNumbers from '../../utils/onlyNumbers';

import VeiculosService from '../../services/VeiculosService';

import Loader from '../Loader';

import { Form, ButtonContainer } from '../Form';

import FormGroup from '../FormGroup';

import Button from '../Button';
import Input from '../Input';
import NoData from '../NoData';
import useLocalState from '../../hooks/useLocalState';
import { useAppContext } from '../../contexts/auth';

export default function VeiculoForm({ page, buttonLabel, codVeiculoSis }) {
  const [ano, setAno] = useState('');
  const [tipoTransp, setTipoTransp] = useState('');
  const [tipoTranspValue, setTipoTranspValue] = useState('');
  const [codVeiculo, setCodVeiculo] = useState('');
  const [marca, setMarca] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [consumo, setConsumo] = useState('');
  const [locTrab, setLocTrab] = useState('');
  const [linhasFretado, setLinhasFretado] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSelectLoading, setIsSelectLoading] = useState(false);
  const [isLinhasSelectLoading, setIsLinhasSelectLoading] = useState(false);
  const [isLinhasSelectDisabled, setIsLinhasSelectDisabled] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [apiVeiculoFetched, setApiVeiculoFetched] = useState(true);
  const [apiLtFetched, setApiLtFetched] = useState(true);
  const [doesListLtsExists, setDoesListLtExists] = useState(true);
  const [qrCode, setQrCode] = useState('');

  const [, setVeiculoQrCodeBeingShow] = useLocalState('veiculoQrCodeBeingShow');

  const history = useHistory();
  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const animatedComponents = makeAnimated();
  const { data, token, signOut } = useAppContext();
  const { selectedEmpresa } = data;
  const userData = data.usuario;
  const codEmpresa = selectedEmpresa.value;
  const empF = selectedEmpresa.label;
  const {
    codUsu, perfilUsu, usuario,
  } = userData;

  const isFormValid = (ano && tipoTransp && codVeiculo && marca && capacidade && consumo
    && errors.length === 0);

  const [locTrabOptions, setLocTrabOptions] = useState([{}]);
  const [linhasOptions, setLinhasOptions] = useState([{}]);

  const tipoVeiculo = [
    { value: 1, label: 'Ônibus' },
    { value: 2, label: 'Van' },
    { value: 3, label: 'Micro' },
    { value: 4, label: 'Outros' },
  ];

  const rolesTipoTrans = {
    1: 'Ônibus',
    2: 'Van',
    3: 'Micro',
    4: 'Outros',
  };

  const getVeiculo = useCallback(async () => {
    try {
      setIsLoading(true);

      const BodyVeiculo = await VeiculosService.getVeiculo(
        {
          codUsu,
          codVeiculoSis,
          perfilUsu,
          codEmpresa,
          token:
          encodeURIComponent(token),
        },
      );
      if (!BodyVeiculo.validado) {
        signOut();
        return;
      }
      const VeiculoData = await BodyVeiculo.veiculo;

      if (BodyVeiculo.locTrabLinhas?.codLocTrab) {
        const bodyLinhas = await VeiculosService.getLinhas({
          codLocTrab: BodyVeiculo.locTrabLinhas.codLocTrab,
          codUsu,
          perfilUsu,
          codEmpresa,
          token: encodeURIComponent(token),
        });
        if (!bodyLinhas.validado) {
          signOut();
          return;
        }
        const LinhasData = await bodyLinhas.linhasFretado;
        const lnhOptions = await LinhasData.map((linha) => (
          { value: linha.routeID, label: linha.letreiro }
        ));
        setLinhasOptions(lnhOptions);
        setLinhasFretado(BodyVeiculo.linhasFretaAssoc.map((linha) => (
          { value: linha.routeID, label: linha.letreiro }
        )));
        setLocTrab({
          value: BodyVeiculo.locTrabLinhas.codLocTrab,
          label: BodyVeiculo.locTrabLinhas.descrLocTrab,
        });
      }

      setAno(VeiculoData.modelo);
      setTipoTransp(VeiculoData.tipoTransporte);
      setTipoTranspValue(VeiculoData.CodtipoTransp);
      setCodVeiculo(VeiculoData.codVeiculo);
      setMarca(VeiculoData.marca);
      setCapacidade(VeiculoData.capacidade);
      setConsumo(VeiculoData.consumo);
      setApiVeiculoFetched(true);
    } catch (error) {
      setApiVeiculoFetched(false);
    }
    setIsLoading(false);
    setIsSelectLoading(false);
    setIsLinhasSelectLoading(false);
    setIsLinhasSelectDisabled(false);
  }, [codUsu, codVeiculoSis, codEmpresa, perfilUsu, signOut, token]);

  const getLocTrab = useCallback(async () => {
    try {
      setIsSelectLoading(true);
      const bodyLocTrabs = await VeiculosService.getLocTrab({
        codEmpresa,
        codUsu,
        perfilUsu,
        token: encodeURIComponent(token),
      });
      if (!bodyLocTrabs.validado) {
        signOut();
        return;
      }
      const locTrabsData = await bodyLocTrabs.locaisTrabalho;
      const ltOptions = await locTrabsData?.map((lt) => (
        { value: lt.codLocTrab, label: lt.descrLocTrab }
      ));
      setLocTrabOptions(ltOptions);
      setDoesListLtExists(bodyLocTrabs.listaLT);
      setIsLinhasSelectDisabled(bodyLocTrabs.listaLT);
      setApiLtFetched(true);
    } catch (error) {
      setApiLtFetched(false);
    }
    setIsSelectLoading(false);
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  useEffect(() => {
    if (page === 'EditarVeiculo') {
      getVeiculo();
    }
    getLocTrab();
  }, [getVeiculo, getLocTrab, page]);

  function handleGetVeiculoTryAgain() {
    getVeiculo();
  }

  function handleGetLocTrabTryAgain() {
    getLocTrab();
  }

  function handleAnoChange(event) {
    setAno(Number(onlyNumbers(event.target.value)));

    if (!isAnoValid(event.target.value) || !event.target.value) {
      setError({ field: 'ano', message: 'Ano deve ser de 2000 ao ano atual' });
    } else {
      removeError('ano');
    }
  }

  function handleCodVeiculoChange(event) {
    setCodVeiculo(event.target.value);
    if (!event.target.value) {
      setError({ field: 'codVeiculo', message: 'Código do veículo é obrigatório' });
    } else {
      removeError('codVeiculo');
    }
  }

  function handleMarcaChange(event) {
    setMarca(event.target.value);
    if (!event.target.value) {
      setError({ field: 'marca', message: 'Marca do veículo é obrigatória' });
    } else {
      removeError('marca');
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

  function handleConsumoChange(event) {
    setConsumo(Number(onlyNumbers(event.target.value)));

    if (!isConsumoValid(event.target.value) || !event.target.value) {
      setError({ field: 'consumo', message: 'Consumo deve ser entre 5 e 20' });
    } else {
      removeError('consumo');
    }
  }

  async function handleLocTrabChange({ value, label }) {
    setLocTrab({ value, label });
    try {
      setIsSelectLoading(true);
      setIsLinhasSelectLoading(true);
      setIsLinhasSelectDisabled(true);

      const bodyLinhas = await VeiculosService.getLinhas({
        codLocTrab: value,
        codUsu,
        perfilUsu,
        codEmpresa,
        token: encodeURIComponent(token),
      });
      if (!bodyLinhas.validado) {
        signOut();
        return;
      }
      const LinhasData = await bodyLinhas.linhasFretado;
      const lnhOptions = await LinhasData?.map((linha) => (
        { value: linha.routeID, label: `${linha.routeID.split('+')[1]} - ${linha.letreiro}` }
      ));
      setLinhasOptions(
        lnhOptions || { value: '', label: 'Não existem linhas associadas à este local de trabalho' },
      );
      // setLinhasFretado([]);
    } catch (error) {
      console.log(error);
    }
    setIsSelectLoading(false);
    setIsLinhasSelectLoading(false);
    setIsLinhasSelectDisabled(false);
  }

  function handleLinhasChange(opt) {
    setLinhasFretado(opt);
  }

  function handleSubmit(event) {
    event.preventDefault();
    async function handleUserAction() {
      if (page === 'NovoVeiculo') {
        try {
          setIsLoading(true);

          const bodyCreatedVeiculo = await VeiculosService.createVeiculo(
            {
              codUsu,
              perfilUsu,
              usuario,
              codEmpresa,
              token: encodeURIComponent(token),
              reqBody: JSON.stringify({
                modelo: ano,
                tipoTransp,
                codVeiculo,
                marca,
                capacidade,
                consumo,
                linhasFretado: linhasFretado.map((linha) => (
                  { routeID: linha.value }
                )),
              }),
            },
          );
          setIsLoading(false);
          if (!bodyCreatedVeiculo.validado) {
            signOut();
            return;
          }
          setApiMessage(bodyCreatedVeiculo.msg);
          if (bodyCreatedVeiculo.codigo === 1) {
            setSuccess(true);
            setQrCode(bodyCreatedVeiculo.qRCode);
          }

          setModalShow(true);
        } catch (error) {
          setIsLoading(false);
          setApiMessage(error);
          setModalShow(true);
        }
      }

      if (page === 'EditarVeiculo') {
        try {
          setIsLoading(true);
          const bodyUpdatedVeiculo = await VeiculosService.updateVeiculo(
            {
              codUsu,
              usuario,
              perfilUsu,
              codEmpresa,
              token: encodeURIComponent(token),
              codVeiculoSis,
              consumo,
              reqBody: JSON.stringify(
                linhasFretado.map((linha) => (
                  { routeID: linha.value }
                )),
              ),
            },
          );
          setIsLoading(false);
          if (!bodyUpdatedVeiculo.validado) {
            signOut();
            return;
          }
          setApiMessage(bodyUpdatedVeiculo.msg);
          if (bodyUpdatedVeiculo.codigo === 1) {
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
      {(apiVeiculoFetched && apiLtFetched && doesListLtsExists && !isLoading) && (
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
                  <FormGroup error={getErrorMessageByFieldName('codVeiculo')}>
                    <label htmlFor="codVeiculo">Código do veículo *</label>
                    <Input
                      placeholder="Código do veículo *"
                      value={codVeiculo}
                      onChange={handleCodVeiculoChange}
                      maxLength={20}
                      disabled={page !== 'NovoVeiculo'}
                      error={getErrorMessageByFieldName('codVeiculo')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="tipoVeiculo">Tipo *</label>
                    {page === 'NovoVeiculo' && (
                    <Select
                      value={{ value: tipoTranspValue, label: rolesTipoTrans[tipoTransp] }}
                      options={tipoVeiculo}
                      onChange={(opt) => setTipoTransp(opt.value)}
                      placeholder="Selecione um tipo de veículo"
                      styles={CustomStyle}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                    {page !== 'NovoVeiculo' && (
                    <Select
                      value={{ value: tipoTranspValue, label: tipoTransp }}
                      options={tipoVeiculo}
                      onChange={(opt) => setTipoTransp(opt.value)}
                      isDisabled
                      placeholder="Selecione um tipo de veículo"
                      styles={CustomStyle}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('marca')}>
                    <label htmlFor="marca">Marca *</label>
                    <Input
                      placeholder="Marca *"
                      value={marca}
                      onChange={handleMarcaChange}
                      maxLength={20}
                      disabled={page !== 'NovoVeiculo'}
                      error={getErrorMessageByFieldName('marca')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('capacidade')}>
                    <label htmlFor="capacidade">Capacidade *</label>
                    <Input
                      placeholder="Capacidade *"
                      value={capacidade}
                      onChange={handleCapacidadeChange}
                      maxLength={2}
                      disabled={page !== 'NovoVeiculo'}
                      error={getErrorMessageByFieldName('capacidade')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('ano')}>
                    <label htmlFor="ano">Ano *</label>
                    <Input
                      placeholder="Ano *"
                      value={ano}
                      onChange={handleAnoChange}
                      maxLength={4}
                      disabled={page !== 'NovoVeiculo'}
                      error={getErrorMessageByFieldName('ano')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup error={getErrorMessageByFieldName('consumo')}>
                    <label htmlFor="codVeiculo">Consumo *</label>
                    <Input
                      placeholder="Consumo médio (km/L) *"
                      value={consumo}
                      onChange={handleConsumoChange}
                      maxLength={2}
                      error={getErrorMessageByFieldName('consumo')}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={2}>
                <Col>
                  <FormGroup>
                    <label htmlFor="codVeiculo">Local de trabalho</label>
                    {page === 'NovoVeiculo' && (
                    <Select
                      value={{ value: locTrab.value, label: locTrab.label }}
                      options={locTrabOptions}
                      onChange={(opt) => handleLocTrabChange({ value: opt.value, label: opt.label })}
                      placeholder="Selecione o local de trabalho"
                      styles={CustomStyle}
                      isDisabled={isSelectLoading || !doesListLtsExists}
                      isLoading={isSelectLoading}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                    {page !== 'NovoVeiculo' && (
                    <Select
                      value={{ value: locTrab.value, label: locTrab.label }}
                      options={locTrabOptions}
                      onChange={(opt) => handleLocTrabChange({ value: opt.value, label: opt.label })}
                      placeholder="Selecione o local de trabalho"
                      styles={CustomStyle}
                      isDisabled={isSelectLoading || !doesListLtsExists}
                      isLoading={isSelectLoading}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="codVeiculo">Linhas associadas</label>
                    {page === 'NovoVeiculo' && (
                    <Select
                      value={linhasFretado.map((ele) => ele)}
                      options={linhasOptions}
                      onChange={handleLinhasChange}
                      placeholder="Selecione as linhas"
                      isMulti
                      isDisabled={isLinhasSelectDisabled || !doesListLtsExists}
                      isLoading={isLinhasSelectLoading}
                      styles={CustomStyle}
                      components={animatedComponents}
                      closeMenuOnSelect={false}
                      classNamePrefix="react-select"
                      className="react-select-container"
                    />
                    )}
                    {page !== 'NovoVeiculo' && (
                    <Select
                      value={linhasFretado.map((ele) => ele)}
                      options={linhasOptions}
                      onChange={handleLinhasChange}
                      placeholder="Selecione as linhas"
                      isMulti
                      isDisabled={isLinhasSelectDisabled}
                      isLoading={isLinhasSelectLoading || !doesListLtsExists}
                      styles={CustomStyle}
                      components={animatedComponents}
                      closeMenuOnSelect={false}
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

      {!apiVeiculoFetched && (
        <NoData
          icon="sad"
          label={(
            <>
              Ocorreu um erro ao recuperar os dados do veículo.
              <button type="button" onClick={handleGetVeiculoTryAgain}>Tentar Novamente</button>
            </>
)}
        />
      )}

      {!apiLtFetched && (
        <NoData
          icon="sad"
          label={(
            <>
              Ocorreu um erro ao obter os locais de trabalho para carregar o formulário.
              <button type="button" onClick={handleGetLocTrabTryAgain}>Tentar Novamente</button>
            </>
)}
        />
      )}

      {!doesListLtsExists && (
        <NoData icon="emptyBox" label="Esta empresa não possui nenhum local de trabalho para fretamento. Para cadastrar um veículo, é necessário haver pelo menos um local de trabalho." />
      )}

      {page === 'NovoVeiculo' && success && (
        <MyModal
          show={modalShow}
          type="action"
          actionButtonLabel="Ver QR Code"
          onAction={() => {
            setVeiculoQrCodeBeingShow({
              codVeiculo,
              empresa: empF,
              qrCode,
            });
            setModalShow(false);
            history.push('/veiculos/qrCode');
          }}
          title="Veículo Salvo!"
          closeButtonLabel="Fechar"
          modalBody={apiMessage}
          onClose={() => {
            setModalShow(false);
            setSuccess(false);
            setApiMessage('');
            setAno('');
            setTipoTransp('');
            setTipoTranspValue('');
            setCodVeiculo('');
            setMarca('');
            setCapacidade('');
            setConsumo('');
            setLocTrab([]);
            setLinhasFretado([]);
          }}
        />
      )}

      {page === 'NovoVeiculo' && !success && (
      <MyModal
        show={modalShow}
        title="Não foi possível salvar o veículo!"
        closeButtonLabel="Fechar"
        modalBody={`Por favor, tente novamente. Detalhe do erro: ${apiMessage}`}
        onClose={() => {
          setModalShow(false);
          setSuccess(false);
          setApiMessage('');
        }}
      />
      )}

      {page === 'EditarVeiculo' && success && (
      <MyModal
        show={modalShow}
        title="Veículo editado!"
        closeButtonLabel="Fechar"
        modalBody={apiMessage}
        onClose={() => {
          history.push('/veiculos');
        }}
      />
      )}

      {page === 'EditarVeiculo' && !success && (
      <MyModal
        show={modalShow}
        title="Não foi possível editar o veículo!"
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

VeiculoForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  codVeiculoSis: PropTypes.string,
};

VeiculoForm.defaultProps = {
  codVeiculoSis: '',
};
