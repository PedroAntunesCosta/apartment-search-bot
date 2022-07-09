const SPREADSHEET_ID = '{INSERT_YOUR_SPREADSHEET_ID}'

const blocksSqs = ['105', '308', '114', '116', '102', '202', '302', '103', '203', '303', '307', '209', '309', '110', '210', '310', '111', '211', '311', '112', '212', '312', '113', '213', '313', '214', '314', '115', '215', '315', '204']

function fetchAllBlocks () {

  // DF Imóveis
  for (block of blocksSqs) {
    fetchDfImoveisDataByBlock (block);
  };
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Properties');
  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
  sheet.appendRow([
    '---',
    '---',
    date
  ]);
}

function fetchSingleBlock () {
  block = '114';
  fetchDfImoveisDataByBlock (block);
}

function fetchDfImoveisDataByBlock (block) {

  console.log(block)

  // Gets date and formats it as dd/mm/yyyy
  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`

  // Gets property sheet and adds separator
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Properties');

  // Fetches html code from dfimoveis and format property list 
  const url = `https://www.dfimoveis.com.br/venda/df/todos/apartamento/2,3-quartos?palavrachave=sqs%20${block}&vagasdegaragem=1`;
  const html = UrlFetchApp.fetch(url).getContentText();

  if (html.includes('<ul class="property-list">')) {
    var propertyList = UrlFetchApp.fetch(url).getContentText()
    .split('<ul class="property-list">')[1]
    .split('<li class="property-list__item" itemprop="containsPlace" itemscope itemtype="https://schema.org/SingleFamilyResidence">');

    // Removes first element of propertyList. It contains the header and useless part of the body
    propertyList.shift();

    console.log (`${propertyList.length} properties found`)
    
    // Continue only if there are results for that block.
    if (propertyList.length > 0) {
      
      for (property of propertyList) {
        
        // Assembles URL for each property
        const path = property.split('<a href="')[1]
          .split('"')[0];
        const url = "https://www.dfimoveis.com.br" + path;

        // Proceed only if it is not registered in the sheet
        if (!registered(url)) {
          
          // Proceed only if it contains the word 'vazado'
          if (vazado(url)) {

            // Append information to sheet
            sheet.appendRow([
              block,
              url,
              date
            ]);
          };
        };
      };
    };
  };
}

function vazado (propertyUrl) {

  // Fetches html code from property page
  const propertyHtml = UrlFetchApp.fetch(propertyUrl).getContentText();

  if (propertyHtml.includes('vazado') || propertyHtml.includes('Vazado')) {
    return true
  } else {
    return false
  }

}

function registered (propertyUrl) {

  
  // Gets property sheet and list of previously registered properties
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Properties');
  const registeredProperties = sheet.getRange(2,2,sheet.getLastRow()-1,1).getValues().toString();
  
  if (registeredProperties.includes([propertyUrl])) {
    return true
  } else {
    return false
  };

}
