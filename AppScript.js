// Function to do post
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  data.forEach(rowStr => {
    var values = rowStr.trim().split(',');

    var dateParts = values[0].split('/');
    var date= dateParts[1]+ '/'+ dateParts[0] + '/'+dateParts[2];

    var timeStr = values[1];

    var textValues = values.slice(2).map(String);

    var row = [date, timeStr, ...textValues];

    sheet.appendRow(row);
  });

  sheet.getRange("A:A").setNumberFormat("dd/MM/yyyy");
  sheet.getRange("C:F").setNumberFormat("@"); 

  return ContentService.createTextOutput("Success");
}

// Function do get data
function doGet(e) {
  //Part of the get function where you get all dates availabe in the excel sheet
  if (e.parameter.command === "getAllDates") {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
    const uniqueSet = new Set();

    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i][0]);
      if (!isNaN(date)) {
        const formatted = Utilities.formatDate(date, Session.getScriptTimeZone(), "dd-MM-yyyy");
        uniqueSet.add(formatted);
      }
    }

    const uniqueDates = Array.from(uniqueSet);

    return ContentService.createTextOutput(
      JSON.stringify({ formattedDates: uniqueDates })
    ).setMimeType(ContentService.MimeType.JSON);;
  }

  // Part of get function where you get all the values for a specific date
  if (e.parameter.command === "getValues") {
    var targetDate = e.parameter.date;     
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var times = [];
    var valuesppm = [];
    var valueshum = [];
    var valuestemp = [];
    var valuesict = [];

    for (var i = 1; i < data.length; i++) {
      var rowDate = Utilities.formatDate(new Date(data[i][0]), Session.getScriptTimeZone(), "dd-MM-yyyy");
      Logger.log('i=' + i + ' ' + 'RowDate ' + rowDate);
      if (rowDate === targetDate) {
        times.push(data[i][1]);        // ora (coloana B)
        Logger.log('i1=' + typeof(data[i][1]));
        valuesppm.push(data[i][2]);
        Logger.log('i2=' + data[i][2]);
        valueshum.push(data[i][3]);
        Logger.log('i3=' + data[i][3]);
        valuestemp.push(data[i][4]);
        Logger.log('i4=' + data[i][4]);
        valuesict.push(data[i][5]);
        Logger.log('i5=' + data[i][5]);
      }
    }

    var output = {
      times: times,
      valuesppm: valuesppm,
      valueshum: valueshum,
      valuestemp: valuestemp,
      valuesict: valuesict
    };

    return ContentService.createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput("Invalid command");
}

// Function to test the get function for all dates
function testDoGet() {
  var e = { parameter: { command: "getAllDates" } };
  doGet(e);
}

//Function to test the get function on values for a specific date
function testGetValues() {
  var e = {
    parameter: {
      command: "getValues",
      date: "07-06-2025",
    }
  };
  
  var output = doGet(e);
  Logger.log(output.getContent());
}



