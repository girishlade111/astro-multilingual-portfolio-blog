export interface GyroInput {
  beta: number | null; // Front-to-back tilt in degrees [-180, 180]
  gamma: number | null; // Left-to-right tilt in degrees [-90, 90]
  neutralBeta?: number; // Baseline holding angle in degrees (default 50)
  screenAngle?: number; // Screen orientation angle (0, 90, -90, 180)
  gravity?: number; // Base gravity magnitude (default 40)
  sensitivity?: number; // Gyroscope response multiplier (default 0.85)
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
 * Converts DeviceOrientation (beta, gamma) angles in degrees into a 3D gravity/tilt
 * force vector for the 3D Lanyard simulation, accounting for screen orientation.
 */
export function computeGyroForces(input: GyroInput): GyroForceVector {
  const {
    beta,
    gamma,
    neutralBeta = 45,
    screenAngle = 0,
    gravity = 40,
    sensitivity = 0.85,
  } = input;

  if (beta === null || gamma === null || !Number.isFinite(beta) || !Number.isFinite(gamma)) {
    return { gx: 0, gy: -gravity, gz: 0, tiltRoll: 0, tiltPitch: 0 };
  }

  // Smoothly clamp raw angles to avoid gimbal lock or extreme inversion
  const clampedGamma = clamp(gamma, -65, 65);
  const clampedDeltaBeta = clamp(beta - neutralBeta, -55, 55);

  // Rotate according to screen orientation (portrait 0, landscape 90/-90/270, inverted 180)
  const orientRad = (screenAngle || 0) * DEG_TO_RAD;
  const cosO = Math.cos(orientRad);
  const sinO = Math.sin(orientRad);

  const orientedRightDeg = clampedGamma * cosO + clampedDeltaBeta * sinO;
  const orientedForwardDeg = -clampedGamma * sinO + clampedDeltaBeta * cosO;

  const rollRad = orientedRightDeg * DEG_TO_RAD;
  const pitchRad = orientedForwardDeg * DEG_TO_RAD;

  // Real physical 3D gravity decomposition:
  // - Lateral tilt (roll) directs gravity left/right
  // - Pitch tilt directs gravity forward/backward (-Z into screen, +Z outward)
  // - Vertical gravity magnitude reduces as device tilts off-axis
  const cosRoll = Math.cos(rollRad);
  const cosPitch = Math.cos(pitchRad);

  const gx = gravity * Math.sin(rollRad) * sensitivity;
  const gz = gravity * Math.sin(pitchRad) * (sensitivity * 0.75);
  const gy = -gravity * Math.max(0.35, cosRoll * cosPitch);

  return {
    gx,
    gy,
    gz,
    tiltRoll: rollRad,
    tiltPitch: pitchRad,
  };
}
