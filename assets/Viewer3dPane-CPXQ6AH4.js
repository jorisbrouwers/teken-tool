import{g as is,f as $t,r as Re,j as C,a as qh,b as _n,n as us,c as Zh,l as Jh,K as Vu,d as po,e as Zr,k as Hu,h as Qh,z as ed,V as td,i as nd,m as Ws,o as id,p as rd,s as sd,q as Gu,t as oa,u as ad,v as od,w as ld,x as cd,y as ud,A as hd,B as dd,_ as fd,C as pd,D as md,E as gd,F as _d,G as vd,H as xd,I as Fl,J as Md,L as Sd}from"./index-DJJipgnK.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hl="170",hr={ROTATE:0,DOLLY:1,PAN:2},or={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},yd=0,zl=1,Ed=2,dl=1,bd=2,Yn=3,Fn=0,nn=1,gn=2,mi=0,dr=1,Bl=2,Vl=3,Hl=4,wd=5,Pi=100,Td=101,Ad=102,Rd=103,Cd=104,Pd=200,Ld=201,Dd=202,Nd=203,mo=204,go=205,kd=206,Id=207,Ud=208,Od=209,Fd=210,zd=211,Bd=212,Vd=213,Hd=214,_o=0,vo=1,xo=2,vr=3,Mo=4,So=5,yo=6,Eo=7,fl=0,Gd=1,jd=2,gi=0,Wd=1,Xd=2,$d=3,Kd=4,Yd=5,qd=6,Zd=7,ju=300,xr=301,Mr=302,bo=303,wo=304,la=306,To=1e3,Di=1001,Ao=1002,vn=1003,Jd=1004,hs=1005,bn=1006,ma=1007,Ni=1008,ei=1009,Wu=1010,Xu=1011,Jr=1012,pl=1013,ki=1014,qn=1015,rs=1016,ml=1017,gl=1018,Sr=1020,$u=35902,Ku=1021,Yu=1022,Dn=1023,qu=1024,Zu=1025,fr=1026,yr=1027,Ju=1028,_l=1029,Qu=1030,vl=1031,xl=1033,Xs=33776,$s=33777,Ks=33778,Ys=33779,Ro=35840,Co=35841,Po=35842,Lo=35843,Do=36196,No=37492,ko=37496,Io=37808,Uo=37809,Oo=37810,Fo=37811,zo=37812,Bo=37813,Vo=37814,Ho=37815,Go=37816,jo=37817,Wo=37818,Xo=37819,$o=37820,Ko=37821,qs=36492,Yo=36494,qo=36495,eh=36283,Zo=36284,Jo=36285,Qo=36286,Qd=3200,ef=3201,Ml=0,tf=1,fi="",pn="srgb",br="srgb-linear",ca="linear",Mt="srgb",Bi=7680,Gl=519,nf=512,rf=513,sf=514,th=515,af=516,of=517,lf=518,cf=519,el=35044,jl="300 es",Zn=2e3,na=2001;class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wl=1234567;const jr=Math.PI/180,Qr=180/Math.PI;function Un(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function Gt(n,e,t){return Math.max(e,Math.min(t,n))}function Sl(n,e){return(n%e+e)%e}function uf(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function hf(n,e,t){return n!==e?(t-n)/(e-n):0}function Wr(n,e,t){return(1-t)*n+t*e}function df(n,e,t,i){return Wr(n,e,1-Math.exp(-t*i))}function ff(n,e=1){return e-Math.abs(Sl(n,e*2)-e)}function pf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function mf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function gf(n,e){return n+Math.floor(Math.random()*(e-n+1))}function _f(n,e){return n+Math.random()*(e-n)}function vf(n){return n*(.5-Math.random())}function xf(n){n!==void 0&&(Wl=n);let e=Wl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mf(n){return n*jr}function Sf(n){return n*Qr}function yf(n){return(n&n-1)===0&&n!==0}function Ef(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function bf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function wf(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),u=a((e+i)/2),d=s((e-i)/2),p=a((e-i)/2),f=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*u,l*d,l*p,o*c);break;case"YZY":n.set(l*p,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*p,o*u,o*c);break;case"XZX":n.set(o*u,l*g,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*g,o*c);break;case"ZYZ":n.set(l*g,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function xt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Rt={DEG2RAD:jr,RAD2DEG:Qr,generateUUID:Un,clamp:Gt,euclideanModulo:Sl,mapLinear:uf,inverseLerp:hf,lerp:Wr,damp:df,pingpong:ff,smoothstep:pf,smootherstep:mf,randInt:gf,randFloat:_f,randFloatSpread:vf,seededRandom:xf,degToRad:Mf,radToDeg:Sf,isPowerOfTwo:yf,ceilPowerOfTwo:Ef,floorPowerOfTwo:bf,setQuaternionFromProperEuler:wf,normalize:xt,denormalize:Ln};class pe{constructor(e=0,t=0){pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Gt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,i,r,s,a,o,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],p=i[2],f=i[5],g=i[8],_=r[0],m=r[3],h=r[6],y=r[1],M=r[4],x=r[7],F=r[2],P=r[5],L=r[8];return s[0]=a*_+o*y+l*F,s[3]=a*m+o*M+l*P,s[6]=a*h+o*x+l*L,s[1]=c*_+u*y+d*F,s[4]=c*m+u*M+d*P,s[7]=c*h+u*x+d*L,s[2]=p*_+f*y+g*F,s[5]=p*m+f*M+g*P,s[8]=p*h+f*x+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,p=o*l-u*s,f=c*s-a*l,g=t*d+i*p+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*c-u*i)*_,e[2]=(o*i-r*a)*_,e[3]=p*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ga.makeScale(e,t)),this}rotate(e){return this.premultiply(ga.makeRotation(-e)),this}translate(e,t){return this.premultiply(ga.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ga=new Qe;function nh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ia(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Tf(){const n=ia("canvas");return n.style.display="block",n}const Xl={};function zr(n){n in Xl||(Xl[n]=!0,console.warn(n))}function Af(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function Rf(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Cf(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const dt={enabled:!0,workingColorSpace:br,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Mt&&(n.r=Qn(n.r),n.g=Qn(n.g),n.b=Qn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Mt&&(n.r=pr(n.r),n.g=pr(n.g),n.b=pr(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===fi?ca:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Qn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function pr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const $l=[.64,.33,.3,.6,.15,.06],Kl=[.2126,.7152,.0722],Yl=[.3127,.329],ql=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zl=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);dt.define({[br]:{primaries:$l,whitePoint:Yl,transfer:ca,toXYZ:ql,fromXYZ:Zl,luminanceCoefficients:Kl,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:$l,whitePoint:Yl,transfer:Mt,toXYZ:ql,fromXYZ:Zl,luminanceCoefficients:Kl,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}});let Vi;class Pf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Vi===void 0&&(Vi=ia("canvas")),Vi.width=e.width,Vi.height=e.height;const i=Vi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Vi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ia("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Qn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Qn(t[i]/255)*255):t[i]=Qn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Lf=0;class ih{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Un(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(_a(r[a].image)):s.push(_a(r[a]))}else s=_a(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function _a(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Pf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Df=0;class rn extends Fi{constructor(e=rn.DEFAULT_IMAGE,t=rn.DEFAULT_MAPPING,i=Di,r=Di,s=bn,a=Ni,o=Dn,l=ei,c=rn.DEFAULT_ANISOTROPY,u=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=Un(),this.name="",this.source=new ih(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ju)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case To:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case Ao:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case To:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case Ao:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=ju;rn.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,i=0,r=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],p=l[1],f=l[5],g=l[9],_=l[2],m=l[6],h=l[10];if(Math.abs(u-p)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,x=(f+1)/2,F=(h+1)/2,P=(u+p)/4,L=(d+_)/4,D=(g+m)/4;return M>x&&M>F?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=P/i,s=L/i):x>F?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=P/r,s=D/r):F<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(F),i=L/s,r=D/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(p-u)*(p-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-_)/y,this.z=(p-u)/y,this.w=Math.acos((c+f+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nf extends Fi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new rn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ih(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class On extends Nf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class rh extends rn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=vn,this.minFilter=vn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class kf extends rn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=vn,this.minFilter=vn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const p=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=p,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==p||c!==f||u!==g){let m=1-o;const h=l*p+c*f+u*g+d*_,y=h>=0?1:-1,M=1-h*h;if(M>Number.EPSILON){const F=Math.sqrt(M),P=Math.atan2(F,h*y);m=Math.sin(m*P)/F,o=Math.sin(o*P)/F}const x=o*y;if(l=l*m+p*x,c=c*m+f*x,u=u*m+g*x,d=d*m+_*x,m===1-o){const F=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=F,c*=F,u*=F,d*=F}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[a],p=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+u*d+l*f-c*p,e[t+1]=l*g+u*p+c*d-o*f,e[t+2]=c*g+u*f+o*p-l*d,e[t+3]=u*g-o*d-l*p-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),d=o(s/2),p=l(i/2),f=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=p*u*d+c*f*g,this._y=c*f*d-p*u*g,this._z=c*u*g+p*f*d,this._w=c*u*d-p*f*g;break;case"YXZ":this._x=p*u*d+c*f*g,this._y=c*f*d-p*u*g,this._z=c*u*g-p*f*d,this._w=c*u*d+p*f*g;break;case"ZXY":this._x=p*u*d-c*f*g,this._y=c*f*d+p*u*g,this._z=c*u*g+p*f*d,this._w=c*u*d-p*f*g;break;case"ZYX":this._x=p*u*d-c*f*g,this._y=c*f*d+p*u*g,this._z=c*u*g-p*f*d,this._w=c*u*d+p*f*g;break;case"YZX":this._x=p*u*d+c*f*g,this._y=c*f*d+p*u*g,this._z=c*u*g-p*f*d,this._w=c*u*d-p*f*g;break;case"XZY":this._x=p*u*d-c*f*g,this._y=c*f*d-p*u*g,this._z=c*u*g+p*f*d,this._w=c*u*d+p*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],p=i+o+d;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Gt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,p=Math.sin(t*u)/c;return this._w=a*d+this._w*p,this._x=i*d+this._x*p,this._y=r*d+this._y*p,this._z=s*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,i=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return va.copy(this).projectOnVector(e),this.sub(va)}reflect(e){return this.sub(va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Gt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const va=new R,Jl=new vi;class Ii{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Rn):Rn.fromBufferAttribute(s,a),Rn.applyMatrix4(e.matrixWorld),this.expandByPoint(Rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ds.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ds.copy(i.boundingBox)),ds.applyMatrix4(e.matrixWorld),this.union(ds)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Rn),Rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rr),fs.subVectors(this.max,Rr),Hi.subVectors(e.a,Rr),Gi.subVectors(e.b,Rr),ji.subVectors(e.c,Rr),ai.subVectors(Gi,Hi),oi.subVectors(ji,Gi),Ei.subVectors(Hi,ji);let t=[0,-ai.z,ai.y,0,-oi.z,oi.y,0,-Ei.z,Ei.y,ai.z,0,-ai.x,oi.z,0,-oi.x,Ei.z,0,-Ei.x,-ai.y,ai.x,0,-oi.y,oi.x,0,-Ei.y,Ei.x,0];return!xa(t,Hi,Gi,ji,fs)||(t=[1,0,0,0,1,0,0,0,1],!xa(t,Hi,Gi,ji,fs))?!1:(ps.crossVectors(ai,oi),t=[ps.x,ps.y,ps.z],xa(t,Hi,Gi,ji,fs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const jn=[new R,new R,new R,new R,new R,new R,new R,new R],Rn=new R,ds=new Ii,Hi=new R,Gi=new R,ji=new R,ai=new R,oi=new R,Ei=new R,Rr=new R,fs=new R,ps=new R,bi=new R;function xa(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){bi.fromArray(n,s);const o=r.x*Math.abs(bi.x)+r.y*Math.abs(bi.y)+r.z*Math.abs(bi.z),l=e.dot(bi),c=t.dot(bi),u=i.dot(bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const If=new Ii,Cr=new R,Ma=new R;class Ui{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):If.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cr.subVectors(e,this.center);const t=Cr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Cr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cr.copy(e.center).add(Ma)),this.expandByPoint(Cr.copy(e.center).sub(Ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Wn=new R,Sa=new R,ms=new R,li=new R,ya=new R,gs=new R,Ea=new R;class ss{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Sa.copy(e).add(t).multiplyScalar(.5),ms.copy(t).sub(e).normalize(),li.copy(this.origin).sub(Sa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ms),o=li.dot(this.direction),l=-li.dot(ms),c=li.lengthSq(),u=Math.abs(1-a*a);let d,p,f,g;if(u>0)if(d=a*l-o,p=a*o-l,g=s*u,d>=0)if(p>=-g)if(p<=g){const _=1/u;d*=_,p*=_,f=d*(d+a*p+2*o)+p*(a*d+p+2*l)+c}else p=s,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;else p=-s,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;else p<=-g?(d=Math.max(0,-(-a*s+o)),p=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+p*(p+2*l)+c):p<=g?(d=0,p=Math.min(Math.max(-s,-l),s),f=p*(p+2*l)+c):(d=Math.max(0,-(a*s+o)),p=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+p*(p+2*l)+c);else p=a>0?-s:s,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Sa).addScaledVector(ms,p),f}intersectSphere(e,t){Wn.subVectors(e.center,this.origin);const i=Wn.dot(this.direction),r=Wn.dot(Wn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(i=(e.min.x-p.x)*c,r=(e.max.x-p.x)*c):(i=(e.max.x-p.x)*c,r=(e.min.x-p.x)*c),u>=0?(s=(e.min.y-p.y)*u,a=(e.max.y-p.y)*u):(s=(e.max.y-p.y)*u,a=(e.min.y-p.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-p.z)*d,l=(e.max.z-p.z)*d):(o=(e.max.z-p.z)*d,l=(e.min.z-p.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,i,r,s){ya.subVectors(t,e),gs.subVectors(i,e),Ea.crossVectors(ya,gs);let a=this.direction.dot(Ea),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;li.subVectors(this.origin,e);const l=o*this.direction.dot(gs.crossVectors(li,gs));if(l<0)return null;const c=o*this.direction.dot(ya.cross(li));if(c<0||l+c>a)return null;const u=-o*li.dot(Ea);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _t{constructor(e,t,i,r,s,a,o,l,c,u,d,p,f,g,_,m){_t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,d,p,f,g,_,m)}set(e,t,i,r,s,a,o,l,c,u,d,p,f,g,_,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=p,h[3]=f,h[7]=g,h[11]=_,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Wi.setFromMatrixColumn(e,0).length(),s=1/Wi.setFromMatrixColumn(e,1).length(),a=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const p=a*u,f=a*d,g=o*u,_=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=p-_*c,t[9]=-o*l,t[2]=_-p*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const p=l*u,f=l*d,g=c*u,_=c*d;t[0]=p+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=_+p*o,t[10]=a*l}else if(e.order==="ZXY"){const p=l*u,f=l*d,g=c*u,_=c*d;t[0]=p-_*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=_-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const p=a*u,f=a*d,g=o*u,_=o*d;t[0]=l*u,t[4]=g*c-f,t[8]=p*c+_,t[1]=l*d,t[5]=_*c+p,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const p=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-p*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+g,t[10]=p-_*d}else if(e.order==="XZY"){const p=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=p*d+_,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=_*d+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Uf,e,Of)}lookAt(e,t,i){const r=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),ci.crossVectors(i,dn),ci.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),ci.crossVectors(i,dn)),ci.normalize(),_s.crossVectors(dn,ci),r[0]=ci.x,r[4]=_s.x,r[8]=dn.x,r[1]=ci.y,r[5]=_s.y,r[9]=dn.y,r[2]=ci.z,r[6]=_s.z,r[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],p=i[9],f=i[13],g=i[2],_=i[6],m=i[10],h=i[14],y=i[3],M=i[7],x=i[11],F=i[15],P=r[0],L=r[4],D=r[8],T=r[12],v=r[1],w=r[5],H=r[9],V=r[13],W=r[2],$=r[6],X=r[10],oe=r[14],G=r[3],de=r[7],se=r[11],me=r[15];return s[0]=a*P+o*v+l*W+c*G,s[4]=a*L+o*w+l*$+c*de,s[8]=a*D+o*H+l*X+c*se,s[12]=a*T+o*V+l*oe+c*me,s[1]=u*P+d*v+p*W+f*G,s[5]=u*L+d*w+p*$+f*de,s[9]=u*D+d*H+p*X+f*se,s[13]=u*T+d*V+p*oe+f*me,s[2]=g*P+_*v+m*W+h*G,s[6]=g*L+_*w+m*$+h*de,s[10]=g*D+_*H+m*X+h*se,s[14]=g*T+_*V+m*oe+h*me,s[3]=y*P+M*v+x*W+F*G,s[7]=y*L+M*w+x*$+F*de,s[11]=y*D+M*H+x*X+F*se,s[15]=y*T+M*V+x*oe+F*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],p=e[10],f=e[14],g=e[3],_=e[7],m=e[11],h=e[15];return g*(+s*l*d-r*c*d-s*o*p+i*c*p+r*o*f-i*l*f)+_*(+t*l*f-t*c*p+s*a*p-r*a*f+r*c*u-s*l*u)+m*(+t*c*d-t*o*f-s*a*d+i*a*f+s*o*u-i*c*u)+h*(-r*o*u-t*l*d+t*o*p+r*a*d-i*a*p+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],p=e[10],f=e[11],g=e[12],_=e[13],m=e[14],h=e[15],y=d*m*c-_*p*c+_*l*f-o*m*f-d*l*h+o*p*h,M=g*p*c-u*m*c-g*l*f+a*m*f+u*l*h-a*p*h,x=u*_*c-g*d*c+g*o*f-a*_*f-u*o*h+a*d*h,F=g*d*l-u*_*l-g*o*p+a*_*p+u*o*m-a*d*m,P=t*y+i*M+r*x+s*F;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/P;return e[0]=y*L,e[1]=(_*p*s-d*m*s-_*r*f+i*m*f+d*r*h-i*p*h)*L,e[2]=(o*m*s-_*l*s+_*r*c-i*m*c-o*r*h+i*l*h)*L,e[3]=(d*l*s-o*p*s-d*r*c+i*p*c+o*r*f-i*l*f)*L,e[4]=M*L,e[5]=(u*m*s-g*p*s+g*r*f-t*m*f-u*r*h+t*p*h)*L,e[6]=(g*l*s-a*m*s-g*r*c+t*m*c+a*r*h-t*l*h)*L,e[7]=(a*p*s-u*l*s+u*r*c-t*p*c-a*r*f+t*l*f)*L,e[8]=x*L,e[9]=(g*d*s-u*_*s-g*i*f+t*_*f+u*i*h-t*d*h)*L,e[10]=(a*_*s-g*o*s+g*i*c-t*_*c-a*i*h+t*o*h)*L,e[11]=(u*o*s-a*d*s-u*i*c+t*d*c+a*i*f-t*o*f)*L,e[12]=F*L,e[13]=(u*_*r-g*d*r+g*i*p-t*_*p-u*i*m+t*d*m)*L,e[14]=(g*o*r-a*_*r-g*i*l+t*_*l+a*i*m-t*o*m)*L,e[15]=(a*d*r-u*o*r+u*i*l-t*d*l-a*i*p+t*o*p)*L,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,p=s*c,f=s*u,g=s*d,_=a*u,m=a*d,h=o*d,y=l*c,M=l*u,x=l*d,F=i.x,P=i.y,L=i.z;return r[0]=(1-(_+h))*F,r[1]=(f+x)*F,r[2]=(g-M)*F,r[3]=0,r[4]=(f-x)*P,r[5]=(1-(p+h))*P,r[6]=(m+y)*P,r[7]=0,r[8]=(g+M)*L,r[9]=(m-y)*L,r[10]=(1-(p+_))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Wi.set(r[0],r[1],r[2]).length();const a=Wi.set(r[4],r[5],r[6]).length(),o=Wi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Cn.copy(this);const c=1/s,u=1/a,d=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=d,Cn.elements[9]*=d,Cn.elements[10]*=d,t.setFromRotationMatrix(Cn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Zn){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let f,g;if(o===Zn)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===na)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Zn){const l=this.elements,c=1/(t-e),u=1/(i-r),d=1/(a-s),p=(t+e)*c,f=(i+r)*u;let g,_;if(o===Zn)g=(a+s)*d,_=-2*d;else if(o===na)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Wi=new R,Cn=new _t,Uf=new R(0,0,0),Of=new R(1,1,1),ci=new R,_s=new R,dn=new R,Ql=new _t,ec=new vi;class zn{constructor(e=0,t=0,i=0,r=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],p=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Gt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ql.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ql,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ec.setFromEuler(this),this.setFromQuaternion(ec,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class yl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ff=0;const tc=new R,Xi=new vi,Xn=new _t,vs=new R,Pr=new R,zf=new R,Bf=new vi,nc=new R(1,0,0),ic=new R(0,1,0),rc=new R(0,0,1),sc={type:"added"},Vf={type:"removed"},$i={type:"childadded",child:null},ba={type:"childremoved",child:null};class kt extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new R,t=new zn,i=new vi,r=new R(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new Qe}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis(nc,e)}rotateY(e){return this.rotateOnAxis(ic,e)}rotateZ(e){return this.rotateOnAxis(rc,e)}translateOnAxis(e,t){return tc.copy(e).applyQuaternion(this.quaternion),this.position.add(tc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nc,e)}translateY(e){return this.translateOnAxis(ic,e)}translateZ(e){return this.translateOnAxis(rc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?vs.copy(e):vs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Pr,vs,this.up):Xn.lookAt(vs,Pr,this.up),this.quaternion.setFromRotationMatrix(Xn),r&&(Xn.extractRotation(r.matrixWorld),Xi.setFromRotationMatrix(Xn),this.quaternion.premultiply(Xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sc),$i.child=e,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vf),ba.child=e,this.dispatchEvent(ba),ba.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sc),$i.child=e,this.dispatchEvent($i),$i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,e,zf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,Bf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),p=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),p.length>0&&(i.skeletons=p),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}kt.DEFAULT_UP=new R(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new R,$n=new R,wa=new R,Kn=new R,Ki=new R,Yi=new R,ac=new R,Ta=new R,Aa=new R,Ra=new R,Ca=new Ct,Pa=new Ct,La=new Ct;class En{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Pn.subVectors(e,t),r.cross(Pn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Pn.subVectors(r,t),$n.subVectors(i,t),wa.subVectors(e,t);const a=Pn.dot(Pn),o=Pn.dot($n),l=Pn.dot(wa),c=$n.dot($n),u=$n.dot(wa),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const p=1/d,f=(c*l-o*u)*p,g=(a*u-o*l)*p;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Kn.x),l.addScaledVector(a,Kn.y),l.addScaledVector(o,Kn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Ca.setScalar(0),Pa.setScalar(0),La.setScalar(0),Ca.fromBufferAttribute(e,t),Pa.fromBufferAttribute(e,i),La.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ca,s.x),a.addScaledVector(Pa,s.y),a.addScaledVector(La,s.z),a}static isFrontFacing(e,t,i,r){return Pn.subVectors(i,t),$n.subVectors(e,t),Pn.cross($n).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),Pn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return En.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Ki.subVectors(r,i),Yi.subVectors(s,i),Ta.subVectors(e,i);const l=Ki.dot(Ta),c=Yi.dot(Ta);if(l<=0&&c<=0)return t.copy(i);Aa.subVectors(e,r);const u=Ki.dot(Aa),d=Yi.dot(Aa);if(u>=0&&d<=u)return t.copy(r);const p=l*d-u*c;if(p<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Ki,a);Ra.subVectors(e,s);const f=Ki.dot(Ra),g=Yi.dot(Ra);if(g>=0&&f<=g)return t.copy(s);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Yi,o);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return ac.subVectors(s,r),o=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(ac,o);const h=1/(m+_+p);return a=_*h,o=p*h,t.copy(i).addScaledVector(Ki,a).addScaledVector(Yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const sh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},xs={h:0,s:0,l:0};function Da(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class tt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=dt.workingColorSpace){if(e=Sl(e,1),t=Gt(t,0,1),i=Gt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Da(a,s,e+1/3),this.g=Da(a,s,e),this.b=Da(a,s,e-1/3)}return dt.toWorkingColorSpace(this,r),this}setStyle(e,t=pn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){const i=sh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qn(e.r),this.g=Qn(e.g),this.b=Qn(e.b),this}copyLinearToSRGB(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return dt.fromWorkingColorSpace(Jt.copy(this),e),Math.round(Gt(Jt.r*255,0,255))*65536+Math.round(Gt(Jt.g*255,0,255))*256+Math.round(Gt(Jt.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(Jt.copy(this),t);const i=Jt.r,r=Jt.g,s=Jt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=pn){dt.fromWorkingColorSpace(Jt.copy(this),e);const t=Jt.r,i=Jt.g,r=Jt.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(xs);const i=Wr(ui.h,xs.h,t),r=Wr(ui.s,xs.s,t),s=Wr(ui.l,xs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new tt;tt.NAMES=sh;let Hf=0;class Bn extends Fi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=Un(),this.name="",this.blending=dr,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mo,this.blendDst=go,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==dr&&(i.blending=this.blending),this.side!==Fn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==mo&&(i.blendSrc=this.blendSrc),this.blendDst!==go&&(i.blendDst=this.blendDst),this.blendEquation!==Pi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ua extends Bn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new R,Ms=new pe;class an{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=el,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ms.fromBufferAttribute(this,t),Ms.applyMatrix3(e),this.setXY(t,Ms.x,Ms.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ln(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ln(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ln(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ln(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==el&&(e.usage=this.usage),e}}class ah extends an{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class oh extends an{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class It extends an{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Gf=0;const yn=new _t,Na=new kt,qi=new R,fn=new Ii,Lr=new Ii,Ht=new R;class Lt extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=Un(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nh(e)?oh:ah)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Qe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,i){return yn.makeTranslation(e,t,i),this.applyMatrix4(yn),this}scale(e,t,i){return yn.makeScale(e,t,i),this.applyMatrix4(yn),this}lookAt(e){return Na.lookAt(e),Na.updateMatrix(),this.applyMatrix4(Na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new It(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ii);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Lr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(fn.min,Lr.min),fn.expandByPoint(Ht),Ht.addVectors(fn.max,Lr.max),fn.expandByPoint(Ht)):(fn.expandByPoint(Lr.min),fn.expandByPoint(Lr.max))}fn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ht.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ht));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ht.fromBufferAttribute(o,c),l&&(qi.fromBufferAttribute(e,c),Ht.add(qi)),r=Math.max(r,i.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new R,l[D]=new R;const c=new R,u=new R,d=new R,p=new pe,f=new pe,g=new pe,_=new R,m=new R;function h(D,T,v){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,T),d.fromBufferAttribute(i,v),p.fromBufferAttribute(s,D),f.fromBufferAttribute(s,T),g.fromBufferAttribute(s,v),u.sub(c),d.sub(c),f.sub(p),g.sub(p);const w=1/(f.x*g.y-g.x*f.y);isFinite(w)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(w),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(w),o[D].add(_),o[T].add(_),o[v].add(_),l[D].add(m),l[T].add(m),l[v].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let D=0,T=y.length;D<T;++D){const v=y[D],w=v.start,H=v.count;for(let V=w,W=w+H;V<W;V+=3)h(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const M=new R,x=new R,F=new R,P=new R;function L(D){F.fromBufferAttribute(r,D),P.copy(F);const T=o[D];M.copy(T),M.sub(F.multiplyScalar(F.dot(T))).normalize(),x.crossVectors(P,T);const w=x.dot(l[D])<0?-1:1;a.setXYZW(D,M.x,M.y,M.z,w)}for(let D=0,T=y.length;D<T;++D){const v=y[D],w=v.start,H=v.count;for(let V=w,W=w+H;V<W;V+=3)L(e.getX(V+0)),L(e.getX(V+1)),L(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new an(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,f=i.count;p<f;p++)i.setXYZ(p,0,0,0);const r=new R,s=new R,a=new R,o=new R,l=new R,c=new R,u=new R,d=new R;if(e)for(let p=0,f=e.count;p<f;p+=3){const g=e.getX(p+0),_=e.getX(p+1),m=e.getX(p+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,f=t.count;p<f;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(p+0,u.x,u.y,u.z),i.setXYZ(p+1,u.x,u.y,u.z),i.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,p=new c.constructor(l.length*u);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let h=0;h<u;h++)p[g++]=c[f++]}return new an(p,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const p=c[u],f=e(p,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,p=c.length;d<p;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let p=0,f=d.length;p<f;p++)u.push(d[p].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const oc=new _t,wi=new ss,Ss=new Ui,lc=new R,ys=new R,Es=new R,bs=new R,ka=new R,ws=new R,cc=new R,Ts=new R;class Kt extends kt{constructor(e=new Lt,t=new ua){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ws.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(ka.fromBufferAttribute(d,e),a?ws.addScaledVector(ka,u):ws.addScaledVector(ka.sub(t),u))}t.add(ws)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ss.copy(i.boundingSphere),Ss.applyMatrix4(s),wi.copy(e.ray).recast(e.near),!(Ss.containsPoint(wi.origin)===!1&&(wi.intersectSphere(Ss,lc)===null||wi.origin.distanceToSquared(lc)>(e.far-e.near)**2))&&(oc.copy(s).invert(),wi.copy(e.ray).applyMatrix4(oc),!(i.boundingBox!==null&&wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,p=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){const m=p[g],h=a[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,F=M;x<F;x+=3){const P=o.getX(x),L=o.getX(x+1),D=o.getX(x+2);r=As(this,h,e,i,c,u,d,P,L,D),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,h=_;m<h;m+=3){const y=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);r=As(this,a,e,i,c,u,d,y,M,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){const m=p[g],h=a[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,F=M;x<F;x+=3){const P=x,L=x+1,D=x+2;r=As(this,h,e,i,c,u,d,P,L,D),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,h=_;m<h;m+=3){const y=m,M=m+1,x=m+2;r=As(this,a,e,i,c,u,d,y,M,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function jf(n,e,t,i,r,s,a,o){let l;if(e.side===nn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Fn,o),l===null)return null;Ts.copy(o),Ts.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ts);return c<t.near||c>t.far?null:{distance:c,point:Ts.clone(),object:n}}function As(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ys),n.getVertexPosition(l,Es),n.getVertexPosition(c,bs);const u=jf(n,e,t,i,ys,Es,bs,cc);if(u){const d=new R;En.getBarycoord(cc,ys,Es,bs,d),r&&(u.uv=En.getInterpolatedAttribute(r,o,l,c,d,new pe)),s&&(u.uv1=En.getInterpolatedAttribute(s,o,l,c,d,new pe)),a&&(u.normal=En.getInterpolatedAttribute(a,o,l,c,d,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:l,c,normal:new R,materialIndex:0};En.getNormal(ys,Es,bs,p.normal),u.face=p,u.barycoord=d}return u}class as extends Lt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let p=0,f=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new It(c,3)),this.setAttribute("normal",new It(u,3)),this.setAttribute("uv",new It(d,2));function g(_,m,h,y,M,x,F,P,L,D,T){const v=x/L,w=F/D,H=x/2,V=F/2,W=P/2,$=L+1,X=D+1;let oe=0,G=0;const de=new R;for(let se=0;se<X;se++){const me=se*w-V;for(let Ae=0;Ae<$;Ae++){const Be=Ae*v-H;de[_]=Be*y,de[m]=me*M,de[h]=W,c.push(de.x,de.y,de.z),de[_]=0,de[m]=0,de[h]=P>0?1:-1,u.push(de.x,de.y,de.z),d.push(Ae/L),d.push(1-se/D),oe+=1}}for(let se=0;se<D;se++)for(let me=0;me<L;me++){const Ae=p+me+$*se,Be=p+me+$*(se+1),Q=p+(me+1)+$*(se+1),he=p+(me+1)+$*se;l.push(Ae,Be,he),l.push(Be,Q,he),G+=6}o.addGroup(f,G,T),f+=G,p+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Er(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function tn(n){const e={};for(let t=0;t<n.length;t++){const i=Er(n[t]);for(const r in i)e[r]=i[r]}return e}function Wf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function lh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const Xf={clone:Er,merge:tn};var $f=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends Bn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$f,this.fragmentShader=Kf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Er(e.uniforms),this.uniformsGroups=Wf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ch extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new R,uc=new pe,hc=new pe;class mn extends ch{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qr*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,uc,hc),t.subVectors(hc,uc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(jr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Zi=-90,Ji=1;class Yf extends kt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new mn(Zi,Ji,e,t);r.layers=this.layers,this.add(r);const s=new mn(Zi,Ji,e,t);s.layers=this.layers,this.add(s);const a=new mn(Zi,Ji,e,t);a.layers=this.layers,this.add(a);const o=new mn(Zi,Ji,e,t);o.layers=this.layers,this.add(o);const l=new mn(Zi,Ji,e,t);l.layers=this.layers,this.add(l);const c=new mn(Zi,Ji,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===na)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,p,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class uh extends rn{constructor(e,t,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:xr,super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qf extends On{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new uh(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new as(5,5,5),s=new wn({name:"CubemapFromEquirect",uniforms:Er(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:nn,blending:mi});s.uniforms.tEquirect.value=t;const a=new Kt(r,s),o=t.minFilter;return t.minFilter===Ni&&(t.minFilter=bn),new Yf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Ia=new R,Zf=new R,Jf=new Qe;class di{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ia.subVectors(i,t).cross(Zf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ia),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Jf.getNormalMatrix(e),r=this.coplanarPoint(Ia).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new Ui,Rs=new R;class El{constructor(e=new di,t=new di,i=new di,r=new di,s=new di,a=new di){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Zn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],d=r[6],p=r[7],f=r[8],g=r[9],_=r[10],m=r[11],h=r[12],y=r[13],M=r[14],x=r[15];if(i[0].setComponents(l-s,p-c,m-f,x-h).normalize(),i[1].setComponents(l+s,p+c,m+f,x+h).normalize(),i[2].setComponents(l+a,p+u,m+g,x+y).normalize(),i[3].setComponents(l-a,p-u,m-g,x-y).normalize(),i[4].setComponents(l-o,p-d,m-_,x-M).normalize(),t===Zn)i[5].setComponents(l+o,p+d,m+_,x+M).normalize();else if(t===na)i[5].setComponents(o,d,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(e){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Rs.x=r.normal.x>0?e.max.x:e.min.x,Rs.y=r.normal.y>0?e.max.y:e.min.y,Rs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Rs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hh(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Qf(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,g)=>f.start-g.start);let p=0;for(let f=1;f<d.length;f++){const g=d[p],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,d[p]=_)}d.length=p+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class os extends Lt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,d=e/o,p=t/l,f=[],g=[],_=[],m=[];for(let h=0;h<u;h++){const y=h*p-a;for(let M=0;M<c;M++){const x=M*d-s;g.push(x,-y,0),_.push(0,0,1),m.push(M/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let y=0;y<o;y++){const M=y+c*h,x=y+c*(h+1),F=y+1+c*(h+1),P=y+1+c*h;f.push(M,x,P),f.push(x,F,P)}this.setIndex(f),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(_,3)),this.setAttribute("uv",new It(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new os(e.width,e.height,e.widthSegments,e.heightSegments)}}var ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,np=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ip=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ap=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,cp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,up=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,fp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ep=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,bp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,wp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Hp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Xp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$p=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Jp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Qp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,em=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,tm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,im=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,am=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,um=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_m=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ym=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Em=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Am=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Fm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$m=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Km=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Jm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,eg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ng=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ag=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,og=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,lg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ug=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,pg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_g=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:ep,alphahash_pars_fragment:tp,alphamap_fragment:np,alphamap_pars_fragment:ip,alphatest_fragment:rp,alphatest_pars_fragment:sp,aomap_fragment:ap,aomap_pars_fragment:op,batching_pars_vertex:lp,batching_vertex:cp,begin_vertex:up,beginnormal_vertex:hp,bsdfs:dp,iridescence_fragment:fp,bumpmap_pars_fragment:pp,clipping_planes_fragment:mp,clipping_planes_pars_fragment:gp,clipping_planes_pars_vertex:_p,clipping_planes_vertex:vp,color_fragment:xp,color_pars_fragment:Mp,color_pars_vertex:Sp,color_vertex:yp,common:Ep,cube_uv_reflection_fragment:bp,defaultnormal_vertex:wp,displacementmap_pars_vertex:Tp,displacementmap_vertex:Ap,emissivemap_fragment:Rp,emissivemap_pars_fragment:Cp,colorspace_fragment:Pp,colorspace_pars_fragment:Lp,envmap_fragment:Dp,envmap_common_pars_fragment:Np,envmap_pars_fragment:kp,envmap_pars_vertex:Ip,envmap_physical_pars_fragment:Xp,envmap_vertex:Up,fog_vertex:Op,fog_pars_vertex:Fp,fog_fragment:zp,fog_pars_fragment:Bp,gradientmap_pars_fragment:Vp,lightmap_pars_fragment:Hp,lights_lambert_fragment:Gp,lights_lambert_pars_fragment:jp,lights_pars_begin:Wp,lights_toon_fragment:$p,lights_toon_pars_fragment:Kp,lights_phong_fragment:Yp,lights_phong_pars_fragment:qp,lights_physical_fragment:Zp,lights_physical_pars_fragment:Jp,lights_fragment_begin:Qp,lights_fragment_maps:em,lights_fragment_end:tm,logdepthbuf_fragment:nm,logdepthbuf_pars_fragment:im,logdepthbuf_pars_vertex:rm,logdepthbuf_vertex:sm,map_fragment:am,map_pars_fragment:om,map_particle_fragment:lm,map_particle_pars_fragment:cm,metalnessmap_fragment:um,metalnessmap_pars_fragment:hm,morphinstance_vertex:dm,morphcolor_vertex:fm,morphnormal_vertex:pm,morphtarget_pars_vertex:mm,morphtarget_vertex:gm,normal_fragment_begin:_m,normal_fragment_maps:vm,normal_pars_fragment:xm,normal_pars_vertex:Mm,normal_vertex:Sm,normalmap_pars_fragment:ym,clearcoat_normal_fragment_begin:Em,clearcoat_normal_fragment_maps:bm,clearcoat_pars_fragment:wm,iridescence_pars_fragment:Tm,opaque_fragment:Am,packing:Rm,premultiplied_alpha_fragment:Cm,project_vertex:Pm,dithering_fragment:Lm,dithering_pars_fragment:Dm,roughnessmap_fragment:Nm,roughnessmap_pars_fragment:km,shadowmap_pars_fragment:Im,shadowmap_pars_vertex:Um,shadowmap_vertex:Om,shadowmask_pars_fragment:Fm,skinbase_vertex:zm,skinning_pars_vertex:Bm,skinning_vertex:Vm,skinnormal_vertex:Hm,specularmap_fragment:Gm,specularmap_pars_fragment:jm,tonemapping_fragment:Wm,tonemapping_pars_fragment:Xm,transmission_fragment:$m,transmission_pars_fragment:Km,uv_pars_fragment:Ym,uv_pars_vertex:qm,uv_vertex:Zm,worldpos_vertex:Jm,background_vert:Qm,background_frag:eg,backgroundCube_vert:tg,backgroundCube_frag:ng,cube_vert:ig,cube_frag:rg,depth_vert:sg,depth_frag:ag,distanceRGBA_vert:og,distanceRGBA_frag:lg,equirect_vert:cg,equirect_frag:ug,linedashed_vert:hg,linedashed_frag:dg,meshbasic_vert:fg,meshbasic_frag:pg,meshlambert_vert:mg,meshlambert_frag:gg,meshmatcap_vert:_g,meshmatcap_frag:vg,meshnormal_vert:xg,meshnormal_frag:Mg,meshphong_vert:Sg,meshphong_frag:yg,meshphysical_vert:Eg,meshphysical_frag:bg,meshtoon_vert:wg,meshtoon_frag:Tg,points_vert:Ag,points_frag:Rg,shadow_vert:Cg,shadow_frag:Pg,sprite_vert:Lg,sprite_frag:Dg},Ee={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},kn={basic:{uniforms:tn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:tn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:tn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:tn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:tn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:tn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:tn([Ee.points,Ee.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:tn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:tn([Ee.common,Ee.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:tn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:tn([Ee.sprite,Ee.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:tn([Ee.common,Ee.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:tn([Ee.lights,Ee.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};kn.physical={uniforms:tn([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Cs={r:0,b:0,g:0},Ai=new zn,Ng=new _t;function kg(n,e,t,i,r,s,a){const o=new tt(0);let l=s===!0?0:1,c,u,d=null,p=0,f=null;function g(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?t:e).get(M)),M}function _(y){let M=!1;const x=g(y);x===null?h(o,l):x&&x.isColor&&(h(x,1),M=!0);const F=n.xr.getEnvironmentBlendMode();F==="additive"?i.buffers.color.setClear(0,0,0,1,a):F==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===la)?(u===void 0&&(u=new Kt(new as(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:Er(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(F,P,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ai.copy(M.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ng.makeRotationFromEuler(Ai)),u.material.toneMapped=dt.getTransfer(x.colorSpace)!==Mt,(d!==x||p!==x.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=x,p=x.version,f=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Kt(new os(2,2),new wn({name:"BackgroundMaterial",uniforms:Er(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=dt.getTransfer(x.colorSpace)!==Mt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||p!==x.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=x,p=x.version,f=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function h(y,M){y.getRGB(Cs,lh(n)),i.buffers.color.setClear(Cs.r,Cs.g,Cs.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(y,M=1){o.set(y),l=M,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,h(o,l)},render:_,addToRenderList:m}}function Ig(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=p(null);let s=r,a=!1;function o(v,w,H,V,W){let $=!1;const X=d(V,H,w);s!==X&&(s=X,c(s.object)),$=f(v,V,H,W),$&&g(v,V,H,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,x(v,w,H,V),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function u(v){return n.deleteVertexArray(v)}function d(v,w,H){const V=H.wireframe===!0;let W=i[v.id];W===void 0&&(W={},i[v.id]=W);let $=W[w.id];$===void 0&&($={},W[w.id]=$);let X=$[V];return X===void 0&&(X=p(l()),$[V]=X),X}function p(v){const w=[],H=[],V=[];for(let W=0;W<t;W++)w[W]=0,H[W]=0,V[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:H,attributeDivisors:V,object:v,attributes:{},index:null}}function f(v,w,H,V){const W=s.attributes,$=w.attributes;let X=0;const oe=H.getAttributes();for(const G in oe)if(oe[G].location>=0){const se=W[G];let me=$[G];if(me===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(me=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(me=v.instanceColor)),se===void 0||se.attribute!==me||me&&se.data!==me.data)return!0;X++}return s.attributesNum!==X||s.index!==V}function g(v,w,H,V){const W={},$=w.attributes;let X=0;const oe=H.getAttributes();for(const G in oe)if(oe[G].location>=0){let se=$[G];se===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(se=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(se=v.instanceColor));const me={};me.attribute=se,se&&se.data&&(me.data=se.data),W[G]=me,X++}s.attributes=W,s.attributesNum=X,s.index=V}function _(){const v=s.newAttributes;for(let w=0,H=v.length;w<H;w++)v[w]=0}function m(v){h(v,0)}function h(v,w){const H=s.newAttributes,V=s.enabledAttributes,W=s.attributeDivisors;H[v]=1,V[v]===0&&(n.enableVertexAttribArray(v),V[v]=1),W[v]!==w&&(n.vertexAttribDivisor(v,w),W[v]=w)}function y(){const v=s.newAttributes,w=s.enabledAttributes;for(let H=0,V=w.length;H<V;H++)w[H]!==v[H]&&(n.disableVertexAttribArray(H),w[H]=0)}function M(v,w,H,V,W,$,X){X===!0?n.vertexAttribIPointer(v,w,H,W,$):n.vertexAttribPointer(v,w,H,V,W,$)}function x(v,w,H,V){_();const W=V.attributes,$=H.getAttributes(),X=w.defaultAttributeValues;for(const oe in $){const G=$[oe];if(G.location>=0){let de=W[oe];if(de===void 0&&(oe==="instanceMatrix"&&v.instanceMatrix&&(de=v.instanceMatrix),oe==="instanceColor"&&v.instanceColor&&(de=v.instanceColor)),de!==void 0){const se=de.normalized,me=de.itemSize,Ae=e.get(de);if(Ae===void 0)continue;const Be=Ae.buffer,Q=Ae.type,he=Ae.bytesPerElement,xe=Q===n.INT||Q===n.UNSIGNED_INT||de.gpuType===pl;if(de.isInterleavedBufferAttribute){const ce=de.data,Ne=ce.stride,be=de.offset;if(ce.isInstancedInterleavedBuffer){for(let Ve=0;Ve<G.locationSize;Ve++)h(G.location+Ve,ce.meshPerAttribute);v.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ve=0;Ve<G.locationSize;Ve++)m(G.location+Ve);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let Ve=0;Ve<G.locationSize;Ve++)M(G.location+Ve,me/G.locationSize,Q,se,Ne*he,(be+me/G.locationSize*Ve)*he,xe)}else{if(de.isInstancedBufferAttribute){for(let ce=0;ce<G.locationSize;ce++)h(G.location+ce,de.meshPerAttribute);v.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ce=0;ce<G.locationSize;ce++)m(G.location+ce);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let ce=0;ce<G.locationSize;ce++)M(G.location+ce,me/G.locationSize,Q,se,me*he,me/G.locationSize*ce*he,xe)}}else if(X!==void 0){const se=X[oe];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(G.location,se);break;case 3:n.vertexAttrib3fv(G.location,se);break;case 4:n.vertexAttrib4fv(G.location,se);break;default:n.vertexAttrib1fv(G.location,se)}}}}y()}function F(){D();for(const v in i){const w=i[v];for(const H in w){const V=w[H];for(const W in V)u(V[W].object),delete V[W];delete w[H]}delete i[v]}}function P(v){if(i[v.id]===void 0)return;const w=i[v.id];for(const H in w){const V=w[H];for(const W in V)u(V[W].object),delete V[W];delete w[H]}delete i[v.id]}function L(v){for(const w in i){const H=i[w];if(H[v.id]===void 0)continue;const V=H[v.id];for(const W in V)u(V[W].object),delete V[W];delete H[v.id]}}function D(){T(),a=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:D,resetDefaultState:T,dispose:F,releaseStatesOfGeometry:P,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function Ug(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,i,1)}function l(c,u,d,p){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],u[g],p[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,p,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*p[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Og(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==Dn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const D=L===rs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==ei&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==qn&&!D)}function l(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),F=g>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:p,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:F,maxSamples:P}}function Fg(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new di,o=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const f=d.length!==0||p||i!==0||r;return r=p,i=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,p){t=u(d,p,0)},this.setState=function(d,p,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,h=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,M=y*4;let x=h.clippingState||null;l.value=x,x=u(g,p,M,f);for(let F=0;F!==M;++F)x[F]=t[F];h.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,p,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const h=f+_*4,y=p.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<h)&&(m=new Float32Array(h));for(let M=0,x=f;M!==_;++M,x+=4)a.copy(d[M]).applyMatrix4(y,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function zg(n){let e=new WeakMap;function t(a,o){return o===bo?a.mapping=xr:o===wo&&(a.mapping=Mr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===bo||o===wo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new qf(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class ls extends ch{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const lr=4,dc=[.125,.215,.35,.446,.526,.582],Li=20,Ua=new ls,fc=new tt;let Oa=null,Fa=0,za=0,Ba=!1;const Ci=(1+Math.sqrt(5))/2,Qi=1/Ci,pc=[new R(-Ci,Qi,0),new R(Ci,Qi,0),new R(-Qi,0,Ci),new R(Qi,0,Ci),new R(0,Ci,-Qi),new R(0,Ci,Qi),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class mc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Oa=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),za=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_c(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Oa,Fa,za),this._renderer.xr.enabled=Ba,e.scissorTest=!1,Ps(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xr||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oa=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),za=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:rs,format:Dn,colorSpace:br,depthBuffer:!1},r=gc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gc(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Bg(s)),this._blurMaterial=Vg(s,e,t)}return r}_compileMaterial(e){const t=new Kt(this._lodPlanes[0],e);this._renderer.compile(t,Ua)}_sceneToCubeUV(e,t,i,r){const o=new mn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(fc),u.toneMapping=gi,u.autoClear=!1;const f=new ua({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),g=new Kt(new as,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(fc),_=!0);for(let h=0;h<6;h++){const y=h%3;y===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):y===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const M=this._cubeSize;Ps(r,y*M,h>2?M:0,M,M),u.setRenderTarget(r),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=p,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===xr||e.mapping===Mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=vc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_c());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Kt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ps(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ua)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=pc[(r-s-1)%pc.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Kt(this._lodPlanes[r],c),p=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Li-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Li;m>Li&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Li}`);const h=[];let y=0;for(let L=0;L<Li;++L){const D=L/_,T=Math.exp(-D*D/2);h.push(T),L===0?y+=T:L<m&&(y+=2*T)}for(let L=0;L<h.length;L++)h[L]=h[L]/y;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=h,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:M}=this;p.dTheta.value=g,p.mipInt.value=M-i;const x=this._sizeLods[r],F=3*x*(r>M-lr?r-M+lr:0),P=4*(this._cubeSize-x);Ps(t,F,P,3*x,2*x),l.setRenderTarget(t),l.render(d,Ua)}}function Bg(n){const e=[],t=[],i=[];let r=n;const s=n-lr+1+dc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-lr?l=dc[a-n+lr-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,d=1+c,p=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,m=2,h=1,y=new Float32Array(_*g*f),M=new Float32Array(m*g*f),x=new Float32Array(h*g*f);for(let P=0;P<f;P++){const L=P%3*2/3-1,D=P>2?0:-1,T=[L,D,0,L+2/3,D,0,L+2/3,D+1,0,L,D,0,L+2/3,D+1,0,L,D+1,0];y.set(T,_*g*P),M.set(p,m*g*P);const v=[P,P,P,P,P,P];x.set(v,h*g*P)}const F=new Lt;F.setAttribute("position",new an(y,_)),F.setAttribute("uv",new an(M,m)),F.setAttribute("faceIndex",new an(x,h)),e.push(F),r>lr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function gc(n,e,t){const i=new On(n,e,t);return i.texture.mapping=la,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ps(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Vg(n,e,t){const i=new Float32Array(Li),r=new R(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function _c(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function vc(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function bl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Hg(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===bo||l===wo,u=l===xr||l===Mr;if(c||u){let d=e.get(o);const p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new mc(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new mc(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Gg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&zr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function jg(n,e,t,i){const r={},s=new WeakMap;function a(d){const p=d.target;p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);for(const g in p.morphAttributes){const _=p.morphAttributes[g];for(let m=0,h=_.length;m<h;m++)e.remove(_[m])}p.removeEventListener("dispose",a),delete r[p.id];const f=s.get(p);f&&(e.remove(f),s.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(d,p){return r[p.id]===!0||(p.addEventListener("dispose",a),r[p.id]=!0,t.memory.geometries++),p}function l(d){const p=d.attributes;for(const g in p)e.update(p[g],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,h=_.length;m<h;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(d){const p=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let M=0,x=y.length;M<x;M+=3){const F=y[M+0],P=y[M+1],L=y[M+2];p.push(F,P,P,L,L,F)}}else if(g!==void 0){const y=g.array;_=g.version;for(let M=0,x=y.length/3-1;M<x;M+=3){const F=M+0,P=M+1,L=M+2;p.push(F,P,P,L,L,F)}}else return;const m=new(nh(p)?oh:ah)(p,1);m.version=_;const h=s.get(d);h&&e.remove(h),s.set(d,m)}function u(d){const p=s.get(d);if(p){const f=d.index;f!==null&&p.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Wg(n,e,t){let i;function r(p){i=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function l(p,f){n.drawElements(i,f,s,p*a),t.update(f,i,1)}function c(p,f,g){g!==0&&(n.drawElementsInstanced(i,f,s,p*a,g),t.update(f,i,g))}function u(p,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,p,0,g);let m=0;for(let h=0;h<g;h++)m+=f[h];t.update(m,i,1)}function d(p,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<p.length;h++)c(p[h]/a,f[h],_[h]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,p,0,_,0,g);let h=0;for(let y=0;y<g;y++)h+=f[y]*_[y];t.update(h,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Xg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function $g(n,e,t){const i=new WeakMap,r=new Ct;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let p=i.get(o);if(p===void 0||p.count!==d){let T=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",T)};p!==void 0&&p.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let x=o.attributes.position.count*M,F=1;x>e.maxTextureSize&&(F=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const P=new Float32Array(x*F*4*d),L=new rh(P,x,F,d);L.type=qn,L.needsUpdate=!0;const D=M*4;for(let v=0;v<d;v++){const w=m[v],H=h[v],V=y[v],W=x*F*4*v;for(let $=0;$<w.count;$++){const X=$*D;f===!0&&(r.fromBufferAttribute(w,$),P[W+X+0]=r.x,P[W+X+1]=r.y,P[W+X+2]=r.z,P[W+X+3]=0),g===!0&&(r.fromBufferAttribute(H,$),P[W+X+4]=r.x,P[W+X+5]=r.y,P[W+X+6]=r.z,P[W+X+7]=0),_===!0&&(r.fromBufferAttribute(V,$),P[W+X+8]=r.x,P[W+X+9]=r.y,P[W+X+10]=r.z,P[W+X+11]=V.itemSize===4?r.w:1)}}p={count:d,texture:L,size:new pe(x,F)},i.set(o,p),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:s}}function Kg(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class wl extends rn{constructor(e,t,i,r,s,a,o,l,c,u=fr){if(u!==fr&&u!==yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===fr&&(i=ki),i===void 0&&u===yr&&(i=Sr),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:vn,this.minFilter=l!==void 0?l:vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const dh=new rn,xc=new wl(1,1),fh=new rh,ph=new kf,mh=new uh,Mc=[],Sc=[],yc=new Float32Array(16),Ec=new Float32Array(9),bc=new Float32Array(4);function wr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Mc[r];if(s===void 0&&(s=new Float32Array(r),Mc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Vt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ha(n,e){let t=Sc[e];t===void 0&&(t=new Int32Array(e),Sc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Yg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function qg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2fv(this.addr,e),Vt(t,e)}}function Zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;n.uniform3fv(this.addr,e),Vt(t,e)}}function Jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4fv(this.addr,e),Vt(t,e)}}function Qg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Bt(t,i))return;bc.set(i),n.uniformMatrix2fv(this.addr,!1,bc),Vt(t,i)}}function e_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Bt(t,i))return;Ec.set(i),n.uniformMatrix3fv(this.addr,!1,Ec),Vt(t,i)}}function t_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Bt(t,i))return;yc.set(i),n.uniformMatrix4fv(this.addr,!1,yc),Vt(t,i)}}function n_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function i_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2iv(this.addr,e),Vt(t,e)}}function r_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3iv(this.addr,e),Vt(t,e)}}function s_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4iv(this.addr,e),Vt(t,e)}}function a_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function o_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2uiv(this.addr,e),Vt(t,e)}}function l_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3uiv(this.addr,e),Vt(t,e)}}function c_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4uiv(this.addr,e),Vt(t,e)}}function u_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(xc.compareFunction=th,s=xc):s=dh,t.setTexture2D(e||s,r)}function h_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ph,r)}function d_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||mh,r)}function f_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||fh,r)}function p_(n){switch(n){case 5126:return Yg;case 35664:return qg;case 35665:return Zg;case 35666:return Jg;case 35674:return Qg;case 35675:return e_;case 35676:return t_;case 5124:case 35670:return n_;case 35667:case 35671:return i_;case 35668:case 35672:return r_;case 35669:case 35673:return s_;case 5125:return a_;case 36294:return o_;case 36295:return l_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return u_;case 35679:case 36299:case 36307:return h_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return f_}}function m_(n,e){n.uniform1fv(this.addr,e)}function g_(n,e){const t=wr(e,this.size,2);n.uniform2fv(this.addr,t)}function __(n,e){const t=wr(e,this.size,3);n.uniform3fv(this.addr,t)}function v_(n,e){const t=wr(e,this.size,4);n.uniform4fv(this.addr,t)}function x_(n,e){const t=wr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function M_(n,e){const t=wr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function S_(n,e){const t=wr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function y_(n,e){n.uniform1iv(this.addr,e)}function E_(n,e){n.uniform2iv(this.addr,e)}function b_(n,e){n.uniform3iv(this.addr,e)}function w_(n,e){n.uniform4iv(this.addr,e)}function T_(n,e){n.uniform1uiv(this.addr,e)}function A_(n,e){n.uniform2uiv(this.addr,e)}function R_(n,e){n.uniform3uiv(this.addr,e)}function C_(n,e){n.uniform4uiv(this.addr,e)}function P_(n,e,t){const i=this.cache,r=e.length,s=ha(t,r);Bt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||dh,s[a])}function L_(n,e,t){const i=this.cache,r=e.length,s=ha(t,r);Bt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||ph,s[a])}function D_(n,e,t){const i=this.cache,r=e.length,s=ha(t,r);Bt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||mh,s[a])}function N_(n,e,t){const i=this.cache,r=e.length,s=ha(t,r);Bt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||fh,s[a])}function k_(n){switch(n){case 5126:return m_;case 35664:return g_;case 35665:return __;case 35666:return v_;case 35674:return x_;case 35675:return M_;case 35676:return S_;case 5124:case 35670:return y_;case 35667:case 35671:return E_;case 35668:case 35672:return b_;case 35669:case 35673:return w_;case 5125:return T_;case 36294:return A_;case 36295:return R_;case 36296:return C_;case 35678:case 36198:case 36298:case 36306:case 35682:return P_;case 35679:case 36299:case 36307:return L_;case 35680:case 36300:case 36308:case 36293:return D_;case 36289:case 36303:case 36311:case 36292:return N_}}class I_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=p_(t.type)}}class U_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=k_(t.type)}}class O_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Va=/(\w+)(\])?(\[|\.)?/g;function wc(n,e){n.seq.push(e),n.map[e.id]=e}function F_(n,e,t){const i=n.name,r=i.length;for(Va.lastIndex=0;;){const s=Va.exec(i),a=Va.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){wc(t,c===void 0?new I_(o,n,e):new U_(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new O_(o),wc(t,d)),t=d}}}class Zs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);F_(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Tc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const z_=37297;let B_=0;function V_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Ac=new Qe;function H_(n){dt._getMatrix(Ac,dt.workingColorSpace,n);const e=`mat3( ${Ac.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(n)){case ca:return[e,"LinearTransferOETF"];case Mt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Rc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+V_(n.getShaderSource(e),a)}else return r}function G_(n,e){const t=H_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function j_(n,e){let t;switch(e){case Wd:t="Linear";break;case Xd:t="Reinhard";break;case $d:t="Cineon";break;case Kd:t="ACESFilmic";break;case qd:t="AgX";break;case Zd:t="Neutral";break;case Yd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ls=new R;function W_(){dt.getLuminanceCoefficients(Ls);const n=Ls.x.toFixed(4),e=Ls.y.toFixed(4),t=Ls.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function X_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Br).join(`
`)}function $_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function K_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Br(n){return n!==""}function Cc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Y_=/^[ \t]*#include +<([\w\d./]+)>/gm;function tl(n){return n.replace(Y_,Z_)}const q_=new Map;function Z_(n,e){let t=et[e];if(t===void 0){const i=q_.get(e);if(i!==void 0)t=et[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return tl(t)}const J_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lc(n){return n.replace(J_,Q_)}function Q_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Dc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ev(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===dl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===bd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function tv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case xr:case Mr:e="ENVMAP_TYPE_CUBE";break;case la:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nv(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Mr:e="ENVMAP_MODE_REFRACTION";break}return e}function iv(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case fl:e="ENVMAP_BLENDING_MULTIPLY";break;case Gd:e="ENVMAP_BLENDING_MIX";break;case jd:e="ENVMAP_BLENDING_ADD";break}return e}function rv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function sv(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=ev(t),c=tv(t),u=nv(t),d=iv(t),p=rv(t),f=X_(t),g=$_(s),_=r.createProgram();let m,h,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Br).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Br).join(`
`),h.length>0&&(h+=`
`)):(m=[Dc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Br).join(`
`),h=[Dc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?et.tonemapping_pars_fragment:"",t.toneMapping!==gi?j_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,G_("linearToOutputTexel",t.outputColorSpace),W_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Br).join(`
`)),a=tl(a),a=Cc(a,t),a=Pc(a,t),o=tl(o),o=Cc(o,t),o=Pc(o,t),a=Lc(a),o=Lc(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===jl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=y+m+a,x=y+h+o,F=Tc(r,r.VERTEX_SHADER,M),P=Tc(r,r.FRAGMENT_SHADER,x);r.attachShader(_,F),r.attachShader(_,P),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function L(w){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(_).trim(),V=r.getShaderInfoLog(F).trim(),W=r.getShaderInfoLog(P).trim();let $=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,F,P);else{const oe=Rc(r,F,"vertex"),G=Rc(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+H+`
`+oe+`
`+G)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(V===""||W==="")&&(X=!1);X&&(w.diagnostics={runnable:$,programLog:H,vertexShader:{log:V,prefix:m},fragmentShader:{log:W,prefix:h}})}r.deleteShader(F),r.deleteShader(P),D=new Zs(r,_),T=K_(r,_)}let D;this.getUniforms=function(){return D===void 0&&L(this),D};let T;this.getAttributes=function(){return T===void 0&&L(this),T};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(_,z_)),v},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=B_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=F,this.fragmentShader=P,this}let av=0;class ov{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new lv(e),t.set(e,i)),i}}class lv{constructor(e){this.id=av++,this.code=e,this.usedTimes=0}}function cv(n,e,t,i,r,s,a){const o=new yl,l=new ov,c=new Set,u=[],d=r.logarithmicDepthBuffer,p=r.vertexTextures;let f=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,v,w,H,V){const W=H.fog,$=V.geometry,X=T.isMeshStandardMaterial?H.environment:null,oe=(T.isMeshStandardMaterial?t:e).get(T.envMap||X),G=oe&&oe.mapping===la?oe.image.height:null,de=g[T.type];T.precision!==null&&(f=r.getMaxPrecision(T.precision),f!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));const se=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,me=se!==void 0?se.length:0;let Ae=0;$.morphAttributes.position!==void 0&&(Ae=1),$.morphAttributes.normal!==void 0&&(Ae=2),$.morphAttributes.color!==void 0&&(Ae=3);let Be,Q,he,xe;if(de){const st=kn[de];Be=st.vertexShader,Q=st.fragmentShader}else Be=T.vertexShader,Q=T.fragmentShader,l.update(T),he=l.getVertexShaderID(T),xe=l.getFragmentShaderID(T);const ce=n.getRenderTarget(),Ne=n.state.buffers.depth.getReversed(),be=V.isInstancedMesh===!0,Ve=V.isBatchedMesh===!0,je=!!T.map,it=!!T.matcap,nt=!!oe,z=!!T.aoMap,Ut=!!T.lightMap,Je=!!T.bumpMap,Ze=!!T.normalMap,Ue=!!T.displacementMap,vt=!!T.emissiveMap,Fe=!!T.metalnessMap,A=!!T.roughnessMap,S=T.anisotropy>0,K=T.clearcoat>0,te=T.dispersion>0,ae=T.iridescence>0,ne=T.sheen>0,Pe=T.transmission>0,Me=S&&!!T.anisotropyMap,Le=K&&!!T.clearcoatMap,Z=K&&!!T.clearcoatNormalMap,fe=K&&!!T.clearcoatRoughnessMap,Te=ae&&!!T.iridescenceMap,Ge=ae&&!!T.iridescenceThicknessMap,ke=ne&&!!T.sheenColorMap,Se=ne&&!!T.sheenRoughnessMap,Ye=!!T.specularMap,qe=!!T.specularColorMap,pt=!!T.specularIntensityMap,I=Pe&&!!T.transmissionMap,_e=Pe&&!!T.thicknessMap,J=!!T.gradientMap,ie=!!T.alphaMap,ve=T.alphaTest>0,ye=!!T.alphaHash,Xe=!!T.extensions;let mt=gi;T.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(mt=n.toneMapping);const Pt={shaderID:de,shaderType:T.type,shaderName:T.name,vertexShader:Be,fragmentShader:Q,defines:T.defines,customVertexShaderID:he,customFragmentShaderID:xe,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:Ve,batchingColor:Ve&&V._colorsTexture!==null,instancing:be,instancingColor:be&&V.instanceColor!==null,instancingMorph:be&&V.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ce===null?n.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:br,alphaToCoverage:!!T.alphaToCoverage,map:je,matcap:it,envMap:nt,envMapMode:nt&&oe.mapping,envMapCubeUVHeight:G,aoMap:z,lightMap:Ut,bumpMap:Je,normalMap:Ze,displacementMap:p&&Ue,emissiveMap:vt,normalMapObjectSpace:Ze&&T.normalMapType===tf,normalMapTangentSpace:Ze&&T.normalMapType===Ml,metalnessMap:Fe,roughnessMap:A,anisotropy:S,anisotropyMap:Me,clearcoat:K,clearcoatMap:Le,clearcoatNormalMap:Z,clearcoatRoughnessMap:fe,dispersion:te,iridescence:ae,iridescenceMap:Te,iridescenceThicknessMap:Ge,sheen:ne,sheenColorMap:ke,sheenRoughnessMap:Se,specularMap:Ye,specularColorMap:qe,specularIntensityMap:pt,transmission:Pe,transmissionMap:I,thicknessMap:_e,gradientMap:J,opaque:T.transparent===!1&&T.blending===dr&&T.alphaToCoverage===!1,alphaMap:ie,alphaTest:ve,alphaHash:ye,combine:T.combine,mapUv:je&&_(T.map.channel),aoMapUv:z&&_(T.aoMap.channel),lightMapUv:Ut&&_(T.lightMap.channel),bumpMapUv:Je&&_(T.bumpMap.channel),normalMapUv:Ze&&_(T.normalMap.channel),displacementMapUv:Ue&&_(T.displacementMap.channel),emissiveMapUv:vt&&_(T.emissiveMap.channel),metalnessMapUv:Fe&&_(T.metalnessMap.channel),roughnessMapUv:A&&_(T.roughnessMap.channel),anisotropyMapUv:Me&&_(T.anisotropyMap.channel),clearcoatMapUv:Le&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:Z&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(T.sheenRoughnessMap.channel),specularMapUv:Ye&&_(T.specularMap.channel),specularColorMapUv:qe&&_(T.specularColorMap.channel),specularIntensityMapUv:pt&&_(T.specularIntensityMap.channel),transmissionMapUv:I&&_(T.transmissionMap.channel),thicknessMapUv:_e&&_(T.thicknessMap.channel),alphaMapUv:ie&&_(T.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ze||S),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!$.attributes.uv&&(je||ie),fog:!!W,useFog:T.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ne,skinning:V.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Ae,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&w.length>0,shadowMapType:n.shadowMap.type,toneMapping:mt,decodeVideoTexture:je&&T.map.isVideoTexture===!0&&dt.getTransfer(T.map.colorSpace)===Mt,decodeVideoTextureEmissive:vt&&T.emissiveMap.isVideoTexture===!0&&dt.getTransfer(T.emissiveMap.colorSpace)===Mt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===gn,flipSided:T.side===nn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Xe&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xe&&T.extensions.multiDraw===!0||Ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Pt.vertexUv1s=c.has(1),Pt.vertexUv2s=c.has(2),Pt.vertexUv3s=c.has(3),c.clear(),Pt}function h(T){const v=[];if(T.shaderID?v.push(T.shaderID):(v.push(T.customVertexShaderID),v.push(T.customFragmentShaderID)),T.defines!==void 0)for(const w in T.defines)v.push(w),v.push(T.defines[w]);return T.isRawShaderMaterial===!1&&(y(v,T),M(v,T),v.push(n.outputColorSpace)),v.push(T.customProgramCacheKey),v.join()}function y(T,v){T.push(v.precision),T.push(v.outputColorSpace),T.push(v.envMapMode),T.push(v.envMapCubeUVHeight),T.push(v.mapUv),T.push(v.alphaMapUv),T.push(v.lightMapUv),T.push(v.aoMapUv),T.push(v.bumpMapUv),T.push(v.normalMapUv),T.push(v.displacementMapUv),T.push(v.emissiveMapUv),T.push(v.metalnessMapUv),T.push(v.roughnessMapUv),T.push(v.anisotropyMapUv),T.push(v.clearcoatMapUv),T.push(v.clearcoatNormalMapUv),T.push(v.clearcoatRoughnessMapUv),T.push(v.iridescenceMapUv),T.push(v.iridescenceThicknessMapUv),T.push(v.sheenColorMapUv),T.push(v.sheenRoughnessMapUv),T.push(v.specularMapUv),T.push(v.specularColorMapUv),T.push(v.specularIntensityMapUv),T.push(v.transmissionMapUv),T.push(v.thicknessMapUv),T.push(v.combine),T.push(v.fogExp2),T.push(v.sizeAttenuation),T.push(v.morphTargetsCount),T.push(v.morphAttributeCount),T.push(v.numDirLights),T.push(v.numPointLights),T.push(v.numSpotLights),T.push(v.numSpotLightMaps),T.push(v.numHemiLights),T.push(v.numRectAreaLights),T.push(v.numDirLightShadows),T.push(v.numPointLightShadows),T.push(v.numSpotLightShadows),T.push(v.numSpotLightShadowsWithMaps),T.push(v.numLightProbes),T.push(v.shadowMapType),T.push(v.toneMapping),T.push(v.numClippingPlanes),T.push(v.numClipIntersection),T.push(v.depthPacking)}function M(T,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),T.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),T.push(o.mask)}function x(T){const v=g[T.type];let w;if(v){const H=kn[v];w=Xf.clone(H.uniforms)}else w=T.uniforms;return w}function F(T,v){let w;for(let H=0,V=u.length;H<V;H++){const W=u[H];if(W.cacheKey===v){w=W,++w.usedTimes;break}}return w===void 0&&(w=new sv(n,v,T,s),u.push(w)),w}function P(T){if(--T.usedTimes===0){const v=u.indexOf(T);u[v]=u[u.length-1],u.pop(),T.destroy()}}function L(T){l.remove(T)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:x,acquireProgram:F,releaseProgram:P,releaseShaderCache:L,programs:u,dispose:D}}function uv(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function hv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Nc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function kc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d,p,f,g,_,m){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:p,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=h):(h.id=d.id,h.object=d,h.geometry=p,h.material=f,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=_,h.group=m),e++,h}function o(d,p,f,g,_,m){const h=a(d,p,f,g,_,m);f.transmission>0?i.push(h):f.transparent===!0?r.push(h):t.push(h)}function l(d,p,f,g,_,m){const h=a(d,p,f,g,_,m);f.transmission>0?i.unshift(h):f.transparent===!0?r.unshift(h):t.unshift(h)}function c(d,p){t.length>1&&t.sort(d||hv),i.length>1&&i.sort(p||Nc),r.length>1&&r.sort(p||Nc)}function u(){for(let d=e,p=n.length;d<p;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function dv(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new kc,n.set(i,[a])):r>=s.length?(a=new kc,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function fv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new tt};break;case"SpotLight":t={position:new R,direction:new R,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function pv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let mv=0;function gv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function _v(n){const e=new fv,t=pv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);const r=new R,s=new _t,a=new _t;function o(c){let u=0,d=0,p=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let f=0,g=0,_=0,m=0,h=0,y=0,M=0,x=0,F=0,P=0,L=0;c.sort(gv);for(let T=0,v=c.length;T<v;T++){const w=c[T],H=w.color,V=w.intensity,W=w.distance,$=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)u+=H.r*V,d+=H.g*V,p+=H.b*V;else if(w.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(w.sh.coefficients[X],V);L++}else if(w.isDirectionalLight){const X=e.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const oe=w.shadow,G=t.get(w);G.shadowIntensity=oe.intensity,G.shadowBias=oe.bias,G.shadowNormalBias=oe.normalBias,G.shadowRadius=oe.radius,G.shadowMapSize=oe.mapSize,i.directionalShadow[f]=G,i.directionalShadowMap[f]=$,i.directionalShadowMatrix[f]=w.shadow.matrix,y++}i.directional[f]=X,f++}else if(w.isSpotLight){const X=e.get(w);X.position.setFromMatrixPosition(w.matrixWorld),X.color.copy(H).multiplyScalar(V),X.distance=W,X.coneCos=Math.cos(w.angle),X.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),X.decay=w.decay,i.spot[_]=X;const oe=w.shadow;if(w.map&&(i.spotLightMap[F]=w.map,F++,oe.updateMatrices(w),w.castShadow&&P++),i.spotLightMatrix[_]=oe.matrix,w.castShadow){const G=t.get(w);G.shadowIntensity=oe.intensity,G.shadowBias=oe.bias,G.shadowNormalBias=oe.normalBias,G.shadowRadius=oe.radius,G.shadowMapSize=oe.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=$,x++}_++}else if(w.isRectAreaLight){const X=e.get(w);X.color.copy(H).multiplyScalar(V),X.halfWidth.set(w.width*.5,0,0),X.halfHeight.set(0,w.height*.5,0),i.rectArea[m]=X,m++}else if(w.isPointLight){const X=e.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),X.distance=w.distance,X.decay=w.decay,w.castShadow){const oe=w.shadow,G=t.get(w);G.shadowIntensity=oe.intensity,G.shadowBias=oe.bias,G.shadowNormalBias=oe.normalBias,G.shadowRadius=oe.radius,G.shadowMapSize=oe.mapSize,G.shadowCameraNear=oe.camera.near,G.shadowCameraFar=oe.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=w.shadow.matrix,M++}i.point[g]=X,g++}else if(w.isHemisphereLight){const X=e.get(w);X.skyColor.copy(w.color).multiplyScalar(V),X.groundColor.copy(w.groundColor).multiplyScalar(V),i.hemi[h]=X,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=p;const D=i.hash;(D.directionalLength!==f||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==h||D.numDirectionalShadows!==y||D.numPointShadows!==M||D.numSpotShadows!==x||D.numSpotMaps!==F||D.numLightProbes!==L)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=x+F-P,i.spotLightMap.length=F,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=L,D.directionalLength=f,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=h,D.numDirectionalShadows=y,D.numPointShadows=M,D.numSpotShadows=x,D.numSpotMaps=F,D.numLightProbes=L,i.version=mv++)}function l(c,u){let d=0,p=0,f=0,g=0,_=0;const m=u.matrixWorldInverse;for(let h=0,y=c.length;h<y;h++){const M=c[h];if(M.isDirectionalLight){const x=i.directional[d];x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(M.isSpotLight){const x=i.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const x=i.point[p];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),p++}else if(M.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function Ic(n){const e=new _v(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function vv(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Ic(n),e.set(r,[o])):s>=a.length?(o=new Ic(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class xv extends Bn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Qd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Mv extends Bn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ev(n,e,t){let i=new El;const r=new pe,s=new pe,a=new Ct,o=new xv({depthPacking:ef}),l=new Mv,c={},u=t.maxTextureSize,d={[Fn]:nn,[nn]:Fn,[gn]:gn},p=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:Sv,fragmentShader:yv}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const g=new Lt;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Kt(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dl;let h=this.type;this.render=function(P,L,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const T=n.getRenderTarget(),v=n.getActiveCubeFace(),w=n.getActiveMipmapLevel(),H=n.state;H.setBlending(mi),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const V=h!==Yn&&this.type===Yn,W=h===Yn&&this.type!==Yn;for(let $=0,X=P.length;$<X;$++){const oe=P[$],G=oe.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const de=G.getFrameExtents();if(r.multiply(de),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/de.x),r.x=s.x*de.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/de.y),r.y=s.y*de.y,G.mapSize.y=s.y)),G.map===null||V===!0||W===!0){const me=this.type!==Yn?{minFilter:vn,magFilter:vn}:{};G.map!==null&&G.map.dispose(),G.map=new On(r.x,r.y,me),G.map.texture.name=oe.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const se=G.getViewportCount();for(let me=0;me<se;me++){const Ae=G.getViewport(me);a.set(s.x*Ae.x,s.y*Ae.y,s.x*Ae.z,s.y*Ae.w),H.viewport(a),G.updateMatrices(oe,me),i=G.getFrustum(),x(L,D,G.camera,oe,this.type)}G.isPointLightShadow!==!0&&this.type===Yn&&y(G,D),G.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(T,v,w)};function y(P,L){const D=e.update(_);p.defines.VSM_SAMPLES!==P.blurSamples&&(p.defines.VSM_SAMPLES=P.blurSamples,f.defines.VSM_SAMPLES=P.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new On(r.x,r.y)),p.uniforms.shadow_pass.value=P.map.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(L,null,D,p,_,null),f.uniforms.shadow_pass.value=P.mapPass.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(L,null,D,f,_,null)}function M(P,L,D,T){let v=null;const w=D.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(w!==void 0)v=w;else if(v=D.isPointLight===!0?l:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const H=v.uuid,V=L.uuid;let W=c[H];W===void 0&&(W={},c[H]=W);let $=W[V];$===void 0&&($=v.clone(),W[V]=$,L.addEventListener("dispose",F)),v=$}if(v.visible=L.visible,v.wireframe=L.wireframe,T===Yn?v.side=L.shadowSide!==null?L.shadowSide:L.side:v.side=L.shadowSide!==null?L.shadowSide:d[L.side],v.alphaMap=L.alphaMap,v.alphaTest=L.alphaTest,v.map=L.map,v.clipShadows=L.clipShadows,v.clippingPlanes=L.clippingPlanes,v.clipIntersection=L.clipIntersection,v.displacementMap=L.displacementMap,v.displacementScale=L.displacementScale,v.displacementBias=L.displacementBias,v.wireframeLinewidth=L.wireframeLinewidth,v.linewidth=L.linewidth,D.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const H=n.properties.get(v);H.light=D}return v}function x(P,L,D,T,v){if(P.visible===!1)return;if(P.layers.test(L.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&v===Yn)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,P.matrixWorld);const V=e.update(P),W=P.material;if(Array.isArray(W)){const $=V.groups;for(let X=0,oe=$.length;X<oe;X++){const G=$[X],de=W[G.materialIndex];if(de&&de.visible){const se=M(P,de,T,v);P.onBeforeShadow(n,P,L,D,V,se,G),n.renderBufferDirect(D,null,V,se,P,G),P.onAfterShadow(n,P,L,D,V,se,G)}}}else if(W.visible){const $=M(P,W,T,v);P.onBeforeShadow(n,P,L,D,V,$,null),n.renderBufferDirect(D,null,V,$,P,null),P.onAfterShadow(n,P,L,D,V,$,null)}}const H=P.children;for(let V=0,W=H.length;V<W;V++)x(H[V],L,D,T,v)}function F(P){P.target.removeEventListener("dispose",F);for(const D in c){const T=c[D],v=P.target.uuid;v in T&&(T[v].dispose(),delete T[v])}}}const bv={[_o]:vo,[xo]:yo,[Mo]:Eo,[vr]:So,[vo]:_o,[yo]:xo,[Eo]:Mo,[So]:vr};function wv(n,e){function t(){let I=!1;const _e=new Ct;let J=null;const ie=new Ct(0,0,0,0);return{setMask:function(ve){J!==ve&&!I&&(n.colorMask(ve,ve,ve,ve),J=ve)},setLocked:function(ve){I=ve},setClear:function(ve,ye,Xe,mt,Pt){Pt===!0&&(ve*=mt,ye*=mt,Xe*=mt),_e.set(ve,ye,Xe,mt),ie.equals(_e)===!1&&(n.clearColor(ve,ye,Xe,mt),ie.copy(_e))},reset:function(){I=!1,J=null,ie.set(-1,0,0,0)}}}function i(){let I=!1,_e=!1,J=null,ie=null,ve=null;return{setReversed:function(ye){if(_e!==ye){const Xe=e.get("EXT_clip_control");_e?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT);const mt=ve;ve=null,this.setClear(mt)}_e=ye},getReversed:function(){return _e},setTest:function(ye){ye?ce(n.DEPTH_TEST):Ne(n.DEPTH_TEST)},setMask:function(ye){J!==ye&&!I&&(n.depthMask(ye),J=ye)},setFunc:function(ye){if(_e&&(ye=bv[ye]),ie!==ye){switch(ye){case _o:n.depthFunc(n.NEVER);break;case vo:n.depthFunc(n.ALWAYS);break;case xo:n.depthFunc(n.LESS);break;case vr:n.depthFunc(n.LEQUAL);break;case Mo:n.depthFunc(n.EQUAL);break;case So:n.depthFunc(n.GEQUAL);break;case yo:n.depthFunc(n.GREATER);break;case Eo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ie=ye}},setLocked:function(ye){I=ye},setClear:function(ye){ve!==ye&&(_e&&(ye=1-ye),n.clearDepth(ye),ve=ye)},reset:function(){I=!1,J=null,ie=null,ve=null,_e=!1}}}function r(){let I=!1,_e=null,J=null,ie=null,ve=null,ye=null,Xe=null,mt=null,Pt=null;return{setTest:function(st){I||(st?ce(n.STENCIL_TEST):Ne(n.STENCIL_TEST))},setMask:function(st){_e!==st&&!I&&(n.stencilMask(st),_e=st)},setFunc:function(st,Ot,Qt){(J!==st||ie!==Ot||ve!==Qt)&&(n.stencilFunc(st,Ot,Qt),J=st,ie=Ot,ve=Qt)},setOp:function(st,Ot,Qt){(ye!==st||Xe!==Ot||mt!==Qt)&&(n.stencilOp(st,Ot,Qt),ye=st,Xe=Ot,mt=Qt)},setLocked:function(st){I=st},setClear:function(st){Pt!==st&&(n.clearStencil(st),Pt=st)},reset:function(){I=!1,_e=null,J=null,ie=null,ve=null,ye=null,Xe=null,mt=null,Pt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},d={},p=new WeakMap,f=[],g=null,_=!1,m=null,h=null,y=null,M=null,x=null,F=null,P=null,L=new tt(0,0,0),D=0,T=!1,v=null,w=null,H=null,V=null,W=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,oe=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=oe>=1):G.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=oe>=2);let de=null,se={};const me=n.getParameter(n.SCISSOR_BOX),Ae=n.getParameter(n.VIEWPORT),Be=new Ct().fromArray(me),Q=new Ct().fromArray(Ae);function he(I,_e,J,ie){const ve=new Uint8Array(4),ye=n.createTexture();n.bindTexture(I,ye),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<J;Xe++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(_e,0,n.RGBA,1,1,ie,0,n.RGBA,n.UNSIGNED_BYTE,ve):n.texImage2D(_e+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ve);return ye}const xe={};xe[n.TEXTURE_2D]=he(n.TEXTURE_2D,n.TEXTURE_2D,1),xe[n.TEXTURE_CUBE_MAP]=he(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[n.TEXTURE_2D_ARRAY]=he(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xe[n.TEXTURE_3D]=he(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(n.DEPTH_TEST),a.setFunc(vr),Je(!1),Ze(zl),ce(n.CULL_FACE),z(mi);function ce(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function Ne(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function be(I,_e){return d[I]!==_e?(n.bindFramebuffer(I,_e),d[I]=_e,I===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=_e),I===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=_e),!0):!1}function Ve(I,_e){let J=f,ie=!1;if(I){J=p.get(_e),J===void 0&&(J=[],p.set(_e,J));const ve=I.textures;if(J.length!==ve.length||J[0]!==n.COLOR_ATTACHMENT0){for(let ye=0,Xe=ve.length;ye<Xe;ye++)J[ye]=n.COLOR_ATTACHMENT0+ye;J.length=ve.length,ie=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,ie=!0);ie&&n.drawBuffers(J)}function je(I){return g!==I?(n.useProgram(I),g=I,!0):!1}const it={[Pi]:n.FUNC_ADD,[Td]:n.FUNC_SUBTRACT,[Ad]:n.FUNC_REVERSE_SUBTRACT};it[Rd]=n.MIN,it[Cd]=n.MAX;const nt={[Pd]:n.ZERO,[Ld]:n.ONE,[Dd]:n.SRC_COLOR,[mo]:n.SRC_ALPHA,[Fd]:n.SRC_ALPHA_SATURATE,[Ud]:n.DST_COLOR,[kd]:n.DST_ALPHA,[Nd]:n.ONE_MINUS_SRC_COLOR,[go]:n.ONE_MINUS_SRC_ALPHA,[Od]:n.ONE_MINUS_DST_COLOR,[Id]:n.ONE_MINUS_DST_ALPHA,[zd]:n.CONSTANT_COLOR,[Bd]:n.ONE_MINUS_CONSTANT_COLOR,[Vd]:n.CONSTANT_ALPHA,[Hd]:n.ONE_MINUS_CONSTANT_ALPHA};function z(I,_e,J,ie,ve,ye,Xe,mt,Pt,st){if(I===mi){_===!0&&(Ne(n.BLEND),_=!1);return}if(_===!1&&(ce(n.BLEND),_=!0),I!==wd){if(I!==m||st!==T){if((h!==Pi||x!==Pi)&&(n.blendEquation(n.FUNC_ADD),h=Pi,x=Pi),st)switch(I){case dr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bl:n.blendFunc(n.ONE,n.ONE);break;case Vl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case dr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Vl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}y=null,M=null,F=null,P=null,L.set(0,0,0),D=0,m=I,T=st}return}ve=ve||_e,ye=ye||J,Xe=Xe||ie,(_e!==h||ve!==x)&&(n.blendEquationSeparate(it[_e],it[ve]),h=_e,x=ve),(J!==y||ie!==M||ye!==F||Xe!==P)&&(n.blendFuncSeparate(nt[J],nt[ie],nt[ye],nt[Xe]),y=J,M=ie,F=ye,P=Xe),(mt.equals(L)===!1||Pt!==D)&&(n.blendColor(mt.r,mt.g,mt.b,Pt),L.copy(mt),D=Pt),m=I,T=!1}function Ut(I,_e){I.side===gn?Ne(n.CULL_FACE):ce(n.CULL_FACE);let J=I.side===nn;_e&&(J=!J),Je(J),I.blending===dr&&I.transparent===!1?z(mi):z(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const ie=I.stencilWrite;o.setTest(ie),ie&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),vt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ce(n.SAMPLE_ALPHA_TO_COVERAGE):Ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function Je(I){v!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),v=I)}function Ze(I){I!==yd?(ce(n.CULL_FACE),I!==w&&(I===zl?n.cullFace(n.BACK):I===Ed?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ne(n.CULL_FACE),w=I}function Ue(I){I!==H&&(X&&n.lineWidth(I),H=I)}function vt(I,_e,J){I?(ce(n.POLYGON_OFFSET_FILL),(V!==_e||W!==J)&&(n.polygonOffset(_e,J),V=_e,W=J)):Ne(n.POLYGON_OFFSET_FILL)}function Fe(I){I?ce(n.SCISSOR_TEST):Ne(n.SCISSOR_TEST)}function A(I){I===void 0&&(I=n.TEXTURE0+$-1),de!==I&&(n.activeTexture(I),de=I)}function S(I,_e,J){J===void 0&&(de===null?J=n.TEXTURE0+$-1:J=de);let ie=se[J];ie===void 0&&(ie={type:void 0,texture:void 0},se[J]=ie),(ie.type!==I||ie.texture!==_e)&&(de!==J&&(n.activeTexture(J),de=J),n.bindTexture(I,_e||xe[I]),ie.type=I,ie.texture=_e)}function K(){const I=se[de];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function te(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ae(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pe(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Z(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Te(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ge(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ke(I){Be.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Be.copy(I))}function Se(I){Q.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Q.copy(I))}function Ye(I,_e){let J=c.get(_e);J===void 0&&(J=new WeakMap,c.set(_e,J));let ie=J.get(I);ie===void 0&&(ie=n.getUniformBlockIndex(_e,I.name),J.set(I,ie))}function qe(I,_e){const ie=c.get(_e).get(I);l.get(_e)!==ie&&(n.uniformBlockBinding(_e,ie,I.__bindingPointIndex),l.set(_e,ie))}function pt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},de=null,se={},d={},p=new WeakMap,f=[],g=null,_=!1,m=null,h=null,y=null,M=null,x=null,F=null,P=null,L=new tt(0,0,0),D=0,T=!1,v=null,w=null,H=null,V=null,W=null,Be.set(0,0,n.canvas.width,n.canvas.height),Q.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ce,disable:Ne,bindFramebuffer:be,drawBuffers:Ve,useProgram:je,setBlending:z,setMaterial:Ut,setFlipSided:Je,setCullFace:Ze,setLineWidth:Ue,setPolygonOffset:vt,setScissorTest:Fe,activeTexture:A,bindTexture:S,unbindTexture:K,compressedTexImage2D:te,compressedTexImage3D:ae,texImage2D:Te,texImage3D:Ge,updateUBOMapping:Ye,uniformBlockBinding:qe,texStorage2D:Z,texStorage3D:fe,texSubImage2D:ne,texSubImage3D:Pe,compressedTexSubImage2D:Me,compressedTexSubImage3D:Le,scissor:ke,viewport:Se,reset:pt}}function Uc(n,e,t,i){const r=Tv(i);switch(t){case Ku:return n*e;case qu:return n*e;case Zu:return n*e*2;case Ju:return n*e/r.components*r.byteLength;case _l:return n*e/r.components*r.byteLength;case Qu:return n*e*2/r.components*r.byteLength;case vl:return n*e*2/r.components*r.byteLength;case Yu:return n*e*3/r.components*r.byteLength;case Dn:return n*e*4/r.components*r.byteLength;case xl:return n*e*4/r.components*r.byteLength;case Xs:case $s:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ks:case Ys:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Co:case Lo:return Math.max(n,16)*Math.max(e,8)/4;case Ro:case Po:return Math.max(n,8)*Math.max(e,8)/2;case Do:case No:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ko:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Io:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Uo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Oo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case zo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ho:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Go:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case jo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Xo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case $o:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ko:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case qs:case Yo:case qo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case eh:case Zo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Jo:case Qo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Tv(n){switch(n){case ei:case Wu:return{byteLength:1,components:1};case Jr:case Xu:case rs:return{byteLength:2,components:1};case ml:case gl:return{byteLength:2,components:4};case ki:case pl:case qn:return{byteLength:4,components:1};case $u:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Av(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pe,u=new WeakMap;let d;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return f?new OffscreenCanvas(A,S):ia("canvas")}function _(A,S,K){let te=1;const ae=Fe(A);if((ae.width>K||ae.height>K)&&(te=K/Math.max(ae.width,ae.height)),te<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ne=Math.floor(te*ae.width),Pe=Math.floor(te*ae.height);d===void 0&&(d=g(ne,Pe));const Me=S?g(ne,Pe):d;return Me.width=ne,Me.height=Pe,Me.getContext("2d").drawImage(A,0,0,ne,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ne+"x"+Pe+")."),Me}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),A;return A}function m(A){return A.generateMipmaps}function h(A){n.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(A,S,K,te,ae=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ne=S;if(S===n.RED&&(K===n.FLOAT&&(ne=n.R32F),K===n.HALF_FLOAT&&(ne=n.R16F),K===n.UNSIGNED_BYTE&&(ne=n.R8)),S===n.RED_INTEGER&&(K===n.UNSIGNED_BYTE&&(ne=n.R8UI),K===n.UNSIGNED_SHORT&&(ne=n.R16UI),K===n.UNSIGNED_INT&&(ne=n.R32UI),K===n.BYTE&&(ne=n.R8I),K===n.SHORT&&(ne=n.R16I),K===n.INT&&(ne=n.R32I)),S===n.RG&&(K===n.FLOAT&&(ne=n.RG32F),K===n.HALF_FLOAT&&(ne=n.RG16F),K===n.UNSIGNED_BYTE&&(ne=n.RG8)),S===n.RG_INTEGER&&(K===n.UNSIGNED_BYTE&&(ne=n.RG8UI),K===n.UNSIGNED_SHORT&&(ne=n.RG16UI),K===n.UNSIGNED_INT&&(ne=n.RG32UI),K===n.BYTE&&(ne=n.RG8I),K===n.SHORT&&(ne=n.RG16I),K===n.INT&&(ne=n.RG32I)),S===n.RGB_INTEGER&&(K===n.UNSIGNED_BYTE&&(ne=n.RGB8UI),K===n.UNSIGNED_SHORT&&(ne=n.RGB16UI),K===n.UNSIGNED_INT&&(ne=n.RGB32UI),K===n.BYTE&&(ne=n.RGB8I),K===n.SHORT&&(ne=n.RGB16I),K===n.INT&&(ne=n.RGB32I)),S===n.RGBA_INTEGER&&(K===n.UNSIGNED_BYTE&&(ne=n.RGBA8UI),K===n.UNSIGNED_SHORT&&(ne=n.RGBA16UI),K===n.UNSIGNED_INT&&(ne=n.RGBA32UI),K===n.BYTE&&(ne=n.RGBA8I),K===n.SHORT&&(ne=n.RGBA16I),K===n.INT&&(ne=n.RGBA32I)),S===n.RGB&&K===n.UNSIGNED_INT_5_9_9_9_REV&&(ne=n.RGB9_E5),S===n.RGBA){const Pe=ae?ca:dt.getTransfer(te);K===n.FLOAT&&(ne=n.RGBA32F),K===n.HALF_FLOAT&&(ne=n.RGBA16F),K===n.UNSIGNED_BYTE&&(ne=Pe===Mt?n.SRGB8_ALPHA8:n.RGBA8),K===n.UNSIGNED_SHORT_4_4_4_4&&(ne=n.RGBA4),K===n.UNSIGNED_SHORT_5_5_5_1&&(ne=n.RGB5_A1)}return(ne===n.R16F||ne===n.R32F||ne===n.RG16F||ne===n.RG32F||ne===n.RGBA16F||ne===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function x(A,S){let K;return A?S===null||S===ki||S===Sr?K=n.DEPTH24_STENCIL8:S===qn?K=n.DEPTH32F_STENCIL8:S===Jr&&(K=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ki||S===Sr?K=n.DEPTH_COMPONENT24:S===qn?K=n.DEPTH_COMPONENT32F:S===Jr&&(K=n.DEPTH_COMPONENT16),K}function F(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==vn&&A.minFilter!==bn?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function P(A){const S=A.target;S.removeEventListener("dispose",P),D(S),S.isVideoTexture&&u.delete(S)}function L(A){const S=A.target;S.removeEventListener("dispose",L),v(S)}function D(A){const S=i.get(A);if(S.__webglInit===void 0)return;const K=A.source,te=p.get(K);if(te){const ae=te[S.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&T(A),Object.keys(te).length===0&&p.delete(K)}i.remove(A)}function T(A){const S=i.get(A);n.deleteTexture(S.__webglTexture);const K=A.source,te=p.get(K);delete te[S.__cacheKey],a.memory.textures--}function v(A){const S=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(S.__webglFramebuffer[te]))for(let ae=0;ae<S.__webglFramebuffer[te].length;ae++)n.deleteFramebuffer(S.__webglFramebuffer[te][ae]);else n.deleteFramebuffer(S.__webglFramebuffer[te]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[te])}else{if(Array.isArray(S.__webglFramebuffer))for(let te=0;te<S.__webglFramebuffer.length;te++)n.deleteFramebuffer(S.__webglFramebuffer[te]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let te=0;te<S.__webglColorRenderbuffer.length;te++)S.__webglColorRenderbuffer[te]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[te]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const K=A.textures;for(let te=0,ae=K.length;te<ae;te++){const ne=i.get(K[te]);ne.__webglTexture&&(n.deleteTexture(ne.__webglTexture),a.memory.textures--),i.remove(K[te])}i.remove(A)}let w=0;function H(){w=0}function V(){const A=w;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),w+=1,A}function W(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function $(A,S){const K=i.get(A);if(A.isVideoTexture&&Ue(A),A.isRenderTargetTexture===!1&&A.version>0&&K.__version!==A.version){const te=A.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(K,A,S);return}}t.bindTexture(n.TEXTURE_2D,K.__webglTexture,n.TEXTURE0+S)}function X(A,S){const K=i.get(A);if(A.version>0&&K.__version!==A.version){Q(K,A,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,K.__webglTexture,n.TEXTURE0+S)}function oe(A,S){const K=i.get(A);if(A.version>0&&K.__version!==A.version){Q(K,A,S);return}t.bindTexture(n.TEXTURE_3D,K.__webglTexture,n.TEXTURE0+S)}function G(A,S){const K=i.get(A);if(A.version>0&&K.__version!==A.version){he(K,A,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture,n.TEXTURE0+S)}const de={[To]:n.REPEAT,[Di]:n.CLAMP_TO_EDGE,[Ao]:n.MIRRORED_REPEAT},se={[vn]:n.NEAREST,[Jd]:n.NEAREST_MIPMAP_NEAREST,[hs]:n.NEAREST_MIPMAP_LINEAR,[bn]:n.LINEAR,[ma]:n.LINEAR_MIPMAP_NEAREST,[Ni]:n.LINEAR_MIPMAP_LINEAR},me={[nf]:n.NEVER,[cf]:n.ALWAYS,[rf]:n.LESS,[th]:n.LEQUAL,[sf]:n.EQUAL,[lf]:n.GEQUAL,[af]:n.GREATER,[of]:n.NOTEQUAL};function Ae(A,S){if(S.type===qn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===bn||S.magFilter===ma||S.magFilter===hs||S.magFilter===Ni||S.minFilter===bn||S.minFilter===ma||S.minFilter===hs||S.minFilter===Ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,de[S.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,de[S.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,de[S.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,se[S.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,se[S.minFilter]),S.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,me[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===vn||S.minFilter!==hs&&S.minFilter!==Ni||S.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const K=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Be(A,S){let K=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",P));const te=S.source;let ae=p.get(te);ae===void 0&&(ae={},p.set(te,ae));const ne=W(S);if(ne!==A.__cacheKey){ae[ne]===void 0&&(ae[ne]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,K=!0),ae[ne].usedTimes++;const Pe=ae[A.__cacheKey];Pe!==void 0&&(ae[A.__cacheKey].usedTimes--,Pe.usedTimes===0&&T(S)),A.__cacheKey=ne,A.__webglTexture=ae[ne].texture}return K}function Q(A,S,K){let te=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(te=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(te=n.TEXTURE_3D);const ae=Be(A,S),ne=S.source;t.bindTexture(te,A.__webglTexture,n.TEXTURE0+K);const Pe=i.get(ne);if(ne.version!==Pe.__version||ae===!0){t.activeTexture(n.TEXTURE0+K);const Me=dt.getPrimaries(dt.workingColorSpace),Le=S.colorSpace===fi?null:dt.getPrimaries(S.colorSpace),Z=S.colorSpace===fi||Me===Le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let fe=_(S.image,!1,r.maxTextureSize);fe=vt(S,fe);const Te=s.convert(S.format,S.colorSpace),Ge=s.convert(S.type);let ke=M(S.internalFormat,Te,Ge,S.colorSpace,S.isVideoTexture);Ae(te,S);let Se;const Ye=S.mipmaps,qe=S.isVideoTexture!==!0,pt=Pe.__version===void 0||ae===!0,I=ne.dataReady,_e=F(S,fe);if(S.isDepthTexture)ke=x(S.format===yr,S.type),pt&&(qe?t.texStorage2D(n.TEXTURE_2D,1,ke,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,ke,fe.width,fe.height,0,Te,Ge,null));else if(S.isDataTexture)if(Ye.length>0){qe&&pt&&t.texStorage2D(n.TEXTURE_2D,_e,ke,Ye[0].width,Ye[0].height);for(let J=0,ie=Ye.length;J<ie;J++)Se=Ye[J],qe?I&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,Se.width,Se.height,Te,Ge,Se.data):t.texImage2D(n.TEXTURE_2D,J,ke,Se.width,Se.height,0,Te,Ge,Se.data);S.generateMipmaps=!1}else qe?(pt&&t.texStorage2D(n.TEXTURE_2D,_e,ke,fe.width,fe.height),I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe.width,fe.height,Te,Ge,fe.data)):t.texImage2D(n.TEXTURE_2D,0,ke,fe.width,fe.height,0,Te,Ge,fe.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){qe&&pt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,ke,Ye[0].width,Ye[0].height,fe.depth);for(let J=0,ie=Ye.length;J<ie;J++)if(Se=Ye[J],S.format!==Dn)if(Te!==null)if(qe){if(I)if(S.layerUpdates.size>0){const ve=Uc(Se.width,Se.height,S.format,S.type);for(const ye of S.layerUpdates){const Xe=Se.data.subarray(ye*ve/Se.data.BYTES_PER_ELEMENT,(ye+1)*ve/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,ye,Se.width,Se.height,1,Te,Xe)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Se.width,Se.height,fe.depth,Te,Se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,ke,Se.width,Se.height,fe.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?I&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Se.width,Se.height,fe.depth,Te,Ge,Se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,ke,Se.width,Se.height,fe.depth,0,Te,Ge,Se.data)}else{qe&&pt&&t.texStorage2D(n.TEXTURE_2D,_e,ke,Ye[0].width,Ye[0].height);for(let J=0,ie=Ye.length;J<ie;J++)Se=Ye[J],S.format!==Dn?Te!==null?qe?I&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,Se.width,Se.height,Te,Se.data):t.compressedTexImage2D(n.TEXTURE_2D,J,ke,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?I&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,Se.width,Se.height,Te,Ge,Se.data):t.texImage2D(n.TEXTURE_2D,J,ke,Se.width,Se.height,0,Te,Ge,Se.data)}else if(S.isDataArrayTexture)if(qe){if(pt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,ke,fe.width,fe.height,fe.depth),I)if(S.layerUpdates.size>0){const J=Uc(fe.width,fe.height,S.format,S.type);for(const ie of S.layerUpdates){const ve=fe.data.subarray(ie*J/fe.data.BYTES_PER_ELEMENT,(ie+1)*J/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ie,fe.width,fe.height,1,Te,Ge,ve)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Te,Ge,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ke,fe.width,fe.height,fe.depth,0,Te,Ge,fe.data);else if(S.isData3DTexture)qe?(pt&&t.texStorage3D(n.TEXTURE_3D,_e,ke,fe.width,fe.height,fe.depth),I&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Te,Ge,fe.data)):t.texImage3D(n.TEXTURE_3D,0,ke,fe.width,fe.height,fe.depth,0,Te,Ge,fe.data);else if(S.isFramebufferTexture){if(pt)if(qe)t.texStorage2D(n.TEXTURE_2D,_e,ke,fe.width,fe.height);else{let J=fe.width,ie=fe.height;for(let ve=0;ve<_e;ve++)t.texImage2D(n.TEXTURE_2D,ve,ke,J,ie,0,Te,Ge,null),J>>=1,ie>>=1}}else if(Ye.length>0){if(qe&&pt){const J=Fe(Ye[0]);t.texStorage2D(n.TEXTURE_2D,_e,ke,J.width,J.height)}for(let J=0,ie=Ye.length;J<ie;J++)Se=Ye[J],qe?I&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,Te,Ge,Se):t.texImage2D(n.TEXTURE_2D,J,ke,Te,Ge,Se);S.generateMipmaps=!1}else if(qe){if(pt){const J=Fe(fe);t.texStorage2D(n.TEXTURE_2D,_e,ke,J.width,J.height)}I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Te,Ge,fe)}else t.texImage2D(n.TEXTURE_2D,0,ke,Te,Ge,fe);m(S)&&h(te),Pe.__version=ne.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function he(A,S,K){if(S.image.length!==6)return;const te=Be(A,S),ae=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+K);const ne=i.get(ae);if(ae.version!==ne.__version||te===!0){t.activeTexture(n.TEXTURE0+K);const Pe=dt.getPrimaries(dt.workingColorSpace),Me=S.colorSpace===fi?null:dt.getPrimaries(S.colorSpace),Le=S.colorSpace===fi||Pe===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);const Z=S.isCompressedTexture||S.image[0].isCompressedTexture,fe=S.image[0]&&S.image[0].isDataTexture,Te=[];for(let ie=0;ie<6;ie++)!Z&&!fe?Te[ie]=_(S.image[ie],!0,r.maxCubemapSize):Te[ie]=fe?S.image[ie].image:S.image[ie],Te[ie]=vt(S,Te[ie]);const Ge=Te[0],ke=s.convert(S.format,S.colorSpace),Se=s.convert(S.type),Ye=M(S.internalFormat,ke,Se,S.colorSpace),qe=S.isVideoTexture!==!0,pt=ne.__version===void 0||te===!0,I=ae.dataReady;let _e=F(S,Ge);Ae(n.TEXTURE_CUBE_MAP,S);let J;if(Z){qe&&pt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Ye,Ge.width,Ge.height);for(let ie=0;ie<6;ie++){J=Te[ie].mipmaps;for(let ve=0;ve<J.length;ve++){const ye=J[ve];S.format!==Dn?ke!==null?qe?I&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,0,0,ye.width,ye.height,ke,ye.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,Ye,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,0,0,ye.width,ye.height,ke,Se,ye.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,Ye,ye.width,ye.height,0,ke,Se,ye.data)}}}else{if(J=S.mipmaps,qe&&pt){J.length>0&&_e++;const ie=Fe(Te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Ye,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(fe){qe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Te[ie].width,Te[ie].height,ke,Se,Te[ie].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ye,Te[ie].width,Te[ie].height,0,ke,Se,Te[ie].data);for(let ve=0;ve<J.length;ve++){const Xe=J[ve].image[ie].image;qe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,0,0,Xe.width,Xe.height,ke,Se,Xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,Ye,Xe.width,Xe.height,0,ke,Se,Xe.data)}}else{qe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,ke,Se,Te[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ye,ke,Se,Te[ie]);for(let ve=0;ve<J.length;ve++){const ye=J[ve];qe?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,0,0,ke,Se,ye.image[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,Ye,ke,Se,ye.image[ie])}}}m(S)&&h(n.TEXTURE_CUBE_MAP),ne.__version=ae.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function xe(A,S,K,te,ae,ne){const Pe=s.convert(K.format,K.colorSpace),Me=s.convert(K.type),Le=M(K.internalFormat,Pe,Me,K.colorSpace),Z=i.get(S),fe=i.get(K);if(fe.__renderTarget=S,!Z.__hasExternalTextures){const Te=Math.max(1,S.width>>ne),Ge=Math.max(1,S.height>>ne);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,ne,Le,Te,Ge,S.depth,0,Pe,Me,null):t.texImage2D(ae,ne,Le,Te,Ge,0,Pe,Me,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Ze(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,ae,fe.__webglTexture,0,Je(S)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,te,ae,fe.__webglTexture,ne),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ce(A,S,K){if(n.bindRenderbuffer(n.RENDERBUFFER,A),S.depthBuffer){const te=S.depthTexture,ae=te&&te.isDepthTexture?te.type:null,ne=x(S.stencilBuffer,ae),Pe=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=Je(S);Ze(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Me,ne,S.width,S.height):K?n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,ne,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,ne,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Pe,n.RENDERBUFFER,A)}else{const te=S.textures;for(let ae=0;ae<te.length;ae++){const ne=te[ae],Pe=s.convert(ne.format,ne.colorSpace),Me=s.convert(ne.type),Le=M(ne.internalFormat,Pe,Me,ne.colorSpace),Z=Je(S);K&&Ze(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Z,Le,S.width,S.height):Ze(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Z,Le,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Le,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ne(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=i.get(S.depthTexture);te.__renderTarget=S,(!te.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),$(S.depthTexture,0);const ae=te.__webglTexture,ne=Je(S);if(S.depthTexture.format===fr)Ze(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0,ne):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0);else if(S.depthTexture.format===yr)Ze(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0,ne):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function be(A){const S=i.get(A),K=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const te=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),te){const ae=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,te.removeEventListener("dispose",ae)};te.addEventListener("dispose",ae),S.__depthDisposeCallback=ae}S.__boundDepthTexture=te}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");Ne(S.__webglFramebuffer,A)}else if(K){S.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[te]),S.__webglDepthbuffer[te]===void 0)S.__webglDepthbuffer[te]=n.createRenderbuffer(),ce(S.__webglDepthbuffer[te],A,!1);else{const ae=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=S.__webglDepthbuffer[te];n.bindRenderbuffer(n.RENDERBUFFER,ne),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,ne)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),ce(S.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,ae)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(A,S,K){const te=i.get(A);S!==void 0&&xe(te.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),K!==void 0&&be(A)}function je(A){const S=A.texture,K=i.get(A),te=i.get(S);A.addEventListener("dispose",L);const ae=A.textures,ne=A.isWebGLCubeRenderTarget===!0,Pe=ae.length>1;if(Pe||(te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture()),te.__version=S.version,a.memory.textures++),ne){K.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)if(S.mipmaps&&S.mipmaps.length>0){K.__webglFramebuffer[Me]=[];for(let Le=0;Le<S.mipmaps.length;Le++)K.__webglFramebuffer[Me][Le]=n.createFramebuffer()}else K.__webglFramebuffer[Me]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){K.__webglFramebuffer=[];for(let Me=0;Me<S.mipmaps.length;Me++)K.__webglFramebuffer[Me]=n.createFramebuffer()}else K.__webglFramebuffer=n.createFramebuffer();if(Pe)for(let Me=0,Le=ae.length;Me<Le;Me++){const Z=i.get(ae[Me]);Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Ze(A)===!1){K.__webglMultisampledFramebuffer=n.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let Me=0;Me<ae.length;Me++){const Le=ae[Me];K.__webglColorRenderbuffer[Me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,K.__webglColorRenderbuffer[Me]);const Z=s.convert(Le.format,Le.colorSpace),fe=s.convert(Le.type),Te=M(Le.internalFormat,Z,fe,Le.colorSpace,A.isXRRenderTarget===!0),Ge=Je(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,Te,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,K.__webglColorRenderbuffer[Me])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(K.__webglDepthRenderbuffer=n.createRenderbuffer(),ce(K.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ne){t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,S);for(let Me=0;Me<6;Me++)if(S.mipmaps&&S.mipmaps.length>0)for(let Le=0;Le<S.mipmaps.length;Le++)xe(K.__webglFramebuffer[Me][Le],A,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Le);else xe(K.__webglFramebuffer[Me],A,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0);m(S)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let Me=0,Le=ae.length;Me<Le;Me++){const Z=ae[Me],fe=i.get(Z);t.bindTexture(n.TEXTURE_2D,fe.__webglTexture),Ae(n.TEXTURE_2D,Z),xe(K.__webglFramebuffer,A,Z,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,0),m(Z)&&h(n.TEXTURE_2D)}t.unbindTexture()}else{let Me=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Me=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Me,te.__webglTexture),Ae(Me,S),S.mipmaps&&S.mipmaps.length>0)for(let Le=0;Le<S.mipmaps.length;Le++)xe(K.__webglFramebuffer[Le],A,S,n.COLOR_ATTACHMENT0,Me,Le);else xe(K.__webglFramebuffer,A,S,n.COLOR_ATTACHMENT0,Me,0);m(S)&&h(Me),t.unbindTexture()}A.depthBuffer&&be(A)}function it(A){const S=A.textures;for(let K=0,te=S.length;K<te;K++){const ae=S[K];if(m(ae)){const ne=y(A),Pe=i.get(ae).__webglTexture;t.bindTexture(ne,Pe),h(ne),t.unbindTexture()}}}const nt=[],z=[];function Ut(A){if(A.samples>0){if(Ze(A)===!1){const S=A.textures,K=A.width,te=A.height;let ae=n.COLOR_BUFFER_BIT;const ne=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Pe=i.get(A),Me=S.length>1;if(Me)for(let Le=0;Le<S.length;Le++)t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Le=0;Le<S.length;Le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),Me){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Pe.__webglColorRenderbuffer[Le]);const Z=i.get(S[Le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Z,0)}n.blitFramebuffer(0,0,K,te,0,0,K,te,ae,n.NEAREST),l===!0&&(nt.length=0,z.length=0,nt.push(n.COLOR_ATTACHMENT0+Le),A.depthBuffer&&A.resolveDepthBuffer===!1&&(nt.push(ne),z.push(ne),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,nt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Me)for(let Le=0;Le<S.length;Le++){t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,Pe.__webglColorRenderbuffer[Le]);const Z=i.get(S[Le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,Z,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function Je(A){return Math.min(r.maxSamples,A.samples)}function Ze(A){const S=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ue(A){const S=a.render.frame;u.get(A)!==S&&(u.set(A,S),A.update())}function vt(A,S){const K=A.colorSpace,te=A.format,ae=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||K!==br&&K!==fi&&(dt.getTransfer(K)===Mt?(te!==Dn||ae!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),S}function Fe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=H,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=oe,this.setTextureCube=G,this.rebindTextures=Ve,this.setupRenderTarget=je,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=Ze}function Rv(n,e){function t(i,r=fi){let s;const a=dt.getTransfer(r);if(i===ei)return n.UNSIGNED_BYTE;if(i===ml)return n.UNSIGNED_SHORT_4_4_4_4;if(i===gl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$u)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Wu)return n.BYTE;if(i===Xu)return n.SHORT;if(i===Jr)return n.UNSIGNED_SHORT;if(i===pl)return n.INT;if(i===ki)return n.UNSIGNED_INT;if(i===qn)return n.FLOAT;if(i===rs)return n.HALF_FLOAT;if(i===Ku)return n.ALPHA;if(i===Yu)return n.RGB;if(i===Dn)return n.RGBA;if(i===qu)return n.LUMINANCE;if(i===Zu)return n.LUMINANCE_ALPHA;if(i===fr)return n.DEPTH_COMPONENT;if(i===yr)return n.DEPTH_STENCIL;if(i===Ju)return n.RED;if(i===_l)return n.RED_INTEGER;if(i===Qu)return n.RG;if(i===vl)return n.RG_INTEGER;if(i===xl)return n.RGBA_INTEGER;if(i===Xs||i===$s||i===Ks||i===Ys)if(a===Mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Xs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===$s)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ks)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Xs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===$s)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ks)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ys)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ro||i===Co||i===Po||i===Lo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ro)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Co)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Po)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Lo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Do||i===No||i===ko)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Do||i===No)return a===Mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ko)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Io||i===Uo||i===Oo||i===Fo||i===zo||i===Bo||i===Vo||i===Ho||i===Go||i===jo||i===Wo||i===Xo||i===$o||i===Ko)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Io)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Uo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Oo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Vo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ho)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Go)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Xo)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===$o)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ko)return a===Mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qs||i===Yo||i===qo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===qs)return a===Mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===qo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===eh||i===Zo||i===Jo||i===Qo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===qs)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Zo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Qo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Sr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Cv extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class pi extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pv={type:"move"};class Ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),h=this._getHandJoint(c,_);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&p>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pv)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new pi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Lv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Nv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new rn,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new wn({vertexShader:Lv,fragmentShader:Dv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new os(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kv extends Fi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,p=null,f=null,g=null;const _=new Nv,m=t.getContextAttributes();let h=null,y=null;const M=[],x=[],F=new pe;let P=null;const L=new mn;L.viewport=new Ct;const D=new mn;D.viewport=new Ct;const T=[L,D],v=new Cv;let w=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let he=M[Q];return he===void 0&&(he=new Ha,M[Q]=he),he.getTargetRaySpace()},this.getControllerGrip=function(Q){let he=M[Q];return he===void 0&&(he=new Ha,M[Q]=he),he.getGripSpace()},this.getHand=function(Q){let he=M[Q];return he===void 0&&(he=new Ha,M[Q]=he),he.getHandSpace()};function V(Q){const he=x.indexOf(Q.inputSource);if(he===-1)return;const xe=M[he];xe!==void 0&&(xe.update(Q.inputSource,Q.frame,c||a),xe.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",$);for(let Q=0;Q<M.length;Q++){const he=x[Q];he!==null&&(x[Q]=null,M[Q].disconnect(he))}w=null,H=null,_.reset(),e.setRenderTarget(h),f=null,p=null,d=null,r=null,y=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(F.width,F.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",W),r.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(F),r.renderState.layers===void 0){const he={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,he),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new On(f.framebufferWidth,f.framebufferHeight,{format:Dn,type:ei,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let he=null,xe=null,ce=null;m.depth&&(ce=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=m.stencil?yr:fr,xe=m.stencil?Sr:ki);const Ne={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};d=new XRWebGLBinding(r,t),p=d.createProjectionLayer(Ne),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),y=new On(p.textureWidth,p.textureHeight,{format:Dn,type:ei,depthTexture:new wl(p.textureWidth,p.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Be.setContext(r),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(Q){for(let he=0;he<Q.removed.length;he++){const xe=Q.removed[he],ce=x.indexOf(xe);ce>=0&&(x[ce]=null,M[ce].disconnect(xe))}for(let he=0;he<Q.added.length;he++){const xe=Q.added[he];let ce=x.indexOf(xe);if(ce===-1){for(let be=0;be<M.length;be++)if(be>=x.length){x.push(xe),ce=be;break}else if(x[be]===null){x[be]=xe,ce=be;break}if(ce===-1)break}const Ne=M[ce];Ne&&Ne.connect(xe)}}const X=new R,oe=new R;function G(Q,he,xe){X.setFromMatrixPosition(he.matrixWorld),oe.setFromMatrixPosition(xe.matrixWorld);const ce=X.distanceTo(oe),Ne=he.projectionMatrix.elements,be=xe.projectionMatrix.elements,Ve=Ne[14]/(Ne[10]-1),je=Ne[14]/(Ne[10]+1),it=(Ne[9]+1)/Ne[5],nt=(Ne[9]-1)/Ne[5],z=(Ne[8]-1)/Ne[0],Ut=(be[8]+1)/be[0],Je=Ve*z,Ze=Ve*Ut,Ue=ce/(-z+Ut),vt=Ue*-z;if(he.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(vt),Q.translateZ(Ue),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ne[10]===-1)Q.projectionMatrix.copy(he.projectionMatrix),Q.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{const Fe=Ve+Ue,A=je+Ue,S=Je-vt,K=Ze+(ce-vt),te=it*je/A*Fe,ae=nt*je/A*Fe;Q.projectionMatrix.makePerspective(S,K,te,ae,Fe,A),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function de(Q,he){he===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(he.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let he=Q.near,xe=Q.far;_.texture!==null&&(_.depthNear>0&&(he=_.depthNear),_.depthFar>0&&(xe=_.depthFar)),v.near=D.near=L.near=he,v.far=D.far=L.far=xe,(w!==v.near||H!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),w=v.near,H=v.far),L.layers.mask=Q.layers.mask|2,D.layers.mask=Q.layers.mask|4,v.layers.mask=L.layers.mask|D.layers.mask;const ce=Q.parent,Ne=v.cameras;de(v,ce);for(let be=0;be<Ne.length;be++)de(Ne[be],ce);Ne.length===2?G(v,L,D):v.projectionMatrix.copy(L.projectionMatrix),se(Q,v,ce)};function se(Q,he,xe){xe===null?Q.matrix.copy(he.matrixWorld):(Q.matrix.copy(xe.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(he.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(he.projectionMatrix),Q.projectionMatrixInverse.copy(he.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Qr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(Q){l=Q,p!==null&&(p.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let me=null;function Ae(Q,he){if(u=he.getViewerPose(c||a),g=he,u!==null){const xe=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ce=!1;xe.length!==v.cameras.length&&(v.cameras.length=0,ce=!0);for(let be=0;be<xe.length;be++){const Ve=xe[be];let je=null;if(f!==null)je=f.getViewport(Ve);else{const nt=d.getViewSubImage(p,Ve);je=nt.viewport,be===0&&(e.setRenderTargetTextures(y,nt.colorTexture,p.ignoreDepthValues?void 0:nt.depthStencilTexture),e.setRenderTarget(y))}let it=T[be];it===void 0&&(it=new mn,it.layers.enable(be),it.viewport=new Ct,T[be]=it),it.matrix.fromArray(Ve.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(Ve.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(je.x,je.y,je.width,je.height),be===0&&(v.matrix.copy(it.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ce===!0&&v.cameras.push(it)}const Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")){const be=d.getDepthInformation(xe[0]);be&&be.isValid&&be.texture&&_.init(e,be,r.renderState)}}for(let xe=0;xe<M.length;xe++){const ce=x[xe],Ne=M[xe];ce!==null&&Ne!==void 0&&Ne.update(ce,he,c||a)}me&&me(Q,he),he.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:he}),g=null}const Be=new hh;Be.setAnimationLoop(Ae),this.setAnimationLoop=function(Q){me=Q},this.dispose=function(){}}}const Ri=new zn,Iv=new _t;function Uv(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,lh(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,y,M,x){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),p(m,h),h.isMeshPhysicalMaterial&&f(m,h,x)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),_(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,y,M):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===nn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===nn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const y=e.get(h),M=y.envMap,x=y.envMapRotation;M&&(m.envMap.value=M,Ri.copy(x),Ri.x*=-1,Ri.y*=-1,Ri.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ri.y*=-1,Ri.z*=-1),m.envMapRotation.value.setFromMatrix4(Iv.makeRotationFromEuler(Ri)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,y,M){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*y,m.scale.value=M*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function p(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function f(m,h,y){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===nn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function _(m,h){const y=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Ov(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){const x=M.program;i.uniformBlockBinding(y,x)}function c(y,M){let x=r[y.id];x===void 0&&(g(y),x=u(y),r[y.id]=x,y.addEventListener("dispose",m));const F=M.program;i.updateUBOMapping(y,F);const P=e.render.frame;s[y.id]!==P&&(p(y),s[y.id]=P)}function u(y){const M=d();y.__bindingPointIndex=M;const x=n.createBuffer(),F=y.__size,P=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,F,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,x),x}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(y){const M=r[y.id],x=y.uniforms,F=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let P=0,L=x.length;P<L;P++){const D=Array.isArray(x[P])?x[P]:[x[P]];for(let T=0,v=D.length;T<v;T++){const w=D[T];if(f(w,P,T,F)===!0){const H=w.__offset,V=Array.isArray(w.value)?w.value:[w.value];let W=0;for(let $=0;$<V.length;$++){const X=V[$],oe=_(X);typeof X=="number"||typeof X=="boolean"?(w.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,H+W,w.__data)):X.isMatrix3?(w.__data[0]=X.elements[0],w.__data[1]=X.elements[1],w.__data[2]=X.elements[2],w.__data[3]=0,w.__data[4]=X.elements[3],w.__data[5]=X.elements[4],w.__data[6]=X.elements[5],w.__data[7]=0,w.__data[8]=X.elements[6],w.__data[9]=X.elements[7],w.__data[10]=X.elements[8],w.__data[11]=0):(X.toArray(w.__data,W),W+=oe.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,w.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,M,x,F){const P=y.value,L=M+"_"+x;if(F[L]===void 0)return typeof P=="number"||typeof P=="boolean"?F[L]=P:F[L]=P.clone(),!0;{const D=F[L];if(typeof P=="number"||typeof P=="boolean"){if(D!==P)return F[L]=P,!0}else if(D.equals(P)===!1)return D.copy(P),!0}return!1}function g(y){const M=y.uniforms;let x=0;const F=16;for(let L=0,D=M.length;L<D;L++){const T=Array.isArray(M[L])?M[L]:[M[L]];for(let v=0,w=T.length;v<w;v++){const H=T[v],V=Array.isArray(H.value)?H.value:[H.value];for(let W=0,$=V.length;W<$;W++){const X=V[W],oe=_(X),G=x%F,de=G%oe.boundary,se=G+de;x+=de,se!==0&&F-se<oe.storage&&(x+=F-se),H.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=x,x+=oe.storage}}}const P=x%F;return P>0&&(x+=F-P),y.__size=x,y.__cache={},this}function _(y){const M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),M}function m(y){const M=y.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function h(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}class Fv{constructor(e={}){const{canvas:t=Tf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,h=null;const y=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pn,this.toneMapping=gi,this.toneMappingExposure=1;const x=this;let F=!1,P=0,L=0,D=null,T=-1,v=null;const w=new Ct,H=new Ct;let V=null;const W=new tt(0);let $=0,X=t.width,oe=t.height,G=1,de=null,se=null;const me=new Ct(0,0,X,oe),Ae=new Ct(0,0,X,oe);let Be=!1;const Q=new El;let he=!1,xe=!1;const ce=new _t,Ne=new _t,be=new R,Ve=new Ct,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let it=!1;function nt(){return D===null?G:1}let z=i;function Ut(E,U){return t.getContext(E,U)}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${hl}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",ye,!1),z===null){const U="webgl2";if(z=Ut(U,E),z===null)throw Ut(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Je,Ze,Ue,vt,Fe,A,S,K,te,ae,ne,Pe,Me,Le,Z,fe,Te,Ge,ke,Se,Ye,qe,pt,I;function _e(){Je=new Gg(z),Je.init(),qe=new Rv(z,Je),Ze=new Og(z,Je,e,qe),Ue=new wv(z,Je),Ze.reverseDepthBuffer&&p&&Ue.buffers.depth.setReversed(!0),vt=new Xg(z),Fe=new uv,A=new Av(z,Je,Ue,Fe,Ze,qe,vt),S=new zg(x),K=new Hg(x),te=new Qf(z),pt=new Ig(z,te),ae=new jg(z,te,vt,pt),ne=new Kg(z,ae,te,vt),ke=new $g(z,Ze,A),fe=new Fg(Fe),Pe=new cv(x,S,K,Je,Ze,pt,fe),Me=new Uv(x,Fe),Le=new dv,Z=new vv(Je),Ge=new kg(x,S,K,Ue,ne,f,l),Te=new Ev(x,ne,Ze),I=new Ov(z,vt,Ze,Ue),Se=new Ug(z,Je,vt),Ye=new Wg(z,Je,vt),vt.programs=Pe.programs,x.capabilities=Ze,x.extensions=Je,x.properties=Fe,x.renderLists=Le,x.shadowMap=Te,x.state=Ue,x.info=vt}_e();const J=new kv(x,z);this.xr=J,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const E=Je.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Je.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(X,oe,!1))},this.getSize=function(E){return E.set(X,oe)},this.setSize=function(E,U,q=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=E,oe=U,t.width=Math.floor(E*G),t.height=Math.floor(U*G),q===!0&&(t.style.width=E+"px",t.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(X*G,oe*G).floor()},this.setDrawingBufferSize=function(E,U,q){X=E,oe=U,G=q,t.width=Math.floor(E*q),t.height=Math.floor(U*q),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(w)},this.getViewport=function(E){return E.copy(me)},this.setViewport=function(E,U,q,Y){E.isVector4?me.set(E.x,E.y,E.z,E.w):me.set(E,U,q,Y),Ue.viewport(w.copy(me).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(Ae)},this.setScissor=function(E,U,q,Y){E.isVector4?Ae.set(E.x,E.y,E.z,E.w):Ae.set(E,U,q,Y),Ue.scissor(H.copy(Ae).multiplyScalar(G).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(E){Ue.setScissorTest(Be=E)},this.setOpaqueSort=function(E){de=E},this.setTransparentSort=function(E){se=E},this.getClearColor=function(E){return E.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(E=!0,U=!0,q=!0){let Y=0;if(E){let B=!1;if(D!==null){const O=D.texture.format;B=O===xl||O===vl||O===_l}if(B){const O=D.texture.type,ee=O===ei||O===ki||O===Jr||O===Sr||O===ml||O===gl,le=Ge.getClearColor(),ge=Ge.getClearAlpha(),we=le.r,He=le.g,De=le.b;ee?(g[0]=we,g[1]=He,g[2]=De,g[3]=ge,z.clearBufferuiv(z.COLOR,0,g)):(_[0]=we,_[1]=He,_[2]=De,_[3]=ge,z.clearBufferiv(z.COLOR,0,_))}else Y|=z.COLOR_BUFFER_BIT}U&&(Y|=z.DEPTH_BUFFER_BIT),q&&(Y|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),Le.dispose(),Z.dispose(),Fe.dispose(),S.dispose(),K.dispose(),ne.dispose(),pt.dispose(),I.dispose(),Pe.dispose(),J.dispose(),J.removeEventListener("sessionstart",ti),J.removeEventListener("sessionend",on),ln.stop()};function ie(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const E=vt.autoReset,U=Te.enabled,q=Te.autoUpdate,Y=Te.needsUpdate,B=Te.type;_e(),vt.autoReset=E,Te.enabled=U,Te.autoUpdate=q,Te.needsUpdate=Y,Te.type=B}function ye(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Xe(E){const U=E.target;U.removeEventListener("dispose",Xe),mt(U)}function mt(E){Pt(E),Fe.remove(E)}function Pt(E){const U=Fe.get(E).programs;U!==void 0&&(U.forEach(function(q){Pe.releaseProgram(q)}),E.isShaderMaterial&&Pe.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,q,Y,B,O){U===null&&(U=je);const ee=B.isMesh&&B.matrixWorld.determinant()<0,le=ii(E,U,q,Y,B);Ue.setMaterial(Y,ee);let ge=q.index,we=1;if(Y.wireframe===!0){if(ge=ae.getWireframeAttribute(q),ge===void 0)return;we=2}const He=q.drawRange,De=q.attributes.position;let $e=He.start*we,ct=(He.start+He.count)*we;O!==null&&($e=Math.max($e,O.start*we),ct=Math.min(ct,(O.start+O.count)*we)),ge!==null?($e=Math.max($e,0),ct=Math.min(ct,ge.count)):De!=null&&($e=Math.max($e,0),ct=Math.min(ct,De.count));const at=ct-$e;if(at<0||at===1/0)return;pt.setup(B,Y,le,q,ge);let jt,ft=Se;if(ge!==null&&(jt=te.get(ge),ft=Ye,ft.setIndex(jt)),B.isMesh)Y.wireframe===!0?(Ue.setLineWidth(Y.wireframeLinewidth*nt()),ft.setMode(z.LINES)):ft.setMode(z.TRIANGLES);else if(B.isLine){let ze=Y.linewidth;ze===void 0&&(ze=1),Ue.setLineWidth(ze*nt()),B.isLineSegments?ft.setMode(z.LINES):B.isLineLoop?ft.setMode(z.LINE_LOOP):ft.setMode(z.LINE_STRIP)}else B.isPoints?ft.setMode(z.POINTS):B.isSprite&&ft.setMode(z.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ft.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Je.get("WEBGL_multi_draw"))ft.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const ze=B._multiDrawStarts,xn=B._multiDrawCounts,ut=B._multiDrawCount,un=ge?te.get(ge).bytesPerElement:1,ri=Fe.get(Y).currentProgram.getUniforms();for(let Wt=0;Wt<ut;Wt++)ri.setValue(z,"_gl_DrawID",Wt),ft.render(ze[Wt]/un,xn[Wt])}else if(B.isInstancedMesh)ft.renderInstances($e,at,B.count);else if(q.isInstancedBufferGeometry){const ze=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,xn=Math.min(q.instanceCount,ze);ft.renderInstances($e,at,xn)}else ft.render($e,at)};function st(E,U,q){E.transparent===!0&&E.side===gn&&E.forceSinglePass===!1?(E.side=nn,E.needsUpdate=!0,An(E,U,q),E.side=Fn,E.needsUpdate=!0,An(E,U,q),E.side=gn):An(E,U,q)}this.compile=function(E,U,q=null){q===null&&(q=E),h=Z.get(q),h.init(U),M.push(h),q.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(h.pushLight(B),B.castShadow&&h.pushShadow(B))}),E!==q&&E.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(h.pushLight(B),B.castShadow&&h.pushShadow(B))}),h.setupLights();const Y=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const O=B.material;if(O)if(Array.isArray(O))for(let ee=0;ee<O.length;ee++){const le=O[ee];st(le,q,B),Y.add(le)}else st(O,q,B),Y.add(O)}),M.pop(),h=null,Y},this.compileAsync=function(E,U,q=null){const Y=this.compile(E,U,q);return new Promise(B=>{function O(){if(Y.forEach(function(ee){Fe.get(ee).currentProgram.isReady()&&Y.delete(ee)}),Y.size===0){B(E);return}setTimeout(O,10)}Je.get("KHR_parallel_shader_compile")!==null?O():setTimeout(O,10)})};let Ot=null;function Qt(E){Ot&&Ot(E)}function ti(){ln.stop()}function on(){ln.start()}const ln=new hh;ln.setAnimationLoop(Qt),typeof self<"u"&&ln.setContext(self),this.setAnimationLoop=function(E){Ot=E,J.setAnimationLoop(E),E===null?ln.stop():ln.start()},J.addEventListener("sessionstart",ti),J.addEventListener("sessionend",on),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(U),U=J.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,U,D),h=Z.get(E,M.length),h.init(U),M.push(h),Ne.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Q.setFromProjectionMatrix(Ne),xe=this.localClippingEnabled,he=fe.init(this.clippingPlanes,xe),m=Le.get(E,y.length),m.init(),y.push(m),J.enabled===!0&&J.isPresenting===!0){const O=x.xr.getDepthSensingMesh();O!==null&&xi(O,U,-1/0,x.sortObjects)}xi(E,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(de,se),it=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,it&&Ge.addToRenderList(m,E),this.info.render.frame++,he===!0&&fe.beginShadows();const q=h.state.shadowsArray;Te.render(q,E,U),he===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,B=m.transmissive;if(h.setupLights(),U.isArrayCamera){const O=U.cameras;if(B.length>0)for(let ee=0,le=O.length;ee<le;ee++){const ge=O[ee];ni(Y,B,E,ge)}it&&Ge.render(E);for(let ee=0,le=O.length;ee<le;ee++){const ge=O[ee];Hn(m,E,ge,ge.viewport)}}else B.length>0&&ni(Y,B,E,U),it&&Ge.render(E),Hn(m,E,U);D!==null&&(A.updateMultisampleRenderTarget(D),A.updateRenderTargetMipmap(D)),E.isScene===!0&&E.onAfterRender(x,E,U),pt.resetDefaultState(),T=-1,v=null,M.pop(),M.length>0?(h=M[M.length-1],he===!0&&fe.setGlobalState(x.clippingPlanes,h.state.camera)):h=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function xi(E,U,q,Y){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)h.pushLight(E),E.castShadow&&h.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Q.intersectsSprite(E)){Y&&Ve.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ne);const ee=ne.update(E),le=E.material;le.visible&&m.push(E,ee,le,q,Ve.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Q.intersectsObject(E))){const ee=ne.update(E),le=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ve.copy(E.boundingSphere.center)):(ee.boundingSphere===null&&ee.computeBoundingSphere(),Ve.copy(ee.boundingSphere.center)),Ve.applyMatrix4(E.matrixWorld).applyMatrix4(Ne)),Array.isArray(le)){const ge=ee.groups;for(let we=0,He=ge.length;we<He;we++){const De=ge[we],$e=le[De.materialIndex];$e&&$e.visible&&m.push(E,ee,$e,q,Ve.z,De)}}else le.visible&&m.push(E,ee,le,q,Ve.z,null)}}const O=E.children;for(let ee=0,le=O.length;ee<le;ee++)xi(O[ee],U,q,Y)}function Hn(E,U,q,Y){const B=E.opaque,O=E.transmissive,ee=E.transparent;h.setupLightsView(q),he===!0&&fe.setGlobalState(x.clippingPlanes,q),Y&&Ue.viewport(w.copy(Y)),B.length>0&&Tn(B,U,q),O.length>0&&Tn(O,U,q),ee.length>0&&Tn(ee,U,q),Ue.buffers.depth.setTest(!0),Ue.buffers.depth.setMask(!0),Ue.buffers.color.setMask(!0),Ue.setPolygonOffset(!1)}function ni(E,U,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[Y.id]===void 0&&(h.state.transmissionRenderTarget[Y.id]=new On(1,1,{generateMipmaps:!0,type:Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float")?rs:ei,minFilter:Ni,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const O=h.state.transmissionRenderTarget[Y.id],ee=Y.viewport||w;O.setSize(ee.z,ee.w);const le=x.getRenderTarget();x.setRenderTarget(O),x.getClearColor(W),$=x.getClearAlpha(),$<1&&x.setClearColor(16777215,.5),x.clear(),it&&Ge.render(q);const ge=x.toneMapping;x.toneMapping=gi;const we=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),h.setupLightsView(Y),he===!0&&fe.setGlobalState(x.clippingPlanes,Y),Tn(E,q,Y),A.updateMultisampleRenderTarget(O),A.updateRenderTargetMipmap(O),Je.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let De=0,$e=U.length;De<$e;De++){const ct=U[De],at=ct.object,jt=ct.geometry,ft=ct.material,ze=ct.group;if(ft.side===gn&&at.layers.test(Y.layers)){const xn=ft.side;ft.side=nn,ft.needsUpdate=!0,cn(at,q,Y,jt,ft,ze),ft.side=xn,ft.needsUpdate=!0,He=!0}}He===!0&&(A.updateMultisampleRenderTarget(O),A.updateRenderTargetMipmap(O))}x.setRenderTarget(le),x.setClearColor(W,$),we!==void 0&&(Y.viewport=we),x.toneMapping=ge}function Tn(E,U,q){const Y=U.isScene===!0?U.overrideMaterial:null;for(let B=0,O=E.length;B<O;B++){const ee=E[B],le=ee.object,ge=ee.geometry,we=Y===null?ee.material:Y,He=ee.group;le.layers.test(q.layers)&&cn(le,U,q,ge,we,He)}}function cn(E,U,q,Y,B,O){E.onBeforeRender(x,U,q,Y,B,O),E.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(x,U,q,Y,E,O),B.transparent===!0&&B.side===gn&&B.forceSinglePass===!1?(B.side=nn,B.needsUpdate=!0,x.renderBufferDirect(q,U,Y,B,E,O),B.side=Fn,B.needsUpdate=!0,x.renderBufferDirect(q,U,Y,B,E,O),B.side=gn):x.renderBufferDirect(q,U,Y,B,E,O),E.onAfterRender(x,U,q,Y,B,O)}function An(E,U,q){U.isScene!==!0&&(U=je);const Y=Fe.get(E),B=h.state.lights,O=h.state.shadowsArray,ee=B.state.version,le=Pe.getParameters(E,B.state,O,U,q),ge=Pe.getProgramCacheKey(le);let we=Y.programs;Y.environment=E.isMeshStandardMaterial?U.environment:null,Y.fog=U.fog,Y.envMap=(E.isMeshStandardMaterial?K:S).get(E.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,we===void 0&&(E.addEventListener("dispose",Xe),we=new Map,Y.programs=we);let He=we.get(ge);if(He!==void 0){if(Y.currentProgram===He&&Y.lightsStateVersion===ee)return Gn(E,le),He}else le.uniforms=Pe.getUniforms(E),E.onBeforeCompile(le,x),He=Pe.acquireProgram(le,ge),we.set(ge,He),Y.uniforms=le.uniforms;const De=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(De.clippingPlanes=fe.uniform),Gn(E,le),Y.needsLights=Ar(E),Y.lightsStateVersion=ee,Y.needsLights&&(De.ambientLightColor.value=B.state.ambient,De.lightProbe.value=B.state.probe,De.directionalLights.value=B.state.directional,De.directionalLightShadows.value=B.state.directionalShadow,De.spotLights.value=B.state.spot,De.spotLightShadows.value=B.state.spotShadow,De.rectAreaLights.value=B.state.rectArea,De.ltc_1.value=B.state.rectAreaLTC1,De.ltc_2.value=B.state.rectAreaLTC2,De.pointLights.value=B.state.point,De.pointLightShadows.value=B.state.pointShadow,De.hemisphereLights.value=B.state.hemi,De.directionalShadowMap.value=B.state.directionalShadowMap,De.directionalShadowMatrix.value=B.state.directionalShadowMatrix,De.spotShadowMap.value=B.state.spotShadowMap,De.spotLightMatrix.value=B.state.spotLightMatrix,De.spotLightMap.value=B.state.spotLightMap,De.pointShadowMap.value=B.state.pointShadowMap,De.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=He,Y.uniformsList=null,He}function Mi(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Zs.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function Gn(E,U){const q=Fe.get(E);q.outputColorSpace=U.outputColorSpace,q.batching=U.batching,q.batchingColor=U.batchingColor,q.instancing=U.instancing,q.instancingColor=U.instancingColor,q.instancingMorph=U.instancingMorph,q.skinning=U.skinning,q.morphTargets=U.morphTargets,q.morphNormals=U.morphNormals,q.morphColors=U.morphColors,q.morphTargetsCount=U.morphTargetsCount,q.numClippingPlanes=U.numClippingPlanes,q.numIntersection=U.numClipIntersection,q.vertexAlphas=U.vertexAlphas,q.vertexTangents=U.vertexTangents,q.toneMapping=U.toneMapping}function ii(E,U,q,Y,B){U.isScene!==!0&&(U=je),A.resetTextureUnits();const O=U.fog,ee=Y.isMeshStandardMaterial?U.environment:null,le=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:br,ge=(Y.isMeshStandardMaterial?K:S).get(Y.envMap||ee),we=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,He=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),De=!!q.morphAttributes.position,$e=!!q.morphAttributes.normal,ct=!!q.morphAttributes.color;let at=gi;Y.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(at=x.toneMapping);const jt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ft=jt!==void 0?jt.length:0,ze=Fe.get(Y),xn=h.state.lights;if(he===!0&&(xe===!0||E!==v)){const Yt=E===v&&Y.id===T;fe.setState(Y,E,Yt)}let ut=!1;Y.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==xn.state.version||ze.outputColorSpace!==le||B.isBatchedMesh&&ze.batching===!1||!B.isBatchedMesh&&ze.batching===!0||B.isBatchedMesh&&ze.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&ze.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&ze.instancing===!1||!B.isInstancedMesh&&ze.instancing===!0||B.isSkinnedMesh&&ze.skinning===!1||!B.isSkinnedMesh&&ze.skinning===!0||B.isInstancedMesh&&ze.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ze.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ze.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ze.instancingMorph===!1&&B.morphTexture!==null||ze.envMap!==ge||Y.fog===!0&&ze.fog!==O||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==fe.numPlanes||ze.numIntersection!==fe.numIntersection)||ze.vertexAlphas!==we||ze.vertexTangents!==He||ze.morphTargets!==De||ze.morphNormals!==$e||ze.morphColors!==ct||ze.toneMapping!==at||ze.morphTargetsCount!==ft)&&(ut=!0):(ut=!0,ze.__version=Y.version);let un=ze.currentProgram;ut===!0&&(un=An(Y,U,B));let ri=!1,Wt=!1,Nn=!1;const yt=un.getUniforms(),Xt=ze.uniforms;if(Ue.useProgram(un.program)&&(ri=!0,Wt=!0,Nn=!0),Y.id!==T&&(T=Y.id,Wt=!0),ri||v!==E){Ue.buffers.depth.getReversed()?(ce.copy(E.projectionMatrix),Rf(ce),Cf(ce),yt.setValue(z,"projectionMatrix",ce)):yt.setValue(z,"projectionMatrix",E.projectionMatrix),yt.setValue(z,"viewMatrix",E.matrixWorldInverse);const Mn=yt.map.cameraPosition;Mn!==void 0&&Mn.setValue(z,be.setFromMatrixPosition(E.matrixWorld)),Ze.logarithmicDepthBuffer&&yt.setValue(z,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&yt.setValue(z,"isOrthographic",E.isOrthographicCamera===!0),v!==E&&(v=E,Wt=!0,Nn=!0)}if(B.isSkinnedMesh){yt.setOptional(z,B,"bindMatrix"),yt.setOptional(z,B,"bindMatrixInverse");const Yt=B.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),yt.setValue(z,"boneTexture",Yt.boneTexture,A))}B.isBatchedMesh&&(yt.setOptional(z,B,"batchingTexture"),yt.setValue(z,"batchingTexture",B._matricesTexture,A),yt.setOptional(z,B,"batchingIdTexture"),yt.setValue(z,"batchingIdTexture",B._indirectTexture,A),yt.setOptional(z,B,"batchingColorTexture"),B._colorsTexture!==null&&yt.setValue(z,"batchingColorTexture",B._colorsTexture,A));const Si=q.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&ke.update(B,q,un),(Wt||ze.receiveShadow!==B.receiveShadow)&&(ze.receiveShadow=B.receiveShadow,yt.setValue(z,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Xt.envMap.value=ge,Xt.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&U.environment!==null&&(Xt.envMapIntensity.value=U.environmentIntensity),Wt&&(yt.setValue(z,"toneMappingExposure",x.toneMappingExposure),ze.needsLights&&Tr(Xt,Nn),O&&Y.fog===!0&&Me.refreshFogUniforms(Xt,O),Me.refreshMaterialUniforms(Xt,Y,G,oe,h.state.transmissionRenderTarget[E.id]),Zs.upload(z,Mi(ze),Xt,A)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Zs.upload(z,Mi(ze),Xt,A),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&yt.setValue(z,"center",B.center),yt.setValue(z,"modelViewMatrix",B.modelViewMatrix),yt.setValue(z,"normalMatrix",B.normalMatrix),yt.setValue(z,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Yt=Y.uniformsGroups;for(let Mn=0,qt=Yt.length;Mn<qt;Mn++){const si=Yt[Mn];I.update(si,un),I.bind(si,un)}}return un}function Tr(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Ar(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(E,U,q){Fe.get(E.texture).__webglTexture=U,Fe.get(E.depthTexture).__webglTexture=q;const Y=Fe.get(E);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||Je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){const q=Fe.get(E);q.__webglFramebuffer=U,q.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,q=0){D=E,P=U,L=q;let Y=!0,B=null,O=!1,ee=!1;if(E){const ge=Fe.get(E);if(ge.__useDefaultFramebuffer!==void 0)Ue.bindFramebuffer(z.FRAMEBUFFER,null),Y=!1;else if(ge.__webglFramebuffer===void 0)A.setupRenderTarget(E);else if(ge.__hasExternalTextures)A.rebindTextures(E,Fe.get(E.texture).__webglTexture,Fe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const De=E.depthTexture;if(ge.__boundDepthTexture!==De){if(De!==null&&Fe.has(De)&&(E.width!==De.image.width||E.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(E)}}const we=E.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ee=!0);const He=Fe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(He[U])?B=He[U][q]:B=He[U],O=!0):E.samples>0&&A.useMultisampledRTT(E)===!1?B=Fe.get(E).__webglMultisampledFramebuffer:Array.isArray(He)?B=He[q]:B=He,w.copy(E.viewport),H.copy(E.scissor),V=E.scissorTest}else w.copy(me).multiplyScalar(G).floor(),H.copy(Ae).multiplyScalar(G).floor(),V=Be;if(Ue.bindFramebuffer(z.FRAMEBUFFER,B)&&Y&&Ue.drawBuffers(E,B),Ue.viewport(w),Ue.scissor(H),Ue.setScissorTest(V),O){const ge=Fe.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+U,ge.__webglTexture,q)}else if(ee){const ge=Fe.get(E.texture),we=U||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,ge.__webglTexture,q||0,we)}T=-1},this.readRenderTargetPixels=function(E,U,q,Y,B,O,ee){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let le=Fe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ee!==void 0&&(le=le[ee]),le){Ue.bindFramebuffer(z.FRAMEBUFFER,le);try{const ge=E.texture,we=ge.format,He=ge.type;if(!Ze.textureFormatReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ze.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-Y&&q>=0&&q<=E.height-B&&z.readPixels(U,q,Y,B,qe.convert(we),qe.convert(He),O)}finally{const ge=D!==null?Fe.get(D).__webglFramebuffer:null;Ue.bindFramebuffer(z.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(E,U,q,Y,B,O,ee){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let le=Fe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ee!==void 0&&(le=le[ee]),le){const ge=E.texture,we=ge.format,He=ge.type;if(!Ze.textureFormatReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ze.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-Y&&q>=0&&q<=E.height-B){Ue.bindFramebuffer(z.FRAMEBUFFER,le);const De=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,De),z.bufferData(z.PIXEL_PACK_BUFFER,O.byteLength,z.STREAM_READ),z.readPixels(U,q,Y,B,qe.convert(we),qe.convert(He),0);const $e=D!==null?Fe.get(D).__webglFramebuffer:null;Ue.bindFramebuffer(z.FRAMEBUFFER,$e);const ct=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Af(z,ct,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,De),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,O),z.deleteBuffer(De),z.deleteSync(ct),O}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,U=null,q=0){E.isTexture!==!0&&(zr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);const Y=Math.pow(2,-q),B=Math.floor(E.image.width*Y),O=Math.floor(E.image.height*Y),ee=U!==null?U.x:0,le=U!==null?U.y:0;A.setTexture2D(E,0),z.copyTexSubImage2D(z.TEXTURE_2D,q,0,0,ee,le,B,O),Ue.unbindTexture()},this.copyTextureToTexture=function(E,U,q=null,Y=null,B=0){E.isTexture!==!0&&(zr("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,E=arguments[1],U=arguments[2],B=arguments[3]||0,q=null);let O,ee,le,ge,we,He,De,$e,ct;const at=E.isCompressedTexture?E.mipmaps[B]:E.image;q!==null?(O=q.max.x-q.min.x,ee=q.max.y-q.min.y,le=q.isBox3?q.max.z-q.min.z:1,ge=q.min.x,we=q.min.y,He=q.isBox3?q.min.z:0):(O=at.width,ee=at.height,le=at.depth||1,ge=0,we=0,He=0),Y!==null?(De=Y.x,$e=Y.y,ct=Y.z):(De=0,$e=0,ct=0);const jt=qe.convert(U.format),ft=qe.convert(U.type);let ze;U.isData3DTexture?(A.setTexture3D(U,0),ze=z.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(A.setTexture2DArray(U,0),ze=z.TEXTURE_2D_ARRAY):(A.setTexture2D(U,0),ze=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,U.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,U.unpackAlignment);const xn=z.getParameter(z.UNPACK_ROW_LENGTH),ut=z.getParameter(z.UNPACK_IMAGE_HEIGHT),un=z.getParameter(z.UNPACK_SKIP_PIXELS),ri=z.getParameter(z.UNPACK_SKIP_ROWS),Wt=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,at.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,at.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,ge),z.pixelStorei(z.UNPACK_SKIP_ROWS,we),z.pixelStorei(z.UNPACK_SKIP_IMAGES,He);const Nn=E.isDataArrayTexture||E.isData3DTexture,yt=U.isDataArrayTexture||U.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const Xt=Fe.get(E),Si=Fe.get(U),Yt=Fe.get(Xt.__renderTarget),Mn=Fe.get(Si.__renderTarget);Ue.bindFramebuffer(z.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Ue.bindFramebuffer(z.DRAW_FRAMEBUFFER,Mn.__webglFramebuffer);for(let qt=0;qt<le;qt++)Nn&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Fe.get(E).__webglTexture,B,He+qt),E.isDepthTexture?(yt&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Fe.get(U).__webglTexture,B,ct+qt),z.blitFramebuffer(ge,we,O,ee,De,$e,O,ee,z.DEPTH_BUFFER_BIT,z.NEAREST)):yt?z.copyTexSubImage3D(ze,B,De,$e,ct+qt,ge,we,O,ee):z.copyTexSubImage2D(ze,B,De,$e,ct+qt,ge,we,O,ee);Ue.bindFramebuffer(z.READ_FRAMEBUFFER,null),Ue.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else yt?E.isDataTexture||E.isData3DTexture?z.texSubImage3D(ze,B,De,$e,ct,O,ee,le,jt,ft,at.data):U.isCompressedArrayTexture?z.compressedTexSubImage3D(ze,B,De,$e,ct,O,ee,le,jt,at.data):z.texSubImage3D(ze,B,De,$e,ct,O,ee,le,jt,ft,at):E.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,B,De,$e,O,ee,jt,ft,at.data):E.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,B,De,$e,at.width,at.height,jt,at.data):z.texSubImage2D(z.TEXTURE_2D,B,De,$e,O,ee,jt,ft,at);z.pixelStorei(z.UNPACK_ROW_LENGTH,xn),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ut),z.pixelStorei(z.UNPACK_SKIP_PIXELS,un),z.pixelStorei(z.UNPACK_SKIP_ROWS,ri),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Wt),B===0&&U.generateMipmaps&&z.generateMipmap(ze),Ue.unbindTexture()},this.copyTextureToTexture3D=function(E,U,q=null,Y=null,B=0){return E.isTexture!==!0&&(zr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,Y=arguments[1]||null,E=arguments[2],U=arguments[3],B=arguments[4]||0),zr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,U,q,Y,B)},this.initRenderTarget=function(E){Fe.get(E).__webglFramebuffer===void 0&&A.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),Ue.unbindTexture()},this.resetState=function(){P=0,L=0,D=null,Ue.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}}class Tl extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class zv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=el,this.updateRanges=[],this.version=0,this.uuid=Un()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const en=new R;class ra{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=xt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ln(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ln(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ln(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ln(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new an(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ra(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class gh extends Bn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let er;const Dr=new R,tr=new R,nr=new R,ir=new pe,Nr=new pe,_h=new _t,Ds=new R,kr=new R,Ns=new R,Oc=new pe,Ga=new pe,Fc=new pe;class Bv extends kt{constructor(e=new gh){if(super(),this.isSprite=!0,this.type="Sprite",er===void 0){er=new Lt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new zv(t,5);er.setIndex([0,1,2,0,2,3]),er.setAttribute("position",new ra(i,3,0,!1)),er.setAttribute("uv",new ra(i,2,3,!1))}this.geometry=er,this.material=e,this.center=new pe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),tr.setFromMatrixScale(this.matrixWorld),_h.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),nr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&tr.multiplyScalar(-nr.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;ks(Ds.set(-.5,-.5,0),nr,a,tr,r,s),ks(kr.set(.5,-.5,0),nr,a,tr,r,s),ks(Ns.set(.5,.5,0),nr,a,tr,r,s),Oc.set(0,0),Ga.set(1,0),Fc.set(1,1);let o=e.ray.intersectTriangle(Ds,kr,Ns,!1,Dr);if(o===null&&(ks(kr.set(-.5,.5,0),nr,a,tr,r,s),Ga.set(0,1),o=e.ray.intersectTriangle(Ds,Ns,kr,!1,Dr),o===null))return;const l=e.ray.origin.distanceTo(Dr);l<e.near||l>e.far||t.push({distance:l,point:Dr.clone(),uv:En.getInterpolation(Dr,Ds,kr,Ns,Oc,Ga,Fc,new pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ks(n,e,t,i,r,s){ir.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Nr.x=s*ir.x-r*ir.y,Nr.y=r*ir.x+s*ir.y):Nr.copy(ir),n.copy(e),n.x+=Nr.x,n.y+=Nr.y,n.applyMatrix4(_h)}class Xr extends Bn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const sa=new R,aa=new R,zc=new _t,Ir=new ss,Is=new Ui,ja=new R,Bc=new R;class Al extends kt{constructor(e=new Lt,t=new Xr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)sa.fromBufferAttribute(t,r-1),aa.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=sa.distanceTo(aa);e.setAttribute("lineDistance",new It(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(r),Is.radius+=s,e.ray.intersectsSphere(Is)===!1)return;zc.copy(r).invert(),Ir.copy(e.ray).applyMatrix4(zc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,p=i.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){const h=u.getX(_),y=u.getX(_+1),M=Us(this,e,Ir,l,h,y);M&&t.push(M)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(f),h=Us(this,e,Ir,l,_,m);h&&t.push(h)}}else{const f=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){const h=Us(this,e,Ir,l,_,_+1);h&&t.push(h)}if(this.isLineLoop){const _=Us(this,e,Ir,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Us(n,e,t,i,r,s){const a=n.geometry.attributes.position;if(sa.fromBufferAttribute(a,r),aa.fromBufferAttribute(a,s),t.distanceSqToSegment(sa,aa,ja,Bc)>i)return;ja.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(ja);if(!(l<e.near||l>e.far))return{distance:l,point:Bc.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const Vc=new R,Hc=new R;class Wa extends Al{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Vc.fromBufferAttribute(t,r),Hc.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Vc.distanceTo(Hc);e.setAttribute("lineDistance",new It(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class vh extends Al{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class xh extends Bn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Gc=new _t,nl=new ss,Os=new Ui,Fs=new R;class Vv extends kt{constructor(e=new Lt,t=new xh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Os.copy(i.boundingSphere),Os.applyMatrix4(r),Os.radius+=s,e.ray.intersectsSphere(Os)===!1)return;Gc.copy(r).invert(),nl.copy(e.ray).applyMatrix4(Gc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const p=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=p,_=f;g<_;g++){const m=c.getX(g);Fs.fromBufferAttribute(d,m),jc(Fs,m,l,r,e,t,this)}}else{const p=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=p,_=f;g<_;g++)Fs.fromBufferAttribute(d,g),jc(Fs,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function jc(n,e,t,i,r,s,a){const o=nl.distanceSqToPoint(n);if(o<t){const l=new R;nl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Hv extends rn{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],p=i[r+1]-u,f=(a-u)/p;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new pe:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new R,r=[],s=[],a=[],o=new R,l=new _t;for(let f=0;f<=e;f++){const g=f/e;r[f]=this.getTangentAt(g,new R)}s[0]=new R,a[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),p=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),p<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Gt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Gt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Rl extends Vn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new pe){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*u-f*d+this.aX,c=p*d+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Gv extends Rl{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Cl(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let p=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;p*=u,f*=u,r(a,o,p,f)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const zs=new R,Xa=new Cl,$a=new Cl,Ka=new Cl;class jv extends Vn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new R){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(zs.subVectors(r[0],r[1]).add(r[0]),c=zs);const d=r[o%s],p=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(zs.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=zs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Xa.initNonuniformCatmullRom(c.x,d.x,p.x,u.x,g,_,m),$a.initNonuniformCatmullRom(c.y,d.y,p.y,u.y,g,_,m),Ka.initNonuniformCatmullRom(c.z,d.z,p.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Xa.initCatmullRom(c.x,d.x,p.x,u.x,this.tension),$a.initCatmullRom(c.y,d.y,p.y,u.y,this.tension),Ka.initCatmullRom(c.z,d.z,p.z,u.z,this.tension));return i.set(Xa.calc(l),$a.calc(l),Ka.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Wc(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function Wv(n,e){const t=1-n;return t*t*e}function Xv(n,e){return 2*(1-n)*n*e}function $v(n,e){return n*n*e}function $r(n,e,t,i){return Wv(n,e)+Xv(n,t)+$v(n,i)}function Kv(n,e){const t=1-n;return t*t*t*e}function Yv(n,e){const t=1-n;return 3*t*t*n*e}function qv(n,e){return 3*(1-n)*n*n*e}function Zv(n,e){return n*n*n*e}function Kr(n,e,t,i,r){return Kv(n,e)+Yv(n,t)+qv(n,i)+Zv(n,r)}class Mh extends Vn{constructor(e=new pe,t=new pe,i=new pe,r=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new pe){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Kr(e,r.x,s.x,a.x,o.x),Kr(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Jv extends Vn{constructor(e=new R,t=new R,i=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new R){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Kr(e,r.x,s.x,a.x,o.x),Kr(e,r.y,s.y,a.y,o.y),Kr(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Sh extends Vn{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qv extends Vn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class yh extends Vn{constructor(e=new pe,t=new pe,i=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new pe){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set($r(e,r.x,s.x,a.x),$r(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class e0 extends Vn{constructor(e=new R,t=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new R){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set($r(e,r.x,s.x,a.x),$r(e,r.y,s.y,a.y),$r(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Eh extends Vn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return i.set(Wc(o,l.x,c.x,u.x,d.x),Wc(o,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new pe().fromArray(r))}return this}}var Xc=Object.freeze({__proto__:null,ArcCurve:Gv,CatmullRomCurve3:jv,CubicBezierCurve:Mh,CubicBezierCurve3:Jv,EllipseCurve:Rl,LineCurve:Sh,LineCurve3:Qv,QuadraticBezierCurve:yh,QuadraticBezierCurve3:e0,SplineCurve:Eh});class t0 extends Vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xc[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Xc[r.type]().fromJSON(r))}return this}}class $c extends t0{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Sh(this.currentPoint.clone(),new pe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new yh(this.currentPoint.clone(),new pe(e,t),new pe(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Mh(this.currentPoint.clone(),new pe(e,t),new pe(i,r),new pe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Eh(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new Rl(e,t,i,r,s,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class da extends Lt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new R,u=new pe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,p=3;d<=t;d++,p+=3){const f=i+d/t*r;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[p]/e+1)/2,u.y=(a[p+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new It(a,3)),this.setAttribute("normal",new It(o,3)),this.setAttribute("uv",new It(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new da(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class bh extends $c{constructor(e){super(e),this.uuid=Un(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new $c().fromJSON(r))}return this}}const n0={triangulate:function(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=wh(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,u,d,p,f;if(i&&(s=o0(n,e,s,t)),n.length>80*t){o=c=n[0],l=u=n[1];for(let g=t;g<r;g+=t)d=n[g],p=n[g+1],d<o&&(o=d),p<l&&(l=p),d>c&&(c=d),p>u&&(u=p);f=Math.max(c-o,u-l),f=f!==0?32767/f:0}return es(s,a,t,o,l,f,0),a}};function wh(n,e,t,i,r){let s,a;if(r===v0(n,e,t,i)>0)for(s=e;s<t;s+=i)a=Kc(s,n[s],n[s+1],a);else for(s=t-i;s>=e;s-=i)a=Kc(s,n[s],n[s+1],a);return a&&fa(a,a.next)&&(ns(a),a=a.next),a}function Oi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(fa(t,t.next)||Tt(t.prev,t,t.next)===0)){if(ns(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function es(n,e,t,i,r,s,a){if(!n)return;!a&&s&&d0(n,i,r,s);let o=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,s?r0(n,i,r,s):i0(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(c.i/t|0),ns(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=s0(Oi(n),e,t),es(n,e,t,i,r,s,2)):a===2&&a0(n,e,t,i,r,s):es(Oi(n),e,t,i,r,s,1);break}}}function i0(n){const e=n.prev,t=n,i=n.next;if(Tt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=r<s?r<a?r:a:s<a?s:a,d=o<l?o<c?o:c:l<c?l:c,p=r>s?r>a?r:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c;let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=p&&g.y>=d&&g.y<=f&&cr(r,o,s,l,a,c,g.x,g.y)&&Tt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function r0(n,e,t,i){const r=n.prev,s=n,a=n.next;if(Tt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,d=s.y,p=a.y,f=o<l?o<c?o:c:l<c?l:c,g=u<d?u<p?u:p:d<p?d:p,_=o>l?o>c?o:c:l>c?l:c,m=u>d?u>p?u:p:d>p?d:p,h=il(f,g,e,t,i),y=il(_,m,e,t,i);let M=n.prevZ,x=n.nextZ;for(;M&&M.z>=h&&x&&x.z<=y;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==a&&cr(o,u,l,d,c,p,M.x,M.y)&&Tt(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==a&&cr(o,u,l,d,c,p,x.x,x.y)&&Tt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=h;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==a&&cr(o,u,l,d,c,p,M.x,M.y)&&Tt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==a&&cr(o,u,l,d,c,p,x.x,x.y)&&Tt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function s0(n,e,t){let i=n;do{const r=i.prev,s=i.next.next;!fa(r,s)&&Th(r,i,i.next,s)&&ts(r,s)&&ts(s,r)&&(e.push(r.i/t|0),e.push(i.i/t|0),e.push(s.i/t|0),ns(i),ns(i.next),i=n=s),i=i.next}while(i!==n);return Oi(i)}function a0(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&m0(a,o)){let l=Ah(a,o);a=Oi(a,a.next),l=Oi(l,l.next),es(a,e,t,i,r,s,0),es(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function o0(n,e,t,i){const r=[];let s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=wh(n,o,l,i,!1),c===c.next&&(c.steiner=!0),r.push(p0(c));for(r.sort(l0),s=0;s<r.length;s++)t=c0(r[s],t);return t}function l0(n,e){return n.x-e.x}function c0(n,e){const t=u0(n,e);if(!t)return e;const i=Ah(t,n);return Oi(i,i.next),Oi(t,t.next)}function u0(n,e){let t=e,i=-1/0,r;const s=n.x,a=n.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const p=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=s&&p>i&&(i=p,r=t.x<t.next.x?t:t.next,p===s))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0,d;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&cr(a<c?s:i,a,l,c,a<c?i:s,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(s-t.x),ts(t,n)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&h0(r,t)))&&(r=t,u=d)),t=t.next;while(t!==o);return r}function h0(n,e){return Tt(n.prev,n,e.prev)<0&&Tt(e.next,n,n.next)<0}function d0(n,e,t,i){let r=n;do r.z===0&&(r.z=il(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,f0(r)}function f0(n){let e,t,i,r,s,a,o,l,c=1;do{for(t=n,n=null,s=null,a=0;t;){for(a++,i=t,o=0,e=0;e<c&&(o++,i=i.nextZ,!!i);e++);for(l=c;o>0||l>0&&i;)o!==0&&(l===0||!i||t.z<=i.z)?(r=t,t=t.nextZ,o--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;t=i}s.nextZ=null,c*=2}while(a>1);return n}function il(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function p0(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function cr(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function m0(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!g0(n,e)&&(ts(n,e)&&ts(e,n)&&_0(n,e)&&(Tt(n.prev,n,e.prev)||Tt(n,e.prev,e))||fa(n,e)&&Tt(n.prev,n,n.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function fa(n,e){return n.x===e.x&&n.y===e.y}function Th(n,e,t,i){const r=Vs(Tt(n,e,t)),s=Vs(Tt(n,e,i)),a=Vs(Tt(t,i,n)),o=Vs(Tt(t,i,e));return!!(r!==s&&a!==o||r===0&&Bs(n,t,e)||s===0&&Bs(n,i,e)||a===0&&Bs(t,n,i)||o===0&&Bs(t,e,i))}function Bs(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Vs(n){return n>0?1:n<0?-1:0}function g0(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Th(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function ts(n,e){return Tt(n.prev,n,n.next)<0?Tt(n,e,n.next)>=0&&Tt(n,n.prev,e)>=0:Tt(n,e,n.prev)<0||Tt(n,n.next,e)<0}function _0(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Ah(n,e){const t=new rl(n.i,n.x,n.y),i=new rl(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Kc(n,e,t,i){const r=new rl(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ns(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function rl(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function v0(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class mr{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return mr.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Yc(e),qc(i,e);let a=e.length;t.forEach(Yc);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,qc(i,t[l]);const o=n0.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Yc(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function qc(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Pl extends Lt{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],u=[];let d=e;const p=(t-e)/r,f=new R,g=new pe;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const h=s+m/i*a;f.x=d*Math.cos(h),f.y=d*Math.sin(h),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=p}for(let _=0;_<r;_++){const m=_*(i+1);for(let h=0;h<i;h++){const y=h+m,M=y,x=y+i+1,F=y+i+2,P=y+1;o.push(M,x,P),o.push(x,F,P)}}this.setIndex(o),this.setAttribute("position",new It(l,3)),this.setAttribute("normal",new It(c,3)),this.setAttribute("uv",new It(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ll extends Lt{constructor(e=new bh([new pe(0,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new It(r,3)),this.setAttribute("normal",new It(s,3)),this.setAttribute("uv",new It(a,2));function c(u){const d=r.length/3,p=u.extractPoints(t);let f=p.shape;const g=p.holes;mr.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,h=g.length;m<h;m++){const y=g[m];mr.isClockWise(y)===!0&&(g[m]=y.reverse())}const _=mr.triangulateShape(f,g);for(let m=0,h=g.length;m<h;m++){const y=g[m];f=f.concat(y)}for(let m=0,h=f.length;m<h;m++){const y=f[m];r.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let m=0,h=_.length;m<h;m++){const y=_[m],M=y[0]+d,x=y[1]+d,F=y[2]+d;i.push(M,x,F),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return x0(t,e)}static fromJSON(e,t){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const a=t[e.shapes[r]];i.push(a)}return new Ll(i,e.curveSegments)}}function x0(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}class M0 extends Bn{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new tt(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class S0 extends Bn{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ml,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class y0 extends Bn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ml,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class E0 extends Xr{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Rh extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class b0 extends Rh{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new tt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ya=new _t,Zc=new R,Jc=new R;class w0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new El,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Zc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zc),Jc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jc),t.updateMatrixWorld(),Ya.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ya),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ya)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class T0 extends w0{constructor(){super(new ls(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qc extends Rh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new T0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const eu=new _t;class sl{constructor(e,t,i=0,r=1/0){this.ray=new ss(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new yl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return eu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(eu),this}intersectObject(e,t=!0,i=[]){return al(e,this,i,t),i.sort(tu),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)al(e[r],this,i,t);return i.sort(tu),i}}function tu(n,e){return n.distance-e.distance}function al(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)al(s[a],e,t,!0)}}class nu{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Gt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class A0 extends Fi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hl);const iu={type:"change"},Dl={type:"start"},Ch={type:"end"},Hs=new ss,ru=new di,R0=Math.cos(70*Rt.DEG2RAD),zt=new R,sn=2*Math.PI,St={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qa=1e-6;class C0 extends A0{constructor(e,t=null){super(e,t),this.state=St.NONE,this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hr.ROTATE,MIDDLE:hr.DOLLY,RIGHT:hr.PAN},this.touches={ONE:or.ROTATE,TWO:or.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new vi,this._lastTargetPosition=new R,this._quat=new vi().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new nu,this._sphericalDelta=new nu,this._scale=1,this._panOffset=new R,this._rotateStart=new pe,this._rotateEnd=new pe,this._rotateDelta=new pe,this._panStart=new pe,this._panEnd=new pe,this._panDelta=new pe,this._dollyStart=new pe,this._dollyEnd=new pe,this._dollyDelta=new pe,this._dollyDirection=new R,this._mouse=new pe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=L0.bind(this),this._onPointerDown=P0.bind(this),this._onPointerUp=D0.bind(this),this._onContextMenu=z0.bind(this),this._onMouseWheel=I0.bind(this),this._onKeyDown=U0.bind(this),this._onTouchStart=O0.bind(this),this._onTouchMove=F0.bind(this),this._onMouseDown=N0.bind(this),this._onMouseMove=k0.bind(this),this._interceptControlDown=B0.bind(this),this._interceptControlUp=V0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(iu),this.update(),this.state=St.NONE}update(e=null){const t=this.object.position;zt.copy(t).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===St.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),r<-Math.PI?r+=sn:r>Math.PI&&(r-=sn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=zt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Hs.origin.copy(this.object.position),Hs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hs.direction))<R0?this.object.lookAt(this.target):(ru.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hs.intersectPlane(ru,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>qa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qa||this._lastTargetPosition.distanceToSquared(this.target)>qa?(this.dispatchEvent(iu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?sn/60*this.autoRotateSpeed*e:sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){zt.setFromMatrixColumn(t,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,t){this.screenSpacePanning===!0?zt.setFromMatrixColumn(t,1):(zt.setFromMatrixColumn(t,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;zt.copy(r).sub(this.target);let s=zt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new pe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function P0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function L0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function D0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ch),this.state=St.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function N0(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case hr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=St.DOLLY;break;case hr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=St.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=St.ROTATE}break;case hr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=St.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=St.PAN}break;default:this.state=St.NONE}this.state!==St.NONE&&this.dispatchEvent(Dl)}function k0(n){switch(this.state){case St.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case St.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case St.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function I0(n){this.enabled===!1||this.enableZoom===!1||this.state!==St.NONE||(n.preventDefault(),this.dispatchEvent(Dl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Ch))}function U0(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function O0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case or.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=St.TOUCH_ROTATE;break;case or.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=St.TOUCH_PAN;break;default:this.state=St.NONE}break;case 2:switch(this.touches.TWO){case or.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=St.TOUCH_DOLLY_PAN;break;case or.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=St.TOUCH_DOLLY_ROTATE;break;default:this.state=St.NONE}break;default:this.state=St.NONE}this.state!==St.NONE&&this.dispatchEvent(Dl)}function F0(n){switch(this._trackPointer(n),this.state){case St.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case St.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case St.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case St.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=St.NONE}}function z0(n){this.enabled!==!1&&n.preventDefault()}function B0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function V0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const H0="2.2.0",Ph="#9aa0a6",Za="#2b2f33",G0="#ffc21a",j0="#ff6a00",ol=.3,su=!0,au=.25,W0=.22,Vr=35,X0=1.08,$0=25,Jn=30,ou=4,K0=.8,Y0=3,q0=7,lu=.08,Z0=.6,J0=.35,Q0=.5,Ja=.1,ex=1.2,tx=.6,nx=1.3,ix=1,rx=.12,sx=.05,Gs=14,ax="#1a1a1a",Qa="#0047b3",eo="#1e6fd9",js="#d93025",ox=.35,lx=.2,cx=7,ux=5,hx=.9,dx=!1,fx=.25,rr={omtrek:17,maat:20,maatVoorgrond:22,aftrek:24,aftrekVoorgrond:26},px=5,mx=[.5,.35,.65,.22,.78],cu=2,gx=.2,_x=.6,to=.9,uu=["#f3f5f7","#dde3e8"],vx=11.2,xx=100,Mx=10,hu="#c0392b",Sx="#8a9399",yx=.66*Math.PI,Ex="#f4f7ff",bx="#d6ccc2",wx=.14*Math.PI,Tx=.34*Math.PI,Lh=.6,Ax=.6,du=12,Rx=1,Cx=0,Px=.15,fu=1.5,pu=.035,Lx=1.5,Dx=.12,Nx=Lh>0,Js=1,kx=210,Ix=45,mu=.18,gu=2048;function Ux(n){const e=new Fv({antialias:!0,alpha:!0});e.setPixelRatio(window.devicePixelRatio),e.autoClear=!1,e.shadowMap.enabled=!0,e.shadowMap.type=dl,e.shadowMap.autoUpdate=!1,e.domElement.classList.add("viewer-canvas"),n.appendChild(e.domElement);const t=new Tl,i=new mn(Vr,1,.1,2e3);i.up.set(0,0,1),t.add(i);const r=new mn(Vr,1,.1,2e3),s=new ls(-1,1,1,-1,.01,2e3);t.add(r,s);let a=i,o=null;const l=new b0(Ex,bx,yx);l.position.set(0,0,1),t.add(l);const c=new Qc(16777215,wx);c.position.set(-.5,1,1),c.target.position.set(0,0,-1),i.add(c,c.target);const u=new Qc(16777215,Tx);u.castShadow=!0,u.shadow.mapSize.set(gu,gu),u.shadow.normalBias=.02,u.shadow.bias=-2e-4,u.shadow.radius=3,t.add(u,u.target);const d=new Kt(new da(1,64),new M0({opacity:mu,depthWrite:!1}));d.receiveShadow=!0,d.visible=!1,d.layers.enable(Js),t.add(d);const p=Ox(e);function f(){e.shadowMap.needsUpdate=!0}const g=new C0(i,e.domElement);g.enableZoom=!1,g.enablePan=!1,g.rotateSpeed=.8;let _=null,m=new R,h=1,y=[],M=[],x=null;const F=[];let P=null,L=null,D=null,T=null,v=[],w=null,H=null,V=null,W=!1,$=null,X=[],oe=null,G=[],de=null,se=new R(0,-1,0),me=Jn;const Ae=zx(),Be=document.createElement("div");Be.className="viewer-labels hidden";const Q=document.createElement("div");Q.className="viewer-labels";const he=document.createElement("div");he.className="viewer-tooltip hidden";const xe=document.createElement("div");xe.className="viewer-legenda hidden",n.append(Be,Q,he,xe);let ce=null;const Ne=new pe,be={resolutie:{value:new pe(1,1)},schaal:{value:1}};function Ve(b){e.getDrawingBufferSize(be.resolutie.value),be.schaal.value=b}function je(){o&&ti();const b=nt?Ue():0;e.getSize(Ne),Ve(e.getPixelRatio()),e.setScissorTest(!1),e.setViewport(0,0,Ne.x,Ne.y),it(e.getPixelRatio()),_&&Ze("kompas",()=>Fe()),Ze("overlay",Ul),nt&&vt(b)}g.addEventListener("change",je);function it(b){if(z&&_){const N=new Set(Yt());for(const k of y)N.has(k)?k.layers.enable(Js):k.layers.disable(Js);p.bereken(t,a,b,Ze)}Ze("model",()=>{e.clear(),e.render(t,a)})}let nt=null,z=!0;const Ut=new Uint8Array(4);function Je(){const b=e.getContext();b.readPixels(0,0,1,1,b.RGBA,b.UNSIGNED_BYTE,Ut)}function Ze(b,N){if(!nt)return N();Je();const k=performance.now(),j=N();return Je(),nt.stappen[b]=(nt.stappen[b]||0)+performance.now()-k,j}function Ue(){return nt.stappen={},e.info.reset(),Je(),performance.now()}function vt(b){nt.fn({totaal:performance.now()-b,stappen:nt.stappen,tekenopdr:e.info.render.calls,driehoeken:e.info.render.triangles})}function Fe(b=1){const{x:N,y:k,grootte:j}=A(b);Ae.camera.quaternion.copy(a.quaternion),Ae.camera.position.set(0,0,5).applyQuaternion(a.quaternion),e.setViewport(N,k,j,j),e.setScissor(N,k,j,j),e.setScissorTest(!0),e.clearDepth(),e.render(Ae.scene,Ae.camera),e.setScissorTest(!1),e.setViewport(0,0,Ne.x,Ne.y)}function A(b=1){e.getSize(Ne);const N=xx*b,k=Mx*b;return{x:Ne.x-N-k,y:k,grootte:N}}let S=null;e.domElement.addEventListener("pointerdown",b=>{S=b.button===0?{x:b.clientX,y:b.clientY}:null}),e.domElement.addEventListener("pointerup",b=>{if(b.button!==0||!S)return;const N=Math.hypot(b.clientX-S.x,b.clientY-S.y)>ou;if(S=null,N||!oe||!_||K(b))return;const k=Kh(b.clientX,b.clientY);oe(k?.index??null,k?.punt??null)}),e.domElement.addEventListener("pointermove",b=>{o&&S&&Math.hypot(b.clientX-S.x,b.clientY-S.y)>ou&&Qt()});function K(b){const N=e.domElement.getBoundingClientRect(),{x:k,y:j,grootte:re}=A(),ue=b.clientX-N.left,Ce=N.height-(b.clientY-N.top);return ue>=k&&ue<=k+re&&Ce>=j&&Ce<=j+re}function te(){const b=n.clientWidth,N=n.clientHeight;b===0||N===0||(e.setSize(b,N,!1),i.aspect=b/N,Pe(),je())}const ae=new ResizeObserver(te);ae.observe(n);function ne(b){const N=Rt.degToRad(i.fov),k=2*Math.atan(Math.tan(N/2)*i.aspect);return b*X0/Math.sin(Math.min(N,k)/2)}function Pe(){const b=ne(h);let N=m,k=b;if(Z.vrij)N=Z.vrij.doel,k=Z.vrij.afstand;else if(Z.focus&&Z.z>0){const re=Me(Z.focus,b);k=b*Math.pow(re/b,Z.z);const ue=b-re>1e-6?(b-k)/(b-re):Z.z;N=m.clone().lerp(Z.focus.midden,ue)}if(Z.glij?.vanStand){const re=Z.glij.vanStand;N=re.doel.clone().lerp(N,Z.glij.t),k=Math.exp(Rt.lerp(Math.log(re.afstand),Math.log(k),Z.glij.t))}const j=i.position.clone().sub(g.target);j.lengthSq()===0&&j.set(0,-1,0),g.target.copy(N),i.position.copy(N).add(j.setLength(k)),i.near=k/100,i.far=b*4,i.updateProjectionMatrix(),g.update()}function Me(b,N){return Math.min(N,ne(Math.max(b.straal,Ja))/ex)}function Le(b,N){const k=ne(h),j=Me(b,k);return N<=j||k-j<1e-6?1:Rt.clamp(Math.log(N/k)/Math.log(j/k),0,1)}const Z={z:0,doel:0,overgang:null,focus:null,glij:null,focusDoel:null,vrij:null},fe=()=>!Z.focusDoel&&!Z.focus;function Te(b,N){const k=ne(h);if(!Z.vrij){const ue=g.target.clone(),Ce=Math.min(k,i.position.distanceTo(ue));Z.vrij={doel:ue,afstand:Ce,wens:Ce,punt:ue.clone()},Z.glij=null}const j=Z.vrij,re=Math.pow(K0,Rt.clamp(-b/100,-1,1));if(re<1){j.punt=Yh(N.clientX,N.clientY)||j.doel.clone();const ue=Math.max(i.position.distanceTo(j.punt),1e-6),Ce=j.afstand*Y0/ue;j.wens=Math.max(j.wens*re,Math.min(Ce,j.wens))}else j.wens=Math.min(k,j.wens*re);on()}function Ge(b){const N=Z.vrij,k=ne(h);let j=!1;if(N.afstand!==N.wens){let re=N.afstand+(N.wens-N.afstand)*(1-Math.exp(-b/lu));if(Math.abs(N.wens-re)<1e-4*k?re=N.wens:j=!0,re<N.afstand)N.doel.sub(N.punt).multiplyScalar(re/N.afstand).add(N.punt);else{const ue=k-N.afstand;N.doel.sub(m).multiplyScalar(ue>1e-9?Math.max(k-re,0)/ue:0).add(m)}N.afstand=re}return!j&&N.wens>=k&&(Z.vrij=null),j}let ke=null,Se=0,Ye=null;function qe(b){const N=b?.length?[...b].sort((j,re)=>j-re).join(","):"";if(N===(Z.focusDoel?.sleutel??""))return;const k=N?_e(b):null;if(k&&o&&!o.terug){Z.focusDoel={...k,sleutel:N,indices:[...b]},Z.focus={midden:k.midden.clone(),straal:k.straal},st();return}if(o&&Qt(),!k)Z.focusDoel=null,Z.doel=0,Z.z>0?I(0,J0,xi):J();else if(Z.focusDoel={...k,sleutel:N,indices:[...b]},Z.vrij||Z.glij?.vanStand){const j={doel:g.target.clone(),afstand:i.position.distanceTo(g.target)};Z.vrij=null,Z.overgang=null,Z.focus={midden:k.midden.clone(),straal:k.straal},Z.z=Z.doel=Le(Z.focus,j.afstand),Z.glij={vanStand:j,start:performance.now(),t:0}}else!Z.focus||Z.z===0&&Z.doel===0?(Z.focus={midden:k.midden.clone(),straal:k.straal},Z.glij=null):Z.glij={van:{midden:Z.focus.midden.clone(),straal:Z.focus.straal},naar:k,start:performance.now()};on()}function pt(){return _?Z.focusDoel?(o&&!o.terug?Ot():st(),!0):Z.vrij?(Z.glij={vanStand:{doel:g.target.clone(),afstand:i.position.distanceTo(g.target)},start:performance.now(),t:0,duur:Q0,verloop:ln},Z.vrij=null,on(),!0):!1:!1}function I(b,N,k){Z.doel=b,Z.overgang={van:Z.z,naar:b,start:performance.now(),duur:N,verloop:k}}function _e(b){const N=b.flatMap(j=>M[j]?ar(M[j]):[]);if(N.length===0)return null;const k=new Ii().setFromPoints(N).getBoundingSphere(new Ui);return{midden:k.center,straal:k.radius}}function J(){ke!=null&&cancelAnimationFrame(ke),ke=null,Object.assign(Z,{z:0,doel:0,overgang:null,focus:null,glij:null,focusDoel:null,vrij:null}),o=null,ve(i)}const ie=new R(0,0,1);function ve(b){a!==b&&(a=b,b.add(c,c.target))}function ye(){const b=i.position.distanceTo(g.target);return{doel:g.target.clone(),q:i.quaternion.clone(),h:b*Math.tan(Rt.degToRad(Vr)/2),fov:Vr}}function Xe(b){return b.maat?Math.max(b.maat.h,b.maat.b/i.aspect)*nx:b.h}function mt(){const{van:b,naar:N,t:k}=o;return{doel:b.doel.clone().lerp(N.doel,k),q:b.q.clone().slerp(N.q,k),h:Math.exp(Rt.lerp(Math.log(Xe(b)),Math.log(Xe(N)),k)),fov:Rt.lerp(b.fov,N.fov,k)}}function Pt(b){const N=new R;let k=0,j=null,re=-1;const ue=[];let Ce=0,Ie=0;for(const bt of b){if(!M[bt]||!y[bt])continue;const gt=y[bt].userData.vorm.normaal,At=Hx(M[bt]);N.addScaledVector(gt,At),k+=At,At>re&&(re=At,j=gt);const wt=ar(M[bt]);wt.forEach((hn,Sn)=>{const Ft=wt[(Sn+1)%wt.length],yi=Math.atan2(Ft.y-hn.y,Ft.x-hn.x),zi=Math.hypot(Ft.x-hn.x,Ft.y-hn.y);Ce+=zi*Math.cos(4*yi),Ie+=zi*Math.sin(4*yi)}),ue.push(...wt)}if(!j)return null;const Oe=N.length()>=k/3&&N.lengthSq()>0?N.normalize():j.clone();Oe.z<-.7&&Oe.negate();let We=ie.clone();if(Math.hypot(Oe.x,Oe.y)<.001){const bt=o?mt().q:i.quaternion;let gt=new R(0,0,-1).applyQuaternion(bt).setZ(0);gt.lengthSq()<1e-6&&(gt=new R(0,1,0).applyQuaternion(bt).setZ(0)),gt.lengthSq()<1e-6&&gt.set(0,1,0);const At=Math.atan2(Ie,Ce)/4,wt=new R(Math.cos(At),Math.sin(At),0),hn=new R(-wt.y,wt.x,0),Sn=Ft=>{const yi=ue.map(zi=>zi.dot(Ft));return Math.max(...yi)-Math.min(...yi)};We=Sn(wt)>=Sn(hn)?hn:wt,We.dot(gt)<0&&We.negate()}We.addScaledVector(Oe,-We.dot(Oe)).normalize();const ht=new R().crossVectors(We,Oe),lt=new vi().setFromRotationMatrix(new _t().makeBasis(ht,We,Oe)),Ke=new R(1/0,1/0,1/0),ot=new R(-1/0,-1/0,-1/0),Et=new R;for(const bt of ue)Et.set(bt.dot(ht),bt.dot(We),bt.dot(Oe)),Ke.min(Et),ot.max(Et);const Dt=Ke.clone().add(ot).multiplyScalar(.5);return{doel:ht.clone().multiplyScalar(Dt.x).addScaledVector(We,Dt.y).addScaledVector(Oe,Dt.z),q:lt,maat:{b:Math.max((ot.x-Ke.x)/2,Ja),h:Math.max((ot.y-Ke.y)/2,Ja)},fov:0}}function st(){const b=Pt(Z.focusDoel.indices);if(!b)return;o={van:o?mt():ye(),naar:b,start:performance.now(),t:0,terug:!1},Z.overgang=null,Z.glij=null,Z.doel=Z.z,Pe(),on()}function Ot(){o={van:mt(),naar:ye(),start:performance.now(),t:0,terug:!0},on()}function Qt(){if(!o)return;const b=mt();o=null;const N=ie.clone().applyQuaternion(b.q);if(Math.hypot(N.x,N.y)<.001){const k=new R(0,1,0).applyQuaternion(b.q).setZ(0).normalize(),j=Math.sign(N.z)||1;N.set(0,0,j).addScaledVector(k,-.01*j).normalize()}Z.focusDoel&&(Z.focus={midden:Z.focusDoel.midden.clone(),straal:Z.focusDoel.straal},Z.z=Z.doel=1),Object.assign(Z,{overgang:null,glij:null,vrij:null}),i.position.copy(g.target).add(N),ve(i),Pe(),je()}function ti(){const b=mt(),N=ie.clone().applyQuaternion(b.q),k=b.doel.distanceTo(m)+h;if(b.fov<=0){const j=s;j.position.copy(b.doel).addScaledVector(N,k+1),j.quaternion.copy(b.q),j.top=b.h,j.bottom=-b.h,j.left=-b.h*i.aspect,j.right=b.h*i.aspect,j.near=.01,j.far=2*k+1,j.updateProjectionMatrix(),j.updateMatrixWorld(!0),ve(j)}else{const j=r,re=Math.max(b.fov,ix),ue=b.h/Math.tan(Rt.degToRad(re)/2);j.fov=re,j.aspect=i.aspect,j.position.copy(b.doel).addScaledVector(N,ue),j.quaternion.copy(b.q),j.near=Math.max(ue-k,ue/100),j.far=ue+k,j.updateProjectionMatrix(),j.updateMatrixWorld(!0),ve(j)}}e.domElement.addEventListener("wheel",b=>{if(b.preventDefault(),!_)return;Qt();const N=b.deltaY*(b.deltaMode===1?33:b.deltaMode===2?800:1);if(!Z.focusDoel){fe()&&Te(N,b);return}const k=1/q0,j=Rt.clamp(-N/100*k,-k,k);Z.overgang&&(Z.overgang=null,Z.doel=Z.z),Z.doel=Rt.clamp(Z.doel+j,0,1),on()},{passive:!1});function on(){ke==null&&(Se=performance.now(),ke=requestAnimationFrame(ni))}const ln=b=>b<.5?4*b*b*b:1-Math.pow(-2*b+2,3)/2,xi=b=>1-Math.pow(1-b,3),Hn=(b,N,k)=>Rt.clamp((N-b)/1e3/k,0,1);function ni(){ke=null;const b=performance.now(),N=Math.min(Math.max((b-Se)/1e3,0),.1);Se=b;let k=!1;if(Z.overgang){const re=Z.overgang,ue=Hn(re.start,b,re.duur);Z.z=Rt.lerp(re.van,re.naar,re.verloop(ue)),ue>=1?Z.overgang=null:k=!0}else Z.z!==Z.doel&&(Z.z+=(Z.doel-Z.z)*(1-Math.exp(-N/lu)),Math.abs(Z.doel-Z.z)<.001?Z.z=Z.doel:k=!0);if(Z.vrij&&Ge(N)&&(k=!0),Z.glij){const re=Z.glij,ue=(re.verloop??ln)(Hn(re.start,b,re.duur??Z0));Z.glij.vanStand?Z.glij.t=ue:(Z.focus.midden.lerpVectors(Z.glij.van.midden,Z.glij.naar.midden,ue),Z.focus.straal=Rt.lerp(Z.glij.van.straal,Z.glij.naar.straal,ue)),ue>=1?Z.glij=null:k=!0}Z.z===0&&Z.doel===0&&!Z.glij&&(Z.focusDoel||(Z.focus=null));let j=!1;if(o){const re=Hn(o.start,b,tx);o.t=ln(re),j=!0,re<1?k=!0:o.terug&&(o=null,ve(i))}Pe(),j&&je(),k&&(ke=requestAnimationFrame(ni))}function Tn(){_&&(_.traverse(b=>{b.geometry?.dispose()}),t.remove(_)),F.forEach(b=>b.dispose()),F.length=0,_=null,y=[],M=[],f(),G=[],de=null,x=null,V=null,v=[],J(),Be.innerHTML="",xe.innerHTML="",xe.classList.add("hidden"),B(),ge(),Wt(),d.visible=!1,je()}function cn(b,N){let k;return b==="lijn"?k=new Xr({color:N,transparent:!0,opacity:.55}):b==="lijn-buiten"?k=new E0({color:N,transparent:!0,opacity:.45,dashSize:.15,gapSize:.1}):(k=new y0({color:N,side:Fn,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),b==="buiten"?(k.transparent=!0,k.opacity=ol,k.depthWrite=!1):b==="geest"?(k.transparent=!0,k.opacity=au,k.depthWrite=!1):(b==="oplichten"||b==="sterk")&&(k.side=gn,k.shadowSide=nn,k.emissive=new tt(N).multiplyScalar(b==="sterk"?.5:.35)),p.pasToe(k,{korrel:!0,ao:!k.transparent})),F.push(k),k}function An(b,N){const k=new wn({uniforms:{kleur:{value:new tt(b)},afstand:{value:gx},dikte:{value:_x},opacity:{value:N}},vertexShader:`
                varying vec2 vArc;
                void main() {
                    vArc = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }`,fragmentShader:`
                uniform vec3 kleur;
                uniform float afstand;
                uniform float dikte;
                uniform float opacity;
                varying vec2 vArc;
                void main() {
                    // lijnen s - t = constant ('/'), loodrecht afstand 'afstand' uit elkaar
                    float c = (vArc.x - vArc.y) * 0.70710678 / afstand;
                    float f = fract(c);
                    float d = min(f, 1.0 - f);     // afstand tot de dichtstbijzijnde lijn
                    float w = fwidth(c);           // één schermpixel in dezelfde eenheid
                    float a = 1.0 - smoothstep(0.5 * dikte * w, (0.5 * dikte + 1.0) * w, d);
                    if (a <= 0.0) discard;
                    gl_FragColor = vec4(kleur, a * opacity);
                    #include <colorspace_fragment>
                }`,transparent:!0,depthWrite:!1,side:Fn});return F.push(k),k}function Mi(b,N){const k=b.userData.arcering;k&&(k.mesh.visible=N!=="uit",N!=="uit"&&(k.mesh.material=N==="geest"?k.geest:k.basis))}function Gn(b,N={}){const k=N.behoudCamera&&_?{positie:i.position.clone(),doel:g.target.clone(),zoom:{z:Z.doel,doel:Z.doel,focus:Z.focus,focusDoel:Z.focusDoel,vrij:Z.vrij}}:null;Tn(),_=new pi,M=b.v||[],de=b.l||null;const j=new Map,re=lt=>{if(!j.has(lt)){const Ke=b.kl?.[lt]||Ph;j.set(lt,{normaal:cn("normaal",Ke),buiten:cn("buiten",Ke),geest:cn("geest",Ke)})}return j.get(lt)},ue=cn("lijn",Za),Ce=cn("lijn-buiten",Za);L=ue,D=Ce,P=cn("lijn",Za),P.opacity=W0,w=cn("oplichten",G0),H=cn("sterk",j0);const Ie=new Map,Oe=lt=>{const Ke=b.ak?.[lt];return Ke?(Ie.has(lt)||Ie.set(lt,{normaal:An(Ke,to),buiten:An(Ke,to*ol),geest:An(Ke,to*au)}),Ie.get(lt)):null};M.forEach((lt,Ke)=>{const ot=ar(lt),Et=new R(...lt.n).normalize(),Dt=Vx(lt,ot,Et),rt=!!lt.o,bt=re(lt.k),gt=new Kt(Dt,rt?bt.buiten:bt.normaal);gt.userData={index:Ke,basis:rt?bt.buiten:bt.normaal,geest:bt.geest,buiten:rt,klikbaar:!1,vorm:{normaal:Et}},rt&&(gt.renderOrder=1),gt.castShadow=!rt,gt.receiveShadow=!rt;const At=Gx(ot,rt?Ce:ue);gt.userData.lijn=At,gt.userData.basisLijn=At.material,gt.add(At);const wt=lt.a!=null?Oe(lt.a):null;if(wt){const Sn=rt?wt.buiten:wt.normaal,Ft=new Kt(Dt,Sn);Ft.renderOrder=4,gt.add(Ft),gt.userData.arcering={mesh:Ft,basis:Sn,geest:wt.geest}}const hn=N.labels?.[Ke];if(hn!=null){const Sn=ot.reduce((yi,zi)=>yi.add(zi),new R).divideScalar(ot.length),Ft=document.createElement("span");Ft.className="vlak-label",Ft.textContent=hn,Be.appendChild(Ft),gt.userData.label={el:Ft,klasse:"vlak-label",punt:Sn.clone().addScaledVector(Et,rx)}}_.add(gt),y.push(gt),G.push(...ot)}),t.add(_);for(const lt of y)O(lt);Y();const We=new Ii().setFromObject(_);if(We.isEmpty())m.set(0,0,0),h=1;else{const lt=We.getBoundingSphere(new Ui);m=lt.center,h=Math.max(lt.radius,.5)}const ht=new pe(...b.nr||[0,1]);Ae.richtOpNoord(ht),Ar(ht),E(),J(),g.target.copy(m),se=new R(...b.vr||[0,-1],0).normalize(),me=b.vd??Jn,k?(g.target.copy(k.doel),i.position.copy(k.positie),Object.assign(Z,k.zoom)):i.position.copy(m).add(ur(se,me)),Pe(),te(),je()}function ii(b){const N=new Set(b);y.forEach((k,j)=>{k.userData.klikbaar=N.has(j)})}function Tr(b){v=b||[],Y(),je()}function Ar(b){const N=Rt.degToRad(kx),k=Rt.degToRad(Ix),j=b.x*Math.cos(N)+b.y*Math.sin(N),re=-b.x*Math.sin(N)+b.y*Math.cos(N),ue=new R(j*Math.cos(k),re*Math.cos(k),Math.sin(k)),Ce=h*3;u.target.position.copy(m),u.position.copy(m).addScaledVector(ue,Ce);const Ie=u.shadow.camera;Ie.left=-h*1.2,Ie.right=h*1.2,Ie.top=h*1.2,Ie.bottom=-h*1.2,Ie.near=Ce-h*1.5,Ie.far=Ce+h*1.5,Ie.updateProjectionMatrix(),d.position.set(m.x,m.y,0),d.scale.setScalar(h*2.5),d.visible=mu>0,f()}function E(){xe.innerHTML="";const b=(N,k,j="")=>{const re=document.createElement("div");re.className="legenda-item";const ue=document.createElement("span");ue.className="legenda-kleur"+j,k&&(ue.style.background=k),re.append(ue,document.createTextNode(N)),xe.appendChild(re)};for(const[N,k]of de?.z||[])b(N,k);de?.b&&b("buiten berekening",null," legenda-kleur--buiten");for(const[N,k]of de?.a||[])b(N,`repeating-linear-gradient(135deg, ${k} 0 1.5px, #fff 1.5px 4px)`);xe.classList.toggle("hidden",xe.children.length===0)}function U(b,N=[]){x=new Set(b),V=new Set(N);const k=!W;y.forEach((j,re)=>{const ue=V.has(re);ue||x.has(re)?(j.material=ue?H:w,j.renderOrder=ue?3:2,j.castShadow=!su,j.receiveShadow=!1,j.userData.lijn.material=j.userData.basisLijn,j.userData.lijn.visible=!k,Mi(j,"uit")):(j.material=j.userData.geest,j.renderOrder=1,j.castShadow=!1,j.receiveShadow=!1,j.userData.lijn.material=P,j.userData.lijn.visible=!k,Mi(j,"geest"))}),f(),Y(),je()}function q(){x=null,V=null;for(const b of y)O(b);f(),Y(),je()}function Y(){if(B(),W||!_)return;T=new pi;const b=M.map((j,re)=>re),N=j=>j.some(re=>!M[re].o)?L:D,k=j=>j.forEach(re=>T.add(re));if(!x)k(ee(b,N,0));else{const j=new Set([...x,...V]);k(ee([...j],()=>L,2));const re=b.filter(ue=>!j.has(ue));k(ee(re,()=>P,0))}t.add(T)}function B(){T&&(t.remove(T),T.traverse(b=>b.geometry?.dispose()),T=null)}function O(b){b.material=b.userData.basis,b.renderOrder=b.userData.buiten?1:0,b.castShadow=!b.userData.buiten,b.receiveShadow=!b.userData.buiten,b.userData.lijn.material=b.userData.basisLijn,b.userData.lijn.visible=W,Mi(b,"basis")}function ee(b,N,k){const j=Ke=>Ke.n.map(ot=>Math.round(ot*100)).join(","),re=(Ke,ot)=>`${v[ot]??-1}|${Ke.k}|${Ke.o?1:0}|${Ke.a??-1}`,ue=Ke=>[Ke.x,Ke.y,Ke.z].map(ot=>Math.round(ot*1e3)).join(","),Ce=new Map,Ie=[];for(const Ke of b){const ot=M[Ke];if(!ot)continue;const Et=j(ot),Dt=re(ot,Ke),rt=ar(ot);Ce.has(Et)||Ce.set(Et,[]),Ce.get(Et).push(...rt),rt.forEach((bt,gt)=>Ie.push({a:bt,b:rt[(gt+1)%rt.length],n:Et,g:Dt,i:Ke}))}const Oe=new Map,We=new R,ht=new R;for(const{a:Ke,b:ot,n:Et,g:Dt,i:rt}of Ie){We.subVectors(ot,Ke);const bt=We.lengthSq();if(bt<1e-8)continue;const gt=[0,1];for(const At of Ce.get(Et)){ht.subVectors(At,Ke);const wt=ht.dot(We)/bt;wt<=1e-4||wt>=1-1e-4||ht.addScaledVector(We,-wt).lengthSq()<1e-6&&gt.push(wt)}gt.sort((At,wt)=>At-wt);for(let At=0;At<gt.length-1;At++){if(gt[At+1]-gt[At]<1e-6)continue;const wt=Ke.clone().addScaledVector(We,gt[At]),hn=Ke.clone().addScaledVector(We,gt[At+1]),Sn=[ue(wt),ue(hn)].sort().join("|")+"|"+Et,Ft=Oe.get(Sn);Ft?(Ft.groepen.add(Dt),Ft.leden.push(rt)):Oe.set(Sn,{van:wt,naar:hn,groepen:new Set([Dt]),leden:[rt]})}}const lt=new Map;for(const{van:Ke,naar:ot,groepen:Et,leden:Dt}of Oe.values()){if(Dt.length>1&&Et.size===1)continue;const rt=N(Dt);lt.has(rt)||lt.set(rt,[]),lt.get(rt).push(Ke,ot)}return[...lt].map(([Ke,ot])=>{const Et=new Wa(new Lt().setFromPoints(ot),Ke);return Ke.isLineDashedMaterial&&Et.computeLineDistances(),Et.renderOrder=k,Et})}function le(b,N=null,k=!0){ge();const j=b?.e||[];if(!_||j.length===0){je();return}$=new pi;const re=N!=null?j.find(ue=>ue.r===N):null;for(const ue of b.m||[]){const Ce=re?ue.r.includes(N)?"voorgrond":"gedimd":"normaal";$e(ue,Ce)}for(const ue of j)(ue.f||dx)&&De(ue,!!re&&ue.r!==N);if(k)for(const ue of j){const Ce=re?ue.r===N?"voorgrond":"gedimd":"normaal";for(const Ie of ue.p){const Oe=Qs(Ie);if(Oe.length===0)continue;const We=new R;for(const ht of Oe)We.add(ht);We.divideScalar(Oe.length),at(String(ue.r+1),`rij-nummer rij-nummer--${Ce}${ue.f?" rij-nummer--aftrek":""}`,We,{soort:"rij",stand:Ce,aftrek:!!ue.f})}}re&&ct(re),t.add($),je()}function ge(){if($){const b=new Set;$.traverse(N=>{N.geometry?.dispose(),N.material&&b.add(N.material)}),b.forEach(N=>N.dispose()),t.remove($),$=null}Q.innerHTML="",X=[]}function we(b,N){return new wn({uniforms:{kleur:{value:new tt(b)},opacity:{value:N},streep:{value:cx},gat:{value:ux},resolutie:be.resolutie,schaal:be.schaal},vertexShader:`
                attribute vec3 begin;
                uniform vec2 resolutie;
                varying vec2 vBegin;
                void main() {
                    vec4 b = projectionMatrix * modelViewMatrix * vec4(begin, 1.0);
                    vBegin = (b.xy / b.w * 0.5 + 0.5) * resolutie;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }`,fragmentShader:`
                uniform vec3 kleur;
                uniform float opacity;
                uniform float streep;
                uniform float gat;
                uniform float schaal;
                varying vec2 vBegin;
                void main() {
                    float d = distance(gl_FragCoord.xy, vBegin) / schaal;
                    if (mod(d, streep + gat) > streep) discard;
                    gl_FragColor = vec4(kleur, opacity);
                    #include <colorspace_fragment>
                }`,transparent:!0,depthTest:!1,depthWrite:!1})}function He(b,N=!1){const k=[],j=[],re=N?b.length:b.length-1;for(let Ce=0;Ce<re;Ce++){const Ie=b[Ce],Oe=b[(Ce+1)%b.length];k.push(Ie.x,Ie.y,Ie.z,Oe.x,Oe.y,Oe.z),j.push(Ie.x,Ie.y,Ie.z,Ie.x,Ie.y,Ie.z)}const ue=new Lt;return ue.setAttribute("position",new It(k,3)),ue.setAttribute("begin",new It(j,3)),ue}function De(b,N){const k=!!b.f,j={color:k?js:eo,transparent:!0,opacity:N?fx:hx,depthTest:!1,depthWrite:!1},re=k?we(j.color,j.opacity):new Xr(j);for(const ue of b.p){const Ce=Qs(ue);if(Ce.length<3)continue;const Ie=k?new Wa(He(Ce,!0),re):new vh(new Lt().setFromPoints(Ce),re);Ie.renderOrder=k?rr.aftrek:rr.omtrek,$.add(Ie)}}function $e(b,N){const k=b.f?js:N==="voorgrond"?Qa:ax,j=N==="gedimd"?lx:1,re=b.f?N==="voorgrond"?rr.aftrekVoorgrond:rr.aftrek:N==="voorgrond"?rr.maatVoorgrond:rr.maat,ue=xu(b.p),Ce=xu(b.q),Ie={color:k,transparent:!0,opacity:j,depthTest:!1,depthWrite:!1},Oe=b.s?new Wa(He([ue,Ce]),we(k,j)):new Al(new Lt().setFromPoints([ue,Ce]),new Xr(Ie));Oe.renderOrder=re;const We=new Vv(new Lt().setFromPoints([ue,Ce]),new xh({...Ie,size:px,sizeAttenuation:!1}));We.renderOrder=re,$.add(Oe,We),at(b.w,`maatlijn-label maatlijn-label--${N}`,ue.clone().lerp(Ce,.5),{soort:"maat",stand:N},{van:ue,naar:Ce})}function ct(b){const N=b.f?js:eo,k=new ua({color:N,transparent:!0,opacity:ox,side:gn,depthTest:!1,depthWrite:!1});for(const j of b.p){const re=Qs(j);if(re.length<3)continue;const ue=new Lt().setFromPoints(re),Ce=[];for(let Oe=1;Oe<re.length-1;Oe++)Ce.push(0,Oe,Oe+1);ue.setIndex(Ce);const Ie=new Kt(ue,k);Ie.renderOrder=15,$.add(Ie)}}function at(b,N,k,j,re=null){const ue=document.createElement("span");ue.className=N,ue.textContent=b,Q.appendChild(ue),X.push({el:ue,punt:k,tekst:b,stijl:j,lijn:re,grootte:null})}function jt(b,N,k){const j=X.map(Oe=>Oe.stijl?.soort==="maat"?null:Xt(Oe.punt,b,N)),re={voorgrond:0,normaal:1,gedimd:2},ue=X.map((Oe,We)=>We).filter(Oe=>X[Oe].stijl?.soort==="maat").sort((Oe,We)=>(re[X[Oe].stijl.stand]??1)-(re[X[We].stijl.stand]??1)||Oe-We),Ce=[],Ie=(Oe,We)=>Ce.every(ht=>Math.abs(Oe.x-ht.x)*2>=We.w+ht.w+2*cu||Math.abs(Oe.y-ht.y)*2>=We.h+ht.h+2*cu);for(const Oe of ue){const We=X[Oe],ht=Xt(We.punt,b,N);if(!ht)continue;const lt=k(We);let Ke=ht;const ot=We.lijn&&Xt(We.lijn.van,b,N),Et=We.lijn&&Xt(We.lijn.naar,b,N);if(ot&&Et&&!Ie(ht,lt))for(const Dt of mx){const rt={x:ot.x+(Et.x-ot.x)*Dt,y:ot.y+(Et.y-ot.y)*Dt};if(Ie(rt,lt)){Ke=rt;break}}j[Oe]=Ke,Ce.push({...Ke,...lt})}return j}function ft(b){return!b.grootte&&b.el.offsetWidth>0&&(b.grootte={w:b.el.offsetWidth,h:b.el.offsetHeight}),b.grootte||{w:b.tekst.length*7+8,h:16}}function ze(b,N,k,j={}){const{schaalLabels:re=1,schaalKompas:ue=1,rijnummers:Ce=!0,extra:Ie=null}=j,Oe={pixelRatio:e.getPixelRatio(),positie:i.position.clone(),quaternion:i.quaternion.clone(),aspect:i.aspect,near:i.near,far:i.far},We=document.createElement("canvas");We.width=N,We.height=k;const ht=We.getContext("2d"),lt=a;try{ve(i),e.setPixelRatio(1),e.setSize(N,k,!1);const Ke=b.positie.distanceTo(b.doel);i.aspect=N/k,i.position.copy(b.positie),i.lookAt(b.doel),i.near=Math.max(Ke/100,.01),i.far=Ke+h*4,i.updateProjectionMatrix(),i.updateMatrixWorld(!0),Ve(re),e.setScissorTest(!1),e.setViewport(0,0,N,k),it(re),_&&Fe(ue);const ot=ht.createLinearGradient(0,0,0,k);ot.addColorStop(0,uu[0]),ot.addColorStop(1,uu[1]),ht.fillStyle=ot,ht.fillRect(0,0,N,k),ht.drawImage(e.domElement,0,0);const Et=jt(N,k,rt=>xn(ht,rt,re)),Dt=X.map((rt,bt)=>({...rt,p:Et[bt]})).filter(rt=>rt.p&&rt.stijl&&(Ce||rt.stijl.soort!=="rij"));for(const rt of Dt)rt.stijl.soort==="rij"&&ut(ht,rt,re);for(const rt of Dt)rt.stijl.soort==="maat"&&ut(ht,rt,re);Ie?.(ht)}finally{e.setPixelRatio(Oe.pixelRatio),i.position.copy(Oe.positie),i.quaternion.copy(Oe.quaternion),i.aspect=Oe.aspect,i.near=Oe.near,i.far=Oe.far,i.updateProjectionMatrix(),ve(lt),te()}return We}function xn(b,N,k){const{soort:j,stand:re}=N.stijl,ue=vx*k,Ce=j==="rij"||re==="voorgrond";b.font=`${Ce?"bold ":""}${ue}px Consolas, 'Courier New', monospace`;const Ie=(j==="rij"?4:3)*k,Oe=j==="rij"?ue*1.1+2*Ie:0;return{w:Math.max(b.measureText(N.tekst).width+2*Ie,Oe),h:ue*1.35}}function ut(b,N,k){const{soort:j,stand:re,aftrek:ue}=N.stijl,{w:Ce,h:Ie}=xn(b,N,k),Oe=N.p.x-Ce/2,We=N.p.y-Ie/2,ht=Math.min((j==="rij"?9:3)*k,Ie/2);b.save(),j==="rij"?(b.globalAlpha=re==="gedimd"?.2:re==="voorgrond"?.8:.65,b.fillStyle=ue?js:eo,b.beginPath(),b.roundRect(Oe,We,Ce,Ie,ht),b.fill(),b.fillStyle="#fff"):(b.globalAlpha=re==="gedimd"?.25:1,b.fillStyle="rgba(255, 255, 255, 0.92)",b.strokeStyle=re==="voorgrond"?Qa:"#555",b.lineWidth=k,b.beginPath(),b.roundRect(Oe,We,Ce,Ie,ht),b.fill(),b.stroke(),b.fillStyle=re==="voorgrond"?Qa:"#111"),b.textAlign="center",b.textBaseline="middle",b.fillText(N.tekst,N.p.x,N.p.y),b.restore()}function un(b){W=!!b,Be.classList.toggle("hidden",!W),W||Wt(),x?U([...x],[...V]):q()}function ri(b,N){ce=b.clone(),he.replaceChildren(N),he.classList.remove("hidden"),Ul()}function Wt(){ce=null,he.classList.add("hidden")}const Nn=new R,yt=new R;function Xt(b,N,k){return Nn.copy(b).project(a),Nn.z>1?null:{x:(Nn.x+1)/2*N,y:(1-Nn.y)/2*k}}function Si(b,N,k,j){const re=Xt(N,k,j);b.style.display=re?"":"none",re&&(b.style.transform=`translate(${re.x.toFixed(1)}px, ${re.y.toFixed(1)}px) translate(-50%, -50%)`)}function Yt(){const b=[];return y.forEach((N,k)=>{N.userData.buiten||x&&su&&!x.has(k)&&!V?.has(k)||b.push(N)}),b}const Mn=new sl,qt=new R,si=new R;function $h(b,N){let k;return a.isOrthographicCamera?(a.getWorldDirection(qt),k=si.subVectors(b,a.position).dot(qt),si.copy(b).addScaledVector(qt,-k)):(si.copy(a.position),qt.subVectors(b,si),k=qt.length(),qt.divideScalar(k)),Mn.set(si,qt),Mn.far=k-sx,Mn.intersectObjects(N,!1).length>0}function Ul(){const b=n.clientWidth,N=n.clientHeight;if(b===0||N===0)return;if(W){const j=Yt();y.forEach((re,ue)=>{const Ce=re.userData.label;if(!Ce)return;if($h(Ce.punt,j)){Ce.el.style.display="none";return}Si(Ce.el,Ce.punt,b,N);let Ie="vlak-label";x?Ie+=V?.has(ue)?" vlak-label--sterk":x.has(ue)?" vlak-label--aan":" vlak-label--geest":yt.subVectors(a.position,Ce.punt).dot(re.userData.vorm.normaal)<0&&(Ie+=" vlak-label--achter"),re.userData.buiten&&(Ie+=" vlak-label--buiten"),Ie!==Ce.klasse&&(Ce.el.className=Ie,Ce.klasse=Ie)})}const k=jt(b,N,ft);if(X.forEach((j,re)=>{const ue=k[re];j.el.style.display=ue?"":"none",ue&&(j.el.style.transform=`translate(${ue.x.toFixed(1)}px, ${ue.y.toFixed(1)}px) translate(-50%, -50%)`)}),ce){const j=Xt(ce,b,N);if(he.style.visibility=j?"":"hidden",!j)return;const re=he.offsetWidth,ue=he.offsetHeight;let Ce=j.x+Gs,Ie=j.y+Gs;Ce+re>b-4&&(Ce=Math.max(4,j.x-Gs-re)),Ie+ue>N-4&&(Ie=Math.max(4,j.y-Gs-ue)),he.style.transform=`translate(${Ce.toFixed(1)}px, ${Ie.toFixed(1)}px)`}}const pa=new sl;function Ol(b,N){const k=e.domElement.getBoundingClientRect(),j=new pe((b-k.left)/k.width*2-1,-((N-k.top)/k.height)*2+1);pa.setFromCamera(j,a)}function Kh(b,N){Ol(b,N);const k=y.filter(re=>re.userData.klikbaar),j=pa.intersectObjects(k,!1);return j.length===0?null:{index:j[0].object.userData.index,punt:j[0].point}}function Yh(b,N){return Ol(b,N),pa.intersectObjects(Yt(),!1)[0]?.point??null}return{laadGebouw:Gn,wis:Tn,zetKlikbaar:ii,zetRandGroepen:Tr,lichtOp:U,wisOplichten:q,zetFocus:qe,wisselZoom:pt,zetOntwikkelaar:un,toonMaatvoering:le,wisMaatvoering(){ge(),je()},toonTooltip:ri,verbergTooltip:Wt,bijVlakKlik(b){oe=b},render:te,maakBeeld:ze,vernietig(){ae.disconnect(),ke!=null&&cancelAnimationFrame(ke),Ye!=null&&cancelAnimationFrame(Ye),ke=null,Ye=null,Tn(),g.dispose(),e.dispose(),e.forceContextLoss(),e.domElement.remove(),Be.remove(),Q.remove(),he.remove(),xe.remove()},prestatie:{meet(b){nt=b?{fn:b,stappen:{}}:null,e.info.autoReset=!b},zetAfwerking(b){z=!!b,p.zetAan(z),je()},zetSchaduw(b){u.castShadow=!!b,f(),je()},zetPixelRatio(b){e.setPixelRatio(b),te()},get pixelRatio(){return e.getPixelRatio()},bufferMaat:()=>e.getDrawingBufferSize(new pe),gpu(){const b=e.getContext(),N=b.getExtension("WEBGL_debug_renderer_info");return N?b.getParameter(N.UNMASKED_RENDERER_WEBGL):b.getParameter(b.RENDERER)},draai(b){if(Ye!=null&&cancelAnimationFrame(Ye),Ye=null,g.autoRotate=!!b,!b)return;let N=performance.now();const k=()=>{const j=performance.now();g.update((j-N)/1e3),N=j,Ye=requestAnimationFrame(k)};Ye=requestAnimationFrame(k)}},intern:{get meshes(){return y},get gebouwPunten(){return G},get middelpunt(){return m},get straal(){return h},get voorRichting(){return se},get beginDraai(){return me},get legenda(){return de},deelPunten:b=>M[b]?ar(M[b]):[],get ontwikkelaar(){return W},set ontwikkelaar(b){W=!!b}}}}function ur(n,e=Jn){const t=n.clone().applyAxisAngle(new R(0,0,1),Rt.degToRad(-e)),i=Rt.degToRad($0);return new R(t.x*Math.cos(i),t.y*Math.cos(i),Math.sin(i))}const _u=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
    }`,vu=`
    uniform sampler2D tDiepte;
    uniform mat4 projInv;
    vec3 camPositie(vec2 uv, float d) {
        vec4 p = projInv * vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
        return p.xyz / p.w;
    }
    // zelfde vlak (ongeveer): dieptes dicht genoeg bij elkaar, ruimer op afstand
    float dieptemarge(float z) {
        return max(0.05, 0.03 * abs(z));
    }`;function Ox(n){const e=new pe,t=new pe,i={normaal:null,ao:null,vervaagd:null},r={afwKaart:{value:null},afwResolutie:{value:new pe(1,1)},afwAan:{value:1}},s=new S0({side:gn}),a=new wn({defines:{AANTAL:du},uniforms:{tNormaal:{value:null},tDiepte:{value:null},proj:{value:new _t},projInv:{value:new _t},resolutie:{value:new pe(1,1)},straal:{value:Ax},randPx:{value:fu},monsters:{value:Fx(du)}},vertexShader:_u,fragmentShader:`
            uniform sampler2D tNormaal;
            uniform mat4 proj;
            uniform vec2 resolutie;
            uniform float straal;
            uniform float randPx;
            uniform vec3 monsters[AANTAL];
            varying vec2 vUv;
            ${vu}

            vec3 leesNormaal(vec2 uv) {
                return normalize(texture2D(tNormaal, uv).xyz * 2.0 - 1.0);
            }

            // Normaal van een buurpixel; achtergrond of een ander vlak (dieptesprong) telt
            // als dezelfde stand, zodat silhouetten geen rand krijgen
            vec3 buur(vec2 uv, vec3 P, vec3 N) {
                float d = texture2D(tDiepte, uv).x;
                if (d >= 1.0) return N;
                if (abs(camPositie(uv, d).z - P.z) > dieptemarge(P.z)) return N;
                return leesNormaal(uv);
            }

            void main() {
                float d = texture2D(tDiepte, vUv).x;
                if (d >= 1.0) { gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0); return; }
                vec3 P = camPositie(vUv, d);
                vec3 N = leesNormaal(vUv);

                // AO: monsters in een halve bol boven het vlak, per pixel gedraaid
                // (interleaved gradient noise); bedekt als het zichtbare oppervlak daar
                // dichter bij de camera ligt dan het monster
                float hoek = 6.2831853 * fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
                vec3 r = vec3(cos(hoek), sin(hoek), 0.0);
                vec3 T = r - N * dot(r, N);
                T = length(T) < 1e-3 ? normalize(cross(N, vec3(0.0, 1.0, 0.0))) : normalize(T);
                mat3 tbn = mat3(T, cross(N, T), N);
                float bedekt = 0.0;
                for (int i = 0; i < AANTAL; i++) {
                    vec3 s = P + tbn * monsters[i] * straal;
                    vec4 c = proj * vec4(s, 1.0);
                    vec2 suv = c.xy / c.w * 0.5 + 0.5;
                    if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) continue;
                    float sd = texture2D(tDiepte, suv).x;
                    if (sd >= 1.0) continue;
                    float sz = camPositie(suv, sd).z;
                    float bereik = smoothstep(0.0, 1.0, straal / max(abs(P.z - sz), 1e-4));
                    bedekt += (sz >= s.z + 0.02 ? 1.0 : 0.0) * bereik;
                }
                float ao = 1.0 - bedekt / float(AANTAL);

                // Rand: kromming van de normalen over het scherm (+ = bol, - = hol)
                vec2 dx = vec2(randPx / resolutie.x, 0.0);
                vec2 dy = vec2(0.0, randPx / resolutie.y);
                float krom = (buur(vUv + dx, P, N).x - buur(vUv - dx, P, N).x)
                           + (buur(vUv + dy, P, N).y - buur(vUv - dy, P, N).y);
                gl_FragColor = vec4(ao, 0.5 + 0.5 * clamp(krom * 0.6, -1.0, 1.0), 0.0, 1.0);
            }`,depthTest:!1,depthWrite:!1}),o=new wn({uniforms:{tAO:{value:null},tDiepte:{value:null},projInv:{value:new _t},resolutie:{value:new pe(1,1)}},vertexShader:_u,fragmentShader:`
            uniform sampler2D tAO;
            uniform vec2 resolutie;
            varying vec2 vUv;
            ${vu}

            void main() {
                vec4 midden = texture2D(tAO, vUv);
                float d = texture2D(tDiepte, vUv).x;
                if (d >= 1.0) { gl_FragColor = midden; return; }
                float z = camPositie(vUv, d).z;
                float marge = dieptemarge(z);
                float som = 0.0;
                float gewicht = 0.0;
                for (int x = -2; x <= 2; x++) {
                    for (int y = -2; y <= 2; y++) {
                        vec2 uv = vUv + vec2(float(x), float(y)) / resolutie;
                        float dd = texture2D(tDiepte, uv).x;
                        if (dd >= 1.0 || abs(camPositie(uv, dd).z - z) > marge) continue;
                        som += texture2D(tAO, uv).r;
                        gewicht += 1.0;
                    }
                }
                gl_FragColor = vec4(gewicht > 0.0 ? som / gewicht : midden.r, midden.g, 0.0, 1.0);
            }`,depthTest:!1,depthWrite:!1}),l=new Kt(new os(2,2),a);l.frustumCulled=!1;const c=new Tl;c.add(l);const u=new ls(-1,1,1,-1,0,1);function d(g,_){if(i.normaal?.width===g&&i.normaal?.height===_)return;for(const h of Object.values(i))h?.depthTexture?.dispose(),h?.dispose();const m={minFilter:vn,magFilter:vn,depthBuffer:!0};i.normaal=new On(g,_,{...m,depthTexture:new wl(g,_)}),i.ao=new On(g,_,m),i.vervaagd=new On(g,_,{...m,minFilter:bn,magFilter:bn}),r.afwKaart.value=i.vervaagd.texture}function p(g,_,m,h=(y,M)=>M()){if(n.getDrawingBufferSize(e),e.x===0||e.y===0)return;const y=Math.min(1,Rx/n.getPixelRatio());t.set(Math.max(1,Math.round(e.x*y)),Math.max(1,Math.round(e.y*y))),d(t.x,t.y),r.afwResolutie.value.copy(e);const M={doel:n.getRenderTarget(),masker:_.layers.mask,schaduw:n.shadowMap.autoUpdate,nodig:n.shadowMap.needsUpdate,kleur:n.getClearColor(new tt),alpha:n.getClearAlpha()};try{n.shadowMap.autoUpdate=!1,n.shadowMap.needsUpdate=!1,_.layers.set(Js),g.overrideMaterial=s,n.setRenderTarget(i.normaal),n.setClearColor(8421631,1),h("normalen",()=>{n.clear(),n.render(g,_)}),g.overrideMaterial=null,_.layers.mask=M.masker;const x=a.uniforms;x.tNormaal.value=i.normaal.texture,x.tDiepte.value=i.normaal.depthTexture,x.proj.value.copy(_.projectionMatrix),x.projInv.value.copy(_.projectionMatrixInverse),x.resolutie.value.copy(t),x.randPx.value=fu*m*y,l.material=a,n.setRenderTarget(i.ao),h("ao",()=>n.render(c,u));const F=o.uniforms;F.tAO.value=i.ao.texture,F.tDiepte.value=i.normaal.depthTexture,F.projInv.value.copy(_.projectionMatrixInverse),F.resolutie.value.copy(t),l.material=o,n.setRenderTarget(i.vervaagd),h("vervagen",()=>n.render(c,u))}finally{g.overrideMaterial=null,_.layers.mask=M.masker,n.setRenderTarget(M.doel),n.setClearColor(M.kleur,M.alpha),n.shadowMap.autoUpdate=M.schaduw,n.shadowMap.needsUpdate=M.nodig}}function f(g,{korrel:_,ao:m}){m=m&&Nx,_=_&&pu>0,!(!m&&!_)&&(g.customProgramCacheKey=()=>`afwerking-${_?1:0}${m?1:0}`,g.onBeforeCompile=h=>{h.uniforms.afwKaart=r.afwKaart,h.uniforms.afwResolutie=r.afwResolutie,h.uniforms.afwAan=r.afwAan,h.vertexShader=`varying vec3 vWereldPunt;
`+h.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
 vWereldPunt = (modelMatrix * vec4(transformed, 1.0)).xyz;`);let y=h.fragmentShader.replace("#include <common>",`#include <common>
                uniform sampler2D afwKaart;
                uniform vec2 afwResolutie;
                uniform float afwAan;
                varying vec3 vWereldPunt;
                float korrelHash(vec3 p) {
                    p = fract(p * 0.3183099 + 0.1);
                    p *= 17.0;
                    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
                }
                float korrelRuis(vec3 x) {
                    vec3 i = floor(x);
                    vec3 f = fract(x);
                    f = f * f * (3.0 - 2.0 * f);
                    return mix(
                        mix(mix(korrelHash(i), korrelHash(i + vec3(1.0, 0.0, 0.0)), f.x),
                            mix(korrelHash(i + vec3(0.0, 1.0, 0.0)), korrelHash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
                        mix(mix(korrelHash(i + vec3(0.0, 0.0, 1.0)), korrelHash(i + vec3(1.0, 0.0, 1.0)), f.x),
                            mix(korrelHash(i + vec3(0.0, 1.0, 1.0)), korrelHash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
                        f.z);
                }`);_&&(y=y.replace("#include <color_fragment>",`#include <color_fragment>
                {
                    vec3 pf = vWereldPunt / ${Dx.toFixed(4)};
                    float fijnZichtbaar = 1.0 - smoothstep(0.35, 0.9, length(fwidth(pf)));
                    float k = (korrelRuis(vWereldPunt / ${Lx.toFixed(4)}) - 0.5) * 0.6
                            + (korrelRuis(pf) - 0.5) * 0.4 * fijnZichtbaar;
                    diffuseColor.rgb *= 1.0 + ${(pu*2).toFixed(4)} * k;
                }`)),m&&(y=y.replace("#include <aomap_fragment>",`#include <aomap_fragment>
                vec2 afw = texture2D(afwKaart, gl_FragCoord.xy / afwResolutie).rg;
                float afwAO = mix(1.0, afw.r, ${Lh.toFixed(4)} * afwAan);
                reflectedLight.indirectDiffuse *= afwAO;
                reflectedLight.directDiffuse   *= mix(1.0, afwAO, 0.4);`),y=y.replace("#include <opaque_fragment>",`
                float afwKrom = (afw.g * 2.0 - 1.0) * afwAan;
                outgoingLight = mix(outgoingLight, vec3(1.0), max(afwKrom, 0.0) * ${Cx.toFixed(4)});
                outgoingLight *= 1.0 - max(-afwKrom, 0.0) * ${Px.toFixed(4)};
                #include <opaque_fragment>`)),h.fragmentShader=y})}return{bereken:p,pasToe:f,zetAan(g){r.afwAan.value=g?1:0}}}function Fx(n){const e=[];for(let t=0;t<n;t++){const i=(t+.5)/n,r=Math.sqrt(i),s=t*2.399963,a=new R(r*Math.cos(s),r*Math.sin(s),Math.sqrt(1-i)),o=(t*7%n+.5)/n;e.push(a.multiplyScalar(Rt.lerp(.15,1,o*o)))}return e}function zx(){const n=new Tl,e=new ls(-1.6,1.6,1.6,-1.6,.1,20),t=new pi;n.add(t);const i=(l,c=1)=>new ua({color:l,side:gn,transparent:c<1,opacity:c}),r=new Kt(new da(1,48),i("#ffffff",.8)),s=new Kt(new Pl(.95,1.02,48),i("#5b6770"));s.position.z=.01;const a=(l,c)=>{const u=new bh;u.moveTo(0,l),u.lineTo(-.2,0),u.lineTo(.2,0),u.closePath();const d=new Kt(new Ll(u),i(c));return d.position.z=.02,d};t.add(r,s,a(.82,hu),a(-.82,Sx));const o=[["N",0,1.3,hu],["O",1.3,0,"#333"],["Z",0,-1.3,"#333"],["W",-1.3,0,"#333"]];for(const[l,c,u,d]of o){const p=Bx(l,d);p.position.set(c,u,.05),t.add(p)}return{scene:n,camera:e,richtOpNoord(l){t.rotation.z=Math.atan2(-l.x,l.y)}}}function Bx(n,e){const t=document.createElement("canvas");t.width=t.height=64;const i=t.getContext("2d");i.font="bold 46px Arial, sans-serif",i.textAlign="center",i.textBaseline="middle",i.lineWidth=8,i.strokeStyle="rgba(255, 255, 255, 0.9)",i.strokeText(n,32,34),i.fillStyle=e,i.fillText(n,32,34);const r=new Hv(t);r.colorSpace=pn;const s=new Bv(new gh({map:r,depthTest:!1}));return s.scale.set(.55,.55,1),s.renderOrder=10,s}function Vx(n,e,t){const i=Math.abs(t.z)<.9?new R(0,0,1):new R(1,0,0),r=new R().crossVectors(i,t).normalize(),s=new R().crossVectors(t,r),a=new Float32Array(e.length*3),o=new Float32Array(e.length*3),l=new Float32Array(e.length*2);e.forEach((u,d)=>{a.set([u.x,u.y,u.z],d*3),o.set([t.x,t.y,t.z],d*3),l.set([u.dot(r),u.dot(s)],d*2)});const c=new Lt;return c.setAttribute("position",new an(a,3)),c.setAttribute("normal",new an(o,3)),c.setAttribute("uv",new an(l,2)),c.setIndex(n.t),c}const _i=1e4;function ar(n){return Qs(n.h)}function Qs(n){const e=[];for(let t=0;t+2<n.length;t+=3)e.push(new R(n[t]/_i,n[t+1]/_i,n[t+2]/_i));return e}function Hx(n){const e=ar(n),t=n.t||[],i=new R,r=new R;let s=0;for(let a=0;a+2<t.length;a+=3)i.subVectors(e[t[a+1]],e[t[a]]),r.subVectors(e[t[a+2]],e[t[a]]),s+=i.cross(r).length()/2;return s}function xu(n){return new R(n[0]/_i,n[1]/_i,n[2]/_i)}function Gx(n,e){const t=new vh(new Lt().setFromPoints(n),e);return e.isLineDashedMaterial&&t.computeLineDistances(),t}const jx="#9aa0a6",Dh="#dfe2e5",Wx="verwijderde constructie",Xx=.01,$x=.76,Kx=.09,Yx=.02,ea={buren:{kleur:"#e8590c",tekst:"grenst aan de buren"},aor:{kleur:"#1864ab",tekst:"onverwarmde ruimte (AOR)"},kelder:{kleur:"#1864ab",tekst:"onverwarmde kelder"},sgr:{kleur:"#74c0fc",tekst:"sterk geventileerde ruimte (SGR)"},grond:{kleur:"#8c5a2b",tekst:"grenst aan grond"}};function cs(n){const e=/^#?([0-9a-f]{6})$/i.exec(n||"");if(!e)return"";const t=parseInt(e[1],16),[,i,r]=Jx([t>>16&255,t>>8&255,t&255].map(c=>qx(c/255))),s=Math.hypot(i,r),a=Math.atan2(r,i);if(s<Yx)return"#"+e[1].toLowerCase();let o=Kx,l;for(let c=0;c<40&&(l=Qx([$x,o*Math.cos(a),o*Math.sin(a)]),!l.every(u=>u>=-1e-4&&u<=1+1e-4));c++)o*=.95;return"#"+l.map(c=>Math.round(Zx(Math.min(Math.max(c,0),1))*255).toString(16).padStart(2,"0")).join("")}const qx=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4),Zx=n=>n<=.0031308?n*12.92:1.055*Math.pow(n,1/2.4)-.055;function Jx([n,e,t]){const i=Math.cbrt(.4122214708*n+.5363325363*e+.0514459929*t),r=Math.cbrt(.2119034982*n+.6806995451*e+.1073969566*t),s=Math.cbrt(.0883024619*n+.2817188376*e+.6299787005*t);return[.2104542553*i+.793617785*r-.0040720468*s,1.9779984951*i-2.428592205*r+.4505937099*s,.0259040371*i+.7827717662*r-.808675766*s]}function Qx([n,e,t]){const i=Math.pow(n+.3963377774*e+.2158037573*t,3),r=Math.pow(n-.1055613458*e-.0638541728*t,3),s=Math.pow(n-.0894841775*e-1.291485548*t,3);return[4.0767416621*i-3.3077115913*r+.2309699292*s,-1.2684380046*i+2.6097574011*r-.3413193965*s,-.0041960863*i-.7034186147*r+1.707614701*s]}function Nh(n,e=new Set){const t=new Set((n.objecten||[]).filter(u=>u.buiten_berekening).map(u=>u.id)),i=[],r=[],s=(u,d)=>{let p=u.indexOf(d);return p<0&&(p=u.push(d)-1),p},a=[],o=[];for(const u of n.vlakken||[]){const d=rM(u);if(!d)continue;const p=u.zone>=0?u.zone:-1,f=kh(u,e,t),g={h:d.punten.flatMap(m=>[gr(m.x),gr(m.y),gr(m.z)]),t:d.driehoeken,n:d.normaal.toArray().map(m=>+m.toFixed(4)),k:s(i,f?Dh:cs(n.zones?.[p]?.kleur)||jx)},_=ea[u.begrenzing];t.has(u.object)?g.o=1:_&&!f&&(g.a=s(r,_.kleur)),a.push(g),o.push(u.id)}const l=iM(n),c=tM(n);return{gebouw:{v:a,kl:i,ak:r,nr:[+l.x.toFixed(4),+l.y.toFixed(4)],vr:[+c.x.toFixed(4),+c.y.toFixed(4)],vd:nM(n,c,t),l:eM(n,t,e)},ids:o}}function kh(n,e,t){return e.has(n.id)&&!t.has(n.object)}function Ih(n,e){const t=new Set((e?.koppen||[]).flatMap(r=>r.vlakken||[])),i=new Set;for(const r of n?.koppen||[])for(const s of r.vlakken||[])t.has(s)||i.add(s);return i}function Uh(n,e,t){const i=new Set((n.objecten||[]).filter(a=>a.buiten_berekening).map(a=>a.id)),r=new Map((n.vlakken||[]).map(a=>[a.id,a])),s=[];return e.forEach((a,o)=>{const l=r.get(a);l&&t.has(a)&&!i.has(l.object)&&l.begrenzing!=="buren"&&s.push(o)}),s}function eM(n,e,t=new Set){const i=new Set,r=new Set;let s=!1,a=!1;for(const o of n.vlakken||[]){if(e.has(o.object)){s=!0;continue}if(kh(o,t,e)){a=!0;continue}i.add(o.zone),r.add(o.begrenzing)}return{t:n.project?.titel||"",z:[...(n.zones||[]).filter(o=>i.has(o.index)&&o.soort!=="geen installatie").map(o=>[o.label,cs(o.kleur)]),...a?[[Wx,Dh]]:[]],b:s?1:0,a:Object.keys(ea).filter(o=>r.has(o)).map(o=>[ea[o].tekst,ea[o].kleur])}}function tM(n){const e=n.project?.frontFacadeBearing,t=new pe;if(e!=null)for(const i of n.vlakken||[])i.soort==="gevel"&&i.azimut!=null&&Math.abs((i.azimut-e+540)%360-180)<1&&(t.x+=i.normaal[0],t.y+=i.normaal[1]);return t.lengthSq()<1e-6&&t.set(0,-1),t.normalize()}function nM(n,e,t){const i=r=>{const s=ur(new R(e.x,e.y,0),r);let a=0;for(const o of n.vlakken||[]){if(o.begrenzing!=="buren"||!o.normaal||t.has(o.object))continue;const l=o.normaal[0]*s.x+o.normaal[1]*s.y+o.normaal[2]*s.z;l>0&&(a+=(o.oppervlakte||0)*l)}return a};return i(-Jn)<i(Jn)-Xx?-Jn:Jn}function iM(n){const e=(n.vlakken||[]).find(r=>r.azimut!=null);let t;e?t=Rt.radToDeg(Math.atan2(e.normaal[0],e.normaal[1]))-e.azimut:t=180-(n.project?.northAngle??180);const i=Rt.degToRad(t);return new pe(Math.sin(i),Math.cos(i))}function rM(n){const e=aM(n);if(e.length<3||!n.normaal)return null;const t=new R(...n.normaal).normalize(),{u:i,v:r}=sM(t),s=e.map(u=>new pe(u.dot(i),u.dot(r))),a=mr.triangulateShape(s,[]);if(a.length===0)return null;const o=new R,l=new R,c=[];for(const[u,d,p]of a)o.subVectors(e[d],e[u]),l.subVectors(e[p],e[u]),o.cross(l).dot(t)<0?c.push(u,p,d):c.push(u,d,p);return{punten:e,driehoeken:c,normaal:t}}function sM(n){const e=Math.abs(n.z)<.9?new R(0,0,1):new R(1,0,0),t=new R().crossVectors(e,n).normalize(),i=new R().crossVectors(n,t);return{u:t,v:i}}function aM(n){const e=(n.hoekpunten||[]).map(t=>new R(t[0],t[1],t[2]));return e.length>1&&e[0].distanceTo(e[e.length-1])<1e-9&&e.pop(),e}function gr(n){return Math.round(n*1e4)}function no(n){return[gr(n[0]),gr(n[1]),gr(n[2])]}function oM(n,e,t,i,r=new Set){const{gebouw:s,ids:a}=Nh(n,r),o=new Map(a.map((f,g)=>[f,g])),l=[],c=new Map,u=a.map(()=>-1),d=(e.koppen||[]).map((f,g)=>{if(!c.has(f.zone)){const m=(n.zones||[]).find(h=>h.index===f.zone);c.set(f.zone,l.push([m?.label||`Zone ${f.zone+1}`,cs(m?.kleur)])-1)}const _=Nl(f,o);for(const m of _.i)u[m]<0&&(u[m]=g);return{...t(f),..._,z:c.get(f.zone)}}),p=new Set((e.koppen||[]).flatMap(f=>f.vlakken||[]));return{g:s,d:i,z:l,k:d,c:Uh(n,a,p),w:u}}function Nl(n,e){const t=(n?.vlakken||[]).map(o=>e.get(o)).filter(o=>o!=null),i=n?.rijen||[],r=new Map;i.forEach((o,l)=>{if(Mu(o))for(const c of o.tekening.maatlijnen){const u=[Su(c.van),Su(c.naar)].sort().join("|")+`|${Math.round(c.waarde*100)}|${c.gehalveerd?1:0}`,d=r.get(u);d?(d.r.push(l),d.rand=d.rand||!!c.rand,d.f=d.f&&io(o)):r.set(u,{p:no(c.van),q:no(c.naar),w:lM(c.waarde)+(c.gehalveerd?" (/2)":""),rand:!!c.rand,f:io(o),r:[l]})}});const s=[...r.values()].map(o=>({p:o.p,q:o.q,w:o.w,s:o.f&&!o.rand?1:0,f:o.f?1:0,r:o.r})),a=[];return i.forEach((o,l)=>{if(!Mu(o))return;const c=(o.tekening.omtrek||[]).filter(u=>u?.length).map(u=>u.flatMap(no));a.push({r:l,f:io(o)?1:0,p:c})}),{i:t,m:s,e:a}}function Mu(n){return!!n&&!n.aangepast&&!n.strook&&Array.isArray(n.tekening?.maatlijnen)}function io(n){return n.b<0||n.uitkomst<0}function Su(n){return n.map(e=>Math.round(e*1e4)).join(",")}function lM(n){const e=Math.round(Math.abs(n)*100+1e-6);return`${Math.floor(e/100)}.${String(e%100).padStart(2,"0")}`.replace(/0+$/,"").replace(/\.$/,"")}const cM=1e3,uM=250,yu=[["normalen","AO: normalen"],["ao","AO: monsters"],["vervagen","AO: vervagen"],["model","Model + schaduw"],["kompas","Kompas"],["overlay","Labels (CPU)"]];function hM(n,e){const t=n.prestatie,i=window.devicePixelRatio;let r=[],s=null;const a=document.createElement("div");a.className="viewer-prestatie hidden",a.innerHTML=`
        <div class="prestatie-kop">Prestatie</div>
        <div class="prestatie-regel prestatie-groot"><span>Beelden/s</span><span data-v="fps">—</span></div>
        <div class="prestatie-regel"><span>Per beeld</span><span data-v="totaal">—</span></div>
        <div class="prestatie-stappen"></div>
        <div class="prestatie-regel"><span>Resolutie</span><span data-v="maat"></span></div>
        <div class="prestatie-regel"><span>Tekenopdrachten</span><span data-v="opdr">—</span></div>
        <div class="prestatie-regel"><span>Driehoeken</span><span data-v="drie">—</span></div>
        <div class="prestatie-gpu" data-v="gpu"></div>
        <div class="prestatie-knoppen">
            <label><input type="checkbox" data-k="ao" checked> AO + randen</label>
            <label><input type="checkbox" data-k="schaduw" checked> Schaduw</label>
            <label><input type="checkbox" data-k="ratio" checked> Volle resolutie (×${i})</label>
            <button type="button" class="viewer-knop" data-k="draai" aria-pressed="false">Draaien</button>
        </div>`,e.appendChild(a);const o=_=>a.querySelector(`[data-v="${_}"]`),l=a.querySelector(".prestatie-stappen"),c={};for(const[_,m]of yu){const h=document.createElement("div");h.className="prestatie-stap",h.innerHTML=`<span>${m}</span><span class="prestatie-balk"><span></span></span><span class="prestatie-ms">—</span>`,l.appendChild(h),c[_]={balk:h.querySelector(".prestatie-balk > span"),ms:h.querySelector(".prestatie-ms")}}const u=_=>a.querySelector(`[data-k="${_}"]`);u("ao").addEventListener("change",_=>t.zetAfwerking(_.target.checked)),u("schaduw").addEventListener("change",_=>t.zetSchaduw(_.target.checked)),u("ratio").addEventListener("change",_=>t.zetPixelRatio(_.target.checked?i:1)),u("draai").addEventListener("click",()=>d(u("draai").getAttribute("aria-pressed")!=="true"));function d(_){const m=u("draai");m.setAttribute("aria-pressed",String(_)),m.classList.toggle("viewer-knop--aan",_),t.draai(_)}function p(_){r.push({tijd:performance.now(),..._})}function f(){const _=performance.now();r=r.filter(F=>_-F.tijd<=cM);const m=t.bufferMaat();o("maat").textContent=`${m.x} × ${m.y} px (×${t.pixelRatio})`;const h=r.length;if(h===0){o("fps").textContent="— (stilstand)";return}const y=F=>r.reduce((P,L)=>P+F(L),0)/h;o("fps").textContent=h>1?String(h):"—";const M=y(F=>F.totaal);o("totaal").textContent=`${M.toFixed(1)} ms (max. ${Math.round(1e3/M)} /s)`;for(const[F]of yu){const P=y(L=>L.stappen[F]||0);c[F].ms.textContent=P?P.toFixed(1):"—",c[F].balk.style.width=`${Math.min(100,P/M*100).toFixed(0)}%`}const x=r[h-1];o("opdr").textContent=String(x.tekenopdr),o("drie").textContent=x.driehoeken.toLocaleString("nl-NL")}function g(_){if(a.classList.toggle("hidden",!_),clearInterval(s),s=null,_)o("gpu").textContent=t.gpu(),t.meet(p),s=setInterval(f,uM),n.render(),f();else{t.meet(null),d(!1);for(const m of["ao","schaduw","ratio"])u(m).checked=!0;t.zetAfwerking(!0),t.zetSchaduw(!0),t.pixelRatio!==i&&t.zetPixelRatio(i),r=[]}}return{zetZichtbaar:g}}function dM(n){return new Map((n||[]).map((e,t)=>[e,t]))}function Ur(n,e){return(n||[]).map(t=>e.get(t)).filter(t=>t!=null)}function fM(n){const e=new Map;for(const t of n?.koppen||[])for(const i of t.vlakken||[])e.has(i)||e.set(i,t);return e}function pM(n,e){const t=new Map;return(n||[]).map(i=>{const r=e.get(i);return r?(t.has(r)||t.set(r,t.size),t.get(r)):-1})}function mM(n){const e=[];for(const t of n||[]){const i=e[e.length-1];i&&i.zone===t.zone?i.koppen.push(t):e.push({zone:t.zone,koppen:[t]})}return e}function ll(n){return(n.rijen||[]).length>=2?"meer":"een"}function gM(n){const e={alles:(n||[]).length,meer:0,een:0};for(const t of n||[])e[ll(t)]++;return e}function cl(n,e){return n[e]==null?"":is(n)===e?`${$t(n.vol)} / 2`:$t(n[e])}function _M(n){return!(n.aangepast||n.handmatig||n.concept||n.strook)}const vM={aor:"onverwarmd",sgr:"sterk geventileerd",kelder:"onverwarmde kelder"};function xM(n){return n.vlaktype==="kelderwand"?"grond (onder mv)":n.begrenzing==="grond"?Number(n.diepte)>0?"grond (onder mv)":"grond (boven mv)":vM[n.begrenzing]||n.begrenzing}function Oh(n){const e=[n.vlaktype];return n.windrichting&&e.push(n.windrichting),e.push(`${n.helling}°`),e.push(xM(n)),n.laag&&e.push(n.laag),e.join(" · ")}const MM=[{waarde:"alles",tekst:"Alles",titel:"Alle constructies"},{waarde:"meer",tekst:"Meer sommen",titel:"Alleen constructies met twee of meer sommen (met onderbouwing)"},{waarde:"een",tekst:"Eén som",titel:"Alleen constructies met één som (of alleen een totaal)"}],SM={a:"L",b:"B"};function kl(n){n.preventDefault(),document.activeElement?.blur?.()}function Hr({className:n="",titel:e,onClick:t,children:i}){return C.jsx("button",{type:"button",className:`v3d-kop-knop ${n}`,title:e,onMouseDown:kl,onClick:r=>{r.stopPropagation(),t(),r.currentTarget.blur()},children:i})}function yM({koppen:n,filter:e,onFilter:t,bewerkbaar:i,onKopToevoegen:r}){const s=gM(n);return C.jsx("div",{className:"v3d-koppen-kop",children:C.jsxs("div",{className:"v3d-koppen-balk",children:[i&&C.jsx(Hr,{className:"v3d-kop-knop--primair",titel:"Eigen constructie toevoegen (bv. een dakkapel); komt onder de geselecteerde constructie",onClick:r,children:"+ Constructie toevoegen"}),n.length>0&&C.jsxs("div",{className:"v3d-filter",children:[C.jsx("span",{className:"v3d-filter-icoon",children:C.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinejoin:"round","aria-hidden":"true",children:C.jsx("path",{d:"M3 4h18l-7 8.5V19l-4 2v-8.5z"})})}),MM.map(a=>C.jsxs("button",{className:"v3d-filter-knop",title:a.titel,"aria-pressed":e===a.waarde,onClick:o=>{t(a.waarde),o.currentTarget.blur()},children:[a.tekst,C.jsx("span",{className:"v3d-filter-aantal",children:s[a.waarde]})]},a.waarde))]})]})})}function Fh({rij:n,maat:e}){const t=n[`toeslag_${e}`];return t?C.jsxs("span",{className:`v3d-toeslag v3d-toeslag--${e}`,children:["+ ",$t(t)]}):null}function Eu({rij:n,maat:e}){const t=is(n)===e;return C.jsxs(C.Fragment,{children:[C.jsx("span",{className:`v3d-veld v3d-veld--${e}${t?" v3d-veld--half":""}`,children:cl(n,e)}),C.jsx(Fh,{rij:n,maat:e})]})}function bu({rij:n,maat:e,autoFocus:t,onInvoer:i,onFocus:r}){const s=cl(n,e),[a,o]=Re.useState(s),[l,c]=Re.useState(!1),u=Re.useRef(!1);Re.useEffect(()=>{o(s),c(!1)},[s]);const d=()=>{o(s),c(!1)};function p(g,_){const m=Jh(g.value);if(m===null||i(m)===!1){_?d():(c(!0),g.select());return}c(!1),o(cl(n,e))}const f=is(n)===e;return C.jsxs(C.Fragment,{children:[C.jsx("input",{type:"text",inputMode:"text",enterKeyHint:"done",autoComplete:"off",spellCheck:!1,autoFocus:t,className:`v3d-veld v3d-veld--${e}${f?" v3d-veld--half":""} v3d-invoer${l?" fout":""}`,"data-maat":e,placeholder:SM[e],value:a,onChange:g=>{o(g.target.value),c(!1)},onBlur:g=>{g.target.isConnected&&p(g.target,!0)},onKeyDown:g=>{g.key==="Enter"?(g.preventDefault(),p(g.currentTarget,!1)):g.key==="Escape"&&(g.stopPropagation(),d(),g.currentTarget.select())},onMouseDown:g=>{u.current=document.activeElement!==g.currentTarget},onMouseUp:g=>{u.current&&g.preventDefault(),u.current=!1},onFocus:g=>{g.currentTarget.select(),r()},onClick:g=>g.stopPropagation()}),C.jsx(Fh,{rij:n,maat:e})]})}function EM({kop:n,bewerkbaar:e,onHernoem:t,onFocus:i}){const r=Re.useRef(null);if(!e)return C.jsx("h3",{className:"v3d-kop-titel",children:n.label});const s=()=>{r.current.textContent=n.label};return C.jsx("h3",{ref:r,className:"v3d-kop-titel bewerkbaar",contentEditable:!0,suppressContentEditableWarning:!0,spellCheck:!1,title:"Klik om de naam te wijzigen",onFocus:i,onClick:a=>a.stopPropagation(),onKeyDown:a=>{a.key==="Enter"?(a.preventDefault(),a.currentTarget.blur()):a.key==="Escape"&&(a.stopPropagation(),s(),a.currentTarget.blur())},onBlur:a=>{const o=a.currentTarget.textContent.replace(/\s+/g," ").trim();if(!o){s();return}a.currentTarget.textContent=o,o!==n.label&&t(o)},onPaste:a=>{a.preventDefault(),document.execCommand("insertText",!1,a.clipboardData.getData("text/plain").replace(/\s+/g," "))},children:n.label},n.label)}function wu({rij:n,i:e,kop:t,bewerkbaar:i,rijenBewerk:r,actief:s,ontwikkelaar:a,autoFocus:o,onKies:l,onRijHover:c,onMaat:u,onWeg:d,onFocus:p}){const f=_M(n),g=n.b<0||n.uitkomst<0,_=[];n.vorm==="driehoek"&&_.push("Driehoek: basis × halve hoogte"),n.strook&&_.push("Strook van de 0,11-regel (naad met de buren); niet getekend in de 3D-weergave"),n.aangepast&&_.push("Aangepast: geen maatlijnen van de 3D-server"),n.handmatig&&_.push("Zelf toegevoegd: geen maatlijnen van de 3D-server");const m=["v3d-rij",s&&"actief",f&&"klikbaar",n.aangepast&&"aangepast",n.handmatig&&"handmatig",n.concept&&"concept"].filter(Boolean).join(" ");return C.jsxs("div",{className:m,"data-rij":e,title:_.join(`
`)||void 0,onClick:f?h=>{h.stopPropagation(),l(s?{kopId:t.id,rijIndex:null}:{kopId:t.id,rijIndex:e})}:h=>h.stopPropagation(),onPointerEnter:f?h=>{h.pointerType!=="touch"&&c({kop:t,rijIndex:e})}:void 0,onPointerLeave:f?h=>{h.pointerType!=="touch"&&c(null)}:void 0,children:[r&&C.jsx("button",{type:"button",className:"v3d-rij-weg",title:n.concept?"Nieuwe rij weggooien":"Rij verwijderen",onMouseDown:kl,onClick:h=>{h.stopPropagation(),d()},children:"×"}),C.jsx("span",{className:`v3d-rij-nr${g?" aftrek":""}${f?"":" leeg"}`,children:f?e+1:""}),i?C.jsx(bu,{rij:n,maat:"a",autoFocus:o,onInvoer:h=>u("a",h),onFocus:p}):C.jsx(Eu,{rij:n,maat:"a"}),C.jsx("span",{className:"v3d-teken",children:"*"}),i?C.jsx(bu,{rij:n,maat:"b",onInvoer:h=>u("b",h),onFocus:p}):C.jsx(Eu,{rij:n,maat:"b"}),C.jsx("span",{className:"v3d-uitkomst",children:n.concept?"= … m²":`= ${_n(n.uitkomst)} m²`}),a&&C.jsx("span",{className:"v3d-rij-ids",children:(n.vlakken||[]).join(" ")})]})}function bM({model:n,berekening:e,record:t,vergelijking:i,bewerkbaar:r,selectie:s,onKies:a,onRijHover:o,filter:l,onFilter:c,ontwikkelaar:u,meldingen:d,onActie:p,bevestig:f,onKopToevoegen:g,concept:_,onConcept:m}){const h=Re.useRef(null),y=e?.koppen||[];if(Re.useEffect(()=>{if(!s)return;h.current?.querySelector(`[data-kop-id="${CSS.escape(s.kopId)}"]`)?.scrollIntoView({block:"nearest"})},[s?.kopId]),!e)return C.jsx("div",{className:"v3d-koppen-leeg",children:"Nog geen berekening."});const M=w=>l==="alles"||ll(w)===l||s?.kopId===w.id,x=i?.verwijderdeKoppen||[];function F(w,H){s?.kopId===w.id&&s.rijIndex===H||a({kopId:w.id,rijIndex:w.rijen?.[H]?H:null})}function P(w,H,V,W){const $=w.rijen[H],X=V==="a"?W:us($.a),oe=V==="b"?W:us($.b),G=Zh(X,oe);return G.aCm===us($.a)&&G.bCm===us($.b)||p({soort:"rijMaten",kopId:w.id,rijIndex:H,aCm:X,bCm:oe}),!0}function L(w,H,V){const W={..._,[H]:V};return W.a==null||W.b==null?(m(W),!0):(p({soort:"rijToevoegen",kopId:w.id,aCm:W.a,bCm:W.b}),m(null),!0)}function D(w,H){s?.kopId===w.id&&a({kopId:w.id,rijIndex:null}),p({soort:"rijVerwijderen",kopId:w.id,rijIndex:H})}async function T(w){await f({tekst:`"${w.label}" terugzetten naar de berekening van de 3D-server? Je aanpassingen vervallen.`,knop:"Herstellen"})&&(_?.kopId===w.id&&m(null),s?.kopId===w.id&&a({kopId:w.id,rijIndex:null}),p({soort:"kopHerstellen",kopId:w.id}))}async function v(w){await f({tekst:`"${w.label}" verwijderen? `+(w.handmatig?"Dit is een eigen constructie: die is daarna weg.":'De constructie komt onderaan onder "Verwijderde constructies" en is daar terug te zetten.'),knop:"Verwijderen"})&&(_?.kopId===w.id&&m(null),s?.kopId===w.id&&a(null),p({soort:"kopVerwijderen",kopId:w.id}))}return C.jsxs(C.Fragment,{children:[C.jsx(yM,{koppen:y,filter:l,onFilter:c,bewerkbaar:r,onKopToevoegen:g}),C.jsxs("div",{className:"v3d-koppen-lijst",ref:h,children:[d.map((w,H)=>C.jsxs("div",{className:`v3d-koppen-melding${w.soort?` ${w.soort}`:""}`,children:[w.tekst,w.knop&&C.jsx("button",{type:"button",className:"v3d-kop-knop v3d-melding-knop",onClick:w.knop.actie,children:w.knop.tekst})]},H)),y.length>0&&y.every(w=>(w.rijen||[]).length===0)&&C.jsx("div",{className:"v3d-koppen-melding",children:"De 3D-server levert nog geen opdeling in rijen; per constructie staat alleen het totaal."}),y.length===0&&C.jsx("div",{className:"v3d-koppen-leeg",children:"Geen constructies in deze berekening."}),mM(y).map((w,H)=>{if(!w.koppen.some(M))return null;const V=n?.zones?.find($=>$.index===w.zone),W=cs(V?.kleur);return C.jsxs("section",{className:"v3d-zoneblok",style:W?{"--zonekleur":W}:void 0,children:[C.jsxs("div",{className:"v3d-zone",children:[W&&C.jsx("span",{className:"legenda-kleur",style:{background:W}}),V?.label||`Zone ${w.zone+1}`]}),w.koppen.filter(M).map($=>{const X=s?.kopId===$.id,oe=l!=="alles"&&ll($)!==l,G=i?.perKop.get($.id)||null,de=r&&qh(t,$),se=$.rijen||[],me=de&&_?.kopId===$.id,Ae=["v3d-kop",X&&s.rijIndex==null&&"actief",X&&"geselecteerd",oe&&"buiten-filter",G?.aangepast&&"aangepast"].filter(Boolean).join(" ");return C.jsxs("div",{"data-kop-id":$.id,className:Ae,onClick:()=>a(X&&s.rijIndex==null?null:{kopId:$.id,rijIndex:null}),onMouseDown:Be=>{Be.target===Be.currentTarget&&kl(Be)},children:[C.jsxs("div",{className:"v3d-kop-kopregel",children:[C.jsx(EM,{kop:$,bewerkbaar:r,onHernoem:Be=>p({soort:"kopHernoemen",kopId:$.id,label:Be}),onFocus:()=>{X&&s.rijIndex==null||a({kopId:$.id,rijIndex:null})}}),G?.aangepast&&C.jsx("span",{className:`v3d-kop-badge${G.handmatig?" eigen":""}`,title:G.oudLabel?`Naam van de 3D-server: ${G.oudLabel}`:void 0,children:G.handmatig?"eigen constructie":"aangepast"})]}),C.jsx("div",{className:"v3d-kop-sleutel",children:Oh($)}),u&&C.jsx("div",{className:"v3d-kop-ids",children:($.vlakken||[]).join(" ")||"geen vlak-id's"}),r&&C.jsxs("div",{className:"v3d-kop-knoppen",children:[de&&C.jsx(Hr,{titel:"Nieuwe rij L * B (negatieve B = aftrekken)",onClick:()=>{me||m({kopId:$.id,a:null,b:null})},children:"+ Rij toevoegen"}),G?.aangepast&&!G.handmatig&&C.jsx(Hr,{className:"v3d-kop-knop--herstel",titel:"Deze constructie terugzetten naar de berekening van de 3D-server",onClick:()=>T($),children:"Herstellen"}),C.jsx(Hr,{className:"v3d-kop-knop--weg",titel:"Deze constructie uit de berekening halen",onClick:()=>v($),children:"- Constructie verwijderen"})]}),(se.length>0||me)&&C.jsxs("div",{className:`v3d-kop-rijen${de?" met-weg":""}`,children:[se.map((Be,Q)=>C.jsx(wu,{rij:Be,i:Q,kop:$,bewerkbaar:r,rijenBewerk:de,actief:X&&s.rijIndex===Q,ontwikkelaar:u,onKies:a,onRijHover:o,onMaat:(he,xe)=>P($,Q,he,xe),onWeg:()=>D($,Q),onFocus:()=>F($,Q)},Q)),me&&C.jsx(wu,{rij:{a:_.a!=null?_.a/100:null,b:_.b!=null?_.b/100:null,concept:!0},i:se.length,kop:$,bewerkbaar:!0,rijenBewerk:!0,actief:!1,ontwikkelaar:!1,autoFocus:!0,onKies:a,onRijHover:o,onMaat:(Be,Q)=>L($,Be,Q),onWeg:()=>m(null),onFocus:()=>F($,se.length)},`concept-${se.length}`)]}),G?.verwijderdeRijen>0&&C.jsx("div",{className:"v3d-kop-verwijderd",children:G.verwijderdeRijen===1?"1 rij van de 3D-server verwijderd":`${G.verwijderdeRijen} rijen van de 3D-server verwijderd`}),C.jsxs("div",{className:"v3d-kop-totaal",children:["Totaal: ",_n($.totaal)," m²"]})]},$.id)})]},H)}),x.length>0&&C.jsxs("details",{className:"v3d-koppen-verwijderd",children:[C.jsxs("summary",{children:["Verwijderde constructies (",x.length,")"]}),x.map(w=>C.jsxs("div",{className:"v3d-koppen-verwijderd-regel",children:[C.jsxs("span",{children:[w.label," — ",_n(w.totaal)," m²"]}),r&&C.jsx(Hr,{titel:"Deze constructie van de 3D-server terugzetten op zijn plek",onClick:()=>p({soort:"kopTerugzetten",kopId:w.id}),children:"Terugzetten"})]},w.id))]})]})]})}const ro=(n,e,t)=>`${n} ${n===1?e:t}`;function wM({selectie:n,anker:e,ids:t,shift:i,toevoegen:r,volgorde:s}){const a=new Set(n);if(i&&e!=null&&t.length===1){const[o,l]=[s.indexOf(e),s.indexOf(t[0])].sort((c,u)=>c-u);r||a.clear();for(const c of s.slice(o,l+1))a.add(c)}else if(r){const o=t.every(l=>a.has(l));for(const l of t)o?a.delete(l):a.add(l)}else{const o=a.size===t.length&&t.every(l=>a.has(l));if(a.clear(),!o)for(const l of t)a.add(l)}return{selectie:a,anker:t.length===1?t[0]:e}}const so=n=>n.status==="gekoppeld"||n.status==="voorstel"?n.kopId:null;function TM({koppen:n,kandidaten:e,waarde:t,leeg:i,titel:r,onKies:s}){const a=n.filter(o=>e.includes(o.id));return C.jsxs("select",{className:"koz-doel",value:t,title:r,onChange:o=>{o.target.value&&s(o.target.value)},children:[t===""&&C.jsx("option",{value:"",children:i}),a.length>0&&C.jsx("optgroup",{label:"Zelfde naam",children:a.map(o=>C.jsx("option",{value:o.id,children:o.label},o.id))}),C.jsx("optgroup",{label:"Alle gevels en daken",children:n.map(o=>C.jsx("option",{value:o.id,children:o.label},o.id))}),C.jsx("option",{value:po,children:"niet meenemen"})]})}function AM({status:n,handmatig:e=!1}){const t=Zr[n];return t?.blokkeert?C.jsx("span",{className:"koz-teken koz-teken--fout",title:t.tekst,children:"⚠"}):e?C.jsx("span",{className:"koz-teken koz-teken--handmatig",title:n==="niet"?"Handmatig: niet meenemen":"Handmatig gekozen",children:"✎"}):n==="niet"?C.jsx("span",{className:"koz-teken koz-teken--niet",title:t.tekst,children:"—"}):C.jsx("span",{className:"koz-teken"})}function RM({kop:n,model:e}){const t=n?e?.zones?.find(r=>r.index===n.zone):null,i=t?cs(t.kleur)||t.kleur:"";return i?C.jsx("span",{className:"koz-zone",style:{background:i},title:t.label}):C.jsx("span",{className:"koz-zone koz-zone--leeg"})}function CM({stand:n,koppeling:e,berekening:t,model:i,blokkade:r,heeftKozijnen:s,selectie:a,terug:o,onSelecteer:l,onZetSelectie:c,onWisSelectie:u,onAanwijzen:d,onKoppeling:p}){const f=Re.useRef(null),g=Re.useRef(!1);Re.useEffect(()=>{const D=()=>{f.current=null};return window.addEventListener("pointerup",D),window.addEventListener("pointercancel",D),()=>{window.removeEventListener("pointerup",D),window.removeEventListener("pointercancel",D)}},[]);function _(D,T){T.pointerType!=="mouse"||T.button!==0||T.shiftKey||T.ctrlKey||T.metaKey||T.target.closest("select")||(f.current={start:D,waarde:!a.has(D),gedaan:new Set([D])})}function m(D){const T=f.current;if(!T||T.gedaan.has(D))return;const v=T.gedaan.size===1&&!g.current?[T.start,D]:[D];T.gedaan.add(D),g.current=!0,c(v,T.waarde)}const h=()=>g.current?(g.current=!1,!0):!1,y=(t?.koppen||[]).filter(D=>Vu.includes(D.vlaktype)),M=new Map((t?.koppen||[]).map(D=>[D.id,D])),x=!r&&s&&n&&n.kozijnen.length>0,F=(D,T)=>{window.getSelection()?.removeAllRanges(),l(D,{shift:T.shiftKey,toevoegen:T.ctrlKey||T.metaKey})};function P(D){h()||D.target.closest(".koz-rij, .koz-blok-kop, select, button, label, .koz-fouten")||a.size&&u()}let L;return r?L=C.jsxs("div",{className:"v3d-koppen-melding",children:["Kozijnen koppelen kan nu niet: ",r,"."]}):!s||!n||n.kozijnen.length===0?L=C.jsx("div",{className:"v3d-koppen-melding",children:"Deze notitie heeft nog geen kozijnen."}):L=C.jsxs(C.Fragment,{children:[n.fouten.length>0&&C.jsx("ul",{className:"koz-fouten",children:n.fouten.map((D,T)=>C.jsx("li",{children:D},T))}),n.constructies.map(D=>{const T=D.precies&&D.kandidaten.length===1?D.kandidaten[0]:null,v=D.bron==="constructie"&&!["verloren","herzien"].includes(D.status)&&(D.status==="niet"?po:D.kopId)!==T;return C.jsxs("div",{className:"koz-blok",children:[C.jsxs("div",{className:"koz-blok-kop",title:"Tik: alle kozijnen van deze constructie selecteren",onClick:w=>F(D.kozijnen.map(H=>H.kozijn.id),w),onPointerEnter:w=>{w.pointerType==="mouse"&&d(so(D))},onPointerLeave:w=>{w.pointerType==="mouse"&&d(null)},children:[C.jsx("span",{}),C.jsx("span",{className:"koz-blok-naam",children:D.naam||"(zonder naam)"})]}),D.kozijnen.map(w=>{const H=w.kozijn,V=w.bron==="kozijn",W=!!Zr[w.status]?.blokkeert,$=a.has(H.id),X=w.status==="niet"?po:so(w)??"",oe={kies:`— kies (${w.kandidaten.length} mogelijk) —`,verloren:"— constructie bestaat niet meer —",herzien:"— opnieuw kiezen (nieuwe zone) —"}[w.status]||"— kies —";return C.jsxs("div",{"data-kozijn-id":H.id,className:`koz-rij${$?" koz--actief":""}${W?" koz--blokkeert":""}`,onPointerDown:G=>_(H.id,G),onClick:G=>{!h()&&!G.target.closest("select")&&F([H.id],G)},onPointerEnter:G=>{G.pointerType==="mouse"&&(m(H.id),d(w.kopId))},onPointerLeave:G=>{G.pointerType==="mouse"&&d(null)},children:[C.jsx(RM,{kop:M.get(so(w)),model:i}),C.jsx("span",{className:"koz-glas",title:H.glas,children:H.glas}),C.jsx("span",{className:"koz-omschr",title:[H.glas,H.beschrijving].filter(Boolean).join(" · "),children:H.beschrijving||"—"}),C.jsx(TM,{koppen:y,kandidaten:w.kandidaten,waarde:X,leeg:oe,titel:w.status==="voorstel"?"Voorstel op naam":Zr[w.status]?.tekst??"",onKies:G=>p(Hu(e,n,[H.id],G))}),C.jsx(AM,{status:w.status,handmatig:V||v})]},H.id)})]},D.id)})]}),C.jsxs(C.Fragment,{children:[C.jsx("div",{className:"v3d-koppen-kop",children:C.jsxs("div",{className:"v3d-koppen-balk",children:[x&&C.jsx("div",{className:"koz-uitleg",children:"Tik een kozijn aan (Ctrl of Shift voor meer, of tik op de constructie voor al zijn kozijnen), dan op een gevel of dak in het model."}),C.jsx("div",{className:`koz-terugmelding${o?.fout?" koz-terugmelding--fout":""}`,children:o?.tekst||""})]})}),C.jsx("div",{className:"v3d-koppen-lijst",onPointerDownCapture:()=>{g.current=!1},onClick:P,children:L})]})}function PM(n){return Ws({label:"",zone:n?String(n.zone):"",gebouwdeel:n?String(n.gebouwdeel):"",vlaktype:n?.vlaktype||"",begrenzing:n?.begrenzing||"buiten",windrichting:n?n.windrichting??"-":"",helling:n?String(n.helling):"",laag:n?.laag||""})}function LM({model:n,berekening:e,basis:t,id:i,onToevoegen:r,onAnnuleer:s}){const[a,o]=Re.useState(()=>PM(t)),[l,c]=Re.useState(null),{vasteHelling:u,vasteRichting:d,hellingBereik:p,richtingen:f}=Qh(a),g=y=>M=>{const x=M.target.value;o(F=>Ws(F,y,x)),c(null)},_=y=>{const M=y.target.value;o(x=>({...x,helling:M})),c(null)},m=()=>o(y=>Ws(y,"helling",y.helling));function h(y){y.preventDefault();const M=Ws(a,"helling",a.helling);o(M);const x=id(M,i);if(x.fout){c(x.fout);return}r(x.kop)}return C.jsx("div",{className:"dialog-overlay",onMouseDown:s,children:C.jsxs("form",{className:"dialog v3d-kop-dialoog",onMouseDown:y=>y.stopPropagation(),onSubmit:h,onKeyDown:y=>{y.key==="Escape"&&(y.stopPropagation(),s())},noValidate:!0,children:[C.jsx("h3",{children:"Constructie toevoegen"}),C.jsxs("div",{className:"v3d-kop-form-velden",children:[C.jsx("label",{htmlFor:"kop-label",children:"Naam"}),C.jsx("input",{id:"kop-label",type:"text",spellCheck:!1,autoComplete:"off",autoFocus:!0,placeholder:"bv. Gevel dakkapel",value:a.label,onChange:g("label")}),C.jsx("label",{htmlFor:"kop-zone",children:"Zone"}),C.jsxs("select",{id:"kop-zone",value:a.zone,onChange:g("zone"),children:[C.jsx("option",{value:"",children:"— kies —"}),ed(n,e).map(([y,M])=>C.jsx("option",{value:String(y),children:M},y))]}),C.jsx("label",{htmlFor:"kop-gebouwdeel",children:"Gebouwdeel"}),C.jsxs("select",{id:"kop-gebouwdeel",value:a.gebouwdeel,onChange:g("gebouwdeel"),children:[C.jsx("option",{value:"",children:"— kies —"}),(n?.gebouwdelen||[]).map(y=>C.jsx("option",{value:String(y.index),children:y.naam},y.index))]}),C.jsx("label",{htmlFor:"kop-vlaktype",children:"Vlaktype"}),C.jsxs("select",{id:"kop-vlaktype",value:a.vlaktype,onChange:g("vlaktype"),children:[C.jsx("option",{value:"",children:"— kies —"}),td.map(y=>C.jsx("option",{value:y,children:y},y))]}),C.jsx("label",{htmlFor:"kop-begrenzing",children:"Begrenzing"}),C.jsxs("select",{id:"kop-begrenzing",value:a.begrenzing,onChange:g("begrenzing"),disabled:a.vlaktype==="kelderwand",children:[!a.vlaktype&&C.jsx("option",{value:"",children:"— kies —"}),nd(a.vlaktype).map(([y,M])=>C.jsx("option",{value:y,children:M},y))]}),C.jsx("label",{htmlFor:"kop-windrichting",children:"Windrichting"}),C.jsxs("select",{id:"kop-windrichting",value:a.windrichting,onChange:g("windrichting"),disabled:d!=null,children:[C.jsx("option",{value:"",children:"— kies —"}),f.map(y=>C.jsx("option",{value:y,children:y==="HOR"?"HOR (plat dak)":y},y)),d==="-"&&C.jsx("option",{value:"-",children:"geen (n.v.t.)"})]}),C.jsx("label",{htmlFor:"kop-helling",children:"Helling (°)"}),C.jsx("input",{id:"kop-helling",type:"number",inputMode:"numeric",step:"1",min:p?.[0]??0,max:p?.[1]??90,placeholder:p?`${p[0]}–${p[1]}`:void 0,title:a.vlaktype==="gevel"?"Een gevel is steiler dan 75° en vlakker dan 165°":a.vlaktype==="dak"?"Een dak is 75° of minder; onder 15° is het een plat dak (HOR)":void 0,value:a.helling,onChange:_,onBlur:m,disabled:u!=null})]}),l&&C.jsx("div",{className:"v3d-kop-dialoog-fout",children:l}),C.jsxs("div",{className:"v3d-kop-form-knoppen",children:[C.jsx("button",{type:"button",className:"v3d-kop-knop",onClick:s,children:"Annuleren"}),C.jsx("button",{type:"submit",className:"v3d-kop-knop v3d-kop-knop--primair",children:"Toevoegen"})]})]})})}function DM(n,e){if(!e)return $t(n);const t=`(${$t(Math.abs(n))} + ${$t(e)})`;return n<0?`-${t}`:t}function Tu(n,e){return is(n)===e?`${$t(n.vol)} / 2`:DM(n[e],n[`toeslag_${e}`])}function NM(n){return`${Tu(n,"a")} * ${Tu(n,"b")} = ${_n(n.uitkomst)} m²`}function zh(n){return(n.rijen||[]).length>1}function kM(n){return`Totaal: ${(n.rijen||[]).map((t,i)=>i===0?_n(t.uitkomst):`${t.uitkomst<0?"-":"+"} ${_n(Math.abs(t.uitkomst))}`).join(" ")} = ${_n(n.totaal)} m²`}function IM(n){const e=[];let t=null;for(const i of(n.koppen||[]).filter(zh)){t!==null&&i.zone!==t&&e.push(""),t=i.zone,e.push(`${i.label}:`);for(const r of i.rijen)e.push(NM(r));e.push(kM(i)),e.push("")}for(;e.length&&e[e.length-1]==="";)e.pop();return e.length?e.join(`
`)+`
`:""}const Au=["zone","kop","vlaktype","begrenzing","windrichting","helling","rij","a","toeslag_a","b","toeslag_b","uitkomst","vorm","kop_totaal"];function sr(n){return n.replace(".",",")}function UM(n){const e=n==null?"":String(n);return/[;"\r\n]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function OM(n,e){const t=new Map((e?.zones||[]).map(r=>[r.index,r.label])),i=[Au.join(";")];return(n.koppen||[]).forEach((r,s)=>{s>0&&i.push("");const a={zone:t.get(r.zone)??"",kop:r.label,vlaktype:r.vlaktype,begrenzing:r.begrenzing,windrichting:r.windrichting??"",helling:r.helling??"",kop_totaal:sr(_n(r.totaal))},o=r.rijen||[],l=c=>{const u={...a,...c};i.push(Au.map(d=>UM(u[d])).join(";"))};o.length===0&&l({}),o.forEach((c,u)=>l({rij:u+1,a:sr($t(c.a)),toeslag_a:c.toeslag_a?sr($t(c.toeslag_a)):"",b:sr($t(c.b)),toeslag_b:c.toeslag_b?sr($t(c.toeslag_b)):"",uitkomst:sr(_n(c.uitkomst)),vorm:c.strook?"strook":c.vorm||"rechthoek"}))}),"\uFEFF"+i.join(`\r
`)+`\r
`}function FM(n){return{n:n.label,s:Oh(n),t:`Totaal: ${_n(n.totaal)} m²`,r:(n.rijen||[]).map((e,t)=>{const i=is(e),r={a:i==="a"?`${$t(e.vol)} / 2`:$t(e.a),b:i==="b"?`${$t(e.vol)} / 2`:$t(e.b),u:`= ${_n(e.uitkomst)} m²`};r.n=e.aangepast||e.handmatig||e.strook?0:t+1,(e.aangepast||e.handmatig)&&(r.g=1),(e.b<0||e.uitkomst<0)&&(r.f=1),(e.vlakken?.length||e.tekening)&&(r.c=1),e.toeslag_a&&(r.ta=`+ ${$t(e.toeslag_a)}`),e.toeslag_b&&(r.tb=`+ ${$t(e.toeslag_b)}`);const s=[];return e.vorm==="driehoek"&&s.push("Driehoek: basis × halve hoogte"),e.strook&&s.push("Strook van de 0,11-regel (naad met de buren); niet getekend in de 3D-weergave"),s.length&&(r.h=s.join(`
`)),r})}}function zM(n,e,t,i){const r=BM(rd(sd(JSON.stringify(i)),{level:9})),s={"/*CSS*/":e,"/*GEGEVENS*/":r,"/*SPELER*/":t};return n.replace(/\/\*(CSS|GEGEVENS|SPELER)\*\//g,a=>s[a])}function BM(n){let e="";for(let t=0;t<n.length;t+=32768)e+=String.fromCharCode.apply(null,n.subarray(t,t+32768));return btoa(e)}const VM=["begrenzing","rijen","vlakken","tekening","maatlijnen","hoekpunten","gebouwdel","objecten","verdieping","buiten_berekening","toeslag_","gehalveerd","frontFacade","northAngle","invoer_sha1","model_sha1","bron_id","motor"];function HM(n){const e=n.toLowerCase();return VM.filter(t=>e.includes(t.toLowerCase()))}function GM(n,e){return e.filter(t=>n.includes(JSON.stringify(String(t))))}const Ru=1600,Cu=1200,jM=1.2,WM=1.5,Pu=!1,ao=.92,XM=.45,$M=.5,KM=.3,YM=.05,qM=.92,Lu=[45,-45,-135,135],ZM=17;function JM(n,e,t,i){const r=n.intern,s=new Map((e.vlakken||[]).map(p=>[p.id,p])),a=t.map(p=>s.get(p));function o(p){const f=r.ontwikkelaar;let g;try{r.ontwikkelaar=!1;const _=Nl(p,i);n.lichtOp(_.i),n.toonMaatvoering(_,null,Pu);const m=c(_.i);g=d(_,m)}finally{r.ontwikkelaar=f}return Du(g)}function l(p){const f=r.ontwikkelaar;let g;try{r.ontwikkelaar=!1,n.wisOplichten(),n.wisMaatvoering();const _=ur(r.voorRichting,Lu[p]);g=d(null,_,m=>tS(m,r.legenda))}finally{r.ontwikkelaar=f}return Du(g)}function c(p){const f=new Set(p),g=u(p),_=g?[ur(g,Jn),ur(g,-Jn)]:Array.from({length:8},(v,w)=>ur(r.voorRichting,r.beginDraai-Math.sign(r.beginDraai)*w*45)),m=new Set([...f].map(v=>a[v]?.object)),h=v=>{const w=a[v];return!m.has(w?.object)||w?.begrenzing==="buren"},y=r.meshes,M=[...f].map(v=>y[v]).filter(Boolean),x=y.filter((v,w)=>!f.has(w)&&h(w)),F=a.filter((v,w)=>v&&!f.has(w)),P=new R;let L=0;for(const v of f)for(const w of r.deelPunten(v))P.add(w),L++;L&&P.divideScalar(L).sub(r.middelpunt);const D=_.map(v=>{const w=new R(v.x,v.y,0).normalize(),H=L?P.dot(w)/r.straal:0;return eS(M,x,F,v,r.straal*4)-KM*H}),T=Math.min(...D);return _[D.findIndex(v=>v<=T+YM)]}function u(p){const f=new R;let g=0,_=null;for(const m of p){const h=a[m];if(!h?.normaal)continue;const[y,M]=h.normaal,x=Math.hypot(y,M);if(x<.001)continue;const F=h.oppervlakte||0;f.x+=y*F,f.y+=M*F,g+=x*F,(!_||x*F>_.w)&&(_={w:x*F,x:y/x,y:M/x})}return _?f.length()<g/3?new R(_.x,_.y,0):f.normalize():null}function d(p,f,g=null){const _=Math.tan(Rt.degToRad(Vr)/2),m=_*Ru/Cu,h=[];for(const L of p?.i||[])h.push(...r.deelPunten(L));for(const L of p?.m||[])h.push(new R(...L.p).divideScalar(_i),new R(...L.q).divideScalar(_i));const y=Nu([...r.gebouwPunten,...h],f,m,_,ao),M=h.length?Nu(h,f,m,_,XM):null;let x=y.doel,F=y.afstand;M&&M.afstand<y.afstand&&(F=M.afstand,x=QM(y.doel,M.doel,h,f,F,m*ao,_*ao));const P=x.clone().addScaledVector(f,F);return n.maakBeeld({positie:P,doel:x},Ru,Cu,{schaalLabels:jM,schaalKompas:WM,rijnummers:Pu,extra:g})}return{renderKop:o,renderOverzicht:l,OVERZICHTEN:Lu.length}}function Du(n){return new Promise((e,t)=>n.toBlob(i=>i?e(i):t(new Error("JPEG kon niet worden gemaakt")),"image/jpeg",qM))}function Bh(n){const e=n.clone().negate(),t=new R().crossVectors(e,new R(0,0,1)).normalize(),i=new R().crossVectors(t,e);return{r:t,u:i}}function Nu(n,e,t,i,r){const{r:s,u:a}=Bh(e);let o=1/0,l=-1/0,c=1/0,u=-1/0;const d=new R;for(const _ of n){const m=_.dot(s),h=_.dot(a);m<o&&(o=m),m>l&&(l=m),h<c&&(c=h),h>u&&(u=h),d.add(_)}d.divideScalar(n.length);const p=d.clone().addScaledVector(s,(o+l)/2-d.dot(s)).addScaledVector(a,(c+u)/2-d.dot(a));let f=.5;const g=new R;for(const _ of n){g.subVectors(_,p);const m=g.dot(e);f=Math.max(f,Math.abs(g.dot(s))/(t*r)+m,Math.abs(g.dot(a))/(i*r)+m)}return{doel:p,afstand:f}}function QM(n,e,t,i,r,s,a){const{r:o,u:l}=Bh(i);let c=-1/0,u=1/0,d=-1/0,p=1/0;const f=new R;for(const m of t){f.subVectors(m,n);const h=r-f.dot(i);if(h<=0)return e;const y=f.dot(o),M=f.dot(l);c=Math.max(c,y-s*h),u=Math.min(u,y+s*h),d=Math.max(d,M-a*h),p=Math.min(p,M+a*h)}if(c>u||d>p)return e;const g=Math.min(Math.max(0,c),u),_=Math.min(Math.max(0,d),p);return n.clone().addScaledVector(o,g).addScaledVector(l,_)}const oo=new sl;function eS(n,e,t,i,r){let s=0,a=0;const o=new R,l=new R,c=new R,u=new R,d=new R,p=new R,f=i.clone().negate(),g=[[1/3,1/3],[2/3,1/6],[1/6,2/3],[1/6,1/6]];for(const y of n){const M=y.geometry.attributes.position,x=y.geometry.index,F=x?x.count:M.count;for(let P=0;P<F;P+=3){const L=x?x.getX(P):P,D=x?x.getX(P+1):P+1,T=x?x.getX(P+2):P+2;o.fromBufferAttribute(M,L),l.fromBufferAttribute(M,D),c.fromBufferAttribute(M,T),d.subVectors(l,o),p.subVectors(c,o);const v=d.clone().cross(p).length()/2/g.length;if(!(v<1e-6))for(const[w,H]of g){u.copy(o).addScaledVector(d,w).addScaledVector(p,H),oo.set(u.clone().addScaledVector(i,r),f),oo.far=r-.02;const V=new Set(oo.intersectObjects(e,!1).map(W=>W.object));s+=V.size*v,a+=v}}}const _=a>0?s/a:0;let m=0,h=0;for(const y of t){const M=y.normaal[0]*i.x+y.normaal[1]*i.y+y.normaal[2]*i.z;if(M<=0)continue;const x=(y.oppervlakte||0)*M;h+=x,y.begrenzing==="buren"&&(m+=x)}return _+$M*(h>0?m/h:0)}function tS(n,e){if(!e)return;const t=ZM,i=Math.round(t*1.55),r=Math.round(t*1.05),s=24,a=14,o=[...e.z.map(([h,y])=>({tekst:h,teken:(M,x)=>_(M,x,y,1)})),...e.b?[{tekst:"buiten berekening",teken:(h,y)=>_(h,y,Ph,ol,!0)}]:[],...e.a.map(([h,y])=>({tekst:h,teken:(M,x)=>m(M,x,y)}))],l=`bold ${t+3}px Arial, sans-serif`,c=`${t}px Arial, sans-serif`;n.save(),n.font=l;let u=n.measureText(e.t).width;n.font=c,u=Math.max(u,...o.map(h=>r+8+n.measureText(h.tekst).width));const p=((e.t?1:0)+o.length)*i+(o.length?6:0);n.fillStyle="rgba(255, 255, 255, 0.9)",n.strokeStyle="rgba(0, 0, 0, 0.15)",n.lineWidth=1,n.beginPath(),n.roundRect(s,s,u+2*a,p+2*a,8),n.fill(),n.stroke(),n.textBaseline="middle",n.fillStyle="#222";let f=s+a+i/2;const g=s+a;e.t&&(n.font=l,n.fillText(e.t,g,f),f+=i+6),n.font=c;for(const h of o)h.teken(g,f-r/2),n.fillStyle="#333",n.fillText(h.tekst,g+r+8,f),f+=i;n.restore();function _(h,y,M,x,F=!1){n.save(),n.globalAlpha=x,n.fillStyle=M,n.fillRect(h,y,r,r),n.globalAlpha=1,n.strokeStyle="rgba(0, 0, 0, 0.45)",F&&n.setLineDash([3,2]),n.strokeRect(h+.5,y+.5,r-1,r-1),n.restore()}function m(h,y,M){n.save(),n.fillStyle="#fff",n.fillRect(h,y,r,r),n.beginPath(),n.rect(h,y,r,r),n.clip(),n.strokeStyle=M,n.lineWidth=1.5;for(let x=-r;x<r;x+=5)n.beginPath(),n.moveTo(h+x,y+r),n.lineTo(h+x+r,y),n.stroke();n.restore(),n.save(),n.strokeStyle="rgba(0, 0, 0, 0.45)",n.strokeRect(h+.5,y+.5,r-1,r-1),n.restore()}}const nS="labelwise-project",iS="1.0",rS={objecttype:"RESIDENTIAL",bouwfase:"EXISTING_BUILDING",opname:"BASIC",type_opname:"RESIDENTIAL_BASIC",enkele_opname:!0},ku={N:"NORTH(0)",NO:"NORTH_EAST(45)",O:"EAST(90)",ZO:"SOUTH_EAST(135)",Z:"SOUTH(180)",ZW:"SOUTH_WEST(225)",W:"WEST(270)",NW:"NORTH_WEST(315)"},ul={N:0,NO:45,O:90,ZO:135,Z:180,ZW:225,W:270,NW:315},sS={buiten:"OUTSIDE",aor:"UNHEATED_ZONE",kelder:"UNHEATED_ZONE",sgr:"STRONGLY_VENTILATED_SPACE",kruipruimte:"CRAWL_SPACE",buren:"HEATED_ZONE",grond:"GROUND"},lo={FACADE:"gevel",ROOF_SLOPED:"hellend dak",ROOF_FLAT:"plat dak",FLOOR:"vloer",OUTSIDE:"buitenlucht",UNHEATED_ZONE:"AOR",STRONGLY_VENTILATED_SPACE:"sterk geventileerd",CRAWL_SPACE:"kruipruimte",HEATED_ZONE:"verwarmde ruimte",GROUND:"grond",FRONT_FACADE:"voorgevel",REAR_FACADE:"achtergevel",LEFT_FACADE:"linkergevel",RIGHT_FACADE:"rechtergevel",ROOFS:"daken",FLOORS:"vloeren"},Iu=15,aS=15,oS={FACADE:"Gevel",ROOF_SLOPED:"Hellend dak",ROOF_FLAT:"Plat dak",FLOOR:"Vloer"};function In(n){return Math.sign(n)*Math.round(Math.abs(n)*100+1e-9)/100}function lS(n){if(n?.soort!=="zone")return null;const e=/^RZ-(\d+)$/.exec(String(n.label??"").trim()),t=e?Number(e[1]):0;return t>=1?t:null}function Vh(n,e){let t=((n-e)%360+360)%360;return t>180&&(t-=360),t}function Hh(n,e){return Math.atan2(n,e)*180/Math.PI}function cS(n){for(const e of n?.vlakken||[]){if(e.azimut==null||!e.normaal)continue;const[t,i]=e.normaal;if(!(Math.hypot(t,i)<.5))return Vh(e.azimut,Hh(t,i))}return null}function uS(n,e){let t=0,i=0,r=0,s=null;for(const a of n.vlakken||[]){const o=e.get(a);if(!o?.normaal)continue;const[l,c]=o.normaal,u=Math.hypot(l,c);if(u<.001)continue;const d=o.oppervlakte||0;t+=l*d,i+=c*d,r+=u*d,(!s||u*d>s.w)&&(s={w:u*d,x:l,y:c})}return s?Math.hypot(t,i)<r/3?{x:s.x,y:s.y}:{x:t,y:i}:null}function hS(n,e,t){const i=uS(n,e);return i&&t!=null?(Hh(i.x,i.y)+t+360)%360:n.windrichting in ul?ul[n.windrichting]:null}function dS(n,e){const t=Vh(n,e),i=.5;return Math.abs(t)<=45+i?"FRONT_FACADE":Math.abs(t)>=135-i?"REAR_FACADE":t>0?"LEFT_FACADE":"RIGHT_FACADE"}function fS(n,e){const t=(n.vlakken||[]).map(i=>e.get(i)).filter(Boolean);return t.length>0&&t.every(i=>(i.hoekpunten||[]).every(r=>r[2]<0))}function pS(n){if(n.windrichting in ul)return!0;if(n.windrichting==="HOR")return!1;const e=Number(n.helling);return n.helling!=null&&Number.isFinite(e)&&e>=aS}function mS(n){switch(n.vlaktype){case"vloer":case"vloer boven buitenlucht":return"FLOOR";case"gevel":case"kelderwand":return"FACADE";case"dak":return pS(n)?"ROOF_SLOPED":"ROOF_FLAT";default:return null}}function Il(n){const e=Number(n.vlaktype==="kelderwand"?n.h1:n.diepte);return Number.isFinite(e)&&e>0?In(e):null}function gS(n){return n.vlaktype==="vloer"&&n.begrenzing==="grond"&&Il(n)!=null}function _S(n){if(n.vlaktype==="kelderwand")return{grenst_aan:"GROUND",handwerk:Il(n)!=null?"kelderwand: kies de vloer (gevel geïntegreerd in vloerconstructie)":"kelderwand: kies de vloer en de diepte onder maaiveld"};if(n.vlaktype==="vloer"&&n.begrenzing==="onbekend")return{grenst_aan:"GROUND",handwerk:'begrenzing onbekend: "grond" ingevuld, controleer'};const e=sS[n.begrenzing];return e?{grenst_aan:e}:null}const vS={hoofdhuis:"hoofd",aanbouw:"aanbouw",opbouw:"opbouw",dakkapel:"dakkapel"};function xS(n){const e=String(n??"").trim().toLowerCase().split(/[\s\-–_,]+/)[0];return vS[e]||null}function MS(n,e,t){const i=n.begrenzing==="aor"||n.begrenzing==="kelder",r=e==="ROOF_FLAT";if(n.vlaktype==="kelderwand")return{naam:"Kelderwand",twijfel:null};if(n.vlaktype==="vloer boven buitenlucht")return{naam:"Vloer - buiten",twijfel:null};if(n.vlaktype==="vloer"&&i)return{naam:"Vloer - AOR",twijfel:null};if(n.vlaktype==="vloer"&&(n.begrenzing==="onbekend"||gS(n)))return{naam:"Keldervloer",twijfel:null};if(n.vlaktype==="gevel"&&(i||n.grens))return{naam:"Gevel - AOR",twijfel:null};let s=xS(t),a=null;s||(s="hoofd",a=`gebouwdeel "${t??"?"}" heeft geen eigen constructie: die van het hoofdhuis gekozen, controleer`);const o={vloer:{hoofd:"Vloer",aanbouw:"Vloer aanbouw",opbouw:null,dakkapel:null},gevel:{hoofd:"Gevel",aanbouw:"Gevel aanbouw",opbouw:"Gevel opbouw",dakkapel:"Dakkapel gevels"},dak:{hoofd:r?"Dak plat":"Dak hellend",aanbouw:r?"Dak plat aanbouw":"Dak hellend aanbouw",opbouw:"Dak opbouw",dakkapel:"Dakkapel dak"}}[n.vlaktype];return o?o[s]?{naam:o[s],twijfel:a}:{naam:o.hoofd,twijfel:`geen ${n.vlaktype} voor gebouwdeel "${t}": die van het hoofdhuis gekozen, controleer`}:{naam:null,twijfel:null}}function SS(n,e,t,i,r){const s=oS[t],a=(i?.dicht||[]).filter(u=>u.bouwdeeltype===s),o=u=>a.find(d=>d.naam.toLowerCase()===String(u??"").toLowerCase())||null,l=o(e);if(l)return{constructie:l,twijfel:null};const c=MS(n,t,r);return{constructie:o(c.naam),twijfel:c.twijfel}}function yS(n){return[...n?.dicht||[],...n?.transparant||[]].map(e=>({...e,invoermethode:"beslisschema",ruw:{...e.ruw||{},auto_naam_boolean:!1}}))}const ES={Raam:"raam",Deur:"deur","Paneel in kozijn":"paneel_in_kozijn"},bS={"minimale belemmering":{invoer:"MINIMAL_OBSTRUCTION"},"overige belemmering":{invoer:"OTHER_OBSTRUCTION"},"constante overstek":{invoer:"MINIMAL_OBSTRUCTION",overstek:!0},"constante overstek & (zij)belemmering":{invoer:"D_LATERAL_OBSTRUCTION",overstek:!0,zij:!0}},co={links:"LEFT",rechts:"RIGHT",allebei:"BOTH_SIDES"},uo={"bb < 1,0":"BB_LESS_THAN_1.0","1,0 ≤ bb < 3,73":"BB_BETWEEN_1.0_AND_3.73","bb > 3,73":"BB_MORE_THAN_3.73"},wS={ZONW_GEEN:["NO_SUNSHADE"],ZONW_ROLW:["EXTERNAL_ALUMINUM_ROLLER_SHUTTERS","WHITE"],ZONW_ROLO:["EXTERNAL_ALUMINUM_ROLLER_SHUTTERS","OTHER_COLOR"],ZONW_ROLONB:["EXTERNAL_ALUMINUM_ROLLER_SHUTTERS","UNKNOWN"],ZONW_SCRW:["EXTERNAL_SCREENS","WHITE"],ZONW_SCRZ:["EXTERNAL_SCREENS","BLACK"],ZONW_SCRO:["EXTERNAL_SCREENS","OTHER_COLOR"],ZONW_SCRONB:["EXTERNAL_SCREENS","UNKNOWN"],ZONW_JALW:["EXTERNAL_BLINDS","WHITE"],ZONW_JALZ:["EXTERNAL_BLINDS","BLACK"],ZONW_JALO:["EXTERNAL_BLINDS","OTHER_COLOR"],ZONW_JALONB:["EXTERNAL_BLINDS","UNKNOWN"],ZONW_US:["RETRACTABLE_AWNING"],ZONW_KAS:["DROP_ARM_AWNING"],ZONW_GMW:["METALLIZED_FABRICS_INDOOR"],ZONW_HOR90:["FIXED_SLATS_HORIZONTAL_PERPENDICULAR"],ZONW_HORHOEK:["FIXED_SLATS_HORIZONTAL_OBLIQUE"],ZONW_HORDR:["FIXED_SLATS_HORIZONTAL_ADJUSTABLE"],ZONW_VAST:["FIXED_SUNSHADE"]},TS=["RETRACTABLE_AWNING","DROP_ARM_AWNING","EXTERNAL_SCREENS","EXTERNAL_BLINDS","METALLIZED_FABRICS_INDOOR","EXTERNAL_ALUMINUM_ROLLER_SHUTTERS","FIXED_SLATS_HORIZONTAL_ADJUSTABLE","FIXED_SLATS_HORIZONTAL_PERPENDICULAR"];function AS(n){const e={},t=[];if(!n.geen_beschaduwing){const s=bS[n.beschaduwing||"minimale belemmering"];s?(e.invoer_beschaduwing_option_shadinginput=s.invoer,s.overstek&&(e.overstek_boolean=!0,n.overstek_hoogte!=null&&n.overstek_afstand!=null?(e.overstek_hoogte_number=n.overstek_hoogte,e.overstek_afstand_number=n.overstek_afstand):t.push("overstek zonder hoogteverschil en afstand: zelf invullen")),s.zij&&(co[n.zij_kant]&&(e.zijbelemmering_option_lateralobstruction=co[n.zij_kant]),uo[n.zij_relatief]&&(e.relatieve_breedte_zijbelemmering_option_relativeobstruction=uo[n.zij_relatief]),(!co[n.zij_kant]||!uo[n.zij_relatief])&&t.push("zijbelemmering zonder kant of relatieve breedte: zelf invullen"))):(e.invoer_beschaduwing_option_shadinginput="MINIMAL_OBSTRUCTION",t.push(`beschaduwing "${n.beschaduwing}" bestaat niet in Label-wise: zelf invullen`))}const i=n.zonwering_code||(n.zonwering&&n.zonwering!=="geen zonwering"?null:"ZONW_GEEN"),r=wS[i];return r?(e.zonwering_option_sunshading=r[0],r[1]&&(e.zonwering_kleur_option_shadingcolor=r[1]),TS.includes(r[0])&&(e.zonwering_bediening_option_shadingobstruction="MANUAL_CONTROL"),i==="ZONW_VAST"&&t.push("vaste zonwering: g-waarden (ggl;alt, ggl;dif) zelf invullen")):(e.zonwering_option_sunshading="NO_SUNSHADE",t.push(`zonwering "${n.zonwering}" bestaat niet in Label-wise: zelf invullen`)),{ruw:e,meldingen:t}}function Yr(n){return Math.round(Number(n)*100+(n>=0?1e-9:-1e-9))}function RS(n,e){const t=e?.transparant||[],i=[],r=[],s=[];for(const a of n){const o=a.beschrijving||a.glas||`kozijn ${a.id}`,l=t.find(d=>d.naam.toLowerCase()===String(a.glas??"").trim().toLowerCase());if(!l){r.push(`kozijn "${o}": glas "${a.glas}" staat niet in de bibliotheek`);continue}if(!(a.A>0)){r.push(`kozijn "${o}": geen oppervlakte`);continue}const c={id:`dv-${a.id}`,naam:o,type:ES[l.bouwdeeltype]||"raam",aantal:1,oppervlakte_m2:In(a.A),constructie_id:l.id,ruw:{auto_naam_boolean:!1}},u=AS(a);Object.assign(c.ruw,u.ruw);for(const d of u.meldingen)s.push({kozijn:o,reden:d});a.L>0&&a.B>0&&Yr(In(a.L)*In(a.B))===Yr(a.A)&&(c.breedte_m=In(a.L),c.hoogte_m=In(a.B)),i.push(c)}return{deelvlakken:i,fouten:r,meldingen:s}}function CS(n,e,t={}){const{bibliotheek:i,projectnaam:r,bron:s}=t,a=t.kozijnen||new Map,o=[],l=new Set;let c=0;const u=new Map((e?.vlakken||[]).map(v=>[v.id,v])),d=cS(e),p=e?.project?.frontFacadeBearing,f=yS(i),g=new Map((e?.gebouwdelen||[]).map(v=>[v.index,v.naam])),_=new Map;for(const v of e?.zones||[]){const w=lS(v);w&&_.set(v.index,w)}const m=new Map,h=new Map,y=[],M=[],x=[];let F=0;for(const v of n?.koppen||[]){const w=String(v.label??"").replace(/^\(RZ-\d+\)\s*/,"").trim(),H=_.get(v.zone),V=H?`RZ${H}`:"?",W=ce=>y.push({zone:V,naam:w,reden:ce}),$=ce=>M.push({zone:V,naam:w,reden:ce});if(!H){W("hoort niet bij een rekenzone");continue}const X=mS(v);if(!X){W(`vlaktype "${v.vlaktype}" bestaat niet in Label-wise`);continue}const oe=_S(v);if(!oe){W(`begrenzing "${v.begrenzing}" bestaat niet in Label-wise`);continue}const G=v.rijen||[];if(G.length===0){W("geen sommen");continue}if(!(v.totaal>0)){W(`totaal ${v.totaal} m²`);continue}oe.handwerk&&$(oe.handwerk);const de=In(v.totaal),se={id:`hv-${++F}`,naam:w,bouwdeeltype:X,grenst_aan:oe.grenst_aan};if(X!=="FLOOR"&&X!=="ROOF_FLAT"&&v.windrichting in ku&&(se.orientatie=ku[v.windrichting]),X==="FLOOR")se.locatie="FLOORS";else if(X!=="FACADE")se.locatie="ROOFS";else{const ce=hS(v,u,d);ce!=null&&p!=null?se.locatie=dS(ce,p):(se.locatie="FRONT_FACADE",$("richting onbekend: bij de voorgevel gezet, controleer de locatie"))}let me;if(X==="FLOOR"||X==="ROOF_FLAT")me=0;else if(v.vlaktype==="kelderwand")me=90;else{const ce=v.helling==null||v.helling===""?NaN:Number(v.helling);me=Number.isFinite(ce)?ce:X==="FACADE"?90:null}if(me==null)$("helling onbekend: vul hem zelf in");else{const ce=Math.round(me/Iu)*Iu;ce!==me&&x.push({zone:V,naam:w,van:me,naar:ce}),se.hellingshoek_graden=ce}if(se.meetwijze=X==="ROOF_SLOPED"?"schuin":"horizontaal",se.vorm="rechthoek",se.bruto_oppervlakte_m2=de,se.netto_oppervlakte_m2=de,G.length===1){const ce=G[0],Ne=In(Math.abs(ce.a)+(ce.toeslag_a||0)),be=In(Math.abs(ce.b)+(ce.toeslag_b||0));In(Ne*be)===de&&(se.breedte_m=Ne,se.hoogte_of_lengte_m=be)}const{constructie:Ae,twijfel:Be}=SS(v,w,X,i,g.get(v.gebouwdeel));Ae?se.constructie_id=Ae.id:$("geen passende constructie in de bibliotheek: kies zelf (en maak hem aan)"),Be&&$(Be);const Q=Il(v),he=v.vlaktype==="vloer"&&(Q!=null||v.begrenzing==="kelder"&&fS(v,u));se.ruw={auto_naam_boolean:!1,...he?{vloer_onder_maaiveld_boolean:!0}:{},...Q!=null&&(v.vlaktype==="vloer"||v.vlaktype==="kelderwand")?{diepte_vloer_onder_maaiveld_number:Q}:{}};const xe=a.get(v.id)||[];if(xe.length){l.add(v.id);const ce=RS(xe,i);for(const be of ce.fouten)o.push({zone:V,naam:w,reden:be});for(const be of ce.meldingen)M.push({zone:V,naam:`${w} "${be.kozijn}"`,reden:be.reden});const Ne=ce.deelvlakken.reduce((be,Ve)=>be+Yr(Ve.oppervlakte_m2),0);Ne>Yr(de)&&o.push({zone:V,naam:w,reden:`kozijnen samen ${(Ne/100).toFixed(2)} m², groter dan de constructie (${de.toFixed(2)} m²)`}),se.netto_oppervlakte_m2=(Yr(de)-Ne)/100,se.deelvlakken=ce.deelvlakken,c+=ce.deelvlakken.length}m.has(H)||(m.set(H,[]),h.set(H,[])),m.get(H).push(se),h.get(H).push({naam:w,regel:PS(se,Ae,i)})}for(const[v,w]of a){if(!w.length||l.has(v))continue;const H=(n?.koppen||[]).find(V=>V.id===v);o.push({zone:"",naam:H?String(H.label??""):v,reden:`${w.length===1?"1 kozijn":`${w.length} kozijnen`} bij een constructie die niet naar Label-wise gaat`})}const P=[...new Set(_.values())].sort((v,w)=>v-w),L=[],D=[];for(const v of P){if(!m.has(v)){y.push({zone:`RZ${v}`,naam:"(hele zone)",reden:"geen constructies: Label-wise weigert een lege zone"});continue}L.push({naam:`RZ${v}`,externe_id:`rz${v}`,constructies:f,hoofdvlakken:m.get(v)}),D.push({naam:`RZ${v}`,vlakken:h.get(v)})}return{bestand:{meta:{formaat:nS,versie:iS,bron:s||"EPA Suite"},project:{projectnaam:r||"Nieuw project",...rS},rekenzones:L},zones:D,overgeslagen:y,handwerk:M,afgerond:x,fouten:o,deelvlakken:c}}function PS(n,e,t){const i=[n.naam,lo[n.bouwdeeltype]||n.bouwdeeltype,(lo[n.grenst_aan]||n.grenst_aan)+(n.orientatie?`, ${n.orientatie.replace(/\(.*$/,"")}`:""),lo[n.locatie]||n.locatie];n.hellingshoek_graden!=null&&i.push(`${n.hellingshoek_graden}°`),i.push(`${n.bruto_oppervlakte_m2} m²`+(n.breedte_m!=null?` (${n.breedte_m} × ${n.hoogte_of_lengte_m})`:"")+(n.deelvlakken?.length?`, netto ${n.netto_oppervlakte_m2} m²`:"")),i.push(e?e.naam:"(geen constructie)");const r=new Map((t?.transparant||[]).map(a=>[a.id,a.naam])),s=(n.deelvlakken||[]).map(a=>`      ${a.type}: ${a.naam} — ${r.get(a.constructie_id)??"?"} — `+(a.breedte_m!=null?`${a.breedte_m} × ${a.hoogte_m} = `:"")+`${a.oppervlakte_m2} m²`);return[i.join(" — "),...s].join(`
`)}const LS=["Vaste constructiebibliotheek voor de Label-wise-export (docs/plan-labelwise.md, besluit 7, 9 en 10).","= de Uniec3-template (docs/labelwise-proeven/img/uniec3-bibliotheek.png). Gaat in elk exportbestand mee, in elke rekenzone.","Velden zoals Label-wise ze importeert (proef 05/05b): bouwdeeltype in het Nederlands, invoermethode beslisschema, geen Rc/U/g.","Dicht: beslisschema zonder keuze, Joris vult ze per project in. Daken altijd Plat dak of Hellend dak (besluit 9):","Dakkapel dak en Dak opbouw staan er daarom twee keer in, met dezelfde naam en een ander type.","Welke constructie een kop krijgt: lwKiesConstructie in labelwise.js (op naam).","ruw.auto_naam_boolean false voegt labelwise.js zelf toe."],DS=1,NS=[{id:"bib-vloer",naam:"Vloer",bouwdeeltype:"Vloer"},{id:"bib-vloer-garage",naam:"Vloer - garage",bouwdeeltype:"Vloer"},{id:"bib-vloer-buiten",naam:"Vloer - buiten",bouwdeeltype:"Vloer"},{id:"bib-vloer-aor",naam:"Vloer - AOR",bouwdeeltype:"Vloer"},{id:"bib-keldervloer",naam:"Keldervloer",bouwdeeltype:"Vloer"},{id:"bib-gevel",naam:"Gevel",bouwdeeltype:"Gevel"},{id:"bib-gevel-aor",naam:"Gevel - AOR",bouwdeeltype:"Gevel"},{id:"bib-kelderwand",naam:"Kelderwand",bouwdeeltype:"Gevel"},{id:"bib-dak-hellend",naam:"Dak hellend",bouwdeeltype:"Hellend dak"},{id:"bib-dak-plat",naam:"Dak plat",bouwdeeltype:"Plat dak"},{id:"bib-dakkapel-gevels",naam:"Dakkapel gevels",bouwdeeltype:"Gevel"},{id:"bib-dakkapel-dak-plat",naam:"Dakkapel dak",bouwdeeltype:"Plat dak"},{id:"bib-dakkapel-dak-hellend",naam:"Dakkapel dak",bouwdeeltype:"Hellend dak"},{id:"bib-vloer-aanbouw",naam:"Vloer aanbouw",bouwdeeltype:"Vloer"},{id:"bib-gevel-aanbouw",naam:"Gevel aanbouw",bouwdeeltype:"Gevel"},{id:"bib-dak-plat-aanbouw",naam:"Dak plat aanbouw",bouwdeeltype:"Plat dak"},{id:"bib-dak-hellend-aanbouw",naam:"Dak hellend aanbouw",bouwdeeltype:"Hellend dak"},{id:"bib-gevel-opbouw",naam:"Gevel opbouw",bouwdeeltype:"Gevel"},{id:"bib-dak-opbouw-plat",naam:"Dak opbouw",bouwdeeltype:"Plat dak"},{id:"bib-dak-opbouw-hellend",naam:"Dak opbouw",bouwdeeltype:"Hellend dak"}],kS=[{id:"bib-hk-enkel",naam:"HK Enkel glas",bouwdeeltype:"Raam",kozijn:"WOOD_OR_PLASTIC",glas:"SINGLE_GLASS"},{id:"bib-hk-voorzetraam",naam:"HK voorzetraam",bouwdeeltype:"Raam",kozijn:"WOOD_OR_PLASTIC",glas:"COVER_GLASS"},{id:"bib-hk-dubbel",naam:"HK Dubbel glas",bouwdeeltype:"Raam",kozijn:"WOOD_OR_PLASTIC",glas:"DOUBLE_GLASS"},{id:"bib-hk-hr",naam:"HK HR glas",bouwdeeltype:"Raam",kozijn:"WOOD_OR_PLASTIC",glas:"HE_GLASS"},{id:"bib-hk-hrp",naam:"HK HR+ glas",bouwdeeltype:"Raam",kozijn:"WOOD_OR_PLASTIC",glas:"HE_PLUS_GLASS"},{id:"bib-hk-hrpp",naam:"HK HR++ glas",bouwdeeltype:"Raam",kozijn:"WOOD_OR_PLASTIC",glas:"HE_PLUS_PLUS_GLASS"},{id:"bib-hk-drievoudig",naam:"HK Drievoudig HR glas",bouwdeeltype:"Raam",kozijn:"WOOD_OR_PLASTIC",glas:"TRIPLE_HR_GLASS"},{id:"bib-deur-buiten",naam:"Niet geïsoleerde deur - BUITEN",bouwdeeltype:"Deur",isolatie_aanwezig:"INSULATION_ABSENT"},{id:"bib-deur-binnen",naam:"Niet geïsoleerde deur - BINNEN",bouwdeeltype:"Deur",isolatie_aanwezig:"INSULATION_ABSENT"},{id:"bib-paneel-zonder",naam:"Paneel zonder spouw en zonder isolatie",bouwdeeltype:"Paneel in kozijn",kozijn:"WOOD_OR_PLASTIC",isolatie_aanwezig:"INSULATION_ABSENT",spouw_aanwezig:!1},{id:"bib-paneel-spouw",naam:"Paneel met spouw en isolatie onbekend",bouwdeeltype:"Paneel in kozijn",kozijn:"WOOD_OR_PLASTIC",isolatie_aanwezig:"INSULATION_ABSENT",spouw_aanwezig:!0},{id:"bib-paneel-isolatie",naam:"Paneel met spouw en isolatie",bouwdeeltype:"Paneel in kozijn",kozijn:"WOOD_OR_PLASTIC",spouw_aanwezig:!0},{id:"bib-met-enkel",naam:"Met. Enkel glas",bouwdeeltype:"Raam",kozijn:"METAL_NOT_THERMALLY_BROKEN",glas:"SINGLE_GLASS"},{id:"bib-met-dubbel",naam:"Met. Dubbel glas",bouwdeeltype:"Raam",kozijn:"METAL_NOT_THERMALLY_BROKEN",glas:"DOUBLE_GLASS"},{id:"bib-tho-dubbel",naam:"Th.O. Dubbel glas",bouwdeeltype:"Raam",kozijn:"METAL_THERMALLY_BROKEN",glas:"DOUBLE_GLASS"},{id:"bib-tho-hrpp",naam:"Th.O. HR++ glas",bouwdeeltype:"Raam",kozijn:"METAL_THERMALLY_BROKEN",glas:"HE_PLUS_PLUS_GLASS"},{id:"bib-onbekend-hr",naam:"Onbekend HR glas",bouwdeeltype:"Raam",kozijn:"WOOD_OR_PLASTIC",glas:"HE_GLASS"}],IS={_uitleg:LS,versie:DS,dicht:NS,transparant:kS},Gr="Label-wise import.json",Or=n=>n==null||n===""||!Number.isFinite(Number(n))?null:Number(n);function Gh(n){const e=[],t=n?.kozijnen||[];for(const i of n?.constructies||[])for(const r of t){if(r.constructie_id!==i.id)continue;const s=Or(r.L),a=Or(r.B);let o=Or(r.A);o==null&&s!=null&&a!=null&&(o=od(s*a)/100),e.push({id:r.id,constructie_id:i.id,constructie:i.naam??"",beschrijving:r.beschrijving??"",glas:r.glas??"",L:s,B:a,A:o,deur:!!r.deur,paneel:!!r.paneel,beschaduwing:r.beschaduwing??null,zonwering:r.zonwering??null,overstek_hoogte:Or(r.overstek_hoogte),overstek_afstand:Or(r.overstek_afstand),zij_kant:r.zij_kant||null,zij_relatief:r.zij_relatief||null,zonwering_code:r.zonwering_code||null,geen_beschaduwing:!!r.geen_beschaduwing})}return e}function jh(n){const{herzien:e}=n||{};return{constructies:{...n?.constructies||{}},kozijnen:{...n?.kozijnen||{}},...e?{herzien:{constructies:[...e.constructies||[]],kozijnen:[...e.kozijnen||[]]}}:{}}}function US(n,e,t){return Gu(n,e?.koppen||[],jh(t))}function OS({kozijnen:n,berekening:e,model:t,koppeling:i,projectnaam:r,bron:s}){const a=jh(i),o=Gu(n,e.koppen||[],a);if(o.fouten.length)return{fouten:o.fouten,stand:o};const l=Wh(o);if(l)return{fouten:[l],stand:o};const c=new Map([...o.perKop].map(([d,p])=>[d,p.kozijnen])),u=CS(e,t,{bibliotheek:IS,projectnaam:r,bron:s,kozijnen:c});return u.fouten?.length?{fouten:u.fouten,stand:o,uit:u}:{fouten:[],tekst:JSON.stringify(u.bestand,null,2)+`
`,uit:u,stand:o,vastgelegd:ad(o,a)}}function FS({kozijnen:n,record:e,titel:t,versie:i}){const r=oa(e),s=e?.gegenereerd?.model;return!r||!s?{fouten:["Er is nog geen 3D-model: eerst genereren"]}:OS({kozijnen:Gh(n),berekening:r,model:s,koppeling:e.kozijnKoppeling,projectnaam:String(t??"").trim()||"Woning",bron:`Teken-tool ${i}`})}const _r=(n,e,t)=>`${n} ${n===1?e:t}`;function zS(n){if(!n)return 0;const e=n.kozijnen.filter(i=>Zr[i.status]?.blokkeert).length,t=[...n.perKop?.values()||[]].filter(i=>i.teGroot).length;return e+t}function Wh(n){return!n||n.kozijnen.length===0?"er zijn geen kozijnen ingevoerd":n.kozijnen.some(e=>e.status!=="niet")?null:"geen enkel kozijn gaat mee (alle op niet meenemen)"}function BS(n){const e=Wh(n);if(e)return{blokkade:e,tekst:`Niet mogelijk: ${e}`};if(n.fouten.length){const i=n.kozijnen.filter(s=>Zr[s.status]?.blokkeert).length,r=i?`nog ${_r(i,"kozijn","kozijnen")} te koppelen`:`${_r(n.fouten.length,"probleem","problemen")} in het tabblad Kozijnen`;return{blokkade:r,tekst:`Niet mogelijk: ${r}`}}const t=n.kozijnen.filter(i=>i.status!=="niet").length;return{tekst:`Met ${_r(t,"kozijn","kozijnen")}`}}function VS(n){const e=[],t=(a,o)=>e.push({niveau:a,tekst:`Label-wise: ${o}`}),i=n?.uit;if(!i){for(const a of n?.fouten||[])t("fout",typeof a=="string"?a:[a.zone,a.naam].filter(Boolean).join(" ")+`: ${a.reden}`);return e}const r=Xh(i);r>0&&t("info",`${_r(r,"hoofdvlak","hoofdvlakken")} in ${_r(i.zones.length,"rekenzone","rekenzones")}`);for(const a of i.overgeslagen)t("waarschuwing",`${a.zone} ${a.naam} niet meegenomen: ${a.reden}`);const s=new Map;for(const a of i.handwerk){const o=`${a.zone}\0${a.reden}`;s.has(o)||s.set(o,{...a,namen:[]}),s.get(o).namen.push(a.naam)}for(const a of s.values())t("waarschuwing",`${a.zone} ${a.namen.join(", ")}: ${a.reden}`);for(const a of i.afgerond)t("info",`${a.zone} ${a.naam}: helling ${a.van}° → ${a.naar}° (Label-wise kent alleen stappen van 15°)`);for(const a of n.stand?.waarschuwingen||[])t("waarschuwing",a);t("info",`${_r(i.deelvlakken,"kozijn","kozijnen")} als deelvlak`);for(const a of i.fouten||[])t("fout",`${[a.zone,a.naam].filter(Boolean).join(" ")}: ${a.reden}`);return e}function Xh(n){return(n?.zones||[]).reduce((e,t)=>e+t.vlakken.length,0)}const Uu={jpg:!0,jpgAlle:!1,txt:!0,html:!0,csv:!1,lw:!0},HS=!1,GS=["jpg","txt","html","lw"],qr={txt:"Berekeningen.txt",csv:"Berekeningen.csv"},ta="3D_weergave_gebouw.html";function jS(n){const e={...Uu};if(n&&typeof n=="object")for(const t of Object.keys(Uu))typeof n[t]=="boolean"&&(e[t]=n[t]);return e.csv=!1,e}function WS({record:n,bezig:e=!1}){return e?"Bezig met genereren":n?.gegenereerd?.model?oa(n)?ld(n)?null:"De correcties horen bij een andere berekening van de 3D-server":"Nog geen berekening":"Nog geen model"}function XS(n,e=!1){return(n?.koppen||[]).filter(t=>(e||zh(t))&&(t.vlakken||[]).length>0)}const $S=n=>`overzicht_${n+1}.jpg`,KS=/[\\/:*?"<>|\x00-\x1f]/g,YS=/^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;function qS(n,e,t=[]){const i=new Set(t.map(r=>r.toLowerCase()));return n.map(r=>{let s=String(r.label??"").replace(KS,"-").replace(/\s+/g," ").trim().replace(/[. ]+$/,"");s||(s="Constructie"),YS.test(s)&&(s+="_");let a=s+e;for(let o=2;i.has(a.toLowerCase());o++)a=`${s} (${o})${e}`;return i.add(a.toLowerCase()),a})}function ZS(n,e){return{...n,project:{...n?.project||{},titel:e||""}}}function JS(n=new Date){return`${n.getDate()}-${n.getMonth()+1}-${n.getFullYear()}`}function QS({model:n,berekening:e,titel:t,bron:i,datum:r=JS(),verwijderd:s=new Set}){const a=oM(ZS(n,t),e,FM,r,s),o=HM(i.sjabloon+i.css+i.speler);if(o.length)throw new Error(`afscherming: de code bevat ${o.join(", ")}`);const l=[...(n.vlakken||[]).map(u=>u.id),...(e.koppen||[]).map(u=>u.id)],c=GM(JSON.stringify(a),l);if(c.length)throw new Error(`afscherming: de gegevens bevatten id's (${c.slice(0,5).join(", ")})`);return zM(i.sjabloon,i.css,i.speler,a)}const ey={".jpg":"image/jpeg",".txt":"text/plain;charset=utf-8",".csv":"text/csv;charset=utf-8",".html":"text/html;charset=utf-8",".json":"application/json;charset=utf-8"},Ou=n=>n.slice(n.lastIndexOf(".")).toLowerCase();function ty(n){return`3D_${String(n??"").replace(/[^a-z0-9_\-. ]/gi,"_").trim()||"naamloos"}.zip`}function ny(n,e){if(!n.length)return null;if(n.length===1){const[{naam:i,data:r}]=n;return{naam:i,data:r,type:ey[Ou(i)]||"application/octet-stream"}}const t={};for(const{naam:i,data:r}of n)t[i]=[r,{level:Ou(i)===".jpg"?0:9}];return{naam:ty(e),data:cd(t),type:"application/zip"}}function iy(n,e){const t=[];e&&t.push(`${e} render${e===1?"":"s"}`);for(const i of[qr.txt,qr.csv,ta,Gr])n.includes(i)&&t.push(i);return t.length?t.join(", ").replace(/, ([^,]*)$/," en $1"):""}const ry=[{naam:"jpg",tekst:"Renders",soort:".jpg"},{naam:"jpgAlle",tekst:"Alle constructies",soort:"(ook met één som)",sub:!0},{naam:"txt",tekst:"Berekeningen",soort:".txt"},{naam:"html",tekst:"Interactieve weergave",soort:".html"},{naam:"csv",tekst:"Tabel",soort:".csv"},{naam:"lw",tekst:"Label-wise",soort:".json"}].filter(n=>n.naam!=="csv"||HS);let ho=null;function Fu(){return ho??=fd(()=>import("./weergaveBron-byLYDhNA.js"),[]).catch(async n=>{ho=null;const e=await pd().catch(()=>!1);throw new Error(e?"er is een nieuwe versie van de teken-tool: vernieuw de pagina":`de weergave kon niet laden (${n.message})`)}),ho}const fo=()=>new Promise(n=>requestAnimationFrame(()=>setTimeout(n,0)));function sy({naam:n,data:e,type:t}){const i=URL.createObjectURL(new Blob([e],{type:t})),r=document.createElement("a");r.href=i,r.download=n,r.click(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}function ay({record:n,titel:e,tekeningGewijzigd:t,orientatieBevestigd:i=!0,viewer:r,lijm:s,kozijnen:a,kozStand:o,onKozijnKoppeling:l,onNaarKozijnen:c,onKlaar:u,onNaRenders:d,onSluit:p}){const[f,g]=Re.useState(null),[_,m]=Re.useState(!1),[h,y]=Re.useState(null),[M,x]=Re.useState(null),F=Re.useRef(null);Re.useEffect(()=>{let v=!1;return ud().catch(()=>null).then(w=>{v||g(jS(w))}),Fu().catch(()=>{}),()=>{v=!0}},[]),Re.useEffect(()=>{f&&F.current?.focus()},[!!f]),Re.useEffect(()=>{const v=w=>{w.key==="Escape"&&(w.stopPropagation(),_||p())};return document.addEventListener("keydown",v,!0),()=>document.removeEventListener("keydown",v,!0)},[_,p]);function P(v,w){g(H=>({...H,[v]:w})),x(null)}async function L(){if(_||!f||!i)return;if(!GS.some(se=>f[se])){x("Kies wat je wilt exporteren.");return}hd(f).catch(()=>{}),m(!0),x(null);const v=n.gegenereerd.model,w=oa(n),H=[],V=[],W=[{niveau:"stap",stap:"",tekst:"── Exporteren ──"}],$=(se,me)=>W.push({niveau:se,stap:"export",tekst:me}),X=se=>y({tekst:se,klaar:!1}),oe=se=>new TextEncoder().encode(se);let G=0,de=null;try{if(f.txt){const Ae=IM(w);Ae?H.push({naam:qr.txt,data:oe(Ae)}):$("info",`Geen constructies met meer dan één rij: geen ${qr.txt}.`)}if(f.csv&&H.push({naam:qr.csv,data:oe(OM(w,v))}),f.html){X("Interactieve weergave"),await fo();try{const{WEERGAVE_BRON:Ae}=await Fu();H.push({naam:ta,data:oe(QS({model:v,berekening:w,titel:e,bron:Ae,verwijderd:Ih(n.gegenereerd.berekening,w)}))})}catch(Ae){V.push(ta),$("fout",`${ta} kon niet worden gemaakt: ${Ae.message}`)}}if(f.lw){const Ae=FS({kozijnen:a,record:n,titel:e,versie:dd});for(const Be of VS(Ae))$(Be.niveau,Be.tekst);Ae.fouten.length?(V.push(Gr),$("fout",`${Gr} niet gemaakt: los eerst de punten hierboven op (tabblad Kozijnen).`)):Xh(Ae.uit)===0?$("waarschuwing",`Geen constructies voor Label-wise: geen ${Gr}.`):(H.push({naam:Gr,data:oe(Ae.tekst)}),de=Ae.vastgelegd)}if(f.jpg){const Ae=s.gebouw.l,Be=Ae?.t;Ae&&(Ae.t=e||"");try{const Q=JM(r,v,s.ids,s.indexVan),he=Array.from({length:Q.OVERZICHTEN},(be,Ve)=>({naam:$S(Ve),tekst:`Overzicht ${Ve+1} van ${Q.OVERZICHTEN}`,render:()=>Q.renderOverzicht(Ve)})),xe=XS(w,f.jpgAlle),ce=qS(xe,".jpg",he.map(be=>be.naam)),Ne=[...he,...xe.map((be,Ve)=>({naam:ce[Ve],tekst:`Render ${Ve+1} van ${xe.length}: ${be.label}`,render:()=>Q.renderKop(be)}))];for(const be of Ne){X(be.tekst),await fo();try{const Ve=await be.render();H.push({naam:be.naam,data:new Uint8Array(await Ve.arrayBuffer())}),G++}catch(Ve){V.push(be.naam),$("fout",`${be.naam} kon niet worden gemaakt: ${Ve.message}`)}}}finally{Ae&&(Ae.t=Be),d()}}X("Inpakken"),await fo();const se=ny(H,e);let me=se?`${iy(H.map(Ae=>Ae.naam),G)} in ${se.naam}`:"Niets geëxporteerd";if(V.length&&(me+=`; ${V.length} bestand${V.length===1?"":"en"} mislukt (zie het log)`),se&&sy(se),se&&de&&l(de),$(V.length?"waarschuwing":"klaar",`Klaar — ${me}`),u(W),!V.length&&se){p();return}y({tekst:`${me}.`,klaar:!V.length})}catch(se){$("fout",`Exporteren mislukt: ${se.message}`),u(W),y({tekst:`Exporteren mislukt: ${se.message}`,klaar:!1})}finally{m(!1)}}const D=h&&!_,T=BS(o);return C.jsx("div",{className:"dialog-overlay",onClick:()=>{_||p()},children:C.jsxs("div",{className:"dialog v3d-export",onClick:v=>v.stopPropagation(),role:"dialog","aria-label":"Exporteren",children:[C.jsx("h3",{className:"v3d-export-titel",children:"Exporteren"}),f&&C.jsxs("div",{className:"v3d-export-keuzes",children:[ry.map(v=>C.jsxs("label",{className:`v3d-export-keuze${v.sub?" v3d-export-keuze--sub":""}`,children:[C.jsx("input",{type:"checkbox",checked:f[v.naam],disabled:_||D||v.sub&&!f.jpg,onChange:w=>P(v.naam,w.target.checked)}),C.jsxs("span",{children:[v.tekst," ",C.jsx("span",{className:"v3d-export-soort",children:v.soort})]})]},v.naam)),f.lw&&C.jsxs("div",{className:`v3d-export-lw${T.blokkade?" v3d-export-lw--fout":""}`,children:[C.jsx("span",{children:T.tekst}),T.blokkade&&C.jsx("button",{type:"button",className:"v3d-kop-knop",onClick:c,disabled:_,children:"Naar Kozijnen"})]})]}),t&&C.jsx("p",{className:"v3d-export-let-op",children:"De tekening is gewijzigd na het genereren. De export toont het model en de berekening van toen."}),h&&C.jsx("div",{className:`v3d-export-voortgang${h.klaar?" v3d-export-voortgang--klaar":""}`,children:h.tekst}),M&&C.jsx("div",{className:"v3d-export-fout",children:M}),!i&&!D&&C.jsx("div",{className:"v3d-export-fout",children:"De oriëntatie is niet bevestigd. Bevestig hem in Eigenschappen."}),C.jsxs("div",{className:"dialog-actions",children:[C.jsx("button",{className:"btn btn-secondary",onClick:p,disabled:_,children:D?"Sluiten":"Annuleren"}),!D&&C.jsx("button",{className:"btn btn-primary",ref:F,onClick:L,disabled:_||!f||!i,children:_?"Bezig…":"Exporteren"})]})]})})}const zu={0:"Gelukt",1:"Gelukt, met blokkerende tekenfouten",2:"De export is onbruikbaar"},oy=240,ly=240,Bu=120,cy=150,uy=400,hy=560,dy=typeof location<"u"&&new URLSearchParams(location.search).has("perf"),fy=typeof location<"u"&&new URLSearchParams(location.search).has("ontwikkelaar");function Fr(n,e){const t=new Blob([typeof e=="string"?e:JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download=n,r.click(),URL.revokeObjectURL(i)}const py=n=>typeof n=="string"?n:n?.tekst??JSON.stringify(n);function my(n,e,t){const i=(n?.warnings||[]).map(o=>({niveau:"waarschuwing",stap:"export",tekst:o})),r=n?.uitkomst;if(r?.soort==="fout"){let o=r.tekst+(r.wacht!=null?` (nog ${Sd(r.wacht)})`:"");return r.verzoek&&(o+=` · verzoek-id ${r.verzoek}`),i.push({niveau:"fout",stap:"",tekst:o}),r.detail&&i.push({niveau:"info",stap:"",tekst:r.detail}),i}const s=r?.soort==="ok"&&!r.antwoord.heeftModel?r.antwoord:e?.gegenereerd;if(!s)return i;for(const o of Array.isArray(s.meldingen)?s.meldingen:[])i.push({niveau:o.niveau||"info",stap:o.stap||"",tekst:o.tekst});const a=s===e?.gegenereerd?e.gegenereerd.berekening:null;for(const o of Array.isArray(a?.waarschuwingen)?a.waarschuwingen:[])i.push({niveau:"waarschuwing",stap:"berekening",tekst:py(o)});if(t.length>0){i.push({niveau:"waarschuwing",stap:"berekening",tekst:`Rekenregels teken-tool ≠ 3D-server: ${t.length} afwijking(en)`});for(const o of t.slice(0,10))i.push({niveau:"waarschuwing",stap:"berekening",tekst:`  ${o.kop}, ${o.rij?`rij ${o.rij}`:"totaal"}: 3D-server ${_n(o.motor)}, teken-tool ${_n(o.suite)}`})}return i}function gy(n,e,t){const i=n?.vlakken?.find(f=>f.id===e);if(!i)return null;const r=n.objecten?.find(f=>f.id===i.object),s=n.zones?.find(f=>f.index===i.zone),a=n.gebouwdelen?.find(f=>f.index===i.gebouwdeel),o=i.bron_id?`${i.bron} (${String(i.bron_id).slice(0,8)})`:i.bron;let l=i.windrichting||"—";i.azimut!=null&&(l+=` (azimut ${+Number(i.azimut).toFixed(1)}°)`);const c=[["Bron",o||"—"],["Object",r?.label||i.object],["Oppervlakte",i.oppervlakte!=null?`${Number(i.oppervlakte).toFixed(3)} m²`:"—"],["Windrichting",`${l} · helling ${i.helling??"—"}°`],["Begrenzing",i.begrenzing||"—"],["Aard",i.aard??"—"],["Zone",`${s?.label??i.zone} · ${a?.naam??`gebouwdeel ${i.gebouwdeel}`}`],["Constructie",t?t.label:"—"]],u=document.createElement("div"),d=document.createElement("div");d.className="tooltip-titel",d.textContent=`${i.id} · ${i.soort}`;const p=document.createElement("table");for(const[f,g]of c){const _=p.insertRow();_.insertCell().textContent=f,_.insertCell().textContent=g}return u.append(d,p),u}function vy({stand:n,onGenereer:e,onActie:t,onGeenVraag:i,onControleer:r,onOpenSettings:s,onClose:a,volledig:o,onToggleVolledig:l,onLosmaken:c,koppenBreedte:u,onKoppenBreedte:d,koppenHoogte:p,onKoppenHoogte:f}){const g=Re.useRef(null),_=Re.useRef(null),m=Re.useRef(null),{versie:h,bezig:y,record:M,poging:x,vraag:F,tekeningGewijzigd:P,lokaleFout:L,opslagFout:D,codeIngevuld:T,titel:v,kozijnen:w,orientatieBevestigd:H}=n,[V,W]=Re.useState(null),[$,X]=Re.useState(null),[oe,G]=Re.useState(null),[de,se]=Re.useState(null),[me,Ae]=Re.useState(!1),[Be,Q]=Re.useState(!1),[he,xe]=Re.useState(null),[ce,Ne]=Re.useState("alles"),[be,Ve]=Re.useState(!1),[je,it]=Re.useState("koppen"),[nt,z]=Re.useState(()=>({selectie:new Set,anker:null})),[Ut,Je]=Re.useState(null),[Ze,Ue]=Re.useState(null),[vt,Fe]=Re.useState(!1),[A,S]=Re.useState([]),K=Re.useRef(!1);K.current=vt,Re.useEffect(()=>{S([]),Fe(!1)},[M?.noteId]),Re.useEffect(()=>{g.current?.focus({preventScroll:!0})},[]);const te=M?.gegenereerd?.model??null,ae=oa(M),ne=md(M),Pe=WS({record:M,bezig:y}),Me=Re.useMemo(()=>gd(M),[M]),Le=_d(w),Z=Re.useMemo(()=>Gh(w),[w]),fe=M?.kozijnKoppeling??null,Te=Re.useMemo(()=>ae?US(Z,ae,fe):null,[Z,ae,fe]),Ge=Re.useMemo(()=>M?.gegenereerd?.berekening?vd(M.gegenereerd.berekening):[],[M?.gegenereerd?.berekening]),ke=x?.uitkomst?.soort==="ok"?x.uitkomst.antwoord:null,Se=ke&&!ke.heeftModel?ke:M?.gegenereerd??null;Re.useEffect(()=>{!x?.nummer||x.overgeslagen||(x.uitkomst.soort==="fout"||x.uitkomst.antwoord.exitcode!==0)&&Q(!0)},[x?.nummer]);const Ye=Re.useCallback(({tekst:O,knop:ee})=>new Promise(le=>{se({tekst:O,knop:ee,klaar:le})}),[]);function qe(O){de?.klaar(O),se(null)}const pt=M?.gegenereerd?.berekening??null,I=Re.useMemo(()=>JSON.stringify([...Ih(pt,ae)].sort()),[pt,ae]),_e=Re.useMemo(()=>te?Nh(te,new Set(JSON.parse(I))):null,[te,I]),J=Re.useMemo(()=>{if(!_e)return null;const{ids:O}=_e,ee=fM(ae);return{gebouw:_e.gebouw,ids:O,indexVan:dM(O),kopVanVlak:ee,kopById:new Map((ae?.koppen||[]).map(le=>[le.id,le]))}},[_e,ae]),ie=Re.useRef(J);ie.current=J;const ve=Re.useRef(me);ve.current=me;const ye=Re.useRef(te);ye.current=te;const Xe=Re.useRef(je);Xe.current=je;const mt=Re.useRef(null);Re.useEffect(()=>{const O=Ux(_.current);m.current=O;let ee=null;O.bijVlakKlik((ge,we)=>{const He=ie.current,De=He&&ge!=null?He.ids[ge]:null,$e=De&&He.kopVanVlak.get(De);if(Xe.current==="kozijnen"){mt.current?.($e);return}W(at=>$e?at?.kopId===$e.id&&at.rijIndex==null?at:{kopId:$e.id,rijIndex:null}:null);const ct=performance.now();if($e&&ee&&ee.kopId===$e.id&&ct-ee.tijd<uy){ee=null,requestAnimationFrame(()=>m.current?.wisselZoom());return}if(ee=$e?{tijd:ct,kopId:$e.id}:null,$e&&ve.current&&we){const at=gy(ye.current,De,$e);at&&O.toonTooltip(we,at)}});const le=dy?hM(O,_.current):null;return le?.zetZichtbaar(!0),()=>{le?.zetZichtbaar(!1),O.vernietig(),m.current=null}},[]);const Pt=Re.useRef(null);Re.useEffect(()=>{const O=m.current;if(!O)return;const ee=!!_e&&Pt.current===te;if(Pt.current=_e?te:null,ee||(W(null),X(null)),!_e){O.wis();return}O.laadGebouw(_e.gebouw,{labels:_e.ids,behoudCamera:ee})},[_e]),Re.useEffect(()=>{const O=m.current;!O||!J||(O.zetKlikbaar(Uh(te,J.ids,new Set(J.kopVanVlak.keys()))),O.zetRandGroepen(pM(J.ids,J.kopVanVlak)),W(ee=>ee&&!J.kopById.has(ee.kopId)?null:ee))},[J]),Re.useEffect(()=>{m.current?.zetOntwikkelaar(me)},[me]);const st=Re.useCallback((O,ee)=>{const le=m.current,ge=ie.current;if(!le||!ge)return;const we=ee!=null?O.rijen?.[ee]:null,He=ve.current&&we?we.vlakken||[]:[];le.lichtOp(Ur(O.vlakken,ge.indexVan),Ur(He,ge.indexVan)),le.toonMaatvoering(Nl(O,ge.indexVan),ee)},[]),Ot=Re.useCallback(()=>{const O=m.current,ee=ie.current;if(!O||!ee||je==="kozijnen")return;const le=V&&ee.kopById.get(V.kopId);if(O.verbergTooltip(),le&&V.rijIndex!=null&&!le.rijen?.[V.rijIndex]){W({kopId:le.id,rijIndex:null});return}if(O.zetFocus(le?Ur(le.vlakken,ee.indexVan):null),!le){O.wisOplichten(),O.wisMaatvoering();return}st(le,V.rijIndex)},[V,st,je]);Re.useEffect(Ot,[Ot,J,me]);const Qt=Re.useCallback(O=>{O?st(O.kop,O.rijIndex):Ot()},[st,Ot]);function ti(O){O!==je&&(it(O),W(null),X(null),z({selectie:new Set,anker:null}),Je(null),Ue(null))}Re.useEffect(()=>{if(!nt.selectie.size)return;const O=new Set(Z.map(ee=>ee.id));[...nt.selectie].every(ee=>O.has(ee))||z(ee=>({...ee,selectie:new Set([...ee.selectie].filter(le=>O.has(le)))}))},[Z]);const on=Re.useCallback(O=>t({soort:"kozijnKoppeling",koppeling:O}),[t]);function ln(O,{shift:ee,toevoegen:le}){z(ge=>wM({selectie:ge.selectie,anker:ge.anker,ids:O,shift:ee,toevoegen:le,volgorde:(Te?.kozijnen||[]).map(we=>we.kozijn.id)})),Ue(null)}function xi(O,ee){z(le=>{const ge=new Set(le.selectie);for(const we of O)ee?ge.add(we):ge.delete(we);return{selectie:ge,anker:O.at(-1)}}),Ue(null)}function Hn(){z({selectie:new Set,anker:null}),Ue(null)}mt.current=O=>{const ee=Te;if(!O||!ee||Pe||!ee.kozijnen.length){Hn();return}if(nt.selectie.size>0){if(!Vu.includes(O.vlaktype)){Ue({tekst:`${O.label} is geen gevel of dak: kozijnen niet verplaatst.`,fout:!0});return}const we=[...nt.selectie];Ue({tekst:`${ro(we.length,"kozijn","kozijnen")} → ${O.label}`}),on(Hu(fe,ee,we,O.id));return}const le=ee.kozijnen.filter(we=>we.kopId===O.id).length;Ue({tekst:`${O.label}: ${le?ro(le,"kozijn","kozijnen"):"geen kozijnen"}`});const ge=ie.current;ge&&m.current?.lichtOp(Ur(O.vlakken,ge.indexVan))},Re.useEffect(()=>{const O=m.current,ee=J;if(je!=="kozijnen"||!O||!ee)return;O.verbergTooltip(),O.wisMaatvoering();const le=new Set;if(Ut)le.add(Ut);else for(const we of Te?.kozijnen||[])we.kopId&&nt.selectie.has(we.kozijn.id)&&le.add(we.kopId);if(!le.size&&!Ut&&Ze&&!Ze.fout)return;const ge=[...le].flatMap(we=>ee.kopById.get(we)?.vlakken||[]);O.zetFocus(null),ge.length?O.lichtOp(Ur(ge,ee.indexVan)):O.wisOplichten()},[je,Ut,nt,Te,J,Ze]);const ni=Re.useRef(!0);Re.useEffect(()=>{const O=le=>{ni.current=!!g.current?.contains(le.target)},ee=le=>{K.current||!ni.current||le.target.closest?.('input, textarea, select, [contenteditable="true"]')||(le.key==="Escape"?(W(null),z({selectie:new Set,anker:null}),Ue(null)):le.key===" "&&!le.repeat&&!le.target.closest?.("button")&&m.current?.wisselZoom()&&le.preventDefault())};return document.addEventListener("pointerdown",O,!0),document.addEventListener("keydown",ee),()=>{document.removeEventListener("pointerdown",O,!0),document.removeEventListener("keydown",ee)}},[]),Re.useLayoutEffect(()=>{const O=g.current,ee=new ResizeObserver(()=>Ve(!o&&O.clientWidth<hy));return ee.observe(O),()=>ee.disconnect()},[o]);const Tn=Re.useRef(null);function cn(O){O.preventDefault();const ee=O.currentTarget;ee.setPointerCapture(O.pointerId);let le;if(be){const we=Tn.current,He=we.getBoundingClientRect().bottom-8,De=we.querySelector(".v3d-koppen").offsetHeight,$e=_.current.offsetHeight,ct=Math.max(Bu,De+$e-cy);le=at=>f(Math.round(Math.min(ct,Math.max(Bu,He-at.clientY))))}else{const we=g.current.getBoundingClientRect().right,He=g.current.clientWidth-ly;le=De=>d(Math.round(Math.min(He,Math.max(oy,we-De.clientX))))}const ge=()=>{ee.removeEventListener("pointermove",le),ee.removeEventListener("pointerup",ge),ee.removeEventListener("pointercancel",ge)};ee.addEventListener("pointermove",le),ee.addEventListener("pointerup",ge),ee.addEventListener("pointercancel",ge)}const An=`${x?.nummer??0}|${M?.gegenereerd?.tijd??""}|${M?.noteId??""}`,Gn=[...he===An?[]:my(x,M,Ge),...A],ii=[];D&&ii.push({soort:"fout",tekst:D}),M?.werk&&!ne&&ii.push({soort:"verouderd",tekst:"Je correcties horen bij een andere berekening van de 3D-server. Ze zijn alleen nog te bekijken.",knop:{tekst:"Correcties verwerpen",actie:Tr}}),P&&te&&ii.push({soort:"verouderd",tekst:"De tekening is gewijzigd na het genereren. Druk op Genereer voor een nieuw model."});async function Tr(){await Ye({tekst:"Let op: je correcties vervallen. Het paneel toont de berekening van de 3D-server. Doorgaan?",knop:"Verwerpen"})&&t({soort:"verwerpen"})}function Ar(){const O=V?J?.kopById.get(V.kopId)??null:null;G({basis:O,id:Md(M)})}function E(O){t({soort:"kopToevoegen",kop:O,naId:oe.basis?.id??null}),G(null),W({kopId:O.id,rijIndex:null}),X({kopId:O.id,a:null,b:null})}const U=Pe?0:zS(Te),q=Gn.filter(O=>O.niveau==="fout").length,Y=Gn.filter(O=>O.niveau==="waarschuwing").length,B=[q&&`${q} ${q===1?"fout":"fouten"}`,Y&&`${Y} ${Y===1?"waarschuwing":"waarschuwingen"}`].filter(Boolean).join(" · ");return C.jsxs("div",{ref:g,tabIndex:-1,className:`v3d-pane${be?" smal":""}`,style:{"--koppen-breedte":`${u}px`,"--koppen-hoogte":p?`${p}px`:"40%"},children:[C.jsxs("div",{className:"v3d-kopbalk",children:[C.jsx("button",{className:"v3d-genereer",onClick:()=>e(!1),disabled:y||!T||h===null||xd(h),children:y?"Bezig…":"Genereer"}),C.jsx("button",{className:"v3d-exporteer",onClick:()=>Fe(!0),disabled:!!Pe||!J,title:Pe?`Exporteren kan nu niet: ${Pe}`:"Renders, berekening (.txt), interactieve weergave (.html) en Label-wise (.json) downloaden",children:"Exporteren"}),C.jsxs("div",{className:"v3d-status",children:[T?h===null?C.jsx("span",{className:"v3d-muted",children:"Verbinden met de 3D-server…"}):h.soort==="ok"?C.jsxs("span",{title:`versie ${h.versie.motor}`,children:[C.jsx("span",{className:"v3d-stip v3d-stip--aan"}),"Verbonden met de 3D-server",me&&` (versie ${h.versie.motor})`]}):C.jsxs("span",{className:"v3d-fout-tekst",children:[C.jsx("span",{className:"v3d-stip v3d-stip--uit"}),h.tekst]}):C.jsxs(C.Fragment,{children:["Vul eerst je 3D-sleutel in bij ",C.jsx("button",{className:"v3d-link",onClick:s,children:"Instellingen"})]}),h?.soort==="fout"&&T&&C.jsx("button",{className:"v3d-link",onClick:r,children:"Opnieuw verbinden"})]}),C.jsxs("span",{className:"v3d-versie",title:"Versie van de 3D-viewer (komt ook in de interactieve weergave van de export)",children:["Viewer ",H0]}),fy&&C.jsx("button",{className:`viewer-knop${me?" viewer-knop--aan":""}`,"aria-pressed":me,onClick:()=>Ae(O=>!O),title:"Vlak-id's en vlakgegevens bij klikken",children:"Ontwikkelaar"}),c&&C.jsx("button",{className:"v3d-icoon",onClick:c,title:"Losmaken (eigen venster)","aria-label":"Losmaken in een eigen venster",children:C.jsxs("svg",{viewBox:"0 0 20 20",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round",children:[C.jsx("path",{d:"M11 3h6v6"}),C.jsx("path",{d:"M17 3l-8 8"}),C.jsx("path",{d:"M15 12v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"})]})}),l&&C.jsx("button",{className:"v3d-icoon",onClick:l,title:o?"Naast de tekening":"3D volledig","aria-label":o?"Naast de tekening":"3D volledig",children:C.jsx("svg",{viewBox:"0 0 20 20",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round",children:o?C.jsxs(C.Fragment,{children:[C.jsx("path",{d:"M8 3v5H3"}),C.jsx("path",{d:"M12 17v-5h5"}),C.jsx("path",{d:"M17 8h-5V3"}),C.jsx("path",{d:"M3 12h5v5"})]}):C.jsxs(C.Fragment,{children:[C.jsx("path",{d:"M3 8V3h5"}),C.jsx("path",{d:"M17 12v5h-5"}),C.jsx("path",{d:"M12 3h5v5"}),C.jsx("path",{d:"M8 17H3v-5"})]})})}),C.jsx("button",{className:"v3d-icoon",onClick:a,title:"Sluiten","aria-label":"3D-paneel sluiten",children:"✕"})]}),x?.overgeslagen&&C.jsxs("div",{className:"v3d-overgeslagen",children:[C.jsx("span",{children:"Niets veranderd sinds de vorige keer."}),C.jsx("button",{className:"v3d-knop",onClick:()=>e(!0),disabled:y,children:"Toch genereren"})]}),L&&C.jsx("div",{className:"v3d-overgeslagen v3d-fout-tekst",children:L}),C.jsxs("div",{className:"v3d-werkvlak",ref:Tn,children:[C.jsxs("div",{className:"v3d-links",children:[C.jsx("div",{className:"v3d-viewer",ref:_,children:!te&&C.jsx("div",{className:"v3d-viewer-leeg",children:y?C.jsx("p",{children:"Bezig met genereren…"}):ke&&!ke.heeftModel?C.jsxs("p",{children:[zu[ke.exitcode],": geen model. Zie het log."]}):C.jsxs(C.Fragment,{children:[C.jsx("p",{children:"Nog geen model"}),C.jsx("p",{children:"Druk op Genereer"})]})})}),C.jsxs("div",{className:`v3d-log${Be?"":" ingeklapt"}`,children:[C.jsxs("div",{className:"v3d-log-kop",children:[C.jsxs("span",{children:["Log",B&&C.jsxs("span",{className:"v3d-log-tellers",children:[" · ",B]}),Se&&C.jsxs("span",{className:`v3d-exit v3d-exit-${Se.exitcode}`,children:[" · ",zu[Se.exitcode]]})]}),me&&te&&C.jsx("button",{className:"v3d-log-knop",onClick:()=>Fr("model.json",te),children:"model.json"}),me&&M?.gegenereerd?.berekening&&C.jsx("button",{className:"v3d-log-knop",onClick:()=>Fr("berekening.gegenereerd.json",M.gegenereerd.berekening),children:"berekening"}),me&&M?.werk&&C.jsx("button",{className:"v3d-log-knop",onClick:()=>Fr("berekening.json",M.werk),children:"werkversie"}),me&&M?.vorige&&C.jsx("button",{className:"v3d-log-knop",onClick:()=>Fr("berekening.vorige.json",M.vorige),children:"vorige"}),me&&M?.body&&C.jsx("button",{className:"v3d-log-knop",onClick:()=>Fr("3d_verstuurd.json",JSON.stringify(JSON.parse(M.body),null,2)),children:"export"}),C.jsx("button",{className:"v3d-log-knop",onClick:()=>{xe(An),S([])},disabled:Gn.length===0,children:"Wissen"}),C.jsx("button",{className:"v3d-log-knop",onClick:()=>Q(O=>!O),children:Be?"Inklappen":"Uitklappen"})]}),C.jsxs("div",{className:"v3d-log-regels",children:[Se&&C.jsxs("div",{className:"v3d-log-regel v3d-log--info",children:[v," · versie ",Se.motor,Number.isFinite(Se.duur)&&` · ${Se.duur.toFixed(2).replace(".",",")} s`," · verzoek ",Se.verzoek]}),Gn.map((O,ee)=>C.jsxs("div",{className:`v3d-log-regel v3d-log--${O.niveau}`,children:[O.stap&&C.jsxs("span",{className:"v3d-log-stap",children:["[",O.stap,"]"]}),O.tekst]},ee))]})]})]}),C.jsx("div",{className:"v3d-greep",onPointerDown:cn,onDoubleClick:()=>be?f(null):d(null),title:be?"Sleep om de koppen hoger of lager te maken (dubbelklik = standaard)":"Sleep om de koppen breder of smaller te maken (dubbelklik = standaard)"}),C.jsxs("aside",{className:"v3d-koppen",children:[C.jsxs("div",{className:"v3d-tabs",role:"tablist",children:[C.jsx("button",{type:"button",role:"tab",className:"v3d-tab","aria-selected":je==="koppen",onClick:()=>ti("koppen"),children:"Constructies"}),C.jsxs("button",{type:"button",role:"tab",className:"v3d-tab","aria-selected":je==="kozijnen",onClick:()=>ti("kozijnen"),title:U?`Nog ${ro(U,"punt","punten")} op te lossen voor de Label-wise-export`:"Kozijnen aan de constructies koppelen (voor Label-wise)",children:["Kozijnen",U>0&&C.jsx("span",{className:"v3d-tab-aantal",children:U})]})]}),je==="kozijnen"?C.jsx(CM,{stand:Te,koppeling:fe,berekening:ae,model:te,blokkade:Pe,heeftKozijnen:Le,selectie:nt.selectie,terug:Ze,onSelecteer:ln,onZetSelectie:xi,onWisSelectie:Hn,onAanwijzen:Je,onKoppeling:on}):C.jsx(bM,{model:te,berekening:ae,record:M,vergelijking:Me,bewerkbaar:ne,selectie:V,onKies:W,onRijHover:Qt,filter:ce,onFilter:Ne,ontwikkelaar:me,meldingen:ii,onActie:t,bevestig:Ye,onKopToevoegen:Ar,concept:$,onConcept:X})]})]}),oe&&C.jsx(LM,{model:te,berekening:ae,basis:oe.basis,id:oe.id,onToevoegen:E,onAnnuleer:()=>G(null)}),vt&&J&&m.current&&C.jsx(ay,{record:M,titel:v,tekeningGewijzigd:P,orientatieBevestigd:H!==!1,viewer:m.current,lijm:J,kozijnen:w,kozStand:Te,onKozijnKoppeling:on,onNaarKozijnen:()=>{Fe(!1),ti("kozijnen")},onKlaar:O=>{S(O),Q(!0)},onNaRenders:Ot,onSluit:()=>Fe(!1)}),F?.soort==="correctiesVervallen"&&C.jsx(Fl,{message:"Let op: je correcties vervallen. Het paneel toont de nieuwe berekening van de 3D-server. Doorgaan?",confirmLabel:"Genereer",variant:"primary",onConfirm:()=>e(!0,!0),onCancel:i}),de&&C.jsx(Fl,{message:de.tekst,confirmLabel:de.knop,onConfirm:()=>qe(!0),onCancel:()=>qe(!1)})]})}export{vy as default};
