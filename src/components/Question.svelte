<script>
  import { activeWord } from "../stores/ActiveWord";

  $: description = $activeWord ? $activeWord.description : "";
  $: position = $activeWord ? $activeWord.position : "";
</script>

<style>
  .question {
    background-color: #00549f;
    color: white;
    padding: 1rem;
    white-space: normal;
  }
  p {
    font-size: 1.25rem;
    text-align: center;
    font-family: "Comic Sans MS";
  }
</style>

<div class="question">
  <p>{position}. {description}</p>
</div>
