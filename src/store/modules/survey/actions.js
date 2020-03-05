import SurveyService from  '../../../common/SurveyService';

export default {

    GET_LAST_SURVEY: async function 
        getLastSurveyData({commit}, client_id_data) {
      let response =''
      try {
          client_id_data = client_id_data +"";
          const comma_pos = client_id_data.search(",");
          const id = client_id_data.substring(0,comma_pos);
          const id_type = client_id_data.substring(comma_pos+1);

          response = await SurveyService.getLastSurveyData(id, id_type);

          console.log("getLastSurvey response", response.data);
        } catch(err){
            console.error(err)
      }
      if (response === undefined || response.data === '') {
       // commit('updateSurveyData', undefined);
        console.log("GET_LAST_SURVEY : ----empty from server")
        return;
      } 
      commit('updateSurveyFormData', response.data);
    },
   
    UPDATE_SURVEY_DATASERVER: async function 
        updateSurveyDataServer ({ commit }, surveyData) {
      try {
        const response = await SurveyService.savePartialSurvey(surveyData);
        console.log("update response", response);
      } catch(err){
          console.error("Backend Error" , err);
      }
      commit('updateSurveyFormData', surveyData )
    },  
   
  }