import HttpClient from './utils/HttpClient';
import { pathName } from '../pathName';

class ValidacaoService {
  constructor() {
    this.httpClient = new HttpClient(pathName);
  }

  async getTk({
    reqBody,
  }) {
    return this.httpClient.post('/api/SMob_TK', reqBody);
  }

  async validaAcesso({
    reqBody,
  }) {
    return this.httpClient.post('/api/SMob_ValidaAcesso', reqBody);
  }
}

export default new ValidacaoService();
