(this["webpackJsonpvideopoker-dapp"]=this["webpackJsonpvideopoker-dapp"]||[]).push([[0],{102:function(e){e.exports=JSON.parse('[{"address":"0xd2819163a142b32d21bacea22428c58237d247af","name":"BSC Testnet","unit":"BNB","coingecko":"binancecoin"},{"address":"0xa65432ed7bf63e0ab54532d478fcac0f5a0dfe4f","name":"Matic Testnet","unit":"MATIC","coingecko":"matic-network"}]')},199:function(e){e.exports=JSON.parse('{"a":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"gameId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"result","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"End","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"gameId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cards","type":"uint256"}],"name":"Start","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"}],"name":"getGame","outputs":[{"components":[{"internalType":"uint256","name":"bet","type":"uint256"},{"internalType":"address","name":"player","type":"address"},{"internalType":"uint32","name":"cards","type":"uint32"},{"internalType":"uint64","name":"timestamp","type":"uint64"}],"internalType":"struct Videopoker.Game","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"getGames","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinBet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxBet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_risk","type":"uint256"}],"name":"setRisk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"}],"name":"start","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"},{"internalType":"uint256","name":"change","type":"uint256"}],"name":"end","outputs":[],"stateMutability":"nonpayable","type":"function"}]}')},206:function(e,t,n){},207:function(e,t,n){},220:function(e,t){},229:function(e,t){},247:function(e,t){},249:function(e,t){},266:function(e,t){},268:function(e,t){},273:function(e,t){},274:function(e,t){},310:function(e,t){},312:function(e,t){},357:function(e,t){},358:function(e,t){},429:function(e,t){},431:function(e,t){},436:function(e,t){},438:function(e,t){},445:function(e,t){},457:function(e,t){},460:function(e,t){},465:function(e,t){},496:function(e,t,n){},497:function(e,t,n){},498:function(e,t,n){},499:function(e,t,n){},500:function(e,t,n){},501:function(e,t,n){"use strict";n.r(t);var a=n(9),s=n.n(a),i=n(194),c=n.n(i),r=(n(206),n.p+"static/media/card.bad10dba.mp3"),l=n.p+"static/media/error.0c2f182b.mp3",u=n.p+"static/media/draw.d1037966.mp3",o=n.p+"static/media/loss.76807f79.mp3",d=n.p+"static/media/win.8edc9ff0.mp3";function p(e){const t=new Audio(e);return()=>{t.volume=1,t.currentTime=0,t.play()}}const b=p(r),m=p(l),h=p(u),j=p(o),f=p(d),y=1000000000000000000n;let O;!function(e){e[e.hearts=0]="hearts",e[e.diamonds=16]="diamonds",e[e.clubs=32]="clubs",e[e.spades=48]="spades"}(O||(O={}));const x=["Jacks or better","Two pair","Three of a kind","Straight","Flush","Full house","Four of a kind","Straight flush","Royal flush"];class w{constructor(e,t){this._value=e,this._suit=t}get value(){switch(this._value){case 10:return"J";case 11:return"Q";case 12:return"K";case 13:return"A";default:return(1+this._value).toString()}}get className(){switch(this._suit){case O.hearts:return"hearts";case O.diamonds:return"diamonds";case O.clubs:return"clubs";case O.spades:return"spades";default:return""}}}function v(e){const t=Array(5);for(let n=0;n<t.length;n++){const a=6*n,s=(e&63<<a)>>a;t[n]=new w(15&s,48&s)}return t}function g(e){return[0!==(16&e),0!==(8&e),0!==(4&e),0!==(2&e),0!==(1&e)]}n(207);var N=n(1);function S({card:e,name:t,flipped:n=!1}){return Object(N.jsxs)("div",{className:n?"card flipped":"card",children:[Object(N.jsx)("input",{id:t,type:"checkbox",name:t,onChange:b}),Object(N.jsxs)("label",{htmlFor:t,className:e.className,children:[Object(N.jsx)("span",{className:"value",children:e.value}),Object(N.jsx)("span",{className:"suit"})]})]})}function M({cards:e,flipped:t=[]}){return Object(N.jsx)("div",{className:"cards-component",children:v(e).map(((e,n)=>Object(N.jsx)(S,{card:e,name:`card${n}`,flipped:t[n]},n)))})}var T=n(195),B=n.n(T),I=n(199);class k{constructor(e,t,n){this.web3=e,this.address=t,this.contract=n,this.balance=0n,this.min=0n,this.max=0n}call(e,...t){return this.contract.methods[e](...t).call({from:this.address})}send(e,t,...n){return this.contract.methods[e](...n).send({from:this.address,value:t.toString()})}event(e,t,n){const a=this.contract.events[e]({filter:{gameId:t}}).on("data",(e=>{n(e.returnValues),a.off("data")}))}async updateBalance(){return this.balance=BigInt(await this.web3.eth.getBalance(this.address))}async updateMin(){return this.min=BigInt(await this.call("getMinBet"))}async updateMax(){return this.max=BigInt(await this.call("getMaxBet"))}async getGasPrice(){return BigInt(await this.web3.eth.getGasPrice())}async getGame(e){const t=await this.call("getGame",e),n={id:e,playable:!1,bet:BigInt(t.bet),cards:+t.cards,finished:!1,date:new Date(1e3*t.timestamp)};if(0===n.cards)n.change=31;else{const e=(n.bet&0b11n<<254n)>>254n;0n===e?(n.playable=!0,n.bet&=(1n<<249n)-1n):1n===e?(n.finished=!0,n.change=Number((n.bet&0b11111n<<249n)>>249n),n.bet&=(1n<<249n)-1n):(n.finished=!0,n.result=Number((n.bet&0b11111n<<249n)>>249n),n.payout=n.bet&(1n<<249n)-1n)}return n}getGames(){return this.call("getGames",this.address)}start(e){const t=function(){let e=0n;for(let t=0;t<8;t++)e|=BigInt(Math.floor(2147483648*Math.random()))<<BigInt(31*t);return e}();return new Promise(((n,a)=>{this.send("start",e,t).catch(a),this.startEvent(t).then(n)}))}startEvent(e){return new Promise((t=>{this.event("Start",e,t)}))}end(e,t){return new Promise(((n,a)=>{this.send("end",0,e,t).catch(a),this.endEvent(e).then(n)}))}endEvent(e){return new Promise((t=>{this.event("End",e,t)}))}}var $=n(102);function E({address:e,setError:t,setContract:n}){const[s,i]=Object(a.useState)(!0),[c,r]=Object(a.useState)(!1);async function l(e){try{const t=window.contract=await async function(e){const t=window.ethereum;if(t){const[n]=await t.request({method:"eth_requestAccounts"}),a=new B.a(t),s=new a.eth.Contract(I.a,e);return new k(a,n,s)}throw new Error("Could not detect wallet extension")}(e);return await Promise.all([t.updateBalance(),t.updateMin(),t.updateMax()]),t}catch(n){i(!0),t(n.message||"Could not load contract")}}async function u(e){const a=e.toLowerCase();t(null),n(null),r(!0);const s=await l(a);if(s){i(!1);const e=n(s,$.find((e=>a===e.address))||{address:a});e instanceof Promise&&await e}r(!1)}return Object(a.useEffect)((()=>{e&&u(e)}),[e]),Object(N.jsxs)("form",{className:"row force-margin",onSubmit:function(e){e.preventDefault(),u(new FormData(e.target).get("address"))},children:[Object(N.jsx)("label",{htmlFor:"input-contract",className:"label",children:"Contract"}),Object(N.jsxs)("div",{className:"value group",children:[Object(N.jsx)("input",{id:"input-contract",name:"address",defaultValue:e||$[0].address,spellCheck:!1}),Object(N.jsx)("button",{type:"submit",className:c?"loading":"",style:{width:"8rem"},children:s?"Use":"Change"})]})]})}function C(e,t=18){const n=e=>e.slice(0,t).replace(/0+$/,""),a=e.toString();if("0"===a)return a;if(a.length>18){const e=a.slice(0,-18),t=n(a.substr(a.length-18));return""===t?e:`${e}.${t}`}return`0.${n(a.padStart(18,"0"))}`}function G(e){return e.toString().padStart(2,"0")}n(496);function P({address:e="",page:t=1}){const[n,s]=Object(a.useState)(null),[i,c]=Object(a.useState)(""),[r,l]=Object(a.useState)(null),[u,o]=Object(a.useState)(null),[d,p]=Object(a.useState)(null),[b,m]=Object(a.useState)(null);async function h(e,t,n){const a=5*t,s=await Promise.all(n.slice(a,a+5).map((t=>e.getGame(t))));m(s.some((e=>e.change>0))),p(s)}return Object(a.useEffect)((()=>{n&&u&&h(n,t-1,u)}),[t]),Object(a.useEffect)((()=>{const e=setInterval((()=>b&&h(n,t-1,u)),5e3);return()=>clearInterval(e)})),Object(N.jsxs)("div",{className:"history-component",children:[Object(N.jsx)(E,{address:e,setError:console.warn,setContract:async function(e,n){if(e){const a=(await e.getGames()).slice().reverse();o(a),l(Math.ceil(a.length/5)),c(n.unit||""),await h(e,t-1,a),window.location.hash=`#history/${n.address}/${t}`}else p(null),o(null),c(null);s(e)}}),Object(N.jsxs)("div",{className:"row",children:[Object(N.jsx)("label",{id:"input-order",className:"label",children:"Order by"}),Object(N.jsx)("div",{className:"value",children:Object(N.jsxs)("select",{id:"input-order",disabled:!0,onChange:function(e){console.log(e)},children:[Object(N.jsx)("option",{value:"desc",children:"Newest"}),Object(N.jsx)("option",{value:"asc",children:"Oldest"})]})})]}),d&&(d.length?Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)("div",{className:"row",children:Object(N.jsx)("div",{style:{width:"100%"},children:d.map((t=>{return Object(N.jsxs)("div",{className:"history-component-game",children:[Object(N.jsx)("div",{className:"date",children:(n=t.date,`${n.getFullYear().toString().padStart(4,"0")}-${G(n.getMonth()+1)}-${G(n.getDate())} ${G(n.getHours())}:${G(n.getMinutes())}:${G(n.getSeconds())}`)}),Object(N.jsxs)("div",{className:"results",children:[Object(N.jsx)("fieldset",{className:"cards",disabled:!0,children:Object(N.jsx)(M,{cards:t.cards,flipped:g(t.change||0)})}),Object(N.jsx)("div",{className:"result",children:t.playable||t.change>0?Object(N.jsx)("a",{href:`/#play/${e}/${t.id}`,children:Object(N.jsx)("button",{type:"button",children:"Resume"})}):t.result?Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)("div",{children:x[t.result-1]}),Object(N.jsxs)("div",{className:"amount",children:[C(t.payout,8)," ",i]})]}):""})]})]},t.id);var n}))})}),Object(N.jsxs)("div",{className:"row history-component-footer",children:[Object(N.jsxs)("span",{children:["Page ",t," of ",r]}),Object(N.jsx)("div",{className:"spacer"}),Object(N.jsx)(F,{enabled:t>1&&r>1,href:`#history/${e}/${t-1}`,children:"\u2039"}),Object(N.jsx)(F,{enabled:t<r,href:`#history/${e}/${+t+1}`,children:"\u203a"})]})]}):Object(N.jsx)("div",{className:"history-component-empty",children:"You haven't played any games yet"}))]})}function F({enabled:e,href:t,children:n}){return e?Object(N.jsx)("a",{className:"nav",href:t,children:Object(N.jsx)("button",{children:n})}):Object(N.jsx)("button",{className:"nav",disabled:!0,children:n})}n(497),n(498);function A({error:e}){return Object(N.jsx)("div",{className:"error-component",children:e})}const D=Array(5).fill(!0),_=Array(5).fill(!1);function J({address:e,resume:t}){const n=Object(a.useRef)(),s=Object(a.useRef)(),[i,c]=Object(a.useState)(!0),[r,l]=Object(a.useState)(null),[u,o]=Object(a.useState)(null),[d,p]=Object(a.useState)(!1),[b,O]=Object(a.useState)(""),[w,v]=Object(a.useState)(void 0),[S,T]=Object(a.useState)(0),[B,I]=Object(a.useState)(D),[k,$]=Object(a.useState)(null),[G,P]=Object(a.useState)(null),[F]=Object(a.useState)(Math.random());async function J(e){if(await e,!i)throw new A("Component is no longer active");return e}function R(e){return Promise.all([e.updateBalance().then((e=>(v(e),e))),e.updateMin(),e.updateMax()])}function H(){return R(r)}async function q(e){const t=function(e){const t=e.match(/^(0|[1-9]\d*)(?:\.(\d{1,18}))?$/);if(t)return t[2]?BigInt(t[1])*y+BigInt(t[2].padEnd(18,"0")):BigInt(e)*y;throw new SyntaxError("Invalid number")}(e.get("bet"));if(await J(H()),t>r.max)throw new A("Bet too high");if(t<r.min)throw new A("Bet too low");if(t>r.balance)throw new A("Insufficient balance");{const e=B;I(D),$(null),await L(t,r.start(t).finally((()=>{i&&I(e)})))}}async function L(e,t){const{gameId:n,cards:a}=await J(t);for(const i of s.current.querySelectorAll(":checked"))i.checked=!1;T(a),I(_),v(w-e),o(n),p(!1),h()}async function V(e){let t=0;const n=[];for(let a=0;a<5;a++)e.get("card"+a)||(t|=1<<a,n[a]=1);I(n),await K(r.end(u,t).finally((()=>{I(_)})))}async function K(e){const{cards:t,result:n,payout:a}=await J(e),s=+n;s?(a>0&&v(w+BigInt(a)),$({index:s,payout:a}),f()):($(null),j()),T(Number(68719476735n&BigInt(t))),I(_),o(null),p(!1)}return Object(a.useEffect)((()=>()=>c(!1)),[]),Object(a.useEffect)((()=>{if(r){const e=setInterval(H,3e4);return()=>clearInterval(e)}}),[r]),Object(N.jsxs)("div",{className:"play-component",children:[Object(N.jsx)(E,{address:e,setError:P,setContract:async function(e,a){if(e){await J(R(e));const{unit:s}=a;O(s||"");let i=e.balance/10n;if(i>e.max?i=e.max:i<e.min&&(i=e.min),n.current.value=C(i,5),window.location.hash=`#play/${a.address}`,t){const a=await J(e.getGame(t)),s=a.change>0;(a.playable||s)&&(n.current.value=C(a.bet),T(a.cards),o(a.id),s?(I(g(a.change)),p(!0),a.finished?K(e.endEvent(a.id)):L(a.bet,e.startEvent(a.id))):I(_))}}else n.current.value="";l(e)}}),Object(N.jsx)("form",{onSubmit:async function(e){e.preventDefault(),P(null),p(!0);try{await(u?V:q)(new FormData(e.target))}catch(t){i?(P(t.message),m(),p(!1)):console.warn("Error thrown on inactive component",t)}},children:Object(N.jsxs)("fieldset",{disabled:d||!r,children:[Object(N.jsxs)("div",{className:"row",children:[Object(N.jsx)("label",{htmlFor:"input-balance",className:"label",children:"Balance"}),Object(N.jsx)("div",{className:"value",children:Object(N.jsx)("input",{id:"input-balance",disabled:!0,value:w>=0n?`${C(w)} ${b}`:""})})]}),Object(N.jsxs)("div",{className:"row",children:[Object(N.jsx)("label",{htmlFor:"input-bet",className:"label",children:"Bet"}),Object(N.jsxs)("fieldset",{className:"value group",disabled:!!u,children:[Object(N.jsx)("input",{ref:n,id:"input-bet",name:"bet",spellCheck:!1}),Object(N.jsx)("button",{type:"button",onClick:async function(){await H(),n.current.value=C(r.min)},children:"Min"}),Object(N.jsx)("button",{type:"button",onClick:async function(){const[e]=await Promise.all([r.getGasPrice(),H()]),t=r.balance-310000n*e;n.current.value=C(r.max<t?r.max:t)},children:"Max"})]})]}),Object(N.jsx)("fieldset",{ref:s,className:"row play-component-cards",disabled:!u,children:Object(N.jsx)(M,{cards:S,flipped:B})}),Object(N.jsx)("div",{className:"row",children:Object(N.jsx)("button",{type:"submit",className:"play-component-play-button"+(d?" loading":""),children:u?"Draw":"Deal"})}),k&&Object(N.jsx)("div",{className:"row",children:Object(N.jsxs)("div",{className:"play-component-result",children:[Object(N.jsx)("div",{children:x[k.index-1]}),Object(N.jsxs)("div",{className:"amount",children:["+",C(k.payout)," ",b]})]})}),G&&Object(N.jsx)("div",{className:"row",children:Object(N.jsx)(A,{error:G})})]})})]})}n(499);function R({address:e}){const t=(e,t,...n)=>`#${e}${t?[t,...n].map((e=>"/"+e)).join(""):""}`;return Object(N.jsxs)("div",{className:"footer-component",children:[Object(N.jsxs)("div",{className:"links",children:[Object(N.jsx)("a",{href:t("play",e),children:"Play"}),Object(N.jsx)("a",{href:t("history",e,"1"),children:"History"}),Object(N.jsx)("a",{href:"#howtoplay",children:"How to play"}),Object(N.jsx)("a",{href:"https://github.com/Kripth/videopoker-dapp",target:"_blank",rel:"noreferrer",children:"GitHub"})]}),Object(N.jsxs)("div",{className:"suits",children:[Object(N.jsx)("div",{className:"suit hearts"}),Object(N.jsx)("div",{className:"suit spades"}),Object(N.jsx)("div",{className:"suit diamonds"}),Object(N.jsx)("div",{className:"suit clubs"})]})]})}n(500);function H(){function e(){return window.location.hash.substr(1).split("/")}const[t,n]=Object(a.useState)(e());return Object(a.useEffect)((()=>{const t=()=>n(e());return window.addEventListener("hashchange",t),()=>window.removeEventListener("hashchange",t)})),Object(N.jsxs)("div",{className:"app-component",children:[Object(N.jsx)("div",{className:"app-component-title",children:"videopoker-dapp"}),Object(N.jsx)("div",{className:"app-component-content",children:"history"===t[0]?Object(N.jsx)(P,{address:t[1],page:t[2]}):Object(N.jsx)(J,{address:t[1],resume:t[2]})}),Object(N.jsx)(R,{address:t[1]})]})}c.a.render(Object(N.jsx)(s.a.StrictMode,{children:Object(N.jsx)(H,{})}),document.getElementById("root"))}},[[501,1,2]]]);
//# sourceMappingURL=main.9fa4e28b.chunk.js.map