
import httpLib from './api';
import {getMeta, buildURL} from './utils';
//import { addUpdate } from '../utils/db/TableStoreService';
import {getByID, addUpdate} from '@/utils/db/TableStoreService';


export default {

  // getIncompleteSurveyData (client_id, id_type='SLK')  {
  //   console.log(`get partial survey for client ${client_id}`);
  //   return myAxios.get(
  //     `${myAxios.defaults.baseURL}?request_type=get_partial_ia&client_id=${client_id}&id_type=${id_type}`);
  //   // return myAxios.get(`/survey_answers/${clientId}`);
  // },
  async getLastSurveyData(client_lookup)  {
    let episodeData ={}
    if (client_lookup['IDType'] !== 'SLK') {
      episodeData = await getByID(client_lookup['ClientID'], client_lookup['IDType'],'Episode');
    }
    //console.log(getClientAssessments)
    episodeData = await getByID(client_lookup['ClientID'], 'PartitionKey','Episode');//optimized ?
    if (! episodeData) {
      //look for client details in MDS table.
      // if can't find client there too, FAIL 
      console.log("No episode data for client ", client_lookup);
    }
    // let timestamp =  episodeData[undefined]
    delete episodeData['undefined'];
    // console.log("old timestamp ", timestamp);

    return episodeData;
  },

  //   // },
  // getLastSurveyDataBySLKDeets (fname, lname, sex, DOB)  {
  //   console.log(`get last (possibly partial) survey for client ${fname}`);
  //   let params = {Firstname: fname, Surname: lname, Sex: sex, DOB: DOB};
  //   const url = buildURL(myAxios.defaults.baseURL,'get_client_records', params);
  //   return myAxios.get(url);
  //   // return myAxios.get(`/survey_answers/${clientId}`);
  // },

  savePartialSurvey (surveyData)  {
    addUpdate(surveyData, 'Episode')
  },

  savePartialSurvey2 (surveyData)  {
    console.log('save partial', surveyData);
    if (!( 'client_id'  in surveyData)){
      console.info("SurveyService: client id not in data");
      return undefined;
    }
    surveyData['meta']['last_captured'] = new Date();
    
    console.log("savePartialSurvey survey data -------", surveyData);
    const url = buildURL(httpLib.defaults.baseURL,
                      'put_partial_ia');//, {_id:surveyData['_id']});
    return httpLib.put(url, surveyData);
    //return myAxios.put(`/partial/${clientId}`, surveyData);
  },

  addPartialSurvey (surveyData)  {
    console.log('ADD New partial', surveyData);
    if (!( 'client_id'  in surveyData)){
      console.info("SurveyService: client id not in data");
      return undefined;
    }
    
    surveyData['meta'] = getMeta(surveyData, {"last_captured": new Date()});

    console.log("add  survey data ------------------");
    console.log(surveyData);

    const url = buildURL(httpLib.defaults.baseURL,'post_partial_ia');
    return httpLib.post(url,surveyData);
    //return myAxios.put(`/partial/${clientId}`, surveyData);
  }

} 
