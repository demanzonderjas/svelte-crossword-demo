<script>
  import { focus } from "../stores/Focus";
  import { activeWord } from "../stores/ActiveWord";
  export let word;

  const focusHandler = () => {
    focus.set({ row: word.startY, column: word.startX });
  };

  $: isActive = $activeWord.uid == word.uid;
</script>

<style>
  li {
    padding: 0.5rem;
    cursor: pointer;
  }
  .active {
    background-color: #00549f;
    color: white;
  }
</style>

<li class:active={isActive} on:click={focusHandler}>
  {word.position}. {word.description}
</li>
