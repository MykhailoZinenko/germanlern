export const furFragmentShader = /* glsl */ `
uniform float si, sc;
uniform vec3 fCol, tCol;
uniform float fDens;

varying vec3 vPos;
varying float vT, vDen;
varying vec3 vN;

float hash3(vec3 p) {
  p = fract(p * vec3(443.897, 397.297, 491.187));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

void main() {
  // Base layer: solid surface with lighting
  if (si < 0.5) {
    vec3 l1 = normalize(vec3(0.3, 1.0, 0.5));
    vec3 l2 = normalize(vec3(-0.5, 0.4, -0.6));
    vec3 l3 = normalize(vec3(0.1, -0.2, 1.0));
    float df = max(dot(vN, l1), 0.0) * 0.38
             + max(dot(vN, l2), 0.0) * 0.18
             + max(dot(vN, l3), 0.0) * 0.14
             + 0.50;
    gl_FragColor = vec4(fCol * df * 0.92, 1.0);
    return;
  }

  // Two overlapping strand grids for density
  float hit = 0.0;
  float bestH = 0.0;
  float bestR = 0.0;

  for (int layer = 0; layer < 2; layer++) {
    vec3 offset = (layer == 0) ? vec3(0.0) : vec3(0.37, 0.53, 0.71);
    vec3 cellPos = vPos * fDens + offset;
    vec3 cellId = floor(cellPos);
    vec3 cellUv = fract(cellPos);

    float r1 = hash3(cellId);
    float r2 = hash3(cellId + 71.0);
    float r3 = hash3(cellId + 137.0);

    vec2 cen = vec2(0.15 + r1 * 0.7, 0.15 + r2 * 0.7);
    float dist = length(cellUv.xy - cen);

    // Fat fluffy strands
    float sRad = 0.52 * (1.0 - vT * 0.45);
    float sH = 0.10 + r3 * 0.90;

    if (dist < sRad && vT < sH) {
      hit = 1.0;
      bestH = max(bestH, sH);
      bestR = max(bestR, r1);
    }
  }

  // Eye cutout
  float cB = (1.0 - vDen) * 0.98;
  if (cB > 0.5) hit = 0.0;
  if (vT > bestH * (1.0 - cB)) hit = 0.0;

  if (hit < 0.5) discard;

  float t = vT / bestH;

  // Color: warm gradient, tips noticeably lighter
  vec3 c = mix(fCol, tCol, t * 0.65 + 0.12);
  c *= 0.90 + bestR * 0.20;

  // Multi-light soft wrapped lighting
  vec3 l1 = normalize(vec3(0.3, 1.0, 0.5));
  vec3 l2 = normalize(vec3(-0.5, 0.4, -0.6));
  vec3 l3 = normalize(vec3(0.1, -0.2, 1.0));
  vec3 l4 = normalize(vec3(0.0, 1.0, 0.0));
  float df = max(dot(vN, l1), 0.0) * 0.32
           + max(dot(vN, l2), 0.0) * 0.16
           + max(dot(vN, l3), 0.0) * 0.12
           + max(dot(vN, l4), 0.0) * 0.10
           + 0.52;

  // Gentle AO at roots
  float ao = 0.70 + 0.30 * smoothstep(0.0, 0.4, vT);
  c *= df * ao;

  // Soft silhouette glow (fake SSS)
  float fresnel = 1.0 - abs(dot(vN, vec3(0.0, 0.0, 1.0)));
  c += fCol * fresnel * fresnel * 0.12 * (1.0 - vT);

  // Smooth alpha fadeout at tips
  float a = 1.0 - smoothstep(0.55, 1.0, t);

  gl_FragColor = vec4(c, a);
}
`
