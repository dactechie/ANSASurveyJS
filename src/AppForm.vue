<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- If you want to show survey, uncomment the line below -->
    <survey :survey="survey"></survey>
    
    <!-- If you want to hide Survey Creator, comment the line below -->
    <!-- <survey-creator></survey-creator> -->
  </div>
</template>

<script>
//import SurveyCreator from "./components/SurveyCreator";
//import { mapActions } from 'vuex'
import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";

var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

//import * as widgets from "surveyjs-widgets";
//import "inputmask/dist/inputmask/phone-codes/phone.js";
//import RadioGroup from './components/RadioGroup';
//import { init as customWidget } from "./customwidget";
import * as  surveyQuestions from  './questions';

//widgets.icheck(SurveyVue);
//widgets.select2(SurveyVue);
//widgets.inputmask(SurveyVue);
//widgets.jquerybarrating(SurveyVue);
 //widgets.jqueryuidatepicker(SurveyVue);
// widgets.nouislider(SurveyVue);
// widgets.select2tagbox(SurveyVue);
// widgets.signaturepad(SurveyVue);
// widgets.sortablejs(SurveyVue);
// widgets.ckeditor(SurveyVue);
// widgets.autocomplete(SurveyVue);
// widgets.bootstrapslider(SurveyVue);
// customWidget(SurveyVue);

export default {
  name: "app",
  components: {
    Survey,
   // RadioGroup,
    //
  },
  methods: {
      // ...mapActions([
      //     'ADD_answer',
      // ]),
      sendDataToTheServer: function (isComplete, data) {
         var text = isComplete ? "The survey is completed" : "The survey is not completed";
         // {"Quality":{"affordable":"1","does what it claims":"2","better then others":"3","easy to use":"4"},"satisfaction":"4","recommend friends":"3","suggestions":"sfasdf","pricelimit":{"mostamount":"asdfa","leastamount":"asdf"},"email":"ff"}
         // text + ", result: " +
         var result =  JSON.stringify(data);
            console.log(result)
            this.ADD_answer(result).then(() => {
                console.log("added message")
               // this.$emit('addedMessage')
               // _this.dialog = false                
            })
      // AJAX here 
      }
 
  },
  data() {
    // SurveyCreator
    // .StylesManager
    // .applyTheme("bootstrap");
     let me = this;

    var json = surveyQuestions.default ; //{  };

     var model = new SurveyVue.Model(json);
    //model.onServerValidateQuestions
    // https://github.com/surveyjs/survey-library/issues/780 https://next.plnkr.co/edit/yU0BJA?p=preview&preview
    
    // function sendDataToTheServer(isComplete, data) {
    //   var text = isComplete ? "The survey is completed" : "The survey is not completed";
    //   document.querySelector('#surveyResult').innerHTML = text + ", result: " + JSON.stringify(data);
    //   // AJAX here 
    // }
    model.onComplete.add(function(survey, options) {
        console.log(JSON.stringify(survey.data));
        
        // "{"clientName":{"Identity":{"Firstname":"Aftab","Surname":"MJ","Gender":"m"}},"question2":{"r1":{"team":"tss","staff":"9"}},
        // "pdcmthd":{"pdcdeets":{"pdc":1,"method":"ingests","pdc_ndays":20}},"other_drugs":[{"odc":2,"odc_mthd":3,"odc_ndays":4}],
        // "aod_history":[{"agefirstused":"age11","methd":"ingest","Units":"std_drinks","frequency":"irregular","qtyperday":72},
        // {"agefirstused":"age13","methd":"smoke","Units":"joints","frequency":"weekly","qtyperday":28}],
        // "addctv":{"sex":{"ndays":0},"internet":{"ndays":26}},"aod_harms_risks":["morethanonedrug","other","memloss"],"aod_harms_risks-Comment":"Other notes","impctdaily":"1"}"
        //me.sendDataToTheServer(true, survey.data);
    });

    // model.onPartialSend.add(function(survey, options) {
    //     sendDataToTheServer(false, survey.data);
    // });

    return {
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
