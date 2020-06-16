

// mutation.js updateSurveyFormData () -
//  -> addOrReplaceOrIgnoreIfMoreRecent (state['survey'], client['SLK'], survey)
let ONE_HOUR = 60 * 60 * 1000;



function tryGetClientFromLocalStore (client_lookup) {
  let localData = JSON.parse(localStorage.getItem("mj-surveyjs"));
  if (!localData || !localData.hasOwnProperty('survey') ||
    !localData['survey'].hasOwnProperty('survey')) {
      console.warn("empty local store");
      return undefined
    }
  
  let surveyList = localData['survey']['survey']
  let clientList = localData['client']['client']
  // console.log(" CLIENT LIST -----", clientList);
  console.log(" CLIENT lookup -----", client_lookup);
  // assume DB_ID in client lookup exists  and referes to actual DB_ID not slk
  let db_id = parseInt(client_lookup['DB_ID']) ;
  
  for (let [slk, c] of Object.entries(clientList)) {
    if(c['DB_ID'] != db_id ||
      c['DB_ID_TYPE'] != client_lookup['DB_ID_TYPE']) continue;
    
    const client_surveys = surveyList[slk]
    const most_recent_survey = client_surveys[client_surveys.length -1]
    console.log(" CLIENT SKK -----", slk);
    console.log(" CLIENT last survey  -----", most_recent_survey);
    return {slk, survey: most_recent_survey};
  }
}

// no backend survey data. see if there is somthing in the local stre and set it for the session
// currentClient (based onthe lookup,)
      // if offline  and localstore has no client in the localstore, then ->
            // ->>>>>>>>>>> calculate SLK !so we can contine in offline mode
export function setCurrentSessVarsFromLocalStore (state, client_lookup){
  const locClients = state.client;

  if (! locClients) {
    console.warn("No client data in localstate");
    return;
  }
  console.log("clients **" , locClients);

  client_slk = sessionStorage.getItem('CurrentClientLookupID');

  const locSurveys = state.survey;
  if (!locSurveys) {
    state['survey'][client_slk].push(surveyData)
    sessionStorage.setItem('CurrentSurvey', surveyData);
  }

  

  for (let [slk, c] of Object.entries(locClients)) {
    if(c['DB_ID'] != db_id ||
      c['DB_ID_TYPE'] != client_lookup['DB_ID_TYPE']) continue;

      const client_surveys = surveyList[slk]
      const most_recent_survey = client_surveys[client_surveys.length -1]    
  }
}

// function getShardFromDate(date){
//   console.warn(" utils: getShardFromDate : TO BE IMPLEMENTED ");
//   return "02";
// }

export function getMeta(surveyObj, someMeta){

  const defaults = surveyObj['meta']  || {
                  //"shard": getShardFromDate(captured_date),
                  "device": "to_be_implemented",
                  "survey_id": "to_be_implemented",
                  "validation_schema_id": "to_be_implemented",
                  "original_datasource":"to_be_implemented",
                  "data_source": "ANSA",
                  "last_captured": new Date(),
                  "last_modified": "to_be_set_by_server",
                  "prev_partial_id": "",
                  "is_complete": false
                }
  return Object.assign(defaults, someMeta);  
}

export function getContinuableLocalSurveyIndex(listofSurveysForClient) {

  return listofSurveysForClient.findIndex(survey => {
      return (! survey['is_complete']) &&
            ((new Date) - new Date(survey['last_captured']) < ONE_HOUR);
  });

}

export function getMatchingContinuableLocalSurveyIndex(listofSurveysForClient, newSurveyObject){  
  
  let matchingSurvey =  listofSurveysForClient.find(survey => {
                            survey['_id'] == newSurveyObject['_id'];
                        });
  if (!matchingSurvey){
    return -1;
  }                   
  return getContinuableLocalSurveyIndex(matchingSurvey)
}

export function clientHasSurveys(client_surveys){
  return client_surveys && Object.keys(client_surveys).length > 0;
}

export function createNewLocalSurvey(clientSurveys, bkendSurveyObject) {

  if (!clientSurveys) clientSurveys = []
  clientSurveys.push(bkendSurveyObject);
  console.log( "createNewLocalSurvey pushed a new survey to localStore " , clientSurveys);
}

/**
 *  existingLocalSurvey may not have a 'last_modified' date (never uploaded to backend)
 *  
 * @param {*} matchingLocalSurvey 
 * @param {*} backendSurveyData 
 */
export function isLocalNewerVersion(matchingLocalSurvey, backendSurveyData) {
  let localSurveyDate = matchingLocalSurvey['meta']['last_modified'] || 
                                matchingLocalSurvey['meta']['last_captured']
  if (Date.parse(localSurveyDate) < 
        Date.parse(backendSurveyData['meta']['last_modified'])) {
            // check if backend version has more data than the local one.
            const locSize = JSON.stringify(matchingLocalSurvey).length;
            const bckSize = JSON.stringify(backendSurveyData).length;
            if (bckSize > locSize) {
              console.warn("Going to Override local objec (smaller) with backend ",
                           matchingLocalSurvey);
              //TODO: raise an event here that is displayed to the user, about this decision
              
              return false;
            }
            return undefined;// this means client has to choose;
    }
    console.log("backend version was stale, keep the local version.\
                     The backend will automatically updated later.");
    return true;
}

export function isValidLookupIds (type_client_id) {
  console.log( "here" , type_client_id)
  let client_id = type_client_id[1];
  //TODO : use SLK-pattern from schema/schema.json
  let result = (type_client_id[0] === 'SLK') ?
          /[A-Z0-9]{5}(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)[0-9]{2}(1|2|9)/.test(client_id)
          :
          Number.isInteger(client_id);
  console.log("result of isValidLookuipIds ", result);
  console.log((type_client_id[0] === 'SLK') );
  return result;
}

export function buildURL(baseURL, request_type, params){
  let pstring  = '';
  console.log("pARAMS " , params)
  if(params)
    for (let [key, value] of Object.entries(params)) {
      pstring = `${pstring}&${key}=${value}`;
    }
  console.log("p string ", pstring);
  return `${baseURL}?request_type=${request_type}${pstring}`;
  //return `${myAxios.defaults.baseURL}?request_type=${request_type}&client_id=${client_id}&id_type=${id_type}`;
}



export function generateSummaryHTML(data) {
  console.log("\n GOING TO GENERATE HTML DATA FOR ", data)
  let tableBody ='<tr> <td> KEY </td> <td> VALUE </td> </tr>';
  let rows = [], str ='', text ='';

  for (let [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && 
        typeof value[0] === 'object' && value[0] !== null) 
      for (let v of value)
          text += '\n\n\t<p></p>' + generateSummaryHTML(v) + '<br>----</br>';

      else 
        text = JSON.stringify(value, null, "\t").replace(/"/g,'');

    str = `<tr><td> ${key} </td> <td> ${text} </td> </tr> \n`;
    rows.push(str)
  }
  
  return `<table style="border: 1px solid black;"> ${rows.join('\n')} </table>`;

}



//export default {getShardFromDate, isValidLookupIds, generateSummaryHTML};