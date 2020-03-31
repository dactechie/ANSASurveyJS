
import myAxios from './api';
import {getMeta, buildURL} from './utils';


export default {

  // getIncompleteSurveyData (client_id, id_type='SLK')  {
  //   console.log(`get partial survey for client ${client_id}`);
  //   return myAxios.get(
  //     `${myAxios.defaults.baseURL}?request_type=get_partial_ia&client_id=${client_id}&id_type=${id_type}`);
  //   // return myAxios.get(`/survey_answers/${clientId}`);
  // },
  getLastSurveyData(client_lookup, id_type)  {
    console.log(`SurveyService: getLastSurveyDataByID  (possibly partial)`, client_lookup);
    let params = {};
    if (id_type === 'SLK')
      params = {SLK: client_lookup}
    // else if (id_type)
    //   params = {DB_ID : client_lookup, DB_TYPE: id_type};
    else
      params = client_lookup;// {Firstname: fname, Surname: lname, Sex: sex, DOB: DOB};

    const url = buildURL(myAxios.defaults.baseURL,'get_client_records', params);
    return myAxios.get(url);
    // return myAxios.get(`/survey_answers/${clientId}`);
  },

  //   // },
  // getLastSurveyDataBySLKDeets (fname, lname, sex, DOB)  {
  //   console.log(`get last (possibly partial) survey for client ${fname}`);
  //   let params = {Firstname: fname, Surname: lname, Sex: sex, DOB: DOB};
  //   const url = buildURL(myAxios.defaults.baseURL,'get_client_records', params);
  //   return myAxios.get(url);
  //   // return myAxios.get(`/survey_answers/${clientId}`);
  // },



  savePartialSurvey (surveyData)  {
    console.log('save partial', surveyData);
    if (!( 'client_id'  in surveyData)){
      console.info("SurveyService: client id not in data");
      return undefined;
    }
    surveyData['meta']['last_captured'] = new Date();
    
    console.log("savePartialSurvey survey data -------", surveyData);
    const url = buildURL(myAxios.defaults.baseURL,
                      'put_partial_ia');//, {_id:surveyData['_id']});
    return myAxios.put(url, surveyData);
    //return myAxios.put(`/partial/${clientId}`, surveyData);
  },

  addPartialSurvey (surveyData)  {
    console.log('ADD New partial', surveyData);
    if (!( 'client_id'  in surveyData)){
      console.info("SurveyService: client id not in data");
      return undefined;
    }
    
    surveyData['meta'] = getMeta(surveyData, {"last_captured": new Date()});

    console.log("add  survey data ------------------");
    console.log(surveyData);

    const url = buildURL(myAxios.defaults.baseURL,'post_partial_ia');
    return myAxios.post(url,surveyData);
    //return myAxios.put(`/partial/${clientId}`, surveyData);
  }

} 
