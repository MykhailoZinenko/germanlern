export const furVertexShader = /* glsl */ `
#include <common>
#ifdef USE_SKINNING
  #include <skinning_pars_vertex>
#endif

uniform float si, sc, sp;
uniform vec3 grav, vel;
uniform float wind, time;
uniform int hasCut;
uniform vec3 eL, eR;
uniform float cZ, cF;

varying vec3 vPos;
varying float vT, vDen;
varying vec3 vN;

void main() {
  vT = si / sc;
  vN = normalize(normalMatrix * normal);
  vPos = position;

  vec3 transformed = position;
  vec3 objectNormal = normal;

  #ifdef USE_SKINNING
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <skinning_vertex>
    vPos = transformed;
    vN = normalize(normalMatrix * objectNormal);
  #endif

  float t = si * sp;
  vec3 d = transformed + objectNormal * t;

  // Physics
  float inf = vT * vT;
  vec3 wn = normalize((modelMatrix * vec4(objectNormal, 0.0)).xyz);

  // Gravity projected along surface
  vec3 gv = grav * inf * 0.22;
  gv -= wn * dot(gv, wn) * 0.65;
  d += (inverse(modelMatrix) * vec4(gv, 0.0)).xyz;

  // Velocity reaction
  d += (inverse(modelMatrix) * vec4(vel * inf * 0.35, 0.0)).xyz;

  // Multi-frequency wind
  float wp = time * 1.2 + transformed.x * 3.5 + transformed.y * 2.8 + transformed.z * 2.0;
  vec3 wd = vec3(
    sin(wp) * 0.12 + sin(wp * 0.55 + 1.3) * 0.06,
    cos(wp * 0.4) * 0.05,
    sin(wp * 0.7 + 2.1) * 0.08
  );
  d += (inverse(modelMatrix) * vec4(wd * wind * inf, 0.0)).xyz;

  // Eye cutout density
  vDen = 1.0;
  if (hasCut == 1) {
    float dL = length(d - eL);
    float dR = length(d - eR);
    float dm = min(dL, dR);
    if (dm < cF) vDen = smoothstep(cZ, cF, dm);
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(d, 1.0);
}
`
