import { DateTime } from 'luxon'
import { ModuleInstance } from './main.js'
import { GetNumberOfWeeksInMonth, GetRezonedDateTime, GetWeekOccurrence } from './extensions/functions.js'
import { CompanionVariableValues } from '@companion-module/base'
import { FormatTokens } from './extensions/formats.js'
import {
	VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED,
	VAR_DAY_OF_WEEK_OCCURENCE_UNPADDED,
	VAR_DAYS_IN_MONTH,
} from './constants/variables.js'

export class DateTimeState {
	public now: DateTime
	public variables: CompanionVariableValues = {}

	constructor(self: ModuleInstance) {
		this.now = GetRezonedDateTime(self, DateTime.now())

		// Pre-defined format variables
		for (const token of FormatTokens) {
			this.variables[token.variableId] = this.now.toFormat(token.value)
		}

		// Custom variables
		this.variables[VAR_DAY_OF_WEEK_OCCURENCE_UNPADDED] = GetWeekOccurrence(this.now)
		this.variables[VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED] = GetNumberOfWeeksInMonth(this.now)
		this.variables[VAR_DAYS_IN_MONTH] = this.now.daysInMonth
	}
}
