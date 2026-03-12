<script lang="ts">
    import {saveSettings, getSettings} from "../../core/storage/storageService";
    import {onMount} from "svelte";
    import {WATER_REMAINDER} from "../../utils/constant"

    let enabled = $state(false);
    let interval = $state(0);

    const handleToggleRemainder = (e: any) => {
        enabled = !enabled;
        saveSettings(WATER_REMAINDER, {enabled, interval});
    }

    const handleOnInputChange = (e: any) => {
        interval = Number(e.target.value);
        saveSettings(WATER_REMAINDER, {enabled, interval});
    }

    onMount(async () => {
        const res = await getSettings(WATER_REMAINDER);
        enabled = res.enabled;
        interval = res.interval
    })
</script>

<main>
    <button onclick={handleToggleRemainder}>
        {enabled ? "Remainder ON" : "Remainder OFF"}
    </button>
    <input type="number" bind:value={interval} placeholder="Enter interval" onchange={handleOnInputChange}>
</main>

<style>
main {
  width: 300px;
  padding: 16px;
  height: 400px;
}
</style>
