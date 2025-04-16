import { combineRgb } from '@companion-module/base'
import { isDayOfWeekOccurenceCallback, isDayOfWeekOccurenceOptions } from './feedbacks/is-day-of-week-occurence.js'
import { isDayOfWeekOptions, isDayOfWeekCallback } from './feedbacks/is-day-of-week.js'
import { isHourCallback, isHourOptions } from './feedbacks/is-hour.js'
import { isLeapYearCallback, isLeapYearOptions } from './feedbacks/is-leap-year.js'
import { isMeridiemCallback, isMeridiemOptions } from './feedbacks/is-meridiem.js'
import { isMonthCallback, isMonthOptions } from './feedbacks/is-month.js'
import { isQuarterCallback, isQuarterOptions } from './feedbacks/is-quarter.js'
import { isYearCallback, isYearOptions } from './feedbacks/is-year.js'
import type { ModuleInstance } from './main.js'
import { isMinuteCallback, isMinuteOptions } from './feedbacks/is-minute.js'
import { isSecondCallback, isSecondOptions } from './feedbacks/is-second.js'
import { isDateCallback, isDateOptions } from './feedbacks/is-date.js'
import { isTimeCallback, isTimeOptions } from './feedbacks/is-time.js'

export function DefineFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		IsDate: {
			name: 'Is Date',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isDateOptions(self),
			callback: (feedback) => isDateCallback(self, feedback),
		},
		IsTime: {
			name: 'Is Time',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isTimeOptions(self),
			callback: (feedback) => isTimeCallback(self, feedback),
		},
		IsLeapYear: {
			name: 'Is Leap Year',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isLeapYearOptions,
			callback: () => isLeapYearCallback(self),
		},
		IsYear: {
			name: 'Is Year',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isYearOptions(self),
			callback: (feedback) => isYearCallback(self, feedback),
		},
		IsQuarter: {
			name: 'Is Quarter',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isQuarterOptions,
			callback: (feedback) => isQuarterCallback(self, feedback),
		},
		IsMonth: {
			name: 'Is Month',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isMonthOptions,
			callback: (feedback) => isMonthCallback(self, feedback),
		},
		IsMeridiem: {
			name: 'Is Meridiem',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isMeridiemOptions,
			callback: (feedback) => isMeridiemCallback(self, feedback),
		},
		IsHour: {
			name: 'Is Hour',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isHourOptions(self),
			callback: (feedback) => isHourCallback(self, feedback),
		},
		IsMinute: {
			name: 'Is Minute',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isMinuteOptions(self),
			callback: (feedback) => isMinuteCallback(self, feedback),
		},
		IsSecond: {
			name: 'Is Second',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isSecondOptions(self),
			callback: (feedback) => isSecondCallback(self, feedback),
		},
		IsDayOfWeek: {
			name: 'Is Day of the Week',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isDayOfWeekOptions,
			callback: (feedback) => isDayOfWeekCallback(self, feedback),
		},
		IsDayOfWeekOccurrence: {
			name: 'Is Day of the Week Occurrence',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 153, 0),
				color: combineRgb(255, 255, 255),
			},
			options: isDayOfWeekOccurenceOptions,
			callback: (feedback) => isDayOfWeekOccurenceCallback(self, feedback),
		},
	})
}
