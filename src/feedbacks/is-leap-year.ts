import { SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'

export const isLeapYearOptions: SomeCompanionFeedbackInputField[] = []

export function isLeapYearCallback(self: ModuleInstance): boolean {
	return self.state.now.isInLeapYear
}
