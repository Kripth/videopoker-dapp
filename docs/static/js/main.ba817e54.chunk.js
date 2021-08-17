(this["webpackJsonpvideopoker-dapp"]=this["webpackJsonpvideopoker-dapp"]||[]).push([[0],{102:function(e){e.exports=JSON.parse('[{"name":"BSC Testnet","address":"0x851b7430Fb32E0C1c4Fb42a5ECD6Dbb2A383a7AF","chainId":"0x61","unit":"BNB","coingecko":"binancecoin"},{"name":"Matic Mumbai Testnet","address":"0x2942513a1E63061d8EB868fb255E5594127f776f","chainId":"0x13881","unit":"MATIC","coingecko":"matic-network"},{"name":"Matic Mainnet","address":"0xe3d9229ce06268945533467d191fcd78b8a02125","chainId":"0x89","unit":"MATIC","coingecko":"matic-network"}]')},193:function(e,t,n){},200:function(e){e.exports=JSON.parse('{"a":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"searchId","type":"uint256"},{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"gameId","type":"uint256"}],"name":"Created","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"gameId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"result","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"End","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"gameId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cards","type":"uint256"}],"name":"Start","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"}],"name":"getGame","outputs":[{"components":[{"internalType":"uint256","name":"bet","type":"uint256"},{"internalType":"address","name":"player","type":"address"},{"internalType":"uint32","name":"timestamp","type":"uint32"},{"internalType":"uint32","name":"cards","type":"uint32"},{"internalType":"uint8","name":"state","type":"uint8"},{"internalType":"uint8","name":"change","type":"uint8"},{"internalType":"uint8","name":"result","type":"uint8"}],"internalType":"struct Videopoker.Game","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"getGames","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayedGames","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinBet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxBet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPayouts","outputs":[{"internalType":"uint256[9]","name":"","type":"uint256[9]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_risk","type":"uint256"}],"name":"setRisk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"result","type":"uint256"},{"internalType":"uint256","name":"multiplier","type":"uint256"}],"name":"setPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[9]","name":"_payouts","type":"uint256[9]"}],"name":"setPayouts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"searchId","type":"uint256"}],"name":"start","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"},{"internalType":"uint8","name":"change","type":"uint8"}],"name":"end","outputs":[],"stateMutability":"nonpayable","type":"function"}]}')},207:function(e,t,n){},219:function(e,t){},228:function(e,t){},246:function(e,t){},248:function(e,t){},265:function(e,t){},267:function(e,t){},272:function(e,t){},273:function(e,t){},309:function(e,t){},311:function(e,t){},356:function(e,t){},357:function(e,t){},428:function(e,t){},430:function(e,t){},435:function(e,t){},437:function(e,t){},444:function(e,t){},456:function(e,t){},459:function(e,t){},464:function(e,t){},496:function(e,t,n){},497:function(e,t,n){},498:function(e,t,n){},499:function(e,t,n){},500:function(e,t,n){},501:function(e,t,n){},502:function(e,t,n){"use strict";n.r(t);var a=n(8),s=n.n(a),i=n(195),c=n.n(i),r=(n(207),n(196)),u=n.n(r),l=n(200);class o{constructor(e,t,n){this.web3=e,this.address=t,this.contract=n,this.balance=0n,this.min=0n,this.max=0n}call(e,...t){return this.contract.methods[e](...t).call({from:this.address})}send(e,t,...n){return this.contract.methods[e](...n).send({from:this.address,value:t.toString()})}event(e,t,n){const a=this.contract.events[e]({filter:t}).on("data",(e=>{n(e.returnValues),a.off("data")}))}async updateBalance(){return this.balance=BigInt(await this.web3.eth.getBalance(this.address))}async updateMin(){return this.min=BigInt(await this.call("getMinBet"))}async updateMax(){return this.max=BigInt(await this.call("getMaxBet"))}async getGasPrice(){return BigInt(await this.web3.eth.getGasPrice())}async getPayouts(){return(await this.call("getPayouts")).map(BigInt)}async getGame(e){const t=await this.call("getGame",e),n=+t.state,a={id:e,bet:BigInt(t.bet),cards:Number(t.cards),date:new Date(1e3*t.timestamp)};return 0===n?a.change=31:1===n?a.playable=!0:2===n?a.change=+t.change:(a.result=+t.result,a.payout=a.bet),a}getGames(){return this.call("getGames",this.address)}start(e){const t=Math.floor(2147483648*Math.random());return new Promise(((n,a)=>{this.send("start",e,t).catch(a),this.event("Created",{searchId:t,player:this.address},(({gameId:e})=>{this.startEvent(e).then(n)}))}))}startEvent(e){return new Promise((t=>{this.event("Start",{gameId:e},t)}))}end(e,t){return new Promise(((n,a)=>{this.send("end",0,e,t).catch(a),this.endEvent(e).then(n)}))}endEvent(e){return new Promise((t=>{this.event("End",{gameId:e},t)}))}}var d=n(102),p=n(1);function m({address:e,setError:t,setContract:n}){const[s,i]=Object(a.useState)(!0),[c,r]=Object(a.useState)(!1);async function m(e){try{const t=d.find((t=>e===t.address))||{address:e},n=window.contract=await async function(e,t){const n=window.ethereum;if(n){t&&await n.request({method:"wallet_switchEthereumChain",params:[{chainId:t}]});const[a]=await n.request({method:"eth_requestAccounts"}),s=new u.a(n),i=new s.eth.Contract(l.a,e);return new o(s,a,i)}throw new Error("Could not detect wallet extension")}(e,t.chainId);return await Promise.all([n.updateBalance(),n.updateMin(),n.updateMax()]),[n,t]}catch(n){return i(!0),t(n.message||"Could not load contract"),[]}}async function h(e){t(null),n(null),r(!0);const[a,s]=await m(e);if(a){i(!1);const e=n(a,s);e instanceof Promise&&await e}r(!1)}return Object(a.useEffect)((()=>{e&&h(e)}),[e]),Object(p.jsxs)("form",{className:"row force-margin",onSubmit:function(e){e.preventDefault(),h(new FormData(e.target).get("address"))},children:[Object(p.jsx)("label",{htmlFor:"input-contract",className:"label",children:"Contract"}),Object(p.jsxs)("div",{className:"value group",children:[Object(p.jsx)("input",{id:"input-contract",autoComplete:"off",name:"address",defaultValue:e||d[0].address,spellCheck:!1}),Object(p.jsx)("button",{type:"submit",className:c?"loading":"",style:{width:"8rem"},children:s?"Use":"Change"})]})]})}var h=n.p+"static/media/card.bad10dba.mp3",b=n.p+"static/media/error.0c2f182b.mp3",j=n.p+"static/media/draw.d1037966.mp3",y=n.p+"static/media/loss.76807f79.mp3",f=n.p+"static/media/win.8edc9ff0.mp3";function x(e){const t=new Audio(e);return()=>{t.volume=1,t.currentTime=0,t.play()}}const O=x(h),w=x(b),g=x(j),v=x(y),N=x(f),S=1000000000000000000n;let M,T;!function(e){e[e.two=0]="two",e[e.three=1]="three",e[e.four=2]="four",e[e.five=3]="five",e[e.six=4]="six",e[e.seven=5]="seven",e[e.eight=6]="eight",e[e.nine=7]="nine",e[e.ten=8]="ten",e[e.jack=9]="jack",e[e.queen=10]="queen",e[e.king=11]="king",e[e.ace=12]="ace"}(M||(M={})),function(e){e[e.hearts=0]="hearts",e[e.diamonds=16]="diamonds",e[e.clubs=32]="clubs",e[e.spades=48]="spades"}(T||(T={}));const k=["Jacks or better","Two pair","Three of a kind","Straight","Flush","Full house","Four of a kind","Straight flush","Royal flush"];class I{constructor(e,t){this._value=e,this._suit=t}get value(){switch(this._value){case M.jack:return"J";case M.queen:return"Q";case M.king:return"K";case M.ace:return"A";default:return(2+this._value).toString()}}get className(){switch(this._suit){case T.hearts:return"hearts";case T.diamonds:return"diamonds";case T.clubs:return"clubs";case T.spades:return"spades";default:return""}}}function E(e){return(Array.isArray(e)?e:function(e){const t=Array(5);for(let n=0;n<t.length;n++){const a=6*n;t[n]=(e&63<<a)>>a}return t}(e)).map((e=>new I(15&e,48&e)))}function B(e){return[0!==(16&e),0!==(8&e),0!==(4&e),0!==(2&e),0!==(1&e)]}n(496);function C({card:e,name:t,flipped:n=!1}){return Object(p.jsxs)("div",{className:n?"card flipped":"card",children:[Object(p.jsx)("input",{id:t,type:"checkbox",name:t,onChange:O}),Object(p.jsxs)("label",{htmlFor:t,className:e.className,children:[Object(p.jsx)("span",{className:"value",children:e.value}),Object(p.jsx)("span",{className:"suit"})]})]})}function $({cards:e,flipped:t=[]}){return Object(p.jsx)("div",{className:"cards-component",children:E(e).map(((e,n)=>Object(p.jsx)(C,{card:e,name:`card${n}`,flipped:t[n]},n)))})}function P(e){return window.localStorage.getItem(e)}function A(e){const t=P("bet_"+e);return t?BigInt(t):null}function F(e){const t=e.match(/^(0|[1-9]\d*)(?:\.(\d{1,18}))?$/);if(t)return t[2]?BigInt(t[1])*S+BigInt(t[2].padEnd(18,"0")):BigInt(e)*S;throw new SyntaxError("Invalid number")}function G(e){const t=e=>e.replace(/0+$/,""),n=e.toString();if("0"===n)return n;if(n.length>18){const e=n.slice(0,-18),a=t(n.substr(n.length-18));return""===a?e:`${e}.${a}`}return`0.${t(n.padStart(18,"0"))}`}function _(e){return e.toString().padStart(2,"0")}n(193);const D=[[T.hearts|M.jack,T.clubs|M.jack],[T.clubs|M.two,T.spades|M.two,T.clubs|M.king,T.diamonds|M.king],[T.hearts|M.three,T.diamonds|M.three,T.spades|M.three],[T.clubs|M.ace,T.clubs|M.two,T.spades|M.three,T.hearts|M.four,T.clubs|M.five],[M.seven,M.ace,M.king,M.three,M.ten],[T.hearts|M.two,T.clubs|M.two,T.hearts|M.ace,T.clubs|M.ace,T.diamonds|M.ace],[T.hearts|M.ace,T.diamonds|M.ace,T.clubs|M.ace,T.spades|M.ace],[M.ace,M.two,M.three,M.four,M.five],[M.ten,M.jack,M.queen,M.king,M.ace]].map((e=>{const t=5-e.length;return{cards:Array(t).fill(0).concat(e),flipped:Array(t).fill(1)}}));function q({address:e}){const t=Object(a.useRef)(),[n,s]=Object(a.useState)(null),[i,c]=Object(a.useState)(0n),[r,u]=Object(a.useState)("");return Object(p.jsxs)("div",{children:[Object(p.jsx)(m,{address:e,setError:console.warn,setContract:async function(e,{address:t,unit:n}={}){e?(s(await e.getPayouts()),c(A(t)||1000000000000000000n),u(n||"")):s(null)}}),n&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("label",{htmlFor:"input-bet",className:"label",children:"Bet"}),Object(p.jsx)("div",{className:"value",children:Object(p.jsx)("input",{ref:t,id:"input-bet",autoComplete:"off",spellCheck:!1,value:G(i),onChange:function(e){try{c(F(e.target.value))}catch(t){}}})})]}),Object(p.jsx)("fieldset",{disabled:!0,children:n&&D.map((({cards:e,flipped:t},a)=>Object(p.jsxs)("div",{className:"row results",children:[Object(p.jsx)("div",{className:"cards",children:Object(p.jsx)($,{cards:e,flipped:t})}),Object(p.jsxs)("div",{className:"result",children:[Object(p.jsxs)("span",{children:[i-1n," ",n[a]]}),Object(p.jsx)("div",{children:k[a]}),Object(p.jsxs)("span",{className:"amount",children:[G(i*n[a])," ",r]})]})]},a)))})]})]})}n(497);function R({address:e="",page:t=1}){const[n,s]=Object(a.useState)(null),[i,c]=Object(a.useState)(""),[r,u]=Object(a.useState)(null),[l,o]=Object(a.useState)(null),[d,h]=Object(a.useState)(null),[b,j]=Object(a.useState)(null);async function y(e,t,n){const a=5*t,s=await Promise.all(n.slice(a,a+5).map((t=>e.getGame(t))));j(s.some((e=>e.change>0))),h(s)}return Object(a.useEffect)((()=>{n&&l&&y(n,t-1,l)}),[t]),Object(a.useEffect)((()=>{const e=setInterval((()=>b&&y(n,t-1,l)),5e3);return()=>clearInterval(e)})),Object(p.jsxs)("div",{className:"history-component",children:[Object(p.jsx)(m,{address:e,setError:console.warn,setContract:async function(e,n){if(e){const a=(await e.getGames()).slice().reverse();o(a),u(Math.ceil(a.length/5)),c(n.unit||""),await y(e,t-1,a),window.location.hash=`#history/${n.address}/${t}`}else h(null),o(null),c(null);s(e)}}),d?d.length?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"row",children:Object(p.jsx)("div",{style:{width:"100%"},children:d.map((t=>{return Object(p.jsxs)("div",{className:"history-component-game",children:[Object(p.jsx)("div",{className:"date",children:(n=t.date,`${n.getFullYear().toString().padStart(4,"0")}-${_(n.getMonth()+1)}-${_(n.getDate())} ${_(n.getHours())}:${_(n.getMinutes())}:${_(n.getSeconds())}`)}),Object(p.jsxs)("div",{className:"results",children:[Object(p.jsx)("fieldset",{className:"cards",disabled:!0,children:Object(p.jsx)($,{cards:t.cards,flipped:B(t.change||0)})}),Object(p.jsx)("div",{className:"result",children:t.playable||t.change>0?Object(p.jsx)("a",{href:`/#play/${e}/${t.id}`,children:Object(p.jsx)("button",{type:"button",children:"Resume"})}):t.result?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{children:k[t.result-1]}),Object(p.jsxs)("div",{className:"amount",children:[G(t.payout)," ",i]})]}):""})]})]},t.id);var n}))})}),Object(p.jsxs)("div",{className:"row history-component-footer",children:[Object(p.jsxs)("span",{children:["Page ",t," of ",r]}),Object(p.jsx)("div",{className:"spacer"}),Object(p.jsx)(J,{enabled:t>1&&r>1,href:`#history/${e}/${t-1}`,children:"\u2039"}),Object(p.jsx)(J,{enabled:t<r,href:`#history/${e}/${+t+1}`,children:"\u203a"})]})]}):Object(p.jsx)("div",{className:"history-component-empty",children:"You haven't played any games yet"}):Object(p.jsx)("div",{className:"history-component-empty",children:"Select a contract to view your playing history"})]})}function J({enabled:e,href:t,children:n}){return e?Object(p.jsx)("a",{className:"nav",href:t,children:Object(p.jsx)("button",{children:n})}):Object(p.jsx)("button",{className:"nav",disabled:!0,children:n})}n(498);function H({error:e}){return Object(p.jsx)("div",{className:"error-component",children:e})}const K={};function V(e){return K[e]}function L(e,t){K[e]=t}async function Y(e,t){if(await t,!K[e])throw new Error("Component is no longer active");return t}n(499);const Q=Array(5).fill(!0),U=Array(5).fill(!1);function z({address:e,resume:t}){const n=Object(a.useRef)(),s=Object(a.useRef)(),[i,c]=Object(a.useState)(null),[r,u]=Object(a.useState)(null),[l,o]=Object(a.useState)(!1),[d,h]=Object(a.useState)(""),[b,j]=Object(a.useState)(void 0),[y,f]=Object(a.useState)(0),[x,O]=Object(a.useState)(Q),[S,M]=Object(a.useState)(null),[T,I]=Object(a.useState)(null),[E]=Object(a.useState)(Math.floor(1e5*Math.random()));function C(e){return Promise.all([e.updateBalance().then((e=>(j(e),e))),e.updateMin(),e.updateMax()])}function P(){return C(i)}async function _(t){const n=F(t.get("bet"));if(await Y(E,P()),n>i.max)throw new Error("Bet too high");if(n<i.min)throw new Error("Bet too low");if(n>i.balance)throw new Error("Insufficient balance");{const t=x;O(Q),M(null),function(e,t){window.localStorage.setItem("bet_"+e,t.toString())}(e,n),await D(i.start(n).finally((()=>{V(E)&&O(t)})))}}async function D(e){const{gameId:t,cards:n}=await Y(E,e);console.log(E,V(E),t,n);for(const a of s.current.querySelectorAll(":checked"))a.checked=!1;f(n),O(U),u(t),o(!1),P(),g()}async function q(e){let t=0;const n=[];for(let a=0;a<5;a++)e.get("card"+a)||(t|=1<<a,n[a]=1);O(n),await R(i.end(r,t).finally((()=>{O(U)})))}async function R(e){const{cards:t,result:n,payout:a}=await Y(E,e),s=+n;s?(M({index:s,payout:a}),N()):(M(null),v()),f(Number(68719476735n&BigInt(t))),O(U),u(null),o(!1),P()}return Object(a.useEffect)((()=>(L(E,!0),()=>L(E,!1))),[]),Object(a.useEffect)((()=>{if(i){const e=setInterval(P,3e4);return()=>clearInterval(e)}}),[i]),Object(p.jsxs)("div",{className:"play-component",children:[Object(p.jsx)(m,{address:e,setError:I,setContract:async function(e,a){if(e){await Y(E,C(e));const{unit:s}=a;if(h(s||""),n.current.value=G(A(a.address)||function(e){let t=e.balance/10n;return t>e.max?t=e.max:t<e.min&&(t=e.min),t>e.balance?e.balance:t}(e)),window.location.hash=`#play/${a.address}`,t){const a=await Y(E,e.getGame(t)),s=a.change>0;(a.playable||s)&&(n.current.value=G(a.bet),f(a.cards),u(a.id),s?(O(B(a.change)),o(!0),a.finished?R(e.endEvent(a.id)):D(e.startEvent(a.id))):O(U))}}else n.current.value="";c(e)}}),Object(p.jsx)("form",{onSubmit:async function(e){e.preventDefault(),I(null),o(!0);try{await(r?q:_)(new FormData(e.target))}catch(t){V(E)?(I(t.message),w(),o(!1)):console.warn("Error thrown on inactive component",t)}},children:Object(p.jsxs)("fieldset",{disabled:l||!i,children:[Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("label",{htmlFor:"input-balance",className:"label",children:"Balance"}),Object(p.jsx)("div",{className:"value",children:Object(p.jsx)("input",{id:"input-balance",disabled:!0,value:b>=0n?`${G(b)} ${d}`:""})})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("label",{htmlFor:"input-bet",className:"label",children:"Bet"}),Object(p.jsxs)("fieldset",{className:"value group",disabled:!!r,children:[Object(p.jsx)("input",{ref:n,id:"input-bet",autoComplete:"off",name:"bet",spellCheck:!1}),Object(p.jsx)("button",{type:"button",onClick:async function(){await P(),n.current.value=G(i.min)},children:"Min"}),Object(p.jsx)("button",{type:"button",onClick:async function(){const[e]=await Promise.all([i.getGasPrice(),P()]),t=i.balance-500000n*e;n.current.value=G(i.max<t?i.max:t)},children:"Max"})]})]}),Object(p.jsx)("fieldset",{ref:s,className:"row play-component-cards",disabled:!r,children:Object(p.jsx)($,{cards:y,flipped:x})}),Object(p.jsx)("div",{className:"row",children:Object(p.jsx)("button",{type:"submit",className:"play-component-play-button"+(l?" loading":""),children:r?"Draw":"Deal"})}),S&&Object(p.jsx)("div",{className:"row",children:Object(p.jsxs)("div",{className:"play-component-result",children:[Object(p.jsx)("div",{children:k[S.index-1]}),Object(p.jsxs)("div",{className:"amount",children:["+",G(S.payout)," ",d]})]})}),T&&Object(p.jsx)("div",{className:"row",children:Object(p.jsx)(H,{error:T})})]})})]})}n(500);function W({address:e}){const t=(e,t,...n)=>`#${e}${t?[t,...n].map((e=>"/"+e)).join(""):""}`;return Object(p.jsxs)("div",{className:"footer-component",children:[Object(p.jsxs)("div",{className:"links",children:[Object(p.jsx)("a",{href:t("play",e),children:"Play"}),Object(p.jsx)("a",{href:t("history",e,"1"),children:"History"}),Object(p.jsx)("a",{href:t("payouts",e),children:"Payouts"}),Object(p.jsx)("a",{href:"https://github.com/Kripth/videopoker-dapp/blob/master/README.md",target:"_blank",rel:"noreferrer",children:"About"}),Object(p.jsx)("a",{href:"https://github.com/Kripth/videopoker-dapp",target:"_blank",rel:"noreferrer",children:"GitHub"})]}),Object(p.jsxs)("div",{className:"suits",children:[Object(p.jsx)("div",{className:"suit hearts"}),Object(p.jsx)("div",{className:"suit spades"}),Object(p.jsx)("div",{className:"suit diamonds"}),Object(p.jsx)("div",{className:"suit clubs"})]})]})}n(501);function X(){function e(){return window.location.hash.substr(1).split("/")}const[t,n]=Object(a.useState)(e());return Object(a.useEffect)((()=>{const t=()=>n(e());return window.addEventListener("hashchange",t),()=>window.removeEventListener("hashchange",t)})),Object(p.jsxs)("div",{className:"app-component",children:[Object(p.jsx)("div",{className:"app-component-title",children:"videopoker-dapp"}),Object(p.jsx)("div",{className:"app-component-content",children:"history"===t[0]?Object(p.jsx)(R,{address:t[1],page:t[2]}):"payouts"===t[0]?Object(p.jsx)(q,{address:t[1]}):Object(p.jsx)(z,{address:t[1],resume:t[2]})}),Object(p.jsx)(W,{address:t[1]})]})}c.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(X,{})}),document.getElementById("root"))}},[[502,1,2]]]);
//# sourceMappingURL=main.ba817e54.chunk.js.map