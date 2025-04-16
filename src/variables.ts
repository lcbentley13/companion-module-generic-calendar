import { CompanionVariableDefinition } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { FormatTokens } from './extensions/formats.js'
import {
	VAR_DAY_OF_WEEK_OCCURENCE_UNPADDED,
	VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED,
	VAR_DAYS_IN_MONTH,
} from './constants/variables.js'

export function DefineVariables(self: ModuleInstance): void {
	let variables: CompanionVariableDefinition[] = []

	// Pre-defined format variables
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
			variableId: VAR_DAY_OF_WEEK_OCCURENCE_COUNT_UNPADDED,
			name: 'number of times the current day of the week occurs in the month, unpadded',
		},
		{
			variableId: VAR_DAYS_IN_MONTH,
			name: 'days in the month',
		},
	)

	self.setVariableDefinitions(variables)
}

export function UpdateVariableValues(self: ModuleInstance): void {
	self.setVariableValues(self.state.variables)
}
