
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

function setupLookup(survey){ //}, getFunctions) {
  let lookup_details = {}// , fn ='';
  if (survey.data['DB_ID']) {
    let client_id = survey.data['DB_ID'];
    let id_type = survey.data['DB_ID_TYPE'];
    if (!client_id || !id_type) {
      options.errors["DB_ID"] = "Missing Client ID/ ID Type";
      options.complete();
      return undefined;
    }
    //fn = this.GET_LAST_SURVEY_BY_ID; 
   // lookup_details['fn'] =  getFunctions['by_id'];
    lookup_details['DB_ID'] =  client_id;
    lookup_details['DB_ID_TYPE'] =  id_type;              
  //  lookup_details['err'] = `'${client_id}' with type: '${id_type}' was not found.`;
   // lookup_details['err_key'] = 'DB_ID';
    
//    lookup_details['local_lookup_id'] = {client_id, id_type};
  } else {
      console.log(survey.data);
      //let keysToAdd = ['first_name', 'last_name', 'sex', 'DOB'];
      let result = checkAssign(lookup_details, options.errors,
        //{Firstname: fname, Surname: lname, Sex: sex, DOB: DOB};  keys from the cosmos backen d
          { 'Firstname': survey.data.first_name, 'Surname': survey.data.last_name,
            'Sex' : survey.data.sex, 'DOB': survey.data.DOB }
      );
      if (!result) {
        console.log(" ERRORRRRRRRRRRRRRRRRR ", options.errors);
      }
     // lookup_details['fn'] = getFunctions['by_name'];
      //fn = this.GET_LAST_SURVEY_BY_SLKDEETS;

      console.log(lookup_details);
    //  lookup_details['err'] = `'${lookup_details['Firstname']}' ${lookup_details['Surname']} DOB: '${lookup_details['DOB']}' was not found.`;
   //   lookup_details['err_key'] = 'Firstname';

     // lookup_details['local_lookup_id'] = 'JALALAF210719811';// TODO: calculate SLK
  }

  return lookup_details
}
export default setupLookup;