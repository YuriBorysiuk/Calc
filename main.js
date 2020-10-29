
const COST = 20

window.addEventListener('load', init)

function init() {
	
	const inputTankVolume = document.querySelector('.tank-volume-class .parameter__header input')
	const rangeTankVolume = document.querySelector('.tank-volume-class .parameter__slider input')
	
	const inputTankLevel = document.querySelector('.tank-level-class .parameter__header input')
	const rangeTankLevel = document.querySelector('.tank-level-class .parameter__slider input')

	const inputAmountGas = document.querySelector('.amount-gas-class .parameter__header input')
	const rangeAmountGas = document.querySelector('.amount-gas-class .parameter__slider input')
	
	const inputDistance = document.querySelector('.distance-class .parameter__header input')
	const rangeDistance = document.querySelector('.distance-class .parameter__slider input')

	function setAttributes(el, options) {
		Object.keys(options).forEach(function(attr) {
			el.setAttribute(attr, options[attr]);
		})
	}

	setAttributes(inputTankVolume, {'value': 2000})
	setAttributes(rangeTankVolume, {'min': 2000, 'max': 20000, 'step': 500, 'type': 'range'})

	setAttributes(inputTankLevel, {'value': 0})
	setAttributes(rangeTankLevel, {'value': 0, 'min': 0, 'max': 85, 'type': 'range'})

	setAttributes(rangeAmountGas, {'min': 0, 'type': 'range'})

	setAttributes(inputDistance, {'value': 0})
	setAttributes(rangeDistance, {'value': 0, 'min': 0, 'max': 2000, 'type': 'range'})
	
	const tankVolume = document.getElementById('tank-volume').value
	const tankLevel = document.getElementById('tank-level').value
	const calculatedValue = tankVolume * tankLevel / 100
	
	rangeAmountGas.setAttribute('max', calculatedValue)
	inputAmountGas.value = calculatedValue
	rangeAmountGas.value = calculatedValue
}

class CalcInput {
	constructor(selector, specificHandler, addValue = 1) {
		this.input = document.querySelector(`${selector} .parameter__header input`)
		this.range = document.querySelector(`${selector} .parameter__slider input`)
		this.minusButtton = document.querySelector(`${selector} .parameter__header .btn-input__left`)
		this.plusButton = document.querySelector(`${selector} .parameter__header .btn-input__right`)
		this.addValue = addValue
		
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleMinusClick = this.handleMinusClick.bind(this)
		this.handlePlusClick = this.handlePlusClick.bind(this)
		this.handleRangeChange = this.handleRangeChange.bind(this)

		this.input.addEventListener('input', this.handleInputChange)
		this.range.addEventListener('input', this.handleRangeChange)
		this.minusButtton.addEventListener('click', this.handleMinusClick)
		this.plusButton.addEventListener('click', this.handlePlusClick)
		if (specificHandler) {
			this.input.addEventListener('input', specificHandler)
			this.range.addEventListener('change', specificHandler)
			this.minusButtton.addEventListener('click', specificHandler)
			this.plusButton.addEventListener('click', specificHandler)
		}
	}

	handleRangeChange() {
		this.input.value = this.range.value;
	}

	handleMinusClick() {
		if (parseInt(this.input.value) > this.range.getAttribute('min')) {
			this.input.value = parseInt(this.input.value) - this.addValue
			this.range.value = this.input.value
		}
	}

	handlePlusClick() {
		this.input.value = parseInt(this.input.value) + this.addValue
		this.range.value = this.input.value
		if (this.range.getAttribute('max') && parseInt(this.input.value) > this.range.getAttribute('max')) {
			this.input.value = this.range.getAttribute('max')
			this.range.value = this.range.getAttribute('max')
		}
	}
	
	handleInputChange() {
		const value = parseInt(this.input.value)
		if (value && value >= 0 && value <= this.range.getAttribute('max')) {
			this.range.value = value
			this.input.classList.remove('error')
		} else {
			this.input.classList.add('error')
		}
	}
}

function calculateGasCharged() {
	const inputAmountGas = document.querySelector('.amount-gas-class .parameter__header input')
	const rangeAmountGas = document.querySelector('.amount-gas-class .parameter__slider input')
	const tankVolume = document.getElementById('tank-volume').value
	const tankLevel = document.getElementById('tank-level').value
	const calculatedValue = tankVolume * tankLevel / 100

	rangeAmountGas.setAttribute('max', calculatedValue)
	rangeAmountGas.value = calculatedValue
	inputAmountGas.value = calculatedValue
}

function calculateTankLevel() {
	const tankVolume = document.getElementById('tank-volume')
	const tankLevel = document.getElementById('tank-level')
	const tankLevelRange = document.getElementById('tank-level-range')
	const inputAmountGas = document.getElementById('amount-gas')
	const rangeAmountGas = document.getElementById('amount-gas-range')

	tankLevel.value =(parseInt(inputAmountGas.value) / parseInt(tankVolume.value) * 100).toFixed(2)
	tankLevelRange.value = parseInt(inputAmountGas.value) / parseInt(tankVolume.value) * 100
	
	const calculatedValue = parseInt(tankVolume.value) * parseInt(tankLevel.value) / 100
	
	rangeAmountGas.setAttribute('max', calculatedValue)
}

function calculateDistance() {
	const distance = document.getElementById('distance').value
	const distanceFirstLevel = 500
	const distanceSecondLevel = 1000
	let coeffDistance = 0
	if (distance <= distanceFirstLevel) {
		coeffDistance = 1
	} else if (distance <= distanceSecondLevel && distance >= distanceFirstLevel) {
		coeffDistance = 1.5
	} else {
		coeffDistance = 2
	}
	return coeffDistance 
}

function calculateTotalCost () {
	const inputTotalCost = document.querySelector('.result-class .result__input input')
	const inputAmountGas = document.getElementById('amount-gas')
	const coeffDistance = calculateDistance()
		
	inputTotalCost.value = COST * inputAmountGas.value * coeffDistance
}

new CalcInput('.tank-volume-class', null, 500)
new CalcInput('.tank-level-class', calculateGasCharged)
new CalcInput('.amount-gas-class', calculateTankLevel)
new CalcInput('.distance-class', calculateTotalCost)

