<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- If you want to show survey, uncomment the line below -->
    <!-- <survey :survey="survey"></survey> -->
    
    <!-- If you want to hide Survey Creator, comment the line below -->
    <survey-creator></survey-creator>
  </div>
</template>

<script>
import SurveyCreator from "./components/SurveyCreator";
//import { mapActions } from 'vuex'
import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";

var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";
import "inputmask/dist/inputmask/phone-codes/phone.js";
//import RadioGroup from './components/RadioGroup';
import { init as customWidget } from "./customwidget";


//widgets.icheck(SurveyVue);
//widgets.select2(SurveyVue);
//widgets.inputmask(SurveyVue);
//widgets.jquerybarrating(SurveyVue);
 widgets.jqueryuidatepicker(SurveyVue);
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
    //Survey,
   // RadioGroup,
    SurveyCreator
  },
  // methods: {
  //     ...mapActions([
  //         'ADD_answer',
  //     ]),
  //     sendDataToTheServer: function (isComplete, data) {
  //        var text = isComplete ? "The survey is completed" : "The survey is not completed";
  //        // {"Quality":{"affordable":"1","does what it claims":"2","better then others":"3","easy to use":"4"},"satisfaction":"4","recommend friends":"3","suggestions":"sfasdf","pricelimit":{"mostamount":"asdfa","leastamount":"asdf"},"email":"ff"}
  //        // text + ", result: " +
  //        var result =  JSON.stringify(data);
  //           console.log(result)
  //           this.ADD_answer(result).then(() => {
  //               console.log("added message")
  //              // this.$emit('addedMessage')
  //              // _this.dialog = false                
  //           })
  //     // AJAX here 
  //     }
 
  // },
  data() {
    SurveyCreator
    .StylesManager
    .applyTheme("bootstrap");
  //   let me = this;

  //   var json = {
  //     title: "Product Feedback Survey Example",
  //     showProgressBar: "top",
  //     pages: [
  //       {
  //         questions: [
  //           {
  //             type: "matrix",
  //             name: "Quality",
  //             title:
  //               "Please indicate if you agree or disagree with the following statements",
  //             columns: [
  //               { value: 1,  text: "Strongly Disagree" },
  //               { value: 2,  text: "Disagree" },
  //               { value: 3,  text: "Neutral" },
  //               { value: 4,  text: "Agree" },
  //               { value: 5,  text: "Strongly Agree"
  //               }
  //             ],
  //             rows: [
  //               { value: "affordable",  text: "Product is affordable" },
  //               { value: "does what it claims",  text: "Product does what it claims" },
  //               { value: "better then others",  text: "Product is better than other products on the market" },
  //               { value: "easy to use",  text: "Product is easy to use"
  //               }
  //             ]
  //           },
  //           {
  //             type: "rating",
  //             name: "satisfaction",
  //             title: "How satisfied are you with the Product?",
  //             mininumRateDescription: "Not Satisfied",
  //             maximumRateDescription: "Completely satisfied"
  //           },
  //           {
  //             type: "rating",
  //             name: "recommend friends",
  //             visibleIf: "{satisfaction} > 3",
  //             title:
  //               "How likely are you to recommend the Product to a friend or co-worker?",
  //             mininumRateDescription: "Will not recommend",
  //             maximumRateDescription: "I will recommend"
  //           },
  //           {
  //             type: "comment",
  //             name: "suggestions",
  //             title: "What would make you more satisfied with the Product?"
  //           }
  //         ]
  //       },
  //       {
  //         questions: [
  //           {
  //             type: "radiogroup",
  //             name: "price to competitors",
  //             title: "Compared to our competitors, do you feel the Product is",
  //             choices: [
  //               "Less expensive",
  //               "Priced about the same",
  //               "More expensive",
  //               "Not sure"
  //             ]
  //           },
  //           {
  //             type: "radiogroup",
  //             name: "price",
  //             title: "Do you feel our current price is merited by our product?",
  //             choices: [
  //               "correct|Yes, the price is about right",
  //               "low|No, the price is too low for your product",
  //               "high|No, the price is too high for your product"
  //             ]
  //           },
  //           {
  //             type: "multipletext",
  //             name: "pricelimit",
  //             title: "What is the... ",
  //             items: [
  //               {
  //                 name: "mostamount",  title:
  //                   "Most amount you would every pay for a product like ours" },
  //               {
  //                 name: "leastamount",  title: "The least amount you would feel comfortable paying"
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         questions: [
  //           {
  //             type: "text",
  //             name: "email",
  //             title:
  //               'Thank you for taking our survey. Please enter your email address, then press the "Submit" button.'
  //           }
  //         ]
  //       }
  //     ]
  //   };
  json = {};
     var model = new SurveyVue.Model(json);
  //   //model.onServerValidateQuestions
  //   // https://github.com/surveyjs/survey-library/issues/780 https://next.plnkr.co/edit/yU0BJA?p=preview&preview
    
  //   // function sendDataToTheServer(isComplete, data) {
  //   //   var text = isComplete ? "The survey is completed" : "The survey is not completed";
  //   //   document.querySelector('#surveyResult').innerHTML = text + ", result: " + JSON.stringify(data);
  //   //   // AJAX here 
  //   // }
  //   model.onComplete.add(function(survey, options) {
  //       me.sendDataToTheServer(true, survey.data);
  //   });

  //   // model.onPartialSend.add(function(survey, options) {
  //   //     sendDataToTheServer(false, survey.data);
  //   // });

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
