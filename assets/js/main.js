$(document).ready(function () {
  let table = $('#myTable').DataTable();
  $.get('./assets/js/MOCK_DATA.json', function (res, xhr) {
    res.forEach((item) => {
      table.row.add([
        item.first_name,
        item.position,
        item.office,
        item.age,
        item["start date"],
      ]).draw();
    });
  });
  $('.btn-primary').on('click', function () {
    let data = [];
    let headers = [];
    $('#myTable thead th').each(function () {
      headers.push($(this).text());
    });
    data.push(headers);

    table.rows().every(function () {
      data.push(this.data());
    });
    let worksheet = XLSX.utils.aoa_to_sheet(data);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table_data.xlsx');
  });
});
