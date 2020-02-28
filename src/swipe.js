
 export default function swipeEvent (survey, event) {
    if (event.direction === 2){
      let nxtResult = survey.nextPage();
      if (!nxtResult && survey.isLastPage)
        alert("last page");
    } else {
      survey.prevPage();
    }
    console.log(event.direction , new Date());
  
  }