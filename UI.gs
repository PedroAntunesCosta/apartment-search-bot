function onOpen() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var menu = [];
  menu.push({name: '🔎 Buscar no DF Imóveis', functionName: "fetchAllBlocks"})
  ss.addMenu("🏢 Apartamentos", menu)  
}
