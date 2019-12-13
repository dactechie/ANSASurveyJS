import Vue from 'vue'
export const STORAGE_KEY = 'questions-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const mutations = {
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
  updateQuestions (state, questions) {
      console.log("state", state)
      console.log("questions", questions)
      Vue.set(state, 'questions', questions)
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