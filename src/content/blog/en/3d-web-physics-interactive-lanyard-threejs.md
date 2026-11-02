---
title: "Real-Time Verlet Physics and Sensor Fusion: Engineering an Interactive 3D Lanyard"
description: "How we built the weightless 3D ID card with Verlet particle integration, Catmull-Rom band curves, and gyroscope gravity mapping in Three.js."
pubDate: "2026-11-02"
readingTime: 8
category: "Web Graphics"
slug: "3d-web-physics-interactive-lanyard-threejs"
lang: "en"
tags: ["threejs", "verlet-physics", "device-orientation", "3d-web"]
tool: "Portfolio Hero 3D"
---

Web development often suffers from flat, static layouts. For the hero section of my portfolio, I wanted something physical, tactile, and immediately memorable: an interactive, weightless 3D lanyard and ID badge that responds to mouse cursor drag gestures, wind currents, and mobile device gyroscope sensors.

Achieving this with high framerates on mobile without shipping heavy 5MB WASM physics engines like Cannon.js or Rapier required engineering a custom, lightweight numerical integrator.

## Verlet Integration for Strand Physics

A physical lanyard behaves like a chain of interconnected masses. Instead of expensive rigid-body collisions, we treat the strap as a series of particle joints simulated with **Verlet Integration**:

```typescript
export interface Particle {
  pos: THREE.Vector3;
  prev: THREE.Vector3;
  vel: THREE.Vector3;
  pinned: boolean;
}

export function stepVerlet(particles: Particle[], dt: number, gravity: THREE.Vector3) {
  for (const p of particles) {
    if (p.pinned) continue;

    // Calculate velocity from position difference
    p.vel.subVectors(p.pos, p.prev);

    // Apply damping and external forces (gravity + breeze)
    const nextPos = p.pos.clone()
      .add(p.vel.multiplyScalar(0.96))
      .addScaledVector(gravity, dt * dt);

    p.prev.copy(p.pos);
    p.pos.copy(nextPos);
  }
}
```

## Distance Constraint Relaxation

To keep the strap from stretching infinitely, we iterate over adjacent particle pairs using a constraint relaxation pass. Repeating this constraint solver 2 to 3 times per frame produces stiff, realistic cord movement with virtually zero CPU overhead.

## DeviceOrientation Sensor Fusion

On mobile devices, the lanyard should swing naturally as the user tilts their phone. Using the `deviceorientation` API, we extract the `beta` (pitch) and `gamma` (roll) angles. 

To handle 360-degree orientations (including holding the phone upside down), we project these angular deflections into a full 3D gravity vector (`gx`, `gy`, `gz`). When inverted, gravity pulls upward toward the navigation bar, creating a delightful and physically coherent interaction.

## Clean Specular Sheen Without Reflection Artifacts

To prevent sharp reflection bars from slicing across the portrait image, we tune the PBR material with controlled clearcoat roughness and diffuse environment lighting. The card feels premium, metallic, and alive.
