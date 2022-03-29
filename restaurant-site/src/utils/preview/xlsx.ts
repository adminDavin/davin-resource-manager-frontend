// import XLSX from 'xlsx'
// export default {
//   file2Xce: function (file: File, callback: Function) {
//     const reader = new FileReader();
//     reader.onload = function (e: any) {
//       const data = e.target.result;
//       let wb = XLSX.read(data, {
//         type: "binary"
//       });
//       callback(wb);
//     };
//     reader.readAsArrayBuffer(file);
//   }
// };