import * as XLSX from 'xlsx';
import moment from "moment";

const downloadExcel = (jsondata, fileName='Data') => {
  if(jsondata){
    jsondata=jsondata.map(({ id, action, sl, isActive, ...rest }) => rest);
    // Convert JSON to worksheet
    const ws = XLSX.utils.json_to_sheet(jsondata);

    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, fileName);

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, `${fileName}-${moment().format("DD-MM-YYYY")}.xlsx`);
  }
  else return false;
};

export default downloadExcel;
