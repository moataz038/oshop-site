import{r as c,j as r}from"./index-6ttDirym.js";import{e as u,C as i,u as p,M as y}from"./react-three-fiber.esm-sYP6ER8-.js";const f=`
uniform float uTime; uniform float uAmp; uniform float uSpeed;
varying vec3 vN; varying vec3 vP; varying float vD;
// simplex noise (Ashima)
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
void main(){
  float t=uTime*uSpeed;
  float d=snoise(normal*1.3+vec3(t*0.6,t*0.4,t*0.5))*0.7+snoise(normal*2.6-vec3(t*0.3))*0.18;
  vD=d;
  vec3 pos=position+normal*d*uAmp;
  vN=normalize(normalMatrix*normal); vP=(modelViewMatrix*vec4(pos,1.0)).xyz;
  gl_Position=projectionMatrix*vec4(vP,1.0);
}`,d=`
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uTime;
varying vec3 vN; varying vec3 vP; varying float vD;
void main(){
  vec3 V=normalize(-vP); vec3 N=normalize(vN);
  float fres=pow(1.0-max(dot(N,V),0.0),2.2);
  float m=smoothstep(-0.6,0.8,vD+N.y*0.5+sin(uTime*0.5)*0.1);
  vec3 col=mix(uB,uA,m); col=mix(col,uC,smoothstep(0.35,1.0,N.x*0.5+0.5+vD*0.4)*0.6);
  // specular-ish highlight
  vec3 L=normalize(vec3(-0.6,0.9,1.0)); float spec=pow(max(dot(reflect(-L,N),V),0.0),48.0);
  col+=vec3(1.0)*spec*0.55; col+=vec3(0.9,0.85,1.0)*fres*0.75;
  gl_FragColor=vec4(col,1.0);
}`;function h({level:a,a:t,b:o,c:v}){const n=c.useRef(null),e=c.useMemo(()=>({uTime:{value:0},uAmp:{value:.12},uSpeed:{value:.6},uA:{value:new i(t)},uB:{value:new i(o)},uC:{value:new i(v)}}),[]);c.useEffect(()=>{e.uA.value.set(t),e.uB.value.set(o),e.uC.value.set(v)},[t,o,v,e]);const s=c.useRef(.12);return p((x,l)=>{e.uTime.value=x.clock.elapsedTime;const m=.1+a*.3;s.current=y.lerp(s.current,m,1-Math.pow(.01,l)),e.uAmp.value=s.current,e.uSpeed.value=.5+a*1.2}),r.jsxs("mesh",{children:[r.jsx("icosahedronGeometry",{args:[1,48]}),r.jsx("shaderMaterial",{ref:n,vertexShader:f,fragmentShader:d,uniforms:e})]})}function w({level:a=0,size:t=180}){const[o,v]=c.useState(["#f37022","#f7941d","#ffb070"]);return c.useEffect(()=>{const n=getComputedStyle(document.documentElement);v([n.getPropertyValue("--accent").trim()||"#f37022",n.getPropertyValue("--accent-2").trim()||"#f7941d","#ffb070"])},[]),r.jsx("div",{style:{width:t,height:t,filter:"drop-shadow(0 30px 40px color-mix(in srgb, var(--accent) 45%, transparent))"},children:r.jsx(u,{dpr:[1,1.75],camera:{position:[0,0,3.2],fov:40},gl:{alpha:!0,antialias:!0},style:{background:"transparent"},children:r.jsx(h,{level:a,a:o[0],b:o[1],c:o[2]})})})}export{w as Orb3D};
