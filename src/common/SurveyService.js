
import myAxios from './api';

export default {

  // getIncompleteSurveyData (client_id, id_type='SLK')  {
  //   console.log(`get partial survey for client ${client_id}`);
  //   return myAxios.get(
  //     `${myAxios.defaults.baseURL}?request_type=get_partial_ia&client_id=${client_id}&id_type=${id_type}`);
  //   // return myAxios.get(`/survey_answers/${clientId}`);
  // },
  getLastSurveyData (client_id, id_type)  {
    console.log(`get last (possibly partial) survey for client ${client_id}`);
    return myAxios.get(
      `${myAxios.defaults.baseURL}?request_type=get_last_ia&client_id=${client_id}&id_type=${id_type}`);
    // return myAxios.get(`/survey_answers/${clientId}`);
  },



  savePartialSurvey (surveyData)  {
    console.log('save partial', surveyData);
    client_id = surveyData['client_id'];
    id_type = surveyData['id_type'];
    return myAxios.put(
      `${myAxios.defaults.baseURL}?request_type=put_partial_ia&client_id=${client_id}&id_type=${id_type}`,
      surveyData);
    //return myAxios.put(`/partial/${clientId}`, surveyData);
  }
} 