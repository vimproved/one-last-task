export class MgPotion {
    private readonly runtime: IRuntime
    private readonly mouse: IMouseObjectType
    private done = false
    private risingEdge = false
    private fallingEdge = false
    private pastClick = false

    private orders: InstanceType.Potion[] = []
    private orderTrays: InstanceType.OrderTray[] = []
    private ingButtons: InstanceType.IngButton[] = []
    private recipeButton?: InstanceType.RecipeButton
    private submitButton?: InstanceType.SubmitButton
    private cauldron?: InstanceType.Cauldron
    private dragNDrop?: InstanceType.Ingredient
    private mixture: Set<string> = new Set<string>()
    private result?: InstanceType.Potion
    // WARNING: if you try to make multiple potions, the original one will disappear
    
    private readonly ing = [
        "rose",
        "pearl",
        "coal",
        "feather",
        "ambrosia",
        "time",
        "nuke",
        "claw",
        "blood",
    ]
    private readonly recipes: Map<string, Set<string>> = new Map([
        ["standard", new Set<string>(["coal", "ambrosia", "claw"])],
        ["cube", new Set<string>(["coal", "nuke", "claw"])],
        ["flight", new Set<string>(["coal", "pearl", "feather"])],
        ["love", new Set<string>(["rose", "ambrosia", "blood"])],
        ["time", new Set<string>(["time", "pearl", "feather"])],
    ])
    private orderOptions = new Set<string>(["standard", "cube", "flight", "love", "time"])

    constructor(runtime: IRuntime) {
        this.runtime = runtime
        this.mouse = runtime.mouse!
    }

    initialize() {
        // this.runtime.viewportHeight
        this.runtime.layout.getLayer("MgPotion")!.isVisible = true
        // this.runtime.goToLayout("MgPotion")
        for (let i = 0; i < 4; ++i) {
            this.orders.push(this.runtime.objects.Potion.createInstance("MgPotionBg", 192 + 154*i, 80))
            // this.runtime.objects.Potion.createInstance
        }
        for (let i = 0; i < 4; ++i) {
            this.orderTrays.push(this.runtime.objects.OrderTray.createInstance("MgPotionBg", 195.5 + 154.5*i, 78))
            this.orderTrays[i].width = this.orderTrays[i].width / 2.1
            this.orderTrays[i].height = this.orderTrays[i].height / 2.1
            this.orderTrays[i].isVisible = false
            // this.runtime.objects.Potion.createInstance
        }
        for (let order of this.orders) {
            // order.setAnimation(PotionType[Math.floor(Math.random() * 5)].toString())
            let options = Array.from(this.orderOptions)
            let option = options[Math.floor(Math.random() * options.length)]
            order.setAnimation(option)
            this.orderOptions.delete(option)

            // order.setAnimation("love")
            // order.setSize(order.getSize()[0] / 10, order.getSize()[1] / 10)
            order.width = order.width / 10
            order.height = order.height / 10
        }
        for (let order of this.orders) {
            order.opacity = 0.6
        }
        this.recipeButton = this.runtime.objects.RecipeButton.getFirstInstance()!
        this.submitButton = this.runtime.objects.SubmitButton.getFirstInstance()!
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                this.ingButtons.push(this.runtime.objects.IngButton.createInstance("MgPotionBg", 534 + 62*j, 200 + 62*i));
            }
        }
        for (let i = 0; i < this.ingButtons.length; ++i) {
            this.ingButtons[i].setAnimation(this.ing[i])
            this.ingButtons[i].width = this.ingButtons[i].width / 5.5
            this.ingButtons[i].height = this.ingButtons[i].height / 5.5
            this.ingButtons[i].isVisible = false
        }
        this.cauldron = this.runtime.objects.Cauldron.getFirstInstance()!
    }

    tick() {
        // update clicking state
        if (this.mouse.isMouseButtonDown(0) && !this.pastClick) {
            this.risingEdge = true
        } else {
            this.risingEdge = false
        }
        if (!this.mouse.isMouseButtonDown(0) && this.pastClick) {
            this.fallingEdge = true
        } else {
            this.fallingEdge = false
        }
        this.pastClick = this.mouse.isMouseButtonDown(0)



        // this.runtime.layout.getLayer("recipes")!.isVisible = true
        if (this.risingEdge) {
            if (this.recipeButton!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY()) && !this.runtime.layout.getLayer("MgPotionRecipes")!.isVisible) {
                this.runtime.layout.getLayer("MgPotionRecipes")!.isVisible = true
            // }
            } else if (this.runtime.layout.getLayer("MgPotionRecipes")!.isVisible) {
                this.runtime.layout.getLayer("MgPotionRecipes")!.isVisible = false
            } else if (this.submitButton!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY()) && !this.runtime.layout.getLayer("MgPotionRecipes")!.isVisible) {
                let valid = false
                // WARNING: currently does not handle duplicates
                for (let [potion, recipe] of this.recipes) {
                    let equal = true
                    for (let element of this.mixture) {
                        if (!recipe.has(element)) {
                            equal = false
                            break
                        }
                    }
                    for (let element of recipe) {
                        if (!this.mixture.has(element)) {
                            equal = false
                            break
                        }
                    }
                    if (equal) {
                        this.result = this.runtime.objects.Potion.createInstance("MgPotionFg", this.cauldron!.x, this.cauldron!.y)
                        this.result.setAnimation(potion)
                        this.result.width = this.result.width / 10
                        this.result.height = this.result.height / 10
                        valid = true
                        break
                    }
                }
                if (!valid) {
                    this.cauldron!.setAnimation("explode")
                    this.cauldron!.isVisible = true
                    setTimeout(() => { this.cauldron!.setAnimation("normal"); this.cauldron!.isVisible = false }, 1000)
                }
                this.mixture.clear()
            }
            
            else {
                for (let i = 0; i < this.ingButtons.length; ++i) {
                    if (this.ingButtons[i]!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                        this.dragNDrop = this.runtime.objects.Ingredient.createInstance("MgPotionFg", this.mouse.getMouseX(), this.mouse.getMouseY())
                        this.dragNDrop.setAnimation(this.ing[i])
                        this.dragNDrop.width = this.dragNDrop.width / 8
                        this.dragNDrop.height = this.dragNDrop.height / 8
                        break
                    }
                }
            }
        }
        if (this.dragNDrop) {
            this.dragNDrop.x = this.mouse.getMouseX()
            this.dragNDrop.y = this.mouse.getMouseY()
            if (this.fallingEdge) {
                if (this.cauldron!.containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())) {
                    this.mixture.add(this.dragNDrop.animationName)
                }
                this.dragNDrop.destroy()
            }
        }
        
    }

    isDone() {
        // print()
        return false;
    }
}

enum PotionType {
    Standard,
    Cube,
    Flight,
    Love,
    Time,
}

interface Dictionary<T> {
    [key: string]: T;
}