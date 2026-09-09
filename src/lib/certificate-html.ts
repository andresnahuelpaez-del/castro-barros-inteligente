import { AVALES_PNG_BASE64, AVALES_ORDER } from "./avales-logos";
import { GEIST_VARIABLE_WOFF2_BASE64 } from "./geist-font";

export interface CertificateHTMLData {
  studentName: string;
  courseTitle: string;
  competency: string;
  issuedDate: string;
  code: string;
  /** URL de verificación mostrada al pie (sin protocolo) */
  verificationUrl: string;
  /** QR ya generado como data URI (image/png) */
  qrDataUrl: string;
}

export const CERT_WIDTH = 1600;
export const CERT_HEIGHT = 1131;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const STYLE = `
@font-face{font-family:'Geist';font-style:normal;font-weight:100 900;font-display:block;
 src:url(data:font/woff2;base64,${GEIST_VARIABLE_WOFF2_BASE64}) format('woff2');}
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;}
html,body{width:${CERT_WIDTH}px;height:${CERT_HEIGHT}px;margin:0;background:#050506;}
.cert{position:relative;width:${CERT_WIDTH}px;height:${CERT_HEIGHT}px;overflow:hidden;
 font-family:'Geist','Segoe UI',system-ui,Arial,sans-serif;color:#fff;
 background:radial-gradient(1300px 780px at 50% -12%,rgba(57,255,20,0.10),transparent 60%),
 radial-gradient(1000px 680px at 88% 118%,rgba(168,85,247,0.14),transparent 60%),
 radial-gradient(900px 600px at 8% 108%,rgba(6,182,212,0.07),transparent 60%),#050506;}
.grid{position:absolute;inset:0;
 background-image:radial-gradient(rgba(57,255,20,0.07) 1.2px,transparent 1.2px);
 background-size:38px 38px;-webkit-mask-image:radial-gradient(1200px 800px at 50% 42%,#000 55%,transparent 85%);
 mask-image:radial-gradient(1200px 800px at 50% 42%,#000 55%,transparent 85%);}
.frame{position:absolute;inset:44px;border:1.5px solid rgba(57,255,20,0.38);border-radius:6px;
 box-shadow:inset 0 0 90px rgba(57,255,20,0.05);}
.frame2{position:absolute;inset:56px;border:1px solid rgba(255,255,255,0.06);border-radius:3px;}
.corner{position:absolute;width:64px;height:64px;filter:drop-shadow(0 0 10px rgba(57,255,20,0.65));}
.corner:before,.corner:after{content:"";position:absolute;background:#39FF14;}
.corner:before{width:64px;height:2.5px;}.corner:after{width:2.5px;height:64px;}
.tl{top:34px;left:34px;}.tr{top:34px;right:34px;}.tr:before{right:0;}.tr:after{right:0;}
.bl{bottom:34px;left:34px;}.bl:before{bottom:0;}.bl:after{bottom:0;}
.br{bottom:34px;right:34px;}.br:before{right:0;bottom:0;}.br:after{right:0;bottom:0;}
.inner{position:absolute;left:44px;right:44px;top:44px;display:flex;flex-direction:column;align-items:center;
 padding:66px 96px 0;text-align:center;}
.brand{font-size:23px;font-weight:700;letter-spacing:7px;}
.brand .g{color:#39FF14;text-shadow:0 0 18px rgba(57,255,20,0.55);}
.brand .r{font-size:11px;vertical-align:super;opacity:.8;}
.tag{margin-top:9px;font-size:13px;letter-spacing:4px;color:#9aa;text-transform:uppercase;}
.sep{display:flex;align-items:center;gap:14px;margin:24px 0 4px;}
.sep .l{width:150px;height:1px;background:linear-gradient(90deg,transparent,rgba(57,255,20,.6));}
.sep .r{width:150px;height:1px;background:linear-gradient(90deg,rgba(57,255,20,.6),transparent);}
.dia{width:9px;height:9px;background:#39FF14;transform:rotate(45deg);box-shadow:0 0 12px #39FF14;}
.title{font-size:88px;font-weight:800;letter-spacing:16px;line-height:1;margin-top:12px;
 color:#39FF14;text-shadow:0 0 46px rgba(57,255,20,0.6),0 0 14px rgba(57,255,20,0.4);}
.subtitle{margin-top:14px;font-size:19px;letter-spacing:9px;color:#8fa;opacity:.9;text-transform:uppercase;}
.pre{margin-top:36px;font-size:20px;font-style:italic;color:#9aa;}
.name{margin-top:16px;font-size:74px;font-weight:800;letter-spacing:1px;color:#fff;line-height:1;
 text-shadow:0 0 34px rgba(255,255,255,0.18);}
.nameline{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:20px;}
.nameline .l{width:340px;height:2px;background:linear-gradient(90deg,transparent,#39FF14,transparent);
 box-shadow:0 0 14px rgba(57,255,20,.6);}
.body{margin-top:30px;font-size:20px;color:#d7d7dc;line-height:1.5;max-width:1000px;}
.course{margin-top:18px;font-size:38px;font-weight:800;color:#39FF14;letter-spacing:1px;
 text-shadow:0 0 30px rgba(57,255,20,0.5);}
.comp{margin-top:18px;font-size:15.5px;color:#8a8a92;line-height:1.5;max-width:940px;}
.footer{position:absolute;left:96px;right:96px;bottom:250px;display:flex;align-items:flex-end;
 justify-content:space-between;}
.col{display:flex;flex-direction:column;}
.col.left{align-items:flex-start;text-align:left;width:320px;}
.col.right{align-items:flex-end;text-align:right;width:320px;}
.col.mid{align-items:center;flex:1;}
.k{font-size:12px;letter-spacing:2px;color:#6f6f78;text-transform:uppercase;}
.v{font-size:20px;font-weight:700;color:#fff;margin-top:5px;}
.loc{font-size:13px;color:#7a7a82;margin-top:6px;}
.sig{width:330px;height:1.5px;background:linear-gradient(90deg,transparent,rgba(57,255,20,.55),transparent);
 box-shadow:0 0 12px rgba(57,255,20,.4);}
.signame{font-size:30px;font-weight:800;color:#fff;margin-top:14px;letter-spacing:.5px;
 text-shadow:0 0 24px rgba(255,255,255,0.22);}
.sigrole{font-size:12.5px;color:#9a9aa2;letter-spacing:3px;margin-top:7px;text-transform:uppercase;}
.qrbox{width:118px;height:118px;padding:10px;border:1px solid rgba(57,255,20,0.4);border-radius:10px;
 background:rgba(57,255,20,0.04);box-shadow:0 0 24px rgba(57,255,20,0.14);}
.qrbox img{width:100%;height:100%;display:block;}
.qrlabel{font-size:11px;color:#7a7a82;margin-top:8px;letter-spacing:1px;}
.avales{position:absolute;left:96px;right:96px;bottom:60px;display:flex;flex-direction:column;
 align-items:center;gap:14px;}
.avales .t{font-size:11px;letter-spacing:5px;color:#787882;text-transform:uppercase;}
.avalpanel{display:flex;align-items:center;justify-content:center;gap:53px;padding:18px 51px;
 border-radius:19px;background:rgba(255,255,255,0.045);border:1.5px solid rgba(57,255,20,0.30);
 box-shadow:inset 0 0 46px rgba(57,255,20,0.05),0 0 34px rgba(57,255,20,0.09);
 -webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);}
.avalpanel img{height:49px;width:auto;display:block;opacity:.96;}
.avalpanel .div{width:1px;height:46px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.14),transparent);}
.codebar{position:absolute;left:0;right:0;bottom:22px;text-align:center;font-size:11px;
 letter-spacing:2px;color:#4a4a52;font-family:'Geist',monospace;}
`;

export function buildCertificateHTML(data: CertificateHTMLData): string {
  const logos = AVALES_ORDER.map(
    (n, i) =>
      `<img src="data:image/png;base64,${AVALES_PNG_BASE64[n]}" alt="${n}"/>` +
      (i < AVALES_ORDER.length - 1 ? '<span class="div"></span>' : "")
  ).join("");

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${STYLE}</style></head><body>
<div class="cert">
 <div class="grid"></div>
 <div class="frame"></div><div class="frame2"></div>
 <div class="corner tl"></div><div class="corner tr"></div>
 <div class="corner bl"></div><div class="corner br"></div>
 <div class="inner">
   <div class="brand">CASTRO BARROS <span class="g">INTELIGENTE<span class="r">&reg;</span></span></div>
   <div class="tag">Programa de Capacitaci&oacute;n Digital con Inteligencia Artificial</div>
   <div class="sep"><div class="l"></div><div class="dia"></div><div class="r"></div></div>
   <div class="title">CERTIFICADO</div>
   <div class="subtitle">De Formaci&oacute;n Profesional</div>
   <div class="pre">Se certifica que</div>
   <div class="name">${esc(data.studentName)}</div>
   <div class="nameline"><div class="dia"></div><div class="l"></div><div class="dia"></div></div>
   <div class="body">ha completado satisfactoriamente el programa de formaci&oacute;n profesional</div>
   <div class="course">&laquo; ${esc(data.courseTitle)} &raquo;</div>
   <div class="comp">Demostrando competencias en ${esc(data.competency)}.</div>
 </div>
 <div class="footer">
   <div class="col left">
     <div class="k">Fecha de emisi&oacute;n</div>
     <div class="v">${esc(data.issuedDate)}</div>
     <div class="loc">Departamento Castro Barros &middot; La Rioja, Argentina</div>
   </div>
   <div class="col mid">
     <div class="sig"></div>
     <div class="signame">Marcelo Daniel Del Moral</div>
     <div class="sigrole">Diputado Provincial &middot; La Rioja</div>
   </div>
   <div class="col right">
     <div class="qrbox"><img src="${data.qrDataUrl}" alt="QR"/></div>
     <div class="qrlabel">Verific&aacute; este certificado</div>
   </div>
 </div>
 <div class="avales">
   <div class="t">Con el aval y acompa&ntilde;amiento de</div>
   <div class="avalpanel">${logos}</div>
 </div>
 <div class="codebar">${esc(data.code)}  &middot;  ${esc(data.verificationUrl)}</div>
</div>
</body></html>`;
}
