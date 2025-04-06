import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { GetNumberOfWeeksInMonth, GetRezonedDateTime, GetWeekOccurrence } from './luxon-extensions/functions.js'
import { FormatTokens } from './luxon-extensions/formats.js'
import {
	VAR_DAY_OF_WEEK_OCCURENCE_UNPADDED,
	VAR_DAY_OF_WEEK_OCCURENCE_PADDED_2,
	VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED,
	VAR_DAY_OF_WEEK_OCCURENCE_COUNT_PADDED_2,
	VAR_DAYS_IN_MONTH,
} from './constants/variables.js'

export function DefineVariables(self: ModuleInstance): void {
	let variables: CompanionVariableDefinition[] = []

	// Add all built-in luxon format tokens as variables
	for (const token of FormatTokens) {
		variables.push({
			variableId: token.variableId,
			name: token.description,
		})
	}

	// Custom variables
	variables = variables.concat(
		{
			variableId: VAR_DAY_OF_WEEK_OCCURENCE_UNPADDED,
			name: 'occurrence of the current day of the week in the month, unpadded',
		},
		{
			variableId: VAR_DAY_OF_WEEK_OCCURENCE_PADDED_2,
			name: 'occurrence of the current day of the week in the month, padded to 2',
		},
		{
			variableId: VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED,
			name: 'number of times the current day of the week occurs in the month, unpadded',
		},
		{
			variableId: VAR_DAY_OF_WEEK_OCCURENCE_COUNT_PADDED_2,
			name: 'number of times the current day of the week occurs in the month, padded to 2',
		},
		{
			variableId: VAR_DAYS_IN_MONTH,
			name: 'days in the month',
		},
	)

	self.setVariableDefinitions(variables)
}

export function UpdateVariableValues(self: ModuleInstance): void {
	const now = GetRezonedDateTime(self)
	const variableValues: CompanionVariableValues = {}

	// Set all built-in luxon format token values
	for (const token of FormatTokens) {
		variableValues[token.variableId] = now.toFormat(token.value) // Use `variableId` as the key
	}

	// Custom variables
	const weekOccurrence = GetWeekOccurrence(now)
	const weeksInMonth = GetNumberOfWeeksInMonth(now)

	variableValues[VAR_DAY_OF_WEEK_OCCURENCE_UNPADDED] = weekOccurrence
	variableValues[VAR_DAY_OF_WEEK_OCCURENCE_PADDED_2] = weekOccurrence.toString().padStart(2, '0')
	variableValues[VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED] = weeksInMonth
	variableValues[VAR_DAY_OF_WEEK_OCCURENCE_COUNT_PADDED_2] = weeksInMonth.toString().padStart(2, '0')
	variableValues[VAR_DAYS_IN_MONTH] = now.daysInMonth

	self.setVariableValues(variableValues)
}
