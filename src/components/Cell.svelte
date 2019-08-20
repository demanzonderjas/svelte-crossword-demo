<script>
  import { crossword } from "../stores/Crossword";
  import { words } from "../stores/Words";
  import { focus } from "../stores/Focus";
  import { activeWord } from "../stores/ActiveWord";
  import { correctAnswers } from "../stores/CorrectAnswers";
  import { afterUpdate, onMount } from "svelte";

  export let value, row, column;

  const inputHandler = e => {
    crossword.handleInput(row, column, e);
    focus.handleNext($activeWord.orientation, e);
  };
  const focusHandler = e => focus.handleFocus(row, column, isCorrect, e);
  const clickHandler = focus.handleClick.bind(
    null,
    row,
    column,
    $activeWord.orientation
  );

  $: isBlank = value === "@";
  $: inFocus = row === $focus.row && column === $focus.column;
  $: isActive = $activeWord.coords.some(c => c[0] == row && c[1] == column);
  $: isCorrect = $correctAnswers.some(answer =>
    answer.coords.some(c => c[0] == row && c[1] == column)
  );

  let position;
  onMount(() => {
    const matchingWord = $words.find(
      w => w.startY == row && w.startX == column
    );
    position = matchingWord && matchingWord.position;
  });

  let inputRef;
  afterUpdate(() => {
    if (!isBlank && inFocus) {
      inputRef.focus();
    }
  });
</script>

<style>
  .cell {
    width: 40px;
    height: 40px;
    display: inline-block;
    position: relative;
    border-left: 1px solid rgba(100, 100, 100, 0.23);
    border-bottom: 1px solid rgba(100, 100, 100, 0.23);
    user-select: none;
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    text-align: center;
    text-transform: uppercase;
    border: 0;
    outline: 0;
    border-radius: 0;
    transition: background-color 0.25s ease-in-out;
    font-family: "Comic Sans MS";
  }
  .blank {
    background-color: black;
    color: rgba(0, 0, 0, 0);
    user-select: none;
    background-image: url("/logo.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .active {
    background-color: #00549f;
    color: white;
  }
  .focus {
    border: 4px solid orange;
    background-color: #00549f59;
  }
  .correct {
    background-color: green;
    color: white;
  }
  .position {
    position: absolute;
    top: 4px;
    left: 4px;
    color: #000;
    font-size: 0.7rem;
    z-index: 2;
  }
</style>

<div class="cell" on:click={clickHandler}>
  <input
    bind:this={inputRef}
    bind:value
    class:blank={isBlank}
    class:active={isActive}
    class:focus={inFocus}
    class:correct={isCorrect}
    on:input={inputHandler}
    on:keydown={focusHandler}
    readonly={isBlank || isCorrect} />
  {#if position}
    <span class="position">{position}</span>
  {/if}
</div>
