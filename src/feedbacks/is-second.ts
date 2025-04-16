import {
	CompanionFeedbackContext,
	CompanionFeedbackInfo,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export function isSecondOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'second',
			type: 'textinput',
			label: 'Second (0-59)',
			default: self.state.now.second.toString(),
		},
	]
}

export async function isSecondCallback(
	self: ModuleInstance,
	feedback: CompanionFeedbackInfo,
	context: CompanionFeedbackContext,
): Promise<boolean> {
	const targetSecond = Number(await context.parseVariablesInString(feedback.options.second as string))
	const currentSecond = self.state.now.second
	return currentSecond === targetSecond
}
