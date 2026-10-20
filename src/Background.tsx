import { useEffect, useRef } from "react";
import { scroll } from "./scroll";

const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FS =
  "precision mediump float;uniform vec2 r,m;uniform float t,s;"+
  "void main(){vec2 q=(gl_FragCoord.xy/r-.5)*vec2(r.x/r.y,1.);vec2 mm=(m-.5)*vec2(r.x/r.y,1.);vec2 dm=q-mm;float d=length(dm);"+
  "float an=exp(-d*2.2)*2.2;vec2 p=mat2(cos(an),-sin(an),sin(an),cos(an))*dm+mm;p=p*2.6+vec2(0.,s*.9);"+
  "p+=vec2(sin(p.y*1.6+t*.12),cos(p.x*1.4-t*.1))*.8;p+=vec2(sin(p.y*3.1-t*.09),cos(p.x*2.7+t*.11))*.32;"+
  "float f=sin(p.x*1.9)+sin(p.y*2.2)+sin((p.x+p.y)*1.5)+sin(length(p)*1.8-t*.15);float g=fract(f*1.15);"+
  "float ln=smoothstep(.0,.06,g)*smoothstep(.2,.14,g);float l2=smoothstep(.5,.56,g)*smoothstep(.62,.56,g);"+
  "vec3 col=mix(vec3(.925,.29,.118),vec3(.78,.17,.09),ln*.9+l2*.35);col+=vec3(.06,.05,.02)*exp(-d*3.);gl_FragColor=vec4(col,1.);}";

export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const gl = cv.getContext("webgl");
    if (!gl) return;
    const sh = (type: number, src: string) => { const o = gl.createShader(type)!; gl.shaderSource(o, src); gl.compileShader(o); return o; };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(pr, n);
    const ur = U("r"), ut = U("t"), us = U("s"), um = U("m");
    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, raf = 0;
    const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const onMove = (e: PointerEvent) => { tx = e.clientX / innerWidth; ty = 1 - e.clientY / innerHeight; };
    const onScroll = () => { scroll.y = scrollY; };
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, innerWidth < 700 ? 1 : 1.5);
      cv.width = innerWidth * d; cv.height = innerHeight * d;
      gl.viewport(0, 0, cv.width, cv.height);
    };
    addEventListener("pointermove", onMove); addEventListener("resize", size);
    addEventListener("scroll", onScroll, { passive: true });
    size(); onScroll();
    const frame = (ms: number) => {
      scroll.smooth += (scroll.y - scroll.smooth) * 0.08;
      mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
      gl.uniform2f(ur, cv.width, cv.height);
      gl.uniform1f(ut, still ? 0 : ms / 1000);
      gl.uniform1f(us, scroll.smooth / innerHeight);
      gl.uniform2f(um, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      document.documentElement.style.setProperty("--s", scroll.smooth.toFixed(1));
      const bar = document.getElementById("bar");
      if (bar) bar.style.transform = `scaleX(${scroll.y / Math.max(1, document.body.scrollHeight - innerHeight)})`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove); removeEventListener("resize", size); removeEventListener("scroll", onScroll);
    };
  }, []);
  return <canvas id="gl" ref={ref} />;
}
