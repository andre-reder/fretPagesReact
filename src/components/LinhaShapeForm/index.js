/* eslint-disable func-names */
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FileInputContainer, StepsContainer, ChosenFileContainer } from './styles';

import MyModal from '../Modal';
import useErrors from '../../hooks/useErrors';

import LinhasService from '../../services/LinhasService';

import isCoordValid from '../../utils/isCoordValid';
import Loader from '../Loader';

import { Form } from '../Form';

import FormGroup from '../FormGroup';

import Button from '../Button';
import Input from '../Input';
import arrow from '../../assets/images/icons/arrow.svg';
import useLocalState from '../../hooks/useLocalState';
import { useAppContext } from '../../contexts/auth';

export default function LinhaShapeForm({ buttonLabel }) {
  const [shapeFile, setShapeFile] = useState('');
  const [shape, setShape] = useState('');
  const [thisFiles, setThisFiles] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isConvertButtonDisabled, setIsConvertButtonDisabled] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const { data, token, signOut } = useAppContext();
  const userData = data.usuario;
  const codEmpresa = data.selectedEmpresa.value;
  const [linhaBeingPostedShape] = useLocalState('linhaBeingPostedShape');
  const [, setLinhaMapaBeingShow] = useLocalState('linhaMapaBeingShow');

  const history = useHistory();
  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const { codUsu, usuario, perfilUsu } = userData;
  const { routeID } = linhaBeingPostedShape;
  const { codLinhaF } = linhaBeingPostedShape;
  const { letreiro } = linhaBeingPostedShape;

  const isFormValid = (shape && errors.length === 0);

  const hiddenFileInput = useRef();
  const handleClick = () => {
    hiddenFileInput.current.click();
    setShape('');
    setShapeFile('');
  };

  function KmlToGtfsShapes(outputElement) {
    this._outputElement = outputElement;
    this._file = null;
  }

  const output = useRef();
  const converter = new KmlToGtfsShapes(output.current);

  KmlToGtfsShapes.prototype.handleFileSelect = function (files) {
    setThisFiles(null);
    if (files.length != 1) {
      return false;
    }
    setThisFiles(files[0]);
    setShapeFile(files[0].name);
    const fileRouteId = files[0].name.split(';')[1];
    if (fileRouteId != routeID) {
      // removeError('shapeFile');
      setError({ field: 'shapeFile', message: 'O Route ID do arquivo não é o mesmo da linha!' });
      return false;
    }
    removeError('shapeFile');
    return true;
  };

  KmlToGtfsShapes.prototype.convert = function () {
    if (!thisFiles) {
      return;
    }

    this.writeHeader();

    const reader = new FileReader();
    const handleFileRead = this.handleFileRead.bind(this);
    reader.onload = function () {
      const text = reader.result;
      handleFileRead(text);
    };
    reader.readAsText(thisFiles);
  };

  KmlToGtfsShapes.prototype.handleFileRead = function (text) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const placemarks = xml.getElementsByTagName('Placemark');
    for (let i = 0; i < placemarks.length; ++i) {
      this.processPlacemark(placemarks[i]);
    }
  };

  KmlToGtfsShapes.prototype.processPlacemark = function (placemark) {
    const name = this.getElementByTagName(placemark, 'name');
    if (!name) {
      return;
    }
    const lineString = this.getElementByTagName(placemark, 'LineString');
    if (!lineString) {
      return;
    }
    const coordinates = this.getElementByTagName(lineString, 'coordinates');
    if (!coordinates) {
      return;
    }
    const shapeId = name.textContent;
    const points = this.parseCoordinates(coordinates.textContent);
    this.writePoints(shapeId, points);
    if (this._generateReverseShapes) {
      this.writePoints(`${shapeId}-reverse`, points.reverse());
    }
  };

  KmlToGtfsShapes.prototype.getElementByTagName = function (element, name) {
    for (let i = 0; i < element.childNodes.length; ++i) {
      if (element.childNodes[i].nodeName == name) {
        return element.childNodes[i];
      }
    }
    return null;
  };

  KmlToGtfsShapes.prototype.parseCoordinates = function (text) {
    const points = [];
    const tokens = text.split(' ');
    for (let i = 0; i < tokens.length; ++i) {
      const latlng = tokens[i].split(',');
      if (latlng.length < 2) {
        continue;
      }
      const point = {
        lat: latlng[1],
        lng: latlng[0],
      };
      points.push(point);
    }
    return points;
  };

  KmlToGtfsShapes.prototype.writeHeader = function () {
    this._outputElement.value = 'shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence\n';
  };

  KmlToGtfsShapes.prototype.writePoints = function (shapeId, points) {
    // to return for original, just remove mappedPoints const
    const mappedPoints = points.map((point) => (
      { lat: point.lat, lng: point.lng.replace('\n\t\t\t\t', '') }
    ));
    for (let i = 0; i < mappedPoints.length; ++i) {
      const point = mappedPoints[i];
      const line = `${shapeId},${point.lat},${point.lng},${i}\n`;
      this._outputElement.value += line;
    }
    const text = output.current.value;
    // store at splitText const an array with indexs defined as the text break lines
    const splitText = text.split(/\r?\n/);
    // remove first line
    splitText.shift();

    // split each array index by ',' char and create a structure like [[a, b, c, d],[a, b, c, d]]
    const splitted = splitText.map((line) => (
      line.split(',')
    ));
    // transform the array of arrays in an array of objects
    const objMounted = splitted.map((splittedLine) => (
      { lat: splittedLine[1], lng: splittedLine[2], seq: splittedLine[3] }
    ));
    objMounted.pop();

    // validate if file is valid checking all coords
    const mapCoordsValidation = objMounted.map((coordValid) => (
      isCoordValid(`${coordValid.lat},${coordValid.lng}`)
    ));
    const someCoordInvalid = mapCoordsValidation.includes(false);
    if (someCoordInvalid) {
      setError({ field: 'shapeFile', message: 'Arquivo inválido! Por favor, selecione outro arquivo.' });
      setIsConvertButtonDisabled(true);
    } else {
      removeError('shapeFile');
      setIsConvertButtonDisabled(false);
    }
    setShape(objMounted);
  };

  const handleFileChange = (event) => {
    const ready = converter.handleFileSelect(event.target.files);
    setIsConvertButtonDisabled(!ready);
  };

  const handleConvertButtonClick = () => {
    converter.convert();
  };

  function handleSubmit(event) {
    event.preventDefault();
    async function postShape() {
      try {
        setIsLoading(true);

        const bodyPostedShape = await LinhasService.postShape(
          {
            codUsu,
            perfilUsu,
            usuario,
            routeID: encodeURIComponent(routeID),
            codEmpresa,
            token: encodeURIComponent(token),
            reqBody: JSON.stringify(shape),
          },
        );
        setIsLoading(false);
        if (!bodyPostedShape.validado) {
          signOut();
          return;
        }
        setApiMessage(bodyPostedShape.msg);
        if (bodyPostedShape.codigo === 1) {
          setSuccess(true);
        }
        setModalShow(true);
      } catch (error) {
        setIsLoading(false);
        setApiMessage(error);
        setModalShow(true);
      }
    }
    postShape();
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <Form onSubmit={handleSubmit} noValidate autoComplete="new-password">
        <StepsContainer>
          <FormGroup>
            <FileInputContainer>
              <Button type="button" className="file" onClick={handleClick}>
                Escolher arquivo
              </Button>
              <Input
                type="file"
                style={{ display: 'none' }}
                ref={hiddenFileInput}
                onChange={handleFileChange}
                placeholder="Shape.txt"
                accept=".kml"
                autoComplete="new-password"
              />
              <textarea ref={output} rows="10" style={{ display: 'none' }} />
            </FileInputContainer>
          </FormGroup>

          <img src={arrow} className="rightArrow" alt="rightArrow" />

          <Button type="button" disabled={isConvertButtonDisabled} onClick={handleConvertButtonClick}>
            Preparar arquivo
          </Button>

          <img src={arrow} className="rightArrow" alt="rightArrow" />

          <Button type="submit" disabled={!isFormValid}>
            {buttonLabel}
          </Button>
        </StepsContainer>
      </Form>

      <ChosenFileContainer>
        <small className="fileSmall">{`Arquivo escolhido: ${shapeFile}`}</small>
        <FormGroup error={getErrorMessageByFieldName('shapeFile')} />
      </ChosenFileContainer>

      {success && (
      <MyModal
        type="action"
        actionButtonLabel="Ver mapa"
        onAction={() => {
          setModalShow(false);
          setLinhaMapaBeingShow({
            codLinha: codLinhaF,
            letreiro,
            routeID,
          });
          history.push('/linhas/mapa');
        }}
        show={modalShow}
        title="Shape vinculado!"
        closeButtonLabel="Ir para lista de linhas"
        modalBody={apiMessage}
        onClose={() => {
          history.push('/linhas');
        }}
      />
      )}

      {!success && (
        <MyModal
          show={modalShow}
          title="Não foi possível vincular o shape!"
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

LinhaShapeForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
