export class MgApps {
    private readonly runtime: IRuntime
    private done = false
    private risingEdge = false
    private fallingEdge = false
    private pastClick = false

    private name?: InstanceType.NameInput
    private spell1?: InstanceType.SpellInput1
    private spell2?: InstanceType.SpellInput2
    private spell3?: InstanceType.SpellInput3
    private cert?: InstanceType.CertInput
    private terms?: InstanceType.TermsAndConds
    private submit?: InstanceType.JobSubmit

    constructor(runtime: IRuntime) {
        this.runtime = runtime
    }

    initialize() {
        this.runtime.layout.getLayer("ComputerScreen")!.isInteractive = false
        this.runtime.layout.getLayer("MgApps")!.isVisible = true
        this.runtime.layout.getLayer("MgApps")!.isInteractive = true
        this.name = this.runtime.objects.NameInput.getFirstInstance()!
        this.spell1 = this.runtime.objects.SpellInput1.getFirstInstance()!
        this.spell2 = this.runtime.objects.SpellInput2.getFirstInstance()!
        this.spell3 = this.runtime.objects.SpellInput3.getFirstInstance()!
        this.cert = this.runtime.objects.CertInput.getFirstInstance()!
        this.terms = this.runtime.objects.TermsAndConds.getFirstInstance()!
        this.submit = this.runtime.objects.JobSubmit.getFirstInstance()!
        this.submit!.addEventListener("click", () => {
            if (
                this.name!.text == "Opal" &&
                this.spell1!.text == "Andrew" &&
                this.spell2!.text == "BBB" &&
                this.spell3!.text == "Colovaria" &&
                this.cert!.getItemText(this.cert!.selectedIndex) == "UASC Apprentice Level 3" &&
                this.terms!.isChecked
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
    }

    isDone() {
        if (this.done) {
            this.runtime.layout.getLayer("MgApps")!.isVisible = false
            this.runtime.layout.getLayer("MgApps")!.isInteractive = false
            this.runtime.layout.getLayer("ComputerScreen")!.isInteractive = true
        }
        return this.done
    }
}