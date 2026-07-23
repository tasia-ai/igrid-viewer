var Vh=Object.defineProperty;var Hh=(s,e,t)=>e in s?Vh(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var C=(s,e,t)=>Hh(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ya="170",Gh=0,ic=1,Wh=2,Pl=1,Xh=2,bn=3,Gn=0,Nt=1,tn=2,Hn=0,Fi=1,wo=2,sc=3,rc=4,$h=5,ii=100,Yh=101,qh=102,jh=103,Zh=104,Kh=200,Jh=201,Qh=202,eu=203,To=204,Co=205,tu=206,nu=207,iu=208,su=209,ru=210,ou=211,au=212,cu=213,lu=214,Ao=0,Ro=1,Po=2,Bi=3,Io=4,Lo=5,Do=6,Uo=7,Il=0,hu=1,uu=2,Mn=0,du=1,fu=2,pu=3,mu=4,gu=5,_u=6,xu=7,Ll=300,zi=301,Vi=302,No=303,Fo=304,Dr=306,hi=1e3,oi=1001,Oo=1002,on=1003,vu=1004,Os=1005,ln=1006,Br=1007,ai=1008,Rn=1009,Dl=1010,Ul=1011,bs=1012,ba=1013,ui=1014,Sn=1015,Ps=1016,Sa=1017,Ea=1018,Hi=1020,Nl=35902,Fl=1021,Ol=1022,sn=1023,kl=1024,Bl=1025,Oi=1026,Gi=1027,zl=1028,Ma=1029,Vl=1030,wa=1031,Ta=1033,gr=33776,_r=33777,xr=33778,vr=33779,ko=35840,Bo=35841,zo=35842,Vo=35843,Ho=36196,Go=37492,Wo=37496,Xo=37808,$o=37809,Yo=37810,qo=37811,jo=37812,Zo=37813,Ko=37814,Jo=37815,Qo=37816,ea=37817,ta=37818,na=37819,ia=37820,sa=37821,yr=36492,ra=36494,oa=36495,Hl=36283,aa=36284,ca=36285,la=36286,yu=3200,bu=3201,Gl=0,Su=1,zn="",Rt="srgb",qi="srgb-linear",Ur="linear",Je="srgb",mi=7680,oc=519,Eu=512,Mu=513,wu=514,Wl=515,Tu=516,Cu=517,Au=518,Ru=519,ha=35044,ac="300 es",En=2e3,Er=2001;class ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cc=1234567;const ps=Math.PI/180,Ss=180/Math.PI;function wn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ct[s&255]+Ct[s>>8&255]+Ct[s>>16&255]+Ct[s>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]).toLowerCase()}function Mt(s,e,t){return Math.max(e,Math.min(t,s))}function Ca(s,e){return(s%e+e)%e}function Pu(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Iu(s,e,t){return s!==e?(t-s)/(e-s):0}function ms(s,e,t){return(1-t)*s+t*e}function Lu(s,e,t,n){return ms(s,e,1-Math.exp(-t*n))}function Du(s,e=1){return e-Math.abs(Ca(s,e*2)-e)}function Uu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Nu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Fu(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ou(s,e){return s+Math.random()*(e-s)}function ku(s){return s*(.5-Math.random())}function Bu(s){s!==void 0&&(cc=s);let e=cc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zu(s){return s*ps}function Vu(s){return s*Ss}function Hu(s){return(s&s-1)===0&&s!==0}function Gu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Wu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Xu(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),m=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*m,a*l);break;case"YXY":s.set(c*m,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*m,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function nn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ke(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Vn={DEG2RAD:ps,RAD2DEG:Ss,generateUUID:wn,clamp:Mt,euclideanModulo:Ca,mapLinear:Pu,inverseLerp:Iu,lerp:ms,damp:Lu,pingpong:Du,smoothstep:Uu,smootherstep:Nu,randInt:Fu,randFloat:Ou,randFloatSpread:ku,seededRandom:Bu,degToRad:zu,radToDeg:Vu,isPowerOfTwo:Hu,ceilPowerOfTwo:Gu,floorPowerOfTwo:Wu,setQuaternionFromProperEuler:Xu,normalize:Ke,denormalize:nn};class oe{constructor(e=0,t=0){oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(e,t,n,i,r,o,a,c,l){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],m=n[5],g=n[8],_=i[0],p=i[3],f=i[6],E=i[1],M=i[4],v=i[7],D=i[2],A=i[5],R=i[8];return r[0]=o*_+a*E+c*D,r[3]=o*p+a*M+c*A,r[6]=o*f+a*v+c*R,r[1]=l*_+h*E+u*D,r[4]=l*p+h*M+u*A,r[7]=l*f+h*v+u*R,r[2]=d*_+m*E+g*D,r[5]=d*p+m*M+g*A,r[8]=d*f+m*v+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,m=l*r-o*c,g=t*u+n*d+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-a*t)*_,e[6]=m*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(zr.makeScale(e,t)),this}rotate(e){return this.premultiply(zr.makeRotation(-e)),this}translate(e,t){return this.premultiply(zr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const zr=new Ne;function Xl(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Es(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function $u(){const s=Es("canvas");return s.style.display="block",s}const lc={};function ds(s){s in lc||(lc[s]=!0,console.warn(s))}function Yu(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function qu(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function ju(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $e={enabled:!0,workingColorSpace:qi,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Je&&(s.r=Tn(s.r),s.g=Tn(s.g),s.b=Tn(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Je&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?Ur:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Tn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ki(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const hc=[.64,.33,.3,.6,.15,.06],uc=[.2126,.7152,.0722],dc=[.3127,.329],fc=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pc=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[qi]:{primaries:hc,whitePoint:dc,transfer:Ur,toXYZ:fc,fromXYZ:pc,luminanceCoefficients:uc,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:hc,whitePoint:dc,transfer:Je,toXYZ:fc,fromXYZ:pc,luminanceCoefficients:uc,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}});let gi;class Zu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gi===void 0&&(gi=Es("canvas")),gi.width=e.width,gi.height=e.height;const n=gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Tn(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Tn(t[n]/255)*255):t[n]=Tn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ku=0;class $l{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=wn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Vr(i[o].image)):r.push(Vr(i[o]))}else r=Vr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Vr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Zu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ju=0;class yt extends ji{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,n=oi,i=oi,r=ln,o=ai,a=sn,c=Rn,l=yt.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=wn(),this.name="",this.source=new $l(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ll)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hi:e.x=e.x-Math.floor(e.x);break;case oi:e.x=e.x<0?0:1;break;case Oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hi:e.y=e.y-Math.floor(e.y);break;case oi:e.y=e.y<0?0:1;break;case Oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=Ll;yt.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,n=0,i=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],g=c[9],_=c[2],p=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,v=(m+1)/2,D=(f+1)/2,A=(h+d)/4,R=(u+_)/4,I=(g+p)/4;return M>v&&M>D?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=A/n,r=R/n):v>D?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=A/i,r=I/i):D<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(D),n=R/r,i=I/r),this.set(n,i,r,t),this}let E=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(p-g)/E,this.y=(u-_)/E,this.z=(d-h)/E,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qu extends ji{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new yt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $l(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends Qu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yl extends yt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=on,this.minFilter=on,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ed extends yt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=on,this.minFilter=on,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zi{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],m=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==m||h!==g){let p=1-a;const f=c*d+l*m+h*g+u*_,E=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const D=Math.sqrt(M),A=Math.atan2(D,f*E);p=Math.sin(p*A)/D,a=Math.sin(a*A)/D}const v=a*E;if(c=c*p+d*v,l=l*p+m*v,h=h*p+g*v,u=u*p+_*v,p===1-a){const D=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=D,l*=D,h*=D,u*=D}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*m-l*d,e[t+1]=c*g+h*d+l*u-a*m,e[t+2]=l*g+h*m+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),m=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*m*g,this._y=l*m*u-d*h*g,this._z=l*h*g+d*m*u,this._w=l*h*u-d*m*g;break;case"YXZ":this._x=d*h*u+l*m*g,this._y=l*m*u-d*h*g,this._z=l*h*g-d*m*u,this._w=l*h*u+d*m*g;break;case"ZXY":this._x=d*h*u-l*m*g,this._y=l*m*u+d*h*g,this._z=l*h*g+d*m*u,this._w=l*h*u-d*m*g;break;case"ZYX":this._x=d*h*u-l*m*g,this._y=l*m*u+d*h*g,this._z=l*h*g-d*m*u,this._w=l*h*u+d*m*g;break;case"YZX":this._x=d*h*u+l*m*g,this._y=l*m*u+d*h*g,this._z=l*h*g-d*m*u,this._w=l*h*u-d*m*g;break;case"XZY":this._x=d*h*u-l*m*g,this._y=l*m*u-d*h*g,this._z=l*h*g+d*m*u,this._w=l*h*u+d*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(o-i)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-c)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(r+l)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(r-l)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-i)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,n=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Hr.copy(this).projectOnVector(e),this.sub(Hr)}reflect(e){return this.sub(Hr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hr=new w,mc=new Zi;class Is{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Kt):Kt.fromBufferAttribute(r,o),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ks.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ks.copy(n.boundingBox)),ks.applyMatrix4(e.matrixWorld),this.union(ks)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ts),Bs.subVectors(this.max,ts),_i.subVectors(e.a,ts),xi.subVectors(e.b,ts),vi.subVectors(e.c,ts),Un.subVectors(xi,_i),Nn.subVectors(vi,xi),qn.subVectors(_i,vi);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-qn.z,qn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,qn.z,0,-qn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-qn.y,qn.x,0];return!Gr(t,_i,xi,vi,Bs)||(t=[1,0,0,0,1,0,0,0,1],!Gr(t,_i,xi,vi,Bs))?!1:(zs.crossVectors(Un,Nn),t=[zs.x,zs.y,zs.z],Gr(t,_i,xi,vi,Bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new w,new w,new w,new w,new w,new w,new w,new w],Kt=new w,ks=new Is,_i=new w,xi=new w,vi=new w,Un=new w,Nn=new w,qn=new w,ts=new w,Bs=new w,zs=new w,jn=new w;function Gr(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){jn.fromArray(s,r);const a=i.x*Math.abs(jn.x)+i.y*Math.abs(jn.y)+i.z*Math.abs(jn.z),c=e.dot(jn),l=t.dot(jn),h=n.dot(jn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const td=new Is,ns=new w,Wr=new w;class Ls{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):td.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ns.subVectors(e,this.center);const t=ns.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ns,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ns.copy(e.center).add(Wr)),this.expandByPoint(ns.copy(e.center).sub(Wr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new w,Xr=new w,Vs=new w,Fn=new w,$r=new w,Hs=new w,Yr=new w;class Nr{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Xr.copy(e).add(t).multiplyScalar(.5),Vs.copy(t).sub(e).normalize(),Fn.copy(this.origin).sub(Xr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Vs),a=Fn.dot(this.direction),c=-Fn.dot(Vs),l=Fn.lengthSq(),h=Math.abs(1-o*o);let u,d,m,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,m=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),m=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Xr).addScaledVector(Vs,d),m}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const n=_n.dot(this.direction),i=_n.dot(_n)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,n,i,r){$r.subVectors(t,e),Hs.subVectors(n,e),Yr.crossVectors($r,Hs);let o=this.direction.dot(Yr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fn.subVectors(this.origin,e);const c=a*this.direction.dot(Hs.crossVectors(Fn,Hs));if(c<0)return null;const l=a*this.direction.dot($r.cross(Fn));if(l<0||c+l>o)return null;const h=-a*Fn.dot(Yr);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,i,r,o,a,c,l,h,u,d,m,g,_,p){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,d,m,g,_,p)}set(e,t,n,i,r,o,a,c,l,h,u,d,m,g,_,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=m,f[7]=g,f[11]=_,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/yi.setFromMatrixColumn(e,0).length(),r=1/yi.setFromMatrixColumn(e,1).length(),o=1/yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,m=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+m*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,m=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-m,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,m=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,m=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-m,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=m*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,m=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=m*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,m=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nd,e,id)}lookAt(e,t,n){const i=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),On.crossVectors(n,Bt),On.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),On.crossVectors(n,Bt)),On.normalize(),Gs.crossVectors(Bt,On),i[0]=On.x,i[4]=Gs.x,i[8]=Bt.x,i[1]=On.y,i[5]=Gs.y,i[9]=Bt.y,i[2]=On.z,i[6]=Gs.z,i[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],m=n[13],g=n[2],_=n[6],p=n[10],f=n[14],E=n[3],M=n[7],v=n[11],D=n[15],A=i[0],R=i[4],I=i[8],S=i[12],b=i[1],P=i[5],H=i[9],B=i[13],$=i[2],J=i[6],Y=i[10],ee=i[14],W=i[3],ce=i[7],pe=i[11],Me=i[15];return r[0]=o*A+a*b+c*$+l*W,r[4]=o*R+a*P+c*J+l*ce,r[8]=o*I+a*H+c*Y+l*pe,r[12]=o*S+a*B+c*ee+l*Me,r[1]=h*A+u*b+d*$+m*W,r[5]=h*R+u*P+d*J+m*ce,r[9]=h*I+u*H+d*Y+m*pe,r[13]=h*S+u*B+d*ee+m*Me,r[2]=g*A+_*b+p*$+f*W,r[6]=g*R+_*P+p*J+f*ce,r[10]=g*I+_*H+p*Y+f*pe,r[14]=g*S+_*B+p*ee+f*Me,r[3]=E*A+M*b+v*$+D*W,r[7]=E*R+M*P+v*J+D*ce,r[11]=E*I+M*H+v*Y+D*pe,r[15]=E*S+M*B+v*ee+D*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14],g=e[3],_=e[7],p=e[11],f=e[15];return g*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*m-n*c*m)+_*(+t*c*m-t*l*d+r*o*d-i*o*m+i*l*h-r*c*h)+p*(+t*l*u-t*a*m-r*o*u+n*o*m+r*a*h-n*l*h)+f*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],g=e[12],_=e[13],p=e[14],f=e[15],E=u*p*l-_*d*l+_*c*m-a*p*m-u*c*f+a*d*f,M=g*d*l-h*p*l-g*c*m+o*p*m+h*c*f-o*d*f,v=h*_*l-g*u*l+g*a*m-o*_*m-h*a*f+o*u*f,D=g*u*c-h*_*c-g*a*d+o*_*d+h*a*p-o*u*p,A=t*E+n*M+i*v+r*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=E*R,e[1]=(_*d*r-u*p*r-_*i*m+n*p*m+u*i*f-n*d*f)*R,e[2]=(a*p*r-_*c*r+_*i*l-n*p*l-a*i*f+n*c*f)*R,e[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*m-n*c*m)*R,e[4]=M*R,e[5]=(h*p*r-g*d*r+g*i*m-t*p*m-h*i*f+t*d*f)*R,e[6]=(g*c*r-o*p*r-g*i*l+t*p*l+o*i*f-t*c*f)*R,e[7]=(o*d*r-h*c*r+h*i*l-t*d*l-o*i*m+t*c*m)*R,e[8]=v*R,e[9]=(g*u*r-h*_*r-g*n*m+t*_*m+h*n*f-t*u*f)*R,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*f+t*a*f)*R,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*m-t*a*m)*R,e[12]=D*R,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*p+t*u*p)*R,e[14]=(g*a*i-o*_*i-g*n*c+t*_*c+o*n*p-t*a*p)*R,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*R,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,m=r*h,g=r*u,_=o*h,p=o*u,f=a*u,E=c*l,M=c*h,v=c*u,D=n.x,A=n.y,R=n.z;return i[0]=(1-(_+f))*D,i[1]=(m+v)*D,i[2]=(g-M)*D,i[3]=0,i[4]=(m-v)*A,i[5]=(1-(d+f))*A,i[6]=(p+E)*A,i[7]=0,i[8]=(g+M)*R,i[9]=(p-E)*R,i[10]=(1-(d+_))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=yi.set(i[0],i[1],i[2]).length();const o=yi.set(i[4],i[5],i[6]).length(),a=yi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Jt.copy(this);const l=1/r,h=1/o,u=1/a;return Jt.elements[0]*=l,Jt.elements[1]*=l,Jt.elements[2]*=l,Jt.elements[4]*=h,Jt.elements[5]*=h,Jt.elements[6]*=h,Jt.elements[8]*=u,Jt.elements[9]*=u,Jt.elements[10]*=u,t.setFromRotationMatrix(Jt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=En){const c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let m,g;if(a===En)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Er)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=En){const c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*l,m=(n+i)*h;let g,_;if(a===En)g=(o+r)*u,_=-2*u;else if(a===Er)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const yi=new w,Jt=new tt,nd=new w(0,0,0),id=new w(1,1,1),On=new w,Gs=new w,Bt=new w,gc=new tt,_c=new Zi;class dn{constructor(e=0,t=0,n=0,i=dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Mt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _c.setFromEuler(this),this.setFromQuaternion(_c,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dn.DEFAULT_ORDER="XYZ";class Aa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sd=0;const xc=new w,bi=new Zi,xn=new tt,Ws=new w,is=new w,rd=new w,od=new Zi,vc=new w(1,0,0),yc=new w(0,1,0),bc=new w(0,0,1),Sc={type:"added"},ad={type:"removed"},Si={type:"childadded",child:null},qr={type:"childremoved",child:null};class gt extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new w,t=new dn,n=new Zi,i=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tt},normalMatrix:{value:new Ne}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return bi.setFromAxisAngle(e,t),this.quaternion.multiply(bi),this}rotateOnWorldAxis(e,t){return bi.setFromAxisAngle(e,t),this.quaternion.premultiply(bi),this}rotateX(e){return this.rotateOnAxis(vc,e)}rotateY(e){return this.rotateOnAxis(yc,e)}rotateZ(e){return this.rotateOnAxis(bc,e)}translateOnAxis(e,t){return xc.copy(e).applyQuaternion(this.quaternion),this.position.add(xc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vc,e)}translateY(e){return this.translateOnAxis(yc,e)}translateZ(e){return this.translateOnAxis(bc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ws.copy(e):Ws.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(is,Ws,this.up):xn.lookAt(Ws,is,this.up),this.quaternion.setFromRotationMatrix(xn),i&&(xn.extractRotation(i.matrixWorld),bi.setFromRotationMatrix(xn),this.quaternion.premultiply(bi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sc),Si.child=e,this.dispatchEvent(Si),Si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ad),qr.child=e,this.dispatchEvent(qr),qr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sc),Si.child=e,this.dispatchEvent(Si),Si.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,e,rd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,od,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}gt.DEFAULT_UP=new w(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qt=new w,vn=new w,jr=new w,yn=new w,Ei=new w,Mi=new w,Ec=new w,Zr=new w,Kr=new w,Jr=new w,Qr=new ct,eo=new ct,to=new ct;class Yt{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Qt.subVectors(e,t),i.cross(Qt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Qt.subVectors(i,t),vn.subVectors(n,t),jr.subVectors(e,t);const o=Qt.dot(Qt),a=Qt.dot(vn),c=Qt.dot(jr),l=vn.dot(vn),h=vn.dot(jr),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,m=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,yn.x),c.addScaledVector(o,yn.y),c.addScaledVector(a,yn.z),c)}static getInterpolatedAttribute(e,t,n,i,r,o){return Qr.setScalar(0),eo.setScalar(0),to.setScalar(0),Qr.fromBufferAttribute(e,t),eo.fromBufferAttribute(e,n),to.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Qr,r.x),o.addScaledVector(eo,r.y),o.addScaledVector(to,r.z),o}static isFrontFacing(e,t,n,i){return Qt.subVectors(n,t),vn.subVectors(e,t),Qt.cross(vn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),Qt.cross(vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Ei.subVectors(i,n),Mi.subVectors(r,n),Zr.subVectors(e,n);const c=Ei.dot(Zr),l=Mi.dot(Zr);if(c<=0&&l<=0)return t.copy(n);Kr.subVectors(e,i);const h=Ei.dot(Kr),u=Mi.dot(Kr);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ei,o);Jr.subVectors(e,r);const m=Ei.dot(Jr),g=Mi.dot(Jr);if(g>=0&&m<=g)return t.copy(r);const _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Mi,a);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Ec.subVectors(r,i),a=(u-h)/(u-h+(m-g)),t.copy(i).addScaledVector(Ec,a);const f=1/(p+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(Ei,o).addScaledVector(Mi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ql={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},Xs={h:0,s:0,l:0};function no(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class se{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=$e.workingColorSpace){if(e=Ca(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=no(o,r,e+1/3),this.g=no(o,r,e),this.b=no(o,r,e-1/3)}return $e.toWorkingColorSpace(this,i),this}setStyle(e,t=Rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=ql[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return $e.fromWorkingColorSpace(At.copy(this),e),Math.round(Mt(At.r*255,0,255))*65536+Math.round(Mt(At.g*255,0,255))*256+Math.round(Mt(At.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(At.copy(this),t);const n=At.r,i=At.g,r=At.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=Rt){$e.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,i=At.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(Xs);const n=ms(kn.h,Xs.h,t),i=ms(kn.s,Xs.s,t),r=ms(kn.l,Xs.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new se;se.NAMES=ql;let cd=0;class In extends ji{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=wn(),this.name="",this.blending=Fi,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=To,this.blendDst=Co,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new se(0,0,0),this.blendAlpha=0,this.depthFunc=Bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=oc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==To&&(n.blendSrc=this.blendSrc),this.blendDst!==Co&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==oc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Wi extends In{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=Il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new w,$s=new oe;class ut{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ha,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$s.fromBufferAttribute(this,t),$s.applyMatrix3(e),this.setXY(t,$s.x,$s.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array),r=Ke(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ha&&(e.usage=this.usage),e}}class jl extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zl extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class lt extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ld=0;const Xt=new tt,io=new gt,wi=new w,zt=new Is,ss=new Is,Et=new w;class et extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xl(e)?Zl:jl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ne().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return io.lookAt(e),io.updateMatrix(),this.applyMatrix4(io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new lt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];zt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ss.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(zt.min,ss.min),zt.expandByPoint(Et),Et.addVectors(zt.max,ss.max),zt.expandByPoint(Et)):(zt.expandByPoint(ss.min),zt.expandByPoint(ss.max))}zt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Et.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Et));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Et.fromBufferAttribute(a,l),c&&(wi.fromBufferAttribute(e,l),Et.add(wi)),i=Math.max(i,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ut(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new w,c[I]=new w;const l=new w,h=new w,u=new w,d=new oe,m=new oe,g=new oe,_=new w,p=new w;function f(I,S,b){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,I),m.fromBufferAttribute(r,S),g.fromBufferAttribute(r,b),h.sub(l),u.sub(l),m.sub(d),g.sub(d);const P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(P),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(P),a[I].add(_),a[S].add(_),a[b].add(_),c[I].add(p),c[S].add(p),c[b].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let I=0,S=E.length;I<S;++I){const b=E[I],P=b.start,H=b.count;for(let B=P,$=P+H;B<$;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const M=new w,v=new w,D=new w,A=new w;function R(I){D.fromBufferAttribute(i,I),A.copy(D);const S=a[I];M.copy(S),M.sub(D.multiplyScalar(D.dot(S))).normalize(),v.crossVectors(A,S);const P=v.dot(c[I])<0?-1:1;o.setXYZW(I,M.x,M.y,M.z,P)}for(let I=0,S=E.length;I<S;++I){const b=E[I],P=b.start,H=b.count;for(let B=P,$=P+H;B<$;B+=3)R(e.getX(B+0)),R(e.getX(B+1)),R(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const i=new w,r=new w,o=new w,a=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,m=e.count;d<m;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let m=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?m=c[_]*a.data.stride+a.offset:m=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[m++]}return new ut(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new et,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],m=e(d,n);c.push(m)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mc=new tt,Zn=new Nr,Ys=new Ls,wc=new w,qs=new w,js=new w,Zs=new w,so=new w,Ks=new w,Tc=new w,Js=new w;class ke extends gt{constructor(e=new et,t=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Ks.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(so.fromBufferAttribute(u,e),o?Ks.addScaledVector(so,h):Ks.addScaledVector(so.sub(t),h))}t.add(Ks)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(r),Zn.copy(e.ray).recast(e.near),!(Ys.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Ys,wc)===null||Zn.origin.distanceToSquared(wc)>(e.far-e.near)**2))&&(Mc.copy(r).invert(),Zn.copy(e.ray).applyMatrix4(Mc),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zn)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],f=o[p.materialIndex],E=Math.max(p.start,m.start),M=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let v=E,D=M;v<D;v+=3){const A=a.getX(v),R=a.getX(v+1),I=a.getX(v+2);i=Qs(this,f,e,n,l,h,u,A,R,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const E=a.getX(p),M=a.getX(p+1),v=a.getX(p+2);i=Qs(this,o,e,n,l,h,u,E,M,v),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],f=o[p.materialIndex],E=Math.max(p.start,m.start),M=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let v=E,D=M;v<D;v+=3){const A=v,R=v+1,I=v+2;i=Qs(this,f,e,n,l,h,u,A,R,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const E=p,M=p+1,v=p+2;i=Qs(this,o,e,n,l,h,u,E,M,v),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function hd(s,e,t,n,i,r,o,a){let c;if(e.side===Nt?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Gn,a),c===null)return null;Js.copy(a),Js.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Js);return l<t.near||l>t.far?null:{distance:l,point:Js.clone(),object:s}}function Qs(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,qs),s.getVertexPosition(c,js),s.getVertexPosition(l,Zs);const h=hd(s,e,t,n,qs,js,Zs,Tc);if(h){const u=new w;Yt.getBarycoord(Tc,qs,js,Zs,u),i&&(h.uv=Yt.getInterpolatedAttribute(i,a,c,l,u,new oe)),r&&(h.uv1=Yt.getInterpolatedAttribute(r,a,c,l,u,new oe)),o&&(h.normal=Yt.getInterpolatedAttribute(o,a,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new w,materialIndex:0};Yt.getNormal(qs,js,Zs,d.normal),h.face=d,h.barycoord=u}return h}class un extends et{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,m=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(h,3)),this.setAttribute("uv",new lt(u,2));function g(_,p,f,E,M,v,D,A,R,I,S){const b=v/R,P=D/I,H=v/2,B=D/2,$=A/2,J=R+1,Y=I+1;let ee=0,W=0;const ce=new w;for(let pe=0;pe<Y;pe++){const Me=pe*P-B;for(let Be=0;Be<J;Be++){const Qe=Be*b-H;ce[_]=Qe*E,ce[p]=Me*M,ce[f]=$,l.push(ce.x,ce.y,ce.z),ce[_]=0,ce[p]=0,ce[f]=A>0?1:-1,h.push(ce.x,ce.y,ce.z),u.push(Be/R),u.push(1-pe/I),ee+=1}}for(let pe=0;pe<I;pe++)for(let Me=0;Me<R;Me++){const Be=d+Me+J*pe,Qe=d+Me+J*(pe+1),j=d+(Me+1)+J*(pe+1),ie=d+(Me+1)+J*pe;c.push(Be,Qe,ie),c.push(Qe,j,ie),W+=6}a.addGroup(m,W,S),m+=W,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new un(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xi(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Dt(s){const e={};for(let t=0;t<s.length;t++){const n=Xi(s[t]);for(const i in n)e[i]=n[i]}return e}function ud(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Kl(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const dd={clone:Xi,merge:Dt};var fd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends In{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fd,this.fragmentShader=pd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xi(e.uniforms),this.uniformsGroups=ud(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Jl extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=En}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new w,Cc=new oe,Ac=new oe;class $t extends Jl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ss*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,Cc,Ac),t.subVectors(Ac,Cc)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ps*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ti=-90,Ci=1;class md extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $t(Ti,Ci,e,t);i.layers=this.layers,this.add(i);const r=new $t(Ti,Ci,e,t);r.layers=this.layers,this.add(r);const o=new $t(Ti,Ci,e,t);o.layers=this.layers,this.add(o);const a=new $t(Ti,Ci,e,t);a.layers=this.layers,this.add(a);const c=new $t(Ti,Ci,e,t);c.layers=this.layers,this.add(c);const l=new $t(Ti,Ci,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ql extends yt{constructor(e,t,n,i,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:zi,super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gd extends di{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ql(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new un(5,5,5),r=new Pn({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nt,blending:Hn});r.uniforms.tEquirect.value=t;const o=new ke(i,r),a=t.minFilter;return t.minFilter===ai&&(t.minFilter=ln),new md(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const ro=new w,_d=new w,xd=new Ne;class ei{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ro.subVectors(n,t).cross(_d.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ro),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||xd.getNormalMatrix(e),i=this.coplanarPoint(ro).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kn=new Ls,er=new w;class Ra{constructor(e=new ei,t=new ei,n=new ei,i=new ei,r=new ei,o=new ei){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],m=i[8],g=i[9],_=i[10],p=i[11],f=i[12],E=i[13],M=i[14],v=i[15];if(n[0].setComponents(c-r,d-l,p-m,v-f).normalize(),n[1].setComponents(c+r,d+l,p+m,v+f).normalize(),n[2].setComponents(c+o,d+h,p+g,v+E).normalize(),n[3].setComponents(c-o,d-h,p-g,v-E).normalize(),n[4].setComponents(c-a,d-u,p-_,v-M).normalize(),t===En)n[5].setComponents(c+a,d+u,p+_,v+M).normalize();else if(t===Er)n[5].setComponents(a,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){return Kn.center.set(0,0,0),Kn.radius=.7071067811865476,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(er.x=i.normal.x>0?e.max.x:e.min.x,er.y=i.normal.y>0?e.max.y:e.min.y,er.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(er)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function eh(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function vd(s){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=s.SHORT;else if(l instanceof Uint32Array)m=s.UNSIGNED_INT;else if(l instanceof Int32Array)m=s.INT;else if(l instanceof Int8Array)m=s.BYTE;else if(l instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(s.bindBuffer(l,a),u.length===0)s.bufferSubData(l,0,h);else{u.sort((m,g)=>m.start-g.start);let d=0;for(let m=1;m<u.length;m++){const g=u[d],_=u[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let m=0,g=u.length;m<g;m++){const _=u[m];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(s.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}class Ki extends et{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,m=[],g=[],_=[],p=[];for(let f=0;f<h;f++){const E=f*d-o;for(let M=0;M<l;M++){const v=M*u-r;g.push(v,-E,0),_.push(0,0,1),p.push(M/a),p.push(1-f/c)}}for(let f=0;f<c;f++)for(let E=0;E<a;E++){const M=E+l*f,v=E+l*(f+1),D=E+1+l*(f+1),A=E+1+l*f;m.push(M,v,A),m.push(v,D,A)}this.setIndex(m),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.width,e.height,e.widthSegments,e.heightSegments)}}var yd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bd=`#ifdef USE_ALPHAHASH
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
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Md=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Td=`#ifdef USE_AOMAP
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
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ad=`#ifdef USE_BATCHING
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
#endif`,Rd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ld=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dd=`#ifdef USE_IRIDESCENCE
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
#endif`,Ud=`#ifdef USE_BUMPMAP
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
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Gd=`#define PI 3.141592653589793
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
} // validated`,Wd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xd=`vec3 transformedNormal = objectNormal;
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
#endif`,$d=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jd=`#ifdef USE_ENVMAP
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
#endif`,Qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ef=`#ifdef USE_ENVMAP
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
#endif`,tf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
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
#endif`,sf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,of=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,af=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cf=`#ifdef USE_GRADIENTMAP
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
}`,lf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,df=`uniform bool receiveShadow;
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
#endif`,ff=`#ifdef USE_ENVMAP
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
#endif`,pf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xf=`PhysicalMaterial material;
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
#endif`,vf=`struct PhysicalMaterial {
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
}`,yf=`
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
#endif`,bf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Af=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pf=`#if defined( USE_POINTS_UV )
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
#endif`,If=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Df=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Uf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`#ifdef USE_MORPHTARGETS
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
#endif`,Of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Bf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gf=`#ifdef USE_NORMALMAP
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
#endif`,Wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$f=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,np=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rp=`float getShadowMask() {
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
}`,op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ap=`#ifdef USE_SKINNING
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
#endif`,cp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lp=`#ifdef USE_SKINNING
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
#endif`,hp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,up=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pp=`#ifdef USE_TRANSMISSION
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
#endif`,mp=`#ifdef USE_TRANSMISSION
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
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bp=`uniform sampler2D t2D;
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
}`,Sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`#include <common>
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
}`,Cp=`#if DEPTH_PACKING == 3200
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
}`,Ap=`#define DISTANCE
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
}`,Rp=`#define DISTANCE
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
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ip=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`uniform float scale;
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
}`,Dp=`uniform vec3 diffuse;
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
}`,Up=`#include <common>
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
}`,Np=`uniform vec3 diffuse;
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
}`,Fp=`#define LAMBERT
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
}`,Op=`#define LAMBERT
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
}`,kp=`#define MATCAP
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
}`,Bp=`#define MATCAP
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
}`,zp=`#define NORMAL
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
}`,Vp=`#define NORMAL
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
}`,Hp=`#define PHONG
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
}`,Gp=`#define PHONG
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
}`,Wp=`#define STANDARD
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
}`,Xp=`#define STANDARD
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
}`,$p=`#define TOON
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
}`,Yp=`#define TOON
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
}`,qp=`uniform float size;
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
}`,jp=`uniform vec3 diffuse;
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
}`,Zp=`#include <common>
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
}`,Kp=`uniform vec3 color;
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
}`,Jp=`uniform float rotation;
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
}`,Qp=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:yd,alphahash_pars_fragment:bd,alphamap_fragment:Sd,alphamap_pars_fragment:Ed,alphatest_fragment:Md,alphatest_pars_fragment:wd,aomap_fragment:Td,aomap_pars_fragment:Cd,batching_pars_vertex:Ad,batching_vertex:Rd,begin_vertex:Pd,beginnormal_vertex:Id,bsdfs:Ld,iridescence_fragment:Dd,bumpmap_pars_fragment:Ud,clipping_planes_fragment:Nd,clipping_planes_pars_fragment:Fd,clipping_planes_pars_vertex:Od,clipping_planes_vertex:kd,color_fragment:Bd,color_pars_fragment:zd,color_pars_vertex:Vd,color_vertex:Hd,common:Gd,cube_uv_reflection_fragment:Wd,defaultnormal_vertex:Xd,displacementmap_pars_vertex:$d,displacementmap_vertex:Yd,emissivemap_fragment:qd,emissivemap_pars_fragment:jd,colorspace_fragment:Zd,colorspace_pars_fragment:Kd,envmap_fragment:Jd,envmap_common_pars_fragment:Qd,envmap_pars_fragment:ef,envmap_pars_vertex:tf,envmap_physical_pars_fragment:ff,envmap_vertex:nf,fog_vertex:sf,fog_pars_vertex:rf,fog_fragment:of,fog_pars_fragment:af,gradientmap_pars_fragment:cf,lightmap_pars_fragment:lf,lights_lambert_fragment:hf,lights_lambert_pars_fragment:uf,lights_pars_begin:df,lights_toon_fragment:pf,lights_toon_pars_fragment:mf,lights_phong_fragment:gf,lights_phong_pars_fragment:_f,lights_physical_fragment:xf,lights_physical_pars_fragment:vf,lights_fragment_begin:yf,lights_fragment_maps:bf,lights_fragment_end:Sf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:Mf,logdepthbuf_pars_vertex:wf,logdepthbuf_vertex:Tf,map_fragment:Cf,map_pars_fragment:Af,map_particle_fragment:Rf,map_particle_pars_fragment:Pf,metalnessmap_fragment:If,metalnessmap_pars_fragment:Lf,morphinstance_vertex:Df,morphcolor_vertex:Uf,morphnormal_vertex:Nf,morphtarget_pars_vertex:Ff,morphtarget_vertex:Of,normal_fragment_begin:kf,normal_fragment_maps:Bf,normal_pars_fragment:zf,normal_pars_vertex:Vf,normal_vertex:Hf,normalmap_pars_fragment:Gf,clearcoat_normal_fragment_begin:Wf,clearcoat_normal_fragment_maps:Xf,clearcoat_pars_fragment:$f,iridescence_pars_fragment:Yf,opaque_fragment:qf,packing:jf,premultiplied_alpha_fragment:Zf,project_vertex:Kf,dithering_fragment:Jf,dithering_pars_fragment:Qf,roughnessmap_fragment:ep,roughnessmap_pars_fragment:tp,shadowmap_pars_fragment:np,shadowmap_pars_vertex:ip,shadowmap_vertex:sp,shadowmask_pars_fragment:rp,skinbase_vertex:op,skinning_pars_vertex:ap,skinning_vertex:cp,skinnormal_vertex:lp,specularmap_fragment:hp,specularmap_pars_fragment:up,tonemapping_fragment:dp,tonemapping_pars_fragment:fp,transmission_fragment:pp,transmission_pars_fragment:mp,uv_pars_fragment:gp,uv_pars_vertex:_p,uv_vertex:xp,worldpos_vertex:vp,background_vert:yp,background_frag:bp,backgroundCube_vert:Sp,backgroundCube_frag:Ep,cube_vert:Mp,cube_frag:wp,depth_vert:Tp,depth_frag:Cp,distanceRGBA_vert:Ap,distanceRGBA_frag:Rp,equirect_vert:Pp,equirect_frag:Ip,linedashed_vert:Lp,linedashed_frag:Dp,meshbasic_vert:Up,meshbasic_frag:Np,meshlambert_vert:Fp,meshlambert_frag:Op,meshmatcap_vert:kp,meshmatcap_frag:Bp,meshnormal_vert:zp,meshnormal_frag:Vp,meshphong_vert:Hp,meshphong_frag:Gp,meshphysical_vert:Wp,meshphysical_frag:Xp,meshtoon_vert:$p,meshtoon_frag:Yp,points_vert:qp,points_frag:jp,shadow_vert:Zp,shadow_frag:Kp,sprite_vert:Jp,sprite_frag:Qp},re={common:{diffuse:{value:new se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new se(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},cn={basic:{uniforms:Dt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Dt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new se(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Dt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new se(0)},specular:{value:new se(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Dt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Dt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new se(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Dt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Dt([re.points,re.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Dt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Dt([re.common,re.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Dt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Dt([re.sprite,re.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:Dt([re.common,re.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:Dt([re.lights,re.fog,{color:{value:new se(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};cn.physical={uniforms:Dt([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new se(0)},specularColor:{value:new se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const tr={r:0,b:0,g:0},Jn=new dn,em=new tt;function tm(s,e,t,n,i,r,o){const a=new se(0);let c=r===!0?0:1,l,h,u=null,d=0,m=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?t:e).get(M)),M}function _(E){let M=!1;const v=g(E);v===null?f(a,c):v&&v.isColor&&(f(v,1),M=!0);const D=s.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(E,M){const v=g(M);v&&(v.isCubeTexture||v.mapping===Dr)?(h===void 0&&(h=new ke(new un(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Xi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Jn.copy(M.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(em.makeRotationFromEuler(Jn)),h.material.toneMapped=$e.getTransfer(v.colorSpace)!==Je,(u!==v||d!==v.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,m=s.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ke(new Ki(2,2),new Pn({name:"BackgroundMaterial",uniforms:Xi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=$e.getTransfer(v.colorSpace)!==Je,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||m!==s.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,m=s.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function f(E,M){E.getRGB(tr,Kl(s)),n.buffers.color.setClear(tr.r,tr.g,tr.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(E,M=1){a.set(E),c=M,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,f(a,c)},render:_,addToRenderList:p}}function nm(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(b,P,H,B,$){let J=!1;const Y=u(B,H,P);r!==Y&&(r=Y,l(r.object)),J=m(b,B,H,$),J&&g(b,B,H,$),$!==null&&e.update($,s.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,v(b,P,H,B),$!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function c(){return s.createVertexArray()}function l(b){return s.bindVertexArray(b)}function h(b){return s.deleteVertexArray(b)}function u(b,P,H){const B=H.wireframe===!0;let $=n[b.id];$===void 0&&($={},n[b.id]=$);let J=$[P.id];J===void 0&&(J={},$[P.id]=J);let Y=J[B];return Y===void 0&&(Y=d(c()),J[B]=Y),Y}function d(b){const P=[],H=[],B=[];for(let $=0;$<t;$++)P[$]=0,H[$]=0,B[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:H,attributeDivisors:B,object:b,attributes:{},index:null}}function m(b,P,H,B){const $=r.attributes,J=P.attributes;let Y=0;const ee=H.getAttributes();for(const W in ee)if(ee[W].location>=0){const pe=$[W];let Me=J[W];if(Me===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(Me=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(Me=b.instanceColor)),pe===void 0||pe.attribute!==Me||Me&&pe.data!==Me.data)return!0;Y++}return r.attributesNum!==Y||r.index!==B}function g(b,P,H,B){const $={},J=P.attributes;let Y=0;const ee=H.getAttributes();for(const W in ee)if(ee[W].location>=0){let pe=J[W];pe===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(pe=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(pe=b.instanceColor));const Me={};Me.attribute=pe,pe&&pe.data&&(Me.data=pe.data),$[W]=Me,Y++}r.attributes=$,r.attributesNum=Y,r.index=B}function _(){const b=r.newAttributes;for(let P=0,H=b.length;P<H;P++)b[P]=0}function p(b){f(b,0)}function f(b,P){const H=r.newAttributes,B=r.enabledAttributes,$=r.attributeDivisors;H[b]=1,B[b]===0&&(s.enableVertexAttribArray(b),B[b]=1),$[b]!==P&&(s.vertexAttribDivisor(b,P),$[b]=P)}function E(){const b=r.newAttributes,P=r.enabledAttributes;for(let H=0,B=P.length;H<B;H++)P[H]!==b[H]&&(s.disableVertexAttribArray(H),P[H]=0)}function M(b,P,H,B,$,J,Y){Y===!0?s.vertexAttribIPointer(b,P,H,$,J):s.vertexAttribPointer(b,P,H,B,$,J)}function v(b,P,H,B){_();const $=B.attributes,J=H.getAttributes(),Y=P.defaultAttributeValues;for(const ee in J){const W=J[ee];if(W.location>=0){let ce=$[ee];if(ce===void 0&&(ee==="instanceMatrix"&&b.instanceMatrix&&(ce=b.instanceMatrix),ee==="instanceColor"&&b.instanceColor&&(ce=b.instanceColor)),ce!==void 0){const pe=ce.normalized,Me=ce.itemSize,Be=e.get(ce);if(Be===void 0)continue;const Qe=Be.buffer,j=Be.type,ie=Be.bytesPerElement,be=j===s.INT||j===s.UNSIGNED_INT||ce.gpuType===ba;if(ce.isInterleavedBufferAttribute){const le=ce.data,Ae=le.stride,Le=ce.offset;if(le.isInstancedInterleavedBuffer){for(let ze=0;ze<W.locationSize;ze++)f(W.location+ze,le.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ze=0;ze<W.locationSize;ze++)p(W.location+ze);s.bindBuffer(s.ARRAY_BUFFER,Qe);for(let ze=0;ze<W.locationSize;ze++)M(W.location+ze,Me/W.locationSize,j,pe,Ae*ie,(Le+Me/W.locationSize*ze)*ie,be)}else{if(ce.isInstancedBufferAttribute){for(let le=0;le<W.locationSize;le++)f(W.location+le,ce.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let le=0;le<W.locationSize;le++)p(W.location+le);s.bindBuffer(s.ARRAY_BUFFER,Qe);for(let le=0;le<W.locationSize;le++)M(W.location+le,Me/W.locationSize,j,pe,Me*ie,Me/W.locationSize*le*ie,be)}}else if(Y!==void 0){const pe=Y[ee];if(pe!==void 0)switch(pe.length){case 2:s.vertexAttrib2fv(W.location,pe);break;case 3:s.vertexAttrib3fv(W.location,pe);break;case 4:s.vertexAttrib4fv(W.location,pe);break;default:s.vertexAttrib1fv(W.location,pe)}}}}E()}function D(){I();for(const b in n){const P=n[b];for(const H in P){const B=P[H];for(const $ in B)h(B[$].object),delete B[$];delete P[H]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const P=n[b.id];for(const H in P){const B=P[H];for(const $ in B)h(B[$].object),delete B[$];delete P[H]}delete n[b.id]}function R(b){for(const P in n){const H=n[P];if(H[b.id]===void 0)continue;const B=H[b.id];for(const $ in B)h(B[$].object),delete B[$];delete H[b.id]}}function I(){S(),o=!0,r!==i&&(r=i,l(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:p,disableUnusedAttributes:E}}function im(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];t.update(m,n,1)}function c(l,h,u,d){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function sm(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==sn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const I=R===Ps&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Rn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Sn&&!I)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:D,maxSamples:A}}function rm(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new ei,a=new Ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||i;return i=d,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,m){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!p)r?h(null):l();else{const E=r?0:n,M=E*4;let v=f.clippingState||null;c.value=v,v=h(g,d,M,m);for(let D=0;D!==M;++D)v[D]=t[D];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,m,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const f=m+_*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(p===null||p.length<f)&&(p=new Float32Array(f));for(let M=0,v=m;M!==_;++M,v+=4)o.copy(u[M]).applyMatrix4(E,a),o.normal.toArray(p,v),p[v+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function om(s){let e=new WeakMap;function t(o,a){return a===No?o.mapping=zi:a===Fo&&(o.mapping=Vi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===No||a===Fo)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new gd(c.height);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Pa extends Jl{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ni=4,Rc=[.125,.215,.35,.446,.526,.582],si=20,oo=new Pa,Pc=new se;let ao=null,co=0,lo=0,ho=!1;const ti=(1+Math.sqrt(5))/2,Ai=1/ti,Ic=[new w(-ti,Ai,0),new w(ti,Ai,0),new w(-Ai,0,ti),new w(Ai,0,ti),new w(0,ti,-Ai),new w(0,ti,Ai),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Lc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ao=this._renderer.getRenderTarget(),co=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ao,co,lo),this._renderer.xr.enabled=ho,e.scissorTest=!1,nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ao=this._renderer.getRenderTarget(),co=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Ps,format:sn,colorSpace:qi,depthBuffer:!1},i=Dc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=am(r)),this._blurMaterial=cm(r,e,t)}return i}_compileMaterial(e){const t=new ke(this._lodPlanes[0],e);this._renderer.compile(t,oo)}_sceneToCubeUV(e,t,n,i){const a=new $t(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Pc),h.toneMapping=Mn,h.autoClear=!1;const m=new Wi({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),g=new ke(new un,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(Pc),_=!0);for(let f=0;f<6;f++){const E=f%3;E===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):E===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const M=this._cubeSize;nr(i,E*M,f>2?M:0,M,M),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===zi||e.mapping===Vi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uc());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new ke(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;nr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,oo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ic[(i-r-1)%Ic.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ke(this._lodPlanes[i],l),d=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*si-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):si;p>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${si}`);const f=[];let E=0;for(let R=0;R<si;++R){const I=R/_,S=Math.exp(-I*I/2);f.push(S),R===0?E+=S:R<p&&(E+=2*S)}for(let R=0;R<f.length;R++)f[R]=f[R]/E;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const v=this._sizeLods[i],D=3*v*(i>M-Ni?i-M+Ni:0),A=4*(this._cubeSize-v);nr(t,D,A,3*v,2*v),c.setRenderTarget(t),c.render(u,oo)}}function am(s){const e=[],t=[],n=[];let i=s;const r=s-Ni+1+Rc.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Ni?c=Rc[o-s+Ni-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,_=3,p=2,f=1,E=new Float32Array(_*g*m),M=new Float32Array(p*g*m),v=new Float32Array(f*g*m);for(let A=0;A<m;A++){const R=A%3*2/3-1,I=A>2?0:-1,S=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];E.set(S,_*g*A),M.set(d,p*g*A);const b=[A,A,A,A,A,A];v.set(b,f*g*A)}const D=new et;D.setAttribute("position",new ut(E,_)),D.setAttribute("uv",new ut(M,p)),D.setAttribute("faceIndex",new ut(v,f)),e.push(D),i>Ni&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dc(s,e,t){const n=new di(s,e,t);return n.texture.mapping=Dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function nr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function cm(s,e,t){const n=new Float32Array(si),i=new w(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Uc(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Nc(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Ia(){return`

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
	`}function lm(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===No||c===Fo,h=c===zi||c===Vi;if(l||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Lc(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return l&&m&&m.height>0||h&&m&&i(m)?(t===null&&(t=new Lc(s)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function hm(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ds("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function um(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,f=_.length;p<f;p++)e.remove(_[p])}d.removeEventListener("dispose",o),delete i[d.id];const m=r.get(d);m&&(e.remove(m),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let p=0,f=_.length;p<f;p++)e.update(_[p],s.ARRAY_BUFFER)}}function l(u){const d=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const E=m.array;_=m.version;for(let M=0,v=E.length;M<v;M+=3){const D=E[M+0],A=E[M+1],R=E[M+2];d.push(D,A,A,R,R,D)}}else if(g!==void 0){const E=g.array;_=g.version;for(let M=0,v=E.length/3-1;M<v;M+=3){const D=M+0,A=M+1,R=M+2;d.push(D,A,A,R,R,D)}}else return;const p=new(Xl(d)?Zl:jl)(d,1);p.version=_;const f=r.get(u);f&&e.remove(f),r.set(u,p)}function h(u){const d=r.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function dm(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,m){s.drawElements(n,m,r,d*o),t.update(m,n,1)}function l(d,m,g){g!==0&&(s.drawElementsInstanced(n,m,r,d*o,g),t.update(m,n,g))}function h(d,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,d,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];t.update(p,n,1)}function u(d,m,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<d.length;f++)l(d[f]/o,m[f],_[f]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,d,0,_,0,g);let f=0;for(let E=0;E<g;E++)f+=m[E]*_[E];t.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function fm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function pm(s,e,t){const n=new WeakMap,i=new ct;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var m=b;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),p===!0&&(v=3);let D=a.attributes.position.count*v,A=1;D>e.maxTextureSize&&(A=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const R=new Float32Array(D*A*4*u),I=new Yl(R,D,A,u);I.type=Sn,I.needsUpdate=!0;const S=v*4;for(let P=0;P<u;P++){const H=f[P],B=E[P],$=M[P],J=D*A*4*P;for(let Y=0;Y<H.count;Y++){const ee=Y*S;g===!0&&(i.fromBufferAttribute(H,Y),R[J+ee+0]=i.x,R[J+ee+1]=i.y,R[J+ee+2]=i.z,R[J+ee+3]=0),_===!0&&(i.fromBufferAttribute(B,Y),R[J+ee+4]=i.x,R[J+ee+5]=i.y,R[J+ee+6]=i.z,R[J+ee+7]=0),p===!0&&(i.fromBufferAttribute($,Y),R[J+ee+8]=i.x,R[J+ee+9]=i.y,R[J+ee+10]=i.z,R[J+ee+11]=$.itemSize===4?i.w:1)}}d={count:u,texture:I,size:new oe(D,A)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function mm(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class th extends yt{constructor(e,t,n,i,r,o,a,c,l,h=Oi){if(h!==Oi&&h!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Oi&&(n=ui),n===void 0&&h===Gi&&(n=Hi),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:on,this.minFilter=c!==void 0?c:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const nh=new yt,Fc=new th(1,1),ih=new Yl,sh=new ed,rh=new Ql,Oc=[],kc=[],Bc=new Float32Array(16),zc=new Float32Array(9),Vc=new Float32Array(4);function Ji(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Oc[i];if(r===void 0&&(r=new Float32Array(i),Oc[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function bt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function St(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Fr(s,e){let t=kc[e];t===void 0&&(t=new Int32Array(e),kc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function gm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function _m(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;s.uniform2fv(this.addr,e),St(t,e)}}function xm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;s.uniform3fv(this.addr,e),St(t,e)}}function vm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;s.uniform4fv(this.addr,e),St(t,e)}}function ym(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(bt(t,n))return;Vc.set(n),s.uniformMatrix2fv(this.addr,!1,Vc),St(t,n)}}function bm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(bt(t,n))return;zc.set(n),s.uniformMatrix3fv(this.addr,!1,zc),St(t,n)}}function Sm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(bt(t,n))return;Bc.set(n),s.uniformMatrix4fv(this.addr,!1,Bc),St(t,n)}}function Em(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Mm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;s.uniform2iv(this.addr,e),St(t,e)}}function wm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;s.uniform3iv(this.addr,e),St(t,e)}}function Tm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;s.uniform4iv(this.addr,e),St(t,e)}}function Cm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Am(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;s.uniform2uiv(this.addr,e),St(t,e)}}function Rm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;s.uniform3uiv(this.addr,e),St(t,e)}}function Pm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;s.uniform4uiv(this.addr,e),St(t,e)}}function Im(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Fc.compareFunction=Wl,r=Fc):r=nh,t.setTexture2D(e||r,i)}function Lm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||sh,i)}function Dm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||rh,i)}function Um(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ih,i)}function Nm(s){switch(s){case 5126:return gm;case 35664:return _m;case 35665:return xm;case 35666:return vm;case 35674:return ym;case 35675:return bm;case 35676:return Sm;case 5124:case 35670:return Em;case 35667:case 35671:return Mm;case 35668:case 35672:return wm;case 35669:case 35673:return Tm;case 5125:return Cm;case 36294:return Am;case 36295:return Rm;case 36296:return Pm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Lm;case 35680:case 36300:case 36308:case 36293:return Dm;case 36289:case 36303:case 36311:case 36292:return Um}}function Fm(s,e){s.uniform1fv(this.addr,e)}function Om(s,e){const t=Ji(e,this.size,2);s.uniform2fv(this.addr,t)}function km(s,e){const t=Ji(e,this.size,3);s.uniform3fv(this.addr,t)}function Bm(s,e){const t=Ji(e,this.size,4);s.uniform4fv(this.addr,t)}function zm(s,e){const t=Ji(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Vm(s,e){const t=Ji(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Hm(s,e){const t=Ji(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Gm(s,e){s.uniform1iv(this.addr,e)}function Wm(s,e){s.uniform2iv(this.addr,e)}function Xm(s,e){s.uniform3iv(this.addr,e)}function $m(s,e){s.uniform4iv(this.addr,e)}function Ym(s,e){s.uniform1uiv(this.addr,e)}function qm(s,e){s.uniform2uiv(this.addr,e)}function jm(s,e){s.uniform3uiv(this.addr,e)}function Zm(s,e){s.uniform4uiv(this.addr,e)}function Km(s,e,t){const n=this.cache,i=e.length,r=Fr(t,i);bt(n,r)||(s.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||nh,r[o])}function Jm(s,e,t){const n=this.cache,i=e.length,r=Fr(t,i);bt(n,r)||(s.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||sh,r[o])}function Qm(s,e,t){const n=this.cache,i=e.length,r=Fr(t,i);bt(n,r)||(s.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||rh,r[o])}function eg(s,e,t){const n=this.cache,i=e.length,r=Fr(t,i);bt(n,r)||(s.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||ih,r[o])}function tg(s){switch(s){case 5126:return Fm;case 35664:return Om;case 35665:return km;case 35666:return Bm;case 35674:return zm;case 35675:return Vm;case 35676:return Hm;case 5124:case 35670:return Gm;case 35667:case 35671:return Wm;case 35668:case 35672:return Xm;case 35669:case 35673:return $m;case 5125:return Ym;case 36294:return qm;case 36295:return jm;case 36296:return Zm;case 35678:case 36198:case 36298:case 36306:case 35682:return Km;case 35679:case 36299:case 36307:return Jm;case 35680:case 36300:case 36308:case 36293:return Qm;case 36289:case 36303:case 36311:case 36292:return eg}}class ng{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Nm(t.type)}}class ig{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tg(t.type)}}class sg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const uo=/(\w+)(\])?(\[|\.)?/g;function Hc(s,e){s.seq.push(e),s.map[e.id]=e}function rg(s,e,t){const n=s.name,i=n.length;for(uo.lastIndex=0;;){const r=uo.exec(n),o=uo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Hc(t,l===void 0?new ng(a,s,e):new ig(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new sg(a),Hc(t,u)),t=u}}}class br{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);rg(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Gc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const og=37297;let ag=0;function cg(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Wc=new Ne;function lg(s){$e._getMatrix(Wc,$e.workingColorSpace,s);const e=`mat3( ${Wc.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(s)){case Ur:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Xc(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+cg(s.getShaderSource(e),o)}else return i}function hg(s,e){const t=lg(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function ug(s,e){let t;switch(e){case du:t="Linear";break;case fu:t="Reinhard";break;case pu:t="Cineon";break;case mu:t="ACESFilmic";break;case _u:t="AgX";break;case xu:t="Neutral";break;case gu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ir=new w;function dg(){$e.getLuminanceCoefficients(ir);const s=ir.x.toFixed(4),e=ir.y.toFixed(4),t=ir.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fs).join(`
`)}function pg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function fs(s){return s!==""}function $c(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ua(s){return s.replace(gg,xg)}const _g=new Map;function xg(s,e){let t=Oe[e];if(t===void 0){const n=_g.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ua(t)}const vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(s){return s.replace(vg,yg)}function yg(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function jc(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function bg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Pl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Xh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function Sg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case zi:case Vi:e="ENVMAP_TYPE_CUBE";break;case Dr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Eg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Vi:e="ENVMAP_MODE_REFRACTION";break}return e}function Mg(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Il:e="ENVMAP_BLENDING_MULTIPLY";break;case hu:e="ENVMAP_BLENDING_MIX";break;case uu:e="ENVMAP_BLENDING_ADD";break}return e}function wg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Tg(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=bg(t),l=Sg(t),h=Eg(t),u=Mg(t),d=wg(t),m=fg(t),g=pg(r),_=i.createProgram();let p,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fs).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fs).join(`
`),f.length>0&&(f+=`
`)):(p=[jc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),f=[jc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mn?"#define TONE_MAPPING":"",t.toneMapping!==Mn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Mn?ug("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,hg("linearToOutputTexel",t.outputColorSpace),dg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fs).join(`
`)),o=ua(o),o=$c(o,t),o=Yc(o,t),a=ua(a),a=$c(a,t),a=Yc(a,t),o=qc(o),a=qc(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=E+p+o,v=E+f+a,D=Gc(i,i.VERTEX_SHADER,M),A=Gc(i,i.FRAGMENT_SHADER,v);i.attachShader(_,D),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(P){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(_).trim(),B=i.getShaderInfoLog(D).trim(),$=i.getShaderInfoLog(A).trim();let J=!0,Y=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,D,A);else{const ee=Xc(i,D,"vertex"),W=Xc(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+ee+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(B===""||$==="")&&(Y=!1);Y&&(P.diagnostics={runnable:J,programLog:H,vertexShader:{log:B,prefix:p},fragmentShader:{log:$,prefix:f}})}i.deleteShader(D),i.deleteShader(A),I=new br(i,_),S=mg(i,_)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(_,og)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ag++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=A,this}let Cg=0;class Ag{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Rg(e),t.set(e,n)),n}}class Rg{constructor(e){this.id=Cg++,this.code=e,this.usedTimes=0}}function Pg(s,e,t,n,i,r,o){const a=new Aa,c=new Ag,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function p(S,b,P,H,B){const $=H.fog,J=B.geometry,Y=S.isMeshStandardMaterial?H.environment:null,ee=(S.isMeshStandardMaterial?t:e).get(S.envMap||Y),W=ee&&ee.mapping===Dr?ee.image.height:null,ce=g[S.type];S.precision!==null&&(m=i.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const pe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Me=pe!==void 0?pe.length:0;let Be=0;J.morphAttributes.position!==void 0&&(Be=1),J.morphAttributes.normal!==void 0&&(Be=2),J.morphAttributes.color!==void 0&&(Be=3);let Qe,j,ie,be;if(ce){const Ze=cn[ce];Qe=Ze.vertexShader,j=Ze.fragmentShader}else Qe=S.vertexShader,j=S.fragmentShader,c.update(S),ie=c.getVertexShaderID(S),be=c.getFragmentShaderID(S);const le=s.getRenderTarget(),Ae=s.state.buffers.depth.getReversed(),Le=B.isInstancedMesh===!0,ze=B.isBatchedMesh===!0,ht=!!S.map,We=!!S.matcap,pt=!!ee,F=!!S.aoMap,Gt=!!S.lightMap,Ve=!!S.bumpMap,He=!!S.normalMap,Te=!!S.displacementMap,st=!!S.emissiveMap,we=!!S.metalnessMap,T=!!S.roughnessMap,x=S.anisotropy>0,O=S.clearcoat>0,Z=S.dispersion>0,Q=S.iridescence>0,q=S.sheen>0,Se=S.transmission>0,he=x&&!!S.anisotropyMap,me=O&&!!S.clearcoatMap,Xe=O&&!!S.clearcoatNormalMap,te=O&&!!S.clearcoatRoughnessMap,ge=Q&&!!S.iridescenceMap,Ce=Q&&!!S.iridescenceThicknessMap,Re=q&&!!S.sheenColorMap,_e=q&&!!S.sheenRoughnessMap,Ge=!!S.specularMap,Fe=!!S.specularColorMap,nt=!!S.specularIntensityMap,L=Se&&!!S.transmissionMap,ae=Se&&!!S.thicknessMap,G=!!S.gradientMap,K=!!S.alphaMap,fe=S.alphaTest>0,ue=!!S.alphaHash,De=!!S.extensions;let ft=Mn;S.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ft=s.toneMapping);const Tt={shaderID:ce,shaderType:S.type,shaderName:S.name,vertexShader:Qe,fragmentShader:j,defines:S.defines,customVertexShaderID:ie,customFragmentShaderID:be,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:ze,batchingColor:ze&&B._colorsTexture!==null,instancing:Le,instancingColor:Le&&B.instanceColor!==null,instancingMorph:Le&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?s.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:qi,alphaToCoverage:!!S.alphaToCoverage,map:ht,matcap:We,envMap:pt,envMapMode:pt&&ee.mapping,envMapCubeUVHeight:W,aoMap:F,lightMap:Gt,bumpMap:Ve,normalMap:He,displacementMap:d&&Te,emissiveMap:st,normalMapObjectSpace:He&&S.normalMapType===Su,normalMapTangentSpace:He&&S.normalMapType===Gl,metalnessMap:we,roughnessMap:T,anisotropy:x,anisotropyMap:he,clearcoat:O,clearcoatMap:me,clearcoatNormalMap:Xe,clearcoatRoughnessMap:te,dispersion:Z,iridescence:Q,iridescenceMap:ge,iridescenceThicknessMap:Ce,sheen:q,sheenColorMap:Re,sheenRoughnessMap:_e,specularMap:Ge,specularColorMap:Fe,specularIntensityMap:nt,transmission:Se,transmissionMap:L,thicknessMap:ae,gradientMap:G,opaque:S.transparent===!1&&S.blending===Fi&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:fe,alphaHash:ue,combine:S.combine,mapUv:ht&&_(S.map.channel),aoMapUv:F&&_(S.aoMap.channel),lightMapUv:Gt&&_(S.lightMap.channel),bumpMapUv:Ve&&_(S.bumpMap.channel),normalMapUv:He&&_(S.normalMap.channel),displacementMapUv:Te&&_(S.displacementMap.channel),emissiveMapUv:st&&_(S.emissiveMap.channel),metalnessMapUv:we&&_(S.metalnessMap.channel),roughnessMapUv:T&&_(S.roughnessMap.channel),anisotropyMapUv:he&&_(S.anisotropyMap.channel),clearcoatMapUv:me&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:_e&&_(S.sheenRoughnessMap.channel),specularMapUv:Ge&&_(S.specularMap.channel),specularColorMapUv:Fe&&_(S.specularColorMap.channel),specularIntensityMapUv:nt&&_(S.specularIntensityMap.channel),transmissionMapUv:L&&_(S.transmissionMap.channel),thicknessMapUv:ae&&_(S.thicknessMap.channel),alphaMapUv:K&&_(S.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(He||x),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!J.attributes.uv&&(ht||K),fog:!!$,useFog:S.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ae,skinning:B.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Be,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:ft,decodeVideoTexture:ht&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===Je,decodeVideoTextureEmissive:st&&S.emissiveMap.isVideoTexture===!0&&$e.getTransfer(S.emissiveMap.colorSpace)===Je,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===tn,flipSided:S.side===Nt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:De&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&S.extensions.multiDraw===!0||ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function f(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)b.push(P),b.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(E(b,S),M(b,S),b.push(s.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function E(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function M(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const b=g[S.type];let P;if(b){const H=cn[b];P=dd.clone(H.uniforms)}else P=S.uniforms;return P}function D(S,b){let P;for(let H=0,B=h.length;H<B;H++){const $=h[H];if($.cacheKey===b){P=$,++P.usedTimes;break}}return P===void 0&&(P=new Tg(s,b,S,r),h.push(P)),P}function A(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function R(S){c.remove(S)}function I(){c.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:v,acquireProgram:D,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:I}}function Ig(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Lg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Zc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Kc(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,m,g,_,p){let f=s[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},s[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=m,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=p),e++,f}function a(u,d,m,g,_,p){const f=o(u,d,m,g,_,p);m.transmission>0?n.push(f):m.transparent===!0?i.push(f):t.push(f)}function c(u,d,m,g,_,p){const f=o(u,d,m,g,_,p);m.transmission>0?n.unshift(f):m.transparent===!0?i.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||Lg),n.length>1&&n.sort(d||Zc),i.length>1&&i.sort(d||Zc)}function h(){for(let u=e,d=s.length;u<d;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function Dg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new Kc,s.set(n,[o])):i>=r.length?(o=new Kc,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Ug(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new se};break;case"SpotLight":t={position:new w,direction:new w,color:new se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new se,groundColor:new se};break;case"RectAreaLight":t={color:new se,position:new w,halfWidth:new w,halfHeight:new w};break}return s[e.id]=t,t}}}function Ng(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Fg=0;function Og(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function kg(s){const e=new Ug,t=Ng(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new w);const i=new w,r=new tt,o=new tt;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let m=0,g=0,_=0,p=0,f=0,E=0,M=0,v=0,D=0,A=0,R=0;l.sort(Og);for(let S=0,b=l.length;S<b;S++){const P=l[S],H=P.color,B=P.intensity,$=P.distance,J=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=H.r*B,u+=H.g*B,d+=H.b*B;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(P.sh.coefficients[Y],B);R++}else if(P.isDirectionalLight){const Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ee=P.shadow,W=t.get(P);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,n.directionalShadow[m]=W,n.directionalShadowMap[m]=J,n.directionalShadowMatrix[m]=P.shadow.matrix,E++}n.directional[m]=Y,m++}else if(P.isSpotLight){const Y=e.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(H).multiplyScalar(B),Y.distance=$,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,n.spot[_]=Y;const ee=P.shadow;if(P.map&&(n.spotLightMap[D]=P.map,D++,ee.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[_]=ee.matrix,P.castShadow){const W=t.get(P);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=J,v++}_++}else if(P.isRectAreaLight){const Y=e.get(P);Y.color.copy(H).multiplyScalar(B),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=Y,p++}else if(P.isPointLight){const Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const ee=P.shadow,W=t.get(P);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,W.shadowCameraNear=ee.camera.near,W.shadowCameraFar=ee.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=Y,g++}else if(P.isHemisphereLight){const Y=e.get(P);Y.skyColor.copy(P.color).multiplyScalar(B),Y.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[f]=Y,f++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==p||I.hemiLength!==f||I.numDirectionalShadows!==E||I.numPointShadows!==M||I.numSpotShadows!==v||I.numSpotMaps!==D||I.numLightProbes!==R)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+D-A,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,I.directionalLength=m,I.pointLength=g,I.spotLength=_,I.rectAreaLength=p,I.hemiLength=f,I.numDirectionalShadows=E,I.numPointShadows=M,I.numSpotShadows=v,I.numSpotMaps=D,I.numLightProbes=R,n.version=Fg++)}function c(l,h){let u=0,d=0,m=0,g=0,_=0;const p=h.matrixWorldInverse;for(let f=0,E=l.length;f<E;f++){const M=l[f];if(M.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(M.isSpotLight){const v=n.spot[m];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),m++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),o.identity(),r.copy(M.matrixWorld),r.premultiply(p),o.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:n}}function Jc(s){const e=new kg(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Bg(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Jc(s),e.set(i,[a])):r>=o.length?(a=new Jc(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class zg extends In{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=yu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Vg extends In{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Hg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gg=`uniform sampler2D shadow_pass;
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
}`;function Wg(s,e,t){let n=new Ra;const i=new oe,r=new oe,o=new ct,a=new zg({depthPacking:bu}),c=new Vg,l={},h=t.maxTextureSize,u={[Gn]:Nt,[Nt]:Gn,[tn]:tn},d=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:Hg,fragmentShader:Gg}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new et;g.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ke(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pl;let f=this.type;this.render=function(A,R,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const S=s.getRenderTarget(),b=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),H=s.state;H.setBlending(Hn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const B=f!==bn&&this.type===bn,$=f===bn&&this.type!==bn;for(let J=0,Y=A.length;J<Y;J++){const ee=A[J],W=ee.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const ce=W.getFrameExtents();if(i.multiply(ce),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ce.x),i.x=r.x*ce.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ce.y),i.y=r.y*ce.y,W.mapSize.y=r.y)),W.map===null||B===!0||$===!0){const Me=this.type!==bn?{minFilter:on,magFilter:on}:{};W.map!==null&&W.map.dispose(),W.map=new di(i.x,i.y,Me),W.map.texture.name=ee.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const pe=W.getViewportCount();for(let Me=0;Me<pe;Me++){const Be=W.getViewport(Me);o.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),H.viewport(o),W.updateMatrices(ee,Me),n=W.getFrustum(),v(R,I,W.camera,ee,this.type)}W.isPointLightShadow!==!0&&this.type===bn&&E(W,I),W.needsUpdate=!1}f=this.type,p.needsUpdate=!1,s.setRenderTarget(S,b,P)};function E(A,R){const I=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new di(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,I,d,_,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,I,m,_,null)}function M(A,R,I,S){let b=null;const P=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)b=P;else if(b=I.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const H=b.uuid,B=R.uuid;let $=l[H];$===void 0&&($={},l[H]=$);let J=$[B];J===void 0&&(J=b.clone(),$[B]=J,R.addEventListener("dispose",D)),b=J}if(b.visible=R.visible,b.wireframe=R.wireframe,S===bn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,I.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const H=s.properties.get(b);H.light=I}return b}function v(A,R,I,S,b){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===bn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const B=e.update(A),$=A.material;if(Array.isArray($)){const J=B.groups;for(let Y=0,ee=J.length;Y<ee;Y++){const W=J[Y],ce=$[W.materialIndex];if(ce&&ce.visible){const pe=M(A,ce,S,b);A.onBeforeShadow(s,A,R,I,B,pe,W),s.renderBufferDirect(I,null,B,pe,A,W),A.onAfterShadow(s,A,R,I,B,pe,W)}}}else if($.visible){const J=M(A,$,S,b);A.onBeforeShadow(s,A,R,I,B,J,null),s.renderBufferDirect(I,null,B,J,A,null),A.onAfterShadow(s,A,R,I,B,J,null)}}const H=A.children;for(let B=0,$=H.length;B<$;B++)v(H[B],R,I,S,b)}function D(A){A.target.removeEventListener("dispose",D);for(const I in l){const S=l[I],b=A.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const Xg={[Ao]:Ro,[Po]:Do,[Io]:Uo,[Bi]:Lo,[Ro]:Ao,[Do]:Po,[Uo]:Io,[Lo]:Bi};function $g(s,e){function t(){let L=!1;const ae=new ct;let G=null;const K=new ct(0,0,0,0);return{setMask:function(fe){G!==fe&&!L&&(s.colorMask(fe,fe,fe,fe),G=fe)},setLocked:function(fe){L=fe},setClear:function(fe,ue,De,ft,Tt){Tt===!0&&(fe*=ft,ue*=ft,De*=ft),ae.set(fe,ue,De,ft),K.equals(ae)===!1&&(s.clearColor(fe,ue,De,ft),K.copy(ae))},reset:function(){L=!1,G=null,K.set(-1,0,0,0)}}}function n(){let L=!1,ae=!1,G=null,K=null,fe=null;return{setReversed:function(ue){if(ae!==ue){const De=e.get("EXT_clip_control");ae?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);const ft=fe;fe=null,this.setClear(ft)}ae=ue},getReversed:function(){return ae},setTest:function(ue){ue?le(s.DEPTH_TEST):Ae(s.DEPTH_TEST)},setMask:function(ue){G!==ue&&!L&&(s.depthMask(ue),G=ue)},setFunc:function(ue){if(ae&&(ue=Xg[ue]),K!==ue){switch(ue){case Ao:s.depthFunc(s.NEVER);break;case Ro:s.depthFunc(s.ALWAYS);break;case Po:s.depthFunc(s.LESS);break;case Bi:s.depthFunc(s.LEQUAL);break;case Io:s.depthFunc(s.EQUAL);break;case Lo:s.depthFunc(s.GEQUAL);break;case Do:s.depthFunc(s.GREATER);break;case Uo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}K=ue}},setLocked:function(ue){L=ue},setClear:function(ue){fe!==ue&&(ae&&(ue=1-ue),s.clearDepth(ue),fe=ue)},reset:function(){L=!1,G=null,K=null,fe=null,ae=!1}}}function i(){let L=!1,ae=null,G=null,K=null,fe=null,ue=null,De=null,ft=null,Tt=null;return{setTest:function(Ze){L||(Ze?le(s.STENCIL_TEST):Ae(s.STENCIL_TEST))},setMask:function(Ze){ae!==Ze&&!L&&(s.stencilMask(Ze),ae=Ze)},setFunc:function(Ze,jt,pn){(G!==Ze||K!==jt||fe!==pn)&&(s.stencilFunc(Ze,jt,pn),G=Ze,K=jt,fe=pn)},setOp:function(Ze,jt,pn){(ue!==Ze||De!==jt||ft!==pn)&&(s.stencilOp(Ze,jt,pn),ue=Ze,De=jt,ft=pn)},setLocked:function(Ze){L=Ze},setClear:function(Ze){Tt!==Ze&&(s.clearStencil(Ze),Tt=Ze)},reset:function(){L=!1,ae=null,G=null,K=null,fe=null,ue=null,De=null,ft=null,Tt=null}}}const r=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,m=[],g=null,_=!1,p=null,f=null,E=null,M=null,v=null,D=null,A=null,R=new se(0,0,0),I=0,S=!1,b=null,P=null,H=null,B=null,$=null;const J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,ee=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=ee>=1):W.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=ee>=2);let ce=null,pe={};const Me=s.getParameter(s.SCISSOR_BOX),Be=s.getParameter(s.VIEWPORT),Qe=new ct().fromArray(Me),j=new ct().fromArray(Be);function ie(L,ae,G,K){const fe=new Uint8Array(4),ue=s.createTexture();s.bindTexture(L,ue),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let De=0;De<G;De++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(ae,0,s.RGBA,1,1,K,0,s.RGBA,s.UNSIGNED_BYTE,fe):s.texImage2D(ae+De,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,fe);return ue}const be={};be[s.TEXTURE_2D]=ie(s.TEXTURE_2D,s.TEXTURE_2D,1),be[s.TEXTURE_CUBE_MAP]=ie(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),be[s.TEXTURE_2D_ARRAY]=ie(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),be[s.TEXTURE_3D]=ie(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(s.DEPTH_TEST),o.setFunc(Bi),Ve(!1),He(ic),le(s.CULL_FACE),F(Hn);function le(L){h[L]!==!0&&(s.enable(L),h[L]=!0)}function Ae(L){h[L]!==!1&&(s.disable(L),h[L]=!1)}function Le(L,ae){return u[L]!==ae?(s.bindFramebuffer(L,ae),u[L]=ae,L===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ae),L===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ae),!0):!1}function ze(L,ae){let G=m,K=!1;if(L){G=d.get(ae),G===void 0&&(G=[],d.set(ae,G));const fe=L.textures;if(G.length!==fe.length||G[0]!==s.COLOR_ATTACHMENT0){for(let ue=0,De=fe.length;ue<De;ue++)G[ue]=s.COLOR_ATTACHMENT0+ue;G.length=fe.length,K=!0}}else G[0]!==s.BACK&&(G[0]=s.BACK,K=!0);K&&s.drawBuffers(G)}function ht(L){return g!==L?(s.useProgram(L),g=L,!0):!1}const We={[ii]:s.FUNC_ADD,[Yh]:s.FUNC_SUBTRACT,[qh]:s.FUNC_REVERSE_SUBTRACT};We[jh]=s.MIN,We[Zh]=s.MAX;const pt={[Kh]:s.ZERO,[Jh]:s.ONE,[Qh]:s.SRC_COLOR,[To]:s.SRC_ALPHA,[ru]:s.SRC_ALPHA_SATURATE,[iu]:s.DST_COLOR,[tu]:s.DST_ALPHA,[eu]:s.ONE_MINUS_SRC_COLOR,[Co]:s.ONE_MINUS_SRC_ALPHA,[su]:s.ONE_MINUS_DST_COLOR,[nu]:s.ONE_MINUS_DST_ALPHA,[ou]:s.CONSTANT_COLOR,[au]:s.ONE_MINUS_CONSTANT_COLOR,[cu]:s.CONSTANT_ALPHA,[lu]:s.ONE_MINUS_CONSTANT_ALPHA};function F(L,ae,G,K,fe,ue,De,ft,Tt,Ze){if(L===Hn){_===!0&&(Ae(s.BLEND),_=!1);return}if(_===!1&&(le(s.BLEND),_=!0),L!==$h){if(L!==p||Ze!==S){if((f!==ii||v!==ii)&&(s.blendEquation(s.FUNC_ADD),f=ii,v=ii),Ze)switch(L){case Fi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wo:s.blendFunc(s.ONE,s.ONE);break;case sc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case rc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Fi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case sc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case rc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}E=null,M=null,D=null,A=null,R.set(0,0,0),I=0,p=L,S=Ze}return}fe=fe||ae,ue=ue||G,De=De||K,(ae!==f||fe!==v)&&(s.blendEquationSeparate(We[ae],We[fe]),f=ae,v=fe),(G!==E||K!==M||ue!==D||De!==A)&&(s.blendFuncSeparate(pt[G],pt[K],pt[ue],pt[De]),E=G,M=K,D=ue,A=De),(ft.equals(R)===!1||Tt!==I)&&(s.blendColor(ft.r,ft.g,ft.b,Tt),R.copy(ft),I=Tt),p=L,S=!1}function Gt(L,ae){L.side===tn?Ae(s.CULL_FACE):le(s.CULL_FACE);let G=L.side===Nt;ae&&(G=!G),Ve(G),L.blending===Fi&&L.transparent===!1?F(Hn):F(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);const K=L.stencilWrite;a.setTest(K),K&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),st(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?le(s.SAMPLE_ALPHA_TO_COVERAGE):Ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(L){b!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),b=L)}function He(L){L!==Gh?(le(s.CULL_FACE),L!==P&&(L===ic?s.cullFace(s.BACK):L===Wh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ae(s.CULL_FACE),P=L}function Te(L){L!==H&&(Y&&s.lineWidth(L),H=L)}function st(L,ae,G){L?(le(s.POLYGON_OFFSET_FILL),(B!==ae||$!==G)&&(s.polygonOffset(ae,G),B=ae,$=G)):Ae(s.POLYGON_OFFSET_FILL)}function we(L){L?le(s.SCISSOR_TEST):Ae(s.SCISSOR_TEST)}function T(L){L===void 0&&(L=s.TEXTURE0+J-1),ce!==L&&(s.activeTexture(L),ce=L)}function x(L,ae,G){G===void 0&&(ce===null?G=s.TEXTURE0+J-1:G=ce);let K=pe[G];K===void 0&&(K={type:void 0,texture:void 0},pe[G]=K),(K.type!==L||K.texture!==ae)&&(ce!==G&&(s.activeTexture(G),ce=G),s.bindTexture(L,ae||be[L]),K.type=L,K.texture=ae)}function O(){const L=pe[ce];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Z(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function q(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Xe(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ge(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(L){Qe.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),Qe.copy(L))}function _e(L){j.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),j.copy(L))}function Ge(L,ae){let G=l.get(ae);G===void 0&&(G=new WeakMap,l.set(ae,G));let K=G.get(L);K===void 0&&(K=s.getUniformBlockIndex(ae,L.name),G.set(L,K))}function Fe(L,ae){const K=l.get(ae).get(L);c.get(ae)!==K&&(s.uniformBlockBinding(ae,K,L.__bindingPointIndex),c.set(ae,K))}function nt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ce=null,pe={},u={},d=new WeakMap,m=[],g=null,_=!1,p=null,f=null,E=null,M=null,v=null,D=null,A=null,R=new se(0,0,0),I=0,S=!1,b=null,P=null,H=null,B=null,$=null,Qe.set(0,0,s.canvas.width,s.canvas.height),j.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:le,disable:Ae,bindFramebuffer:Le,drawBuffers:ze,useProgram:ht,setBlending:F,setMaterial:Gt,setFlipSided:Ve,setCullFace:He,setLineWidth:Te,setPolygonOffset:st,setScissorTest:we,activeTexture:T,bindTexture:x,unbindTexture:O,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:ge,texImage3D:Ce,updateUBOMapping:Ge,uniformBlockBinding:Fe,texStorage2D:Xe,texStorage3D:te,texSubImage2D:q,texSubImage3D:Se,compressedTexSubImage2D:he,compressedTexSubImage3D:me,scissor:Re,viewport:_e,reset:nt}}function Qc(s,e,t,n){const i=Yg(n);switch(t){case Fl:return s*e;case kl:return s*e;case Bl:return s*e*2;case zl:return s*e/i.components*i.byteLength;case Ma:return s*e/i.components*i.byteLength;case Vl:return s*e*2/i.components*i.byteLength;case wa:return s*e*2/i.components*i.byteLength;case Ol:return s*e*3/i.components*i.byteLength;case sn:return s*e*4/i.components*i.byteLength;case Ta:return s*e*4/i.components*i.byteLength;case gr:case _r:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case xr:case vr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Bo:case Vo:return Math.max(s,16)*Math.max(e,8)/4;case ko:case zo:return Math.max(s,8)*Math.max(e,8)/2;case Ho:case Go:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Wo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Xo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case $o:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Yo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case qo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case jo:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Zo:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ko:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Jo:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Qo:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case ea:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ta:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case na:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case ia:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case sa:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case yr:case ra:case oa:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Hl:case aa:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ca:case la:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yg(s){switch(s){case Rn:case Dl:return{byteLength:1,components:1};case bs:case Ul:case Ps:return{byteLength:2,components:1};case Sa:case Ea:return{byteLength:2,components:4};case ui:case ba:case Sn:return{byteLength:4,components:1};case Nl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function qg(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new oe,h=new WeakMap;let u;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return m?new OffscreenCanvas(T,x):Es("canvas")}function _(T,x,O){let Z=1;const Q=we(T);if((Q.width>O||Q.height>O)&&(Z=O/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor(Z*Q.width),Se=Math.floor(Z*Q.height);u===void 0&&(u=g(q,Se));const he=x?g(q,Se):u;return he.width=q,he.height=Se,he.getContext("2d").drawImage(T,0,0,q,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+q+"x"+Se+")."),he}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function p(T){return T.generateMipmaps}function f(T){s.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(T,x,O,Z,Q=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=x;if(x===s.RED&&(O===s.FLOAT&&(q=s.R32F),O===s.HALF_FLOAT&&(q=s.R16F),O===s.UNSIGNED_BYTE&&(q=s.R8)),x===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(q=s.R8UI),O===s.UNSIGNED_SHORT&&(q=s.R16UI),O===s.UNSIGNED_INT&&(q=s.R32UI),O===s.BYTE&&(q=s.R8I),O===s.SHORT&&(q=s.R16I),O===s.INT&&(q=s.R32I)),x===s.RG&&(O===s.FLOAT&&(q=s.RG32F),O===s.HALF_FLOAT&&(q=s.RG16F),O===s.UNSIGNED_BYTE&&(q=s.RG8)),x===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(q=s.RG8UI),O===s.UNSIGNED_SHORT&&(q=s.RG16UI),O===s.UNSIGNED_INT&&(q=s.RG32UI),O===s.BYTE&&(q=s.RG8I),O===s.SHORT&&(q=s.RG16I),O===s.INT&&(q=s.RG32I)),x===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(q=s.RGB8UI),O===s.UNSIGNED_SHORT&&(q=s.RGB16UI),O===s.UNSIGNED_INT&&(q=s.RGB32UI),O===s.BYTE&&(q=s.RGB8I),O===s.SHORT&&(q=s.RGB16I),O===s.INT&&(q=s.RGB32I)),x===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),O===s.UNSIGNED_INT&&(q=s.RGBA32UI),O===s.BYTE&&(q=s.RGBA8I),O===s.SHORT&&(q=s.RGBA16I),O===s.INT&&(q=s.RGBA32I)),x===s.RGB&&O===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),x===s.RGBA){const Se=Q?Ur:$e.getTransfer(Z);O===s.FLOAT&&(q=s.RGBA32F),O===s.HALF_FLOAT&&(q=s.RGBA16F),O===s.UNSIGNED_BYTE&&(q=Se===Je?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function v(T,x){let O;return T?x===null||x===ui||x===Hi?O=s.DEPTH24_STENCIL8:x===Sn?O=s.DEPTH32F_STENCIL8:x===bs&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ui||x===Hi?O=s.DEPTH_COMPONENT24:x===Sn?O=s.DEPTH_COMPONENT32F:x===bs&&(O=s.DEPTH_COMPONENT16),O}function D(T,x){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==on&&T.minFilter!==ln?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function A(T){const x=T.target;x.removeEventListener("dispose",A),I(x),x.isVideoTexture&&h.delete(x)}function R(T){const x=T.target;x.removeEventListener("dispose",R),b(x)}function I(T){const x=n.get(T);if(x.__webglInit===void 0)return;const O=T.source,Z=d.get(O);if(Z){const Q=Z[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(T),Object.keys(Z).length===0&&d.delete(O)}n.remove(T)}function S(T){const x=n.get(T);s.deleteTexture(x.__webglTexture);const O=T.source,Z=d.get(O);delete Z[x.__cacheKey],o.memory.textures--}function b(T){const x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(x.__webglFramebuffer[Z]))for(let Q=0;Q<x.__webglFramebuffer[Z].length;Q++)s.deleteFramebuffer(x.__webglFramebuffer[Z][Q]);else s.deleteFramebuffer(x.__webglFramebuffer[Z]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[Z])}else{if(Array.isArray(x.__webglFramebuffer))for(let Z=0;Z<x.__webglFramebuffer.length;Z++)s.deleteFramebuffer(x.__webglFramebuffer[Z]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Z=0;Z<x.__webglColorRenderbuffer.length;Z++)x.__webglColorRenderbuffer[Z]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[Z]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=T.textures;for(let Z=0,Q=O.length;Z<Q;Z++){const q=n.get(O[Z]);q.__webglTexture&&(s.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(O[Z])}n.remove(T)}let P=0;function H(){P=0}function B(){const T=P;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),P+=1,T}function $(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function J(T,x){const O=n.get(T);if(T.isVideoTexture&&Te(T),T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){const Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(O,T,x);return}}t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+x)}function Y(T,x){const O=n.get(T);if(T.version>0&&O.__version!==T.version){j(O,T,x);return}t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+x)}function ee(T,x){const O=n.get(T);if(T.version>0&&O.__version!==T.version){j(O,T,x);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+x)}function W(T,x){const O=n.get(T);if(T.version>0&&O.__version!==T.version){ie(O,T,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+x)}const ce={[hi]:s.REPEAT,[oi]:s.CLAMP_TO_EDGE,[Oo]:s.MIRRORED_REPEAT},pe={[on]:s.NEAREST,[vu]:s.NEAREST_MIPMAP_NEAREST,[Os]:s.NEAREST_MIPMAP_LINEAR,[ln]:s.LINEAR,[Br]:s.LINEAR_MIPMAP_NEAREST,[ai]:s.LINEAR_MIPMAP_LINEAR},Me={[Eu]:s.NEVER,[Ru]:s.ALWAYS,[Mu]:s.LESS,[Wl]:s.LEQUAL,[wu]:s.EQUAL,[Au]:s.GEQUAL,[Tu]:s.GREATER,[Cu]:s.NOTEQUAL};function Be(T,x){if(x.type===Sn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===ln||x.magFilter===Br||x.magFilter===Os||x.magFilter===ai||x.minFilter===ln||x.minFilter===Br||x.minFilter===Os||x.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,ce[x.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,ce[x.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,ce[x.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,pe[x.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,pe[x.minFilter]),x.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,Me[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===on||x.minFilter!==Os&&x.minFilter!==ai||x.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");s.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Qe(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",A));const Z=x.source;let Q=d.get(Z);Q===void 0&&(Q={},d.set(Z,Q));const q=$(x);if(q!==T.__cacheKey){Q[q]===void 0&&(Q[q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Q[q].usedTimes++;const Se=Q[T.__cacheKey];Se!==void 0&&(Q[T.__cacheKey].usedTimes--,Se.usedTimes===0&&S(x)),T.__cacheKey=q,T.__webglTexture=Q[q].texture}return O}function j(T,x,O){let Z=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Z=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Z=s.TEXTURE_3D);const Q=Qe(T,x),q=x.source;t.bindTexture(Z,T.__webglTexture,s.TEXTURE0+O);const Se=n.get(q);if(q.version!==Se.__version||Q===!0){t.activeTexture(s.TEXTURE0+O);const he=$e.getPrimaries($e.workingColorSpace),me=x.colorSpace===zn?null:$e.getPrimaries(x.colorSpace),Xe=x.colorSpace===zn||he===me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let te=_(x.image,!1,i.maxTextureSize);te=st(x,te);const ge=r.convert(x.format,x.colorSpace),Ce=r.convert(x.type);let Re=M(x.internalFormat,ge,Ce,x.colorSpace,x.isVideoTexture);Be(Z,x);let _e;const Ge=x.mipmaps,Fe=x.isVideoTexture!==!0,nt=Se.__version===void 0||Q===!0,L=q.dataReady,ae=D(x,te);if(x.isDepthTexture)Re=v(x.format===Gi,x.type),nt&&(Fe?t.texStorage2D(s.TEXTURE_2D,1,Re,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,Re,te.width,te.height,0,ge,Ce,null));else if(x.isDataTexture)if(Ge.length>0){Fe&&nt&&t.texStorage2D(s.TEXTURE_2D,ae,Re,Ge[0].width,Ge[0].height);for(let G=0,K=Ge.length;G<K;G++)_e=Ge[G],Fe?L&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,_e.width,_e.height,ge,Ce,_e.data):t.texImage2D(s.TEXTURE_2D,G,Re,_e.width,_e.height,0,ge,Ce,_e.data);x.generateMipmaps=!1}else Fe?(nt&&t.texStorage2D(s.TEXTURE_2D,ae,Re,te.width,te.height),L&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,te.width,te.height,ge,Ce,te.data)):t.texImage2D(s.TEXTURE_2D,0,Re,te.width,te.height,0,ge,Ce,te.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Fe&&nt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ae,Re,Ge[0].width,Ge[0].height,te.depth);for(let G=0,K=Ge.length;G<K;G++)if(_e=Ge[G],x.format!==sn)if(ge!==null)if(Fe){if(L)if(x.layerUpdates.size>0){const fe=Qc(_e.width,_e.height,x.format,x.type);for(const ue of x.layerUpdates){const De=_e.data.subarray(ue*fe/_e.data.BYTES_PER_ELEMENT,(ue+1)*fe/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,ue,_e.width,_e.height,1,ge,De)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,0,_e.width,_e.height,te.depth,ge,_e.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,G,Re,_e.width,_e.height,te.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?L&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,0,_e.width,_e.height,te.depth,ge,Ce,_e.data):t.texImage3D(s.TEXTURE_2D_ARRAY,G,Re,_e.width,_e.height,te.depth,0,ge,Ce,_e.data)}else{Fe&&nt&&t.texStorage2D(s.TEXTURE_2D,ae,Re,Ge[0].width,Ge[0].height);for(let G=0,K=Ge.length;G<K;G++)_e=Ge[G],x.format!==sn?ge!==null?Fe?L&&t.compressedTexSubImage2D(s.TEXTURE_2D,G,0,0,_e.width,_e.height,ge,_e.data):t.compressedTexImage2D(s.TEXTURE_2D,G,Re,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?L&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,_e.width,_e.height,ge,Ce,_e.data):t.texImage2D(s.TEXTURE_2D,G,Re,_e.width,_e.height,0,ge,Ce,_e.data)}else if(x.isDataArrayTexture)if(Fe){if(nt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ae,Re,te.width,te.height,te.depth),L)if(x.layerUpdates.size>0){const G=Qc(te.width,te.height,x.format,x.type);for(const K of x.layerUpdates){const fe=te.data.subarray(K*G/te.data.BYTES_PER_ELEMENT,(K+1)*G/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,K,te.width,te.height,1,ge,Ce,fe)}x.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ge,Ce,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Re,te.width,te.height,te.depth,0,ge,Ce,te.data);else if(x.isData3DTexture)Fe?(nt&&t.texStorage3D(s.TEXTURE_3D,ae,Re,te.width,te.height,te.depth),L&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ge,Ce,te.data)):t.texImage3D(s.TEXTURE_3D,0,Re,te.width,te.height,te.depth,0,ge,Ce,te.data);else if(x.isFramebufferTexture){if(nt)if(Fe)t.texStorage2D(s.TEXTURE_2D,ae,Re,te.width,te.height);else{let G=te.width,K=te.height;for(let fe=0;fe<ae;fe++)t.texImage2D(s.TEXTURE_2D,fe,Re,G,K,0,ge,Ce,null),G>>=1,K>>=1}}else if(Ge.length>0){if(Fe&&nt){const G=we(Ge[0]);t.texStorage2D(s.TEXTURE_2D,ae,Re,G.width,G.height)}for(let G=0,K=Ge.length;G<K;G++)_e=Ge[G],Fe?L&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,ge,Ce,_e):t.texImage2D(s.TEXTURE_2D,G,Re,ge,Ce,_e);x.generateMipmaps=!1}else if(Fe){if(nt){const G=we(te);t.texStorage2D(s.TEXTURE_2D,ae,Re,G.width,G.height)}L&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ge,Ce,te)}else t.texImage2D(s.TEXTURE_2D,0,Re,ge,Ce,te);p(x)&&f(Z),Se.__version=q.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function ie(T,x,O){if(x.image.length!==6)return;const Z=Qe(T,x),Q=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+O);const q=n.get(Q);if(Q.version!==q.__version||Z===!0){t.activeTexture(s.TEXTURE0+O);const Se=$e.getPrimaries($e.workingColorSpace),he=x.colorSpace===zn?null:$e.getPrimaries(x.colorSpace),me=x.colorSpace===zn||Se===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Xe=x.isCompressedTexture||x.image[0].isCompressedTexture,te=x.image[0]&&x.image[0].isDataTexture,ge=[];for(let K=0;K<6;K++)!Xe&&!te?ge[K]=_(x.image[K],!0,i.maxCubemapSize):ge[K]=te?x.image[K].image:x.image[K],ge[K]=st(x,ge[K]);const Ce=ge[0],Re=r.convert(x.format,x.colorSpace),_e=r.convert(x.type),Ge=M(x.internalFormat,Re,_e,x.colorSpace),Fe=x.isVideoTexture!==!0,nt=q.__version===void 0||Z===!0,L=Q.dataReady;let ae=D(x,Ce);Be(s.TEXTURE_CUBE_MAP,x);let G;if(Xe){Fe&&nt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ae,Ge,Ce.width,Ce.height);for(let K=0;K<6;K++){G=ge[K].mipmaps;for(let fe=0;fe<G.length;fe++){const ue=G[fe];x.format!==sn?Re!==null?Fe?L&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe,0,0,ue.width,ue.height,Re,ue.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe,Ge,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe,0,0,ue.width,ue.height,Re,_e,ue.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe,Ge,ue.width,ue.height,0,Re,_e,ue.data)}}}else{if(G=x.mipmaps,Fe&&nt){G.length>0&&ae++;const K=we(ge[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ae,Ge,K.width,K.height)}for(let K=0;K<6;K++)if(te){Fe?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ge[K].width,ge[K].height,Re,_e,ge[K].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ge,ge[K].width,ge[K].height,0,Re,_e,ge[K].data);for(let fe=0;fe<G.length;fe++){const De=G[fe].image[K].image;Fe?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe+1,0,0,De.width,De.height,Re,_e,De.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe+1,Ge,De.width,De.height,0,Re,_e,De.data)}}else{Fe?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Re,_e,ge[K]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ge,Re,_e,ge[K]);for(let fe=0;fe<G.length;fe++){const ue=G[fe];Fe?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe+1,0,0,Re,_e,ue.image[K]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,fe+1,Ge,Re,_e,ue.image[K])}}}p(x)&&f(s.TEXTURE_CUBE_MAP),q.__version=Q.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function be(T,x,O,Z,Q,q){const Se=r.convert(O.format,O.colorSpace),he=r.convert(O.type),me=M(O.internalFormat,Se,he,O.colorSpace),Xe=n.get(x),te=n.get(O);if(te.__renderTarget=x,!Xe.__hasExternalTextures){const ge=Math.max(1,x.width>>q),Ce=Math.max(1,x.height>>q);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?t.texImage3D(Q,q,me,ge,Ce,x.depth,0,Se,he,null):t.texImage2D(Q,q,me,ge,Ce,0,Se,he,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),He(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,Q,te.__webglTexture,0,Ve(x)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Z,Q,te.__webglTexture,q),t.bindFramebuffer(s.FRAMEBUFFER,null)}function le(T,x,O){if(s.bindRenderbuffer(s.RENDERBUFFER,T),x.depthBuffer){const Z=x.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,q=v(x.stencilBuffer,Q),Se=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=Ve(x);He(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,he,q,x.width,x.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,he,q,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,q,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Se,s.RENDERBUFFER,T)}else{const Z=x.textures;for(let Q=0;Q<Z.length;Q++){const q=Z[Q],Se=r.convert(q.format,q.colorSpace),he=r.convert(q.type),me=M(q.internalFormat,Se,he,q.colorSpace),Xe=Ve(x);O&&He(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Xe,me,x.width,x.height):He(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Xe,me,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,me,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ae(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(x.depthTexture);Z.__renderTarget=x,(!Z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),J(x.depthTexture,0);const Q=Z.__webglTexture,q=Ve(x);if(x.depthTexture.format===Oi)He(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(x.depthTexture.format===Gi)He(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Le(T){const x=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Z){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=Z}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ae(x.__webglFramebuffer,T)}else if(O){x.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[Z]),x.__webglDepthbuffer[Z]===void 0)x.__webglDepthbuffer[Z]=s.createRenderbuffer(),le(x.__webglDepthbuffer[Z],T,!1);else{const Q=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer[Z];s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,q)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),le(x.__webglDepthbuffer,T,!1);else{const Z=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,Q)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ze(T,x,O){const Z=n.get(T);x!==void 0&&be(Z.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Le(T)}function ht(T){const x=T.texture,O=n.get(T),Z=n.get(x);T.addEventListener("dispose",R);const Q=T.textures,q=T.isWebGLCubeRenderTarget===!0,Se=Q.length>1;if(Se||(Z.__webglTexture===void 0&&(Z.__webglTexture=s.createTexture()),Z.__version=x.version,o.memory.textures++),q){O.__webglFramebuffer=[];for(let he=0;he<6;he++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[he]=[];for(let me=0;me<x.mipmaps.length;me++)O.__webglFramebuffer[he][me]=s.createFramebuffer()}else O.__webglFramebuffer[he]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let he=0;he<x.mipmaps.length;he++)O.__webglFramebuffer[he]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(Se)for(let he=0,me=Q.length;he<me;he++){const Xe=n.get(Q[he]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=s.createTexture(),o.memory.textures++)}if(T.samples>0&&He(T)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let he=0;he<Q.length;he++){const me=Q[he];O.__webglColorRenderbuffer[he]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[he]);const Xe=r.convert(me.format,me.colorSpace),te=r.convert(me.type),ge=M(me.internalFormat,Xe,te,me.colorSpace,T.isXRRenderTarget===!0),Ce=Ve(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,ge,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,O.__webglColorRenderbuffer[he])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),le(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(q){t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),Be(s.TEXTURE_CUBE_MAP,x);for(let he=0;he<6;he++)if(x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)be(O.__webglFramebuffer[he][me],T,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,me);else be(O.__webglFramebuffer[he],T,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);p(x)&&f(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let he=0,me=Q.length;he<me;he++){const Xe=Q[he],te=n.get(Xe);t.bindTexture(s.TEXTURE_2D,te.__webglTexture),Be(s.TEXTURE_2D,Xe),be(O.__webglFramebuffer,T,Xe,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,0),p(Xe)&&f(s.TEXTURE_2D)}t.unbindTexture()}else{let he=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(he=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(he,Z.__webglTexture),Be(he,x),x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)be(O.__webglFramebuffer[me],T,x,s.COLOR_ATTACHMENT0,he,me);else be(O.__webglFramebuffer,T,x,s.COLOR_ATTACHMENT0,he,0);p(x)&&f(he),t.unbindTexture()}T.depthBuffer&&Le(T)}function We(T){const x=T.textures;for(let O=0,Z=x.length;O<Z;O++){const Q=x[O];if(p(Q)){const q=E(T),Se=n.get(Q).__webglTexture;t.bindTexture(q,Se),f(q),t.unbindTexture()}}}const pt=[],F=[];function Gt(T){if(T.samples>0){if(He(T)===!1){const x=T.textures,O=T.width,Z=T.height;let Q=s.COLOR_BUFFER_BIT;const q=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Se=n.get(T),he=x.length>1;if(he)for(let me=0;me<x.length;me++)t.bindFramebuffer(s.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Se.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let me=0;me<x.length;me++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),he){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Se.__webglColorRenderbuffer[me]);const Xe=n.get(x[me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Xe,0)}s.blitFramebuffer(0,0,O,Z,0,0,O,Z,Q,s.NEAREST),c===!0&&(pt.length=0,F.length=0,pt.push(s.COLOR_ATTACHMENT0+me),T.depthBuffer&&T.resolveDepthBuffer===!1&&(pt.push(q),F.push(q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,F)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,pt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),he)for(let me=0;me<x.length;me++){t.bindFramebuffer(s.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,Se.__webglColorRenderbuffer[me]);const Xe=n.get(x[me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Se.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,Xe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function Ve(T){return Math.min(i.maxSamples,T.samples)}function He(T){const x=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Te(T){const x=o.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function st(T,x){const O=T.colorSpace,Z=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==qi&&O!==zn&&($e.getTransfer(O)===Je?(Z!==sn||Q!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function we(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.setTexture2D=J,this.setTexture2DArray=Y,this.setTexture3D=ee,this.setTextureCube=W,this.rebindTextures=ze,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=Gt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=be,this.useMultisampledRTT=He}function jg(s,e){function t(n,i=zn){let r;const o=$e.getTransfer(i);if(n===Rn)return s.UNSIGNED_BYTE;if(n===Sa)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ea)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Nl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Dl)return s.BYTE;if(n===Ul)return s.SHORT;if(n===bs)return s.UNSIGNED_SHORT;if(n===ba)return s.INT;if(n===ui)return s.UNSIGNED_INT;if(n===Sn)return s.FLOAT;if(n===Ps)return s.HALF_FLOAT;if(n===Fl)return s.ALPHA;if(n===Ol)return s.RGB;if(n===sn)return s.RGBA;if(n===kl)return s.LUMINANCE;if(n===Bl)return s.LUMINANCE_ALPHA;if(n===Oi)return s.DEPTH_COMPONENT;if(n===Gi)return s.DEPTH_STENCIL;if(n===zl)return s.RED;if(n===Ma)return s.RED_INTEGER;if(n===Vl)return s.RG;if(n===wa)return s.RG_INTEGER;if(n===Ta)return s.RGBA_INTEGER;if(n===gr||n===_r||n===xr||n===vr)if(o===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ko||n===Bo||n===zo||n===Vo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===zo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ho||n===Go||n===Wo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ho||n===Go)return o===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xo||n===$o||n===Yo||n===qo||n===jo||n===Zo||n===Ko||n===Jo||n===Qo||n===ea||n===ta||n===na||n===ia||n===sa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$o)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Yo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Zo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ko)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qo)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ea)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ta)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===na)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ia)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sa)return o===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yr||n===ra||n===oa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===yr)return o===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ra)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hl||n===aa||n===ca||n===la)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===yr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===aa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ca)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===la)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Zg extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class qt extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Kg={type:"move"};class fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),f=this._getHandJoint(l,_);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&d>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Kg)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Jg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qg=`
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

}`;class e0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new yt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pn({vertexShader:Jg,fragmentShader:Qg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ke(new Ki(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t0 extends ji{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,g=null;const _=new e0,p=t.getContextAttributes();let f=null,E=null;const M=[],v=[],D=new oe;let A=null;const R=new $t;R.viewport=new ct;const I=new $t;I.viewport=new ct;const S=[R,I],b=new Zg;let P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=M[j];return ie===void 0&&(ie=new fo,M[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=M[j];return ie===void 0&&(ie=new fo,M[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=M[j];return ie===void 0&&(ie=new fo,M[j]=ie),ie.getHandSpace()};function B(j){const ie=v.indexOf(j.inputSource);if(ie===-1)return;const be=M[ie];be!==void 0&&(be.update(j.inputSource,j.frame,l||o),be.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",J);for(let j=0;j<M.length;j++){const ie=v[j];ie!==null&&(v[j]=null,M[j].disconnect(ie))}P=null,H=null,_.reset(),e.setRenderTarget(f),m=null,d=null,u=null,i=null,E=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(f=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",$),i.addEventListener("inputsourceschange",J),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(D),i.renderState.layers===void 0){const ie={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,t,ie),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new di(m.framebufferWidth,m.framebufferHeight,{format:sn,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ie=null,be=null,le=null;p.depth&&(le=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=p.stencil?Gi:Oi,be=p.stencil?Hi:ui);const Ae={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ae),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new di(d.textureWidth,d.textureHeight,{format:sn,type:Rn,depthTexture:new th(d.textureWidth,d.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Qe.setContext(i),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function J(j){for(let ie=0;ie<j.removed.length;ie++){const be=j.removed[ie],le=v.indexOf(be);le>=0&&(v[le]=null,M[le].disconnect(be))}for(let ie=0;ie<j.added.length;ie++){const be=j.added[ie];let le=v.indexOf(be);if(le===-1){for(let Le=0;Le<M.length;Le++)if(Le>=v.length){v.push(be),le=Le;break}else if(v[Le]===null){v[Le]=be,le=Le;break}if(le===-1)break}const Ae=M[le];Ae&&Ae.connect(be)}}const Y=new w,ee=new w;function W(j,ie,be){Y.setFromMatrixPosition(ie.matrixWorld),ee.setFromMatrixPosition(be.matrixWorld);const le=Y.distanceTo(ee),Ae=ie.projectionMatrix.elements,Le=be.projectionMatrix.elements,ze=Ae[14]/(Ae[10]-1),ht=Ae[14]/(Ae[10]+1),We=(Ae[9]+1)/Ae[5],pt=(Ae[9]-1)/Ae[5],F=(Ae[8]-1)/Ae[0],Gt=(Le[8]+1)/Le[0],Ve=ze*F,He=ze*Gt,Te=le/(-F+Gt),st=Te*-F;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(st),j.translateZ(Te),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ae[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const we=ze+Te,T=ht+Te,x=Ve-st,O=He+(le-st),Z=We*ht/T*we,Q=pt*ht/T*we;j.projectionMatrix.makePerspective(x,O,Z,Q,we,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ce(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let ie=j.near,be=j.far;_.texture!==null&&(_.depthNear>0&&(ie=_.depthNear),_.depthFar>0&&(be=_.depthFar)),b.near=I.near=R.near=ie,b.far=I.far=R.far=be,(P!==b.near||H!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),P=b.near,H=b.far),R.layers.mask=j.layers.mask|2,I.layers.mask=j.layers.mask|4,b.layers.mask=R.layers.mask|I.layers.mask;const le=j.parent,Ae=b.cameras;ce(b,le);for(let Le=0;Le<Ae.length;Le++)ce(Ae[Le],le);Ae.length===2?W(b,R,I):b.projectionMatrix.copy(R.projectionMatrix),pe(j,b,le)};function pe(j,ie,be){be===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(be.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ss*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(b)};let Me=null;function Be(j,ie){if(h=ie.getViewerPose(l||o),g=ie,h!==null){const be=h.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let le=!1;be.length!==b.cameras.length&&(b.cameras.length=0,le=!0);for(let Le=0;Le<be.length;Le++){const ze=be[Le];let ht=null;if(m!==null)ht=m.getViewport(ze);else{const pt=u.getViewSubImage(d,ze);ht=pt.viewport,Le===0&&(e.setRenderTargetTextures(E,pt.colorTexture,d.ignoreDepthValues?void 0:pt.depthStencilTexture),e.setRenderTarget(E))}let We=S[Le];We===void 0&&(We=new $t,We.layers.enable(Le),We.viewport=new ct,S[Le]=We),We.matrix.fromArray(ze.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(ze.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(ht.x,ht.y,ht.width,ht.height),Le===0&&(b.matrix.copy(We.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),le===!0&&b.cameras.push(We)}const Ae=i.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")){const Le=u.getDepthInformation(be[0]);Le&&Le.isValid&&Le.texture&&_.init(e,Le,i.renderState)}}for(let be=0;be<M.length;be++){const le=v[be],Ae=M[be];le!==null&&Ae!==void 0&&Ae.update(le,ie,l||o)}Me&&Me(j,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Qe=new eh;Qe.setAnimationLoop(Be),this.setAnimationLoop=function(j){Me=j},this.dispose=function(){}}}const Qn=new dn,n0=new tt;function i0(s,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Kl(s)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function i(p,f,E,M,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(p,f):f.isMeshToonMaterial?(r(p,f),u(p,f)):f.isMeshPhongMaterial?(r(p,f),h(p,f)):f.isMeshStandardMaterial?(r(p,f),d(p,f),f.isMeshPhysicalMaterial&&m(p,f,v)):f.isMeshMatcapMaterial?(r(p,f),g(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),_(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?c(p,f,E,M):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Nt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Nt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const E=e.get(f),M=E.envMap,v=E.envMapRotation;M&&(p.envMap.value=M,Qn.copy(v),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),p.envMapRotation.value.setFromMatrix4(n0.makeRotationFromEuler(Qn)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function c(p,f,E,M){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*E,p.scale.value=M*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,E){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Nt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function _(p,f){const E=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function s0(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,M){const v=M.program;n.uniformBlockBinding(E,v)}function l(E,M){let v=i[E.id];v===void 0&&(g(E),v=h(E),i[E.id]=v,E.addEventListener("dispose",p));const D=M.program;n.updateUBOMapping(E,D);const A=e.render.frame;r[E.id]!==A&&(d(E),r[E.id]=A)}function h(E){const M=u();E.__bindingPointIndex=M;const v=s.createBuffer(),D=E.__size,A=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,D,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,v),v}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const M=i[E.id],v=E.uniforms,D=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let A=0,R=v.length;A<R;A++){const I=Array.isArray(v[A])?v[A]:[v[A]];for(let S=0,b=I.length;S<b;S++){const P=I[S];if(m(P,A,S,D)===!0){const H=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let $=0;for(let J=0;J<B.length;J++){const Y=B[J],ee=_(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,H+$,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,$),$+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(E,M,v,D){const A=E.value,R=M+"_"+v;if(D[R]===void 0)return typeof A=="number"||typeof A=="boolean"?D[R]=A:D[R]=A.clone(),!0;{const I=D[R];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return D[R]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(E){const M=E.uniforms;let v=0;const D=16;for(let R=0,I=M.length;R<I;R++){const S=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,P=S.length;b<P;b++){const H=S[b],B=Array.isArray(H.value)?H.value:[H.value];for(let $=0,J=B.length;$<J;$++){const Y=B[$],ee=_(Y),W=v%D,ce=W%ee.boundary,pe=W+ce;v+=ce,pe!==0&&D-pe<ee.storage&&(v+=D-pe),H.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=ee.storage}}}const A=v%D;return A>0&&(v+=D-A),E.__size=v,E.__cache={},this}function _(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function p(E){const M=E.target;M.removeEventListener("dispose",p);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function f(){for(const E in i)s.deleteBuffer(i[E]);o=[],i={},r={}}return{bind:c,update:l,dispose:f}}class r0{constructor(e={}){const{canvas:t=$u(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,f=null;const E=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rt,this.toneMapping=Mn,this.toneMappingExposure=1;const v=this;let D=!1,A=0,R=0,I=null,S=-1,b=null;const P=new ct,H=new ct;let B=null;const $=new se(0);let J=0,Y=t.width,ee=t.height,W=1,ce=null,pe=null;const Me=new ct(0,0,Y,ee),Be=new ct(0,0,Y,ee);let Qe=!1;const j=new Ra;let ie=!1,be=!1;const le=new tt,Ae=new tt,Le=new w,ze=new ct,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function pt(){return I===null?W:1}let F=n;function Gt(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ya}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",ue,!1),F===null){const U="webgl2";if(F=Gt(U,y),F===null)throw Gt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ve,He,Te,st,we,T,x,O,Z,Q,q,Se,he,me,Xe,te,ge,Ce,Re,_e,Ge,Fe,nt,L;function ae(){Ve=new hm(F),Ve.init(),Fe=new jg(F,Ve),He=new sm(F,Ve,e,Fe),Te=new $g(F,Ve),He.reverseDepthBuffer&&d&&Te.buffers.depth.setReversed(!0),st=new fm(F),we=new Ig,T=new qg(F,Ve,Te,we,He,Fe,st),x=new om(v),O=new lm(v),Z=new vd(F),nt=new nm(F,Z),Q=new um(F,Z,st,nt),q=new mm(F,Q,Z,st),Re=new pm(F,He,T),te=new rm(we),Se=new Pg(v,x,O,Ve,He,nt,te),he=new i0(v,we),me=new Dg,Xe=new Bg(Ve),Ce=new tm(v,x,O,Te,q,m,c),ge=new Wg(v,q,He),L=new s0(F,st,He,Te),_e=new im(F,Ve,st),Ge=new dm(F,Ve,st),st.programs=Se.programs,v.capabilities=He,v.extensions=Ve,v.properties=we,v.renderLists=me,v.shadowMap=ge,v.state=Te,v.info=st}ae();const G=new t0(v,F);this.xr=G,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const y=Ve.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ve.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(y){y!==void 0&&(W=y,this.setSize(Y,ee,!1))},this.getSize=function(y){return y.set(Y,ee)},this.setSize=function(y,U,k=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=y,ee=U,t.width=Math.floor(y*W),t.height=Math.floor(U*W),k===!0&&(t.style.width=y+"px",t.style.height=U+"px"),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(Y*W,ee*W).floor()},this.setDrawingBufferSize=function(y,U,k){Y=y,ee=U,W=k,t.width=Math.floor(y*k),t.height=Math.floor(U*k),this.setViewport(0,0,y,U)},this.getCurrentViewport=function(y){return y.copy(P)},this.getViewport=function(y){return y.copy(Me)},this.setViewport=function(y,U,k,z){y.isVector4?Me.set(y.x,y.y,y.z,y.w):Me.set(y,U,k,z),Te.viewport(P.copy(Me).multiplyScalar(W).round())},this.getScissor=function(y){return y.copy(Be)},this.setScissor=function(y,U,k,z){y.isVector4?Be.set(y.x,y.y,y.z,y.w):Be.set(y,U,k,z),Te.scissor(H.copy(Be).multiplyScalar(W).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(y){Te.setScissorTest(Qe=y)},this.setOpaqueSort=function(y){ce=y},this.setTransparentSort=function(y){pe=y},this.getClearColor=function(y){return y.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(y=!0,U=!0,k=!0){let z=0;if(y){let N=!1;if(I!==null){const ne=I.texture.format;N=ne===Ta||ne===wa||ne===Ma}if(N){const ne=I.texture.type,de=ne===Rn||ne===ui||ne===bs||ne===Hi||ne===Sa||ne===Ea,xe=Ce.getClearColor(),ve=Ce.getClearAlpha(),Pe=xe.r,Ue=xe.g,ye=xe.b;de?(g[0]=Pe,g[1]=Ue,g[2]=ye,g[3]=ve,F.clearBufferuiv(F.COLOR,0,g)):(_[0]=Pe,_[1]=Ue,_[2]=ye,_[3]=ve,F.clearBufferiv(F.COLOR,0,_))}else z|=F.COLOR_BUFFER_BIT}U&&(z|=F.DEPTH_BUFFER_BIT),k&&(z|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),me.dispose(),Xe.dispose(),we.dispose(),x.dispose(),O.dispose(),q.dispose(),nt.dispose(),L.dispose(),Se.dispose(),G.dispose(),G.removeEventListener("sessionstart",ja),G.removeEventListener("sessionend",Za),Yn.stop()};function K(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const y=st.autoReset,U=ge.enabled,k=ge.autoUpdate,z=ge.needsUpdate,N=ge.type;ae(),st.autoReset=y,ge.enabled=U,ge.autoUpdate=k,ge.needsUpdate=z,ge.type=N}function ue(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function De(y){const U=y.target;U.removeEventListener("dispose",De),ft(U)}function ft(y){Tt(y),we.remove(y)}function Tt(y){const U=we.get(y).programs;U!==void 0&&(U.forEach(function(k){Se.releaseProgram(k)}),y.isShaderMaterial&&Se.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,k,z,N,ne){U===null&&(U=ht);const de=N.isMesh&&N.matrixWorld.determinant()<0,xe=kh(y,U,k,z,N);Te.setMaterial(z,de);let ve=k.index,Pe=1;if(z.wireframe===!0){if(ve=Q.getWireframeAttribute(k),ve===void 0)return;Pe=2}const Ue=k.drawRange,ye=k.attributes.position;let Ye=Ue.start*Pe,it=(Ue.start+Ue.count)*Pe;ne!==null&&(Ye=Math.max(Ye,ne.start*Pe),it=Math.min(it,(ne.start+ne.count)*Pe)),ve!==null?(Ye=Math.max(Ye,0),it=Math.min(it,ve.count)):ye!=null&&(Ye=Math.max(Ye,0),it=Math.min(it,ye.count));const rt=it-Ye;if(rt<0||rt===1/0)return;nt.setup(N,z,xe,k,ve);let Ot,qe=_e;if(ve!==null&&(Ot=Z.get(ve),qe=Ge,qe.setIndex(Ot)),N.isMesh)z.wireframe===!0?(Te.setLineWidth(z.wireframeLinewidth*pt()),qe.setMode(F.LINES)):qe.setMode(F.TRIANGLES);else if(N.isLine){let Ee=z.linewidth;Ee===void 0&&(Ee=1),Te.setLineWidth(Ee*pt()),N.isLineSegments?qe.setMode(F.LINES):N.isLineLoop?qe.setMode(F.LINE_LOOP):qe.setMode(F.LINE_STRIP)}else N.isPoints?qe.setMode(F.POINTS):N.isSprite&&qe.setMode(F.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)qe.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))qe.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ee=N._multiDrawStarts,mn=N._multiDrawCounts,je=N._multiDrawCount,Zt=ve?Z.get(ve).bytesPerElement:1,pi=we.get(z).currentProgram.getUniforms();for(let kt=0;kt<je;kt++)pi.setValue(F,"_gl_DrawID",kt),qe.render(Ee[kt]/Zt,mn[kt])}else if(N.isInstancedMesh)qe.renderInstances(Ye,rt,N.count);else if(k.isInstancedBufferGeometry){const Ee=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,mn=Math.min(k.instanceCount,Ee);qe.renderInstances(Ye,rt,mn)}else qe.render(Ye,rt)};function Ze(y,U,k){y.transparent===!0&&y.side===tn&&y.forceSinglePass===!1?(y.side=Nt,y.needsUpdate=!0,Fs(y,U,k),y.side=Gn,y.needsUpdate=!0,Fs(y,U,k),y.side=tn):Fs(y,U,k)}this.compile=function(y,U,k=null){k===null&&(k=y),f=Xe.get(k),f.init(U),M.push(f),k.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),y!==k&&y.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),f.setupLights();const z=new Set;return y.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ne=N.material;if(ne)if(Array.isArray(ne))for(let de=0;de<ne.length;de++){const xe=ne[de];Ze(xe,k,N),z.add(xe)}else Ze(ne,k,N),z.add(ne)}),M.pop(),f=null,z},this.compileAsync=function(y,U,k=null){const z=this.compile(y,U,k);return new Promise(N=>{function ne(){if(z.forEach(function(de){we.get(de).currentProgram.isReady()&&z.delete(de)}),z.size===0){N(y);return}setTimeout(ne,10)}Ve.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let jt=null;function pn(y){jt&&jt(y)}function ja(){Yn.stop()}function Za(){Yn.start()}const Yn=new eh;Yn.setAnimationLoop(pn),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(y){jt=y,G.setAnimationLoop(y),y===null?Yn.stop():Yn.start()},G.addEventListener("sessionstart",ja),G.addEventListener("sessionend",Za),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(U),U=G.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,U,I),f=Xe.get(y,M.length),f.init(U),M.push(f),Ae.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),j.setFromProjectionMatrix(Ae),be=this.localClippingEnabled,ie=te.init(this.clippingPlanes,be),p=me.get(y,E.length),p.init(),E.push(p),G.enabled===!0&&G.isPresenting===!0){const ne=v.xr.getDepthSensingMesh();ne!==null&&kr(ne,U,-1/0,v.sortObjects)}kr(y,U,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(ce,pe),We=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,We&&Ce.addToRenderList(p,y),this.info.render.frame++,ie===!0&&te.beginShadows();const k=f.state.shadowsArray;ge.render(k,y,U),ie===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=p.opaque,N=p.transmissive;if(f.setupLights(),U.isArrayCamera){const ne=U.cameras;if(N.length>0)for(let de=0,xe=ne.length;de<xe;de++){const ve=ne[de];Ja(z,N,y,ve)}We&&Ce.render(y);for(let de=0,xe=ne.length;de<xe;de++){const ve=ne[de];Ka(p,y,ve,ve.viewport)}}else N.length>0&&Ja(z,N,y,U),We&&Ce.render(y),Ka(p,y,U);I!==null&&(T.updateMultisampleRenderTarget(I),T.updateRenderTargetMipmap(I)),y.isScene===!0&&y.onAfterRender(v,y,U),nt.resetDefaultState(),S=-1,b=null,M.pop(),M.length>0?(f=M[M.length-1],ie===!0&&te.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?p=E[E.length-1]:p=null};function kr(y,U,k,z){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)k=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||j.intersectsSprite(y)){z&&ze.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Ae);const de=q.update(y),xe=y.material;xe.visible&&p.push(y,de,xe,k,ze.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||j.intersectsObject(y))){const de=q.update(y),xe=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ze.copy(y.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),ze.copy(de.boundingSphere.center)),ze.applyMatrix4(y.matrixWorld).applyMatrix4(Ae)),Array.isArray(xe)){const ve=de.groups;for(let Pe=0,Ue=ve.length;Pe<Ue;Pe++){const ye=ve[Pe],Ye=xe[ye.materialIndex];Ye&&Ye.visible&&p.push(y,de,Ye,k,ze.z,ye)}}else xe.visible&&p.push(y,de,xe,k,ze.z,null)}}const ne=y.children;for(let de=0,xe=ne.length;de<xe;de++)kr(ne[de],U,k,z)}function Ka(y,U,k,z){const N=y.opaque,ne=y.transmissive,de=y.transparent;f.setupLightsView(k),ie===!0&&te.setGlobalState(v.clippingPlanes,k),z&&Te.viewport(P.copy(z)),N.length>0&&Ns(N,U,k),ne.length>0&&Ns(ne,U,k),de.length>0&&Ns(de,U,k),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function Ja(y,U,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[z.id]===void 0&&(f.state.transmissionRenderTarget[z.id]=new di(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?Ps:Rn,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const ne=f.state.transmissionRenderTarget[z.id],de=z.viewport||P;ne.setSize(de.z,de.w);const xe=v.getRenderTarget();v.setRenderTarget(ne),v.getClearColor($),J=v.getClearAlpha(),J<1&&v.setClearColor(16777215,.5),v.clear(),We&&Ce.render(k);const ve=v.toneMapping;v.toneMapping=Mn;const Pe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),f.setupLightsView(z),ie===!0&&te.setGlobalState(v.clippingPlanes,z),Ns(y,k,z),T.updateMultisampleRenderTarget(ne),T.updateRenderTargetMipmap(ne),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let ye=0,Ye=U.length;ye<Ye;ye++){const it=U[ye],rt=it.object,Ot=it.geometry,qe=it.material,Ee=it.group;if(qe.side===tn&&rt.layers.test(z.layers)){const mn=qe.side;qe.side=Nt,qe.needsUpdate=!0,Qa(rt,k,z,Ot,qe,Ee),qe.side=mn,qe.needsUpdate=!0,Ue=!0}}Ue===!0&&(T.updateMultisampleRenderTarget(ne),T.updateRenderTargetMipmap(ne))}v.setRenderTarget(xe),v.setClearColor($,J),Pe!==void 0&&(z.viewport=Pe),v.toneMapping=ve}function Ns(y,U,k){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ne=y.length;N<ne;N++){const de=y[N],xe=de.object,ve=de.geometry,Pe=z===null?de.material:z,Ue=de.group;xe.layers.test(k.layers)&&Qa(xe,U,k,ve,Pe,Ue)}}function Qa(y,U,k,z,N,ne){y.onBeforeRender(v,U,k,z,N,ne),y.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(v,U,k,z,y,ne),N.transparent===!0&&N.side===tn&&N.forceSinglePass===!1?(N.side=Nt,N.needsUpdate=!0,v.renderBufferDirect(k,U,z,N,y,ne),N.side=Gn,N.needsUpdate=!0,v.renderBufferDirect(k,U,z,N,y,ne),N.side=tn):v.renderBufferDirect(k,U,z,N,y,ne),y.onAfterRender(v,U,k,z,N,ne)}function Fs(y,U,k){U.isScene!==!0&&(U=ht);const z=we.get(y),N=f.state.lights,ne=f.state.shadowsArray,de=N.state.version,xe=Se.getParameters(y,N.state,ne,U,k),ve=Se.getProgramCacheKey(xe);let Pe=z.programs;z.environment=y.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(y.isMeshStandardMaterial?O:x).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Pe===void 0&&(y.addEventListener("dispose",De),Pe=new Map,z.programs=Pe);let Ue=Pe.get(ve);if(Ue!==void 0){if(z.currentProgram===Ue&&z.lightsStateVersion===de)return tc(y,xe),Ue}else xe.uniforms=Se.getUniforms(y),y.onBeforeCompile(xe,v),Ue=Se.acquireProgram(xe,ve),Pe.set(ve,Ue),z.uniforms=xe.uniforms;const ye=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(ye.clippingPlanes=te.uniform),tc(y,xe),z.needsLights=zh(y),z.lightsStateVersion=de,z.needsLights&&(ye.ambientLightColor.value=N.state.ambient,ye.lightProbe.value=N.state.probe,ye.directionalLights.value=N.state.directional,ye.directionalLightShadows.value=N.state.directionalShadow,ye.spotLights.value=N.state.spot,ye.spotLightShadows.value=N.state.spotShadow,ye.rectAreaLights.value=N.state.rectArea,ye.ltc_1.value=N.state.rectAreaLTC1,ye.ltc_2.value=N.state.rectAreaLTC2,ye.pointLights.value=N.state.point,ye.pointLightShadows.value=N.state.pointShadow,ye.hemisphereLights.value=N.state.hemi,ye.directionalShadowMap.value=N.state.directionalShadowMap,ye.directionalShadowMatrix.value=N.state.directionalShadowMatrix,ye.spotShadowMap.value=N.state.spotShadowMap,ye.spotLightMatrix.value=N.state.spotLightMatrix,ye.spotLightMap.value=N.state.spotLightMap,ye.pointShadowMap.value=N.state.pointShadowMap,ye.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Ue,z.uniformsList=null,Ue}function ec(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=br.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function tc(y,U){const k=we.get(y);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function kh(y,U,k,z,N){U.isScene!==!0&&(U=ht),T.resetTextureUnits();const ne=U.fog,de=z.isMeshStandardMaterial?U.environment:null,xe=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:qi,ve=(z.isMeshStandardMaterial?O:x).get(z.envMap||de),Pe=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ue=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),ye=!!k.morphAttributes.position,Ye=!!k.morphAttributes.normal,it=!!k.morphAttributes.color;let rt=Mn;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(rt=v.toneMapping);const Ot=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,qe=Ot!==void 0?Ot.length:0,Ee=we.get(z),mn=f.state.lights;if(ie===!0&&(be===!0||y!==b)){const Wt=y===b&&z.id===S;te.setState(z,y,Wt)}let je=!1;z.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==mn.state.version||Ee.outputColorSpace!==xe||N.isBatchedMesh&&Ee.batching===!1||!N.isBatchedMesh&&Ee.batching===!0||N.isBatchedMesh&&Ee.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ee.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ee.instancing===!1||!N.isInstancedMesh&&Ee.instancing===!0||N.isSkinnedMesh&&Ee.skinning===!1||!N.isSkinnedMesh&&Ee.skinning===!0||N.isInstancedMesh&&Ee.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ee.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ee.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ee.instancingMorph===!1&&N.morphTexture!==null||Ee.envMap!==ve||z.fog===!0&&Ee.fog!==ne||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==te.numPlanes||Ee.numIntersection!==te.numIntersection)||Ee.vertexAlphas!==Pe||Ee.vertexTangents!==Ue||Ee.morphTargets!==ye||Ee.morphNormals!==Ye||Ee.morphColors!==it||Ee.toneMapping!==rt||Ee.morphTargetsCount!==qe)&&(je=!0):(je=!0,Ee.__version=z.version);let Zt=Ee.currentProgram;je===!0&&(Zt=Fs(z,U,N));let pi=!1,kt=!1,Qi=!1;const ot=Zt.getUniforms(),an=Ee.uniforms;if(Te.useProgram(Zt.program)&&(pi=!0,kt=!0,Qi=!0),z.id!==S&&(S=z.id,kt=!0),pi||b!==y){Te.buffers.depth.getReversed()?(le.copy(y.projectionMatrix),qu(le),ju(le),ot.setValue(F,"projectionMatrix",le)):ot.setValue(F,"projectionMatrix",y.projectionMatrix),ot.setValue(F,"viewMatrix",y.matrixWorldInverse);const Ln=ot.map.cameraPosition;Ln!==void 0&&Ln.setValue(F,Le.setFromMatrixPosition(y.matrixWorld)),He.logarithmicDepthBuffer&&ot.setValue(F,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ot.setValue(F,"isOrthographic",y.isOrthographicCamera===!0),b!==y&&(b=y,kt=!0,Qi=!0)}if(N.isSkinnedMesh){ot.setOptional(F,N,"bindMatrix"),ot.setOptional(F,N,"bindMatrixInverse");const Wt=N.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),ot.setValue(F,"boneTexture",Wt.boneTexture,T))}N.isBatchedMesh&&(ot.setOptional(F,N,"batchingTexture"),ot.setValue(F,"batchingTexture",N._matricesTexture,T),ot.setOptional(F,N,"batchingIdTexture"),ot.setValue(F,"batchingIdTexture",N._indirectTexture,T),ot.setOptional(F,N,"batchingColorTexture"),N._colorsTexture!==null&&ot.setValue(F,"batchingColorTexture",N._colorsTexture,T));const es=k.morphAttributes;if((es.position!==void 0||es.normal!==void 0||es.color!==void 0)&&Re.update(N,k,Zt),(kt||Ee.receiveShadow!==N.receiveShadow)&&(Ee.receiveShadow=N.receiveShadow,ot.setValue(F,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(an.envMap.value=ve,an.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(an.envMapIntensity.value=U.environmentIntensity),kt&&(ot.setValue(F,"toneMappingExposure",v.toneMappingExposure),Ee.needsLights&&Bh(an,Qi),ne&&z.fog===!0&&he.refreshFogUniforms(an,ne),he.refreshMaterialUniforms(an,z,W,ee,f.state.transmissionRenderTarget[y.id]),br.upload(F,ec(Ee),an,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(br.upload(F,ec(Ee),an,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ot.setValue(F,"center",N.center),ot.setValue(F,"modelViewMatrix",N.modelViewMatrix),ot.setValue(F,"normalMatrix",N.normalMatrix),ot.setValue(F,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Wt=z.uniformsGroups;for(let Ln=0,Dn=Wt.length;Ln<Dn;Ln++){const nc=Wt[Ln];L.update(nc,Zt),L.bind(nc,Zt)}}return Zt}function Bh(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function zh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(y,U,k){we.get(y.texture).__webglTexture=U,we.get(y.depthTexture).__webglTexture=k;const z=we.get(y);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=k===void 0,z.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,U){const k=we.get(y);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,k=0){I=y,A=U,R=k;let z=!0,N=null,ne=!1,de=!1;if(y){const ve=we.get(y);if(ve.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(F.FRAMEBUFFER,null),z=!1;else if(ve.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(ve.__hasExternalTextures)T.rebindTextures(y,we.get(y.texture).__webglTexture,we.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const ye=y.depthTexture;if(ve.__boundDepthTexture!==ye){if(ye!==null&&we.has(ye)&&(y.width!==ye.image.width||y.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const Pe=y.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(de=!0);const Ue=we.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?N=Ue[U][k]:N=Ue[U],ne=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?N=we.get(y).__webglMultisampledFramebuffer:Array.isArray(Ue)?N=Ue[k]:N=Ue,P.copy(y.viewport),H.copy(y.scissor),B=y.scissorTest}else P.copy(Me).multiplyScalar(W).floor(),H.copy(Be).multiplyScalar(W).floor(),B=Qe;if(Te.bindFramebuffer(F.FRAMEBUFFER,N)&&z&&Te.drawBuffers(y,N),Te.viewport(P),Te.scissor(H),Te.setScissorTest(B),ne){const ve=we.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,ve.__webglTexture,k)}else if(de){const ve=we.get(y.texture),Pe=U||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,ve.__webglTexture,k||0,Pe)}S=-1},this.readRenderTargetPixels=function(y,U,k,z,N,ne,de){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=we.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&de!==void 0&&(xe=xe[de]),xe){Te.bindFramebuffer(F.FRAMEBUFFER,xe);try{const ve=y.texture,Pe=ve.format,Ue=ve.type;if(!He.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-z&&k>=0&&k<=y.height-N&&F.readPixels(U,k,z,N,Fe.convert(Pe),Fe.convert(Ue),ne)}finally{const ve=I!==null?we.get(I).__webglFramebuffer:null;Te.bindFramebuffer(F.FRAMEBUFFER,ve)}}},this.readRenderTargetPixelsAsync=async function(y,U,k,z,N,ne,de){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=we.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&de!==void 0&&(xe=xe[de]),xe){const ve=y.texture,Pe=ve.format,Ue=ve.type;if(!He.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=y.width-z&&k>=0&&k<=y.height-N){Te.bindFramebuffer(F.FRAMEBUFFER,xe);const ye=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ye),F.bufferData(F.PIXEL_PACK_BUFFER,ne.byteLength,F.STREAM_READ),F.readPixels(U,k,z,N,Fe.convert(Pe),Fe.convert(Ue),0);const Ye=I!==null?we.get(I).__webglFramebuffer:null;Te.bindFramebuffer(F.FRAMEBUFFER,Ye);const it=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Yu(F,it,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ye),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ne),F.deleteBuffer(ye),F.deleteSync(it),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,U=null,k=0){y.isTexture!==!0&&(ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,y=arguments[1]);const z=Math.pow(2,-k),N=Math.floor(y.image.width*z),ne=Math.floor(y.image.height*z),de=U!==null?U.x:0,xe=U!==null?U.y:0;T.setTexture2D(y,0),F.copyTexSubImage2D(F.TEXTURE_2D,k,0,0,de,xe,N,ne),Te.unbindTexture()},this.copyTextureToTexture=function(y,U,k=null,z=null,N=0){y.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,y=arguments[1],U=arguments[2],N=arguments[3]||0,k=null);let ne,de,xe,ve,Pe,Ue,ye,Ye,it;const rt=y.isCompressedTexture?y.mipmaps[N]:y.image;k!==null?(ne=k.max.x-k.min.x,de=k.max.y-k.min.y,xe=k.isBox3?k.max.z-k.min.z:1,ve=k.min.x,Pe=k.min.y,Ue=k.isBox3?k.min.z:0):(ne=rt.width,de=rt.height,xe=rt.depth||1,ve=0,Pe=0,Ue=0),z!==null?(ye=z.x,Ye=z.y,it=z.z):(ye=0,Ye=0,it=0);const Ot=Fe.convert(U.format),qe=Fe.convert(U.type);let Ee;U.isData3DTexture?(T.setTexture3D(U,0),Ee=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),Ee=F.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),Ee=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const mn=F.getParameter(F.UNPACK_ROW_LENGTH),je=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Zt=F.getParameter(F.UNPACK_SKIP_PIXELS),pi=F.getParameter(F.UNPACK_SKIP_ROWS),kt=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,rt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,rt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ve),F.pixelStorei(F.UNPACK_SKIP_ROWS,Pe),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ue);const Qi=y.isDataArrayTexture||y.isData3DTexture,ot=U.isDataArrayTexture||U.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const an=we.get(y),es=we.get(U),Wt=we.get(an.__renderTarget),Ln=we.get(es.__renderTarget);Te.bindFramebuffer(F.READ_FRAMEBUFFER,Wt.__webglFramebuffer),Te.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let Dn=0;Dn<xe;Dn++)Qi&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,we.get(y).__webglTexture,N,Ue+Dn),y.isDepthTexture?(ot&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,we.get(U).__webglTexture,N,it+Dn),F.blitFramebuffer(ve,Pe,ne,de,ye,Ye,ne,de,F.DEPTH_BUFFER_BIT,F.NEAREST)):ot?F.copyTexSubImage3D(Ee,N,ye,Ye,it+Dn,ve,Pe,ne,de):F.copyTexSubImage2D(Ee,N,ye,Ye,it+Dn,ve,Pe,ne,de);Te.bindFramebuffer(F.READ_FRAMEBUFFER,null),Te.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ot?y.isDataTexture||y.isData3DTexture?F.texSubImage3D(Ee,N,ye,Ye,it,ne,de,xe,Ot,qe,rt.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(Ee,N,ye,Ye,it,ne,de,xe,Ot,rt.data):F.texSubImage3D(Ee,N,ye,Ye,it,ne,de,xe,Ot,qe,rt):y.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,N,ye,Ye,ne,de,Ot,qe,rt.data):y.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,N,ye,Ye,rt.width,rt.height,Ot,rt.data):F.texSubImage2D(F.TEXTURE_2D,N,ye,Ye,ne,de,Ot,qe,rt);F.pixelStorei(F.UNPACK_ROW_LENGTH,mn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,je),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Zt),F.pixelStorei(F.UNPACK_SKIP_ROWS,pi),F.pixelStorei(F.UNPACK_SKIP_IMAGES,kt),N===0&&U.generateMipmaps&&F.generateMipmap(Ee),Te.unbindTexture()},this.copyTextureToTexture3D=function(y,U,k=null,z=null,N=0){return y.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,z=arguments[1]||null,y=arguments[2],U=arguments[3],N=arguments[4]||0),ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,U,k,z,N)},this.initRenderTarget=function(y){we.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),Te.unbindTexture()},this.resetState=function(){A=0,R=0,I=null,Te.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class La{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new se(e),this.near=t,this.far=n}clone(){return new La(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class oh extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class o0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ha,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Lt=new w;class Mr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array),r=Ke(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Mr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ah extends In{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new se(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ri;const rs=new w,Pi=new w,Ii=new w,Li=new oe,os=new oe,ch=new tt,sr=new w,as=new w,rr=new w,el=new oe,po=new oe,tl=new oe;class a0 extends gt{constructor(e=new ah){if(super(),this.isSprite=!0,this.type="Sprite",Ri===void 0){Ri=new et;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new o0(t,5);Ri.setIndex([0,1,2,0,2,3]),Ri.setAttribute("position",new Mr(n,3,0,!1)),Ri.setAttribute("uv",new Mr(n,2,3,!1))}this.geometry=Ri,this.material=e,this.center=new oe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pi.setFromMatrixScale(this.matrixWorld),ch.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ii.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pi.multiplyScalar(-Ii.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;or(sr.set(-.5,-.5,0),Ii,o,Pi,i,r),or(as.set(.5,-.5,0),Ii,o,Pi,i,r),or(rr.set(.5,.5,0),Ii,o,Pi,i,r),el.set(0,0),po.set(1,0),tl.set(1,1);let a=e.ray.intersectTriangle(sr,as,rr,!1,rs);if(a===null&&(or(as.set(-.5,.5,0),Ii,o,Pi,i,r),po.set(0,1),a=e.ray.intersectTriangle(sr,rr,as,!1,rs),a===null))return;const c=e.ray.origin.distanceTo(rs);c<e.near||c>e.far||t.push({distance:c,point:rs.clone(),uv:Yt.getInterpolation(rs,sr,as,rr,el,po,tl,new oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function or(s,e,t,n,i,r){Li.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(os.x=r*Li.x-i*Li.y,os.y=i*Li.x+r*Li.y):os.copy(Li),s.copy(e),s.x+=os.x,s.y+=os.y,s.applyMatrix4(ch)}class Da extends In{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const wr=new w,Tr=new w,nl=new tt,cs=new Nr,ar=new Ls,mo=new w,il=new w;class lh extends gt{constructor(e=new et,t=new Da){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)wr.fromBufferAttribute(t,i-1),Tr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=wr.distanceTo(Tr);e.setAttribute("lineDistance",new lt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(i),ar.radius+=r,e.ray.intersectsSphere(ar)===!1)return;nl.copy(i).invert(),cs.copy(e.ray).applyMatrix4(nl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const m=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=l){const f=h.getX(_),E=h.getX(_+1),M=cr(this,e,cs,c,f,E);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(m),f=cr(this,e,cs,c,_,p);f&&t.push(f)}}else{const m=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=l){const f=cr(this,e,cs,c,_,_+1);f&&t.push(f)}if(this.isLineLoop){const _=cr(this,e,cs,c,g-1,m);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function cr(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(wr.fromBufferAttribute(o,i),Tr.fromBufferAttribute(o,r),t.distanceSqToSegment(wr,Tr,mo,il)>n)return;mo.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(mo);if(!(c<e.near||c>e.far))return{distance:c,point:il.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}class hh extends In{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sl=new tt,da=new Nr,lr=new Ls,hr=new w;class c0 extends gt{constructor(e=new et,t=new hh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(i),lr.radius+=r,e.ray.intersectsSphere(lr)===!1)return;sl.copy(i).invert(),da.copy(e.ray).applyMatrix4(sl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let g=d,_=m;g<_;g++){const p=l.getX(g);hr.fromBufferAttribute(u,p),rl(hr,p,c,i,e,t,this)}}else{const d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=d,_=m;g<_;g++)hr.fromBufferAttribute(u,g),rl(hr,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function rl(s,e,t,n,i,r,o){const a=da.distanceSqToPoint(s);if(a<t){const c=new w;da.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class uh extends yt{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class fn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,m=(o-h)/d;return(i+m)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new oe:new w);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new w,i=[],r=[],o=[],a=new w,c=new tt;for(let m=0;m<=e;m++){const g=m/e;i[m]=this.getTangentAt(g,new w)}r[0]=new w,o[0]=new w;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let m=1;m<=e;m++){if(r[m]=r[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(i[m-1],i[m]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Mt(i[m-1].dot(i[m]),-1,1));r[m].applyMatrix4(c.makeRotationAxis(a,g))}o[m].crossVectors(i[m],r[m])}if(t===!0){let m=Math.acos(Mt(r[0].dot(r[e]),-1,1));m/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(m=-m);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],m*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ua extends fn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new oe){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,m=l-this.aY;c=d*h-m*u+this.aX,l=d*u+m*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class l0 extends Ua{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Na(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,m=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,m*=h,i(o,a,d,m)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const ur=new w,go=new Na,_o=new Na,xo=new Na;class h0 extends fn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(ur.subVectors(i[0],i[1]).add(i[0]),l=ur);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(ur.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ur),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),m),_=Math.pow(u.distanceToSquared(d),m),p=Math.pow(d.distanceToSquared(h),m);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),go.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,p),_o.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,p),xo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(go.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),_o.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),xo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(go.calc(c),_o.calc(c),xo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ol(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function u0(s,e){const t=1-s;return t*t*e}function d0(s,e){return 2*(1-s)*s*e}function f0(s,e){return s*s*e}function gs(s,e,t,n){return u0(s,e)+d0(s,t)+f0(s,n)}function p0(s,e){const t=1-s;return t*t*t*e}function m0(s,e){const t=1-s;return 3*t*t*s*e}function g0(s,e){return 3*(1-s)*s*s*e}function _0(s,e){return s*s*s*e}function _s(s,e,t,n,i){return p0(s,e)+m0(s,t)+g0(s,n)+_0(s,i)}class dh extends fn{constructor(e=new oe,t=new oe,n=new oe,i=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new oe){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_s(e,i.x,r.x,o.x,a.x),_s(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class x0 extends fn{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_s(e,i.x,r.x,o.x,a.x),_s(e,i.y,r.y,o.y,a.y),_s(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fh extends fn{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class v0 extends fn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ph extends fn{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(gs(e,i.x,r.x,o.x),gs(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class y0 extends fn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(gs(e,i.x,r.x,o.x),gs(e,i.y,r.y,o.y),gs(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mh extends fn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(ol(a,c.x,l.x,h.x,u.x),ol(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new oe().fromArray(i))}return this}}var al=Object.freeze({__proto__:null,ArcCurve:l0,CatmullRomCurve3:h0,CubicBezierCurve:dh,CubicBezierCurve3:x0,EllipseCurve:Ua,LineCurve:fh,LineCurve3:v0,QuadraticBezierCurve:ph,QuadraticBezierCurve3:y0,SplineCurve:mh});class b0 extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new al[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new al[i.type]().fromJSON(i))}return this}}class S0 extends b0{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new fh(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new ph(this.currentPoint.clone(),new oe(e,t),new oe(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new dh(this.currentPoint.clone(),new oe(e,t),new oe(n,i),new oe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new mh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,o,a,c),this}absellipse(e,t,n,i,r,o,a,c){const l=new Ua(e,t,n,i,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Fa extends et{constructor(e=[new oe(0,-.5),new oe(.5,0),new oe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Mt(i,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/t,u=new w,d=new oe,m=new w,g=new w,_=new w;let p=0,f=0;for(let E=0;E<=e.length-1;E++)switch(E){case 0:p=e[E+1].x-e[E].x,f=e[E+1].y-e[E].y,m.x=f*1,m.y=-p,m.z=f*0,_.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:p=e[E+1].x-e[E].x,f=e[E+1].y-e[E].y,m.x=f*1,m.y=-p,m.z=f*0,g.copy(m),m.x+=_.x,m.y+=_.y,m.z+=_.z,m.normalize(),c.push(m.x,m.y,m.z),_.copy(g)}for(let E=0;E<=t;E++){const M=n+E*h*i,v=Math.sin(M),D=Math.cos(M);for(let A=0;A<=e.length-1;A++){u.x=e[A].x*v,u.y=e[A].y,u.z=e[A].x*D,o.push(u.x,u.y,u.z),d.x=E/t,d.y=A/(e.length-1),a.push(d.x,d.y);const R=c[3*A+0]*v,I=c[3*A+1],S=c[3*A+0]*D;l.push(R,I,S)}}for(let E=0;E<t;E++)for(let M=0;M<e.length-1;M++){const v=M+E*e.length,D=v,A=v+e.length,R=v+e.length+1,I=v+1;r.push(D,A,I),r.push(R,I,A)}this.setIndex(r),this.setAttribute("position",new lt(o,3)),this.setAttribute("uv",new lt(a,2)),this.setAttribute("normal",new lt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fa(e.points,e.segments,e.phiStart,e.phiLength)}}class xs extends Fa{constructor(e=1,t=1,n=4,i=8){const r=new S0;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new xs(e.radius,e.length,e.capSegments,e.radialSegments)}}class Ds extends et{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],m=[];let g=0;const _=[],p=n/2;let f=0;E(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new lt(u,3)),this.setAttribute("normal",new lt(d,3)),this.setAttribute("uv",new lt(m,2));function E(){const v=new w,D=new w;let A=0;const R=(t-e)/n;for(let I=0;I<=r;I++){const S=[],b=I/r,P=b*(t-e)+e;for(let H=0;H<=i;H++){const B=H/i,$=B*c+a,J=Math.sin($),Y=Math.cos($);D.x=P*J,D.y=-b*n+p,D.z=P*Y,u.push(D.x,D.y,D.z),v.set(J,R,Y).normalize(),d.push(v.x,v.y,v.z),m.push(B,1-b),S.push(g++)}_.push(S)}for(let I=0;I<i;I++)for(let S=0;S<r;S++){const b=_[S][I],P=_[S+1][I],H=_[S+1][I+1],B=_[S][I+1];(e>0||S!==0)&&(h.push(b,P,B),A+=3),(t>0||S!==r-1)&&(h.push(P,H,B),A+=3)}l.addGroup(f,A,0),f+=A}function M(v){const D=g,A=new oe,R=new w;let I=0;const S=v===!0?e:t,b=v===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,p*b,0),d.push(0,b,0),m.push(.5,.5),g++;const P=g;for(let H=0;H<=i;H++){const $=H/i*c+a,J=Math.cos($),Y=Math.sin($);R.x=S*Y,R.y=p*b,R.z=S*J,u.push(R.x,R.y,R.z),d.push(0,b,0),A.x=J*.5+.5,A.y=Y*.5*b+.5,m.push(A.x,A.y),g++}for(let H=0;H<i;H++){const B=D+H,$=P+H;v===!0?h.push($,$+1,B):h.push($+1,$,B),I+=3}l.addGroup(f,I,v===!0?1:2),f+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ds(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Oa extends Ds{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Oa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ka extends et{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/i,m=new w,g=new oe;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const f=r+p/n*o;m.x=u*Math.cos(f),m.y=u*Math.sin(f),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){const p=_*(n+1);for(let f=0;f<n;f++){const E=f+p,M=E,v=E+n+1,D=E+n+2,A=E+1;a.push(M,v,A),a.push(v,D,A)}}this.setIndex(a),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(l,3)),this.setAttribute("uv",new lt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ka(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Cn extends et{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new w,d=new w,m=[],g=[],_=[],p=[];for(let f=0;f<=n;f++){const E=[],M=f/n;let v=0;f===0&&o===0?v=.5/t:f===n&&c===Math.PI&&(v=-.5/t);for(let D=0;D<=t;D++){const A=D/t;u.x=-e*Math.cos(i+A*r)*Math.sin(o+M*a),u.y=e*Math.cos(o+M*a),u.z=e*Math.sin(i+A*r)*Math.sin(o+M*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(A+v,1-M),E.push(l++)}h.push(E)}for(let f=0;f<n;f++)for(let E=0;E<t;E++){const M=h[f][E+1],v=h[f][E],D=h[f+1][E],A=h[f+1][E+1];(f!==0||o>0)&&m.push(M,v,A),(f!==n-1||c<Math.PI)&&m.push(v,D,A)}this.setIndex(m),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class vs extends et{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new w,u=new w,d=new w;for(let m=0;m<=n;m++)for(let g=0;g<=i;g++){const _=g/i*r,p=m/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(_),u.y=(e+t*Math.cos(p))*Math.sin(_),u.z=t*Math.sin(p),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=i;g++){const _=(i+1)*m+g-1,p=(i+1)*(m-1)+g-1,f=(i+1)*(m-1)+g,E=(i+1)*m+g;o.push(_,p,E),o.push(p,f,E)}this.setIndex(o),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class It extends In{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gl,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const cl={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class E0{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const m=l[u],g=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}}const M0=new E0;class Ba{constructor(e){this.manager=e!==void 0?e:M0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ba.DEFAULT_MATERIAL_NAME="__DEFAULT";class w0 extends Ba{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=cl.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Es("img");function c(){h(),cl.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class gh extends Ba{constructor(e){super(e)}load(e,t,n,i){const r=new yt,o=new w0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class za extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new se(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class T0 extends za{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const vo=new tt,ll=new w,hl=new w;class C0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ra,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ll.setFromMatrixPosition(e.matrixWorld),t.position.copy(ll),hl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hl),t.updateMatrixWorld(),vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class A0 extends C0{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fa extends za{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new A0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class _h extends za{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class R0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ul(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ul();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ul(){return performance.now()}const dl=new tt;class pa{constructor(e,t,n=0,i=1/0){this.ray=new Nr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return dl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dl),this}intersectObject(e,t=!0,n=[]){return ma(e,this,n,t),n.sort(fl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)ma(e[i],this,n,t);return n.sort(fl),n}}function fl(s,e){return s.distance-e.distance}function ma(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)ma(r[o],e,t,!0)}}const pl=new w;let dr,yo;class P0 extends gt{constructor(e=new w(0,0,1),t=new w(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",dr===void 0&&(dr=new et,dr.setAttribute("position",new lt([0,0,0,0,1,0],3)),yo=new Ds(0,.5,1,5,1),yo.translate(0,-.5,0)),this.position.copy(t),this.line=new lh(dr,new Da({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ke(yo,new Wi({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{pl.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(pl,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ya}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ya);function Vt(s){return new se(s.r,s.g,s.b)}function I0(){return{skyTopColor:{r:0,g:.467,b:1},skyMidColor:{r:.529,g:.808,b:.922},skyBottomColor:{r:1,g:1,b:1},sunDirection:{x:.5,y:.9,z:.5},sunColor:{r:1,g:.957,b:.878},sunIntensity:1.5,moonDirection:{x:-.3,y:.8,z:-.5},moonColor:{r:.69,g:.73,b:.87},moonIntensity:.04,fogColor:{r:.529,g:.808,b:.922},fogNear:200,fogFar:1500,ambientColor:{r:.376,g:.376,b:.502},ambientIntensity:.8,hemiSkyColor:{r:.529,g:.808,b:.922},hemiGroundColor:{r:.212,g:.161,b:.027},hemiIntensity:.4,waterColor:{r:0,g:.412,b:.58},waterOpacity:.65,waterHeight:20,timeOfDay:.5,useEstateSun:!0,cloudDensity:.5}}const bo={day:{name:"Day",topColor:new se(30719),midColor:new se(8900331),bottomColor:new se(16777215),sunDirection:new w(.5,.9,.5).normalize(),sunIntensity:1.5,sunColor:new se(16774368),fogColor:new se(8900331),fogNear:200,fogFar:1500,ambientIntensity:.8,ambientColor:new se(6316160),hemiSkyColor:new se(8900331),hemiGroundColor:new se(3549447),hemiIntensity:.4,waterColor:new se(27028),waterOpacity:.65,timeOfDay:.5},sunset:{name:"Sunset",topColor:new se(2759246),midColor:new se(13391155),bottomColor:new se(16742178),sunDirection:new w(.8,.15,.3).normalize(),sunIntensity:.8,sunColor:new se(16737826),fogColor:new se(13395507),fogNear:150,fogFar:1200,ambientIntensity:.35,ambientColor:new se(8930338),hemiSkyColor:new se(13395524),hemiGroundColor:new se(2757896),hemiIntensity:.35,waterColor:new se(6697762),waterOpacity:.7,timeOfDay:.2},night:{name:"Night",topColor:new se(328976),midColor:new se(657966),bottomColor:new se(1118515),sunDirection:new w(.3,.8,.5).normalize(),sunIntensity:.04,sunColor:new se(11189213),fogColor:new se(526368),fogNear:100,fogFar:800,ambientIntensity:.12,ambientColor:new se(2236996),hemiSkyColor:new se(657966),hemiGroundColor:new se(0),hemiIntensity:.15,waterColor:new se(394776),waterOpacity:.8,timeOfDay:0},mars:{name:"Mars",topColor:new se(7023130),midColor:new se(13391155),bottomColor:new se(14509619),sunDirection:new w(.6,.35,.4).normalize(),sunIntensity:.7,sunColor:new se(16729122),fogColor:new se(8930355),fogNear:120,fogFar:900,ambientIntensity:.3,ambientColor:new se(6697762),hemiSkyColor:new se(10044467),hemiGroundColor:new se(3346696),hemiIntensity:.3,waterColor:new se(5579281),waterOpacity:.75,timeOfDay:.3}};class L0{constructor(e){C(this,"scene");C(this,"sunLight");C(this,"ambientLight");C(this,"hemiLight");C(this,"water");C(this,"skyDome");C(this,"moonLight");C(this,"moonDisc");C(this,"timeOfDay",.5);C(this,"currentPreset","day");C(this,"currentWindlight");C(this,"dayNightEnabled",!1);C(this,"dayNightSpeed",1);C(this,"dayNightAccumulator",0);C(this,"drawDistance",1500);this.scene=e,this.currentWindlight=I0();const t=new Cn(4e3,32,16),n=new Pn({uniforms:{topColor:{value:new se(30719)},midColor:{value:new se(8900331)},bottomColor:{value:new se(16777215)},sunDirection:{value:new w(.5,.9,.5).normalize()},sunIntensity:{value:1},sunColor:{value:new se(1,.957,.878)},moonDirection:{value:new w(-.3,.8,-.5).normalize()},moonIntensity:{value:0},moonColor:{value:new se(.69,.73,.87)},fogColor:{value:new se(8900331)},horizonGlow:{value:1}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 midColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDirection;
        uniform float sunIntensity;
        uniform vec3 sunColor;
        uniform vec3 moonDirection;
        uniform float moonIntensity;
        uniform vec3 moonColor;
        uniform vec3 fogColor;
        uniform float horizonGlow;
        varying vec3 vWorldPosition;

        void main() {
          vec3 dir = normalize(vWorldPosition);

          // ---- 3-stop sky gradient (zenith → mid → horizon) ----
          float h = dir.y;
          float horizonBlend = smoothstep(-0.1, 0.3, h);
          float upperBlend = smoothstep(0.3, 1.0, h);

          vec3 skyColor = mix(midColor, topColor, upperBlend);
          skyColor = mix(bottomColor, skyColor, horizonBlend);

          // ---- Sun disc ----
          float sunDot = dot(dir, sunDirection);
          float sunDisc = smoothstep(0.9995, 0.9998, sunDot);
          skyColor += sunColor * sunDisc * 2.0 * sunIntensity;

          // ---- Sun glow / halo ----
          float glow = pow(max(sunDot, 0.0), 64.0);
          skyColor += sunColor * glow * 0.6 * sunIntensity;

          float halo = pow(max(sunDot, 0.0), 8.0);
          skyColor += vec3(1.0, 0.9, 0.7) * halo * 0.25 * sunIntensity;

          // ---- Horizon glow (warm orange, strongest when sun is low) ----
          float horizonFactor = exp(-abs(h) * 6.0);
          float sunNearHorizon = 1.0 - abs(sunDirection.y);
          vec3 horizonGlowColor = vec3(1.0, 0.55, 0.15);
          skyColor += horizonGlowColor * horizonFactor * sunNearHorizon * 0.5 * sunIntensity * horizonGlow;

          // ---- Moon disc (soft glow) ----
          float moonDot = dot(dir, moonDirection);
          float moonDisc = smoothstep(0.998, 0.9995, moonDot);
          skyColor += moonColor * moonDisc * 1.5 * moonIntensity;
          float moonHalo = pow(max(moonDot, 0.0), 32.0);
          skyColor += moonColor * moonHalo * 0.3 * moonIntensity;

          // ---- Horizon fog blend ----
          float fogBlend = smoothstep(-0.05, 0.0, h);
          skyColor = mix(skyColor, fogColor, fogBlend * 0.3);

          gl_FragColor = vec4(skyColor, 1.0);
        }
      `,side:Nt,depthWrite:!1});this.skyDome=new ke(t,n),e.add(this.skyDome),this.sunLight=new fa(16774368,1.5),this.sunLight.position.set(100,200,100),e.add(this.sunLight),this.ambientLight=new _h(6316160,.8),e.add(this.ambientLight),this.hemiLight=new T0(8900331,3549447,.4),e.add(this.hemiLight),this.moonLight=new fa(11189213,0),this.moonLight.position.set(-100,200,-100),e.add(this.moonLight);const i=new Cn(30,16,16),r=new Wi({color:11189213});this.moonDisc=new ke(i,r),this.moonDisc.visible=!1,e.add(this.moonDisc);const o=new Ki(4096,4096),a=new It({color:27028,transparent:!0,opacity:.65,roughness:.05,metalness:.4,side:tn,envMapIntensity:1});this.water=new ke(o,a),this.water.rotation.x=-Math.PI/2,this.water.position.y=20,e.add(this.water),e.fog=new La(8900331,200,1500),this.setTimeOfDay(.5)}applyWindlightSettings(e){this.currentWindlight=e;const t=this.skyDome.material;t.uniforms.topColor.value.copy(Vt(e.skyTopColor)),t.uniforms.midColor.value.copy(Vt(e.skyMidColor)),t.uniforms.bottomColor.value.copy(Vt(e.skyBottomColor)),t.uniforms.sunDirection.value.set(e.sunDirection.x,e.sunDirection.y,e.sunDirection.z).normalize(),t.uniforms.sunIntensity.value=e.sunIntensity,t.uniforms.sunColor.value.copy(Vt(e.sunColor)),t.uniforms.moonDirection.value.set(e.moonDirection.x,e.moonDirection.y,e.moonDirection.z).normalize(),t.uniforms.moonIntensity.value=e.moonIntensity,t.uniforms.moonColor.value.copy(Vt(e.moonColor));const n=300;this.sunLight.position.set(e.sunDirection.x*n,e.sunDirection.y*n,e.sunDirection.z*n),this.sunLight.color.copy(Vt(e.sunColor)),this.sunLight.intensity=e.sunIntensity;const i=300;this.moonLight.position.set(e.moonDirection.x*i,e.moonDirection.y*i,e.moonDirection.z*i),this.moonLight.color.copy(Vt(e.moonColor)),this.moonLight.intensity=e.moonIntensity;const r=new w(e.moonDirection.x,e.moonDirection.y,e.moonDirection.z).normalize().multiplyScalar(3900);if(this.moonDisc.position.copy(r),this.moonDisc.visible=e.moonIntensity>.01,this.ambientLight.color.copy(Vt(e.ambientColor)),this.ambientLight.intensity=e.ambientIntensity,this.hemiLight.color.copy(Vt(e.hemiSkyColor)),this.hemiLight.groundColor.copy(Vt(e.hemiGroundColor)),this.hemiLight.intensity=e.hemiIntensity,this.scene.fog){const a=this.scene.fog;a.color.copy(Vt(e.fogColor));const c=this.drawDistance/1500;a.near=e.fogNear*c,a.far=e.fogFar*c}this.scene.background=Vt(e.skyTopColor);const o=this.water.material;o.color.copy(Vt(e.waterColor)),o.opacity=e.waterOpacity,this.water.position.y=e.waterHeight,this.timeOfDay=e.timeOfDay,this.currentPreset=""}getWindlightSettings(){return{...this.currentWindlight}}setDrawDistance(e){if(this.drawDistance=e,this.scene.fog){const t=this.scene.fog;t.near=e*.8,t.far=e*2}}setDayNightCycle(e,t=1){this.dayNightEnabled=e,this.dayNightSpeed=t,this.dayNightAccumulator=0}isDayNightCycleEnabled(){return this.dayNightEnabled}getPresetNames(){return Object.keys(bo)}getCurrentPreset(){return this.currentPreset}setPreset(e){const t=e.toLowerCase(),n=bo[t];if(!n){console.warn(`[Environment] Unknown preset: "${e}". Available: ${Object.keys(bo).join(", ")}`);return}this.currentPreset=t;const i=this.skyDome.material;i.uniforms.topColor.value.copy(n.topColor),i.uniforms.midColor.value.copy(n.midColor),i.uniforms.bottomColor.value.copy(n.bottomColor),i.uniforms.sunDirection.value.copy(n.sunDirection),i.uniforms.sunIntensity.value=n.sunIntensity;const r=n.sunDirection.y*300,o=n.sunDirection.z*300;this.sunLight.position.set(n.sunDirection.x*300,r,o),this.sunLight.color.copy(n.sunColor),this.sunLight.intensity=n.sunIntensity,this.ambientLight.color.copy(n.ambientColor),this.ambientLight.intensity=n.ambientIntensity,this.hemiLight.color.copy(n.hemiSkyColor),this.hemiLight.groundColor.copy(n.hemiGroundColor),this.hemiLight.intensity=n.hemiIntensity,this.scene.fog&&(this.scene.fog.color.copy(n.fogColor),this.scene.fog.near=n.fogNear,this.scene.fog.far=n.fogFar),this.scene.background=n.topColor.clone();const a=this.water.material;a.color.copy(n.waterColor),a.opacity=n.waterOpacity,this.moonDisc.visible=!1,this.moonLight.intensity=0,this.timeOfDay=n.timeOfDay}setTimeOfDay(e){this.timeOfDay=Math.max(0,Math.min(1,e));const t=this.timeOfDay*Math.PI,n=Math.sin(t)*300,i=Math.cos(t)*300;this.sunLight.position.set(100,n,i),this.sunLight.intensity=Math.max(.1,Math.sin(t)*1.5);const r=1-Math.abs(this.timeOfDay-.5)*2;this.sunLight.color.setHSL(.1-r*.05,.3+r*.5,.8+r*.2);const o=this.skyDome.material,a=Math.max(.1,Math.sin(t)*.7);o.uniforms.topColor.value.setHSL(.6,.7,a),o.uniforms.midColor.value.setHSL(.55,.5,a*.7+.15),o.uniforms.bottomColor.value.setHSL(.1,.5,a*.5);const c=new w(100,n,i).normalize();o.uniforms.sunDirection.value.copy(c),o.uniforms.sunColor.value.copy(this.sunLight.color),o.uniforms.sunIntensity.value=Math.max(0,Math.sin(t)*1.5);const l=Math.max(0,-Math.sin(t)*.5);o.uniforms.moonIntensity.value=l;const h=new w(-100,-n,-i).normalize();o.uniforms.moonDirection.value.copy(h),this.moonLight.intensity=l*.3,this.moonLight.position.copy(h.clone().multiplyScalar(300)),this.moonDisc.position.copy(h.clone().multiplyScalar(3900)),this.moonDisc.visible=l>.01,this.ambientLight.intensity=.3+Math.sin(t)*.5,this.scene.background=o.uniforms.topColor.value.clone(),this.scene.fog&&this.scene.fog.color.copy(this.scene.background),this.water.material.color.setHSL(.55,.6,.15+Math.sin(t)*.2),this.currentPreset=""}update(e){var t;if(this.water.position.y=(((t=this.currentWindlight)==null?void 0:t.waterHeight)??20)+Math.sin(Date.now()*5e-4)*.5,this.dayNightEnabled){this.dayNightAccumulator+=e;const n=3600/this.dayNightSpeed;this.timeOfDay=this.dayNightAccumulator%n/n,this.setTimeOfDay(this.timeOfDay)}}}class xh{constructor(e){C(this,"scene");C(this,"camera");C(this,"renderer");C(this,"clock");C(this,"environment");this.scene=new oh,this.scene.background=new se(8900331),this.camera=new $t(70,e.clientWidth/e.clientHeight,.1,5e3),this.renderer=new r0({antialias:!1,powerPreference:"low-power"}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!1,this.renderer.toneMapping=Mn,this.renderer.outputColorSpace=Rt,e.appendChild(this.renderer.domElement),this.clock=new R0,this.environment=new L0(this.scene);const t=()=>{this.camera.aspect=e.clientWidth/e.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.clientWidth,e.clientHeight)};window.addEventListener("resize",t)}animate(e){const t=()=>{requestAnimationFrame(t);const n=Math.min(this.clock.getDelta(),.1);this.environment.update(n),e==null||e(n),this.renderer.render(this.scene,this.camera)};t()}}class ci extends Error{constructor(e,t){const n=new.target.prototype;super(`${e}: Status code '${t}'`),this.statusCode=t,this.__proto__=n}}class Va extends Error{constructor(e="A timeout occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class rn extends Error{constructor(e="An abort occurred."){const t=new.target.prototype;super(e),this.__proto__=t}}class D0 extends Error{constructor(e,t){const n=new.target.prototype;super(e),this.transport=t,this.errorType="UnsupportedTransportError",this.__proto__=n}}class U0 extends Error{constructor(e,t){const n=new.target.prototype;super(e),this.transport=t,this.errorType="DisabledTransportError",this.__proto__=n}}class N0 extends Error{constructor(e,t){const n=new.target.prototype;super(e),this.transport=t,this.errorType="FailedToStartTransportError",this.__proto__=n}}class ml extends Error{constructor(e){const t=new.target.prototype;super(e),this.errorType="FailedToNegotiateWithServerError",this.__proto__=t}}class F0 extends Error{constructor(e,t){const n=new.target.prototype;super(e),this.innerErrors=t,this.__proto__=n}}class vh{constructor(e,t,n){this.statusCode=e,this.statusText=t,this.content=n}}class Or{get(e,t){return this.send({...t,method:"GET",url:e})}post(e,t){return this.send({...t,method:"POST",url:e})}delete(e,t){return this.send({...t,method:"DELETE",url:e})}getCookieString(e){return""}}var X;(function(s){s[s.Trace=0]="Trace",s[s.Debug=1]="Debug",s[s.Information=2]="Information",s[s.Warning=3]="Warning",s[s.Error=4]="Error",s[s.Critical=5]="Critical",s[s.None=6]="None"})(X||(X={}));class Ms{constructor(){}log(e,t){}}Ms.instance=new Ms;const O0="8.0.17";class xt{static isRequired(e,t){if(e==null)throw new Error(`The '${t}' argument is required.`)}static isNotEmpty(e,t){if(!e||e.match(/^\s*$/))throw new Error(`The '${t}' argument should not be empty.`)}static isIn(e,t,n){if(!(e in t))throw new Error(`Unknown ${n} value: ${e}.`)}}class dt{static get isBrowser(){return!dt.isNode&&typeof window=="object"&&typeof window.document=="object"}static get isWebWorker(){return!dt.isNode&&typeof self=="object"&&"importScripts"in self}static get isReactNative(){return!dt.isNode&&typeof window=="object"&&typeof window.document>"u"}static get isNode(){return typeof process<"u"&&process.release&&process.release.name==="node"}}function ws(s,e){let t="";return fi(s)?(t=`Binary data of length ${s.byteLength}`,e&&(t+=`. Content: '${k0(s)}'`)):typeof s=="string"&&(t=`String data of length ${s.length}`,e&&(t+=`. Content: '${s}'`)),t}function k0(s){const e=new Uint8Array(s);let t="";return e.forEach(n=>{const i=n<16?"0":"";t+=`0x${i}${n.toString(16)} `}),t.substr(0,t.length-1)}function fi(s){return s&&typeof ArrayBuffer<"u"&&(s instanceof ArrayBuffer||s.constructor&&s.constructor.name==="ArrayBuffer")}async function yh(s,e,t,n,i,r){const o={},[a,c]=$i();o[a]=c,s.log(X.Trace,`(${e} transport) sending data. ${ws(i,r.logMessageContent)}.`);const l=fi(i)?"arraybuffer":"text",h=await t.post(n,{content:i,headers:{...o,...r.headers},responseType:l,timeout:r.timeout,withCredentials:r.withCredentials});s.log(X.Trace,`(${e} transport) request complete. Response status: ${h.statusCode}.`)}function B0(s){return s===void 0?new Cr(X.Information):s===null?Ms.instance:s.log!==void 0?s:new Cr(s)}class z0{constructor(e,t){this._subject=e,this._observer=t}dispose(){const e=this._subject.observers.indexOf(this._observer);e>-1&&this._subject.observers.splice(e,1),this._subject.observers.length===0&&this._subject.cancelCallback&&this._subject.cancelCallback().catch(t=>{})}}class Cr{constructor(e){this._minLevel=e,this.out=console}log(e,t){if(e>=this._minLevel){const n=`[${new Date().toISOString()}] ${X[e]}: ${t}`;switch(e){case X.Critical:case X.Error:this.out.error(n);break;case X.Warning:this.out.warn(n);break;case X.Information:this.out.info(n);break;default:this.out.log(n);break}}}}function $i(){let s="X-SignalR-User-Agent";return dt.isNode&&(s="User-Agent"),[s,V0(O0,H0(),W0(),G0())]}function V0(s,e,t,n){let i="Microsoft SignalR/";const r=s.split(".");return i+=`${r[0]}.${r[1]}`,i+=` (${s}; `,e&&e!==""?i+=`${e}; `:i+="Unknown OS; ",i+=`${t}`,n?i+=`; ${n}`:i+="; Unknown Runtime Version",i+=")",i}function H0(){if(dt.isNode)switch(process.platform){case"win32":return"Windows NT";case"darwin":return"macOS";case"linux":return"Linux";default:return process.platform}else return""}function G0(){if(dt.isNode)return process.versions.node}function W0(){return dt.isNode?"NodeJS":"Browser"}function So(s){return s.stack?s.stack:s.message?s.message:`${s}`}function X0(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("could not find global")}class $0 extends Or{constructor(e){if(super(),this._logger=e,typeof fetch>"u"||dt.isNode){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._jar=new(t("tough-cookie")).CookieJar,typeof fetch>"u"?this._fetchType=t("node-fetch"):this._fetchType=fetch,this._fetchType=t("fetch-cookie")(this._fetchType,this._jar)}else this._fetchType=fetch.bind(X0());if(typeof AbortController>"u"){const t=typeof __webpack_require__=="function"?__non_webpack_require__:require;this._abortControllerType=t("abort-controller")}else this._abortControllerType=AbortController}async send(e){if(e.abortSignal&&e.abortSignal.aborted)throw new rn;if(!e.method)throw new Error("No method defined.");if(!e.url)throw new Error("No url defined.");const t=new this._abortControllerType;let n;e.abortSignal&&(e.abortSignal.onabort=()=>{t.abort(),n=new rn});let i=null;if(e.timeout){const c=e.timeout;i=setTimeout(()=>{t.abort(),this._logger.log(X.Warning,"Timeout from HTTP request."),n=new Va},c)}e.content===""&&(e.content=void 0),e.content&&(e.headers=e.headers||{},fi(e.content)?e.headers["Content-Type"]="application/octet-stream":e.headers["Content-Type"]="text/plain;charset=UTF-8");let r;try{r=await this._fetchType(e.url,{body:e.content,cache:"no-cache",credentials:e.withCredentials===!0?"include":"same-origin",headers:{"X-Requested-With":"XMLHttpRequest",...e.headers},method:e.method,mode:"cors",redirect:"follow",signal:t.signal})}catch(c){throw n||(this._logger.log(X.Warning,`Error from HTTP request. ${c}.`),c)}finally{i&&clearTimeout(i),e.abortSignal&&(e.abortSignal.onabort=null)}if(!r.ok){const c=await gl(r,"text");throw new ci(c||r.statusText,r.status)}const a=await gl(r,e.responseType);return new vh(r.status,r.statusText,a)}getCookieString(e){let t="";return dt.isNode&&this._jar&&this._jar.getCookies(e,(n,i)=>t=i.join("; ")),t}}function gl(s,e){let t;switch(e){case"arraybuffer":t=s.arrayBuffer();break;case"text":t=s.text();break;case"blob":case"document":case"json":throw new Error(`${e} is not supported.`);default:t=s.text();break}return t}class Y0 extends Or{constructor(e){super(),this._logger=e}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new rn):e.method?e.url?new Promise((t,n)=>{const i=new XMLHttpRequest;i.open(e.method,e.url,!0),i.withCredentials=e.withCredentials===void 0?!0:e.withCredentials,i.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.content===""&&(e.content=void 0),e.content&&(fi(e.content)?i.setRequestHeader("Content-Type","application/octet-stream"):i.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));const r=e.headers;r&&Object.keys(r).forEach(o=>{i.setRequestHeader(o,r[o])}),e.responseType&&(i.responseType=e.responseType),e.abortSignal&&(e.abortSignal.onabort=()=>{i.abort(),n(new rn)}),e.timeout&&(i.timeout=e.timeout),i.onload=()=>{e.abortSignal&&(e.abortSignal.onabort=null),i.status>=200&&i.status<300?t(new vh(i.status,i.statusText,i.response||i.responseText)):n(new ci(i.response||i.responseText||i.statusText,i.status))},i.onerror=()=>{this._logger.log(X.Warning,`Error from HTTP request. ${i.status}: ${i.statusText}.`),n(new ci(i.statusText,i.status))},i.ontimeout=()=>{this._logger.log(X.Warning,"Timeout from HTTP request."),n(new Va)},i.send(e.content)}):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}}class q0 extends Or{constructor(e){if(super(),typeof fetch<"u"||dt.isNode)this._httpClient=new $0(e);else if(typeof XMLHttpRequest<"u")this._httpClient=new Y0(e);else throw new Error("No usable HttpClient found.")}send(e){return e.abortSignal&&e.abortSignal.aborted?Promise.reject(new rn):e.method?e.url?this._httpClient.send(e):Promise.reject(new Error("No url defined.")):Promise.reject(new Error("No method defined."))}getCookieString(e){return this._httpClient.getCookieString(e)}}class Ht{static write(e){return`${e}${Ht.RecordSeparator}`}static parse(e){if(e[e.length-1]!==Ht.RecordSeparator)throw new Error("Message is incomplete.");const t=e.split(Ht.RecordSeparator);return t.pop(),t}}Ht.RecordSeparatorCode=30;Ht.RecordSeparator=String.fromCharCode(Ht.RecordSeparatorCode);class j0{writeHandshakeRequest(e){return Ht.write(JSON.stringify(e))}parseHandshakeResponse(e){let t,n;if(fi(e)){const a=new Uint8Array(e),c=a.indexOf(Ht.RecordSeparatorCode);if(c===-1)throw new Error("Message is incomplete.");const l=c+1;t=String.fromCharCode.apply(null,Array.prototype.slice.call(a.slice(0,l))),n=a.byteLength>l?a.slice(l).buffer:null}else{const a=e,c=a.indexOf(Ht.RecordSeparator);if(c===-1)throw new Error("Message is incomplete.");const l=c+1;t=a.substring(0,l),n=a.length>l?a.substring(l):null}const i=Ht.parse(t),r=JSON.parse(i[0]);if(r.type)throw new Error("Expected a handshake response from the server.");return[n,r]}}var Ie;(function(s){s[s.Invocation=1]="Invocation",s[s.StreamItem=2]="StreamItem",s[s.Completion=3]="Completion",s[s.StreamInvocation=4]="StreamInvocation",s[s.CancelInvocation=5]="CancelInvocation",s[s.Ping=6]="Ping",s[s.Close=7]="Close",s[s.Ack=8]="Ack",s[s.Sequence=9]="Sequence"})(Ie||(Ie={}));class Z0{constructor(){this.observers=[]}next(e){for(const t of this.observers)t.next(e)}error(e){for(const t of this.observers)t.error&&t.error(e)}complete(){for(const e of this.observers)e.complete&&e.complete()}subscribe(e){return this.observers.push(e),new z0(this,e)}}class K0{constructor(e,t,n){this._bufferSize=1e5,this._messages=[],this._totalMessageCount=0,this._waitForSequenceMessage=!1,this._nextReceivingSequenceId=1,this._latestReceivedSequenceId=0,this._bufferedByteCount=0,this._reconnectInProgress=!1,this._protocol=e,this._connection=t,this._bufferSize=n}async _send(e){const t=this._protocol.writeMessage(e);let n=Promise.resolve();if(this._isInvocationMessage(e)){this._totalMessageCount++;let i=()=>{},r=()=>{};fi(t)?this._bufferedByteCount+=t.byteLength:this._bufferedByteCount+=t.length,this._bufferedByteCount>=this._bufferSize&&(n=new Promise((o,a)=>{i=o,r=a})),this._messages.push(new J0(t,this._totalMessageCount,i,r))}try{this._reconnectInProgress||await this._connection.send(t)}catch{this._disconnected()}await n}_ack(e){let t=-1;for(let n=0;n<this._messages.length;n++){const i=this._messages[n];if(i._id<=e.sequenceId)t=n,fi(i._message)?this._bufferedByteCount-=i._message.byteLength:this._bufferedByteCount-=i._message.length,i._resolver();else if(this._bufferedByteCount<this._bufferSize)i._resolver();else break}t!==-1&&(this._messages=this._messages.slice(t+1))}_shouldProcessMessage(e){if(this._waitForSequenceMessage)return e.type!==Ie.Sequence?!1:(this._waitForSequenceMessage=!1,!0);if(!this._isInvocationMessage(e))return!0;const t=this._nextReceivingSequenceId;return this._nextReceivingSequenceId++,t<=this._latestReceivedSequenceId?(t===this._latestReceivedSequenceId&&this._ackTimer(),!1):(this._latestReceivedSequenceId=t,this._ackTimer(),!0)}_resetSequence(e){if(e.sequenceId>this._nextReceivingSequenceId){this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));return}this._nextReceivingSequenceId=e.sequenceId}_disconnected(){this._reconnectInProgress=!0,this._waitForSequenceMessage=!0}async _resend(){const e=this._messages.length!==0?this._messages[0]._id:this._totalMessageCount+1;await this._connection.send(this._protocol.writeMessage({type:Ie.Sequence,sequenceId:e}));const t=this._messages;for(const n of t)await this._connection.send(n._message);this._reconnectInProgress=!1}_dispose(e){e??(e=new Error("Unable to reconnect to server."));for(const t of this._messages)t._rejector(e)}_isInvocationMessage(e){switch(e.type){case Ie.Invocation:case Ie.StreamItem:case Ie.Completion:case Ie.StreamInvocation:case Ie.CancelInvocation:return!0;case Ie.Close:case Ie.Sequence:case Ie.Ping:case Ie.Ack:return!1}}_ackTimer(){this._ackTimerHandle===void 0&&(this._ackTimerHandle=setTimeout(async()=>{try{this._reconnectInProgress||await this._connection.send(this._protocol.writeMessage({type:Ie.Ack,sequenceId:this._latestReceivedSequenceId}))}catch{}clearTimeout(this._ackTimerHandle),this._ackTimerHandle=void 0},1e3))}}class J0{constructor(e,t,n,i){this._message=e,this._id=t,this._resolver=n,this._rejector=i}}const Q0=30*1e3,e_=15*1e3,t_=1e5;var at;(function(s){s.Disconnected="Disconnected",s.Connecting="Connecting",s.Connected="Connected",s.Disconnecting="Disconnecting",s.Reconnecting="Reconnecting"})(at||(at={}));class Ha{static create(e,t,n,i,r,o,a){return new Ha(e,t,n,i,r,o,a)}constructor(e,t,n,i,r,o,a){this._nextKeepAlive=0,this._freezeEventListener=()=>{this._logger.log(X.Warning,"The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep")},xt.isRequired(e,"connection"),xt.isRequired(t,"logger"),xt.isRequired(n,"protocol"),this.serverTimeoutInMilliseconds=r??Q0,this.keepAliveIntervalInMilliseconds=o??e_,this._statefulReconnectBufferSize=a??t_,this._logger=t,this._protocol=n,this.connection=e,this._reconnectPolicy=i,this._handshakeProtocol=new j0,this.connection.onreceive=c=>this._processIncomingData(c),this.connection.onclose=c=>this._connectionClosed(c),this._callbacks={},this._methods={},this._closedCallbacks=[],this._reconnectingCallbacks=[],this._reconnectedCallbacks=[],this._invocationId=0,this._receivedHandshakeResponse=!1,this._connectionState=at.Disconnected,this._connectionStarted=!1,this._cachedPingMessage=this._protocol.writeMessage({type:Ie.Ping})}get state(){return this._connectionState}get connectionId(){return this.connection&&this.connection.connectionId||null}get baseUrl(){return this.connection.baseUrl||""}set baseUrl(e){if(this._connectionState!==at.Disconnected&&this._connectionState!==at.Reconnecting)throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");if(!e)throw new Error("The HubConnection url must be a valid url.");this.connection.baseUrl=e}start(){return this._startPromise=this._startWithStateTransitions(),this._startPromise}async _startWithStateTransitions(){if(this._connectionState!==at.Disconnected)return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));this._connectionState=at.Connecting,this._logger.log(X.Debug,"Starting HubConnection.");try{await this._startInternal(),dt.isBrowser&&window.document.addEventListener("freeze",this._freezeEventListener),this._connectionState=at.Connected,this._connectionStarted=!0,this._logger.log(X.Debug,"HubConnection connected successfully.")}catch(e){return this._connectionState=at.Disconnected,this._logger.log(X.Debug,`HubConnection failed to start successfully because of error '${e}'.`),Promise.reject(e)}}async _startInternal(){this._stopDuringStartError=void 0,this._receivedHandshakeResponse=!1;const e=new Promise((t,n)=>{this._handshakeResolver=t,this._handshakeRejecter=n});await this.connection.start(this._protocol.transferFormat);try{let t=this._protocol.version;this.connection.features.reconnect||(t=1);const n={protocol:this._protocol.name,version:t};if(this._logger.log(X.Debug,"Sending handshake request."),await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(n)),this._logger.log(X.Information,`Using HubProtocol '${this._protocol.name}'.`),this._cleanupTimeout(),this._resetTimeoutPeriod(),this._resetKeepAliveInterval(),await e,this._stopDuringStartError)throw this._stopDuringStartError;(this.connection.features.reconnect||!1)&&(this._messageBuffer=new K0(this._protocol,this.connection,this._statefulReconnectBufferSize),this.connection.features.disconnected=this._messageBuffer._disconnected.bind(this._messageBuffer),this.connection.features.resend=()=>{if(this._messageBuffer)return this._messageBuffer._resend()}),this.connection.features.inherentKeepAlive||await this._sendMessage(this._cachedPingMessage)}catch(t){throw this._logger.log(X.Debug,`Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`),this._cleanupTimeout(),this._cleanupPingTimer(),await this.connection.stop(t),t}}async stop(){const e=this._startPromise;this.connection.features.reconnect=!1,this._stopPromise=this._stopInternal(),await this._stopPromise;try{await e}catch{}}_stopInternal(e){if(this._connectionState===at.Disconnected)return this._logger.log(X.Debug,`Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`),Promise.resolve();if(this._connectionState===at.Disconnecting)return this._logger.log(X.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;const t=this._connectionState;return this._connectionState=at.Disconnecting,this._logger.log(X.Debug,"Stopping HubConnection."),this._reconnectDelayHandle?(this._logger.log(X.Debug,"Connection stopped during reconnect delay. Done reconnecting."),clearTimeout(this._reconnectDelayHandle),this._reconnectDelayHandle=void 0,this._completeClose(),Promise.resolve()):(t===at.Connected&&this._sendCloseMessage(),this._cleanupTimeout(),this._cleanupPingTimer(),this._stopDuringStartError=e||new rn("The connection was stopped before the hub handshake could complete."),this.connection.stop(e))}async _sendCloseMessage(){try{await this._sendWithProtocol(this._createCloseMessage())}catch{}}stream(e,...t){const[n,i]=this._replaceStreamingParams(t),r=this._createStreamInvocation(e,t,i);let o;const a=new Z0;return a.cancelCallback=()=>{const c=this._createCancelInvocation(r.invocationId);return delete this._callbacks[r.invocationId],o.then(()=>this._sendWithProtocol(c))},this._callbacks[r.invocationId]=(c,l)=>{if(l){a.error(l);return}else c&&(c.type===Ie.Completion?c.error?a.error(new Error(c.error)):a.complete():a.next(c.item))},o=this._sendWithProtocol(r).catch(c=>{a.error(c),delete this._callbacks[r.invocationId]}),this._launchStreams(n,o),a}_sendMessage(e){return this._resetKeepAliveInterval(),this.connection.send(e)}_sendWithProtocol(e){return this._messageBuffer?this._messageBuffer._send(e):this._sendMessage(this._protocol.writeMessage(e))}send(e,...t){const[n,i]=this._replaceStreamingParams(t),r=this._sendWithProtocol(this._createInvocation(e,t,!0,i));return this._launchStreams(n,r),r}invoke(e,...t){const[n,i]=this._replaceStreamingParams(t),r=this._createInvocation(e,t,!1,i);return new Promise((a,c)=>{this._callbacks[r.invocationId]=(h,u)=>{if(u){c(u);return}else h&&(h.type===Ie.Completion?h.error?c(new Error(h.error)):a(h.result):c(new Error(`Unexpected message type: ${h.type}`)))};const l=this._sendWithProtocol(r).catch(h=>{c(h),delete this._callbacks[r.invocationId]});this._launchStreams(n,l)})}on(e,t){!e||!t||(e=e.toLowerCase(),this._methods[e]||(this._methods[e]=[]),this._methods[e].indexOf(t)===-1&&this._methods[e].push(t))}off(e,t){if(!e)return;e=e.toLowerCase();const n=this._methods[e];if(n)if(t){const i=n.indexOf(t);i!==-1&&(n.splice(i,1),n.length===0&&delete this._methods[e])}else delete this._methods[e]}onclose(e){e&&this._closedCallbacks.push(e)}onreconnecting(e){e&&this._reconnectingCallbacks.push(e)}onreconnected(e){e&&this._reconnectedCallbacks.push(e)}_processIncomingData(e){if(this._cleanupTimeout(),this._receivedHandshakeResponse||(e=this._processHandshakeResponse(e),this._receivedHandshakeResponse=!0),e){const t=this._protocol.parseMessages(e,this._logger);for(const n of t)if(!(this._messageBuffer&&!this._messageBuffer._shouldProcessMessage(n)))switch(n.type){case Ie.Invocation:this._invokeClientMethod(n).catch(i=>{this._logger.log(X.Error,`Invoke client method threw error: ${So(i)}`)});break;case Ie.StreamItem:case Ie.Completion:{const i=this._callbacks[n.invocationId];if(i){n.type===Ie.Completion&&delete this._callbacks[n.invocationId];try{i(n)}catch(r){this._logger.log(X.Error,`Stream callback threw error: ${So(r)}`)}}break}case Ie.Ping:break;case Ie.Close:{this._logger.log(X.Information,"Close message received from server.");const i=n.error?new Error("Server returned an error on close: "+n.error):void 0;n.allowReconnect===!0?this.connection.stop(i):this._stopPromise=this._stopInternal(i);break}case Ie.Ack:this._messageBuffer&&this._messageBuffer._ack(n);break;case Ie.Sequence:this._messageBuffer&&this._messageBuffer._resetSequence(n);break;default:this._logger.log(X.Warning,`Invalid message type: ${n.type}.`);break}}this._resetTimeoutPeriod()}_processHandshakeResponse(e){let t,n;try{[n,t]=this._handshakeProtocol.parseHandshakeResponse(e)}catch(i){const r="Error parsing handshake response: "+i;this._logger.log(X.Error,r);const o=new Error(r);throw this._handshakeRejecter(o),o}if(t.error){const i="Server returned handshake error: "+t.error;this._logger.log(X.Error,i);const r=new Error(i);throw this._handshakeRejecter(r),r}else this._logger.log(X.Debug,"Server handshake complete.");return this._handshakeResolver(),n}_resetKeepAliveInterval(){this.connection.features.inherentKeepAlive||(this._nextKeepAlive=new Date().getTime()+this.keepAliveIntervalInMilliseconds,this._cleanupPingTimer())}_resetTimeoutPeriod(){if((!this.connection.features||!this.connection.features.inherentKeepAlive)&&(this._timeoutHandle=setTimeout(()=>this.serverTimeout(),this.serverTimeoutInMilliseconds),this._pingServerHandle===void 0)){let e=this._nextKeepAlive-new Date().getTime();e<0&&(e=0),this._pingServerHandle=setTimeout(async()=>{if(this._connectionState===at.Connected)try{await this._sendMessage(this._cachedPingMessage)}catch{this._cleanupPingTimer()}},e)}}serverTimeout(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))}async _invokeClientMethod(e){const t=e.target.toLowerCase(),n=this._methods[t];if(!n){this._logger.log(X.Warning,`No client method with the name '${t}' found.`),e.invocationId&&(this._logger.log(X.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),await this._sendWithProtocol(this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)));return}const i=n.slice(),r=!!e.invocationId;let o,a,c;for(const l of i)try{const h=o;o=await l.apply(this,e.arguments),r&&o&&h&&(this._logger.log(X.Error,`Multiple results provided for '${t}'. Sending error to server.`),c=this._createCompletionMessage(e.invocationId,"Client provided multiple results.",null)),a=void 0}catch(h){a=h,this._logger.log(X.Error,`A callback for the method '${t}' threw error '${h}'.`)}c?await this._sendWithProtocol(c):r?(a?c=this._createCompletionMessage(e.invocationId,`${a}`,null):o!==void 0?c=this._createCompletionMessage(e.invocationId,null,o):(this._logger.log(X.Warning,`No result given for '${t}' method and invocation ID '${e.invocationId}'.`),c=this._createCompletionMessage(e.invocationId,"Client didn't provide a result.",null)),await this._sendWithProtocol(c)):o&&this._logger.log(X.Error,`Result given for '${t}' method but server is not expecting a result.`)}_connectionClosed(e){this._logger.log(X.Debug,`HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`),this._stopDuringStartError=this._stopDuringStartError||e||new rn("The underlying connection was closed before the hub handshake could complete."),this._handshakeResolver&&this._handshakeResolver(),this._cancelCallbacksWithError(e||new Error("Invocation canceled due to the underlying connection being closed.")),this._cleanupTimeout(),this._cleanupPingTimer(),this._connectionState===at.Disconnecting?this._completeClose(e):this._connectionState===at.Connected&&this._reconnectPolicy?this._reconnect(e):this._connectionState===at.Connected&&this._completeClose(e)}_completeClose(e){if(this._connectionStarted){this._connectionState=at.Disconnected,this._connectionStarted=!1,this._messageBuffer&&(this._messageBuffer._dispose(e??new Error("Connection closed.")),this._messageBuffer=void 0),dt.isBrowser&&window.document.removeEventListener("freeze",this._freezeEventListener);try{this._closedCallbacks.forEach(t=>t.apply(this,[e]))}catch(t){this._logger.log(X.Error,`An onclose callback called with error '${e}' threw error '${t}'.`)}}}async _reconnect(e){const t=Date.now();let n=0,i=e!==void 0?e:new Error("Attempting to reconnect due to a unknown error."),r=this._getNextRetryDelay(n++,0,i);if(r===null){this._logger.log(X.Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."),this._completeClose(e);return}if(this._connectionState=at.Reconnecting,e?this._logger.log(X.Information,`Connection reconnecting because of error '${e}'.`):this._logger.log(X.Information,"Connection reconnecting."),this._reconnectingCallbacks.length!==0){try{this._reconnectingCallbacks.forEach(o=>o.apply(this,[e]))}catch(o){this._logger.log(X.Error,`An onreconnecting callback called with error '${e}' threw error '${o}'.`)}if(this._connectionState!==at.Reconnecting){this._logger.log(X.Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return}}for(;r!==null;){if(this._logger.log(X.Information,`Reconnect attempt number ${n} will start in ${r} ms.`),await new Promise(o=>{this._reconnectDelayHandle=setTimeout(o,r)}),this._reconnectDelayHandle=void 0,this._connectionState!==at.Reconnecting){this._logger.log(X.Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return}try{if(await this._startInternal(),this._connectionState=at.Connected,this._logger.log(X.Information,"HubConnection reconnected successfully."),this._reconnectedCallbacks.length!==0)try{this._reconnectedCallbacks.forEach(o=>o.apply(this,[this.connection.connectionId]))}catch(o){this._logger.log(X.Error,`An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${o}'.`)}return}catch(o){if(this._logger.log(X.Information,`Reconnect attempt failed because of error '${o}'.`),this._connectionState!==at.Reconnecting){this._logger.log(X.Debug,`Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`),this._connectionState===at.Disconnecting&&this._completeClose();return}i=o instanceof Error?o:new Error(o.toString()),r=this._getNextRetryDelay(n++,Date.now()-t,i)}}this._logger.log(X.Information,`Reconnect retries have been exhausted after ${Date.now()-t} ms and ${n} failed attempts. Connection disconnecting.`),this._completeClose()}_getNextRetryDelay(e,t,n){try{return this._reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:t,previousRetryCount:e,retryReason:n})}catch(i){return this._logger.log(X.Error,`IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${i}'.`),null}}_cancelCallbacksWithError(e){const t=this._callbacks;this._callbacks={},Object.keys(t).forEach(n=>{const i=t[n];try{i(null,e)}catch(r){this._logger.log(X.Error,`Stream 'error' callback called with '${e}' threw error: ${So(r)}`)}})}_cleanupPingTimer(){this._pingServerHandle&&(clearTimeout(this._pingServerHandle),this._pingServerHandle=void 0)}_cleanupTimeout(){this._timeoutHandle&&clearTimeout(this._timeoutHandle)}_createInvocation(e,t,n,i){if(n)return i.length!==0?{arguments:t,streamIds:i,target:e,type:Ie.Invocation}:{arguments:t,target:e,type:Ie.Invocation};{const r=this._invocationId;return this._invocationId++,i.length!==0?{arguments:t,invocationId:r.toString(),streamIds:i,target:e,type:Ie.Invocation}:{arguments:t,invocationId:r.toString(),target:e,type:Ie.Invocation}}}_launchStreams(e,t){if(e.length!==0){t||(t=Promise.resolve());for(const n in e)e[n].subscribe({complete:()=>{t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(n)))},error:i=>{let r;i instanceof Error?r=i.message:i&&i.toString?r=i.toString():r="Unknown error",t=t.then(()=>this._sendWithProtocol(this._createCompletionMessage(n,r)))},next:i=>{t=t.then(()=>this._sendWithProtocol(this._createStreamItemMessage(n,i)))}})}}_replaceStreamingParams(e){const t=[],n=[];for(let i=0;i<e.length;i++){const r=e[i];if(this._isObservable(r)){const o=this._invocationId;this._invocationId++,t[o]=r,n.push(o.toString()),e.splice(i,1)}}return[t,n]}_isObservable(e){return e&&e.subscribe&&typeof e.subscribe=="function"}_createStreamInvocation(e,t,n){const i=this._invocationId;return this._invocationId++,n.length!==0?{arguments:t,invocationId:i.toString(),streamIds:n,target:e,type:Ie.StreamInvocation}:{arguments:t,invocationId:i.toString(),target:e,type:Ie.StreamInvocation}}_createCancelInvocation(e){return{invocationId:e,type:Ie.CancelInvocation}}_createStreamItemMessage(e,t){return{invocationId:e,item:t,type:Ie.StreamItem}}_createCompletionMessage(e,t,n){return t?{error:t,invocationId:e,type:Ie.Completion}:{invocationId:e,result:n,type:Ie.Completion}}_createCloseMessage(){return{type:Ie.Close}}}const n_=[0,2e3,1e4,3e4,null];class _l{constructor(e){this._retryDelays=e!==void 0?[...e,null]:n_}nextRetryDelayInMilliseconds(e){return this._retryDelays[e.previousRetryCount]}}class li{}li.Authorization="Authorization";li.Cookie="Cookie";class i_ extends Or{constructor(e,t){super(),this._innerClient=e,this._accessTokenFactory=t}async send(e){let t=!0;this._accessTokenFactory&&(!this._accessToken||e.url&&e.url.indexOf("/negotiate?")>0)&&(t=!1,this._accessToken=await this._accessTokenFactory()),this._setAuthorizationHeader(e);const n=await this._innerClient.send(e);return t&&n.statusCode===401&&this._accessTokenFactory?(this._accessToken=await this._accessTokenFactory(),this._setAuthorizationHeader(e),await this._innerClient.send(e)):n}_setAuthorizationHeader(e){e.headers||(e.headers={}),this._accessToken?e.headers[li.Authorization]=`Bearer ${this._accessToken}`:this._accessTokenFactory&&e.headers[li.Authorization]&&delete e.headers[li.Authorization]}getCookieString(e){return this._innerClient.getCookieString(e)}}var vt;(function(s){s[s.None=0]="None",s[s.WebSockets=1]="WebSockets",s[s.ServerSentEvents=2]="ServerSentEvents",s[s.LongPolling=4]="LongPolling"})(vt||(vt={}));var Pt;(function(s){s[s.Text=1]="Text",s[s.Binary=2]="Binary"})(Pt||(Pt={}));let s_=class{constructor(){this._isAborted=!1,this.onabort=null}abort(){this._isAborted||(this._isAborted=!0,this.onabort&&this.onabort())}get signal(){return this}get aborted(){return this._isAborted}};class xl{get pollAborted(){return this._pollAbort.aborted}constructor(e,t,n){this._httpClient=e,this._logger=t,this._pollAbort=new s_,this._options=n,this._running=!1,this.onreceive=null,this.onclose=null}async connect(e,t){if(xt.isRequired(e,"url"),xt.isRequired(t,"transferFormat"),xt.isIn(t,Pt,"transferFormat"),this._url=e,this._logger.log(X.Trace,"(LongPolling transport) Connecting."),t===Pt.Binary&&typeof XMLHttpRequest<"u"&&typeof new XMLHttpRequest().responseType!="string")throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");const[n,i]=$i(),r={[n]:i,...this._options.headers},o={abortSignal:this._pollAbort.signal,headers:r,timeout:1e5,withCredentials:this._options.withCredentials};t===Pt.Binary&&(o.responseType="arraybuffer");const a=`${e}&_=${Date.now()}`;this._logger.log(X.Trace,`(LongPolling transport) polling: ${a}.`);const c=await this._httpClient.get(a,o);c.statusCode!==200?(this._logger.log(X.Error,`(LongPolling transport) Unexpected response code: ${c.statusCode}.`),this._closeError=new ci(c.statusText||"",c.statusCode),this._running=!1):this._running=!0,this._receiving=this._poll(this._url,o)}async _poll(e,t){try{for(;this._running;)try{const n=`${e}&_=${Date.now()}`;this._logger.log(X.Trace,`(LongPolling transport) polling: ${n}.`);const i=await this._httpClient.get(n,t);i.statusCode===204?(this._logger.log(X.Information,"(LongPolling transport) Poll terminated by server."),this._running=!1):i.statusCode!==200?(this._logger.log(X.Error,`(LongPolling transport) Unexpected response code: ${i.statusCode}.`),this._closeError=new ci(i.statusText||"",i.statusCode),this._running=!1):i.content?(this._logger.log(X.Trace,`(LongPolling transport) data received. ${ws(i.content,this._options.logMessageContent)}.`),this.onreceive&&this.onreceive(i.content)):this._logger.log(X.Trace,"(LongPolling transport) Poll timed out, reissuing.")}catch(n){this._running?n instanceof Va?this._logger.log(X.Trace,"(LongPolling transport) Poll timed out, reissuing."):(this._closeError=n,this._running=!1):this._logger.log(X.Trace,`(LongPolling transport) Poll errored after shutdown: ${n.message}`)}}finally{this._logger.log(X.Trace,"(LongPolling transport) Polling complete."),this.pollAborted||this._raiseOnClose()}}async send(e){return this._running?yh(this._logger,"LongPolling",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}async stop(){this._logger.log(X.Trace,"(LongPolling transport) Stopping polling."),this._running=!1,this._pollAbort.abort();try{await this._receiving,this._logger.log(X.Trace,`(LongPolling transport) sending DELETE request to ${this._url}.`);const e={},[t,n]=$i();e[t]=n;const i={headers:{...e,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials};let r;try{await this._httpClient.delete(this._url,i)}catch(o){r=o}r?r instanceof ci&&(r.statusCode===404?this._logger.log(X.Trace,"(LongPolling transport) A 404 response was returned from sending a DELETE request."):this._logger.log(X.Trace,`(LongPolling transport) Error sending a DELETE request: ${r}`)):this._logger.log(X.Trace,"(LongPolling transport) DELETE request accepted.")}finally{this._logger.log(X.Trace,"(LongPolling transport) Stop finished."),this._raiseOnClose()}}_raiseOnClose(){if(this.onclose){let e="(LongPolling transport) Firing onclose event.";this._closeError&&(e+=" Error: "+this._closeError),this._logger.log(X.Trace,e),this.onclose(this._closeError)}}}class r_{constructor(e,t,n,i){this._httpClient=e,this._accessToken=t,this._logger=n,this._options=i,this.onreceive=null,this.onclose=null}async connect(e,t){return xt.isRequired(e,"url"),xt.isRequired(t,"transferFormat"),xt.isIn(t,Pt,"transferFormat"),this._logger.log(X.Trace,"(SSE transport) Connecting."),this._url=e,this._accessToken&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(this._accessToken)}`),new Promise((n,i)=>{let r=!1;if(t!==Pt.Text){i(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}let o;if(dt.isBrowser||dt.isWebWorker)o=new this._options.EventSource(e,{withCredentials:this._options.withCredentials});else{const a=this._httpClient.getCookieString(e),c={};c.Cookie=a;const[l,h]=$i();c[l]=h,o=new this._options.EventSource(e,{withCredentials:this._options.withCredentials,headers:{...c,...this._options.headers}})}try{o.onmessage=a=>{if(this.onreceive)try{this._logger.log(X.Trace,`(SSE transport) data received. ${ws(a.data,this._options.logMessageContent)}.`),this.onreceive(a.data)}catch(c){this._close(c);return}},o.onerror=a=>{r?this._close():i(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."))},o.onopen=()=>{this._logger.log(X.Information,`SSE connected to ${this._url}`),this._eventSource=o,r=!0,n()}}catch(a){i(a);return}})}async send(e){return this._eventSource?yh(this._logger,"SSE",this._httpClient,this._url,e,this._options):Promise.reject(new Error("Cannot send until the transport is connected"))}stop(){return this._close(),Promise.resolve()}_close(e){this._eventSource&&(this._eventSource.close(),this._eventSource=void 0,this.onclose&&this.onclose(e))}}class o_{constructor(e,t,n,i,r,o){this._logger=n,this._accessTokenFactory=t,this._logMessageContent=i,this._webSocketConstructor=r,this._httpClient=e,this.onreceive=null,this.onclose=null,this._headers=o}async connect(e,t){xt.isRequired(e,"url"),xt.isRequired(t,"transferFormat"),xt.isIn(t,Pt,"transferFormat"),this._logger.log(X.Trace,"(WebSockets transport) Connecting.");let n;return this._accessTokenFactory&&(n=await this._accessTokenFactory()),new Promise((i,r)=>{e=e.replace(/^http/,"ws");let o;const a=this._httpClient.getCookieString(e);let c=!1;if(dt.isNode||dt.isReactNative){const l={},[h,u]=$i();l[h]=u,n&&(l[li.Authorization]=`Bearer ${n}`),a&&(l[li.Cookie]=a),o=new this._webSocketConstructor(e,void 0,{headers:{...l,...this._headers}})}else n&&(e+=(e.indexOf("?")<0?"?":"&")+`access_token=${encodeURIComponent(n)}`);o||(o=new this._webSocketConstructor(e)),t===Pt.Binary&&(o.binaryType="arraybuffer"),o.onopen=l=>{this._logger.log(X.Information,`WebSocket connected to ${e}.`),this._webSocket=o,c=!0,i()},o.onerror=l=>{let h=null;typeof ErrorEvent<"u"&&l instanceof ErrorEvent?h=l.error:h="There was an error with the transport",this._logger.log(X.Information,`(WebSockets transport) ${h}.`)},o.onmessage=l=>{if(this._logger.log(X.Trace,`(WebSockets transport) data received. ${ws(l.data,this._logMessageContent)}.`),this.onreceive)try{this.onreceive(l.data)}catch(h){this._close(h);return}},o.onclose=l=>{if(c)this._close(l);else{let h=null;typeof ErrorEvent<"u"&&l instanceof ErrorEvent?h=l.error:h="WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.",r(new Error(h))}}})}send(e){return this._webSocket&&this._webSocket.readyState===this._webSocketConstructor.OPEN?(this._logger.log(X.Trace,`(WebSockets transport) sending data. ${ws(e,this._logMessageContent)}.`),this._webSocket.send(e),Promise.resolve()):Promise.reject("WebSocket is not in the OPEN state")}stop(){return this._webSocket&&this._close(void 0),Promise.resolve()}_close(e){this._webSocket&&(this._webSocket.onclose=()=>{},this._webSocket.onmessage=()=>{},this._webSocket.onerror=()=>{},this._webSocket.close(),this._webSocket=void 0),this._logger.log(X.Trace,"(WebSockets transport) socket closed."),this.onclose&&(this._isCloseEvent(e)&&(e.wasClean===!1||e.code!==1e3)?this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason||"no reason given"}).`)):e instanceof Error?this.onclose(e):this.onclose())}_isCloseEvent(e){return e&&typeof e.wasClean=="boolean"&&typeof e.code=="number"}}const vl=100;class a_{constructor(e,t={}){if(this._stopPromiseResolver=()=>{},this.features={},this._negotiateVersion=1,xt.isRequired(e,"url"),this._logger=B0(t.logger),this.baseUrl=this._resolveUrl(e),t=t||{},t.logMessageContent=t.logMessageContent===void 0?!1:t.logMessageContent,typeof t.withCredentials=="boolean"||t.withCredentials===void 0)t.withCredentials=t.withCredentials===void 0?!0:t.withCredentials;else throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");t.timeout=t.timeout===void 0?100*1e3:t.timeout;let n=null,i=null;if(dt.isNode&&typeof require<"u"){const r=typeof __webpack_require__=="function"?__non_webpack_require__:require;n=r("ws"),i=r("eventsource")}!dt.isNode&&typeof WebSocket<"u"&&!t.WebSocket?t.WebSocket=WebSocket:dt.isNode&&!t.WebSocket&&n&&(t.WebSocket=n),!dt.isNode&&typeof EventSource<"u"&&!t.EventSource?t.EventSource=EventSource:dt.isNode&&!t.EventSource&&typeof i<"u"&&(t.EventSource=i),this._httpClient=new i_(t.httpClient||new q0(this._logger),t.accessTokenFactory),this._connectionState="Disconnected",this._connectionStarted=!1,this._options=t,this.onreceive=null,this.onclose=null}async start(e){if(e=e||Pt.Binary,xt.isIn(e,Pt,"transferFormat"),this._logger.log(X.Debug,`Starting connection with transfer format '${Pt[e]}'.`),this._connectionState!=="Disconnected")return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));if(this._connectionState="Connecting",this._startInternalPromise=this._startInternal(e),await this._startInternalPromise,this._connectionState==="Disconnecting"){const t="Failed to start the HttpConnection before stop() was called.";return this._logger.log(X.Error,t),await this._stopPromise,Promise.reject(new rn(t))}else if(this._connectionState!=="Connected"){const t="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";return this._logger.log(X.Error,t),Promise.reject(new rn(t))}this._connectionStarted=!0}send(e){return this._connectionState!=="Connected"?Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")):(this._sendQueue||(this._sendQueue=new Ga(this.transport)),this._sendQueue.send(e))}async stop(e){if(this._connectionState==="Disconnected")return this._logger.log(X.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`),Promise.resolve();if(this._connectionState==="Disconnecting")return this._logger.log(X.Debug,`Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`),this._stopPromise;this._connectionState="Disconnecting",this._stopPromise=new Promise(t=>{this._stopPromiseResolver=t}),await this._stopInternal(e),await this._stopPromise}async _stopInternal(e){this._stopError=e;try{await this._startInternalPromise}catch{}if(this.transport){try{await this.transport.stop()}catch(t){this._logger.log(X.Error,`HttpConnection.transport.stop() threw error '${t}'.`),this._stopConnection()}this.transport=void 0}else this._logger.log(X.Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.")}async _startInternal(e){let t=this.baseUrl;this._accessTokenFactory=this._options.accessTokenFactory,this._httpClient._accessTokenFactory=this._accessTokenFactory;try{if(this._options.skipNegotiation)if(this._options.transport===vt.WebSockets)this.transport=this._constructTransport(vt.WebSockets),await this._startTransport(t,e);else throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");else{let n=null,i=0;do{if(n=await this._getNegotiationResponse(t),this._connectionState==="Disconnecting"||this._connectionState==="Disconnected")throw new rn("The connection was stopped during negotiation.");if(n.error)throw new Error(n.error);if(n.ProtocolVersion)throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");if(n.url&&(t=n.url),n.accessToken){const r=n.accessToken;this._accessTokenFactory=()=>r,this._httpClient._accessToken=r,this._httpClient._accessTokenFactory=void 0}i++}while(n.url&&i<vl);if(i===vl&&n.url)throw new Error("Negotiate redirection limit exceeded.");await this._createTransport(t,this._options.transport,n,e)}this.transport instanceof xl&&(this.features.inherentKeepAlive=!0),this._connectionState==="Connecting"&&(this._logger.log(X.Debug,"The HttpConnection connected successfully."),this._connectionState="Connected")}catch(n){return this._logger.log(X.Error,"Failed to start the connection: "+n),this._connectionState="Disconnected",this.transport=void 0,this._stopPromiseResolver(),Promise.reject(n)}}async _getNegotiationResponse(e){const t={},[n,i]=$i();t[n]=i;const r=this._resolveNegotiateUrl(e);this._logger.log(X.Debug,`Sending negotiation request: ${r}.`);try{const o=await this._httpClient.post(r,{content:"",headers:{...t,...this._options.headers},timeout:this._options.timeout,withCredentials:this._options.withCredentials});if(o.statusCode!==200)return Promise.reject(new Error(`Unexpected status code returned from negotiate '${o.statusCode}'`));const a=JSON.parse(o.content);return(!a.negotiateVersion||a.negotiateVersion<1)&&(a.connectionToken=a.connectionId),a.useStatefulReconnect&&this._options._useStatefulReconnect!==!0?Promise.reject(new ml("Client didn't negotiate Stateful Reconnect but the server did.")):a}catch(o){let a="Failed to complete negotiation with the server: "+o;return o instanceof ci&&o.statusCode===404&&(a=a+" Either this is not a SignalR endpoint or there is a proxy blocking the connection."),this._logger.log(X.Error,a),Promise.reject(new ml(a))}}_createConnectUrl(e,t){return t?e+(e.indexOf("?")===-1?"?":"&")+`id=${t}`:e}async _createTransport(e,t,n,i){let r=this._createConnectUrl(e,n.connectionToken);if(this._isITransport(t)){this._logger.log(X.Debug,"Connection was provided an instance of ITransport, using that directly."),this.transport=t,await this._startTransport(r,i),this.connectionId=n.connectionId;return}const o=[],a=n.availableTransports||[];let c=n;for(const l of a){const h=this._resolveTransportOrError(l,t,i,(c==null?void 0:c.useStatefulReconnect)===!0);if(h instanceof Error)o.push(`${l.transport} failed:`),o.push(h);else if(this._isITransport(h)){if(this.transport=h,!c){try{c=await this._getNegotiationResponse(e)}catch(u){return Promise.reject(u)}r=this._createConnectUrl(e,c.connectionToken)}try{await this._startTransport(r,i),this.connectionId=c.connectionId;return}catch(u){if(this._logger.log(X.Error,`Failed to start the transport '${l.transport}': ${u}`),c=void 0,o.push(new N0(`${l.transport} failed: ${u}`,vt[l.transport])),this._connectionState!=="Connecting"){const d="Failed to select transport before stop() was called.";return this._logger.log(X.Debug,d),Promise.reject(new rn(d))}}}}return o.length>0?Promise.reject(new F0(`Unable to connect to the server with any of the available transports. ${o.join(" ")}`,o)):Promise.reject(new Error("None of the transports supported by the client are supported by the server."))}_constructTransport(e){switch(e){case vt.WebSockets:if(!this._options.WebSocket)throw new Error("'WebSocket' is not supported in your environment.");return new o_(this._httpClient,this._accessTokenFactory,this._logger,this._options.logMessageContent,this._options.WebSocket,this._options.headers||{});case vt.ServerSentEvents:if(!this._options.EventSource)throw new Error("'EventSource' is not supported in your environment.");return new r_(this._httpClient,this._httpClient._accessToken,this._logger,this._options);case vt.LongPolling:return new xl(this._httpClient,this._logger,this._options);default:throw new Error(`Unknown transport: ${e}.`)}}_startTransport(e,t){return this.transport.onreceive=this.onreceive,this.features.reconnect?this.transport.onclose=async n=>{let i=!1;if(this.features.reconnect)try{this.features.disconnected(),await this.transport.connect(e,t),await this.features.resend()}catch{i=!0}else{this._stopConnection(n);return}i&&this._stopConnection(n)}:this.transport.onclose=n=>this._stopConnection(n),this.transport.connect(e,t)}_resolveTransportOrError(e,t,n,i){const r=vt[e.transport];if(r==null)return this._logger.log(X.Debug,`Skipping transport '${e.transport}' because it is not supported by this client.`),new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);if(c_(t,r))if(e.transferFormats.map(a=>Pt[a]).indexOf(n)>=0){if(r===vt.WebSockets&&!this._options.WebSocket||r===vt.ServerSentEvents&&!this._options.EventSource)return this._logger.log(X.Debug,`Skipping transport '${vt[r]}' because it is not supported in your environment.'`),new D0(`'${vt[r]}' is not supported in your environment.`,r);this._logger.log(X.Debug,`Selecting transport '${vt[r]}'.`);try{return this.features.reconnect=r===vt.WebSockets?i:void 0,this._constructTransport(r)}catch(a){return a}}else return this._logger.log(X.Debug,`Skipping transport '${vt[r]}' because it does not support the requested transfer format '${Pt[n]}'.`),new Error(`'${vt[r]}' does not support ${Pt[n]}.`);else return this._logger.log(X.Debug,`Skipping transport '${vt[r]}' because it was disabled by the client.`),new U0(`'${vt[r]}' is disabled by the client.`,r)}_isITransport(e){return e&&typeof e=="object"&&"connect"in e}_stopConnection(e){if(this._logger.log(X.Debug,`HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`),this.transport=void 0,e=this._stopError||e,this._stopError=void 0,this._connectionState==="Disconnected"){this._logger.log(X.Debug,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);return}if(this._connectionState==="Connecting")throw this._logger.log(X.Warning,`Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`),new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);if(this._connectionState==="Disconnecting"&&this._stopPromiseResolver(),e?this._logger.log(X.Error,`Connection disconnected with error '${e}'.`):this._logger.log(X.Information,"Connection disconnected."),this._sendQueue&&(this._sendQueue.stop().catch(t=>{this._logger.log(X.Error,`TransportSendQueue.stop() threw error '${t}'.`)}),this._sendQueue=void 0),this.connectionId=void 0,this._connectionState="Disconnected",this._connectionStarted){this._connectionStarted=!1;try{this.onclose&&this.onclose(e)}catch(t){this._logger.log(X.Error,`HttpConnection.onclose(${e}) threw error '${t}'.`)}}}_resolveUrl(e){if(e.lastIndexOf("https://",0)===0||e.lastIndexOf("http://",0)===0)return e;if(!dt.isBrowser)throw new Error(`Cannot resolve '${e}'.`);const t=window.document.createElement("a");return t.href=e,this._logger.log(X.Information,`Normalizing '${e}' to '${t.href}'.`),t.href}_resolveNegotiateUrl(e){const t=new URL(e);t.pathname.endsWith("/")?t.pathname+="negotiate":t.pathname+="/negotiate";const n=new URLSearchParams(t.searchParams);return n.has("negotiateVersion")||n.append("negotiateVersion",this._negotiateVersion.toString()),n.has("useStatefulReconnect")?n.get("useStatefulReconnect")==="true"&&(this._options._useStatefulReconnect=!0):this._options._useStatefulReconnect===!0&&n.append("useStatefulReconnect","true"),t.search=n.toString(),t.toString()}}function c_(s,e){return!s||(e&s)!==0}class Ga{constructor(e){this._transport=e,this._buffer=[],this._executing=!0,this._sendBufferedData=new fr,this._transportResult=new fr,this._sendLoopPromise=this._sendLoop()}send(e){return this._bufferData(e),this._transportResult||(this._transportResult=new fr),this._transportResult.promise}stop(){return this._executing=!1,this._sendBufferedData.resolve(),this._sendLoopPromise}_bufferData(e){if(this._buffer.length&&typeof this._buffer[0]!=typeof e)throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);this._buffer.push(e),this._sendBufferedData.resolve()}async _sendLoop(){for(;;){if(await this._sendBufferedData.promise,!this._executing){this._transportResult&&this._transportResult.reject("Connection stopped.");break}this._sendBufferedData=new fr;const e=this._transportResult;this._transportResult=void 0;const t=typeof this._buffer[0]=="string"?this._buffer.join(""):Ga._concatBuffers(this._buffer);this._buffer.length=0;try{await this._transport.send(t),e.resolve()}catch(n){e.reject(n)}}}static _concatBuffers(e){const t=e.map(r=>r.byteLength).reduce((r,o)=>r+o),n=new Uint8Array(t);let i=0;for(const r of e)n.set(new Uint8Array(r),i),i+=r.byteLength;return n.buffer}}class fr{constructor(){this.promise=new Promise((e,t)=>[this._resolver,this._rejecter]=[e,t])}resolve(){this._resolver()}reject(e){this._rejecter(e)}}const l_="json";class h_{constructor(){this.name=l_,this.version=2,this.transferFormat=Pt.Text}parseMessages(e,t){if(typeof e!="string")throw new Error("Invalid input for JSON hub protocol. Expected a string.");if(!e)return[];t===null&&(t=Ms.instance);const n=Ht.parse(e),i=[];for(const r of n){const o=JSON.parse(r);if(typeof o.type!="number")throw new Error("Invalid payload.");switch(o.type){case Ie.Invocation:this._isInvocationMessage(o);break;case Ie.StreamItem:this._isStreamItemMessage(o);break;case Ie.Completion:this._isCompletionMessage(o);break;case Ie.Ping:break;case Ie.Close:break;case Ie.Ack:this._isAckMessage(o);break;case Ie.Sequence:this._isSequenceMessage(o);break;default:t.log(X.Information,"Unknown message type '"+o.type+"' ignored.");continue}i.push(o)}return i}writeMessage(e){return Ht.write(JSON.stringify(e))}_isInvocationMessage(e){this._assertNotEmptyString(e.target,"Invalid payload for Invocation message."),e.invocationId!==void 0&&this._assertNotEmptyString(e.invocationId,"Invalid payload for Invocation message.")}_isStreamItemMessage(e){if(this._assertNotEmptyString(e.invocationId,"Invalid payload for StreamItem message."),e.item===void 0)throw new Error("Invalid payload for StreamItem message.")}_isCompletionMessage(e){if(e.result&&e.error)throw new Error("Invalid payload for Completion message.");!e.result&&e.error&&this._assertNotEmptyString(e.error,"Invalid payload for Completion message."),this._assertNotEmptyString(e.invocationId,"Invalid payload for Completion message.")}_isAckMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Ack message.")}_isSequenceMessage(e){if(typeof e.sequenceId!="number")throw new Error("Invalid SequenceId for Sequence message.")}_assertNotEmptyString(e,t){if(typeof e!="string"||e==="")throw new Error(t)}}const u_={trace:X.Trace,debug:X.Debug,info:X.Information,information:X.Information,warn:X.Warning,warning:X.Warning,error:X.Error,critical:X.Critical,none:X.None};function d_(s){const e=u_[s.toLowerCase()];if(typeof e<"u")return e;throw new Error(`Unknown log level: ${s}`)}class yl{configureLogging(e){if(xt.isRequired(e,"logging"),f_(e))this.logger=e;else if(typeof e=="string"){const t=d_(e);this.logger=new Cr(t)}else this.logger=new Cr(e);return this}withUrl(e,t){return xt.isRequired(e,"url"),xt.isNotEmpty(e,"url"),this.url=e,typeof t=="object"?this.httpConnectionOptions={...this.httpConnectionOptions,...t}:this.httpConnectionOptions={...this.httpConnectionOptions,transport:t},this}withHubProtocol(e){return xt.isRequired(e,"protocol"),this.protocol=e,this}withAutomaticReconnect(e){if(this.reconnectPolicy)throw new Error("A reconnectPolicy has already been set.");return e?Array.isArray(e)?this.reconnectPolicy=new _l(e):this.reconnectPolicy=e:this.reconnectPolicy=new _l,this}withServerTimeout(e){return xt.isRequired(e,"milliseconds"),this._serverTimeoutInMilliseconds=e,this}withKeepAliveInterval(e){return xt.isRequired(e,"milliseconds"),this._keepAliveIntervalInMilliseconds=e,this}withStatefulReconnect(e){return this.httpConnectionOptions===void 0&&(this.httpConnectionOptions={}),this.httpConnectionOptions._useStatefulReconnect=!0,this._statefulReconnectBufferSize=e==null?void 0:e.bufferSize,this}build(){const e=this.httpConnectionOptions||{};if(e.logger===void 0&&(e.logger=this.logger),!this.url)throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");const t=new a_(this.url,e);return Ha.create(t,this.logger||Ms.instance,this.protocol||new h_,this.reconnectPolicy,this._serverTimeoutInMilliseconds,this._keepAliveIntervalInMilliseconds,this._statefulReconnectBufferSize)}}function f_(s){return s.log!==void 0}class p_{constructor(e,t){C(this,"camera");C(this,"domElement");C(this,"target",new w(0,10,0));C(this,"distance",30);C(this,"phi",Math.PI/4);C(this,"theta",0);C(this,"isDragging",!1);C(this,"lastMouse",{x:0,y:0});C(this,"flySpeed",15);C(this,"moveDirection",new w(0,0,0));this.camera=e,this.domElement=t,this.setupOrbit(),this.setupDpad(),this.updateCamera()}setTarget(e){this.target.copy(e),this.updateCamera()}setTargetFromSL(e,t,n){this.target.set(e,n,t),this.updateCamera()}update(e){if(this.moveDirection.lengthSq()<.001)return;const t=new w(Math.sin(this.theta),0,Math.cos(this.theta)).normalize(),n=new w(Math.cos(this.theta),0,-Math.sin(this.theta)).normalize(),i=new w(0,1,0),r=this.flySpeed*e,o=new w;this.moveDirection.z>0&&o.add(t),this.moveDirection.z<0&&o.sub(t),this.moveDirection.x>0&&o.add(n),this.moveDirection.x<0&&o.sub(n),this.moveDirection.y>0&&o.add(i),this.moveDirection.y<0&&o.sub(i),o.lengthSq()>0&&(o.normalize().multiplyScalar(r),this.target.add(o),this.updateCamera())}startMove(e,t,n){this.moveDirection.set(e,t,n)}stopMove(){this.moveDirection.set(0,0,0)}setZoom(e){this.distance=Math.max(2,Math.min(200,e)),this.updateCamera()}getZoom(){return this.distance}resetView(){this.theta=0,this.phi=Math.PI/4,this.distance=30,this.updateCamera()}updateCamera(){const e=this.target.x+this.distance*Math.sin(this.theta)*Math.cos(this.phi),t=this.target.y+this.distance*Math.sin(this.phi),n=this.target.z+this.distance*Math.cos(this.theta)*Math.cos(this.phi);this.camera.position.set(e,t,n),this.camera.lookAt(this.target)}setupOrbit(){this.domElement.addEventListener("mousedown",e=>{e.button===2&&(this.isDragging=!0,this.lastMouse={x:e.clientX,y:e.clientY})}),window.addEventListener("mousemove",e=>{if(!this.isDragging)return;const t=e.clientX-this.lastMouse.x,n=e.clientY-this.lastMouse.y;this.lastMouse={x:e.clientX,y:e.clientY},this.theta-=t*.005,this.phi=Math.max(.1,Math.min(Math.PI/2-.01,this.phi+n*.005)),this.updateCamera()}),window.addEventListener("mouseup",e=>{e.button===2&&(this.isDragging=!1)}),this.domElement.addEventListener("wheel",e=>{this.distance=Math.max(2,Math.min(200,this.distance+e.deltaY*.05)),this.updateCamera()}),this.domElement.addEventListener("contextmenu",e=>e.preventDefault())}setupDpad(){}}const pr=256,m_=.5,g_=[{minHeight:-10,maxHeight:15,roughness:.9,metalness:0},{minHeight:10,maxHeight:40,roughness:.8,metalness:0},{minHeight:35,maxHeight:100,roughness:.7,metalness:.1}];class __{constructor(e,t="",n=""){C(this,"scene");C(this,"patches",new Map);C(this,"layers");C(this,"materials",new Map);C(this,"textureLoader");C(this,"baseUrl");C(this,"authToken");this.scene=e,this.baseUrl=t,this.authToken=n,this.textureLoader=new gh,this.layers=[...g_],this.createDefaultMaterials()}setLayers(e){this.layers=e,this.createDefaultMaterials()}createDefaultMaterials(){this.materials.set(0,new It({color:7048762,roughness:.9,metalness:0,flatShading:!1})),this.materials.set(1,new It({color:8421504,roughness:.8,metalness:.05,flatShading:!1})),this.materials.set(2,new It({color:15790320,roughness:.7,metalness:0,flatShading:!1}))}async loadTerrainTexture(e,t){if(!this.baseUrl)return;const n=await new Promise((r,o)=>{this.textureLoader.load(`${this.baseUrl}/api/textures/${t}`,a=>{a.colorSpace=Rt,a.wrapS=hi,a.wrapT=hi,a.repeat.set(8,8),r(a)},void 0,o)}),i=this.materials.get(e);i&&(i.map=n,i.needsUpdate=!0);for(const[,r]of this.patches)r.material===i&&(r.material.needsUpdate=!0)}updatePatch(e,t,n){const i=`${e},${t}`,r=this.patches.get(i);r&&(this.scene.remove(r),r.geometry.dispose());const o=this.buildGeometry(e,t,n),a=this.createTerrainMaterial(),c=new ke(o,a);c.receiveShadow=!0,this.scene.add(c),this.patches.set(i,c)}createTerrainMaterial(){return new It({vertexColors:!0,roughness:.9,metalness:0,flatShading:!1})}buildGeometry(e,t,n){const r=new Ki(pr,pr,15,15);r.rotateX(-Math.PI/2);const o=r.attributes.position,a=new Float32Array(o.count*3);for(let c=0;c<o.count;c++){const l=c%16,u=Math.floor(c/16)*16+l,d=(n[u]??0)*m_;o.setY(c,d);const m=this.getLayerColor(d);a[c*3]=m.r,a[c*3+1]=m.g,a[c*3+2]=m.b}return r.setAttribute("color",new ut(a,3)),r.computeVertexNormals(),r.translate(e*pr,0,t*pr),r}getLayerColor(e){if(e<10){const t=Math.max(0,(e+10)/20);return{r:.25+t*.15,g:.35+t*.2,b:.15+t*.05}}else if(e<30){const t=(e-10)/20;return{r:.4+t*.15,g:.55+t*.1,b:.2+t*.05}}else if(e<50){const t=(e-30)/20;return{r:.5+t*.15,g:.5+t*.1,b:.48+t*.1}}else{const t=Math.min(1,(e-50)/30);return{r:.7+t*.25,g:.7+t*.25,b:.72+t*.25}}}removePatch(e,t){const n=`${e},${t}`,i=this.patches.get(n);i&&(this.scene.remove(i),i.geometry.dispose(),Array.isArray(i.material)||i.material.dispose(),this.patches.delete(n))}dispose(){for(const[,e]of this.patches)this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)||e.material.dispose();this.patches.clear();for(const[,e]of this.materials)e.map&&e.map.dispose(),e.dispose();this.materials.clear()}}const x_=33,v_=48,y_=49,b_=105,S_=114,E_=117,M_=115,w_=98,T_=100,C_=108,A_=123,R_=91,P_=107,I_=`<? LLSD/Binary ?>
`,Eo=new TextEncoder().encode(I_);class L_{constructor(){C(this,"data");C(this,"bytes");C(this,"offset",0)}async decode(e){const t=e instanceof ArrayBuffer?e:e.buffer;if(this.bytes=new Uint8Array(t),this.data=new DataView(t),this.offset=0,console.log(`[MeshDecoder] Input: ${this.bytes.length} bytes, first 20: ${Array.from(this.bytes.slice(0,20)).map(_=>_.toString(16).padStart(2,"0")).join(" ")}`),this.bytes[0]===31&&this.bytes[1]===139){console.log("[MeshDecoder] GZIP detected, decompressing...");const _=await this.gzipDecompress(this.bytes);this.bytes=_,this.data=new DataView(_.buffer),this.offset=0,console.log(`[MeshDecoder] Decompressed to ${this.bytes.length} bytes`)}this.checkMagicPrefix()||(this.offset=0);const n=this.parseLLSDValue();if(!n||n.type!=="map")return console.warn("[SLMesh] Failed to parse LLSD header"),new et;const i=n.value,r=["high_lod","medium_lod","low_lod","lowest_lod"];let o=null;for(const _ of r){const p=i[_];if(p&&p.type==="map"){o=p.value;break}}if(!o)return console.warn("[SLMesh] No LOD data found in mesh asset"),new et;const a=this.getInt(o,"offset"),c=this.getInt(o,"size");if(a<0||c<=0)return console.warn(`[SLMesh] Invalid LOD block: offset=${a}, size=${c}`),new et;const l=this.offset,h=this.bytes.slice(l+a,l+a+c),u=await this.decompressBlock(h),d=this.bytes,m=this.data,g=this.offset;try{this.bytes=u,this.data=new DataView(u.buffer),this.offset=0,this.checkMagicPrefix()||(this.offset=0);const _=this.parseLLSDValue();if(!_)return console.warn("[SLMesh] Failed to parse decompressed LOD data"),new et;if(_.type!=="array")return console.warn(`[SLMesh] Expected array, got ${_.type}`),new et;const p=_.value,f=[];for(const E of p){if(E.type!=="map")continue;const M=this.decodeSubmesh(E.value);M&&!M.noGeometry&&f.push(this.buildGeometry(M))}return f.length===0?new et:f.length===1?f[0]:this.mergeGeometries(f)}finally{this.bytes=d,this.data=m,this.offset=g}}checkMagicPrefix(){for(let e=0;e<Eo.length;e++)if(this.bytes[this.offset+e]!==Eo[e])return!1;return this.offset+=Eo.length,!0}readBEU32(){const e=this.data.getUint32(this.offset,!1);return this.offset+=4,e}readBEI32(){const e=this.data.getInt32(this.offset,!1);return this.offset+=4,e}readBEF64(){const e=this.data.getFloat64(this.offset,!1);return this.offset+=8,e}readBytes(e){const t=this.bytes.slice(this.offset,this.offset+e);return this.offset+=e,t}parseLLSDValue(){if(this.offset>=this.bytes.length)return null;const e=this.bytes[this.offset];switch(this.offset++,e){case x_:return{type:"undef",value:void 0};case v_:return{type:"boolean",value:!1};case y_:return{type:"boolean",value:!0};case b_:return{type:"integer",value:this.readBEI32()};case S_:return{type:"real",value:this.readBEF64()};case E_:{const t=this.readBytes(16),n=Array.from(t).map(r=>r.toString(16).padStart(2,"0")).join("");return{type:"uuid",value:`${n.slice(0,8)}-${n.slice(8,12)}-${n.slice(12,16)}-${n.slice(16,20)}-${n.slice(20)}`}}case M_:{const t=this.readBEU32(),n=this.readBytes(t);return{type:"string",value:new TextDecoder().decode(n)}}case w_:{const t=this.readBEU32();return{type:"binary",value:this.readBytes(t)}}case T_:return{type:"date",value:this.readBEF64()};case C_:{const t=this.readBEU32(),n=this.readBytes(t);return{type:"uri",value:new TextDecoder().decode(n)}}case A_:{const t=this.readBEU32(),n={};for(let i=0;i<t;i++){const r=this.bytes[this.offset];if(this.offset++,r!==P_){console.warn(`[SLMesh] Expected key tag 'k', got 0x${r.toString(16)}`);continue}const o=this.readBEU32(),a=this.readBytes(o),c=new TextDecoder().decode(a),l=this.parseLLSDValue();l&&(n[c]=l)}return this.offset++,{type:"map",value:n}}case R_:{const t=this.readBEU32(),n=[];for(let i=0;i<t;i++){const r=this.parseLLSDValue();r&&n.push(r)}return this.offset++,{type:"array",value:n}}default:return console.warn(`[SLMesh] Unknown LLSD tag: 0x${e.toString(16)} at offset ${this.offset-1}`),null}}decodeSubmesh(e){const t=e.NoGeometry;if(t&&t.type==="boolean"&&t.value===!0)return{positions:new Float32Array(0),normals:null,uvs:null,indices:new Uint32Array(0),noGeometry:!0};const n=e.Position;if(!n||n.type!=="binary")return null;const i=n.value,r=this.extractVector3Domain(e,"PositionDomain",-.5,.5),o=i.length/6,a=new Float32Array(o*3);for(let p=0;p<o;p++){const f=p*6,E=this.readUInt16LE(i,f),M=this.readUInt16LE(i,f+2),v=this.readUInt16LE(i,f+4);a[p*3]=this.dequantize(E,r.min.x,r.max.x),a[p*3+1]=this.dequantize(v,r.min.z,r.max.z),a[p*3+2]=this.dequantize(M,r.min.y,r.max.y)}let c=null;const l=e.Normal;if(l&&l.type==="binary"){const p=l.value,f=p.length/6;c=new Float32Array(f*3);for(let E=0;E<f;E++){const M=E*6,v=this.readUInt16LE(p,M),D=this.readUInt16LE(p,M+2),A=this.readUInt16LE(p,M+4),R=this.dequantize(v,-1,1),I=this.dequantize(D,-1,1),S=this.dequantize(A,-1,1),b=Math.sqrt(R*R+I*I+S*S)||1;c[E*3]=R/b,c[E*3+1]=S/b,c[E*3+2]=I/b}}let h=null;const u=e.TexCoord0;if(u&&u.type==="binary"){const p=u.value,f=p.length/4;h=new Float32Array(f*2);const E=this.extractVector2Domain(e,"TexCoord0Domain",-1,1);for(let M=0;M<f;M++){const v=M*4,D=this.readUInt16LE(p,v),A=this.readUInt16LE(p,v+2);h[M*2]=this.dequantize(D,E.min.x,E.max.x),h[M*2+1]=this.dequantize(A,E.min.y,E.max.y)}}const d=e.TriangleList;if(!d||d.type!=="binary")return null;const m=d.value,g=m.length/6,_=new Uint32Array(g*3);for(let p=0;p<g;p++){const f=p*6;_[p*3]=this.readUInt16LE(m,f),_[p*3+1]=this.readUInt16LE(m,f+2),_[p*3+2]=this.readUInt16LE(m,f+4)}return{positions:a,normals:c,uvs:h,indices:_,noGeometry:!1}}buildGeometry(e){const t=new et;return t.setAttribute("position",new ut(e.positions,3)),e.normals&&t.setAttribute("normal",new ut(e.normals,3)),e.uvs&&t.setAttribute("uv",new ut(e.uvs,2)),t.setIndex(new ut(e.indices,1)),e.normals||t.computeVertexNormals(),t}mergeGeometries(e){if(e.length===0)return new et;if(e.length===1)return e[0];let t=0,n=0;for(const u of e)t+=u.attributes.position.count,n+=u.index?u.index.count:u.attributes.position.count;const i=new Float32Array(t*3),r=new Float32Array(t*3),o=new Float32Array(t*2),a=new Uint32Array(n);let c=0,l=0;for(const u of e){const d=u.attributes.position,m=u.attributes.normal,g=u.attributes.uv,_=u.index;for(let p=0;p<d.count;p++)i[(c+p)*3]=d.getX(p),i[(c+p)*3+1]=d.getY(p),i[(c+p)*3+2]=d.getZ(p),m&&(r[(c+p)*3]=m.getX(p),r[(c+p)*3+1]=m.getY(p),r[(c+p)*3+2]=m.getZ(p)),g&&(o[(c+p)*2]=g.getX(p),o[(c+p)*2+1]=g.getY(p));if(_){for(let p=0;p<_.count;p++)a[l+p]=_.getX(p)+c;l+=_.count}else{for(let p=0;p<d.count;p++)a[l+p]=p+c;l+=d.count}c+=d.count}const h=new et;return h.setAttribute("position",new ut(i,3)),h.setAttribute("normal",new ut(r,3)),h.setAttribute("uv",new ut(o,2)),h.setIndex(new ut(a,1)),h}readUInt16LE(e,t){return e[t]|e[t+1]<<8}dequantize(e,t,n){return t+e/65535*(n-t)}getInt(e,t){const n=e[t];return n?n.type==="integer"?n.value:n.type==="real"?Math.floor(n.value):0:0}extractVector3Domain(e,t,n,i){const r=e[t];if(!r||r.type!=="map")return{min:new w(n,n,n),max:new w(i,i,i)};const o=r.value;return{min:this.extractVec3(o,"Min",n),max:this.extractVec3(o,"Max",i)}}extractVector2Domain(e,t,n,i){const r=e[t];if(!r||r.type!=="map")return{min:new oe(n,n),max:new oe(i,i)};const o=r.value;return{min:this.extractVec2(o,"Min",n),max:this.extractVec2(o,"Max",i)}}extractVec3(e,t,n){var r,o,a;const i=e[t];if(i&&i.type==="array"){const c=i.value;return new w(((r=c[0])==null?void 0:r.value)??n,((o=c[1])==null?void 0:o.value)??n,((a=c[2])==null?void 0:a.value)??n)}return new w(n,n,n)}extractVec2(e,t,n){var r,o;const i=e[t];if(i&&i.type==="array"){const a=i.value;return new oe(((r=a[0])==null?void 0:r.value)??n,((o=a[1])==null?void 0:o.value)??n)}return new oe(n,n)}async decompressBlock(e){if(e[0]===31&&e[1]===139)return this.gzipDecompress(e);if(e[0]===120)return this.zlibDecompress(e);try{return await this.inflateRaw(e)}catch{return e}}async gzipDecompress(e){const t=new DecompressionStream("gzip"),n=t.writable.getWriter();n.write(e.buffer),n.close();const i=t.readable.getReader(),r=[];let o=0;for(;;){const{done:l,value:h}=await i.read();if(l)break;r.push(h),o+=h.length}const a=new Uint8Array(o);let c=0;for(const l of r)a.set(l,c),c+=l.length;return a}async zlibDecompress(e){const t=new DecompressionStream("deflate"),n=t.writable.getWriter();n.write(e.buffer),n.close();const i=t.readable.getReader(),r=[];let o=0;for(;;){const{done:l,value:h}=await i.read();if(l)break;r.push(h),o+=h.length}const a=new Uint8Array(o);let c=0;for(const l of r)a.set(l,c),c+=l.length;return a}async inflateRaw(e){const t=new DecompressionStream("deflate-raw"),n=t.writable.getWriter();n.write(e.buffer),n.close();const i=t.readable.getReader(),r=[];let o=0;for(;;){const{done:l,value:h}=await i.read();if(l)break;r.push(h),o+=h.length}const a=new Uint8Array(o);let c=0;for(const l of r)a.set(l,c),c+=l.length;return a}}const D_=new It({color:13421772,roughness:.7,metalness:.1});class U_{constructor(e,t){C(this,"scene");C(this,"objects",new Map);C(this,"pendingMeshes",new Map);C(this,"materialLoader");C(this,"meshDecoder",new L_);this.scene=e,this.materialLoader=t}async updatePrim(e,t){var c,l,h,u,d,m,g,_,p,f,E,M;const n=this.objects.get(e.id);if(t){const v=e.position.x-t.x,D=e.position.y-t.z;if(v*v+D*D>256*256){n&&(n.visible=!1);return}else n&&(n.visible=!0)}if(n){n.position.set(e.position.x,e.position.z,e.position.y),n.quaternion.set(e.rotation.x,e.rotation.z,e.rotation.y,e.rotation.w),n.scale.set(e.scale.x,e.scale.z,e.scale.y);return}const i=this.createGeometry(e),r=new ke(i,D_.clone());r.castShadow=!0,r.receiveShadow=!0;const o=new qt;if(o.add(r),o.position.set(e.position.x,e.position.z,e.position.y),o.quaternion.set(e.rotation.x,e.rotation.z,e.rotation.y,e.rotation.w),o.scale.set(e.scale.x,e.scale.z,e.scale.y),o.userData.primId=e.id,o.userData.primName=e.name,this.scene.add(o),this.objects.set(e.id,o),this.pendingMeshes.has(e.id)){const v=this.pendingMeshes.get(e.id);this.pendingMeshes.delete(e.id),this.replaceMeshGeometry(e.id,v)}const a=e.textureId||((l=(c=e.faces)==null?void 0:c[0])==null?void 0:l.TextureId);if(a&&a!=="00000000-0000-0000-0000-000000000000"){const v={textureId:a,repeatU:((u=(h=e.faces)==null?void 0:h[0])==null?void 0:u.RepeatU)??1,repeatV:((m=(d=e.faces)==null?void 0:d[0])==null?void 0:m.RepeatV)??1,offsetU:((_=(g=e.faces)==null?void 0:g[0])==null?void 0:_.OffsetU)??0,offsetV:((f=(p=e.faces)==null?void 0:p[0])==null?void 0:f.OffsetV)??0,rotation:((M=(E=e.faces)==null?void 0:E[0])==null?void 0:M.Rotation)??0};this.materialLoader.loadFromFace(v).then(D=>{r.material=D}).catch(()=>{})}}createGeometry(e){switch(e.primType){case 1:return new un(1,1,1);case 2:return new Ds(.5,.5,1,24);case 3:return new Oa(.5,1,3);case 4:return new Cn(.5,24,16);case 5:return new vs(.35,.12,16,32);case 6:return new vs(.35,.12,8,24);case 7:return new vs(.35,.05,8,32);case 8:return new Cn(.5,16,16);case 9:return new un(1,1,1);default:return new un(1,1,1)}}async replaceMeshGeometry(e,t){var i,r;const n=this.objects.get(e);if(!n){this.pendingMeshes.set(e,t);return}console.log(`[ObjectRenderer] Replacing mesh for ${e}, ${t.byteLength} bytes`);try{const o=await this.meshDecoder.decode(t);if(console.log(`[ObjectRenderer] Decoded geometry: ${((i=o.attributes.position)==null?void 0:i.count)??0} vertices`),((r=o.attributes.position)==null?void 0:r.count)===0){console.warn(`[ObjectRenderer] Empty geometry for ${e}`);return}o.computeBoundingBox(),o.computeBoundingSphere();let a=!1;n.traverse(c=>{c instanceof ke&&(c.geometry.dispose(),c.geometry=o,a=!0)}),console.log(`[ObjectRenderer] Mesh replaced for ${e}: ${a}`)}catch(o){console.error("[ObjectRenderer] Mesh decode failed:",o)}}disposeObject(e){e.traverse(t=>{t instanceof ke&&(t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material.dispose())})}getPrim(e){return this.objects.get(e)}removePrim(e){const t=this.objects.get(e);t&&(this.scene.remove(t),this.disposeObject(t),this.objects.delete(e))}clear(){for(const[,e]of this.objects)this.scene.remove(e),this.disposeObject(e);this.objects.clear()}}class N_{constructor(e,t,n){C(this,"scene");C(this,"avatars",new Map);C(this,"textureCache",new Map);C(this,"animationSystem");C(this,"attachmentRenderer");this.scene=e,this.animationSystem=t,this.attachmentRenderer=n}async updateAvatar(e){let t=this.avatars.get(e.id);t||(t=await this.createAvatar(e),this.scene.add(t),this.avatars.set(e.id,t),this.animationSystem.registerAvatar(e.id,t),this.attachmentRenderer.registerAvatar(e.id,t)),t.position.set(e.position.x,e.position.z,e.position.y),t.quaternion.set(e.rotation.x,e.rotation.z,e.rotation.y,e.rotation.w),e.bakedTextures&&Object.keys(e.bakedTextures).length>0&&await this.applyBakedTextures(t,e.bakedTextures)}async createAvatar(e){const t=new qt;t.name=e.name;const n=new It({color:3368618,roughness:.6}),i=new It({color:14531481,roughness:.5}),r=new xs(.18,.45,8,16),o=new ke(r,n.clone());o.position.y=1.05,o.castShadow=!0,o.name="upper",t.add(o);const a=new Cn(.14,16,16),c=new ke(a,i.clone());c.position.y=1.55,c.castShadow=!0,c.name="head",t.add(c);const l=new Cn(.025,8,8),h=new It({color:2236962}),u=new ke(l,h);u.position.set(.05,1.57,-.12),t.add(u);const d=new ke(l,h);d.position.set(-.05,1.57,-.12),t.add(d);const m=new xs(.05,.35,4,8),g=n.clone(),_=new ke(m,g);_.position.set(.28,1.15,0),_.rotation.z=-.3,t.add(_);const p=new ke(m,g.clone());p.position.set(-.28,1.15,0),p.rotation.z=.3,t.add(p);const f=new xs(.06,.4,4,8),E=new It({color:2236996,roughness:.7}),M=new ke(f,E);M.position.set(.08,.55,0),t.add(M);const v=new ke(f,E.clone());v.position.set(-.08,.55,0),t.add(v);const D=new Cn(.15,12,8,0,Math.PI*2,0,Math.PI*.6),A=new It({color:5583650,roughness:.8}),R=new ke(D,A);R.position.y=1.62,R.name="hair",t.add(R);const I=document.createElement("canvas");I.width=256,I.height=64;const S=I.getContext("2d");S.fillStyle="rgba(0,0,0,0.6)",S.roundRect(0,0,256,64,8),S.fill(),S.font="bold 26px sans-serif",S.fillStyle="#ffffff",S.textAlign="center",S.fillText(e.name,128,42);const b=new ah({map:new uh(I),transparent:!0}),P=new a0(b);return P.position.y=1.9,P.scale.set(1.8,.45,1),t.add(P),e.bakedTextures&&await this.applyBakedTextures(t,e.bakedTextures),t}async applyBakedTextures(e,t){for(const[n,i]of Object.entries(t)){if(!i||i==="00000000-0000-0000-0000-000000000000")continue;const r=await this.fetchTexture(i);r&&(e.traverse(o=>{o instanceof ke&&o.name===n&&(o.material.map=r,o.material.needsUpdate=!0)}),["head","upper","lower"].includes(n)&&e.traverse(o=>{o instanceof ke&&o.name===n&&(o.material.map=r,o.material.needsUpdate=!0)}))}}async fetchTexture(e){if(this.textureCache.has(e))return this.textureCache.get(e);try{const t=await fetch(`/api/textures/${e}`);if(!t.ok)return null;const n=await t.blob(),i=URL.createObjectURL(n),r=await new Promise((a,c)=>{const l=new Image;l.onload=()=>a(l),l.onerror=()=>c(new Error("Image load failed")),l.src=i}),o=new yt(r);return o.colorSpace=Rt,o.needsUpdate=!0,URL.revokeObjectURL(i),this.textureCache.set(e,o),o}catch{return null}}removeAvatar(e){const t=this.avatars.get(e);t&&(this.scene.remove(t),t.traverse(n=>{n instanceof ke&&(n.geometry.dispose(),Array.isArray(n.material)?n.material.forEach(i=>i.dispose()):n.material.dispose())}),this.avatars.delete(e))}}const ls=new Map,Mo=new Set;class F_{constructor(e,t){C(this,"textureLoader",new gh);this.baseUrl=e,this.authToken=t}async loadFromFace(e){var r;if(!e.textureId||e.textureId==="00000000-0000-0000-0000-000000000000")return new It({color:13421772,roughness:.7,metalness:.1});const t=e.textureId;if(Mo.has(t))return new It({color:13421772,roughness:.7,metalness:.1});const n=ls.get(t);if(n instanceof It){const o=n.clone();return(e.repeatU!==1||e.repeatV!==1)&&(o.map=((r=o.map)==null?void 0:r.clone())??null,o.map&&(o.map.repeat.set(e.repeatU,e.repeatV),o.map.offset.set(e.offsetU,e.offsetV),o.map.rotation=e.rotation,o.map.needsUpdate=!0)),o}const i=new It({roughness:.7,metalness:.1});try{const o=await this.loadTexture(e.textureId);i.map=o,i.needsUpdate=!0}catch{Mo.add(t)}return ls.set(t,i),i}async loadTexture(e){const t=ls.get(`tex:${e}`);if(t instanceof yt)return t;if(!e||e==="00000000-0000-0000-0000-000000000000")throw new Error("Zero UUID");try{const n=await fetch(`${this.baseUrl}/api/textures/${e}`);if(n.status===304){const r=await n.blob();return this.blobToTexture(r,e)}if(!n.ok)throw Mo.add(e),new Error(`Texture ${e}: ${n.status}`);const i=await n.blob();return this.blobToTexture(i,e)}catch(n){throw console.warn(`[Material] Texture ${e} failed:`,n),n}}blobToTexture(e,t){return new Promise((n,i)=>{const r=URL.createObjectURL(e),o=new Image;o.onload=()=>{const a=new yt(o);a.colorSpace=Rt,a.wrapS=hi,a.wrapT=hi,a.needsUpdate=!0,ls.set(`tex:${t}`,a),URL.revokeObjectURL(r),n(a)},o.onerror=()=>{URL.revokeObjectURL(r),i(new Error(`Failed to decode image ${t}`))},o.src=r})}dispose(){for(const[,e]of ls)e instanceof In&&e.dispose()}}class O_{constructor(e,t){C(this,"ctx",null);C(this,"masterGain",null);C(this,"listenerPos",{x:0,y:0,z:0});C(this,"bufferCache",new Map);C(this,"sources",new Map);C(this,"ambientSource",null);C(this,"footstepBuffer",null);C(this,"footstepCooldown",0);C(this,"isMoving",!1);C(this,"baseUrl");C(this,"authToken");this.baseUrl=e,this.authToken=t}ensureContext(){return this.ctx||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.connect(this.ctx.destination)),this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}updateListener(e,t,n){this.listenerPos={x:e,y:t,z:n};const i=this.ctx;if(!i)return;const r=i.listener;"positionX"in r?(r.positionX.setValueAtTime(e,i.currentTime),r.positionY.setValueAtTime(t,i.currentTime),r.positionZ.setValueAtTime(n,i.currentTime)):r.setPosition(e,t,n)}async fetchBuffer(e){const t=this.bufferCache.get(e);if(t)return t;const n=this.ensureContext(),i=`${this.baseUrl}/api/assets/${e}`,r=await fetch(i,{headers:{Authorization:`Bearer ${this.authToken}`}});if(!r.ok)throw new Error(`Failed to fetch sound asset ${e}: ${r.status}`);const o=await r.arrayBuffer(),a=await n.decodeAudioData(o);return this.bufferCache.set(e,a),a}async playSound(e,t,n,i,r){this.stopSoundInternal(e);const o=await this.fetchBuffer(e),a=this.ensureContext(),c=a.createBufferSource();c.buffer=o,c.loop=i;const l=a.createPanner();l.panningModel="HRTF",l.distanceModel="inverse",l.refDistance=1,l.maxDistance=100,l.rolloffFactor=1,l.coneInnerAngle=360,l.coneOuterAngle=360,l.coneOuterGain=0,"positionX"in l?(l.positionX.setValueAtTime(t.x,a.currentTime),l.positionY.setValueAtTime(t.y,a.currentTime),l.positionZ.setValueAtTime(t.z,a.currentTime)):l.setPosition(t.x,t.y,t.z);const h=a.createGain();h.gain.setValueAtTime(Math.max(0,n),a.currentTime),c.connect(l),l.connect(h),h.connect(this.masterGain),c.onended=()=>{const d=this.sources.get(e);d&&!d.playing||(d==null?void 0:d.source)===c&&this.sources.delete(e)};const u={id:e,buffer:o,source:c,panner:l,gain:h,loop:i,playing:!0,trackedObjectId:r};this.sources.set(e,u),c.start(0)}updateSoundPosition(e,t){const n=this.ctx;if(n)for(const[,i]of this.sources)i.trackedObjectId===e&&("positionX"in i.panner?(i.panner.positionX.setValueAtTime(t.x,n.currentTime),i.panner.positionY.setValueAtTime(t.y,n.currentTime),i.panner.positionZ.setValueAtTime(t.z,n.currentTime)):i.panner.setPosition(t.x,t.y,t.z))}async playAmbient(e,t=.3){this.stopAmbient();const n=await this.fetchBuffer(e),i=this.ensureContext(),r=i.createBufferSource();r.buffer=n,r.loop=!0;const o=i.createGain();o.gain.setValueAtTime(Math.max(0,t),i.currentTime),r.connect(o),o.connect(this.masterGain),this.ambientSource={id:"ambient",buffer:n,source:r,panner:null,gain:o,loop:!0,playing:!0},r.start(0)}stopAmbient(){if(this.ambientSource){try{this.ambientSource.source.stop()}catch{}try{this.ambientSource.source.disconnect(),this.ambientSource.gain.disconnect()}catch{}this.ambientSource=null}}async playFootstep(e=.15){const t=Date.now();if(t-this.footstepCooldown<300||(this.footstepCooldown=t,this.footstepBuffer||this.generateFootstepBuffer(),!this.footstepBuffer))return;const n=this.ensureContext(),i=n.createBufferSource();i.buffer=this.footstepBuffer;const r=n.createGain();r.gain.setValueAtTime(e,n.currentTime),i.connect(r),r.connect(this.masterGain),i.start(0)}setMoving(e){this.isMoving=e}updateFootsteps(e){this.isMoving&&(this.footstepCooldown-=e*1e3)}generateFootstepBuffer(){const e=this.ensureContext(),t=e.sampleRate,i=t*.1,r=e.createBuffer(1,i,t),o=r.getChannelData(0);for(let a=0;a<i;a++){const c=a/t,l=Math.exp(-c*30),h=(Math.random()*2-1)*.3,u=Math.sin(c*200*Math.PI)*.7;o[a]=(h+u)*l}this.footstepBuffer=r}stopSound(e){this.stopSoundInternal(e)}stopSoundInternal(e){const t=this.sources.get(e);if(t){try{t.source.stop()}catch{}t.playing=!1;try{t.source.disconnect(),t.panner&&t.panner.disconnect(),t.gain.disconnect()}catch{}this.sources.delete(e)}}setVolume(e,t){const n=this.sources.get(e);!n||!this.ctx||n.gain.gain.setValueAtTime(Math.max(0,t),this.ctx.currentTime)}setMasterVolume(e){this.masterGain&&this.ctx&&this.masterGain.gain.setValueAtTime(Math.max(0,e),this.ctx.currentTime)}stopAll(){for(const[e]of this.sources)this.stopSoundInternal(e);this.stopAmbient()}dispose(){this.stopAll(),this.bufferCache.clear(),this.footstepBuffer=null,this.ctx&&this.ctx.state!=="closed"&&this.ctx.close(),this.ctx=null,this.masterGain=null}}const hs=200;class k_{constructor(e){C(this,"scene");C(this,"systems",new Map);this.scene=e}updateSystem(e,t){const n=this.systems.get(e.objectId);if(e.burstSphereRate<=0&&e.maxAge<=0){n&&this.removeSystem(e.objectId);return}n?(n.data=e,t&&n.points.position.copy(t)):this.createSystem(e,t)}update(e){for(const[t,n]of this.systems){if(n.data.burstSphereRate>0)for(n.emitAccumulator+=e*n.data.burstSphereRate;n.emitAccumulator>=1&&n.particles.length<hs;)this.emitParticle(n),n.emitAccumulator-=1;const i=[];for(let r=0;r<n.particles.length;r++){const o=n.particles[r];if(o.age+=e,o.age>=o.maxAge){i.push(r);continue}const a=new w(n.data.finalAcceleration-n.data.initialAcceleration,9.8,n.data.finalAcceleration-n.data.initialAcceleration);o.velocity.add(a.multiplyScalar(e)),o.position.add(o.velocity.clone().multiplyScalar(e));const c=o.age/o.maxAge;o.size=Vn.lerp(n.data.initialSize,n.data.finalSize,c),o.alpha=Vn.lerp(n.data.startColor.a,n.data.endColor.a,c)}for(let r=i.length-1;r>=0;r--)n.particles.splice(i[r],1);this.updateBuffers(n)}}removeSystem(e){const t=this.systems.get(e);t&&(this.scene.remove(t.points),t.geometry.dispose(),t.material.dispose(),this.systems.delete(e))}clear(){for(const[e]of this.systems)this.removeSystem(e)}createSystem(e,t){const n=new et,i=new Float32Array(hs*3),r=new Float32Array(hs),o=new Float32Array(hs);n.setAttribute("position",new ut(i,3)),n.setAttribute("size",new ut(r,1)),n.setAttribute("alpha",new ut(o,1));const a=this.createMaterial(e),c=new c0(n,a);c.frustumCulled=!1,c.position.copy(t||new w),this.scene.add(c),this.systems.set(e.objectId,{data:e,particles:[],points:c,geometry:n,material:a,emitAccumulator:0})}createMaterial(e){const t=new se(e.startColor.r,e.startColor.g,e.startColor.b),n=document.createElement("canvas");n.width=32,n.height=32;const i=n.getContext("2d"),r=i.createRadialGradient(16,16,0,16,16,16);switch(e.pattern){case 3:r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.2,"rgba(255,200,100,0.8)"),r.addColorStop(1,"rgba(255,100,0,0)");break;case 2:r.addColorStop(0,"rgba(255,255,200,1)"),r.addColorStop(.3,"rgba(255,120,0,0.8)"),r.addColorStop(1,"rgba(200,0,0,0)");break;case 1:r.addColorStop(0,"rgba(180,180,180,0.6)"),r.addColorStop(.5,"rgba(120,120,120,0.3)"),r.addColorStop(1,"rgba(80,80,80,0)");break;case 4:r.addColorStop(0,"rgba(255,255,255,0.9)"),r.addColorStop(.3,"rgba(200,200,255,0.5)"),r.addColorStop(1,"rgba(100,100,255,0)");break;case 5:r.addColorStop(0,"rgba(255,255,255,0)"),r.addColorStop(.7,"rgba(255,255,255,0.3)"),r.addColorStop(.9,"rgba(255,255,255,0.8)"),r.addColorStop(1,"rgba(255,255,255,0)");break;default:r.addColorStop(0,"rgba(255,255,255,0.5)"),r.addColorStop(.5,"rgba(200,200,220,0.3)"),r.addColorStop(1,"rgba(150,150,170,0)");break}i.fillStyle=r,i.fillRect(0,0,32,32);const o=new uh(n);return new hh({color:t,size:e.initialSize,map:o,transparent:!0,depthWrite:!1,blending:wo,sizeAttenuation:!0})}emitParticle(e){const t=e.data,n=new w,i=t.burstSphereRadius;n.set((Math.random()-.5)*i,(Math.random()-.5)*i,(Math.random()-.5)*i);const r=new w,o=t.initialSpeed;switch(t.pattern){case 3:r.set((Math.random()-.5)*o*2,Math.random()*o*3,(Math.random()-.5)*o*2);break;case 2:r.set((Math.random()-.5)*o,Math.random()*o*2,(Math.random()-.5)*o);break;case 5:r.copy(n).normalize().multiplyScalar(o);break;default:r.set((Math.random()-.5)*o*.5,Math.random()*o,(Math.random()-.5)*o*.5);break}const a=t.maxAge+(Math.random()-.5)*t.lifetimeVariance;e.particles.push({position:n,velocity:r,age:0,maxAge:Math.max(.1,a),size:t.initialSize,alpha:t.startColor.a})}updateBuffers(e){var a,c;const t=e.geometry.getAttribute("position"),n=e.geometry.getAttribute("size"),i=e.geometry.getAttribute("alpha"),r=e.particles.length;for(let l=0;l<hs;l++)if(l<r){const h=e.particles[l];t.setXYZ(l,h.position.x,h.position.y,h.position.z),n.setX(l,h.size),i.setX(l,h.alpha)}else t.setXYZ(l,0,-99999,0),n.setX(l,0),i.setX(l,0);t.needsUpdate=!0,n.needsUpdate=!0,i.needsUpdate=!0,e.geometry.setDrawRange(0,r);const o=Math.min(1,((a=e.particles[0])==null?void 0:a.age)/((c=e.particles[0])==null?void 0:c.maxAge)||0);e.material.color.setRGB(Vn.lerp(e.data.startColor.r,e.data.endColor.r,o),Vn.lerp(e.data.startColor.g,e.data.endColor.g,o),Vn.lerp(e.data.startColor.b,e.data.endColor.b,o))}}class B_{constructor(e){C(this,"scene");C(this,"bodies",new Map);C(this,"windTime",0);this.scene=e}addFlexible(e,t,n){const i=this.bodies.get(e.objectId);if(i){i.data=e;return}const r=Math.max(2,Math.min(e.segmentCount||8,24)),a=n.geometry.getAttribute("position"),c=a.count,l=new Float32Array(c*3),h=new Float32Array(c*3);for(let u=0;u<c;u++)l[u*3]=a.getX(u),l[u*3+1]=a.getY(u),l[u*3+2]=a.getZ(u);this.bodies.set(e.objectId,{data:e,group:t,mesh:n,originalPositions:l,velocities:h,segmentCount:r,timeAccumulator:0})}update(e){this.windTime+=e;for(const[,t]of this.bodies){if(t.timeAccumulator+=e,t.timeAccumulator<.016)continue;const n=t.timeAccumulator;t.timeAccumulator=0;const{data:i,mesh:r,originalPositions:o,velocities:a}=t,c=r.geometry,l=c.getAttribute("position"),h=l.count,u=1-i.softness/255,d=new w(Math.sin(this.windTime*.5)*i.wind*.3,0,Math.cos(this.windTime*.7)*i.wind*.2),m=new w(i.forceX+d.x,-i.gravity+d.y,i.forceZ+d.z);for(let g=0;g<h;g++){const _=g*3,p=l.getX(g),f=l.getY(g),E=l.getZ(g),M=o[_],v=o[_+1],D=o[_+2],A=M-p,R=v-f,I=D-E,S=A*i.tension*u,b=R*i.tension*u,P=I*i.tension*u,H=(m.x+S)*n,B=(m.y+b)*n,$=(m.z+P)*n;a[_]=(a[_]+H)*(1-i.drag*.1),a[_+1]=(a[_+1]+B)*(1-i.drag*.1),a[_+2]=(a[_+2]+$)*(1-i.drag*.1),l.setXYZ(g,p+a[_]*n,f+a[_+1]*n,E+a[_+2]*n)}l.needsUpdate=!0,c.computeVertexNormals()}}removeFlexible(e){this.bodies.delete(e)}clear(){this.bodies.clear()}}const z_={"80b6b4bd-4796-4c05-a425-5cd20e665141":"STAND","6b61c8e8-4747-0d75-12d7-e49ff207a4ca":"AFRAID","5747a48e-073e-c331-f6f3-7c2149613d3e":"ANGRY","fd037134-85d4-f241-72c6-4f42164fedee":"AWAY","c4ca6188-9127-4f31-0158-23c4e2f93304":"BACKFLIP","82e99230-c906-1403-4d9c-3889dd98daba":"BOW","9b0c1c4e-8ac7-7969-1494-28c874c4f668":"CLAP","9ba1c942-08be-e43a-fb29-16ad440efc50":"COURTBOW","201f3fdf-cb1f-dbec-201f-7333e328ae7c":"CROUCH","47f5f6fb-22e5-ae44-f871-73aaaf4a6022":"CROUCHWALK","92624d3e-1068-f1aa-a5ec-8244585193ed":"CRY","db84829b-462c-ee83-1e27-9bbee66bd624":"BLOW_KISS","18b3a4b5-b463-bd48-e4b6-71eaac76c515":"BELLY_LAUGH","efcf670c-2d18-8128-973a-034ebc806b67":"BUSY","b906c4ba-703b-1940-32a3-0c7f7d791510":"BORED","349a3801-54f9-bf2c-3bd0-1ac89772af01":"BRUSH","3c09b488-b004-0ea5-a704-07e0159f3261":"WALK","2446cb30-43b5-443c-b05e-09aea530128e":"WALK","9f54d3be-81f4-4e40-a25a-890ab179487f":"FLY","58dc6e64-44f0-4a3a-b0bf-e05e9a84a63c":"FLY","1c7e3004-be1e-3a03-0430-d368413c542e":"SIT","b5a0da24-42b3-4980-8165-c8e016c6312f":"SIT","35a1806c-e783-4713-b6b5-d89ea9469f32":"HOVER","c5e8ac3e-4894-4830-8f3c-a4b16cf9bc99":"HOVER_FLY","3eabae79-c516-23c3-ffff-000000000000":"TYPE"},V_={WALK:{duration:.8,keyframes:{legL:[{time:0,rotX:.4,rotY:0,rotZ:0},{time:.4,rotX:-.4,rotY:0,rotZ:0},{time:.8,rotX:.4,rotY:0,rotZ:0}],legR:[{time:0,rotX:-.4,rotY:0,rotZ:0},{time:.4,rotX:.4,rotY:0,rotZ:0},{time:.8,rotX:-.4,rotY:0,rotZ:0}],armL:[{time:0,rotX:-.3,rotY:0,rotZ:0},{time:.4,rotX:.3,rotY:0,rotZ:0},{time:.8,rotX:-.3,rotY:0,rotZ:0}],armR:[{time:0,rotX:.3,rotY:0,rotZ:0},{time:.4,rotX:-.3,rotY:0,rotZ:0},{time:.8,rotX:.3,rotY:0,rotZ:0}]}},FLY:{duration:1.2,keyframes:{armL:[{time:0,rotX:-.8,rotY:0,rotZ:-.5},{time:.6,rotX:-.5,rotY:0,rotZ:-.8},{time:1.2,rotX:-.8,rotY:0,rotZ:-.5}],armR:[{time:0,rotX:-.8,rotY:0,rotZ:.5},{time:.6,rotX:-.5,rotY:0,rotZ:.8},{time:1.2,rotX:-.8,rotY:0,rotZ:.5}]}},SIT:{duration:0,keyframes:{legL:[{time:0,rotX:-1.2,rotY:0,rotZ:0}],legR:[{time:0,rotX:-1.2,rotY:0,rotZ:0}]}},IDLE:{duration:2,keyframes:{torso:[{time:0,rotX:0,rotY:0,rotZ:0},{time:1,rotX:.02,rotY:0,rotZ:.01},{time:2,rotX:0,rotY:0,rotZ:0}]}}};class H_{constructor(e){C(this,"scene");C(this,"avatarStates",new Map);C(this,"avatarMixers",new Map);C(this,"avatarGroups",new Map);C(this,"animTimers",new Map);this.scene=e}registerAvatar(e,t){this.avatarGroups.set(e,t),this.avatarStates.set(e,{avatarId:e,activeAnimations:[],activeAnimationIds:[],currentState:"stand",blendWeight:1}),this.animTimers.set(e,0)}updateAnimations(e,t){const n=this.avatarStates.get(e);if(!n)return;const i=t.map(r=>z_[r]||"UNKNOWN").filter(r=>r!=="UNKNOWN");n.activeAnimationIds=t,n.activeAnimations=i,i.includes("WALK")||i.includes("CROUCHWALK")?n.currentState="walk":i.includes("FLY")||i.includes("HOVER_FLY")||i.includes("HOVER")?n.currentState="fly":i.includes("SIT")?n.currentState="sit":i.includes("TYPE")||i.includes("CROUCH")?n.currentState="gesture":n.currentState="stand"}update(e){for(const[t,n]of this.avatarStates){const i=this.avatarGroups.get(t);if(!i)continue;const r=(this.animTimers.get(t)||0)+e;this.animTimers.set(t,r);const o=this.mapStateToAnimation(n.currentState),a=V_[o];if(a&&a.duration>0){const c=r%a.duration;for(const[l,h]of Object.entries(a.keyframes)){const u=i.getObjectByName(l);if(!u)continue;let d=h[0],m=h[h.length-1];for(let p=0;p<h.length-1;p++)if(c>=h[p].time&&c<=h[p+1].time){d=h[p],m=h[p+1];break}const g=m.time-d.time,_=g>0?(c-d.time)/g:0;u.rotation.x=Vn.lerp(d.rotX,m.rotX,_),u.rotation.y=Vn.lerp(d.rotY,m.rotY,_),u.rotation.z=Vn.lerp(d.rotZ,m.rotZ,_)}}else this.resetPose(i)}}getState(e){var t;return((t=this.avatarStates.get(e))==null?void 0:t.currentState)||"stand"}removeAvatar(e){this.avatarStates.delete(e),this.avatarGroups.delete(e),this.animTimers.delete(e);const t=this.avatarMixers.get(e);t&&(t.stopAllAction(),this.avatarMixers.delete(e))}clear(){for(const[,e]of this.avatarMixers)e.stopAllAction();this.avatarStates.clear(),this.avatarGroups.clear(),this.avatarMixers.clear(),this.animTimers.clear()}mapStateToAnimation(e){switch(e){case"walk":return"WALK";case"fly":return"FLY";case"sit":return"SIT";case"gesture":return"IDLE";default:return"IDLE"}}resetPose(e){e.traverse(t=>{t instanceof ke&&(t.rotation.x*=.9,t.rotation.y*=.9,t.rotation.z*=.9)})}}const bl={0:{name:"unknown",offset:new w(0,1,0)},1:{name:"chest",offset:new w(0,1.2,0)},2:{name:"head",offset:new w(0,1.6,0)},3:{name:"left shoulder",offset:new w(.35,1.3,0)},4:{name:"right shoulder",offset:new w(-.35,1.3,0)},5:{name:"left hand",offset:new w(.45,.8,0)},6:{name:"right hand",offset:new w(-.45,.8,0)},7:{name:"left foot",offset:new w(.1,.1,0)},8:{name:"right foot",offset:new w(-.1,.1,0)},9:{name:"right hip",offset:new w(-.15,.9,0)},10:{name:"right hip",offset:new w(-.15,.9,0)},11:{name:"right hip",offset:new w(-.15,.9,0)},12:{name:"left hip",offset:new w(.15,.9,0)},13:{name:"left hip",offset:new w(.15,.9,0)},14:{name:"left hip",offset:new w(.15,.9,0)},15:{name:"torso",offset:new w(0,1.1,0)},16:{name:"neck",offset:new w(0,1.5,0)},17:{name:"right shoulder",offset:new w(-.35,1.3,0)},18:{name:"right forearm",offset:new w(-.4,1.05,0)},19:{name:"right forearm",offset:new w(-.4,1.05,0)},20:{name:"left forearm",offset:new w(.4,1.05,0)},21:{name:"left forearm",offset:new w(.4,1.05,0)},22:{name:"left shoulder",offset:new w(.35,1.3,0)},23:{name:"right hip",offset:new w(-.15,.9,0)},24:{name:"right hip",offset:new w(-.15,.9,0)},25:{name:"left hip",offset:new w(.15,.9,0)},26:{name:"left hip",offset:new w(.15,.9,0)},27:{name:"head",offset:new w(0,1.65,0)},28:{name:"head",offset:new w(0,1.7,0)},29:{name:"head",offset:new w(0,1.75,0)},30:{name:"right hand",offset:new w(-.45,.8,0)},31:{name:"left hand",offset:new w(.45,.8,0)},32:{name:"right hand",offset:new w(-.45,.75,0)},33:{name:"left hand",offset:new w(.45,.75,0)},34:{name:"right hand",offset:new w(-.45,.85,0)},35:{name:"left hand",offset:new w(.45,.85,0)},36:{name:"torso",offset:new w(0,1,0)},37:{name:"right hip",offset:new w(-.15,.85,0)},38:{name:"left hip",offset:new w(.15,.85,0)},39:{name:"head",offset:new w(0,1.8,0)},40:{name:"hud right",offset:new w(0,1.2,0)},41:{name:"hud left",offset:new w(0,1.2,0)},42:{name:"hud right",offset:new w(0,1.2,0)},43:{name:"hud left",offset:new w(0,1.2,0)},44:{name:"hud right",offset:new w(0,1.2,0)},45:{name:"hud left",offset:new w(0,1.2,0)}};class Wa{constructor(e){C(this,"scene");C(this,"attachments",new Map);C(this,"avatarGroups",new Map);this.scene=e}registerAvatar(e,t){this.avatarGroups.set(e,t)}updateAttachment(e){const t=this.attachments.get(e.objectId);if(t)t.data=e,this.positionAttachment(t);else{const n=new qt;n.name=`attachment_${e.objectName}`;const i=new un(.15,.15,.15),r=new It({color:4500223,roughness:.5,metalness:.3}),o=new ke(i,r);o.castShadow=!0,n.add(o),this.scene.add(n);const a={data:e,group:n};this.attachments.set(e.objectId,a),this.positionAttachment(a)}}removeAttachment(e){const t=this.attachments.get(e);t&&(this.scene.remove(t.group),t.group.traverse(n=>{n instanceof ke&&(n.geometry.dispose(),Array.isArray(n.material)?n.material.forEach(i=>i.dispose()):n.material.dispose())}),this.attachments.delete(e))}update(){for(const[,e]of this.attachments)this.positionAttachment(e)}clear(){for(const[e]of this.attachments)this.removeAttachment(e);this.avatarGroups.clear()}static getAttachmentInfo(e){return bl[e]||bl[0]}positionAttachment(e){const{data:t,group:n}=e,i=this.avatarGroups.get(t.avatarId);if(i){const r=Wa.getAttachmentInfo(t.attachmentPoint),o=new w;o.copy(r.offset),o.applyQuaternion(i.quaternion),o.add(i.position),n.position.copy(o),n.quaternion.set(t.rotation.x,t.rotation.z,t.rotation.y,t.rotation.w),n.scale.set(t.scale.x,t.scale.z,t.scale.y)}else n.position.set(t.position.x,t.position.z,t.position.y),n.quaternion.set(t.rotation.x,t.rotation.z,t.rotation.y,t.rotation.w),n.scale.set(t.scale.x,t.scale.z,t.scale.y)}}class G_{constructor(){C(this,"panel",null);C(this,"currentProfile",null)}show(e,t,n){this.hide(),this.currentProfile=e,this.panel=document.createElement("div"),this.panel.className="profile-panel",this.panel.style.cssText=`
      position: fixed;
      top: ${n??100}px;
      left: ${t??100}px;
      width: 320px;
      background: rgba(20, 20, 30, 0.95);
      border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px;
      padding: 16px;
      font-family: 'Segoe UI', sans-serif;
      color: #e0e0e0;
      z-index: 10000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
    `;const i=document.createElement("button");i.textContent="×",i.style.cssText=`
      position: absolute; top: 8px; right: 12px;
      background: none; border: none; color: #888; font-size: 20px;
      cursor: pointer; line-height: 1;
    `,i.onclick=()=>this.hide(),this.panel.appendChild(i);const r=document.createElement("div");r.style.cssText="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;";const o=document.createElement("div");o.style.cssText=`
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; font-weight: bold; color: white; flex-shrink: 0;
    `,o.textContent=e.name.charAt(0).toUpperCase(),r.appendChild(o);const a=document.createElement("div");a.style.cssText="flex: 1; min-width: 0;";const c=document.createElement("div");if(c.style.cssText="font-size: 16px; font-weight: 600; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",c.textContent=e.name,a.appendChild(c),e.title){const d=document.createElement("div");d.style.cssText="font-size: 12px; color: #aaa; font-style: italic;",d.textContent=e.title,a.appendChild(d)}const l=document.createElement("div");l.style.cssText=`
      width: 10px; height: 10px; border-radius: 50%;
      background: ${e.online!==!1?"#4caf50":"#666"};
      flex-shrink: 0;
    `,r.appendChild(a),r.appendChild(l),this.panel.appendChild(r);const h=document.createElement("div");h.style.cssText="height: 1px; background: rgba(255,255,255,0.1); margin: 12px 0;",this.panel.appendChild(h);const u=(d,m)=>{if(!m)return;const g=document.createElement("div");g.style.cssText="margin-bottom: 8px;";const _=document.createElement("span");_.style.cssText="font-size: 11px; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px;",_.textContent=d;const p=document.createElement("span");p.style.cssText="font-size: 13px; color: #ccc;",p.textContent=m,g.appendChild(_),g.appendChild(p),this.panel.appendChild(g)};if(u("Account",e.accountStatus||"Resident"),u("Home",e.homeLocation),u("Last Seen",e.lastLogin||(e.online!==!1?"Online now":"Offline")),e.bio){u("About");const d=document.createElement("div");d.style.cssText="font-size: 12px; color: #aaa; line-height: 1.4; max-height: 80px; overflow-y: auto; margin-top: 4px;",d.textContent=e.bio,this.panel.appendChild(d)}if(e.profileImage){const d=document.createElement("div");d.style.cssText="margin-top: 12px; text-align: center;";const m=document.createElement("img");m.src=e.profileImage,m.style.cssText="max-width: 100%; max-height: 120px; border-radius: 4px;",m.onerror=()=>m.remove(),d.appendChild(m),this.panel.appendChild(d)}document.body.appendChild(this.panel)}hide(){this.panel&&(this.panel.remove(),this.panel=null,this.currentProfile=null)}get current(){return this.currentProfile}get visible(){return this.panel!==null}toggle(){this.panel&&this.hide()}dispose(){this.hide()}}class W_{constructor(e){C(this,"panel",null);C(this,"groups",[]);C(this,"activeGroupId",null);C(this,"currentTab","groups");C(this,"chatMessages",[]);C(this,"onSendMessage");C(this,"onGroupSelect");this.onSendMessage=e==null?void 0:e.onSendMessage,this.onGroupSelect=e==null?void 0:e.onGroupSelect}toggle(){this.panel?this.hide():this.show()}show(){if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position: fixed; right: 20px; top: 80px; width: 320px; height: 480px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px; z-index: 9999; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px);
    `;const e=document.createElement("div");e.style.cssText="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const t=document.createElement("span");t.style.cssText="font-size: 14px; font-weight: 600;",t.textContent="👥 Groups",e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background: none; border: none; color: #888; font-size: 18px; cursor: pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e);const i=document.createElement("div");i.style.cssText="display: flex; border-bottom: 1px solid rgba(255,255,255,0.1);";const r=["groups","notices","chat"];for(const l of r){const h=document.createElement("button");h.textContent=l==="groups"?"📋 List":l==="notices"?"📰 Notices":"💬 Chat",h.style.cssText=`
        flex: 1; padding: 8px; background: ${l===this.currentTab?"rgba(100,150,255,0.2)":"transparent"};
        border: none; color: ${l===this.currentTab?"#fff":"#888"};
        font-size: 12px; cursor: pointer; transition: background 0.2s;
      `,h.onclick=()=>{this.currentTab=l,this.refresh()},i.appendChild(h)}this.panel.appendChild(i);const o=document.createElement("div");o.id="group-panel-content",o.style.cssText="flex: 1; overflow-y: auto; padding: 8px;",this.panel.appendChild(o);const a=document.createElement("div");a.style.cssText="padding: 8px; border-top: 1px solid rgba(255,255,255,0.1); display: none;",a.id="group-chat-input";const c=document.createElement("input");c.type="text",c.placeholder="Type a message...",c.style.cssText=`
      width: 100%; padding: 8px; background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;
      color: #fff; font-size: 13px; box-sizing: border-box;
    `,c.onkeydown=l=>{var h;l.key==="Enter"&&c.value.trim()&&((h=this.onSendMessage)==null||h.call(this,c.value.trim()),this.chatMessages.push({sender:"You",text:c.value.trim(),time:new Date().toLocaleTimeString()}),c.value="",this.refresh())},a.appendChild(c),this.panel.appendChild(a),document.body.appendChild(this.panel),this.refresh()}hide(){this.panel&&(this.panel.remove(),this.panel=null)}updateGroups(e){this.groups=e,this.refresh()}setActiveGroup(e){this.activeGroupId=e,this.refresh()}addChatMessage(e,t,n){this.chatMessages.push({sender:e,text:t,time:n||new Date().toLocaleTimeString()}),this.chatMessages.length>100&&this.chatMessages.shift(),this.refresh()}getActiveGroupTitle(){const e=this.groups.find(t=>t.id===this.activeGroupId);return(e==null?void 0:e.title)||null}refresh(){if(!this.panel)return;const e=this.panel.querySelector("#group-panel-content"),t=this.panel.querySelector("#group-chat-input");if(!e)return;t&&(t.style.display=this.currentTab==="chat"?"block":"none");const n=this.panel.querySelectorAll("button"),i=["groups","notices","chat"];n.forEach((r,o)=>{if(o<3){const a=i[o];r.style.background=a===this.currentTab?"rgba(100,150,255,0.2)":"transparent",r.style.color=a===this.currentTab?"#fff":"#888"}}),e.innerHTML="",this.currentTab==="groups"?this.renderGroupList(e):this.currentTab==="notices"?this.renderNotices(e):this.renderChat(e)}renderGroupList(e){if(this.groups.length===0){const t=document.createElement("div");t.style.cssText="text-align: center; padding: 40px 0; color: #666; font-size: 13px;",t.textContent="No groups found",e.appendChild(t);return}for(const t of this.groups){const n=document.createElement("div");n.style.cssText=`
        padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
        cursor: pointer; transition: background 0.2s;
        ${t.id===this.activeGroupId?"background: rgba(100,150,255,0.15);":""}
      `,n.onmouseenter=()=>n.style.background="rgba(255,255,255,0.05)",n.onmouseleave=()=>n.style.background=t.id===this.activeGroupId?"rgba(100,150,255,0.15)":"transparent",n.onclick=()=>{var o;this.activeGroupId=t.id,(o=this.onGroupSelect)==null||o.call(this,t.id),this.refresh()};const i=document.createElement("div");i.style.cssText="display: flex; justify-content: space-between; align-items: center;";const r=document.createElement("span");if(r.style.cssText="font-size: 13px; font-weight: 500;",r.textContent=t.name,i.appendChild(r),t.id===this.activeGroupId){const o=document.createElement("span");o.style.cssText="font-size: 10px; background: rgba(100,150,255,0.3); padding: 2px 6px; border-radius: 3px; color: #aaa;",o.textContent="ACTIVE",i.appendChild(o)}if(n.appendChild(i),t.title||t.motto){const o=document.createElement("div");o.style.cssText="font-size: 11px; color: #888; margin-top: 4px; font-style: italic;",o.textContent=t.title||t.motto||"",n.appendChild(o)}if(t.memberCount){const o=document.createElement("div");o.style.cssText="font-size: 11px; color: #666; margin-top: 2px;",o.textContent=`${t.memberCount} members`,n.appendChild(o)}e.appendChild(n)}}renderNotices(e){const t=document.createElement("div");t.style.cssText="text-align: center; padding: 40px 0; color: #666; font-size: 13px;",t.textContent="No group notices",e.appendChild(t)}renderChat(e){if(this.chatMessages.length===0){const t=document.createElement("div");t.style.cssText="text-align: center; padding: 40px 0; color: #666; font-size: 13px;",t.textContent="No messages yet",e.appendChild(t);return}for(const t of this.chatMessages){const n=document.createElement("div");n.style.cssText="padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);";const i=document.createElement("span");i.style.cssText="font-size: 12px; font-weight: 600; color: #8ab4f8;",i.textContent=t.sender,n.appendChild(i);const r=document.createElement("span");r.style.cssText="font-size: 10px; color: #666; margin-left: 8px;",r.textContent=t.time,n.appendChild(r);const o=document.createElement("div");o.style.cssText="font-size: 13px; color: #ccc; margin-top: 2px; word-wrap: break-word;",o.textContent=t.text,n.appendChild(o),e.appendChild(n)}e.scrollTop=e.scrollHeight}dispose(){this.hide()}}class X_{constructor(e,t){C(this,"scene");C(this,"camera");C(this,"raycaster",new pa);C(this,"mouse");C(this,"onInteract");C(this,"enabled",!0);this.scene=e,this.camera=t,this.raycaster=new pa,this.mouse=new oe}setCallback(e){this.onInteract=e}setEnabled(e){this.enabled=e}handleClick(e,t,n="touch"){var o,a,c,l,h,u;if(!this.enabled)return null;this.mouse.x=e/window.innerWidth*2-1,this.mouse.y=-(t/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const i=[];this.scene.traverse(d=>{d instanceof ke&&d.visible&&i.push(d)});const r=this.raycaster.intersectObjects(i,!1);if(r.length>0){const d=r[0],m=d.object.name||"Unknown",g={objectId:((o=d.object.userData)==null?void 0:o.objectId)||((c=(a=d.object.parent)==null?void 0:a.userData)==null?void 0:c.objectId)||"unknown",objectName:m,point:d.point.clone(),normal:((h=(l=d.face)==null?void 0:l.normal)==null?void 0:h.clone())||new w(0,1,0),distance:d.distance};return(u=this.onInteract)==null||u.call(this,g,n),g}return null}getHoveredObject(e,t){var r,o,a,c,l;if(!this.enabled)return null;this.mouse.x=e/window.innerWidth*2-1,this.mouse.y=-(t/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=[];this.scene.traverse(h=>{h instanceof ke&&h.visible&&n.push(h)});const i=this.raycaster.intersectObjects(n,!1);if(i.length>0){const h=i[0];return{objectId:((r=h.object.userData)==null?void 0:r.objectId)||((a=(o=h.object.parent)==null?void 0:o.userData)==null?void 0:a.objectId)||"unknown",objectName:h.object.name||"Unknown",point:h.point.clone(),normal:((l=(c=h.face)==null?void 0:c.normal)==null?void 0:l.clone())||new w(0,1,0),distance:h.distance}}return null}dispose(){this.onInteract=void 0}}class $_{constructor(e){C(this,"panel",null);C(this,"root",null);C(this,"expandedFolders",new Set);C(this,"selectedItemId",null);C(this,"searchQuery","");C(this,"onAction");this.onAction=e==null?void 0:e.onAction}toggle(){this.panel?this.hide():this.show()}show(){if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position: fixed; left: 20px; top: 80px; width: 320px; height: 520px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px; z-index: 9999; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px);
    `;const e=document.createElement("div");e.style.cssText="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const t=document.createElement("span");t.style.cssText="font-size: 14px; font-weight: 600;",t.textContent="📦 Inventory",e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background: none; border: none; color: #888; font-size: 18px; cursor: pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e);const i=document.createElement("input");i.type="text",i.placeholder="🔍 Search inventory...",i.style.cssText=`
      margin: 8px 12px; padding: 6px 10px; background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
      color: #fff; font-size: 12px; outline: none; width: calc(100% - 24px); box-sizing: border-box;
    `,i.oninput=()=>{this.searchQuery=i.value.toLowerCase(),this.refresh()},this.panel.appendChild(i);const r=document.createElement("div");r.id="inv-tree",r.style.cssText="flex: 1; overflow-y: auto; padding: 4px 0;",this.panel.appendChild(r);const o=document.createElement("div");o.style.cssText="padding: 6px 12px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 10px; color: #666;",o.textContent="Right-click items for actions (wear/rez/take)",this.panel.appendChild(o),document.body.appendChild(this.panel),this.refresh()}hide(){this.panel&&(this.panel.remove(),this.panel=null)}setInventory(e){this.root=e,this.expandedFolders.add(e.id),this.refresh()}expandFolder(e,t,n){if(!this.root)return;const i=this.findFolder(this.root,e);i&&(i.children=t,i.items=n,this.expandedFolders.add(e),this.refresh())}updateItemCreator(e,t){if(!this.root)return;const n=this.findItem(this.root,e);n&&(n.creatorName=t,this.refresh())}refresh(){if(!this.panel)return;const e=this.panel.querySelector("#inv-tree");if(e){if(e.innerHTML="",!this.root){const t=document.createElement("div");t.style.cssText="text-align: center; padding: 40px 0; color: #666; font-size: 13px;",t.textContent="Inventory loading...",e.appendChild(t);return}this.renderFolder(e,this.root,0)}}renderFolder(e,t,n){const i=this.expandedFolders.has(t.id),r=t.children&&t.children.length>0||t.childCount>0,o=document.createElement("div");o.style.cssText=`
      padding: 4px ${8+n*16}px 4px ${8+n*16}px;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      transition: background 0.15s; font-size: 12px;
    `,o.onmouseenter=()=>o.style.background="rgba(255,255,255,0.05)",o.onmouseleave=()=>o.style.background="transparent";const a=document.createElement("span");a.textContent=r?i?"▼":"▶":" ",a.style.cssText="width: 12px; font-size: 8px; color: #888; user-select: none;",o.appendChild(a);const c=document.createElement("span");c.textContent=this.getFolderIcon(t.type),o.appendChild(c);const l=document.createElement("span");if(l.style.cssText="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",l.textContent=t.name,o.appendChild(l),t.childCount>0){const h=document.createElement("span");h.style.cssText="font-size: 10px; color: #666;",h.textContent=`(${t.childCount})`,o.appendChild(h)}if(o.onclick=h=>{h.stopPropagation(),i?this.expandedFolders.delete(t.id):this.expandedFolders.add(t.id),this.refresh()},o.oncontextmenu=h=>{h.preventDefault(),this.showContextMenu(h.clientX,h.clientY,"folder",t)},e.appendChild(o),i){if(t.children)for(const h of t.children)this.searchQuery&&!this.matchesSearch(h)||this.renderFolder(e,h,n+1);if(t.items)for(const h of t.items)this.searchQuery&&!h.name.toLowerCase().includes(this.searchQuery)||this.renderItem(e,h,n+1)}}renderItem(e,t,n){const i=document.createElement("div");i.style.cssText=`
      padding: 3px ${8+n*16}px 3px ${8+n*16}px;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      transition: background 0.15s; font-size: 12px;
      ${t.id===this.selectedItemId?"background: rgba(100,150,255,0.15);":""}
    `,i.onmouseenter=()=>i.style.background="rgba(255,255,255,0.05)",i.onmouseleave=()=>i.style.background=t.id===this.selectedItemId?"rgba(100,150,255,0.15)":"transparent";const r=document.createElement("span");r.textContent=this.getItemIcon(t.assetType),i.appendChild(r);const o=document.createElement("span");o.style.cssText="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",o.textContent=t.name,i.appendChild(o),i.onclick=a=>{a.stopPropagation(),this.selectedItemId=t.id,this.refresh()},i.ondblclick=a=>{var c;a.stopPropagation(),(c=this.onAction)==null||c.call(this,"rez",t)},i.oncontextmenu=a=>{a.preventDefault(),this.selectedItemId=t.id,this.showContextMenu(a.clientX,a.clientY,"item",t),this.refresh()},e.appendChild(i)}showContextMenu(e,t,n,i){var l,h;const r=document.getElementById("inv-context-menu");r&&r.remove();const o=document.createElement("div");o.id="inv-context-menu",o.style.cssText=`
      position: fixed; left: ${e}px; top: ${t}px;
      background: rgba(30, 30, 40, 0.98); border: 1px solid rgba(100,150,255,0.3);
      border-radius: 4px; z-index: 10000; min-width: 140px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4); padding: 4px 0;
      font-family: 'Segoe UI', sans-serif; font-size: 12px; color: #e0e0e0;
    `;const a=[];n==="item"?(((l=i.assetType)!=null&&l.includes("Wearable")||(h=i.inventoryType)!=null&&h.includes("Wearable"))&&a.push({label:"👔 Wear",action:"wear"}),a.push({label:"🌍 Rez in World",action:"rez"}),a.push({label:"🗑️ Delete",action:"delete"})):a.push({label:"📁 Open",action:"rename"});for(const u of a){const d=document.createElement("div");d.style.cssText="padding: 6px 12px; cursor: pointer; transition: background 0.1s;",d.textContent=u.label,d.onmouseenter=()=>d.style.background="rgba(100,150,255,0.2)",d.onmouseleave=()=>d.style.background="transparent",d.onclick=()=>{var m;o.remove(),(m=this.onAction)==null||m.call(this,u.action,i)},o.appendChild(d)}document.body.appendChild(o);const c=u=>{o.contains(u.target)||(o.remove(),document.removeEventListener("click",c))};setTimeout(()=>document.addEventListener("click",c),10)}matchesSearch(e){return e.name.toLowerCase().includes(this.searchQuery)?!0:e.children?e.children.some(t=>this.matchesSearch(t)):e.items?e.items.some(t=>t.name.toLowerCase().includes(this.searchQuery)):!1}findFolder(e,t){if(e.id===t)return e;if(e.children)for(const n of e.children){const i=this.findFolder(n,t);if(i)return i}return null}findItem(e,t){if(e.items){for(const n of e.items)if(n.id===t)return n}if(e.children)for(const n of e.children){const i=this.findItem(n,t);if(i)return i}return null}getFolderIcon(e){return{Root:"🏠","My Inventory":"📦",Clothing:"👕","Body Parts":"🦴",Objects:"🧸",Notecards:"📝",Scripts:"📜",Landmarks:"📍",Photos:"📷",Sounds:"🎵",Textures:"🖼️",Trash:"🗑️","Lost And Found":"❓",Marketplace:"🛒",Animations:"💃"}[e]||"📁"}getItemIcon(e){const t={Object:"🧸",Clothing:"👕",BodyPart:"🦴",Texture:"🖼️",Sound:"🎵",Script:"📜",Notecard:"📝",Landmark:"📍",Wearable:"👔",Animation:"💃",Gesture:"🫰",Snapshot:"📷"};for(const[n,i]of Object.entries(t))if(e.includes(n))return i;return"📄"}dispose(){this.hide()}}class Y_{constructor(e){C(this,"panel",null);C(this,"wearables",[{type:"Shape",name:"Shape",isDirty:!1},{type:"Skin",name:"Skin",isDirty:!1},{type:"Hair",name:"Hair",isDirty:!1},{type:"Eyes",name:"Eyes",isDirty:!1},{type:"Shirt",name:"Shirt",isDirty:!1},{type:"Pants",name:"Pants",isDirty:!1},{type:"Shoes",name:"Shoes",isDirty:!1},{type:"Socks",name:"Socks",isDirty:!1},{type:"Jacket",name:"Jacket",isDirty:!1},{type:"Skirt",name:"Skirt",isDirty:!1},{type:"Gloves",name:"Gloves",isDirty:!1},{type:"Undershirt",name:"Undershirt",isDirty:!1},{type:"Underpants",name:"Underpants",isDirty:!1},{type:"Avatar",name:"Skin Texture",isDirty:!1}]);C(this,"visualParams",[{id:3,name:"HEAD_SIZE",label:"Head Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:6,name:"NECK_LENGTH",label:"Neck Length",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:7,name:"NECK_THICKNESS",label:"Neck Thickness",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:9,name:"TORSO_LENGTH",label:"Torso Length",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:10,name:"TORSO_MUSCLES",label:"Torso Muscles",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:11,name:"BELLY_SIZE",label:"Belly Size",group:"Shape",defaultValue:0,minValue:0,maxValue:100,currentValue:0},{id:12,name:"HIPS_SIZE",label:"Hip Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:13,name:"LEG_LENGTH",label:"Leg Length",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:14,name:"LEG_MUSCLES",label:"Leg Muscles",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:15,name:"ARM_LENGTH",label:"Arm Length",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:16,name:"ARM_MUSCLES",label:"Arm Muscles",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:17,name:"ARM_THICKNESS",label:"Arm Thickness",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:18,name:"HAND_SIZE",label:"Hand Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:19,name:"FOOT_SIZE",label:"Foot Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:20,name:"BREAST_SIZE",label:"Breast Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:21,name:"BREAST_GRAVITY",label:"Breast Gravity",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:23,name:"HIP_WIDTH",label:"Hip Width",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:24,name:"BUTT_SIZE",label:"Butt Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:25,name:"JAW_ANGLE",label:"Jaw Angle",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:26,name:"JAW_SHAPE",label:"Jaw Shape",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:27,name:"CHIN_LENGTH",label:"Chin Length",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:28,name:"CHIN_SHAPE",label:"Chin Shape",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:29,name:"EYE_SIZE",label:"Eye Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:30,name:"EYE_SPACING",label:"Eye Spacing",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:33,name:"NOSE_SIZE",label:"Nose Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:34,name:"NOSE_WIDTH",label:"Nose Width",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:35,name:"NOSE_HEIGHT",label:"Nose Height",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:36,name:"LIP_SIZE",label:"Lip Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:37,name:"LIP_THICKNESS",label:"Lip Thickness",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:38,name:"EAR_SIZE",label:"Ear Size",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:39,name:"EAR_FLAP",label:"Ear Flap",group:"Shape",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:40,name:"HAIR_VOLUMNE",label:"Hair Volume",group:"Hair",defaultValue:50,minValue:0,maxValue:100,currentValue:50},{id:41,name:"HAIR_BRIGHTNESS",label:"Hair Brightness",group:"Hair",defaultValue:50,minValue:0,maxValue:100,currentValue:50}]);C(this,"currentGroup","Shape");C(this,"onParamChange");C(this,"onBake");this.onParamChange=e==null?void 0:e.onParamChange,this.onBake=e==null?void 0:e.onBake}toggle(){this.panel?this.hide():this.show()}show(){if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 600px; max-height: 80vh; background: rgba(20, 20, 30, 0.95);
      border: 1px solid rgba(100, 150, 255, 0.3); border-radius: 10px;
      z-index: 10000; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
    `;const e=document.createElement("div");e.style.cssText="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const t=document.createElement("span");t.style.cssText="font-size: 16px; font-weight: 600;",t.textContent="👗 Appearance Editor",e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background: none; border: none; color: #888; font-size: 20px; cursor: pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e);const i=document.createElement("div");i.style.cssText="display: flex; flex: 1; overflow: hidden;";const r=document.createElement("div");r.style.cssText="width: 200px; border-right: 1px solid rgba(255,255,255,0.1); overflow-y: auto; padding: 8px 0;";const o=document.createElement("div");o.style.cssText="padding: 4px 12px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;",o.textContent="Wearable Slots",r.appendChild(o);for(const g of this.wearables){const _=document.createElement("div");_.style.cssText=`
        padding: 6px 12px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
        font-size: 12px; transition: background 0.15s;
      `,_.onmouseenter=()=>_.style.background="rgba(255,255,255,0.05)",_.onmouseleave=()=>_.style.background="transparent";const p=document.createElement("span");if(p.textContent=g.name,_.appendChild(p),g.isDirty){const f=document.createElement("span");f.style.cssText="width: 6px; height: 6px; border-radius: 50%; background: #f0ad4e;",_.appendChild(f)}r.appendChild(_)}i.appendChild(r);const a=document.createElement("div");a.style.cssText="flex: 1; overflow-y: auto; padding: 8px 16px;";const c=document.createElement("div");c.style.cssText="display: flex; gap: 4px; margin-bottom: 12px; flex-wrap: wrap;";const l=[...new Set(this.visualParams.map(g=>g.group))];for(const g of l){const _=document.createElement("button");_.textContent=g,_.style.cssText=`
        padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${g===this.currentGroup?"rgba(100,150,255,0.3)":"rgba(255,255,255,0.08)"};
        border: 1px solid ${g===this.currentGroup?"rgba(100,150,255,0.5)":"transparent"};
        color: ${g===this.currentGroup?"#fff":"#888"};
      `,_.onclick=()=>{this.currentGroup=g,this.refresh()},c.appendChild(_)}a.appendChild(c);const h=this.visualParams.filter(g=>g.group===this.currentGroup);for(const g of h){const _=document.createElement("div");_.style.cssText="margin-bottom: 10px;";const p=document.createElement("div");p.style.cssText="display: flex; justify-content: space-between; margin-bottom: 4px;";const f=document.createElement("span");f.style.cssText="font-size: 12px;",f.textContent=g.label,p.appendChild(f);const E=document.createElement("span");E.style.cssText="font-size: 11px; color: #888; font-variant-numeric: tabular-nums;",E.textContent=g.currentValue.toFixed(0),p.appendChild(E),_.appendChild(p);const M=document.createElement("input");M.type="range",M.min=String(g.minValue),M.max=String(g.maxValue),M.value=String(g.currentValue),M.step="1",M.style.cssText=`
        width: 100%; height: 4px; -webkit-appearance: none; appearance: none;
        background: rgba(255,255,255,0.15); border-radius: 2px; outline: none;
      `,M.oninput=()=>{var v;g.currentValue=Number(M.value),E.textContent=g.currentValue.toFixed(0),(v=this.onParamChange)==null||v.call(this,g.id,g.currentValue)},_.appendChild(M),a.appendChild(_)}i.appendChild(a),this.panel.appendChild(i);const u=document.createElement("div");u.style.cssText="padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const d=document.createElement("button");d.textContent="↺ Reset",d.style.cssText="padding: 6px 14px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #ccc; cursor: pointer; font-size: 12px;",d.onclick=()=>{for(const g of this.visualParams)g.currentValue=g.defaultValue;this.refresh()},u.appendChild(d);const m=document.createElement("button");m.textContent="✅ Bake & Save",m.style.cssText="padding: 8px 20px; background: rgba(100,150,255,0.3); border: 1px solid rgba(100,150,255,0.5); border-radius: 4px; color: #fff; cursor: pointer; font-size: 13px; font-weight: 500;",m.onclick=()=>{var g;return(g=this.onBake)==null?void 0:g.call(this)},u.appendChild(m),this.panel.appendChild(u),document.body.appendChild(this.panel)}hide(){this.panel&&(this.panel.remove(),this.panel=null)}updateWearable(e,t,n){const i=this.wearables.find(r=>r.type===e);i&&(i.itemId=t,i.assetId=n,this.refresh())}updateParam(e,t){const n=this.visualParams.find(i=>i.id===e);n&&(n.currentValue=t,this.refresh())}getVisualParams(){const e={};for(const t of this.visualParams)e[t.id]=t.currentValue;return e}refresh(){this.panel&&(this.hide(),this.show())}dispose(){this.hide()}}const Sl={"HUD Center":{x:0,y:0,scale:.3},"HUD Center Down":{x:0,y:-.3,scale:.25},"HUD Center Up":{x:0,y:.3,scale:.25},"HUD Left":{x:-.5,y:0,scale:.25},"HUD Right":{x:.5,y:0,scale:.25},"HUD Top Left":{x:-.7,y:.5,scale:.2},"HUD Top Right":{x:.7,y:.5,scale:.2},"HUD Bottom Left":{x:-.7,y:-.5,scale:.2},"HUD Bottom Right":{x:.7,y:-.5,scale:.2},"HUD Eye Center":{x:0,y:0,scale:.15}};class q_{constructor(e,t){C(this,"scene");C(this,"hudScene");C(this,"hudCamera");C(this,"renderer");C(this,"objects",new Map);C(this,"objectData",new Map);this.scene=e,this.renderer=t,this.hudScene=new oh;const n=window.innerWidth/window.innerHeight;this.hudCamera=new Pa(-n,n,1,-1,.1,100),this.hudCamera.position.z=10;const i=new _h(16777215,.8);this.hudScene.add(i);const r=new fa(16777215,.5);r.position.set(5,5,10),this.hudScene.add(r)}addObject(e,t,n){const i=new qt;i.add(n);const r=Sl[t]||{x:0,y:0,scale:.2};i.position.set(r.x*2,r.y*2,0),i.scale.setScalar(r.scale),this.hudScene.add(i),this.objects.set(e,i),this.objectData.set(e,{objectId:e,attachmentPoint:t,name:n.name||"HUD Object",position:new w(r.x*2,r.y*2,0),rotation:new Zi,scale:new w(r.scale,r.scale,r.scale),visible:!0})}removeObject(e){const t=this.objects.get(e);t&&(this.hudScene.remove(t),this.objects.delete(e),this.objectData.delete(e))}updateObject(e,t){const n=this.objects.get(e),i=this.objectData.get(e);!n||!i||(t.position&&(n.position.copy(t.position),i.position.copy(t.position)),t.rotation&&(n.quaternion.copy(t.rotation),i.rotation.copy(t.rotation)),t.scale&&(n.scale.copy(t.scale),i.scale.copy(t.scale)),t.visible!==void 0&&(n.visible=t.visible,i.visible=t.visible))}render(){const e=new ct;this.renderer.getViewport(e);const t=new ct;this.renderer.getScissor(t);const n=this.renderer.getScissorTest();this.renderer.setScissorTest(!1),this.renderer.setViewport(0,0,window.innerWidth,window.innerHeight),this.renderer.render(this.hudScene,this.hudCamera),this.renderer.setScissorTest(n),this.renderer.setViewport(e),this.renderer.setScissor(t)}getObjects(){return Array.from(this.objectData.values())}isHUDPoint(e){return e in Sl||e.startsWith("HUD")}resize(e,t){const n=e/t;this.hudCamera.left=-n,this.hudCamera.right=n,this.hudCamera.updateProjectionMatrix()}dispose(){this.objects.clear(),this.objectData.clear()}}class j_{constructor(e){C(this,"panel",null);C(this,"currentCategory","people");C(this,"results",[]);C(this,"query","");C(this,"onSearch");C(this,"onResultClick");C(this,"isLoading",!1);this.onSearch=e==null?void 0:e.onSearch,this.onResultClick=e==null?void 0:e.onResultClick}toggle(){this.panel?this.hide():this.show()}show(){if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position: fixed; right: 20px; top: 80px; width: 380px; height: 520px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px; z-index: 9999; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px);
    `;const e=document.createElement("div");e.style.cssText="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const t=document.createElement("span");t.style.cssText="font-size: 14px; font-weight: 600;",t.textContent="🔍 Search",e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background: none; border: none; color: #888; font-size: 18px; cursor: pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e);const i=document.createElement("div");i.style.cssText="padding: 8px 12px; display: flex; gap: 8px;";const r=document.createElement("input");r.type="text",r.placeholder="Search...",r.value=this.query,r.style.cssText=`
      flex: 1; padding: 8px 12px; background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
      color: #fff; font-size: 13px; outline: none;
    `,r.onkeydown=h=>{h.key==="Enter"&&(this.query=r.value,this.doSearch())};const o=document.createElement("button");o.textContent="🔍",o.style.cssText=`
      padding: 8px 12px; background: rgba(100,150,255,0.3); border: 1px solid rgba(100,150,255,0.5);
      border-radius: 4px; color: #fff; cursor: pointer; font-size: 14px;
    `,o.onclick=()=>{this.query=r.value,this.doSearch()},i.appendChild(r),i.appendChild(o),this.panel.appendChild(i);const a=document.createElement("div");a.style.cssText="display: flex; border-bottom: 1px solid rgba(255,255,255,0.1);";const c=[{key:"people",icon:"👤",label:"People"},{key:"places",icon:"🗺️",label:"Places"},{key:"events",icon:"🎉",label:"Events"},{key:"groups",icon:"👥",label:"Groups"},{key:"classifieds",icon:"📋",label:"Classifieds"}];for(const h of c){const u=document.createElement("button");u.textContent=`${h.icon} ${h.label}`,u.style.cssText=`
        flex: 1; padding: 8px 4px; background: ${h.key===this.currentCategory?"rgba(100,150,255,0.2)":"transparent"};
        border: none; color: ${h.key===this.currentCategory?"#fff":"#888"};
        font-size: 11px; cursor: pointer; transition: background 0.2s;
      `,u.onclick=()=>{this.currentCategory=h.key,this.refresh(),this.query&&this.doSearch()},a.appendChild(u)}this.panel.appendChild(a);const l=document.createElement("div");l.id="search-results",l.style.cssText="flex: 1; overflow-y: auto; padding: 4px 0;",this.panel.appendChild(l),document.body.appendChild(this.panel),this.refresh()}hide(){this.panel&&(this.panel.remove(),this.panel=null)}setResults(e){this.results=e,this.isLoading=!1,this.refresh()}setLoading(e){this.isLoading=e,this.refresh()}doSearch(){var e;this.query.trim()&&(this.isLoading=!0,this.refresh(),(e=this.onSearch)==null||e.call(this,this.currentCategory,this.query))}refresh(){if(!this.panel)return;const e=this.panel.querySelector("#search-results");if(!e)return;e.innerHTML="";const t=this.panel.querySelectorAll("button"),n=["people","places","events","groups","classifieds"];if(t.forEach((i,r)=>{if(r<5){const o=n[r];i.style.background=o===this.currentCategory?"rgba(100,150,255,0.2)":"transparent",i.style.color=o===this.currentCategory?"#fff":"#888"}}),this.isLoading){const i=document.createElement("div");i.style.cssText="text-align: center; padding: 40px 0; color: #666;",i.textContent="Searching...",e.appendChild(i);return}if(this.results.length===0){const i=document.createElement("div");i.style.cssText="text-align: center; padding: 40px 0; color: #666; font-size: 13px;",i.textContent=this.query?"No results found":`Search for ${this.currentCategory}...`,e.appendChild(i);return}for(const i of this.results){const r=document.createElement("div");r.style.cssText=`
        padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.05);
        cursor: pointer; transition: background 0.15s;
      `,r.onmouseenter=()=>r.style.background="rgba(255,255,255,0.05)",r.onmouseleave=()=>r.style.background="transparent",r.onclick=()=>{var h;return(h=this.onResultClick)==null?void 0:h.call(this,i)};const o=document.createElement("div");o.style.cssText="display: flex; align-items: center; gap: 8px;";const a=document.createElement("span");a.textContent=this.getCategoryIcon(i.category),o.appendChild(a);const c=document.createElement("span");if(c.style.cssText="font-size: 13px; font-weight: 500;",c.textContent=i.name,o.appendChild(c),i.online){const h=document.createElement("span");h.style.cssText="width: 6px; height: 6px; border-radius: 50%; background: #4CAF50;",o.appendChild(h)}if(i.maturity){const h=document.createElement("span");h.style.cssText=`
          font-size: 9px; padding: 1px 5px; border-radius: 3px;
          background: ${i.maturity==="M"?"rgba(255,100,100,0.3)":"rgba(100,200,100,0.3)"};
          color: ${i.maturity==="M"?"#ff8888":"#88ff88"};
        `,h.textContent=i.maturity==="M"?"MATURE":"PG",o.appendChild(h)}if(r.appendChild(o),i.description){const h=document.createElement("div");h.style.cssText="font-size: 11px; color: #888; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",h.textContent=i.description,r.appendChild(h)}const l=document.createElement("div");l.style.cssText="font-size: 10px; color: #666; margin-top: 2px;",i.distance&&(l.textContent+=i.distance),i.price!==void 0&&(l.textContent+=` · $${i.price}`),i.date&&(l.textContent+=` · ${i.date}`),l.textContent&&r.appendChild(l),e.appendChild(r)}}getCategoryIcon(e){return{people:"👤",places:"🗺️",events:"🎉",groups:"👥",classifieds:"📋"}[e]||"📄"}dispose(){this.hide()}}class Z_{constructor(){C(this,"audioContext",null);C(this,"audioElement",null);C(this,"sourceNode",null);C(this,"gainNode",null);C(this,"currentStream",null);C(this,"mediaOverlays",new Map);C(this,"volume",.5);C(this,"container");C(this,"titleDisplay",null);this.container=document.createElement("div"),this.container.id="media-manager-overlay",this.container.style.cssText="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9998;",document.body.appendChild(this.container)}playStream(e,t){this.stopStream(),this.audioContext||(this.audioContext=new AudioContext),this.audioElement=new Audio,this.audioElement.crossOrigin="anonymous",this.audioElement.src=e,this.audioElement.loop=!0,this.sourceNode=this.audioContext.createMediaElementSource(this.audioElement),this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=this.volume,this.sourceNode.connect(this.gainNode),this.gainNode.connect(this.audioContext.destination),this.audioElement.play().catch(console.error),this.currentStream={url:e,title:t||this.extractTitleFromUrl(e),playing:!0,volume:this.volume},this.showTitleDisplay(this.currentStream.title)}stopStream(){this.audioElement&&(this.audioElement.pause(),this.audioElement.src="",this.audioElement=null),this.sourceNode&&(this.sourceNode.disconnect(),this.sourceNode=null),this.gainNode&&(this.gainNode.disconnect(),this.gainNode=null),this.currentStream=null,this.hideTitleDisplay()}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.gainNode&&(this.gainNode.gain.value=this.volume),this.currentStream&&(this.currentStream.volume=this.volume)}getVolume(){return this.volume}togglePlayPause(){var e,t;this.currentStream&&(this.currentStream.playing?((e=this.audioElement)==null||e.pause(),this.currentStream.playing=!1):((t=this.audioElement)==null||t.play().catch(console.error),this.currentStream.playing=!0))}addMediaTexture(e,t,n,i,r){const o=`${e}_${t}`;this.removeMediaTexture(e,t);const a=document.createElement("iframe");a.src=n,a.style.cssText=`
      position: absolute;
      width: ${i}px; height: ${r}px;
      border: none; pointer-events: auto;
      background: black;
    `,a.allow="autoplay; encrypted-media",a.setAttribute("sandbox","allow-scripts allow-same-origin"),this.container.appendChild(a),this.mediaOverlays.set(o,a)}removeMediaTexture(e,t){const n=`${e}_${t}`,i=this.mediaOverlays.get(n);i&&(i.remove(),this.mediaOverlays.delete(n))}updateMediaTexture(e,t,n,i,r,o){const a=`${e}_${t}`,c=this.mediaOverlays.get(a);c&&(c.style.left=`${n}px`,c.style.top=`${i}px`,c.style.width=`${r}px`,c.style.height=`${o}px`)}clearMediaTextures(){this.mediaOverlays.forEach(e=>e.remove()),this.mediaOverlays.clear()}getCurrentStream(){return this.currentStream}showTitleDisplay(e){this.hideTitleDisplay(),this.titleDisplay=document.createElement("div"),this.titleDisplay.style.cssText=`
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      background: rgba(20, 20, 30, 0.9); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 6px; padding: 8px 16px; z-index: 9999;
      font-family: 'Segoe UI', sans-serif; font-size: 12px; color: #e0e0e0;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      display: flex; align-items: center; gap: 8px;
    `;const t=document.createElement("span");t.textContent="🎵",t.style.fontSize="16px",this.titleDisplay.appendChild(t);const n=document.createElement("span");n.textContent=e,this.titleDisplay.appendChild(n);const i=document.createElement("button");i.textContent="×",i.style.cssText="background: none; border: none; color: #888; cursor: pointer; margin-left: 8px;",i.onclick=()=>this.stopStream(),this.titleDisplay.appendChild(i),document.body.appendChild(this.titleDisplay)}hideTitleDisplay(){this.titleDisplay&&(this.titleDisplay.remove(),this.titleDisplay=null)}extractTitleFromUrl(e){try{const t=e.split("/");return t[t.length-1].replace(/\.[^.]+$/,"").replace(/[-_]/g," ")}catch{return"Unknown Stream"}}dispose(){this.stopStream(),this.clearMediaTextures(),this.container.remove(),this.audioContext&&(this.audioContext.close(),this.audioContext=null)}}class K_{constructor(e,t,n){C(this,"scene");C(this,"camera");C(this,"renderer");C(this,"active",!1);C(this,"currentTool","select");C(this,"selectedObject",null);C(this,"gizmoGroup");C(this,"onToolChange");C(this,"onSelectionChange");C(this,"onEditProperty");C(this,"moveGizmo",null);C(this,"rotateGizmo",null);C(this,"scaleGizmo",null);C(this,"_active",!1);this.scene=e,this.camera=t,this.renderer=n,this.gizmoGroup=new qt,this.gizmoGroup.visible=!1,this.scene.add(this.gizmoGroup),this.createGizmos()}setMode(e){this.active=e,e||(this.deselect(),this.gizmoGroup.visible=!1)}isActive(){return this.active}setTool(e){var t;this.currentTool=e,this.updateGizmoVisibility(),(t=this.onToolChange)==null||t.call(this,e)}getTool(){return this.currentTool}selectObject(e,t,n,i){var r;this.selectedObject={objectId:e,localId:t,name:n,position:i.position.clone(),rotation:i.quaternion.clone(),scale:i.scale.clone(),mesh:i},this.gizmoGroup.visible=!0,this.updateGizmoPosition(),this.updateGizmoVisibility(),(r=this.onSelectionChange)==null||r.call(this,this.selectedObject)}deselect(){var e;this.selectedObject=null,this.gizmoGroup.visible=!1,(e=this.onSelectionChange)==null||e.call(this,null)}getSelected(){return this.selectedObject}updatePosition(e){var t;this.selectedObject&&(this.selectedObject.position.copy(e),this.selectedObject.mesh.position.copy(e),this.updateGizmoPosition(),(t=this.onEditProperty)==null||t.call(this,this.selectedObject.objectId,"position",{x:e.x,y:e.y,z:e.z}))}updateRotation(e){var t;this.selectedObject&&(this.selectedObject.rotation.copy(e),this.selectedObject.mesh.quaternion.copy(e),(t=this.onEditProperty)==null||t.call(this,this.selectedObject.objectId,"rotation",{x:e.x,y:e.y,z:e.z,w:e.w}))}updateScale(e){var t;this.selectedObject&&(this.selectedObject.scale.copy(e),this.selectedObject.mesh.scale.copy(e),(t=this.onEditProperty)==null||t.call(this,this.selectedObject.objectId,"scale",{x:e.x,y:e.y,z:e.z}))}handleClick(e,t){var a,c,l,h,u,d,m;if(!this.active)return null;const n=new oe(e/window.innerWidth*2-1,-(t/window.innerHeight)*2+1),i=new pa;i.setFromCamera(n,this.camera);const r=[];this.scene.traverse(g=>{var _;g instanceof ke&&g.visible&&((_=g.userData)!=null&&_.objectId)&&r.push(g)});const o=i.intersectObjects(r,!1);if(o.length>0){const g=o[0].object,_=((a=g.userData)==null?void 0:a.objectId)||((l=(c=g.parent)==null?void 0:c.userData)==null?void 0:l.objectId)||"unknown",p=((h=g.userData)==null?void 0:h.localId)||((d=(u=g.parent)==null?void 0:u.userData)==null?void 0:d.localId)||0,f=g.name||((m=g.parent)==null?void 0:m.name)||"Object";return this.selectObject(_,p,f,g),this.selectedObject}else return this.deselect(),null}setCallbacks(e){this.onToolChange=e.onToolChange,this.onSelectionChange=e.onSelectionChange,this.onEditProperty=e.onEditProperty}createGizmos(){this.moveGizmo=new qt;const e=2,t=[16729156,4521796,4474111],n=[new w(1,0,0),new w(0,1,0),new w(0,0,1)];for(let o=0;o<3;o++){const a=new P0(n[o],new w(0,0,0),e,t[o],.3,.2);this.moveGizmo.add(a)}this.gizmoGroup.add(this.moveGizmo),this.rotateGizmo=new qt;const i=new ka(1.5,1.6,32);for(let o=0;o<3;o++){const a=new ke(i,new Wi({color:t[o],side:tn}));o===0?a.rotation.y=Math.PI/2:o===1&&(a.rotation.x=Math.PI/2),this.rotateGizmo.add(a)}this.gizmoGroup.add(this.rotateGizmo),this.scaleGizmo=new qt;const r=new un(.3,.3,.3);for(let o=0;o<3;o++){const a=new ke(r,new Wi({color:t[o]}));a.position.copy(n[o].multiplyScalar(2)),this.scaleGizmo.add(a);const c=new lh(new et().setFromPoints([new w(0,0,0),n[o].normalize().multiplyScalar(2)]),new Da({color:t[o]}));this.scaleGizmo.add(c)}this.gizmoGroup.add(this.scaleGizmo)}updateGizmoPosition(){this.selectedObject&&this.gizmoGroup.position.copy(this.selectedObject.position)}updateGizmoVisibility(){this.moveGizmo&&(this.moveGizmo.visible=this.currentTool==="move"),this.rotateGizmo&&(this.rotateGizmo.visible=this.currentTool==="rotate"),this.scaleGizmo&&(this.scaleGizmo.visible=this.currentTool==="scale")}toggle(){this._active?(this._active=!1,this.deselect()):this._active=!0}dispose(){this.scene.remove(this.gizmoGroup),this.deselect()}}class J_{constructor(e){C(this,"panel",null);C(this,"data",null);C(this,"onChange");this.onChange=e==null?void 0:e.onChange}show(e){this.hide(),this.data=e,this.panel=document.createElement("div"),this.panel.style.cssText=`
      position:fixed; right:20px; top:80px; width:300px; max-height:70vh;
      background:rgba(20,20,30,0.95); border:1px solid rgba(100,150,255,0.3);
      border-radius:10px; z-index:10000; overflow-y:auto;
      font-family:'Segoe UI',sans-serif; color:#e0e0e0;
      box-shadow:0 8px 32px rgba(0,0,0,0.5);
    `;const t=document.createElement("div");t.style.cssText="padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;";const n=document.createElement("span");n.style.cssText="font-size:13px; font-weight:600;",n.textContent=`🔧 ${e.name||"Object"}`,t.appendChild(n);const i=document.createElement("button");i.textContent="×",i.style.cssText="background:none; border:none; color:#888; font-size:16px; cursor:pointer;",i.onclick=()=>this.hide(),t.appendChild(i),this.panel.appendChild(t);const r=document.createElement("div");r.style.cssText="display:flex; border-bottom:1px solid rgba(255,255,255,0.1);";const o=["General","Features","Texture","Permissions"],a=document.createElement("div");a.style.cssText="padding:10px 14px;";for(const c of o){const l=document.createElement("button");l.textContent=c,l.style.cssText="flex:1; padding:6px; background:none; border:none; border-bottom:2px solid transparent; color:#888; cursor:pointer; font-size:11px;",l.onclick=()=>{r.querySelectorAll("button").forEach(h=>h.style.borderBottomColor="transparent"),l.style.borderBottomColor="rgba(100,150,255,0.8)",l.style.color="#fff",a.innerHTML="",c==="General"?this.renderGeneralTab(a):c==="Features"?this.renderFeaturesTab(a):c==="Texture"?this.renderTextureTab(a):c==="Permissions"&&this.renderPermissionsTab(a)},r.appendChild(l)}this.panel.appendChild(r),a.innerHTML="",this.renderGeneralTab(a),this.panel.appendChild(a),document.body.appendChild(this.panel)}hide(){this.panel&&(this.panel.remove(),this.panel=null)}renderGeneralTab(e){if(!this.data)return;const t=this.data;e.appendChild(this.makeInput("Name",t.name,n=>{var i;return(i=this.onChange)==null?void 0:i.call(this,t.objectId,"name",n)})),e.appendChild(this.makeInput("Description",t.description,n=>{var i;return(i=this.onChange)==null?void 0:i.call(this,t.objectId,"description",n)})),e.appendChild(this.makeVecInput("Position",t.position,n=>{var i;return(i=this.onChange)==null?void 0:i.call(this,t.objectId,"position",n)})),e.appendChild(this.makeVecInput("Scale",t.scale,n=>{var i;return(i=this.onChange)==null?void 0:i.call(this,t.objectId,"scale",n)}))}renderFeaturesTab(e){if(!this.data)return;const t=this.data,n=[{label:"👻 Phantom (no collisions)",key:"phantom",value:t.phantom},{label:"🏋️ Physical (physics enabled)",key:"physical",value:t.physical},{label:"⏱️ Temporary (auto-delete)",key:"temporary",value:t.temporary},{label:"🔍 Volume Detect",key:"volumeDetect",value:t.volumeDetect}];for(const i of n){const r=document.createElement("label");r.style.cssText="display:flex; align-items:center; gap:8px; padding:6px 0; cursor:pointer; font-size:12px;";const o=document.createElement("input");o.type="checkbox",o.checked=i.value,o.onchange=()=>{var a;return(a=this.onChange)==null?void 0:a.call(this,t.objectId,i.key,o.checked)},r.appendChild(o),r.appendChild(document.createTextNode(i.label)),e.appendChild(r)}}renderTextureTab(e){const t=document.createElement("div");t.style.cssText="font-size:12px; color:#888; margin-bottom:8px;",t.textContent="Select a face and choose texture:",e.appendChild(t);const n=document.createElement("div");n.style.cssText="display:flex; gap:4px; flex-wrap:wrap; margin-bottom:10px;";for(let r=0;r<6;r++){const o=document.createElement("button");o.textContent=`Face ${r}`,o.style.cssText="padding:4px 8px; background:rgba(255,255,255,0.08); border:1px solid transparent; border-radius:3px; color:#aaa; cursor:pointer; font-size:10px;",n.appendChild(o)}e.appendChild(n);const i=document.createElement("button");i.textContent="🖼️ Choose Texture File...",i.style.cssText="width:100%; padding:8px; background:rgba(100,150,255,0.2); border:1px solid rgba(100,150,255,0.4); border-radius:4px; color:#ccc; cursor:pointer; font-size:12px;",e.appendChild(i)}renderPermissionsTab(e){if(!this.data)return;const t=["Anyone can copy","Anyone can modify","Anyone can transfer","Group can copy","Group can modify","Group can transfer"];for(const n of t){const i=document.createElement("label");i.style.cssText="display:flex; align-items:center; gap:8px; padding:4px 0; cursor:pointer; font-size:12px;";const r=document.createElement("input");r.type="checkbox",i.appendChild(r),i.appendChild(document.createTextNode(n)),e.appendChild(i)}}makeInput(e,t,n){const i=document.createElement("div");i.style.cssText="margin-bottom:8px;";const r=document.createElement("div");r.style.cssText="font-size:11px; color:#888; margin-bottom:3px;",r.textContent=e,i.appendChild(r);const o=document.createElement("input");return o.value=t,o.oninput=()=>n(o.value),o.style.cssText="width:100%; padding:5px 8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:3px; color:#fff; font-size:12px; outline:none; box-sizing:border-box;",i.appendChild(o),i}makeVecInput(e,t,n){const i=document.createElement("div");i.style.cssText="margin-bottom:8px;";const r=document.createElement("div");r.style.cssText="font-size:11px; color:#888; margin-bottom:3px;",r.textContent=e,i.appendChild(r);const o=document.createElement("div");o.style.cssText="display:flex; gap:4px;";const a=[t.x,t.y,t.z],c=["X","Y","Z"];for(let l=0;l<3;l++){const h=document.createElement("input");h.value=a[l].toFixed(2),h.style.cssText="width:80px; padding:4px 6px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:3px; color:#fff; font-size:11px; outline:none;";const u=document.createElement("span");u.style.cssText="font-size:10px; color:#666; line-height:24px;",u.textContent=c[l],o.appendChild(u),o.appendChild(h)}return i.appendChild(o),i}dispose(){this.hide()}}class Q_{constructor(e){C(this,"panel",null);C(this,"parcelInfo",null);C(this,"terraformMode",!1);C(this,"brushSize",4);C(this,"brushStrength",.5);C(this,"onAction");this.onAction=e==null?void 0:e.onAction}toggle(){this.panel?this.hide():this.show()}show(){this.panel||(this.panel=document.createElement("div"),this.panel.style.cssText=`
      position: fixed; left: 20px; bottom: 20px; width: 340px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px; z-index: 9999; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px);
    `,this.refresh(),document.body.appendChild(this.panel))}hide(){this.panel&&(this.panel.remove(),this.panel=null)}updateParcelInfo(e){this.parcelInfo=e,this.refresh()}toggleTerraform(){var e;this.terraformMode=!this.terraformMode,(e=this.onAction)==null||e.call(this,"terraform",{enabled:this.terraformMode,brushSize:this.brushSize,strength:this.brushStrength}),this.refresh()}refresh(){var o;if(!this.panel)return;this.panel.innerHTML="";const e=document.createElement("div");e.style.cssText="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const t=document.createElement("span");t.style.cssText="font-size: 13px; font-weight: 600;",t.textContent="🏠 Land Tools",e.appendChild(t);const n=document.createElement("button");if(n.textContent="×",n.style.cssText="background: none; border: none; color: #888; font-size: 16px; cursor: pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e),this.parcelInfo){const a=document.createElement("div");a.style.cssText="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.05);";const c=document.createElement("div");if(c.style.cssText="font-size: 13px; font-weight: 500; margin-bottom: 4px;",c.textContent=this.parcelInfo.name||"Unnamed Parcel",a.appendChild(c),this.parcelInfo.ownerName){const h=document.createElement("div");h.style.cssText="font-size: 11px; color: #888;",h.textContent=`Owner: ${this.parcelInfo.ownerName}`,a.appendChild(h)}const l=document.createElement("div");if(l.style.cssText="font-size: 11px; color: #666; margin-top: 4px;",l.textContent=`Area: ${this.parcelInfo.area}m² | Prims: ${this.parcelInfo.prims||0}/${this.parcelInfo.maxPrims||0}`,a.appendChild(l),this.parcelInfo.forSale){const h=document.createElement("div");h.style.cssText="font-size: 11px; color: #4CAF50; margin-top: 4px;",h.textContent=`For Sale: $${this.parcelInfo.salePrice}`,a.appendChild(h)}this.panel.appendChild(a)}const i=document.createElement("div");i.style.cssText="padding: 10px 14px; display: flex; flex-wrap: wrap; gap: 6px;";const r=[{label:"🗺️ Buy",action:"buy",disabled:!((o=this.parcelInfo)!=null&&o.forSale)},{label:"💰 Sell",action:"sell"},{label:"✂️ Subdivide",action:"subdivide"},{label:"🔗 Join",action:"join"},{label:"📍 Set Home",action:"setHome"},{label:"⛰️ Terraform",action:"terraform",active:this.terraformMode},{label:"👥 Access",action:"access"},{label:"🚫 Ban",action:"ban"}];for(const a of r){const c=document.createElement("button");c.textContent=a.label,c.style.cssText=`
        padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${a.active?"rgba(100,150,255,0.3)":"rgba(255,255,255,0.08)"};
        border: 1px solid ${a.active?"rgba(100,150,255,0.5)":"rgba(255,255,255,0.15)"};
        color: ${a.disabled?"#555":"#ccc"};
        ${a.disabled?"cursor: not-allowed;":""}
      `,a.disabled||(c.onclick=()=>{var l;a.action==="terraform"?this.toggleTerraform():(l=this.onAction)==null||l.call(this,a.action)}),i.appendChild(c)}if(this.panel.appendChild(i),this.terraformMode){const a=document.createElement("div");a.style.cssText="padding: 10px 14px; border-top: 1px solid rgba(255,255,255,0.1);";const c=document.createElement("div");c.style.cssText="font-size: 11px; color: #888; margin-bottom: 4px;",c.textContent=`Brush Size: ${this.brushSize}`,a.appendChild(c);const l=document.createElement("input");l.type="range",l.min="1",l.max="16",l.value=String(this.brushSize),l.style.cssText="width: 100%; height: 4px; -webkit-appearance: none; appearance: none; background: rgba(255,255,255,0.15); border-radius: 2px;",l.oninput=()=>{this.brushSize=Number(l.value),c.textContent=`Brush Size: ${this.brushSize}`},a.appendChild(l);const h=document.createElement("div");h.style.cssText="font-size: 11px; color: #888; margin-top: 8px; margin-bottom: 4px;",h.textContent=`Strength: ${(this.brushStrength*100).toFixed(0)}%`,a.appendChild(h);const u=document.createElement("input");u.type="range",u.min="0",u.max="100",u.value=String(this.brushStrength*100),u.style.cssText="width: 100%; height: 4px; -webkit-appearance: none; appearance: none; background: rgba(255,255,255,0.15); border-radius: 2px;",u.oninput=()=>{this.brushStrength=Number(u.value)/100,h.textContent=`Strength: ${(this.brushStrength*100).toFixed(0)}%`},a.appendChild(u),this.panel.appendChild(a)}}dispose(){this.hide()}}class ex{constructor(e){C(this,"panel",null);C(this,"canvas",null);C(this,"ctx",null);C(this,"regions",[]);C(this,"parcels",[]);C(this,"scale",1);C(this,"offsetX",0);C(this,"offsetY",0);C(this,"isDragging",!1);C(this,"lastMouse",{x:0,y:0});C(this,"onTeleport");this.onTeleport=e==null?void 0:e.onTeleport}toggle(){this.panel?this.hide():this.show()}show(){if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 700px; height: 500px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 10px; z-index: 10000; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
    `;const e=document.createElement("div");e.style.cssText="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const t=document.createElement("span");t.style.cssText="font-size: 14px; font-weight: 600;",t.textContent="🗺️ World Map",e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background: none; border: none; color: #888; font-size: 18px; cursor: pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e),this.canvas=document.createElement("canvas"),this.canvas.width=680,this.canvas.height=420,this.canvas.style.cssText="flex: 1; cursor: grab; background: #0a0a12;",this.ctx=this.canvas.getContext("2d"),this.canvas.onmousedown=r=>{this.isDragging=!0,this.lastMouse={x:r.clientX,y:r.clientY},this.canvas.style.cursor="grabbing"},this.canvas.onmousemove=r=>{this.isDragging&&(this.offsetX+=r.clientX-this.lastMouse.x,this.offsetY+=r.clientY-this.lastMouse.y,this.lastMouse={x:r.clientX,y:r.clientY},this.draw())},this.canvas.onmouseup=()=>{this.isDragging=!1,this.canvas.style.cursor="grab"},this.canvas.onmouseleave=()=>{this.isDragging=!1,this.canvas.style.cursor="grab"},this.canvas.onwheel=r=>{r.preventDefault();const o=r.deltaY>0?.9:1.1;this.scale=Math.max(.3,Math.min(5,this.scale*o)),this.draw()},this.canvas.onclick=r=>{this.isDragging||this.handleClick(r)},this.panel.appendChild(this.canvas);const i=document.createElement("div");i.style.cssText="padding: 6px 16px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #666;",i.textContent=`${this.regions.length} regions | Scroll to zoom, drag to pan, click to teleport`,this.panel.appendChild(i),document.body.appendChild(this.panel),this.draw()}hide(){this.panel&&(this.panel.remove(),this.panel=null)}setRegions(e){this.regions=e,this.draw()}setParcels(e){this.parcels=e,this.draw()}draw(){if(!this.ctx||!this.canvas)return;const e=this.ctx,t=this.canvas.width,n=this.canvas.height;e.clearRect(0,0,t,n),e.fillStyle="#0a0a12",e.fillRect(0,0,t,n),e.save(),e.translate(t/2+this.offsetX,n/2+this.offsetY),e.scale(this.scale,this.scale);const i=256,r=50;e.strokeStyle="rgba(40, 40, 60, 0.5)",e.lineWidth=.5/this.scale;for(let o=-r;o<=r;o++)e.beginPath(),e.moveTo(o*i,-r*i),e.lineTo(o*i,r*i),e.stroke();for(let o=-r;o<=r;o++)e.beginPath(),e.moveTo(-r*i,o*i),e.lineTo(r*i,o*i),e.stroke();for(const o of this.parcels)e.fillStyle=o.color||"rgba(100, 150, 255, 0.2)",e.fillRect(o.x*i,o.y*i,o.width*i,o.height*i),e.strokeStyle="rgba(255, 255, 255, 0.3)",e.strokeRect(o.x*i,o.y*i,o.width*i,o.height*i);for(const o of this.regions){const a=o.x*i,c=o.y*i;o.access==="offline"?e.fillStyle="rgba(80, 40, 40, 0.6)":o.access==="locked"?e.fillStyle="rgba(120, 100, 40, 0.6)":e.fillStyle="rgba(40, 80, 40, 0.6)",e.fillRect(a+1,c+1,i-2,i-2),e.strokeStyle=o.access==="offline"?"#663333":"#336633",e.lineWidth=1/this.scale,e.strokeRect(a+1,c+1,i-2,i-2),this.scale>.6&&(e.fillStyle="#ccc",e.font=`${Math.max(8,12/this.scale)}px Segoe UI`,e.textAlign="center",e.fillText(o.name,a+i/2,c+i/2+4))}e.restore()}handleClick(e){var u;if(!this.canvas)return;const t=this.canvas.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top,r=(n-this.canvas.width/2-this.offsetX)/this.scale,o=(i-this.canvas.height/2-this.offsetY)/this.scale,a=256,c=Math.floor(r/a),l=Math.floor(o/a),h=this.regions.find(d=>d.x===c&&d.y===l);h&&h.access!=="offline"&&((u=this.onTeleport)==null||u.call(this,h.id,c*a,l*a))}dispose(){this.hide()}}class tx{constructor(e){C(this,"panel",null);C(this,"currentNotecard",null);C(this,"textarea",null);C(this,"onSave");C(this,"onLoad");this.onSave=e==null?void 0:e.onSave,this.onLoad=e==null?void 0:e.onLoad}toggle(){this.panel?this.hide():this.show()}show(){var l,h;if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 550px; height: 420px;
      background: rgba(20, 20, 30, 0.95); border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 10px; z-index: 10000; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
    `;const e=document.createElement("div");e.style.cssText="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const t=document.createElement("span");t.style.cssText="font-size: 14px; font-weight: 600;",t.textContent=`📝 ${((l=this.currentNotecard)==null?void 0:l.name)||"Notecard"}`,e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background: none; border: none; color: #888; font-size: 18px; cursor: pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e),this.textarea=document.createElement("textarea"),this.textarea.value=((h=this.currentNotecard)==null?void 0:h.content)||"",this.textarea.placeholder="Type your notecard content here...",this.textarea.style.cssText=`
      flex: 1; margin: 0; padding: 12px 16px;
      background: rgba(255,255,255,0.05); border: none; outline: none;
      color: #e0e0e0; font-family: 'Consolas', 'Courier New', monospace; font-size: 13px;
      resize: none; line-height: 1.5;
    `,this.textarea.oninput=()=>{this.currentNotecard&&(this.currentNotecard.modified=!0,this.currentNotecard.content=this.textarea.value,this.updateTitle())},this.panel.appendChild(this.textarea);const i=document.createElement("div");i.style.cssText="padding: 10px 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const r=document.createElement("span");r.style.cssText="font-size: 11px; color: #666;",r.textContent=`${this.textarea.value.length} chars`,this.textarea.oninput=()=>{r.textContent=`${this.textarea.value.length} chars`},i.appendChild(r);const o=document.createElement("div");o.style.cssText="display: flex; gap: 8px;";const a=document.createElement("button");a.textContent="Cancel",a.style.cssText="padding: 6px 14px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #ccc; cursor: pointer; font-size: 12px;",a.onclick=()=>this.hide(),o.appendChild(a);const c=document.createElement("button");c.textContent="💾 Save",c.style.cssText="padding: 6px 14px; background: rgba(100,150,255,0.3); border: 1px solid rgba(100,150,255,0.5); border-radius: 4px; color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",c.onclick=()=>{this.currentNotecard&&this.onSave&&(this.onSave(this.currentNotecard.id,this.textarea.value),this.currentNotecard.modified=!1,this.updateTitle())},o.appendChild(c),i.appendChild(o),this.panel.appendChild(i),document.body.appendChild(this.panel),this.textarea.focus()}hide(){this.panel&&(this.panel.remove(),this.panel=null)}openNotecard(e,t,n){this.currentNotecard={id:e,name:t,content:n,modified:!1},this.show()}updateContent(e,t){var n;((n=this.currentNotecard)==null?void 0:n.id)===e&&(this.currentNotecard.content=t,this.currentNotecard.modified=!1,this.textarea&&(this.textarea.value=t))}updateTitle(){var t;const e=(t=this.panel)==null?void 0:t.querySelector("span");if(e&&this.currentNotecard){const n=this.currentNotecard.modified?"● ":"";e.textContent=`${n}📝 ${this.currentNotecard.name}`}}dispose(){this.hide()}}class nx{constructor(e){C(this,"panel",null);C(this,"renderer",null);C(this,"camera",null);C(this,"scene",null);C(this,"options",{angle:"custom",format:"png",quality:90,resolution:"current",title:"",description:"",visibility:"public",maturity:"general"});C(this,"onCapture");C(this,"feedUrl","https://apps.easierit.org/igrid/feed/api/v1/snapshots/upload.php");this.onCapture=e==null?void 0:e.onCapture}setRenderer(e,t,n){this.renderer=e,this.camera=t,this.scene=n}toggle(){this.panel?this.hide():this.show()}show(){if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 380px; background: rgba(20, 20, 30, 0.95);
      border: 1px solid rgba(100, 150, 255, 0.3); border-radius: 10px;
      z-index: 10000; display: flex; flex-direction: column;
      font-family: 'Segoe UI', sans-serif; color: #e0e0e0;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);
    `;const e=document.createElement("div");e.style.cssText="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;";const t=document.createElement("span");t.style.cssText="font-size: 14px; font-weight: 600;",t.textContent="📸 Snapshot",e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background: none; border: none; color: #888; font-size: 18px; cursor: pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e);const i=document.createElement("div");i.style.cssText="padding: 12px 16px; display: flex; flex-direction: column; gap: 10px;",i.appendChild(this.createInput("Title","text",this.options.title,_=>this.options.title=_)),i.appendChild(this.createInput("Description","text",this.options.description,_=>this.options.description=_));const r=document.createElement("div");r.style.cssText="display: flex; gap: 6px;";const o=["front","back","top","custom"];for(const _ of o){const p=document.createElement("button");p.textContent=_.charAt(0).toUpperCase()+_.slice(1),p.style.cssText=`
        flex: 1; padding: 5px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${_===this.options.angle?"rgba(100,150,255,0.3)":"rgba(255,255,255,0.08)"};
        border: 1px solid ${_===this.options.angle?"rgba(100,150,255,0.5)":"transparent"};
        color: ${_===this.options.angle?"#fff":"#888"};
      `,p.onclick=()=>{this.options.angle=_,this.refresh()},r.appendChild(p)}const a=document.createElement("div");a.style.cssText="font-size: 11px; color: #888; margin-bottom: 4px;",a.textContent="Camera Angle",i.appendChild(a),i.appendChild(r);const c=document.createElement("div");c.style.cssText="display: flex; gap: 6px;";const l=["png","jpeg","webp"];for(const _ of l){const p=document.createElement("button");p.textContent=_.toUpperCase(),p.style.cssText=`
        flex: 1; padding: 5px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${_===this.options.format?"rgba(100,150,255,0.3)":"rgba(255,255,255,0.08)"};
        border: 1px solid ${_===this.options.format?"rgba(100,150,255,0.5)":"transparent"};
        color: ${_===this.options.format?"#fff":"#888"};
      `,p.onclick=()=>{this.options.format=_,this.refresh()},c.appendChild(p)}const h=document.createElement("div");h.style.cssText="font-size: 11px; color: #888; margin-bottom: 4px;",h.textContent="Format",i.appendChild(h),i.appendChild(c);const u=document.createElement("div");u.style.cssText="display: flex; gap: 6px;";for(const _ of["public","unlisted"]){const p=document.createElement("button");p.textContent=_==="public"?"🌍 Public":"🔗 Unlisted",p.style.cssText=`
        flex: 1; padding: 5px; border-radius: 4px; font-size: 11px; cursor: pointer;
        background: ${_===this.options.visibility?"rgba(100,150,255,0.3)":"rgba(255,255,255,0.08)"};
        border: 1px solid ${_===this.options.visibility?"rgba(100,150,255,0.5)":"transparent"};
        color: ${_===this.options.visibility?"#fff":"#888"};
      `,p.onclick=()=>{this.options.visibility=_,this.refresh()},u.appendChild(p)}const d=document.createElement("div");d.style.cssText="font-size: 11px; color: #888; margin-bottom: 4px;",d.textContent="Visibility",i.appendChild(d),i.appendChild(u),this.panel.appendChild(i);const m=document.createElement("div");m.style.cssText="padding: 10px 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px; justify-content: flex-end;";const g=document.createElement("button");g.textContent="📸 Capture & Upload",g.style.cssText="padding: 8px 18px; background: rgba(100,150,255,0.3); border: 1px solid rgba(100,150,255,0.5); border-radius: 4px; color: #fff; cursor: pointer; font-size: 13px; font-weight: 500;",g.onclick=()=>this.capture(),m.appendChild(g),this.panel.appendChild(m),document.body.appendChild(this.panel)}hide(){this.panel&&(this.panel.remove(),this.panel=null)}createInput(e,t,n,i){const r=document.createElement("div"),o=document.createElement("div");o.style.cssText="font-size: 11px; color: #888; margin-bottom: 4px;",o.textContent=e,r.appendChild(o);const a=document.createElement("input");return a.type=t,a.value=n,a.style.cssText=`
      width: 100%; padding: 6px 10px; background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
      color: #fff; font-size: 12px; outline: none; box-sizing: border-box;
    `,a.oninput=()=>i(a.value),r.appendChild(a),r}async capture(){var n;if(!this.renderer||!this.camera||!this.scene){alert("3D renderer not initialized");return}this.applyCameraAngle(),this.renderer.render(this.scene,this.camera);const e=this.options.format==="jpeg"?"image/jpeg":this.options.format==="webp"?"image/webp":"image/png",t=this.renderer.domElement.toDataURL(e,this.options.quality/100);(n=this.onCapture)==null||n.call(this,t,this.options)}applyCameraAngle(){if(!this.camera)return;this.camera.position.clone();const e=new w;switch(this.camera.getWorldDirection(e),this.options.angle){case"front":this.camera.position.set(0,2,10),this.camera.lookAt(0,1,0);break;case"back":this.camera.position.set(0,2,-10),this.camera.lookAt(0,1,0);break;case"top":this.camera.position.set(0,15,0),this.camera.lookAt(0,0,0);break}}async uploadToFeed(e,t,n){try{const i={image:e,title:t.title||"Untitled Snapshot",description:t.description,visibility:t.visibility,maturity:t.maturity,avatar_name:n.avatarName,grid_name:n.gridName,region_name:n.regionName,position:n.position,viewer_ver:"I-Grid Viewer v2.0"},o=await(await fetch(this.feedUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).json();return{success:o.success||!1,postUrl:o.post_url,message:o.message}}catch(i){return{success:!1,message:i instanceof Error?i.message:"Upload failed"}}}refresh(){this.panel&&(this.hide(),this.show())}dispose(){this.hide()}}const ix=[/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/],sx=[/giphy\.com\/gifs\/([a-zA-Z0-9]+)/,/media\.giphy\.com\/media\/([a-zA-Z0-9]+)/,/i\.giphy\.com\/([a-zA-Z0-9]+)/];class rx{constructor(){C(this,"youtubePlayerBase","https://apps.easierit.org/igrid/youtube-player/")}parseMessage(e){const t=[];let n=e;for(const i of ix){const r=e.match(i);if(r){const o=r[1];t.push({type:"youtube",url:r[0],videoId:o,thumbnailUrl:`https://img.youtube.com/vi/${o}/mqdefault.jpg`,embedUrl:`${this.youtubePlayerBase}?v=${o}`}),n=n.replace(r[0],"").trim()}}for(const i of sx){const r=e.match(i);if(r){const o=r[1];t.push({type:"giphy",url:r[0],gifId:o,thumbnailUrl:`https://media.giphy.com/media/${o}/giphy.gif`,embedUrl:`https://media.giphy.com/media/${o}/giphy.gif`}),n=n.replace(r[0],"").trim()}}return{text:n,media:t}}createMediaElements(e){const t=[];for(const n of e){if(n.type==="youtube"&&n.videoId){const i=document.createElement("div");i.style.cssText=`
          margin: 4px 0; border-radius: 6px; overflow: hidden;
          max-width: 320px; background: #000; position: relative;
          cursor: pointer;
        `;const r=document.createElement("img");r.src=n.thumbnailUrl||"",r.style.cssText="width: 100%; display: block;",r.onerror=()=>{r.style.display="none",o.style.display="flex"},i.appendChild(r);const o=document.createElement("div");o.style.cssText=`
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 48px; height: 48px; background: rgba(0,0,0,0.7);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: white;
        `,o.textContent="▶",i.appendChild(o),i.onclick=()=>{const c=this.createFullscreenOverlay(n.embedUrl||`https://www.youtube.com/embed/${n.videoId}`);document.body.appendChild(c)};const a=document.createElement("div");a.style.cssText="padding: 4px 8px; font-size: 10px; color: #888; background: rgba(0,0,0,0.5);",a.textContent="▶ YouTube Video",i.appendChild(a),t.push(i)}if(n.type==="giphy"&&n.embedUrl){const i=document.createElement("div");i.style.cssText=`
          margin: 4px 0; border-radius: 6px; overflow: hidden;
          max-width: 320px; background: #000;
        `;const r=document.createElement("img");r.src=n.embedUrl,r.style.cssText="width: 100%; display: block; border-radius: 6px;",r.loading="lazy",r.onerror=()=>{r.alt="GIF failed to load",r.style.padding="20px",r.style.textAlign="center"},i.appendChild(r);const o=document.createElement("div");o.style.cssText="padding: 4px 8px; font-size: 10px; color: #888; background: rgba(0,0,0,0.5);",o.textContent="🎞️ GIPHY",i.appendChild(o),t.push(i)}}return t}createFullscreenOverlay(e){const t=document.createElement("div");t.style.cssText=`
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.9); z-index: 99999;
      display: flex; align-items: center; justify-content: center;
    `;const n=document.createElement("iframe");n.src=e,n.style.cssText="width: 80%; height: 80%; border: none; border-radius: 8px;",n.allow="autoplay; encrypted-media; fullscreen",t.appendChild(n);const i=document.createElement("button");return i.textContent="×",i.style.cssText=`
      position: absolute; top: 20px; right: 20px;
      background: rgba(255,255,255,0.2); border: none; color: white;
      font-size: 24px; width: 40px; height: 40px; border-radius: 50%;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
    `,i.onclick=()=>t.remove(),t.appendChild(i),t.onclick=r=>{r.target===t&&t.remove()},t}dispose(){}}const ox=new Set(["state","default","if","else","for","while","do","switch","case","break","continue","return","jump","def","true","false","integer","float","string","key","vector","rotation","quaternion","list","default","on","touch"]),ax=new Set(["integer","float","string","key","vector","rotation","quaternion","list","void","TRUE","FALSE"]),cx=new Set(["state_entry","state_exit","touch_start","touch","touch_end","timer","listen","sensor","no_sensor","collision_start","collision","collision_end","rez","money","email","http_request","http_response","http_redirect","at_target","not_at_target","at_rot_target","not_at_rot_target","run_time_permissions","changed","attach","dataserver","link_message","link_set","link_color","link_brightness","link_texture","moving_start","moving_end","object_rez","remote_data","control","experience_permissions","experience_permissions_denied","land_collide"]),lx=new Set(["llNULLKEY","ALL_SIDES","TEXTURE_WHITE","TEXTURE_TRANSPARENT","AGENT","ACTIVE","PASSIVE","SCRIPTED","PHYSICS","ANIM","CHILDREN","SIT_POINT","LAND","REGION","MEDIA_PERM_INTERACT","MEDIA_PERM_CONTROL","AGENT_BY_LEGACY_NAME","AGENT_BY_KEY","ACTIVE_NEARBY","ZERO_VECTOR","ZERO_ROTATION","PI","TWO_PI","HALF_PI","DEG_TO_RAD","RAD_TO_DEG","COLOR_WHITE","COLOR_BLACK","COLOR_RED","COLOR_GREEN","COLOR_BLUE"]);function hx(s){const e=[];let t=0;for(;t<s.length;){if(s[t]==="/"&&s[t+1]==="/"){let n=s.indexOf(`
`,t);n===-1&&(n=s.length),e.push({text:s.slice(t,n),type:"comment"}),t=n;continue}if(s[t]==="/"&&s[t+1]==="*"){let n=s.indexOf("*/",t+2);n===-1?n=s.length:n+=2,e.push({text:s.slice(t,n),type:"comment"}),t=n;continue}if(s[t]==='"'){let n=t+1;for(;n<s.length&&s[n]!=='"';)s[n]==="\\"&&n++,n++;n=Math.min(n+1,s.length),e.push({text:s.slice(t,n),type:"string"}),t=n;continue}if(/[0-9]/.test(s[t])||s[t]==="."&&t+1<s.length&&/[0-9]/.test(s[t+1])){let n=t;for(;n<s.length&&/[0-9.xXa-fA-F]/.test(s[n]);)n++;e.push({text:s.slice(t,n),type:"number"}),t=n;continue}if(/[a-zA-Z_]/.test(s[t])){let n=t;for(;n<s.length&&/[a-zA-Z_0-9]/.test(s[n]);)n++;const i=s.slice(t,n);let r="normal";cx.has(i)?r="event":ax.has(i)?r="type":ox.has(i)?r="keyword":lx.has(i)&&(r="constant"),e.push({text:i,type:r}),t=n;continue}e.push({text:s[t],type:"normal"}),t++}return e}const ux={keyword:"#ff79c6",event:"#50fa7b",type:"#8be9fd",string:"#f1fa8c",comment:"#6272a4",constant:"#bd93f9",number:"#ffb86c",normal:"#f8f8f2"};class dx{constructor(e){C(this,"panel",null);C(this,"highlightedEl",null);C(this,"textareaEl",null);C(this,"currentScript",null);C(this,"consoleEl",null);C(this,"onSave");C(this,"onCompile");C(this,"onToggleRunning");C(this,"showConsole",!1);this.onSave=e==null?void 0:e.onSave,this.onCompile=e==null?void 0:e.onCompile,this.onToggleRunning=e==null?void 0:e.onToggleRunning}toggle(){this.panel?this.hide():this.show()}show(){var d,m,g,_,p;if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position:fixed; left:50%; top:50%; transform:translate(-50%,-50%);
      width:700px; height:500px; display:flex; flex-direction:column;
      background:rgba(20,20,30,0.95); border:1px solid rgba(100,150,255,0.3);
      border-radius:10px; z-index:10000; font-family:'Segoe UI',sans-serif; color:#e0e0e0;
      box-shadow:0 12px 48px rgba(0,0,0,0.6); backdrop-filter:blur(12px);
    `;const e=document.createElement("div");e.style.cssText="padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;";const t=document.createElement("span");t.style.cssText="font-size:13px; font-weight:600;",t.textContent="📝 "+(((d=this.currentScript)==null?void 0:d.name)||"LSL Script"),e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background:none; border:none; color:#888; font-size:18px; cursor:pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e);const i=document.createElement("div");i.style.cssText='flex:1; position:relative; overflow:hidden; font-family:Consolas,"Courier New",monospace; font-size:12px; line-height:1.5;',this.highlightedEl=document.createElement("pre"),this.highlightedEl.style.cssText=`
      position:absolute; top:0; left:0; right:0; bottom:0;
      margin:0; padding:10px 14px; overflow:auto;
      pointer-events:none; white-space:pre-wrap; word-wrap:break-word; color:#f8f8f2;
      background:transparent;
    `,i.appendChild(this.highlightedEl),this.textareaEl=document.createElement("textarea"),this.textareaEl.value=((m=this.currentScript)==null?void 0:m.content)||"",this.textareaEl.spellcheck=!1,this.textareaEl.style.cssText=`
      position:absolute; top:0; left:0; width:100%; height:100%;
      margin:0; padding:10px 14px; border:none; outline:none; resize:none;
      background:rgba(30,30,42,0.95); color:transparent; caret-color:#f8f8f2;
      font-family:Consolas,"Courier New",monospace; font-size:12px; line-height:1.5;
      white-space:pre-wrap; word-wrap:break-word; box-sizing:border-box;
    `,this.textareaEl.oninput=()=>this.updateHighlight(),this.textareaEl.onscroll=()=>{this.highlightedEl&&(this.highlightedEl.scrollTop=this.textareaEl.scrollTop,this.highlightedEl.scrollLeft=this.textareaEl.scrollLeft)},this.textareaEl.onkeydown=f=>{if(f.key==="Tab"){f.preventDefault();const E=this.textareaEl.selectionStart,M=this.textareaEl.selectionEnd;this.textareaEl.value=this.textareaEl.value.substring(0,E)+"    "+this.textareaEl.value.substring(M),this.textareaEl.selectionStart=this.textareaEl.selectionEnd=E+4,this.updateHighlight()}(f.ctrlKey||f.metaKey)&&f.key==="s"&&(f.preventDefault(),this.saveScript())},i.appendChild(this.textareaEl),this.panel.appendChild(i),this.updateHighlight(),this.consoleEl=document.createElement("div"),this.consoleEl.style.cssText=`
      height:100px; border-top:1px solid rgba(255,255,255,0.1);
      background:rgba(10,10,16,0.9); overflow-y:auto; padding:6px 10px;
      font-family:Consolas,"Courier New",monospace; font-size:11px; color:#888;
      display:none;
    `,this.panel.appendChild(this.consoleEl);const r=document.createElement("div");r.style.cssText="padding:8px 14px; border-top:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;";const o=document.createElement("div");o.style.cssText="display:flex; gap:6px;";const a=document.createElement("button");a.textContent="📟 Console",a.style.cssText="padding:5px 10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#aaa; cursor:pointer; font-size:11px;",a.onclick=()=>{this.showConsole=!this.showConsole,this.consoleEl.style.display=this.showConsole?"block":"none"},o.appendChild(a);const c=document.createElement("button");c.textContent=(g=this.currentScript)!=null&&g.isRunning?"⏹ Stop":"▶ Run",c.style.cssText=`padding:5px 10px; border-radius:4px; cursor:pointer; font-size:11px; border:1px solid ${(_=this.currentScript)!=null&&_.isRunning?"rgba(255,80,80,0.5)":"rgba(80,255,120,0.5)"}; background:${(p=this.currentScript)!=null&&p.isRunning?"rgba(255,80,80,0.2)":"rgba(80,255,120,0.2)"}; color:#fff;`,c.onclick=()=>{var f;this.currentScript&&(this.currentScript.isRunning=!this.currentScript.isRunning,(f=this.onToggleRunning)==null||f.call(this,this.currentScript.id,this.currentScript.isRunning),c.textContent=this.currentScript.isRunning?"⏹ Stop":"▶ Run",c.style.borderColor=this.currentScript.isRunning?"rgba(255,80,80,0.5)":"rgba(80,255,120,0.5)",c.style.background=this.currentScript.isRunning?"rgba(255,80,80,0.2)":"rgba(80,255,120,0.2)")},o.appendChild(c),r.appendChild(o);const l=document.createElement("div");l.style.cssText="display:flex; gap:6px;";const h=document.createElement("button");h.textContent="🔧 Compile",h.style.cssText="padding:5px 10px; background:rgba(255,180,100,0.2); border:1px solid rgba(255,180,100,0.5); border-radius:4px; color:#fff; cursor:pointer; font-size:11px;",h.onclick=()=>this.saveScript(),l.appendChild(h);const u=document.createElement("button");u.textContent="💾 Save",u.style.cssText="padding:5px 10px; background:rgba(100,150,255,0.3); border:1px solid rgba(100,150,255,0.5); border-radius:4px; color:#fff; cursor:pointer; font-size:11px; font-weight:500;",u.onclick=()=>this.saveScript(),l.appendChild(u),r.appendChild(l),this.panel.appendChild(r),document.body.appendChild(this.panel),this.textareaEl.focus()}hide(){this.panel&&(this.panel.remove(),this.panel=null)}openScript(e,t,n,i){this.currentScript={id:e,name:t,content:n,modified:!1,isRunning:i},this.show()}showCompileResult(e){if(this.consoleEl){if(this.showConsole=!0,this.consoleEl.style.display="block",this.consoleEl.innerHTML="",e.success){const t=document.createElement("div");t.style.cssText="color:#50fa7b; margin-bottom:4px;",t.textContent="✅ Compilation successful!",this.consoleEl.appendChild(t)}for(const t of e.messages){const n=document.createElement("div");n.style.cssText=`color:${t.isError?"#ff5555":"#f1fa8c"}; margin-bottom:2px;`,n.textContent=`${t.isError?"❌":"⚠️"} Line ${t.line}: ${t.message}`,this.consoleEl.appendChild(n)}}}updateHighlight(){if(!this.highlightedEl||!this.textareaEl)return;const e=this.textareaEl.value,t=hx(e);this.highlightedEl.innerHTML=t.map(n=>n.type==="normal"?El(n.text):`<span style="color:${ux[n.type]}">${El(n.text)}</span>`).join("")}saveScript(){var e;!this.currentScript||!this.textareaEl||(this.currentScript.content=this.textareaEl.value,this.currentScript.modified=!1,(e=this.onSave)==null||e.call(this,this.currentScript.id,this.textareaEl.value,!0))}dispose(){this.hide()}}function El(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}class fx{constructor(e){C(this,"panel",null);C(this,"onUpload");this.onUpload=e==null?void 0:e.onUpload}toggle(){this.panel?this.hide():this.show()}show(){if(this.panel)return;this.panel=document.createElement("div"),this.panel.style.cssText=`
      position:fixed; left:50%; top:50%; transform:translate(-50%,-50%);
      width:400px; background:rgba(20,20,30,0.95);
      border:1px solid rgba(100,150,255,0.3); border-radius:10px;
      z-index:10000; font-family:'Segoe UI',sans-serif; color:#e0e0e0;
      box-shadow:0 12px 48px rgba(0,0,0,0.6); backdrop-filter:blur(12px);
    `;const e=document.createElement("div");e.style.cssText="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;";const t=document.createElement("span");t.style.cssText="font-size:14px; font-weight:600;",t.textContent="📤 Upload Asset",e.appendChild(t);const n=document.createElement("button");n.textContent="×",n.style.cssText="background:none; border:none; color:#888; font-size:18px; cursor:pointer;",n.onclick=()=>this.hide(),e.appendChild(n),this.panel.appendChild(e);const i=document.createElement("div");i.style.cssText="padding:14px 16px; display:flex; flex-direction:column; gap:10px;";const r=document.createElement("div");r.style.cssText="font-size:11px; color:#888; margin-bottom:2px;",r.textContent="Asset Type",i.appendChild(r);const o=document.createElement("div");o.style.cssText="display:flex; gap:6px;";const a=[{key:"texture",label:"🖼️ Texture"},{key:"sound",label:"🔊 Sound"},{key:"animation",label:"🎬 Anim"},{key:"mesh",label:"🧊 Mesh"}];let c="texture";const l=[];for(const v of a){const D=document.createElement("button");D.textContent=v.label,D.style.cssText=`
        flex:1; padding:6px; border-radius:4px; font-size:11px; cursor:pointer;
        background:${v.key===c?"rgba(100,150,255,0.3)":"rgba(255,255,255,0.08)"};
        border:1px solid ${v.key===c?"rgba(100,150,255,0.5)":"transparent"};
        color:${v.key===c?"#fff":"#888"};
      `,D.onclick=()=>{c=v.key,l.forEach(A=>{A.style.background="rgba(255,255,255,0.08)",A.style.borderColor="transparent",A.style.color="#888"}),D.style.background="rgba(100,150,255,0.3)",D.style.borderColor="rgba(100,150,255,0.5)",D.style.color="#fff"},l.push(D),o.appendChild(D)}i.appendChild(o);const h=document.createElement("div");h.style.cssText="font-size:11px; color:#888; margin-bottom:2px;",h.textContent="Name",i.appendChild(h);const u=document.createElement("input");u.placeholder="Asset name...",u.style.cssText="width:100%; padding:6px 10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff; font-size:12px; outline:none; box-sizing:border-box;",i.appendChild(u);const d=document.createElement("div");d.style.cssText="font-size:11px; color:#888; margin-bottom:2px; margin-top:4px;",d.textContent="Description (optional)",i.appendChild(d);const m=document.createElement("input");m.placeholder="Description...",m.style.cssText="width:100%; padding:6px 10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:4px; color:#fff; font-size:12px; outline:none; box-sizing:border-box;",i.appendChild(m);const g=document.createElement("div");g.style.cssText="font-size:11px; color:#888; margin-bottom:2px; margin-top:4px;",g.textContent="File",i.appendChild(g);const _=document.createElement("input");_.type="file",_.accept=".png,.jpg,.jpeg,.bmp,.tga,.gif,.wav,.mp3,.ogg,.bvh,.dae,.obj,.fbx",_.style.cssText="width:100%; font-size:12px; color:#aaa;";const p=document.createElement("div");p.style.cssText="padding:10px; border:2px dashed rgba(255,255,255,0.15); border-radius:6px; text-align:center; color:#666; font-size:12px; cursor:pointer;",p.textContent="📁 Click to select file or drag & drop",p.onclick=()=>_.click(),_.onchange=()=>{if(_.files&&_.files.length>0){const v=_.files[0];p.textContent=`📎 ${v.name} (${(v.size/1024).toFixed(1)} KB)`,p.style.color="#ccc",u.value||(u.value=v.name.replace(/\.[^.]+$/,""))}},i.appendChild(_),i.appendChild(p),this.panel.appendChild(i);const f=document.createElement("div");f.style.cssText="padding:10px 16px; border-top:1px solid rgba(255,255,255,0.1); display:flex; justify-content:flex-end; gap:8px;";const E=document.createElement("button");E.textContent="Cancel",E.style.cssText="padding:6px 14px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:4px; color:#ccc; cursor:pointer; font-size:12px;",E.onclick=()=>this.hide(),f.appendChild(E);const M=document.createElement("button");M.textContent="📤 Upload",M.style.cssText="padding:6px 14px; background:rgba(100,150,255,0.3); border:1px solid rgba(100,150,255,0.5); border-radius:4px; color:#fff; cursor:pointer; font-size:12px; font-weight:500;",M.onclick=()=>{var v;_.files&&_.files.length>0&&u.value&&((v=this.onUpload)==null||v.call(this,{type:c,name:u.value,file:_.files[0],description:m.value}),this.hide())},f.appendChild(M),this.panel.appendChild(f),document.body.appendChild(this.panel)}hide(){this.panel&&(this.panel.remove(),this.panel=null)}dispose(){this.hide()}}const Ml="igrid-voice-chat-config",wl={enabled:!1,muted:!0,inputVolume:.8,outputVolume:.8,pushToTalk:!1};class px{constructor(e){C(this,"config");C(this,"panel",null);C(this,"audioContext",null);C(this,"localStream",null);C(this,"peers",new Map);C(this,"audioElements",new Map);C(this,"users",[]);C(this,"panelEl",null);C(this,"statusDot",null);C(this,"onToggle");C(this,"onMute");this.config=this.loadConfig(),this.onToggle=e==null?void 0:e.onToggle,this.onMute=e==null?void 0:e.onMute}get enabled(){return this.config.enabled}get muted(){return this.config.muted}async toggle(){this.config.enabled?await this.disable():await this.enable()}async enable(){var e;if(!this.config.enabled){this.config.enabled=!0,this.config.muted=!1;try{this.audioContext=new AudioContext,this.localStream=await navigator.mediaDevices.getUserMedia({audio:!0,video:!1}),this.updateStatusIndicator(),this.saveConfig(),(e=this.onToggle)==null||e.call(this,!0),console.log("[VoiceChat] Enabled")}catch(t){console.warn("[VoiceChat] Could not access microphone:",t),this.config.enabled=!1,this.config.muted=!0}}}async disable(){var e;this.config.enabled=!1,this.config.muted=!0,this.localStream&&(this.localStream.getTracks().forEach(t=>t.stop()),this.localStream=null),this.peers.forEach(t=>t.close()),this.peers.clear(),this.audioElements.forEach(t=>t.remove()),this.audioElements.clear(),this.audioContext&&(this.audioContext.close(),this.audioContext=null),this.updateStatusIndicator(),this.saveConfig(),(e=this.onToggle)==null||e.call(this,!1),console.log("[VoiceChat] Disabled")}toggleMute(){var e;this.config.enabled&&(this.config.muted=!this.config.muted,this.localStream&&this.localStream.getAudioTracks().forEach(t=>{t.enabled=!this.config.muted}),this.updateStatusIndicator(),this.saveConfig(),(e=this.onMute)==null||e.call(this,this.config.muted))}setInputVolume(e){this.config.inputVolume=Math.max(0,Math.min(1,e)),this.saveConfig()}setOutputVolume(e){this.config.outputVolume=Math.max(0,Math.min(1,e)),this.saveConfig(),this.audioElements.forEach(t=>{t.volume=this.config.outputVolume})}togglePushToTalk(){this.config.pushToTalk=!this.config.pushToTalk,this.saveConfig()}createStatusIndicator(e){this.statusDot=document.createElement("div"),this.statusDot.style.cssText=`
      position:fixed; bottom:20px; right:20px; z-index:9999;
      display:flex; align-items:center; gap:8px; padding:6px 12px;
      background:rgba(20,20,30,0.9); border:1px solid rgba(255,255,255,0.15);
      border-radius:20px; cursor:pointer; font-family:'Segoe UI',sans-serif; font-size:11px;
      transition: all 0.2s;
    `,this.statusDot.onclick=()=>this.toggleSettings();const t=document.createElement("div");t.style.cssText=`width:10px; height:10px; border-radius:50%;
      background:${this.config.enabled?this.config.muted?"#f1fa8c":"#50fa7b":"#ff5555"};
    `,this.statusDot.appendChild(t);const n=document.createElement("span");n.style.cssText="color:#ccc;",n.textContent=this.config.enabled?this.config.muted?"🔇 Muted":"🎙️ Voice On":"🔇 Voice Off",this.statusDot.appendChild(n),e.appendChild(this.statusDot)}toggleSettings(){if(this.panelEl){this.panelEl.remove(),this.panelEl=null;return}this.renderSettingsPanel()}renderSettingsPanel(){this.panelEl=document.createElement("div"),this.panelEl.style.cssText=`
      position:fixed; bottom:60px; right:20px; width:260px; z-index:10000;
      background:rgba(20,20,30,0.95); border:1px solid rgba(100,150,255,0.3);
      border-radius:10px; font-family:'Segoe UI',sans-serif; color:#e0e0e0;
      box-shadow:0 8px 32px rgba(0,0,0,0.5); padding:12px;
    `;const e=document.createElement("div");e.style.cssText="font-size:13px; font-weight:600; margin-bottom:10px;",e.textContent="🎙️ Voice Chat Settings",this.panelEl.appendChild(e);const t=document.createElement("div");t.style.cssText="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.1);";const n=document.createElement("span");n.style.cssText="font-size:12px;",n.textContent=this.config.enabled?"✅ Voice Enabled":"❌ Voice Disabled",t.appendChild(n);const i=document.createElement("button");if(i.textContent=this.config.enabled?"TURN OFF":"TURN ON",i.style.cssText=`
      padding:6px 14px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:600;
      background:${this.config.enabled?"rgba(255,80,80,0.3)":"rgba(80,255,120,0.3)"};
      border:1px solid ${this.config.enabled?"rgba(255,80,80,0.5)":"rgba(80,255,120,0.5)"};
      color:#fff;
    `,i.onclick=async()=>{var r;await this.toggle(),(r=this.panelEl)==null||r.remove(),this.panelEl=null,this.renderSettingsPanel()},t.appendChild(i),this.panelEl.appendChild(t),this.config.enabled){const r=document.createElement("div");r.style.cssText="display:flex; justify-content:space-between; align-items:center; padding:6px 0;",r.appendChild(document.createTextNode("Mute Microphone"));const o=document.createElement("button");o.textContent=this.config.muted?"🔇 Unmute":"🎙️ Mute",o.style.cssText="padding:4px 10px; border-radius:3px; background:rgba(255,255,255,0.1); border:none; color:#ccc; cursor:pointer; font-size:11px;",o.onclick=()=>{var d;this.toggleMute(),(d=this.panelEl)==null||d.remove(),this.panelEl=null,this.renderSettingsPanel()},r.appendChild(o),this.panelEl.appendChild(r);const a=document.createElement("div");a.style.cssText="padding:6px 0;";const c=document.createElement("div");c.style.cssText="font-size:11px; color:#888; margin-bottom:4px;",c.textContent=`Volume: ${Math.round(this.config.outputVolume*100)}%`,a.appendChild(c);const l=document.createElement("input");l.type="range",l.min="0",l.max="100",l.value=String(this.config.outputVolume*100),l.style.cssText="width:100%;",l.oninput=()=>{this.setOutputVolume(Number(l.value)/100),c.textContent=`Volume: ${l.value}%`},a.appendChild(l),this.panelEl.appendChild(a);const h=document.createElement("div");h.style.cssText="display:flex; align-items:center; gap:8px; padding:6px 0;";const u=document.createElement("input");u.type="checkbox",u.checked=this.config.pushToTalk,u.onchange=()=>this.togglePushToTalk(),h.appendChild(u),h.appendChild(document.createTextNode("Push to Talk (Space key)")),this.panelEl.appendChild(h)}if(this.users.length>0){const r=document.createElement("div");r.style.cssText="font-size:11px; color:#888; margin-top:8px; margin-bottom:4px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px;",r.textContent=`Connected (${this.users.length})`,this.panelEl.appendChild(r);for(const o of this.users){const a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:6px; padding:2px 0; font-size:11px;";const c=document.createElement("div");c.style.cssText=`width:6px; height:6px; border-radius:50%; background:${o.speaking?"#50fa7b":o.muted?"#f1fa8c":"#888"};`,a.appendChild(c),a.appendChild(document.createTextNode(`${o.name}${o.muted?" 🔇":""}`)),this.panelEl.appendChild(a)}}document.body.appendChild(this.panelEl)}updateStatusIndicator(){if(!this.statusDot)return;const e=this.statusDot.children[0],t=this.statusDot.children[1];e.style.background=this.config.enabled?this.config.muted?"#f1fa8c":"#50fa7b":"#ff5555",t.textContent=this.config.enabled?this.config.muted?"🔇 Muted":"🎙️ Voice On":"🔇 Voice Off"}loadConfig(){try{const e=localStorage.getItem(Ml);if(e){const t=JSON.parse(e);return{...wl,...t}}}catch{}return{...wl}}saveConfig(){try{localStorage.setItem(Ml,JSON.stringify(this.config))}catch{}}dispose(){var e,t;this.disable(),(e=this.panelEl)==null||e.remove(),(t=this.statusDot)==null||t.remove()}}class bh{constructor(e,t,n,i,r,o,a,c,l,h,u,d,m,g){C(this,"connection");C(this,"hypergridConnection",null);C(this,"terrain");C(this,"objects");C(this,"avatars");C(this,"camera");C(this,"materialLoader");C(this,"soundManager");C(this,"particleManager");C(this,"flexibleRenderer");C(this,"animationSystem");C(this,"attachmentRenderer");C(this,"profilePanel");C(this,"groupPanel");C(this,"interactionManager");C(this,"inventoryPanel");C(this,"appearanceEditor");C(this,"hudRenderer");C(this,"searchPanel");C(this,"mediaManager");C(this,"buildTools");C(this,"landTools");C(this,"worldMap");C(this,"notecardEditor");C(this,"snapshotTools");C(this,"chatMedia");C(this,"scriptEditor");C(this,"uploadTools");C(this,"voiceChat");C(this,"editWindow");C(this,"_connected",!1);this.sceneManager=e,this.authToken=t,this.baseUrl=n,this.onChatMessage=i,this.onPositionUpdate=r,this.onTeleportStarted=o,this.onFriendUpdate=a,this.onIM=c,this.onTerrainPatch=l,this.onRegionConnected=h,this.onParcelInfo=u,this.onBalanceUpdate=d,this.onCurrencySymbol=m,this.onIMHistory=g}get connected(){return this._connected}async init(){const e=()=>new Promise(n=>setTimeout(n,0)),t=n=>{var i;console.log("[Grid]",n),(i=this.onChatMessage)==null||i.call(this,"System",n)};t("Loading material loader..."),this.materialLoader=new F_(this.baseUrl,this.authToken),await e(),t("Loading terrain..."),this.terrain=new __(this.sceneManager.scene,this.baseUrl,this.authToken),await e(),t("Loading object renderer..."),this.objects=new U_(this.sceneManager.scene,this.materialLoader),await e(),this.animationSystem=new H_(this.sceneManager.scene),this.attachmentRenderer=new Wa(this.sceneManager.scene),await e(),t("Loading UI panels..."),this.profilePanel=new G_,this.groupPanel=new W_,await e(),this.interactionManager=new X_(this.sceneManager.scene,this.sceneManager.camera),this.inventoryPanel=new $_({onAction:(n,i)=>this.handleInventoryAction(n,i)}),await e(),this.appearanceEditor=new Y_({onParamChange:(n,i)=>{var r;return(r=this.connection)==null?void 0:r.invoke("SetVisualParam",n,i)},onBake:()=>{var n;return(n=this.connection)==null?void 0:n.invoke("BakeAppearance")}}),this.hudRenderer=new q_(this.sceneManager.scene,this.sceneManager.renderer),await e(),t("Loading tools..."),this.searchPanel=new j_({onSearch:(n,i)=>this.handleSearch(n,i),onResultClick:n=>this.handleSearchResultClick(n)}),this.mediaManager=new Z_,await e(),this.buildTools=new K_(this.sceneManager.scene,this.sceneManager.camera,this.sceneManager.renderer),this.buildTools.setCallbacks({onEditProperty:(n,i,r)=>{var o;return(o=this.connection)==null?void 0:o.invoke("SetObjectProperty",n,i,r)}}),await e(),t("Loading editors..."),this.landTools=new Q_({onAction:(n,i)=>{var r;return(r=this.connection)==null?void 0:r.invoke("LandAction",n,i)}}),this.worldMap=new ex({onTeleport:(n,i,r)=>this.teleport(n)}),await e(),this.notecardEditor=new tx({onSave:(n,i)=>{var r;return(r=this.connection)==null?void 0:r.invoke("SaveNotecard",n,i)}}),this.snapshotTools=new nx({onCapture:(n,i)=>this.handleSnapshot(n,i)}),await e(),this.chatMedia=new rx,this.scriptEditor=new dx({onSave:(n,i,r)=>{var o;return(o=this.connection)==null?void 0:o.invoke("UpdateScript",n,i,r)},onCompile:(n,i)=>{var r;return(r=this.connection)==null?void 0:r.invoke("UpdateScript",n,i,!0)}}),await e(),this.uploadTools=new fx({onUpload:n=>{var i;return(i=this.connection)==null?void 0:i.invoke("UploadAsset",n.type,n.name,n.description||"")}}),this.voiceChat=new px({onToggle:n=>console.log("[Voice]",n?"enabled":"disabled")}),await e(),t("Loading engine..."),this.editWindow=new J_({onChange:(n,i,r)=>{var o;return(o=this.connection)==null?void 0:o.invoke("SetObjectProperty",n,i,r)}}),this.interactionManager.setCallback((n,i)=>{this.handleInteraction(n,i)}),await e(),this.avatars=new N_(this.sceneManager.scene,this.animationSystem,this.attachmentRenderer),this.camera=new p_(this.sceneManager.camera,this.sceneManager.renderer.domElement),await e(),this.soundManager=new O_(this.baseUrl,this.authToken),this.particleManager=new k_(this.sceneManager.scene),this.flexibleRenderer=new B_(this.sceneManager.scene),await e(),t("Connecting SignalR..."),this.connection=new yl().withUrl("/hubs/viewer",{accessTokenFactory:()=>this.authToken}).withAutomaticReconnect().build(),this.setupEventHandlers(this.connection),t("✅ All modules loaded!")}setupEventHandlers(e){e.on("AvatarConnected",t=>{var n,i,r;console.log("[Grid] Connected as:",t.firstName,"in",t.regionName),this._connected=!0,this.camera.setTarget(new w(t.position.x,t.position.z,t.position.y)),(n=this.onRegionConnected)==null||n.call(this,t.regionName,t.regionX,t.regionY),(i=this.onBalanceUpdate)==null||i.call(this,t.balance),(r=this.onCurrencySymbol)==null||r.call(this,t.currencySymbol)}),e.on("ObjectUpdate",t=>{var i,r;const n=(r=(i=this.sceneManager)==null?void 0:i.camera)==null?void 0:r.position;this.objects.updatePrim({id:t.id,name:t.name,position:t.position,rotation:t.rotation,scale:t.scale,primType:t.primType,textureId:t.textureId,faces:t.faces},n).catch(o=>console.warn("[Grid] updatePrim error:",o)),this.soundManager.updateSoundPosition(t.id,{x:t.position.x,y:t.position.z,z:t.position.y})}),e.on("MeshData",async t=>{try{const n=Uint8Array.from(atob(t.data),i=>i.charCodeAt(0));this.objects.replaceMeshGeometry(t.id,n.buffer)}catch(n){console.warn("[Grid] Failed to decode mesh:",n)}}),e.on("AvatarUpdate",async t=>{await this.avatars.updateAvatar({id:t.id,name:t.name,position:t.position,rotation:t.rotation,bakedTextures:t.bakedTextures})}),e.on("TerrainPatch",t=>{var n;if(t.heights){const i=new Float32Array(t.heights);this.terrain.updatePatch(t.x,t.y,i),(n=this.onTerrainPatch)==null||n.call(this,t.x,t.y,i)}}),e.on("ChatMessage",t=>{var n;(n=this.onChatMessage)==null||n.call(this,t.from,t.message)}),e.on("MyPosition",t=>{var n;this.camera.setTarget(new w(t.x,t.z,t.y)),(n=this.onPositionUpdate)==null||n.call(this,t.x,t.y,t.z)}),e.on("TeleportStarted",t=>{var n;console.log("[Grid] Teleport started:",t.destination),(n=this.onTeleportStarted)==null||n.call(this,t.destination,t.gridUri,t.region)}),e.on("FriendUpdate",t=>{var n;(n=this.onFriendUpdate)==null||n.call(this,t.id,t.name,t.online)}),e.on("FriendOnline",t=>{var n;(n=this.onFriendUpdate)==null||n.call(this,t.id,t.name,!0)}),e.on("FriendOffline",t=>{var n;(n=this.onFriendUpdate)==null||n.call(this,t.id,t.name,!1)}),e.on("InstantMessage",t=>{var n;(n=this.onIM)==null||n.call(this,t.from,t.message,t.fromId)}),e.on("IMHistory",t=>{var n;(n=this.onIMHistory)==null||n.call(this,t.otherId,t.otherName,t.messages)}),e.on("ParcelInfo",t=>{var n;(n=this.onParcelInfo)==null||n.call(this,t.name,t.area)}),e.on("BalanceUpdate",t=>{var n;(n=this.onBalanceUpdate)==null||n.call(this,t.balance)}),e.on("EnvironmentUpdate",t=>{var n;console.log("[Grid] Environment update received, timeOfDay:",(n=t.timeOfDay)==null?void 0:n.toFixed(2)),this.sceneManager.environment.applyWindlightSettings(t)}),e.on("AttachedSound",t=>{const n=this.objects.getPrim(t.objectId),i=(n==null?void 0:n.position)||{x:0,y:0,z:0};this.soundManager.playSound(t.soundId,{x:i.x,y:i.z,z:i.y},t.gain,!1,t.objectId)}),e.on("PreloadSound",t=>{this.soundManager.playSound(t.soundId,{x:0,y:0,z:0},0,!1).catch(()=>{})}),e.on("PrimSoundUpdate",t=>{const n=this.objects.getPrim(t.objectId),i=(n==null?void 0:n.position)||{x:0,y:0,z:0};this.soundManager.playSound(t.soundId,{x:i.x,y:i.z,z:i.y},t.gain,!0,t.objectId)}),e.on("AmbientSound",t=>{this.soundManager.playAmbient(t.soundId,t.gain??.3)}),e.on("ObjectAnimation",t=>{this.animationSystem.updateAnimations(t.objectId,t.animations)}),e.on("SelfAnimation",t=>{this.animationSystem.updateAnimations("self",t.animations)}),e.on("AttachmentUpdate",t=>{const n={avatarId:t.avatarId,attachmentPoint:t.attachmentPoint,objectId:t.objectId,objectName:t.objectName,position:t.position,rotation:t.rotation,scale:t.scale};this.attachmentRenderer.updateAttachment(n)}),e.on("ProfileData",t=>{const n={id:t.avatarId,name:t.avatarId,title:t.title,profileImage:t.profileImage!=="00000000-0000-0000-0000-000000000000"?`${this.baseUrl}/api/assets/${t.profileImage}`:void 0,bio:t.about,homeLocation:t.homeLocation,online:t.online,lastLogin:t.memberSince};this.profilePanel.show(n)}),e.on("GroupList",t=>{const n=t.groups.map(i=>({id:i.id,name:i.name,title:i.title,memberCount:i.memberCount,motto:i.motto,insignia:i.insignia?`${this.baseUrl}/api/assets/${i.insignia}`:void 0}));this.groupPanel.updateGroups(n)}),e.on("GroupChat",t=>{this.groupPanel.addChatMessage(t.senderName,t.message)}),e.on("GroupNotices",t=>{console.log(`[Groups] Received ${t.notices.length} notices for group ${t.groupId}`)}),e.on("InventoryRoot",t=>{this.inventoryPanel.setInventory(t)}),e.on("FolderExpanded",t=>{this.inventoryPanel.expandFolder(t.folderId,t.folders,t.items)}),e.on("SearchResults",t=>{const n=t.results.map(i=>({id:i.id,name:i.name,description:i.description,category:t.category,online:i.online,distance:i.distance,price:i.price,date:i.date,maturity:i.maturity}));this.searchPanel.setResults(n)}),e.on("FlexibleUpdate",t=>{const n={objectId:t.objectId,softness:t.softness,gravity:t.gravity,drag:t.drag,wind:t.wind,tension:t.tension,forceX:t.forceX,forceY:t.forceY,forceZ:t.forceZ,segmentCount:t.segmentCount,position:t.position,rotation:t.rotation,scale:t.scale},i=this.objects.getPrim(t.objectId);if(i){let r=null;i.traverse(o=>{o instanceof ke&&!r&&(r=o)}),r&&this.flexibleRenderer.addFlexible(n,i,r)}}),e.on("ParticleSystemUpdate",t=>{const n={objectId:t.objectId,textureId:t.textureId,burstSphereRate:t.burstSphereRate,burstSphereRadius:t.burstSphereRadius,maxAge:t.maxAge,lifetime:t.lifetime,lifetimeVariance:t.lifetimeVariance,initialSpeed:t.initialSpeed,finalSpeed:t.finalSpeed,initialAcceleration:t.initialAcceleration,finalAcceleration:t.finalAcceleration,initialSize:t.initialSize,finalSize:t.finalSize,startColor:{r:t.startColor.r,g:t.startColor.g,b:t.startColor.b,a:t.startColor.a},endColor:{r:t.endColor.r,g:t.endColor.g,b:t.endColor.b,a:t.endColor.a},pattern:t.pattern,flags:t.flags},i=this.objects.getPrim(t.objectId),r=i==null?void 0:i.position;this.particleManager.updateSystem(n,r)}),e.on("Error",t=>{console.error("[Grid] Error:",t)}),e.onreconnected(()=>{console.log("[Grid] Reconnected")}),e.onclose(t=>{console.warn("[Grid] Connection closed:",t),this._connected=!1})}async start(){await this.connection.start(),console.log("[Grid] SignalR connected")}async ensureHypergridHub(){return this.hypergridConnection?this.hypergridConnection:(this.hypergridConnection=new yl().withUrl("/hubs/hypergrid",{accessTokenFactory:()=>this.authToken}).withAutomaticReconnect().build(),this.setupEventHandlers(this.hypergridConnection),await this.hypergridConnection.start(),console.log("[Grid] Hypergrid hub connected"),this.hypergridConnection)}async connectAvatar(e,t,n,i){await this.connection.invoke("ConnectAvatar",e,t||null,n||null,i||null)}async sendIM(e,t){await this.connection.invoke("SendIM",e,t)}async clearIMHistory(e){await this.connection.invoke("ClearIMHistory",e||null)}async sendChat(e,t=0){await this.connection.invoke("SendChat",e,t)}async teleport(e){await this.connection.invoke("Teleport",e)}async hypergridTeleport(e){await(await this.ensureHypergridHub()).invoke("HypergridTeleport",e)}async requestProfile(e){this.connection&&await this.connection.invoke("RequestProfile",e)}handleSnapshot(e,t){const n={avatarName:"Avatar",gridName:"I-Grid",regionName:"Current Region",position:"0, 0, 0"};this.snapshotTools.uploadToFeed(e,t,n).then(i=>{i.success?console.log("[Snapshot] Uploaded:",i.postUrl):console.error("[Snapshot] Upload failed:",i.message)})}handleSearch(e,t){if(this.connection)switch(e){case"people":this.connection.invoke("SearchPeople",t);break;case"places":this.connection.invoke("SearchPlaces",t);break;case"events":this.connection.invoke("SearchEvents",t);break;case"groups":this.connection.invoke("SearchGroups",t);break;case"classifieds":this.connection.invoke("SearchClassifieds",t);break}}handleSearchResultClick(e){this.connection&&e.category==="people"&&this.connection.invoke("RequestProfile",e.id)}handleInventoryAction(e,t){if(this.connection)switch(e){case"rez":this.connection.invoke("RezObject",t.id);break;case"wear":this.connection.invoke("WearItem",t.id);break;case"take":console.log("[Inventory] Take object - need local ID");break;case"delete":console.log(`[Inventory] Delete: ${t.name}`);break;case"rename":console.log(`[Inventory] Open folder: ${t.name}`),this.connection.invoke("ExpandFolder",t.id);break}}handleInteraction(e,t){if(this.connection)switch(t){case"sit":this.connection.invoke("RequestSit","self",e.objectId);break;case"touch":this.connection.invoke("TouchObject",e.objectId);break;case"pay":console.log(`[Interaction] Pay object: ${e.objectName}`);break;default:console.log(`[Interaction] ${t} on ${e.objectName} (${e.objectId})`)}}async standUp(){this.connection&&await this.connection.invoke("StandUp")}async stop(){this.soundManager.dispose(),this.particleManager.clear(),this.flexibleRenderer.clear(),this.animationSystem.clear(),this.attachmentRenderer.clear(),this.profilePanel.dispose(),this.groupPanel.dispose(),this.interactionManager.dispose(),this.inventoryPanel.dispose(),this.appearanceEditor.dispose(),this.hudRenderer.dispose(),this.searchPanel.dispose(),this.mediaManager.dispose(),this.buildTools.dispose(),this.landTools.dispose(),this.worldMap.dispose(),this.notecardEditor.dispose(),this.snapshotTools.dispose(),this.chatMedia.dispose(),this.scriptEditor.dispose(),this.uploadTools.dispose(),this.voiceChat.dispose(),this.editWindow.dispose(),this.materialLoader.dispose(),this.hypergridConnection&&(await this.hypergridConnection.stop(),this.hypergridConnection=null),await this.connection.stop(),this._connected=!1}}class Sh{constructor(e){C(this,"canvas");C(this,"ctx");C(this,"patches",new Map);C(this,"scale",.15);C(this,"centerX",90);C(this,"centerY",90);this.canvas=e,this.ctx=e.getContext("2d")}updatePatch(e,t,n){const i=`${e},${t}`,r=n instanceof Float32Array?n:new Float32Array(n);this.patches.set(i,r),this.render()}setPlayerPosition(e,t){this.centerX=90-e*this.scale,this.centerY=90-t*this.scale,this.render()}render(){const e=this.ctx,n=256*this.scale;e.fillStyle="#0a0a1a",e.fillRect(0,0,180,180);for(const[i,r]of this.patches){const[o,a]=i.split(",").map(Number),c=o*n+this.centerX,l=a*n+this.centerY,h=4,u=n/(16/h);for(let d=0;d<16;d+=h)for(let m=0;m<16;m+=h){const g=r[d*16+m]??0,_=Math.min(Math.max(g/60,0),1),p=Math.floor(30+_*50),f=Math.floor(60+_*120),E=Math.floor(20+_*30);e.fillStyle=`rgb(${p},${f},${E})`,e.fillRect(c+m*u,l+d*u,u+.5,u+.5)}}e.fillStyle="#4fc3f7",e.beginPath(),e.arc(90,90,3,0,Math.PI*2),e.fill(),e.strokeStyle="#ffffff",e.lineWidth=1,e.beginPath(),e.arc(90,90,3,0,Math.PI*2),e.stroke()}}const Ts=document.getElementById("viewport"),Xa=document.getElementById("login-panel"),$a=document.getElementById("login-form"),Ar=document.getElementById("login-error"),Eh=document.getElementById("auth-btn"),ga=document.getElementById("toggle-auth"),Mh=document.getElementById("confirm-password"),wh=document.getElementById("beta-key"),Us=document.getElementById("avatar-panel"),Di=document.getElementById("avatar-list"),ri=document.getElementById("connect-btn"),mx=document.getElementById("logout-btn"),gx=document.getElementById("switch-avatar-btn"),_x=document.getElementById("reconnect-btn"),xx=document.getElementById("site-logout-btn"),Th=document.getElementById("top-bar"),Ch=document.getElementById("region-name"),Rr=document.getElementById("parcel-name"),Sr=document.getElementById("currency-display"),Ah=document.getElementById("position-display"),Rh=document.getElementById("camera-panel"),Ph=document.getElementById("chat-window"),Ui=document.getElementById("chat-messages"),_a=document.getElementById("chat-input"),vx=document.getElementById("chat-send"),Ih=document.getElementById("minimap-canvas"),Lh=document.getElementById("teleport-bar"),yx=document.getElementById("teleport-form"),Tl=document.getElementById("teleport-input"),Cs=document.getElementById("zoom-slider"),Cl=document.getElementById("sky-preset");let Wn="",V=null,mt=null,wt=null,Xn=null,en=!1,Pr="Currency";const ys=document.getElementById("preloader");window.addEventListener("load",()=>{setTimeout(()=>{ys.classList.add("hidden")},2800)});function xa(s){const e=ys.querySelector(".preloader-text");e&&(e.textContent=s);const t=ys.querySelector(".preloader-fill");t&&(t.style.animation="none",t.offsetHeight,t.style.animation="load 3s ease-in-out forwards"),ys.classList.remove("hidden")}function Ir(){ys.classList.add("hidden")}ga.addEventListener("click",s=>{s.preventDefault(),en=!en,Ar.style.display="none",Eh.textContent=en?"Register":"Login",document.getElementById("register-fields").style.display=en?"block":"none",Mh.required=en,wh.required=en,ga.textContent=en?"Already have an account? Login":"Don't have an account? Register"});const Al=document.getElementById("grid-select"),bx=document.getElementById("custom-grid-field");Al.addEventListener("change",()=>{bx.style.display=Al.value==="custom"?"block":"none"});const Rl=document.getElementById("start-location"),Sx=document.getElementById("region-field");Rl.addEventListener("change",()=>{Sx.style.display=Rl.value==="region"?"block":"none"});$a.addEventListener("submit",async s=>{s.preventDefault(),Ar.style.display="none";const e=document.getElementById("username").value,t=document.getElementById("password").value;if(en){if(wh.value.trim()!=="tasia"){ni("Invalid beta key");return}if(t!==Mh.value){ni("Passwords do not match");return}if(t.length<4){ni("Password must be at least 4 characters");return}}try{const i=await fetch(en?"/api/auth/register":"/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})});if(!i.ok){ni((await i.json()).error||"Failed");return}const r=await i.json();if(en){const o=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})});if(!o.ok){ni("Account created! Now login."),en=!1,Eh.textContent="Login",document.getElementById("register-fields").style.display="none",ga.textContent="Don't have an account? Register";return}Wn=(await o.json()).token}else Wn=r.token;Xa.style.display="none",document.getElementById("account-username").textContent=e,await Ya()}catch{ni("Connection error")}});function ni(s){Ar.textContent=s,Ar.style.display="block"}async function Ya(){Us.style.display="block",Di.innerHTML='<li style="color:#888;text-align:center">Loading...</li>';try{const s=await fetch("/api/avatars",{headers:{Authorization:`Bearer ${Wn}`}});if(!s.ok)throw new Error;const e=await s.json();if(!e.length){Di.innerHTML='<li style="color:#888;text-align:center">No avatars. Create one below.</li>',ri.disabled=!0;return}Di.innerHTML="";for(const t of e){const n=document.createElement("li");n.innerHTML=`<div style="font-weight:600">${t.firstName} ${t.lastName}</div>`,n.addEventListener("click",()=>{Di.querySelectorAll("li").forEach(i=>i.classList.remove("selected")),n.classList.add("selected"),Xn=t.id,ri.disabled=!1}),Di.appendChild(n)}}catch{Di.innerHTML='<li style="color:#ef5350;text-align:center">Error loading avatars</li>'}}xx.addEventListener("click",()=>{Wn="",Xn=null,Us.style.display="none",Xa.style.display="block",$a.reset()});const us=document.getElementById("create-avatar-btn");us.addEventListener("click",async()=>{const s=document.getElementById("avatar-create-error");s.style.display="none";const e=document.getElementById("avatar-first").value.trim(),t=document.getElementById("avatar-last").value.trim(),n=document.getElementById("avatar-sl-pass").value.trim();if(!e||!t){s.textContent="First and last name required",s.style.display="block";return}us.textContent="Creating...",us.disabled=!0;try{const i=await fetch("/api/avatars",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Wn}`},body:JSON.stringify({firstName:e,lastName:t,slPassword:n||void 0})});if(!i.ok){s.textContent=(await i.json()).error||"Failed",s.style.display="block";return}document.getElementById("avatar-first").value="",document.getElementById("avatar-last").value="",document.getElementById("avatar-sl-pass").value="",await Ya()}catch{s.textContent="Error",s.style.display="block"}finally{us.textContent="Create Avatar",us.disabled=!1}});document.querySelectorAll(".cam-dpad .cam-btn[data-move]").forEach(s=>{const[e,t,n]=s.dataset.move.split(",").map(Number);s.addEventListener("mousedown",()=>{var i;return(i=V==null?void 0:V.camera)==null?void 0:i.startMove(e,t,n)}),s.addEventListener("mouseup",()=>{var i;return(i=V==null?void 0:V.camera)==null?void 0:i.stopMove()}),s.addEventListener("mouseleave",()=>{var i;return(i=V==null?void 0:V.camera)==null?void 0:i.stopMove()}),s.addEventListener("touchstart",i=>{var r;i.preventDefault(),(r=V==null?void 0:V.camera)==null||r.startMove(e,t,n)}),s.addEventListener("touchend",()=>{var i;return(i=V==null?void 0:V.camera)==null?void 0:i.stopMove()})});document.getElementById("zoom-in").addEventListener("click",()=>{var s,e,t;(e=V==null?void 0:V.camera)==null||e.setZoom((((s=V==null?void 0:V.camera)==null?void 0:s.getZoom())??30)-5),Cs.value=String((t=V==null?void 0:V.camera)==null?void 0:t.getZoom())});document.getElementById("zoom-out").addEventListener("click",()=>{var s,e,t;(e=V==null?void 0:V.camera)==null||e.setZoom((((s=V==null?void 0:V.camera)==null?void 0:s.getZoom())??30)+5),Cs.value=String((t=V==null?void 0:V.camera)==null?void 0:t.getZoom())});document.getElementById("cam-reset").addEventListener("click",()=>{var s;(s=V==null?void 0:V.camera)==null||s.resetView(),Cs.value="30"});const mr=document.getElementById("draw-dist"),Ex=document.getElementById("draw-dist-label");mr==null||mr.addEventListener("input",()=>{const s=Number(mr.value);Ex.textContent=String(s),mt&&(mt.camera.far=s*2,mt.camera.updateProjectionMatrix(),mt.environment.setDrawDistance(s))});Cs.addEventListener("input",()=>{var s;(s=V==null?void 0:V.camera)==null||s.setZoom(Number(Cs.value))});Cl.addEventListener("change",()=>{mt&&mt.environment.setPreset(Cl.value)});function va(){Us.style.display="none",Th.style.display="flex",Rh.style.display="flex",Ph.style.display="flex",Lh.style.display="block",document.getElementById("right-panel").style.display="block",document.getElementById("toolbar").style.display="flex"}function qa(){[Th,Rh,Ph,Lh].forEach(s=>s.style.display="none"),document.getElementById("right-panel").style.display="none",document.getElementById("im-window").style.display="none",document.getElementById("toolbar").style.display="none"}ri.addEventListener("click",async()=>{var s,e,t,n;if(Xn){xa("Preparing world..."),ri.disabled=!0,ri.textContent="Connecting...",await new Promise(i=>setTimeout(i,50));try{mt=new xh(Ts),wt=new Sh(Ih),Ir(),va(),Ut("System","Initializing viewer..."),mt.animate(i=>{var r,o,a,c,l;(r=V==null?void 0:V.camera)==null||r.update(i),(o=V==null?void 0:V.particleManager)==null||o.update(i),(a=V==null?void 0:V.flexibleRenderer)==null||a.update(i),(c=V==null?void 0:V.animationSystem)==null||c.update(i),(l=V==null?void 0:V.attachmentRenderer)==null||l.update()}),Ut("System","Loading modules..."),await new Promise(i=>setTimeout(i,200)),await new Promise(i=>requestAnimationFrame(i)),V=new bh(mt,Wn,window.location.origin,(i,r)=>Ut(i,r),(i,r,o)=>{Ah.textContent=`${i.toFixed(0)}, ${r.toFixed(0)}, ${o.toFixed(0)}`,wt==null||wt.setPlayerPosition(i,r)},void 0,(i,r,o)=>{Rs.set(i,{id:i,name:r,online:o}),Yi()},(i,r,o)=>{Oh(i,r,o)},(i,r,o)=>{wt==null||wt.updatePatch(i,r,o)},(i,r,o)=>{Ch.textContent=`☀ ${i}`,Rr.textContent=`(${r}, ${o})`},(i,r)=>{Rr.textContent=i},i=>{Sr.textContent=`${Pr} ${i.toLocaleString()}`},i=>{var r;Pr=i,Sr.textContent=`${i} ${((r=Sr.textContent)==null?void 0:r.replace(/^[^\d]*\s*/,""))||"0"}`},(i,r,o)=>{Ft.has(i)||Ft.set(i,{friendId:i,friendName:r,messages:[],unread:0});const a=Ft.get(i);for(const c of o)a.messages.push({from:c.from,text:c.text,time:new Date(c.time)});Yi()}),await V.init(),Ut("System","Connecting to server..."),await V.start(),Ut("System","Logging into grid...");try{const i=(s=document.getElementById("grid-select"))==null?void 0:s.value,r=i==="custom"?((e=document.getElementById("custom-grid-url"))==null?void 0:e.value)||void 0:i?`https://${i}:8002/`:void 0,o=(t=document.getElementById("start-location"))==null?void 0:t.value,a=o==="region"?(n=document.getElementById("start-region"))==null?void 0:n.value:void 0,c=o==="region"&&a?`uri:${a}`:o==="last"?"last":void 0;await V.connectAvatar(Xn,r,c,a),Ut("System","✅ Logged into grid!")}catch(i){console.error("[Grid] Avatar connect failed:",i),Ut("System",`❌ Grid connection failed: ${i.message||"Unknown error"}`)}}catch(i){console.error("Connect failed:",i),Ir(),ri.disabled=!1,ri.textContent="Enter World",Ut("System",`Initialization failed: ${i.message||"Unknown error"}`),ni(`Failed: ${i.message||"Unknown error"}`),va()}}});_x.addEventListener("click",async()=>{if(Xn){V&&(await V.stop(),V=null),mt&&(mt.renderer.dispose(),Ts.innerHTML="",mt=null),wt=null,qa(),xa("Reconnecting..."),mt=new xh(Ts),wt=new Sh(Ih),V=new bh(mt,Wn,window.location.origin,(s,e)=>Ut(s,e),(s,e,t)=>{Ah.textContent=`${s.toFixed(0)}, ${e.toFixed(0)}, ${t.toFixed(0)}`,wt==null||wt.setPlayerPosition(s,e)},void 0,(s,e,t)=>{Rs.set(s,{id:s,name:e,online:t}),Yi()},(s,e,t)=>{Oh(s,e,t)},(s,e,t)=>{wt==null||wt.updatePatch(s,e,t)},(s,e,t)=>{Ch.textContent=`☀ ${s}`,Rr.textContent=`(${e}, ${t})`},s=>{Rr.textContent=s},s=>{Sr.textContent=`${Pr} ${s.toLocaleString()}`},s=>{Pr=s},(s,e,t)=>{Ft.has(s)||Ft.set(s,{friendId:s,friendName:e,messages:[],unread:0});const n=Ft.get(s);for(const i of t)n.messages.push({from:i.from,text:i.text,time:new Date(i.time)});Yi()});try{xa("Reconnecting...");const s=new Promise((t,n)=>setTimeout(()=>n(new Error("Connection timed out")),15e3));await Promise.race([V.start(),s]);const e=new Promise((t,n)=>setTimeout(()=>n(new Error("Avatar connection timed out")),15e3));await Promise.race([V.connectAvatar(Xn),e]),Ir(),va(),mt.animate(t=>{var n,i,r,o,a;(n=V==null?void 0:V.camera)==null||n.update(t),(i=V==null?void 0:V.particleManager)==null||i.update(t),(r=V==null?void 0:V.flexibleRenderer)==null||r.update(t),(o=V==null?void 0:V.animationSystem)==null||o.update(t),(a=V==null?void 0:V.attachmentRenderer)==null||a.update()})}catch(s){Ir(),console.error("Reconnect failed:",s),Ut("System","Reconnect failed. Try again.")}}});gx.addEventListener("click",async()=>{V&&(await V.stop(),V=null),Xn=null,qa(),Us.style.display="block",await Ya(),mt&&(mt.renderer.dispose(),Ts.innerHTML="",mt=null),wt=null});mx.addEventListener("click",async()=>{V&&(await V.stop(),V=null),Wn="",Xn=null,qa(),Us.style.display="none",Xa.style.display="block",$a.reset(),mt&&(mt.renderer.dispose(),Ts.innerHTML="",mt=null),wt=null});vx.addEventListener("click",Dh);_a.addEventListener("keydown",s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),Dh())});async function Dh(){const s=_a.value.trim();!s||!V||(await V.sendChat(s),Ut("You",s),_a.value="")}function Ut(s,e){if(!(e!=null&&e.trim()))return;const t=document.createElement("div");t.className="chat-msg";const n=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});for(t.innerHTML=`<span class="chat-time">${n}</span><span class="chat-name">${$n(s)}:</span><div class="chat-text">${$n(e)}</div>`,Ui.appendChild(t),Ui.scrollTop=Ui.scrollHeight;Ui.children.length>200;)Ui.removeChild(Ui.firstChild)}yx.addEventListener("submit",async s=>{s.preventDefault();const e=Tl.value.trim();if(!(!e||!V))try{e.includes("://")||e.includes("@")?(await V.hypergridTeleport(e),Ut("System",`Teleporting to ${e}...`)):(await V.teleport(e),Ut("System",`Teleporting to ${e}...`)),Tl.value=""}catch{Ut("System","Teleport failed")}});const Mx=document.getElementById("friends-header"),As=document.getElementById("friends-list"),wx=document.getElementById("online-count"),Uh=document.getElementById("im-window"),Tx=document.getElementById("im-title"),hn=document.getElementById("im-messages"),Lr=document.getElementById("im-input"),Nh=document.getElementById("im-send"),Rs=new Map,Ft=new Map;let An=null;Mx.addEventListener("click",s=>{s.stopPropagation(),As.style.display=As.style.display==="none"?"block":"none"});function Yi(){As.innerHTML="";let s=0;for(const e of Rs.values()){e.online&&s++;const t=Ft.get(e.id),n=(t==null?void 0:t.unread)??0,i=document.createElement("div");i.className=`friend-item ${e.online?"friend-online":"friend-offline"}`,i.innerHTML=`${e.online?"● ":"○ "}${$n(e.name)}${n>0?`<span style="color:#ef5350;font-weight:bold;margin-left:4px">${n}</span>`:""}`,i.addEventListener("click",r=>{r.stopPropagation(),Cx(e.id,e.name)}),As.appendChild(i)}wx.textContent=String(s)}function Cx(s,e){An=s,Ft.has(s)||Ft.set(s,{friendId:s,friendName:e,messages:[],unread:0});const t=Ft.get(s);t.unread=0,Tx.textContent=e,Uh.style.display="block",As.style.display="none",Fh(t),Lr.focus(),Yi()}function Fh(s){hn.innerHTML="";for(const e of s.messages){const t=e.time.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),n=e.from==="You"?"#6ab0ff":"#8f8",i=document.createElement("div");i.innerHTML=`<span style="color:#666;font-size:9px">${t}</span> <b style="color:${n}">${$n(e.from)}:</b> <span style="color:#ddd">${$n(e.text)}</span>`,hn.appendChild(i)}hn.scrollTop=hn.scrollHeight}Nh.addEventListener("click",async()=>{const s=Lr.value.trim();if(!s||!An||!V)return;const e=Ft.get(An);if(e)try{await V.sendIM(An,s);const t=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});e.messages.push({from:"You",text:s,time:new Date});const n=document.createElement("div");n.innerHTML=`<span style="color:#666;font-size:9px">${t}</span> <b style="color:#6ab0ff">You:</b> <span style="color:#ddd">${$n(s)}</span>`,hn.appendChild(n),hn.scrollTop=hn.scrollHeight,Lr.value=""}catch(t){console.error("IM error:",t)}});Lr.addEventListener("keydown",s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),Nh.click())});document.getElementById("im-header").addEventListener("click",()=>{Uh.style.display="none",An=null});document.getElementById("im-clear").addEventListener("click",async s=>{if(s.stopPropagation(),!An||!V||!confirm("Clear this conversation?"))return;await V.clearIMHistory(An);const e=Ft.get(An);e&&(e.messages=[],Fh(e))});function Oh(s,e,t){const n=t||s;Ft.has(n)||(Ft.set(n,{friendId:n,friendName:s,messages:[],unread:0}),Rs.has(n)||Rs.set(n,{id:n,name:s,online:!0}));const i=Ft.get(n);if(i.messages.push({from:s,text:e,time:new Date}),An===n){i.unread=0;const r=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),o=document.createElement("div");o.innerHTML=`<span style="color:#666;font-size:9px">${r}</span> <b style="color:#8f8">${$n(s)}:</b> <span style="color:#ddd">${$n(e)}</span>`,hn.appendChild(o),hn.scrollTop=hn.scrollHeight}else i.unread++;Ut(`[IM] ${s}`,e),Yi()}function $n(s){const e=document.createElement("div");return e.textContent=s,e.innerHTML}const Ax=document.getElementById("toolbar");Ax.querySelectorAll(".tool-btn").forEach(s=>{s.addEventListener("click",()=>{if(!V)return;switch(s.dataset.tool){case"search":V.searchPanel.toggle();break;case"inventory":V.inventoryPanel.toggle();break;case"build":V.buildTools.toggle();break;case"land":V.landTools.toggle();break;case"map":V.worldMap.toggle();break;case"profile":V.profilePanel.toggle();break;case"groups":V.groupPanel.toggle();break;case"appearance":V.appearanceEditor.toggle();break;case"script":V.scriptEditor.toggle();break;case"notecard":V.notecardEditor.toggle();break;case"upload":V.uploadTools.toggle();break;case"snapshot":V.snapshotTools.toggle();break;case"voice":V.voiceChat.toggleSettings();break}})});document.addEventListener("keydown",s=>{var e,t,n,i,r,o,a,c,l,h,u,d,m,g,_,p,f,E,M,v,D,A,R,I,S,b,P,H;if(V&&!(s.target instanceof HTMLInputElement||s.target instanceof HTMLTextAreaElement))switch(s.key){case"Escape":(t=(e=V.searchPanel).hide)==null||t.call(e),(i=(n=V.inventoryPanel).hide)==null||i.call(n),(o=(r=V.buildTools).toggle)==null||o.call(r),(c=(a=V.landTools).hide)==null||c.call(a),(h=(l=V.worldMap).hide)==null||h.call(l),(d=(u=V.profilePanel).hide)==null||d.call(u),(g=(m=V.groupPanel).hide)==null||g.call(m),(p=(_=V.appearanceEditor).hide)==null||p.call(_),(E=(f=V.scriptEditor).hide)==null||E.call(f),(v=(M=V.notecardEditor).hide)==null||v.call(M),(A=(D=V.uploadTools).hide)==null||A.call(D),(I=(R=V.snapshotTools).hide)==null||I.call(R),(b=(S=V.voiceChat).toggleSettings)==null||b.call(S),(H=(P=V.voiceChat).toggleSettings)==null||H.call(P);break;case"i":!s.ctrlKey&&!s.metaKey&&(V.inventoryPanel.toggle(),s.preventDefault());break;case"b":V.buildTools.toggle(),s.preventDefault();break;case"m":V.worldMap.toggle(),s.preventDefault();break;case"p":V.profilePanel.toggle(),s.preventDefault();break;case"g":V.groupPanel.toggle(),s.preventDefault();break;case"a":V.appearanceEditor.toggle(),s.preventDefault();break;case"u":V.uploadTools.toggle(),s.preventDefault();break;case"F3":V.searchPanel.toggle(),s.preventDefault();break;case"F5":V.scriptEditor.toggle(),s.preventDefault();break;case"F12":V.snapshotTools.toggle(),s.preventDefault();break}});const Rx=new MutationObserver(()=>{V!=null&&V.voiceChat&&!document.getElementById("voice-status")&&V.voiceChat.createStatusIndicator(document.body)});Rx.observe(document.body,{childList:!0,subtree:!0});
