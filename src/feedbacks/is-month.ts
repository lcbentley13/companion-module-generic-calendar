import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { VAR_MONTH_UNPADDED } from '../constants/variables.js'

const months: { [id: string]: number } = {
	january: 1,
	february: 2,
	march: 3,
	april: 4,
	may: 5,
	june: 6,
	july: 7,
	august: 8,
	september: 9,
	october: 10,
	november: 11,
	december: 12,
}

export const isMonthOptions: SomeCompanionFeedbackInputField[] = [
	{
		id: 'month',
		type: 'dropdown',
		label: 'Month',
		choices: [
			{ id: 'january', label: 'January' },
			{ id: 'february', label: 'February' },
			{ id: 'march', label: 'March' },
			{ id: 'april', label: 'April' },
			{ id: 'may', label: 'May' },
			{ id: 'june', label: 'June' },
			{ id: 'july', label: 'July' },
			{ id: 'august', label: 'August' },
			{ id: 'september', label: 'September' },
			{ id: 'october', label: 'October' },
			{ id: 'november', label: 'November' },
			{ id: 'december', label: 'December' },
		],
		default: 'january',
	},
]

export function isMonthCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	const targetMonth = Number(months[feedback.options.month as string])
	const currentMonth = self.getVariableValue(VAR_MONTH_UNPADDED)
	return currentMonth === targetMonth
}
