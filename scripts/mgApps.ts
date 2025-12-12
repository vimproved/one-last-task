export class MgApps {
    private readonly runtime: IRuntime
    private readonly mouse: IMouseObjectType
    private done = false

    private opalInfo?: InstanceType.OpalInfo
    private appInfo?: InstanceType.AppInfo

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

    private halfHuman?: InstanceType.HalfHuman
    private withMagic?: InstanceType.WithMagic
    private gender?: InstanceType.Gender
    private diploma?: InstanceType.Diploma
    private crimeRecord?: InstanceType.CrimeRecord
    private spellExperience?: InstanceType.SpellExperience
    private leadership?: InstanceType.Leadership
    private cake?: InstanceType.Cake
    private sunMoon?: InstanceType.SunMoon
    private likeMagic?: InstanceType.LikeMagic

    private submit?: InstanceType.AppSubmit

    private exit?: InstanceType.ComputerExit2

    private submitted = false

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

        this.opalInfo = this.runtime.objects.OpalInfo.getFirstInstance()!
        this.appInfo = this.runtime.objects.AppInfo.getFirstInstance()!

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

        this.halfHuman = this.runtime.objects.HalfHuman.getFirstInstance()!
        this.withMagic = this.runtime.objects.WithMagic.getFirstInstance()!
        this.gender = this.runtime.objects.Gender.getFirstInstance()!
        this.diploma = this.runtime.objects.Diploma.getFirstInstance()!
        this.crimeRecord = this.runtime.objects.CrimeRecord.getFirstInstance()!
        this.spellExperience = this.runtime.objects.SpellExperience.getFirstInstance()!
        this.leadership = this.runtime.objects.Leadership.getFirstInstance()!
        this.cake = this.runtime.objects.Cake.getFirstInstance()!
        this.sunMoon = this.runtime.objects.SunMoon.getFirstInstance()!
        this.likeMagic = this.runtime.objects.LikeMagic.getFirstInstance()!

        this.experience = this.runtime.objects.Experience.getFirstInstance()!

        this.submit = this.runtime.objects.AppSubmit.getFirstInstance()!

        this.exit = this.runtime.objects.ComputerExit2.getFirstInstance()!
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
            if (this.exit!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                this.done = true
            }
            if (this.opalP1!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                this.opalInfo!.setAnimation("P1")
            } else if (this.opalP2!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                this.opalInfo!.setAnimation("P2")
            } else if (this.opalP3!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                this.opalInfo!.setAnimation("P3")
            } else if (this.appP1!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                this.appInfo!.setAnimation("P1")
                this.runtime.layout.getLayer("App1")!.isVisible = true
                this.runtime.layout.getLayer("App2")!.isVisible = false
                this.runtime.layout.getLayer("App3")!.isVisible = false
                this.runtime.layout.getLayer("App1")!.isInteractive = true
                this.runtime.layout.getLayer("App2")!.isInteractive = false
                this.runtime.layout.getLayer("App3")!.isInteractive = false
            } else if (this.appP2!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                this.appInfo!.setAnimation("P2")
                this.runtime.layout.getLayer("App1")!.isVisible = false
                this.runtime.layout.getLayer("App2")!.isVisible = true
                this.runtime.layout.getLayer("App3")!.isVisible = false
                this.runtime.layout.getLayer("App1")!.isInteractive = false
                this.runtime.layout.getLayer("App2")!.isInteractive = true
                this.runtime.layout.getLayer("App3")!.isInteractive = false
            } else if (this.appP3!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                this.appInfo!.setAnimation("P3")
                this.runtime.layout.getLayer("App1")!.isVisible = false
                this.runtime.layout.getLayer("App2")!.isVisible = false
                this.runtime.layout.getLayer("App3")!.isVisible = true
                this.runtime.layout.getLayer("App1")!.isInteractive = false
                this.runtime.layout.getLayer("App2")!.isInteractive = false
                this.runtime.layout.getLayer("App3")!.isInteractive = true
            } else if (this.submit!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                if (
                    this.address!.text.includes("123") &&
                    this.address!.text.includes("Kelp") &&
                    this.address!.text.includes("Atlantis") &&
                    this.bankAccount!.text == "12345678" &&
                    this.bankRouting!.text == "87654321" &&
                    this.experience!.text.length > 4 &&
                    (this.favAnimal!.text.includes("Ferret") || this.favAnimal!.text.includes("ferret")) &&
                    (this.favColor!.text.includes("Green") || this.favColor!.text.includes("green")) &&
                    this.fullName!.text.includes("Opal") &&
                    this.fullName!.text.includes("Codson") &&
                    this.honors!.text.length > 4 &&
                    this.otherCerts!.text.length > 4 &&
                    (this.species!.text.includes("Human") || this.species!.text.includes("human")) &&
                    this.ssn!.text.includes("111") &&
                    this.ssn!.text.includes("2") &&
                    this.halfHuman!.isChecked &&
                    this.withMagic!.isChecked &&
                    this.gender!.getItemText(this.gender!.selectedIndex) == "Other" &&
                    this.diploma!.isChecked &&
                    !(this.crimeRecord!.isChecked) &&
                    this.spellExperience!.isChecked &&
                    this.leadership!.isChecked &&
                    this.cake!.getItemText(this.cake!.selectedIndex) == "Yes" &&
                    this.sunMoon!.getItemText(this.sunMoon!.selectedIndex) == "Moon" &&
                    this.likeMagic!.getItemText(this.likeMagic!.selectedIndex) == "Yes"
                ) {
                    this.done = true
                    this.submitted = true
                } else {
                    this.runtime.signal("wrongInfo")
                }
            }
        }
    }

    isDone() {
        if (this.done) {
            this.runtime.layout.getLayer("MgApps")!.isVisible = false
            this.runtime.layout.getLayer("MgApps")!.isInteractive = false
            this.runtime.layout.getLayer("ComputerScreen")!.isInteractive = true

            this.address!.text = ""
            this.bankAccount!.text = ""
            this.bankRouting!.text = ""
            this.experience!.text = ""
            this.favAnimal!.text = ""
            this.favColor!.text = ""
            this.fullName!.text = ""
            this.honors!.text = ""
            this.otherCerts!.text = ""
            this.species!.text = ""
            this.ssn!.text = ""
            this.halfHuman!.isChecked = false
            this.withMagic!.isChecked = false
            this.gender!.selectedIndex = 0
            this.diploma!.isChecked = false
            this.crimeRecord!.isChecked = false
            this.spellExperience!.isChecked = false
            this.leadership!.isChecked = false
            this.cake!.selectedIndex = -1
            this.sunMoon!.selectedIndex = 0
            this.likeMagic!.selectedIndex = -1

            this.appInfo!.setAnimation("P1")
            this.runtime.layout.getLayer("App1")!.isVisible = true
            this.runtime.layout.getLayer("App2")!.isVisible = false
            this.runtime.layout.getLayer("App3")!.isVisible = false
            this.runtime.layout.getLayer("App1")!.isInteractive = true
            this.runtime.layout.getLayer("App2")!.isInteractive = false
            this.runtime.layout.getLayer("App3")!.isInteractive = false
            if (this.submitted) {
                this.runtime.signal("submittedJobApp")
            }
        }
        return this.done
    }
}