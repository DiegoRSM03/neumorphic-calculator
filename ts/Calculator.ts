import Key from './Key'
import DisplaySingleton from './DisplaySingleton'

export default class Calculator {

    private keys: Key[]
    private primaryDisplay: HTMLInputElement
    private secondaryDisplay: DisplaySingleton
    
    public constructor() {
        this.keys = []
        this.primaryDisplay = document.querySelector('#display-primary')
        this.secondaryDisplay = DisplaySingleton.getInstance()

        this.setupPrintableButtons()
        this.setupCommandButtons()
    }

    public setupPrintableButtons(): void {
        const printableButtons = document.querySelectorAll('.printable')

        printableButtons.forEach(( button: Element ): void => {
            const key = new Key(button)
            this.keys.push(key)
        })
    }

    public setupCommandButtons(): void {
        const $deleteAll = document.querySelector('#delete-all')
        $deleteAll.addEventListener('click', (): void => {
            this.secondaryDisplay.deleteAll()
        })

        const $deleteLastDigit = document.querySelector('#delete-last-digit') 
        $deleteLastDigit.addEventListener('click', (): void  => {
            this.secondaryDisplay.deleteLastDigit()
        })

        const $calcResult = document.querySelector('#calc-result') 
        $calcResult.addEventListener('click', (): void => {
            this.printResult()
        })
    }

    private printResult(): void {
        const numbersAndOperations = document.querySelector('#display-secondary').innerHTML

        const result: string[] = this.calcResult(numbersAndOperations)
        this.primaryDisplay.innerHTML = result[0]
    }

    private cleanDivMultMod( array: string[] ): string[] {
        for (let j:number=0 ; j<2 ; j++) {
            for (let i:number=0 ; i<array.length ; i++) {
                var operation: string = array[i]

                if ( isNaN(parseInt(operation)) ) {
                    let result: number = 0
                    
                    if ( operation == 'x' ) {
                        result = parseFloat(array[i-1]) * parseFloat(array[i+1])
                        array.splice(i-1, 3, String(result))
                    } else if ( operation == '/' ) {
                        result = parseFloat(array[i-1]) / parseFloat(array[i+1])
                        array.splice(i-1, 3, String(result))
                    } else if ( operation == '%' ) {
                        result = parseFloat(array[i-1]) % parseFloat(array[i+1])
                        array.splice(i-1, 3, String(result))
                    }
                } 
            }
        }
        return array
    }

    private cleanPlusAndSubst( array: string[] ): string[] {
        for (let j:number=0 ; j<2 ; j++) {
            for (let i:number=0 ; i<array.length ; i++ ) {
                let operation: string = array[i]

                if ( isNaN(parseInt(operation)) ) {
                    let result: number = 0

                    if ( operation == '+' ) {
                        result = parseFloat(array[i-1]) + parseFloat(array[i+1])
                        array.splice(i-1, 3, String(result))
                    } else if (operation == '-') {
                        result = parseFloat(array[i-1]) - parseFloat(array[i-1])
                        array.splice(i-1, 3, String(result))
                    }
                }
            }
        }
        return array
    }

    private calcResult( operations: string ): string[] {
        let operationsSplitted: string[] = operations.split(' ')
        
        if (
            operationsSplitted.includes('x') ||
            operationsSplitted.includes('/') ||
            operationsSplitted.includes('%')
        ) { 
            operationsSplitted = this.cleanDivMultMod(operationsSplitted)
            console.log(operationsSplitted)
        }

        if (
            operationsSplitted.includes('+') ||
            operationsSplitted.includes('-')
        ) { 
            operationsSplitted = this.cleanPlusAndSubst(operationsSplitted)
        }

        return operationsSplitted
    }
}
