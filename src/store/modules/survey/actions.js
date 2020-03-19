import SurveyService from  '@/common/SurveyService';

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

export default {

  GET_LAST_SURVEYS_FOR_CLIENT: async function ({commit}, client_lookup) {
    let response = {}
    try {        
        //let id_type = client_lookup['id_type'];
        response = await SurveyService.getLastSurveyDataByID(client_lookup);

        console.log("getLastSurveyDataByID response", response.data);
        commit('updateCurrentClient', response.data);
        commit('updateSurveyFormData', response.data);

      } catch(err){
          console.error("action:GET_LAST_SURVEYS_FOR_CLIENT getLastSurveyDataByID EOORRRROR WITH CONNECTION ", err)
          let {slk, survey} = tryGetClientFromLocalStore (client_lookup);
          if (!slk){
            console.warn("no data ------------");
            return;
          }
          sessionStorage.setItem('CurrentClientLookupID', slk);
          if (!survey){
            console.warn("No survey to get. this will be the first one for this client");
            return;
          }
          console.log(`action: GET_LAST_SURVEYS_FOR_CLIENT most recent survet ${slk} : `, survey)
          sessionStorage.setItem('CurrentSurvey', JSON.stringify(survey));
          //commit('setCurrentSurvey', survey)
    }

    // console.log(`action:GET_LAST_SURVEYS_FOR_CLIENT response forGET_LAST_SURVEYS_FOR_CLIENT `, response);
    // if (! response || ! response.data ) {
    //   //commit('updateSurveyData', undefined);// clear the localstorage
    //   console.log("GET_LAST_SURVEY : ----empty from server")
    //   console.log("nothing to commit... should i clear the localstorage here ?")
    //   return undefined;
    // }
   
    //commit('updateSurveyFormData', response.data);
    
    // commit('updateSurveyFormData', response.data); // this sets the  state, local and session store from response.data
  },

   
    UPDATE_SURVEY_DATASERVER: async function ({ commit }, surveyData) {
      try {
      
        surveyData['meta'] = {'shard': '02'}
        const response = await SurveyService.savePartialSurvey(surveyData);
        console.log("update response", response);
        //save to state(vuex) and localstore, if backend /network had no issues
        commit('updateSurveyFormDataFromBackendUpdate', surveyData )
      
      } catch(err){
          console.error("Backend Error" , err);
      }
    },  
   
    ADD_SURVEY_DATASERVER: async function ({ commit }, surveyData) {
      try {

        let slk = sessionStorage.getItem('CurrentClientLookupID');
        if(!slk || slk ==null){
          console.error("No client in sesssion. unable to proceed ");
          return;
        }
        let localData = JSON.parse(localStorage.getItem("mj-surveyjs"));
        let clients = localData['client']['client']
        surveyData['client_id'] = clients[slk]['_id']
        // surveyData['meta'] = {'shard': '02'}
        console.log( `+++++++++++++++++++++ Client id  ${surveyData['client_id']}`);

        console.log("going toi call addPartialSurvety" , surveyData)
        const response = await SurveyService.addPartialSurvey(surveyData);
        console.log("ADD SURVEY  response", response);
        //save to state(vuex) and localstore, if backend /network had no issues

        commit('updateSurveyFormDataFromBackendUpdate', surveyData )

      } catch(err){
          console.error("Backend Error" , err);
      }
    } 


  }