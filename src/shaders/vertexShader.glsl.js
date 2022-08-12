const vertexShader = `
  layout(location = 3) in vec4 color_in;
  uniform bool chooseVertexColor = true;
  uniform vec4 color = vec4(1.0,1.0,0.0, 1.0);

void main(void) {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    color = (chooseVertexColor)?color_in:color;
  }
`;

export default vertexShader;
