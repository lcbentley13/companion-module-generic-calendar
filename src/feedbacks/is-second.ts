import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export function isSecondOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'second',
			type: 'number',
			label: 'Second (0-59)',
			default: self.state.now.second,
			min: 0,
			max: 59,
			range: false,
		},
	]
}

export function isSecondCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetSecond = feedback.options.second as number
	const currentSecond = self.state.now.second
	return currentSecond === targetSecond
}
