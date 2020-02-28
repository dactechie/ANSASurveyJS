import Vue from 'vue'
export const STORAGE_KEY = 'survey-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const mutations = {
  addChoicesToQuestion(state, question, choiceSchema) {
    var question = state.survey.getQuestionByName(question);
    question.columns[0].choices = choiceSchema['enum'];
    //var question = state.survey.getQuestionByName("pdc_and_usage");
    //question.columns[0].choices = drugs['enum'];

  },
  
  addQuestion (state, question) {
      state.questions.unshift(question)
  },

  removeQuestion (state, question) {
    state.questions.splice(state.questions.indexOf(question), 1)
  },

  editQuestion (state,  question) {
    var index = state.questions.findIndex (m=> m.id === question.id);
    if (index !== -1) {
        state.questions[index] = question;
    }

  },
  updateSurveyData (state, surveyData) {
      console.log("state", state)
      console.log("survey", surveyData)
      
      Vue.set(state, 'survey', surveyData)
      //state.questions = questions
  },

  setContent(state, question) {
    let qIndex = state.questions.findIndex(m =>
        m.id === question.id
    )
    if(qIndex > -1) {
        state.questions[qIndex]['content'] = question.content
    }
    else
        console.error("did not find question with id ", question.id)
  },

  setFullContent(state, allContents) {
    // TODO: merge allContents with whats already in the store (may have pulled for other dates before)

    state.allContents = allContents

  }

}