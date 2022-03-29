
import language_jp from "@/assets/language/lang_jp.png";
import language_zh from "@/assets/language/lang_zh.png";
import language_en from "@/assets/language/lang_en.png";
import language_jp_a from "@/assets/language/lang_jp_sp.png";
import language_zh_a from "@/assets/language/lang_cn_sp.png";
import language_en_a from "@/assets/language/lang_en_sp.png";

const surportLanguages: any = {
  'en': {
    icon: language_en,
    aIcon: language_en_a
  },
  'zh-cn': {
    icon: language_zh,
    aIcon: language_zh_a
  },
  'jp': {
    icon: language_jp,
    aIcon: language_jp_a
  }
};


export default {
  getLanguageIcon: (language: string) => surportLanguages[language]
}