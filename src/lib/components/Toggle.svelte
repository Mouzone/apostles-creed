<script lang="ts">
	let { checked = $bindable() } = $props<{ checked: boolean }>();
</script>

<label class="toggle-switch">
	<input
		type="checkbox"
		bind:checked
	/>
	<span class="slider"></span>
</label>

<style>
	.toggle-switch {
		position: absolute;
		display: inline-block;
		width: 50px; /* [Source 23] */
		height: 28px; /* [Source 23] */

		right: 1em;
		top: 1.5em;
	}

	/* Hide the default checkbox */
	.toggle-switch input {
		opacity: 0; /* [Source 24] */
		width: 0; /* [Source 24] */
		height: 0; /* [Source 25] */
	}

	/* --- LIGHT MODE (DEFAULT) --- */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0; /* [Source 26] */
		bottom: 0; /* [Source 26] */
		background-color: black; /* UPDATED: Was #ccc */
		border-radius: 28px; /* [Source 26] */
		transition: 0.3s; /* [Source 27] */
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 20px; /* [Source 28] */
		width: 20px; /* [Source 28] */
		left: 4px; /* [Source 28] */
		bottom: 4px; /* [Source 28] */
		background-color: white; /* [Source 29] */
		border-radius: 50%; /* [Source 30] */
		transition: 0.3s; /* [Source 30] */

		/* UPDATED: Sun icon is now black (#000000) */
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='5'%3E%3C/circle%3E%3Cline x1='12' y1='1' x2='12' y2='3'%3E%3C/line%3E%3Cline x1='12' y1='21' x2='12' y2='23'%3E%3C/line%3E%3Cline x1='4.22' y1='4.22' x2='5.64' y2='5.64'%3E%3C/line%3E%3Cline x1='18.36' y1='18.36' x2='19.78' y2='19.78'%3E%3C/line%3E%3Cline x1='1' y1='12' x2='3' y2='12'%3E%3C/line%3E%3Cline x1='21' y1='12' x2='23' y2='12'%3E%3C/line%3E%3Cline x1='4.22' y1='19.78' x2='5.64' y2='18.36'%3E%3C/line%3E%3Cline x1='18.36' y1='5.64' x2='19.78' y2='4.22'%3E%3E%3C/line%3E%3C/svg%3E");
		background-repeat: no-repeat; /* [Source 31] */
		background-position: center; /* [Source 31] */
		background-size: 14px 14px; /* [Source 31] */
	}

	/* --- DARK MODE ("ON" STATE) --- */

	/* Track becomes white */
	input:checked + .slider {
		background-color: white; /* UPDATED: Was black */
	}

	/* Knob becomes black, icon becomes white */
	input:checked + .slider:before {
		transform: translateX(22px); /* [Source 33] */
		background-color: black; /* ADDED: Knob is now black */

		/* UPDATED: Moon icon is now white (#ffffff) */
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'%3E%3C/path%3E%3C/svg%3E");
	}

	/* Focus ring for accessibility */
	input:focus-visible + .slider {
		box-shadow: 0 0 2px black;
	}

	/* UPDATED: Focus ring for dark mode */
	input:checked:focus-visible + .slider {
		box-shadow: 0 0 2px white;
	}
</style>
