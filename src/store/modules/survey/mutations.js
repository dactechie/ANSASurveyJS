import Vue from 'vue'
// export const STORAGE_KEY = 'survey-vuejs'

// // for testing
// if (navigator.userAgent.indexOf('PhantomJS') > -1) {
//   window.localStorage.clear()
// }

export const mutations = {
  addChoicesToQuestion(state, question, choiceSchema) {
    var question = state.survey.getQuestionByName(question);
    question.columns[0].choices = choiceSchema['enum'];
    //var question = state.survey.getQuestionByName("pdc_and_usage");
    //question.columns[0].choices = drugs['enum'];

  },

  updateSurveyFormData (state, surveyData) {
      // console.log("state", state)
      console.log("updateSurvey_Form_Data::", surveyData)
      if (surveyData === undefined) {
        console.warn("not implemented yet <<<<<<<<<<<<<<");
        return;
         // Vue.set(state, 'survey', {});
        //Object.assign(state, undefined);
      }
      else {
        if ('ClientLookupMethods' in surveyData  ) {
          //console.log("Mutation: updateSurveyFormData  -> Deleting ClientLookupMethods")
          delete surveyData.ClientLookupMethods;
        }
        console.log(" Survey Data goingto be updated :  ", surveyData);
        
        let client = surveyData['client'], survey = surveyData['survey'];
        //let client_survey_id = surveyData['client_id']+ '_'+  surveyData['id_type'];
        let slk = client['SLK']; 
        // Vue.set(state['clients'], surveyData['slk'], 

        let thissurvey = {}
        thissurvey[slk] = survey
        state['survey'].push(thissurvey)

        //this is to help with application to know which client to pull from the localStorage
        // the lookup may have been done with db-id, id-type, so this may not have been available
        //   even if the server returned this information, they may not be a mapping from id-type to slk (would have to search the localstorage objects by id, type) 
        // to find the right object in the list of surveys for all clients)
        sessionStorage.setItem('CurrentSurvey', JSON.stringify(thissurvey));
      }
      //state.survey = surveyData
  }

}