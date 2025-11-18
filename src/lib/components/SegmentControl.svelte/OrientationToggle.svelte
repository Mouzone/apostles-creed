<script lang="ts">
	import SegmentedControl from "./SegmentedControl.svelte";

	// Accepts 'vertical' or 'horizontal'
	let { orientation = $bindable() } = $props<{
		orientation: "vertical" | "horizontal";
	}>();
</script>

<SegmentedControl
	bind:value={orientation}
	options={[
		{ value: "vertical", label: "Top Down", icon: verticalIcon },
		{ value: "horizontal", label: "Left Right", icon: horizontalIcon },
	]}
/>

{#snippet verticalIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d="M12 5v14" />
		<path d="m19 12-7 7-7-7" />
	</svg>
{/snippet}

{#snippet horizontalIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d="M5 12h14" />
		<path d="m12 5 7 7-7 7" />
	</svg>
{/snippet}
