<template>
  <div style="width: 98%" class="dropbox">
    <ResInfoSquared v-show="isSquared == 'true'" ref="resInfoSquared" />
    <div v-show="isSquared != 'true'">
      <ResInfoTable v-show="isSquared != 'true'" ref="resInfoTable" />
      <!-- <el-table :data="tableData" @row-dblclick="handleClickResInfo">
        <el-table-column type="expand" prop="id"></el-table-column>
        <el-table-column label="文件名称" prop="resInfoName" sortable>
          <template #default="props">
            <div style="display: flex">
              <div style="margin-right: 5px">
                <el-image
                  fit="scale-down"
                  style="width: 55px"
                  :src="props.row.image"
                />
              </div>
              <div>
                <div style="font-size: var(--el-font-size-base)">
                  {{ props.row.resInfoName }}
                </div>
                <div style="font-size: var(--el-font-size-small)">
                  <el-button
                    type="text"
                    @click.stop="handleResInfoTagManage(props.row)"
                    size="small"
                    >标签管理</el-button
                  >
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="props">
            <r-res-info-operate :item="props.row" />
          </template>
        </el-table-column>
        <el-table-column
          label="类别"
          prop="category"
          width="120"
        ></el-table-column>
        <el-table-column label="大小" prop="size" sortable width="120">
        </el-table-column>
        <el-table-column
          label="最后一次修改"
          prop="updatedTime"
          sortable
          width="160"
        >
          <template #default="props">
            <div style="font-size: var(--el-font-size-base)">
              {{ props.row.updatedTime }}
            </div>
            <div
              style="font-size: var(--el-font-size-small); font-weight: bolder"
            >
              {{ props.row.updatedUserId }}
            </div>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
  </div>
  <r-child-tag-dialog ref="rChildTagDialog" />
  <r-child-share-dialog ref="rChildShareDialog" />
  <r-child-download-dialog ref="rChildDownloadDialog" />
  <r-child-res-info-detail-drawer ref="rChildResInfoDetailDrawer" />
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, provide, Ref, ref } from "vue";
import b_utils from "@/utils/browser_utils";
import d_const from "./constants";
import { useRouter } from "vue-router";

import RChildTagDialog from "./r_comp/tag_dialog_visible.vue";
import RChildShareDialog from "./r_comp/share_dialog_visible.vue";
import RChildDownloadDialog from "./r_comp/download_dialog_visible.vue";
import RChildResInfoDetailDrawer from "./r_comp/res_info_detail.vue";
import RResInfoOperate from "./r_comp/r_comp_res_info_operate.vue";
import ResInfoSquared from "./r_show_res_info/ResInfoSquared.vue";
import ResInfoTable from "./r_show_res_info/ResInfoTable.vue";

export default defineComponent({
  components: {
    ResInfoSquared: ResInfoSquared,
    ResInfoTable: ResInfoTable,
    "r-res-info-operate": RResInfoOperate,
    "r-child-tag-dialog": RChildTagDialog,
    "r-child-share-dialog": RChildShareDialog,
    "r-child-download-dialog": RChildDownloadDialog,
    "r-child-res-info-detail-drawer": RChildResInfoDetailDrawer,
  },
  props: {
    resInfoData: [],
  },
  setup(props, context) {
    const router = useRouter();
    const { expose } = context;
    const changeSelectedInfo: any = inject("changeSelectedInfo");

    const parentResInfo = ref();
    const tableData = ref();

    const isSquared = ref();
    const pickedResInfo = ref();
    const focusOnResInfo = ref();
    const dragOnTagetResInfo = ref();

    const resInfoSquared: Ref = ref();
    const resInfoTable: Ref = ref();
    const rChildTagDialog: Ref = ref();
    const rChildShareDialog: Ref = ref();
    const rChildDownloadDialog: Ref = ref();
    const rChildResInfoDetailDrawer: Ref = ref();

    const initTableData = (resInfoData: any, parentRInfo: any) => {
      for (let i = 0; i < resInfoData.length; i++) {
        let item = resInfoData[i];

        if (item.resInfoType == "folder") {
          item["category"] = "文件夹";
          item["size"] = "";
          item["image"] =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAAAwFBMVEUAAAD/2Ur/20z/203/40X//3j/yiX/zCv/3lD/2kv/yib/yiX/yib/2kr/2kr/yiX/2kv/2kv/yyb/2UT/1Tv/20H/yib/2kr/yib/2kr/yiX/20v/2kr/3Uz/5Vj/2kr/ySX/ySX/yiX/2Ur/20v/2Uz/ySj/zSf/20z/ySb/2kv/2Ur/2Ur/2Uv/yiX/0DX/yib/2Uz/yiX/yyf/20v/ySf/2kr/ySf/20z/2Uz/yyb/4k7/////2Ur/ySX/zS9+lhVZAAAAPXRSTlMAr1RGBQKWFw2o9PHt69/YiYBpKyIT+/bLwIFfWDMJ8OPHv7ePbEdBP+DU0tG8uKmnopCEd3duVU02NhoBsiz/2wAAAaxJREFUeNrt1GdSIzEQQOE2nuhsnCNhgWVzDoQW978V8J/CowkSqnrfCV5J3S0AAAAAAAAAXhVdJefDjjlg3vuw/L7+l4ovadI1NoY/b8WDaN0x1oZ/MnEsPTOldH/NxKXJqSmrdxyLM+mpqWA5FUeiM1NJ7724sTYVzY/FhbRjKksiaV5iavC1+dKoa+qQSNOuTD1emNM3+PNP5k3v/rmpSW8qjRqauixjadLzcQpiTE19uqk06KFG39oHXU8yKUedO8m3WRChTxbjLIxQ1f42kFDVURxIqLbiQEJ1FEqobkIJ7WeBhOoolNDFLJBQ3YQS2goldBEHEqp3oYTuQgn9H0roEaGEEkoooYQSSiihhBZHKKGEEkoooYQSSqgNQgkllFBCCSWUUEJtEEoooYQSSiihhBJqg9DD+urVtRT1Wb2aSlHv1Ku9FDVWnz5JYRP1aSzFDdSjnRR3qf6sxELk8UlvxMaR+pKLnQv142MmdmI/t7Q/FVv7XN0bTMTe/VhdW82klN0XdWmwiaWsdn6ijqwu91JF1P47+tFqVn7xezsTAAAAAAAAAK97BM+evOtMrXyJAAAAAElFTkSuQmCC";
        } else {
          item["category"] = d_const.getResourceType(item.resContentType).label;
          item["size"] = b_utils.conver(item.resInfoSize);
          item["image"] =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAAAz1BMVEUAAADLy9PQ0tnT2d/Z3+LW3OHV2d/LzdPo6O7W3+bKzNTP0dfT19zc3OfR1dvR09nX3uLW2+DW3ODX3eHLzNPW3ODP0tjMzdTLzNPKy9TW29/LzNTLy9PY3uLY3eLMz9TW2+HKz9P////LzdTMztXNz9bU2d7W2t/T193Ky9LU2N3W2+DLzNPS1tvR1drO0dfR1dvQ09nP0tjJytHW3OHP09nP0djX3eH29/j9/f3e4OTx8vTl5+vp6+7s7e/z9Pbu8PHi5Ojb3uL6+vv4+PmeKQbjAAAAInRSTlMAeigoKOfoegYN3WpcEk0h9u7g0cOskYL37cG4qII0L/Q62enLnQAABplJREFUeNrtlulW2zAQhdMdaOm+7zWQhKRkcUnA2UiA93+mTu2j3KqDpCjX5k/9HZ3Klj1Xn0fpaRs1NTU1NTU1NTU1NTU1FPtP3rx6cXZ6enZ6tkZuZGD+Q/es2z3tmnusyR9nD169fbrTqJTdL88hIuQyMtZSMnAPzBrEXz5pVMjXB90CiNhykDrrmnX7g1D/cb9RFU+fQwgC/jXBvsa7L+83quHrc0ioLrmkga55UI3p7gNbUM0eKUfHqzH90vWjBcNUYbr/PY9udVsyuluB+ipNn7g2xHW8cBWmb/JwQQtixnP9IY760k1fhbsZltPvlW/6QnXPENdVXV+yqUNM8P0ksOapL9fU7oZCr6sOu+u1KS+qiZIGlZm2KkKb8qLNVlNGKwzedaxVaeqUwewVCtU/LMu0iXDB3S19LbjuQXmmWiwHHVVrStxfX9bpN+1gfa2OUxGoL8nU0TGnmJYP15dy+tgggEfcX1+SqQrdWpgwJUU7zY6MCB1PPW/acUphDdd6bdP6h/du8ei1cARsT83GmAVI6HWHeLj+5T4pKjglhMDxR9R/3GFE7W4o9Lrq3Ob1jynReEEQ+YEPdxnR8KbtTluGfy1cz7ZUbeoV9UqH698woiYEoYJM2MAn3I6qf0GIthGuN3BeQyiufpcSxcZ6Q4g4nsfVPyNEXRIbSsfV3+OPPh4tFYYRvR140ZMi4aR9IqOtwTO807pcrSYtcx9TT4qC8Oad1TJLcrLpqinPo+o5UUkT9AaY8Xx2lSQgm3fi6nlRoDfB2uQ6+YerVUQ9dfQIUaj1WZZoFsF6QIluziK5kSlc3PCiAztpcDKQYWZrfZY4WAbqsc6IIjTAJEtczFBfXUdNBzBbrJ+14anIzkL1ZiZE/ceF9XniYRquH7AdxZeb8DW9QU9G8ayZJT4uA/VmnRDtqWBBH+M88TIN1fNHPwC2sD2f+0WzUL0gEyOKEHREd7iVBJh46gEjig183ViFROfe+pI6ikDnkc1CoktPPdaojgKEqvtFSHTqrzcQoghzCncuJxch0evJZctRDzhRP63ZRZZsSHY+66qA2xFtLrIkjmm3MtHhsDfsybDmglmEJv7Tj3oBefk1IYowxSLZimkbkkJZovbX/8002ZJzLWjuGVEE2Uc/T7Zmqo5eBi1qQGDOJCGYWZmj3mg0HOW31F8myTBBoHfNiGYn+Gjkc6IIMaE5q4RiLkEyVDYhOoJcOkrTYVrcn3OiWW+kukmLIhDSzYRkIlnp0Hz4ugmMaCoZIlkEm+sZK7rI5ZBdNIIRTS1B04UFK3qR5xR5hlFKHT1+n0VYfj1lRa9TlUkefWqwQi9Y0czOM9wlRBEGeNEr1VFWdFyEjdOxjHXokhU9N5lWPtVRgxU8Z0WnKQCUaL+f9lMZmMf98YQVnY3zjza5eRMkmBAtAmTkwaarw4wUbaW5pFCICjIxoiI4xtevWZI/UYnAx6MZjGgRUgSjuy2upZNxgUQhVzpBiELQzAUL6t+lIgPZBkIUIRbjwdX2nlkLgoAUVV9uIA5/ghRk06LgqH8kY3072dI0W/UdcKJuWldbeU7Uh+OaENVhYLCIb+q003fDiB7d8OVYay2jVLPpJeqtTIHtqAqzZfuX8+XF+QZcLOeToaov7+iPAETVvZn1O3H1nKje2CmmxePqS+9oNOF6WvRW4UUPjw5lqGCsu96Jq2dFt91ciKsnRA/tYEEmtYm51x2OqqdErQ2AQ1A9i6gnRU0QZqDW9DtR9eRvVIuoWXB0L66eEMUG2BQoQUVcPSvqDA+vR9XzotXDix4cHB4UKQe4doL3XNdVid64mVoTrHUQVU+JqjCfgH4WUc+JHgB0Td2bWb8TV8+IogN6A+c15rj6yjoafhZXT4gieCuBw7h6RtTPz4OfMtQ1iKtnRG8VQhQdyr9ekEl1z9zrDkfVU6LWBsAhqJ5F1JOiJggzUGv6nah68jeqRdQsOLoXV0+IYgNsCpSgIq6eEH2PwOOfxzJ8cljHu1H1z7YX3UOKvaE1C/YaiKrf2V70tUvCJaXEI+o/NLbnHQLd3YCMfjem/jMh+g2BDgLiMfVPCFE5+0ggFsveDiP64/i2kIZSvD0Wfh3/koFMrFnXN65tWv+pwbHz6XhDtHAMe7sN1vSzJWCAENadXQ3Xv95v8Dz+4JAQgsdv8Na/f7fTKIPdd3sIBtgcuDrsq997i387aZ49fXzHz6M7j2QE1jSPn35r1NTU1NTU1NTU1NTU1Pw3/AZSJ0NZXABS3gAAAABJRU5ErkJggg==";
        }
      }
      tableData.value = resInfoData;
      resInfoSquared.value?.initData(resInfoData, parentRInfo);
      resInfoTable.value?.initData(resInfoData, parentRInfo);
      parentResInfo.value = parentRInfo;
    };

    const handleClickResInfo = (resInfo: any, column: any, event: any) => {
      pickedResInfo.value = resInfo;
      if (resInfo.resInfoType == "folder") {
        changeSelectedInfo(resInfo, "enter");
      }
    };

    const handleSelectedResInfo = (resInfo: any, action: string) => {
      if (action == "showOperate") {
        if (
          pickedResInfo.value &&
          resInfo.resInfoCode === pickedResInfo.value.resInfoCode
        ) {
          pickedResInfo.value = null;
        } else {
          pickedResInfo.value = resInfo;
        }
        return;
      }
      pickedResInfo.value = resInfo;
      if (action == "detail") {
        rChildResInfoDetailDrawer.value?.initPickedResInfo(resInfo);
      } else if (action == "download") {
        rChildDownloadDialog.value?.initPickedResInfo(resInfo);
      } else if (action == "preview") {
        const { href } = router.resolve({
          path: "/res_preview",
          query: {
            resInfoCode: resInfo.resInfoCode,
          },
        });
        window.open(href, "_blank");
      } else if (action == "share") {
        rChildShareDialog.value?.initPickedResInfo(resInfo);
      }
    };

    const handleOnResInfo = (resInfo: any, action: string, event) => {
      focusOnResInfo.value = resInfo;
    };

    const handleResInfoTagManage = (resInfo: any) => {
      rChildTagDialog.value?.initPickedResInfo(resInfo);
    };

    onMounted(() => {
      if (localStorage.getItem("isSquared")) {
        isSquared.value = localStorage.getItem("isSquared");
      } else {
        isSquared.value = "true";
      }
    });

    expose({
      initTableData,
      initRefreshShowFlag: (squared: string) => (isSquared.value = squared),
      handleResInfoTagManage,
      handleSelectedResInfo,
    });
    provide("handleClickResInfo", handleClickResInfo);
    provide("handleResInfoTagManage", handleResInfoTagManage);
    provide("handleSelectedResInfo", handleSelectedResInfo);

    return {
      tableData,
      parentResInfo,
      pickedResInfo,
      isSquared,
      focusOnResInfo,

      resInfoSquared,
      resInfoTable,
      rChildTagDialog,
      rChildShareDialog,
      rChildDownloadDialog,
      rChildResInfoDetailDrawer,
      handleSelectedResInfo,
      handleOnResInfo,
      handleClickResInfo,
      handleResInfoTagManage,
    };
  },
});
</script>

<style lang="scss" scoped></style>
