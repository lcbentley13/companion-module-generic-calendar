import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { GetNumberOfWeeksInMonth, GetRezonedDateTime, GetWeekOccurrence } from './luxon-extensions/functions.js'
import { FormatTokens } from './luxon-extensions/tokens.js'

export function DefineVariables(self: ModuleInstance): void {
	let variables: CompanionVariableDefinition[] = []

	// Add all built-in luxon format tokens as variables
	for (const token of FormatTokens) {
		variables.push({
			variableId: token.value,
			name: token.description,
		})
	}

	// Custom variables
	variables = variables.concat(
		{ variableId: 'w', name: 'occurrence of the current day of the week in the month, unpadded' },
		{ variableId: 'ww', name: 'occurrence of the current day of the week in the month, padded to 2' },
		{ variableId: 'Mw', name: 'number of times the current day of the week occurs in the month, unpadded' },
		{ variableId: 'Mww', name: 'number of times the current day of the week occurs in the month, padded to 2' },
		{ variableId: 'Md', name: 'days in the month' },
	)

	self.setVariableDefinitions(variables)
}

export function UpdateVariableValues(self: ModuleInstance): void {
	const now = GetRezonedDateTime(self)
	const variableValues: CompanionVariableValues = {}

	// Set all built-in luxon format token values
	for (const token of FormatTokens) {
		variableValues[token.value] = now.toFormat(token.value)
	}

	// Custom variables
	const weekOccurrence = GetWeekOccurrence(now)
	const weeksInMonth = GetNumberOfWeeksInMonth(now)

	variableValues['w'] = weekOccurrence
	variableValues['ww'] = weekOccurrence.toString().padStart(2, '0')
	variableValues['Md'] = now.daysInMonth
	variableValues['Mw'] = weeksInMonth
	variableValues['Mww'] = weeksInMonth.toString().padStart(2, '0')

	self.setVariableValues(variableValues)
}
