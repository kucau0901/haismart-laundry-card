/*! haismart-laundry-card v1.0.0 | MIT | https://github.com/kucau0901/haismart-laundry-card */
const ke=globalThis,at=ke.ShadowRoot&&(ke.ShadyCSS===void 0||ke.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol(),wt=new WeakMap;let Kt=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==it)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(at&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=wt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&wt.set(t,e))}return e}toString(){return this.cssText}};const Dn=a=>new Kt(typeof a=="string"?a:a+"",void 0,it),Vt=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((n,i,s)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[s+1],a[0]);return new Kt(t,a,it)},An=(a,e)=>{if(at)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),i=ke.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,a.appendChild(n)}},vt=at?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Dn(t)})(a):a;const{is:Cn,defineProperty:Tn,getOwnPropertyDescriptor:Mn,getOwnPropertyNames:En,getOwnPropertySymbols:Pn,getPrototypeOf:Rn}=Object,Ee=globalThis,kt=Ee.trustedTypes,On=kt?kt.emptyScript:"",Ln=Ee.reactiveElementPolyfillSupport,de=(a,e)=>a,Ze={toAttribute(a,e){switch(e){case Boolean:a=a?On:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},qt=(a,e)=>!Cn(a,e),$t={attribute:!0,type:String,converter:Ze,reflect:!1,useDefault:!1,hasChanged:qt};Symbol.metadata??=Symbol("metadata"),Ee.litPropertyMetadata??=new WeakMap;let J=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$t){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&Tn(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:s}=Mn(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const c=i?.call(this);s?.call(this,o),this.requestUpdate(e,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$t}static _$Ei(){if(this.hasOwnProperty(de("elementProperties")))return;const e=Rn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(de("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(de("properties"))){const t=this.properties,n=[...En(t),...Pn(t)];for(const i of n)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)t.unshift(vt(i))}else e!==void 0&&t.push(vt(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return An(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const s=(n.converter?.toAttribute!==void 0?n.converter:Ze).toAttribute(t,n.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const s=n.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Ze;this._$Em=i;const c=o.fromAttribute(t,s.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(e,t,n,i=!1,s){if(e!==void 0){const o=this.constructor;if(i===!1&&(s=this[e]),n??=o.getPropertyOptions(e),!((n.hasChanged??qt)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,s]of n){const{wrapped:o}=s,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,s,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[de("elementProperties")]=new Map,J[de("finalized")]=new Map,Ln?.({ReactiveElement:J}),(Ee.reactiveElementVersions??=[]).push("2.1.2");const st=globalThis,St=a=>a,xe=st.trustedTypes,xt=xe?xe.createPolicy("lit-html",{createHTML:a=>a}):void 0,Yt="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,Gt="?"+j,Un=`<${Gt}>`,K=document,pe=()=>K.createComment(""),me=a=>a===null||typeof a!="object"&&typeof a!="function",rt=Array.isArray,Nn=a=>rt(a)||typeof a?.[Symbol.iterator]=="function",ze=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,At=/>/g,H=RegExp(`>|${ze}(?:([^\\s"'>=/]+)(${ze}*=${ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,Tt=/"/g,Zt=/^(?:script|style|textarea|title)$/i,Wn=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),u=Wn(1),te=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),Mt=new WeakMap,F=K.createTreeWalker(K,129);function Jt(a,e){if(!rt(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(e):e}const In=(a,e)=>{const t=a.length-1,n=[];let i,s=e===2?"<svg>":e===3?"<math>":"",o=se;for(let c=0;c<t;c++){const d=a[c];let m,h,l=-1,p=0;for(;p<d.length&&(o.lastIndex=p,h=o.exec(d),h!==null);)p=o.lastIndex,o===se?h[1]==="!--"?o=Dt:h[1]!==void 0?o=At:h[2]!==void 0?(Zt.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=H):h[3]!==void 0&&(o=H):o===H?h[0]===">"?(o=i??se,l=-1):h[1]===void 0?l=-2:(l=o.lastIndex-h[2].length,m=h[1],o=h[3]===void 0?H:h[3]==='"'?Tt:Ct):o===Tt||o===Ct?o=H:o===Dt||o===At?o=se:(o=H,i=void 0);const g=o===H&&a[c+1].startsWith("/>")?" ":"";s+=o===se?d+Un:l>=0?(n.push(m),d.slice(0,l)+Yt+d.slice(l)+j+g):d+j+(l===-2?c:g)}return[Jt(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class fe{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,o=0;const c=e.length-1,d=this.parts,[m,h]=In(e,t);if(this.el=fe.createElement(m,n),F.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=F.nextNode())!==null&&d.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(Yt)){const p=h[o++],g=i.getAttribute(l).split(j),b=/([.?@])?(.*)/.exec(p);d.push({type:1,index:s,name:b[2],strings:g,ctor:b[1]==="."?Hn:b[1]==="?"?Bn:b[1]==="@"?zn:Pe}),i.removeAttribute(l)}else l.startsWith(j)&&(d.push({type:6,index:s}),i.removeAttribute(l));if(Zt.test(i.tagName)){const l=i.textContent.split(j),p=l.length-1;if(p>0){i.textContent=xe?xe.emptyScript:"";for(let g=0;g<p;g++)i.append(l[g],pe()),F.nextNode(),d.push({type:2,index:++s});i.append(l[p],pe())}}}else if(i.nodeType===8)if(i.data===Gt)d.push({type:2,index:s});else{let l=-1;for(;(l=i.data.indexOf(j,l+1))!==-1;)d.push({type:7,index:s}),l+=j.length-1}s++}}static createElement(e,t){const n=K.createElement("template");return n.innerHTML=e,n}}function ne(a,e,t=a,n){if(e===te)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl;const s=me(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(a),i._$AT(a,t,n)),n!==void 0?(t._$Co??=[])[n]=i:t._$Cl=i),i!==void 0&&(e=ne(a,i._$AS(a,e.values),i,n)),e}class jn{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??K).importNode(t,!0);F.currentNode=i;let s=F.nextNode(),o=0,c=0,d=n[0];for(;d!==void 0;){if(o===d.index){let m;d.type===2?m=new ge(s,s.nextSibling,this,e):d.type===1?m=new d.ctor(s,d.name,d.strings,this,e):d.type===6&&(m=new Fn(s,this,e)),this._$AV.push(m),d=n[++c]}o!==d?.index&&(s=F.nextNode(),o++)}return F.currentNode=K,i}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ge{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ne(this,e,t),me(e)?e===f||e==null||e===""?(this._$AH!==f&&this._$AR(),this._$AH=f):e!==this._$AH&&e!==te&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Nn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==f&&me(this._$AH)?this._$AA.nextSibling.data=e:this.T(K.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=fe.createElement(Jt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const s=new jn(i,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=Mt.get(e.strings);return t===void 0&&Mt.set(e.strings,t=new fe(e)),t}k(e){rt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const s of e)i===t.length?t.push(n=new ge(this.O(pe()),this.O(pe()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const n=St(e).nextSibling;St(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Pe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=f,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=f}_$AI(e,t=this,n,i){const s=this.strings;let o=!1;if(s===void 0)e=ne(this,e,t,0),o=!me(e)||e!==this._$AH&&e!==te,o&&(this._$AH=e);else{const c=e;let d,m;for(e=s[0],d=0;d<s.length-1;d++)m=ne(this,c[n+d],t,d),m===te&&(m=this._$AH[d]),o||=!me(m)||m!==this._$AH[d],m===f?e=f:e!==f&&(e+=(m??"")+s[d+1]),this._$AH[d]=m}o&&!i&&this.j(e)}j(e){e===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Hn extends Pe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===f?void 0:e}}class Bn extends Pe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==f)}}class zn extends Pe{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=ne(this,e,t,0)??f)===te)return;const n=this._$AH,i=e===f&&n!==f||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==f&&(n===f||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Fn{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ne(this,e)}}const Kn=st.litHtmlPolyfillSupport;Kn?.(fe,ge),(st.litHtmlVersions??=[]).push("3.3.3");const Vn=(a,e,t)=>{const n=t?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const s=t?.renderBefore??null;n._$litPart$=i=new ge(e.insertBefore(pe(),s),s,void 0,t??{})}return i._$AI(a),i};const ot=globalThis;let X=class extends J{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Vn(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return te}};X._$litElement$=!0,X.finalized=!0,ot.litElementHydrateSupport?.({LitElement:X});const qn=ot.litElementPolyfillSupport;qn?.({LitElement:X});(ot.litElementVersions??=[]).push("4.2.2");const V={laundryCyclePhase:{name:"Laundry cycle phase",control:"sensor",report:"6D02",unit:null,options:{0:"Standby",1:"Weighing",2:"Load advice",3:"Wash fill",4:"Wash heating",5:"Washing",6:"Wash drain",7:"Intermediate spin",8:"Rinse fill",9:"Rinsing",10:"Rinse drain",11:"Final spin",12:"Dry",13:"Cooling down",14:"Finished",15:"Delayed start",16:"Tumbling after wash",17:"Drying after wash",18:"Drying after wash finished",19:"Tumbling after wash finished",20:"Care",21:"Pre-wash fill",22:"Pre-wash",23:"Pre-wash heating",24:"Pre-wash drain",25:"Air drying",26:"Detecting"}},dryerCyclePhase:{name:"Dryer cycle phase",control:"sensor",report:"6D01",unit:null,options:{0:"Standby",1:"Delayed start",2:"Cool air 1",3:"Heating 1",4:"Heating 2",5:"Cool air 2",6:"Finished",7:"Anti-crease",8:"Sensing load",9:"Care",10:"Pre-drying",11:"Maintenance"}},washerRunningMode:{name:"Washer running mode",control:"sensor",report:"6D02",unit:null,options:{1:"Running",2:"Paused"}},dryerRunningMode:{name:"Dryer running mode",control:"sensor",report:"6D01",unit:null,options:{1:"Running",2:"Paused"}},remainingTimeHH:{name:"Remaining hour",control:"sensor",report:"6D02",unit:null,options:null},remainingTimeMM:{name:"Remaining minute",control:"sensor",report:"6D02",unit:null,options:null},dryerRemainingDryTime:{name:"Dryer remaining dry time",control:"sensor",report:"6D01",unit:"min",options:null},dryerRemainingResnTime:{name:"Dryer remaining resn time",control:"sensor",report:"6D01",unit:"min",options:null},remainingAntiCreaseTime:{name:"Remaining anti crease time",control:"sensor",report:"6D01",unit:"min",options:null},washerUnifiedProgramSettings:{name:"Washer unified program settings",control:"select",report:"6D02",unit:null,options:{0:"None",1:"Cotton",2:"Synthetics",3:"Down",4:"Curtains",5:"Mixed",6:"Shirts",7:"Kids' wear",8:"Delicates",9:"Hot clean",10:"Wool",11:"Denim",12:"Air wash",13:"Drum clean",14:"Underwear",15:"Quick 15",16:"Quick 29",17:"Bulky items",18:"Sportswear",19:"Cradle gentle",20:"Baby care",21:"Instant",22:"Silk",23:"Memory",24:"Colour care",25:"Hand wash",26:"Towels",27:"Rinsing",28:"Spin only",29:"Dry only",30:"Pet hair removal",31:"Bed sheets",32:"Outdoor wear",33:"Night wash",34:"Rack dry",35:"Loosen",36:"Skin care",37:"Sanitise",38:"Premium",39:"Quick cotton",40:"Intensive",41:"Easy iron",42:"Little sun",43:"Timed dry",44:"Hanger dry",45:"Online",46:"Wave wash",47:"CTTN cotton",48:"CTTN synthetics",49:"Anti-allergy",50:"Odour removal",51:"Timed wash",52:"Shell jacket",53:"App self-diagnosis",54:"Blanket",55:"Standard",56:"AI Wash",57:"AI cloud wash",58:"Bath towels",59:"UV sanitise",60:"Steam anti-mite",61:"Pasteurise",62:"Super air wash",63:"Super wash",64:"FPA quick 30",65:"Quick wash & dry",66:"Beauty care",67:"Cotton 20",68:"New EU performance",69:"EU performance wash & dry",70:"Aroma",71:"Mist refresh",72:"Mink",73:"Silk quilt",74:"School uniform",75:"Shearling",76:"Wool sweater",77:"Chiffon",78:"Suits",79:"Home textiles",80:"Plush toys",81:"Face masks",82:"Quick 39",83:"Seasonal",84:"EU cotton",85:"EU synthetics",86:"Mixed 2",87:"New clothes 2",88:"AI wash & dry",89:"Tweed",90:"Luxury textiles",91:"Drum wash & dry",92:"Linen",93:"Fragrance care",94:"Lasting fragrance",95:"Fleece",96:"Luxury care",97:"Steam AI wash",98:"Shirt steam",99:"Baby steam",100:"Steam anti-allergy",101:"Sports bra",102:"Seamless bra",103:"Shaping bra",104:"Lace bra",105:"Underpants",106:"Blue sanitise",107:"Quick isolation clean",108:"Rapid 20",109:"Rapid 30",110:"Workwear",111:"Nappies",112:"Shoes",113:"Fine",114:"Casual wear",115:"Cool air 30",116:"Timed warm air",117:"Timed cool air",118:"Sterilise",119:"Wool coat",120:"Baby bedding",121:"Cotton babywear",122:"Cotton bedding",123:"Linen suit",124:"Polar fleece",125:"Care cycle",126:"Leather care",127:"Fur care",128:"Colour refresh",129:"Fabric fragrance",130:"Warm clothes",131:"Duvet"}},dryerUnifiedProgramSettings:{name:"Dryer unified program settings",control:"select",report:"6D01",unit:null,options:{0:"None",1:"Cotton",2:"Synthetics",3:"Down",4:"Curtains",5:"Mixed",6:"Shirts",7:"Kids' wear",8:"Delicates",9:"Hot clean",10:"Wool",11:"Denim",12:"Air wash",13:"Drum clean",14:"Underwear",15:"Quick 15",16:"Quick 29",17:"Bulky items",18:"Sportswear",19:"Cradle gentle",20:"Baby care",21:"Instant",22:"Silk",23:"Memory",24:"Colour care",25:"Hand wash",26:"Towels",27:"Rinsing",28:"Spin only",29:"Dry only",30:"Pet hair removal",31:"Bed sheets",32:"Outdoor wear",33:"Night wash",34:"Rack dry",35:"Loosen",36:"Skin care",37:"Sanitise",38:"Premium",39:"Quick cotton",40:"Intensive",41:"Easy iron",42:"Little sun",43:"Timed dry",44:"Hanger dry",45:"Online",46:"Wave wash",47:"CTTN cotton",48:"CTTN synthetics",49:"Anti-allergy",50:"Odour removal",51:"Timed wash",52:"Shell jacket",53:"App self-diagnosis",54:"Blanket",55:"Standard",56:"AI Dry",57:"AI cloud wash",58:"Bath towels",59:"UV sanitise",60:"Steam anti-mite",61:"Pasteurise",62:"Super air wash",63:"Super wash",64:"FPA quick 30",65:"Quick wash & dry",66:"Beauty care",67:"Cotton 20",68:"New EU performance",69:"EU performance wash & dry",70:"Aroma",71:"Mist refresh",72:"Mink",73:"Silk quilt",74:"School uniform",75:"Shearling",76:"Wool sweater",77:"Chiffon",78:"Suits",79:"Home textiles",80:"Plush toys",81:"Face masks",82:"Quick 39",83:"Seasonal",84:"EU cotton",85:"EU synthetics",86:"Mixed 2",87:"New clothes 2",88:"AI wash & dry",89:"Tweed",90:"Luxury textiles",91:"Drum wash & dry",92:"Linen",93:"Fragrance care",94:"Lasting fragrance",95:"Fleece",96:"Luxury care",97:"Steam AI wash",98:"Shirt steam",99:"Baby steam",100:"Steam anti-allergy",101:"Sports bra",102:"Seamless bra",103:"Shaping bra",104:"Lace bra",105:"Underpants",106:"Blue sanitise",107:"Quick isolation clean",108:"Rapid 20",109:"Rapid 30",110:"Workwear",111:"Nappies",112:"Shoes",113:"Fine",114:"Casual wear",115:"Cool air 30",116:"Timed warm air",117:"Timed cool air",118:"Sterilise",119:"Wool coat",120:"Baby bedding",121:"Cotton babywear",122:"Cotton bedding",123:"Linen suit",124:"Polar fleece",125:"Care cycle",126:"Leather care",127:"Fur care",128:"Colour refresh",129:"Fabric fragrance",130:"Warm clothes",131:"Duvet"}},washerMessage:{name:"Washer message",control:"sensor",report:"6D02",unit:null,options:{0:"None",1:"Wash finished",2:"Wash and dry finished",3:"Detergent empty",4:"Softener empty",5:"Rack-dry instructions",6:"Close the drawer",7:"Weighed, add powder detergent",8:"Drum too hot to open",9:"Water too high to open",10:"Too much foam, removing it",11:"Disinfectant empty",12:"Anion treatment done",13:"Detergent and softener empty",14:"Clean the drain filter",15:"Clean the dryer filter",17:"Run a drum clean",18:"Door opened, remote control off",19:"Cycle count reached, clean the drain filter",20:"Dry-cleaning reminder",21:"Use regular detergent",22:"Use concentrated detergent"}},dryerMessage:{name:"Dryer message",control:"sensor",report:"6D01",unit:null,options:{0:"None",1:"Ironing reminder",2:"Drying finished",3:"Clean the filter",4:"Empty the water box",5:"Sterilising",6:"Reserved message 1",7:"Reserved message 2"}},washerRemoteCtrValid:{name:"Washer remote ctr valid",control:"binary_sensor",report:"6D02",unit:null,options:null},dryerRemoteCtrValid:{name:"Dryer remote ctr valid",control:"binary_sensor",report:"6D01",unit:null,options:null},washerDoorStatus:{name:"Washer door status",control:"binary_sensor",report:"6D02",unit:null,options:null},dryerDoorStatus:{name:"Dryer door status",control:"binary_sensor",report:"6D01",unit:null,options:null},washerDoorLockStatus:{name:"Washer door lock status",control:"binary_sensor",report:"6D02",unit:null,options:null},dryerDoorLockStatus:{name:"Dryer door lock status",control:"binary_sensor",report:"6D01",unit:null,options:null},washerPowerStatus:{name:"Washer power status",control:"binary_sensor",report:"6D01",unit:null,options:null},dryerPowerStatus:{name:"Dryer power status",control:"binary_sensor",report:"6D01",unit:null,options:null},onOffStatus:{name:"Power",control:"switch",report:"6D01",unit:null,options:null},childLockStatus:{name:"Child lock status",control:"switch",report:"6D01",unit:null,options:null},laundryCycleStatus:{name:"Laundry cycle status",control:"binary_sensor",report:"6D02",unit:null,options:null},washerDryStatus:{name:"Washer dry status",control:"switch",report:"6D02",unit:null,options:null},remainingDetergentStatus:{name:"Remaining detergent status",control:"sensor",report:"6D02",unit:null,options:{0:"Unknown",1:"Yes",2:"No"}},remainingSoftenerStatus:{name:"Remaining softener status",control:"sensor",report:"6D02",unit:null,options:{0:"Unknown",1:"Yes",2:"No"}},washerDryMode:{name:"Washer dry mode",control:"select",report:"6D02",unit:null,options:{0:"No drying",1:"Strong dry",2:"Gentle dry",3:"Easy iron",4:"120 min dry",5:"90 min dry",6:"60 min dry",7:"30 min dry",8:"150 min dry",9:"180 min dry",10:"Smart dry",11:"210 min dry",12:"Reserved 1",13:"Reserved 2"}},dryerDryMode:{name:"Dryer dry mode",control:"select",report:"6D01",unit:null,options:{1:"Normal drying",2:"Eco drying",3:"Fast drying"}},totalWaterUsed:{name:"Total water used",control:"sensor",report:"6D02",unit:"L",options:null},washerTotalElectricityUsed:{name:"Washer total electricity used",control:"sensor",report:"6D02",unit:null,options:null},totalWashCycle:{name:"Total wash cycle",control:"sensor",report:"6D02",unit:null,options:null},currentWaterUsed:{name:"Current water used",control:"sensor",report:"6D02",unit:"L",options:null},washerCurrentElectricityUsed:{name:"Washer current electricity used",control:"sensor",report:"6D02",unit:"kWh",options:null}},Yn="haismart",lt=["washer_start","washer_pause","washer_cancel","dryer_start","dryer_pause","dryer_cancel"],Gn=["_laundry_cycle_phase","_dryer_cycle_phase"],Et={select:0,switch:1,number:2,sensor:3,binary_sensor:4},Z=a=>a.slice(0,a.indexOf(".")),Qt=a=>a.slice(a.indexOf(".")+1),ee=a=>a.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");function ye(a,e){const t=[];for(const n of Object.values(a.entities??{}))n.device_id===e&&n.platform===Yn&&t.push(n);return t}function Zn(a,e){const t=ye(a,e);if(!t.length)return!1;for(const i of t){const s=a.states?.[i.entity_id]?.attributes?.haier_attribute;if(s==="laundryCyclePhase"||s==="dryerCyclePhase"||i.translation_key&&lt.includes(i.translation_key))return!0}if(tn(e))return!0;const n=i=>Qt(i);return t.some(i=>Gn.some(s=>n(i.entity_id).endsWith(s)))}function Xt(a){return Object.keys(a.devices??{}).filter(e=>Zn(a,e))}function Jn(a){return!!a&&!!a.entities&&!!a.devices&&!!a.states}function ue(a,e){if(!Jn(a))return{kind:"loading"};const t=Xt(a);return e.device_id?a.devices[e.device_id]?t.includes(e.device_id)?{kind:"ok",deviceId:e.device_id,candidates:t}:{kind:"not_laundry",deviceId:e.device_id,name:Re(a,e.device_id,void 0)}:{kind:"removed"}:t.length?{kind:"ok",deviceId:t[0],candidates:t}:{kind:"none"}}function Re(a,e,t="Laundry Centre"){const n=a.devices?.[e];return n?.name_by_user||n?.name||t}const Je=new Map,en="haismart-laundry-card:index:v1:";function Qn(a){try{return globalThis.localStorage?.getItem(a)??null}catch{return null}}function Xn(a,e){try{globalThis.localStorage?.setItem(a,e)}catch{}}function tn(a){const e=Je.get(a);if(e)return e;const t=Qn(en+a);if(t)try{const n=JSON.parse(t);if(n&&n.deviceId===a&&n.attrs)return Je.set(a,n),n}catch{}}function ea(a){Je.set(a.deviceId,a),Xn(en+a.deviceId,JSON.stringify(a))}let Pt=new WeakMap;const ta=Object.entries(V).map(([a,e])=>["_"+ee(e.name),a]);function nn(a,e){const t=ye(a,e);let n=Pt.get(a.entities);const i=n?.get(e);if(i&&i.devices===a.devices&&!t.some(_=>typeof a.states?.[_.entity_id]?.attributes?.haier_attribute=="string"&&!i.known.has(_.entity_id)))return i.index;const s=new Set(t.map(w=>w.entity_id)),o={},c=new Set,d={};let m,h=!1;for(const w of t){const _=w.entity_id,x=Z(_),T=a.states?.[_];if(x==="button"){w.translation_key&&lt.includes(w.translation_key)&&(d[w.translation_key]=_);continue}if(x==="binary_sensor"&&w.translation_key==="fault"&&(m=_),!T)continue;const P=T.attributes?.haier_attribute;if(typeof P!="string"||(c.add(_),Array.isArray(T.attributes.haier_attributes)&&!("haier_value"in T.attributes)))continue;h=!0;const M=o[P];(!M||(Et[x]??9)<(Et[Z(M)]??9))&&(o[P]=_)}m||(m=t.find(w=>Z(w.entity_id)==="binary_sensor"&&w.entity_id.endsWith("_fault"))?.entity_id);const l=tn(e);if(l)for(const[w,_]of Object.entries(l.attrs))!o[w]&&s.has(_)&&(o[w]=_);const p=[];for(const w of t){const _=w.entity_id;if(Z(_)==="button")continue;const T=Qt(_);for(const[P,M]of ta)o[M]||!T.endsWith(P)||(o[M]=_,p.push(M))}const g={washer:o.washerUnifiedProgramSettings?Z(o.washerUnifiedProgramSettings):void 0,dryer:o.dryerUnifiedProgramSettings?Z(o.dryerUnifiedProgramSettings):void 0},b={deviceId:e,attrs:o,buttons:d,fault:m,programDomain:g,live:h,slugOnly:p};if(h){const w={};for(const[_,x]of Object.entries(o))p.includes(_)||(w[_]=x);ea({...b,attrs:w,slugOnly:[]})}return n||(n=new Map,Pt.set(a.entities,n)),n.set(e,{devices:a.devices,index:b,known:c}),b}function na(a,e){const t=new Set(Object.values(a.attrs));for(const n of Object.values(a.buttons))n&&t.add(n);if(a.fault&&t.add(a.fault),!a.attrs.laundryCyclePhase&&!a.attrs.dryerCyclePhase)for(const n of ye(e,a.deviceId))t.add(n.entity_id);return[...t]}const Q=6e4,aa=new Set([65,69,88,91]),ia=new Set([29,34,43,44]),sa=new Set([12,13,17,25]),ae={};for(const a of[21,22,23,24,3,4,5,6])ae[a]="wash";for(const a of[7,8,9,10])ae[a]="rinse";ae[11]="spin";for(const a of[12,13,17,25])ae[a]="dry";ae[20]="care";const ra={8:"sense",10:"sense",2:"dry",3:"dry",4:"dry",5:"cool",9:"care"},Qe={washer:{phase:"laundryCyclePhase",mode:"washerRunningMode",programme:"washerUnifiedProgramSettings",message:"washerMessage",remote:"washerRemoteCtrValid",door:"washerDoorStatus",doorLock:"washerDoorLockStatus",power:"washerPowerStatus",remaining:["remainingTimeHH","remainingTimeMM"],buttons:{start:"washer_start",pause:"washer_pause",cancel:"washer_cancel"}},dryer:{phase:"dryerCyclePhase",mode:"dryerRunningMode",programme:"dryerUnifiedProgramSettings",message:"dryerMessage",remote:"dryerRemoteCtrValid",door:"dryerDoorStatus",doorLock:"dryerDoorLockStatus",power:"dryerPowerStatus",remaining:["dryerRemainingDryTime","dryerRemainingResnTime","remainingAntiCreaseTime"],buttons:{start:"dryer_start",pause:"dryer_pause",cancel:"dryer_cancel"}}},oa={washer:Object.values(Qe.washer).flat().filter(a=>typeof a=="string"),dryer:Object.values(Qe.dryer).flat().filter(a=>typeof a=="string")},z="mdi:information-outline",Fe={1:{category:"absorbed"},2:{category:"absorbed"},6:{category:"blocking",icon:"mdi:tray-alert"},7:{category:"blocking",icon:"mdi:spoon-sugar"},8:{category:"blocking",icon:"mdi:thermometer-alert"},9:{category:"blocking",icon:"mdi:waves-arrow-up"},3:{category:"supply",icon:"mdi:spray-bottle"},4:{category:"supply",icon:"mdi:bottle-tonic-outline"},11:{category:"supply",icon:"mdi:bottle-tonic-plus-outline"},13:{category:"supply",icon:"mdi:bottle-tonic-outline"},14:{category:"maintenance",icon:"mdi:air-filter"},15:{category:"maintenance",icon:"mdi:air-filter"},17:{category:"maintenance",icon:"mdi:washing-machine-alert"},19:{category:"maintenance",icon:"mdi:air-filter"},5:{category:"info",icon:z},10:{category:"info",icon:"mdi:chart-bubble"},12:{category:"info",icon:z},20:{category:"info",icon:z},21:{category:"info",icon:z},22:{category:"info",icon:z},18:{category:"hidden"}},la={2:{category:"absorbed"},3:{category:"maintenance",icon:"mdi:air-filter"},4:{category:"maintenance",icon:"mdi:cup-water"},1:{category:"info",icon:"mdi:iron-outline"},5:{category:"info",icon:"mdi:shield-check-outline"},6:{category:"hidden"},7:{category:"hidden"}},Rt=["blocking","supply","maintenance","info","unknown"],$e=new Set(["unavailable","unknown"]),Xe=a=>a.slice(0,a.indexOf("."));class ca{constructor(e,t){this.hass=e,this.index=t,this.legacy=!1,this.legacyUnmapped=!1}read(e){const t=this.index.attrs[e],n=t?this.hass.states?.[t]:void 0;if(!n)return{value:void 0,fromLabel:!1,eid:t};const i={state:n.state,entity:n,eid:t};if($e.has(n.state))return{...i,value:void 0,fromLabel:!1};const s=n.attributes??{};if("haier_value"in s){const c=s.haier_value;return{...i,value:c===null?void 0:c,fromLabel:!1}}this.legacy=!0;const o=da(e,t,n.state);return o===void 0&&(this.legacyUnmapped=!0),{...i,value:o,fromLabel:o!==void 0}}num(e){const t=this.read(e).value;return typeof t=="number"&&Number.isFinite(t)?t:typeof t=="boolean"?Number(t):void 0}bool(e){const t=this.read(e).value;return typeof t=="boolean"?t:typeof t=="number"?t!==0:void 0}}function da(a,e,t){const n=Xe(e),i=t.trim().toLowerCase();if(n==="binary_sensor"||n==="switch")return i==="on"?!0:i==="off"?!1:void 0;const s=V[a]?.options;if(s){for(const[c,d]of Object.entries(s))if(d.trim().toLowerCase()===i)return Number(c);return}const o=parseFloat(t);return Number.isFinite(o)?o:void 0}const ce=a=>{if(!a)return;const e=Date.parse(a);return Number.isFinite(e)?e:void 0};function ua(a){return ae[a]}function ha(a){return ra[a]}function pa(a,e){if(a.generic||a.sub==="maintenance")return null;const t=a.isDoneLike;if(!t&&a.status!=="running"&&a.status!=="estimating"&&a.status!=="paused")return null;let n,i;if(a.key==="washer"?(n=ia.has(a.programme.value??-1)?["dry"]:e?["wash","rinse","spin","dry"]:["wash","rinse","spin"],a.phase===20&&(n=[...n,"care"]),i=a.status==="estimating"?void 0:ua(a.phase??-1)):(n=["sense","dry","cool"],a.phase===9&&(n=[...n,"care"]),i=a.status==="estimating"?"sense":ha(a.phase??-1)),t)return n.map(o=>({key:o,state:"complete"}));const s=i?n.indexOf(i):-1;return n.map((o,c)=>({key:o,state:s<0?"upcoming":c<s?"complete":c===s?"current":"upcoming"}))}function an(a,e,t={}){const n=t.now??Date.now(),i=t.memory??{},s=new ca(a,e),o=s.read("laundryCyclePhase"),c=s.read("dryerCyclePhase"),d=y=>!y.entity||y.entity.state==="unavailable";let m=!1,h,l;if(o.entity||c.entity)m=d(o)&&d(c),m&&(l=we([o.entity?.last_changed,c.entity?.last_changed]));else{const y=ye(a,e.deviceId).filter(v=>v.entity_category!=="diagnostic"&&v.translation_key!=="cloud_connection"&&Xe(v.entity_id)!=="button").map(v=>a.states?.[v.entity_id]).filter(v=>!!v);m=y.every(v=>v.state==="unavailable"),m&&(l=we(y.map(v=>v.last_changed)))}m?h="unavailable":s.bool("onOffStatus")===!1&&(m=!0,h="power",l=we([s.read("onOffStatus").entity?.last_changed]));const p=e.fault?a.states?.[e.fault]:void 0,g={on:!1,faults:[],entity:e.fault};if(p&&p.state==="on"){g.on=!0;const y=p.attributes??{};g.faults=Array.isArray(y.faults)?y.faults.map(L=>String(L)):[];const v=Array.isArray(y.fault_codes)?y.fault_codes.map(L=>String(L)).filter(Boolean):[];v.length?g.codes=v.join(", "):y.error_code!==null&&y.error_code!==void 0&&y.error_code!==0&&y.error_code!=="0"&&(g.codes=String(y.error_code))}const b={detergent:s.read("remainingDetergentStatus"),softener:s.read("remainingSoftenerStatus")},w=s.bool("washerDryStatus"),_=s.bool("laundryCycleStatus"),x=(y,v,L)=>{const E=Qe[y],W=i[y]??={},ht=s.bool(E.power),Ue=s.num(E.mode),gn=s.bool(E.remote),yn=s.bool(E.door),_n=s.bool(E.doorLock),bn=V[E.phase]?.options??{};let U,I,q,pt,mt;if(y==="washer"){const S=s.read("remainingTimeHH"),D=s.read("remainingTimeMM");typeof S.value=="number"&&typeof D.value=="number"&&(U=S.value*60+D.value,I=we([S.entity?.last_updated,D.entity?.last_updated]))}else{const S=s.read("dryerRemainingDryTime");typeof S.value=="number"&&(U=S.value,I=ce(S.entity?.last_updated)),q=s.num("dryerRemainingResnTime"),pt=s.num("remainingAntiCreaseTime")}mt=U&&U>0?U:void 0;const R=s.read(E.programme),_e=typeof R.value=="number"?R.value:void 0,wn=V[E.programme]?.options??{},vn={value:_e,label:_e===void 0?void 0:R.entity&&!$e.has(R.entity.state)&&"haier_value"in(R.entity.attributes??{})?R.entity.state:wn[String(_e)]??R.entity?.state,entity:R.eid,domain:R.eid?Xe(R.eid):void 0,lastChanged:ce(R.entity?.last_changed)},$=typeof v.value=="number"?v.value:void 0,ft=v.entity?.state,kn=!!L.entity&&!$e.has(L.entity.state);let k,Ne,be=!1;const gt=$!==void 0&&String($)in bn;m||ht===!1?k="off":ft==="unknown"||ft==="unavailable"&&kn||!v.entity?k="stale":$===void 0?(be=!0,k=Ue===1||y==="washer"&&_===!0?"running":"idle"):$===0?k="idle":y==="washer"&&$===15||y==="dryer"&&$===1?k="delayed":y==="washer"&&($===14||$===18||$===19)||y==="dryer"&&$===6?k="done":y==="dryer"&&$===7||y==="washer"&&$===16?k="tumbling":gt?Ue===2?k="paused":y==="washer"&&($===1||$===2||$===26)||y==="dryer"&&($===8||$===10)?k="estimating":k="running":(be=!0,k="running"),!be&&(k==="running"||k==="paused"||k==="estimating")&&(y==="dryer"&&$===11?Ne="maintenance":(y==="washer"&&$===20||y==="dryer"&&$===9)&&(Ne="care"));const $n=k==="running"||k==="estimating"||k==="paused",We=k==="done"||k==="tumbling";y==="washer"&&($===0?W.seenDry=!1:$!==void 0&&sa.has($)&&(W.seenDry=!0));const Sn=y==="washer"&&(aa.has(_e??-1)||w===!0||W.seenDry===!0);let N,yt,Ie=k==="estimating"||v.fromLabel&&s.legacy;(k==="running"||k==="estimating")&&U!==void 0&&I!==void 0&&(N=I+U*Q);let je=U??0;k==="delayed"&&(y==="washer"?Ie=!0:q!==void 0&&q>0&&I!==void 0&&(je=q+(U??0),N=I+je*Q,yt=I+q*Q,Ie=!0)),N!==void 0&&W.finishRaw!==void 0&&W.status===k&&Math.abs(N-W.finishRaw)<2*Q&&(N=W.finishRaw),W.finishRaw=N,W.status=k;const xn=N===void 0?void 0:je>120?ma(N):N;let _t;if(We&&v.entity){const S=ce(v.entity.last_changed),D=oa[y].map(O=>e.attrs[O]).map(O=>O?a.states?.[O]:void 0).filter(O=>!!O&&!$e.has(O.state)).map(O=>ce(O.last_changed)).filter(O=>O!==void 0),ie=D.length?Math.min(...D):S;S!==void 0&&ie!==void 0&&S-ie>=5e3&&n-S<=1440*Q&&(_t=S)}const Y=s.read(E.message),C=typeof Y.value=="number"?Y.value:void 0,G=[];let bt;if(C!==void 0&&C!==0){const S=(y==="washer"?Fe:la)[C];if(!S)G.push({value:C,text:Y.entity?.state,category:"unknown",icon:z,entity:Y.eid,source:"message"});else if(S.category!=="absorbed"&&S.category!=="hidden"){const D={key:`notice.${y==="washer"?"w":"d"}.${C}`,value:C,category:S.category,icon:S.icon??z,entity:Y.eid,source:"message"};y==="washer"&&(C===8||C===9)&&We?bt=D:G.push(D)}}y==="washer"&&(b.detergent.value===2&&C!==3&&C!==13&&G.push({key:"notice.w.3",value:3,category:"supply",icon:Fe[3].icon,entity:b.detergent.eid,source:"supply"}),b.softener.value===2&&C!==4&&C!==13&&G.push({key:"notice.w.4",value:4,category:"supply",icon:Fe[4].icon,entity:b.softener.eid,source:"supply"})),G.sort((S,D)=>Rt.indexOf(S.category)-Rt.indexOf(D.category));const He=S=>{const D=e.buttons[S],ie=D?a.states?.[D]:void 0;return ie&&ie.state!=="unavailable"?D:void 0},Be={key:y,status:k,sub:Ne,generic:be,phase:$,phaseKnown:gt,mode:Ue,phaseEntity:v.eid,remaining:U,resn:q,antiCrease:pt,anchor:I,finishAt:xn,finishRaw:N,startsAt:yt,approximate:Ie,idleDuration:mt,programme:vn,message:C,messageEntity:Y.eid,remote:gn,doorOpen:yn,doorLocked:_n,power:ht,notices:G,blockingNotice:bt,steps:null,finishedAt:_t,buttons:{start:He(E.buttons.start),pause:He(E.buttons.pause),cancel:He(E.buttons.cancel)},isActive:$n,isDoneLike:We};return Be.steps=pa(Be,Sn),Be},T=x("washer",o,c),P=x("dryer",c,o),M=y=>{const v=s.read(y),L=v.entity?.attributes?.unit_of_measurement;return{value:typeof v.value=="number"?v.value:void 0,unit:typeof L=="string"&&L?L:void 0,entity:v.eid}},fn=Object.values(e.buttons).some(y=>!!y&&!!a.states?.[y]);return{deviceId:e.deviceId,machineOff:m,offReason:h,offSince:l,washer:T,dryer:P,fault:g,childLock:s.bool("childLockStatus"),controlsExist:fn,legacy:s.legacy,legacyUnmapped:s.legacyUnmapped,totals:{water:M("totalWaterUsed"),energy:M("washerTotalElectricityUsed"),cycles:M("totalWashCycle"),cycleWater:M("currentWaterUsed"),cycleEnergy:M("washerCurrentElectricityUsed")},now:n}}function we(a){let e;for(const t of a){const n=ce(t);n!==void 0&&(e===void 0||n>e)&&(e=n)}return e}function ma(a){const e=5*Q;return Math.round(a/e)*e}function fa(a){switch(a.status){case"idle":return a.generic?{}:{primary:"start"};case"running":case"estimating":return{primary:"pause",secondary:"cancel"};case"paused":return{primary:"resume",secondary:"cancel"};case"delayed":return{secondary:"cancel_scheduled"};case"tumbling":return a.key==="dryer"?{secondary:"stop"}:{};default:return{}}}function ga(a){return a==="start"||a==="resume"?"start":a==="pause"?"pause":"cancel"}function et(a,e){return a.buttons[ga(e)]}function sn(a,e,t,n){if(e.remote!==!0)return"remote";if(n.sending&&n.sending!==e.key)return"busy";if((n.pending?new Set(n.pending):new Set).has(e.key))return"pending";if((t==="start"||t==="resume")&&a.fault.on)return"fault";if(t==="start"){if(e.doorOpen===!0)return"door";if(!e.programme.value)return"programme";if(e.programme.lastChanged!==void 0&&n.now-e.programme.lastChanged<5e3)return"applying"}return null}function ya(a,e){switch(a){case"start":return e.status==="running"||e.status==="estimating"||e.status==="delayed";case"resume":return(e.status==="running"||e.status==="estimating")&&e.mode===1;case"pause":return e.mode===2||e.status==="paused";default:return e.phase===0}}function _a(a){return[a.washer,a.dryer].some(e=>e.status==="running"||e.status==="estimating"||e.status==="delayed")}const Ot=" does not accept that setting: ",Ke="Could not send the command to ",ba=[["remote control is not enabled","err.remote_off"],["no fresh report","err.no_report"],["laundry controls are off","err.controls_off"],["is running or its state is unknown","err.running"],["has not read","err.no_status"]];function wa(a){const e=a??{},t=typeof e.message=="string"?e.message:typeof a=="string"?a:"",n=e.code;if(!t||n===3||n==="connection_lost"||e.error==="connection_lost")return{key:"err.ha_unreachable",detail:re(t)};let i=t,s=!1;const o=t.indexOf(Ot);if(o>=0)i=t.slice(o+Ot.length);else if(t.startsWith(Ke)){s=!0;const d=t.indexOf(": ",Ke.length);i=d>=0?t.slice(d+2):t.slice(Ke.length)}const c=i.toLowerCase();for(const[d,m]of ba)if(c.includes(d))return{key:m,detail:re(i)};return t.toLowerCase().includes("has not read")?{key:"err.no_status",detail:re(i)}:s?{key:"err.unreachable",detail:re(i)}:{key:"err.generic",detail:re(i)}}function re(a){const e=a.trim().replace(/\s--\s/g," — ").replace(/--/g,"—");return e?e.charAt(0).toUpperCase()+e.slice(1):""}const va=45e3,ka=3e3;class $a{constructor(e){this.host=e,this.states=new Map,this.timers=new Map}get(e){return this.states.get(e)}get sending(){return this.sendingDrum}get pending(){return[...this.states.values()].filter(e=>e.phase==="sending"||e.phase==="waiting").map(e=>e.drum)}isBusy(e){const t=this.states.get(e);return!!t&&(t.phase==="sending"||t.phase==="waiting")}async run(e,t,n,i){if(this.sendingDrum||this.isBusy(t))return;this.clearTimer(t),this.states.set(t,{drum:t,cmd:n,phase:"sending",entity:i}),this.sendingDrum=t,this.host.requestUpdate();try{await e.callService("button","press",{entity_id:i})}catch(o){const c=wa(o);this.sendingDrum=void 0,this.states.set(t,{drum:t,cmd:n,phase:"error",entity:i,error:c}),this.host.onError?.(t,n,c),this.host.requestUpdate();return}this.sendingDrum=void 0;const s=this.states.get(t);s&&s.phase==="sending"&&(s.phase="waiting",this.setTimer(t,va,()=>{const o=this.states.get(t);o&&o.phase==="waiting"&&(o.phase="unconfirmed",this.host.onUnconfirmed?.(t,n),this.host.requestUpdate())})),this.host.requestUpdate()}observe(e){for(const t of e){const n=this.states.get(t.key);n&&(n.phase==="waiting"&&ya(n.cmd,t)?(n.phase="confirmed",this.host.onConfirmed?.(t.key,n.cmd),this.setTimer(t.key,ka,()=>{this.states.get(t.key)?.phase==="confirmed"&&this.states.delete(t.key),this.host.requestUpdate()}),this.host.requestUpdate()):n.phase==="error"&&(n.statusAtError===void 0?n.statusAtError=t.status:n.statusAtError!==t.status&&(this.states.delete(t.key),this.host.requestUpdate())))}}dismiss(e){const t=this.states.get(e);t&&(t.phase==="error"||t.phase==="unconfirmed"||t.phase==="confirmed")&&(this.clearTimer(e),this.states.delete(e),this.host.requestUpdate())}dispose(){for(const e of[...this.timers.keys()])this.clearTimer(e)}setTimer(e,t,n){this.clearTimer(e),this.timers.set(e,setTimeout(()=>{this.timers.delete(e),n()},t))}clearTimer(e){const t=this.timers.get(e);t!==void 0&&clearTimeout(t),this.timers.delete(e)}}const Sa={"drum.washer":"Washer","drum.washer_lc":"washer","drum.dryer":"Dryer","drum.dryer_lc":"dryer","card.default_title":"Laundry Centre","card.sample":"Sample","status.ready":"Ready","status.off":"Off","status.waiting":"Waiting…","status.stale_support":"No update from the {drum} yet","status.paused":"Paused","status.scheduled":"Scheduled","status.done":"Done","status.running":"Running","status.finishing":"Finishing…","eyebrow.phase":"{Drum} · {phase}","eyebrow.estimating":"{Drum} · Estimating time…","eyebrow.paused":"{Drum} · Paused during {phase}","eyebrow.finished":"{Drum} · Finished","eyebrow.scheduled":"{Drum} · Scheduled","eyebrow.anticrease":"{Drum} · Anti-crease","eyebrow.tumbling":"{Drum} · Tumbling","eyebrow.maintenance":"{Drum} · Maintenance","eyebrow.care":"{Drum} · Care","support.idle":"{programme} · about {d}","support.no_programme":"No programme selected","support.pick_hint":"Choose a programme, then Start","support.in":"in {d}","support.about":"about {d}","support.done_at":"done {time}","support.est_dryer":"about {d} · estimate improves once drying starts","support.est_washer":"about {d} · estimate updates after weighing","support.paused":"{d} left when resumed","support.starts_in":"Starts in {d}","support.finishes_about":"Finishes in about {d}","support.finished_at":"Finished {time} · ready to unload","support.ready_unload":"Ready to unload","support.door_locked":"door still locked","support.anticrease":"Tumbling to prevent creases · {n} min left · unload any time","support.anticrease_short":"Tumbling to prevent creases · unload any time","support.tumble_washer":"Tumbling to loosen clothes · unload any time","support.maintenance":"Self-maintenance cycle · in {d}","support.maintenance_short":"Self-maintenance cycle","support.care":"Keeping laundry fresh · in {d}","support.care_short":"Keeping laundry fresh","phase.working":"Working","time.tomorrow":"tomorrow","dur.h":"h","dur.min":"min","a11y.hours":"hours","a11y.minutes":"minutes","a11y.hour":"hour","a11y.minute":"minute","phase.w.0":"Ready","phase.w.1":"Weighing","phase.w.2":"Checking the load","phase.w.3":"Filling","phase.w.4":"Heating water","phase.w.5":"Washing","phase.w.6":"Draining","phase.w.7":"Spinning","phase.w.8":"Filling for rinse","phase.w.9":"Rinsing","phase.w.10":"Draining","phase.w.11":"Final spin","phase.w.12":"Drying","phase.w.13":"Cooling down","phase.w.14":"Finished","phase.w.15":"Scheduled","phase.w.16":"Tumbling","phase.w.17":"Drying","phase.w.18":"Finished","phase.w.19":"Finished","phase.w.20":"Care","phase.w.21":"Filling for pre-wash","phase.w.22":"Pre-wash","phase.w.23":"Heating pre-wash","phase.w.24":"Draining","phase.w.25":"Air drying","phase.w.26":"Detecting load","phase.d.0":"Ready","phase.d.1":"Scheduled","phase.d.2":"Drying with cool air","phase.d.3":"Drying","phase.d.4":"Drying","phase.d.5":"Cooling down","phase.d.6":"Finished","phase.d.7":"Anti-crease","phase.d.8":"Sensing load","phase.d.9":"Care","phase.d.10":"Pre-drying","phase.d.11":"Maintenance","step.wash":"Wash","step.rinse":"Rinse","step.spin":"Spin","step.dry":"Dry","step.sense":"Sense","step.cool":"Cool","step.care":"Care","a11y.progress":"Progress","a11y.step_complete":"complete","a11y.step_current":"current","a11y.step_upcoming":"not started","a11y.sentence":"{Drum}: {parts}","a11y.ready":"ready","a11y.off":"off","a11y.waiting":"waiting for an update","a11y.running":"running","a11y.estimating":"running, estimating time","a11y.paused":"paused","a11y.scheduled":"scheduled","a11y.done":"done","a11y.tumbling":"done, tumbling","a11y.finishes_around":"finishes around {time}","a11y.starts_in":"starts in {d}","a11y.in_about":"in about {d}","a11y.left":"{d} left","a11y.finished_at":"finished {time}","a11y.programme":"programme {programme}","a11y.fault":"machine reports a problem","a11y.drum_done":"{Drum} is done","a11y.child_lock":"Child lock on","a11y.open_device":"Open device page","a11y.show_drum":"Show {drum}","a11y.notice":"Notice","head.attention":"Needs attention","head.off":"Machine is off · since {time}","head.all_ready":"Laundry is ready","head.drum_ready":"{Drum} is ready","head.drum_ready_other":"{Drum} is ready · {other} {time}","head.all_done_by":"All done by {time}","head.drum_done":"{Drum} done {time}","head.drum_paused":"{Drum} paused","head.drum_scheduled":"{Drum} scheduled","head.waiting":"Waiting for an update","head.ready":"Ready","off.title":"Machine is off","off.since":"since {time}","off.explain":"It turns off Wi-Fi after each cycle. It will appear here when you switch it on.","off.explain_power":"Switch it on at the machine to start a cycle.","fault.title":"Machine reports a problem","fault.more":"+{n} more","fault.code":"Code {code}","fault.no_detail":"Check the machine's display for details","notice.w.3":"Detergent empty","notice.w.4":"Softener empty","notice.w.5":"Rack-dry instructions","notice.w.6":"Close the drawer","notice.w.7":"Add powder detergent now","notice.w.8":"Drum too hot to open","notice.w.9":"Water too high to open","notice.w.10":"Too much foam, removing it","notice.w.11":"Disinfectant empty","notice.w.12":"Anion treatment done","notice.w.13":"Detergent and softener empty","notice.w.14":"Clean the drain filter","notice.w.15":"Clean the dryer filter","notice.w.17":"Run a drum clean","notice.w.19":"Cycle count reached: clean the drain filter","notice.w.20":"Dry-cleaning reminder","notice.w.21":"Use regular detergent","notice.w.22":"Use concentrated detergent","notice.d.1":"Ironing reminder","notice.d.3":"Clean the filter","notice.d.4":"Empty the water box","notice.d.5":"Sterilising","notice.more":"+{n} more","notice.less":"Show less","ctl.start":"Start","ctl.resume":"Resume","ctl.pause":"Pause","ctl.cancel":"Cancel","ctl.start_prog":"Start {programme}","ctl.cancel_drum":"Cancel the {drum} cycle","ctl.cancel_scheduled":"Cancel scheduled cycle","ctl.stop_tumbling":"Stop tumbling","ctl.starting":"Starting…","ctl.resuming":"Resuming…","ctl.pausing":"Pausing…","ctl.cancelling":"Cancelling…","ctl.stopping":"Stopping…","ctl.waiting":"Waiting for the {drum} to confirm…","ctl.ok_started":"{Drum} started","ctl.ok_resumed":"{Drum} resumed","ctl.ok_paused":"{Drum} paused","ctl.ok_cancelled":"{Drum} cycle cancelled","ctl.ok_stopped":"Tumbling stopped","ctl.unconfirmed":"The {drum} hasn't confirmed the change yet. Check the machine before trying again.","ctl.dismiss":"Dismiss","ctl.available":"{Drum} controls available","gate.busy":"Busy: sending to the {other}","gate.fault":"Clear the fault before starting","gate.door":"Close the door to start","gate.programme":"Pick a programme first","gate.applying":"Applying programme…","remote.off":"Remote control is off at the {drum} panel","remote.off_short":"Remote off","remote.door":"Remote control turned off when the door was opened. Turn it on again at the {drum} panel.","remote.help_label":"How to turn on remote control","remote.help":"For safety, the machine only accepts commands from Home Assistant after you turn on remote control at its panel. Press the remote / Wi-Fi key on the {drum}, then try again.","remote.on":"Remote control on","dlg.cancel_w_title":"Cancel the washer cycle?","dlg.cancel_w_body":"{programme} stops now and can't be resumed. The washer returns to standby. Water may need to drain before the door unlocks.","dlg.cancel_d_title":"Cancel the dryer cycle?","dlg.cancel_d_body":"{programme} stops now and can't be resumed. The dryer returns to standby.","dlg.this_cycle":"This cycle","dlg.keep_washing":"Keep washing","dlg.keep_drying":"Keep drying","dlg.cancel_cycle":"Cancel cycle","dlg.sched_title":"Cancel the scheduled {drum} cycle?","dlg.sched_body":"The {drum} won't start. You can set it again at the machine.","dlg.keep_scheduled":"Keep it scheduled","dlg.tumble_title":"Stop anti-crease tumbling?","dlg.tumble_body":"The clothes are already dry. The dryer stops tumbling and returns to standby.","dlg.keep_tumbling":"Keep tumbling","dlg.start_title":"Start the {drum}?","dlg.start_confirm":"Start {drum}","dlg.takes_about":"Takes about {d}","dlg.door_closed":"Door closed","dlg.not_now":"Not now","dlg.changed":"The {drum}'s state changed. Close and check again.","err.title":"The {drum} didn't accept that","err.remote_off":"Remote control is off at the {drum} panel. Turn it on there, then try again.","err.no_report":"Couldn't get a fresh reading from the {drum}. Try again in a moment.","err.controls_off":"Controls are turned off in the haismart integration options.","err.running":"Pause or cancel the {drum} before changing the programme.","err.no_status":"Home Assistant hasn't read the machine yet. Wait a moment and try again.","err.unreachable":"Couldn't reach the machine. Check it's switched on and try again.","err.ha_unreachable":"Couldn't reach Home Assistant. Check your connection and try again.","err.generic":"The command wasn't sent.","err.details":"Details","err.retry":"Try again","tot.cycle":"This cycle {water} L · {energy}","tot.total":"Total {water} L · {energy} · {n} {washes}","tot.wash_one":"wash","tot.wash_other":"washes","setup.none_title":"No Haier laundry centre found","setup.none_body":"Add it with the haismart integration, then refresh.","setup.removed_title":"The selected laundry centre was removed","setup.removed_body":"Choose another in the card settings.","setup.not_laundry":"{name} isn't a washer or dryer","setup.not_laundry_body":"Choose your laundry centre in the card settings.","setup.edit_hint":"Open the card settings to fix this.","setup.config_error":"Card configuration error","ed.device":"Laundry centre","ed.device_helper":"Leave empty to pick automatically: {name}","ed.device_helper_none":"Leave empty to pick automatically","ed.title":"Title","ed.layout":"Layout","ed.layout_helper":"Automatic adapts to the card's width.","ed.layout_auto":"Automatic","ed.layout_full":"Side by side","ed.layout_stacked":"Stacked","ed.layout_compact":"Compact","ed.time":"Show time as","ed.time_both":"Finish time and time left","ed.time_finish":"Finish time only","ed.time_remaining":"Time left only","ed.drums":"Drums","ed.drums_both":"Both","ed.drums_washer":"Washer only","ed.drums_dryer":"Dryer only","ed.order":"Order","ed.order_washer_first":"Washer first","ed.order_dryer_first":"Dryer first","ed.advanced":"Advanced","ed.collapse_idle":"Collapse the idle drum on small screens","ed.show_notices":"Show notices","ed.show_stepper":"Show phase steps","ed.show_totals":"Show water and energy totals","ed.show_controls":"Show controls","ed.show_controls_auto":"When available","ed.show_controls_never":"Never","ed.confirm_start":"Ask before starting a cycle","ed.confirm_start_helper":"Cancel always asks. This can't be turned off.","ed.off_style":"When the machine is off","ed.off_style_keep":"Keep layout","ed.off_style_collapse":"One line","ed.language":"Language","ed.language_auto":"Follow Home Assistant","ed.language_en":"English","ed.language_ms":"Bahasa Melayu","ed.tap_action":"Tap action","ed.detected":"Detected","det.device":"Device: {name} · {n} entities","det.washer":"Washer: {found}","det.dryer":"Dryer: {found}","det.found":"found","det.not_found":"not found","det.on":"on","det.off":"off","det.controls_on":"Controls: on","det.controls_off":"Controls: off. Turn on Settings › Devices & services › haismart › Configure › Enable washer and dryer controls.","det.remote":"Remote control: washer {w}, dryer {d}","det.remote_unknown":"Remote control: unknown while the machine is off","det.full":"Component: full support","det.legacy":"Component: labels only. Update haismart for the most accurate status.","det.fault":"Fault sensor: {found}","det.multi":"More than one laundry centre found. Pick one so the card doesn't switch.","det.hidden":"Hidden or disabled buttons don't appear on the card.","det.remote_both_off":"Buttons stay disabled until remote control is on at the machine.","det.none":"No laundry centre detected yet.","head.drum_running":"{Drum} running"},xa={"drum.washer":"Mesin basuh","drum.washer_lc":"mesin basuh","drum.dryer":"Pengering","drum.dryer_lc":"pengering","card.default_title":"Pusat Dobi","card.sample":"Contoh","status.ready":"Sedia","status.off":"Mati","status.waiting":"Menunggu…","status.stale_support":"Belum ada kemas kini daripada {drum}","status.paused":"Dijeda","status.scheduled":"Dijadualkan","status.done":"Siap","status.running":"Sedang berjalan","status.finishing":"Hampir siap…","eyebrow.phase":"{Drum} · {phase}","eyebrow.estimating":"{Drum} · Menganggar masa…","eyebrow.paused":"{Drum} · Dijeda semasa {phase}","eyebrow.finished":"{Drum} · Siap","eyebrow.scheduled":"{Drum} · Dijadualkan","eyebrow.anticrease":"{Drum} · Anti-kedut","eyebrow.tumbling":"{Drum} · Berpusing","eyebrow.maintenance":"{Drum} · Penyelenggaraan","eyebrow.care":"{Drum} · Penjagaan","support.idle":"{programme} · kira-kira {d}","support.no_programme":"Tiada program dipilih","support.pick_hint":"Pilih program, kemudian tekan Mula","support.in":"dalam {d}","support.about":"kira-kira {d}","support.done_at":"siap {time}","support.est_dryer":"kira-kira {d} · anggaran bertambah tepat apabila pengeringan bermula","support.est_washer":"kira-kira {d} · anggaran dikemas kini selepas menimbang","support.paused":"Baki {d} apabila disambung","support.starts_in":"Mula dalam {d}","support.finishes_about":"Siap dalam kira-kira {d}","support.finished_at":"Siap {time} · sedia dikeluarkan","support.ready_unload":"Sedia dikeluarkan","support.door_locked":"pintu masih berkunci","support.anticrease":"Berpusing untuk elak kedut · baki {n} min · boleh dikeluarkan bila-bila masa","support.anticrease_short":"Berpusing untuk elak kedut · boleh dikeluarkan bila-bila masa","support.tumble_washer":"Berpusing untuk melonggarkan pakaian · boleh dikeluarkan bila-bila masa","support.maintenance":"Kitaran penyelenggaraan sendiri · dalam {d}","support.maintenance_short":"Kitaran penyelenggaraan sendiri","support.care":"Mengekalkan kesegaran pakaian · dalam {d}","support.care_short":"Mengekalkan kesegaran pakaian","phase.working":"Sedang berjalan","time.tomorrow":"esok","dur.h":"j","dur.min":"min","a11y.hours":"jam","a11y.minutes":"minit","a11y.hour":"jam","a11y.minute":"minit","phase.w.0":"Sedia","phase.w.1":"Menimbang","phase.w.2":"Menyemak muatan","phase.w.3":"Mengisi air","phase.w.4":"Memanaskan air","phase.w.5":"Mencuci","phase.w.6":"Menyalirkan air","phase.w.7":"Memerah","phase.w.8":"Mengisi air bilasan","phase.w.9":"Membilas","phase.w.10":"Menyalirkan air","phase.w.11":"Perahan akhir","phase.w.12":"Mengering","phase.w.13":"Menyejukkan","phase.w.14":"Siap","phase.w.15":"Dijadualkan","phase.w.16":"Berpusing","phase.w.17":"Mengering","phase.w.18":"Siap","phase.w.19":"Siap","phase.w.20":"Penjagaan","phase.w.21":"Mengisi air pra-basuh","phase.w.22":"Pra-basuh","phase.w.23":"Memanaskan air pra-basuh","phase.w.24":"Menyalirkan air","phase.w.25":"Pengeringan udara","phase.w.26":"Mengesan muatan","phase.d.0":"Sedia","phase.d.1":"Dijadualkan","phase.d.2":"Mengering dengan udara sejuk","phase.d.3":"Mengering","phase.d.4":"Mengering","phase.d.5":"Menyejukkan","phase.d.6":"Siap","phase.d.7":"Anti-kedut","phase.d.8":"Mengesan muatan","phase.d.9":"Penjagaan","phase.d.10":"Pra-pengeringan","phase.d.11":"Penyelenggaraan","step.wash":"Basuh","step.rinse":"Bilas","step.spin":"Perah","step.dry":"Kering","step.sense":"Kesan","step.cool":"Sejuk","step.care":"Jaga","a11y.progress":"Kemajuan","a11y.step_complete":"selesai","a11y.step_current":"semasa","a11y.step_upcoming":"belum bermula","a11y.sentence":"{Drum}: {parts}","a11y.ready":"sedia","a11y.off":"mati","a11y.waiting":"menunggu kemas kini","a11y.running":"sedang berjalan","a11y.estimating":"sedang berjalan, menganggar masa","a11y.paused":"dijeda","a11y.scheduled":"dijadualkan","a11y.done":"siap","a11y.tumbling":"siap, sedang berpusing","a11y.finishes_around":"siap sekitar {time}","a11y.starts_in":"mula dalam {d}","a11y.in_about":"dalam kira-kira {d}","a11y.left":"baki {d}","a11y.finished_at":"siap {time}","a11y.programme":"program {programme}","a11y.fault":"mesin melaporkan masalah","a11y.drum_done":"{Drum} sudah siap","a11y.child_lock":"Kunci kanak-kanak hidup","a11y.open_device":"Buka halaman peranti","a11y.show_drum":"Papar {drum}","a11y.notice":"Notis","head.attention":"Perlu perhatian","head.off":"Mesin dimatikan · sejak {time}","head.all_ready":"Cucian sudah siap","head.drum_ready":"{Drum} sudah siap","head.drum_ready_other":"{Drum} sudah siap · {other} {time}","head.all_done_by":"Semua siap menjelang {time}","head.drum_done":"{Drum} siap {time}","head.drum_paused":"{Drum} dijeda","head.drum_scheduled":"{Drum} dijadualkan","head.waiting":"Menunggu kemas kini","head.ready":"Sedia","off.title":"Mesin dimatikan","off.since":"sejak {time}","off.explain":"Mesin memutuskan Wi-Fi selepas setiap kitaran. Ia akan muncul di sini apabila dihidupkan.","off.explain_power":"Hidupkan mesin untuk memulakan kitaran.","fault.title":"Mesin melaporkan masalah","fault.more":"+{n} lagi","fault.code":"Kod {code}","fault.no_detail":"Semak paparan mesin untuk butiran","notice.w.3":"Detergen habis","notice.w.4":"Pelembut fabrik habis","notice.w.5":"Arahan pengeringan rak","notice.w.6":"Tutup laci","notice.w.7":"Masukkan detergen serbuk sekarang","notice.w.8":"Dram terlalu panas untuk dibuka","notice.w.9":"Paras air terlalu tinggi untuk dibuka","notice.w.10":"Terlalu banyak buih, sedang dibuang","notice.w.11":"Pembasmi kuman habis","notice.w.12":"Rawatan anion selesai","notice.w.13":"Detergen dan pelembut habis","notice.w.14":"Bersihkan penapis saliran","notice.w.15":"Bersihkan penapis pengering","notice.w.17":"Jalankan pembersihan dram","notice.w.19":"Had kitaran dicapai: bersihkan penapis saliran","notice.w.20":"Peringatan cucian kering","notice.w.21":"Gunakan detergen biasa","notice.w.22":"Gunakan detergen pekat","notice.d.1":"Peringatan seterika","notice.d.3":"Bersihkan penapis","notice.d.4":"Kosongkan bekas air","notice.d.5":"Sedang mensteril","notice.more":"+{n} lagi","notice.less":"Kurangkan","ctl.start":"Mula","ctl.resume":"Sambung","ctl.pause":"Jeda","ctl.cancel":"Batal","ctl.start_prog":"Mulakan {programme}","ctl.cancel_drum":"Batalkan kitaran {drum}","ctl.cancel_scheduled":"Batalkan kitaran berjadual","ctl.stop_tumbling":"Hentikan putaran","ctl.starting":"Memulakan…","ctl.resuming":"Menyambung…","ctl.pausing":"Menjeda…","ctl.cancelling":"Membatalkan…","ctl.stopping":"Menghentikan…","ctl.waiting":"Menunggu pengesahan {drum}…","ctl.ok_started":"{Drum} dimulakan","ctl.ok_resumed":"{Drum} disambung","ctl.ok_paused":"{Drum} dijeda","ctl.ok_cancelled":"Kitaran {drum} dibatalkan","ctl.ok_stopped":"Putaran dihentikan","ctl.unconfirmed":"{Drum} belum mengesahkan perubahan. Semak mesin sebelum mencuba lagi.","ctl.dismiss":"Tutup","ctl.available":"Kawalan {drum} tersedia","gate.busy":"Sibuk: menghantar ke {other}","gate.fault":"Selesaikan masalah sebelum mula","gate.door":"Tutup pintu untuk mula","gate.programme":"Pilih program dahulu","gate.applying":"Menetapkan program…","remote.off":"Kawalan jauh dimatikan di panel {drum}","remote.off_short":"Kawalan jauh mati","remote.door":"Kawalan jauh dimatikan apabila pintu dibuka. Hidupkan semula di panel {drum}.","remote.help_label":"Cara menghidupkan kawalan jauh","remote.help":"Demi keselamatan, mesin hanya menerima arahan daripada Home Assistant selepas kawalan jauh dihidupkan di panelnya. Tekan butang kawalan jauh / Wi-Fi pada {drum}, kemudian cuba lagi.","remote.on":"Kawalan jauh hidup","dlg.cancel_w_title":"Batalkan kitaran mesin basuh?","dlg.cancel_w_body":"{programme} akan berhenti sekarang dan tidak boleh disambung. Mesin basuh kembali ke mod sedia. Air mungkin perlu disalirkan sebelum pintu boleh dibuka.","dlg.cancel_d_title":"Batalkan kitaran pengering?","dlg.cancel_d_body":"{programme} akan berhenti sekarang dan tidak boleh disambung. Pengering kembali ke mod sedia.","dlg.this_cycle":"Kitaran ini","dlg.keep_washing":"Teruskan mencuci","dlg.keep_drying":"Teruskan mengering","dlg.cancel_cycle":"Batalkan kitaran","dlg.sched_title":"Batalkan kitaran berjadual {drum}?","dlg.sched_body":"{Drum} tidak akan bermula. Anda boleh menetapkannya semula di mesin.","dlg.keep_scheduled":"Kekalkan jadual","dlg.tumble_title":"Hentikan putaran anti-kedut?","dlg.tumble_body":"Pakaian sudah kering. Pengering berhenti berpusing dan kembali ke mod sedia.","dlg.keep_tumbling":"Teruskan berpusing","dlg.start_title":"Mulakan {drum}?","dlg.start_confirm":"Mulakan {drum}","dlg.takes_about":"Mengambil masa kira-kira {d}","dlg.door_closed":"Pintu ditutup","dlg.not_now":"Bukan sekarang","dlg.changed":"Keadaan {drum} telah berubah. Tutup dan semak semula.","err.title":"{Drum} tidak menerima arahan itu","err.remote_off":"Kawalan jauh dimatikan di panel {drum}. Hidupkannya, kemudian cuba lagi.","err.no_report":"Tidak dapat bacaan terkini daripada {drum}. Cuba lagi sebentar nanti.","err.controls_off":"Kawalan dimatikan dalam tetapan integrasi haismart.","err.running":"Jeda atau batalkan {drum} sebelum menukar program.","err.no_status":"Home Assistant belum membaca mesin. Tunggu sebentar dan cuba lagi.","err.unreachable":"Tidak dapat menghubungi mesin. Pastikan ia dihidupkan dan cuba lagi.","err.ha_unreachable":"Tidak dapat menghubungi Home Assistant. Semak sambungan anda dan cuba lagi.","err.generic":"Arahan tidak dihantar.","err.details":"Butiran","err.retry":"Cuba lagi","tot.cycle":"Kitaran ini {water} L · {energy}","tot.total":"Jumlah {water} L · {energy} · {n} {washes}","tot.wash_one":"cucian","tot.wash_other":"cucian","setup.none_title":"Tiada pusat dobi Haier ditemui","setup.none_body":"Tambahkannya melalui integrasi haismart, kemudian muat semula.","setup.removed_title":"Pusat dobi yang dipilih telah dibuang","setup.removed_body":"Pilih yang lain dalam tetapan kad.","setup.not_laundry":"{name} bukan mesin basuh atau pengering","setup.not_laundry_body":"Pilih pusat dobi anda dalam tetapan kad.","setup.edit_hint":"Buka tetapan kad untuk membetulkannya.","setup.config_error":"Ralat konfigurasi kad","ed.device":"Pusat dobi","ed.device_helper":"Biarkan kosong untuk dipilih secara automatik: {name}","ed.device_helper_none":"Biarkan kosong untuk dipilih secara automatik","ed.title":"Tajuk","ed.layout":"Susun atur","ed.layout_helper":"Automatik menyesuaikan dengan lebar kad.","ed.layout_auto":"Automatik","ed.layout_full":"Sebelah-menyebelah","ed.layout_stacked":"Bertindan","ed.layout_compact":"Padat","ed.time":"Paparkan masa sebagai","ed.time_both":"Masa siap dan baki masa","ed.time_finish":"Masa siap sahaja","ed.time_remaining":"Baki masa sahaja","ed.drums":"Dram","ed.drums_both":"Kedua-dua","ed.drums_washer":"Mesin basuh sahaja","ed.drums_dryer":"Pengering sahaja","ed.order":"Susunan","ed.order_washer_first":"Mesin basuh dahulu","ed.order_dryer_first":"Pengering dahulu","ed.advanced":"Lanjutan","ed.collapse_idle":"Kecilkan dram yang tidak aktif pada skrin kecil","ed.show_notices":"Papar notis","ed.show_stepper":"Papar langkah fasa","ed.show_totals":"Papar jumlah air dan tenaga","ed.show_controls":"Papar kawalan","ed.show_controls_auto":"Apabila tersedia","ed.show_controls_never":"Jangan sekali-kali","ed.confirm_start":"Tanya sebelum memulakan kitaran","ed.confirm_start_helper":"Pembatalan sentiasa bertanya. Ini tidak boleh dimatikan.","ed.off_style":"Apabila mesin dimatikan","ed.off_style_keep":"Kekalkan susun atur","ed.off_style_collapse":"Satu baris","ed.language":"Bahasa","ed.language_auto":"Ikut Home Assistant","ed.language_en":"English","ed.language_ms":"Bahasa Melayu","ed.tap_action":"Tindakan ketik","ed.detected":"Dikesan","det.device":"Peranti: {name} · {n} entiti","det.washer":"Mesin basuh: {found}","det.dryer":"Pengering: {found}","det.found":"ditemui","det.not_found":"tidak ditemui","det.on":"hidup","det.off":"mati","det.controls_on":"Kawalan: hidup","det.controls_off":"Kawalan: mati. Hidupkan di Tetapan › Peranti & perkhidmatan › haismart › Konfigurasi › Dayakan kawalan mesin basuh dan pengering.","det.remote":"Kawalan jauh: mesin basuh {w}, pengering {d}","det.remote_unknown":"Kawalan jauh: tidak diketahui semasa mesin dimatikan","det.full":"Komponen: sokongan penuh","det.legacy":"Komponen: label sahaja. Kemas kini haismart untuk status paling tepat.","det.fault":"Penderia kerosakan: {found}","det.multi":"Lebih daripada satu pusat dobi ditemui. Pilih satu supaya kad tidak bertukar.","det.hidden":"Butang yang disembunyikan atau dinyahdayakan tidak dipaparkan pada kad.","det.remote_both_off":"Butang kekal dinyahdayakan sehingga kawalan jauh dihidupkan di mesin.","det.none":"Belum ada pusat dobi dikesan.","head.drum_running":"{Drum} sedang berjalan"},Lt={en:Sa,ms:xa};function r(a,e,t){const n=Lt[a][e]??Lt.en[e]??e;return t?n.replace(/\{(\w+)\}/g,(i,s)=>{const o=t[s];return o===void 0?i:String(o)}):n}function rn(a,e){return a==="en"||a==="ms"?a:(e||"").toLowerCase().startsWith("ms")?"ms":"en"}function A(a,e,t){const n=e==="washer"?"dryer":"washer",i={Drum:r(a,`drum.${e}`),drum:r(a,`drum.${e}_lc`)};return i.other=r(a,`drum.${n}_lc`),i}const oe=" ",Da=6e4;function Aa(a,e){const t=a?.locale,n=t?.language||a?.language||"",s=n.split("-")[0].toLowerCase()===e?n:e==="ms"?"ms-MY":"en",o=t?.time_format,c=o==="12"?!0:o==="24"?!1:void 0,d=t?.time_zone==="server"&&a?.config?.time_zone||void 0;return{lang:e,fmtLocale:s,hour12:c,timeZone:d}}const Ut=new Map;function ct(a,e){const t=a+JSON.stringify(e);let n=Ut.get(t);if(!n){try{n=new Intl.DateTimeFormat(a,e)}catch{const i={...e};delete i.timeZone,n=new Intl.DateTimeFormat("en",i)}Ut.set(t,n)}return n}function De(a,e){const t=ct("en-CA",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:e.timeZone}).formatToParts(new Date(a)),n=i=>Number(t.find(s=>s.type===i)?.value);return Math.round(Date.UTC(n("year"),n("month")-1,n("day"))/864e5)}function Oe(a,e,t,n={}){const i=ct(t.fmtLocale,{hour:"numeric",minute:"2-digit",hour12:t.hour12,timeZone:t.timeZone}).format(new Date(a));if(n.relativeDay===!1)return i;const s=De(a,t)-De(e,t);return s===1?`${i} ${r(t.lang,"time.tomorrow")}`:s>=2||s<=-1?`${on(a,t)} ${i}`:i}function on(a,e){return ct(e.fmtLocale,{weekday:"short",timeZone:e.timeZone}).format(new Date(a))}function Ae(a,e,t){const n=Oe(a,e,t,{relativeDay:!1});return De(a,t)===De(e,t)?n:`${on(a,t)} ${n}`}function ln(a,e){const t=Math.max(0,Math.round(a)),n=Math.floor(t/60),i=t%60,s=r(e,"dur.h"),o=r(e,"dur.min");return n===0?`${i}${oe}${o}`:i===0?`${n}${oe}${s}`:`${n}${oe}${s}${oe}${i}${oe}${o}`}function le(a,e){const t=Math.max(0,Math.round(a)),n=Math.floor(t/60),i=t%60,s=c=>`${c} ${r(e,c===1?"a11y.hour":"a11y.hours")}`,o=c=>`${c} ${r(e,c===1?"a11y.minute":"a11y.minutes")}`;return n===0?o(i):i===0?s(n):`${s(n)} ${o(i)}`}function Ve(a,e){return Math.max(0,Math.ceil((a-e)/Da))}const Nt={washer:"mdi:washing-machine",dryer:"mdi:tumble-dryer"};function Wt(a,e){if(e.phase===void 0||!e.phaseKnown)return r(a,"phase.working");const t=`phase.${e.key==="washer"?"w":"d"}.${e.phase}`,n=r(a,t);return n===t?r(a,"phase.working"):n}function Ce(a,e){return e.key?r(a,e.key):e.text||String(e.value)}function Ca(a,e){return e.programme.value?e.programme.label||String(e.programme.value):r(a,"support.no_programme")}function It(a,e,t){const{lang:n,now:i}=t,s=(p,g)=>r(n,p,{...A(n,e.key),...g}),o=r(n,`drum.${e.key}`),c=p=>ln(p,n),d=p=>Oe(p,i,t.time),m=e.finishRaw!==void 0?Ve(e.finishRaw,i):e.remaining,h=[],l={key:e.key,name:o,tint:null,icon:Nt[e.key],iconMuted:!0,pulse:!1,doneAnim:!1,eyebrow:o,hero:"",heroMuted:!1,heroApprox:!1,short:"",aria:"",attention:null};switch(e.status){case"off":l.icon="mdi:power-sleep",l.hero=r(n,"status.off"),l.heroMuted=!0,h.push(r(n,"a11y.off"));break;case"stale":l.icon="mdi:timer-sand-empty",l.hero=r(n,"status.waiting"),l.heroMuted=!0,l.support=s("status.stale_support"),h.push(r(n,"a11y.waiting"));break;case"idle":{l.hero=r(n,"status.ready");const p=Ca(n,e),g=!e.generic&&t.controlsVisible&&e.programme.domain==="select"&&e.remote===!0&&!!e.programme.entity&&!a.machineOff,b=e.idleDuration?c(e.idleDuration):void 0;e.generic?l.support=p:g?(l.programmeChip={label:p,entity:e.programme.entity},l.support=b?s("support.about",{d:b}):void 0):l.support=b&&e.programme.value?s("support.idle",{programme:p,d:b}):p,h.push(r(n,"a11y.ready")),e.programme.value&&h.push(r(n,"a11y.programme",{programme:p}));break}case"delayed":{l.tint="scheduled",l.icon="mdi:clock-start",l.iconMuted=!1,l.eyebrow=s("eyebrow.scheduled"),h.push(r(n,"a11y.scheduled")),e.key==="dryer"&&e.finishAt!==void 0&&e.startsAt!==void 0?(l.hero=d(e.finishAt),l.heroApprox=!0,l.support=s("support.starts_in",{d:c(Ve(e.startsAt,i))}),h.push(r(n,"a11y.starts_in",{d:le(Ve(e.startsAt,i),n)}),r(n,"a11y.finishes_around",{time:d(e.finishAt)}))):(l.hero=r(n,"status.scheduled"),e.remaining&&(l.support=s("support.finishes_about",{d:c(e.remaining)}),h.push(r(n,"a11y.in_about",{d:le(e.remaining,n)}))));break}case"estimating":{l.tint="running",l.icon=e.key==="dryer"?"mdi:radar":"mdi:scale-balance",l.iconMuted=!1,l.pulse=!0,l.eyebrow=s("eyebrow.estimating"),l.heroMuted=!0,h.push(r(n,"a11y.estimating")),e.finishAt!==void 0?(l.hero=d(e.finishAt),l.heroApprox=!0,h.push(r(n,"a11y.finishes_around",{time:d(e.finishAt)}))):l.hero=r(n,"status.running"),m!==void 0&&(l.support=s(e.key==="dryer"?"support.est_dryer":"support.est_washer",{d:c(m)}),h.push(r(n,"a11y.in_about",{d:le(m,n)})));break}case"running":{l.tint=e.sub==="maintenance"?"scheduled":"running",l.iconMuted=!1,l.pulse=!0,l.icon=e.sub==="maintenance"?"mdi:wrench-clock":e.sub==="care"?"mdi:hanger":Nt[e.key];const p=Wt(n,e);l.eyebrow=e.sub==="maintenance"?s("eyebrow.maintenance"):e.sub==="care"?s("eyebrow.care"):s("eyebrow.phase",{phase:p}),h.push(r(n,"a11y.running"),p.toLocaleLowerCase());const g=e.remaining===0||e.finishAt!==void 0&&m===0,b=e.finishAt!==void 0;if(g)l.hero=r(n,"status.finishing");else if(!b)l.hero=r(n,"status.running");else if(t.timeDisplay==="remaining"&&!e.sub)l.hero=c(m??0),l.support=s("support.done_at",{time:d(e.finishAt)});else{l.hero=d(e.finishAt),l.heroApprox=e.approximate;const w=m!==void 0?c(m):void 0;e.sub==="maintenance"?l.support=w?s("support.maintenance",{d:w}):s("support.maintenance_short"):e.sub==="care"?l.support=w?s("support.care",{d:w}):s("support.care_short"):t.timeDisplay!=="finish"&&w&&(l.support=s("support.in",{d:w}))}b&&!g&&(h.push(r(n,"a11y.finishes_around",{time:d(e.finishAt)})),m!==void 0&&h.push(r(n,"a11y.in_about",{d:le(m,n)})));break}case"paused":{l.tint="paused",l.icon="mdi:pause-circle",l.iconMuted=!1,l.eyebrow=s("eyebrow.paused",{phase:Wt(n,e).toLocaleLowerCase()}),l.hero=r(n,"status.paused"),e.remaining!==void 0?(l.support=s("support.paused",{d:c(e.remaining)}),h.push(r(n,"a11y.paused"),r(n,"a11y.left",{d:le(e.remaining,n)}))):h.push(r(n,"a11y.paused")),l.attention="warning";break}case"done":{if(l.tint="done",l.icon="mdi:check-circle",l.iconMuted=!1,l.doneAnim=!0,l.eyebrow=s("eyebrow.finished"),l.hero=r(n,"status.done"),h.push(r(n,"a11y.done")),e.blockingNotice)l.support=Ce(n,e.blockingNotice),l.supportIcon="mdi:alert",h.push(l.support.toLocaleLowerCase());else{let p=e.finishedAt!==void 0?s("support.finished_at",{time:Ae(e.finishedAt,i,t.time)}):r(n,"support.ready_unload");e.doorLocked===!0&&(p+=` · ${r(n,"support.door_locked")}`),l.support=p,e.finishedAt!==void 0&&h.push(r(n,"a11y.finished_at",{time:Ae(e.finishedAt,i,t.time)}))}break}case"tumbling":{l.tint="done",l.icon="mdi:hanger",l.iconMuted=!1,l.hero=r(n,"status.done"),h.push(r(n,"a11y.tumbling")),e.key==="dryer"?(l.eyebrow=s("eyebrow.anticrease"),l.support=e.antiCrease&&e.antiCrease>0?s("support.anticrease",{n:e.antiCrease}):r(n,"support.anticrease_short")):(l.eyebrow=s("eyebrow.tumbling"),l.support=r(n,"support.tumble_washer"));break}}for(const p of e.notices)h.push(Ce(n,p).toLocaleLowerCase());return a.fault.on&&h.push(r(n,"a11y.fault")),a.fault.on?l.attention="error":!l.attention&&e.notices.length&&(l.attention="warning"),l.short=(l.heroApprox?"~":"")+l.hero,l.aria=r(n,"a11y.sentence",{Drum:o,parts:h.filter(Boolean).join(", ")}),l}function jt(a,e){if(a.status==="paused")return r(e.lang,"status.paused").toLocaleLowerCase();if(a.finishAt!==void 0)return(a.approximate?"~":"")+Oe(a.finishAt,e.now,e.time)}function Ht(a,e,t){const{lang:n}=t,i=l=>A(n,l.key);if(a.fault.on)return r(n,"head.attention");if(a.machineOff)return a.offSince!==void 0?r(n,"head.off",{time:Ae(a.offSince,t.now,t.time)}):r(n,"off.title");const s=e.filter(l=>l.isDoneLike),o=e.filter(l=>l.isActive);if(e.length>1&&s.length===e.length)return r(n,"head.all_ready");if(s.length===1&&o.length===1){const l=jt(o[0],t);if(l)return r(n,"head.drum_ready_other",{...i(s[0]),other:r(n,`drum.${o[0].key}`),time:l})}if(s.length>=1)return r(n,"head.drum_ready",i(s[0]));if(o.length===2&&o.every(l=>l.status!=="paused"&&l.finishAt!==void 0)){const l=o[0].finishAt>=o[1].finishAt?o[0]:o[1],p=o.some(g=>g.approximate);return r(n,"head.all_done_by",{time:(p?"~":"")+Oe(l.finishAt,t.now,t.time)})}const c=o.filter(l=>l.status!=="paused"&&l.finishAt!==void 0);if(c.length){const l=c.sort((p,g)=>p.finishAt-g.finishAt)[0];return r(n,"head.drum_done",{...i(l),time:jt(l,t)})}const d=e.find(l=>l.status==="paused");if(d)return r(n,"head.drum_paused",i(d));const m=e.find(l=>l.status==="running"||l.status==="estimating");if(m)return r(n,"head.drum_running",i(m));const h=e.find(l=>l.status==="delayed");return h?r(n,"head.drum_scheduled",i(h)):e.some(l=>l.status==="stale")?r(n,"head.waiting"):r(n,"head.ready")}function Ta(a,e){const t=a.totals,n=a.washer.isActive||a.washer.isDoneLike||(t.cycleWater.value??0)>0||(t.cycleEnergy.value??0)>0,i=c=>c===void 0?"–":new Intl.NumberFormat(e==="ms"?"ms-MY":"en",{maximumFractionDigits:2}).format(c),s=c=>c.unit?`${i(c.value)} ${c.unit}`:i(c.value);if(n)return t.cycleWater.value===void 0&&t.cycleEnergy.value===void 0?null:{text:r(e,"tot.cycle",{water:i(t.cycleWater.value),energy:s(t.cycleEnergy)}),water:{icon:"mdi:water",text:`${i(t.cycleWater.value)} L`,entity:t.cycleWater.entity},energy:{icon:"mdi:lightning-bolt",text:s(t.cycleEnergy),entity:t.cycleEnergy.entity}};if(t.water.value===void 0&&t.energy.value===void 0&&t.cycles.value===void 0)return null;const o=t.cycles.value??0;return{text:r(e,"tot.total",{water:i(t.water.value),energy:s(t.energy),n:i(t.cycles.value),washes:r(e,o===1?"tot.wash_one":"tot.wash_other")}),water:{icon:"mdi:water",text:`${i(t.water.value)} L`,entity:t.water.entity},energy:{icon:"mdi:lightning-bolt",text:s(t.energy),entity:t.energy.entity}}}function Ma(a){return a.time_display==="finish"||a.time_display==="remaining"?a.time_display:"both"}const Ea=Vt`
  :host {
    --hlc-running: var(--primary-color, #03a9f4);
    --hlc-paused: var(--warning-color, #ffa600);
    --hlc-done: var(--success-color, #43a047);
    --hlc-fault: var(--error-color, #db4437);
    --hlc-scheduled: var(--info-color, #039be5);
    --hlc-text: var(--primary-text-color, #212121);
    --hlc-muted: var(--secondary-text-color, #727272);
    --hlc-disabled: var(--disabled-text-color, #bdbdbd);
    --hlc-divider: var(--divider-color, rgba(0, 0, 0, 0.12));
    --hlc-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --hlc-radius: var(--ha-card-border-radius, 12px);
    --hlc-on-primary: var(--text-primary-color, #fff);
    --hlc-font: var(--ha-font-family-body, Roboto, system-ui, sans-serif);
    display: block;
  }

  ha-card {
    container-type: inline-size;
    container-name: hlc;
    font-family: var(--hlc-font);
    color: var(--hlc-text);
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
  }
  ha-card.loading {
    min-height: 160px;
  }
  * {
    box-sizing: border-box;
  }
  ha-icon {
    --mdc-icon-size: 24px;
    flex: none;
  }
  .sr-only {
    position: absolute !important;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
  .ellipsis {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* ---------------------------------------------------------------- tints */
  .t-running { --hlc-state: var(--hlc-running); }
  .t-paused { --hlc-state: var(--hlc-paused); }
  .t-done { --hlc-state: var(--hlc-done); }
  .t-scheduled { --hlc-state: var(--hlc-scheduled); }
  .t-fault { --hlc-state: var(--hlc-fault); }
  .t-muted { --hlc-state: var(--hlc-muted); }

  /* ---------------------------------------------------------------- header */
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 48px;
    margin: -8px 0 4px;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    min-width: 0;
    flex: 0 1 auto;
    color: var(--hlc-text);
    background: none;
    border: 0;
    padding: 0;
    font-family: inherit;
    min-height: 44px;
    border-radius: 8px;
  }
  button.title {
    cursor: pointer;
  }
  .title ha-icon {
    color: var(--hlc-muted);
  }
  .headline {
    margin-left: auto;
    font-size: 14px;
    color: var(--hlc-muted);
    text-align: right;
    flex: 1 1 auto;
  }
  .status-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-muted);
  }
  .sample-chip {
    font-size: 12px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--hlc-scheduled) 14%, transparent);
    color: var(--hlc-text);
    flex: none;
  }

  /* ---------------------------------------------------------------- drums */
  .drums {
    display: grid;
    gap: 12px;
  }
  .layout-full .drums.two {
    grid-template-columns: 1fr 1fr;
  }
  .layout-stacked .drums {
    gap: 0;
  }
  .layout-stacked .drums > * + * {
    border-top: 1px solid var(--hlc-divider);
  }

  .tile {
    container-type: inline-size;
    container-name: tile;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: calc(var(--hlc-radius) - 4px);
    border: 1px solid var(--hlc-divider);
    min-width: 0;
    background: transparent;
  }
  .tile.tinted {
    border-color: transparent;
    background: color-mix(in srgb, var(--hlc-state) 8%, transparent);
  }
  .layout-stacked .tile {
    border: 0;
    border-radius: 0;
    padding: 16px 0;
    background: transparent;
  }
  .layout-stacked .tile.tinted {
    border-radius: calc(var(--hlc-radius) - 4px);
    padding: 16px;
    margin: 8px 0;
    border-top: 0 !important;
    background: color-mix(in srgb, var(--hlc-state) 8%, transparent);
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    cursor: pointer;
    border-radius: 8px;
    min-height: 44px;
  }
  .label-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--hlc-text);
    min-height: 24px;
  }
  .drum-icon {
    color: var(--hlc-state, var(--hlc-muted));
  }
  .drum-icon.muted {
    color: var(--hlc-muted);
  }
  .eyebrow {
    flex: 0 1 auto;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--hlc-state, var(--hlc-muted));
    flex: none;
  }
  .label-icons {
    margin-left: auto;
    display: flex;
    gap: 4px;
    align-items: center;
    flex: none;
  }
  .label-icons ha-icon {
    --mdc-icon-size: 16px;
    color: var(--hlc-muted);
  }
  .hero {
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--hlc-text);
  }
  @supports (font-size: 1cqi) {
    .hero {
      font-size: clamp(28px, 9cqi, 44px);
    }
  }
  .hero.muted {
    color: var(--hlc-muted);
  }
  .support {
    font-size: 14px;
    font-weight: 400;
    color: var(--hlc-muted);
    display: flex;
    gap: 6px;
    align-items: center;
    min-width: 0;
  }
  .support.blocking {
    color: var(--hlc-text);
  }
  .support.blocking ha-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-paused);
  }

  /* ---------------------------------------------------------------- stepper */
  .stepper {
    list-style: none;
    display: flex;
    align-items: flex-start;
    margin: 0;
    padding: 0;
    gap: 0;
  }
  .step {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    flex: 1 1 0;
    min-width: 0;
    position: relative;
    font-size: 12px;
    font-weight: 500;
    color: var(--hlc-muted);
  }
  .step:last-child {
    flex: 0 0 auto;
  }
  .step .mark {
    display: flex;
    align-items: center;
    width: 100%;
    height: 10px;
  }
  .step .pt {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
    box-sizing: content-box;
    border: 2px solid var(--hlc-divider);
    margin: -2px;
  }
  .step .ln {
    flex: 1;
    height: 2px;
    margin: 0 6px;
    background: var(--hlc-divider);
  }
  .step.complete .pt {
    background: var(--hlc-state);
    border-color: var(--hlc-state);
  }
  .step.complete .ln {
    background: var(--hlc-state);
  }
  .step.current .pt {
    border-color: var(--hlc-state);
    background: color-mix(in srgb, var(--hlc-state) 30%, transparent);
  }
  .step.current .lbl {
    color: var(--hlc-text);
  }
  @container tile (max-width: 299px) {
    .step .lbl {
      display: none;
    }
  }

  /* ---------------------------------------------------------------- chips */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: -8px 0;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 4px 10px;
    margin: 8px 0;
    border-radius: 999px;
    border: 0;
    font: 500 12px/1.2 var(--hlc-font);
    color: var(--hlc-text);
    background: color-mix(in srgb, var(--hlc-state, var(--hlc-muted)) 14%, transparent);
    cursor: pointer;
    max-width: 100%;
    position: relative;
  }
  .chip::after {
    /* 44px hit area */
    content: "";
    position: absolute;
    inset: -8px -2px;
  }
  .chip ha-icon {
    --mdc-icon-size: 16px;
    color: var(--hlc-state, var(--hlc-muted));
  }
  .chip span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prog-chip {
    --hlc-state: var(--hlc-running);
    font-size: 14px;
    min-height: 32px;
  }
  .prog-chip ha-icon {
    color: var(--hlc-muted);
  }
  .hint {
    font-size: 12px;
    color: var(--hlc-muted);
    margin-top: -6px;
  }
  .prog-line {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    margin: -8px 0;
  }

  /* ---------------------------------------------------------------- controls */
  .controls {
    border-top: 1px solid var(--hlc-divider);
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
  }
  .btn-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 44px;
    min-width: 44px;
    padding: 0 16px;
    border-radius: 20px;
    border: 0;
    font: 500 14px/1 var(--hlc-font);
    cursor: pointer;
    white-space: nowrap;
    background: transparent;
    color: var(--hlc-text);
  }
  .btn ha-icon {
    --mdc-icon-size: 18px;
  }
  .btn.filled {
    background: var(--hlc-running);
    color: var(--hlc-on-primary);
  }
  .btn.tonal {
    background: color-mix(in srgb, var(--hlc-running) 12%, transparent);
    color: var(--hlc-text);
  }
  .btn.destructive {
    color: var(--hlc-fault);
    font-weight: 600;
  }
  .btn.warn {
    color: var(--hlc-text);
    font-weight: 600;
  }
  .btn.warn ha-icon {
    color: var(--hlc-paused);
  }
  .btn.icon-only {
    padding: 0;
    width: 44px;
    border-radius: 50%;
  }
  .btn[aria-disabled="true"] {
    opacity: 0.38;
    cursor: default;
  }
  @container tile (max-width: 319px) {
    .btn.secondary .lbl {
      display: none;
    }
    .btn.secondary {
      padding: 0;
      width: 44px;
      border-radius: 50%;
    }
  }
  .reason,
  .status-line,
  .remote-line {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: var(--hlc-muted);
    min-width: 0;
  }
  .reason ha-icon,
  .status-line ha-icon,
  .remote-line ha-icon {
    --mdc-icon-size: 16px;
  }
  .remote-line .full {
    flex: 1 1 auto;
  }
  .remote-line .short {
    display: none;
  }
  @container tile (max-width: 279px) {
    .remote-line .full {
      display: none;
    }
    .remote-line .short {
      display: inline;
      flex: 1 1 auto;
    }
  }
  .info-btn {
    min-width: 44px;
    min-height: 44px;
    margin: -12px -8px -12px 0;
    border: 0;
    background: none;
    color: var(--hlc-muted);
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
  .remote-help {
    font-size: 12px;
    color: var(--hlc-text);
    line-height: 1.4;
    margin: 0;
  }
  .status-line.ok ha-icon {
    color: var(--hlc-done);
  }
  .status-line.warn {
    color: var(--hlc-text);
    align-items: flex-start;
  }
  .status-line.warn ha-icon {
    color: var(--hlc-paused);
  }
  .status-line .grow {
    flex: 1;
    min-width: 0;
  }
  .link-btn {
    border: 0;
    background: none;
    color: var(--hlc-text);
    font: 500 12px var(--hlc-font);
    text-decoration: underline;
    min-height: 44px;
    margin: -14px 0;
    padding: 0 8px;
    cursor: pointer;
    flex: none;
  }
  .spinner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-right-color: transparent;
    flex: none;
  }
  .dots {
    display: none;
    letter-spacing: 1px;
  }

  /* ---------------------------------------------------------------- strips & banners */
  .strip,
  .banner,
  .alert {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 12px;
    border-radius: 8px;
    border-left: 3px solid var(--hlc-state);
    background: color-mix(in srgb, var(--hlc-state) 14%, transparent);
    color: var(--hlc-text);
    font-size: 14px;
  }
  .strip ha-icon,
  .banner ha-icon,
  .alert ha-icon {
    color: var(--hlc-state);
  }
  .strip .body,
  .banner .body,
  .alert .body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    flex: 1;
  }
  .strip .title-line,
  .banner .title-line,
  .alert .title-line {
    font-weight: 500;
  }
  .strip .actions {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 4px;
  }
  .strip .raw {
    font-size: 12px;
    color: var(--hlc-muted);
    word-break: break-word;
  }
  .sub {
    font-size: 12px;
    color: var(--hlc-muted);
  }
  .banner-wrap {
    display: flex;
    gap: 4px;
    align-items: stretch;
    margin-bottom: 12px;
  }
  .banner {
    flex: 1;
    cursor: pointer;
    min-width: 0;
  }
  .banner ul {
    margin: 4px 0 0;
    padding-left: 18px;
  }
  .disclose {
    border: 0;
    background: color-mix(in srgb, var(--hlc-fault) 14%, transparent);
    color: var(--hlc-text);
    border-radius: 8px;
    min-width: 44px;
    min-height: 44px;
    font: 500 12px var(--hlc-font);
    cursor: pointer;
    padding: 0 10px;
  }
  .alert {
    --hlc-state: var(--hlc-paused);
  }

  /* ---------------------------------------------------------------- off view */
  .off-block {
    display: flex;
    align-items: center;
    gap: 16px;
    min-height: 120px;
    padding: 8px 0;
  }
  .off-block.collapse {
    min-height: 72px;
    padding: 0;
  }
  .off-block ha-icon {
    --mdc-icon-size: 32px;
    color: var(--hlc-muted);
  }
  .off-block .body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .off-title {
    font-size: 18px;
    font-weight: 500;
  }
  .off-sub,
  .off-explain {
    font-size: 14px;
    color: var(--hlc-muted);
  }
  .off-explain.spanning {
    margin-top: 12px;
  }

  /* ---------------------------------------------------------------- footer */
  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    margin-top: 12px;
    font-size: 12px;
    color: var(--hlc-muted);
  }
  .footer button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    padding: 0;
    min-height: 44px;
    margin: -12px 0;
    cursor: pointer;
  }
  .footer ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ---------------------------------------------------------------- compact & collapsed */
  .compact-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .crow {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    height: 44px;
    border-radius: 8px;
    cursor: pointer;
    min-width: 0;
  }
  .crow .chero {
    font-size: 24px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    flex: 1;
  }
  .adot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
  }
  .adot.error {
    background: var(--hlc-fault);
  }
  .adot.warning {
    background: var(--hlc-paused);
  }
  .collapsed {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 56px;
    min-width: 0;
  }
  .collapsed .summary {
    flex-direction: row;
    align-items: center;
    flex: 1;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    min-height: 44px;
  }
  .collapsed .summary .drum-icon {
    color: var(--hlc-muted);
  }

  /* ---------------------------------------------------------------- dialog */
  dialog {
    border: 0;
    padding: 24px;
    border-radius: 16px;
    width: 360px;
    max-width: calc(100vw - 32px);
    background: var(--hlc-surface);
    color: var(--hlc-text);
    font-family: var(--hlc-font);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
  dialog h2 {
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 500;
  }
  dialog p {
    margin: 0 0 12px;
    font-size: 14px;
    line-height: 1.45;
    color: var(--hlc-muted);
  }
  dialog .rows {
    list-style: none;
    margin: 0 0 12px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
  }
  dialog .rows li {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  dialog .rows ha-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-done);
  }
  dialog .changed {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 14px;
    color: var(--hlc-text);
    margin-bottom: 12px;
  }
  dialog .changed ha-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-paused);
  }
  dialog .dlg-actions {
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
    justify-content: flex-start;
    margin-top: 8px;
  }
  @media (max-width: 599px) {
    dialog {
      width: 100vw;
      max-width: 100vw;
      margin: auto 0 0;
      border-radius: 16px 16px 0 0;
      padding: 24px 16px calc(16px + env(safe-area-inset-bottom, 0px));
    }
    dialog .dlg-actions {
      flex-direction: column;
    }
    dialog .dlg-actions .btn {
      width: 100%;
    }
  }

  /* ---------------------------------------------------------------- fallbacks */
  @supports not (background: color-mix(in srgb, red 10%, transparent)) {
    .tile.tinted,
    .layout-stacked .tile.tinted,
    .chip,
    .strip,
    .banner,
    .alert,
    .btn.tonal,
    .disclose,
    .sample-chip {
      background: transparent;
      border: 1px solid var(--hlc-state, var(--hlc-running));
    }
    .step.current .pt {
      background: transparent;
    }
  }

  /* ---------------------------------------------------------------- motion (§13) */
  @media (prefers-reduced-motion: no-preference) {
    .pulse {
      animation: hlc-pulse 2.4s ease-in-out infinite;
    }
    .tilde {
      display: inline-block;
      animation: hlc-pulse 2.4s ease-in-out infinite;
    }
    .hero {
      animation: hlc-fade 180ms ease-out;
    }
    .done-anim {
      animation: hlc-scale 300ms ease-out 1;
    }
    .spinner {
      animation: hlc-spin 0.8s linear infinite;
    }
    dialog[open] {
      animation: hlc-dialog 180ms ease-out;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition-duration: 0ms !important;
    }
    .spinner {
      display: none;
    }
    .dots {
      display: inline;
    }
  }
  @keyframes hlc-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.45;
    }
  }
  @keyframes hlc-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes hlc-scale {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }
  @keyframes hlc-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes hlc-dialog {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
`,Pa={blocking:"t-paused",supply:"t-paused",maintenance:"t-scheduled",info:"t-muted",unknown:"t-muted"};function Le(a){return e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),a())}}function Ra(a,e){return!e||!e.length?f:u`<ol class="stepper" aria-label=${r(a,"a11y.progress")}>
    ${e.map((t,n)=>u`<li class="step ${t.state}">
        <span class="mark" aria-hidden="true"
          ><span class="pt"></span>${n<e.length-1?u`<span class="ln"></span>`:f}</span
        >
        <span class="lbl">${r(a,`step.${t.key}`)}</span>
        <span class="sr-only">${r(a,`a11y.step_${t.state}`)}</span>
      </li>`)}
  </ol>`}function Oa(a,e){if(!a.config.show_notices||!e.notices.length)return f;const t=a.ui.noticesOpen.has(e.key),n=t?e.notices:e.notices.slice(0,2),i=e.notices.length-2;return u`<div class="chips" id="notices-${e.key}">
    ${n.map(s=>u`<button
        class="chip ${Pa[s.category]}"
        type="button"
        title=${Ce(a.lang,s)}
        @click=${()=>a.on.moreInfo(s.entity)}
      >
        <ha-icon .icon=${s.icon} aria-hidden="true"></ha-icon><span>${Ce(a.lang,s)}</span>
      </button>`)}
    ${i>0?u`<button
          class="chip t-muted"
          type="button"
          aria-expanded=${t?"true":"false"}
          aria-controls="notices-${e.key}"
          @click=${()=>a.on.toggle("noticesOpen",e.key)}
        >
          <span>${t?r(a.lang,"notice.less"):r(a.lang,"notice.more",{n:i})}</span>
        </button>`:f}
  </div>`}function La(a,e){const t=a.model.fault;if(!t.on||a.model.machineOff)return f;const{lang:n}=a,i=t.faults[0],s=t.faults.slice(1);return u`<div class="banner-wrap">
    <div
      class="banner t-fault"
      role="button"
      tabindex="0"
      @click=${()=>a.on.moreInfo(t.entity)}
      @keydown=${Le(()=>a.on.moreInfo(t.entity))}
    >
      <ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon>
      <div class="body" role=${e?"alert":f}>
        <span class="title-line">${r(n,"fault.title")}</span>
        <span>${i??r(n,"fault.no_detail")}</span>
        ${a.ui.faultMore&&s.length?u`<ul id="fault-more">
              ${s.map(o=>u`<li>${o}</li>`)}
            </ul>`:f}
        ${t.codes?u`<span class="sub">${r(n,"fault.code",{code:t.codes})}</span>`:f}
      </div>
    </div>
    ${s.length?u`<button
          class="disclose"
          type="button"
          aria-expanded=${a.ui.faultMore?"true":"false"}
          aria-controls="fault-more"
          @click=${()=>a.on.toggleFaultMore()}
        >
          ${r(n,"fault.more",{n:s.length})}
        </button>`:f}
  </div>`}function Ua(a,e,t,n){return u`<div class="alert" role="status">
    <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="title-line">${e}</span>
      <span>${t}</span>
      ${n?u`<span class="sub">${r(a,"setup.edit_hint")}</span>`:f}
    </div>
  </div>`}function Na(a,e){const{lang:t,model:n}=a,i=n.offSince!==void 0?r(t,"off.since",{time:Ae(n.offSince,a.now,a.viewCtx.time)}):"",s=n.offReason==="power"?r(t,"off.explain_power"):r(t,"off.explain");return u`<div class="off-block ${e==="collapse"?"collapse":""}" role="status">
    <ha-icon icon="mdi:power-sleep" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="off-title">${r(t,"off.title")}</span>
      ${i?u`<span class="off-sub">${i}</span>`:f}
      ${e==="stacked"?u`<span class="off-explain">${s}</span>`:f}
    </div>
  </div>`}function Wa(a,e){const t=a.controller.get(e);if(!t||t.phase!=="error"||!t.error)return f;const{lang:n}=a,i=A(n,e),s=a.ui.detailsOpen.has(e);return u`<div class="strip t-fault" role="alert">
    <ha-icon icon="mdi:alert-octagon" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="title-line">${r(n,"err.title",i)}</span>
      <span>${r(n,t.error.key,i)}</span>
      ${s&&t.error.detail?u`<span class="raw" id="err-raw-${e}">${t.error.detail}</span>`:f}
      <div class="actions">
        <button class="btn tonal" type="button" @click=${o=>a.on.retry(e,o.currentTarget)}>
          ${r(n,"err.retry")}
        </button>
        ${t.error.detail?u`<button
              class="link-btn"
              type="button"
              aria-expanded=${s?"true":"false"}
              aria-controls="err-raw-${e}"
              @click=${()=>a.on.toggle("detailsOpen",e)}
            >
              ${r(n,"err.details")}
            </button>`:f}
      </div>
    </div>
    <button
      class="btn icon-only"
      type="button"
      aria-label=${r(n,"ctl.dismiss")}
      title=${r(n,"ctl.dismiss")}
      @click=${()=>a.on.dismiss(e)}
    >
      <ha-icon icon="mdi:close" aria-hidden="true"></ha-icon>
    </button>
  </div>`}const Ia=a=>(...e)=>({_$litDirective$:a,values:e});let ja=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const Ha={},Ba=(a,e=Ha)=>a._$AH=e;const za=Ia(class extends ja{constructor(){super(...arguments),this.key=f}render(a,e){return this.key=a,e}update(a,[e,t]){return e!==this.key&&(Ba(a),this.key=e),t}});const qe=a=>a??f,Fa={start:"mdi:play",resume:"mdi:play",pause:"mdi:pause",cancel:"mdi:stop",cancel_scheduled:"mdi:stop",stop:"mdi:stop"},Ka={start:"ctl.start",resume:"ctl.resume",pause:"ctl.pause",cancel:"ctl.cancel",cancel_scheduled:"ctl.cancel_scheduled",stop:"ctl.stop_tumbling"},cn={start:"ctl.starting",resume:"ctl.resuming",pause:"ctl.pausing",cancel:"ctl.cancelling",cancel_scheduled:"ctl.cancelling",stop:"ctl.stopping"},Va={start:"ctl.ok_started",resume:"ctl.ok_resumed",pause:"ctl.ok_paused",cancel:"ctl.ok_cancelled",cancel_scheduled:"ctl.ok_cancelled",stop:"ctl.ok_stopped"},dn={fault:"gate.fault",door:"gate.door",programme:"gate.programme",applying:"gate.applying"},un=(a,e,t)=>r(a.lang,Va[t],A(a.lang,e));function dt(a,e){if(a.config.show_controls==="never"||a.layout==="compact"||a.model.machineOff)return{};const t=fa(e);return{primary:t.primary&&et(e,t.primary)?t.primary:void 0,secondary:t.secondary&&et(e,t.secondary)?t.secondary:void 0}}function ut(a,e,t){return a.sample?"remote":sn(a.model,e,t,{now:a.now,sending:a.controller.sending,pending:a.controller.pending})}function Bt(a,e,t,n){const{lang:i}=a,s=A(i,e.key),o=a.controller.get(e.key),c=o?.phase==="sending"&&o.cmd===t,d=ut(a,e,t),m=d!==null||c,h=d==="remote"?`remote-${e.key}`:d==="pending"?`status-${e.key}`:d&&dn[d]?`reason-${e.key}`:void 0,l=d==="busy"?r(i,"gate.busy",s):void 0,p=r(i,Ka[t]);let g;return t==="start"&&e.programme.value&&e.programme.label?g=r(i,"ctl.start_prog",{programme:e.programme.label}):t==="cancel"&&(g=r(i,"ctl.cancel_drum",s)),u`<button
    class="btn ${t==="start"||t==="resume"?"filled":t==="pause"?"tonal":t==="stop"?"warn":"destructive"} ${n}"
    type="button"
    data-role=${n}
    data-drum=${e.key}
    data-cmd=${t}
    aria-disabled=${m?"true":"false"}
    aria-busy=${c?"true":"false"}
    aria-describedby=${qe(h)}
    aria-label=${qe(c?void 0:g)}
    title=${qe(l??g)}
    @click=${w=>m?a.on.disabledPress():a.on.command(e,t,w.currentTarget)}
  >
    ${c?u`<span class="spinner" aria-hidden="true"></span
          ><span class="lbl">${r(i,cn[t])}<span class="dots" aria-hidden="true">···</span></span>`:u`<ha-icon .icon=${Fa[t]} aria-hidden="true"></ha-icon><span class="lbl">${p}</span>`}
  </button>`}function qa(a,e){const{primary:t,secondary:n}=dt(a,e);if(!t&&!n)return f;const{lang:i}=a,s=A(i,e.key),o=a.controller.get(e.key),c=a.sample||e.remote!==!0,d=t?ut(a,e,t):null,m=d&&dn[d],h=a.ui.remoteHelp.has(e.key),l=e.key==="washer"&&e.message===18?r(i,"remote.door",s):r(i,"remote.off",s);let p=f;return o?.phase==="waiting"?p=u`<div class="status-line" id="status-${e.key}">
      <ha-icon icon="mdi:timer-sand" aria-hidden="true"></ha-icon><span>${r(i,"ctl.waiting",s)}</span>
    </div>`:o?.phase==="sending"?p=u`<div class="status-line sr-only" id="status-${e.key}">${r(i,cn[o.cmd])}</div>`:o?.phase==="confirmed"?p=u`<div class="status-line ok" id="status-${e.key}">
      <ha-icon icon="mdi:check" aria-hidden="true"></ha-icon><span>${un(a,e.key,o.cmd)}</span>
    </div>`:o?.phase==="unconfirmed"&&(p=u`<div class="status-line warn" id="status-${e.key}">
      <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
      <span class="grow">${r(i,"ctl.unconfirmed",s)}</span>
      <button class="link-btn" type="button" @click=${()=>a.on.dismiss(e.key)}>${r(i,"ctl.dismiss")}</button>
    </div>`),u`${Wa(a,e.key)}
    <div class="controls">
      <div class="btn-row">
        ${t?Bt(a,e,t,"primary"):f}
        ${n?Bt(a,e,n,"secondary"):f}
      </div>
      ${c?u`<div class="remote-line">
              <ha-icon icon="mdi:remote-off" aria-hidden="true"></ha-icon>
              <span class="full" id="remote-${e.key}">${l}</span>
              <span class="short" aria-hidden="true">${r(i,"remote.off_short")}</span>
              <button
                class="info-btn"
                type="button"
                aria-label=${r(i,"remote.help_label")}
                title=${r(i,"remote.help_label")}
                aria-expanded=${h?"true":"false"}
                aria-controls="remote-help-${e.key}"
                @click=${()=>a.on.toggle("remoteHelp",e.key)}
              >
                <ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon>
              </button>
            </div>
            ${h?u`<p class="remote-help" id="remote-help-${e.key}">${r(i,"remote.help",s)}</p>`:f}`:m?u`<div class="reason" id="reason-${e.key}">
              <ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon><span>${r(i,m)}</span>
            </div>`:f}
      ${p}
    </div>`}function Ya(a,e,t){const n=t.eyebrow.startsWith(t.name)?t.eyebrow.slice(t.name.length):t.eyebrow===t.name?"":` · ${t.eyebrow}`,i=a.model.controlsExist&&a.config.show_controls!=="never"&&e.remote===!0&&!a.model.machineOff;return u`<div class="label-row">
    <ha-icon
      class="drum-icon ${t.iconMuted?"muted":""} ${t.doneAnim?"done-anim":""}"
      .icon=${t.icon}
      aria-hidden="true"
    ></ha-icon>
    ${t.pulse?u`<span class="dot pulse" aria-hidden="true"></span>`:f}
    <span class="eyebrow ellipsis"><span id="name-${e.key}">${t.name}</span>${n}</span>
    <span class="label-icons">
      ${i?u`<ha-icon icon="mdi:remote" title=${r(a.lang,"remote.on")} aria-label=${r(a.lang,"remote.on")}></ha-icon>`:f}
    </span>
  </div>`}function Ye(a,e){const t=a.views[e.key],n=t.tint!==null,i=t.tint?`t-${t.tint}`:"",s=!!t.programmeChip&&e.status==="idle";return u`<section class="tile ${i} ${n?"tinted":""}" role="group" aria-labelledby="name-${e.key}">
    <div
      class="summary"
      role="button"
      tabindex="0"
      aria-label=${t.aria}
      @click=${()=>a.on.tap(e)}
      @keydown=${Le(()=>a.on.tap(e))}
    >
      ${Ya(a,e,t)}
      ${za(t.hero,u`<div class="hero ${t.heroMuted?"muted":""}" aria-hidden="true">
          ${t.heroApprox?u`<span class="tilde">~</span>`:f}${t.hero}
        </div>`)}
      ${t.support?u`<div class="support ${t.supportIcon?"blocking":""}" aria-hidden="true">
            ${t.supportIcon?u`<ha-icon .icon=${t.supportIcon}></ha-icon>`:f}
            <span class="ellipsis" title=${t.support}>${t.support}</span>
          </div>`:f}
    </div>
    ${t.programmeChip?u`<div class="prog-line">
          <button
            class="chip prog-chip"
            type="button"
            title=${t.programmeChip.label}
            @click=${()=>a.on.moreInfo(t.programmeChip.entity)}
          >
            <span>${t.programmeChip.label}</span><ha-icon icon="mdi:chevron-down" aria-hidden="true"></ha-icon>
          </button>
          ${s?u`<span class="hint">${r(a.lang,"support.pick_hint")}</span>`:f}
        </div>`:f}
    ${a.config.show_stepper?Ra(a.lang,e.steps):f}
    ${Oa(a,e)}
    ${qa(a,e)}
  </section>`}function zt(a,e,t,n,i,s){return u`<div
    class="crow"
    role="button"
    tabindex="0"
    aria-label=${n}
    @click=${()=>e&&a.on.tap(e)}
    @keydown=${Le(()=>e&&a.on.tap(e))}
  >
    <ha-icon .icon=${i} class="drum-icon muted" aria-hidden="true"></ha-icon>
    <span class="chero ellipsis" aria-hidden="true">${t}</span>
    ${s?u`<span class="adot ${s}" aria-hidden="true"></span>`:f}
  </div>`}function Ga(a,e){const t=a.views[e.key],{primary:n}=dt(a,e),i=n==="start"&&ut(a,e,"start")===null;return u`<div class="collapsed" role="group" aria-labelledby="name-${e.key}">
    <div
      class="summary"
      role="button"
      tabindex="0"
      aria-label=${t.aria}
      @click=${()=>a.on.tap(e)}
      @keydown=${Le(()=>a.on.tap(e))}
    >
      <ha-icon class="drum-icon" .icon=${t.icon} aria-hidden="true"></ha-icon>
      <span class="ellipsis" aria-hidden="true"><span id="name-${e.key}">${t.name}</span> · ${t.short}</span>
      ${t.attention?u`<span class="adot ${t.attention}" aria-hidden="true"></span>`:f}
    </div>
    ${i?u`<button
          class="btn tonal icon-only"
          type="button"
          data-role="primary"
          data-drum=${e.key}
          data-cmd="start"
          aria-label=${e.programme.label?r(a.lang,"ctl.start_prog",{programme:e.programme.label}):r(a.lang,"ctl.start")}
          title=${r(a.lang,"ctl.start")}
          @click=${s=>a.on.command(e,"start",s.currentTarget)}
        >
          <ha-icon icon="mdi:play" aria-hidden="true"></ha-icon>
        </button>`:f}
    <button
      class="btn icon-only"
      type="button"
      aria-expanded="false"
      aria-label=${r(a.lang,"a11y.show_drum",A(a.lang,e.key))}
      @click=${()=>a.on.toggle("expanded",e.key)}
    >
      <ha-icon icon="mdi:chevron-down" aria-hidden="true"></ha-icon>
    </button>
  </div>`}function Za(a,e,t){const n=A(a,e.key),i=e.programme.value&&e.programme.label?e.programme.label:r(a,"dlg.this_cycle");switch(t){case"cancel":return e.key==="washer"?{title:r(a,"dlg.cancel_w_title"),body:r(a,"dlg.cancel_w_body",{programme:i}),safe:r(a,"dlg.keep_washing"),confirm:r(a,"dlg.cancel_cycle"),confirmStyle:"destructive"}:{title:r(a,"dlg.cancel_d_title"),body:r(a,"dlg.cancel_d_body",{programme:i}),safe:r(a,"dlg.keep_drying"),confirm:r(a,"dlg.cancel_cycle"),confirmStyle:"destructive"};case"cancel_scheduled":return{title:r(a,"dlg.sched_title",n),body:r(a,"dlg.sched_body",n),safe:r(a,"dlg.keep_scheduled"),confirm:r(a,"dlg.cancel_cycle"),confirmStyle:"destructive"};case"stop":return{title:r(a,"dlg.tumble_title"),body:r(a,"dlg.tumble_body"),safe:r(a,"dlg.keep_tumbling"),confirm:r(a,"ctl.stop_tumbling"),confirmStyle:"warn"};default:{const s=[{text:i}];return e.idleDuration&&s.push({text:r(a,"dlg.takes_about",{d:ln(e.idleDuration,a)})}),e.doorOpen===!1&&s.push({icon:"mdi:check",text:r(a,"dlg.door_closed")}),{title:r(a,"dlg.start_title",n),rows:s,safe:r(a,"dlg.not_now"),confirm:r(a,"dlg.start_confirm",n),confirmStyle:"filled"}}}}function Ja(a,e,t,n,i,s){const o=Za(a,e,t.cmd),c=A(a,e.key);return u`<h2 id="dlg-title">${o.title}</h2>
    ${o.body?u`<p id="dlg-body">${o.body}</p>`:f}
    ${o.rows?u`<ul class="rows" id="dlg-body">
          ${o.rows.map(d=>u`<li>${d.icon?u`<ha-icon .icon=${d.icon} aria-hidden="true"></ha-icon>`:f}${d.text}</li>`)}
        </ul>`:f}
    ${n?u`<div class="changed" role="status" id="dlg-changed">
          <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon><span>${r(a,"dlg.changed",c)}</span>
        </div>`:f}
    <div class="dlg-actions">
      <button class="btn ${o.confirmStyle==="filled"?"tonal":"filled"}" type="button" data-safe autofocus @click=${i}>
        ${o.safe}
      </button>
      <button
        class="btn ${o.confirmStyle}"
        type="button"
        data-confirm
        aria-disabled=${n?"true":"false"}
        aria-describedby=${n?"dlg-changed":f}
        @click=${()=>n?void 0:s()}
      >
        ${o.confirm}
      </button>
    </div>`}const Qa="mock-laundry-centre";function Xa(a,e){const t=V[a];return typeof e=="boolean"?e?"on":"off":t?.options&&typeof e=="number"?t.options[String(e)]??String(e):String(e)}function ei(a,e,t){const n=V[a];let i=n?.control??"sensor";return!t&&(i==="select"||i==="number"||i==="switch")&&(i=i==="switch"?"binary_sensor":"sensor"),`${i}.${ee(e)}_${ee(n?.name??a)}`}function ti(a,e={}){const t=e.deviceId??Qa,n=e.deviceName??"Laundry Centre",i=e.at??new Date().toISOString(),s=e.controls??!1,o={},c={},d=(p,g,b={})=>{o[p]={entity_id:p,...g},c[p]={entity_id:p,device_id:t,platform:"haismart",...b}};for(const[p,g]of Object.entries(a)){const b=V[p];if(!b)continue;const w=ei(p,n,s),_=e.changedAt?.[p]??i,x=e.stateOverride?.[p],P=e.off||x==="unavailable"||x==="unknown"?{}:{haier_attribute:p,...e.legacy?{}:{haier_value:g},friendly_name:`${n} ${b.name}`,...b.unit?{unit_of_measurement:b.unit}:{}};d(w,{state:e.off?"unavailable":x??Xa(p,g),attributes:P,last_changed:_,last_updated:_})}if(s)for(const p of lt){const g=`button.${ee(n)}_${p}`;d(g,{state:e.off?"unavailable":"unknown",attributes:{},last_changed:i,last_updated:i},{translation_key:p})}const m=`binary_sensor.${ee(n)}_fault`,h=e.fault;d(m,{state:e.off?"unavailable":h?.on?"on":"off",attributes:e.off||!h?{device_class:"problem"}:{device_class:"problem",faults:h.faults??[],fault_codes:h.fault_codes??[],error_code:h.error_code??null},last_changed:i,last_updated:i},{translation_key:"fault"}),d(`binary_sensor.${ee(n)}_cloud_connection`,{state:"on",attributes:{},last_changed:i,last_updated:i},{translation_key:"cloud_connection",entity_category:"diagnostic"});const l={[t]:{id:t,name:n,name_by_user:null,manufacturer:"Haier",model:"HWD140-BD14LCGNU1"}};return{states:o,entities:c,devices:l,locale:{language:e.language??"en",time_format:e.timeFormat??"12",time_zone:e.timeZone?"server":"local"},language:e.language??"en",config:{time_zone:e.timeZone??"Asia/Kuala_Lumpur"},user:{is_admin:e.isAdmin??!0},callService:e.callService??(async()=>{})}}const ni=56,ai=10,ii=!0,si=!1,ri=!1,oi=!1,li=!1,ci=!1,di=!1,ui=!1,hi=!1,pi=!1,mi=!1,fi=!0,gi=0,yi=2,_i=!1,bi=!1,wi=!1,vi=!1,ki=!1,$i=!1,Si=!1,xi=!1,Di=!1,Ai=1,Ci=8,Ti=4,Mi=1,Ei=1,Pi=0,Ri=120,Oi=0,Li=.28,Ui=2,Ni=1,Wi=0,Ii=!1,ji=!1,Hi=2,Bi=134,zi=1,Fi=30,Ki=35,Vi=0,qi=!1,Yi=!1,Gi=!1,Zi=!1,Ji=!1,Qi=!1,Xi=!1,es=0,ts=1e3,ns=1,as=1,is=0,ss=1,rs=100,os=0,ls=0,cs=1,ds=0,us=!1,hs=!1,ps=!1,ms=!1,fs=!1,gs=0,ys=0,_s=0,bs=0,ws=0,vs=0,ks=0,$s=0,Ss=1,xs=0,Ds=!1,As=0,Cs=0,Ts=!1,Ms=0,Es=!1,Ps=0,Rs=!1,Os=0,Ls=!1,Us=0,Ns=0,Ws=0,Is=0,js=0,Hs=0,Bs=0,zs=0,Fs=0,Ks=0,Vs=0,qs=1,Ys=0,Gs=0,Zs=!1,Js=!1,Qs=!1,Xs=!1,er=!1,tr=0,nr=100,ar=!1,ir=!1,sr=!0,rr=!0,or=!1,lr=!1,cr=1,dr=!0,ur=0,hr=470,pr=!1,mr=!1,fr=!1,gr=!1,yr=!1,_r=!1,br=!1,wr=!1,vr=!1,kr=1,$r=4,Sr=3,xr=56,Dr=8,Ar=!1,Cr=!1,Tr=2,Mr=0,Er=0,Pr=0,Rr=0,Or=1,Lr=!0,Ur=!1,Nr=0,Wr=!1,Ir=!1,jr={washerUnifiedProgramSettings:ni,washerDryMode:ai,autoDetergentStatus:ii,autoDisinfectantStatus:si,washerStrongStatus:ri,voiceStatus:oi,steamWashStatus:li,washerIntelligenceStatus:ci,washerUvSterilizationStatus:di,washerDefSetAllowed:ui,antiAllergyStatus:hi,washerResnStatus:pi,purifiedWashStatus:mi,autoSoftenerStatus:fi,laundryCyclePhase:gi,washerRunningMode:yi,laundryCycleStatus:_i,washerDoorLockStatus:bi,washerRemoteCtrValid:wi,rinseIncreaseOpStatus:vi,rinseDecreaseOpStatus:ki,dryCleaningNeeded:$i,washerDryStatus:Si,loosenStatus:xi,washerDoorStatus:Di,remainingTimeHH:Ai,remainingTimeMM:Ci,washerMessage:Ti,currentWashCycle:Mi,totalWashCycle:Ei,currentWaterUsed:Pi,totalWaterUsed:Ri,washerCurrentElectricityUsed:Oi,washerTotalElectricityUsed:Li,remainingSoftenerStatus:Ui,remainingDetergentStatus:Ni,remainingDispersantStatus:Wi,clothesAnionStatus:Ii,shoesAnionStatus:ji,remainingRinseTimes:Hi,weight:Bi,detergentType:zi,washTemp:Fi,remainingMainWashTime:Ki,dirtyLevel:Vi,creaseResistSoakStatus:qi,nightWashStatus:Yi,soakWashStatus:Gi,washerSpeedUpStatus:Zi,washerEnergySavingStatus:Ji,washerPermanentPressStatus:Qi,highWaterLevelStatus:Xi,stainType:es,spinSpeed:ts,haier_DetergentWeight:ns,haier_SoftenerWeight:as,washSpeed:is,washerActualWeight:ss,detergentPercent:rs,airWashTempLevel:os,airWashTime:ls,washerUnifiedClothingMaterial:cs,detergentBPercent:ds,drySysDiagResult:us,spinSysDiagResult:hs,drainSysDiagResult:ps,washSysDiagResult:ms,inWaterSysDiagResult:fs,clothesRecogStatus:gs,clothesRecogResult:ys,clothesRecogNum:_s,clothesIdIndex:bs,clothesInfoHW:ws,clothesInfoMW:vs,clothesInfoLW:ks,washerCloudProgSrc:$s,washerDryLevel:Ss,washerCloudProgId:xs,dryProgFlag:Ds,washerDryType:As,washerDryTime:Cs,box2InjectStatus:Ts,box2Concentration:Ms,box1InjectStatus:Es,box1Concentration:Ps,box4InjectStatus:Rs,box4Concentration:Os,box3InjectStatus:Ls,box3Concentration:Us,box4RemainingStatus:Ns,box3RemainingStatus:Ws,box2RemainingStatus:Is,box1RemainingStatus:js,box1Volume:Hs,box1LiquidType:Bs,box2Volume:zs,box2LiquidType:Fs,box3Volume:Ks,box3LiquidType:Vs,serverModeStatus:qs,hardnessValue:Ys,photoPlasmaCareTime:Gs,wetcleaningProgram:Zs,freshAir:Js,longTimeAuthorizationStatus:Qs,remoteCtrEnabled:Xs,spaRinseHeatStatus:er,endDisplayDuration:tr,softenerPercent:nr,remotePowerOn:ar,wdLinkageStatus:ir,washerPowerStatus:sr,dryerPowerStatus:rr,dryerRemoteCtrValid:or,childLockStatus:lr,dryerRunningMode:cr,onOffStatus:dr,dryerRemainingResnTime:ur,dryerRemainingDryTime:hr,dryerAromaCareStatus:pr,dryerPhotoPlasmaStatus:mr,dryerAnionStatus:fr,fastDryStatus:gr,mitesRemovalStatus:yr,ironRemindStatus:_r,buzzerDisabled:br,dryerSterilizationStatus:wr,delicateStatus:vr,programClass:kr,dryerTempLevel:$r,dryerDryLevel:Sr,dryerUnifiedProgramSettings:xr,dryerCyclePhase:Dr,standbyTimeExtended:Ar,forceDelete:Cr,remainingStandbyTime:Tr,dryerMessage:Mr,dryerUnifiedClothingMaterial:Er,remainingAntiCreaseTime:Pr,airwashSprayTime:Rr,dryerCloudProgSrc:Or,dryerDoorLockStatus:Lr,dryerDoorStatus:Ur,dryerCloudProgId:Nr,dryerLongTimeAuthorizationStatus:Wr,dryerRemoteCtrEnabled:Ir},Ge={layout:"auto",time_display:"both",drums:"both",order:"washer_first",collapse_idle:!0,show_notices:!0,show_stepper:!0,show_totals:!1,show_controls:"auto",confirm_start:!1,off_style:"keep",language:"auto"},B=(a,e,t)=>({select:{mode:"dropdown",options:t.map(n=>({value:n,label:r(a,`${e}_${n}`)}))}});function Hr(a){return[{name:"device_id",selector:{device:{integration:"haismart"}}},{name:"title",selector:{text:{}}},{name:"layout",selector:B(a,"ed.layout",["auto","full","stacked","compact"])},{name:"time_display",selector:B(a,"ed.time",["both","finish","remaining"])},{name:"drums",selector:B(a,"ed.drums",["both","washer","dryer"])},{name:"order",selector:B(a,"ed.order",["washer_first","dryer_first"])},{name:"advanced",type:"expandable",flatten:!0,title:r(a,"ed.advanced"),schema:[{name:"collapse_idle",selector:{boolean:{}}},{name:"show_notices",selector:{boolean:{}}},{name:"show_stepper",selector:{boolean:{}}},{name:"show_totals",selector:{boolean:{}}},{name:"show_controls",selector:B(a,"ed.show_controls",["auto","never"])},{name:"confirm_start",selector:{boolean:{}}},{name:"off_style",selector:B(a,"ed.off_style",["keep","collapse"])},{name:"language",selector:B(a,"ed.language",["auto","en","ms"])},{name:"tap_action",selector:{ui_action:{}}}]}]}const Br={device_id:"ed.device",title:"ed.title",layout:"ed.layout",time_display:"ed.time",drums:"ed.drums",order:"ed.order",collapse_idle:"ed.collapse_idle",show_notices:"ed.show_notices",show_stepper:"ed.show_stepper",show_totals:"ed.show_totals",show_controls:"ed.show_controls",confirm_start:"ed.confirm_start",off_style:"ed.off_style",language:"ed.language",tap_action:"ed.tap_action",advanced:"ed.advanced"};function zr(a,e,t){const n=[],i=ue(a,e);if(i.kind!=="ok")return[{text:r(t,"det.none"),level:"warning"}];const s=i.deviceId,o=nn(a,s),c=an(a,o),d=h=>r(t,h?"det.found":"det.not_found"),m=h=>r(t,h?"det.on":"det.off");return n.push({text:r(t,"det.device",{name:Re(a,s),n:ye(a,s).length}),level:"info"}),n.push({text:r(t,"det.washer",{found:d(!!o.attrs.laundryCyclePhase)}),level:"info"}),n.push({text:r(t,"det.dryer",{found:d(!!o.attrs.dryerCyclePhase)}),level:"info"}),n.push(c.controlsExist?{text:r(t,"det.controls_on"),level:"ok"}:{text:r(t,"det.controls_off"),level:"info"}),n.push(c.machineOff||c.washer.remote===void 0&&c.dryer.remote===void 0?{text:r(t,"det.remote_unknown"),level:"info"}:{text:r(t,"det.remote",{w:m(c.washer.remote),d:m(c.dryer.remote)}),level:"info"}),n.push({text:r(t,c.legacy?"det.legacy":"det.full"),level:c.legacy?"warning":"ok"}),n.push({text:r(t,"det.fault",{found:d(!!o.fault)}),level:"info"}),!e.device_id&&Xt(a).length>=2&&n.push({text:r(t,"det.multi"),level:"warning"}),c.controlsExist&&(n.push({text:r(t,"det.hidden"),level:"info"}),c.washer.remote===!1&&c.dryer.remote===!1&&n.push({text:r(t,"det.remote_both_off"),level:"info"})),n}const Te=class Te extends X{constructor(){super(...arguments),this._computeLabel=e=>{const t=Br[e.name];return t?r(this._lang,t):e.name},this._computeHelper=e=>{const t=this._lang;if(e.name==="device_id"){const n=this.hass?ue(this.hass,{}):void 0;return n?.kind==="ok"&&this.hass?r(t,"ed.device_helper",{name:Re(this.hass,n.deviceId)}):r(t,"ed.device_helper_none")}if(e.name==="layout")return r(t,"ed.layout_helper");if(e.name==="confirm_start")return r(t,"ed.confirm_start_helper")}}setConfig(e){this._config=e}get _lang(){return rn(this._config?.language,this.hass?.locale?.language??this.hass?.language)}_valueChanged(e){e.stopPropagation();const t={...e.detail.value},n={type:this._config?.type??"custom:haismart-laundry-card"};for(const[i,s]of Object.entries(t))i!=="type"&&(s===void 0||s===""&&i!=="title"||i in Ge&&Ge[i]===s||i==="tap_action"&&s?.action==="more-info"&&Object.keys(s).length===1||(n[i]=s));for(const[i,s]of Object.entries(this._config??{}))!(i in n)&&!(i in t)&&i!=="type"&&(n[i]=s);this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return f;const e=this._lang,t={...Ge,...this._config},n=zr(this.hass,this._config,e),i=s=>s.level==="warning"?"mdi:alert-outline":s.level==="ok"?"mdi:check-circle-outline":"mdi:information-outline";return u`<ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${Hr(e)}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <section class="detected" aria-labelledby="det-title">
        <h3 id="det-title">${r(e,"ed.detected")}</h3>
        <ul>
          ${n.map(s=>u`<li class=${s.level}><ha-icon .icon=${i(s)} aria-hidden="true"></ha-icon><span>${s.text}</span></li>`)}
        </ul>
      </section>`}};Te.properties={hass:{attribute:!1},_config:{state:!0}},Te.styles=Vt`
    .detected {
      margin-top: 16px;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .detected h3 {
      margin: 0 0 8px;
      font-size: 14px;
      font-weight: 500;
    }
    .detected ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .detected li {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      line-height: 1.4;
    }
    .detected ha-icon {
      --mdc-icon-size: 18px;
      flex: none;
      color: var(--secondary-text-color);
    }
    .detected li.warning ha-icon {
      color: var(--warning-color, #ffa600);
    }
    .detected li.ok ha-icon {
      color: var(--success-color, #43a047);
    }
  `;let tt=Te;customElements.get("haismart-laundry-card-editor")||customElements.define("haismart-laundry-card-editor",tt);const he="haismart-laundry-card",Fr="haismart-laundry-card-editor",Kr="1.0.0",Vr="https://github.com/kucau0901/haismart-laundry-card#readme",qr={layout:"auto",time_display:"both",drums:"both",order:"washer_first",collapse_idle:!0,show_notices:!0,show_stepper:!0,show_totals:!1,show_controls:"auto",confirm_start:!1,off_style:"keep",language:"auto",tap_action:{action:"more-info"}},hn={layout:["auto","full","stacked","compact"],time_display:["finish","remaining","both"],drums:["both","washer","dryer"],order:["washer_first","dryer_first"],show_controls:["auto","never"],off_style:["keep","collapse"],language:["auto","en","ms"]},pn=["collapse_idle","show_notices","show_stepper","show_totals","confirm_start"],mn=["device_id","title"],Yr=new Set(["type","tap_action","grid_options","view_layout","visibility","card_mod",...Object.keys(hn),...pn,...mn]),Ft=new Set;function Gr(a){if(!a||typeof a!="object")throw new Error("haismart-laundry-card: invalid configuration");for(const[e,t]of Object.entries(hn)){const n=a[e];if(n!==void 0&&!t.includes(n))throw new Error(`haismart-laundry-card: "${e}" must be one of ${t.join(", ")}`)}for(const e of pn){const t=a[e];if(t!==void 0&&typeof t!="boolean")throw new Error(`haismart-laundry-card: "${e}" must be true or false`)}for(const e of mn){const t=a[e];if(t!=null&&typeof t!="string")throw new Error(`haismart-laundry-card: "${e}" must be text`)}if(a.tap_action!==void 0&&(typeof a.tap_action!="object"||a.tap_action===null))throw new Error('haismart-laundry-card: "tap_action" must be an action object');for(const e of Object.keys(a))!Yr.has(e)&&!Ft.has(e)&&(Ft.add(e),console.warn(`haismart-laundry-card: unknown option "${e}" (kept, ignored)`));return{...qr,...a}}function Zr(a,e){const t=a>=460?"full":a>=280?"stacked":"compact";if(!e||e===t)return t;const n=8;return e==="full"&&t==="stacked"||e==="stacked"&&t==="full"?Math.abs(a-460)<n?e:t:(e==="stacked"&&t==="compact"||e==="compact"&&t==="stacked")&&Math.abs(a-280)<n?e:t}const Se=(a,e,t)=>a.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0})),ve=a=>Se(window,"haptic",a),Me=class Me extends X{constructor(){super(...arguments),this.preview=!1,this.editMode=!1,this._tick=0,this._announce="",this._rev=0,this._memory={},this._ui={remoteHelp:new Set,noticesOpen:new Set,detailsOpen:new Set,expanded:new Set,faultMore:!1,hintSeen:new Set},this._resolution={kind:"loading"},this._tracked=[],this._sampleActive=!1,this._now=Date.now(),this._prevDone={},this._prevRemote={},this._faultAnnounced=!1,this._faultFirstRender=!1,this._collapsedNow=!1,this._controller=new $a({requestUpdate:()=>{this._rev++},onConfirmed:(e,t)=>this._say(un({lang:this._lang},e,t)),onUnconfirmed:e=>this._say(r(this._lang,"ctl.unconfirmed",A(this._lang,e))),onError:(e,t,n)=>{Se(this,"hass-notification",{message:r(this._lang,n.key,A(this._lang,e))})}}),this._handlers={tap:e=>{if(!e.phaseEntity||this._sampleActive)return;const t=this._config?.tap_action??{action:"more-info"};Se(this,"hass-action",{config:{entity:e.phaseEntity,tap_action:t},action:"tap"})},moreInfo:e=>{!e||this._sampleActive||Se(this,"hass-more-info",{entityId:e})},command:(e,t,n)=>this._activate(e.key,t,n),disabledPress:()=>ve("light"),dismiss:e=>this._controller.dismiss(e),retry:(e,t)=>{const n=this._controller.get(e);n&&(this._controller.dismiss(e),this._activate(e,n.cmd,t))},toggle:(e,t)=>{const n=this._ui[e];n.has(t)?n.delete(t):n.add(t),this._rev++},toggleFaultMore:()=>{this._ui.faultMore=!this._ui.faultMore,this._rev++},openDevice:()=>{const e=this._model?.deviceId;!e||this._sampleActive||!this.hass?.user?.is_admin||(history.pushState(null,"",`/config/devices/device/${e}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})))}}}setConfig(e){this._config=Gr(e)}static getConfigElement(){return document.createElement(Fr)}static getStubConfig(e){const t=ue(e,{});return t.kind==="ok"?{type:`custom:${he}`,device_id:t.deviceId}:{type:`custom:${he}`}}getCardSize(){const e=this._effLayout();return e==="compact"?2:this._model?.machineOff?this._config?.off_style==="collapse"?1:5:e==="stacked"?this._collapsedNow?6:9:6}getGridOptions(){return this._config?.layout==="compact"?{columns:6,rows:2,min_columns:3,min_rows:1}:{columns:12,rows:"auto",min_columns:3,min_rows:2}}connectedCallback(){super.connectedCallback(),typeof ResizeObserver<"u"&&!this._ro&&(this._ro=new ResizeObserver(e=>{const t=e[0]?.contentRect.width;if(!t)return;const n=Zr(t,this._layout);n!==this._layout&&(this._layout=n)}),this._ro.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this._ro?.disconnect(),this._ro=void 0,clearTimeout(this._tickTimer),clearTimeout(this._gateTimer),this._tickTimer=void 0,this._gateTimer=void 0,this._controller.dispose()}get _lang(){return rn(this._config?.language,this.hass?.locale?.language??this.hass?.language)}_effLayout(){const e=this._config?.layout;return e&&e!=="auto"?e:this._layout??"full"}shouldUpdate(e){if(!this._config)return!1;if(!e.has("hass")||e.size>1)return!0;const t=e.get("hass"),n=this.hass;return!t||!n||t.entities!==n.entities||t.devices!==n.devices||t.locale!==n.locale||t.language!==n.language?!0:this._sampleActive||!this._tracked.length?!1:this._tracked.some(i=>t.states?.[i]!==n.states?.[i])}willUpdate(){this._now=Date.now();const e=this.shadowRoot?.activeElement;this._focusPrimary=e?.dataset?.role==="primary"?{drum:e.dataset.drum??"",cmd:e.dataset.cmd??""}:void 0;const t=this._config;let n=this.hass;if(this._resolution=ue(n,t),this._sampleActive=!1,this.preview&&(this._resolution.kind==="none"||this._resolution.kind==="loading"&&!n?.entities)&&(this._sampleHass??=ti(jr,{controls:!0,language:n?.locale?.language,timeFormat:n?.locale?.time_format??"language",isAdmin:!1}),n=this._sampleHass,this._resolution=ue(n,{}),this._sampleActive=!0),this._resolution.kind!=="ok"||!n){this._model=void 0,this._tracked=[];return}this._index=nn(n,this._resolution.deviceId),this._tracked=na(this._index,n),this._model=an(n,this._index,{now:this._now,memory:this._memory});const i=this._viewCtx();this._views={washer:It(this._model,this._model.washer,i),dryer:It(this._model,this._model.dryer,i)}}_viewCtx(){const e=this._lang,t=this._sampleActive?this._sampleHass:this.hass;return{lang:e,time:Aa(t,e),now:this._now,timeDisplay:Ma(this._config),controlsVisible:this._config.show_controls!=="never"&&this._effLayout()!=="compact"&&!!this._model?.controlsExist}}updated(){const e=this._model,t=this.shadowRoot?.querySelector("dialog");if(t&&this._dialog&&!t.open){try{t.showModal()}catch{t.setAttribute("open","")}ve("warning"),t.querySelector("[data-safe]")?.focus()}if(this._dialog&&(!e||e.machineOff)&&this._closeDialog(),!!e){if(this._controller.observe([e.washer,e.dryer]),this._focusPrimary){const{drum:n,cmd:i}=this._focusPrimary,s=this.shadowRoot?.querySelector(`[data-role="primary"][data-drum="${n}"]`);s&&s.dataset.cmd!==i&&this.shadowRoot?.activeElement!==s&&s.focus(),this._focusPrimary=void 0}for(const n of[e.washer,e.dryer])this._prevDone[n.key]===!1&&n.isDoneLike&&this._say(r(this._lang,"a11y.drum_done",A(this._lang,n.key))),this._prevDone[n.key]=n.isDoneLike,this._prevRemote[n.key]===!1&&n.remote===!0&&this._controlsShown(n)&&this._say(r(this._lang,"ctl.available",A(this._lang,n.key))),n.remote!==void 0&&(this._prevRemote[n.key]=n.remote),n.status==="idle"&&this._ui.hintSeen.add(n.key);e.fault.on&&this._faultFirstRender&&(this._faultAnnounced=!0),e.fault.on||(this._faultAnnounced=!1),this._scheduleTimers(e)}}_controlsShown(e){const t=this._renderCtx();if(!t)return!1;const n=dt(t,e);return!!(n.primary||n.secondary)}_scheduleTimers(e){if(_a(e)&&this.isConnected){if(!this._tickTimer){const n=6e4-Date.now()%6e4+50;this._tickTimer=setTimeout(()=>{this._tickTimer=void 0,this._tick++},n)}}else this._tickTimer&&(clearTimeout(this._tickTimer),this._tickTimer=void 0);const t=[e.washer,e.dryer].map(n=>n.programme.lastChanged).filter(n=>n!==void 0&&this._now-n<5e3).map(n=>n+5e3-this._now);t.length&&!this._gateTimer&&this.isConnected&&(this._gateTimer=setTimeout(()=>{this._gateTimer=void 0,this._rev++},Math.max(50,Math.min(...t)+50)))}_say(e){this._announce=this._announce.endsWith("​")?e:`${e}​`}_drum(e){return this._model?.[e]}_gate(e,t){return this._model?sn(this._model,e,t,{now:Date.now(),sending:this._controller.sending,pending:this._controller.pending}):"remote"}_activate(e,t,n){const i=this._drum(e);if(!i||this._sampleActive)return;if(this._gate(i,t)){ve("light");return}if(t==="cancel"||t==="cancel_scheduled"||t==="stop"||t==="start"&&this._config.confirm_start){this._dialog={drum:e,cmd:t,trigger:n,signature:this._signature(i,t)};return}this._send(e,t)}_signature(e,t){return`${e.status}|${this._gate(e,t)??""}|${e.programme.value??""}`}_send(e,t){const n=this._drum(e),i=this.hass;if(!n||!i||this._gate(n,t))return;const s=et(n,t);s&&(ve("selection"),this._controller.run(i,e,t,s))}_closeDialog(){const e=this._dialog?.trigger;this._dialog=void 0;const t=this.shadowRoot?.querySelector("dialog");if(t?.open)try{t.close()}catch{t.removeAttribute("open")}e?.isConnected&&requestAnimationFrame(()=>e.focus())}_confirmDialog(){const e=this._dialog;if(!e)return;const t=this._drum(e.drum);!t||this._signature(t,e.cmd)!==e.signature||(this._closeDialog(),this._send(e.drum,e.cmd))}_onDialogClick(e){const t=e.currentTarget;if(e.target!==t)return;const n=t.getBoundingClientRect();e.clientX>=n.left&&e.clientX<=n.right&&e.clientY>=n.top&&e.clientY<=n.bottom||this._closeDialog()}_renderCtx(){if(!(!this._model||!this._views||!this._config))return{lang:this._lang,model:this._model,config:this._config,layout:this._effLayout(),now:this._now,viewCtx:this._viewCtx(),views:this._views,controller:this._controller,ui:this._ui,on:this._handlers,sample:this._sampleActive}}_drumsShown(e){const t=this._config;return t.drums==="washer"?[e.washer]:t.drums==="dryer"?[e.dryer]:t.order==="dryer_first"?[e.dryer,e.washer]:[e.washer,e.dryer]}_title(){const e=this._config;if(typeof e.title=="string")return e.title;const t=this._sampleActive?this._sampleHass:this.hass;return this._resolution.kind==="ok"&&t?Re(t,this._resolution.deviceId,r(this._lang,"card.default_title")):r(this._lang,"card.default_title")}render(){if(!this._config)return f;const e=this._lang,t=this._resolution;if(t.kind==="loading")return u`<ha-card class="loading" lang=${e}></ha-card>`;if(t.kind!=="ok"){const[b,w]=t.kind==="none"?[r(e,"setup.none_title"),r(e,"setup.none_body")]:t.kind==="removed"?[r(e,"setup.removed_title"),r(e,"setup.removed_body")]:[r(e,"setup.not_laundry",{name:t.name}),r(e,"setup.not_laundry_body")];return u`<ha-card lang=${e}>${Ua(e,b,w,this.editMode)}</ha-card>`}const n=this._renderCtx();if(!n)return u`<ha-card class="loading" lang=${e}></ha-card>`;const i=n.model,s=n.layout,o=this._drumsShown(i),c=u`<div class="sr-only" aria-live="polite" aria-atomic="true">${this._announce}</div>`;if(this._collapsedNow=!1,i.machineOff&&(s!=="full"||this._config.off_style==="collapse")){const b=this._config.off_style==="collapse"?"collapse":s==="compact"?"compact":"stacked";return u`<ha-card lang=${e} class="layout-${s}">
        ${c} ${s==="compact"&&this._title()?u`<div class="compact-title ellipsis">${this._title()}</div>`:f}
        ${Na(n,b)}
      </ha-card>`}if(s==="compact")return this._renderCompact(n,o,c);const d=i.fault.on&&!this._faultAnnounced;this._faultFirstRender=d;const m=Ht(i,o,n.viewCtx),h=this._title(),l=!!this.hass?.user?.is_admin&&!this._sampleActive;let p;if(s==="stacked"&&this._config.collapse_idle&&o.length===2){const b=_=>_.isActive||_.status==="delayed"||_.isDoneLike,w=_=>_.status==="idle"||_.status==="stale"||_.status==="off";p=o.map(_=>{const x=o.find(P=>P!==_),T=w(_)&&b(x);return T&&!this._ui.expanded.has(_.key)?(this._collapsedNow=!0,Ga(n,_)):T?u`<div>
            ${Ye(n,_)}
            <button
              class="btn icon-only"
              type="button"
              aria-expanded="true"
              aria-label=${r(e,"a11y.show_drum",A(e,_.key))}
              @click=${()=>this._handlers.toggle("expanded",_.key)}
            >
              <ha-icon icon="mdi:chevron-up" aria-hidden="true"></ha-icon>
            </button>
          </div>`:Ye(n,_)})}else p=o.map(b=>Ye(n,b));const g=this._config.show_totals&&!i.machineOff?Ta(i,e):null;return u`<ha-card lang=${e} class="layout-${s}">
      ${c} ${La(n,d)}
      <div class="header">
        ${l?u`<button class="title" type="button" title=${r(e,"a11y.open_device")} @click=${this._handlers.openDevice}>
              <ha-icon icon="mdi:washing-machine" aria-hidden="true"></ha-icon><span class="ellipsis">${h}</span>
            </button>`:u`<div class="title">
              <ha-icon icon="mdi:washing-machine" aria-hidden="true"></ha-icon><span class="ellipsis">${h}</span>
            </div>`}
        ${this._sampleActive?u`<span class="sample-chip">${r(e,"card.sample")}</span>`:f}
        <span class="headline ellipsis" title=${m}>${m}</span>
        ${i.childLock===!0&&!i.machineOff?u`<ha-icon
              class="status-icon"
              icon="mdi:lock-outline"
              title=${r(e,"a11y.child_lock")}
              aria-label=${r(e,"a11y.child_lock")}
            ></ha-icon>`:f}
      </div>
      <div class="drums ${o.length===2?"two":""}">${p}</div>
      ${i.machineOff?u`<div class="off-explain spanning">
            ${i.offReason==="power"?r(e,"off.explain_power"):r(e,"off.explain")}
          </div>`:f}
      ${g?u`<div class="footer">
            ${g.water?u`<button type="button" @click=${()=>this._handlers.moreInfo(g.water.entity)}>
                  <ha-icon icon="mdi:water" aria-hidden="true"></ha-icon><span>${g.text}</span>
                </button>`:u`<span>${g.text}</span>`}
          </div>`:f}
      ${this._renderDialog(n)}
    </ha-card>`}_renderCompact(e,t,n){const i=this._title(),s=t.map(d=>e.views[d.key]),o=s.length===2&&s[0].short===s[1].short&&!s[0].attention&&!s[1].attention,c=Ht(e.model,t,e.viewCtx);return u`<ha-card lang=${e.lang} class="layout-compact">
      ${n} ${i?u`<div class="compact-title ellipsis">${i}</div>`:f}
      ${o?zt(e,t[0],c,c,"mdi:washing-machine",null):t.map(d=>{const m=e.views[d.key];return zt(e,d,m.short,m.aria,m.icon,m.attention)})}
    </ha-card>`}_renderDialog(e){const t=this._dialog;if(!t)return f;const n=e.model[t.drum],i=this._signature(n,t.cmd)!==t.signature;return u`<dialog
      aria-labelledby="dlg-title"
      aria-describedby="dlg-body"
      @cancel=${s=>{s.preventDefault(),this._closeDialog()}}
      @click=${s=>this._onDialogClick(s)}
      @keydown=${s=>{s.key==="Escape"&&(s.preventDefault(),this._closeDialog())}}
    >
      ${Ja(e.lang,n,t,i,()=>this._closeDialog(),()=>this._confirmDialog())}
    </dialog>`}};Me.styles=Ea,Me.properties={hass:{attribute:!1},preview:{type:Boolean},editMode:{attribute:!1},_config:{state:!0},_layout:{state:!0},_tick:{state:!0},_dialog:{state:!0},_announce:{state:!0},_rev:{state:!0}};let nt=Me;customElements.get(he)||(customElements.define(he,nt),window.customCards=window.customCards||[],window.customCards.push({type:he,name:"Haier Laundry Centre",description:"Is it done, and when? Washer and dryer status at a glance, with safe start, pause and cancel.",preview:!0,documentationURL:Vr}),console.info(`%c HAISMART-LAUNDRY-CARD %c v${Kr} `,"color:#fff;background:#03a9f4;font-weight:600;border-radius:4px 0 0 4px","color:#03a9f4;background:transparent;font-weight:600"));export{he as CARD_TYPE,qr as DEFAULTS,Fr as EDITOR_TYPE,nt as HaismartLaundryCard,Zr as layoutForWidth,Gr as validateConfig};
