import { InstanceBase, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, ValidateConfig, type ModuleConfig } from './config.js'
import { UpgradeScripts } from './upgrades.js'
import { DefineFeedbacks } from './feedbacks.js'
import { DateTimeState } from './state.js'
import { DefineVariables, UpdateVariableValues } from './variables.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig
	isValidConfig: boolean = false
	state!: DateTimeState

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		await this.configUpdated(config)
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.validateConfig(config)

		if (this.isValidConfig) {
			this.updateState()
			this.defineFeedbacks()
			this.defineVariables()

			setInterval(() => {
				this.updateState()
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

	defineFeedbacks(): void {
		DefineFeedbacks(this)
	}

	defineVariables(): void {
		DefineVariables(this)
	}

	updateState(): void {
		this.state = new DateTimeState(this)
	}

	updateVariableValues(): void {
		UpdateVariableValues(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
