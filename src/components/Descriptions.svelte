<script>
  import { words } from "../stores/Words";
  import Description from "./Description.svelte";

  $: horizontal = $words.filter(w => w.orientation == "horizontal");
  $: vertical = $words.filter(w => w.orientation == "vertical");
</script>

<style>
  .descriptions {
    display: inline-block;
    vertical-align: top;
    padding: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  h2 {
    font-family: "Comic Sans MS";
    margin: 0.5rem 0;
  }
</style>

<div class="descriptions">
  <div class="list horizontal">
    <h2>Across</h2>
    <ul>
      {#each horizontal as word}
        <Description {word} />
      {/each}
    </ul>
  </div>
  <div class="list vertical">
    <h2>Down</h2>
    <ul>
      {#each vertical as word}
        <Description {word} />
      {/each}
    </ul>
  </div>
</div>
