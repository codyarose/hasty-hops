const debounce = <F extends (...args: any[]) => any>(
	func: F,
	waitFor: number
) => {
	let timeout: NodeJS.Timeout

	return (...args: Parameters<F>): ReturnType<F> => {
		let result: any
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			result = func(...args)
		}, waitFor)
		return result
	}
}

export { debounce }
