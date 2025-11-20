<script lang="ts">
	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };
	import type { VerseData } from "$lib/types";
	import { scrollToBottomOnUpdate } from "$lib/actions";
	const data: VerseData = jsonData;

	let lineNumber = $state(1);
	let userInput = $state("");
	let chances = $state(1);

	// skip the line break lines, and show them when the line after is guessed
	function onSubmit() {
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
		gap: 1em;
	}
	#previous {
		width: 30dvw;
		height: 20dvh;
		gap: 0.5em;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		min-height: 0; /* Essential for scrolling in a flex container */
	}
	p {
		margin: 0;
	}
</style>
