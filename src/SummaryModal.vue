<script>
import SummaryGrid from './components/SummaryGrid';
  export default {
    name: 'modal',
    components :{
      SummaryGrid,
    },
    data(){
      return {
          searchQuery: '',
          gridColumns: ['name', 'percent_done','page' ],
          gridData: [
            { name: 'Demographics', percent_done: 100 , page:0},
            { name: 'Substance Use', percent_done: 60 , page:1},
            { name: 'Impact of use', percent_done: 10, page:2 }
          ]
        }
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            This is the default tile!

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            Previous Episodes: 2
            <p></p>
              <form id="search">
                Search <input name="query" v-model="searchQuery">
              </form>
              <p></p>
            <SummaryGrid
                :heroes="gridData"
                :columns="gridColumns"
                :filter-key="searchQuery">
            </SummaryGrid>

            <p></p><b>Mandatory Fields</b>
            <br> </br>
            <div class="d-flex repository-lang-stats-graph">
                <span class="language-color" aria-label="CSS 30.3%" style="width:30.3%; background-color:#3572A5; color:#ffffff;" itemprop="keywords">Demographics</span>
                <!-- <span class="language-color" aria-label="HTML 10%" style="width:10%; background-color:#e34c26;" itemprop="keywords">HTML</span> -->
                <!-- <span class="language-color" aria-label="JavaScript 9.5%" style="width:9.5%; background-color:#f1e05a;" itemprop="keywords">JavaScript</span> -->
                <span class="language-color" aria-label="CSS 20.3%" style="width:20.3%; background-color:#e34c26;color:#ffffff;" itemprop="keywords">Substance Use</span>
                <span class="language-color" aria-label="HTML 30%" style="width:30%; background-color:#3572A5;color:#ffffff;" itemprop="keywords">Impact of Use</span>

            </div>


          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Close me!
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style>

.repository-lang-stats-graph {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #ddd;
    border-top: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
}

.d-flex {
    display: flex!important;
}



  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
     z-index: 1000;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;

  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
