import { Button, Flex, Text } from "@chakra-ui/react";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


function ExportExcel() {
  const multiDataSet = [ "1", "2", "3" ];

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData: String, fileName: string) => {
        const ws = XLSX.utils.json_to_sheet(multiDataSet);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

  return (
    <Text onClick={() => exportToCSV("csvData","fileName")}>Export</Text>
  );
}

export default ExportExcel;
