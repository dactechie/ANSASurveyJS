
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

function setupLookup(survey) {
  let lookup_details = {};
  if (survey.data['DB_ID']) {
    let client_id = survey.data['DB_ID'];
    let id_type = survey.data['DB_ID_TYPE'];
    if (!client_id || !id_type) {
      return undefined;
    }
    lookup_details['DB_ID'] =  client_id;
    lookup_details['DB_ID_TYPE'] =  id_type;
  } else {
      console.log(survey.data);      
      let result = checkAssign(lookup_details, options.errors,      
                                { 'Firstname': survey.data.first_name, 
                                  'Surname': survey.data.last_name,
                                  'Sex' : survey.data.sex, 
                                  'DOB': survey.data.DOB 
                                });
      if (result !== 1)
        console.log(" ERRORRRRRRRRRRRRRRRRR ");      
      console.log(`Lookup Details ${JSON.stringify(lookup_details)}`);
  }
  return lookup_details;
}

export default setupLookup;