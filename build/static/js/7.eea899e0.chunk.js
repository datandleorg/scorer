(this.webpackJsonpscorer_v1=this.webpackJsonpscorer_v1||[]).push([[7,12],{34:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},35:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(34);function c(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},36:function(e,t,n){"use strict";n.d(t,"e",(function(){return r})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return a}));var r=function(e,t){var n;return t&&(n=JSON.stringify(t)),window.localStorage.setItem(e,n)},c=function(e){var t=window.localStorage.getItem(e);return t?JSON.parse(t):null},i=function(e){var t=c("players");return t&&t.find((function(t){return t.id===e}))||null},s=function(e){var t=c("teams");return t&&t.find((function(t){return t.id===e}))||null},a=function(e){var t=c("matches");return t&&t.find((function(t){return t.id===e}))||null}},37:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(1),c=(n(0),n.p+"static/media/group.13f28106.svg"),i=n.p+"static/media/cricket.7320abc7.svg",s=n.p+"static/media/player.130ef4b5.svg",a=n(2);function o(){var e=Object(a.e)(),t=Object(a.f)(),n=function(t){e.push(t)};return Object(r.jsx)("div",{className:"footer",children:Object(r.jsxs)("div",{className:"menubar d-flex align-items-center text-center",children:[Object(r.jsxs)("div",{className:"menuitem p-2 ".concat(t&&"/teams"===t.path?"selected":""),onClick:function(){return n("/teams")},children:[Object(r.jsx)("div",{children:Object(r.jsx)("img",{src:c,style:{width:"50px"}})}),Object(r.jsx)("div",{children:"Teams"})]}),Object(r.jsxs)("div",{className:"menuitem p-2 ".concat(t&&"/matches"===t.path?"selected":""),onClick:function(){return n("/matches")},children:[Object(r.jsx)("div",{children:Object(r.jsx)("img",{src:i,style:{width:"50px"}})}),Object(r.jsx)("div",{children:"Matches"})]}),Object(r.jsxs)("div",{className:"menuitem p-2 ".concat(t&&"/players"===t.path?"selected":""),onClick:function(){return n("/players")},children:[Object(r.jsx)("div",{children:Object(r.jsx)("img",{src:s,style:{width:"50px"}})}),Object(r.jsx)("div",{children:"Players"})]})]})})}},38:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(35);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,c=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(o){c=!0,i=o}finally{try{r||null==a.return||a.return()}finally{if(c)throw i}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},39:function(e,t,n){"use strict";t.a=n.p+"static/media/plus2.a794f0b1.svg"},40:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(34);var c=n(35);function i(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},50:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return m}));var r=n(1),c=n(40),i=n(38),s=n(0),a=n.n(s),o=n(37),l=n(2),u=n(39),d=n(36);function m(e){var t=e.editMode,n=void 0!==t&&t,m=Object(l.e)(),j=Object(s.useState)([]),f=Object(i.a)(j,2),b=f[0],h=f[1],p=function(e){m.push(e)};return Object(s.useEffect)((function(){var e=Object(d.a)("matches");(null===e||void 0===e?void 0:e.length)>0&&h(Object(c.a)(e))}),[]),Object(r.jsxs)(a.a.Fragment,{children:[Object(r.jsxs)("div",{className:"matches-page-wrapper full-height",children:[Object(r.jsxs)("div",{className:"p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between",children:[Object(r.jsx)("div",{children:"Matches"}),!n&&Object(r.jsx)("div",{onClick:function(){return p("/match/add")},children:Object(r.jsx)("img",{src:u.a,width:"30px"})})]}),b.map((function(e,t){return Object(r.jsx)("div",{className:"border team-list-item p-2 shadow-sm mb-2",onClick:function(){p("/match/info/".concat(e.id))},children:Object(r.jsxs)("div",{className:"d-flex align-items-center",children:[Object(r.jsx)("img",{src:"https://img2.pngio.com/clipart-cricket-batsman-logo-cricket-logo-png-900_520.jpg",className:"rounded-circle teampic"}),Object(r.jsxs)("div",{className:"ml-2 w-100",children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{className:"font-weight-bold",children:e.team_1})," ",Object(r.jsx)("span",{className:"smaller",children:"Vs"})," ",Object(r.jsx)("span",{className:"font-weight-bold",children:e.team_2})]}),Object(r.jsxs)("div",{className:"d-flex team-stats align-items-center text-secondary",children:[Object(r.jsxs)("div",{className:"mr-3",children:["Overs: ",Object(r.jsx)("span",{className:"font-weight-bold",children:e.overs})]}),Object(r.jsxs)("div",{className:"mr-3",children:["Players Per Side: ",Object(r.jsx)("span",{className:"font-weight-bold",children:e.players_per_team})]})]}),Object(r.jsx)("div",{className:"text-secondary smaller",children:"11/09/1992"})]})]})},"team-".concat(t))}))]}),Object(r.jsx)(o.a,{})]})}}}]);
//# sourceMappingURL=7.eea899e0.chunk.js.map