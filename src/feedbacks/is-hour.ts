import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { VAR_HOUR_24_UNPADDED } from '../constants/variables.js'

export function isHourOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'hour',
			type: 'number',
			label: 'Hour in 24-hour format (0-23)',
			default: self.now.hour,
			min: 0,
			max: 23,
			range: false,
		},
	]
}

export function isHourCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetHour = Number(feedback.options.hour)
	const currentHour = Number(self.getVariableValue(VAR_HOUR_24_UNPADDED))
	return currentHour === targetHour
}
