import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { VAR_QUARTER_UNPADDED } from '../constants/variables.js'

const quarters: { [id: string]: number } = {
	first: 1,
	second: 2,
	third: 3,
	fourth: 4,
}

export const isQuarterOptions: SomeCompanionFeedbackInputField[] = [
	{
		id: 'quarter',
		type: 'dropdown',
		label: 'Quarter',
		choices: [
			{ id: 'first', label: 'First' },
			{ id: 'second', label: 'Second' },
			{ id: 'third', label: 'Third' },
			{ id: 'fourth', label: 'Fourth' },
		],
		default: 'first',
	},
]

export function isQuarterCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetQuarter = Number(quarters[feedback.options.quarter as string])
	const currentQuarter = Number(self.getVariableValue(VAR_QUARTER_UNPADDED))
	return currentQuarter === targetQuarter
}
