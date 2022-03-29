import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import d_utils from "@/utils/date_utils";
import b_utils from '@/utils/browser_utils';

const calendarOptions: Object = {
  initialView: "dayGridMonth",
  showNonCurrentDates: true,
  selectable: true,
  headerToolbar: {
    end: "prev,next",
  },
  validRange: {
    start: d_utils.formatDate(new Date()),
  },
  locale: b_utils.getLanguage(),
  plugins: [
    dayGridPlugin,
    interactionPlugin
  ],
};

const buildEvent = (date: any) => {
  let event = {
    start: date.dateStr,
    end: date.dateStr,
    title: "预定",
    display: "background",
  };
  return event;
}

const localForm = {
  userName: 'sdfa',
  merchantCode: '',
  merchantName: '',
  appointTime: '',
  appointRange: '',
  receiveEmail: '',
  appointPhone: '',
  adultCount: 0,
  childCount: 0,
  productCode: '',
  productTitle: '',
  remark: '',
}
const   appointRangeList = [
  '10:00-11:00',
  '11:00-12:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
  '21:00-22:00',
]

export {
  calendarOptions,
  appointRangeList,
  localForm,
  buildEvent
};

// <template lang="pug">
// .pc-content.bg-light-green.padding.pt-30.pb-50
//   .ft-18.ft-bold ${{$pc18n.t('appointment.text1')}}
//   .pc-appoint-card-content
//     m-input.mt-25.text-center.relative(:placeholder="$pc18n.t('appointment.text1')", suffix, icon="dropdown", @focus="merchantContainerShow = true", v-model="localForm.merchantName", readOnly)
//       .bg-white.appoint-merchant-select(v-if="merchantContainerShow")
//         .text-center.text-gray(style="line-height: 40px", v-for="(m, idx) in merchantList", :key="idx", @click="chooseMerchant(m)") {{m.merchantName}}
//   .pb-25.border-bottom-line
//   .pt-30.pb-25.ft-18.ft-bold {{$pc18n.t('appointment.text2')}}
//   calendar.mt-15(:dataReload.sync="calendarDataReload", :changeList="merchantAppointList", @pagination="calendarPg", @choose="calendarChoose", style="width: 70%")
//   .pt-50.border-bottom-line
//   .mt-20.ft-bold {{$pc18n.t('appointment.text10')}}
//   .pc-appoint-card-content
//     m-input.mt-15(:placeholder="$pc18n.t('appointment.text11')", textCenter, v-model="localForm.userName")
//     m-input.mt-15(placeholder="時間帯", textCenter, :list="appointRangeList", v-model="localForm.appointRange")
//     .row.mt-15
//       .col.pr-5
//         m-input.text-center(placeholder="大人", suffix,icon="human", v-model="adultStr")
//       .col.pl-5
//         m-input.text-center(placeholder="小人", suffix,icon="baby", v-model="childStr")
//     m-input.mt-15(:placeholder="$pc18n.t('appointment.text12')", textCenter, suffix, icon="email", v-model="localForm.receiveEmail")
//     m-input.mt-15(:placeholder="$pc18n.t('appointment.text13')", textCenter, suffix, icon="phone", v-model="localForm.appointPhone")
//     a-textarea.mt-15.text-center(size="large", :maxLength="250", placeholder="メモ", v-model="localForm.remark", :rows="6")
//   .pb-35.border-bottom-line
//   .pt-25.pb-25.ft-18.ft-bold {{$pc18n.t('appointment.text14')}}
//   .pc-appoint-card-content
//     m-card.mb-15(:choosed.sync="cbx.choosed", v-for="(cbx,idx) in cbxArray", :key="idx", :collapse="cbx.collapse", @choose="cbxChange($event, idx)", :item="cbx", :bgUrl="cbx.coverUrl")
//       div
//         img.full-width(:src="cbx.descUrl")
//   .pb-25.border-bottom-line
//   .mt-50.pc-appoint-card-content
//     .m-button(@click="submitAppoint") {{$pc18n.t('common.appoint')}}
// </template>

// <script lang="ts">
// import { Vue, Component } from 'vue-property-decorator'
// import MInput from '@/components/mobile/MInput.vue'
// import MCard from '@/components/mobile/MCard.vue'
// import Calendar from '@/components/mobile/Calendar.vue'
// import {
//   MerchantDTO,
//   MerchantAppiontDTO,
//   MerchantProductDTO,
// } from '@/models/MerchantModels'
// import { UserAppointDTO } from '@/models/UserModels'
// @Component({
//   layout: 'pc',
//   components: {
//     MInput,
//     MCard,
//     Calendar,
//   },
// })
// class PcAppointIndexPage extends Vue {
//   adultStr = '0'
//   childStr = '0'
//   calendarDataReload: boolean = false
//   merchantContainerShow: boolean = false
//   merchantAppointList: Array<MerchantAppiontDTO> = []
//   merchantProductList: Array<MerchantProductDTO> = []

//   beforeMount() {
//     this.loadMerchants()
//   }
//   cbxArray: any = [
//     {
//       id: '-1',
//       code: 'P00001',
//       title: 'appointment.text15',
//       description: '',
//       coverUrl: '',
//       collapse: false,
//       choosed: false,
//     },
//   ]
//   choosedCbxObj: any = {}
//   cbxChange(obj: any) {
//     console.log('enter:>>', obj)
//     const me = this as any
//     // this.choosedCbxObj = obj
//     this.localForm.productCode = obj.code
//     this.localForm.productTitle =
//       obj.id === '-1' ? me.$pc18n.t('appointment.text15') : obj.title
//     this.cbxArray.map((item: any) => {
//       if (item.id === obj.id) {
//         item.choosed = true
//       } else {
//         item.choosed = false
//       }
//     })
//   }
//   choosedMerchant: MerchantDTO = {
//     merchantName: '',
//     email: '',
//     phone: '',
//     address: '',
//     intro: '',
//   }
//   calendarChoose(chooseStr: string) {
//     console.log('chooseStr:>>', chooseStr)
//     this.localForm.appointTime = chooseStr
//   }
//   calendarPg(dateStr: string) {
//     console.log('calendar str:>>', dateStr)
//     this.loadMerchantAppoints(this.choosedMerchant.merchantCode!, dateStr)
//   }

//   canHttp: boolean = true

//   submitAppoint() {
//     console.log(this.localForm)
//     if (this.localForm.merchantCode.length === 0) {
//       this.msgShow('店舗を選んでください')
//       return
//     }
//     if (this.localForm.appointTime.length === 0) {
//       this.msgShow('请选择预约时间')
//       return
//     }
//     if (this.localForm.userName.length === 0) {
//       this.msgShow('请输入姓名')
//       return
//     }
//     if (this.localForm.appointRange.length === 0) {
//       this.msgShow('请选择时段')
//       return
//     }
//     if (this.localForm.receiveEmail.length === 0) {
//       this.msgShow('请输入邮箱')
//       return
//     }
//     if (this.localForm.appointPhone.length === 0) {
//       this.msgShow('请输入联系电话')
//       return
//     }
//     if (this.localForm.productCode.length === 0) {
//       this.msgShow('请选择套餐')
//       return
//     }
//     this.localForm.adultCount = Number(this.adultStr)
//     this.localForm.childCount = Number(this.childStr)
//     if (this.canHttp) {
//       this.canHttp = false
//       this.postUserAppoint()
//     }
//   }

//   async postUserAppoint() {
//     try {
//       await this.proxy('api/user/appoint', 'post', this.localForm)
//       this.msgShow('予約できました！', 'success')
//       this.canHttp = true
//       // setTimeout(() => {
//       //   this.redirect('/mb/')
//       // }, 300)
//     } catch (e) {
//       this.canHttp = true
//       this.msgShow(e.message || '网络异常')
//     }
//   }

//   chooseMerchant(obj: MerchantDTO) {
//     console.log('click', obj)
//     this.choosedMerchant = obj
//     const merchantCode = obj.merchantCode!
//     const dateStr = this.date2Str(new Date())
//     this.loadMerchantAppoints(merchantCode, dateStr)
//     this.localForm.merchantCode = merchantCode
//     this.localForm.merchantName = obj.merchantName
//     this.loadMerchantProducts(merchantCode)
//     this.merchantContainerShow = false
//   }
//   merchantList: Array<MerchantDTO> = []
//   async loadMerchants() {
//     try {
//       const { data } = await this.proxy('api/sys/merchants')
//       this.merchantList = data.data
//       console.log('merchant list', this.merchantList)
//       if (this.$route.query.mid) {
//         const obj: MerchantDTO = this.merchantList.find(
//           (item: MerchantDTO) => item.id === this.$route.query.mid
//         ) as MerchantDTO
//         console.log('merchant obj:>>>', obj)
//         if (obj) {
//           this.localForm.merchantName = obj.merchantName
//           this.chooseMerchant(obj)
//         }
//       }
//     } catch (e) {
//       this.msgShow(e.message || '网络异常')
//     }
//   }
//   async loadMerchantAppoints(merchantCode: string, dateStr: string) {
//     try {
//       const { data } = await this.proxy('api/sys/merchant/appointList', 'get', {
//         merchantCode,
//         appointTime: dateStr,
//       })
//       this.merchantAppointList = data.data
//       this.calendarDataReload = true
//     } catch (e) {
//       this.msgShow(e.message || '网络异常')
//     }
//   }
//   async loadMerchantProducts(merchantCode: string) {
//     try {
//       const { data } = await this.proxy('api/sys/merchant/productList', 'get', {
//         merchantCode,
//       })
//       this.merchantProductList = data.data
//       this.cbxArray = [
//         {
//           id: '-1',
//           code: 'P00001',
//           title: '席のみ予約',
//           description: '',
//           coverUrl: '',
//           collapse: false,
//           choosed: false,
//         },
//       ]
//       for (const product of data.data) {
//         this.cbxArray.push({
//           id: product.id,
//           code: product.productCode,
//           title: product.productTitle,
//           description: product.productSubTitle,
//           coverUrl: product.productCoverUrl,
//           descUrl: product.productDescUrl,
//           collapse: product.productDescUrl ? true : false,
//           choosed: false,
//         })
//       }
//     } catch (e) {
//       this.msgShow(e.message || '网络异常')
//     }
//   }
// }
// export default PcAppointIndexPage
// </script>

// <style lang="stylus" scoped>
// .pc-appoint-card-content
//   width 50%
//   margin 0 auto
// .appoint-merchant-select
//   position absolute
//   left 0px
//   right 0px
//   top 40px
//   z-index 20
//   border 1px solid #ddd
//   border-top 0px
//   border-bottom-right-radius 5px
//   border-bottom-left-radius 5px
// /deep/textarea.ant-input
//   font-size 16px
// /deep/textarea.ant-input:hover, /deep/textarea.ant-input:focus
//   border-color #ccc !important
//   box-shadow none
// </style>

