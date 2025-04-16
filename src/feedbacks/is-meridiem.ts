import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { VAR_MERIDIEM } from '../constants/variables.js'

export const isMeridiemOptions: SomeCompanionFeedbackInputField[] = [
	{
		id: 'meridiem',
		type: 'dropdown',
		label: 'Meridiem',
		choices: [
			{ id: 'AM', label: 'AM' },
			{ id: 'PM', label: 'PM' },
		],
		default: 'AM',
	},
]

export function isMeridiemCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetMeridiem = feedback.options.meridiem as string
	const currentMeridiem = self.state.variables[VAR_MERIDIEM] as string
	return currentMeridiem === targetMeridiem
}
