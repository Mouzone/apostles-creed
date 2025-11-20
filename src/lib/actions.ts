
/**
 * A Svelte action that scrolls an element to the bottom only when its `trigger`
 * parameter changes. This is ideal for situations where you want to programmatically
 * scroll after a specific event (like a form submission) without interfering
 * with user scrolling at other times.
 *
 * @param {HTMLElement} node The element to apply the action to.
 * @param {*} trigger Any value that changes when you want to trigger a scroll.
 */
export function scrollToBottomOnUpdate(node: HTMLElement, trigger: unknown) {
	// Function to perform the scroll directly.
	function performScroll() {
		node.scrollTop = node.scrollHeight;
	}

	// Initial scroll on mount (next tick after DOM update)
	setTimeout(performScroll, 0);

	return {
		// This is the key: we scroll every time the `trigger` parameter changes.
		update(newTrigger: unknown) {
			performScroll();
		},
		destroy() {
			// No event listeners or observers to disconnect in this simplified version
		}
	};
}
