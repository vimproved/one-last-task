// mgSink.ts

// We export this single function to be used by main.ts
export function TickSinkGame(runtime: IRuntime) {
    
    const mouse = runtime.mouse;
    const sponge = runtime.objects.spr_Sponge.getFirstInstance();

    // Safety Check: If sponge or mouse are missing, do nothing
    if (!sponge || !mouse) return;

    // 1. MOVEMENT
    const [mx, my] = mouse.getMousePosition();
    sponge.x = mx;
    sponge.y = my;

    // 2. SCRUBBING
    if (mouse.isMouseButtonDown(0)) {
        const allDirt = runtime.objects.spr_Dirt.getAllInstances();

        for (const dirt of allDirt) {
            if (sponge.testOverlap(dirt)) {
                Scrub(dirt);
            }
        }
    }
}

// Helper function (private to this file)
function Scrub(dirt: IWorldInstance) {
    // Cast to 'any' to use dynamic properties
    let d = dirt as any;

    // Initialize grime if needed
    if (typeof d.grime === "undefined") d.grime = 1.0;

    // Reduce grime
    d.grime -= 0.02;
    d.opacity = d.grime;

    // Destroy if clean
    if (d.grime <= 0) {
        dirt.destroy();
    }
}