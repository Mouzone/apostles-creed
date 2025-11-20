
/**
 * A Svelte action that scrolls an element to the bottom whenever its content changes.
 * This ensures the view always shows the most recent content after a mutation.
 * @param {HTMLElement} node The element to apply the action to.
 */
export function scrollToBottom(node: HTMLElement) {
	function scroll() {
		node.scrollTo({
			top: node.scrollHeight,
			behavior: "smooth",
		});
	}

	// A MutationObserver waits for the DOM to update before trying to scroll.
	const observer = new MutationObserver(scroll);
	observer.observe(node, {
		childList: true, // Watch for verses being added or removed.
	});

	// Perform an initial scroll in case there's existing content.
	setTimeout(scroll, 50);

	return {
		destroy() {
			observer.disconnect();
		},
	};
}
