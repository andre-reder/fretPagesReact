import HttpClient from './utils/HttpClient';
import { pathName } from '../pathName';

class DashboardService {
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  async getDashboardData({
    codUsu,
    perfilUsu,
    token,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_DashBFreta?codUsu=${codUsu}&perfilUsu=${perfilUsu}&tk=${token}`, reqBody);
  }

  async getLocTrab({
    codUsu,
    perfilUsu,
    codEmpresa,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_FretaCadVeiculoAlt?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&tk=${token}`);
  }

  async getRelsData({
    codUsu,
    perfilUsu,
    codEmpresa,
    token,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_FretaRels?codUsu=${codUsu}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&tk=${token}`, reqBody);
  }

  async getMapaShape({
    codUsu,
    perfilUsu,
    usuario,
    codEmpresa,
    token,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_ViagemMapa?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codEmpresa=${codEmpresa}&tk=${token}`, reqBody);
  }

  async getStartDate({
    codUsu,
    perfilUsu,
    codEmpresa,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_IniciaServico?codUsu=${codUsu}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&tk=${token}`);
  }

  async chooseStartDate({
    codUsu,
    perfilUsu,
    codEmpresa,
    token,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_IniciaServico?codUsu=${codUsu}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&tk=${token}`, reqBody);
  }
}

export default new DashboardService();
