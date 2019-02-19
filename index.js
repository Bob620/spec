const fs = require('fs');

const outputFileName = 'output.csv';
const path = '/home/mia/Downloads/test/';
const fileExtension = '.dat.nor';

let outputArray = [];


const directory = fs.readdirSync(path);

for (const fileName of directory) {
	if (fileName.endsWith(fileExtension)) {
		const file = fs.readFileSync(path+fileName, 'utf8');

		let [meta, spectrum] = file.split('#   e         norm        nbkg        flat        fbkg        nder        nsec');
		let spectrumLines = spectrum.split('\r\n');

		if (outputArray[0] === undefined) {
			outputArray[0] = ['wave', fileName.slice(0, fileName.length-fileExtension.length)];
			for (let i = 1; i < spectrumLines.length; i++) {
				const spectrums = spectrumLines[i].split(' ').filter(i => i !== '');
				outputArray[i] = [spectrums[0], spectrums[1]];
			}
		} else {
			outputArray[0].push(fileName.slice(0, fileName.length-fileExtension.length));
			for (let i = 1; i < spectrumLines.length; i++) {
				const spectrums = spectrumLines[i].split(' ').filter(i => i !== '');
				outputArray[i].push(spectrums[1]);
			}
		}
	}
}


fs.writeFileSync(path+outputFileName, outputArray.map(line => line.join(',')).join('\n'));
