import * as XLSX from 'xlsx';
import PropTypes, { shape } from 'prop-types';

export default function ExportXlsx({ data, filename }) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilha 1');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

ExportXlsx.propTypes = {
  data: PropTypes.arrayOf(shape).isRequired,
  filename: PropTypes.string.isRequired,
};
