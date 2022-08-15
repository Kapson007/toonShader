const vertexShader = `
varying vec3 v_Normal;
void main(void) {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_Normal = normal;
  }
`;

export default vertexShader;
