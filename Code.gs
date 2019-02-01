/**
*   Github repo for this project can be found at https://github.com/Marshallsbest/Barcode-Intake-AppsScript
*
*/
var HEADERS = ["System ID","UPC","EAN","Custom SKU","Manufact SKU","Item","Qty","Price","Category","Brand","MSRP","Vendor"];
var s = SpreadsheetApp.getActiveSpreadsheet();
var ss = s.getActiveSheet();
var upc = s.getRangeByName('upc');
var qty = s.getRangeByName('qty');
var batch = s.getRangeByName('batch')
var batchUpc = s.getRangeByName('batchUpc');
var qtyCol = 2;
var upcCol = 1;

/**
*  Trigger function dalled by onEdit
*
*/ 


function replaceQty(e){
  var today = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
  var inputCol = e.range.getColumn();
  var inputRow = e.range.getRow();
  if(inputCol === 3 && inputRow === 2 && !e.range.isBlank()){
    split();
    var quantity = qty.getValue();
    var uCode = upc.getValue();
    var line = abc(uCode,quantity);
    if(!line){
    var array = [uCode,uAmt,"Not Listed","",today]
    s.getSheetByName('Inventory').appendRow(array);
    }
    createLog(uCode,quantity,line,e);
    upc.clear()
    qty.clear()
  } 
  else 
    if(inputCol === 6 && inputRow === 2 && !e.range.isBlank()){
      splitBatch();
      var empty = 0;
      var batchRows = batch.getValues();
      for(var x = 0;x<batchRows.length; x++){
        if(batchRows[x][0]!==""){
          Logger.log(batchRows)
          var uCode = batchRows[x][0];
          var uAmt = batchRows[x][1];
          var line = abc(uCode,uAmt);
          if(!line){
            var array = [uCode,uAmt,"Not Listed","",today]
          s.getSheetByName('Inventory').appendRow(array);
          }
          
          createLog(uCode,uAmt,line,e);
          var batchLine = x+2
          ss.getRange(batchLine,6,1,2).clear()  
        }
      }
    }
};

/**
*  Splits any input in to seperate columns with a comma as deliminter
*/
function split(){
  upc.activate().splitTextToColumns();
};


/**
*  Splits any input in to seperate columns with a comma as deliminter
*/
function splitBatch(){
  batchUpc.activate().splitTextToColumns();
  
};

/**
*  Finds the current row value with the matching UPC and inserts the new Qty
*/
function abc(code,amt){
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var ss = s.getActiveSheet();
  var range = ss.getRange(3,1,ss.getLastRow(),2)
  var data = range.getValues();  
  for(var i = 0; i<data.length; i++){
    var row =  i+3;
    var upcOg = data[i][0];
    var qtyOg = data[i][1];
   if(upcOg == code){ //[1] because column
   ss.getRange(row, qtyCol).setValue(amt)
   ss.getRange(row, 5).setValue(new Date())
   ss.getRange(row,1).setBackground('red')
   s.toast("the value of " + amt + " was inserted in to row "+ row );
  return row
    };
  };
};

/**
*   a log to be finished after 
*/
function createLog(upc,qty,line,e){
    //  createLog(e,upc,qty);
    var logTime = new Date();
    var logData = [
      logTime,
      upc,
      qty,
      e.user,
      line
      ];
    var logSheet = s.getSheetByName('Activity Log');
    logSheet.appendRow(logData); 
 }

