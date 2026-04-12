(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();/**
* @vue/shared v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function sn(e){const t=Object.create(null);for(const s of e.split(","))t[s]=1;return s=>s in t}const W={},ut=[],ge=()=>{},fo=()=>!1,hs=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ms=e=>e.startsWith("onUpdate:"),ee=Object.assign,nn=(e,t)=>{const s=e.indexOf(t);s>-1&&e.splice(s,1)},wi=Object.prototype.hasOwnProperty,N=(e,t)=>wi.call(e,t),E=Array.isArray,dt=e=>Wt(e)==="[object Map]",gs=e=>Wt(e)==="[object Set]",In=e=>Wt(e)==="[object Date]",O=e=>typeof e=="function",Y=e=>typeof e=="string",Ee=e=>typeof e=="symbol",B=e=>e!==null&&typeof e=="object",uo=e=>(B(e)||O(e))&&O(e.then)&&O(e.catch),po=Object.prototype.toString,Wt=e=>po.call(e),vi=e=>Wt(e).slice(8,-1),ho=e=>Wt(e)==="[object Object]",on=e=>Y(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,At=sn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),bs=e=>{const t=Object.create(null);return s=>t[s]||(t[s]=e(s))},xi=/-\w/g,re=bs(e=>e.replace(xi,t=>t.slice(1).toUpperCase())),Ci=/\B([A-Z])/g,rt=bs(e=>e.replace(Ci,"-$1").toLowerCase()),_s=bs(e=>e.charAt(0).toUpperCase()+e.slice(1)),Rs=bs(e=>e?`on${_s(e)}`:""),Fe=(e,t)=>!Object.is(e,t),Qt=(e,...t)=>{for(let s=0;s<e.length;s++)e[s](...t)},mo=(e,t,s,n=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:n,value:s})},ys=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Mn;const ws=()=>Mn||(Mn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function rn(e){if(E(e)){const t={};for(let s=0;s<e.length;s++){const n=e[s],o=Y(n)?Pi(n):rn(n);if(o)for(const i in o)t[i]=o[i]}return t}else if(Y(e)||B(e))return e}const Ti=/;(?![^(]*\))/g,Si=/:([^]+)/,Ai=/\/\*[^]*?\*\//g;function Pi(e){const t={};return e.replace(Ai,"").split(Ti).forEach(s=>{if(s){const n=s.split(Si);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function lt(e){let t="";if(Y(e))t=e;else if(E(e))for(let s=0;s<e.length;s++){const n=lt(e[s]);n&&(t+=n+" ")}else if(B(e))for(const s in e)e[s]&&(t+=s+" ");return t.trim()}const Ei="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ii=sn(Ei);function go(e){return!!e||e===""}function Mi(e,t){if(e.length!==t.length)return!1;let s=!0;for(let n=0;s&&n<e.length;n++)s=Ht(e[n],t[n]);return s}function Ht(e,t){if(e===t)return!0;let s=In(e),n=In(t);if(s||n)return s&&n?e.getTime()===t.getTime():!1;if(s=Ee(e),n=Ee(t),s||n)return e===t;if(s=E(e),n=E(t),s||n)return s&&n?Mi(e,t):!1;if(s=B(e),n=B(t),s||n){if(!s||!n)return!1;const o=Object.keys(e).length,i=Object.keys(t).length;if(o!==i)return!1;for(const r in e){const l=e.hasOwnProperty(r),c=t.hasOwnProperty(r);if(l&&!c||!l&&c||!Ht(e[r],t[r]))return!1}}return String(e)===String(t)}function Oi(e,t){return e.findIndex(s=>Ht(s,t))}const bo=e=>!!(e&&e.__v_isRef===!0),ze=e=>Y(e)?e:e==null?"":E(e)||B(e)&&(e.toString===po||!O(e.toString))?bo(e)?ze(e.value):JSON.stringify(e,_o,2):String(e),_o=(e,t)=>bo(t)?_o(e,t.value):dt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((s,[n,o],i)=>(s[Fs(n,i)+" =>"]=o,s),{})}:gs(t)?{[`Set(${t.size})`]:[...t.values()].map(s=>Fs(s))}:Ee(t)?Fs(t):B(t)&&!E(t)&&!ho(t)?String(t):t,Fs=(e,t="")=>{var s;return Ee(e)?`Symbol(${(s=e.description)!=null?s:t})`:e};/**
* @vue/reactivity v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ae;class Ri{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=ae,!t&&ae&&(this.index=(ae.scopes||(ae.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,s;if(this.scopes)for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].pause();for(t=0,s=this.effects.length;t<s;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,s;if(this.scopes)for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].resume();for(t=0,s=this.effects.length;t<s;t++)this.effects[t].resume()}}run(t){if(this._active){const s=ae;try{return ae=this,t()}finally{ae=s}}}on(){++this._on===1&&(this.prevScope=ae,ae=this)}off(){this._on>0&&--this._on===0&&(ae=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let s,n;for(s=0,n=this.effects.length;s<n;s++)this.effects[s].stop();for(this.effects.length=0,s=0,n=this.cleanups.length;s<n;s++)this.cleanups[s]();if(this.cleanups.length=0,this.scopes){for(s=0,n=this.scopes.length;s<n;s++)this.scopes[s].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function Fi(){return ae}let U;const Ls=new WeakSet;class yo{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ae&&ae.active&&ae.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ls.has(this)&&(Ls.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||vo(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,On(this),xo(this);const t=U,s=be;U=this,be=!0;try{return this.fn()}finally{Co(this),U=t,be=s,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)an(t);this.deps=this.depsTail=void 0,On(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ls.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){zs(this)&&this.run()}get dirty(){return zs(this)}}let wo=0,Pt,Et;function vo(e,t=!1){if(e.flags|=8,t){e.next=Et,Et=e;return}e.next=Pt,Pt=e}function ln(){wo++}function cn(){if(--wo>0)return;if(Et){let t=Et;for(Et=void 0;t;){const s=t.next;t.next=void 0,t.flags&=-9,t=s}}let e;for(;Pt;){let t=Pt;for(Pt=void 0;t;){const s=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(n){e||(e=n)}t=s}}if(e)throw e}function xo(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Co(e){let t,s=e.depsTail,n=s;for(;n;){const o=n.prevDep;n.version===-1?(n===s&&(s=o),an(n),Li(n)):t=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=o}e.deps=t,e.depsTail=s}function zs(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(To(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function To(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Dt)||(e.globalVersion=Dt,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!zs(e))))return;e.flags|=2;const t=e.dep,s=U,n=be;U=e,be=!0;try{xo(e);const o=e.fn(e._value);(t.version===0||Fe(o,e._value))&&(e.flags|=128,e._value=o,t.version++)}catch(o){throw t.version++,o}finally{U=s,be=n,Co(e),e.flags&=-3}}function an(e,t=!1){const{dep:s,prevSub:n,nextSub:o}=e;if(n&&(n.nextSub=o,e.prevSub=void 0),o&&(o.prevSub=n,e.nextSub=void 0),s.subs===e&&(s.subs=n,!n&&s.computed)){s.computed.flags&=-5;for(let i=s.computed.deps;i;i=i.nextDep)an(i,!0)}!t&&!--s.sc&&s.map&&s.map.delete(s.key)}function Li(e){const{prevDep:t,nextDep:s}=e;t&&(t.nextDep=s,e.prevDep=void 0),s&&(s.prevDep=t,e.nextDep=void 0)}let be=!0;const So=[];function Be(){So.push(be),be=!1}function Ve(){const e=So.pop();be=e===void 0?!0:e}function On(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const s=U;U=void 0;try{t()}finally{U=s}}}let Dt=0;class Di{constructor(t,s){this.sub=t,this.dep=s,this.version=s.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ao{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!U||!be||U===this.computed)return;let s=this.activeLink;if(s===void 0||s.sub!==U)s=this.activeLink=new Di(U,this),U.deps?(s.prevDep=U.depsTail,U.depsTail.nextDep=s,U.depsTail=s):U.deps=U.depsTail=s,Po(s);else if(s.version===-1&&(s.version=this.version,s.nextDep)){const n=s.nextDep;n.prevDep=s.prevDep,s.prevDep&&(s.prevDep.nextDep=n),s.prevDep=U.depsTail,s.nextDep=void 0,U.depsTail.nextDep=s,U.depsTail=s,U.deps===s&&(U.deps=n)}return s}trigger(t){this.version++,Dt++,this.notify(t)}notify(t){ln();try{for(let s=this.subs;s;s=s.prevSub)s.sub.notify()&&s.sub.dep.notify()}finally{cn()}}}function Po(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let n=t.deps;n;n=n.nextDep)Po(n)}const s=e.dep.subs;s!==e&&(e.prevSub=s,s&&(s.nextSub=e)),e.dep.subs=e}}const Ks=new WeakMap,nt=Symbol(""),Gs=Symbol(""),Nt=Symbol("");function te(e,t,s){if(be&&U){let n=Ks.get(e);n||Ks.set(e,n=new Map);let o=n.get(s);o||(n.set(s,o=new Ao),o.map=n,o.key=s),o.track()}}function Le(e,t,s,n,o,i){const r=Ks.get(e);if(!r){Dt++;return}const l=c=>{c&&c.trigger()};if(ln(),t==="clear")r.forEach(l);else{const c=E(e),d=c&&on(s);if(c&&s==="length"){const u=Number(n);r.forEach((h,C)=>{(C==="length"||C===Nt||!Ee(C)&&C>=u)&&l(h)})}else switch((s!==void 0||r.has(void 0))&&l(r.get(s)),d&&l(r.get(Nt)),t){case"add":c?d&&l(r.get("length")):(l(r.get(nt)),dt(e)&&l(r.get(Gs)));break;case"delete":c||(l(r.get(nt)),dt(e)&&l(r.get(Gs)));break;case"set":dt(e)&&l(r.get(nt));break}}cn()}function at(e){const t=j(e);return t===e?t:(te(t,"iterate",Nt),_e(e)?t:t.map(We))}function vs(e){return te(e=j(e),"iterate",Nt),e}function Te(e,t){return Ke(e)?bt(ot(e)?We(t):t):We(t)}const Ni={__proto__:null,[Symbol.iterator](){return Ds(this,Symbol.iterator,e=>Te(this,e))},concat(...e){return at(this).concat(...e.map(t=>E(t)?at(t):t))},entries(){return Ds(this,"entries",e=>(e[1]=Te(this,e[1]),e))},every(e,t){return Me(this,"every",e,t,void 0,arguments)},filter(e,t){return Me(this,"filter",e,t,s=>s.map(n=>Te(this,n)),arguments)},find(e,t){return Me(this,"find",e,t,s=>Te(this,s),arguments)},findIndex(e,t){return Me(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Me(this,"findLast",e,t,s=>Te(this,s),arguments)},findLastIndex(e,t){return Me(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Me(this,"forEach",e,t,void 0,arguments)},includes(...e){return Ns(this,"includes",e)},indexOf(...e){return Ns(this,"indexOf",e)},join(e){return at(this).join(e)},lastIndexOf(...e){return Ns(this,"lastIndexOf",e)},map(e,t){return Me(this,"map",e,t,void 0,arguments)},pop(){return xt(this,"pop")},push(...e){return xt(this,"push",e)},reduce(e,...t){return Rn(this,"reduce",e,t)},reduceRight(e,...t){return Rn(this,"reduceRight",e,t)},shift(){return xt(this,"shift")},some(e,t){return Me(this,"some",e,t,void 0,arguments)},splice(...e){return xt(this,"splice",e)},toReversed(){return at(this).toReversed()},toSorted(e){return at(this).toSorted(e)},toSpliced(...e){return at(this).toSpliced(...e)},unshift(...e){return xt(this,"unshift",e)},values(){return Ds(this,"values",e=>Te(this,e))}};function Ds(e,t,s){const n=vs(e),o=n[t]();return n!==e&&!_e(e)&&(o._next=o.next,o.next=()=>{const i=o._next();return i.done||(i.value=s(i.value)),i}),o}const ji=Array.prototype;function Me(e,t,s,n,o,i){const r=vs(e),l=r!==e&&!_e(e),c=r[t];if(c!==ji[t]){const h=c.apply(e,i);return l?We(h):h}let d=s;r!==e&&(l?d=function(h,C){return s.call(this,Te(e,h),C,e)}:s.length>2&&(d=function(h,C){return s.call(this,h,C,e)}));const u=c.call(r,d,n);return l&&o?o(u):u}function Rn(e,t,s,n){const o=vs(e),i=o!==e&&!_e(e);let r=s,l=!1;o!==e&&(i?(l=n.length===0,r=function(d,u,h){return l&&(l=!1,d=Te(e,d)),s.call(this,d,Te(e,u),h,e)}):s.length>3&&(r=function(d,u,h){return s.call(this,d,u,h,e)}));const c=o[t](r,...n);return l?Te(e,c):c}function Ns(e,t,s){const n=j(e);te(n,"iterate",Nt);const o=n[t](...s);return(o===-1||o===!1)&&pn(s[0])?(s[0]=j(s[0]),n[t](...s)):o}function xt(e,t,s=[]){Be(),ln();const n=j(e)[t].apply(e,s);return cn(),Ve(),n}const Bi=sn("__proto__,__v_isRef,__isVue"),Eo=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ee));function Vi(e){Ee(e)||(e=String(e));const t=j(this);return te(t,"has",e),t.hasOwnProperty(e)}class Io{constructor(t=!1,s=!1){this._isReadonly=t,this._isShallow=s}get(t,s,n){if(s==="__v_skip")return t.__v_skip;const o=this._isReadonly,i=this._isShallow;if(s==="__v_isReactive")return!o;if(s==="__v_isReadonly")return o;if(s==="__v_isShallow")return i;if(s==="__v_raw")return n===(o?i?Yi:Fo:i?Ro:Oo).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const r=E(t);if(!o){let c;if(r&&(c=Ni[s]))return c;if(s==="hasOwnProperty")return Vi}const l=Reflect.get(t,s,le(t)?t:n);if((Ee(s)?Eo.has(s):Bi(s))||(o||te(t,"get",s),i))return l;if(le(l)){const c=r&&on(s)?l:l.value;return o&&B(c)?Ys(c):c}return B(l)?o?Ys(l):un(l):l}}class Mo extends Io{constructor(t=!1){super(!1,t)}set(t,s,n,o){let i=t[s];const r=E(t)&&on(s);if(!this._isShallow){const d=Ke(i);if(!_e(n)&&!Ke(n)&&(i=j(i),n=j(n)),!r&&le(i)&&!le(n))return d||(i.value=n),!0}const l=r?Number(s)<t.length:N(t,s),c=Reflect.set(t,s,n,le(t)?t:o);return t===j(o)&&(l?Fe(n,i)&&Le(t,"set",s,n):Le(t,"add",s,n)),c}deleteProperty(t,s){const n=N(t,s);t[s];const o=Reflect.deleteProperty(t,s);return o&&n&&Le(t,"delete",s,void 0),o}has(t,s){const n=Reflect.has(t,s);return(!Ee(s)||!Eo.has(s))&&te(t,"has",s),n}ownKeys(t){return te(t,"iterate",E(t)?"length":nt),Reflect.ownKeys(t)}}class Wi extends Io{constructor(t=!1){super(!0,t)}set(t,s){return!0}deleteProperty(t,s){return!0}}const Hi=new Mo,ki=new Wi,Ui=new Mo(!0);const qs=e=>e,Yt=e=>Reflect.getPrototypeOf(e);function $i(e,t,s){return function(...n){const o=this.__v_raw,i=j(o),r=dt(i),l=e==="entries"||e===Symbol.iterator&&r,c=e==="keys"&&r,d=o[e](...n),u=s?qs:t?bt:We;return!t&&te(i,"iterate",c?Gs:nt),ee(Object.create(d),{next(){const{value:h,done:C}=d.next();return C?{value:h,done:C}:{value:l?[u(h[0]),u(h[1])]:u(h),done:C}}})}}function Jt(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function zi(e,t){const s={get(o){const i=this.__v_raw,r=j(i),l=j(o);e||(Fe(o,l)&&te(r,"get",o),te(r,"get",l));const{has:c}=Yt(r),d=t?qs:e?bt:We;if(c.call(r,o))return d(i.get(o));if(c.call(r,l))return d(i.get(l));i!==r&&i.get(o)},get size(){const o=this.__v_raw;return!e&&te(j(o),"iterate",nt),o.size},has(o){const i=this.__v_raw,r=j(i),l=j(o);return e||(Fe(o,l)&&te(r,"has",o),te(r,"has",l)),o===l?i.has(o):i.has(o)||i.has(l)},forEach(o,i){const r=this,l=r.__v_raw,c=j(l),d=t?qs:e?bt:We;return!e&&te(c,"iterate",nt),l.forEach((u,h)=>o.call(i,d(u),d(h),r))}};return ee(s,e?{add:Jt("add"),set:Jt("set"),delete:Jt("delete"),clear:Jt("clear")}:{add(o){const i=j(this),r=Yt(i),l=j(o),c=!t&&!_e(o)&&!Ke(o)?l:o;return r.has.call(i,c)||Fe(o,c)&&r.has.call(i,o)||Fe(l,c)&&r.has.call(i,l)||(i.add(c),Le(i,"add",c,c)),this},set(o,i){!t&&!_e(i)&&!Ke(i)&&(i=j(i));const r=j(this),{has:l,get:c}=Yt(r);let d=l.call(r,o);d||(o=j(o),d=l.call(r,o));const u=c.call(r,o);return r.set(o,i),d?Fe(i,u)&&Le(r,"set",o,i):Le(r,"add",o,i),this},delete(o){const i=j(this),{has:r,get:l}=Yt(i);let c=r.call(i,o);c||(o=j(o),c=r.call(i,o)),l&&l.call(i,o);const d=i.delete(o);return c&&Le(i,"delete",o,void 0),d},clear(){const o=j(this),i=o.size!==0,r=o.clear();return i&&Le(o,"clear",void 0,void 0),r}}),["keys","values","entries",Symbol.iterator].forEach(o=>{s[o]=$i(o,e,t)}),s}function fn(e,t){const s=zi(e,t);return(n,o,i)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?n:Reflect.get(N(s,o)&&o in n?s:n,o,i)}const Ki={get:fn(!1,!1)},Gi={get:fn(!1,!0)},qi={get:fn(!0,!1)};const Oo=new WeakMap,Ro=new WeakMap,Fo=new WeakMap,Yi=new WeakMap;function Ji(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Zi(e){return e.__v_skip||!Object.isExtensible(e)?0:Ji(vi(e))}function un(e){return Ke(e)?e:dn(e,!1,Hi,Ki,Oo)}function Xi(e){return dn(e,!1,Ui,Gi,Ro)}function Ys(e){return dn(e,!0,ki,qi,Fo)}function dn(e,t,s,n,o){if(!B(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=Zi(e);if(i===0)return e;const r=o.get(e);if(r)return r;const l=new Proxy(e,i===2?n:s);return o.set(e,l),l}function ot(e){return Ke(e)?ot(e.__v_raw):!!(e&&e.__v_isReactive)}function Ke(e){return!!(e&&e.__v_isReadonly)}function _e(e){return!!(e&&e.__v_isShallow)}function pn(e){return e?!!e.__v_raw:!1}function j(e){const t=e&&e.__v_raw;return t?j(t):e}function Qi(e){return!N(e,"__v_skip")&&Object.isExtensible(e)&&mo(e,"__v_skip",!0),e}const We=e=>B(e)?un(e):e,bt=e=>B(e)?Ys(e):e;function le(e){return e?e.__v_isRef===!0:!1}function er(e){return le(e)?e.value:e}const tr={get:(e,t,s)=>t==="__v_raw"?e:er(Reflect.get(e,t,s)),set:(e,t,s,n)=>{const o=e[t];return le(o)&&!le(s)?(o.value=s,!0):Reflect.set(e,t,s,n)}};function Lo(e){return ot(e)?e:new Proxy(e,tr)}class sr{constructor(t,s,n){this.fn=t,this.setter=s,this._value=void 0,this.dep=new Ao(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Dt-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!s,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&U!==this)return vo(this,!0),!0}get value(){const t=this.dep.track();return To(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function nr(e,t,s=!1){let n,o;return O(e)?n=e:(n=e.get,o=e.set),new sr(n,o,s)}const Zt={},rs=new WeakMap;let et;function or(e,t=!1,s=et){if(s){let n=rs.get(s);n||rs.set(s,n=[]),n.push(e)}}function ir(e,t,s=W){const{immediate:n,deep:o,once:i,scheduler:r,augmentJob:l,call:c}=s,d=I=>o?I:_e(I)||o===!1||o===0?De(I,1):De(I);let u,h,C,T,D=!1,M=!1;if(le(e)?(h=()=>e.value,D=_e(e)):ot(e)?(h=()=>d(e),D=!0):E(e)?(M=!0,D=e.some(I=>ot(I)||_e(I)),h=()=>e.map(I=>{if(le(I))return I.value;if(ot(I))return d(I);if(O(I))return c?c(I,2):I()})):O(e)?t?h=c?()=>c(e,2):e:h=()=>{if(C){Be();try{C()}finally{Ve()}}const I=et;et=u;try{return c?c(e,3,[T]):e(T)}finally{et=I}}:h=ge,t&&o){const I=h,J=o===!0?1/0:o;h=()=>De(I(),J)}const G=Fi(),z=()=>{u.stop(),G&&G.active&&nn(G.effects,u)};if(i&&t){const I=t;t=(...J)=>{I(...J),z()}}let F=M?new Array(e.length).fill(Zt):Zt;const $=I=>{if(!(!(u.flags&1)||!u.dirty&&!I))if(t){const J=u.run();if(o||D||(M?J.some((ke,ye)=>Fe(ke,F[ye])):Fe(J,F))){C&&C();const ke=et;et=u;try{const ye=[J,F===Zt?void 0:M&&F[0]===Zt?[]:F,T];F=J,c?c(t,3,ye):t(...ye)}finally{et=ke}}}else u.run()};return l&&l($),u=new yo(h),u.scheduler=r?()=>r($,!1):$,T=I=>or(I,!1,u),C=u.onStop=()=>{const I=rs.get(u);if(I){if(c)c(I,4);else for(const J of I)J();rs.delete(u)}},t?n?$(!0):F=u.run():r?r($.bind(null,!0),!0):u.run(),z.pause=u.pause.bind(u),z.resume=u.resume.bind(u),z.stop=z,z}function De(e,t=1/0,s){if(t<=0||!B(e)||e.__v_skip||(s=s||new Map,(s.get(e)||0)>=t))return e;if(s.set(e,t),t--,le(e))De(e.value,t,s);else if(E(e))for(let n=0;n<e.length;n++)De(e[n],t,s);else if(gs(e)||dt(e))e.forEach(n=>{De(n,t,s)});else if(ho(e)){for(const n in e)De(e[n],t,s);for(const n of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,n)&&De(e[n],t,s)}return e}/**
* @vue/runtime-core v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function kt(e,t,s,n){try{return n?e(...n):e()}catch(o){xs(o,t,s)}}function Ie(e,t,s,n){if(O(e)){const o=kt(e,t,s,n);return o&&uo(o)&&o.catch(i=>{xs(i,t,s)}),o}if(E(e)){const o=[];for(let i=0;i<e.length;i++)o.push(Ie(e[i],t,s,n));return o}}function xs(e,t,s,n=!0){const o=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:r}=t&&t.appContext.config||W;if(t){let l=t.parent;const c=t.proxy,d=`https://vuejs.org/error-reference/#runtime-${s}`;for(;l;){const u=l.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](e,c,d)===!1)return}l=l.parent}if(i){Be(),kt(i,null,10,[e,c,d]),Ve();return}}rr(e,s,o,n,r)}function rr(e,t,s,n=!0,o=!1){if(o)throw e;console.error(e)}const ie=[];let Ce=-1;const pt=[];let $e=null,ft=0;const Do=Promise.resolve();let ls=null;function No(e){const t=ls||Do;return e?t.then(this?e.bind(this):e):t}function lr(e){let t=Ce+1,s=ie.length;for(;t<s;){const n=t+s>>>1,o=ie[n],i=jt(o);i<e||i===e&&o.flags&2?t=n+1:s=n}return t}function hn(e){if(!(e.flags&1)){const t=jt(e),s=ie[ie.length-1];!s||!(e.flags&2)&&t>=jt(s)?ie.push(e):ie.splice(lr(t),0,e),e.flags|=1,jo()}}function jo(){ls||(ls=Do.then(Vo))}function cr(e){E(e)?pt.push(...e):$e&&e.id===-1?$e.splice(ft+1,0,e):e.flags&1||(pt.push(e),e.flags|=1),jo()}function Fn(e,t,s=Ce+1){for(;s<ie.length;s++){const n=ie[s];if(n&&n.flags&2){if(e&&n.id!==e.uid)continue;ie.splice(s,1),s--,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function Bo(e){if(pt.length){const t=[...new Set(pt)].sort((s,n)=>jt(s)-jt(n));if(pt.length=0,$e){$e.push(...t);return}for($e=t,ft=0;ft<$e.length;ft++){const s=$e[ft];s.flags&4&&(s.flags&=-2),s.flags&8||s(),s.flags&=-2}$e=null,ft=0}}const jt=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Vo(e){const t=ge;try{for(Ce=0;Ce<ie.length;Ce++){const s=ie[Ce];s&&!(s.flags&8)&&(s.flags&4&&(s.flags&=-2),kt(s,s.i,s.i?15:14),s.flags&4||(s.flags&=-2))}}finally{for(;Ce<ie.length;Ce++){const s=ie[Ce];s&&(s.flags&=-2)}Ce=-1,ie.length=0,Bo(),ls=null,(ie.length||pt.length)&&Vo()}}let pe=null,Wo=null;function cs(e){const t=pe;return pe=e,Wo=e&&e.type.__scopeId||null,t}function ar(e,t=pe,s){if(!t||e._n)return e;const n=(...o)=>{n._d&&zn(-1);const i=cs(t);let r;try{r=e(...o)}finally{cs(i),n._d&&zn(1)}return r};return n._n=!0,n._c=!0,n._d=!0,n}function Ln(e,t){if(pe===null)return e;const s=As(pe),n=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[i,r,l,c=W]=t[o];i&&(O(i)&&(i={mounted:i,updated:i}),i.deep&&De(r),n.push({dir:i,instance:s,value:r,oldValue:void 0,arg:l,modifiers:c}))}return e}function Ze(e,t,s,n){const o=e.dirs,i=t&&t.dirs;for(let r=0;r<o.length;r++){const l=o[r];i&&(l.oldValue=i[r].value);let c=l.dir[n];c&&(Be(),Ie(c,s,8,[e.el,l,e,t]),Ve())}}function fr(e,t){if(se){let s=se.provides;const n=se.parent&&se.parent.provides;n===s&&(s=se.provides=Object.create(n)),s[e]=t}}function es(e,t,s=!1){const n=pl();if(n||ht){let o=ht?ht._context.provides:n?n.parent==null||n.ce?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(o&&e in o)return o[e];if(arguments.length>1)return s&&O(t)?t.call(n&&n.proxy):t}}const ur=Symbol.for("v-scx"),dr=()=>es(ur);function js(e,t,s){return Ho(e,t,s)}function Ho(e,t,s=W){const{immediate:n,deep:o,flush:i,once:r}=s,l=ee({},s),c=t&&n||!t&&i!=="post";let d;if(Vt){if(i==="sync"){const T=dr();d=T.__watcherHandles||(T.__watcherHandles=[])}else if(!c){const T=()=>{};return T.stop=ge,T.resume=ge,T.pause=ge,T}}const u=se;l.call=(T,D,M)=>Ie(T,u,D,M);let h=!1;i==="post"?l.scheduler=T=>{ce(T,u&&u.suspense)}:i!=="sync"&&(h=!0,l.scheduler=(T,D)=>{D?T():hn(T)}),l.augmentJob=T=>{t&&(T.flags|=4),h&&(T.flags|=2,u&&(T.id=u.uid,T.i=u))};const C=ir(e,t,l);return Vt&&(d?d.push(C):c&&C()),C}function pr(e,t,s){const n=this.proxy,o=Y(e)?e.includes(".")?ko(n,e):()=>n[e]:e.bind(n,n);let i;O(t)?i=t:(i=t.handler,s=t);const r=Ut(this),l=Ho(o,i.bind(n),s);return r(),l}function ko(e,t){const s=t.split(".");return()=>{let n=e;for(let o=0;o<s.length&&n;o++)n=n[s[o]];return n}}const hr=Symbol("_vte"),mr=e=>e.__isTeleport,gr=Symbol("_leaveCb");function mn(e,t){e.shapeFlag&6&&e.component?(e.transition=t,mn(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Uo(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Dn(e,t){let s;return!!((s=Object.getOwnPropertyDescriptor(e,t))&&!s.configurable)}const as=new WeakMap;function It(e,t,s,n,o=!1){if(E(e)){e.forEach((M,G)=>It(M,t&&(E(t)?t[G]:t),s,n,o));return}if(Mt(n)&&!o){n.shapeFlag&512&&n.type.__asyncResolved&&n.component.subTree.component&&It(e,t,s,n.component.subTree);return}const i=n.shapeFlag&4?As(n.component):n.el,r=o?null:i,{i:l,r:c}=e,d=t&&t.r,u=l.refs===W?l.refs={}:l.refs,h=l.setupState,C=j(h),T=h===W?fo:M=>Dn(u,M)?!1:N(C,M),D=(M,G)=>!(G&&Dn(u,G));if(d!=null&&d!==c){if(Nn(t),Y(d))u[d]=null,T(d)&&(h[d]=null);else if(le(d)){const M=t;D(d,M.k)&&(d.value=null),M.k&&(u[M.k]=null)}}if(O(c))kt(c,l,12,[r,u]);else{const M=Y(c),G=le(c);if(M||G){const z=()=>{if(e.f){const F=M?T(c)?h[c]:u[c]:D()||!e.k?c.value:u[e.k];if(o)E(F)&&nn(F,i);else if(E(F))F.includes(i)||F.push(i);else if(M)u[c]=[i],T(c)&&(h[c]=u[c]);else{const $=[i];D(c,e.k)&&(c.value=$),e.k&&(u[e.k]=$)}}else M?(u[c]=r,T(c)&&(h[c]=r)):G&&(D(c,e.k)&&(c.value=r),e.k&&(u[e.k]=r))};if(r){const F=()=>{z(),as.delete(e)};F.id=-1,as.set(e,F),ce(F,s)}else Nn(e),z()}}}function Nn(e){const t=as.get(e);t&&(t.flags|=8,as.delete(e))}ws().requestIdleCallback;ws().cancelIdleCallback;const Mt=e=>!!e.type.__asyncLoader,$o=e=>e.type.__isKeepAlive;function br(e,t){zo(e,"a",t)}function _r(e,t){zo(e,"da",t)}function zo(e,t,s=se){const n=e.__wdc||(e.__wdc=()=>{let o=s;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(Cs(t,n,s),s){let o=s.parent;for(;o&&o.parent;)$o(o.parent.vnode)&&yr(n,t,s,o),o=o.parent}}function yr(e,t,s,n){const o=Cs(t,e,n,!0);Ko(()=>{nn(n[t],o)},s)}function Cs(e,t,s=se,n=!1){if(s){const o=s[e]||(s[e]=[]),i=t.__weh||(t.__weh=(...r)=>{Be();const l=Ut(s),c=Ie(t,s,e,r);return l(),Ve(),c});return n?o.unshift(i):o.push(i),i}}const He=e=>(t,s=se)=>{(!Vt||e==="sp")&&Cs(e,(...n)=>t(...n),s)},wr=He("bm"),vr=He("m"),xr=He("bu"),Cr=He("u"),Tr=He("bum"),Ko=He("um"),Sr=He("sp"),Ar=He("rtg"),Pr=He("rtc");function Er(e,t=se){Cs("ec",e,t)}const Go="components";function Bs(e,t){return Mr(Go,e,!0,t)||e}const Ir=Symbol.for("v-ndc");function Mr(e,t,s=!0,n=!1){const o=pe||se;if(o){const i=o.type;if(e===Go){const l=_l(i,!1);if(l&&(l===t||l===re(t)||l===_s(re(t))))return i}const r=jn(o[e]||i[e],t)||jn(o.appContext[e],t);return!r&&n?i:r}}function jn(e,t){return e&&(e[t]||e[re(t)]||e[_s(re(t))])}function Or(e,t,s,n){let o;const i=s&&s[n],r=E(e);if(r||Y(e)){const l=r&&ot(e);let c=!1,d=!1;l&&(c=!_e(e),d=Ke(e),e=vs(e)),o=new Array(e.length);for(let u=0,h=e.length;u<h;u++)o[u]=t(c?d?bt(We(e[u])):We(e[u]):e[u],u,void 0,i&&i[u])}else if(typeof e=="number"){o=new Array(e);for(let l=0;l<e;l++)o[l]=t(l+1,l,void 0,i&&i[l])}else if(B(e))if(e[Symbol.iterator])o=Array.from(e,(l,c)=>t(l,c,void 0,i&&i[c]));else{const l=Object.keys(e);o=new Array(l.length);for(let c=0,d=l.length;c<d;c++){const u=l[c];o[c]=t(e[u],u,c,i&&i[c])}}else o=[];return s&&(s[n]=o),o}const Js=e=>e?pi(e)?As(e):Js(e.parent):null,Ot=ee(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Js(e.parent),$root:e=>Js(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>gn(e),$forceUpdate:e=>e.f||(e.f=()=>{hn(e.update)}),$nextTick:e=>e.n||(e.n=No.bind(e.proxy)),$watch:e=>pr.bind(e)}),Vs=(e,t)=>e!==W&&!e.__isScriptSetup&&N(e,t),Rr={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:s,setupState:n,data:o,props:i,accessCache:r,type:l,appContext:c}=e;if(t[0]!=="$"){const C=r[t];if(C!==void 0)switch(C){case 1:return n[t];case 2:return o[t];case 4:return s[t];case 3:return i[t]}else{if(Vs(n,t))return r[t]=1,n[t];if(o!==W&&N(o,t))return r[t]=2,o[t];if(N(i,t))return r[t]=3,i[t];if(s!==W&&N(s,t))return r[t]=4,s[t];Zs&&(r[t]=0)}}const d=Ot[t];let u,h;if(d)return t==="$attrs"&&te(e.attrs,"get",""),d(e);if((u=l.__cssModules)&&(u=u[t]))return u;if(s!==W&&N(s,t))return r[t]=4,s[t];if(h=c.config.globalProperties,N(h,t))return h[t]},set({_:e},t,s){const{data:n,setupState:o,ctx:i}=e;return Vs(o,t)?(o[t]=s,!0):n!==W&&N(n,t)?(n[t]=s,!0):N(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=s,!0)},has({_:{data:e,setupState:t,accessCache:s,ctx:n,appContext:o,props:i,type:r}},l){let c;return!!(s[l]||e!==W&&l[0]!=="$"&&N(e,l)||Vs(t,l)||N(i,l)||N(n,l)||N(Ot,l)||N(o.config.globalProperties,l)||(c=r.__cssModules)&&c[l])},defineProperty(e,t,s){return s.get!=null?e._.accessCache[t]=0:N(s,"value")&&this.set(e,t,s.value,null),Reflect.defineProperty(e,t,s)}};function Bn(e){return E(e)?e.reduce((t,s)=>(t[s]=null,t),{}):e}let Zs=!0;function Fr(e){const t=gn(e),s=e.proxy,n=e.ctx;Zs=!1,t.beforeCreate&&Vn(t.beforeCreate,e,"bc");const{data:o,computed:i,methods:r,watch:l,provide:c,inject:d,created:u,beforeMount:h,mounted:C,beforeUpdate:T,updated:D,activated:M,deactivated:G,beforeDestroy:z,beforeUnmount:F,destroyed:$,unmounted:I,render:J,renderTracked:ke,renderTriggered:ye,errorCaptured:Ue,serverPrefetch:$t,expose:qe,inheritAttrs:yt,components:zt,directives:Kt,filters:Es}=t;if(d&&Lr(d,n,null),r)for(const K in r){const H=r[K];O(H)&&(n[K]=H.bind(s))}if(o){const K=o.call(s,s);B(K)&&(e.data=un(K))}if(Zs=!0,i)for(const K in i){const H=i[K],Ye=O(H)?H.bind(s,s):O(H.get)?H.get.bind(s,s):ge,Gt=!O(H)&&O(H.set)?H.set.bind(s):ge,Je=wl({get:Ye,set:Gt});Object.defineProperty(n,K,{enumerable:!0,configurable:!0,get:()=>Je.value,set:we=>Je.value=we})}if(l)for(const K in l)qo(l[K],n,s,K);if(c){const K=O(c)?c.call(s):c;Reflect.ownKeys(K).forEach(H=>{fr(H,K[H])})}u&&Vn(u,e,"c");function ne(K,H){E(H)?H.forEach(Ye=>K(Ye.bind(s))):H&&K(H.bind(s))}if(ne(wr,h),ne(vr,C),ne(xr,T),ne(Cr,D),ne(br,M),ne(_r,G),ne(Er,Ue),ne(Pr,ke),ne(Ar,ye),ne(Tr,F),ne(Ko,I),ne(Sr,$t),E(qe))if(qe.length){const K=e.exposed||(e.exposed={});qe.forEach(H=>{Object.defineProperty(K,H,{get:()=>s[H],set:Ye=>s[H]=Ye,enumerable:!0})})}else e.exposed||(e.exposed={});J&&e.render===ge&&(e.render=J),yt!=null&&(e.inheritAttrs=yt),zt&&(e.components=zt),Kt&&(e.directives=Kt),$t&&Uo(e)}function Lr(e,t,s=ge){E(e)&&(e=Xs(e));for(const n in e){const o=e[n];let i;B(o)?"default"in o?i=es(o.from||n,o.default,!0):i=es(o.from||n):i=es(o),le(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:r=>i.value=r}):t[n]=i}}function Vn(e,t,s){Ie(E(e)?e.map(n=>n.bind(t.proxy)):e.bind(t.proxy),t,s)}function qo(e,t,s,n){let o=n.includes(".")?ko(s,n):()=>s[n];if(Y(e)){const i=t[e];O(i)&&js(o,i)}else if(O(e))js(o,e.bind(s));else if(B(e))if(E(e))e.forEach(i=>qo(i,t,s,n));else{const i=O(e.handler)?e.handler.bind(s):t[e.handler];O(i)&&js(o,i,e)}}function gn(e){const t=e.type,{mixins:s,extends:n}=t,{mixins:o,optionsCache:i,config:{optionMergeStrategies:r}}=e.appContext,l=i.get(t);let c;return l?c=l:!o.length&&!s&&!n?c=t:(c={},o.length&&o.forEach(d=>fs(c,d,r,!0)),fs(c,t,r)),B(t)&&i.set(t,c),c}function fs(e,t,s,n=!1){const{mixins:o,extends:i}=t;i&&fs(e,i,s,!0),o&&o.forEach(r=>fs(e,r,s,!0));for(const r in t)if(!(n&&r==="expose")){const l=Dr[r]||s&&s[r];e[r]=l?l(e[r],t[r]):t[r]}return e}const Dr={data:Wn,props:Hn,emits:Hn,methods:Tt,computed:Tt,beforeCreate:oe,created:oe,beforeMount:oe,mounted:oe,beforeUpdate:oe,updated:oe,beforeDestroy:oe,beforeUnmount:oe,destroyed:oe,unmounted:oe,activated:oe,deactivated:oe,errorCaptured:oe,serverPrefetch:oe,components:Tt,directives:Tt,watch:jr,provide:Wn,inject:Nr};function Wn(e,t){return t?e?function(){return ee(O(e)?e.call(this,this):e,O(t)?t.call(this,this):t)}:t:e}function Nr(e,t){return Tt(Xs(e),Xs(t))}function Xs(e){if(E(e)){const t={};for(let s=0;s<e.length;s++)t[e[s]]=e[s];return t}return e}function oe(e,t){return e?[...new Set([].concat(e,t))]:t}function Tt(e,t){return e?ee(Object.create(null),e,t):t}function Hn(e,t){return e?E(e)&&E(t)?[...new Set([...e,...t])]:ee(Object.create(null),Bn(e),Bn(t??{})):t}function jr(e,t){if(!e)return t;if(!t)return e;const s=ee(Object.create(null),e);for(const n in t)s[n]=oe(e[n],t[n]);return s}function Yo(){return{app:null,config:{isNativeTag:fo,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Br=0;function Vr(e,t){return function(n,o=null){O(n)||(n=ee({},n)),o!=null&&!B(o)&&(o=null);const i=Yo(),r=new WeakSet,l=[];let c=!1;const d=i.app={_uid:Br++,_component:n,_props:o,_container:null,_context:i,_instance:null,version:vl,get config(){return i.config},set config(u){},use(u,...h){return r.has(u)||(u&&O(u.install)?(r.add(u),u.install(d,...h)):O(u)&&(r.add(u),u(d,...h))),d},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),d},component(u,h){return h?(i.components[u]=h,d):i.components[u]},directive(u,h){return h?(i.directives[u]=h,d):i.directives[u]},mount(u,h,C){if(!c){const T=d._ceVNode||Pe(n,o);return T.appContext=i,C===!0?C="svg":C===!1&&(C=void 0),h&&t?t(T,u):e(T,u,C),c=!0,d._container=u,u.__vue_app__=d,As(T.component)}},onUnmount(u){l.push(u)},unmount(){c&&(Ie(l,d._instance,16),e(null,d._container),delete d._container.__vue_app__)},provide(u,h){return i.provides[u]=h,d},runWithContext(u){const h=ht;ht=d;try{return u()}finally{ht=h}}};return d}}let ht=null;const Wr=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${re(t)}Modifiers`]||e[`${rt(t)}Modifiers`];function Hr(e,t,...s){if(e.isUnmounted)return;const n=e.vnode.props||W;let o=s;const i=t.startsWith("update:"),r=i&&Wr(n,t.slice(7));r&&(r.trim&&(o=s.map(u=>Y(u)?u.trim():u)),r.number&&(o=s.map(ys)));let l,c=n[l=Rs(t)]||n[l=Rs(re(t))];!c&&i&&(c=n[l=Rs(rt(t))]),c&&Ie(c,e,6,o);const d=n[l+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[l])return;e.emitted[l]=!0,Ie(d,e,6,o)}}const kr=new WeakMap;function Jo(e,t,s=!1){const n=s?kr:t.emitsCache,o=n.get(e);if(o!==void 0)return o;const i=e.emits;let r={},l=!1;if(!O(e)){const c=d=>{const u=Jo(d,t,!0);u&&(l=!0,ee(r,u))};!s&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!i&&!l?(B(e)&&n.set(e,null),null):(E(i)?i.forEach(c=>r[c]=null):ee(r,i),B(e)&&n.set(e,r),r)}function Ts(e,t){return!e||!hs(t)?!1:(t=t.slice(2).replace(/Once$/,""),N(e,t[0].toLowerCase()+t.slice(1))||N(e,rt(t))||N(e,t))}function Ws(e){const{type:t,vnode:s,proxy:n,withProxy:o,propsOptions:[i],slots:r,attrs:l,emit:c,render:d,renderCache:u,props:h,data:C,setupState:T,ctx:D,inheritAttrs:M}=e,G=cs(e);let z,F;try{if(s.shapeFlag&4){const I=o||n,J=I;z=Ae(d.call(J,I,u,h,T,C,D)),F=l}else{const I=t;z=Ae(I.length>1?I(h,{attrs:l,slots:r,emit:c}):I(h,null)),F=t.props?l:Ur(l)}}catch(I){Rt.length=0,xs(I,e,1),z=Pe(Ge)}let $=z;if(F&&M!==!1){const I=Object.keys(F),{shapeFlag:J}=$;I.length&&J&7&&(i&&I.some(ms)&&(F=$r(F,i)),$=_t($,F,!1,!0))}return s.dirs&&($=_t($,null,!1,!0),$.dirs=$.dirs?$.dirs.concat(s.dirs):s.dirs),s.transition&&mn($,s.transition),z=$,cs(G),z}const Ur=e=>{let t;for(const s in e)(s==="class"||s==="style"||hs(s))&&((t||(t={}))[s]=e[s]);return t},$r=(e,t)=>{const s={};for(const n in e)(!ms(n)||!(n.slice(9)in t))&&(s[n]=e[n]);return s};function zr(e,t,s){const{props:n,children:o,component:i}=e,{props:r,children:l,patchFlag:c}=t,d=i.emitsOptions;if(t.dirs||t.transition)return!0;if(s&&c>=0){if(c&1024)return!0;if(c&16)return n?kn(n,r,d):!!r;if(c&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const C=u[h];if(Zo(r,n,C)&&!Ts(d,C))return!0}}}else return(o||l)&&(!l||!l.$stable)?!0:n===r?!1:n?r?kn(n,r,d):!0:!!r;return!1}function kn(e,t,s){const n=Object.keys(t);if(n.length!==Object.keys(e).length)return!0;for(let o=0;o<n.length;o++){const i=n[o];if(Zo(t,e,i)&&!Ts(s,i))return!0}return!1}function Zo(e,t,s){const n=e[s],o=t[s];return s==="style"&&B(n)&&B(o)?!Ht(n,o):n!==o}function Kr({vnode:e,parent:t,suspense:s},n){for(;t;){const o=t.subTree;if(o.suspense&&o.suspense.activeBranch===e&&(o.suspense.vnode.el=o.el=n,e=o),o===e)(e=t.vnode).el=n,t=t.parent;else break}s&&s.activeBranch===e&&(s.vnode.el=n)}const Xo={},Qo=()=>Object.create(Xo),ei=e=>Object.getPrototypeOf(e)===Xo;function Gr(e,t,s,n=!1){const o={},i=Qo();e.propsDefaults=Object.create(null),ti(e,t,o,i);for(const r in e.propsOptions[0])r in o||(o[r]=void 0);s?e.props=n?o:Xi(o):e.type.props?e.props=o:e.props=i,e.attrs=i}function qr(e,t,s,n){const{props:o,attrs:i,vnode:{patchFlag:r}}=e,l=j(o),[c]=e.propsOptions;let d=!1;if((n||r>0)&&!(r&16)){if(r&8){const u=e.vnode.dynamicProps;for(let h=0;h<u.length;h++){let C=u[h];if(Ts(e.emitsOptions,C))continue;const T=t[C];if(c)if(N(i,C))T!==i[C]&&(i[C]=T,d=!0);else{const D=re(C);o[D]=Qs(c,l,D,T,e,!1)}else T!==i[C]&&(i[C]=T,d=!0)}}}else{ti(e,t,o,i)&&(d=!0);let u;for(const h in l)(!t||!N(t,h)&&((u=rt(h))===h||!N(t,u)))&&(c?s&&(s[h]!==void 0||s[u]!==void 0)&&(o[h]=Qs(c,l,h,void 0,e,!0)):delete o[h]);if(i!==l)for(const h in i)(!t||!N(t,h))&&(delete i[h],d=!0)}d&&Le(e.attrs,"set","")}function ti(e,t,s,n){const[o,i]=e.propsOptions;let r=!1,l;if(t)for(let c in t){if(At(c))continue;const d=t[c];let u;o&&N(o,u=re(c))?!i||!i.includes(u)?s[u]=d:(l||(l={}))[u]=d:Ts(e.emitsOptions,c)||(!(c in n)||d!==n[c])&&(n[c]=d,r=!0)}if(i){const c=j(s),d=l||W;for(let u=0;u<i.length;u++){const h=i[u];s[h]=Qs(o,c,h,d[h],e,!N(d,h))}}return r}function Qs(e,t,s,n,o,i){const r=e[s];if(r!=null){const l=N(r,"default");if(l&&n===void 0){const c=r.default;if(r.type!==Function&&!r.skipFactory&&O(c)){const{propsDefaults:d}=o;if(s in d)n=d[s];else{const u=Ut(o);n=d[s]=c.call(null,t),u()}}else n=c;o.ce&&o.ce._setProp(s,n)}r[0]&&(i&&!l?n=!1:r[1]&&(n===""||n===rt(s))&&(n=!0))}return n}const Yr=new WeakMap;function si(e,t,s=!1){const n=s?Yr:t.propsCache,o=n.get(e);if(o)return o;const i=e.props,r={},l=[];let c=!1;if(!O(e)){const u=h=>{c=!0;const[C,T]=si(h,t,!0);ee(r,C),T&&l.push(...T)};!s&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!c)return B(e)&&n.set(e,ut),ut;if(E(i))for(let u=0;u<i.length;u++){const h=re(i[u]);Un(h)&&(r[h]=W)}else if(i)for(const u in i){const h=re(u);if(Un(h)){const C=i[u],T=r[h]=E(C)||O(C)?{type:C}:ee({},C),D=T.type;let M=!1,G=!0;if(E(D))for(let z=0;z<D.length;++z){const F=D[z],$=O(F)&&F.name;if($==="Boolean"){M=!0;break}else $==="String"&&(G=!1)}else M=O(D)&&D.name==="Boolean";T[0]=M,T[1]=G,(M||N(T,"default"))&&l.push(h)}}const d=[r,l];return B(e)&&n.set(e,d),d}function Un(e){return e[0]!=="$"&&!At(e)}const bn=e=>e==="_"||e==="_ctx"||e==="$stable",_n=e=>E(e)?e.map(Ae):[Ae(e)],Jr=(e,t,s)=>{if(t._n)return t;const n=ar((...o)=>_n(t(...o)),s);return n._c=!1,n},ni=(e,t,s)=>{const n=e._ctx;for(const o in e){if(bn(o))continue;const i=e[o];if(O(i))t[o]=Jr(o,i,n);else if(i!=null){const r=_n(i);t[o]=()=>r}}},oi=(e,t)=>{const s=_n(t);e.slots.default=()=>s},ii=(e,t,s)=>{for(const n in t)(s||!bn(n))&&(e[n]=t[n])},Zr=(e,t,s)=>{const n=e.slots=Qo();if(e.vnode.shapeFlag&32){const o=t._;o?(ii(n,t,s),s&&mo(n,"_",o,!0)):ni(t,n)}else t&&oi(e,t)},Xr=(e,t,s)=>{const{vnode:n,slots:o}=e;let i=!0,r=W;if(n.shapeFlag&32){const l=t._;l?s&&l===1?i=!1:ii(o,t,s):(i=!t.$stable,ni(t,o)),r=t}else t&&(oi(e,t),r={default:1});if(i)for(const l in o)!bn(l)&&r[l]==null&&delete o[l]},ce=nl;function Qr(e){return el(e)}function el(e,t){const s=ws();s.__VUE__=!0;const{insert:n,remove:o,patchProp:i,createElement:r,createText:l,createComment:c,setText:d,setElementText:u,parentNode:h,nextSibling:C,setScopeId:T=ge,insertStaticContent:D}=e,M=(a,f,p,_=null,m=null,g=null,v=void 0,w=null,y=!!f.dynamicChildren)=>{if(a===f)return;a&&!Ct(a,f)&&(_=qt(a),we(a,m,g,!0),a=null),f.patchFlag===-2&&(y=!1,f.dynamicChildren=null);const{type:b,ref:A,shapeFlag:x}=f;switch(b){case Ss:G(a,f,p,_);break;case Ge:z(a,f,p,_);break;case ts:a==null&&F(f,p,_,v);break;case Se:zt(a,f,p,_,m,g,v,w,y);break;default:x&1?J(a,f,p,_,m,g,v,w,y):x&6?Kt(a,f,p,_,m,g,v,w,y):(x&64||x&128)&&b.process(a,f,p,_,m,g,v,w,y,ct)}A!=null&&m?It(A,a&&a.ref,g,f||a,!f):A==null&&a&&a.ref!=null&&It(a.ref,null,g,a,!0)},G=(a,f,p,_)=>{if(a==null)n(f.el=l(f.children),p,_);else{const m=f.el=a.el;f.children!==a.children&&d(m,f.children)}},z=(a,f,p,_)=>{a==null?n(f.el=c(f.children||""),p,_):f.el=a.el},F=(a,f,p,_)=>{[a.el,a.anchor]=D(a.children,f,p,_,a.el,a.anchor)},$=({el:a,anchor:f},p,_)=>{let m;for(;a&&a!==f;)m=C(a),n(a,p,_),a=m;n(f,p,_)},I=({el:a,anchor:f})=>{let p;for(;a&&a!==f;)p=C(a),o(a),a=p;o(f)},J=(a,f,p,_,m,g,v,w,y)=>{if(f.type==="svg"?v="svg":f.type==="math"&&(v="mathml"),a==null)ke(f,p,_,m,g,v,w,y);else{const b=a.el&&a.el._isVueCE?a.el:null;try{b&&b._beginPatch(),$t(a,f,m,g,v,w,y)}finally{b&&b._endPatch()}}},ke=(a,f,p,_,m,g,v,w)=>{let y,b;const{props:A,shapeFlag:x,transition:S,dirs:P}=a;if(y=a.el=r(a.type,g,A&&A.is,A),x&8?u(y,a.children):x&16&&Ue(a.children,y,null,_,m,Hs(a,g),v,w),P&&Ze(a,null,_,"created"),ye(y,a,a.scopeId,v,_),A){for(const V in A)V!=="value"&&!At(V)&&i(y,V,null,A[V],g,_);"value"in A&&i(y,"value",null,A.value,g),(b=A.onVnodeBeforeMount)&&xe(b,_,a)}P&&Ze(a,null,_,"beforeMount");const L=tl(m,S);L&&S.beforeEnter(y),n(y,f,p),((b=A&&A.onVnodeMounted)||L||P)&&ce(()=>{try{b&&xe(b,_,a),L&&S.enter(y),P&&Ze(a,null,_,"mounted")}finally{}},m)},ye=(a,f,p,_,m)=>{if(p&&T(a,p),_)for(let g=0;g<_.length;g++)T(a,_[g]);if(m){let g=m.subTree;if(f===g||ai(g.type)&&(g.ssContent===f||g.ssFallback===f)){const v=m.vnode;ye(a,v,v.scopeId,v.slotScopeIds,m.parent)}}},Ue=(a,f,p,_,m,g,v,w,y=0)=>{for(let b=y;b<a.length;b++){const A=a[b]=w?Re(a[b]):Ae(a[b]);M(null,A,f,p,_,m,g,v,w)}},$t=(a,f,p,_,m,g,v)=>{const w=f.el=a.el;let{patchFlag:y,dynamicChildren:b,dirs:A}=f;y|=a.patchFlag&16;const x=a.props||W,S=f.props||W;let P;if(p&&Xe(p,!1),(P=S.onVnodeBeforeUpdate)&&xe(P,p,f,a),A&&Ze(f,a,p,"beforeUpdate"),p&&Xe(p,!0),(x.innerHTML&&S.innerHTML==null||x.textContent&&S.textContent==null)&&u(w,""),b?qe(a.dynamicChildren,b,w,p,_,Hs(f,m),g):v||H(a,f,w,null,p,_,Hs(f,m),g,!1),y>0){if(y&16)yt(w,x,S,p,m);else if(y&2&&x.class!==S.class&&i(w,"class",null,S.class,m),y&4&&i(w,"style",x.style,S.style,m),y&8){const L=f.dynamicProps;for(let V=0;V<L.length;V++){const k=L[V],q=x[k],Z=S[k];(Z!==q||k==="value")&&i(w,k,q,Z,m,p)}}y&1&&a.children!==f.children&&u(w,f.children)}else!v&&b==null&&yt(w,x,S,p,m);((P=S.onVnodeUpdated)||A)&&ce(()=>{P&&xe(P,p,f,a),A&&Ze(f,a,p,"updated")},_)},qe=(a,f,p,_,m,g,v)=>{for(let w=0;w<f.length;w++){const y=a[w],b=f[w],A=y.el&&(y.type===Se||!Ct(y,b)||y.shapeFlag&198)?h(y.el):p;M(y,b,A,null,_,m,g,v,!0)}},yt=(a,f,p,_,m)=>{if(f!==p){if(f!==W)for(const g in f)!At(g)&&!(g in p)&&i(a,g,f[g],null,m,_);for(const g in p){if(At(g))continue;const v=p[g],w=f[g];v!==w&&g!=="value"&&i(a,g,w,v,m,_)}"value"in p&&i(a,"value",f.value,p.value,m)}},zt=(a,f,p,_,m,g,v,w,y)=>{const b=f.el=a?a.el:l(""),A=f.anchor=a?a.anchor:l("");let{patchFlag:x,dynamicChildren:S,slotScopeIds:P}=f;P&&(w=w?w.concat(P):P),a==null?(n(b,p,_),n(A,p,_),Ue(f.children||[],p,A,m,g,v,w,y)):x>0&&x&64&&S&&a.dynamicChildren&&a.dynamicChildren.length===S.length?(qe(a.dynamicChildren,S,p,m,g,v,w),(f.key!=null||m&&f===m.subTree)&&ri(a,f,!0)):H(a,f,p,A,m,g,v,w,y)},Kt=(a,f,p,_,m,g,v,w,y)=>{f.slotScopeIds=w,a==null?f.shapeFlag&512?m.ctx.activate(f,p,_,v,y):Es(f,p,_,m,g,v,y):Cn(a,f,y)},Es=(a,f,p,_,m,g,v)=>{const w=a.component=dl(a,_,m);if($o(a)&&(w.ctx.renderer=ct),hl(w,!1,v),w.asyncDep){if(m&&m.registerDep(w,ne,v),!a.el){const y=w.subTree=Pe(Ge);z(null,y,f,p),a.placeholder=y.el}}else ne(w,a,f,p,m,g,v)},Cn=(a,f,p)=>{const _=f.component=a.component;if(zr(a,f,p))if(_.asyncDep&&!_.asyncResolved){K(_,f,p);return}else _.next=f,_.update();else f.el=a.el,_.vnode=f},ne=(a,f,p,_,m,g,v)=>{const w=()=>{if(a.isMounted){let{next:x,bu:S,u:P,parent:L,vnode:V}=a;{const ue=li(a);if(ue){x&&(x.el=V.el,K(a,x,v)),ue.asyncDep.then(()=>{ce(()=>{a.isUnmounted||b()},m)});return}}let k=x,q;Xe(a,!1),x?(x.el=V.el,K(a,x,v)):x=V,S&&Qt(S),(q=x.props&&x.props.onVnodeBeforeUpdate)&&xe(q,L,x,V),Xe(a,!0);const Z=Ws(a),me=a.subTree;a.subTree=Z,M(me,Z,h(me.el),qt(me),a,m,g),x.el=Z.el,k===null&&Kr(a,Z.el),P&&ce(P,m),(q=x.props&&x.props.onVnodeUpdated)&&ce(()=>xe(q,L,x,V),m)}else{let x;const{el:S,props:P}=f,{bm:L,m:V,parent:k,root:q,type:Z}=a,me=Mt(f);if(Xe(a,!1),L&&Qt(L),!me&&(x=P&&P.onVnodeBeforeMount)&&xe(x,k,f),Xe(a,!0),S&&Os){const ue=()=>{a.subTree=Ws(a),Os(S,a.subTree,a,m,null)};me&&Z.__asyncHydrate?Z.__asyncHydrate(S,a,ue):ue()}else{q.ce&&q.ce._hasShadowRoot()&&q.ce._injectChildStyle(Z,a.parent?a.parent.type:void 0);const ue=a.subTree=Ws(a);M(null,ue,p,_,a,m,g),f.el=ue.el}if(V&&ce(V,m),!me&&(x=P&&P.onVnodeMounted)){const ue=f;ce(()=>xe(x,k,ue),m)}(f.shapeFlag&256||k&&Mt(k.vnode)&&k.vnode.shapeFlag&256)&&a.a&&ce(a.a,m),a.isMounted=!0,f=p=_=null}};a.scope.on();const y=a.effect=new yo(w);a.scope.off();const b=a.update=y.run.bind(y),A=a.job=y.runIfDirty.bind(y);A.i=a,A.id=a.uid,y.scheduler=()=>hn(A),Xe(a,!0),b()},K=(a,f,p)=>{f.component=a;const _=a.vnode.props;a.vnode=f,a.next=null,qr(a,f.props,_,p),Xr(a,f.children,p),Be(),Fn(a),Ve()},H=(a,f,p,_,m,g,v,w,y=!1)=>{const b=a&&a.children,A=a?a.shapeFlag:0,x=f.children,{patchFlag:S,shapeFlag:P}=f;if(S>0){if(S&128){Gt(b,x,p,_,m,g,v,w,y);return}else if(S&256){Ye(b,x,p,_,m,g,v,w,y);return}}P&8?(A&16&&wt(b,m,g),x!==b&&u(p,x)):A&16?P&16?Gt(b,x,p,_,m,g,v,w,y):wt(b,m,g,!0):(A&8&&u(p,""),P&16&&Ue(x,p,_,m,g,v,w,y))},Ye=(a,f,p,_,m,g,v,w,y)=>{a=a||ut,f=f||ut;const b=a.length,A=f.length,x=Math.min(b,A);let S;for(S=0;S<x;S++){const P=f[S]=y?Re(f[S]):Ae(f[S]);M(a[S],P,p,null,m,g,v,w,y)}b>A?wt(a,m,g,!0,!1,x):Ue(f,p,_,m,g,v,w,y,x)},Gt=(a,f,p,_,m,g,v,w,y)=>{let b=0;const A=f.length;let x=a.length-1,S=A-1;for(;b<=x&&b<=S;){const P=a[b],L=f[b]=y?Re(f[b]):Ae(f[b]);if(Ct(P,L))M(P,L,p,null,m,g,v,w,y);else break;b++}for(;b<=x&&b<=S;){const P=a[x],L=f[S]=y?Re(f[S]):Ae(f[S]);if(Ct(P,L))M(P,L,p,null,m,g,v,w,y);else break;x--,S--}if(b>x){if(b<=S){const P=S+1,L=P<A?f[P].el:_;for(;b<=S;)M(null,f[b]=y?Re(f[b]):Ae(f[b]),p,L,m,g,v,w,y),b++}}else if(b>S)for(;b<=x;)we(a[b],m,g,!0),b++;else{const P=b,L=b,V=new Map;for(b=L;b<=S;b++){const de=f[b]=y?Re(f[b]):Ae(f[b]);de.key!=null&&V.set(de.key,b)}let k,q=0;const Z=S-L+1;let me=!1,ue=0;const vt=new Array(Z);for(b=0;b<Z;b++)vt[b]=0;for(b=P;b<=x;b++){const de=a[b];if(q>=Z){we(de,m,g,!0);continue}let ve;if(de.key!=null)ve=V.get(de.key);else for(k=L;k<=S;k++)if(vt[k-L]===0&&Ct(de,f[k])){ve=k;break}ve===void 0?we(de,m,g,!0):(vt[ve-L]=b+1,ve>=ue?ue=ve:me=!0,M(de,f[ve],p,null,m,g,v,w,y),q++)}const An=me?sl(vt):ut;for(k=An.length-1,b=Z-1;b>=0;b--){const de=L+b,ve=f[de],Pn=f[de+1],En=de+1<A?Pn.el||ci(Pn):_;vt[b]===0?M(null,ve,p,En,m,g,v,w,y):me&&(k<0||b!==An[k]?Je(ve,p,En,2):k--)}}},Je=(a,f,p,_,m=null)=>{const{el:g,type:v,transition:w,children:y,shapeFlag:b}=a;if(b&6){Je(a.component.subTree,f,p,_);return}if(b&128){a.suspense.move(f,p,_);return}if(b&64){v.move(a,f,p,ct);return}if(v===Se){n(g,f,p);for(let x=0;x<y.length;x++)Je(y[x],f,p,_);n(a.anchor,f,p);return}if(v===ts){$(a,f,p);return}if(_!==2&&b&1&&w)if(_===0)w.beforeEnter(g),n(g,f,p),ce(()=>w.enter(g),m);else{const{leave:x,delayLeave:S,afterLeave:P}=w,L=()=>{a.ctx.isUnmounted?o(g):n(g,f,p)},V=()=>{g._isLeaving&&g[gr](!0),x(g,()=>{L(),P&&P()})};S?S(g,L,V):V()}else n(g,f,p)},we=(a,f,p,_=!1,m=!1)=>{const{type:g,props:v,ref:w,children:y,dynamicChildren:b,shapeFlag:A,patchFlag:x,dirs:S,cacheIndex:P,memo:L}=a;if(x===-2&&(m=!1),w!=null&&(Be(),It(w,null,p,a,!0),Ve()),P!=null&&(f.renderCache[P]=void 0),A&256){f.ctx.deactivate(a);return}const V=A&1&&S,k=!Mt(a);let q;if(k&&(q=v&&v.onVnodeBeforeUnmount)&&xe(q,f,a),A&6)yi(a.component,p,_);else{if(A&128){a.suspense.unmount(p,_);return}V&&Ze(a,null,f,"beforeUnmount"),A&64?a.type.remove(a,f,p,ct,_):b&&!b.hasOnce&&(g!==Se||x>0&&x&64)?wt(b,f,p,!1,!0):(g===Se&&x&384||!m&&A&16)&&wt(y,f,p),_&&Tn(a)}const Z=L!=null&&P==null;(k&&(q=v&&v.onVnodeUnmounted)||V||Z)&&ce(()=>{q&&xe(q,f,a),V&&Ze(a,null,f,"unmounted"),Z&&(a.el=null)},p)},Tn=a=>{const{type:f,el:p,anchor:_,transition:m}=a;if(f===Se){_i(p,_);return}if(f===ts){I(a);return}const g=()=>{o(p),m&&!m.persisted&&m.afterLeave&&m.afterLeave()};if(a.shapeFlag&1&&m&&!m.persisted){const{leave:v,delayLeave:w}=m,y=()=>v(p,g);w?w(a.el,g,y):y()}else g()},_i=(a,f)=>{let p;for(;a!==f;)p=C(a),o(a),a=p;o(f)},yi=(a,f,p)=>{const{bum:_,scope:m,job:g,subTree:v,um:w,m:y,a:b}=a;$n(y),$n(b),_&&Qt(_),m.stop(),g&&(g.flags|=8,we(v,a,f,p)),w&&ce(w,f),ce(()=>{a.isUnmounted=!0},f)},wt=(a,f,p,_=!1,m=!1,g=0)=>{for(let v=g;v<a.length;v++)we(a[v],f,p,_,m)},qt=a=>{if(a.shapeFlag&6)return qt(a.component.subTree);if(a.shapeFlag&128)return a.suspense.next();const f=C(a.anchor||a.el),p=f&&f[hr];return p?C(p):f};let Is=!1;const Sn=(a,f,p)=>{let _;a==null?f._vnode&&(we(f._vnode,null,null,!0),_=f._vnode.component):M(f._vnode||null,a,f,null,null,null,p),f._vnode=a,Is||(Is=!0,Fn(_),Bo(),Is=!1)},ct={p:M,um:we,m:Je,r:Tn,mt:Es,mc:Ue,pc:H,pbc:qe,n:qt,o:e};let Ms,Os;return t&&([Ms,Os]=t(ct)),{render:Sn,hydrate:Ms,createApp:Vr(Sn,Ms)}}function Hs({type:e,props:t},s){return s==="svg"&&e==="foreignObject"||s==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:s}function Xe({effect:e,job:t},s){s?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function tl(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function ri(e,t,s=!1){const n=e.children,o=t.children;if(E(n)&&E(o))for(let i=0;i<n.length;i++){const r=n[i];let l=o[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=o[i]=Re(o[i]),l.el=r.el),!s&&l.patchFlag!==-2&&ri(r,l)),l.type===Ss&&(l.patchFlag===-1&&(l=o[i]=Re(l)),l.el=r.el),l.type===Ge&&!l.el&&(l.el=r.el)}}function sl(e){const t=e.slice(),s=[0];let n,o,i,r,l;const c=e.length;for(n=0;n<c;n++){const d=e[n];if(d!==0){if(o=s[s.length-1],e[o]<d){t[n]=o,s.push(n);continue}for(i=0,r=s.length-1;i<r;)l=i+r>>1,e[s[l]]<d?i=l+1:r=l;d<e[s[i]]&&(i>0&&(t[n]=s[i-1]),s[i]=n)}}for(i=s.length,r=s[i-1];i-- >0;)s[i]=r,r=t[r];return s}function li(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:li(t)}function $n(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function ci(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?ci(t.subTree):null}const ai=e=>e.__isSuspense;function nl(e,t){t&&t.pendingBranch?E(e)?t.effects.push(...e):t.effects.push(e):cr(e)}const Se=Symbol.for("v-fgt"),Ss=Symbol.for("v-txt"),Ge=Symbol.for("v-cmt"),ts=Symbol.for("v-stc"),Rt=[];let he=null;function Q(e=!1){Rt.push(he=e?null:[])}function ol(){Rt.pop(),he=Rt[Rt.length-1]||null}let Bt=1;function zn(e,t=!1){Bt+=e,e<0&&he&&t&&(he.hasOnce=!0)}function fi(e){return e.dynamicChildren=Bt>0?he||ut:null,ol(),Bt>0&&he&&he.push(e),e}function fe(e,t,s,n,o,i){return fi(R(e,t,s,n,o,i,!0))}function ss(e,t,s,n,o){return fi(Pe(e,t,s,n,o,!0))}function ui(e){return e?e.__v_isVNode===!0:!1}function Ct(e,t){return e.type===t.type&&e.key===t.key}const di=({key:e})=>e??null,ns=({ref:e,ref_key:t,ref_for:s})=>(typeof e=="number"&&(e=""+e),e!=null?Y(e)||le(e)||O(e)?{i:pe,r:e,k:t,f:!!s}:e:null);function R(e,t=null,s=null,n=0,o=null,i=e===Se?0:1,r=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&di(t),ref:t&&ns(t),scopeId:Wo,slotScopeIds:null,children:s,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:n,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:pe};return l?(yn(c,s),i&128&&e.normalize(c)):s&&(c.shapeFlag|=Y(s)?8:16),Bt>0&&!r&&he&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&he.push(c),c}const Pe=il;function il(e,t=null,s=null,n=0,o=null,i=!1){if((!e||e===Ir)&&(e=Ge),ui(e)){const l=_t(e,t,!0);return s&&yn(l,s),Bt>0&&!i&&he&&(l.shapeFlag&6?he[he.indexOf(e)]=l:he.push(l)),l.patchFlag=-2,l}if(yl(e)&&(e=e.__vccOpts),t){t=rl(t);let{class:l,style:c}=t;l&&!Y(l)&&(t.class=lt(l)),B(c)&&(pn(c)&&!E(c)&&(c=ee({},c)),t.style=rn(c))}const r=Y(e)?1:ai(e)?128:mr(e)?64:B(e)?4:O(e)?2:0;return R(e,t,s,n,o,r,i,!0)}function rl(e){return e?pn(e)||ei(e)?ee({},e):e:null}function _t(e,t,s=!1,n=!1){const{props:o,ref:i,patchFlag:r,children:l,transition:c}=e,d=t?al(o||{},t):o,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:d,key:d&&di(d),ref:t&&t.ref?s&&i?E(i)?i.concat(ns(t)):[i,ns(t)]:ns(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:l,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Se?r===-1?16:r|16:r,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&_t(e.ssContent),ssFallback:e.ssFallback&&_t(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&n&&mn(u,c.clone(u)),u}function ll(e=" ",t=0){return Pe(Ss,null,e,t)}function cl(e,t){const s=Pe(ts,null,e);return s.staticCount=t,s}function je(e="",t=!1){return t?(Q(),ss(Ge,null,e)):Pe(Ge,null,e)}function Ae(e){return e==null||typeof e=="boolean"?Pe(Ge):E(e)?Pe(Se,null,e.slice()):ui(e)?Re(e):Pe(Ss,null,String(e))}function Re(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:_t(e)}function yn(e,t){let s=0;const{shapeFlag:n}=e;if(t==null)t=null;else if(E(t))s=16;else if(typeof t=="object")if(n&65){const o=t.default;o&&(o._c&&(o._d=!1),yn(e,o()),o._c&&(o._d=!0));return}else{s=32;const o=t._;!o&&!ei(t)?t._ctx=pe:o===3&&pe&&(pe.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else O(t)?(t={default:t,_ctx:pe},s=32):(t=String(t),n&64?(s=16,t=[ll(t)]):s=8);e.children=t,e.shapeFlag|=s}function al(...e){const t={};for(let s=0;s<e.length;s++){const n=e[s];for(const o in n)if(o==="class")t.class!==n.class&&(t.class=lt([t.class,n.class]));else if(o==="style")t.style=rn([t.style,n.style]);else if(hs(o)){const i=t[o],r=n[o];r&&i!==r&&!(E(i)&&i.includes(r))?t[o]=i?[].concat(i,r):r:r==null&&i==null&&!ms(o)&&(t[o]=r)}else o!==""&&(t[o]=n[o])}return t}function xe(e,t,s,n=null){Ie(e,t,7,[s,n])}const fl=Yo();let ul=0;function dl(e,t,s){const n=e.type,o=(t?t.appContext:e.appContext)||fl,i={uid:ul++,vnode:e,type:n,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ri(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:si(n,o),emitsOptions:Jo(n,o),emit:null,emitted:null,propsDefaults:W,inheritAttrs:n.inheritAttrs,ctx:W,data:W,props:W,attrs:W,slots:W,refs:W,setupState:W,setupContext:null,suspense:s,suspenseId:s?s.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=Hr.bind(null,i),e.ce&&e.ce(i),i}let se=null;const pl=()=>se||pe;let us,en;{const e=ws(),t=(s,n)=>{let o;return(o=e[s])||(o=e[s]=[]),o.push(n),i=>{o.length>1?o.forEach(r=>r(i)):o[0](i)}};us=t("__VUE_INSTANCE_SETTERS__",s=>se=s),en=t("__VUE_SSR_SETTERS__",s=>Vt=s)}const Ut=e=>{const t=se;return us(e),e.scope.on(),()=>{e.scope.off(),us(t)}},Kn=()=>{se&&se.scope.off(),us(null)};function pi(e){return e.vnode.shapeFlag&4}let Vt=!1;function hl(e,t=!1,s=!1){t&&en(t);const{props:n,children:o}=e.vnode,i=pi(e);Gr(e,n,i,t),Zr(e,o,s||t);const r=i?ml(e,t):void 0;return t&&en(!1),r}function ml(e,t){const s=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Rr);const{setup:n}=s;if(n){Be();const o=e.setupContext=n.length>1?bl(e):null,i=Ut(e),r=kt(n,e,0,[e.props,o]),l=uo(r);if(Ve(),i(),(l||e.sp)&&!Mt(e)&&Uo(e),l){if(r.then(Kn,Kn),t)return r.then(c=>{Gn(e,c,t)}).catch(c=>{xs(c,e,0)});e.asyncDep=r}else Gn(e,r,t)}else hi(e,t)}function Gn(e,t,s){O(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:B(t)&&(e.setupState=Lo(t)),hi(e,s)}let qn;function hi(e,t,s){const n=e.type;if(!e.render){if(!t&&qn&&!n.render){const o=n.template||gn(e).template;if(o){const{isCustomElement:i,compilerOptions:r}=e.appContext.config,{delimiters:l,compilerOptions:c}=n,d=ee(ee({isCustomElement:i,delimiters:l},r),c);n.render=qn(o,d)}}e.render=n.render||ge}{const o=Ut(e);Be();try{Fr(e)}finally{Ve(),o()}}}const gl={get(e,t){return te(e,"get",""),e[t]}};function bl(e){const t=s=>{e.exposed=s||{}};return{attrs:new Proxy(e.attrs,gl),slots:e.slots,emit:e.emit,expose:t}}function As(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Lo(Qi(e.exposed)),{get(t,s){if(s in t)return t[s];if(s in Ot)return Ot[s](e)},has(t,s){return s in t||s in Ot}})):e.proxy}function _l(e,t=!0){return O(e)?e.displayName||e.name:e.name||t&&e.__name}function yl(e){return O(e)&&"__vccOpts"in e}const wl=(e,t)=>nr(e,t,Vt),vl="3.5.32";/**
* @vue/runtime-dom v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let tn;const Yn=typeof window<"u"&&window.trustedTypes;if(Yn)try{tn=Yn.createPolicy("vue",{createHTML:e=>e})}catch{}const mi=tn?e=>tn.createHTML(e):e=>e,xl="http://www.w3.org/2000/svg",Cl="http://www.w3.org/1998/Math/MathML",Oe=typeof document<"u"?document:null,Jn=Oe&&Oe.createElement("template"),Tl={insert:(e,t,s)=>{t.insertBefore(e,s||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,s,n)=>{const o=t==="svg"?Oe.createElementNS(xl,e):t==="mathml"?Oe.createElementNS(Cl,e):s?Oe.createElement(e,{is:s}):Oe.createElement(e);return e==="select"&&n&&n.multiple!=null&&o.setAttribute("multiple",n.multiple),o},createText:e=>Oe.createTextNode(e),createComment:e=>Oe.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Oe.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,s,n,o,i){const r=s?s.previousSibling:t.lastChild;if(o&&(o===i||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),s),!(o===i||!(o=o.nextSibling)););else{Jn.innerHTML=mi(n==="svg"?`<svg>${e}</svg>`:n==="mathml"?`<math>${e}</math>`:e);const l=Jn.content;if(n==="svg"||n==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}t.insertBefore(l,s)}return[r?r.nextSibling:t.firstChild,s?s.previousSibling:t.lastChild]}},Sl=Symbol("_vtc");function Al(e,t,s){const n=e[Sl];n&&(t=(t?[t,...n]:[...n]).join(" ")),t==null?e.removeAttribute("class"):s?e.setAttribute("class",t):e.className=t}const Zn=Symbol("_vod"),Pl=Symbol("_vsh"),El=Symbol(""),Il=/(?:^|;)\s*display\s*:/;function Ml(e,t,s){const n=e.style,o=Y(s);let i=!1;if(s&&!o){if(t)if(Y(t))for(const r of t.split(";")){const l=r.slice(0,r.indexOf(":")).trim();s[l]==null&&os(n,l,"")}else for(const r in t)s[r]==null&&os(n,r,"");for(const r in s)r==="display"&&(i=!0),os(n,r,s[r])}else if(o){if(t!==s){const r=n[El];r&&(s+=";"+r),n.cssText=s,i=Il.test(s)}}else t&&e.removeAttribute("style");Zn in e&&(e[Zn]=i?n.display:"",e[Pl]&&(n.display="none"))}const Xn=/\s*!important$/;function os(e,t,s){if(E(s))s.forEach(n=>os(e,t,n));else if(s==null&&(s=""),t.startsWith("--"))e.setProperty(t,s);else{const n=Ol(e,t);Xn.test(s)?e.setProperty(rt(n),s.replace(Xn,""),"important"):e[n]=s}}const Qn=["Webkit","Moz","ms"],ks={};function Ol(e,t){const s=ks[t];if(s)return s;let n=re(t);if(n!=="filter"&&n in e)return ks[t]=n;n=_s(n);for(let o=0;o<Qn.length;o++){const i=Qn[o]+n;if(i in e)return ks[t]=i}return t}const eo="http://www.w3.org/1999/xlink";function to(e,t,s,n,o,i=Ii(t)){n&&t.startsWith("xlink:")?s==null?e.removeAttributeNS(eo,t.slice(6,t.length)):e.setAttributeNS(eo,t,s):s==null||i&&!go(s)?e.removeAttribute(t):e.setAttribute(t,i?"":Ee(s)?String(s):s)}function so(e,t,s,n,o){if(t==="innerHTML"||t==="textContent"){s!=null&&(e[t]=t==="innerHTML"?mi(s):s);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?e.getAttribute("value")||"":e.value,c=s==null?e.type==="checkbox"?"on":"":String(s);(l!==c||!("_value"in e))&&(e.value=c),s==null&&e.removeAttribute(t),e._value=s;return}let r=!1;if(s===""||s==null){const l=typeof e[t];l==="boolean"?s=go(s):s==null&&l==="string"?(s="",r=!0):l==="number"&&(s=0,r=!0)}try{e[t]=s}catch{}r&&e.removeAttribute(o||t)}function st(e,t,s,n){e.addEventListener(t,s,n)}function Rl(e,t,s,n){e.removeEventListener(t,s,n)}const no=Symbol("_vei");function Fl(e,t,s,n,o=null){const i=e[no]||(e[no]={}),r=i[t];if(n&&r)r.value=n;else{const[l,c]=Ll(t);if(n){const d=i[t]=jl(n,o);st(e,l,d,c)}else r&&(Rl(e,l,r,c),i[t]=void 0)}}const oo=/(?:Once|Passive|Capture)$/;function Ll(e){let t;if(oo.test(e)){t={};let n;for(;n=e.match(oo);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):rt(e.slice(2)),t]}let Us=0;const Dl=Promise.resolve(),Nl=()=>Us||(Dl.then(()=>Us=0),Us=Date.now());function jl(e,t){const s=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=s.attached)return;Ie(Bl(n,s.value),t,5,[n])};return s.value=e,s.attached=Nl(),s}function Bl(e,t){if(E(t)){const s=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{s.call(e),e._stopped=!0},t.map(n=>o=>!o._stopped&&n&&n(o))}else return t}const io=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Vl=(e,t,s,n,o,i)=>{const r=o==="svg";t==="class"?Al(e,n,r):t==="style"?Ml(e,s,n):hs(t)?ms(t)||Fl(e,t,s,n,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Wl(e,t,n,r))?(so(e,t,n),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&to(e,t,n,r,i,t!=="value")):e._isVueCE&&(Hl(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!Y(n)))?so(e,re(t),n,i,t):(t==="true-value"?e._trueValue=n:t==="false-value"&&(e._falseValue=n),to(e,t,n,r))};function Wl(e,t,s,n){if(n)return!!(t==="innerHTML"||t==="textContent"||t in e&&io(t)&&O(s));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const o=e.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return io(t)&&Y(s)?!1:t in e}function Hl(e,t){const s=e._def.props;if(!s)return!1;const n=re(t);return Array.isArray(s)?s.some(o=>re(o)===n):Object.keys(s).some(o=>re(o)===n)}const ds=e=>{const t=e.props["onUpdate:modelValue"]||!1;return E(t)?s=>Qt(t,s):t};function kl(e){e.target.composing=!0}function ro(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const mt=Symbol("_assign");function lo(e,t,s){return t&&(e=e.trim()),s&&(e=ys(e)),e}const Ul={created(e,{modifiers:{lazy:t,trim:s,number:n}},o){e[mt]=ds(o);const i=n||o.props&&o.props.type==="number";st(e,t?"change":"input",r=>{r.target.composing||e[mt](lo(e.value,s,i))}),(s||i)&&st(e,"change",()=>{e.value=lo(e.value,s,i)}),t||(st(e,"compositionstart",kl),st(e,"compositionend",ro),st(e,"change",ro))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:s,modifiers:{lazy:n,trim:o,number:i}},r){if(e[mt]=ds(r),e.composing)return;const l=(i||e.type==="number")&&!/^0\d/.test(e.value)?ys(e.value):e.value,c=t??"";if(l===c)return;const d=e.getRootNode();(d instanceof Document||d instanceof ShadowRoot)&&d.activeElement===e&&e.type!=="range"&&(n&&t===s||o&&e.value.trim()===c)||(e.value=c)}},$l={deep:!0,created(e,{value:t,modifiers:{number:s}},n){const o=gs(t);st(e,"change",()=>{const i=Array.prototype.filter.call(e.options,r=>r.selected).map(r=>s?ys(ps(r)):ps(r));e[mt](e.multiple?o?new Set(i):i:i[0]),e._assigning=!0,No(()=>{e._assigning=!1})}),e[mt]=ds(n)},mounted(e,{value:t}){co(e,t)},beforeUpdate(e,t,s){e[mt]=ds(s)},updated(e,{value:t}){e._assigning||co(e,t)}};function co(e,t){const s=e.multiple,n=E(t);if(!(s&&!n&&!gs(t))){for(let o=0,i=e.options.length;o<i;o++){const r=e.options[o],l=ps(r);if(s)if(n){const c=typeof l;c==="string"||c==="number"?r.selected=t.some(d=>String(d)===String(l)):r.selected=Oi(t,l)>-1}else r.selected=t.has(l);else if(Ht(ps(r),t)){e.selectedIndex!==o&&(e.selectedIndex=o);return}}!s&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function ps(e){return"_value"in e?e._value:e.value}const zl=ee({patchProp:Vl},Tl);let ao;function Kl(){return ao||(ao=Qr(zl))}const Gl=(...e)=>{const t=Kl().createApp(...e),{mount:s}=t;return t.mount=n=>{const o=Yl(n);if(!o)return;const i=t._component;!O(i)&&!i.render&&!i.template&&(i.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const r=s(o,!1,ql(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),r},t};function ql(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Yl(e){return Y(e)?document.querySelector(e):e}function Qe(e,t){const s=bi(e,X.__wbindgen_export,X.__wbindgen_export2),n=it,o=gi(t,X.__wbindgen_export),i=it;X.add_file(s,n,o,i)}function wn(e){const t=gi(e,X.__wbindgen_export),s=it;X.add_font(t,s)}function vn(e){try{const r=X.__wbindgen_add_to_stack_pointer(-16),l=bi(e,X.__wbindgen_export,X.__wbindgen_export2),c=it;X.compile_to_pdf(r,l,c);var t=Xt().getInt32(r+4*0,!0),s=Xt().getInt32(r+4*1,!0),n=Xt().getInt32(r+4*2,!0),o=Xt().getInt32(r+4*3,!0);if(o)throw sc(n);var i=Ql(t,s).slice();return X.__wbindgen_export3(t,s*1,1),i}finally{X.__wbindgen_add_to_stack_pointer(16)}}function Jl(){return{__proto__:null,"./my_typst_wasm_bg.js":{__proto__:null,__wbindgen_cast_0000000000000001:function(t,s){const n=ec(t,s);return Zl(n)}}}}function Zl(e){Ft===Ne.length&&Ne.push(Ne.length+1);const t=Ft;return Ft=Ne[t],Ne[t]=e,t}function Xl(e){e<1028||(Ne[e]=Ft,Ft=e)}function Ql(e,t){return e=e>>>0,gt().subarray(e/1,e/1+t)}let tt=null;function Xt(){return(tt===null||tt.buffer.detached===!0||tt.buffer.detached===void 0&&tt.buffer!==X.memory.buffer)&&(tt=new DataView(X.memory.buffer)),tt}function ec(e,t){return e=e>>>0,oc(e,t)}let St=null;function gt(){return(St===null||St.byteLength===0)&&(St=new Uint8Array(X.memory.buffer)),St}function tc(e){return Ne[e]}let Ne=new Array(1024).fill(void 0);Ne.push(void 0,null,!0,!1);let Ft=Ne.length;function gi(e,t){const s=t(e.length*1,1)>>>0;return gt().set(e,s/1),it=e.length,s}function bi(e,t,s){if(s===void 0){const l=Lt.encode(e),c=t(l.length,1)>>>0;return gt().subarray(c,c+l.length).set(l),it=l.length,c}let n=e.length,o=t(n,1)>>>0;const i=gt();let r=0;for(;r<n;r++){const l=e.charCodeAt(r);if(l>127)break;i[o+r]=l}if(r!==n){r!==0&&(e=e.slice(r)),o=s(o,n,n=r+e.length*3,1)>>>0;const l=gt().subarray(o+r,o+n),c=Lt.encodeInto(e,l);r+=c.written,o=s(o,n,r,1)>>>0}return it=r,o}function sc(e){const t=tc(e);return Xl(e),t}let is=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});is.decode();const nc=2146435072;let $s=0;function oc(e,t){return $s+=t,$s>=nc&&(is=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),is.decode(),$s=t),is.decode(gt().subarray(e,e+t))}const Lt=new TextEncoder;"encodeInto"in Lt||(Lt.encodeInto=function(e,t){const s=Lt.encode(e);return t.set(s),{read:e.length,written:s.length}});let it=0,X;function ic(e,t){return X=e.exports,tt=null,St=null,X}async function rc(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(o){if(e.ok&&s(e.type)&&e.headers.get("Content-Type")!=="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",o);else throw o}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}else{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}function s(n){switch(n){case"basic":case"cors":case"default":return!0}return!1}}async function xn(e){if(X!==void 0)return X;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),e===void 0&&(e=new URL("/typst-wasm-build/assets/my_typst_wasm_bg-2697385b.wasm",self.location));const t=Jl();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:s,module:n}=await rc(await e,t);return ic(s)}const Ps=(e,t)=>{const s=e.__vccOpts||e;for(const[n,o]of t)s[n]=o;return s},lc={name:"TypstTest",data(){return{wasmLoaded:!1,status:"",statusClass:"",pdfUrl:null}},methods:{async initializeWasm(){this.status="🚀 Loading WASM...",this.statusClass="loading";try{const t=await(await fetch("my_typst_wasm_bg.wasm")).arrayBuffer();await xn(t),this.status="✅ WASM Initialized",this.statusClass="success",this.wasmLoaded=!0,await this.loadFont()}catch(e){this.status=`❌ Error: ${e.message}`,this.statusClass="error",console.error(e)}},async loadFont(){try{const t=await(await fetch("fonts/Roboto-Regular.ttf")).arrayBuffer();wn(new Uint8Array(t)),this.status="🔡 Font loaded successfully"}catch(e){this.status=`⚠️ Font loading warning: ${e.message}`,console.warn(e)}},compileAndDownload(){try{this.status="🎨 Compiling Typst...",this.statusClass="loading";const e=vn(`= Success!
Vue.js loaded the web-target WASM successfully.`),t=new Blob([e],{type:"application/pdf"});this.pdfUrl=URL.createObjectURL(t),this.status="🎉 PDF generated successfully!",this.statusClass="success"}catch(e){this.status=`❌ Compilation error: ${e.message}`,this.statusClass="error",console.error(e)}}}},cc={class:"typst-test-container"},ac={class:"controls"},fc=["disabled"],uc=["disabled"],dc={key:1,class:"result"},pc=["href"];function hc(e,t,s,n,o,i){return Q(),fe("div",cc,[t[2]||(t[2]=R("h1",null,"Typst WASM Vue Test",-1)),R("div",ac,[R("button",{onClick:t[0]||(t[0]=(...r)=>i.initializeWasm&&i.initializeWasm(...r)),disabled:o.wasmLoaded},ze(o.wasmLoaded?"✅ WASM Loaded":"Load WASM"),9,fc),R("button",{onClick:t[1]||(t[1]=(...r)=>i.compileAndDownload&&i.compileAndDownload(...r)),disabled:!o.wasmLoaded}," Compile to PDF ",8,uc)]),o.status?(Q(),fe("div",{key:0,class:lt(["status",o.statusClass])},ze(o.status),3)):je("",!0),o.pdfUrl?(Q(),fe("div",dc,[R("a",{href:o.pdfUrl,download:"output.pdf"}," 📥 Download PDF ",8,pc)])):je("",!0)])}const mc=Ps(lc,[["render",hc],["__scopeId","data-v-50048916"]]);const gc={name:"TypstChartTest",data(){return{wasmLoaded:!1,status:"",statusClass:"",pdfUrl:null}},methods:{async initializeWasm(){this.status="🚀 Loading WASM for charts...",this.statusClass="loading";try{const t=await(await fetch("my_typst_wasm_bg.wasm")).arrayBuffer();await xn(t),this.status="✅ WASM Initialized",this.statusClass="success",this.wasmLoaded=!0,await this.loadFonts(),await this.loadChartPackages()}catch(e){this.status=`❌ Error: ${e.message}`,this.statusClass="error",console.error(e)}},async loadFonts(){try{const e=["Roboto-Regular.ttf","NewCMMath-Regular.otf"];for(const t of e)try{const s=await fetch(`fonts/${t}`);if(s.ok){const n=await s.arrayBuffer();wn(new Uint8Array(n)),console.log(`🔡 Loaded ${t}`)}}catch(s){console.warn(`Font ${t} not available:`,s.message)}this.status="🔡 Fonts loaded"}catch(e){console.warn("Font loading warning:",e.message)}},async loadChartPackages(){this.status="📦 Chart packages ready (server-side only)"},compileCharts(){try{this.status="🎨 Compiling Chart Gallery...",this.statusClass="loading";const t=vn(`
// 1. Establish the font stack globally
#set text(font: ("Roboto", "New Computer Modern Math"), size: 10pt)

#show math.equation: set text(font: "New Computer Modern Math")

// Note: In browser environment, chart packages may not be available
// This is a simplified demo. For full charts, use the Node.js test.

#let project(title: "", authors: (), body) = {
  set document(author: authors, title: title)
  set page(paper: "us-letter", margin: 2cm)
  set text(font: ("Roboto", "New Computer Modern Math"), size: 11pt)
  
  align(center)[
    #block(text(weight: 700, 1.75em, title))
    #v(1em)
    #grid(
      columns: (1fr,) * calc.min(3, authors.len()),
      column-gutter: 1em,
      ..authors.map(author => align(center, strong(author)))
    )
  ]
  v(2em)
  body
}

#show: project.with(
  title: "Performance Report",
  authors: ("Vue.js Test",),
)

== Overview

This is a simplified chart demo compiled in the browser.

For full Cetz/Cetz-Plot support with bars, pies, and advanced charts,
use the Node.js headless test:

\`npm test\` from tests/vue directory.

=== Benefits of Charts

Charts effectively communicate complex data:
- Make data patterns visible at a glance
- Enable audience engagement
- Support data-driven decision making
- Enhance professional presentations
`),s=new Blob([t],{type:"application/pdf"});this.pdfUrl=URL.createObjectURL(s),this.status="🎉 Chart gallery compiled successfully!",this.statusClass="success"}catch(e){this.status=`❌ Compilation error: ${e.message}`,this.statusClass="error",console.error(e)}}}},bc={class:"chart-test-container"},_c={class:"controls"},yc=["disabled"],wc=["disabled"],vc={key:1,class:"result"},xc=["href"],Cc={key:2,class:"info"};function Tc(e,t,s,n,o,i){return Q(),fe("div",bc,[t[3]||(t[3]=R("h1",null,"Typst WASM Vue Chart Test",-1)),R("div",_c,[R("button",{onClick:t[0]||(t[0]=(...r)=>i.initializeWasm&&i.initializeWasm(...r)),disabled:o.wasmLoaded},ze(o.wasmLoaded?"✅ WASM Loaded":"Load WASM"),9,yc),R("button",{onClick:t[1]||(t[1]=(...r)=>i.compileCharts&&i.compileCharts(...r)),disabled:!o.wasmLoaded}," Compile Charts ",8,wc)]),o.status?(Q(),fe("div",{key:0,class:lt(["status",o.statusClass])},ze(o.status),3)):je("",!0),o.pdfUrl?(Q(),fe("div",vc,[R("a",{href:o.pdfUrl,download:"gallery.pdf"}," 📥 Download Chart Gallery PDF ",8,xc)])):je("",!0),o.wasmLoaded?(Q(),fe("div",Cc,[...t[2]||(t[2]=[R("h3",null,"Chart Gallery Includes:",-1),R("ul",null,[R("li",null,"📊 Bar Chart - Revenue Distribution by Department"),R("li",null,"🥧 Pie Chart - Market Share Distribution"),R("li",null,"📄 Professional Report Template")],-1)])])):je("",!0)])}const Sc=Ps(gc,[["render",Tc],["__scopeId","data-v-e9925829"]]);const Ac={name:"TypstEditor",data(){return{wasmLoaded:!1,status:"",statusClass:"",pdfUrl:null,typstCode:"",selectedTemplate:"simple",vendorLoaded:!1,templates:{simple:`= Hello World

This is a simple Typst document created with Vue!

*Bold text* and _italic text_ can be used.

== Sections

You can create sections with double equals.

- This is a list
- With multiple items
- Very easy!`,chart:`= Charts & Graphs

This example shows how to use cetz for creating charts.

*Note: Charts with cetz-plot require the Node.js test.*

For now, this shows the power of Typst:

== Features

- *Professional Typography*: Industry-standard text rendering
- *Equations*: Full LaTeX math support
- *Scalability*: Vector-based graphics
- *Packages*: Extensible with packages like cetz
- *Performance*: Compiled to PDF efficiently

#set text(size: 12pt)

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna.`,advanced:`#set page(margin: 2.5cm)
#set text(font: "Roboto", size: 11pt, lang: "en")
#show heading: set text(font: "Roboto", weight: "bold")

= Professional Report

#set heading(numbering: "1.")

== Introduction

This is a more advanced template with custom styling and formatting.

#align(center)[
  _Generated with Typst WASM_
]

#v(1em)

== Key Sections

=== Data Presentation

Typst excels at creating professional documents with:

1. Structured layouts
2. Consistent styling
3. Dynamic content
4. Beautiful typography

=== Advanced Features

You can combine multiple features:

#box(
  fill: rgb("#e8f4f8"),
  stroke: 1pt + rgb("#0066cc"),
  inset: 15pt,
  radius: 5pt,
)[
  This is a styled box with a custom background and border.
  Perfect for highlighting important information.
]

#v(1em)

== Conclusion

Typst WASM brings document creation to the web browser!`,periodic:`#import "@preview/cetz:0.4.2": canvas, draw

#set page(width: auto, height: auto, margin: 15pt)

// Element colors
#let colors = (
  alkali-metal: rgb("#8989ff"),
  alkaline-earth: rgb("#89a9ff"),
  metal: rgb("#89c9ff"),
  metalloid: rgb("#ffa959"),
  nonmetal: rgb("#59d9d9"),
  halogen: rgb("#ffff59"),
  noble-gas: rgb("#89ff89"),
  lanthanide: rgb("#ff8989"),
  synthetic: rgb("#525252"),
)

// Element data
#let elements = (
  // Period 1
  (
    ("1", "1.0079", "H", "Hydrogen"),
    none, none, none, none, none, none, none, none, none, none, none, none, none, none, none, none,
    ("2", "4.0025", "He", "Helium", colors.noble-gas),
  ),
  // Period 2
  (
    ("3", "6.941", "Li", "Lithium", colors.alkali-metal),
    ("4", "9.0122", "Be", "Beryllium", colors.alkaline-earth),
    none, none, none, none, none, none, none, none, none, none,
    ("5", "10.811", "B", "Boron", colors.metalloid),
    ("6", "12.011", "C", "Carbon", colors.nonmetal),
    ("7", "14.007", "N", "Nitrogen", colors.nonmetal),
    ("8", "15.999", "O", "Oxygen", colors.nonmetal),
    ("9", "18.998", "F", "Fluorine", colors.halogen),
    ("10", "20.180", "Ne", "Neon", colors.noble-gas),
  ),
  // Period 3
  (
    ("11", "22.990", "Na", "Sodium", colors.alkali-metal),
    ("12", "24.305", "Mg", "Magnesium", colors.alkaline-earth),
    none, none, none, none, none, none, none, none, none, none,
    ("13", "26.982", "Al", "Aluminium", colors.metal),
    ("14", "28.086", "Si", "Silicon", colors.metalloid),
    ("15", "30.974", "P", "Phosphorus", colors.nonmetal),
    ("16", "32.065", "S", "Sulphur", colors.nonmetal),
    ("17", "35.453", "Cl", "Chlorine", colors.halogen),
    ("18", "39.948", "Ar", "Argon", colors.noble-gas),
  ),
  // Period 4
  (
    ("19", "39.098", "K", "Potassium", colors.alkali-metal),
    ("20", "40.078", "Ca", "Calcium", colors.alkaline-earth),
    ("21", "44.956", "Sc", "Scandium", colors.metal),
    ("22", "47.867", "Ti", "Titanium", colors.metal),
    ("23", "50.942", "V", "Vanadium", colors.metal),
    ("24", "51.996", "Cr", "Chromium", colors.metal),
    ("25", "54.938", "Mn", "Manganese", colors.metal),
    ("26", "55.845", "Fe", "Iron", colors.metal),
    ("27", "58.933", "Co", "Cobalt", colors.metal),
    ("28", "58.693", "Ni", "Nickel", colors.metal),
    ("29", "63.546", "Cu", "Copper", colors.metal),
    ("30", "65.39", "Zn", "Zinc", colors.metal),
    ("31", "69.723", "Ga", "Gallium", colors.metal),
    ("32", "72.64", "Ge", "Germanium", colors.metalloid),
    ("33", "74.922", "As", "Arsenic", colors.metalloid),
    ("34", "78.96", "Se", "Selenium", colors.nonmetal),
    ("35", "79.904", "Br", "Bromine", colors.halogen),
    ("36", "83.8", "Kr", "Krypton", colors.noble-gas),
  ),
  // Period 5
  (
    ("37", "85.468", "Rb", "Rubidium", colors.alkali-metal),
    ("38", "87.62", "Sr", "Strontium", colors.alkaline-earth),
    ("39", "88.906", "Y", "Yttrium", colors.metal),
    ("40", "91.224", "Zr", "Zirconium", colors.metal),
    ("41", "92.906", "Nb", "Niobium", colors.metal),
    ("42", "95.94", "Mo", "Molybdenum", colors.metal),
    ("43", "96", "Tc", "Technetium", colors.metal),
    ("44", "101.07", "Ru", "Ruthenium", colors.metal),
    ("45", "102.91", "Rh", "Rhodium", colors.metal),
    ("46", "106.42", "Pd", "Palladium", colors.metal),
    ("47", "107.87", "Ag", "Silver", colors.metal),
    ("48", "112.41", "Cd", "Cadmium", colors.metal),
    ("49", "114.82", "In", "Indium", colors.metal),
    ("50", "118.71", "Sn", "Tin", colors.metal),
    ("51", "121.76", "Sb", "Antimony", colors.metalloid),
    ("52", "127.6", "Te", "Tellurium", colors.metalloid),
    ("53", "126.9", "I", "Iodine", colors.halogen),
    ("54", "131.29", "Xe", "Xenon", colors.noble-gas),
  ),
  // Period 6
  (
    ("55", "132.91", "Cs", "Caesium", colors.alkali-metal),
    ("56", "137.33", "Ba", "Barium", colors.alkaline-earth),
    ("57-71", "", text(size: 27pt)[La--Lu], "Lanthanide", colors.lanthanide),
    ("72", "178.49", "Hf", "Hafnium", colors.metal),
    ("73", "180.95", "Ta", "Tantalum", colors.metal),
    ("74", "183.84", "W", "Tungsten", colors.metal),
    ("75", "186.21", "Re", "Rhenium", colors.metal),
    ("76", "190.23", "Os", "Osmium", colors.metal),
    ("77", "192.22", "Ir", "Iridium", colors.metal),
    ("78", "195.08", "Pt", "Platinum", colors.metal),
    ("79", "196.97", "Au", "Gold", colors.metal),
    ("80", "200.59", "Hg", "Mercury", colors.metal),
    ("81", "204.38", "Tl", "Thallium", colors.metal),
    ("82", "207.2", "Pb", "Lead", colors.metal),
    ("83", "208.98", "Bi", "Bismuth", colors.metal),
    ("84", "209", "Po", "Polonium", colors.metalloid),
    ("85", "210", "At", "Astatine", colors.halogen),
    ("86", "222", "Rn", "Radon", colors.noble-gas),
  ),
  // Period 7
  (
    ("87", "223", "Fr", "Francium", colors.alkali-metal),
    ("88", "226", "Ra", "Radium", colors.alkaline-earth),
    ("89-103", "", text(size: 27pt)[Ac--#text(colors.synthetic)[Lr]], "Actinide", colors.lanthanide),
    ("104", "261", "Rf", "Rutherfordium", colors.metal),
    ("105", "262", "Db", "Dubnium", colors.metal),
    ("106", "266", "Sg", "Seaborgium", colors.metal),
    ("107", "264", "Bh", "Bohrium", colors.metal),
    ("108", "277", "Hs", "Hassium", colors.metal),
    ("109", "268", "Mt", "Meitnerium", colors.metal),
    ("110", "281", "Ds", "Darmstadtium", colors.metal),
    ("111", "280", "Rg", "Roentgenium", colors.metal),
    ("112", "285", "Cn", "Copernicium", colors.metal),
    ("113", "284", "Nh", "Nihonium", colors.metal),
    ("114", "289", "Fl", "Flerovium", colors.metal),
    ("115", "288", "Mc", "Moscovium", colors.metal),
    ("116", "293", "Lv", "Livermorium", colors.metal),
    ("117", "294", "Ts", "Tennessine", colors.halogen),
    ("118", "294", "Og", "Oganesson", colors.noble-gas),
  ),
)

// Lanthanide data
#let lanthanides = (
  ("57", "138.91", "La", "Lanthanum"),
  ("58", "140.12", "Ce", "Cerium"),
  ("59", "140.91", "Pr", "Praseodymium"),
  ("60", "144.24", "Nd", "Neodymium"),
  ("61", "145", "Pm", "Promethium"),
  ("62", "150.36", "Sm", "Samarium"),
  ("63", "151.96", "Eu", "Europium"),
  ("64", "157.25", "Gd", "Gadolinium"),
  ("65", "158.93", "Tb", "Terbium"),
  ("66", "162.50", "Dy", "Dysprosium"),
  ("67", "164.93", "Ho", "Holmium"),
  ("68", "167.26", "Er", "Erbium"),
  ("69", "168.93", "Tm", "Thulium"),
  ("70", "173.04", "Yb", "Ytterbium"),
  ("71", "174.97", "Lu", "Lutetium"),
)

// Actinide data
#let actinides = (
  ("89", "227", "Ac", "Actinium"),
  ("90", "232.04", "Th", "Thorium"),
  ("91", "231.04", "Pa", "Protactinium"),
  ("92", "238.03", "U", "Uranium"),
  ("93", "237", "Np", "Neptunium"),
  ("94", "244", "Pu", "Plutonium"),
  ("95", "243", "Am", "Americium"),
  ("96", "247", "Cm", "Curium"),
  ("97", "247", "Bk", "Berkelium"),
  ("98", "251", "Cf", "Californium"),
  ("99", "252", "Es", "Einsteinium"),
  ("100", "257", "Fm", "Fermium"),
  ("101", "258", "Md", "Mendelevium"),
  ("102", "259", "No", "Nobelium"),
  ("103", "262", "Lr", "Lawrencium"),
)

// Helper function to create an element box
#let element(number, mass, symbol, name, fill: white, text-color: black) = {
  box(width: 3cm, height: 3cm, fill: fill, stroke: black, inset: 4pt)[
    #set align(center)
    #text(size: 18pt, weight: "bold")[#number #h(1fr) #mass]\\
    #v(1fr)
    #text(size: 40pt, weight: "bold", fill: text-color)[#symbol]\\
    #v(1fr)
    #text(size: 13pt)[#name]
  ]
}

// Helper function to create a synthetic element (gray text)
#let synthetic-element(number, mass, symbol, name, fill: white) = {
  element(number, mass, symbol, name, fill: fill, text-color: colors.synthetic)
}

#canvas({
  import draw: line, content, rect

  let cell-size = 3.25 // Increased cell size
  let start-x = 0
  let start-y = 0
  let lanthanide-gap = 2.5 // Gap before lanthanides/actinides

  // Function to calculate element position
  let pos(group, period) = {
    let y-offset = if period > 7 { lanthanide-gap } else { 0 }
    (
      start-x + (group - 1) * cell-size,
      start-y - (period - 1) * cell-size - y-offset,
    )
  }

  // Function to calculate lanthanide/actinide position
  let special-pos(num, is-actinide: false) = {
    let row = if is-actinide { 9 } else { 8 }
    let col = num - (if is-actinide { 89 } else { 57 }) + 3
    let y-offset = lanthanide-gap
    (
      start-x + col * cell-size,
      start-y - (row - 1) * cell-size - y-offset,
    )
  }

  // Draw main table elements
  for period in range(1, elements.len() + 1) {
    for group in range(1, 19) {
      let data = elements.at(period - 1).at(group - 1)
      if data != none {
        if data.len() == 5 {
          let elem = if period == 7 and group >= 4 { synthetic-element } else { element }
          content(pos(group, period), elem(..data.slice(0, 4), fill: data.at(4)))
        } else {
          content(pos(group, period), element(..data))
        }
      }
    }
  }

  // Lanthanides
  for (idx, data) in lanthanides.enumerate() {
    content(special-pos(57 + idx), element(..data, fill: colors.lanthanide))
  }

  // Actinides
  for (idx, data) in actinides.enumerate() {
    content(
      special-pos(89 + idx, is-actinide: true),
      if idx <= 5 { element(..data, fill: colors.lanthanide) } else {
        synthetic-element(..data, fill: colors.lanthanide)
      },
    )
  }

  // Connect lanthanides and actinides to main table with dotted lines
  let la-pos = pos(3, 6)
  let ac-pos = pos(3, 7)
  let la-start = special-pos(57)
  let ac-start = special-pos(89, is-actinide: true)

  line(
    (la-pos.at(0), la-pos.at(1)),
    (la-start.at(0), la-start.at(1)),
    stroke: (dash: "dotted", thickness: 1.5pt),
  )
  line(
    (ac-pos.at(0), ac-pos.at(1)),
    (ac-start.at(0), ac-start.at(1)),
    stroke: (dash: "dotted", thickness: 1.5pt),
  )

  // Title
  content(
    (7 * cell-size, 0.2 * cell-size),
    text(size: 76pt, weight: "bold")[Periodic Table of Elements],
  )

  // Period labels
  for period in range(1, 8) {
    content(
      (start-x - cell-size * 0.6, start-y - (period - 1) * cell-size),
      text(size: 16pt, weight: "bold")[#period],
    )
  }

  // Group labels
  let groups = "IA IIA IIIB IVB VB VIB VIIB VIIIB VIIIB VIIIB IB IIB IIIA IVA VA VIA VIIA VIIIA".split(" ")

  // Find first element in each column
  for (num, label) in groups.enumerate(start: 1) {
    let first-period = if num == 1 or num == 18 { 1 } else if num == 2 or num > 12 { 2 } else { 4 }
    let (x, y) = pos(num, first-period)
    content(
      (x, y + cell-size * 0.7),
      box(width: 3cm)[
        #set align(center)
        #text(size: 14pt, weight: "bold")[#num #h(1fr) #label]
      ],
    )
  }

  // Legend
  let legend-start = (start-x - 0.5 * cell-size, start-y - 6.8 * cell-size)
  let legend-items = (
    ("Alkali Metal", colors.alkali-metal),
    ("Alkaline Earth Metal", colors.alkaline-earth),
    ("Transition Metal", colors.metal),
    ("Metalloid", colors.metalloid),
    ("Nonmetal", colors.nonmetal),
    ("Halogen", colors.halogen),
    ("Noble Gas", colors.noble-gas),
    ("Lanthanide/Actinide", colors.lanthanide),
  )

  for (idx, (label, color)) in legend-items.enumerate() {
    let y-offset = idx
    rect(
      (legend-start.at(0), legend-start.at(1) - y-offset),
      (legend-start.at(0) + 0.8, legend-start.at(1) - y-offset - 0.8),
      fill: color,
      stroke: black,
    )
    content(
      (legend-start.at(0) + 1, legend-start.at(1) - y-offset - 0.4),
      text(size: 14pt)[#label],
      anchor: "west",
    )
  }

  // Element key
  let key-pos = (12, -4)
  content(
    key-pos,
    element("Z", "mass", text("Symbol", size: 22pt), "Name"),
  )
  content(
    (key-pos.at(0) + 3.3, key-pos.at(1)),
    text(size: 12pt)[
      black: natural\\
      #text(fill: colors.synthetic)[gray: man-made]
    ],
  )
})`}}},methods:{async initializeWasm(){this.status="🚀 Loading WASM & Packages...",this.statusClass="loading";try{const t=await(await fetch("my_typst_wasm_bg.wasm")).arrayBuffer();await xn(t),this.status="✅ WASM Initialized - Loading packages...",await this.loadFonts(),await this.loadVendorPackages(),this.status="✅ WASM & Packages Loaded",this.statusClass="success",this.wasmLoaded=!0}catch(e){this.status=`❌ Error: ${e.message}`,this.statusClass="error",console.error(e)}},async loadFonts(){try{const e=["Roboto-Regular.ttf","NewCMMath-Regular.otf"];for(const t of e)try{const s=await fetch(`fonts/${t}`);if(s.ok){const n=await s.arrayBuffer();wn(new Uint8Array(n)),console.log(`🔡 Loaded ${t}`)}}catch(s){console.warn(`Font ${t} not available:`,s.message)}}catch(e){console.warn("Font loading warning:",e.message)}},async loadVendorPackages(){try{console.log("📦 Loading vendor packages...");const e=await fetch("vendor-manifest.json");if(!e.ok){console.warn("Vendor packages not available");return}const t=await e.json();let s=0;const n=new Map,o={};for(const[i,r]of Object.entries(t))try{const l=await fetch(r);if(l.ok){const c=await l.arrayBuffer(),u=r.endsWith(".typ")||r.endsWith(".toml")?new TextEncoder().encode(new TextDecoder().decode(c)):new Uint8Array(c);Qe(i,u),n.set(i,u),s++;const h=i.match(/^preview\/([^/]+)\/([^/]+)\/(.+)$/);if(h){const[,C,T,D]=h;o[C]||(o[C]={version:T,files:{}}),o[C].files[D]={vfsPath:i,data:u}}}}catch(l){console.debug(`Could not load ${r}:`,l.message)}for(const[i,{version:r,files:l}]of Object.entries(o))if(i==="cetz"){l["lib.typ"]&&Qe(`preview/cetz/${r}/src/lib.typ`,l["lib.typ"].data);for(const[c,{data:d}]of Object.entries(l))c.endsWith(".typ")&&!c.includes("/")&&Qe(`preview/cetz/${r}/src/${c}`,d);for(const[c,{data:d}]of Object.entries(l))if(c.startsWith("src/")){const u=c.replace(/^src\//,"");Qe(`preview/cetz/${r}/${u}`,d),Qe(u,d)}l["cetz_core.wasm"]&&Qe(`preview/cetz/${r}/cetz-core/cetz_core.wasm`,l["cetz_core.wasm"].data)}else if(i==="cetz-plot")for(const[c,{data:d}]of Object.entries(l))c.startsWith("src/")&&Qe(c,d);this.vendorLoaded=!0,console.log(`✅ Vendor packages loaded (${s} files)`)}catch(e){console.warn("Vendor loading warning:",e.message)}},loadTemplate(){this.typstCode=this.templates[this.selectedTemplate],this.pdfUrl=null},compile(){if(!this.typstCode.trim()){this.status="⚠️ Please enter Typst code",this.statusClass="error";return}try{this.status="🎨 Compiling...",this.statusClass="loading";const e=this.typstCode.replace(/\r\n/g,`
`),t=vn(e),s=new Blob([t],{type:"application/pdf"});this.pdfUrl=URL.createObjectURL(s),this.status="✅ Compiled successfully!",this.statusClass="success"}catch(e){this.status=`❌ Compilation error: ${e.message}`,this.statusClass="error",console.error(e)}},downloadPDF(){if(this.pdfUrl){const e=document.createElement("a");e.href=this.pdfUrl,e.download="document.pdf",e.click()}}},mounted(){this.typstCode=this.templates.simple}},Pc={class:"editor-container"},Ec={class:"controls"},Ic=["disabled"],Mc=["disabled"],Oc=["disabled"],Rc=["disabled"],Fc={class:"editor-layout"},Lc={class:"editor-section"},Dc=["disabled"],Nc={class:"preview-section"},jc={key:0,class:"preview-placeholder"},Bc={key:1,class:"preview-content"},Vc=["src"];function Wc(e,t,s,n,o,i){return Q(),fe("div",Pc,[t[10]||(t[10]=R("h1",null,"Typst Live Editor",-1)),R("div",Ec,[R("button",{onClick:t[0]||(t[0]=(...r)=>i.initializeWasm&&i.initializeWasm(...r)),disabled:o.wasmLoaded},ze(o.wasmLoaded?"✅ WASM Loaded":"Load WASM"),9,Ic),R("button",{onClick:t[1]||(t[1]=(...r)=>i.compile&&i.compile(...r)),disabled:!o.wasmLoaded}," 🎨 Compile ",8,Mc),Ln(R("select",{"onUpdate:modelValue":t[2]||(t[2]=r=>o.selectedTemplate=r),onChange:t[3]||(t[3]=(...r)=>i.loadTemplate&&i.loadTemplate(...r)),disabled:!o.wasmLoaded},[...t[6]||(t[6]=[R("option",{value:"simple"},"📝 Simple Document",-1),R("option",{value:"chart"},"📊 Chart Example",-1),R("option",{value:"advanced"},"✨ Advanced Layout",-1),R("option",{value:"periodic"},"🧪 Periodic Table",-1)])],40,Oc),[[$l,o.selectedTemplate]]),R("button",{onClick:t[4]||(t[4]=(...r)=>i.downloadPDF&&i.downloadPDF(...r)),disabled:!o.pdfUrl}," 📥 Download PDF ",8,Rc)]),o.status?(Q(),fe("div",{key:0,class:lt(["status",o.statusClass])},ze(o.status),3)):je("",!0),R("div",Fc,[R("div",Lc,[t[7]||(t[7]=R("h2",null,"Typst Source Code",-1)),Ln(R("textarea",{"onUpdate:modelValue":t[5]||(t[5]=r=>o.typstCode=r),class:"code-editor",placeholder:"Enter your Typst code here...",disabled:!o.wasmLoaded},null,8,Dc),[[Ul,o.typstCode]])]),R("div",Nc,[t[9]||(t[9]=R("h2",null,"Preview",-1)),o.pdfUrl?(Q(),fe("div",Bc,[R("iframe",{src:o.pdfUrl,class:"pdf-viewer"},null,8,Vc)])):(Q(),fe("div",jc,[...t[8]||(t[8]=[R("p",null,'👉 Click "Compile" to see preview',-1)])]))])]),t[11]||(t[11]=cl('<div class="templates-info" data-v-4e160ebf><h3 data-v-4e160ebf>📚 Quick Reference</h3><div class="reference-grid" data-v-4e160ebf><div class="reference-card" data-v-4e160ebf><strong data-v-4e160ebf>Headings</strong><code data-v-4e160ebf>= Heading 1<br data-v-4e160ebf>== Heading 2</code></div><div class="reference-card" data-v-4e160ebf><strong data-v-4e160ebf>Text Styling</strong><code data-v-4e160ebf>*bold* _italic_<br data-v-4e160ebf>#[colored text]</code></div><div class="reference-card" data-v-4e160ebf><strong data-v-4e160ebf>Lists</strong><code data-v-4e160ebf>- Item 1<br data-v-4e160ebf>- Item 2</code></div><div class="reference-card" data-v-4e160ebf><strong data-v-4e160ebf>Code Block</strong><code data-v-4e160ebf>```typst<br data-v-4e160ebf>code here<br data-v-4e160ebf>```</code></div></div></div>',1))])}const Hc=Ps(Ac,[["render",Wc],["__scopeId","data-v-4e160ebf"]]);const kc={name:"App",components:{TypstTest:mc,TypstChartTest:Sc,TypstEditor:Hc},data(){return{activeTab:"editor",tabs:[{id:"editor",label:"✏️ Live Editor"},{id:"simple",label:"📝 Basic Test"},{id:"charts",label:"📊 Chart Test"}]}}},Uc={id:"app"},$c={class:"navbar"},zc=["onClick"];function Kc(e,t,s,n,o,i){const r=Bs("TypstEditor"),l=Bs("TypstTest"),c=Bs("TypstChartTest");return Q(),fe("div",Uc,[R("div",$c,[(Q(!0),fe(Se,null,Or(o.tabs,d=>(Q(),fe("button",{key:d.id,class:lt(["tab-button",{active:o.activeTab===d.id}]),onClick:u=>o.activeTab=d.id},ze(d.label),11,zc))),128))]),o.activeTab==="editor"?(Q(),ss(r,{key:0})):je("",!0),o.activeTab==="simple"?(Q(),ss(l,{key:1})):je("",!0),o.activeTab==="charts"?(Q(),ss(c,{key:2})):je("",!0)])}const Gc=Ps(kc,[["render",Kc]]),qc=Gl(Gc);qc.mount("#app");
