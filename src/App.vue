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
//assign call to onServerValidateQuestions callback
/*  function lookupClient(survey, options) {
    //options.data contains the data for the current page.
    var client_id = options.data["client_id"];
    //If the question is empty then do nothing
    console.log("optiopns: ", options);
    if (!client_id) 
      options.complete();
   let response =''
      try {
        // client_id_data = client_id_data +"";
        // const comma_pos = client_id_data.search(",");
        // const id = client_id_data.substring(0,comma_pos);
        // const id_type = client_id_data.substring(comma_pos+1);
        var id_type =  options.data["id_type"];
        response =  SurveyService.getLastSurveyData(client_id, id_type).then(res =>{
          console.log("resssssss", res);
          if (res === undefined || res['data'] === "") {
                console.log("adding an error xxxxxxxx");
              options.errors["client_id"] = "The client id'" + client_id + "' is not found";
            } else{
              options['data'] = res['data']
            }
           options.complete();
        });

         console.log("getLastSurvey response", response.data);
        } catch(err){
          options.errors["client_id"] = "The cexcelpton..............";        
          console.error(err)
      }
            //tell survey that we are done with the server validation
      //options.complete();
     
}*/

var Survey = SurveyVue.Survey;
SurveyVue
    .StylesManager
    .applyTheme("modern");


// SurveyVue
//     .FunctionFactory
//     .Instance
//     .register("lookupClient", lookupClient, true);

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
         'GET_LAST_SURVEY',
          'UPDATE_SURVEY_DATA',
      ]),
      ...mapGetters(['fullSurvey']),

      onSwipeHorizontal: function(event) { swipeEvent(this.survey, event) ;},
    
      lookupClient:   async function (survey, options) {
            //options.data contains the data for the current page.
            var client_id = options.data["client_id"];
            //If the question is empty then do nothing
            console.log("optiopns: ", options);
            if (!client_id) 
              options.complete();
          let response =''
              try {
                var id_type =  options.data["id_type"];
                response = await this.GET_LAST_SURVEY(client_id+ ","+ id_type);
                  let res = this.fullSurvey();
                  console.log("resssssss", res);
                  if (!res) {
                     console.log("adding an error xxxxxxxx");
                      options.errors["client_id"] = "The client id'" + client_id + "' is not found";
                    } 
                  options.complete();
                } catch(err){
                  options.errors["client_id"] = "The cexcelpton..............";        
                  console.error(err)
              }
            
        },
      // lookupClient: async function(client_id_data) {
    
      //   await this.GET_LAST_SURVEY(client_id_data);

      //   let ress = this.fullSurvey();
      //   console.log("::::::::::", ress);
      //   if (!ress){
      //     console.log("returning FALSESSSSSSSSSSSSSE")
      //     return false;
      //   } 
      //   console.log("returning True")
      //   return true;
      // },
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
    model
    .onServerValidateQuestions
    .add(this.lookupClient);
    model.onComplete.add(function(survey, options) {
        console.log(JSON.stringify(survey.data));
    });
   
    
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
