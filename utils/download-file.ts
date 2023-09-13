export function downloadFile(url: string, fileName: string) {
	const downloadLink = document.createElement('a')
	document.body.appendChild(downloadLink)

	downloadLink.href = url
	downloadLink.target = '_self'
	downloadLink.download = fileName
	downloadLink.click()
}
