import { CallbackFactory } from "./CallbackFactory";

export class LanguageSystem {

    private static instance: LanguageSystem

    private messages = new Map<string, string>();

    public getMessage(key: string): string {
        return this.messages.get(key) || key
    }

    constructor() {
        if (LanguageSystem.instance) {
            throw new Error("Error: Instantiation failed: Use LanguageSystem.getInstance() instead of new.")
        }
        LanguageSystem.instance = this
        this.loadLanguage(this.getLanguage())
    }

    async loadLanguage(language: string) {
        const response = await fetch(`/assets/lang/${language}.json`)
        if(!response.ok) {
            if(language !== "en-US") {
                await this.loadLanguage("en-US")
            }
            return
        }
        const data = await response.json()
        this.messages = new Map(Object.entries(data))
        CallbackFactory.getInstance().executeCallbacks("languageLoaded")
    }

    private getLanguage(): string {
        return navigator.language
    }

    public static getInstance(): LanguageSystem {
        if (LanguageSystem.instance) {
            return LanguageSystem.instance
        } else {
            return new LanguageSystem()
        }
    }
}