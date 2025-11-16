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
		position: relative;
		display: inline-block;
		width: 50px; /* [Source 23] */
		height: 28px; /* [Source 23] */
	}

	/* Hide the default checkbox */
	.toggle-switch input {
		opacity: 0; /* [Source 24] */
		width: 0; /* [Source 24] */
		height: 0; /* [Source 24] */
	}

	/* The "track" of the slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0; /* [Source 25] */
		bottom: 0; /* [Source 25] */
		background-color: #ccc; /* [Source 25] */
		border-radius: 28px; /* [Source 25] */
		transition: 0.3s; /* [Source 26] */
	}

	/* The "thumb" or "knob" of the slider */
	.slider:before {
		position: absolute;
		content: "";
		height: 20px; /* [Source 27] */
		width: 20px; /* [Source 27] */
		left: 4px; /* [Source 27] */
		bottom: 4px; /* [Source 27] */
		background-color: white; /* [Source 27] */
		border-radius: 50%; /* [Source 28] */
		transition: 0.3s; /* [Source 28] */

		/* --- MODIFICATION 1: ADD DEFAULT SUN ICON --- */
		/* This is a URL-encoded SVG for a sun */
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f39c12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='5'%3E%3C/circle%3E%3Cline x1='12' y1='1' x2='12' y2='3'%3E%3C/line%3E%3Cline x1='12' y1='21' x2='12' y2='23'%3E%3C/line%3E%3Cline x1='4.22' y1='4.22' x2='5.64' y2='5.64'%3E%3C/line%3E%3Cline x1='18.36' y1='18.36' x2='19.78' y2='19.78'%3E%3C/line%3E%3Cline x1='1' y1='12' x2='3' y2='12'%3E%3C/line%3E%3Cline x1='21' y1='12' x2='23' y2='12'%3E%3C/line%3E%3Cline x1='4.22' y1='19.78' x2='5.64' y2='18.36'%3E%3C/line%3E%3Cline x1='18.36' y1='5.64' x2='19.78' y2='4.22'%3E%3E%3C/line%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 14px 14px;
	}

	/* --- The "ON" State (Dark Mode) --- */

	/* Change the track color when checked */
	input:checked + .slider {
		background-color: black; /* [Source 29] */
	}

	/* Move the knob and change its icon */
	input:checked + .slider:before {
		transform: translateX(22px); /* [Source 30] */

		/* --- MODIFICATION 2: CHANGE TO MOON ICON --- */
		/* This is a URL-encoded SVG for a moon */
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%233498db' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'%3E%3C/path%3E%3C/svg%3E");
	}

	/* Add a focus ring for keyboard accessibility */
	input:focus-visible + .slider {
		box-shadow: 0 0 1px black;
	}
</style>
