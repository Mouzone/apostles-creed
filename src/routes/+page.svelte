<script>
	import data from "$lib/apostles-creed-verses.json";

	let mode = $state("all");
	let lineNumber = $state(1);
</script>

<div id="page">
	<button
		id="mode"
		onclick={() => (mode = mode === "all" ? "verse" : "all")}
	>
		Switch Mode
	</button>
	{#if mode === "all"}
		<div id="verses">
			{#each Object.values(data) as verse, i}
				{#if verse === " "}
					<br />
				{:else}
					<p
						class="verse"
						data-line={i}
					>
						{verse}
					</p>
				{/if}
			{/each}
		</div>
	{:else}
		<div id="single-verse">
			<button
				onclick={() => (lineNumber -= 1)}
				disabled={lineNumber === 1}
			>
				prev
			</button>
			<p id="verse">{data[`${lineNumber}`]}</p>
			<button
				onclick={() => (lineNumber += 1)}
				disabled={lineNumber === Object.entries(data).length}
			>
				next
			</button>
		</div>
	{/if}
</div>

<style>
	@font-face {
		font-family: "Merriweather";
		src: url("/Merriweather/Merriweather-VariableFont_opsz\,wdth\,wght.ttf")
			format("truetype");
		font-weight: 300 900;
		font-style: normal;
	}
	@font-face {
		font-family: "Open Sans";
		src: url("/Open_Sans/OpenSans-VariableFont_wdth\,wght.ttf")
			format("truetype");
		font-weight: 300 800;
		font-style: normal;
	}
	#page {
		height: 100dvh;
		width: 100dvw;
		box-sizing: border-box;
		padding: 1em;

		font-family: "Open Sans";
		font-size: 1.35em;
		font-weight: bold;
		line-height: 0.5em;

		display: flex;
		justify-content: center;
		/* on desktop it cuts off top, but looks good on desktop full screen */
		/* align-items: center; */
	}

	#verses {
		padding-left: 1.5em;
	}

	button#mode {
		position: absolute;
		right: 1em;
		top: 1em;
	}

	#single-verse {
		width: 100dvw;
		height: 100dvh;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
