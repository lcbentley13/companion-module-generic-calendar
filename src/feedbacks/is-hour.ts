import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export function isHourOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'hour',
			type: 'number',
			label: 'Hour in 24-hour format (0-23)',
			default: self.state.now.hour,
			min: 0,
			max: 23,
			range: false,
		},
	]
}

export function isHourCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetHour = feedback.options.hour as number
	const currentHour = self.state.now.hour
	return currentHour === targetHour
}
