import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as y,i as p}from"./assets/vendor-651d7991.js";const s=document.querySelector("button[data-start]"),S=document.querySelector("input#datetime-picker");let i=null,c=!1,d;s.disabled=!0;let a=null;y(S,{enableTime:!0,dateFormat:"Y-m-d H:i",time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:function(t){const e=Date.now();t[0]<e?p.error({message:"Please choose a date in the future",position:"topRight",close:!0,timeout:2e3,closeOnClick:!0,closeOnEscape:!0}):(s.disabled=!1,i=new Date(t).getTime(t))}});function T(){c||(c=!0,d=setInterval(()=>{const t=Date.now();a=i-t;const{days:e,hours:n,minutes:o,seconds:u}=q(a);g({days:e,hours:n,minutes:o,seconds:u}),a<1e3&&b()},1e3))}function b(){c=!1,clearInterval(d)}s.addEventListener("click",()=>{s.disabled=!0,T()});function q(t){const l=r(Math.floor(t/864e5)),m=r(Math.floor(t%864e5/36e5)),f=r(Math.floor(t%864e5%36e5/6e4)),h=r(Math.floor(t%864e5%36e5%6e4/1e3));return{days:l,hours:m,minutes:f,seconds:h}}function r(t){return String(t).padStart(2,"0")}const v=document.querySelector("[data-days]"),C=document.querySelector("[data-hours]"),D=document.querySelector("[data-minutes]"),M=document.querySelector("[data-seconds]");function g({days:t,hours:e,minutes:n,seconds:o}){v.textContent=t,C.textContent=e,D.textContent=n,M.textContent=o}
//# sourceMappingURL=commonHelpers.js.map
