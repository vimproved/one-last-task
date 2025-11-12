// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
import { MgMemory } from "./mgMemory.js"

export enum State {
	Disabled,
	Begin,
	MgMemory,
}

export function updateState(newState: State) {
	state = newState
}

export let state = State.Disabled
let mouse: IMouseObjectType
let mgMemory: MgMemory

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime : IRuntime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.

	runtime.goToLayout("Start Screen");
	mouse = runtime.mouse!
	mgMemory = new MgMemory(runtime)
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime : IRuntime)
{
	// Code to run every tick
	// if (state == State.Base) {
	// 	if (mouse.isMouseButtonDown(0)) {
	// 		state = State.MgMemory
	// 		mgMemory.initialize()
	// 	}
	// } else if (state == State.MgMemory) {
	// 	mgMemory.tick()
	// 	if (mgMemory.isDone()) {
	// 		state = State.Base
	// 	}
	// }
	// if (state == State.Base) {
	// 	if (mouse.isMouseButtonDown(0)) {
	// 		state = State.MgMemory
	// 		mgMemory.initialize()
	// 	}
	// } else if (state == State.MgMemory) {
	// 	mgMemory.tick()
	// 	if (mgMemory.isDone()) {
	// 		state = State.Base
	// 	}
	// }
	if (state != State.Disabled) {
		if (state == State.Begin) {
			state = State.MgMemory
			mgMemory.initialize()
		} else if (state == State.MgMemory) {
			mgMemory.tick()
			if (mgMemory.isDone()) {
				state = State.Disabled
			}
		}
	}
}
