<template>
  <div id="app">
    <button id="show-modal" @click="showModal = true">Status/Overview</button>
     <SummaryModal v-if="showModal" @close="showModal = false" @navTo="selectPage">
  
      <h3 slot="header">Summary View</h3>
    </SummaryModal>
    
    <survey :survey="survey"></survey>

  </div>
</template>

<script>


import * as SurveyVue from "survey-vue";
import { mapActions } from 'vuex'
import surveyQuestions from  './questions.json';
import SummaryModal from './SummaryModal';
import drugs from './schema/drugs.json';

var Survey = SurveyVue.Survey;
SurveyVue
    .StylesManager
    .applyTheme("modern");

export default {
  name: "app",
  components: {
    Survey,
    SummaryModal,
   // RadioGroup,
    //
  },
  methods: {
      // ...mapActions([
      //     'ADD_answer',
      // ]),
      ...mapActions([
          'GET_CLIENT',
      ]),
      // mounted(){
      //     this.survey.pages[0].addNewQuestion("text", "newQuestion");
      //      let toEdit = window.survey.pages[0].getQuestionByName("newQuestion");		
      //     console.log("This question is going to be edited",toEdit)          
      //     toEdit.name = "Edited Name"
      //     toEdit.title = "Edited Title";                
      //     window.survey.pages[0].addElement(toEdit, (toEdit.no-1));
      // },

       selectPage: function( page) {        
        this.survey.currentPageNo = page;
        var question = this.survey.getQuestionByName("pdc_and_usage");
        question.columns[0].choices = drugs['enum'];
        console.log(question);
    },
      isClientExist: function(client_data) {
        console("isclientExist" + client_data)
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
      // AJAX here 
      },

},

  data() {
      
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

    model.onPartialSend.add(function(survey, options) {
        me.sendDataToTheServer(false, survey.data);
    });

    return {      
      showModal: false,      
      survey: model
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

