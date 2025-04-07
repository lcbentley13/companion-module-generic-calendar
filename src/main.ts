import { InstanceBase, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, ValidateConfig, type ModuleConfig } from './config.js'
import { DefineVariables, UpdateVariableValues } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { DefineActions } from './actions.js'
import { DefineFeedbacks } from './feedbacks.js'
import { DateTime } from 'luxon'
import { GetRezonedDateTime } from './extensions/functions.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig
	now!: DateTime
	isValidConfig: boolean = false

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.validateConfig(config)
		this.getRezonedDateTime()

		if (this.isValidConfig) {
			this.defineActions()
			this.defineFeedbacks()
			this.defineVariables()

			setInterval(() => {
				this.updateVariableValues()
				this.checkFeedbacks()
			}, this.config.refreshInterval)
		}
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.validateConfig(config)
		this.getRezonedDateTime()

		if (this.isValidConfig) {
			this.defineActions()
			this.defineFeedbacks()
			this.defineVariables()

			setInterval(() => {
				this.updateVariableValues()
				this.checkFeedbacks()
			}, this.config.refreshInterval)
		}
	}

	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	validateConfig(config: ModuleConfig): void {
		this.config = config
		ValidateConfig(this)
	}

	getRezonedDateTime(): void {
		this.now = GetRezonedDateTime(this)
	}

	defineActions(): void {
		DefineActions(this)
	}

	defineFeedbacks(): void {
		DefineFeedbacks(this)
	}

	defineVariables(): void {
		DefineVariables(this)
	}

	updateVariableValues(): void {
		UpdateVariableValues(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
