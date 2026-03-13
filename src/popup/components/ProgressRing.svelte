<script lang="ts">
  let { progress, label } = $props<{ progress: number; label: string }>();
  const radius = 36;
  const stroke = 4;

  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = $derived(circumference - progress * circumference);
</script>

<div class="flex flex-col items-center gap-1">
  <svg height={radius * 2} width={radius * 2} class="-rotate-90">
    <circle
      stroke="#404040"
      fill="transparent"
      stroke-width={stroke}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
    />

    <circle
      stroke="#3b82f6"
      fill="transparent"
      stroke-width={stroke}
      stroke-linecap="round"
      stroke-dasharray={`${circumference} ${circumference}`}
      style={`stroke-dashoffset: ${strokeDashoffset}`}
      r={normalizedRadius}
      cx={radius}
      cy={radius}
      class="transition-all duration-500"
    />
  </svg>

  <div class="absolute text-sm font-semibold text-blue-400">
    {label}
  </div>
</div>
