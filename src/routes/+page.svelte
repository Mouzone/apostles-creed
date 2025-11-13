<script>
	let mode = $state("all");
	let verse = $state(1);
	$effect(() => {
		if (mode === "all") {
		} else if (mode === "verse") {
		}
	});
</script>

<div id="page">
	<button onclick={() => (mode === "all" ? "verse" : "all")}>
		Switch Mode
	</button>
	<div id="verses">
		<p
			class="verse"
			data-line="1"
		></p>
	</div>
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
		width: 100dvw;
		padding: 2em 3em 2em 3em;

		font-family: "Open Sans";
		font-size: 1.35em;
		font-weight: bold;
		line-height: 0.7em;
	}
</style>
