import Vue from 'vue'
export const STORAGE_KEY = 'answers-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const mutations = {
  addanswer (state, answer) {
      state.answers.unshift(answer)
  },

  removeanswer (state, answer) {
    state.answers.splice(state.answers.indexOf(answer), 1)
  },

  editanswer (state,  answer) {
    var index = state.answers.findIndex (m=> m.id === answer.id);
    if (index !== -1) {
        state.answers[index] = answer;
    }

  },
  updateanswers (state, answers) {
      console.log("state", state)
      console.log("answers", answers)
      Vue.set(state, 'answers', answers)
      //state.answers = answers
  },

  setContent(state, answer) {
    let mesgIndex = state.answers.findIndex(m =>
        m.id === answer.id
    )
    if(mesgIndex > -1) {
        state.answers[mesgIndex]['content'] = answer.content
    }
    else
        console.error("did not find answer with id ", answer.id)
  },

  setFullContent(state, allContents) {
    // TODO: merge allContents with whats already in the store (may have pulled for other dates before)

    state.allContents = allContents

  }

}