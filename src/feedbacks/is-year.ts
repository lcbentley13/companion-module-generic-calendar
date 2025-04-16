import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export function isYearOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'year',
			type: 'number',
			label: 'Year',
			default: self.state.now.year,
			min: 1970,
			max: 2100,
			range: false,
		},
	]
}

export function isYearCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetYear = feedback.options.year as number
	const currentYear = self.state.now.year
	return currentYear === targetYear
}
