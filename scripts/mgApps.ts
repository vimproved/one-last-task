export class MgApps {
    private readonly runtime: IRuntime
    private readonly mouse: IMouseObjectType
    private done = false

    private opalP1?: InstanceType.OpalP1
    private opalP2?: InstanceType.OpalP2
    private opalP3?: InstanceType.OpalP3
    private appP1?: InstanceType.AppP1
    private appP2?: InstanceType.AppP2
    private appP3?: InstanceType.AppP3

    private address?: InstanceType.Address
    private bankAccount?: InstanceType.BankAccount
    private bankRouting?: InstanceType.BankRouting
    private experience?: InstanceType.Experience
    private favAnimal?: InstanceType.FavAnimal
    private favColor?: InstanceType.FavColor
    private fullName?: InstanceType.FullName
    private honors?: InstanceType.Honors
    private otherCerts?: InstanceType.OtherCerts
    private species?: InstanceType.Species
    private ssn?: InstanceType.SSN

    private submit?: InstanceType.SubmitButton

    constructor(runtime: IRuntime) {
        this.runtime = runtime
        this.mouse = runtime.mouse!
    }

    initialize() {
        this.runtime.layout.getLayer("ComputerScreen")!.isInteractive = false
        this.runtime.layout.getLayer("MgApps")!.isVisible = true
        this.runtime.layout.getLayer("MgApps")!.isInteractive = true
        this.runtime.layout.getLayer("App1")!.isVisible = true
        this.runtime.layout.getLayer("App2")!.isVisible = false
        this.runtime.layout.getLayer("App3")!.isVisible = false
        this.runtime.layout.getLayer("App1")!.isInteractive = true
        this.runtime.layout.getLayer("App2")!.isInteractive = false
        this.runtime.layout.getLayer("App3")!.isInteractive = false

        this.opalP1 = this.runtime.objects.OpalP1.getFirstInstance()!
        this.opalP2 = this.runtime.objects.OpalP2.getFirstInstance()!
        this.opalP3 = this.runtime.objects.OpalP3.getFirstInstance()!
        this.appP1 = this.runtime.objects.AppP1.getFirstInstance()!
        this.appP2 = this.runtime.objects.AppP2.getFirstInstance()!
        this.appP3 = this.runtime.objects.AppP3.getFirstInstance()!
        
        this.address = this.runtime.objects.Address.getFirstInstance()!
        this.bankAccount = this.runtime.objects.BankAccount.getFirstInstance()!
        this.bankRouting = this.runtime.objects.BankRouting.getFirstInstance()!
        this.experience = this.runtime.objects.Experience.getFirstInstance()!
        this.favAnimal = this.runtime.objects.FavAnimal.getFirstInstance()!
        this.favColor = this.runtime.objects.FavColor.getFirstInstance()!
        this.fullName = this.runtime.objects.FullName.getFirstInstance()!
        this.honors = this.runtime.objects.Honors.getFirstInstance()!
        this.otherCerts = this.runtime.objects.OtherCerts.getFirstInstance()!
        this.species = this.runtime.objects.Species.getFirstInstance()!
        this.ssn = this.runtime.objects.SSN.getFirstInstance()!


        this.submit!.addEventListener("click", () => {
            if (
                this.name!.text == "Opal" &&
                this.spell1!.text == "Andrew" &&
                this.spell2!.text == "BBB" &&
                this.spell3!.text == "Colovaria" &&
                this.cert!.getItemText(this.cert!.selectedIndex) == "UASC Apprentice Level 3" &&
                this.terms!.isChecked &&
                this.address!.text == "123 Kelp Lane, Aquaville Atlantis" &&
                this.bankAccount!.text == "12345678" &&
                this.bankRouting!.text == "87654321" &&
                this.experience!.text.length > 5 &&
                this.favAnimal!.text == "Ferret" &&
                this.favColor!.text == "Green" &&
                this.fullName!.text == "Opal Codson" &&
                this.honors!.text.length > 5 &&
                this.otherCerts!.text.length > 5 &&
                (this.species!.text == "Human" || this.species!.text == "human") &&
                this.ssn!.text == "111-11-1112"
            ) {
                this.done = true
            }
        })
    }

    tick() {
        // if (
        //     this.name!.text == "Opal" &&
        //     this.spell1!.text == "Andrew" &&
        //     this.spell2!.text == "BBB" &&
        //     this.spell3!.text == "Colovaria" &&
        //     this.cert!.getItemText(this.cert!.selectedIndex) == "UASC Apprentice Level 3"
        // ) {
        //     this.terms!.isEnabled = true
        // }
        // if (
        //     this.name!.text == "Opal" &&
        //     this.spell1!.text == "Andrew" &&
        //     this.spell2!.text == "BBB" &&
        //     this.spell3!.text == "Colovaria" &&
        //     this.cert!.getItemText(this.cert!.selectedIndex) == "UASC Apprentice Level 3" &&
        //     this.terms!.isChecked
        // ) {
        //     this.submit!.isEnabled = true
        // }
        if (this.mouse.isMouseButtonDown(0)) {
            if (this)
        }
    }

    isDone() {
        if (this.done) {
            this.fullName!.text = ""
            this.runtime.layout.getLayer("MgApps")!.isVisible = false
            this.runtime.layout.getLayer("MgApps")!.isInteractive = false
            this.runtime.layout.getLayer("ComputerScreen")!.isInteractive = true
        }
        return this.done
    }
}