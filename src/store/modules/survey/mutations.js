import Vue from 'vue'
// export const STORAGE_KEY = 'survey-vuejs'

// // for testing
// if (navigator.userAgent.indexOf('PhantomJS') > -1) {
//   window.localStorage.clear()
// }

export const mutations = {
  addChoicesToQuestion(state, question, choiceSchema) {
    var question = state.survey.getQuestionByName(question);
    question.columns[0].choices = choiceSchema['enum'];
    //var question = state.survey.getQuestionByName("pdc_and_usage");
    //question.columns[0].choices = drugs['enum'];

  },

  updateSurveyData (state, surveyData) {
      // console.log("state", state)
      console.log("updateSurveyData::", surveyData)
      if (surveyData === undefined) {
        Object.assign(state, undefined);
      }
      else
        Vue.set(state, 'survey', surveyData);
      //state.survey = surveyData
  }

}