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
    this.survey.data = this.fullSurvey();
    setupAnimation(this.survey, this.doAnimation);
  },

  methods: {
      ...mapActions([
        'GET_LAST_SURVEY',
        'UPDATE_SURVEY_DATASERVER',
      ]),
      ...mapGetters(['fullSurvey']),

      onSwipeHorizontal: function(event) { swipeEvent(this.survey, event) ;},

//THIS IS RUN EVERY TIME  IF TIED TO  model.onServerValidateQuestions?
      lookupClient: async function (survey, options) {
            //options.data contains the data for the current page.
            // if (! survey.isFirstPage){
            console.log("SURVEYons::::::", survey);
            console.log("options::::::", options);
            if(! ('ClientLookupMethods' in survey.data ) ||
               ! ('client_id' in survey.data) ||
               survey.data.team_staff) {// only try to look up the client in 2nd page, otherwise return
              options.complete();
              return;
            }
            const client_id =  survey.data['client_id'];
            if (!client_id) {
              options.errors["client_id"] = "Missing Client ID";
              options.complete();
              return;
            }
            try {
              var id_type =  survey.data["id_type"];
              // delete survey.data['ClientLookupMethods'];
              console.log("CALLING ------ GET LAST SURVEY -0-------");
              await this.GET_LAST_SURVEY(client_id+ ","+ id_type);
              
              let res = this.fullSurvey();
              console.log("got full survey ", res);
              if (!res) {
                let err = `'${client_id}' with type: '${id_type}' was not found.`;
                options.errors["client_id"] = err;
        
              } 
              //else{
               //   survey.showNavigationButtons = true;
                //  survey.goNextPageAutomatic = false;
              //}
              
              options.complete();
              // this.survey.data['clientDataReceived'] = true;
              //this.survey.nextPage();
            } 
            catch(err){
              options.errors["client_id"] = err;        
              console.error(" ERROR DURING GET LAST SURBEY" , err)
            }
      },
      setPDC: function(prefill_data) {
        let pdc = prefill_data['episodes'][0]['PDC']
        console.log("PDC: " + pdc)
        this.survey.setValue('pdcmthd', {'pdcdeets': {'PDC': pdc.toLowerCase()}})
      }
},

  data() {
    let dirtyData = false;
    let json = surveyQuestions;
    json['sendResultOnPageNext'] = true;
    //json = setOfficialPDC(json);
    let me = this;
    var model = new SurveyVue.Model(json);

    model.onServerValidateQuestions.add(this.lookupClient);
    model.onCurrentPageChanging.add((senderModel, options)=>{
             console.log("onCurrentPageChanging sender model", senderModel);
       console.log("onCurrentPageChanging optiosn", options);
      //  if (options.newCurrentPage.name == 'client_lookup_id' &&
      //     options.oldCurrentPage.name != 'LookupOptions') {
      //       // hit the back button and could potentially change
      //       console.log("ADDDDDDDDDDDDDD LOGGGICCCC..delete store data");
      //     }
    })

    // model.onComplete.add(function(survey, options) {
    //     console.log(JSON.stringify(survey.data));
    // });
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

    model.onPartialSend.add(function(model) {
      if (me.dirtyData){
        // if ('ClientLookupMethods' in model.data) {
        //   console.log("onPartial send MODEL  ...", model);
        //  // me.lookupClient(model, options);
        //   //delete model.data['ClientLookupMethods'];
        //   return;
        // } 
        me.UPDATE_SURVEY_DATASERVER(model.data);
        me.dirtyData = false;
        console.log("updated >>>>>>>>survey Data", model.data);
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