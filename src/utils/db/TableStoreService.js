import {TableUtilities, TableQuery,createTableServiceWithSas} from 'azure-storage'  ;

const headers= [
  'RowKey', 'SLK_581', 'ClientID', 'Client_type', 'Commencement_Date', 'Country_of_birth', 'Date_accuracy_indicator', 'Date_of_birth', 'EID', 'ENROLLING_PROVIDER', 
  'End_date', 'FULL_NAME'
  //, 
  //'Indigenous_status', 'Injecting_drug_use_status', 'Living_arrangements', 'Main_treatment_type', 'Mental_health', 'Method_of_use_for_PDC',
  // 'ODC1', 'PDC', 'PROGRAM', 'Postcode_Australian', 'Preferred_language',
   // 'Previous_AOD_treatment', 'Reason_for_cessation', 'Sex', 'Source_of_referral',  'Timestamp', 'Treatment_delivery_setting', 'Usual_accommodation'
  ];

const account = "storageaccountansa9783";
const hostUri = "http://127.0.0.1:10002/devstoreaccount1/";// process.env.STORAGE_HOST_URI_MDS; //`https://${account}.table.core.windows.net`

//const sasToken ="st=2020-06-09T21%3A20%3A39Z&se=2022-06-10T21%3A20%3A00Z&sp=raud&sv=2017-04-17&tn=mds&sig=%2B27UGXtiVVlw55koGiSBnZBFJDb7RjXF%2B0QUOz6vG5E%3D";
//local "st=2020-06-09T21%3A20%3A39Z&se=2022-06-10T21%3A20%3A00Z&sp=raud&sv=2017-04-17&tn=mds&sig=%2B27UGXtiVVlw55koGiSBnZBFJDb7RjXF%2B0QUOz6vG5E%3D"
//prod : "st=2020-05-27T02%3A16%3A34Z&se=2028-05-28T02%3A16%3A00Z&sp=rau&sv=2017-04-17&tn=mds&sig=fUwWf%2Fn6hNftjsDsAjCUkXNo5NxZKm2i2NmqYYWmvao%3D";
// process.env.SAS_TOKEN_STORE_MDS
const sasToken = "st=2020-06-14T09%3A22%3A55Z&se=2024-06-15T09%3A22%3A00Z&sp=rau&sv=2017-04-17&tn=episode&sig=M6BbFodJ%2F0ChyxAhkpObtLZ26DIrFTlmWna5KnWtbes%3D";

// EpisodeInitial
//http://127.0.0.1:10002/devstoreaccount1/EpisodeInitial?st=2020-06-14T08%3A59%3A41Z&se=2024-06-15T08%3A59%3A00Z&sp=rau&sv=2017-04-17&tn=episodeinitial&sig=zlHXaJNZ%2BHF%2FbCr%2Bmj5x5gyJBhPGIXN%2BhwL7denXSCM%3D
//https://storageaccountansa9783.table.core.windows.net/EpisodeInitial?st=2020-06-14T08%3A58%3A29Z&se=2020-06-15T08%3A58%3A29Z&sp=rau&sv=2017-04-17&tn=episodeinitial&sig=92o4qO2rW8gVUyVG98zl7xr0RRwFJvT4UZreF0YRxyU%3D

export const tableService =  createTableServiceWithSas(hostUri,sasToken);

// https://www.npmjs.com/package/azure-storage
const  query = new TableQuery()
  .top(5);
  //.where('PartitionKey eq ?', 'Counselling and Case Management');

let entGen = TableUtilities.entityGenerator;
// var entity = {
//   PartitionKey: entGen.String('Counselling and Case Management'),
//   RowKey: entGen.String('row1'),
//   taskDone: entGen.Boolean(true),
// };
   // =YEAR(E2)&"-"&TEXT(MONTH(E2),"00")&"-"&TEXT(DAY(E2),"00")&"T00:00:00.0Z"


/**
 * 
 * @param {*} id 
 * @param {*} idtype    SLK / CCARE / MCARE / TED / Other
 * @param {*} queryType 
 */
function getByID(id, idType, queryType='Episode') {
  const  query = new TableQuery()
    .where( `${idType} eq ?`, id)

  tableService
  .queryEntities (queryType, query, null,function(error, result, response) {
    //console.log(process.env); //console.log(process.env.VUE_APP_STORAGE_HOST_URI_MDS)
    //.retrieveEntity('entries',  query, null, function(error, result, response) {
    if (error) {
      console.error(error.message);
      return -1;
    }
    // result contains the entity
    if (response.isSuccessful) {
      console.log(response.body); //let tablestring = makeTableString(response.body); $('#tableData').append (tablestring);
      return response.body;
    }
    console.log(result.entries);
    return response.entries;
  });    

}

export function getClientAssessments(id, idType) {
  if (idType !== 'SLK') {
    return getByID(id, idType,'Episode');
  }
  return getByID(slk, 'PartitionKey','Episode');//optimized ?
}

/**
 * 
 * @param {*} id 
 * @param {*} idtype    SLK / CCARE / MCARE / TED / Other
 * @param {*} queryType 
 */
export function getUserByID(id, idType, queryType='MDS') {
  const  query = new TableQuery()
    .where( `${idType} eq ?`, id)

  tableService.queryEntities (queryType, query, null,function(error, result, response) {
    //console.log(process.env); //console.log(process.env.VUE_APP_STORAGE_HOST_URI_MDS)
    //.retrieveEntity('MDS',  query, null, function(error, result, response) {
    if (error) {
      console.error(error.message);
      return -1;
    }
    // result contains the entity
    if (response.isSuccessful) {
      console.log(response.body); //let tablestring = makeTableString(response.body); $('#tableData').append (tablestring);
    }
    console.log(result.entries)
  });    

}

/*
function makeTableString(data) {
  let hstr ='<tr>';
  headers.forEach ( h=>{
    hstr += `<th>${h}</th>\n`;
  });
  hstr += '</tr>';
  let rows ="";
  data['value'].forEach( d=> {
    let row ='<tr>'
    headers.forEach ( h=>{
      let val = d[h];//['_'];
      // if (h =='Commencement_Date'){
      //   let dArr = val.substring(0,val.indexOf(" ")).split('/'); // local date new Date(today.getTime() - minutes * 60000)
      //   let dat = new Date(dArr[2], dArr[1], dArr[0])
      //   //entGen.DateTime(dat)
      //   val = dat.toLocaleDateString('en-GB', { timeZone: 'UTC' });
      //   //console.log(`>>>>>>>${h}>>>> VAL ${val}`);
      // }
      row += `\t <td>${val}</td>\n`;
    });
    row += '</tr>';
    rows += row;
  })
  
  return `<table> ${hstr} \n ${rows} </table>\n`
}
*/

/*
 * ANSA User: {
 *  'Demographics' : {},
 *  'Intial Assessments': [ {ep_id: 1, ..} , {ep_id: 2}],
 *  'Reviews': [ {..}, {ep_id: 2, id :1 ...} , {ep_id: 2, id :2 ...}],
 *  
 */
