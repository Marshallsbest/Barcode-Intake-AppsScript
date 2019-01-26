var HEADERS = ["System ID","UPC","EAN","Custom SKU","Manufact SKU","Item","Qty","Price","Category","Brand","MSRP","Vendor"];
var s = SpreadsheetApp.getActiveSpreadsheet();
var upc = s.getRangeByName('upc');
var qty = s.getRangeByName('qty');
function replaceQty(e){
 // var s = SpreadsheetApp.getActiveSpreadsheet();
 // var upc = s.getRangeByName('upc');
  //var qty = s.getRangeByName('qty');
  split();
  var line = abc(upc,qty); 
  abc();
};

/**
*  Splits any input in to seperate columns with a comma as deliminter
*/
function split(){
  var s = SpreadsheetApp.getActive();
  s.getRangeByName('upc').activate().splitTextToColumns();
    s.toast("Splitting text");
  
};


/**
*  Finds the current row value with the matching UPC and inserts the new Qty
*/
function abc(upc, qty){
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var ss = s.getActiveSheet();
  var range = ss.getRange(3,1,ss.getLastRow(),2)
  var data = range.getValues();
  Logger.log("loop next");
  for(var i = 0; i<data.length; i++){
    Logger.log("in loop");
    var row =  i+1;
    Logger.log(row);
    var upcOg = data[i][0];
    Logger.log(upcOg);
    var qtyOg = data[i][1];
    Logger.log(qtyOg);
    var value1 = data[0][3].getValue;
    Logger.log(value1);
    if(value1 == upc){ //[1] because column
      Logger.log("if going");
      qtyOg.push(qty);
      Logger.log((upc+","+qty+ row))
      s.toast("the value of " + qty + " was inserted in to row "+ line );
      return row;
    };
  };
};