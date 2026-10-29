/*! haismart-laundry-card v1.0.0 | MIT | https://github.com/kucau0901/haismart-laundry-card */
const $e=globalThis,rt=$e.ShadowRoot&&($e.ShadyCSS===void 0||$e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),St=new WeakMap;let aa=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(rt&&e===void 0){const a=t!==void 0&&t.length===1;a&&(e=St.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&St.set(t,e))}return e}toString(){return this.cssText}};const na=n=>new aa(typeof n=="string"?n:n+"",void 0,st),ia=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((a,i,r)=>a+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new aa(t,n,st)},Ka=(n,e)=>{if(rt)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const a=document.createElement("style"),i=$e.litNonce;i!==void 0&&a.setAttribute("nonce",i),a.textContent=t.cssText,n.appendChild(a)}},Dt=rt?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return na(t)})(n):n;const{is:Va,defineProperty:qa,getOwnPropertyDescriptor:Ya,getOwnPropertyNames:Ga,getOwnPropertySymbols:Ja,getPrototypeOf:Za}=Object,Pe=globalThis,At=Pe.trustedTypes,Qa=At?At.emptyScript:"",Xa=Pe.reactiveElementPolyfillSupport,he=(n,e)=>n,Ze={toAttribute(n,e){switch(e){case Boolean:n=n?Qa:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ra=(n,e)=>!Va(n,e),Ct={attribute:!0,type:String,converter:Ze,reflect:!1,useDefault:!1,hasChanged:ra};Symbol.metadata??=Symbol("metadata"),Pe.litPropertyMetadata??=new WeakMap;let te=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ct){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,t);i!==void 0&&qa(this.prototype,e,i)}}static getPropertyDescriptor(e,t,a){const{get:i,set:r}=Ya(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const l=i?.call(this);r?.call(this,o),this.requestUpdate(e,l,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ct}static _$Ei(){if(this.hasOwnProperty(he("elementProperties")))return;const e=Za(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(he("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(he("properties"))){const t=this.properties,a=[...Ga(t),...Ja(t)];for(const i of a)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[a,i]of t)this.elementProperties.set(a,i)}this._$Eh=new Map;for(const[t,a]of this.elementProperties){const i=this._$Eu(t,a);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const i of a)t.unshift(Dt(i))}else e!==void 0&&t.push(Dt(e));return t}static _$Eu(e,t){const a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ka(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(i!==void 0&&a.reflect===!0){const r=(a.converter?.toAttribute!==void 0?a.converter:Ze).toAttribute(t,a.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const a=this.constructor,i=a._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=a.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Ze;this._$Em=i;const l=o.fromAttribute(t,r.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(e,t,a,i=!1,r){if(e!==void 0){const o=this.constructor;if(i===!1&&(r=this[e]),a??=o.getPropertyOptions(e),!((a.hasChanged??ra)(r,t)||a.useDefault&&a.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:i,wrapped:r},o){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[i,r]of a){const{wrapped:o}=r,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,r,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};te.elementStyles=[],te.shadowRootOptions={mode:"open"},te[he("elementProperties")]=new Map,te[he("finalized")]=new Map,Xa?.({ReactiveElement:te}),(Pe.reactiveElementVersions??=[]).push("2.1.2");const ot=globalThis,Tt=n=>n,Ae=ot.trustedTypes,Mt=Ae?Ae.createPolicy("lit-html",{createHTML:n=>n}):void 0,sa="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,oa="?"+F,en=`<${oa}>`,G=document,me=()=>G.createComment(""),fe=n=>n===null||typeof n!="object"&&typeof n!="function",lt=Array.isArray,tn=n=>lt(n)||typeof n?.[Symbol.iterator]=="function",ze=`[ 	
\f\r]`,ce=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Et=/-->/g,Pt=/>/g,K=RegExp(`>|${ze}(?:([^\\s"'>=/]+)(${ze}*=${ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ot=/'/g,Rt=/"/g,la=/^(?:script|style|textarea|title)$/i,an=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),h=an(1),re=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Lt=new WeakMap,Y=G.createTreeWalker(G,129);function ca(n,e){if(!lt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(e):e}const nn=(n,e)=>{const t=n.length-1,a=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=ce;for(let l=0;l<t;l++){const d=n[l];let m,_,c=-1,g=0;for(;g<d.length&&(o.lastIndex=g,_=o.exec(d),_!==null);)g=o.lastIndex,o===ce?_[1]==="!--"?o=Et:_[1]!==void 0?o=Pt:_[2]!==void 0?(la.test(_[2])&&(i=RegExp("</"+_[2],"g")),o=K):_[3]!==void 0&&(o=K):o===K?_[0]===">"?(o=i??ce,c=-1):_[1]===void 0?c=-2:(c=o.lastIndex-_[2].length,m=_[1],o=_[3]===void 0?K:_[3]==='"'?Rt:Ot):o===Rt||o===Ot?o=K:o===Et||o===Pt?o=ce:(o=K,i=void 0);const f=o===K&&n[l+1].startsWith("/>")?" ":"";r+=o===ce?d+en:c>=0?(a.push(m),d.slice(0,c)+sa+d.slice(c)+F+f):d+F+(c===-2?l:f)}return[ca(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class ge{constructor({strings:e,_$litType$:t},a){let i;this.parts=[];let r=0,o=0;const l=e.length-1,d=this.parts,[m,_]=nn(e,t);if(this.el=ge.createElement(m,a),Y.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=Y.nextNode())!==null&&d.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(sa)){const g=_[o++],f=i.getAttribute(c).split(F),u=/([.?@])?(.*)/.exec(g);d.push({type:1,index:r,name:u[2],strings:f,ctor:u[1]==="."?sn:u[1]==="?"?on:u[1]==="@"?ln:Oe}),i.removeAttribute(c)}else c.startsWith(F)&&(d.push({type:6,index:r}),i.removeAttribute(c));if(la.test(i.tagName)){const c=i.textContent.split(F),g=c.length-1;if(g>0){i.textContent=Ae?Ae.emptyScript:"";for(let f=0;f<g;f++)i.append(c[f],me()),Y.nextNode(),d.push({type:2,index:++r});i.append(c[g],me())}}}else if(i.nodeType===8)if(i.data===oa)d.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(F,c+1))!==-1;)d.push({type:7,index:r}),c+=F.length-1}r++}}static createElement(e,t){const a=G.createElement("template");return a.innerHTML=e,a}}function se(n,e,t=n,a){if(e===re)return e;let i=a!==void 0?t._$Co?.[a]:t._$Cl;const r=fe(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,a)),a!==void 0?(t._$Co??=[])[a]=i:t._$Cl=i),i!==void 0&&(e=se(n,i._$AS(n,e.values),i,a)),e}class rn{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,i=(e?.creationScope??G).importNode(t,!0);Y.currentNode=i;let r=Y.nextNode(),o=0,l=0,d=a[0];for(;d!==void 0;){if(o===d.index){let m;d.type===2?m=new _e(r,r.nextSibling,this,e):d.type===1?m=new d.ctor(r,d.name,d.strings,this,e):d.type===6&&(m=new cn(r,this,e)),this._$AV.push(m),d=a[++l]}o!==d?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=G,i}p(e){let t=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class _e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=se(this,e,t),fe(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==re&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):tn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&fe(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,i=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=ge.createElement(ca(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(t);else{const r=new rn(i,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=Lt.get(e.strings);return t===void 0&&Lt.set(e.strings,t=new ge(e)),t}k(e){lt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,i=0;for(const r of e)i===t.length?t.push(a=new _e(this.O(me()),this.O(me()),this,this.options)):a=t[i],a._$AI(r),i++;i<t.length&&(this._$AR(a&&a._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const a=Tt(e).nextSibling;Tt(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,i,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=p}_$AI(e,t=this,a,i){const r=this.strings;let o=!1;if(r===void 0)e=se(this,e,t,0),o=!fe(e)||e!==this._$AH&&e!==re,o&&(this._$AH=e);else{const l=e;let d,m;for(e=r[0],d=0;d<r.length-1;d++)m=se(this,l[a+d],t,d),m===re&&(m=this._$AH[d]),o||=!fe(m)||m!==this._$AH[d],m===p?e=p:e!==p&&(e+=(m??"")+r[d+1]),this._$AH[d]=m}o&&!i&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class sn extends Oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}}class on extends Oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}}class ln extends Oe{constructor(e,t,a,i,r){super(e,t,a,i,r),this.type=5}_$AI(e,t=this){if((e=se(this,e,t,0)??p)===re)return;const a=this._$AH,i=e===p&&a!==p||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==p&&(a===p||i);i&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class cn{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){se(this,e)}}const dn=ot.litHtmlPolyfillSupport;dn?.(ge,_e),(ot.litHtmlVersions??=[]).push("3.3.3");const un=(n,e,t)=>{const a=t?.renderBefore??e;let i=a._$litPart$;if(i===void 0){const r=t?.renderBefore??null;a._$litPart$=i=new _e(e.insertBefore(me(),r),r,void 0,t??{})}return i._$AI(n),i};const ct=globalThis;let ne=class extends te{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=un(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return re}};ne._$litElement$=!0,ne.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ne});const hn=ct.litElementPolyfillSupport;hn?.({LitElement:ne});(ct.litElementVersions??=[]).push("4.2.2");const J={laundryCyclePhase:{name:"Laundry cycle phase",control:"sensor",report:"6D02",unit:null,options:{0:"Standby",1:"Weighing",2:"Load advice",3:"Wash fill",4:"Wash heating",5:"Washing",6:"Wash drain",7:"Intermediate spin",8:"Rinse fill",9:"Rinsing",10:"Rinse drain",11:"Final spin",12:"Dry",13:"Cooling down",14:"Finished",15:"Delayed start",16:"Tumbling after wash",17:"Drying after wash",18:"Drying after wash finished",19:"Tumbling after wash finished",20:"Care",21:"Pre-wash fill",22:"Pre-wash",23:"Pre-wash heating",24:"Pre-wash drain",25:"Air drying",26:"Detecting"}},dryerCyclePhase:{name:"Dryer cycle phase",control:"sensor",report:"6D01",unit:null,options:{0:"Standby",1:"Delayed start",2:"Cool air 1",3:"Heating 1",4:"Heating 2",5:"Cool air 2",6:"Finished",7:"Anti-crease",8:"Sensing load",9:"Care",10:"Pre-drying",11:"Maintenance"}},washerRunningMode:{name:"Washer running mode",control:"sensor",report:"6D02",unit:null,options:{1:"Running",2:"Paused"}},dryerRunningMode:{name:"Dryer running mode",control:"sensor",report:"6D01",unit:null,options:{1:"Running",2:"Paused"}},remainingTimeHH:{name:"Remaining hour",control:"sensor",report:"6D02",unit:null,options:null},remainingTimeMM:{name:"Remaining minute",control:"sensor",report:"6D02",unit:null,options:null},dryerRemainingDryTime:{name:"Dryer remaining dry time",control:"sensor",report:"6D01",unit:"min",options:null},dryerRemainingResnTime:{name:"Dryer remaining resn time",control:"sensor",report:"6D01",unit:"min",options:null},remainingAntiCreaseTime:{name:"Remaining anti crease time",control:"sensor",report:"6D01",unit:"min",options:null},washerUnifiedProgramSettings:{name:"Washer unified program settings",control:"select",report:"6D02",unit:null,options:{0:"None",1:"Cotton",2:"Synthetics",3:"Down",4:"Curtains",5:"Mixed",6:"Shirts",7:"Kids' wear",8:"Delicates",9:"Hot clean",10:"Wool",11:"Denim",12:"Air wash",13:"Drum clean",14:"Underwear",15:"Quick 15",16:"Quick 29",17:"Bulky items",18:"Sportswear",19:"Cradle gentle",20:"Baby care",21:"Instant",22:"Silk",23:"Memory",24:"Colour care",25:"Hand wash",26:"Towels",27:"Rinsing",28:"Spin only",29:"Dry only",30:"Pet hair removal",31:"Bed sheets",32:"Outdoor wear",33:"Night wash",34:"Rack dry",35:"Loosen",36:"Skin care",37:"Sanitise",38:"Premium",39:"Quick cotton",40:"Intensive",41:"Easy iron",42:"Little sun",43:"Timed dry",44:"Hanger dry",45:"Online",46:"Wave wash",47:"CTTN cotton",48:"CTTN synthetics",49:"Anti-allergy",50:"Odour removal",51:"Timed wash",52:"Shell jacket",53:"App self-diagnosis",54:"Blanket",55:"Standard",56:"AI Wash",57:"AI cloud wash",58:"Bath towels",59:"UV sanitise",60:"Steam anti-mite",61:"Pasteurise",62:"Super air wash",63:"Super wash",64:"FPA quick 30",65:"Quick wash & dry",66:"Beauty care",67:"Cotton 20",68:"New EU performance",69:"EU performance wash & dry",70:"Aroma",71:"Mist refresh",72:"Mink",73:"Silk quilt",74:"School uniform",75:"Shearling",76:"Wool sweater",77:"Chiffon",78:"Suits",79:"Home textiles",80:"Plush toys",81:"Face masks",82:"Quick 39",83:"Seasonal",84:"EU cotton",85:"EU synthetics",86:"Mixed 2",87:"New clothes 2",88:"AI wash & dry",89:"Tweed",90:"Luxury textiles",91:"Drum wash & dry",92:"Linen",93:"Fragrance care",94:"Lasting fragrance",95:"Fleece",96:"Luxury care",97:"Steam AI wash",98:"Shirt steam",99:"Baby steam",100:"Steam anti-allergy",101:"Sports bra",102:"Seamless bra",103:"Shaping bra",104:"Lace bra",105:"Underpants",106:"Blue sanitise",107:"Quick isolation clean",108:"Rapid 20",109:"Rapid 30",110:"Workwear",111:"Nappies",112:"Shoes",113:"Fine",114:"Casual wear",115:"Cool air 30",116:"Timed warm air",117:"Timed cool air",118:"Sterilise",119:"Wool coat",120:"Baby bedding",121:"Cotton babywear",122:"Cotton bedding",123:"Linen suit",124:"Polar fleece",125:"Care cycle",126:"Leather care",127:"Fur care",128:"Colour refresh",129:"Fabric fragrance",130:"Warm clothes",131:"Duvet"}},dryerUnifiedProgramSettings:{name:"Dryer unified program settings",control:"select",report:"6D01",unit:null,options:{0:"None",1:"Cotton",2:"Synthetics",3:"Down",4:"Curtains",5:"Mixed",6:"Shirts",7:"Kids' wear",8:"Delicates",9:"Hot clean",10:"Wool",11:"Denim",12:"Air wash",13:"Drum clean",14:"Underwear",15:"Quick 15",16:"Quick 29",17:"Bulky items",18:"Sportswear",19:"Cradle gentle",20:"Baby care",21:"Instant",22:"Silk",23:"Memory",24:"Colour care",25:"Hand wash",26:"Towels",27:"Rinsing",28:"Spin only",29:"Dry only",30:"Pet hair removal",31:"Bed sheets",32:"Outdoor wear",33:"Night wash",34:"Rack dry",35:"Loosen",36:"Skin care",37:"Sanitise",38:"Premium",39:"Quick cotton",40:"Intensive",41:"Easy iron",42:"Little sun",43:"Timed dry",44:"Hanger dry",45:"Online",46:"Wave wash",47:"CTTN cotton",48:"CTTN synthetics",49:"Anti-allergy",50:"Odour removal",51:"Timed wash",52:"Shell jacket",53:"App self-diagnosis",54:"Blanket",55:"Standard",56:"AI Dry",57:"AI cloud wash",58:"Bath towels",59:"UV sanitise",60:"Steam anti-mite",61:"Pasteurise",62:"Super air wash",63:"Super wash",64:"FPA quick 30",65:"Quick wash & dry",66:"Beauty care",67:"Cotton 20",68:"New EU performance",69:"EU performance wash & dry",70:"Aroma",71:"Mist refresh",72:"Mink",73:"Silk quilt",74:"School uniform",75:"Shearling",76:"Wool sweater",77:"Chiffon",78:"Suits",79:"Home textiles",80:"Plush toys",81:"Face masks",82:"Quick 39",83:"Seasonal",84:"EU cotton",85:"EU synthetics",86:"Mixed 2",87:"New clothes 2",88:"AI wash & dry",89:"Tweed",90:"Luxury textiles",91:"Drum wash & dry",92:"Linen",93:"Fragrance care",94:"Lasting fragrance",95:"Fleece",96:"Luxury care",97:"Steam AI wash",98:"Shirt steam",99:"Baby steam",100:"Steam anti-allergy",101:"Sports bra",102:"Seamless bra",103:"Shaping bra",104:"Lace bra",105:"Underpants",106:"Blue sanitise",107:"Quick isolation clean",108:"Rapid 20",109:"Rapid 30",110:"Workwear",111:"Nappies",112:"Shoes",113:"Fine",114:"Casual wear",115:"Cool air 30",116:"Timed warm air",117:"Timed cool air",118:"Sterilise",119:"Wool coat",120:"Baby bedding",121:"Cotton babywear",122:"Cotton bedding",123:"Linen suit",124:"Polar fleece",125:"Care cycle",126:"Leather care",127:"Fur care",128:"Colour refresh",129:"Fabric fragrance",130:"Warm clothes",131:"Duvet"}},washerMessage:{name:"Washer message",control:"sensor",report:"6D02",unit:null,options:{0:"None",1:"Wash finished",2:"Wash and dry finished",3:"Detergent empty",4:"Softener empty",5:"Rack-dry instructions",6:"Close the drawer",7:"Weighed, add powder detergent",8:"Drum too hot to open",9:"Water too high to open",10:"Too much foam, removing it",11:"Disinfectant empty",12:"Anion treatment done",13:"Detergent and softener empty",14:"Clean the drain filter",15:"Clean the dryer filter",17:"Run a drum clean",18:"Door opened, remote control off",19:"Cycle count reached, clean the drain filter",20:"Dry-cleaning reminder",21:"Use regular detergent",22:"Use concentrated detergent"}},dryerMessage:{name:"Dryer message",control:"sensor",report:"6D01",unit:null,options:{0:"None",1:"Ironing reminder",2:"Drying finished",3:"Clean the filter",4:"Empty the water box",5:"Sterilising",6:"Reserved message 1",7:"Reserved message 2"}},washerRemoteCtrValid:{name:"Washer remote ctr valid",control:"binary_sensor",report:"6D02",unit:null,options:null},dryerRemoteCtrValid:{name:"Dryer remote ctr valid",control:"binary_sensor",report:"6D01",unit:null,options:null},washerDoorStatus:{name:"Washer door status",control:"binary_sensor",report:"6D02",unit:null,options:null},dryerDoorStatus:{name:"Dryer door status",control:"binary_sensor",report:"6D01",unit:null,options:null},washerDoorLockStatus:{name:"Washer door lock status",control:"binary_sensor",report:"6D02",unit:null,options:null},dryerDoorLockStatus:{name:"Dryer door lock status",control:"binary_sensor",report:"6D01",unit:null,options:null},washerPowerStatus:{name:"Washer power status",control:"binary_sensor",report:"6D01",unit:null,options:null},dryerPowerStatus:{name:"Dryer power status",control:"binary_sensor",report:"6D01",unit:null,options:null},onOffStatus:{name:"Power",control:"switch",report:"6D01",unit:null,options:null},childLockStatus:{name:"Child lock status",control:"switch",report:"6D01",unit:null,options:null},laundryCycleStatus:{name:"Laundry cycle status",control:"binary_sensor",report:"6D02",unit:null,options:null},washerDryStatus:{name:"Washer dry status",control:"switch",report:"6D02",unit:null,options:null},remainingDetergentStatus:{name:"Remaining detergent status",control:"sensor",report:"6D02",unit:null,options:{0:"Unknown",1:"Yes",2:"No"}},remainingSoftenerStatus:{name:"Remaining softener status",control:"sensor",report:"6D02",unit:null,options:{0:"Unknown",1:"Yes",2:"No"}},washerDryMode:{name:"Washer dry mode",control:"select",report:"6D02",unit:null,options:{0:"No drying",1:"Strong dry",2:"Gentle dry",3:"Easy iron",4:"120 min dry",5:"90 min dry",6:"60 min dry",7:"30 min dry",8:"150 min dry",9:"180 min dry",10:"Smart dry",11:"210 min dry",12:"Reserved 1",13:"Reserved 2"}},dryerDryMode:{name:"Dryer dry mode",control:"select",report:"6D01",unit:null,options:{1:"Normal drying",2:"Eco drying",3:"Fast drying"}},totalWaterUsed:{name:"Total water used",control:"sensor",report:"6D02",unit:"L",options:null},washerTotalElectricityUsed:{name:"Washer total electricity used",control:"sensor",report:"6D02",unit:null,options:null},totalWashCycle:{name:"Total wash cycle",control:"sensor",report:"6D02",unit:null,options:null},currentWaterUsed:{name:"Current water used",control:"sensor",report:"6D02",unit:"L",options:null},washerCurrentElectricityUsed:{name:"Washer current electricity used",control:"sensor",report:"6D02",unit:"kWh",options:null}},pn="haismart",dt=["washer_start","washer_pause","washer_cancel","dryer_start","dryer_pause","dryer_cancel"],mn=["_laundry_cycle_phase","_dryer_cycle_phase"],Ut={select:0,switch:1,number:2,sensor:3,binary_sensor:4},ee=n=>n.slice(0,n.indexOf(".")),da=n=>n.slice(n.indexOf(".")+1),ie=n=>n.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");let Nt=new WeakMap;const fn=[];function ut(n){const e=n.entities??{};let t=Nt.get(e);if(t)return t;t=new Map;for(const a of Object.values(e)){if(a.platform!==pn||!a.device_id)continue;const i=t.get(a.device_id);i?i.push(a):t.set(a.device_id,[a])}return Nt.set(e,t),t}function be(n,e){return ut(n).get(e)??fn}function gn(n){const e=[];for(const t of ut(n).values())for(const a of t)e.push(a.entity_id);return e}function ua(n,e){const t=be(n,e);if(!t.length)return!1;for(const a of t){const i=n.states?.[a.entity_id]?.attributes?.haier_attribute;if(i==="laundryCyclePhase"||i==="dryerCyclePhase"||a.translation_key&&dt.includes(a.translation_key))return!0}return pa(e)?!0:t.some(a=>mn.some(i=>da(a.entity_id).endsWith(i)))}function ht(n){const e=ut(n),t=[];for(const a of Object.keys(n.devices??{}))e.has(a)&&ua(n,a)&&t.push(a);return t}function yn(n){return!!n&&!!n.entities&&!!n.devices&&!!n.states}function xe(n,e){if(!yn(n))return{kind:"loading"};if(e.device_id)return n.devices[e.device_id]?ua(n,e.device_id)?{kind:"ok",deviceId:e.device_id,candidates:[e.device_id]}:{kind:"not_laundry",deviceId:e.device_id,name:Re(n,e.device_id,void 0)}:{kind:"removed"};const t=ht(n);return t.length?{kind:"ok",deviceId:t[0],candidates:t}:{kind:"none"}}function Re(n,e,t="Laundry Centre"){const a=n.devices?.[e];return a?.name_by_user||a?.name||t}const Qe=new Map,ha="haismart-laundry-card:index:v1:";function _n(n){try{return globalThis.localStorage?.getItem(n)??null}catch{return null}}function bn(n,e){try{globalThis.localStorage?.setItem(n,e)}catch{}}function pa(n){const e=Qe.get(n);if(e)return e;const t=_n(ha+n);if(t)try{const a=JSON.parse(t);if(a&&a.deviceId===n&&a.attrs)return Qe.set(n,a),a}catch{}}function wn(n){Qe.set(n.deviceId,n),bn(ha+n.deviceId,JSON.stringify(n))}let jt=new WeakMap;const kn=Object.entries(J).map(([n,e])=>["_"+ie(e.name),n]);function ma(n,e){const t=be(n,e);let a=jt.get(n.entities);const i=a?.get(e);if(i&&i.devices===n.devices&&!t.some(w=>typeof n.states?.[w.entity_id]?.attributes?.haier_attribute=="string"&&!i.known.has(w.entity_id)))return i.index;const r=new Set(t.map(y=>y.entity_id)),o={},l=new Set,d={};let m,_=!1;for(const y of t){const w=y.entity_id,x=ee(w),D=n.states?.[w];if(x==="button"){y.translation_key&&dt.includes(y.translation_key)&&(d[y.translation_key]=w);continue}if(x==="binary_sensor"&&y.translation_key==="fault"&&(m=w),!D)continue;const A=D.attributes?.haier_attribute;if(typeof A!="string"||(l.add(w),Array.isArray(D.attributes.haier_attributes)&&!("haier_value"in D.attributes)))continue;_=!0;const O=o[A];(!O||(Ut[x]??9)<(Ut[ee(O)]??9))&&(o[A]=w)}m||(m=t.find(y=>ee(y.entity_id)==="binary_sensor"&&y.entity_id.endsWith("_fault"))?.entity_id);const c=pa(e);if(c)for(const[y,w]of Object.entries(c.attrs))!o[y]&&r.has(w)&&(o[y]=w);const g=[];for(const y of t){const w=y.entity_id;if(ee(w)==="button")continue;const D=da(w);for(const[A,O]of kn)o[O]||!D.endsWith(A)||(o[O]=w,g.push(O))}const f={washer:o.washerUnifiedProgramSettings?ee(o.washerUnifiedProgramSettings):void 0,dryer:o.dryerUnifiedProgramSettings?ee(o.dryerUnifiedProgramSettings):void 0},u={deviceId:e,attrs:o,buttons:d,fault:m,programDomain:f,live:_,slugOnly:g};if(_){const y={};for(const[w,x]of Object.entries(o))g.includes(w)||(y[w]=x);wn({...u,attrs:y,slugOnly:[]})}return a||(a=new Map,jt.set(n.entities,a)),a.set(e,{devices:n.devices,index:u,known:l}),u}function vn(n,e){const t=new Set(Object.values(n.attrs));for(const a of Object.values(n.buttons))a&&t.add(a);if(n.fault&&t.add(n.fault),!n.attrs.laundryCyclePhase&&!n.attrs.dryerCyclePhase)for(const a of be(e,n.deviceId))t.add(a.entity_id);return[...t]}const ae=6e4,$n=new Set([65,69,88,91]),xn=new Set([29,34,43,44]),Sn=new Set([12,13,17,25]),oe={};for(const n of[21,22,23,24,3,4,5,6])oe[n]="wash";for(const n of[7,8,9,10])oe[n]="rinse";oe[11]="spin";for(const n of[12,13,17,25])oe[n]="dry";oe[20]="care";const Dn={8:"sense",10:"sense",2:"dry",3:"dry",4:"dry",5:"cool",9:"care"},Xe={washer:{phase:"laundryCyclePhase",mode:"washerRunningMode",programme:"washerUnifiedProgramSettings",message:"washerMessage",remote:"washerRemoteCtrValid",door:"washerDoorStatus",doorLock:"washerDoorLockStatus",power:"washerPowerStatus",remaining:["remainingTimeHH","remainingTimeMM"],buttons:{start:"washer_start",pause:"washer_pause",cancel:"washer_cancel"}},dryer:{phase:"dryerCyclePhase",mode:"dryerRunningMode",programme:"dryerUnifiedProgramSettings",message:"dryerMessage",remote:"dryerRemoteCtrValid",door:"dryerDoorStatus",doorLock:"dryerDoorLockStatus",power:"dryerPowerStatus",remaining:["dryerRemainingDryTime","dryerRemainingResnTime","remainingAntiCreaseTime"],buttons:{start:"dryer_start",pause:"dryer_pause",cancel:"dryer_cancel"}}},An={washer:Object.values(Xe.washer).flat().filter(n=>typeof n=="string"),dryer:Object.values(Xe.dryer).flat().filter(n=>typeof n=="string")},q="mdi:information-outline",Ke={1:{category:"absorbed"},2:{category:"absorbed"},6:{category:"blocking",icon:"mdi:tray-alert"},7:{category:"blocking",icon:"mdi:spoon-sugar"},8:{category:"blocking",icon:"mdi:thermometer-alert"},9:{category:"blocking",icon:"mdi:waves-arrow-up"},3:{category:"supply",icon:"mdi:spray-bottle"},4:{category:"supply",icon:"mdi:bottle-tonic-outline"},11:{category:"supply",icon:"mdi:bottle-tonic-plus-outline"},13:{category:"supply",icon:"mdi:bottle-tonic-outline"},14:{category:"maintenance",icon:"mdi:air-filter"},15:{category:"maintenance",icon:"mdi:air-filter"},17:{category:"maintenance",icon:"mdi:washing-machine-alert"},19:{category:"maintenance",icon:"mdi:air-filter"},5:{category:"info",icon:q},10:{category:"info",icon:"mdi:chart-bubble"},12:{category:"info",icon:q},20:{category:"info",icon:q},21:{category:"info",icon:q},22:{category:"info",icon:q},18:{category:"hidden"}},Cn={2:{category:"absorbed"},3:{category:"maintenance",icon:"mdi:air-filter"},4:{category:"maintenance",icon:"mdi:cup-water"},1:{category:"info",icon:"mdi:iron-outline"},5:{category:"info",icon:"mdi:shield-check-outline"},6:{category:"hidden"},7:{category:"hidden"}},It=["blocking","supply","maintenance","info","unknown"],Se=new Set(["unavailable","unknown"]),et=n=>n.slice(0,n.indexOf("."));class Tn{constructor(e,t){this.hass=e,this.index=t,this.legacy=!1,this.legacyUnmapped=!1}read(e){const t=this.index.attrs[e],a=t?this.hass.states?.[t]:void 0;if(!a)return{value:void 0,fromLabel:!1,eid:t};const i={state:a.state,entity:a,eid:t};if(Se.has(a.state))return{...i,value:void 0,fromLabel:!1};const r=a.attributes??{};if("haier_value"in r){const l=r.haier_value;return{...i,value:l===null?void 0:l,fromLabel:!1}}this.legacy=!0;const o=Mn(e,t,a.state);return o===void 0&&(this.legacyUnmapped=!0),{...i,value:o,fromLabel:o!==void 0}}num(e){const t=this.read(e).value;return typeof t=="number"&&Number.isFinite(t)?t:typeof t=="boolean"?Number(t):void 0}bool(e){const t=this.read(e).value;return typeof t=="boolean"?t:typeof t=="number"?t!==0:void 0}}function Mn(n,e,t){const a=et(e),i=t.trim().toLowerCase();if(a==="binary_sensor"||a==="switch")return i==="on"?!0:i==="off"?!1:void 0;const r=J[n]?.options;if(r){for(const[l,d]of Object.entries(r))if(d.trim().toLowerCase()===i)return Number(l);return}const o=parseFloat(t);return Number.isFinite(o)?o:void 0}const ue=n=>{if(!n)return;const e=Date.parse(n);return Number.isFinite(e)?e:void 0};function En(n){return oe[n]}function Pn(n){return Dn[n]}function On(n,e){if(n.generic||n.sub==="maintenance")return null;const t=n.isDoneLike;if(!t&&n.status!=="running"&&n.status!=="estimating"&&n.status!=="paused")return null;let a,i;if(n.key==="washer"?(a=xn.has(n.programme.value??-1)?["dry"]:e?["wash","rinse","spin","dry"]:["wash","rinse","spin"],n.phase===20&&(a=[...a,"care"]),i=n.status==="estimating"?void 0:En(n.phase??-1)):(a=["sense","dry","cool"],n.phase===9&&(a=[...a,"care"]),i=n.status==="estimating"?"sense":Pn(n.phase??-1)),t)return a.map(o=>({key:o,state:"complete"}));const r=i?a.indexOf(i):-1;return a.map((o,l)=>({key:o,state:r<0?"upcoming":l<r?"complete":l===r?"current":"upcoming"}))}function fa(n,e,t={}){const a=t.now??Date.now(),i=t.memory??{},r=new Tn(n,e),o=r.read("laundryCyclePhase"),l=r.read("dryerCyclePhase"),d=b=>!b.entity||b.entity.state==="unavailable";let m=!1,_,c;if(o.entity||l.entity)m=d(o)&&d(l),m&&(c=ke([o.entity?.last_changed,l.entity?.last_changed]));else{const b=be(n,e.deviceId).filter(k=>k.entity_category!=="diagnostic"&&k.translation_key!=="cloud_connection"&&et(k.entity_id)!=="button").map(k=>n.states?.[k.entity_id]).filter(k=>!!k);m=b.every(k=>k.state==="unavailable"),m&&(c=ke(b.map(k=>k.last_changed)))}m?_="unavailable":r.bool("onOffStatus")===!1&&(m=!0,_="power",c=ke([r.read("onOffStatus").entity?.last_changed]));const g=e.fault?n.states?.[e.fault]:void 0,f={on:!1,faults:[],codeList:[],entity:e.fault};if(g&&g.state==="on"){f.on=!0;const b=g.attributes??{};f.faults=Array.isArray(b.faults)?b.faults.map(U=>String(U)):[];const k=Array.isArray(b.fault_codes)?b.fault_codes.map(U=>String(U)).filter(Boolean):[];k.length?f.codeList=k:b.error_code!==null&&b.error_code!==void 0&&b.error_code!==0&&b.error_code!=="0"&&(f.codeList=[String(b.error_code)]),f.codeList.length&&(f.codes=f.codeList.join(", "))}const u={detergent:r.read("remainingDetergentStatus"),softener:r.read("remainingSoftenerStatus")},y=r.bool("washerDryStatus"),w=r.bool("laundryCycleStatus"),x=(b,k,U)=>{const E=Xe[b],T=i[b]??={},gt=r.bool(E.power),Ue=r.num(E.mode),Ne=r.bool(E.remote),yt=r.read(E.remote),La=Ne===!0?"on":Ne===!1?"off":!yt.eid||!yt.entity?"missing":"unknown",Ua=r.bool(E.door),Na=r.bool(E.doorLock),ja=J[E.phase]?.options??{};let N,I,Z,_t,bt;if(b==="washer"){const S=r.read("remainingTimeHH"),C=r.read("remainingTimeMM");typeof S.value=="number"&&typeof C.value=="number"&&(N=S.value*60+C.value,I=ke([S.entity?.last_updated,C.entity?.last_updated]))}else{const S=r.read("dryerRemainingDryTime");typeof S.value=="number"&&(N=S.value,I=ue(S.entity?.last_updated)),Z=r.num("dryerRemainingResnTime"),_t=r.num("remainingAntiCreaseTime")}bt=N&&N>0?N:void 0;const R=r.read(E.programme),z=typeof R.value=="number"?R.value:void 0,Ia=J[E.programme]?.options??{};z!==void 0&&(T.progValue!==void 0&&T.progValue!==z&&(T.progChangedAt=ue(R.entity?.last_changed)??a),T.progValue=z);const Ha={value:z,label:z===void 0?void 0:R.entity&&!Se.has(R.entity.state)&&"haier_value"in(R.entity.attributes??{})?R.entity.state:Ia[String(z)]??R.entity?.state,entity:R.eid,domain:R.eid?et(R.eid):void 0,lastChanged:T.progChangedAt},$=typeof k.value=="number"?k.value:void 0,wt=k.entity?.state,Wa=!!U.entity&&!Se.has(U.entity.state);let v,je,we=!1;const kt=$!==void 0&&String($)in ja;m||gt===!1?v="off":wt==="unknown"||wt==="unavailable"&&Wa||!k.entity?v="stale":$===void 0?(we=!0,v=Ue===1||b==="washer"&&w===!0?"running":"idle"):$===0?v="idle":b==="washer"&&$===15||b==="dryer"&&$===1?v="delayed":b==="washer"&&($===14||$===18||$===19)||b==="dryer"&&$===6?v="done":b==="dryer"&&$===7||b==="washer"&&$===16?v="tumbling":kt?Ue===2?v="paused":b==="washer"&&($===1||$===2||$===26)||b==="dryer"&&($===8||$===10)?v="estimating":v="running":(we=!0,v="running"),!we&&(v==="running"||v==="paused"||v==="estimating")&&(b==="dryer"&&$===11?je="maintenance":(b==="washer"&&$===20||b==="dryer"&&$===9)&&(je="care"));const Ba=v==="running"||v==="estimating"||v==="paused",Ie=v==="done"||v==="tumbling";b==="washer"&&($===0?T.seenDry=!1:$!==void 0&&Sn.has($)&&(T.seenDry=!0));const Fa=b==="washer"&&($n.has(z??-1)||y===!0||T.seenDry===!0);let j,vt,He=v==="estimating"||k.fromLabel&&r.legacy;(v==="running"||v==="estimating")&&N!==void 0&&I!==void 0&&(j=I+N*ae);let We=N??0;v==="delayed"&&(b==="washer"?He=!0:Z!==void 0&&Z>0&&I!==void 0&&(We=Z+(N??0),j=I+We*ae,vt=I+Z*ae,He=!0)),j!==void 0&&T.finishRaw!==void 0&&T.status===v&&Math.abs(j-T.finishRaw)<2*ae&&(j=T.finishRaw),T.finishRaw=j,T.status=v;const za=j===void 0?void 0:We>120?Rn(j):j;let $t;if(Ie&&k.entity){const S=ue(k.entity.last_changed),C=An[b].map(L=>e.attrs[L]).map(L=>L?n.states?.[L]:void 0).filter(L=>!!L&&!Se.has(L.state)).map(L=>ue(L.last_changed)).filter(L=>L!==void 0),le=C.length?Math.min(...C):S;S!==void 0&&le!==void 0&&S-le>=5e3&&a-S<=1440*ae&&($t=S)}const Q=r.read(E.message),P=typeof Q.value=="number"?Q.value:void 0,X=[];let xt;if(P!==void 0&&P!==0){const S=(b==="washer"?Ke:Cn)[P];if(!S)X.push({value:P,text:Q.entity?.state,category:"unknown",icon:q,entity:Q.eid,source:"message"});else if(S.category!=="absorbed"&&S.category!=="hidden"){const C={key:`notice.${b==="washer"?"w":"d"}.${P}`,value:P,category:S.category,icon:S.icon??q,entity:Q.eid,source:"message"};b==="washer"&&(P===8||P===9)&&Ie?xt=C:X.push(C)}}b==="washer"&&(u.detergent.value===2&&P!==3&&P!==13&&X.push({key:"notice.w.3",value:3,category:"supply",icon:Ke[3].icon,entity:u.detergent.eid,source:"supply"}),u.softener.value===2&&P!==4&&P!==13&&X.push({key:"notice.w.4",value:4,category:"supply",icon:Ke[4].icon,entity:u.softener.eid,source:"supply"})),X.sort((S,C)=>It.indexOf(S.category)-It.indexOf(C.category));const Be=S=>{const C=e.buttons[S],le=C?n.states?.[C]:void 0;return le&&le.state!=="unavailable"?C:void 0},Fe={key:b,status:v,sub:je,generic:we,phase:$,phaseKnown:kt,mode:Ue,phaseEntity:k.eid,remaining:N,resn:Z,antiCrease:_t,anchor:I,finishAt:za,finishRaw:j,startsAt:vt,approximate:He,idleDuration:bt,programme:Ha,message:P,messageEntity:Q.eid,remote:Ne,remoteState:La,doorOpen:Ua,doorLocked:Na,power:gt,notices:X,blockingNotice:xt,steps:null,finishedAt:$t,buttons:{start:Be(E.buttons.start),pause:Be(E.buttons.pause),cancel:Be(E.buttons.cancel)},isActive:Ba,isDoneLike:Ie};return Fe.steps=On(Fe,Fa),Fe},D=x("washer",o,l),A=x("dryer",l,o),O=b=>{const k=r.read(b),U=k.entity?.attributes?.unit_of_measurement;return{value:typeof k.value=="number"?k.value:void 0,unit:typeof U=="string"&&U?U:void 0,entity:k.eid}},Ra=Object.values(e.buttons).some(b=>!!b&&!!n.states?.[b]);return{deviceId:e.deviceId,machineOff:m,offReason:_,offSince:c,washer:D,dryer:A,fault:f,childLock:r.bool("childLockStatus"),controlsExist:Ra,legacy:r.legacy,legacyUnmapped:r.legacyUnmapped,totals:{water:O("totalWaterUsed"),energy:O("washerTotalElectricityUsed"),cycles:O("totalWashCycle"),cycleWater:O("currentWaterUsed"),cycleEnergy:O("washerCurrentElectricityUsed")},now:a}}function ke(n){let e;for(const t of n){const a=ue(t);a!==void 0&&(e===void 0||a>e)&&(e=a)}return e}function Rn(n){const e=5*ae;return Math.round(n/e)*e}function Ln(n){switch(n.status){case"idle":return n.generic?{}:{primary:"start"};case"running":case"estimating":return{primary:"pause",secondary:"cancel"};case"paused":return{primary:"resume",secondary:"cancel"};case"delayed":return{secondary:"cancel_scheduled"};case"tumbling":return n.key==="dryer"?{secondary:"stop"}:{};default:return{}}}function Un(n){return n==="start"||n==="resume"?"start":n==="pause"?"pause":"cancel"}function tt(n,e){return n.buttons[Un(e)]}function ga(n,e,t,a){if(e.remote!==!0)return"remote";if(a.sending&&a.sending!==e.key)return"busy";if((a.pending?new Set(a.pending):new Set).has(e.key))return"pending";if((t==="start"||t==="resume")&&n.fault.on)return"fault";if(t==="start"){if(e.doorOpen===!0)return"door";if(!e.programme.value)return"programme";if(e.programme.lastChanged!==void 0&&a.now-e.programme.lastChanged<5e3)return"applying"}return null}function Nn(n,e){switch(n){case"start":return e.status==="running"||e.status==="estimating"||e.status==="delayed";case"resume":return(e.status==="running"||e.status==="estimating")&&e.mode===1;case"pause":return e.mode===2||e.status==="paused";case"stop":return e.phase!==void 0&&e.status!=="stale"&&e.status!=="off"&&e.phase!==7;case"cancel_scheduled":return e.phase!==void 0&&e.status!=="stale"&&e.status!=="off"&&e.status!=="delayed";default:return e.phase===0}}function jn(n){return[n.washer,n.dryer].some(e=>e.status==="running"||e.status==="estimating"||e.status==="delayed")}const Ht=" does not accept that setting: ",Ve="Could not send the command to ",In=[["remote control is not enabled","err.remote_off"],["remote control was switched off","err.remote_off"],["no fresh report","err.no_report"],["laundry controls are off","err.controls_off"],["is running or its state is unknown","err.running"],["has not read","err.no_status"]];function qe(n){const e=n.toLowerCase();for(const[t,a]of In)if(e.includes(t))return a}function Hn(n){const e=n??{},t=typeof e.message=="string"?e.message:typeof n=="string"?n:"",a=e.code,i=typeof e.translation_key=="string"?e.translation_key:void 0;if(i&&(e.translation_domain===void 0||e.translation_domain==="haismart")){const d=typeof e.translation_placeholders?.error=="string"?e.translation_placeholders.error:"";if(i==="no_status")return{key:"err.no_status",detail:H(d||t)};if(i==="control_rejected")return{key:qe(d||t)??"err.generic",detail:H(d||Ye(t).rest)};if(i==="control_failed")return{key:qe(d)??"err.unreachable",detail:H(d||Ye(t).rest)}}if(!t||a===3||a==="connection_lost"||e.error==="connection_lost")return{key:"err.ha_unreachable",detail:H(t)};const{rest:r,failed:o}=Ye(t),l=qe(r);return l?{key:l,detail:H(r)}:t.toLowerCase().includes("has not read")?{key:"err.no_status",detail:H(r)}:o?{key:"err.unreachable",detail:H(r)}:{key:"err.generic",detail:H(r)}}function Ye(n){const e=n.indexOf(Ht);if(e>=0)return{rest:n.slice(e+Ht.length),failed:!1};if(n.startsWith(Ve)){const t=n.indexOf(": ",Ve.length);return{rest:t>=0?n.slice(t+2):n.slice(Ve.length),failed:!0}}return{rest:n,failed:!1}}function H(n){const e=n.trim().replace(/\s--\s/g," — ").replace(/--/g,"—");return e?e.charAt(0).toUpperCase()+e.slice(1):""}const Wn=45e3,Bn=3e3;class Fn{constructor(e){this.host=e,this.states=new Map,this.timers=new Map}get(e){return this.states.get(e)}get sending(){return this.sendingDrum}get pending(){return[...this.states.values()].filter(e=>e.phase==="sending"||e.phase==="waiting").map(e=>e.drum)}isBusy(e){const t=this.states.get(e);return!!t&&(t.phase==="sending"||t.phase==="waiting")}async run(e,t,a,i){if(this.sendingDrum||this.isBusy(t))return;this.clearTimer(t),this.states.set(t,{drum:t,cmd:a,phase:"sending",entity:i}),this.sendingDrum=t,this.host.requestUpdate();try{await e.callService("button","press",{entity_id:i},void 0,!1)}catch(o){const l=Hn(o);this.sendingDrum=void 0,this.states.set(t,{drum:t,cmd:a,phase:"error",entity:i,error:l}),this.host.onError?.(t,a,l),this.host.requestUpdate();return}this.sendingDrum=void 0;const r=this.states.get(t);r&&r.phase==="sending"&&(r.phase="waiting",r.deadline=Date.now()+Wn,this.armTimer(r)),this.host.requestUpdate()}armTimer(e){if(e.deadline===void 0)return;const{drum:t}=e,a=Math.max(0,e.deadline-Date.now());e.phase==="waiting"?this.setTimer(t,a,()=>{const i=this.states.get(t);i&&i.phase==="waiting"&&(i.phase="unconfirmed",i.deadline=void 0,this.host.onUnconfirmed?.(t,i.cmd),this.host.requestUpdate())}):e.phase==="confirmed"&&this.setTimer(t,a,()=>{this.states.get(t)?.phase==="confirmed"&&this.states.delete(t),this.host.requestUpdate()})}resume(){for(const e of this.states.values())this.timers.has(e.drum)||this.armTimer(e)}observe(e){for(const t of e){const a=this.states.get(t.key);a&&(a.phase==="waiting"&&Nn(a.cmd,t)?(a.phase="confirmed",a.deadline=Date.now()+Bn,this.host.onConfirmed?.(t.key,a.cmd),this.armTimer(a),this.host.requestUpdate()):a.phase==="error"&&(a.statusAtError===void 0?a.statusAtError=t.status:a.statusAtError!==t.status&&(this.states.delete(t.key),this.host.requestUpdate())))}}dismiss(e){const t=this.states.get(e);t&&(t.phase==="error"||t.phase==="unconfirmed"||t.phase==="confirmed")&&(this.clearTimer(e),this.states.delete(e),this.host.requestUpdate())}dispose(){for(const e of[...this.timers.keys()])this.clearTimer(e)}setTimer(e,t,a){this.clearTimer(e),this.timers.set(e,setTimeout(()=>{this.timers.delete(e),a()},t))}clearTimer(e){const t=this.timers.get(e);t!==void 0&&clearTimeout(t),this.timers.delete(e)}}const zn={"drum.washer":"Washer","drum.washer_lc":"washer","drum.dryer":"Dryer","drum.dryer_lc":"dryer","card.default_title":"Laundry Centre","card.sample":"Sample","status.ready":"Idle","status.off":"Off","status.waiting":"Waiting…","status.stale_support":"No update from the {drum} yet","status.paused":"Paused","status.scheduled":"Scheduled","status.done":"Done","status.running":"Running","status.finishing":"Finishing…","eyebrow.phase":"{Drum} · {phase}","eyebrow.estimating":"{Drum} · Estimating time…","eyebrow.paused":"{Drum} · Paused during {phase}","eyebrow.finished":"{Drum} · Finished","eyebrow.anticrease":"{Drum} · Anti-crease","eyebrow.tumbling":"{Drum} · Tumbling","eyebrow.maintenance":"{Drum} · Maintenance","eyebrow.care":"{Drum} · Care","support.no_programme":"No programme selected","support.pick_hint":"Choose a programme, then Start","support.in":"in {d}","support.about":"about {d}","support.done_at":"done {time}","support.est_dryer":"estimate improves once drying starts","support.est_washer":"estimate updates after weighing","support.paused":"{d} left when resumed","support.finishes_about":"Finishes in about {d}","support.finished_at":"Finished {time}","support.ready_unload":"Ready to unload","support.door_locked":"Door still locked","support.anticrease_short":"tumbling to prevent creases","support.tumble_washer":"tumbling to loosen clothes","support.maintenance_short":"Self-maintenance cycle","support.care_short":"Keeping laundry fresh","phase.working":"Working","time.tomorrow":"tomorrow","dur.h":"h","dur.min":"min","a11y.hours":"hours","a11y.minutes":"minutes","a11y.hour":"hour","a11y.minute":"minute","phase.w.0":"Idle","phase.w.1":"Weighing","phase.w.2":"Checking the load","phase.w.3":"Filling","phase.w.4":"Heating water","phase.w.5":"Washing","phase.w.6":"Draining","phase.w.7":"Spinning","phase.w.8":"Filling for rinse","phase.w.9":"Rinsing","phase.w.10":"Draining","phase.w.11":"Final spin","phase.w.12":"Drying","phase.w.13":"Cooling down","phase.w.14":"Finished","phase.w.15":"Scheduled","phase.w.16":"Tumbling","phase.w.17":"Drying","phase.w.18":"Finished","phase.w.19":"Finished","phase.w.20":"Care","phase.w.21":"Filling for pre-wash","phase.w.22":"Pre-wash","phase.w.23":"Heating pre-wash","phase.w.24":"Draining","phase.w.25":"Air drying","phase.w.26":"Detecting load","phase.d.0":"Idle","phase.d.1":"Scheduled","phase.d.2":"Drying with cool air","phase.d.3":"Drying","phase.d.4":"Drying","phase.d.5":"Cooling down","phase.d.6":"Finished","phase.d.7":"Anti-crease","phase.d.8":"Sensing load","phase.d.9":"Care","phase.d.10":"Pre-drying","phase.d.11":"Maintenance","step.wash":"Wash","step.rinse":"Rinse","step.spin":"Spin","step.dry":"Dry","step.sense":"Sense","step.cool":"Cool","step.care":"Care","a11y.progress":"Progress","a11y.step_complete":"complete","a11y.step_current":"current","a11y.step_upcoming":"not started","a11y.sentence":"{Drum}: {parts}","a11y.ready":"idle","a11y.off":"off","a11y.waiting":"waiting for an update","a11y.running":"running","a11y.estimating":"running, estimating time","a11y.paused":"paused","a11y.scheduled":"scheduled","a11y.done":"done","a11y.tumbling":"done, tumbling","a11y.finishes_around":"finishes around {time}","a11y.starts_in":"starts in {d}","a11y.in_about":"in about {d}","a11y.left":"{d} left","a11y.finished_at":"finished {time}","a11y.programme":"programme {programme}","a11y.fault":"machine reports a problem","a11y.drum_done":"{Drum} is done","a11y.child_lock":"Child lock on","a11y.open_device":"Open device page","a11y.show_drum":"Show {drum}","a11y.notice":"Notice","head.attention":"Needs attention","head.off":"Machine is off · since {time}","head.all_ready":"Laundry is ready","head.drum_ready":"{Drum} is ready to unload","head.drum_ready_other":"{Drum} is ready · {other} finishes {time}","head.all_done_by":"All done by {time}","head.drum_done":"{Drum} finishes {time}","head.drum_paused":"{Drum} paused","head.drum_scheduled":"{Drum} scheduled","head.waiting":"Waiting for an update","head.ready":"Idle","off.title":"Machine is off","off.since":"since {time}","off.explain":"It turns off Wi-Fi after each cycle. It will appear here when you switch it on.","off.explain_power":"Switch it on at the machine to start a cycle.","fault.title":"Machine reports a problem","fault.more":"+{n} more","fault.code":"Code {code}","fault.no_detail":"Check the machine's display for details","notice.w.3":"Detergent empty","notice.w.4":"Softener empty","notice.w.5":"Rack-dry instructions","notice.w.6":"Close the drawer","notice.w.7":"Add powder detergent now","notice.w.8":"Drum too hot to open","notice.w.9":"Water too high to open","notice.w.10":"Too much foam, removing it","notice.w.11":"Disinfectant empty","notice.w.12":"Anion treatment done","notice.w.13":"Detergent and softener empty","notice.w.14":"Clean the drain filter","notice.w.15":"Clean the dryer filter","notice.w.17":"Run a drum clean","notice.w.19":"Cycle count reached: clean the drain filter","notice.w.20":"Dry-cleaning reminder","notice.w.21":"Use regular detergent","notice.w.22":"Use concentrated detergent","notice.d.1":"Ironing reminder","notice.d.3":"Clean the filter","notice.d.4":"Empty the water box","notice.d.5":"Sterilising","notice.more":"+{n} more","notice.less":"Show less","ctl.start":"Start","ctl.resume":"Resume","ctl.pause":"Pause","ctl.cancel":"Cancel","ctl.start_prog":"Start {programme}","ctl.cancel_drum":"Cancel the {drum} cycle","ctl.cancel_scheduled":"Cancel scheduled cycle","ctl.stop_tumbling":"Stop tumbling","ctl.starting":"Starting…","ctl.resuming":"Resuming…","ctl.pausing":"Pausing…","ctl.cancelling":"Cancelling…","ctl.stopping":"Stopping…","ctl.waiting":"Waiting for the {drum} to confirm…","ctl.ok_started":"{Drum} started","ctl.ok_resumed":"{Drum} resumed","ctl.ok_paused":"{Drum} paused","ctl.ok_cancelled":"{Drum} cycle cancelled","ctl.ok_stopped":"Tumbling stopped","ctl.unconfirmed":"The {drum} hasn't confirmed the change yet. Check the machine before trying again.","ctl.dismiss":"Dismiss","ctl.available":"{Drum} controls available","gate.busy":"Busy: sending to the {other}","gate.fault":"Clear the fault before starting","gate.door":"Close the door to start","gate.programme":"Pick a programme first","gate.applying":"Applying programme…","remote.off":"Remote control is off at the {drum} panel","remote.door":"Remote control turned off when the door was opened. Turn it on again at the {drum} panel.","remote.help_label":"How to turn on remote control","remote.help":"For safety, the machine only accepts commands from Home Assistant after remote control is turned on at the {drum} panel. Turn it on there (the machine's manual shows how), then try again.","remote.on":"Remote control on","dlg.cancel_w_title":"Cancel the washer cycle?","dlg.cancel_w_body":"{programme} stops now and can't be resumed. The washer returns to standby. Water may need to drain before the door unlocks.","dlg.cancel_d_title":"Cancel the dryer cycle?","dlg.cancel_d_body":"{programme} stops now and can't be resumed. The dryer returns to standby.","dlg.this_cycle":"This cycle","dlg.keep_washing":"Keep washing","dlg.keep_drying":"Keep drying","dlg.cancel_cycle":"Cancel cycle","dlg.sched_title":"Cancel the scheduled {drum} cycle?","dlg.sched_body":"The {drum} won't start. You can set it again at the machine.","dlg.keep_scheduled":"Keep it scheduled","dlg.tumble_title":"Stop anti-crease tumbling?","dlg.tumble_body":"The clothes are already dry. The dryer stops tumbling and returns to standby.","dlg.keep_tumbling":"Keep tumbling","dlg.start_title":"Start the {drum}?","dlg.start_confirm":"Start {drum}","dlg.takes_about":"Takes about {d}","dlg.door_closed":"Door closed","dlg.not_now":"Not now","dlg.changed":"The {drum}'s state changed. Close and check again.","err.title":"The {drum} didn't accept that","err.remote_off":"Remote control is off at the {drum} panel. Turn it on there, then try again.","err.no_report":"Couldn't get a fresh reading from the {drum}. Try again in a moment.","err.controls_off":"Controls are turned off in the haismart integration options.","err.running":"Pause or cancel the {drum} before changing the programme.","err.no_status":"Home Assistant hasn't read the machine yet. Wait a moment and try again.","err.unreachable":"Couldn't reach the machine. Check it's switched on and try again.","err.ha_unreachable":"Couldn't reach Home Assistant. Check your connection and try again.","err.generic":"The command wasn't sent.","err.details":"Details","err.retry":"Try again","tot.cycle":"This cycle {water} L · {energy}","tot.total":"Total {water} L · {energy} · {n} {washes}","tot.wash_one":"wash","tot.wash_other":"washes","setup.none_title":"No Haier laundry centre found","setup.none_body":"Add it with the haismart integration, then refresh.","setup.removed_title":"The selected laundry centre was removed","setup.removed_body":"Choose another in the card settings.","setup.not_laundry":"{name} isn't a washer or dryer","setup.not_laundry_body":"Choose your laundry centre in the card settings.","setup.edit_hint":"Open the card settings to fix this.","setup.config_error":"Card configuration error","ed.device":"Laundry centre","ed.device_helper":"Leave empty to pick automatically. Laundry centres found: {name}","ed.device_helper_none":"Leave empty to pick automatically","ed.title":"Title","ed.layout":"Layout","ed.layout_helper":"Automatic adapts to the card's width.","ed.layout_auto":"Automatic","ed.layout_full":"Side by side","ed.layout_stacked":"Stacked","ed.layout_compact":"Compact","ed.time":"Show time as","ed.time_both":"Finish time and time left","ed.time_finish":"Finish time only","ed.time_remaining":"Time left only","ed.drums":"Drums","ed.drums_both":"Both","ed.drums_washer":"Washer only","ed.drums_dryer":"Dryer only","ed.order":"Order","ed.order_washer_first":"Washer first","ed.order_dryer_first":"Dryer first","ed.advanced":"Advanced","ed.collapse_idle":"Collapse the idle drum on small screens","ed.show_notices":"Show notices","ed.show_stepper":"Show phase steps","ed.show_totals":"Show water and energy totals","ed.show_controls":"Show controls","ed.show_controls_auto":"When available","ed.show_controls_never":"Never","ed.confirm_start":"Ask before starting a cycle","ed.confirm_start_helper":"Cancel always asks. This can't be turned off.","ed.off_style":"When the machine is off","ed.off_style_keep":"Keep layout","ed.off_style_collapse":"One line","ed.language":"Language","ed.language_auto":"Follow Home Assistant","ed.language_en":"English","ed.language_ms":"Bahasa Melayu","ed.tap_action":"Tap action","ed.detected":"Detected","det.device":"Device: {name} · {n} entities","det.washer":"Washer: {found}","det.dryer":"Dryer: {found}","det.found":"found","det.not_found":"not found","det.on":"on","det.off":"off","det.controls_on":"Controls: on","det.controls_off":"Controls: off. Turn on Settings › Devices & services › haismart › Configure › Enable washer and dryer controls.","det.remote":"Remote control: washer {w}, dryer {d}","det.remote_unknown":"Remote control: unknown while the machine is off","det.full":"Component: full support","det.legacy":"Component: labels only. Update haismart for the most accurate status.","det.fault":"Fault sensor: {found}","det.multi":"More than one laundry centre found. Pick one so the card doesn't switch.","det.hidden":"Hidden or disabled buttons don't appear on the card.","det.remote_both_off":"Buttons stay disabled until remote control is on at the machine.","det.none":"No laundry centre detected yet.","head.drum_running":"{Drum} running","support.finished_lc":"finished {time}","support.ready_unload_lc":"ready to unload","support.unload_any_time":"Unload any time","support.anticrease_left":"{n} min of anti-crease left","support.starts_at":"Starts {time}","support.done_around":"done {time}","a11y.takes_about":"takes about {d}","a11y.finishes_in_about":"finishes in about {d}","a11y.paused_during":"paused during {phase}","a11y.anticrease_left":"{d} of anti-crease left","a11y.remote_on":"remote control on","a11y.hide_drum":"Hide {drum}","a11y.open_device_for":"Open device page for {name}","a11y.dialog_closed_off":"The machine turned off. The dialog was closed.","head.drum_ready_other_paused":"{Drum} is ready · {other} paused","remote.unknown":"Can't read the remote-control status for the {drum}. Controls stay off until it reports.","remote.missing":"Can't read the remote-control status for the {drum}: its entity is missing or disabled.","remote.open_device":"Open device page","ctl.cancel_scheduled_drum":"Cancel the scheduled {drum} cycle","ctl.stop_drum":"Stop tumbling","prog.chip_label":"Programme: {programme}. Change programme","prog.chip_label_none":"No programme selected. Choose a programme","notice.more_label_one":"Show {n} more notice","notice.more_label_other":"Show {n} more notices","fault.more_label_one":"Show {n} more fault","fault.more_label_other":"Show {n} more faults","fault.details":"Fault details","fault.with_code":"{fault} · code {code}","compact.attention":"Machine reports a problem"},Kn={"drum.washer":"Mesin basuh","drum.washer_lc":"mesin basuh","drum.dryer":"Pengering","drum.dryer_lc":"pengering","card.default_title":"Pusat Dobi","card.sample":"Contoh","status.ready":"Tidak aktif","status.off":"Mati","status.waiting":"Menunggu…","status.stale_support":"Belum ada kemas kini daripada {drum}","status.paused":"Dijeda","status.scheduled":"Dijadualkan","status.done":"Siap","status.running":"Sedang berjalan","status.finishing":"Hampir siap…","eyebrow.phase":"{Drum} · {phase}","eyebrow.estimating":"{Drum} · Menganggar masa…","eyebrow.paused":"{Drum} · Dijeda semasa {phase}","eyebrow.finished":"{Drum} · Siap","eyebrow.anticrease":"{Drum} · Anti-kedut","eyebrow.tumbling":"{Drum} · Berpusing","eyebrow.maintenance":"{Drum} · Penyelenggaraan","eyebrow.care":"{Drum} · Penjagaan","support.no_programme":"Tiada program dipilih","support.pick_hint":"Pilih program, kemudian tekan Mula","support.in":"dalam {d}","support.about":"kira-kira {d}","support.done_at":"siap {time}","support.est_dryer":"anggaran bertambah tepat apabila pengeringan bermula","support.est_washer":"anggaran dikemas kini selepas menimbang","support.paused":"Baki {d} apabila disambung","support.finishes_about":"Siap dalam kira-kira {d}","support.finished_at":"Siap {time}","support.ready_unload":"Sedia dikeluarkan","support.door_locked":"Pintu masih berkunci","support.anticrease_short":"berpusing untuk elak kedut","support.tumble_washer":"berpusing untuk melonggarkan pakaian","support.maintenance_short":"Kitaran penyelenggaraan sendiri","support.care_short":"Mengekalkan kesegaran pakaian","phase.working":"Sedang berjalan","time.tomorrow":"esok","dur.h":"j","dur.min":"min","a11y.hours":"jam","a11y.minutes":"minit","a11y.hour":"jam","a11y.minute":"minit","phase.w.0":"Tidak aktif","phase.w.1":"Menimbang","phase.w.2":"Menyemak muatan","phase.w.3":"Mengisi air","phase.w.4":"Memanaskan air","phase.w.5":"Mencuci","phase.w.6":"Menyalirkan air","phase.w.7":"Memerah","phase.w.8":"Mengisi air bilasan","phase.w.9":"Membilas","phase.w.10":"Menyalirkan air","phase.w.11":"Perahan akhir","phase.w.12":"Mengering","phase.w.13":"Menyejukkan","phase.w.14":"Siap","phase.w.15":"Dijadualkan","phase.w.16":"Berpusing","phase.w.17":"Mengering","phase.w.18":"Siap","phase.w.19":"Siap","phase.w.20":"Penjagaan","phase.w.21":"Mengisi air pra-basuh","phase.w.22":"Pra-basuh","phase.w.23":"Memanaskan air pra-basuh","phase.w.24":"Menyalirkan air","phase.w.25":"Pengeringan udara","phase.w.26":"Mengesan muatan","phase.d.0":"Tidak aktif","phase.d.1":"Dijadualkan","phase.d.2":"Mengering dengan udara sejuk","phase.d.3":"Mengering","phase.d.4":"Mengering","phase.d.5":"Menyejukkan","phase.d.6":"Siap","phase.d.7":"Anti-kedut","phase.d.8":"Mengesan muatan","phase.d.9":"Penjagaan","phase.d.10":"Pra-pengeringan","phase.d.11":"Penyelenggaraan","step.wash":"Basuh","step.rinse":"Bilas","step.spin":"Perah","step.dry":"Kering","step.sense":"Kesan","step.cool":"Sejuk","step.care":"Jaga","a11y.progress":"Kemajuan","a11y.step_complete":"selesai","a11y.step_current":"semasa","a11y.step_upcoming":"belum bermula","a11y.sentence":"{Drum}: {parts}","a11y.ready":"tidak aktif","a11y.off":"mati","a11y.waiting":"menunggu kemas kini","a11y.running":"sedang berjalan","a11y.estimating":"sedang berjalan, menganggar masa","a11y.paused":"dijeda","a11y.scheduled":"dijadualkan","a11y.done":"siap","a11y.tumbling":"siap, sedang berpusing","a11y.finishes_around":"siap sekitar {time}","a11y.starts_in":"mula dalam {d}","a11y.in_about":"dalam kira-kira {d}","a11y.left":"baki {d}","a11y.finished_at":"siap {time}","a11y.programme":"program {programme}","a11y.fault":"mesin melaporkan masalah","a11y.drum_done":"{Drum} sudah siap","a11y.child_lock":"Kunci kanak-kanak hidup","a11y.open_device":"Buka halaman peranti","a11y.show_drum":"Papar {drum}","a11y.notice":"Notis","head.attention":"Perlu perhatian","head.off":"Mesin dimatikan · sejak {time}","head.all_ready":"Cucian sudah siap","head.drum_ready":"{Drum} sedia dikeluarkan","head.drum_ready_other":"{Drum} sudah siap · {other} dijangka siap {time}","head.all_done_by":"Semua siap menjelang {time}","head.drum_done":"{Drum} dijangka siap {time}","head.drum_paused":"{Drum} dijeda","head.drum_scheduled":"{Drum} dijadualkan","head.waiting":"Menunggu kemas kini","head.ready":"Tidak aktif","off.title":"Mesin dimatikan","off.since":"sejak {time}","off.explain":"Mesin memutuskan Wi-Fi selepas setiap kitaran. Ia akan muncul di sini apabila dihidupkan.","off.explain_power":"Hidupkan mesin untuk memulakan kitaran.","fault.title":"Mesin melaporkan masalah","fault.more":"+{n} lagi","fault.code":"Kod {code}","fault.no_detail":"Semak paparan mesin untuk butiran","notice.w.3":"Detergen habis","notice.w.4":"Pelembut fabrik habis","notice.w.5":"Arahan pengeringan rak","notice.w.6":"Tutup laci","notice.w.7":"Masukkan detergen serbuk sekarang","notice.w.8":"Dram terlalu panas untuk dibuka","notice.w.9":"Paras air terlalu tinggi untuk dibuka","notice.w.10":"Terlalu banyak buih, sedang dibuang","notice.w.11":"Pembasmi kuman habis","notice.w.12":"Rawatan anion selesai","notice.w.13":"Detergen dan pelembut habis","notice.w.14":"Bersihkan penapis saliran","notice.w.15":"Bersihkan penapis pengering","notice.w.17":"Jalankan pembersihan dram","notice.w.19":"Had kitaran dicapai: bersihkan penapis saliran","notice.w.20":"Peringatan cucian kering","notice.w.21":"Gunakan detergen biasa","notice.w.22":"Gunakan detergen pekat","notice.d.1":"Peringatan seterika","notice.d.3":"Bersihkan penapis","notice.d.4":"Kosongkan bekas air","notice.d.5":"Sedang mensteril","notice.more":"+{n} lagi","notice.less":"Kurangkan","ctl.start":"Mula","ctl.resume":"Sambung","ctl.pause":"Jeda","ctl.cancel":"Batal","ctl.start_prog":"Mulakan {programme}","ctl.cancel_drum":"Batalkan kitaran {drum}","ctl.cancel_scheduled":"Batalkan kitaran berjadual","ctl.stop_tumbling":"Hentikan putaran","ctl.starting":"Memulakan…","ctl.resuming":"Menyambung…","ctl.pausing":"Menjeda…","ctl.cancelling":"Membatalkan…","ctl.stopping":"Menghentikan…","ctl.waiting":"Menunggu pengesahan {drum}…","ctl.ok_started":"{Drum} dimulakan","ctl.ok_resumed":"{Drum} disambung","ctl.ok_paused":"{Drum} dijeda","ctl.ok_cancelled":"Kitaran {drum} dibatalkan","ctl.ok_stopped":"Putaran dihentikan","ctl.unconfirmed":"{Drum} belum mengesahkan perubahan. Semak mesin sebelum mencuba lagi.","ctl.dismiss":"Tutup","ctl.available":"Kawalan {drum} tersedia","gate.busy":"Sibuk: menghantar ke {other}","gate.fault":"Selesaikan masalah sebelum mula","gate.door":"Tutup pintu untuk mula","gate.programme":"Pilih program dahulu","gate.applying":"Menetapkan program…","remote.off":"Kawalan jauh dimatikan di panel {drum}","remote.door":"Kawalan jauh dimatikan apabila pintu dibuka. Hidupkan semula di panel {drum}.","remote.help_label":"Cara menghidupkan kawalan jauh","remote.help":"Demi keselamatan, mesin hanya menerima arahan daripada Home Assistant selepas kawalan jauh dihidupkan di panel {drum}. Hidupkannya di sana (lihat manual mesin untuk caranya), kemudian cuba lagi.","remote.on":"Kawalan jauh hidup","dlg.cancel_w_title":"Batalkan kitaran mesin basuh?","dlg.cancel_w_body":"{programme} akan berhenti sekarang dan tidak boleh disambung. Mesin basuh kembali ke mod sedia. Air mungkin perlu disalirkan sebelum pintu boleh dibuka.","dlg.cancel_d_title":"Batalkan kitaran pengering?","dlg.cancel_d_body":"{programme} akan berhenti sekarang dan tidak boleh disambung. Pengering kembali ke mod sedia.","dlg.this_cycle":"Kitaran ini","dlg.keep_washing":"Teruskan mencuci","dlg.keep_drying":"Teruskan mengering","dlg.cancel_cycle":"Batalkan kitaran","dlg.sched_title":"Batalkan kitaran berjadual {drum}?","dlg.sched_body":"{Drum} tidak akan bermula. Anda boleh menetapkannya semula di mesin.","dlg.keep_scheduled":"Kekalkan jadual","dlg.tumble_title":"Hentikan putaran anti-kedut?","dlg.tumble_body":"Pakaian sudah kering. Pengering berhenti berpusing dan kembali ke mod sedia.","dlg.keep_tumbling":"Teruskan berpusing","dlg.start_title":"Mulakan {drum}?","dlg.start_confirm":"Mulakan {drum}","dlg.takes_about":"Mengambil masa kira-kira {d}","dlg.door_closed":"Pintu ditutup","dlg.not_now":"Bukan sekarang","dlg.changed":"Keadaan {drum} telah berubah. Tutup dan semak semula.","err.title":"{Drum} tidak menerima arahan itu","err.remote_off":"Kawalan jauh dimatikan di panel {drum}. Hidupkannya, kemudian cuba lagi.","err.no_report":"Tidak dapat bacaan terkini daripada {drum}. Cuba lagi sebentar nanti.","err.controls_off":"Kawalan dimatikan dalam tetapan integrasi haismart.","err.running":"Jeda atau batalkan {drum} sebelum menukar program.","err.no_status":"Home Assistant belum membaca mesin. Tunggu sebentar dan cuba lagi.","err.unreachable":"Tidak dapat menghubungi mesin. Pastikan ia dihidupkan dan cuba lagi.","err.ha_unreachable":"Tidak dapat menghubungi Home Assistant. Semak sambungan anda dan cuba lagi.","err.generic":"Arahan tidak dihantar.","err.details":"Butiran","err.retry":"Cuba lagi","tot.cycle":"Kitaran ini {water} L · {energy}","tot.total":"Jumlah {water} L · {energy} · {n} {washes}","tot.wash_one":"cucian","tot.wash_other":"cucian","setup.none_title":"Tiada pusat dobi Haier ditemui","setup.none_body":"Tambahkannya melalui integrasi haismart, kemudian muat semula.","setup.removed_title":"Pusat dobi yang dipilih telah dibuang","setup.removed_body":"Pilih yang lain dalam tetapan kad.","setup.not_laundry":"{name} bukan mesin basuh atau pengering","setup.not_laundry_body":"Pilih pusat dobi anda dalam tetapan kad.","setup.edit_hint":"Buka tetapan kad untuk membetulkannya.","setup.config_error":"Ralat konfigurasi kad","ed.device":"Pusat dobi","ed.device_helper":"Biarkan kosong untuk dipilih secara automatik. Pusat dobi dijumpai: {name}","ed.device_helper_none":"Biarkan kosong untuk dipilih secara automatik","ed.title":"Tajuk","ed.layout":"Susun atur","ed.layout_helper":"Automatik menyesuaikan dengan lebar kad.","ed.layout_auto":"Automatik","ed.layout_full":"Sebelah-menyebelah","ed.layout_stacked":"Bertindan","ed.layout_compact":"Padat","ed.time":"Paparkan masa sebagai","ed.time_both":"Masa siap dan baki masa","ed.time_finish":"Masa siap sahaja","ed.time_remaining":"Baki masa sahaja","ed.drums":"Dram","ed.drums_both":"Kedua-dua","ed.drums_washer":"Mesin basuh sahaja","ed.drums_dryer":"Pengering sahaja","ed.order":"Susunan","ed.order_washer_first":"Mesin basuh dahulu","ed.order_dryer_first":"Pengering dahulu","ed.advanced":"Lanjutan","ed.collapse_idle":"Kecilkan dram yang tidak aktif pada skrin kecil","ed.show_notices":"Papar notis","ed.show_stepper":"Papar langkah fasa","ed.show_totals":"Papar jumlah air dan tenaga","ed.show_controls":"Papar kawalan","ed.show_controls_auto":"Apabila tersedia","ed.show_controls_never":"Jangan sekali-kali","ed.confirm_start":"Tanya sebelum memulakan kitaran","ed.confirm_start_helper":"Pembatalan sentiasa bertanya. Ini tidak boleh dimatikan.","ed.off_style":"Apabila mesin dimatikan","ed.off_style_keep":"Kekalkan susun atur","ed.off_style_collapse":"Satu baris","ed.language":"Bahasa","ed.language_auto":"Ikut Home Assistant","ed.language_en":"English","ed.language_ms":"Bahasa Melayu","ed.tap_action":"Tindakan ketik","ed.detected":"Dikesan","det.device":"Peranti: {name} · {n} entiti","det.washer":"Mesin basuh: {found}","det.dryer":"Pengering: {found}","det.found":"ditemui","det.not_found":"tidak ditemui","det.on":"hidup","det.off":"mati","det.controls_on":"Kawalan: hidup","det.controls_off":"Kawalan: mati. Hidupkan di Tetapan › Peranti & perkhidmatan › haismart › Konfigurasi › Dayakan kawalan mesin basuh dan pengering.","det.remote":"Kawalan jauh: mesin basuh {w}, pengering {d}","det.remote_unknown":"Kawalan jauh: tidak diketahui semasa mesin dimatikan","det.full":"Komponen: sokongan penuh","det.legacy":"Komponen: label sahaja. Kemas kini haismart untuk status paling tepat.","det.fault":"Penderia kerosakan: {found}","det.multi":"Lebih daripada satu pusat dobi ditemui. Pilih satu supaya kad tidak bertukar.","det.hidden":"Butang yang disembunyikan atau dinyahdayakan tidak dipaparkan pada kad.","det.remote_both_off":"Butang kekal dinyahdayakan sehingga kawalan jauh dihidupkan di mesin.","det.none":"Belum ada pusat dobi dikesan.","head.drum_running":"{Drum} sedang berjalan","support.finished_lc":"siap {time}","support.ready_unload_lc":"sedia dikeluarkan","support.unload_any_time":"Boleh dikeluarkan bila-bila masa","support.anticrease_left":"baki {n} min anti-kedut","support.starts_at":"Mula {time}","support.done_around":"siap {time}","a11y.takes_about":"mengambil masa kira-kira {d}","a11y.finishes_in_about":"siap dalam kira-kira {d}","a11y.paused_during":"dijeda semasa {phase}","a11y.anticrease_left":"baki {d} anti-kedut","a11y.remote_on":"kawalan jauh hidup","a11y.hide_drum":"Sembunyikan {drum}","a11y.open_device_for":"Buka halaman peranti {name}","a11y.dialog_closed_off":"Mesin telah dimatikan. Dialog ditutup.","head.drum_ready_other_paused":"{Drum} sudah siap · {other} dijeda","remote.unknown":"Status kawalan jauh {drum} tidak dapat dibaca. Kawalan kekal tidak aktif sehingga ia melapor.","remote.missing":"Status kawalan jauh {drum} tidak dapat dibaca: entitinya tiada atau dinyahdayakan.","remote.open_device":"Buka halaman peranti","ctl.cancel_scheduled_drum":"Batalkan kitaran {drum} yang dijadualkan","ctl.stop_drum":"Hentikan putaran","prog.chip_label":"Program: {programme}. Tukar program","prog.chip_label_none":"Tiada program dipilih. Pilih program","notice.more_label_one":"Papar {n} lagi notis","notice.more_label_other":"Papar {n} lagi notis","fault.more_label_one":"Papar {n} lagi kerosakan","fault.more_label_other":"Papar {n} lagi kerosakan","fault.details":"Butiran kerosakan","fault.with_code":"{fault} · kod {code}","compact.attention":"Mesin melaporkan masalah"},Wt={en:zn,ms:Kn};function s(n,e,t){const a=Wt[n][e]??Wt.en[e]??e;return t?a.replace(/\{(\w+)\}/g,(i,r)=>{const o=t[r];return o===void 0?i:String(o)}):a}function ya(n,e){return n==="en"||n==="ms"?n:(e||"").toLowerCase().startsWith("ms")?"ms":"en"}function M(n,e,t){const a=e==="washer"?"dryer":"washer",i={Drum:s(n,`drum.${e}`),drum:s(n,`drum.${e}_lc`)};return i.other=s(n,`drum.${a}_lc`),i}const de=" ",Vn=6e4;function qn(n,e){const t=n?.locale,a=t?.language||n?.language||"",r=a.split("-")[0].toLowerCase()===e?a:e==="ms"?"ms-MY":"en",o=t?.time_format,l=o==="12"?!0:o==="24"?!1:void 0,d=t?.time_zone==="server"&&n?.config?.time_zone||void 0;return{lang:e,fmtLocale:r,hour12:l,timeZone:d}}const Bt=new Map;function pt(n,e){const t=n+JSON.stringify(e);let a=Bt.get(t);if(!a){try{a=new Intl.DateTimeFormat(n,e)}catch{const i={...e};delete i.timeZone,a=new Intl.DateTimeFormat("en",i)}Bt.set(t,a)}return a}function Ce(n,e){const t=pt("en-CA",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:e.timeZone}).formatToParts(new Date(n)),a=i=>Number(t.find(r=>r.type===i)?.value);return Math.round(Date.UTC(a("year"),a("month")-1,a("day"))/864e5)}function Le(n,e,t,a={}){const i=pt(t.fmtLocale,{hour:"numeric",minute:"2-digit",hour12:t.hour12,timeZone:t.timeZone}).format(new Date(n));if(a.relativeDay===!1)return i;const r=Ce(n,t)-Ce(e,t);return r===1?`${i} ${s(t.lang,"time.tomorrow")}`:r>=2||r<=-1?`${_a(n,t)} ${i}`:i}function _a(n,e){return pt(e.fmtLocale,{weekday:"short",timeZone:e.timeZone}).format(new Date(n))}function mt(n,e,t){const a=Le(n,e,t,{relativeDay:!1});return Ce(n,t)===Ce(e,t)?a:`${_a(n,t)} ${a}`}function ba(n,e){const t=Math.max(0,Math.round(n)),a=Math.floor(t/60),i=t%60,r=s(e,"dur.h"),o=s(e,"dur.min");return a===0?`${i}${de}${o}`:i===0?`${a}${de}${r}`:`${a}${de}${r}${de}${i}${de}${o}`}function Yn(n,e){const t=Math.max(0,Math.round(n)),a=Math.floor(t/60),i=t%60,r=l=>`${l} ${s(e,l===1?"a11y.hour":"a11y.hours")}`,o=l=>`${l} ${s(e,l===1?"a11y.minute":"a11y.minutes")}`;return a===0?o(i):i===0?r(a):`${r(a)} ${o(i)}`}function Ft(n,e){return Math.max(0,Math.ceil((n-e)/Vn))}const zt={washer:"mdi:washing-machine",dryer:"mdi:tumble-dryer"};function Kt(n,e){if(e.phase===void 0||!e.phaseKnown)return s(n,"phase.working");const t=`phase.${e.key==="washer"?"w":"d"}.${e.phase}`,a=s(n,t);return a===t?s(n,"phase.working"):a}function ye(n,e){return e.key?s(n,e.key):e.text||String(e.value)}function Gn(n,e){return e.programme.value?e.programme.label||String(e.programme.value):s(n,"support.no_programme")}function Vt(n,e,t){const{lang:a,now:i}=t,r=(y,w)=>s(a,y,{...M(a,e.key),...w}),o=s(a,`drum.${e.key}`),l=y=>ba(y,a),d=y=>Yn(y,a),m=y=>Le(y,i,t.time),_=e.finishRaw!==void 0?Ft(e.finishRaw,i):e.remaining,c=[],g=[],f=(y,w)=>g.push({text:y,spoken:w}),u={key:e.key,name:o,tint:null,icon:zt[e.key],iconMuted:!0,pulse:!1,doneAnim:!1,eyebrow:o,hero:"",heroMuted:!1,heroApprox:!1,supportParts:g,short:"",aria:"",attention:null};switch(e.status){case"off":u.icon="mdi:power-sleep",u.hero=s(a,"status.off"),u.heroMuted=!0,c.push(s(a,"a11y.off"));break;case"stale":u.icon="mdi:timer-sand-empty",u.hero=s(a,"status.waiting"),u.heroMuted=!0,f(r("status.stale_support")),c.push(s(a,"a11y.waiting"));break;case"idle":{u.hero=s(a,"status.ready");const y=Gn(a,e),w=!e.generic&&t.controlsVisible&&e.programme.domain==="select"&&e.remote===!0&&!!e.programme.entity&&!n.machineOff,x=e.idleDuration&&e.programme.value?r("support.about",{d:l(e.idleDuration)}):void 0,D=e.idleDuration?s(a,"a11y.takes_about",{d:d(e.idleDuration)}):void 0;c.push(s(a,"a11y.ready")),e.generic?f(y):w?(u.programmeChip={label:y,entity:e.programme.entity,meta:x,empty:!e.programme.value},e.programme.value&&c.push(s(a,"a11y.programme",{programme:y})),x&&D&&c.push(D)):e.programme.value?(f(y,s(a,"a11y.programme",{programme:y})),x&&f(x,D)):f(y);break}case"delayed":{if(u.tint="scheduled",u.icon="mdi:clock-start",u.iconMuted=!1,u.hero=s(a,"status.scheduled"),c.push(s(a,"a11y.scheduled")),e.key==="dryer"&&e.finishAt!==void 0&&e.startsAt!==void 0){const y=Ft(e.startsAt,i);f(r("support.starts_at",{time:m(e.startsAt)}),s(a,"a11y.starts_in",{d:d(y)})),f(r("support.done_around",{time:"~"+m(e.finishAt)}),s(a,"a11y.finishes_around",{time:m(e.finishAt)}))}else e.remaining&&f(r("support.finishes_about",{d:l(e.remaining)}),s(a,"a11y.finishes_in_about",{d:d(e.remaining)}));break}case"estimating":{u.tint="running",u.icon=e.key==="dryer"?"mdi:radar":"mdi:scale-balance",u.iconMuted=!1,u.pulse=!0,u.eyebrow=r("eyebrow.estimating"),u.heroMuted=!0,c.push(s(a,"a11y.estimating")),e.finishAt!==void 0?(u.hero=m(e.finishAt),u.heroApprox=!0,c.push(s(a,"a11y.finishes_around",{time:m(e.finishAt)}))):u.hero=s(a,"status.running"),_!==void 0&&(f(r("support.about",{d:l(_)}),s(a,"a11y.in_about",{d:d(_)})),f(r(e.key==="dryer"?"support.est_dryer":"support.est_washer")));break}case"running":{u.tint=e.sub==="maintenance"?"scheduled":"running",u.iconMuted=!1,u.pulse=!0,u.icon=e.sub==="maintenance"?"mdi:wrench-clock":e.sub==="care"?"mdi:hanger":zt[e.key];const y=Kt(a,e);u.eyebrow=e.sub==="maintenance"?r("eyebrow.maintenance"):e.sub==="care"?r("eyebrow.care"):r("eyebrow.phase",{phase:y}),c.push(s(a,"a11y.running"),y.toLocaleLowerCase());const w=e.remaining===0||e.finishAt!==void 0&&_===0,x=e.finishAt!==void 0,D=_!==void 0?r("support.in",{d:l(_)}):void 0,A=_!==void 0?s(a,"a11y.in_about",{d:d(_)}):void 0;e.sub==="maintenance"?f(r("support.maintenance_short")):e.sub==="care"&&f(r("support.care_short")),w?u.hero=s(a,"status.finishing"):x?t.timeDisplay==="remaining"&&!e.sub?(u.hero=l(_??0),A&&c.push(A),f(r("support.done_at",{time:m(e.finishAt)}),s(a,"a11y.finishes_around",{time:m(e.finishAt)}))):(u.hero=m(e.finishAt),u.heroApprox=e.approximate,c.push(s(a,"a11y.finishes_around",{time:m(e.finishAt)})),(e.sub||t.timeDisplay!=="finish")&&D?f(D,A):A&&c.push(A)):u.hero=s(a,"status.running");break}case"paused":{u.tint="paused",u.icon="mdi:pause-circle",u.iconMuted=!1;const y=Kt(a,e).toLocaleLowerCase();u.eyebrow=r("eyebrow.paused",{phase:y}),u.hero=s(a,"status.paused"),c.push(s(a,"a11y.paused_during",{phase:y})),e.remaining!==void 0&&f(r("support.paused",{d:l(e.remaining)}),s(a,"a11y.left",{d:d(e.remaining)})),u.attention="warning";break}case"done":{u.tint="done",u.icon="mdi:check-circle",u.iconMuted=!1,u.doneAnim=!0,u.eyebrow=r("eyebrow.finished"),u.hero=s(a,"status.done"),c.push(s(a,"a11y.done"));const y=e.finishedAt!==void 0?mt(e.finishedAt,i,t.time):void 0;e.blockingNotice?(f(ye(a,e.blockingNotice)),u.supportIcon="mdi:alert",y&&f(s(a,"support.finished_lc",{time:y}))):e.doorLocked===!0?(f(s(a,"support.door_locked")),y&&f(s(a,"support.finished_lc",{time:y}))):y?(f(s(a,"support.finished_at",{time:y})),f(s(a,"support.ready_unload_lc"))):f(s(a,"support.ready_unload"));break}case"tumbling":{u.tint="done",u.icon="mdi:hanger",u.iconMuted=!1,u.hero=s(a,"status.done"),c.push(s(a,"a11y.tumbling")),f(s(a,"support.unload_any_time")),e.key==="dryer"?(u.eyebrow=r("eyebrow.anticrease"),e.antiCrease&&e.antiCrease>0?f(s(a,"support.anticrease_left",{n:e.antiCrease}),s(a,"a11y.anticrease_left",{d:d(e.antiCrease)})):f(s(a,"support.anticrease_short"))):(u.eyebrow=r("eyebrow.tumbling"),f(s(a,"support.tumble_washer")));break}}u.support=g.length?g.map(y=>y.text).join(" · "):void 0;for(const y of g)c.push(qt(y.spoken??y.text));for(const y of e.notices)c.push(qt(ye(a,y)));return t.controlsVisible&&e.remote===!0&&!n.machineOff&&c.push(s(a,"a11y.remote_on")),!u.attention&&e.notices.length&&(u.attention="warning"),u.short=(u.heroApprox?"~":"")+u.hero,u.aria=s(a,"a11y.sentence",{Drum:o,parts:c.filter(Boolean).join(", ")}),u}function qt(n){return n&&n.charAt(0).toLocaleLowerCase()+n.slice(1)}function Yt(n,e){if(n.finishAt!==void 0)return(n.approximate?"~":"")+Le(n.finishAt,e.now,e.time)}function Gt(n,e,t){const{lang:a}=t,i=c=>M(a,c.key);if(n.fault.on)return s(a,"head.attention");if(n.machineOff)return n.offSince!==void 0?s(a,"head.off",{time:mt(n.offSince,t.now,t.time)}):s(a,"off.title");const r=e.filter(c=>c.isDoneLike),o=e.filter(c=>c.isActive);if(e.length>1&&r.length===e.length)return s(a,"head.all_ready");if(r.length===1&&o.length===1){const c=s(a,`drum.${o[0].key}`);if(o[0].status==="paused")return s(a,"head.drum_ready_other_paused",{...i(r[0]),other:c});const g=Yt(o[0],t);if(g)return s(a,"head.drum_ready_other",{...i(r[0]),other:c,time:g})}if(r.length>=1)return s(a,"head.drum_ready",i(r[0]));if(o.length===2&&o.every(c=>c.status!=="paused"&&c.finishAt!==void 0)){const c=o[0].finishAt>=o[1].finishAt?o[0]:o[1],g=o.some(f=>f.approximate);return s(a,"head.all_done_by",{time:(g?"~":"")+Le(c.finishAt,t.now,t.time)})}const l=o.filter(c=>c.status!=="paused"&&c.finishAt!==void 0);if(l.length){const c=l.sort((g,f)=>g.finishAt-f.finishAt)[0];return s(a,"head.drum_done",{...i(c),time:Yt(c,t)})}const d=e.find(c=>c.status==="paused");if(d)return s(a,"head.drum_paused",i(d));const m=e.find(c=>c.status==="running"||c.status==="estimating");if(m)return s(a,"head.drum_running",i(m));const _=e.find(c=>c.status==="delayed");return _?s(a,"head.drum_scheduled",i(_)):e.some(c=>c.status==="stale")?s(a,"head.waiting"):s(a,"head.ready")}function Jn(n,e){const t=n.totals,a=n.washer.isActive||n.washer.isDoneLike||(t.cycleWater.value??0)>0||(t.cycleEnergy.value??0)>0,i=l=>l===void 0?"–":new Intl.NumberFormat(e==="ms"?"ms-MY":"en",{maximumFractionDigits:2}).format(l),r=l=>l.unit?`${i(l.value)} ${l.unit}`:i(l.value);if(a)return t.cycleWater.value===void 0&&t.cycleEnergy.value===void 0?null:{text:s(e,"tot.cycle",{water:i(t.cycleWater.value),energy:r(t.cycleEnergy)}),water:{icon:"mdi:water",text:`${i(t.cycleWater.value)} L`,entity:t.cycleWater.entity},energy:{icon:"mdi:lightning-bolt",text:r(t.cycleEnergy),entity:t.cycleEnergy.entity}};if(t.water.value===void 0&&t.energy.value===void 0&&t.cycles.value===void 0)return null;const o=t.cycles.value??0;return{text:s(e,"tot.total",{water:i(t.water.value),energy:r(t.energy),n:i(t.cycles.value),washes:s(e,o===1?"tot.wash_one":"tot.wash_other")}),water:{icon:"mdi:water",text:`${i(t.water.value)} L`,entity:t.water.entity},energy:{icon:"mdi:lightning-bolt",text:r(t.energy),entity:t.energy.entity}}}function Zn(n){return n.time_display==="finish"||n.time_display==="remaining"?n.time_display:"both"}const W={tint:8,filled:70,strong:70,focus:60,mutedOnTint:85},B=n=>na(`${n}%`),Qn=ia`
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
    /* Accessible variants (checked in test/contrast.test.ts). White on HA's default primary is
       2.6:1, so filled buttons darken the fill; "strong" colours mix toward the text colour,
       which raises contrast against the surface in light and dark themes alike. */
    --hlc-filled-bg: color-mix(in srgb, var(--hlc-running) ${B(W.filled)}, #000);
    --hlc-filled-fg: #fff;
    --hlc-focus-ring: color-mix(in srgb, var(--primary-color, #03a9f4) ${B(W.focus)}, var(--hlc-text));
    --hlc-fault-text: color-mix(in srgb, var(--hlc-fault) ${B(W.strong)}, var(--hlc-text));
    --hlc-warn-strong: color-mix(in srgb, var(--hlc-paused) ${B(W.strong)}, var(--hlc-text));
    display: block;
  }

  ha-card {
    /* Block, so it is a size container even where ha-card has no styles of its own. */
    display: block;
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
    outline: 2px solid var(--hlc-focus-ring);
    outline-offset: 2px;
  }
  .clamp2 {
    min-width: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow-wrap: anywhere;
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
  .t-running,
  .t-paused,
  .t-done,
  .t-scheduled,
  .t-fault,
  .t-muted {
    --hlc-state-strong: color-mix(in srgb, var(--hlc-state) ${B(W.strong)}, var(--hlc-text));
  }

  /* ---------------------------------------------------------------- header */
  .header {
    display: flex;
    align-items: center;
    gap: 4px 8px;
    min-height: 48px;
    margin: -8px 0 4px;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
    min-width: 0;
    flex: 0 1 auto;
    color: var(--hlc-text);
    margin: 0;
    padding: 0;
    font-family: inherit;
    min-height: 44px;
    border-radius: 8px;
  }
  .title ha-icon {
    color: var(--hlc-muted);
  }
  .dev-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    margin-left: -12px;
    border-radius: 50%;
    color: var(--hlc-muted);
    flex: none;
  }
  .headline {
    margin-left: auto;
    font-size: 14px;
    line-height: 1.35;
    color: var(--hlc-muted);
    text-align: right;
    flex: 1 1 auto;
  }
  /* Narrow cards: the headline gets its own row under the title instead of sharing one. */
  @container hlc (max-width: 519px) {
    .header {
      flex-wrap: wrap;
      padding-bottom: 4px;
    }
    .headline {
      order: 10;
      flex-basis: 100%;
      margin-left: 0;
      text-align: left;
    }
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
    position: relative;
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
    background: color-mix(in srgb, var(--hlc-state) ${B(W.tint)}, transparent);
    /* Secondary text on the tint stays at 4.5:1 or better. */
    --hlc-muted: color-mix(
      in srgb,
      var(--secondary-text-color, #727272) ${B(W.mutedOnTint)},
      var(--primary-text-color, #212121)
    );
  }
  .tile.has-toggle .label-row {
    padding-right: 40px;
  }
  .drum-toggle {
    position: absolute;
    top: 6px;
    right: 6px;
    color: var(--hlc-muted);
  }
  .layout-stacked .tile:not(.tinted) .drum-toggle {
    right: -6px;
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
    background: color-mix(in srgb, var(--hlc-state) ${B(W.tint)}, transparent);
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
    line-height: 1.35;
    font-weight: 400;
    color: var(--hlc-muted);
    display: flex;
    gap: 6px;
    align-items: flex-start;
    min-width: 0;
  }
  .support.blocking {
    color: var(--hlc-text);
  }
  .support.blocking ha-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-warn-strong);
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
    /* Upcoming: a ring of at least 3:1, not the faint divider colour. */
    border: 2px solid var(--hlc-muted);
    margin: -2px;
  }
  .step .ln {
    flex: 1;
    height: 2px;
    margin: 0 6px;
    background: var(--hlc-muted);
    opacity: 0.5;
  }
  .step.complete .pt {
    background: var(--hlc-state-strong, var(--hlc-state));
    border-color: var(--hlc-state-strong, var(--hlc-state));
  }
  .step.complete .ln {
    background: var(--hlc-state-strong, var(--hlc-state));
    opacity: 1;
  }
  .step.current .pt {
    border-color: var(--hlc-state-strong, var(--hlc-state));
    background: color-mix(in srgb, var(--hlc-state) 30%, transparent);
  }
  .step .lbl {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .step.current .lbl {
    color: var(--hlc-text);
  }
  /* Labels are never hidden: on very narrow tiles the connectors shrink instead. */
  @container tile (max-width: 219px) {
    .step .ln {
      margin: 0 3px;
    }
  }
  @media (forced-colors: active) {
    .step .pt {
      border-color: CanvasText;
      background: Canvas;
    }
    .step.complete .pt,
    .step.current .pt {
      border-color: Highlight;
    }
    .step.complete .pt {
      background: Highlight;
    }
    .step .ln,
    .step.complete .ln {
      background: CanvasText;
      opacity: 1;
    }
    .dot {
      background: CanvasText;
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
  .prog-meta {
    font-size: 14px;
    color: var(--hlc-muted);
  }
  .hint {
    flex-basis: 100%;
    font-size: 12px;
    color: var(--hlc-muted);
    margin-top: -6px;
  }
  /* Chip, then its duration on the same line; the hint (no programme yet) below. */
  .prog-line {
    display: flex;
    flex-wrap: wrap;
    gap: 0 12px;
    align-items: center;
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
    background: var(--hlc-filled-bg);
    color: var(--hlc-filled-fg);
  }
  .btn.tonal {
    background: color-mix(in srgb, var(--hlc-running) 12%, transparent);
    color: var(--hlc-text);
  }
  .btn.destructive {
    color: var(--hlc-fault-text);
    font-weight: 600;
  }
  .btn.destructive ha-icon {
    color: var(--hlc-fault);
  }
  .btn.warn {
    color: var(--hlc-text);
    font-weight: 600;
  }
  .btn.warn ha-icon {
    color: var(--hlc-warn-strong);
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
  /* Only a secondary next to a labelled primary goes icon-only (it keeps its aria-label). A
     drum's only action always shows its label. */
  @container tile (max-width: 319px) {
    .btn.secondary.collapsible .lbl {
      display: none;
    }
    .btn.secondary.collapsible {
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
    line-height: 1.4;
    font-weight: 500;
    color: var(--hlc-muted);
    min-width: 0;
  }
  /* These explain disabled controls: full text colour, and the remote line wraps rather than
     shortening. */
  .reason,
  .remote-line {
    color: var(--hlc-text);
  }
  .reason ha-icon,
  .status-line ha-icon,
  .remote-line ha-icon {
    --mdc-icon-size: 16px;
  }
  .remote-line .full {
    flex: 1 1 auto;
    min-width: 0;
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
    color: var(--hlc-warn-strong);
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
  .strip .actions,
  .banner .actions {
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
  .banner {
    margin-bottom: 12px;
    min-width: 0;
  }
  .banner ul {
    margin: 4px 0 0;
    padding-left: 18px;
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
  /* Notice marker: an icon shape, not a colour-only dot. */
  .aicon {
    --mdc-icon-size: 16px;
    color: var(--hlc-warn-strong);
  }
  .crow .drum-icon {
    color: var(--hlc-state-strong, var(--hlc-muted));
  }
  .crow .drum-icon.muted {
    color: var(--hlc-muted);
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
  .collapsed .cnotice {
    font-weight: 400;
    color: var(--hlc-muted);
  }
  .collapsed .drum-toggle {
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
  dialog .changed.empty {
    margin: 0;
  }
  dialog .changed ha-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-warn-strong);
  }
  /* DOM order is visual order (safe, then confirm), so Tab moves left to right. */
  dialog .dlg-actions {
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: flex-end;
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
    :host {
      --hlc-filled-bg: #0277bd;
      --hlc-focus-ring: var(--primary-text-color, #212121);
      --hlc-fault-text: var(--primary-text-color, #212121);
      --hlc-warn-strong: var(--primary-text-color, #212121);
    }
    .tile.tinted {
      --hlc-muted: var(--primary-text-color, #212121);
    }
    .tile.tinted,
    .layout-stacked .tile.tinted,
    .chip,
    .strip,
    .banner,
    .alert,
    .btn.tonal,
    .sample-chip {
      background: transparent;
      border: 1px solid var(--hlc-state, var(--hlc-running));
    }
    .step.current .pt {
      background: transparent;
    }
  }

  /* ---------------------------------------------------------------- motion (§13) */
  /* Pulses run three times when a phase starts (the element is re-keyed per phase), then stay
     still: the static dot and the text already say "running" (WCAG 2.2.2). */
  @media (prefers-reduced-motion: no-preference) {
    .pulse {
      animation: hlc-pulse 2.4s ease-in-out 3;
    }
    .tilde {
      display: inline-block;
      animation: hlc-pulse 2.4s ease-in-out 3;
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
`,Xn={blocking:"t-paused",supply:"t-paused",maintenance:"t-scheduled",info:"t-muted",unknown:"t-muted"};function ft(n){return e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n())}}function ei(n,e){return!e||!e.length?p:h`<ol class="stepper" aria-label=${s(n,"a11y.progress")}>
    ${e.map((t,a)=>h`<li class="step ${t.state}" aria-current=${t.state==="current"?"step":p}>
        <span class="mark" aria-hidden="true"
          ><span class="pt"></span>${a<e.length-1?h`<span class="ln"></span>`:p}</span
        >
        <span class="lbl">${s(n,`step.${t.key}`)}<span class="sr-only">, ${s(n,`a11y.step_${t.state}`)}</span></span>
      </li>`)}
  </ol>`}const wa=(n,e,t)=>s(n,`${e}_${t===1?"one":"other"}`,{n:t});function ti(n,e){if(!n.config.show_notices||!e.notices.length)return p;const t=n.ui.noticesOpen.has(e.key),a=t?e.notices:e.notices.slice(0,2),i=e.notices.length-2;return h`<div class="chips" id="notices-${e.key}">
    ${a.map(r=>h`<button
        class="chip ${Xn[r.category]}"
        type="button"
        title=${ye(n.lang,r)}
        @click=${()=>n.on.moreInfo(r.entity)}
      >
        <ha-icon .icon=${r.icon} aria-hidden="true"></ha-icon><span>${ye(n.lang,r)}</span>
      </button>`)}
    ${i>0?h`<button
          class="chip t-muted"
          type="button"
          data-focus-key="notices-more-${e.key}"
          aria-expanded=${t?"true":"false"}
          aria-controls="notices-${e.key}"
          aria-label=${t?s(n.lang,"notice.less"):wa(n.lang,"notice.more_label",i)}
          @click=${()=>n.on.toggle("noticesOpen",e.key)}
        >
          <span>${t?s(n.lang,"notice.less"):s(n.lang,"notice.more",{n:i})}</span>
        </button>`:p}
  </div>`}function ka(n,e){return e.faults.length&&e.faults.length===e.codeList.length?{lines:e.faults.map((t,a)=>s(n,"fault.with_code",{fault:t,code:e.codeList[a]}))}:{lines:e.faults.length?e.faults:[s(n,"fault.no_detail")],shared:e.codeList.length?s(n,"fault.code",{code:e.codeList.join(", ")}):void 0}}function ai(n){const e=n.model.fault;if(!e.on||n.model.machineOff)return p;const{lang:t}=n,{lines:a,shared:i}=ka(t,e),r=a[0],o=a.slice(1);return h`<div class="banner t-fault">
    <ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="title-line">${s(t,"fault.title")}</span>
      <span>${r}</span>
      ${n.ui.faultMore&&o.length?h`<ul id="fault-more">
            ${o.map(l=>h`<li>${l}</li>`)}
          </ul>`:p}
      ${i?h`<span class="sub">${i}</span>`:p}
      <div class="actions">
        ${e.entity?h`<button
              class="btn tonal"
              type="button"
              data-focus-key="fault-details"
              aria-haspopup="dialog"
              @click=${()=>n.on.moreInfo(e.entity)}
            >
              ${s(t,"fault.details")}
            </button>`:p}
        ${o.length?h`<button
              class="link-btn"
              type="button"
              data-focus-key="fault-more"
              aria-expanded=${n.ui.faultMore?"true":"false"}
              aria-controls="fault-more"
              aria-label=${n.ui.faultMore?s(t,"notice.less"):wa(t,"fault.more_label",o.length)}
              @click=${()=>n.on.toggleFaultMore()}
            >
              ${n.ui.faultMore?s(t,"notice.less"):s(t,"fault.more",{n:o.length})}
            </button>`:p}
      </div>
    </div>
  </div>`}function ni(n,e,t,a){return h`<div class="alert" role="status">
    <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="title-line">${e}</span>
      <span>${t}</span>
      ${a?h`<span class="sub">${s(n,"setup.edit_hint")}</span>`:p}
    </div>
  </div>`}function ii(n,e){const{lang:t,model:a}=n,i=a.offSince!==void 0?s(t,"off.since",{time:mt(a.offSince,n.now,n.viewCtx.time)}):"",r=a.offReason==="power"?s(t,"off.explain_power"):s(t,"off.explain");return h`<div class="off-block ${e==="collapse"?"collapse":""}" role="status" tabindex="-1" data-focus-key="off">
    <ha-icon icon="mdi:power-sleep" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="off-title">${s(t,"off.title")}</span>
      ${i?h`<span class="off-sub">${i}</span>`:p}
      ${e==="stacked"?h`<span class="off-explain">${r}</span>`:p}
    </div>
  </div>`}function ri(n,e){const t=n.controller.get(e);if(!t||t.phase!=="error"||!t.error)return p;const{lang:a}=n,i=M(a,e),r=n.ui.detailsOpen.has(e);return h`<div class="strip t-fault" role="alert">
    <ha-icon icon="mdi:alert-octagon" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="title-line">${s(a,"err.title",i)}</span>
      <span>${s(a,t.error.key,i)}</span>
      ${r&&t.error.detail?h`<span class="raw" id="err-raw-${e}">${t.error.detail}</span>`:p}
      <div class="actions">
        <button
          class="btn tonal"
          type="button"
          data-focus-key="strip-${e}"
          @click=${o=>n.on.retry(e,o.currentTarget)}
        >
          ${s(a,"err.retry")}
        </button>
        ${t.error.detail?h`<button
              class="link-btn"
              type="button"
              aria-expanded=${r?"true":"false"}
              aria-controls="err-raw-${e}"
              @click=${()=>n.on.toggle("detailsOpen",e)}
            >
              ${s(a,"err.details")}
            </button>`:p}
      </div>
    </div>
    <button
      class="btn icon-only"
      type="button"
      aria-label=${s(a,"ctl.dismiss")}
      title=${s(a,"ctl.dismiss")}
      data-focus-key="strip-${e}"
      @click=${()=>n.on.dismiss(e)}
    >
      <ha-icon icon="mdi:close" aria-hidden="true"></ha-icon>
    </button>
  </div>`}const si=n=>(...e)=>({_$litDirective$:n,values:e});let oi=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,a){this._$Ct=e,this._$AM=t,this._$Ci=a}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const li={},ci=(n,e=li)=>n._$AH=e;const va=si(class extends oi{constructor(){super(...arguments),this.key=p}render(n,e){return this.key=n,e}update(n,[e,t]){return e!==this.key&&(ci(n),this.key=e),t}});const De=n=>n??p,di={start:"mdi:play",resume:"mdi:play",pause:"mdi:pause",cancel:"mdi:stop",cancel_scheduled:"mdi:stop",stop:"mdi:stop"},ui={start:"ctl.start",resume:"ctl.resume",pause:"ctl.pause",cancel:"ctl.cancel",cancel_scheduled:"ctl.cancel_scheduled",stop:"ctl.stop_tumbling"},$a={start:"ctl.starting",resume:"ctl.resuming",pause:"ctl.pausing",cancel:"ctl.cancelling",cancel_scheduled:"ctl.cancelling",stop:"ctl.stopping"},hi={start:"ctl.ok_started",resume:"ctl.ok_resumed",pause:"ctl.ok_paused",cancel:"ctl.ok_cancelled",cancel_scheduled:"ctl.ok_cancelled",stop:"ctl.ok_stopped"},Te={busy:"gate.busy",fault:"gate.fault",door:"gate.door",programme:"gate.programme",applying:"gate.applying"},xa=(n,e,t)=>s(n.lang,hi[t],M(n.lang,e));function Sa(n,e){const t=M(n.lang,e.key);return!n.sample&&e.remoteState==="missing"?s(n.lang,"remote.missing",t):!n.sample&&e.remoteState==="unknown"?s(n.lang,"remote.unknown",t):e.key==="washer"&&e.message===18?s(n.lang,"remote.door",t):s(n.lang,"remote.off",t)}function pi(n,e,t){const a=M(n.lang,e.key);if(t==="remote")return Sa(n,e);if(t==="pending")return s(n.lang,"ctl.waiting",a);const i=Te[t];return i?s(n.lang,i,a):""}function Da(n,e){if(n.config.show_controls==="never"||n.layout==="compact"||n.model.machineOff)return{};const t=Ln(e);return{primary:t.primary&&tt(e,t.primary)?t.primary:void 0,secondary:t.secondary&&tt(e,t.secondary)?t.secondary:void 0}}function Aa(n,e,t){return n.sample?"remote":ga(n.model,e,t,{now:n.now,sending:n.controller.sending,pending:n.controller.pending})}function mi(n,e,t){const a=M(n.lang,e.key);if(t==="start"&&e.programme.value&&e.programme.label)return s(n.lang,"ctl.start_prog",{programme:e.programme.label});if(t==="cancel")return s(n.lang,"ctl.cancel_drum",a);if(t==="cancel_scheduled")return s(n.lang,"ctl.cancel_scheduled_drum",a);if(t==="stop")return s(n.lang,"ctl.stop_drum",a)}function Jt(n,e,t,a,i){const{lang:r}=n,o=n.controller.get(e.key),l=o?.phase==="sending"&&o.cmd===t,d=Aa(n,e,t),m=d!==null||l,_=d==="remote"?`remote-${e.key}`:d==="pending"?`status-${e.key}`:d&&Te[d]?`reason-${e.key}`:void 0,c=s(r,ui[t]),g=mi(n,e,t);return h`<button
    class="btn ${t==="start"||t==="resume"?"filled":t==="pause"?"tonal":t==="stop"?"warn":"destructive"} ${a} ${i?"collapsible":""}"
    type="button"
    data-role=${a}
    data-drum=${e.key}
    data-cmd=${t}
    data-focus-key="cmd-${e.key}-${t}"
    aria-disabled=${m?"true":"false"}
    aria-busy=${l?"true":"false"}
    aria-describedby=${De(_)}
    aria-label=${De(l?void 0:g)}
    title=${De(g)}
    @click=${u=>m?n.on.disabledPress(e,t,d):n.on.command(e,t,u.currentTarget)}
  >
    ${l?h`<span class="spinner" aria-hidden="true"></span
          ><span class="lbl">${s(r,$a[t])}<span class="dots" aria-hidden="true">···</span></span>`:h`<ha-icon .icon=${di[t]} aria-hidden="true"></ha-icon><span class="lbl">${c}</span>`}
  </button>`}function fi(n,e){const{primary:t,secondary:a}=Da(n,e);if(!t&&!a)return p;const{lang:i}=n,r=M(i,e.key),o=n.controller.get(e.key),l=n.sample||e.remote!==!0,d=[t,a].filter(f=>!!f).map(f=>Aa(n,e,f)).find(f=>f!==null&&!!Te[f]),m=d?Te[d]:void 0,_=n.ui.remoteHelp.has(e.key),c=!n.sample&&(e.remoteState==="missing"||e.remoteState==="unknown");let g=p;return o?.phase==="waiting"?g=h`<div class="status-line" id="status-${e.key}">
      <ha-icon icon="mdi:timer-sand" aria-hidden="true"></ha-icon><span>${s(i,"ctl.waiting",r)}</span>
    </div>`:o?.phase==="sending"?g=h`<div class="status-line sr-only" id="status-${e.key}">${s(i,$a[o.cmd])}</div>`:o?.phase==="confirmed"?g=h`<div class="status-line ok" id="status-${e.key}">
      <ha-icon icon="mdi:check" aria-hidden="true"></ha-icon><span>${xa(n,e.key,o.cmd)}</span>
    </div>`:o?.phase==="unconfirmed"&&(g=h`<div class="status-line warn" id="status-${e.key}">
      <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
      <span class="grow">${s(i,"ctl.unconfirmed",r)}</span>
      <button class="link-btn" type="button" data-focus-key="status-${e.key}" @click=${()=>n.on.dismiss(e.key)}>
        ${s(i,"ctl.dismiss")}
      </button>
    </div>`),h`${ri(n,e.key)}
    <div class="controls">
      <div class="btn-row">
        ${t?Jt(n,e,t,"primary",!1):p}
        ${a?Jt(n,e,a,"secondary",!!t):p}
      </div>
      ${l?h`<div class="remote-line">
              <ha-icon icon=${c?"mdi:help-circle-outline":"mdi:remote-off"} aria-hidden="true"></ha-icon>
              <span class="full" id="remote-${e.key}">${Sa(n,e)}</span>
              ${c?e.remoteState==="missing"&&n.isAdmin?h`<button class="link-btn" type="button" @click=${()=>n.on.openDevice()}>
                      ${s(i,"remote.open_device")}
                    </button>`:p:h`<button
                    class="info-btn"
                    type="button"
                    aria-label=${s(i,"remote.help_label")}
                    title=${s(i,"remote.help_label")}
                    aria-expanded=${_?"true":"false"}
                    aria-controls="remote-help-${e.key}"
                    @click=${()=>n.on.toggle("remoteHelp",e.key)}
                  >
                    <ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon>
                  </button>`}
            </div>
            ${_&&!c?h`<p class="remote-help" id="remote-help-${e.key}">${s(i,"remote.help",r)}</p>`:p}`:m?h`<div class="reason" id="reason-${e.key}">
              <ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon><span>${s(i,m,r)}</span>
            </div>`:p}
      ${g}
    </div>`}function gi(n,e,t){const a=t.eyebrow.startsWith(t.name)?t.eyebrow.slice(t.name.length):t.eyebrow===t.name?"":` · ${t.eyebrow}`,i=n.model.controlsExist&&n.config.show_controls!=="never"&&e.remote===!0&&!n.model.machineOff;return h`<div class="label-row">
    <ha-icon
      class="drum-icon ${t.iconMuted?"muted":""} ${t.doneAnim?"done-anim":""}"
      .icon=${t.icon}
      aria-hidden="true"
    ></ha-icon>
    ${t.pulse?va(`${e.status}-${e.phase}`,h`<span class="dot pulse" aria-hidden="true"></span>`):p}
    <span class="eyebrow ellipsis"><span id="name-${e.key}">${t.name}</span>${a}</span>
    <span class="label-icons">
      ${i?h`<ha-icon icon="mdi:remote" title=${s(n.lang,"remote.on")} aria-hidden="true"></ha-icon>`:p}
    </span>
  </div>`}function Ca(n,e,t){const a=M(n.lang,e.key),i=s(n.lang,t?"a11y.hide_drum":"a11y.show_drum",a);return h`<button
    class="btn icon-only drum-toggle"
    type="button"
    data-focus-key="expand-${e.key}"
    aria-expanded=${t?"true":"false"}
    aria-label=${i}
    title=${i}
    @click=${()=>n.on.toggle("expanded",e.key)}
  >
    <ha-icon icon=${t?"mdi:chevron-up":"mdi:chevron-down"} aria-hidden="true"></ha-icon>
  </button>`}function Zt(n,e,t={}){const a=n.views[e.key],i=a.tint!==null,r=a.tint?`t-${a.tint}`:"",o=a.programmeChip,l=!!o&&o.empty&&e.status==="idle";return h`<section
    class="tile ${r} ${i?"tinted":""} ${t.collapsible?"has-toggle":""}"
    role="group"
    aria-labelledby="name-${e.key}"
  >
    <div
      class="summary"
      role="button"
      tabindex="0"
      data-focus-key="summary-${e.key}"
      data-summary=${e.key}
      aria-label=${a.aria}
      @click=${()=>n.on.tap(e)}
      @keydown=${ft(()=>n.on.tap(e))}
    >
      ${gi(n,e,a)}
      ${va(a.hero,h`<div class="hero ${a.heroMuted?"muted":""}" aria-hidden="true">
          ${a.heroApprox?h`<span class="tilde">~</span>`:p}${a.hero}
        </div>`)}
      ${a.support?h`<div class="support ${a.supportIcon?"blocking":""}" aria-hidden="true">
            ${a.supportIcon?h`<ha-icon .icon=${a.supportIcon}></ha-icon>`:p}
            <span class="clamp2">${a.support}</span>
          </div>`:p}
    </div>
    ${t.collapsible?Ca(n,e,!0):p}
    ${o?h`<div class="prog-line">
          <button
            class="chip prog-chip"
            type="button"
            data-focus-key="prog-${e.key}"
            aria-haspopup="dialog"
            aria-label=${o.empty?s(n.lang,"prog.chip_label_none"):s(n.lang,"prog.chip_label",{programme:o.label})}
            aria-describedby=${De(l?`hint-${e.key}`:void 0)}
            @click=${()=>n.on.moreInfo(o.entity)}
          >
            <span>${o.label}</span><ha-icon icon="mdi:pencil-outline" aria-hidden="true"></ha-icon>
          </button>
          ${o.meta?h`<span class="prog-meta" aria-hidden="true">${o.meta}</span>`:p}
          ${l?h`<span class="hint" id="hint-${e.key}">${s(n.lang,"support.pick_hint")}</span>`:p}
        </div>`:p}
    ${n.config.show_stepper?ei(n.lang,e.steps):p}
    ${ti(n,e)}
    ${fi(n,e)}
  </section>`}const Ta={washer:"mdi:washing-machine",dryer:"mdi:tumble-dryer"},Ma=n=>n?h`<ha-icon class="aicon" icon="mdi:alert-circle-outline" aria-hidden="true"></ha-icon>`:p;function Ge(n,e,t,a,i={}){const r=i.icon??(e?Ta[e.key]:"mdi:washing-machine"),o=i.onTap??(()=>e&&n.on.tap(e));return h`<div
    class="crow ${i.tint?`t-${i.tint}`:""}"
    role="button"
    tabindex="0"
    data-focus-key="crow-${e?.key??"all"}"
    aria-label=${a}
    @click=${o}
    @keydown=${ft(o)}
  >
    <ha-icon .icon=${r} class="drum-icon ${i.tint?"":"muted"}" aria-hidden="true"></ha-icon>
    <span class="chero ellipsis" aria-hidden="true">${t}</span>
    ${Ma(!!i.notice)}
  </div>`}function yi(n,e){const t=n.views[e.key],a=n.config.show_notices?e.notices[0]:void 0;return h`<div class="collapsed" role="group" aria-labelledby="name-${e.key}">
    <div
      class="summary"
      role="button"
      tabindex="0"
      data-focus-key="summary-${e.key}"
      data-summary=${e.key}
      aria-label=${t.aria}
      @click=${()=>n.on.tap(e)}
      @keydown=${ft(()=>n.on.tap(e))}
    >
      <ha-icon class="drum-icon" .icon=${Ta[e.key]} aria-hidden="true"></ha-icon>
      <span class="clamp2" aria-hidden="true"
        ><span id="name-${e.key}">${t.name}</span> · ${t.short}${a?h` · <span class="cnotice">${ye(n.lang,a)}</span>`:p}</span
      >
      ${Ma(!!a)}
    </div>
    ${Ca(n,e,!1)}
  </div>`}function _i(n,e,t){const a=M(n,e.key),i=e.programme.value&&e.programme.label?e.programme.label:s(n,"dlg.this_cycle");switch(t){case"cancel":return e.key==="washer"?{title:s(n,"dlg.cancel_w_title"),body:s(n,"dlg.cancel_w_body",{programme:i}),safe:s(n,"dlg.keep_washing"),confirm:s(n,"dlg.cancel_cycle"),confirmStyle:"destructive"}:{title:s(n,"dlg.cancel_d_title"),body:s(n,"dlg.cancel_d_body",{programme:i}),safe:s(n,"dlg.keep_drying"),confirm:s(n,"dlg.cancel_cycle"),confirmStyle:"destructive"};case"cancel_scheduled":return{title:s(n,"dlg.sched_title",a),body:s(n,"dlg.sched_body",a),safe:s(n,"dlg.keep_scheduled"),confirm:s(n,"dlg.cancel_cycle"),confirmStyle:"destructive"};case"stop":return{title:s(n,"dlg.tumble_title"),body:s(n,"dlg.tumble_body"),safe:s(n,"dlg.keep_tumbling"),confirm:s(n,"ctl.stop_tumbling"),confirmStyle:"warn"};default:{const r=[{text:i}];return e.idleDuration&&r.push({text:s(n,"dlg.takes_about",{d:ba(e.idleDuration,n)})}),e.doorOpen===!1&&r.push({icon:"mdi:check",text:s(n,"dlg.door_closed")}),{title:s(n,"dlg.start_title",a),rows:r,safe:s(n,"dlg.not_now"),confirm:s(n,"dlg.start_confirm",a),confirmStyle:"filled"}}}}function bi(n,e,t,a,i,r){const o=_i(n,e,t.cmd),l=M(n,e.key);return h`<h2 id="dlg-title">${o.title}</h2>
    ${o.body?h`<p id="dlg-body">${o.body}</p>`:p}
    ${o.rows?h`<ul class="rows" id="dlg-body">
          ${o.rows.map(d=>h`<li>${d.icon?h`<ha-icon .icon=${d.icon} aria-hidden="true"></ha-icon>`:p}${d.text}</li>`)}
        </ul>`:p}
    <div class="changed ${a?"":"empty"}" role="status" id="dlg-changed">
      ${a?h`<ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon><span>${s(n,"dlg.changed",l)}</span>`:p}
    </div>
    <div class="dlg-actions">
      <button class="btn ${o.confirmStyle==="filled"?"tonal":"filled"}" type="button" data-safe autofocus @click=${i}>
        ${o.safe}
      </button>
      <button
        class="btn ${o.confirmStyle}"
        type="button"
        data-confirm
        aria-disabled=${a?"true":"false"}
        aria-describedby=${a?"dlg-changed":p}
        @click=${()=>a?void 0:r()}
      >
        ${o.confirm}
      </button>
    </div>`}const wi="mock-laundry-centre";function ki(n,e){const t=J[n];return typeof e=="boolean"?e?"on":"off":t?.options&&typeof e=="number"?t.options[String(e)]??String(e):String(e)}function vi(n,e,t){const a=J[n];let i=a?.control??"sensor";return!t&&(i==="select"||i==="number"||i==="switch")&&(i=i==="switch"?"binary_sensor":"sensor"),`${i}.${ie(e)}_${ie(a?.name??n)}`}function $i(n,e={}){const t=e.deviceId??wi,a=e.deviceName??"Laundry Centre",i=e.at??new Date().toISOString(),r=e.controls??!1,o={},l={},d=(g,f,u={})=>{o[g]={entity_id:g,...f},l[g]={entity_id:g,device_id:t,platform:"haismart",...u}};for(const[g,f]of Object.entries(n)){const u=J[g];if(!u)continue;const y=vi(g,a,r),w=e.changedAt?.[g]??i,x=e.stateOverride?.[g],A=e.off||x==="unavailable"||x==="unknown"?{}:{haier_attribute:g,...e.legacy?{}:{haier_value:f},friendly_name:`${a} ${u.name}`,...u.unit?{unit_of_measurement:u.unit}:{}};d(y,{state:e.off?"unavailable":x??ki(g,f),attributes:A,last_changed:w,last_updated:w})}if(r)for(const g of dt){const f=`button.${ie(a)}_${g}`;d(f,{state:e.off?"unavailable":"unknown",attributes:{},last_changed:i,last_updated:i},{translation_key:g})}const m=`binary_sensor.${ie(a)}_fault`,_=e.fault;d(m,{state:e.off?"unavailable":_?.on?"on":"off",attributes:e.off||!_?{device_class:"problem"}:{device_class:"problem",faults:_.faults??[],fault_codes:_.fault_codes??[],error_code:_.error_code??null},last_changed:i,last_updated:i},{translation_key:"fault"}),d(`binary_sensor.${ie(a)}_cloud_connection`,{state:"on",attributes:{},last_changed:i,last_updated:i},{translation_key:"cloud_connection",entity_category:"diagnostic"});const c={[t]:{id:t,name:a,name_by_user:null,manufacturer:"Haier",model:"HWD140-BD14LCGNU1"}};return{states:o,entities:l,devices:c,locale:{language:e.language??"en",time_format:e.timeFormat??"12",time_zone:e.timeZone?"server":"local"},language:e.language??"en",config:{time_zone:e.timeZone??"Asia/Kuala_Lumpur"},user:{is_admin:e.isAdmin??!0},callService:e.callService??(async()=>{})}}const xi={laundryCyclePhase:0,dryerCyclePhase:8,washerRunningMode:2,dryerRunningMode:1,remainingTimeHH:1,remainingTimeMM:8,dryerRemainingDryTime:470,dryerRemainingResnTime:0,remainingAntiCreaseTime:0,washerUnifiedProgramSettings:56,dryerUnifiedProgramSettings:56,washerMessage:4,dryerMessage:0,washerRemoteCtrValid:!1,dryerRemoteCtrValid:!1,washerDoorStatus:!1,dryerDoorStatus:!1,washerDoorLockStatus:!1,dryerDoorLockStatus:!0,washerPowerStatus:!0,dryerPowerStatus:!0,onOffStatus:!0,childLockStatus:!1,laundryCycleStatus:!1,washerDryStatus:!1,remainingDetergentStatus:1,remainingSoftenerStatus:2,washerDryMode:10,totalWaterUsed:120,washerTotalElectricityUsed:.28,totalWashCycle:1,currentWaterUsed:0,washerCurrentElectricityUsed:0},Je={layout:"auto",time_display:"both",drums:"both",order:"washer_first",collapse_idle:!0,show_notices:!0,show_stepper:!0,show_totals:!1,show_controls:"auto",confirm_start:!1,off_style:"keep",language:"auto"},V=(n,e,t)=>({select:{mode:"dropdown",options:t.map(a=>({value:a,label:s(n,`${e}_${a}`)}))}});function Si(n){return[{name:"device_id",selector:{device:{filter:[{integration:"haismart"}]}}},{name:"title",selector:{text:{}}},{name:"layout",selector:V(n,"ed.layout",["auto","full","stacked","compact"])},{name:"time_display",selector:V(n,"ed.time",["both","finish","remaining"])},{name:"drums",selector:V(n,"ed.drums",["both","washer","dryer"])},{name:"order",selector:V(n,"ed.order",["washer_first","dryer_first"])},{name:"advanced",type:"expandable",flatten:!0,title:s(n,"ed.advanced"),schema:[{name:"collapse_idle",selector:{boolean:{}}},{name:"show_notices",selector:{boolean:{}}},{name:"show_stepper",selector:{boolean:{}}},{name:"show_totals",selector:{boolean:{}}},{name:"show_controls",selector:V(n,"ed.show_controls",["auto","never"])},{name:"confirm_start",selector:{boolean:{}}},{name:"off_style",selector:V(n,"ed.off_style",["keep","collapse"])},{name:"language",selector:V(n,"ed.language",["auto","en","ms"])},{name:"tap_action",selector:{ui_action:{}}}]}]}const Qt={device_id:"ed.device",title:"ed.title",layout:"ed.layout",time_display:"ed.time",drums:"ed.drums",order:"ed.order",collapse_idle:"ed.collapse_idle",show_notices:"ed.show_notices",show_stepper:"ed.show_stepper",show_totals:"ed.show_totals",show_controls:"ed.show_controls",confirm_start:"ed.confirm_start",off_style:"ed.off_style",language:"ed.language",tap_action:"ed.tap_action",advanced:"ed.advanced"};function Di(n,e,t){const a=[],i=xe(n,e),r=ht(n);if(i.kind!=="ok")return[{text:s(t,"det.none"),level:"warning"}];const o=i.deviceId,l=ma(n,o),d=fa(n,l),m=c=>s(t,c?"det.found":"det.not_found"),_=c=>s(t,c?"det.on":"det.off");return a.push({text:s(t,"det.device",{name:Re(n,o),n:be(n,o).length}),level:"info"}),a.push({text:s(t,"det.washer",{found:m(!!l.attrs.laundryCyclePhase)}),level:"info"}),a.push({text:s(t,"det.dryer",{found:m(!!l.attrs.dryerCyclePhase)}),level:"info"}),a.push(d.controlsExist?{text:s(t,"det.controls_on"),level:"ok"}:{text:s(t,"det.controls_off"),level:"info"}),a.push(d.machineOff||d.washer.remote===void 0&&d.dryer.remote===void 0?{text:s(t,"det.remote_unknown"),level:"info"}:{text:s(t,"det.remote",{w:_(d.washer.remote),d:_(d.dryer.remote)}),level:"info"}),a.push({text:s(t,d.legacy?"det.legacy":"det.full"),level:d.legacy?"warning":"ok"}),a.push({text:s(t,"det.fault",{found:m(!!l.fault)}),level:"info"}),!e.device_id&&r.length>=2&&a.push({text:s(t,"det.multi"),level:"warning"}),d.controlsExist&&(a.push({text:s(t,"det.hidden"),level:"info"}),d.washer.remote===!1&&d.dryer.remote===!1&&a.push({text:s(t,"det.remote_both_off"),level:"info"})),a}const Me=class Me extends ne{constructor(){super(...arguments),this._rows=[],this._helperDevice="",this._computeLabel=e=>{const t=Qt[e.name];return t?s(this._lang,t):e.name},this._computeHelper=e=>{const t=this._lang;if(e.name==="device_id")return this._helperDevice?s(t,"ed.device_helper",{name:this._helperDevice}):s(t,"ed.device_helper_none");if(e.name==="layout")return s(t,"ed.layout_helper");if(e.name==="confirm_start")return s(t,"ed.confirm_start_helper")}}setConfig(e){this._config=e}get _lang(){return ya(this._config?.language,this.hass?.locale?.language??this.hass?.language)}willUpdate(){if(!this.hass||!this._config)return;this._rows=Di(this.hass,this._config,this._lang);const e=this.hass;this._helperDevice=ht(e).map(t=>Re(e,t)).join(", ")}_valueChanged(e){e.stopPropagation();const t={...e.detail.value},a={type:this._config?.type??"custom:haismart-laundry-card"};for(const[i,r]of Object.entries(t))i!=="type"&&(r===void 0||typeof r=="string"&&!r.trim()||i in Je&&Je[i]===r||i==="tap_action"&&r?.action==="more-info"&&Object.keys(r).length===1||(a[i]=r));for(const[i,r]of Object.entries(this._config??{}))!(i in a)&&!(i in t)&&!(i in Qt)&&i!=="type"&&(a[i]=r);this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return p;const e=this._lang,t={...Je,...this._config},a=this._rows,i=r=>r.level==="warning"?"mdi:alert-outline":r.level==="ok"?"mdi:check-circle-outline":"mdi:information-outline";return h`<ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${Si(e)}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <section class="detected" aria-labelledby="det-title">
        <h3 id="det-title">${s(e,"ed.detected")}</h3>
        <ul>
          ${a.map(r=>h`<li class=${r.level}><ha-icon .icon=${i(r)} aria-hidden="true"></ha-icon><span>${r.text}</span></li>`)}
        </ul>
      </section>`}};Me.properties={hass:{attribute:!1},_config:{state:!0}},Me.styles=ia`
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
  `;let at=Me;customElements.get("haismart-laundry-card-editor")||customElements.define("haismart-laundry-card-editor",at);const pe="haismart-laundry-card",Ai="haismart-laundry-card-editor",Ci="1.0.0",Ti="https://github.com/kucau0901/haismart-laundry-card#readme",Mi={layout:"auto",time_display:"both",drums:"both",order:"washer_first",collapse_idle:!0,show_notices:!0,show_stepper:!0,show_totals:!1,show_controls:"auto",confirm_start:!1,off_style:"keep",language:"auto",tap_action:{action:"more-info"}},Ea={layout:["auto","full","stacked","compact"],time_display:["finish","remaining","both"],drums:["both","washer","dryer"],order:["washer_first","dryer_first"],show_controls:["auto","never"],off_style:["keep","collapse"],language:["auto","en","ms"]},Pa=["collapse_idle","show_notices","show_stepper","show_totals","confirm_start"],Oa=["device_id","title"],Ei=new Set(["type","tap_action","grid_options","view_layout","visibility","card_mod",...Object.keys(Ea),...Pa,...Oa]),Xt=new Set;function Pi(n){if(!n||typeof n!="object")throw new Error("haismart-laundry-card: invalid configuration");for(const[e,t]of Object.entries(Ea)){const a=n[e];if(a!==void 0&&!t.includes(a))throw new Error(`haismart-laundry-card: "${e}" must be one of ${t.join(", ")}`)}for(const e of Pa){const t=n[e];if(t!==void 0&&typeof t!="boolean")throw new Error(`haismart-laundry-card: "${e}" must be true or false`)}for(const e of Oa){const t=n[e];if(t!=null&&typeof t!="string")throw new Error(`haismart-laundry-card: "${e}" must be text`)}if(n.tap_action!==void 0&&(typeof n.tap_action!="object"||n.tap_action===null))throw new Error('haismart-laundry-card: "tap_action" must be an action object');for(const e of Object.keys(n))!Ei.has(e)&&!Xt.has(e)&&(Xt.add(e),console.warn(`haismart-laundry-card: unknown option "${e}" (kept, ignored)`));return{...Mi,...n}}const ea=600,ta=280;function Oi(n,e){const t=n>=ea?"full":n>=ta?"stacked":"compact";if(!e||e===t)return t;const a=8;return e==="full"&&t==="stacked"||e==="stacked"&&t==="full"?Math.abs(n-ea)<a?e:t:(e==="stacked"&&t==="compact"||e==="compact"&&t==="stacked")&&Math.abs(n-ta)<a?e:t}const nt=(n,e,t)=>n.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0})),ve=n=>nt(window,"haptic",n),Ee=class Ee extends ne{constructor(){super(...arguments),this.preview=!1,this.editMode=!1,this._tick=0,this._announce="",this._rev=0,this._memory={},this._ui={remoteHelp:new Set,noticesOpen:new Set,detailsOpen:new Set,expanded:new Set,faultMore:!1,hintSeen:new Set},this._resolution={kind:"loading"},this._tracked=[],this._sampleActive=!1,this._now=Date.now(),this._prevDone={},this._prevRemote={},this._alert="",this._collapsedNow=!1,this._controller=new Fn({requestUpdate:()=>{this._rev++},onConfirmed:(e,t)=>this._say(xa({lang:this._lang},e,t)),onUnconfirmed:e=>this._say(s(this._lang,"ctl.unconfirmed",M(this._lang,e)))}),this._handlers={tap:e=>{if(!e.phaseEntity||this._sampleActive)return;const t=this._config?.tap_action??{action:"more-info"};nt(this,"hass-action",{config:{entity:e.phaseEntity,tap_action:t},action:"tap"})},moreInfo:e=>{!e||this._sampleActive||nt(this,"hass-more-info",{entityId:e})},command:(e,t,a)=>this._activate(e.key,t,a),disabledPress:(e,t,a)=>{ve("light");const i=this._renderCtx();!i||!a||(a==="remote"&&!i.sample&&(e.remoteState==="off"||e.remoteState==="on")&&!this._ui.remoteHelp.has(e.key)&&(this._ui.remoteHelp.add(e.key),this._rev++),this._say(pi(i,e,a)))},dismiss:e=>this._controller.dismiss(e),retry:(e,t)=>{const a=this._controller.get(e);a&&(this._controller.dismiss(e),this._activate(e,a.cmd,t))},toggle:(e,t)=>{const a=this._ui[e];a.has(t)?a.delete(t):a.add(t),this._rev++},toggleFaultMore:()=>{this._ui.faultMore=!this._ui.faultMore,this._rev++},openDevice:()=>{const e=this._model?.deviceId;!e||this._sampleActive||!this.hass?.user?.is_admin||(history.pushState(null,"",`/config/devices/device/${e}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}})))}}}setConfig(e){this._config=Pi(e)}static getConfigElement(){return document.createElement(Ai)}static getStubConfig(e){const t=xe(e,{});return t.kind==="ok"?{type:`custom:${pe}`,device_id:t.deviceId}:{type:`custom:${pe}`}}getCardSize(){const e=this._effLayout();return e==="compact"?3:this._model?.machineOff?this._config?.off_style==="collapse"?1:5:e==="stacked"?this._collapsedNow?6:9:6}getGridOptions(){return this._config?.layout==="compact"?{columns:6,rows:"auto",min_columns:3,min_rows:2}:{columns:12,rows:"auto",min_columns:3,min_rows:2}}connectedCallback(){super.connectedCallback(),typeof ResizeObserver<"u"&&!this._ro&&(this._ro=new ResizeObserver(e=>{const t=e[0]?.contentRect.width;if(!t)return;const a=Oi(t,this._layout);a!==this._layout&&(this._layout=a)}),this._ro.observe(this)),this._controller.resume(),this._config&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._ro?.disconnect(),this._ro=void 0,clearTimeout(this._tickTimer),clearTimeout(this._gateTimer),this._tickTimer=void 0,this._gateTimer=void 0,this._controller.dispose()}get _lang(){return ya(this._config?.language,this.hass?.locale?.language??this.hass?.language)}_effLayout(){const e=this._config?.layout;return e&&e!=="auto"?e:this._layout??"full"}shouldUpdate(e){if(!this._config)return!1;if(!e.has("hass")||e.size>1)return!0;const t=e.get("hass"),a=this.hass;return!t||!a||t.entities!==a.entities||t.devices!==a.devices||t.locale!==a.locale||t.language!==a.language?!0:this._sampleActive?!1:(this._tracked.length?this._tracked:gn(a)).some(r=>t.states?.[r]!==a.states?.[r])}willUpdate(){this._now=Date.now();const e=this.shadowRoot?.activeElement;this._focusKey=e?.dataset?.focusKey,this._focusPrimary=e?.dataset?.role==="primary"?{drum:e.dataset.drum??"",cmd:e.dataset.cmd??""}:void 0;const t=this._config;let a=this.hass;if(this._resolution=xe(a,t),this._sampleActive=!1,this.preview&&(this._resolution.kind==="none"||this._resolution.kind==="loading"&&!a?.entities)&&(this._sampleHass??=$i(xi,{controls:!0,language:a?.locale?.language,timeFormat:a?.locale?.time_format??"language",isAdmin:!1}),a=this._sampleHass,this._resolution=xe(a,{}),this._sampleActive=!0),this._resolution.kind!=="ok"||!a){this._model=void 0,this._tracked=[];return}this._index=ma(a,this._resolution.deviceId),this._tracked=vn(this._index,a),this._model=fa(a,this._index,{now:this._now,memory:this._memory}),this._updateFaultAlert(this._model);const i=this._viewCtx();this._views={washer:Vt(this._model,this._model.washer,i),dryer:Vt(this._model,this._model.dryer,i)}}_viewCtx(){const e=this._lang,t=this._sampleActive?this._sampleHass:this.hass;return{lang:e,time:qn(t,e),now:this._now,timeDisplay:Zn(this._config),controlsVisible:this._config.show_controls!=="never"&&this._effLayout()!=="compact"&&!!this._model?.controlsExist}}_updateFaultAlert(e){const t=e.fault,a=t.on&&!e.machineOff?JSON.stringify([t.faults,t.codeList]):"";if(this._faultSig!==void 0&&a!==this._faultSig){const i=this._lang;this._alert=a?`${s(i,"fault.title")}: ${ka(i,t).lines.join("; ")}`:""}this._faultSig=a}_focusFallback(e,t){const a=this.shadowRoot;if(!a)return null;const i=r=>a.querySelector(r);if(e){const r=i(`[data-focus-key="${e}"]`);if(r)return r;const o=/^(cmd|strip|status|notices-more|prog|expand|summary|crow)-(washer|dryer)/.exec(e);if(o&&(t=o[2]),o&&(o[1]==="strip"||o[1]==="status")){const l=i(`[data-role="primary"][data-drum="${t}"]`)??i(`[data-role="secondary"][data-drum="${t}"]`);if(l)return l}}if(t){const r=i(`[data-summary="${t}"]`)??i(`[data-focus-key="crow-${t}"]`);if(r)return r}return i('[data-focus-key="title"]')??i('[data-focus-key="off"]')}updated(){const e=this._model,t=this.shadowRoot?.querySelector("dialog");if(t&&this._dialog&&!t.open){try{t.showModal()}catch{t.setAttribute("open","")}ve("warning"),t.querySelector("[data-safe]")?.focus()}if(this._dialog&&(!e||e.machineOff)&&(this._closeDialog(!0),this._say(s(this._lang,"a11y.dialog_closed_off"))),!!e){if(this._controller.observe([e.washer,e.dryer]),this._focusPrimary){const{drum:a,cmd:i}=this._focusPrimary,r=this.shadowRoot?.querySelector(`[data-role="primary"][data-drum="${a}"]`);r&&r.dataset.cmd!==i&&this.shadowRoot?.activeElement!==r&&r.focus(),this._focusPrimary=void 0}this._focusKey&&!this._dialog&&this.shadowRoot&&!this.shadowRoot.activeElement&&this._focusFallback(this._focusKey)?.focus(),this._focusKey=void 0;for(const a of[e.washer,e.dryer])this._prevDone[a.key]===!1&&a.isDoneLike&&this._say(s(this._lang,"a11y.drum_done",M(this._lang,a.key))),this._prevDone[a.key]=a.isDoneLike,this._prevRemote[a.key]===!1&&a.remote===!0&&this._controlsShown(a)&&this._say(s(this._lang,"ctl.available",M(this._lang,a.key))),a.remote!==void 0&&(this._prevRemote[a.key]=a.remote),a.status==="idle"&&this._ui.hintSeen.add(a.key);this._scheduleTimers(e)}}_controlsShown(e){const t=this._renderCtx();if(!t)return!1;const a=Da(t,e);return!!(a.primary||a.secondary)}_scheduleTimers(e){if(jn(e)&&this.isConnected){if(!this._tickTimer){const a=6e4-Date.now()%6e4+50;this._tickTimer=setTimeout(()=>{this._tickTimer=void 0,this._tick++},a)}}else this._tickTimer&&(clearTimeout(this._tickTimer),this._tickTimer=void 0);const t=[e.washer,e.dryer].map(a=>a.programme.lastChanged).filter(a=>a!==void 0&&this._now-a<5e3).map(a=>a+5e3-this._now);t.length&&!this._gateTimer&&this.isConnected&&(this._gateTimer=setTimeout(()=>{this._gateTimer=void 0,this._rev++},Math.max(50,Math.min(...t)+50)))}_say(e){this._announce=this._announce.endsWith("​")?e:`${e}​`}_drum(e){return this._model?.[e]}_gate(e,t){return this._model?ga(this._model,e,t,{now:Date.now(),sending:this._controller.sending,pending:this._controller.pending}):"remote"}_activate(e,t,a){const i=this._drum(e);if(!i||this._sampleActive)return;if(this._gate(i,t)){ve("light");return}if(t==="cancel"||t==="cancel_scheduled"||t==="stop"||t==="start"&&this._config.confirm_start){this._dialog={drum:e,cmd:t,trigger:a,signature:this._signature(i,t)};return}this._send(e,t)}_signature(e,t){return`${e.status}|${this._gate(e,t)??""}|${e.programme.value??""}`}_send(e,t){const a=this._drum(e),i=this.hass;if(!a||!i||this._gate(a,t))return;const r=tt(a,t);r&&(ve("selection"),this._controller.run(i,e,t,r))}_closeDialog(e=!1){const t=this._dialog?.trigger,a=this._dialog?.drum;this._dialog=void 0;const i=this.shadowRoot?.querySelector("dialog");if(i?.open)try{i.close()}catch{i.removeAttribute("open")}requestAnimationFrame(()=>{!e&&t?.isConnected?t.focus():this._focusFallback(void 0,e?void 0:a)?.focus()})}_confirmDialog(){const e=this._dialog;if(!e)return;const t=this._drum(e.drum);!t||this._signature(t,e.cmd)!==e.signature||(this._closeDialog(),this._send(e.drum,e.cmd))}_onDialogClick(e){const t=e.currentTarget;if(e.target!==t)return;const a=t.getBoundingClientRect();e.clientX>=a.left&&e.clientX<=a.right&&e.clientY>=a.top&&e.clientY<=a.bottom||this._closeDialog()}_renderCtx(){if(!(!this._model||!this._views||!this._config))return{lang:this._lang,model:this._model,config:this._config,layout:this._effLayout(),now:this._now,viewCtx:this._viewCtx(),views:this._views,controller:this._controller,ui:this._ui,on:this._handlers,sample:this._sampleActive,isAdmin:!!this.hass?.user?.is_admin&&!this._sampleActive}}_drumsShown(e){const t=this._config;return t.drums==="washer"?[e.washer]:t.drums==="dryer"?[e.dryer]:t.order==="dryer_first"?[e.dryer,e.washer]:[e.washer,e.dryer]}_title(){const e=this._config;if(typeof e.title=="string"&&e.title.trim())return e.title;const t=this._sampleActive?this._sampleHass:this.hass;return this._resolution.kind==="ok"&&t?Re(t,this._resolution.deviceId,s(this._lang,"card.default_title")):s(this._lang,"card.default_title")}render(){if(!this._config)return p;const e=this._lang,t=this._resolution;if(t.kind==="loading")return h`<ha-card class="loading" lang=${e}></ha-card>`;if(t.kind!=="ok"){const[g,f]=t.kind==="none"?[s(e,"setup.none_title"),s(e,"setup.none_body")]:t.kind==="removed"?[s(e,"setup.removed_title"),s(e,"setup.removed_body")]:[s(e,"setup.not_laundry",{name:t.name}),s(e,"setup.not_laundry_body")];return h`<ha-card lang=${e}>${ni(e,g,f,this.editMode)}</ha-card>`}const a=this._renderCtx();if(!a)return h`<ha-card class="loading" lang=${e}></ha-card>`;const i=a.model,r=a.layout,o=this._drumsShown(i),l=h`<div class="sr-only" aria-live="polite" aria-atomic="true">${this._announce}</div>
      <div class="sr-only" role="alert" aria-atomic="true">${this._alert}</div>`;if(this._collapsedNow=!1,i.machineOff&&(r!=="full"||this._config.off_style==="collapse")){const g=this._config.off_style==="collapse"?"collapse":r==="compact"?"compact":"stacked";return h`<ha-card lang=${e} class="layout-${r}">
        ${l} ${r==="compact"?this._renderCompactTitle():p} ${ii(a,g)}
      </ha-card>`}if(r==="compact")return this._renderCompact(a,o,l);const d=Gt(i,o,a.viewCtx),m=this._title();let _;if(r==="stacked"&&this._config.collapse_idle&&o.length===2){const g=u=>u.isActive||u.status==="delayed"||u.isDoneLike,f=u=>u.status==="idle"||u.status==="stale"||u.status==="off";_=o.map(u=>{const y=o.find(x=>x!==u),w=f(u)&&g(y);return w&&!this._ui.expanded.has(u.key)?(this._collapsedNow=!0,yi(a,u)):Zt(a,u,{collapsible:w})})}else _=o.map(g=>Zt(a,g));const c=this._config.show_totals&&!i.machineOff?Jn(i,e):null;return h`<ha-card lang=${e} class="layout-${r}">
      ${l}
      <div class="header">
        <h2 class="title" tabindex="-1" data-focus-key="title">
          <ha-icon icon="mdi:washing-machine" aria-hidden="true"></ha-icon><span class="clamp2">${m}</span>
        </h2>
        ${a.isAdmin?h`<a
              class="dev-link"
              href="/config/devices/device/${i.deviceId}"
              aria-label=${s(e,"a11y.open_device_for",{name:m})}
              title=${s(e,"a11y.open_device")}
              @click=${g=>{g.preventDefault(),this._handlers.openDevice()}}
              ><ha-icon icon="mdi:chevron-right" aria-hidden="true"></ha-icon
            ></a>`:p}
        ${this._sampleActive?h`<span class="sample-chip">${s(e,"card.sample")}</span>`:p}
        <span class="headline clamp2">${d}</span>
        ${i.childLock===!0&&!i.machineOff?h`<ha-icon
              class="status-icon"
              role="img"
              icon="mdi:lock-outline"
              title=${s(e,"a11y.child_lock")}
              aria-label=${s(e,"a11y.child_lock")}
            ></ha-icon>`:p}
      </div>
      ${ai(a)}
      <div class="drums ${o.length===2?"two":""}">${_}</div>
      ${i.machineOff?h`<div class="off-explain spanning">
            ${i.offReason==="power"?s(e,"off.explain_power"):s(e,"off.explain")}
          </div>`:p}
      ${c?h`<div class="footer">
            ${c.water?h`<button type="button" @click=${()=>this._handlers.moreInfo(c.water.entity)}>
                  <ha-icon icon="mdi:water" aria-hidden="true"></ha-icon><span>${c.text}</span>
                </button>`:h`<span>${c.text}</span>`}
          </div>`:p}
      ${this._renderDialog(a)}
    </ha-card>`}_renderCompactTitle(){const e=this._title();return e?h`<h2 class="compact-title ellipsis" tabindex="-1" data-focus-key="title">${e}</h2>`:p}_renderCompact(e,t,a){const i=t.map(m=>e.views[m.key]),r=m=>e.config.show_notices&&m.notices.length>0,o=i.length===2&&i[0].short===i[1].short&&!t.some(r)&&!i.some(m=>m.attention),l=Gt(e.model,t,e.viewCtx),d=e.model.fault;return h`<ha-card lang=${e.lang} class="layout-compact">
      ${a} ${this._renderCompactTitle()}
      ${d.on?Ge(e,null,s(e.lang,"head.attention"),s(e.lang,"compact.attention"),{icon:"mdi:alert-circle",tint:"fault",onTap:()=>this._handlers.moreInfo(d.entity)}):p}
      ${o?Ge(e,null,l,l,{icon:"mdi:washing-machine"}):t.map(m=>{const _=e.views[m.key];return Ge(e,m,_.short,_.aria,{tint:_.tint,notice:r(m)})})}
    </ha-card>`}_renderDialog(e){const t=this._dialog;if(!t)return p;const a=e.model[t.drum],i=this._signature(a,t.cmd)!==t.signature;return h`<dialog
      aria-labelledby="dlg-title"
      aria-describedby="dlg-body"
      @cancel=${r=>{r.preventDefault(),this._closeDialog()}}
      @click=${r=>this._onDialogClick(r)}
      @keydown=${r=>{r.key==="Escape"&&(r.preventDefault(),this._closeDialog())}}
    >
      ${bi(e.lang,a,t,i,()=>this._closeDialog(),()=>this._confirmDialog())}
    </dialog>`}};Ee.styles=Qn,Ee.properties={hass:{attribute:!1},preview:{type:Boolean},editMode:{attribute:!1},_config:{state:!0},_layout:{state:!0},_tick:{state:!0},_dialog:{state:!0},_announce:{state:!0},_rev:{state:!0}};let it=Ee;customElements.get(pe)||(customElements.define(pe,it),window.customCards=window.customCards||[],window.customCards.push({type:pe,name:"Haier Laundry Centre",description:"Is it done, and when? Washer and dryer status at a glance, with safe start, pause and cancel.",preview:!0,documentationURL:Ti}),console.info(`%c HAISMART-LAUNDRY-CARD %c v${Ci} `,"color:#fff;background:#03a9f4;font-weight:600;border-radius:4px 0 0 4px","color:#03a9f4;background:transparent;font-weight:600"));export{pe as CARD_TYPE,Mi as DEFAULTS,Ai as EDITOR_TYPE,ea as FULL_MIN_WIDTH,it as HaismartLaundryCard,ta as STACKED_MIN_WIDTH,Oi as layoutForWidth,Pi as validateConfig};
