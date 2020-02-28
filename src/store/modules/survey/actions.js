import Vue from 'vue'

export default {

    ADD_MESSAGE : async function addQuestion ({ commit }, question) {
      try {
        //  Vue.axios.defaults.headers.common['Authorization'] =
        //                              'Bearer ' + localStorage.getItem('token');
        const response = await Vue.axios.post('/messags', question)

        let result = response.data.question
        // console.log("going to commit ", result)
        commit('addQuestion', result)

      } catch(err){
        console.error(err)
      }      
    },
    
    // only update the new information ? 
   
    UPDATE_SURVEY_DATA: async function updateSurveyData ({ commit }, surveyData) {
      //   try {
      //        Vue.axios.defaults.headers.common['Authorization'] =
      //                                     'Bearer ' + localStorage.getItem('token');
      //       const response = await Vue.axios.put('/surveyData/'+ question.id, surveyData)
      //       console.log("update response", response)
    
      //   } catch(err){
      //       console.error(err)
      // }
      commit('updateSurveyData', surveyData )
    },  
    LOAD_MESSAGES : async function getQuestions ({commit}) {
        try {
            // Vue.axios.defaults.headers.common['Authorization'] =
            //                            'Bearer ' + localStorage.getItem('token');
            const response = await Vue.axios.get('/messags');
      
            commit('updateQuestions', response.data.questions)

        } catch(err){
          console.error(err)
        }      
    },

    LOAD_MESSAGE : async function getQuestion ({commit}, question_id) {
        try {
            // Vue.axios.defaults.headers.common['Authorization'] =
            //                            'Bearer ' + localStorage.getItem('token');
          
            const response = await Vue.axios.get('/messags/'+question_id);         

            commit('setContent', response.data.question)
        } catch(err){
          console.error(err)
        }      
    },

  //   LOAD_ALL_CONTENTS : async function getAllContents ({commit}, start_date, end_date) {
  //     try {
  //         Vue.axios.defaults.headers.common['Authorization'] =
  //                                    'Bearer ' + localStorage.getItem('token');
        
  //         const response = await Vue.axios.get('/contents/'+start_date+ '/'+ end_date);         

  //         commit('setFullContent', response.data.all_content)
  //     } catch(err){
  //       console.error(err)
  //     }      
  // }

  }