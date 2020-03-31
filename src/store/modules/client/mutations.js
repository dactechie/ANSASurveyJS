//import { addOrReplace } from '@/common/utils';

export const mutations = {

  updateCurrentClient(state, {client}) {
       
        //state['client'] = [] 
        let slk = client['SLK'] ;
        //addOrReplace(state['client'], slk, thisclient)
        // if (Object.keys(state['client']).includes(slk)){
        //   //ignore ?
        //   // there could be updates to this ?
        // } else{
          state['client'][slk] = client;// {'DB_ID' : client['DB_ID'], 'DB_ID_TYPE': client['DB_ID_TYPE']}
        //}
        
        sessionStorage.setItem('CurrentClientLookupID',slk);
  },

  updateClientStateFromBackendData(state, serverResponseData) {
    const backendClientData = serverResponseData.client;
    
    let clientSLK = backendClientData['SLK'];
    sessionStorage.setItem('CurrentClientLookupID', clientSLK);
    
    console.log(`updateClientStateFromBackendData --${clientSLK}---`, state)
    console.log(backendClientData)
    
    if(!Object.keys(state.client).includes(clientSLK)) {    
      console.log("ADDING backend client to local store");
      state.client[clientSLK] = backendClientData;
    }

  }

}