import HttpClient from './utils/HttpClient';
import { pathName } from '../pathName';

class LinhasService {
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  async listLinhas({
    codUsu,
    perfilUsu,
    codEmpresa,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_CadLinhasFreta?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilusu=${perfilUsu}&tk=${token}`);
  }

  async getLinha({
    codUsu,
    perfilUsu,
    codLinhaSis,
    codEmpresa,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_LinhasFretaAcao?codUsu=${codUsu}&perfilUsu=${perfilUsu}&codLinhaSis=${codLinhaSis}&codEmpresa=${codEmpresa}&tk=${token}`);
  }

  async getOperadoras({
    codEmpresa,
    codUsu,
    perfilUsu,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_CadLinhasFretaAlt?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&tk=${token}`);
  }

  async createLinha({
    codUsu,
    perfilUsu,
    usuario,
    codEmpresa,
    token,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_CadLinhasFreta?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codEmpresa=${codEmpresa}&tk=${token}`, reqBody);
  }

  async updateLinha({
    codEmpresa,
    codUsu,
    perfilUsu,
    codLinhaSis,
    token,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_CadLinhasFretaAlt?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&codLinhaSis=${codLinhaSis}&tk=${token}`, reqBody);
  }

  async deleteLinha({
    codUsu,
    perfilUsu,
    usuario,
    codEmpresa,
    token,
    codLinhaSis,
    routeId,
  }) {
    return this.httpClient.post(`/api/SMob_LinhasFretaAcao?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codLinhaSis=${codLinhaSis}&routeID=${routeId}&codEmpresa=${codEmpresa}&tk=${token}`);
  }

  async postShape({
    codUsu,
    usuario,
    routeID,
    perfilUsu,
    codEmpresa,
    token,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_LinhaFretaMapa?codUsu=${codUsu}&usuario=${usuario}&routeID=${routeID}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&tk=${token}`, reqBody);
  }

  async getMapaShape({
    codUsu,
    perfilUsu,
    usuario,
    routeId,
    codEmpresa,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_LinhaFretaMapa?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codEmpresa=${codEmpresa}&routeID=${routeId}&tk=${token}`);
  }
}

export default new LinhasService();
