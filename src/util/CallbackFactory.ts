
export class CallbackFactory {

    private static instance: CallbackFactory

    private callbackStorage: Record<string, [(...data: any) => void]> = {}

    constructor() {
        CallbackFactory.instance = this
    }

    addCallback(key: string, unit: (...data: any) => void) {
        if(this.callbackStorage[key]) {
            this.callbackStorage[key].push(unit)
        } else {
            this.callbackStorage[key] = [unit]
        }
    }

    executeCallbacks(key: string, ...data: any) {
        this.callbackStorage[key]?.forEach(unit => unit(...data))
    }

    removeCallback(key: string) {
        delete this.callbackStorage[key]
    }

    public static getInstance(): CallbackFactory {
        if (!CallbackFactory.instance) {
            CallbackFactory.instance = new CallbackFactory();
        }
  
        return CallbackFactory.instance;
    }
}