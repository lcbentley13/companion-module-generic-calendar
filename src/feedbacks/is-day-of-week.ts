import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'

const weekdays: { [id: string]: number } = {
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
	sunday: 7,
}

export const isDayOfWeekOptions: SomeCompanionFeedbackInputField[] = [
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

export function isDayOfWeekCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetDayOfWeek = weekdays[feedback.options.dayOfWeek as string]
	const currentDayOfWeek = self.state.now.weekday
	return currentDayOfWeek === targetDayOfWeek
}
