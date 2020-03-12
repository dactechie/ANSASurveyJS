<template>
<!--
  ,
         "expression": "lookupClient({client_id}, {id_type}) = true"
  -->
  <div id="app" v-hammer:swipe.horizontal="onSwipeHorizontal">
    <button id="show-modal" @click="showModal = true">Status/Overview</button>
    
     <SummaryModal v-if="showModal" @close="showModal = false" > 
        <!-- @navTo="selectPage" -->
      <h3 slot="header">Summary View</h3>
    </SummaryModal>

    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import { mapActions, mapGetters } from 'vuex'
import surveyQuestions from  './questions.json';
import SummaryModal from './SummaryModal';
import drugs from './schema/drugs.json';
import swipeEvent from './swipe.js';
import setupAnimation from './transition.js';
import  SurveyService from  './common/SurveyService';

/**
 * Remote State /DB sync.
 * Local DB stores all the clients data (offline use).i,.e, it is sync';d to the server/
 *  The server should contain the knowledge of , which tablet has downloaded upto what version of hthe database ?
 * 
 *   Table ClientSurveys
 *      * All
 *          ID :1 SLK : ALLAF1981 ; PDC: Alcohol
 *              LastModified: 2020-03-10, by Tablet-2
 *              LastModified: 2020-03-10, by Tablet-2
*           ID :2 SLK : JAGGGE1994 ; PDC: Cannabis
               v1: LastModified: 2020-01-31, by Tablet-1
 *             v2: LastModified: 2020-02-01, by Tablet-1
            
 * 
 * Tablet-1 IndexDB Downloads 
 *          ..
 *           ID :2 SLK : JAGGGE1994 ; PDC: Cannabis
                v1: LastModified: 2020-01-31, by Tablet-1


  Use PWA -> web push notifications to update all databases as soon as they are online
 */
    //    "goNextPageAutomatic": true,
    // "showNavigationButtons": false,
var Survey = SurveyVue.Survey;
SurveyVue
    .StylesManager
    .applyTheme("modern");

// Survey.FunctionFactory
//     .Instance
//     .register("isClientSet", Vue.pro, true);

// async function isClientSet () {
//   let self = this;  // need the Vue context as well to be

//   //Survey.prototype.hasCompletedPage = true
//   // able to access vuex store/mutation after Vuex-action call
// }

export default {
  name: "app",
  components: {
    Survey,
    SummaryModal,
  },

  mounted() {
    //this.survey.data = this.fullSurvey();
    
    setupAnimation(this.survey, this.doAnimation);
  },

  methods: {
      ...mapActions([
        'GET_LAST_SURVEY_BY_ID', 'GET_LAST_SURVEY_BY_SLKDEETS',
        'UPDATE_SURVEY_DATASERVER', 'ADD_SURVEY_DATASERVER'
      ]),
      ...mapGetters(['fullSurvey']),

      onSwipeHorizontal: function(event) { swipeEvent(this.survey, event) ;},
      checkAssign: function (objectToAssign, errors, data) {
        for (let x in Object.keys(data)) {
             let sourceObj = data[x];
             if (!sourceObj || sourceObj[x]) {
                errors[x] = `Missing ${x}`;
                return -1;
             }
             objectToAssign[x] = sourceObj[x];
        }
        return 1;
      },
//THIS IS RUN EVERY TIME  IF TIED TO  model.onServerValidateQuestions?
      lookupClient: async function (survey, options) {
            //options.data contains the data for the current page.
            // if (! survey.isFirstPage){
            console.log("lookupClient: SURVEYons::::::", survey);
            console.log("options::::::", options);
            if (survey.currentPageNo != 1 ) {
           // if( survey.data.team_staff || // beyond page 2
            //    ((! survey.isFirstPage) && ! ('ClientLookupMethods' in survey.data)) ||
             //   (!survey.data['by_id'] && !survey.data['by_name'] ) ) {
              options.complete();
              return;
            }
        
            let err = '' , err_key = '', lookup_details = {}// , fn ='';
            if (survey.data['client_id']) {
              let client_id = survey.data['client_id'];
              let id_type = survey.data['id_type'];
              if (!client_id || !id_type) {
                options.errors["client_id"] = "Missing Client ID/ ID Type";
                options.complete();
                return;
              }
              //fn = this.GET_LAST_SURVEY_BY_ID; 
              lookup_details['fn'] =  this.GET_LAST_SURVEY_BY_ID;
              lookup_details['client_id'] =  client_id;
              lookup_details['id_type'] =  id_type;              
              err = `'${client_id}' with type: '${id_type}' was not found.`;
              err_key = 'client_id';
            } else {
              console.log(survey.data);
              let keysToAdd = ['first_name', 'last_name', 'sex', 'DOB'];
              let result = this.checkAssign(lookup_details, options.errors,
                  { 'first_name': survey.data.Name, 'last_name': survey.data.Name,
                    'sex' : survey.data, 'DOB': survey.data }
              );
              if (!result) {
                console.log(" ERRORRRRRRRRRRRRRRRRR ", options.errors);
              }
              lookup_details['fn'] = this.GET_LAST_SURVEY_BY_SLKDEETS;
              //fn = this.GET_LAST_SURVEY_BY_SLKDEETS;

              console.log(lookup_details);
              err = `'${lookup_details['first_name']}' ${lookup_details['last_name']} DOB: '${lookup_details['DOB']}' was not found.`;
              err_key = 'first_name';
            }
             // what if looking up by name etc.

            try {
              let id_type =  survey.data["id_type"];
              // delete survey.data['ClientLookupMethods'];
              console.log("CALLING ------ GET LAST SURVEY -0-------", lookup_details);
              let getAction = lookup_details['fn'];
              await getAction(lookup_details);
              //await this.GET_LAST_SURVEY_BY_ID(lookup_details);
              
              let res = this.fullSurvey();
              console.log("got full survey ", res);
              if (!res ) {             
                console.log(`Adding error ${err} to options [${err_key}]`) ;
                options.errors[err_key] = err;
              } 

              // else if client exists but no survey was ever done.

              else{ // partial survey 
                  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>RESSSSSSSSSSSSSSSSSS \n\n");
                  console.log( res);
                //if there was no survey retrieved mark it as new addition to client's list of surveys
                 this.survey['new_survey'] = true; // this will do a post rather than a PUT
                 survey['sendResultOnPageNext'] = true;
                 survey.showNavigationButtons = true;
                 survey.goNextPageAutomatic = false;
              }
              
              options.complete();
              // this.survey.data['clientDataReceived'] = true;
              //this.survey.nextPage();
            } 
            catch(err){
              options.errors["client_id"] = err;        
              console.error(" ERROR DURING GET LAST SURBEY" , err)
            }
      },

},

  data() {
    let dirtyData = false;
    let json = surveyQuestions;
    
    //json = setOfficialPDC(json);
    let me = this;
    var model = new SurveyVue.Model(surveyQuestions);

    model.onServerValidateQuestions.add(this.lookupClient);
    // model.onCurrentPageChanging.add((senderModel, options)=>{
    //          console.log("onCurrentPageChanging sender model", senderModel);
    //    console.log("onCurrentPageChanging optiosn", options);
    //   //  if (options.newCurrentPage.name == 'client_lookup_id' &&
    //   //     options.oldCurrentPage.name != 'LookupOptions') {
    //   //       // hit the back button and could potentially change
    //   //       console.log("ADDDDDDDDDDDDDD LOGGGICCCC..delete store data");
    //   //     }
    // })

    model.onComplete.add(function(survey, options) {
        console.log(JSON.stringify(survey.data));
    });
    //model.onFirstPageIsStartedChanged
    model.onValueChanged.add((senderModel, options) => {
       console.log("value was changed sender model", senderModel);
       console.log("value was changed optiosn", options);
      if (options.name === "ClientLookupMethods") { //me.survey.isFirstPage) { //
  
        console.log("going to skip saving because data has ClientLookupMethods", this.survey.data);
        //delete this.survey.data['ClientLookupMethods'];
        return;
      }
      // if restarting, survey, then clear store state
      // if ('client_lookup_id' == senderModel.currentPage.name) {
      //   console.log(JSON.stringify(me.survey.data));
      //   let temp = JSON.parse(JSON.stringify(me.survey.data))
      //   me.survey.data = {};
      //   if ('id_type' in temp){
      //       me.survey.data['id_type'] = temp['id_type']
      //   }
      //   if ('client_id' in temp){
      //       me.survey.data['client_id'] = temp['client_id']
      //   }
      //   if ('ClientLookupMethods' in temp){
      //       me.survey.data['client_id'] = temp['ClientLookupMethods']
      //   }
    
      // }
      me.survey.showNavigationButtons = true;
      me.survey.goNextPageAutomatic = false;
      
      me.dirtyData = true;
    });

/** onPartialSend
 * Restore answered questions for in-completed Survey
    Another common scenario, when you have a large survey and a user may not want to complete it during one session. 
    Again, the solution is to restore the answered question and additionally the current page. 
    If a survey is filled by login users, you may store the current answered results in your database. 
    However, in the most scenarios, using a browser local storage works great as well, since in the most cases a user will comeback by using the same browser.
    Below is the code that implements restoring answered questions and current page from local storage. 
    We are setting the survey.sendResultOnPageNext property to true. As result, survey.onPartialSend event will be fired, to make our life easier.
    */
    model.onPartialSend.add(function(model) {
      console.log("on partial send dirty ? " + me.dirtyData);
      if (me.dirtyData && 
        Object.keys(model.data).length > 5) { //there is something to store besides the client name, id ( wcih is already known)
        // if ('ClientLookupMethods' in model.data) {
        //   console.log("onPartial send MODEL  ...", model);
        //  // me.lookupClient(model, options);
        //   //delete model.data['ClientLookupMethods'];
        //   return;
        // } 
        if (model.hasOwnProperty('new_survey')) { // get back the Survey-ID so we can PUT to it in the following pages
          me.ADD_SURVEY_DATASERVER(model.data);
        } else {
          console.log(" GOING TO UPPPDATE EXISTING ");
          me.UPDATE_SURVEY_DATASERVER(model.data);
        }
        me.dirtyData = false;
        console.log(`updated >>>>>>>>survey Data ${Object.keys(model.data).length }`, model.data);
      }
    });

    return {      
      showModal: false,
      survey: model,
      doAnimation:false,
      dirtyData: false
    };
   }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
      // sendDataToTheServer: function (isComplete, data) {
      //   var text = isComplete ? "The survey is completed" : "The survey is not completed"; 
      //   console.log("going to send data to server", data)
      //   this.GET_CLIENT(data).then((dataRes) => {
      //       if (!dataRes) return;
      //       console.log("added message", dataRes);

      //       this.setPDC(dataRes)
      //       //pdcmthd.PDC choice = dataRes['episodes'][0]['PDC']
      //       // this.$emit('addedMessage')
      //       // _this.dialog = false
      //   })
      // },
            // setPDC: function(prefill_data) {
      //   let pdc = prefill_data['episodes'][0]['PDC']
      //   console.log("PDC: " + pdc)
      //   this.survey.setValue('pdcmthd', {'pdcdeets': {'PDC': pdc.toLowerCase()}})
      // }