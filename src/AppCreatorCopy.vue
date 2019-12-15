<template>
  <div id="app">
    <survey-creator></survey-creator>
  </div>
</template>

<script>
import SurveyCreator from "./components/SurveyCreator";
import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";

// var Survey = SurveyVue.Survey;
// Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";
// import "inputmask/dist/inputmask/phone-codes/phone.js";
import { init as customWidget } from "./customwidget";

 widgets.jqueryuidatepicker(SurveyVue);

export default {
  name: "app",
  components: {
    //Survey,
   // RadioGroup,
    SurveyCreator
  },

  data() {
    SurveyCreator
    .StylesManager
    .applyTheme("bootstrap");
  //   let me = this;

  json = {};
     var model = new SurveyVue.Model(json);
  //   //model.onServerValidateQuestions
  //   // https://github.com/surveyjs/survey-library/issues/780 https://next.plnkr.co/edit/yU0BJA?p=preview&preview

  //   model.onComplete.add(function(survey, options) { me.sendDataToTheServer(true, survey.data);  });
  //   // model.onPartialSend.add(function(survey, options) {  sendDataToTheServer(false, survey.data); });

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
