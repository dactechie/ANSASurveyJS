import { //addOrReplaceOrIgnoreIfMoreRecent,
   clientHasSurveys, createNewLocalSurvey, getMatchingContinuableLocalSurveyIndex, isLocalNewerVersion,
   getContinuableLocalSurveyIndex   } from '@/common/utils';

import {DBSurveyFieldNameMapper as mapper}    from '@/utils/db/mappers';
  //  const mapper = { 
  //               "Team" :"team_name",
  //               "Staff": "staff_name",
  //               "PrincipalDrugOfConcern": "pdc" , 
  //                   "MethodOfUse" : "pdc_method_of_use", 
  //                   "OtherDrugsOfConcern" : "odc", 
  //                   "AODHistory":"aod_history",
  //                 "Risks":"aod_harms_risks",
  //                 "RisksOtherComments": "aod_harms_risks-Comment",
  //                 "ImpactOnDailyActivities": "impctdaily",
  //                 "AddictiveBehaviours":"additive_behaviours"
  //                 };
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
  offlineStartSessionByLocalLookup: (state, client_lookup) => {
    //unable to fetch data from backend.

    //if localstore has a version of the backend client and survey object, we should allow them to continue.
    // continue:
    //  use the localstore unfinished survey, provided the survey is not past the expiry date.
    //    otherwise sstart a new survey
    
    // start the session with client data: 
    let clientSLK = sessionStorage.getItem('CurrentClientLookupID');
    if (!clientSLK) {
      clientSLK = client_lookup['SLK'];
      if (!clientSLK) {
        console.error("Giving up - no SLK. Can't continue with offlineStartSessionByLocalLookup !!");
        return;
      }
      console.log("starting an offline session")
      sessionStorage.setItem('CurrentClientLookupID', clientSLK);
    }
    //find latest unfinished , non-exired survey
    const listofSurveysForClient = state['survey'][clientSLK];//state sync'd from localStorage
  
    if(! clientHasSurveys(listofSurveysForClient)) {
      console.log(`offlineStartSessionByLocalLookup: no previous surveys for client ${clientSLK}`);
      return;
    }
    const freshLocalPartialSrvyIdx = 
              getContinuableLocalSurveyIndex(listofSurveysForClient);
    if (freshLocalPartialSrvyIdx < 0 ) {
      console.log(`offlineStartSessionByLocalLookup: No usable survey feed the session with. \
                            brand new session for client ${clientSLK}`);
      return;
    }
    
    //careful : when it goes back onlien, there is no link between survet.client_id 
      // so the first update to the server will be "add-New-Surbey-For-Client(client ['_id']) "
    sessionStorage.setItem('CurrentSurvey',
                           listofSurveysForClient[freshLocalPartialSrvyIdx]);


    //localstore is sync'd to state by vuex-persisted
    // but how did the vuex-state get updated in the offlfine mode 
    //      from SurveyJS: survey.data ?
    
    
    // session store needs updating
    // if CurrentClient is not set, calculate SLK and set it

    // if CurrentSession is not set, use the SLK from CurrentClient and set it to the most recent
    //  INCOMPLETE survey for this client, (if one is available)


  },

  updateSurveyStateFromBackendData(state, serverResponseData) {
    let backendEpisode = serverResponseData[0];
    let localSurvey = sessionStorage.getItem('CurrentSurvey') || {}
    let value = "";
    for (let key in backendEpisode) {
      value = backendEpisode[key]._;
      if (! value) continue;
      if (value[0] === "[")
        value = JSON.parse(value);
      localSurvey[mapper[key]] = value;
    }

    sessionStorage.setItem('CurrentSurvey', JSON.stringify(localSurvey));
    
    
  },

/**
 *       // inaddition to setting the current client and survey session variables
        // if the client/clients' surveys was/were not in the local storage, it adds them
        // if the client WAS in the local storage, it is possible then smart-merge the surveys
        // smart-merge : there might have been a prior session where the partial updates to the survey had no chance to reach the server/
        // if the 'capture-date' on the localstore-survey is newer than any of the surveys' 'last-modified-date' returned from the backend, then ask the client
        // do they want to continue editing the draft or discard and start over.

        //  states :
        // 1. last_captured (frontend) > last-modfiied (backend) (or missing last-mod date) => didn't sync new changes to backend
        // 2. last-modified > last_captured : admin edited outside the survey -app
 * @param {*} state 
 * @param {*} backendSurveyData  : [db_id, response.data)]
 */
  updateSurveyStateFromBackendData1(state, serverResponseData) {
    const backendClientData = serverResponseData.client;
    let backendSurveyData= serverResponseData.survey ;

    let clientSLK = '';
    if (! backendClientData) {
      clientSLK =  sessionStorage.getItem('CurrentClientLookupID')
      backendSurveyData = serverResponseData;
    }
    else // if just started the survey session, this would be empty..so set it from the bkend-returned data
      clientSLK = backendClientData['SLK'];

    // if (sessionStoageSLK !== clientSLK){
    console.log('in here : fetchedUpdateCurrentSurvey. backend-survey: ', backendSurveyData);    
                            //  // //  // //  // //  // 
                            //  start the session
                            //  // //  // //  // //  //     
    if(!backendSurveyData) {      
      console.warn("Please add this survey to the backend with the next page.. (NOT IMPLEMENTED) ");      
      return;
    }
    const localClientSurveys = state['survey'][clientSLK];
    console.log ("updateSurveyStateFromBackendData: listofSurveysForClient -> ", localClientSurveys);
    if(! clientHasSurveys(localClientSurveys)) { 
      //createNewLocalSurvey(state['survey'][clientSLK], backendSurveyData);
      if (!state['survey'][clientSLK]) 
        state['survey'][clientSLK] = []
      state['survey'][clientSLK].push(backendSurveyData);

      sessionStorage.setItem('CurrentSurvey', JSON.stringify(backendSurveyData));
      console.log("First LocalSurvey Added. session started : CurrentSurvey. localstore: ",
                     state['survey'][clientSLK]);
      return;
    }
    //  //  local-client has one or more surveys // //
    const mtchngLocalSrvyIdx = getMatchingContinuableLocalSurveyIndex(
                                  localClientSurveys, backendSurveyData);
    if (mtchngLocalSrvyIdx <  0) { // none of the locally stored surveys match whats coming from DB.
      //createNewLocalSurvey(state['survey'][clientSLK], backendSurveyData);
      state['survey'][clientSLK].push(backendSurveyData);
      sessionStorage.setItem('CurrentSurvey', JSON.stringify(backendSurveyData));
      console.log("added backendSurvey to the localstore.")
      return;
    }
    const localSurvey = localClientSurveys[mtchngLocalSrvyIdx];
    const isLocalNewer = isLocalNewerVersion(
                                  localSurvey,
                                  backendSurveyData);
    if (isLocalNewer === undefined) {
      console.error(" session not set. TODO: raise an event.");    // raise an event that requests the user 
      return;                                                      // to resolve the conflict.      
    }
    let currentSurvey = backendSurveyData;
    if(isLocalNewer)
      currentSurvey = localSurvey;        
    else
      state['survey'][clientSLK][mtchngLocalSrvyIdx] = backendSurveyData;
      
    sessionStorage.setItem('CurrentSurvey', JSON.stringify(currentSurvey));
    return;    
  },




  // updateSurveyFormDataFromBackendUpdate(state, surveyData) {
  //   //let currentSurvey = JSON.parse( sessionStorage.getItem('CurrentSurvey'));
  //   console.warn('in here : updateSurveyFormDataFromBackendUpdate');
  //   let clientSLK = sessionStorage.getItem('CurrentClientLookupID')
  //   //state.survey
  //   //surveyData['meta']['device'] ='UPDATETTEDDDD';
  //   addOrReplaceOrIgnoreIfMoreRecent(state['survey'], clientSLK, surveyData);

  //   sessionStorage.setItem('CurrentSurvey', JSON.stringify(surveyData));

  // },

  /**
   * Called after backedn call to getClient Surveys
   * @param {*} state 
   * @param {*} surveyData 
   */
/*  updateSurveyFormData (state, surveyData) {
      // console.log("state", state)
      console.log("updateSurvey_Form_Data::", surveyData)
      if (surveyData === undefined) {
        console.warn("not implemented yet <<<<<<<<<<<<<<");
        return;
         // Vue.set(state, 'survey', {});
        //Object.assign(state, undefined);
      }
      else {
        // if ('ClientLookupMethods' in surveyData  ) {
        //   console.warn("Mutation: updateSurveyFormData  -> Deleting ClientLookupMethods")
        //   delete surveyData.ClientLookupMethods;
        // }
        console.log("updateSurveyFormData: surveyData ->  ", surveyData);
        
        let client_slk = '', survey ={} ; // Ugghj..ugly hack..
        
        if (surveyData.hasOwnProperty('team_name')) { // this is an AddNewSurvey Response
          // Vueclient does not know how to generate the SLK.. we only do it in the server
          // 'Adds /Insertst into server do not respond with an SLK..maybe they should ?
          client_slk = sessionStorage.getItem('CurrentClientLookupID');
          state['survey'][client_slk].push(surveyData)
          sessionStorage.setItem('CurrentSurvey', surveyData);
          return;
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
  }*/

}