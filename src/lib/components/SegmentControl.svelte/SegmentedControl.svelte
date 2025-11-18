<script lang="ts">
	import { type Snippet } from "svelte";

	// Define the shape of an option
	type Option<T> = {
		value: T;
		label: string;
		icon: Snippet;
	};

	let { value = $bindable(), options } = $props<{
		value: any;
		options: Option<any>[];
	}>();
</script>

<div class="segmented-control">
	{#each options as option}
		<button
			class:selected={value === option.value}
			onclick={() => (value = option.value)}
			aria-label={option.label}
			type="button"
		>
			{@render option.icon()}
		</button>
	{/each}
</div>

<style>
	.segmented-control {
		display: flex;
		/* Uses your app's text color for the border */
		border: 1px solid var(--color-text);
		border-radius: var(--border-radius-main, 0.5em);
		padding: 2px;
		gap: 2px;
		width: fit-content;
		background-color: var(--color-bg);
	}

	button {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.4em 0.8em;
		cursor: pointer;
		background: transparent;
		border: none;
		border-radius: calc(var(--border-radius-main, 0.5em) - 2px);
		color: var(--color-text);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	/* The Active State: Inverts colors */
	button.selected {
		background-color: var(--color-text);
		color: var(--color-bg);
	}

	button:not(.selected):hover {
		opacity: 0.6;
	}
</style>
