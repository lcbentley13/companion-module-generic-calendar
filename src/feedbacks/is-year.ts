import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { VAR_YEAR_PADDED_4 } from '../constants/variables.js'

export function isYearOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'year',
			type: 'number',
			label: 'Year',
			default: self.now.year,
			min: 1970,
			max: 2100,
			range: false,
		},
	]
}

export function isYearCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetYear = Number(feedback.options.year)
	const currentYear = Number(self.getVariableValue(VAR_YEAR_PADDED_4))
	return currentYear === targetYear
}
