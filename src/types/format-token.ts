export class FormatToken {
    public value: string
    public description: string

    constructor(token: string, description: string) {
        this.value = token
        this.description = description
    }
}