export class MgMemory {
    private readonly runtime: IRuntime
    private state = State.Normal
    private readonly mouse: IMouseObjectType
    private controlsDisabled = false
    private firstSelection = -1
    private done = false

    private cards: InstanceType.Card[] = [];

    private face = [
        "redface",
        "blueface",
        "greenface",
        "yellowface",
        "orangeface",
        "purpleface",
        "blackface",
        "brownface",
    ]

    constructor(runtime: IRuntime) {
        this.runtime = runtime
        this.mouse = runtime.mouse!
    }

    initialize() {
        this.runtime.layout.getLayer("MgMemory")!.isVisible = true
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                this.cards.push(this.runtime.objects.Card.createInstance("MgMemory", 100 + 100*i, 100 + 100*j));
                // this.runtime.objects.Card.createInstance()
            }	
        }

        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }

        // DON'T USE
        // cards = cards
        // 	.map(value => ({ value, sort: Math.random() }))
        // 	.sort((a, b) => a.sort - b.sort)
        // 	.map(({ value }) => value)
    }

    tick() {
        if (this.state == State.Normal) {
            if (this.mouse.isMouseButtonDown(0)) {
                for (let i = 0; i < 16; ++i) {
                    if (this.cards[i].containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())
                        && this.cards[i].animationName == "back") {
                        this.flipCard(i)
                        this.state = State.Selecting
                        this.firstSelection = i
                        break
                    }
                }
            }
        } else if (this.state == State.Selecting) {
            if (this.mouse.isMouseButtonDown(0)) {
                for (let i = 0; i < 16; ++i) {
                    if (this.cards[i].containsPoint(this.mouse.getMouseX(), this.mouse.getMouseY())
                        && this.cards[i].animationName == "back") {
                        this.flipCard(i)
                        if (Math.floor(i/2) != Math.floor(this.firstSelection/2)) {
                            this.state = State.Pause
                            setTimeout(() => { this.flipCard(this.firstSelection); this.flipCard(i); this.state = State.Normal }, 750)
                        } else {
                            this.state = State.Normal
                            let doneChecker = true
                            for (let card of this.cards) {
                                if (card.animationName == "back") {
                                    doneChecker = false
                                    break
                                }
                            }
                            if (doneChecker) {
                                setTimeout(() => this.done = true, 1000)
                            }
                        }
                        break
                    }
                }
            }
        } else { }
    }

    isDone(): boolean {
        if (this.done) {
            for (let card of this.cards) {
                card.destroy()
            }
            this.runtime.layout.getLayer("MgMemory")!.isVisible = false
        }
        return this.done
    }

    private flipCard(index: number) {
        if (this.cards[index].animationName == "back") {
            this.cards[index].setAnimation(this.face[Math.floor(index/2)])
        } else {
            this.cards[index].setAnimation("back")
        }
    }
}

enum State {
    Normal,
    Selecting,
    Pause,
}