
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
function calculateSLK(client_data) {
  let f = client_data['Firstname'].replace(/([^a-z\-]+)/gi, '');
      s = client_data['Surname'].replace(/([^a-z\-]+)/gi, '');
      d = client_data['DOB'].replace(/-/g, '');
      x = client_data['Sex'];
  
  f = f.toUpperCase().padEnd(2 - f.length, '9')
  s = s.toUpperCase().padEnd(5 - f.length, '9')
  let name_part = `${s[1]}${s[2]}${s[4]}${f[1]}${f[2]}`

  switch (x){
      case 'male':
          x = 1; break;
      case 'female':
          x = 2; break;
      default:
          x = 9;
  }
  return name_part + d + x;
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
      else
          lookup_details['SLK'] = calculateSLK(lookup_details);

      console.log(`Lookup Details ${JSON.stringify(lookup_details)}`);
  }
  return lookup_details;
}

export default setupLookup;