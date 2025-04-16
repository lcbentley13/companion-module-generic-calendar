import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { DateTime } from 'luxon'

export function isDateOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'date',
			type: 'textinput',
			label: 'Date (YYYY-MM-DD)',
			default: self.state.now.toISODate() ?? undefined,
			regex: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
		},
	]
}

export function isDateCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetDate = DateTime.fromFormat(feedback.options.date as string, 'yyyy-MM-dd', {
		zone: self.state.now.zone,
	}).startOf('day')
	const currentDate = self.state.now.startOf('day')
	return currentDate.equals(targetDate)
}
