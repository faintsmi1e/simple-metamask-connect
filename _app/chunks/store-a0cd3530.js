import{D as f,M as C,N as B,O as o,P as A,C as r}from"./vendor-6c3bd71b.js";const v="0x41263cBA59EB80dC200F3E2544eda4ed6A90E76C",D=["function aggregate(tuple(address target, bytes callData)[] calls) public view returns (uint256 blockNumber, bytes[] memory returnData)"];function R(){try{const e=f(u);if(e.provider)return new C(v,D,e)}catch(e){console.log(e)}}const p="0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",F="0x55d398326f99059fF775485246999027B3197955",S="0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",w=[p,F,S],E=["function name() external view returns (string memory)","function symbol() view returns (string)","function decimals() public view virtual override returns (uint8)","function balanceOf(address) view returns (uint256)"],l=new B(E);class i{static encodeBalanceCall(a,t){return[{target:t,callData:l.encodeFunctionData("name")},{target:t,callData:l.encodeFunctionData("symbol")},{target:t,callData:l.encodeFunctionData("decimals")},{target:t,callData:l.encodeFunctionData("balanceOf",[`${a}`])}]}static decodeBalanceCall(a){const t=String(l.decodeFunctionResult("name",a[0])[0]),n=String(l.decodeFunctionResult("symbol",a[1])[0]),s=String(l.decodeFunctionResult("decimals",a[2])[0]);console.log(s);const c=o(l.decodeFunctionResult("balanceOf",a[3])[0].toString(),s);return{name:t,symbol:n,balance:Number(c).toFixed(2)}}}async function y(e){const a=R(),t=w.map(c=>i.encodeBalanceCall(e,c));return(await Promise.all(t.map(c=>a.aggregate(c)))).map(c=>i.decodeBalanceCall(c[1]))}const u=r({});function h(){const{subscribe:e,set:a,update:t}=r(localStorage.getItem("isAuth")||!1);return e(n=>localStorage.setItem("isAuth",n.toString())),{subscribe:e,setAuth:n=>{a(n)}}}function x(){const{subscribe:e,set:a,update:t}=r({address:""});return{subscribe:e,setUserAddress:n=>{t(s=>(s.address=n,s))}}}let d;d=h();const m=x(),b={multicallResult:[],bnbBalance:""},U=A([m,u],([e,a],t)=>{const n=async()=>{const c=await y(e.address),g=o((await a.getBalance(e.address)).toString()).slice(0,10);t({multicallResult:c,bnbBalance:g})};let s;return e.address?(n(),s=setInterval(()=>{n()},1e4)):t(b),()=>{clearInterval(s),s=null}},b),O=()=>{m.setUserAddress(""),d.setAuth("false")};export{d as a,U as b,u as p,O as s,m as u};