const fragmentShader = `
varying vec3 lightdir;
varying vec3 eyenorm;

 void main() {
    float intensity;
    vec4 = color;
    vec3 n = normalize(eyenorm);
    intensity = dot (vec3(gl_LightSource[0].position), n);
  if (intensity > 0.95) {
       color= 1.0;
    } else if (intensity > 0.5) {
       color = 0.6;
    } else if (intensity > 0.25) {
       color = 0.4;
    }
    else {
      color = 0.2;
    }
    gl_FragColor = vec4 (color,(color/2),(color/2), 1.0);
 }
`;

export default fragmentShader;
