import Vue from 'vue'

export default {

    GET_CLIENT : async function getClient (state, client_details) {
        console.log("state ", state);
        console.log("client_details ", client_details['clientName']['Identity']);
      const url = 'https://ansafuncs.azurewebsites.net/api/ANSAsurveyJSHttpTrigger'
      //'https://prod-08.australiasoutheast.logic.azure.com:443/workflows/a90cb3063c4f4b3ebae709276c46573d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=U5brtC7IZa8cSKVIOBM4Zzs28x6UDB8atUmA14eWULI';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', //;charset=UTF-8',
          'token':'Bearer ' + "d97Fva8Fv4UyZALHo1bBsZE6V9vLBGVRLZ1Y0EmnWIjw8xWvZFmnb5VW-4Hy4Tixb2mL2NrkyG5SyUIQW7jrh8Qw12TMOfHC.3rum2iylsZHNI8q01oG9iPMwZuQMJEd",

        },
        body:JSON.stringify(client_details['clientName']['Identity'])
      };
      //client_details
      let response = await fetch(url , options)
        // .then(response => {
        //   console.log(response.status);

      let result = await response.json() ;//.answer
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
