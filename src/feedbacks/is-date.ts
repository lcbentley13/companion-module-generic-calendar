import {
	CompanionFeedbackContext,
	CompanionFeedbackInfo,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { DateTime } from 'luxon'

export function isDateOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'date',
			type: 'textinput',
			label: 'Date (YYYY-MM-DD)',
			default: self.state.now.toISODate() ?? undefined,
		},
	]
}

export async function isDateCallback(
	self: ModuleInstance,
	feedback: CompanionFeedbackInfo,
	context: CompanionFeedbackContext,
): Promise<boolean> {
	const targetDateString = await context.parseVariablesInString(feedback.options.date as string)
	const targetDate = DateTime.fromFormat(targetDateString, 'yyyy-MM-dd', {
		zone: self.state.now.zone,
	}).startOf('day')
	const currentDate = self.state.now.startOf('day')
	return currentDate.equals(targetDate)
}
