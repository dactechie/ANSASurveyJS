

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
  for (let [key, value] of Object.entries(params)) {
    pstring = `${pstring}&${key}=${value}`;
  }
  console.log("p string ", pstring);
  return `${baseURL}?request_type=${request_type}${pstring}`;
  //return `${myAxios.defaults.baseURL}?request_type=${request_type}&client_id=${client_id}&id_type=${id_type}`;
}



export function generateSummaryHTML(data) {
  let tableBody ='<tr> <td> KEY </td> <td> VALUE </td> </tr>';
  let rows = [], str ='', text ='';
  for (let [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && typeof value[0] === 'object' && value[0] !== null) {
      for (let v of value){
          text += '\n\n\t<p></p>' + generateSummaryHTML(v) + '<br>----</br>';
      }      
    } else {
      text = JSON.stringify(value,null, "\t").replace(/"/g,'');
    }
    str = `<tr><td> ${key} </td> <td> ${text} </td> </tr> \n`;
    rows.push(str)
  }
  
  return `<table> ${rows.join('\n')} </table>`;

}


export function getShardFromDate(date){
  return "02";
}

//export default {getShardFromDate, isValidLookupIds, generateSummaryHTML};