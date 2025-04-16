import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import {
	VAR_DAY_OF_WEEK_OCCURENCE_UNPADDED,
	VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED,
	VAR_DAY_OF_WEEK_NUMBER,
} from '../constants/variables.js'
import { ModuleInstance } from '../main.js'

const occurrences: { [id: string]: number } = {
	first: 1,
	second: 2,
	third: 3,
	fourth: 4,
	fifth: 5,
	nextToLast: -2,
	last: -1,
}

const weekdays: { [id: string]: number } = {
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
	sunday: 7,
}

export const isDayOfWeekOccurenceOptions: SomeCompanionFeedbackInputField[] = [
	{
		id: 'occurrence',
		type: 'dropdown',
		label: 'Occurrence',
		choices: [
			{ id: 'first', label: 'First' },
			{ id: 'second', label: 'Second' },
			{ id: 'third', label: 'Third' },
			{ id: 'fourth', label: 'Fourth' },
			{ id: 'fifth', label: 'Fifth' },
			{ id: 'nextToLast', label: 'Next To Last' },
			{ id: 'last', label: 'Last' },
		],
		default: 'first',
	},
	{
		id: 'dayOfWeek',
		type: 'dropdown',
		label: 'Day of the Week',
		choices: [
			{ id: 'monday', label: 'Monday' },
			{ id: 'tuesday', label: 'Tuesday' },
			{ id: 'wednesday', label: 'Wednesday' },
			{ id: 'thursday', label: 'Thursday' },
			{ id: 'friday', label: 'Friday' },
			{ id: 'saturday', label: 'Saturday' },
			{ id: 'sunday', label: 'Sunday' },
		],
		default: 'monday',
	},
]

export function isDayOfWeekOccurenceCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetOccurrence = occurrences[feedback.options.occurrence as string]
	const targetDayOfWeek = weekdays[feedback.options.dayOfWeek as string]

	const currentOccurrence = Number(self.state.variables[VAR_DAY_OF_WEEK_OCCURENCE_UNPADDED])
	const occurrencesInMonth = Number(self.state.variables[VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED])
	const currentDayOfWeek = Number(self.state.variables[VAR_DAY_OF_WEEK_NUMBER])

	if (currentDayOfWeek !== targetDayOfWeek) {
		return false
	} else if (targetOccurrence > 0) {
		return currentOccurrence === targetOccurrence
	} else {
		return currentOccurrence === targetOccurrence + occurrencesInMonth + 1
	}
}
