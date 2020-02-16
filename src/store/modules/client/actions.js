import Vue from 'vue'

export default {

    GET_CLIENT : async function getClient (state, client_details) {
        let deets = client_details['clientName'];
        if (!deets) return undefined;
        
        let client_identity = JSON.stringify(client_details['clientName']['Identity'])
        console.log("client_details ", client_identity);

      const url = 'http://localhost:7071/api/ANSAsurveyJSHttpTrigger';
      //'https://ansafuncs.azurewebsites.net/api/ANSAsurveyJSHttpTrigger'
      
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', //;charset=UTF-8',
          'token':'Bearer ' + "d97Fva8Fv4UyZALHo1bBsZE6V9vLBGVRLZ1Y0EmnWIjw8xWvZFmnb5VW-4Hy4Tixb2mL2NrkyG5SyUIQW7jrh8Qw12TMOfHC.3rum2iylsZHNI8q01oG9iPMwZuQMJEd",

        },
        body: client_identity
      };

      let response = await fetch(url , options)          
      let result = await response.json() ;
      console.log("done getting results:  ", result);
      return result;
        //return result
        //commit('addanswer', result)


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
    }
  }
