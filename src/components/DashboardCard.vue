<template >
     <div class="card shadow2">
          <div class="progress" style="width:70%"></div>
          <div class="content">
            <b>{{section_title}}</b>
            <p>{{question}}</p>
            <p class="percentage">70%</p>
          </div>
    </div>
</template>

<script>
export default {
  props: ['section_title', 'questions'],
  methods: {
      navTo(value){         
        this.$emit('navTo', value);
      },
      pc_complete() {
        
      }

  }
}
</script>