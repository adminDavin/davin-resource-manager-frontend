<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <div style="padding: 20px; background: #f6faf0">
        <a-row type="flex" justify="start" style="font-size: 18px">
          <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
            <div style="text-align: start; font-weight: bolder">
              {{ $t("message.reserve.appointment.text1") }}
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <div style="">
              <a-select style="width: 100%" @change="handleStoreChange">
                <a-select-option
                  v-for="i in 25"
                  :key="(i + 9).toString(36) + i"
                >
                  {{ (i + 9).toString(36) + i }}
                </a-select-option>
              </a-select>
            </div>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <a-row type="flex" justify="start" style="font-size: 18px">
          <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
            <div style="text-align: start; font-weight: bolder">
              {{ $t("message.reserve.appointment.text2") }}
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <a-card bodyStyle="padding: 0px">
              <FullCalendar
                ref="fullReserveCalendar"
                :options="calendarOptions"
              />
            </a-card>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <a-row type="flex" justify="start" style="font-size: 18px">
          <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
            <div style="text-align: start; font-weight: bolder">
              {{ $t("message.reserve.appointment.text10") }}
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <a-row type="flex" justify="center">
              <a-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                <a-input
                  :placeholder="$t('message.reserve.form.name')"
                  v-model="reserveForm.userName"
                >
                  <template #prefix>
                    <i style="font-size: 20px" class="iconfont icon-menu" />
                  </template>
                </a-input>
                <a-select
                  :placeholder="$t('message.reserve.form.timeline')"
                  style="width: 100%; margin-top: 20px"
                  @change="handleStoreChange"
                >
                  <a-select-option v-for="i in appointRangeList" :key="i">
                    {{ i }}
                  </a-select-option>
                </a-select>
                <a-row
                  type="flex"
                  justify="space-between"
                  style="margin-top: 20px"
                >
                  <a-col :span="11">
                    <a-input
                      style="text-align: center"
                      :placeholder="$t('message.reserve.form.name')"
                      :default-value="reserveForm.adultCount"
                    >
                      <template #suffix>
                        <i style="font-size: 16px" class="iconfont icon-menu" />
                      </template>
                    </a-input>
                  </a-col>
                  <a-col :span="11">
                    <a-input
                      style="text-align: center"
                      :placeholder="$t('message.reserve.form.name')"
                      :default-value="reserveForm.childCount"
                    >
                      <template #suffix>
                        <i style="font-size: 16px" class="iconfont icon-menu" />
                      </template>
                    </a-input>
                  </a-col>
                </a-row>
                <a-input
                  style="margin-top: 20px; text-align: center"
                  :placeholder="$t('message.reserve.form.email')"
                  :default-value="reserveForm.receiveEmail"
                >
                  <template #suffix>
                    <i style="font-size: 16px" class="iconfont icon-menu" />
                  </template>
                </a-input>
                <a-input
                  style="margin-top: 20px; text-align: center"
                  :placeholder="$t('message.reserve.form.appointPhone')"
                  :default-value="reserveForm.appointPhone"
                >
                  <template #suffix>
                    <i style="font-size: 16px" class="iconfont icon-menu" />
                  </template>
                </a-input>
                <a-textarea
                  style="margin-top: 20px; text-align: start"
                  :placeholder="$t('message.reserve.form.remark')"
                  :default-value="reserveForm.remark"
                  :rows="4"
                >
                </a-textarea>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <a-row type="flex" justify="start" style="font-size: 18px">
          <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
            <div style="text-align: start; font-weight: bolder">
              {{ $t("message.reserve.appointment.text14") }}
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <a-row type="flex" justify="center">
              <a-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                <a-card style="width: 100%">
                  <a-row type="flex" justify="start">
                    <a-col :span="22">
                      <div style="font-size: 24px; font-weight: bolder">
                        {{ $t("message.reserve.appointment.text15") }}
                      </div></a-col
                    >
                    <a-col :span="2">
                      <div v-show="true" style="text-align: end">
                        <i style="font-size: 20px" class="iconfont icon-menu" />
                      </div>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card
                  v-for="item in merchantProducts"
                  :key="item.id"
                  :style="`background-size: cover;width: 100%; margin-top: 10px;background-image: url(${item.productCoverUrl});`"
                >
                  <a-row type="flex" justify="start">
                    <a-col :span="22">
                      <div style="font-size: 24px; font-weight: bolder">
                        {{ item.productTitle }}
                      </div>
                      <div style="font-size: 18px">
                        {{ item.productSubTitle }}
                      </div>
                      <div>{{ $t("message.reserve.form.showDetail") }}</div>
                    </a-col>
                    <a-col :span="2">
                      <div v-show="true" style="text-align: end">
                        <i style="font-size: 20px" class="iconfont icon-menu" />
                      </div>
                    </a-col>
                  </a-row>
                </a-card>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <a-button type="primary">{{$t('message.reserve.appoint')}}</a-button>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import { getMerchantProducts } from "@/views/main/server/index";

import {
  calendarOptions,
  buildEvent,
  localForm,
  appointRangeList,
} from "./index";

export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const reserveEvents = ref();
    const reserveForm = ref(localForm);
    const fullReserveCalendar: Ref = ref();
    const handleStoreChange = (value: string) => {
      console.log(value);
    };
    const handleReserveDate = (date: any) => {
      let fullCalenderApi = fullReserveCalendar.value.getApi();
      let events = fullCalenderApi.getEvents();
      for (let item of events) {
        item.remove();
      }
      fullCalenderApi.addEvent(buildEvent(date));
      reserveEvents.value = fullCalenderApi.getEvents();
    };

    const merchantProducts = ref();

    onMounted(() => {
      getMerchantProducts(
        "SMT20211112000002",
        (res: any) => (merchantProducts.value = res)
      );
    });

    return {
      handleStoreChange,
      merchantProducts,
      fullReserveCalendar,
      appointRangeList,
      reserveEvents,
      reserveForm,
      calendarOptions: {
        ...calendarOptions,
        ...{
          dateClick: handleReserveDate,
          eventClick: handleReserveDate,
        },
      },
    };
  },
});
</script>
<style lang="less" scoped>
.vuejs3-datepicker__calendar {
  text-align: start !important;
  width: 100% !important;
}
</style>
