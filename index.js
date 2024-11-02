// CSS Unit Converter
const select = {
	id: (selector, scope = document) => scope.getElementById(selector),
	class: (selector, scope = document) => scope.querySelector(selector),
	classAll: (selector, scope = document) => scope.querySelectorAll(selector),
};

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

String.prototype.removeZero = function () {
	return this.replace(/(\.\d*?[1-9])0+$/m, '$1').replace(
		/\.0$|\.00$|\.000$/m,
		''
	);
};

function isOpenSidebar(target) {
	try {
		const element = select.class(target);
		element.classList.toggle('opened');
	} catch (error) {
		console.error(error);
	}
}

const pxToRem = (size, dpi = 16) => size / dpi + 'rem';
const remToPx = (size, dpi = 16) => size * dpi + 'px';
const pxToEm  = (size, dpi = 16) => size / dpi + 'em';
const emToPx  = (size, dpi = 16) => size * dpi + 'px';
const pxToCm  = (size, dpi = 96) => ((size / dpi) * 2.54).toFixed(2).removeZero() + 'cm';
const cmToPx  = (size, dpi = 96) => ((size * dpi) / 2.54).toFixed(0).removeZero() + 'px';
const inchesToPx = (size, dpi = 96) => (size * dpi).toFixed(1).removeZero() + 'px';

const pxToInches = (size, dpi = 96) => {
	if (size === 0) return '0in';
	if (size < 96) return (size / dpi).toFixed(3).removeZero() + 'in';
	return Math.floor((size / dpi) * 100) / 100 + 'in';
};

function isSelectOption(selectorID, unitClass) {
	const unit    = select.class(unitClass);
	const ppi     = select.class('.input-ppi');
	const dataPPI = select.id('data-ppi');

	select.id(selectorID).addEventListener('change', (event) => {
		if (event.target.value === 'px-to-rem') {
			unit.innerText = 'px';
			dataPPI.setAttribute('value', 16);
			ppi.style.display = 'none';
		}

		if (event.target.value === 'rem-to-px') {
			unit.innerText = 'rem';
			dataPPI.setAttribute('value', 16);
			ppi.style.display = 'none';
		}

		if (event.target.value === 'px-to-em') {
			unit.innerText = 'px';
			dataPPI.setAttribute('value', 16);
			ppi.style.display = 'none';
		}

		if (event.target.value === 'em-to-px') {
			unit.innerText = 'em';
			dataPPI.setAttribute('value', 16);
			ppi.style.display = 'none';
		}

		if (event.target.value === 'px-to-cm') {
			unit.innerText = 'px';
			dataPPI.setAttribute('value', 96);
			ppi.style.display = '';
		}

		if (event.target.value === 'cm-to-px') {
			unit.innerText = 'cm';
			dataPPI.setAttribute('value', 96);
			ppi.style.display = '';
		}

		if (event.target.value === 'px-to-in') {
			unit.innerText = 'px';
			dataPPI.setAttribute('value', 96);
			ppi.style.display = '';
		}

		if (event.target.value === 'in-to-px') {
			unit.innerText = 'in';
			dataPPI.setAttribute('value', 96);
			ppi.style.display = '';
		}
	});
}

isSelectOption('select-option', '.unit');
isSelectOption('select-option-table', '.table-unit');

function isTable(setUnitTo, length) {
	let convert, element = '';

	const message = {
		1: 'The unit has not been selected.',
		2: 'The input field is empty.',
	};

	const error = (text) => `<div class="error-table">${text}</div>`;

	if (!setUnitTo || !length) {
		select.class('.result-table-copy').style.display = 'none';
		return !setUnitTo ? error(message[1]) : error(message[2]);
	}
	select.class('.result-table-copy').style.display = '';

	if (setUnitTo === 'px-to-rem') {
		convert = (len) => pxToRem(len);
	}

	if (setUnitTo === 'rem-to-px') {
		convert = (len) => remToPx(len);
	}

	if (setUnitTo === 'px-to-em') {
		convert = (len) => pxToEm(len);
	}

	if (setUnitTo === 'em-to-px') {
		convert = (len) => emToPx(len);
	}

	if (setUnitTo === 'px-to-cm') {
		convert = (len) => pxToCm(len);
	}

	if (setUnitTo === 'cm-to-px') {
		convert = (len) => cmToPx(len);
	}

	if (setUnitTo === 'px-to-in') {
		convert = (len) => pxToInches(len);
	}

	if (setUnitTo === 'in-to-px') {
		convert = (len) => inchesToPx(len);
	}

	const unit   = setUnitTo.split('-')[0];
	const unitTo = setUnitTo.split('-')[2];
	const count  = length;

	element += `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">${unit.toUpperCase()}</th>
                    <th scope="col">${unitTo.toUpperCase()}</th>
                </tr>
            </thead>
            <tbody>
    `;

	for (let key = 1; key <= count; key++) {
		element += `
            <tr>
                <td>${key + unit}</td>
                <td>${convert(key)}</td>
            </tr>
        `;
	}

	element += `</tbody></table>`;

	return element;
}

select.id('convert').addEventListener('click', function () {
	const data = select.id('data-value');
	const dataPPI = select.id('data-ppi');
	const resultCopy = select.class('.result-copy');

	if (select.id('select-option').value === 'px-to-rem') {
		select.id('result').innerText = pxToRem(data.value);
		resultCopy.setAttribute('data-value', pxToRem(data.value));
	}

	if (select.id('select-option').value === 'rem-to-px') {
		select.id('result').innerText = remToPx(data.value);
		resultCopy.setAttribute('data-value', remToPx(data.value));
	}

	if (select.id('select-option').value === 'px-to-em') {
		select.id('result').innerText = pxToEm(data.value);
		resultCopy.setAttribute('data-value', pxToEm(data.value));
	}

	if (select.id('select-option').value === 'em-to-px') {
		select.id('result').innerText = emToPx(data.value);
		resultCopy.setAttribute('data-value', emToPx(data.value));
	}

	if (select.id('select-option').value === 'px-to-cm') {
		select.id('result').innerHTML = pxToCm(data.value, dataPPI.value);
		resultCopy.setAttribute('data-value', pxToCm(data.value, dataPPI.value));
	}

	if (select.id('select-option').value === 'cm-to-px') {
		select.id('result').innerText = cmToPx(data.value, dataPPI.value);
		resultCopy.setAttribute('data-value', cmToPx(data.value, dataPPI.value));
	}

	if (select.id('select-option').value === 'px-to-in') {
		select.id('result').innerHTML = pxToInches(data.value, dataPPI.value);
		resultCopy.setAttribute('data-value', pxToInches(data.value, dataPPI.value));
	}

	if (select.id('select-option').value === 'in-to-px') {
		select.id('result').innerText = inchesToPx(data.value, dataPPI.value);
		resultCopy.setAttribute('data-value', inchesToPx(data.value, dataPPI.value));
	}
});

select.id('table-px-rem').innerHTML = isTable('px-to-rem', 16);
select.id('table-rem-px').innerHTML = isTable('rem-to-px', 16);
select.id('table-in-px').innerHTML  = isTable('in-to-px',  16);
select.id('table-px-in').innerHTML  = isTable('px-to-in',  16);
select.id('table-cm-px').innerHTML  = isTable('cm-to-px',  16);
select.id('table-px-cm').innerHTML  = isTable('px-to-cm',  16);

select.id('isClickRun').addEventListener('click', function () {
	// Sidebar Table
	const option = select.id('select-option-table');
	const input = select.id('data-table');

	input.setAttribute('value', input.value);
	select.class('.result-table').innerHTML = isTable(option.value, input.value);
});

async function alertMessageRemove(alertMessage) {
	await sleep(2000);
	alertMessage.style.transition = 'all 0.3s ease-out 0s';
	alertMessage.style.right = '-200px';
	await sleep(2500);
	document.body.removeChild(alertMessage);
}

function copy(selectClass, message = 'Copied!', isInline = true) {
	select.class(selectClass).addEventListener('click', function () {
		let getDataTable = '';

		if (isInline === false) {
			select.classAll('.result-table tbody').forEach((result) => {
				getDataTable += result.innerText;
			});
		}

		const copyText = isInline ? this.dataset.value : getDataTable;
		const textArea = document.createElement('textarea');

		textArea.value = copyText;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
		// alert('Copied: ' + copyText);

		const alertMessage = document.createElement('div');
		alertMessage.className = 'copied-message';
		alertMessage.textContent = message;
		alertMessage.style.position = 'fixed';
		alertMessage.style.top = '10px';
		alertMessage.style.right = '10px';
		alertMessage.style.backgroundColor = '#008080';
		alertMessage.style.color = 'white';
		alertMessage.style.fontWeight = '500';
		alertMessage.style.padding = '5px';
		alertMessage.style.borderRadius = '5px';
		document.body.appendChild(alertMessage);
		alertMessageRemove(alertMessage);
	});
}

copy('.result-copy');
copy('.result-table-copy', 'All data is copied!', false);
