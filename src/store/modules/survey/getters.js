
const getters = {
  fullSurvey: (state) => {
   // console.log("getter " ,state.survey);
    return state.survey; //.survey.data
  },

  getSurveysForClientSLK: (state, slk) => {
     console.log("getter " ,state);      
     return state.survey[slk]; //.survey.data
   }
}

export default getters;
