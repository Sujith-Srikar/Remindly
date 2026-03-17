<script lang="ts">
  import { themeMode } from "../../store/uiStore";

  function toggle() {
    themeMode.update((mode) => {
      if (mode === "light") return "dark";
      return "light";
    });
  }
</script>

<button
  onclick={toggle}
  aria-label="Toggle theme"
  class="
  w-8 h-8
  flex items-center justify-center
  rounded-lg
  transition
  hover:bg-neutral-200
  dark:hover:bg-neutral-700
  "
>
  {#if $themeMode === "light"}
    🌙
  {:else}
    ☀️
  {/if}
</button>
