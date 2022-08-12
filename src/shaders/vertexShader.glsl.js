const vertexShader = `
  #version 330 core
  layout(location = 0) in vec3 location_in;
  layout(location = 1) in vec3 normal_in;
  layout(location = 3) in vec4 color_in;
  uniform bool vertexColor = true;
  uniform vec4 color = vec4(1.0,1.0, 0.0, 1.0);

  const mat4 unitMatrix = mat4(1.0);
  uniform mat4 matrixWorld = unitMatrix;
  uniform mat4 matrixVue = unitMatrix;
  uniform mat4 matrixMVP = matrixCast* matrixVue * matrixWorld;
  
  out vec4 location;
  out vec4 color;
  
void main(void) {
    location = vec4(location_in, 1.0);
    gl_Position = matrixMVP * location;

    color = (vertexColor) ? color_in : color;
  }
`;

export default vertexShader;
