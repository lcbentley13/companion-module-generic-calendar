import { isDayOfWeekOccurenceCallback, isDayOfWeekOccurenceOptions } from './feedbacks/is-day-of-week-occurence.js'
import { isDayOfWeekOptions, isDayOfWeekCallback } from './feedbacks/is-day-of-week.js'
import { isHourCallback, isHourOptions } from './feedbacks/is-hour.js'
import { isLeapYearCallback, isLeapYearOptions } from './feedbacks/is-leap-year.js'
import { isMeridiemCallback, isMeridiemOptions } from './feedbacks/is-meridiem.js'
import { isMonthCallback, isMonthOptions } from './feedbacks/is-month.js'
import { isQuarterCallback, isQuarterOptions } from './feedbacks/is-quarter.js'
import { isYearCallback, isYearOptions } from './feedbacks/is-year.js'
import type { ModuleInstance } from './main.js'

export function DefineFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		IsLeapYear: {
			name: 'Is Leap Year',
			type: 'boolean',
			defaultStyle: {},
			options: isLeapYearOptions,
			callback: () => isLeapYearCallback(self),
		},
		IsYear: {
			name: 'Is Year',
			type: 'boolean',
			defaultStyle: {},
			options: isYearOptions(self),
			callback: (feedback) => isYearCallback(self, feedback),
		},
		IsQuarter: {
			name: 'Is Quarter',
			type: 'boolean',
			defaultStyle: {},
			options: isQuarterOptions,
			callback: (feedback) => isQuarterCallback(self, feedback),
		},
		IsMonth: {
			name: 'Is Month',
			type: 'boolean',
			defaultStyle: {},
			options: isMonthOptions,
			callback: (feedback) => isMonthCallback(self, feedback),
		},
		IsMeridiem: {
			name: 'Is Meridiem',
			type: 'boolean',
			defaultStyle: {},
			options: isMeridiemOptions,
			callback: (feedback) => isMeridiemCallback(self, feedback),
		},
		IsHour: {
			name: 'Is Hour',
			type: 'boolean',
			defaultStyle: {},
			options: isHourOptions(self),
			callback: (feedback) => isHourCallback(self, feedback),
		},
		IsDayOfWeek: {
			name: 'Is Day of the Week',
			type: 'boolean',
			defaultStyle: {},
			options: isDayOfWeekOptions,
			callback: (feedback) => isDayOfWeekCallback(self, feedback),
		},
		IsDayOfWeekOccurrence: {
			name: 'Is Day of the Week Occurrence',
			type: 'boolean',
			defaultStyle: {},
			options: isDayOfWeekOccurenceOptions,
			callback: (feedback) => isDayOfWeekOccurenceCallback(self, feedback),
		},
	})
}
