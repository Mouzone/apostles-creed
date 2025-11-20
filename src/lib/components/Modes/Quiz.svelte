<script lang="ts">
	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };
	import type { VerseData } from "$lib/types";
	import { scrollToBottomOnUpdate } from "$lib/actions";
	import { preventDefault } from "svelte/legacy";
	const data: VerseData = jsonData;

	let lineNumber = $state(1);
	let userInput = $state("");
	let chances = $state(1);
	let inputElement: HTMLInputElement | null = $state(null);

	// This single effect handles both initial focus and re-focusing after submissions.
	$effect(() => {
		if (inputElement) {
			// This condition is true on initial mount (lineNumber === 1)
			// and after any submission that changes lineNumber or chances.
			// The timeout ensures focus happens reliably after DOM updates, especially on mobile.
			setTimeout(() => {
				inputElement?.focus({ preventScroll: true });
			}, 0);
		}
	});

	// skip the line break lines, and show them when the line after is guessed
	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		chances -= 1;
		if (lineNumber === Object.keys(data).length + 1) return;

		if (chances === 0 || userInput === data[lineNumber]) {
			lineNumber += 1;
			chances = 1;
		}
		userInput = "";
	}
</script>

<div id="page">
	<div
		id="previous"
		use:scrollToBottomOnUpdate={lineNumber}
	>
		<div style="flex-grow: 1;"></div>
		<!-- add back .slice(0, Math.max(0, lineNumber - 1)) -->
		{#each Object.values(data).slice(0, Math.max(0, lineNumber - 1)) as verse}
			<p>{verse}</p>
		{/each}
	</div>
	<form onsubmit={onSubmit}>
		<input
			bind:this={inputElement}
			bind:value={userInput}
			disabled={lineNumber === Object.keys(data).length + 1}
		/>
	</form>
</div>

<style>
	#page {
		width: 100dvw;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#previous {
		width: 40dvw;
		height: 40dvh;
		gap: 0.5em;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		min-height: 0; /* Essential for scrolling in a flex container */
		padding-bottom: 1em;
	}
	p {
		margin: 0;
	}

	@media (max-width: 640px) {
		#previous {
			width: 70dvw;
		}
	}
</style>
