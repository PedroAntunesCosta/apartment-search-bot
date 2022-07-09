function newTrigger() {
  ScriptApp.newTrigger('fetchAllBlocks')
    .timeBased()
    .everyDays(1)
    .atHour(19)
    .create();
}
