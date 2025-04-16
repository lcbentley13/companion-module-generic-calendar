import {
	CompanionFeedbackContext,
	CompanionFeedbackInfo,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { ModuleInstance } from '../main.js'
import { DateTime } from 'luxon'

export function isTimeOptions(self: ModuleInstance): SomeCompanionFeedbackInputField[] {
	return [
		{
			id: 'time',
			type: 'textinput',
			label: 'Time (HH:MM:SS)',
			default: self.state.now.toFormat('HH:mm:ss') ?? undefined,
			regex: '^[0-9]{2}:[0-9]{2}:[0-9]{2}$',
		},
	]
}

export async function isTimeCallback(
	self: ModuleInstance,
	feedback: CompanionFeedbackInfo,
	context: CompanionFeedbackContext,
): Promise<boolean> {
	const targetTimeString = await context.parseVariablesInString(feedback.options.time as string)
	const targetTime = DateTime.fromFormat(targetTimeString, 'HH:mm:ss', {
		zone: self.state.now.zone,
	}).startOf('second')
	const currentTime = self.state.now.startOf('second')
	return currentTime.equals(targetTime)
}
