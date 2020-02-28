<template>
  <div>
    <div v-for="(q, index) in questions" :key="index">
      <a href="q.ref"> {{q.question}} </a>
    </div>
    
  </div>
</template>


<script>
export default {
  name: "DashboardQuestions",
  props: ["questions"]
}
</script>

<style>

</style>