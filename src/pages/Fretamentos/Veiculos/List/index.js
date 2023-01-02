import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import * as htmlToImage from 'html-to-image';
import QRCode from 'react-qr-code';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import { QrCodesGrid } from './styles';

import Loader from '../../../../components/Loader/index';
import MyModal from '../../../../components/Modal';
import NoData from '../../../../components/NoData';
import AppHeader from '../../../../components/AppHeader';
import InputSearch from '../../../../components/InputSearch';
import ListHeader from './components/ListHeader';
import useVeiculosList from './useVeiculosList';
import List from './components/List';

export default function VeiculosList() {
  const {
    perfilUsu,
    isLoading,
    codEmpresa,
    Veiculos,
    apiFetched,
    searchTerm,
    handleChangeSearchTerm,
    filteredVeiculos,
    setModalShow,
    handleTryAgain,
    modalShow,
    BodyReqVeiculosList,
    setVeiculoQrCodeBeingShow,
    setVeiculoBeingEdited,
    setVeiculoBeingDeleted,
    roles,
  } = useVeiculosList();

  const hasVeiculos = Veiculos && apiFetched;
  const hasFilteredVeiculos = Veiculos && apiFetched && filteredVeiculos?.length !== 0;

  const exportRef = useRef(null);
  const [cursor, setCursor] = useState('default');

  const downloadImage = useCallback(async () => {
    setCursor('progress');
    const dataUrl = await htmlToImage.toSvg(exportRef.current, {
      backgroundColor: '#fff',
    });
    // download image
    const link = document.createElement('a');
    link.download = `QR Codes veículos ${BodyReqVeiculosList.empresa}.svg`;
    link.href = dataUrl;
    link.click();
    setCursor('default');
    setModalShow(false);
  }, [setCursor, setModalShow, BodyReqVeiculosList.empresa]);

  return (
    <>
      <AppHeader isEmpresaSelectDisabled={perfilUsu == 10 || perfilUsu == 11 || perfilUsu == 12} />
      <Sidebar active="Veiculos" />
      <Transitions>
        <Loader isLoading={isLoading} />

        {!!codEmpresa && (
        <>
          {hasVeiculos && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'tween', stiffness: 10 }}
          >
            <InputSearch
              searchTerm={searchTerm}
              handleChangeSearchTerm={handleChangeSearchTerm}
              placeholder="Pesquisar veículo"
            />
          </motion.div>
          )}

          {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'tween', stiffness: 10 }}
          >
            <ListHeader
              entity={Veiculos}
              apiFetched={apiFetched}
              filteredEntity={filteredVeiculos}
              linkPath="/veiculos/novo"
              entityString={{ singular: 'veículo', plural: 'veículos' }}
              showQrCodes={setModalShow}
            />
          </motion.div>
          )}

          {hasFilteredVeiculos && (
            <List
              filteredVeiculos={filteredVeiculos}
              roles={roles}
              setVeiculoQrCodeBeingShow={setVeiculoQrCodeBeingShow}
              setVeiculoBeingEdited={setVeiculoBeingEdited}
              BodyReqVeiculosList={BodyReqVeiculosList}
              setVeiculoBeingDeleted={setVeiculoBeingDeleted}
            />
          )}

          {!hasFilteredVeiculos && !isLoading && (
          <NoData
            icon="searchNotFound"
            label={(
              <>
                Nenhum resultado foi encontrado para
                {' '}
                <strong>{searchTerm}</strong>
              </>
    )}
          />
          )}

          {!hasVeiculos && !isLoading && (
          <NoData
            icon="emptyBox"
            label={(
              <>
                Esta empresa não tem nenhum veículo cadastrado, clique no botão
                {' '}
                <strong>Novo Veículo</strong>
                {' '}
                acima para cadastrar seu primeiro!
              </>
)}
          />
          )}

          {!apiFetched && !isLoading && (
          <NoData
            icon="sad"
            label={(
              <>
                Ocorreu um erro ao obter os veiculos.
                <button type="button" onClick={handleTryAgain}>Tentar Novamente</button>
                .
              </>
)}
          />
          )}

          {hasVeiculos && !isLoading && (
          <MyModal
            show={modalShow}
            title={`QR Codes veículos ${BodyReqVeiculosList.empresa}`}
            isActionButtonDisabled={cursor === 'progress'}
            modalBody={(
              <QrCodesGrid ref={exportRef} cursor={cursor}>
                {Veiculos?.map((veiculo) => (
                  <div key={veiculo.codVeiculoSis}>
                    <h1>{veiculo.codVeiculo}</h1>
                    <h1>{BodyReqVeiculosList.empresa}</h1>
                    <h1>
                      Qr Code:
                      {' '}
                      {veiculo.qRCode}
                    </h1>
                    <QRCode
                      value={`${veiculo.qRCode}`}
                      size={50}
                      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                      viewBox="0 0 50 50"
                    />
                  </div>
                ))}
              </QrCodesGrid>
          )}
            closeButtonLabel="Fechar"
            onClose={() => setModalShow(false)}
            actionButtonLabel="Download"
            onAction={downloadImage}
            type="action"
            size="xl"
          />
          )}
        </>
        )}

        {(!codEmpresa) && (
        <NoData
          icon="companyInterrogation"
          label={(
            <>
              Selecione uma empresa para visualizar os veículos.
            </>
)}
        />
        )}

      </Transitions>
    </>
  );
}
