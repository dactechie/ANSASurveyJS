import Vue from 'vue'

export default {

    ADD_answer : async function addanswer ({ commit }, answer) {

      const url = 'https://prod-15.australiaeast.logic.azure.com:443/workflows/a09cee31b2b94e7cbae8774036ab56f7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=V_cQvg8YZJJWWnWCxs-ok5_zSc9hVHtS5xL8NiuZQzk';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', //;charset=UTF-8',
          'token':'Bearer ' + "d97Fva8Fv4UyZALHo1bBsZE6V9vLBGVRLZ1Y0EmnWIjw8xWvZFmnb5VW-4Hy4Tixb2mL2NrkyG5SyUIQW7jrh8Qw12TMOfHC.3rum2iylsZHNI8q01oG9iPMwZuQMJEd",
        },
        body: answer
      };
      
      fetch(url, options)
        .then(response => {
          console.log(response.status);
          
        let result = response.json() ;//.answer
        console.log("going to commit ", result)
        commit('addanswer', result)
        });


      // try {
      //   //  Vue.axios.defaults.headers.common['Authorization'] =
      //   //                              'Bearer ' + localStorage.getItem('token');
      //   Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + "d97Fva8Fv4UyZALHo1bBsZE6V9vLBGVRLZ1Y0EmnWIjw8xWvZFmnb5VW-4Hy4Tixb2mL2NrkyG5SyUIQW7jrh8Qw12TMOfHC.3rum2iylsZHNI8q01oG9iPMwZuQMJEd";
    
      //   Vue.axios.defaults.headers.common.accept = 'application/json';
      //   //Vue.axios.defaults.headers.common['Content-Type']= 'application/json';
      //   const response = await Vue.axios.post('', answer)

      //   let result = response.data.answer
      //   console.log("going to commit ", result)
      //   commit('addanswer', result)
    

      // } catch(err){
      //   console.error(err)
      // }      
    },
  
    UPDATE_answer : async function editanswers ({ commit }, answer) {
        try {
            Vue.axios.defaults.headers.common['Authorization'] =
                                         'Bearer ' + localStorage.getItem('token');
            const response = await Vue.axios.put('/answrs/'+ answer.id, answer)
            console.log("update response", response)
    
        } catch(err){
            console.error(err)
      }
      commit('editanswer', answer )
    },
  
    LOAD_answers : async function getAnswers ({commit}) {
        try {
            Vue.axios.defaults.headers.common['Authorization'] =
                                       'Bearer ' + localStorage.getItem('token');
            const response = await Vue.axios.get('/answrs');
      
            commit('updateanswers', response.data.answers)

        } catch(err){
          console.error(err)
        }      
    },

    LOAD_answer : async function getAnswer ({commit}, answer_id) {
        try {
            Vue.axios.defaults.headers.common['Authorization'] =
                                       'Bearer ' + localStorage.getItem('token');
          
            const response = await Vue.axios.get('/answrs/'+answer_id);         

            commit('setContent', response.data.answer)
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