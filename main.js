/* Знаяения из текстовых импутов */

window.addEventListener('load', init)

function init() {
	//todo fetch params from admin

	
	const inputTankVolume = document.querySelector('.tank-volume-class .parameter__header input')
	const rangeTankVolume = document.querySelector('.tank-volume-class .parameter__slider input')
	
	const inputTankLevel = document.querySelector('.tank-level-class .parameter__header input')
	const rangeTankLevel = document.querySelector('.tank-level-class .parameter__slider input')

	const inputAmountGas = document.querySelector('.amount-gas-class .parameter__header input')
	const rangeAmountGas = document.querySelector('.amount-gas-class .parameter__slider input')
	
	const inputDistance = document.querySelector('.distance-class .parameter__header input')
	const rangeDistance = document.querySelector('.distance-class .parameter__slider input')

	inputTankVolume.setAttribute('value', 2000)
	rangeTankVolume.setAttribute('min', 2000)
	rangeTankVolume.setAttribute('max', 20000)
	rangeTankVolume.setAttribute('step', 500)
	rangeTankVolume.setAttribute('type','range')

	inputTankLevel.setAttribute('value', 0)
	rangeTankLevel.setAttribute('min', 0)
	rangeTankLevel.setAttribute('max', 85)
	rangeTankLevel.setAttribute('type', 'range')

	rangeAmountGas.setAttribute('min', 0)
	rangeAmountGas.setAttribute('type', 'range')

	inputDistance.setAttribute('value', 0)
	rangeDistance.setAttribute('min', 0)
	rangeDistance.setAttribute('max', 2000)
	rangeDistance.setAttribute('type', 'range')

	const tankVolume = document.getElementById('tank-volume').value
	const tankLevel = document.getElementById('tank-level').value
	const calculatedValue = tankVolume * tankLevel / 100

	rangeAmountGas.setAttribute('max', calculatedValue)
	inputAmountGas.value = calculatedValue
	rangeAmountGas.value = calculatedValue

}

class CalcInput {
	constructor(selector, specificHandler) {
		this.input = document.querySelector(`${selector} .parameter__header input`)
		this.range = document.querySelector(`${selector} .parameter__slider input`)
		this.minusButtton = document.querySelector(`${selector} .parameter__header .btn-input__left`)
		this.plusButton = document.querySelector(`${selector} .parameter__header .btn-input__right`)

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
		if (parseInt(this.input.value) > 0) {
			this.input.value = parseInt(this.input.value) - 1
			this.range.value = this.input.value
		}
	}

	handlePlusClick() {
		this.input.value = parseInt(this.input.value) + 1
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

new CalcInput('.tank-volume-class')
new CalcInput('.tank-level-class', calculateGasCharged)
new CalcInput('.amount-gas-class', calculateTankLevel)
new CalcInput('.distance-class')
