<script lang="ts">
  let { checked, onChange } = $props<{
    checked: boolean;
    onChange: () => void;
  }>();

  const toggle = (e: MouseEvent) => {
    e.stopPropagation();
    onChange();
  };
</script>

<button
  type="button"
  onclick={toggle}
  role="switch"
  aria-checked={checked}
  aria-label={checked ? "Disable reminder" : "Enable reminder"}
  class="
relative
w-10
h-6
rounded-full
transition-colors
duration-normal
ease-apple
"
  class:bg-accent={checked}
  class:bg-neutral-300={!checked}
>
  <div
    class="
absolute
top-0.5
left-0.5
w-5
h-5
bg-white
rounded-full
shadow
transition-transform
duration-normal
ease-apple
"
    style:transform={checked ? "translateX(16px)" : "translateX(0)"}
  ></div>
</button>
