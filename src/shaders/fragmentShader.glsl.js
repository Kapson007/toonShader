const fragmentShader = `
varying vec3 lightdir;
varying vec3 eyenorm;

 void main() {
    float nn = dot (normalize(lightdir), normalize(eyenorm));
  if (nn > 0.8) {
       nn= 1.0;
    } else if (nn > 0.6) {
       nn = 0.6;
    } else {
       nn = 0.2;
    }
    gl_FragColor = vec4 (nn,nn,nn, 1.0);
 }
`;

export default fragmentShader;
