export default class DisplaySingleton {

    private static instance: DisplaySingleton
    private display: HTMLInputElement
    private displayIsEmpty: boolean = true
    private lastDigit: string = ''
    
    private constructor() {
        this.display = document.querySelector('#display-secondary')
    }

    public static getInstance(): DisplaySingleton {
        if ( !DisplaySingleton.instance ) {
            DisplaySingleton.instance = new DisplaySingleton()
        }

        return DisplaySingleton.instance
    }

    public setDisplayEmpty( status: boolean ): void {
        this.displayIsEmpty = status 
    }

    public isEmpty(): boolean {
        return this.displayIsEmpty
    }

    public isLastDigitAnOperation(): boolean {
        if ( this.lastDigit == ' ' ) { return true } else { return false } 
    }

    public clearLastDigit(): void {
        this.display.innerHTML = this.display.innerHTML.slice(0, -1)
    }

    public updateLastDigit(): void {
        this.lastDigit = this.display.innerHTML.slice(-1)
    }

    public addDigit( digit: string, isAnOperation: boolean ): void {
        this.display.innerHTML += ( isAnOperation ) ? ` ${digit} ` : digit
        this.updateLastDigit()
    }

    public deleteAll(): void {
        this.display.innerHTML = ''
        document.querySelector('#display-primary').innerHTML = ''
    }
    
    public deleteLastDigit(): void {
        this.display.innerHTML = this.display.innerHTML.slice(0, -1) 
    }

}
