<script lang="ts">
	import DownArrow from "$lib/svgs/down-arrow.svelte";
	import LeftArrow from "$lib/svgs/left-arrow.svelte";
	import RightArrow from "$lib/svgs/right-arrow.svelte";
	import UpArrow from "$lib/svgs/up-arrow.svelte";

	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };

	import type { Orientation, VerseData } from "../../../types";

	let { orientation = $bindable() } = $props<{
		orientation: Orientation;
	}>();
	const data: VerseData = jsonData;

	const verseCount = Object.keys(data).length;
	const SWIPE_THRESHOLD = 50;

	let lineNumber = $state(1);
	let touchStartX = 0;
	let touchStartY = 0;

	function goPrev() {
		lineNumber -= 1;
		if (data[`${lineNumber}`] === " ") {
			lineNumber -= 1;
		}
		lineNumber = Math.max(1, lineNumber);
	}
	function goNext() {
		lineNumber += 1;
		if (data[`${lineNumber}`] === " ") {
			lineNumber += 1;
		}
		lineNumber = Math.min(lineNumber, verseCount);
	}
	function handleKeydown(event: KeyboardEvent) {
		if (orientation === "horizontal") {
			if (event.key === "ArrowRight") {
				event.preventDefault();
				goNext();
			} else if (event.key === "ArrowLeft") {
				event.preventDefault();
				goPrev();
			}
		} else if (orientation === "vertical") {
			if (event.key === "ArrowDown") {
				event.preventDefault();
				goNext();
			} else if (event.key === "ArrowUp") {
				event.preventDefault();
				goPrev();
			}
		}
	}
	function handleTouchStart(event: TouchEvent) {
		touchStartX = event.changedTouches[0].screenX;
		touchStartY = event.changedTouches[0].screenY;
	}
	function handleTouchEnd(event: TouchEvent) {
		const touchEndX = event.changedTouches[0].screenX;
		const touchEndY = event.changedTouches[0].screenY;
		handleSwipe(touchEndX, touchEndY);
	}
	function handleSwipe(touchEndX: number, touchEndY: number) {
		if (orientation === "horizontal") {
			if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
				goNext();
			} else if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
				goPrev();
			}
		} else if (orientation === "vertical") {
			if (touchStartY - touchEndY > SWIPE_THRESHOLD) {
				goNext();
			} else if (touchEndY - touchStartY > SWIPE_THRESHOLD) {
				goPrev();
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />
<div
	id="line"
	style:flex-direction={orientation === "vertical" ? "column" : "row"}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<button
		class="nav"
		onclick={goPrev}
		disabled={lineNumber === 1}
	>
		{#if orientation === "horizontal"}
			<LeftArrow />
		{:else if orientation === "vertical"}
			<UpArrow />
		{/if}
	</button>
	<p>{data[`${lineNumber}`]}</p>
	<button
		class="nav"
		onclick={goNext}
		disabled={lineNumber === verseCount}
	>
		{#if orientation === "horizontal"}
			<RightArrow />
		{:else if orientation === "vertical"}
			<DownArrow />
		{/if}
	</button>
</div>
{#if lineNumber === verseCount}
	<button
		id="reset"
		onclick={() => (lineNumber = 1)}
	>
		Reset
	</button>
{/if}

<style>
	#line {
		width: 100dvw;
		height: 100dvh;
		position: fixed;
		overflow: hidden;

		box-sizing: border-box;
		padding: 2em 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	button#reset {
		width: 3.5em;
		height: 2.5em;

		position: fixed;
		bottom: 17.5em;

		appearance: none;
		background-color: var(--color-bg);
		color: var(--color-text);
		border: var(--border-main);
		border-radius: var(--border-radius-main);
		font-size: var(--btn-font-size);
		border-color: var(--color-text);
	}

	button#reset:hover {
		background-color: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-bg);
	}
	button.nav {
		appearance: none;
		border: none;
		background-color: transparent;
		color: var(--color-text);
	}
	button.nav:disabled {
		opacity: 30%;
	}
</style>
