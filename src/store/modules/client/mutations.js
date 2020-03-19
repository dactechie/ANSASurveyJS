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

  }


}