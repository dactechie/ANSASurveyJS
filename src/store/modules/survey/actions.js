import SurveyService from  '../../../common/SurveyService';

export default {

    GET_LAST_SURVEY_BY_ID: async function ({commit}, client_id_data) {
      let response =''
      try {
          let client_id  =client_id_data['client_id'];
          let id_type  =client_id_data['id_type'];
          response = await SurveyService.getLastSurveyDataByID(client_id, id_type);

          console.log("getLastSurveyDataByID response", response.data);
        } catch(err){
            console.error(err)
      }
      if (response === undefined || response.data === '') {
        //commit('updateSurveyData', undefined);// clear the localstorage
        console.log("GET_LAST_SURVEY : ----empty from server")
        console.log("nothing to commit... should i clear the localstorage here ?")
        return;
      } 
      
      commit('updateSurveyFormData', response.data);
    },
    GET_LAST_SURVEY_BY_SLKDEETS: async function ({commit}, first_name, last_name, sex, DOB) {
      let response =''
      try {
          response = await SurveyService.getLastSurveyDataBySLKDeets(first_name, last_name, sex, DOB);

          console.log("getLastSurveyDataBySLKDeets response", response.data);
        } catch(err){
            console.error(err)
      }
      if (response === undefined || response.data === '') {
      //  commit('updateSurveyData', undefined); // clear the localstorage
        console.log("GET_LAST_SURVEY : ----empty from server")
        console.log("nothing to commit... should i clear the localstorage here ?")
        return;
      } 
      commit('updateSurveyFormData', response.data);
    },
   
    UPDATE_SURVEY_DATASERVER: async function ({ commit }, surveyData) {
      try {
        const response = await SurveyService.savePartialSurvey(surveyData);
        console.log("update response", response);
      } catch(err){
          console.error("Backend Error" , err);
      }
      commit('updateSurveyFormData', surveyData )
    },  
   
    ADD_SURVEY_DATASERVER: async function ({ commit }, surveyData) {
      try {
        const response = await SurveyService.addPartialSurvey(surveyData);
        console.log("update response", response);
      } catch(err){
          console.error("Backend Error" , err);
      }
      commit('updateSurveyFormData', surveyData )
    },  


  }