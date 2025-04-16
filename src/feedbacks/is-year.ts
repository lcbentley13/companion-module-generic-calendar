import {
	CompanionFeedbackContext,
	CompanionFeedbackInfo,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export function isYearOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'year',
			type: 'textinput',
			label: 'Year',
			default: self.state.now.year.toString(),
		},
	]
}

export async function isYearCallback(
	self: ModuleInstance,
	feedback: CompanionFeedbackInfo,
	context: CompanionFeedbackContext,
): Promise<boolean> {
	const targetYear = Number(await context.parseVariablesInString(feedback.options.year as string))
	const currentYear = self.state.now.year
	return currentYear === targetYear
}
