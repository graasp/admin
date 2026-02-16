import{v as r,r as x,fE as h,f2 as s,j as t,fF as M,f as k}from"./index-B_BHgQQY.js";import{M as f}from"./MenuItemLink-BMQoDPhe.js";import{u as j}from"./LayoutContext-DvWbprYl.js";import{I as g}from"./IconButton-t5WdCoTE.js";import{M as _}from"./Menu-C45l_y2r.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],I=r("layout-grid",w);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],C=r("list",L);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]],T=r("map",E),d=({mode:a})=>{const{color:e}=k("primary");switch(a){case s.Map:return t.jsx(T,{color:e});case s.Grid:return t.jsx(I,{color:e});case s.List:default:return t.jsx(C,{color:e})}},N=()=>{const{mode:a}=j(),[e,i]=x.useState(null),l=!!e,m=o=>{i(o.currentTarget)},p=h({from:"/_memberOnly/_homeLayout",shouldThrow:!1}),u=h({from:"/builder/items/$itemId",shouldThrow:!1}),c=()=>{i(null)};let n=Object.values(s);return!p&&!u&&(n=n.filter(o=>o!==s.Map)),t.jsxs(t.Fragment,{children:[t.jsx(g,{id:M,onClick:m,children:t.jsx(d,{mode:a})}),t.jsx(_,{anchorEl:e,open:l,onClose:c,children:n.map(o=>t.jsx(f,{to:".",search:y=>({...y,mode:o}),onClick:()=>{c(),window.umami.track("toggle-layout-mode",{mode:o})},value:o,children:t.jsx(d,{mode:o})},o))})]})};export{N as M};
