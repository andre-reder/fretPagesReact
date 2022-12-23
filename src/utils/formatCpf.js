export default function formatCpf(cpf) {
  return cpf
    .replace(/[^\d]/g, '')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
