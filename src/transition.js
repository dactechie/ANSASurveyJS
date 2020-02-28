
// import "velocity-animate/velocity.ui.min.js";
import Velocity from "velocity-animate";

function animate(animationType, duration) {
  console.log("haha ");
  if (!duration)
      duration = 1000;
  let element = document.getElementById("app");
  //Velocity(element, {property: value}, {option: optionValue});
  
  Velocity(element, animationType, 
          {duration: duration, easing:"easeInOutSine"});
 // $(element).velocity(animationType, {duration: duration});
}

// let doAnimation = true;
export default function setupAnimation(survey, doAnimation) {
    survey
      .onCurrentPageChanging
      .add(function (sender, options) {
          if (!doAnimation) 
              return;
          options.allowChanging = false;
          setTimeout(function () {
              doAnimation = false;
              sender.currentPage = options.newCurrentPage;
              doAnimation = true;
          }, 500);
          animate("slideUp", 500);
      });
    survey
      .onCurrentPageChanged
      .add(function (sender) {
          animate("slideDown", 500);
      });
    survey
      .onCompleting
      .add(function (sender, options) {
          if (!doAnimation) 
              return;
          options.allowComplete = false;
          setTimeout(function () {
              doAnimation = false;
              sender.doComplete();
              doAnimation = true;
          }, 500);
          animate("slideUp", 500);
      });
    animate("slideDown", 1000);
}