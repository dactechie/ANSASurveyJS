# ANSASurveyJS
SurveyJS based questionnaire for AOD (ANSA)

from MJ - test commit

# Typescript patterns:

1. Dictionary https://stackoverflow.com/questions/15877362/declare-and-initialize-a-dictionary-in-typescript
For using dictionary object in typescript you can use interface as below:

interface Dictionary<T> {
    [Key: string]: T;
}
and, use this for your class property type.

export class SearchParameters {
    SearchFor: Dictionary<string> = {};
}
to use and initialize this class,

getUsers(): Observable<any> {
        var searchParams = new SearchParameters();
        searchParams.SearchFor['userId'] = '1';
        searchParams.SearchFor['userName'] = 'xyz';

        return this.http.post(searchParams, 'users/search')
            .map(res => {
                return res;
            })
            .catch(this.handleError.bind(this));
    }
