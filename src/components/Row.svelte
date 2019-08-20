<script>
  import Cell from "./Cell.svelte";
  export let row, index;
</script>

<div class="row">
  {#each row as cell, i}
    <Cell value={cell} row={index} column={i} />
  {/each}
</div>
