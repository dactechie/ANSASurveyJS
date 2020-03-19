
const getters = {
  fullSurvey: (state) => {
   // console.log("getter " ,state.survey);
    return state.survey; //.survey.data
  },

  getSurveysForClientSLK: (state, slk) => {
     console.log("getter " ,state);      
     return state.survey[slk]; //.survey.data
   },
   getSurveysForCurrentClient: (state) =>{
      let currentClient = sessionStorage.getItem('CurrentClientLookupID');

      if (!currentClient || 
          ! Object.keys(state.survey).includes(currentClient['SLK'])) {

            console.warn(`cleint not in localstore`);
            return undefined;
      }

      return state.survey[currentClient['SLK']]; // this first in the list of surveys . TODO .. get the last (most recent one!)
   }
}

export default getters;
