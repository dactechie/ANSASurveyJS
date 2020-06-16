import SurveyService from  '@/common/SurveyService';



export default {

  GET_LAST_SURVEYS_FOR_CLIENT: async function ({commit, rootState}, client_lookup) {
    let response = {}
    //let db_id = parseInt(client_lookup['DB_ID']) ;
    try {        
        //let id_type = client_lookup['id_type'];
        response = await SurveyService.getLastSurveyData(client_lookup);
        console.log("getLastSurveyData response", response);
        //console.log("getLastSurveyData response", response.data);
        // inaddition to setting the current client and survey session variables
        // if the client/clients' surveys was/were not in the local storage, it adds them
        // if the client WAS in the local storage, it is possible then smarr-merge the surveys
        // smart-merge : there moght have been a prior session where the partial updates to the survey had no chance to reach the server/
        // if the 'capture-date' on the localstore-survey is newer than any of the surveys' 'last-modified-date' returned from the backend, then ask the client
        // do they want to continue editing the draft or discard and start over.

        //  states :
        // 1.  last_captured(frontend) > last-modfiied (backend) (or missing last-mod date) => didn't sync new changes to backend
        // 2. last-modified > last_captured  : admin edited outside the survey -app        
        // commit('updateClientStateFromBackendData', response.data, { root: true }) 
        
        // //commit('updateClientStateFromBackendData', response.data);
        commit('updateSurveyStateFromBackendData', response.entries);
        

      } catch(err){
          console.error("action:GET_LAST_SURVEYS_FOR_CLIENT getLastSurveyData \
                          Unable to perform action.", err);

          commit('offlineStartSessionByLocalLookup', client_lookup);

    } finally {
      // if the association of survey to client was not made in the server
      // pass this helper info (actually it is in DB_ID in the client_lookuop )
        //const client_refid = rootGetters.getCurrentClientDBRefID
      // if (!client_refid) // sesssion Var was set.
        
    }

  },

   
    UPDATE_SURVEY_DATASERVER: async function ({ commit }, surveyData) {
      try {
      
        //surveyData['meta'] = {'shard': '02'}
        const response = await SurveyService.savePartialSurvey(surveyData);
        console.log("update response", response);
        //save to state(vuex) and localstore, if backend /network had no issues
        //commit('updateSurveyFormDataFromBackendUpdate', surveyData )
       commit('updateSurveyStateFromBackendData', surveyData )
      
      } catch(err){
          console.error("Backend Error" , err);
      }
    },  
   
    ADD_SURVEY_DATASERVER: async function ({ commit, rootGetters }, surveyData) {
      try {
  
        surveyData['client_id'] = rootGetters.getCurrentClientDBRefID
        // surveyData['meta'] = {'shard': '02'}
        //console.log( `+++++++++++++++++++++ Client id  ${surveyData['client_id']}`);
        console.log("going toi call addPartialSurvety" , surveyData)
        delete surveyData['_id']
        const response = await SurveyService.addPartialSurvey(surveyData);
        console.log("ADD SURVEY  response", response);
        //save to state(vuex) and localstore, if backend /network had no issues

       // commit('updateSurveyFormDataFromBackendUpdate', surveyData )
       commit('updateSurveyStateFromBackendData', surveyData )

      } catch(err){
          console.error("Backend Error" , err);
      }
    } 


  }