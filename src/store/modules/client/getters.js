

const getters = {

  getCurrentClientDBRefID: (state) => {

    const SLK = sessionStorage.getItem('CurrentClientLookupID');
    if(!SLK || !state.client[SLK]) {
      return undefined;
    }
    return state.client[SLK]['_id'];

  }

}

export default getters;