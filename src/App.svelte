<script>
  import Row from "./components/Row.svelte";
  import { crossword } from "./stores/Crossword";
  import { activeWord } from "./stores/ActiveWord";
  import Question from "./components/Question.svelte";
  import Descriptions from "./components/Descriptions.svelte";
</script>

<style>
  .crossword {
    display: inline-block;
    white-space: nowrap;
    font-size: 0;
    border: 1px solid black;
    width: 450px;
  }
  .grid {
    max-width: 100%;
    overflow-x: scroll;
  }
</style>

<div class="crossword">
  <div class="grid">
    {#each $crossword as row, i}
      <Row {row} index={i} />
    {/each}
  </div>
  <Question />
</div>
<Descriptions />
