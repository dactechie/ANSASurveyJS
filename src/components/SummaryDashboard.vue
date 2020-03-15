<template>
  <div>
      <h2>Intial Assessment &nbsp; &nbsp;<input size="50" type="text"
            placeholder="search ANSA questions/options"/></h2>
      
      <!-- <div :v-for="s in (sections, index)" :key="index" class="card shadow2">
       
        <div class="content">
          <b>{{s.title}}</b>

        </div>
      </div>
     -->
  </div>
</template>

<script>
export default {
  props: ['sections'],
  methods: {
       navTo(value){
        this.$emit('navTo', value);
      }
  }
}
</script>

<style lang="css" scoped>

/* html, body {
  height: 10vh;
  margin: 0;
  padding: 0;
} */
  /* display: flex; */
/* body {

  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1rem;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
}  */

.card { /* https://codemyui.com/pure-css-progress-card-animation/*/
  background-color:#eee;
  box-sizing:border-box;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  
  float:left;
  /* height:8em; */
  margin:.5em;
  padding:0.5em;
  position:relative;
  /* width:12em; */
}


.content {
  position:relative;
  font-size: 0.9em;
}

/* .percentage {
  text-align:right;
}

@keyframes slideIn {
  0% {
    background-color:#abc;
    width:0;
  }
  100% {
    background-color:#def;
    width:100%;
  }
} */

.shadow2 {  /* https://codemyui.com/awesome-box-shadow-effect-for-card-ui/*/
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
}

/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_pill_button*/

.pillred {
  background-color: rgb(175, 93, 93);
  border: none;
  color: white;
  padding: 0.2em 0.2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  /* margin: 2px 1px; */
  cursor: pointer;
  border-radius: 16px;
  /*font-size: 0.85em;*/
}

.pillblue {
  background-color: rgb(80, 134, 204);
  border: none;
  color: white;
  padding: 0.2em 0.2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  /* margin: 2px 1px; */
  cursor: pointer;
  border-radius: 16px;
  /*font-size: 0.85em;*/
}

.pill:hover {
  background-color: #f1f1f1;
}
</style>

  <!--
      <div class="card shadow2">
        <div class="progress" style="width:70%"></div>
        <div class="content">
          <b>Survey Details</b>
          <p>Date, Program, Staff, Office</p>
          <p class="percentage">70%</p>
        </div>
      </div>
      
      <div class="card shadow2">
        <div class="progress" style="width:90%"></div>
        <div class="content">
          <button @click="navTo(2)" ><b>Client Basic Details</b></button>
          <p>Name, DOB, Sex</p>
          <p class="percentage">90%</p>
        </div>
      </div>
      
      <div class="card shadow2">
        <div class="progress" style="width:40%"></div>
        <div class="content">
          <b>Birth/Culture</b>
          <p>COB, ATSI, Language</p>
          <p class="percentage">40%</p>
        </div>
      </div>
      
      <div class="card shadow2">
        <div class="progress" style="width:60%"></div>
        <div class="content">
          <b>Risk</b>
          <p>Health / Housing risks.</p>
       
        </div>
      </div>
      
      <div class="card shadow2">
        <div class="progress" style="width:50%"></div>
        <div class="content">
          <b>Current Drug Use</b>
          <p><span class="pillblue">Drug(s) of Concern</span>, 
          <span class="pillred">Method</span>, <span class="pillblue">Frequency</span></p>
        
        </div>
      </div>

      
      <div class="card shadow2">
        <div class="progress" style="width:50%"></div>
        <div class="content">
          <b>AOD History</b><br/>
          <p class="pill red">Past Drug use details</p>
   
        </div>
      </div>

      <div class="card shadow2">
        <div class="progress" style="width:10%"></div>
        <div class="content">
          <b>Legal</b>
          <p>Criminal History, etc.</p>
          <p class="percentage">10%</p>
        </div>
      </div>
      -->