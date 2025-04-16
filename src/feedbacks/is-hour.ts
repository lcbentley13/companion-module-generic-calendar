import {
	CompanionFeedbackContext,
	CompanionFeedbackInfo,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export function isHourOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'hour',
			type: 'textinput',
			label: 'Hour in 24-hour format (0-23)',
			default: self.state.now.hour.toString(),
		},
	]
}

export async function isHourCallback(
	self: ModuleInstance,
	feedback: CompanionFeedbackInfo,
	context: CompanionFeedbackContext,
): Promise<boolean> {
	const targetHour = Number(await context.parseVariablesInString(feedback.options.hour as string))
	const currentHour = self.state.now.hour
	return currentHour === targetHour
}
