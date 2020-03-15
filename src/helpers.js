
function checkAssign(objectToAssign, errors, data) {
  for (let x in Object.keys(data)) {
        let sourceObj = data[x];
        if (!sourceObj || sourceObj[x]) {
          errors[x] = `Missing ${x}`;
          return -1;
        }
        objectToAssign[x] = sourceObj[x];
  }
  return 1;
}

function setupLookup(survey, getFunctions) {
  let lookup_details = {}// , fn ='';
  if (survey.data['client_id']) {
    let client_id = survey.data['client_id'];
    let id_type = survey.data['id_type'];
    if (!client_id || !id_type) {
      options.errors["client_id"] = "Missing Client ID/ ID Type";
      options.complete();
      return undefined;
    }
    //fn = this.GET_LAST_SURVEY_BY_ID; 
    lookup_details['fn'] =  getFunctions['by_id'];
    lookup_details['client_id'] =  client_id;
    lookup_details['id_type'] =  id_type;              
    lookup_details['err'] = `'${client_id}' with type: '${id_type}' was not found.`;
    lookup_details['err_key'] = 'client_id';
  } else {
      console.log(survey.data);
      let keysToAdd = ['first_name', 'last_name', 'sex', 'DOB'];
      let result = checkAssign(lookup_details, options.errors,
          { 'first_name': survey.data.Name, 'last_name': survey.data.Name,
            'sex' : survey.data, 'DOB': survey.data }
      );
      if (!result) {
        console.log(" ERRORRRRRRRRRRRRRRRRR ", options.errors);
      }
      lookup_details['fn'] = getFunctions['by_name'];
      //fn = this.GET_LAST_SURVEY_BY_SLKDEETS;

      console.log(lookup_details);
      lookup_details['err'] = `'${lookup_details['first_name']}' ${lookup_details['last_name']} DOB: '${lookup_details['DOB']}' was not found.`;
      lookup_details['err_key'] = 'first_name';
  }

  return lookup_details
}
export default setupLookup;