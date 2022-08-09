const vertexShader = `
uniform vec3 lightpos;
  varying vec3 lightdir;
  varying vec3 eyenorm;
  
  void main() {
		gl_Position = projectionMatrix* modelViewMatrix * vec4( position, 1.0);
    vec4 eyepos = modelViewMatrix * vec4 (position, 1.0);
    vec4 lighteye = viewMatrix * vec4 (lightpos, 1.0);
    lightdir = lighteye.xyz - eyepos.xyz;
    eyenorm = normalMatrix * normal;
  }
`;

export default vertexShader;
