import { InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import { ModuleInstance } from './main.js'
import { GetRezonedDateTime } from './luxon-extensions/functions.js'

export interface ModuleConfig {
	zone: 'system' | 'utc' | 'fixedOffset' | 'iana'
	refreshInterval: number
	fixedOffset: string
	iana: string
}

export const MIN_REFRESH_INTERVAL = 100
export const MAX_REFRESH_INTERVAL = 500
export const DEFAULT_REFRESH_INTERVAL = 500

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			id: 'zone',
			type: 'dropdown',
			label: 'Timezone',
			choices: [
				{ id: 'system', label: 'System' },
				{ id: 'utc', label: 'UTC' },
				{ id: 'fixedOffset', label: 'Fixed Offset' },
				{ id: 'iana', label: 'IANA' },
			],
			width: 12,
			default: 'system',
		},
		{
			id: 'refreshInterval',
			type: 'number',
			label: 'Refresh Interval (ms)',
			width: 6,
			min: MIN_REFRESH_INTERVAL,
			max: MAX_REFRESH_INTERVAL,
			default: DEFAULT_REFRESH_INTERVAL,
		},
		{
			id: 'fixedOffset',
			type: 'textinput',
			label: 'Fixed Offset',
			width: 6,
			default: '',
		},
		{
			id: 'iana',
			type: 'textinput',
			label: 'IANA',
			width: 6,
			default: '',
		},
	]
}

export function ValidateConfig(self: ModuleInstance): void {
	if (self.config.zone === 'system' && (self.config.fixedOffset || self.config.iana)) {
		self.updateStatus(
			InstanceStatus.BadConfig,
			'System timezone was specified, but a Fixed Offset or IANA timezone was provided',
		)
		self.isValidConfig = false
		return
	}

	if (self.config.zone === 'fixedOffset' && !self.config.fixedOffset) {
		self.updateStatus(
			InstanceStatus.BadConfig,
			'Fixed Offset timezone was specified, but the Fixed Offset specification was not provided',
		)
		self.isValidConfig = false
		return
	}

	if (self.config.zone === 'iana' && !self.config.iana) {
		self.updateStatus(
			InstanceStatus.BadConfig,
			'IANA timezone was specified, but the IANA specification was not provided',
		)
		self.isValidConfig = false
		return
	}

	if (!self.config.refreshInterval) {
		self.updateStatus(InstanceStatus.BadConfig, 'Refresh interval was not provided')
		self.isValidConfig = false
		return
	}

	if (self.config.refreshInterval < MIN_REFRESH_INTERVAL || self.config.refreshInterval > MAX_REFRESH_INTERVAL) {
		self.updateStatus(InstanceStatus.BadConfig, 'Refresh interval must be between 100 and 500 ms')
		self.isValidConfig = false
		return
	}

	const now = GetRezonedDateTime(self)
	if (!now.isValid) {
		self.updateStatus(InstanceStatus.BadConfig, 'Invalid timezone provided')
		self.isValidConfig = false
		return
	}

	self.updateStatus(InstanceStatus.Ok)
	self.isValidConfig = true
	return
}
