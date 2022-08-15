const fragmentShader = `
    varying vec3 v_Normal;
    uniform vec3 lightDir;

    void main(void) {
      float intensity;
      vec4 color;
      intensity = dot(vec3(4,4,4),normalize(v_Normal));
      if (intensity > 0.95)
		    color = vec4(1.0,0.5,0.5,1.0);
      else if (intensity > 0.5)
        color = vec4(0.6,0.3,0.3,1.0);
      else if (intensity > 0.25)
        color = vec4(0.4,0.2,0.2,1.0);
      else
        color = vec4(0.2,0.1,0.1,1.0);
      gl_FragColor = color;
    }
`;

// const fragmentShader = `
// varying vec3 lightdir;
// varying vec3 eyenorm;

//   void main() {
//           //vec3 lightdir = vec3 (1,1,2);
//     float ndotl = dot (normalize (eyenorm), normalize (lightdir));
//     if (ndotl > 0.8) {
//       ndotl = 1.0;
//     } else if (ndotl > 0.6) {
//       ndotl = 0.6;
//     } else {
//       ndotl = 0.2;
//     }
//     gl_FragColor = vec4 (ndotl, ndotl, ndotl, 1.0);
//   }
// `;

export default fragmentShader;
