import {
	CompanionFeedbackContext,
	CompanionFeedbackInfo,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { isDateCallback, isDateOptions } from './is-date.js'
import { isTimeCallback, isTimeOptions } from './is-time.js'

export function isDateTimeOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [...isDateOptions(self), ...isTimeOptions(self)]
}

export async function isDateTimeCallback(
	self: ModuleInstance,
	feedback: CompanionFeedbackInfo,
	context: CompanionFeedbackContext,
): Promise<boolean> {
	return (await isDateCallback(self, feedback, context)) && (await isTimeCallback(self, feedback, context))
}
