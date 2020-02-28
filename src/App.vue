<template>
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

var Survey = SurveyVue.Survey;
SurveyVue
    .StylesManager
    .applyTheme("modern");

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
         // 'GET_CLIENT',
          'UPDATE_SURVEY_DATA',
      ]),
      ...mapGetters([
        'fullSurvey']),

      onSwipeHorizontal: function(event) { swipeEvent(this.survey, event) ;},
    
      // selectPage: function(page) {
      //   console.log('--------');
      //   this.survey.currentPageNo = page;
      //   var question = this.survey.getQuestionByName("pdc_and_usage");
      //   question.columns[0].choices = drugs['enum'];
      //   console.log(question);
      // },
      isClientExist: function(client_data) {
        console.log("isclientExist" + client_data)
        //this.GET_CLIENT(client_data)
        console.log(result)
        return true;
      },
      setPDC: function(prefill_data) {
        let pdc = prefill_data['episodes'][0]['PDC']
        console.log("PDC: " + pdc)
        this.survey.setValue('pdcmthd', {'pdcdeets': {'PDC': pdc.toLowerCase()}})
      },
      sendDataToTheServer: function (isComplete, data) {
        var text = isComplete ? "The survey is completed" : "The survey is not completed"; 
        console.log("going to send data to server", data)
        this.GET_CLIENT(data).then((dataRes) => {
            if (!dataRes) return;
            console.log("added message", dataRes);

            this.setPDC(dataRes)
            //pdcmthd.PDC choice = dataRes['episodes'][0]['PDC']
            // this.$emit('addedMessage')
            // _this.dialog = false
        })
      },
},

  data() {
    let dirtyData = false;
    let json = surveyQuestions;
    json['sendResultOnPageNext'] = true;
    //json = setOfficialPDC(json);
    let me = this;
    var model = new SurveyVue.Model(json);
    
    model.onComplete.add(function(survey, options) {
        console.log(JSON.stringify(survey.data));
    });
    //     SurveyVue
    // .FunctionFactory
    // .Instance
    // .register("isClientExist", me.isClientExist, true);
    // model.onCurrentPageChanging.add((model,options)=> {
    //   // update vuex state
    //   console.log(model);// VueSurveyModel {…}
    //   console.log(options); // {oldCurrentPage: PageModel, newCurrentPage: PageModel, allowChanging: true}
    //  // pages[""0""].questions[""0""].questionValue.r1.team
    //   //pagesValue[""0""].questions[""0""].surveyValue.data.question2.r1.team
   
    // });
   model.onValueChanged.add((senderModel, options) => {
     console.log("value was changed");
     me.dirtyData = true;
   });
  //  model.onCurrentPageChanging.add((model, options) => {
  //  });

    model.onPartialSend.add(function(model, options) {
      if  ( me.dirtyData ) {
          me.UPDATE_SURVEY_DATA(model.data);
          me.dirtyData = false;
          console.log("survey Data", model.data);
      }
      //  me.sendDataToTheServer(false, model.data);
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
