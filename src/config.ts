import { type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	zone: string
	refresh_interval: number
	fixed_offset: string
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
				{ id: 'fixed_offset', label: 'Fixed Offset' },
				{ id: 'iana', label: 'IANA' },
			],
			width: 12,
			default: 'system'
		},
		{
			id: 'refresh_interval',
			type: 'number',
			label: 'Refresh Interval (ms)',
			width: 6,
			min: MIN_REFRESH_INTERVAL,
			max: MAX_REFRESH_INTERVAL,
			default: DEFAULT_REFRESH_INTERVAL
		},
		{
			id: 'fixed_offset',
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
