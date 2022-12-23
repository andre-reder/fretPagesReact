import HttpClient from './utils/HttpClient';
import { pathName } from '../pathName';

class PassageirosService {
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  async listPassageiros({
    codEmpresa,
    codLocTrab,
    codUsu,
    perfilUsu,
    token,
  }) {
    return this.httpClient.get(`/api/SMob_UsuariosFretado?codEmpresa=${codEmpresa}&codLocTrab=${codLocTrab}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&tk=${token}`);
  }

  async editPassageiro({
    codFuncionario,
    ativado,
    provisorio,
    dataInativoAte,
    codUsu,
    perfilUsu,
    codEmpresa,
    token,
  }) {
    return this.httpClient.post(`/api/SMob_UsuariosFretado?codfuncionario=${codFuncionario}&ativado=${ativado}&provisorio=${provisorio}&dataInativoAte=${dataInativoAte}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&tk=${token}`);
  }
}

export default new PassageirosService();
