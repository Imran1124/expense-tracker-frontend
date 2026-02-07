import{c as N,j as e,A as d,t as k,n as y,X as w}from"./index-B2i-Z-2r.js";import{r as m,R as $}from"./router-DGWWDTWv.js";import{f as P,I,g as C}from"./button-CUJotFVE.js";import{a as z,C as O}from"./chevron-right-mp1EPiEu.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=N("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]),x=({className:r,...a})=>e.jsx("nav",{role:"navigation","aria-label":"pagination",className:d("mx-auto flex w-full justify-center",r),...a});x.displayName="Pagination";const f=m.forwardRef(({className:r,...a},n)=>e.jsx("ul",{ref:n,className:d("flex flex-row items-center gap-1",r),...a}));f.displayName="PaginationContent";const R=m.forwardRef(({className:r,...a},n)=>e.jsx("li",{ref:n,className:d("",r),...a}));R.displayName="PaginationItem";const u=({className:r,isActive:a,size:n="icon",...t})=>e.jsx("a",{"aria-current":a?"page":void 0,className:d(P({variant:a?"outline":"ghost",size:n}),r),...t});u.displayName="PaginationLink";const g=({className:r,...a})=>e.jsxs(u,{"aria-label":"Go to previous page",size:"default",className:d("gap-1 pl-2.5",r),...a,children:[e.jsx(z,{className:"h-4 w-4"}),e.jsx("span",{children:"Previous"})]});g.displayName="PaginationPrevious";const b=({className:r,...a})=>e.jsxs(u,{"aria-label":"Go to next page",size:"default",className:d("gap-1 pr-2.5",r),...a,children:[e.jsx("span",{children:"Next"}),e.jsx(O,{className:"h-4 w-4"})]});b.displayName="PaginationNext";const E=[5,10,15,20];function B({page:r,perPage:a,totalPage:n,hasNextPage:t,hasPrevPage:i,setPage:s,setPerPage:c}){return e.jsxs("div",{className:"flex justify-between items-center gap-2",children:[e.jsx("div",{children:e.jsx("select",{className:"border  border-gray-300  rounded-md px-2 py-1.5 ",value:a,onChange:o=>c(parseInt(o.target.value)),children:E.map(o=>e.jsx("option",{value:o,children:o},o))})}),e.jsxs(x,{children:[e.jsx(g,{className:"cursor-pointer",onClick:()=>{i&&s(o=>o-1)},children:"Previous"}),e.jsxs(f,{children:[r,"of ",Math.ceil(n/a)]}),e.jsx(b,{className:"cursor-pointer","aria-disabled":r==n/a,onClick:()=>{t&&s(o=>o+1)},children:"Next"})]})]})}const p="horizontal",S=["horizontal","vertical"],h=m.forwardRef((r,a)=>{const{decorative:n,orientation:t=p,...i}=r,s=v(t)?t:p,o=n?{role:"none"}:{"aria-orientation":s==="vertical"?s:void 0,role:"separator"};return m.createElement(k.div,y({"data-orientation":s},o,i,{ref:a}))});h.propTypes={orientation(r,a,n){const t=r[a],i=String(t);return t&&!v(t)?new Error(T(i,n)):null}};function T(r,a){return`Invalid prop \`orientation\` of value \`${r}\` supplied to \`${a}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${p}\`.`}function v(r){return S.includes(r)}const j=h,F=m.forwardRef(({className:r,orientation:a="horizontal",decorative:n=!0,...t},i)=>e.jsx(j,{ref:i,decorative:n,orientation:a,className:d("shrink-0 bg-zinc-200 dark:bg-zinc-800",a==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",r),...t}));F.displayName=j.displayName;function G({search:r,setSearch:a,isFetching:n}){return e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(I,{value:r,onChange:t=>{a(t.target.value)},placeholder:"Search",className:"rounded-lg",prefix:"search"}),e.jsx("span",{className:"",children:n&&e.jsx(C,{className:"mr-2 h-4 w-4 animate-spin"})})]})}const L=()=>e.jsx("div",{className:"flex justify-center items-center",children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"}),e.jsx("div",{className:"absolute inset-0 w-8 h-8 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"})]})});function M({children:r,open:a,setOpen:n,title:t,setEdit:i,isLoading:s}){const c=()=>{i&&i(!1),n(l=>!l)},o=l=>{l.target===l.currentTarget&&c()};return $.useEffect(()=>(a?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[a]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes backdropFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalFadeOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .modal-backdrop {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .dark .modal-content {
          background: rgba(17, 24, 39, 0.95);
          border: 1px solid rgba(75, 85, 99, 0.3);
        }

        .modal-enter {
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .backdrop-enter {
          animation: backdropFadeIn 0.3s ease-out;
        }

        .close-button {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.1),
            rgba(147, 51, 234, 0.1)
          );
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .close-button:hover {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.2),
            rgba(147, 51, 234, 0.2)
          );
          transform: scale(1.05);
        }

        .header-gradient {
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.1),
            rgba(168, 85, 247, 0.1)
          );
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        }

        .dark .header-gradient {
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.2),
            rgba(168, 85, 247, 0.2)
          );
          border-bottom: 1px solid rgba(99, 102, 241, 0.3);
        }

        .loading-shimmer {
          background: linear-gradient(
            90deg,
            rgba(99, 102, 241, 0.1) 0%,
            rgba(168, 85, 247, 0.2) 50%,
            rgba(99, 102, 241, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }

        @media (max-width: 640px) {
          .modal-content {
            margin: 1rem;
          }
        }
      `}),a&&e.jsx("div",{className:"fixed inset-0 z-50 modal-backdrop backdrop-enter",style:{background:"linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(17, 24, 39, 0.6))"},onClick:o}),e.jsx("div",{id:"authentication-modal",tabIndex:-1,"aria-hidden":!a,className:`${a?"flex":"hidden"} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center p-1`,onClick:o,children:e.jsx("div",{className:`relative modal-enter w-full max-w-md \r
          `,onClick:l=>l.stopPropagation(),children:e.jsxs("div",{className:"modal-content modal-enter rounded-2xl shadow-2xl overflow-hidden",children:[e.jsxs("div",{className:"header-gradient flex items-center justify-between p-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400",children:t??"Add/Edit"}),e.jsx("div",{className:"w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"})]}),e.jsx("button",{onClick:c,type:"button",className:"close-button p-1.5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-400 transition-all duration-200 group","aria-label":"Close modal",children:e.jsx(w,{className:"w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors duration-200"})})]}),e.jsx("div",{className:"p-4 bg-white dark:bg-gray-800 min-h-[120px]",children:s?e.jsxs("div",{className:"flex flex-col justify-center items-center h-32 space-y-4",children:[e.jsx("div",{className:"loading-shimmer w-full h-2 rounded-full"}),e.jsx(L,{}),e.jsx("div",{className:"loading-shimmer w-3/4 h-2 rounded-full"}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400 animate-pulse",children:"Loading..."})]}):e.jsx("div",{className:"space-y-1",children:r})}),e.jsx("div",{className:"h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"})]})})})]})}export{M as D,_ as P,F as S,G as a,B as b};
