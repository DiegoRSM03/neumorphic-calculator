import DisplaySingleton from './DisplaySingleton'

export default class Key {

    private displayInstance: DisplaySingleton
    private isAnOperation: boolean
    private value: string

    public constructor( key: Element ) {
        this.displayInstance = DisplaySingleton.getInstance()
        this.isAnOperation = (key.classList[0] == 'operation') ? true : false
        this.value = key.innerHTML

        this.setupKey( key )
    }

    public setupKey( key: Element ) {
        key.addEventListener('click', (): void => {
            this.printInDisplay()
        })
    }

    public printInDisplay() {
        if ( !this.displayInstance.isEmpty() && this.isAnOperation && !this.displayInstance.isLastDigitAnOperation() ) {
            this.displayInstance.addDigit(this.value, this.isAnOperation)
            this.displayInstance.setDisplayEmpty(false)
        } else if ( !this.isAnOperation ) {
            this.displayInstance.addDigit(this.value, this.isAnOperation)
            this.displayInstance.setDisplayEmpty(false)
        }
    }

}
