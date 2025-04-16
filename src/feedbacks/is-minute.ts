import {
	CompanionFeedbackContext,
	CompanionFeedbackInfo,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export function isMinuteOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'minute',
			type: 'textinput',
			label: 'Minute (0-59)',
			default: self.state.now.minute.toString(),
		},
	]
}

export async function isMinuteCallback(
	self: ModuleInstance,
	feedback: CompanionFeedbackInfo,
	context: CompanionFeedbackContext,
): Promise<boolean> {
	const targetMinute = Number(await context.parseVariablesInString(feedback.options.minute as string))
	const currentMinute = self.state.now.minute
	return currentMinute === targetMinute
}
