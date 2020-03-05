
import myAxios from './api';

function buildURL(request_type, client_id, id_type){
  return `${myAxios.defaults.baseURL}?request_type=${request_type}&client_id=${client_id}&id_type=${id_type}`;
}

export default {

  // getIncompleteSurveyData (client_id, id_type='SLK')  {
  //   console.log(`get partial survey for client ${client_id}`);
  //   return myAxios.get(
  //     `${myAxios.defaults.baseURL}?request_type=get_partial_ia&client_id=${client_id}&id_type=${id_type}`);
  //   // return myAxios.get(`/survey_answers/${clientId}`);
  // },
  getLastSurveyData (client_id, id_type)  {
    console.log(`get last (possibly partial) survey for client ${client_id}`);
    const url = buildURL('get_last_ia', client_id, id_type);
    return myAxios.get(url);
    // return myAxios.get(`/survey_answers/${clientId}`);
  },



  savePartialSurvey (surveyData)  {
    console.log('save partial', surveyData);
    if (!( 'client_id'  in surveyData)){
      console.info("SurveyService: client id not in data");
      return undefined;
    }

    const url = buildURL('put_partial_ia', surveyData['client_id'], surveyData['id_type']);
    return myAxios.put(url, surveyData);
    //return myAxios.put(`/partial/${clientId}`, surveyData);
  }
} 

// {
//   "name": "client_lookup",
//   "elements": [
//     {
//     "type": "text",
//     "name": "client_id",
//     "title": "ID  - SLK / Database ID"
//     },
//     {
//     "type": "radiogroup",
//     "name": "id_type",
//     "title": "ID Type",
//     "validators": [
//       {
//        "type": "expression"
//       },
//       {
//        "type": "expression",
//        "text": "Did not find client"
       
//       }
//     ],
//     "choices": [
//       {
//       "value": "SLK",
//       "text": "SLK"
//       },
//       {
//       "value": "MCARE_ID",
//       "text": "MCARE_ID"
//       },
//       {
//       "value": "CCARE_ID",
//       "text": "CCARE_ID"
//       }
//     ],
//     "colCount": 3
//     }
//   ],
//   "title": "Client Search"
//   },