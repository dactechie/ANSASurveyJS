
export function getClientIfExists(params) {
  if (params.length < 1) 
      return false;
  var countryName = params[0];
  //If the question is empty then do nothing
  if (!countryName) {
      //It doesn't matter what the function returns. The library is wating for this.returnResult(resultValue) callback
      this.returnResult(false);
      return false;
  }
  var self = this;
  //call the ajax method
  $
      .ajax({url: "https://restcountries.eu/rest/v2/all"})
      .then(function (data) {
          var found = false;
          var countries = data;
          for (var i = 0; i < countries.length; i++) {
              if (countries[i].name == countryName) {
                  found = true;
                  break;
              }
          }
          // return the value into the library. Library is waiting for this callback
          self.returnResult(found);
      });
  //May return any value. The library will ignore it.
  return false;
}