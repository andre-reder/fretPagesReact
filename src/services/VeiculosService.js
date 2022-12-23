import HttpClient from './utils/HttpClient';
import { pathName } from '../pathName';

class VeiculosService {
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  async listVeiculos({
    codEmpresa,
    codUsu,
    perfilUsu,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_FretaCadVeiculo?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilusu=${perfilUsu}&tk=${token}`);
  }

  async getVeiculo({
    codUsu,
    codVeiculoSis,
    perfilUsu,
    codEmpresa,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_FretaCadVeiculoAcao?codUsu=${codUsu}&codVeiculoSis=${codVeiculoSis}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&tk=${token}`);
  }

  async getLocTrab({
    codEmpresa,
    codUsu,
    perfilUsu,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_FretaCadVeiculoAlt?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&tk=${token}`);
  }

  async getLinhas({
    codLocTrab,
    codUsu,
    perfilUsu,
    codEmpresa,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_LinhasFreta?codLocTrab=${codLocTrab}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&tk=${token}`);
  }

  async createVeiculo({
    codUsu,
    perfilUsu,
    usuario,
    codEmpresa,
    token,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_FretaCadVeiculo?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codEmpresa=${codEmpresa}&tk=${token}`, reqBody);
  }

  async updateVeiculo({
    codUsu,
    usuario,
    perfilUsu,
    codEmpresa,
    token,
    codVeiculoSis,
    consumo,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_FretaCadVeiculoAlt?codUsu=${codUsu}&usuario=${usuario}&codVeiculoSis=${codVeiculoSis}&consumo=${consumo}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&tk=${token}`, reqBody);
  }

  async deleteVeiculo({
    codUsu,
    perfilUsu,
    usuario,
    codVeiculoSis,
    codEmpresa,
    token,
  }) {
    return this.httpClient.post(`/api/SMob_FretaCadVeiculoAcao?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codVeiculoSis=${codVeiculoSis}&codEmpresa=${codEmpresa}&tk=${token}`);
  }
}

export default new VeiculosService();
