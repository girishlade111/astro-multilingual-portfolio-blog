export interface GyroInput {
  beta: number | null; // Front-to-back tilt in degrees [-180, 180]
  gamma: number | null; // Left-to-right tilt in degrees [-90, 90]
  neutralBeta?: number; // Baseline holding angle in degrees (default 48)
  screenAngle?: number; // Screen orientation angle (0, 90, -90, 180)
  gravity?: number; // Base gravity magnitude (default 40)
  sensitivity?: number; // Gyroscope response multiplier (default 1.0)
}

export interface GyroForceVector {
  gx: number;
  gy: number;
  gz: number;
  tiltRoll: number;
  tiltPitch: number;
}

const clamp = (val: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, val));

const DEG_TO_RAD = Math.PI / 180;

/**
 * Converts DeviceOrientation (beta, gamma) angles in degrees into a complete 3D gravity
 * vector for the 3D Lanyard simulation across all 8 directions (including upside-down inversion),
 * accounting for screen orientation.
 */
export function computeGyroForces(input: GyroInput): GyroForceVector {
  const {
    beta,
    gamma,
    neutralBeta = 48,
    screenAngle = 0,
    gravity = 40,
    sensitivity = 1.0,
  } = input;

  if (beta === null || gamma === null || !Number.isFinite(beta) || !Number.isFinite(gamma)) {
    return { gx: 0, gy: -gravity, gz: 0, tiltRoll: 0, tiltPitch: 0 };
  }

  // Normalize beta into [-180, 180]
  let normBeta = ((beta + 180) % 360 + 360) % 360 - 180;

  // Compute longitudinal tilt difference from neutral holding position (~48° pitch)
  let pitchDelta = normBeta - neutralBeta;
  pitchDelta = ((pitchDelta + 180) % 360 + 360) % 360 - 180;

  // Lateral roll angle [-90, 90]
  const rollDeg = clamp(gamma, -90, 90);
  const rollRad = rollDeg * DEG_TO_RAD;
  const pitchRad = pitchDelta * DEG_TO_RAD;

  // Lateral force fx:
  // Tilting phone to LEFT (gamma < 0) moves card LEFT (-X).
  // Tilting phone to RIGHT (gamma > 0) moves card RIGHT (+X).
  // Power curve (0.75) gives instant responsive reaction for subtle hand tilts.
  const rollNormalized = rollDeg / 90;
  const lateralFactor = Math.sign(rollNormalized) * Math.pow(Math.abs(rollNormalized), 0.75);
  const fx = gravity * lateralFactor * (sensitivity * 1.6);

  // Longitudinal force fy:
  // * Upright holding (pitchDelta ~ 0) => -gravity (hangs down)
  // * Upside-down holding (pitchDelta ~ 180/-180) => +gravity (falls UPWARDS towards navbar)
  const fy = -gravity * Math.cos(pitchRad) * Math.cos(rollRad * 0.7) * (sensitivity * 1.25);

  // Depth force fz:
  // Tilted flat on desk => settles into screen plane (-Z)
  const fz = gravity * Math.sin(pitchRad) * Math.cos(rollRad) * (sensitivity * 0.8);

  let gx = fx;
  let gy = fy;
  let gz = fz;

  // Rotate gravity vector according to screen orientation (portrait 0, landscape 90/270, inverted 180)
  if (screenAngle !== 0) {
    const sRad = -screenAngle * DEG_TO_RAD;
    const cosS = Math.cos(sRad);
    const sinS = Math.sin(sRad);
    gx = fx * cosS - fy * sinS;
    gy = fx * sinS + fy * cosS;
  }

  return {
    gx,
    gy,
    gz,
    // Tilt roll aligns with lateral deflection
    tiltRoll: clamp(rollRad, -0.5, 0.5),
    tiltPitch: clamp(pitchRad, -0.5, 0.5),
  };
}
