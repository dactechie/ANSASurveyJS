
const getters = {
  fullSurvey: (state) => {
    console.log("getter " ,state.survey);
    return state.survey; //.survey.data
  }
}

export default getters;
