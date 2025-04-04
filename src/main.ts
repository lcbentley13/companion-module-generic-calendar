import { InstanceBase, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, ValidateConfig, type ModuleConfig } from './config.js'
import { DefineVariables, UpdateVariableValues } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { DefineActions } from './actions.js'
import { DefineFeedbacks } from './feedbacks.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig
	isValidConfig: boolean = false

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config
		this.validateConfig()

		if (this.isValidConfig) {
			this.defineActions()
			this.defineFeedbacks()
			this.defineVariables()

			setInterval(() => {
				this.updateVariableValues()
			}, this.config.refreshInterval)
		}
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
		this.validateConfig()

		if (this.isValidConfig) {
			this.defineActions()
			this.defineFeedbacks()
			this.defineVariables()

			setInterval(() => {
				this.updateVariableValues()
			}, this.config.refreshInterval)
		}
	}

	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	validateConfig(): void {
		ValidateConfig(this)
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
