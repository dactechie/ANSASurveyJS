<template>
  <div id="app">

    <survey :survey="survey"></survey>

  </div>
</template>

<script>


import * as SurveyVue from "survey-vue";
//import * as widgets from "surveyjs-widgets";
import { mapActions } from 'vuex'
import * as  surveyQuestions from  './questions';

var Survey = SurveyVue.Survey;
 //Survey.cssType = "modern";
SurveyVue
    .StylesManager
    .applyTheme("modern");


//import * as widgets from "surveyjs-widgets";
//import "inputmask/dist/inputmask/phone-codes/phone.js";
//import RadioGroup from './components/RadioGroup';
//import { init as customWidget } from "./customwidget";


// widgets.icheck(SurveyVue); widgets.select2(SurveyVue); widgets.inputmask(SurveyVue);widgets.jquerybarrating(SurveyVue);
//widgets.jqueryuidatepicker(SurveyVue);
//widgets.nouislider(SurveyVue);widgets.select2tagbox(SurveyVue);
// widgets.signaturepad(SurveyVue); widgets.sortablejs(SurveyVue); widgets.ckeditor(SurveyVue);
// widgets.autocomplete(SurveyVue);

//customWidget(SurveyVue);

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
      ...mapActions([
          'GET_CLIENT',
      ]),
      isClientExist: function(client_data) {
        this.GET_CLIENT(client_data)
        console.log(result)
        return true;
      },
    
      sendDataToTheServer: function (isComplete, data) {
         var text = isComplete ? "The survey is completed" : "The survey is not completed";
         // {"Quality":{"affordable":"1","does what it claims":"2","better then others":"3","easy to use":"4"},"satisfaction":"4","recommend friends":"3","suggestions":"sfasdf","pricelimit":{"mostamount":"asdfa","leastamount":"asdf"},"email":"ff"}
         // text + ", result: " +
         //var result =  JSON.stringify(data);
         
            console.log("going to send data to server", data)
            this.GET_CLIENT(data).then((dataRes) => {
                console.log("added message", dataRes)
               // this.$emit('addedMessage')
               // _this.dialog = false 
            })
      // AJAX here 
      }
 
  },
  mounted(){


  },
  data() {
      
    let json = surveyQuestions.default ; //{  };

    json['sendResultOnPageNext'] = true;
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
<!--
  // "{"clientName":{"Identity":{"Firstname":"Aftab","Surname":"MJ","Gender":"m"}},"question2":{"r1":{"team":"tss","staff":"9"}},
        // "pdcmthd":{"pdcdeets":{"pdc":1,"method":"ingests","pdc_ndays":20}},"other_drugs":[{"odc":2,"odc_mthd":3,"odc_ndays":4}],
        // "aod_history":[{"agefirstused":"age11","methd":"ingest","Units":"std_drinks","frequency":"irregular","qtyperday":72},
        // {"agefirstused":"age13","methd":"smoke","Units":"joints","frequency":"weekly","qtyperday":28}],
        // "addctv":{"sex":{"ndays":0},"internet":{"ndays":26}},"aod_harms_risks":["morethanonedrug","other","memloss"],"aod_harms_risks-Comment":"Other notes","impctdaily":"1"}"
        //me.sendDataToTheServer(true, survey.data);
    //model.onServerValidateQuestions
    // https://github.com/surveyjs/survey-library/issues/780 https://next.plnkr.co/edit/yU0BJA?p=preview&preview
    
    // function sendDataToTheServer(isComplete, data) {
    //   var text = isComplete ? "The survey is completed" : "The survey is not completed";
    //   document.querySelector('#surveyResult').innerHTML = text + ", result: " + JSON.stringify(data);
    //   // AJAX here 
    // }

 
    -->