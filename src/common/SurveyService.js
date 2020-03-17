
import myAxios from './api';
import {getShardFromDate, buildURL} from './utils';


export default {

  // getIncompleteSurveyData (client_id, id_type='SLK')  {
  //   console.log(`get partial survey for client ${client_id}`);
  //   return myAxios.get(
  //     `${myAxios.defaults.baseURL}?request_type=get_partial_ia&client_id=${client_id}&id_type=${id_type}`);
  //   // return myAxios.get(`/survey_answers/${clientId}`);
  // },
  getLastSurveyDataByID (client_lookup, id_type)  {
    console.log(`get last (possibly partial) survey for client ${client_lookup}`);
    let params = {};
    if (id_type === 'SLK')
      params = {SLK: client_lookup}
    else if (id_type)
      params = {DB_ID : client_lookup, DB_TYPE: id_type};
    else
      params = client_lookup;// {Firstname: fname, Surname: lname, Sex: sex, DOB: DOB};

    const url = buildURL(myAxios.defaults.baseURL,'get_client_records', params);
    return myAxios.get(url);
    // return myAxios.get(`/survey_answers/${clientId}`);
  },

    // },
  getLastSurveyDataBySLKDeets (fname, lname, sex, DOB)  {
    console.log(`get last (possibly partial) survey for client ${fname}`);
    let params = {Firstname: fname, Surname: lname, Sex: sex, DOB: DOB};
    const url = buildURL(myAxios.defaults.baseURL,'get_client_records', params);
    return myAxios.get(url);
    // return myAxios.get(`/survey_answers/${clientId}`);
  },



  savePartialSurvey (surveyData)  {
    console.log('save partial', surveyData);
    if (!( 'client_id'  in surveyData)){
      console.info("SurveyService: client id not in data");
      return undefined;
    }
    console.log("savePartialSurvey survey data ------------------");
    console.log(surveyData);
    
    //surveyData['meta'][''] = new Date()

    const url = buildURL(myAxios.defaults.baseURL,
                      'put_partial_ia', {id:surveyData['_id']});// {client_id=surveyData['client_id'], id_type=surveyData['id_type']});
    return myAxios.put(url, surveyData);
    //return myAxios.put(`/partial/${clientId}`, surveyData);
  },

  addPartialSurvey (surveyData)  {
    console.log('ADD New partial', surveyData);
    if (!( 'client_id'  in surveyData)){
      console.info("SurveyService: client id not in data");
      return undefined;
    }
    let captured_date = new Date();

    surveyData['meta'] = {
      "shard": getShardFromDate(captured_date),
      "device": "to_be_implemented",
      "survey_id": "to_be_implemented",
      "validation_schema_id": "to_be_implemented",
      "data_source": "ANSA",
      "dt_captured": captured_date,      
      "prev_partial_id": ""
    }
    console.log("add  survey data ------------------");
    console.log(surveyData);

    const url = buildURL('post_partial_ia');
    return myAxios.post(url, surveyData);
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