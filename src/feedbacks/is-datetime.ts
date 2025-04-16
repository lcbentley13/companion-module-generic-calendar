import { CompanionFeedbackInfo, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { isDateCallback, isDateOptions } from './is-date.js'
import { isTimeCallback, isTimeOptions } from './is-time.js'

export function isDateTimeOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [...isDateOptions(self), ...isTimeOptions(self)]
}

export function isDateTimeCallback(self: ModuleInstance, feedback: CompanionFeedbackInfo): boolean {
	return isDateCallback(self, feedback) && isTimeCallback(self, feedback)
}
