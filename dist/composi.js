(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.composi={})})(this,function(a){"use strict";function b(a,b,c,d,e,f){return{type:a,props:b,children:c,element:d,key:e,flag:f}}function c(a,c){return b(a,v,w,c,null,s)}function d(a){let c=a;return"string"==typeof c&&(c=document.querySelector(c)),b(c.nodeName.toLowerCase(),v,w.map.call(c.childNodes,e),c,null,r)}function e(a){return 3===a.nodeType?c(a.nodeValue,a):d(a)}function f(...a){function c(a,b=new WeakMap){if(Object(a)!==a)return a;if(b.has(a))return b.get(a);const d=a instanceof Date?new Date(a):a instanceof RegExp?new RegExp(a.source,a.flags):a.constructor?new a.constructor:Object.create(null);return b.set(a,d),Object.assign(d,...Object.keys(a).map(d=>({[d]:c(a[d],b)})))}return a.unshift({}),a.reduce((d,a)=>Object.assign(d,c(a)))}function g(a){return"number"==typeof a&&isNaN(a)?"nan":a&&3===a.nodeType?"text":a&&1===a.nodeType?"element":/\[object (.*)]/.exec(toString.call(a))[1].toLowerCase()}function h(a){return a.currentTarget.events[a.type](a)}function i(a){return null==a?null:a.key}function j(a,b,c){let d=b;const e={};let f,g;for(;d<=c;d++)null!=(f=(g=a[d]).key)&&(e[f]=g);return e}function k(a,b,c,d,e){let j=b,k=c;if(k!==d)if("style"===j&&"Object"===g(d))for(let b in f(k,d)){const c=null==d||null==d[b]?"":d[b];"-"===b[0]?a[j].setProperty(b,c):a[j][b]=c}else if("key"!==j)if("className"===j&&(j="class"),"o"===j[0]&&"n"===j[1])a.events||(a.events={}),j=j.slice(2).toLowerCase(),k||(k=a.events[j]),a.events[j]=d,null==d?a.removeEventListener(j,h):null==k&&a.addEventListener(j,h);else{const b=null==d||!1===d||"no"===d||"off"===d;j in a&&"list"!==j&&"type"!==j&&"draggable"!==j&&"spellcheck"!==j&&"translate"!==j&&!e?(a[j]=null==d?"":d,b&&a.removeAttribute(j)):"xlink-href"===j||"xlinkHref"===j?(a.setAttributeNS(t,"href",d),a.setAttribute("href",d)):b?a.removeAttribute(j):a.setAttribute(j,d)}}function l(a,b,c){let d,e=c;d=a.flag===s?document.createTextNode(a.type):(e=e||"svg"===a.type)?document.createElementNS(u,a.type):document.createElement(a.type);const f=a.props;f.onmount&&b.push(function(){f.onmount(d)});for(let f=0,g=a.children.length;f<g;f++)d.appendChild(l(a.children[f],b,e));for(let g in f)k(d,g,null,f[g],e);return a.element=d}function m(a){for(let b=0,c=a.children.length;b<c;b++)m(a.children[b]);return a.element}function n(a,b){function c(){a&&a.nodeType&&a.removeChild(m(b))}const d=b.props&&b.props.onunmount;null==d?c():d(c,b.element)}function o(a,b,c,d,e,g){for(let h in f(b,c))("value"==h||"checked"==h?a[h]:b[h])!==c[h]&&k(a,h,b[h],c[h],e);const h=g?c.onmount:c.onupdate;null!=h&&d.push(function(){h(a,b,c)})}function p(a,b,c,d,e,f){let g=b,h=f;if(d===c);else if(null!=c&&c.flag===s&&d.flag===s)c.type!==d.type&&(g.nodeValue=d.type);else if(null==c||c.type!==d.type){const b=a.insertBefore(l(d,e,h),g);null!=c&&n(a,c),g=b}else{o(g,c.props,d.props,e,h=h||"svg"===d.type,c.flag===r);let a,b,f;const k=c.children;let m,q=0,s=k.length-1;const t=d.children;let u=0,v=t.length-1;for(;u<=v&&q<=s&&(f=i(k[q]),m=i(t[u]),null!=f&&f===m);)p(g,k[q].element,k[q],t[u],e,h),q++,u++;for(;u<=v&&q<=s&&(f=i(k[s]),m=i(t[v]),null!=f&&f===m);)p(g,k[s].element,k[s],t[v],e,h),s--,v--;if(q>s)for(;u<=v;)g.insertBefore(l(t[u++],e,h),(b=k[q])&&b.element);else if(u>v)for(;q<=s;)n(g,k[q++]);else{let d=j(k,q,s);const l={};for(;u<=v;){if(f=i(b=k[q]),m=i(t[u]),l[f]||null!=m&&m===i(k[q+1])){null==f&&n(g,b),q++;continue}null==m||c.flag===r?(null==f&&(p(g,b&&b.element,b,t[u],e,h),u++),q++):(f===m?(p(g,b.element,b,t[u],e,h),l[m]=!0,q++):null==(a=d[m])?p(g,b&&b.element,null,t[u],e,h):(p(g,g.insertBefore(a.element,b&&b.element),a,t[u],e,h),l[m]=!0),u++)}for(;q<=s;)null==i(b=k[q++])&&n(g,b);for(let a in d)null==l[a]&&n(g,d[a])}}return d.element=g,d}function q(a,b,c){let d=a;"string"==typeof d&&(d=document.querySelector(d));const e=[];if(!c){if(Array.isArray(b))throw new x;const a=l(b,e);d.appendChild(a),b.element=a}else p(d,c.element,c,b,e);if(b!==c)for(;0<e.length;)e.pop()();return b.element.isMounted=!0,b}const r=0,s=3,t="http://www.w3.org/1999/xlink",u="http://www.w3.org/2000/svg",v={},w=[];class x{constructor(){this.message="Cannot insert Fragment tag directly into DOM.",this.toString=function(){return this.message}}}a.h=function(a,d,...e){const f=d||{};let g;const h=[],i=[];let j=e.length;const k=f.key;for(;0<j--;)h.push(e[j]);for(null!=f.children&&(0>=h.length&&h.push(f.children),delete f.children);0<h.length;)if(Array.isArray(g=h.pop()))for(j=g.length;0<j--;)h.push(g[j]);else if(!1===g||!0===g||null==g);else i.push("object"==typeof g?g:c(g));return delete f.key,"function"==typeof a?a(f,f.children=i):b(a,f,i,null,k,1)},a.render=function(a,b,c){let e=b;if("string"==typeof e&&(e=document.querySelector(b)),c){let b=c;"string"==typeof b&&(b=e.querySelector(b)),b=d(b),e.vnode=q(e,a,b)}else e.vnode?(q(e,a,e.vnode),e.vnode=a):e.vnode=q(e,a)},a.hydrate=d,Object.defineProperty(a,"__esModule",{value:!0})});
//# sourceMappingURL=composi.js.map
