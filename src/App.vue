<template>
  <div>
  <div id="app" v-hammer:swipe.horizontal="onSwipeHorizontal">
    
    <transition name="fade">
     <SummaryModal v-if="showModal" @close="showModal = false" > 
  
      <h3 slot="header">Summary View</h3>
    </SummaryModal>
    </transition>
    <sui-menu pointing>
      <a
        is="sui-menu-item"
        v-for="item in items"
        :active="isActive(item)"
        :key="item"
        :content="item"
        @click="select(item)"
      />
      <sui-menu-menu position="right">
        <sui-menu-item>
            <button id="show-modal" @click="showModal = true">Status/Overview</button>
        </sui-menu-item>
        <sui-menu-item>
          <sui-input transparent icon="search" placeholder="Search..." />
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <sui-segment>
      <survey :survey="survey"></survey>
    </sui-segment>

  </div>
</div>

</template>
<script>
import * as SurveyVue from "survey-vue";
import { mapActions, mapGetters, mapState } from 'vuex'
import surveyQuestions from  './questions.json';
import SummaryModal from './SummaryModal';
import drugs from './schema/drugs.json';  // TODO incorporate this into the dropdowns
import swipeEvent from './swipe.js';
import setupAnimation from './transition.js';
import setupLookup from './helpers.js';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import {generateSummaryHTML, isValidLookupIds} from '@/common/utils.js';

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

SurveyVue
    .FunctionFactory
    .Instance
    .register("isValidLookupIds", isValidLookupIds);


// SurveyVue.FunctionFactory
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

  created() {
    
    sessionStorage.clear();
    this.survey.showNavigationButtons = false;
    this.survey.goNextPageAutomatic = true;
    this.survey.onServerValidateQuestions.add(this.lookupClient);

    this.survey.onComplete.add(function(survey, options) {
        console.log(JSON.stringify(survey.data));
    });


    let me = this;
    
    this.survey.onValueChanged.add((senderModel, options) => {
      me.dirtyData = true;
      console.log("page value changed", options)
      // if (Object.keys(me.survey.data).length > 5) { //there is something to store besides the client name, id ( wcih is already known)
      //   me.survey.sendResultOnPageNext = true;
      // }
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
    this.survey.onPartialSend.add(function(model) {
      
      console.log("on partial send dirty ? " + me.dirtyData);
      if (Object.keys(model.data).length > 5) {  // WARNNNNNNNNNNNNNNNNING  WARNING .. only do if last page or if the save + exit button was hit
        if (me.dirtyData) { //there is something to store besides the client name, id ( wcih is already known)
            // may be new client too.. on some occassions.
            // NEW SURVEY SAVE NOT IMPLEMTNEED YET 
            console.log('Dirty model', model.data);    
            if (me.isNewSurvey) { // get back the Survey-ID so we can PUT to it in the following pages
              console.log("\n\t >>>>>>>>>>>>>Going to add new survey >>>>>>>>>>>>>>>>>>>>>");

              me.ADD_SURVEY_DATASERVER(model.data);
              console.log("\n\t >>>>>>>>>>>>>ADDED NEW . check me.currentSurvey>>>>>>>>>>>>>>>>>>>>>", me.currentSurvey);
              if (me.currentSurvey) {
                me.isNewSurvey = false;
              }
  
            } else {
                console.log(" GOING TO UPPPDATE EXISTING ", model.data);
                delete model.data['_id'];
                me.ADD_SURVEY_DATASERVER(model.data);
                me.isNewSurvey = false;
                //me.UPDATE_SURVEY_DATASERVER(model.data);
            }
            me.dirtyData = false;
        }
        console.log(`updated >>>>>>>>survey Data ${Object.keys(model.data).length } \t  `, model.data);        
        console.log (`Current page ${model.currentPageNo}  . page count ${model.pageCount}`);

        if (model.currentPageNo === (model.pageCount - 3)) {
        
          let page = model.getPage(model.currentPageNo + 2);
          page.elements[0].html = generateSummaryHTML(model.data); 
        }
      }

    });

  },
  mounted() {
    //this.survey.data = this.fullSurvey();
  
    setupAnimation(this.survey, this.doAnimation);


  },
  computed : {
        currentSurvey: () =>{
          return JSON.parse(sessionStorage.getItem('CurrentSurvey'));
        }
  },
  methods: {
      ...mapActions([
        'GET_LAST_SURVEYS_FOR_CLIENT',
        'UPDATE_SURVEY_DATASERVER', 'ADD_SURVEY_DATASERVER'
      ]),
      ...mapGetters(['fullSurvey', 'getSurveysForCurrentClient']),
      isActive(name) {
        return this.active === name;
      },
      select(name) {
        this.active = name;
      },
      onSwipeHorizontal: function(event) { swipeEvent(this.survey, event) ;},

      lookupClient: async function (survey, options) {
            //options.data contains the data for the current page.
            if (survey.currentPageNo != 1 ) {
              options.complete();
              return;
            }
            
            let lkpdeets = setupLookup(survey);
            if (!lkpdeets){
                options.errors['DB_ID'] = "Could not setup lookiu";
                options.complete();
                return;         
            }
  
            try {      
              // delete survey.data['ClientLookupMethods'];
              console.log("CALLING ------ GET LAST SURVEY -0-------", lkpdeets);
              await this.GET_LAST_SURVEYS_FOR_CLIENT(lkpdeets) // side effect - sets the  local and session storage
              
              delete survey.data['ClientLookupMethods'];
              this.survey.onServerValidateQuestions.remove(this.lookupClient);

              if ( this.currentSurvey) { // do the prefill
                survey.data = this.currentSurvey;
                console.log("lookupClient: current survet data ", survey.data);
              } else {
                 this.isNewSurvey = true;
              }
               
               this.survey.showNavigationButtons = true;
               this.survey.goNextPageAutomatic = false;
              
              //                               // WARNING .. does persisted state write this to localstorage and override the list of all surveys with this one survey ? 
              // survey.data = clientSurveys[0] ; // WARNING .. does persisted state write this to localstorage and override the list of all surveys with this one survey ? 

              //    survey['sendResultOnPageNext'] = true;
              // }            
              options.complete();
              //this.survey.nextPage();
            } 
            catch(err){
              options.errors["client_id"] = err;        
              console.error(" ERROR DURING GET LAST SURBEY" , err)
            }
      },

},
/***
 * *  LOADING DATA INTO SURVEY ---------------------------
 * *  LOADING DATA INTO SURVEY ---------------------------
 * *  LOADING DATA INTO SURVEY ---------------------------*  LOADING DATA INTO SURVEY ---------------------------*  LOADING DATA INTO SURVEY ---------------------------
 *  LOADING DATA INTO SURVEY ---------------------------
 * 
 * *    <<<<<<<<<<<<<<<<<<<<*    <<<<<<<<<<<<<<<<<<<<*    <<<<<<<<<<<<<<<<<<<<
 *    <<<<<<<<<<<<<<<<<<<<*    <<<<<<<<<<<<<<<<<<<<*    <<<<<<<<<<<<<<<<<<<<   * https://surveyjs.io/Examples/Library/?id=survey-data&platform=jQuery&theme=modern
 *    <<<<<<<<<<<<<<<<<<<<*    <<<<<<<<<<<<<<<<<<<<*    <<<<<<<<<<<<<<<<<<<<*    <<<<<<<<<<<<<<<<<<<<*    <<<<<<<<<<<<<<<<<<<<
 *        *  LOADING DATA INTO SURVEY ---------------------------*  LOADING DATA INTO SURVEY ---------------------------*  LOADING DATA INTO SURVEY ---------------------------
 */

  data() {
   return {
      active: 'Home',
      items: ['Home', 'Messages', 'Friends'],
      showModal: false,
      survey: new SurveyVue.Model(surveyQuestions),
      doAnimation:false,
      dirtyData: false,
      isNewSurvey: false
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

.fade-enter {
  opacity: 0;

}

.fade-enter-active,  .fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
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



  //onValueChanged.add : 
             //console.log("value was changed sender model", senderModel);
            //console.log("value was changed optiosn", options);

            // if (options.name === "ClientLookupMethods") { //me.survey.isFirstPage) { //
        
            //   console.log("going to skip saving because data has ClientLookupMethods", this.survey.data);
            //   //delete this.survey.data['ClientLookupMethods'];
            //   return;
            // }
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
                  // currentSurvey = JSON.parse(sessionStorage.getItem('CurrentSurvey'))
            // // only if we are in session and somthing changed, is there somethign to send to the server
            // if (me.survey.data['SLK'] === sessionStorage.getItem('CurrentClientLookupID') ||
            //     me.survey.data['DB_ID'] === sessionStorage.getItem('CurrentSurvey')
            //       ) {
            //     me.survey.sendResultOnPageNext = true;  
            // }