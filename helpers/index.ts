export function getFormattedNumber(number: number): string {
	return Number(number.toFixed(2)).toLocaleString()
}

export function downloadFile(url: string, fileName: string) {
	const downloadLink = document.createElement('a')
	document.body.appendChild(downloadLink)

	downloadLink.href = url
	downloadLink.target = '_self'
	downloadLink.download = fileName
	downloadLink.click()
}