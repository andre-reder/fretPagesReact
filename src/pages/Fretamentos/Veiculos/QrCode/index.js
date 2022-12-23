import { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import QRCode from 'react-qr-code';
import Loader from '../../../../components/Loader';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import { QrCodeContainer } from './styles';
import Button from '../../../../components/Button';
import useLocalState from '../../../../hooks/useLocalState';
import AppHeader from '../../../../components/AppHeader';
import { useAppContext } from '../../../../contexts/auth';

export default function VeiculoQrCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [veiculoQrCodeBeingShow] = useLocalState('veiculoQrCodeBeingShow');
  const { data } = useAppContext();
  const empF = data.selectedEmpresa.label;
  const { qrCode } = veiculoQrCodeBeingShow;
  const { codVeiculo } = veiculoQrCodeBeingShow;
  const exportRef = useRef();

  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toSvg(exportRef.current, {
      backgroundColor: '#fff',
    });

    // download image
    const link = document.createElement('a');
    link.download = 'QrCode.svg';
    link.href = dataUrl;
    link.click();
    setIsLoading(false);
  };

  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Veiculos" />
      <Loader isLoading={isLoading} />
      <Transitions>
        <PageHeader
          title={`QR Code do veículo ${codVeiculo}`}
          link="/veiculos"
        />

        <QrCodeContainer>
          <div ref={exportRef} style={{ padding: '8px' }}>
            <h1>{codVeiculo}</h1>
            <h1>{empF.split('| CNPJ:')[0]}</h1>
            <h1>
              Qr Code:
              {' '}
              {qrCode}
            </h1>
            <QRCode value={`${qrCode}`} />
          </div>
          <Button onClick={() => {
            setIsLoading(true);
            downloadImage();
          }}
          >
            Download QR Code
          </Button>
        </QrCodeContainer>

      </Transitions>
    </>
  );
}
