import { CompanionVariableDefinition } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { tokens } from './tokens.js'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	let variables: CompanionVariableDefinition[] = []

	// Add all built-in luxon format tokens as variables
	for (const token of tokens) {
		variables.push({
			variableId: token.value,
			name: token.description,
		})
	}

	// Custom variables
	variables = variables.concat(
		{ variableId: 'w', name: 'week of the month, unpadded' },
		{ variableId: 'ww', name: 'week of the month, padded to 2' },
		{ variableId: 'Md', name: 'days in the month' },
		{ variableId: 'Mw', name: 'number of weeks in the month, based on the current day of week' },
		{ variableId: 'Mww', name: 'number of weeks in the month, based on the current day of week, padded to 2' },
	)

	self.setVariableDefinitions(variables)
}
