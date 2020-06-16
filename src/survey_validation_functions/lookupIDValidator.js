// reference : https://github.com/surveyjs/survey-library/issues/995

let LookupIDValidator = (function (_super) {
  Survey.__extends(LookupIDValidator, _super);
  function LookupIDValidator() {
      _super.call(this);
  }
  LookupIDValidator.prototype.getType = function () {
      return "LookupIDValidator";
  };
  LookupIDValidator.prototype.validate = function (value, name) {
      if (value.indexOf("survey") < 0) {
          return new Survey.ValidatorResult(null, new Survey.CustomError(this.getErrorText(name)));
      }
      let emailValidator = new Survey.EmailValidator();
      let res = emailValidator.validate(value, name);
      if(res) return res;
      
      //do additional validation //do additional validation

      //do additional validation

      return null;
  };
  //the default error text. It shows if user do not set the 'text' property
  LookupIDValidator.prototype.getDefaultErrorText = function (name) {
      return "You text should contains 'survey' word.";
  }
  return LookupIDValidator;
})(Survey.SurveyValidator);

Survey.LookupIDValidator = LookupIDValidator;
//add into survey Json metaData
Survey
  .JsonObject
  .metaData
  .addClass("LookupIDValidator", [], function () {
      return new LookupIDValidator();
  }, "surveyvalidator");

// var json = {
//   elements: [
//       {
//           type: "text",
//           name: "email",
//           isRequired: true,
//           title: "Type here e-mail with 'survey' text to pass the validation ",
//           validators: [
//               {
//                   type: "LookupIDValidator"
//               }
//           ]
//       }
//   ]
// };

// var survey = new Survey.Model(json);
// survey
//   .onComplete
//   .add(function (result) {
//       document
//           .querySelector('#surveyResult')
//           .innerHTML = "result: " + JSON.stringify(result.data);
//   });

// $("#surveyElement").Survey({model: survey});
