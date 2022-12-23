import HttpClient from './utils/HttpClient';
import { pathName } from '../pathName';

class UsuariosService {
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  async listUsuarios({
    codEmpresa,
    codUsu,
    perfilUsu,
    tk,
  }) {
    return this.httpClient.get(`/api/SMob_CadAcesso?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilusu=${perfilUsu}&tk=${tk}`);
  }

  async getUsuario({
    codEmpresa,
    codUsu,
    perfilUsu,
    codUsuAcesso,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_CadAcessoAcao?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&codUsuAcesso=${codUsuAcesso}&tk=${token}`);
  }

  async createUsuario({
    reqBody,
  }) {
    return this.httpClient.post('/api/SMob_CadAcesso', reqBody);
  }

  async updateUsuario({
    reqBody,
  }) {
    return this.httpClient.post('/api/SMob_CadAcessoAlt', reqBody);
  }

  async deleteUsuario({
    codUsu,
    perfilUsu,
    usuario,
    reqBody,
  }) {
    return this.httpClient.post(`/api/SMob_CadAcessoAcao?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}`, reqBody);
  }
}

export default new UsuariosService();
