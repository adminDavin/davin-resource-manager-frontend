
import icon_0_off from "@/assets/imgs/icon_0_off.png";
import icon_0_on from "@/assets/imgs/icon_0_on.png";
import icon_1_off from "@/assets/imgs/icon_1_off.png";
import icon_1_on from "@/assets/imgs/icon_1_on.png";
import icon_2_off from "@/assets/imgs/icon_2_off.png";
import icon_2_on from "@/assets/imgs/icon_2_on.png";
import icon_3_off from "@/assets/imgs/icon_3_off.png";
import icon_3_on from "@/assets/imgs/icon_3_on.png";
import icon_4_off from "@/assets/imgs/icon_4_off.png";
import icon_4_on from "@/assets/imgs/icon_4_on.png";
import icon_5_off from "@/assets/imgs/icon_5_off.png";
import icon_5_on from "@/assets/imgs/icon_5_on.png";

const navList = [
  {
    aboveTitle: "message.home.navList.aboveTitleOfStore",
    belowTitle: "message.home.navList.belowTitleOfStore",
    jumpUrl: "#mbMainIntro",
    target: ""
  },
  {
    aboveTitle: "message.home.navList.aboveTitleOnlineShop",
    belowTitle: "message.home.navList.belowTitleOnlineShop",
    jumpUrl: "https://sitadinning.base.shop/",
    target: "_blank"
  },
  {
    aboveTitle: "message.home.navList.aboveTitleReserve",
    belowTitle: "message.home.navList.belowTitleReserve",
    jumpUrl: "/mb/appoint",
    target: ""
  },
  {
    aboveTitle: "message.home.navList.aboveTitleConcept",
    belowTitle: "message.home.navList.belowTitleConcept",
    jumpUrl: "/mb/intro",
    target: ""
  },
];

const restaurantServices: any = {
  "0": {
    "0": icon_0_off,
    "1": icon_0_on
  },
  "1": {
    "0": icon_1_off,
    "1": icon_1_on
  },
  "2": {
    "0": icon_2_off,
    "1": icon_2_on
  },
  "3": {
    "0": icon_3_off,
    "1": icon_3_on
  },
  "4": {
    "0": icon_4_off,
    "1": icon_4_on
  },
  "5": {
    "0": icon_5_off,
    "1": icon_5_on
  },
};

import intro_1 from '@/assets/imgs/intro_1.png';
import intro_2 from '@/assets/imgs/intro_2.png';
import intro_3 from '@/assets/imgs/intro_3.png';
import intro_4 from '@/assets/imgs/intro_4.png';

const conceptContent = {
  contentOne: {
    code: `
    <span style='font-size: 20px;font-weight: bolder'>アジア</span>各国で経験を積んだシェフ達による調理技術が今、惜しみなく発揮された料理たちは、どこか新しくもあり、どこか懐かしくもあります。
`,
    img: intro_1,
  },
  content2: {
    code: `
    <span style='font-size: 20px;font-weight: bolder'>私たち</span>の料理は香辛料を多用した料理が多いのですが、そこは日本でも⻑期に腕を振るうシェフたちが日本の皆様の好みのさじ加減を十分に理解しておりますのできっと気に入って頂ける味だと信じています。
`,
    img: intro_2,
  },
  content3: {
    code: `
    <div style="text-align: start;">
      <span style='font-size: 20px;font-weight: bolder'>私たち</span>Sita Dining'sはスパイス料理を通して、
      <div>皆さまに新しい感動を提供したく日々、</div>
      <div>研究・開発致しております。</div>
    </div>
    <div style="text-align: start;">
      <span style='font-size: 20px;font-weight: bolder'>料理</span>の出会いも一期一会。
      <div>是非Sita Dining'sのお料理をお楽しみ下さい。</div>
    </div>
`,
    img: intro_3,
  },
  content4: {
    code: `
    <span style='font-size: 20px;font-weight: bolder'>安心・</span>安全にも取り組みます。料理の検体検査を始めとして、スタッフの健康検査なども定期的に実施。食品衛生管理の徹底に従事された作業習慣。皆様に安心・安全も提供します。
    `,
    img: intro_4,
  }
};

export {
  navList,
  restaurantServices,
  conceptContent
}