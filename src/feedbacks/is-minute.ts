import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export function isMinuteOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'minute',
			type: 'number',
			label: 'Minute (0-59)',
			default: self.state.now.minute,
			min: 0,
			max: 59,
			range: false,
		},
	]
}

export function isMinuteCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetMinute = feedback.options.minute as number
	const currentMinute = self.state.now.minute
	return currentMinute === targetMinute
}
