export function convertBase64ToImage(base64String) {
	return `data:image/png;base64,${base64String}`;
}
