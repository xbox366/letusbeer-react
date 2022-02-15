import axios from "axios";
import React,{ useState } from "react";

let testData = [
  {"_id":"a8831daa5fefe43401611220487484a7","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"0","beername":"乳酸菌苏打","beerstyle":"软饮料","brewery":"乐啤","country":"cn","desc":"乐啤酒社自制软饮料\nHello world!","ebeername":"let's beer milk soda","glass_type":"330","ibu":"0","price":"28","roomid":2,"status":true,"tapid":0,"tapname":"#0"},
  {"_id":"a8831daa5fed4488013207e76f398ef7","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"6.8","beername":"白桃","beerstyle":"酸塞松","brewery":"勿幕","country":"CN","desc":"","ebeername":"Trueman Bluefriend Litchi Cider","glass_type":"470","ibu":"15","price":"48","roomid":2,"status":true,"tapid":1,"tapname":"#1"},
  {"_id":"73f70d5c5fed44a500dcd9e4545c7806","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"7.0","beername":"高山之窗","beerstyle":"美式IPA","brewery":"阿尔派恩","country":"US","desc":"这款IPA会给人格外的柔润感，享受他因为西楚啤酒花和马赛克啤酒花所散发出的香气以及热带的味道吧。","ebeername":"Hop Fan Drink \u0026 Missing NE IPA","glass_type":"470","ibu":"70","price":"70","roomid":2,"status":true,"tapid":2,"tapname":"#2"},
  {"_id":"9f2a34705fed44a8010c110f4b2d770b","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"5.2","beername":"椰子奶昔","beerstyle":"浑浊IPA","brewery":"明日","country":"CN","desc":"","ebeername":"Mingri Brewing Sultana single hop west coast IPA ","glass_type":"470","ibu":"55","price":"45","roomid":2,"status":true,"tapid":3,"tapname":"#3"},
  {"_id":"98bb04175fed44b400da52ef7fc04e25","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"7.5","beername":"油王苏塔娜","beerstyle":"单一酒花IPA","brewery":"明日","country":"cn","desc":"","ebeername":"2wire IPA","glass_type":"470","ibu":"100","price":"45","roomid":2,"status":true,"tapid":4,"tapname":"#4"},
  {"_id":"85ff8afa5fed44b501082d3149cc0c78","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"5.2","beername":"卡曼橘","beerstyle":"社科隆","brewery":"勿幕","country":"cn","desc":"","ebeername":"DANGGE Blazing Sun Barley Wine","glass_type":"470","ibu":"12","price":"45","roomid":2,"status":true,"tapid":5,"tapname":"#5"},
  {"_id":"9f2a34705fed44b5010c11d644d5925c","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"8.0","beername":"山核桃覆盆子派","beerstyle":"酸世涛","brewery":"勿幕","country":"cn","desc":"","ebeername":"NYX sour imperial stout","glass_type":"330","ibu":"20","price":"55","roomid":2,"status":true,"tapid":6,"tapname":"#6"},
  {"_id":"98bb04175fed44b500da52fc1ef79656","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"4.1","beername":"蓝朋友","beerstyle":"荔枝西打","brewery":"楚门","country":"BE","desc":"","ebeername":"Verhaeghe Duchesse De Bourgogne","glass_type":"470","ibu":"N/A","price":"45","room":2,"status":true,"tapid":7,"tapname":"#7"},
  {"_id":"2f6ab8515fed44b600d20c4816c9a25c","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"6.5","beername":"八零年代","beerstyle":"IPA","brewery":"楚门","country":"cn","desc":"","ebeername":"Hopsfarm Berliner Weisse","glass_type":"470","ibu":"45","price":"45","roomid":2,"status":false,"tapid":8,"tapname":"#8"},
  {"_id":"98bb04175fed44b600da53016a276676","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"6.5","beername":"甫子","beerstyle":"金色艾尔","brewery":"大跃","country":"CN","desc":"大跃创经典经销款，在国际啤酒比赛上\n多次斩获大奖。甫子啤酒加入四川花椒\n和蜂蜜作为酿造原料。口味带有蜂蜜的\n甜香，四川花椒清新的柑橘香，与麦芽\n和啤酒花的口感完美平衡。命名灵感来\n自杜甫和孔子。","ebeername":"Wild West China White Witbier ","glass_type":"470","ibu":"N/A","price":"42","roomid":2,"status":false,"tapid":9,"tapname":"#9"},
  {"_id":"73f70d5c5fed44b600dcdabd5bba4be1","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"9.0","beername":"混合国度","beerstyle":"帝国世涛","brewery":"当歌","country":"cn","desc":"","ebeername":"super coffee brown ale","glass_type":"330","ibu":"30","price":"50","roomid":2,"status":true,"tapid":10,"tapname":"#A"},
  {"_id":"a8831daa5fed44b601320bee5b9b34fd","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"12","beername":"生命的赞礼","beerstyle":"比利时四料","brewery":"勿幕","country":"CN","desc":"冷萃脱脂可可增味比利时四料","ebeername":"Trueman Deep Throat Double IPA","glass_type":"330","ibu":"20","price":"46","roomid":2,"status":false,"tapid":11,"tapname":"#B"},
  {"_id":"eb0c51035fed44b60105b0ce605e6456","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"4.0","beername":"P.O.G","beerstyle":"水果艾尔","brewery":"Modest","country":"cn","desc":"","ebeername":"Trueman Peachy Berliner Weisse","glass_type":"470","ibu":"N/A","price":"55","roomid":2,"status":true,"tapid":12,"tapname":"#C"},
  {"_id":"98bb04175fed44c400da53be480d0efb","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"4.5","beername":"一杯的幸福","beerstyle":"比利时小麦","brewery":"明日","country":"cn","desc":"这是一款典型的比利时小麦啤酒，淡黄色的酒体，蕴含绵密的白色泡沫，加上摩洛哥橙皮与精选香草籽带来的清香柑橘风味，入口柔顺，回味无穷，是夏日午后小酌的完美选择。","ebeername":"Mingri Brewing A Sip Of Happiness Witbier","glass_type":"470","ibu":"10","price":"38","roomid":2,"status":true,"tapid":13,"tapname":"#D"},
  {"_id":"2f6ab8515fed44c400d20d2d2cae119b","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"6.0","beername":"爱莲说","beerstyle":"单一酒花浑浊IPA","brewery":"明日","country":"CN","desc":"\n这是“\n一期一花”单一酒花酿造项目的第5\n期，选用的酒花品种是Hopsteiner的莲花\n(otus)，是一款特别清新脱俗的酒花，带\n有优雅的香草、甜橙以及莓果的香气，但\n又不像传统美式酒花的香气突兀直接，正\n如“爱莲说”所描述的“香远益清”，让我们\n来感受酒花(lotus）带来的的高级香！\n反响热烈的单一酒花酿造第五期","ebeername":"Trueman Killing Orange Imperial Gose","glass_type":"470","ibu":"50","price":"45","roomid":2,"status":true,"tapid":14,"tapname":"#E"},
  {"_id":"a8831daa5fed44c501320d182ab6db9d","_openid":"oPkAv5D7nCbPZLyPtIg1XRHsp8yI","abv":"4.4","beername":"乌奎尔","beerstyle":"皮尔森","brewery":"博世纳","country":"CN","desc":"招牌风味平衡了三种麦芽的甜味和萨兹（Saaz）啤酒花的苦味。浓密厚实的泡沫增加了光滑度，并密封了独特的风味和香气。在品尝的每一口中，您都会注意到天然碳酸带来的清爽口感，然后是焦糖色调的细腻感，以及带有令人愉悦的啤酒花苦味。浓郁的麦香在口腔中爆炸，舌根会尝到明显的苦度，接踵而来的是麦芽的香甜，杀口感适中，干爽清冽。 这是世界上最早的一款皮尔森啤酒，捷克的城市“皮尔森”更是以此命名。乌奎尔皮尔森一直被视为捷克的骄傲，被许多人称作皮尔森啤酒的鼻祖，许多皮尔森厂商都将这款啤酒作为味道的参照。他们一直在沿用1842年开发的配方。","ebeername":"pilsner urquell","glass_type":"470","ibu":"N/A","price":"42","roomid":2,"status":true,"tapid":15,"tapname":"#F"}
  ]
function App() {
  const[beerInfo,setBeerInfo] = useState(testData)
  return (
    <div>
      <h1>hello world</h1>
      <ul>
        {
          beerInfo.map(
            beer=>
            <li key={beer._id}>
              {beer.beername}
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
