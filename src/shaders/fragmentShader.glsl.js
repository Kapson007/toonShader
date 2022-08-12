const fragmentShader = `
  #version 330 core
  in vec4 location;
  in vec4 normal;
  in vec4 color;

  unform bool CelShading = true;

  float discreteValue(float value)
{
  if(value < 0) return 0;
  if(value < 0.25) return 0.1;
  if(value < 0.5) return 0.4;
  if(value < 0.75) return 0.7;
  return 1.0;
}
vec4 dicreteColor(vec4 color){
  color.r = discreteValue(color.r);
  color.g = discreteValue(color.g);
  color.b = discreteValue(color.b);
  return color;
}

out vec4 resultColor;

    void main(void) {
      gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0)
      if(CelShading) resultColor = discreteColor(gl_FragColor);
    }
`;

export default fragmentShader;
