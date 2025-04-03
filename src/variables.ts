import { CompanionVariableDefinition } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { tokens } from './tokens.js'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	let variables: CompanionVariableDefinition[] = []

	for (const token of tokens) {
		variables.push({
			variableId: token.value,
			name: token.description,
		})
	}

	self.setVariableDefinitions(variables)
}
