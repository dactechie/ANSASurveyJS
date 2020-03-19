

// mutation.js updateSurveyFormData () -
//  -> addOrReplaceOrIgnoreIfMoreRecent (state['survey'], client['SLK'], survey)
export function addOrReplaceOrIgnoreIfMoreRecent(localMapofClientsSurveys, key_slk, object) {
  

  let client_slks = Object.keys(localMapofClientsSurveys);
  let index = client_slks.indexOf(key_slk)
  if (//client_slks.length === 0 || //localstore has no surveys
      index < 0) { //localstore has no entry for this client
    localMapofClientsSurveys[key_slk] = []
    
    object['meta'] = {'last_modified': new Date()}

    localMapofClientsSurveys[key_slk].push(object)
    return object;
  }
  let localSurvey = localMapofClientsSurveys[key_slk][index];
  let localObjectLastMod = localSurvey['meta']['last_modified']
  console.warn("TODO : must serialize to date object before comparing " + 
                typeof localObjectLastMod + " " + typeof object['meta']['last_modified'] )

  if(object['meta']['last_modified'] > localObjectLastMod) {      
    localMapofClientsSurveys[key_slk][index] = object;
    console.log("updated stale local object");
    return object;
  }
  console.log("More recent survey in localstore. not updating. returning more recent one", localSurvey);
  return localSurvey; 
}
// client = {
//   'JALAL232312': {client object}
// }
/*
 survey {
   'JALALAF343434': [ 
        '34sfdgs(lastPartial-SruveyID)43ffff": { survey object  
                                                    'meta' : { last_modified: 34343433 }
                                                },
        '34sfdgs(lCOMPLETED SURVEY)43ffff": { survey object }
    ]
 }
 */

export function isValidLookupIds (type_client_id) {
  console.log( "here" , type_client_id)
  let client_id = type_client_id[1];
  //TODO : use SLK-pattern from schema/schema.json
  return (type_client_id[0] === 'SLK') ?
          /[A-Z0-9]{7}(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)[0-9]{2}(1|2|9)/.test(client_id)
          :
          Number.isInteger(client_id);
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


export function getShardFromDate(date){
  return "02";
}

//export default {getShardFromDate, isValidLookupIds, generateSummaryHTML};