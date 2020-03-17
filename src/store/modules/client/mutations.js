

export const mutations = {

  updateCurrentClient(state, {client}) {
       
        //state['client'] = [] 
        let thisclient = {}, slk = client['SLK'] ;
        thisclient[slk] = {'DB_ID' : client['DB_ID'], 'DB_ID_TYPE': client['DB_ID_TYPE']}
        state['client'].push(thisclient)

        sessionStorage.setItem('CurrentClientLookupID',slk);

  }


}