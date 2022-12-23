import { useQuery } from './useQuery';

const useDefaultQueryParams = () => {
  const query = useQuery();
  const codEmpresa = query.get('codEmpresa');
  const codUsu = query.get('codUsu');
  const perfilUsu = query.get('perfilUsu');
  const codValida = query.get('codValida');
  const usuarioQueryParam = query.get('usuario');
  const empresa = query.get('empF');
  return (`codEmpresa=${codEmpresa}&empF=${empresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuarioQueryParam}`
  );
};

export default useDefaultQueryParams;
