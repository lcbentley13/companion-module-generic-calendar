import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField, CompanionVariableValues } from '@companion-module/base'
import { GetConfigFields, MAX_REFRESH_INTERVAL, MIN_REFRESH_INTERVAL, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { DateTime } from 'luxon'
import { tokens } from './tokens.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig
	isValidConfig: boolean = false

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config
		this.isValidConfig = this.checkConfig()

		if (this.isValidConfig) {
			this.updateActions()
			this.updateFeedbacks()
			this.updateVariableDefinitions()
			this.run();
		}
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
		this.isValidConfig = this.checkConfig()

		if (this.isValidConfig) {
			this.updateActions()
			this.updateFeedbacks()
			this.updateVariableDefinitions()
			this.run();
		}
	}

	checkConfig(): boolean {
		if (this.config.zone === 'system' && (this.config.fixed_offset || this.config.iana)) {
			this.updateStatus(InstanceStatus.BadConfig, 'System timezone was specified, but a Fixed Offset or IANA timezone was provided')
			return false
		}
		
		if (this.config.zone === 'fixed_offset' && !this.config.fixed_offset) {
			this.updateStatus(InstanceStatus.BadConfig, 'Fixed Offset timezone was specified, but the Fixed Offset specification was not provided')
			return false
		}

		if (this.config.zone === 'iana' && !this.config.iana) {
			this.updateStatus(InstanceStatus.BadConfig, 'IANA timezone was specified, but the IANA specification was not provided')
			return false
		}

		const now = this.getRezonedDateTime()
		if (!now.isValid) {
			this.updateStatus(InstanceStatus.BadConfig, 'Invalid timezone provided')
			return false
		}

		if (!this.config.refresh_interval) {
			this.updateStatus(InstanceStatus.BadConfig, 'Refresh interval was not provided')
			return false
		}

		if (this.config.refresh_interval < MIN_REFRESH_INTERVAL || this.config.refresh_interval > MAX_REFRESH_INTERVAL) {
			this.updateStatus(InstanceStatus.BadConfig, 'Refresh interval must be between 100 and 500 ms')
			return false
		}

		this.updateStatus(InstanceStatus.Ok)
		return true
	}

	run(): void {
		setInterval(() => {
			const now = this.getRezonedDateTime()
			let variableValues: CompanionVariableValues = {}

			// Set all built-in luxon format token values
			for (const token of tokens) {
				variableValues[token.value] = now.toFormat(token.value)
			}

			// Custom variables
			const weekOfMonth = this.getWeekOfMonth(now)
			const weeksInMonth = this.getNumberOfWeeksInMonth(now)

			variableValues['w'] = weekOfMonth
			variableValues['ww'] = weekOfMonth.toString().padStart(2, '0')
			variableValues['Md'] = now.daysInMonth
			variableValues['Mw'] = weeksInMonth
			variableValues['Mww'] = weeksInMonth.toString().padStart(2, '0')

			this.setVariableValues(variableValues)
		}, this.config.refresh_interval);
	}

	getRezonedDateTime(): DateTime {
		const now = DateTime.now()
		switch (this.config.zone) {
			case 'utc':
				return now.setZone('UTC')
			case 'fixed_offset':
				return now.setZone(this.config.fixed_offset)
			case 'iana':
				return now.setZone(this.config.iana)
			default:
				return now
		}
	}

	getWeekOfMonth(dt: DateTime): number {
		return Math.ceil(dt.day / 7)
	}

	getNumberOfWeeksInMonth(dt: DateTime): number {
		const endOfMonth = dt.endOf('month')
		const targetDay = dt.weekday
	
		let count = 0
		let currentDay = dt.startOf('month')
	
		while (currentDay <= endOfMonth) {
			if (currentDay.weekday === targetDay) {
				count++
			}
			currentDay = currentDay.plus({ days: 1 })
		}
	
		return count
	}

	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
