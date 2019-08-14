

function errorMessage(saying) {
	const message = document.createElement('div');
	message.classList.add('error');
	message.innerHTML = saying;
	return message;
}

function displayParameter(parameter,depth) {
const parameterE = document.createElement('span');
				parameterE.textContent = parameter.key;
				const bubble = document.createElement('div');
				bubble.classList.add('parameterBubble');
				let hasParameter = parameter.parameters;
if (hasParameter) {
hasParameter = parameter.parameters[0];
}
				if (!hasParameter) {

					if (true/*parameter.type != ParameterTypes.object*/) {
						bubble.innerHTML = parameter.value;
						if (parameter.type == ParameterTypes.rule) {
							bubble.classList.add('when');
						}

					} else {
						bubble.classList.add('object');
						bubble.innerHTML = parameter.value;
					}
				} else {
					bubble.style.backgroundColor = `rgb(150,110,150)`;
					bubble.style.borderColor = '#000';
					parameter.parameters.forEach((param) => {
						bubble.appendChild(displayParameter(param,depth++));
console.log(param.key);
					});
				}
				parameterE.appendChild(bubble);
return parameterE;
}


function makeInsideElement(block) {
	const output = document.createElement('div');
	block.inside.forEach((block) => {
		const e = document.createElement('div');
		e.classList.add('block');
		e.classList.add(`blockType${block.type}`);
		const text = document.createElement('span');
		if (block.description) {
			let description = block.description; //Unfinished
			if (block.type == 9) {
				description = description.split('').reverse().join('');
			}
			text.textContent = description + ' ';
		}
		if (block.parameters && block.parameters.length > 0) {
			block.parameters.forEach((parameter) => {
				//console.log(parameter.value);
				
				text.appendChild(displayParameter(parameter,0));
			});
		}
		e.appendChild(text);

		const moveBlock = document.createElement('span');
		moveBlock.classList.add('moveBlock');
		moveBlock.classList.add(`moveBlockType${block.type}`);
		moveBlock.textContent = '≡';
		e.appendChild(moveBlock);
		if (block.inside) {
			e.classList.add('control');
			const insideElement = document.createElement('div');
			insideElement.classList.add('inside');
			insideElement.classList.add('block');
			const nextBlocks = makeInsideElement(block);
			insideElement.appendChild(nextBlocks);
			e.appendChild(insideElement);
		}
		output.appendChild(e);
	});
	return output;
	
}


function display(blocks, output) {
	output.innerHTML = '';
	if (blocks.type != -1) {
		output.appendChild(errorMessage(`Main block's type is not -1. Instead, it is ${blocks.type}. Check console for the JSON form of blocks.`));
		console.log(blocks,JSON.stringify(blocks));
		return;
	}
	const e = makeInsideElement(blocks);
	output.appendChild(e);
	
}



document.addEventListener('click',() => {
const pre = document.getElementsByTagName('pre');

for (let i=0; i < pre.length; i ++) {
if (!pre[i].hasAttribute('noHopscotch')) {
	const output = pre[i];
	const code = output.textContent;
	const readyToParse = removeShortcuts(output.textContent);	
	console.log(readyToParse);
	let parsedCode;
	 try {parsedCode = Parser.parse(readyToParse);} catch(e){}
	if (parsedCode){
		const out = document.createElement('div');
		display(parsedCode,out);
			const oldCode = document.createElement('details');
			const oldPre = document.createElement('pre');
			oldPre.toggleAttribute('noHopscotch',true);
			oldPre.textContent = code;
			oldCode.appendChild(oldPre);
			out.appendChild(oldCode);
		/*try {html2canvas(out).then((outt) => {
			
			
			outt.appendChild(oldPre);
			console.log(oldCode);
			output.parentElement.replaceChild(outt,output);
		});} catch(error)*/output.parentElement.replaceChild(out,output)
	}
}
}
});