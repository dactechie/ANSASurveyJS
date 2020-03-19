import { addOrReplaceOrIgnoreIfMoreRecent } from '@/common/utils';

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
  updateSurveyFormDataFromBackendUpdate(state, surveyData) {
    //let currentSurvey = JSON.parse( sessionStorage.getItem('CurrentSurvey'));
    console.warn('in here : updateSurveyFormDataFromBackendUpdate');
    let clientSLK = sessionStorage.getItem('CurrentClientLookupID')
    //state.survey
    surveyData['meta']['device'] ='UPDATETTEDDDD';
    addOrReplaceOrIgnoreIfMoreRecent(state['survey'], clientSLK, surveyData);

    sessionStorage.setItem('CurrentSurvey', JSON.stringify(surveyData));

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
          console.warn("Mutation: updateSurveyFormData  -> Deleting ClientLookupMethods")
          delete surveyData.ClientLookupMethods;
        }
        console.log("updateSurveyFormData: surveyData ->  ", surveyData);
        
        let client_slk = '', survey ={} ; // Ugghj..ugly hack..
        
        if (surveyData.hasOwnProperty('team_name')) { // this is an AddNewSurvey Response
          // Vueclient does not know how to generate the SLK.. we only do it in the server
          // 'Adds /Insertst into server do not respond with an SLK..maybe they should ?
          client_slk = sessionStorage.getItem('CurrentClientLookupID');
          survey= surveyData;
        }
        else { // this is a lookup-all-client-records response;
          client_slk = surveyData['client']['SLK'];
          survey = surveyData['survey'];
        }

        if (survey == null) {
          console.log(" No surve for client with SLK : "  + client_slk);
          return;
        }

         // ONLY if response survey data is more recent than localstorage version, then update.
    // or rely on push notifications to update the local state.. and always access the local state.
    // if the psuh notification comes while the client is updating the record, ask the client to resolve it.
        let mostRecentSurvey = addOrReplaceOrIgnoreIfMoreRecent(
                                      state['survey'], client_slk, survey);

        //this is to help with application to know which client to pull from the localStorage
        // the lookup may have been done with db-id, id-type, so this may not have been available
        //   even if the server returned this information, they may not be a mapping from id-type to slk (would have to search the localstorage objects by id, type) 
        // to find the right object in the list of surveys for all clients)
        sessionStorage.setItem('CurrentSurvey', JSON.stringify(mostRecentSurvey));
      }
      //state.survey = surveyData
  }

}